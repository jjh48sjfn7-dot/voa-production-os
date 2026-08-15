-- =============================================================================
-- PRODUCTION OS PHASE 4G-B — Migration 3
-- Department assignment + growth authority
--
-- Policy/trigger authority only. No new tables. No growth history.
-- Leadership never implies software permissions (existing has_permission).
-- =============================================================================

-- -----------------------------------------------------------------------------
-- Target-membership helper (RLS WITH CHECK)
--
-- Choice: private.membership_is_active + integrity trigger (defense in depth).
-- The helper is SECURITY DEFINER and reads team_memberships directly so
-- department_assignments policies do not recurse through team_memberships RLS.
-- The trigger enforces the same rule for service_role / SQL Editor / migrations
-- that bypass RLS.
-- -----------------------------------------------------------------------------

CREATE FUNCTION private.membership_is_active(p_membership_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.team_memberships m
    WHERE m.id = p_membership_id
      AND m.status = 'active'
  );
$$;

COMMENT ON FUNCTION private.membership_is_active(uuid) IS
  'True when the target team_memberships row exists and status = active. Does not consult auth.uid(). Used to block assignment INSERT and active-assignment UPDATE against invited/inactive/archived memberships.';

REVOKE ALL ON FUNCTION private.membership_is_active(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION private.membership_is_active(uuid) TO authenticated, service_role;

-- -----------------------------------------------------------------------------
-- Workspace + active-membership integrity (INSERT and UPDATE)
-- -----------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.enforce_department_assignment_workspace_integrity()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $$
DECLARE
  mem_workspace uuid;
  mem_status public.membership_status;
  dept_workspace uuid;
BEGIN
  SELECT m.workspace_id, m.status
  INTO STRICT mem_workspace, mem_status
  FROM public.team_memberships m
  WHERE m.id = NEW.membership_id;

  SELECT d.workspace_id INTO STRICT dept_workspace
  FROM public.workspace_departments d
  WHERE d.id = NEW.workspace_department_id;

  IF dept_workspace IS DISTINCT FROM mem_workspace THEN
    RAISE EXCEPTION 'department is not in the membership workspace';
  END IF;

  -- INSERT always requires an active target membership.
  -- UPDATE requires an active target membership whenever the assignment
  -- would be active (includes false → true reactivation and staying active).
  IF TG_OP = 'INSERT' OR NEW.is_active THEN
    IF mem_status IS DISTINCT FROM 'active' THEN
      RAISE EXCEPTION 'department assignment requires an active team membership';
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

COMMENT ON FUNCTION public.enforce_department_assignment_workspace_integrity() IS
  'Department must belong to the membership workspace. New assignments and active assignments (including reactivation) require team_memberships.status = active.';

-- -----------------------------------------------------------------------------
-- INSERT: database owns timestamps
-- growth_level keeps the table default (new_volunteer) when omitted.
-- Admin may still supply any valid growth enum on INSERT; clocks are not trusted.
-- -----------------------------------------------------------------------------

CREATE FUNCTION public.enforce_department_assignment_insert_timestamps()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
  NEW.assigned_at := now();
  NEW.created_at := now();
  NEW.growth_level_entered_at := now();
  RETURN NEW;
END;
$$;

COMMENT ON FUNCTION public.enforce_department_assignment_insert_timestamps() IS
  'Forces assigned_at, created_at, and growth_level_entered_at to now() on INSERT. Does not override growth_level (table default new_volunteer when omitted).';

CREATE TRIGGER department_assignments_insert_timestamps
  BEFORE INSERT ON public.department_assignments
  FOR EACH ROW
  EXECUTE FUNCTION public.enforce_department_assignment_insert_timestamps();

REVOKE ALL ON FUNCTION public.enforce_department_assignment_insert_timestamps()
  FROM PUBLIC, anon, authenticated;

-- -----------------------------------------------------------------------------
-- BEFORE UPDATE column firewall + growth timestamp
-- SECURITY INVOKER: uses auth.uid() of the caller, then private.has_permission
-- (existing SECURITY DEFINER helper). Normal authenticated users are never
-- treated as trusted system.
--
-- Trigger name sorts before department_assignments_set_updated_at so this
-- function sees the client-supplied updated_at (if any) before the existing
-- trigger owns that column.
-- -----------------------------------------------------------------------------

CREATE FUNCTION public.enforce_department_assignment_update_authority()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $$
DECLARE
  v_uid uuid;
  v_workspace_id uuid;
  v_is_admin boolean := false;
  v_is_trainer boolean := false;
  v_is_trusted_system boolean := false;
  v_session_role text;
BEGIN
  IF NEW.id IS DISTINCT FROM OLD.id
     OR NEW.membership_id IS DISTINCT FROM OLD.membership_id
     OR NEW.workspace_department_id IS DISTINCT FROM OLD.workspace_department_id
     OR NEW.assigned_at IS DISTINCT FROM OLD.assigned_at
     OR NEW.created_at IS DISTINCT FROM OLD.created_at THEN
    RAISE EXCEPTION
      'department_assignments membership_id, workspace_department_id, assigned_at, and created_at are immutable';
  END IF;

  v_uid := auth.uid();
  v_session_role := NULLIF(current_setting('request.jwt.claim.role', true), '');

  -- Trusted database/system only when there is no Auth user.
  -- authenticated / anon never qualify, even if current_user looks privileged.
  v_is_trusted_system :=
    v_uid IS NULL
    AND (
      current_user IN ('postgres', 'supabase_admin')
      OR COALESCE(v_session_role, current_setting('role', true), '') IN (
        'service_role',
        'postgres',
        'supabase_admin'
      )
    );

  IF v_uid IS NOT NULL THEN
    v_workspace_id := private.membership_workspace_id(NEW.membership_id);
    v_is_admin := private.has_permission(v_workspace_id, 'admin');

    IF NOT v_is_admin THEN
      v_is_trainer := private.has_permission(
        v_workspace_id,
        'trainer',
        NEW.workspace_department_id
      );

      IF NOT v_is_trainer THEN
        RAISE EXCEPTION 'not authorized to update department assignment';
      END IF;

      -- Fail closed: Trainer may change growth_level only.
      -- Do not silently ignore unauthorized column writes.
      IF NEW.is_active IS DISTINCT FROM OLD.is_active THEN
        RAISE EXCEPTION 'trainer may not change department_assignments.is_active';
      END IF;

      IF NEW.growth_level_entered_at IS DISTINCT FROM OLD.growth_level_entered_at THEN
        RAISE EXCEPTION 'trainer may not write department_assignments.growth_level_entered_at';
      END IF;

      IF NEW.updated_at IS DISTINCT FROM OLD.updated_at THEN
        RAISE EXCEPTION 'trainer may not write department_assignments.updated_at';
      END IF;
    END IF;
  ELSIF NOT v_is_trusted_system THEN
    RAISE EXCEPTION 'not authorized to update department assignment';
  END IF;

  -- Database owns growth_level_entered_at for every allowed caller.
  -- Client-supplied values are never kept.
  IF NEW.growth_level IS DISTINCT FROM OLD.growth_level THEN
    NEW.growth_level_entered_at := now();
  ELSE
    NEW.growth_level_entered_at := OLD.growth_level_entered_at;
  END IF;

  RETURN NEW;
END;
$$;

COMMENT ON FUNCTION public.enforce_department_assignment_update_authority() IS
  'Immutable assignment identity. Admin may change growth_level and is_active. Trainer (explicit grant, department scope) may change growth_level only and fails closed on any other business/timestamp column. growth_level_entered_at is stamped on growth change. updated_at remains owned by department_assignments_set_updated_at. Trusted system = postgres/service_role with no auth.uid(); authenticated is never trusted by missing claims.';

CREATE TRIGGER department_assignments_enforce_update_authority
  BEFORE UPDATE ON public.department_assignments
  FOR EACH ROW
  EXECUTE FUNCTION public.enforce_department_assignment_update_authority();

REVOKE ALL ON FUNCTION public.enforce_department_assignment_update_authority()
  FROM PUBLIC, anon, authenticated;

-- -----------------------------------------------------------------------------
-- Replace department_assignments RLS
-- -----------------------------------------------------------------------------

DROP POLICY IF EXISTS department_assignments_select_own_or_scoped
  ON public.department_assignments;
DROP POLICY IF EXISTS department_assignments_insert_admin_or_editor
  ON public.department_assignments;
DROP POLICY IF EXISTS department_assignments_update_admin_or_editor
  ON public.department_assignments;

-- SELECT A: self
CREATE POLICY department_assignments_select_self
  ON public.department_assignments
  FOR SELECT
  TO authenticated
  USING (
    private.membership_belongs_to_auth_user(membership_id)
  );

-- SELECT B: Admin in workspace
CREATE POLICY department_assignments_select_admin
  ON public.department_assignments
  FOR SELECT
  TO authenticated
  USING (
    private.has_permission(
      private.membership_workspace_id(membership_id),
      'admin'
    )
  );

-- SELECT C: explicit Trainer scoped to department
CREATE POLICY department_assignments_select_trainer
  ON public.department_assignments
  FOR SELECT
  TO authenticated
  USING (
    private.has_permission(
      private.membership_workspace_id(membership_id),
      'trainer',
      workspace_department_id
    )
  );

-- INSERT: Admin only. Active membership in Admin workspace; department in that workspace.
CREATE POLICY department_assignments_insert_admin
  ON public.department_assignments
  FOR INSERT
  TO authenticated
  WITH CHECK (
    private.has_permission(
      private.membership_workspace_id(membership_id),
      'admin'
    )
    AND private.membership_is_active(membership_id)
    AND private.department_workspace_id(workspace_department_id)
      = private.membership_workspace_id(membership_id)
  );

-- UPDATE: Admin — approved columns only (enforced by trigger). USING + WITH CHECK.
CREATE POLICY department_assignments_update_admin
  ON public.department_assignments
  FOR UPDATE
  TO authenticated
  USING (
    private.has_permission(
      private.membership_workspace_id(membership_id),
      'admin'
    )
  )
  WITH CHECK (
    private.has_permission(
      private.membership_workspace_id(membership_id),
      'admin'
    )
    AND (
      NOT is_active
      OR private.membership_is_active(membership_id)
    )
    AND private.department_workspace_id(workspace_department_id)
      = private.membership_workspace_id(membership_id)
  );

-- UPDATE: scoped Trainer — growth_level only (enforced by trigger). USING + WITH CHECK.
CREATE POLICY department_assignments_update_trainer
  ON public.department_assignments
  FOR UPDATE
  TO authenticated
  USING (
    is_active
    AND private.has_permission(
      private.membership_workspace_id(membership_id),
      'trainer',
      workspace_department_id
    )
  )
  WITH CHECK (
    is_active
    AND private.has_permission(
      private.membership_workspace_id(membership_id),
      'trainer',
      workspace_department_id
    )
    AND private.membership_is_active(membership_id)
    AND private.department_workspace_id(workspace_department_id)
      = private.membership_workspace_id(membership_id)
  );

COMMENT ON TABLE public.department_assignments IS
  'Personal department membership + current growth level. UNIQUE (membership, department). Unassign = is_active false; do not DELETE. Identity columns are immutable. Assign/reactivate/deactivate = Admin only. Growth = Admin or explicit scoped Trainer. Department Editor / Scheduler / Builder / leadership do not grant assignment access.';
