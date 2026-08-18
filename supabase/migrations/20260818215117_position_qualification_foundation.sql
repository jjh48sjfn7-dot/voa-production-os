-- =============================================================================
-- PRODUCTION OS PHASE 4I-B — Migration 5
-- Position qualification foundation
--
-- DRAFT FOR OWNER REVIEW. Do not apply until an explicit db push (without
-- --dry-run) is approved.
--
-- Locked product rules encoded here:
-- 1. Department Growth and Position Qualification are independent domains.
--    This migration MUST NOT write department_assignments.growth_level.
-- 2. Absence of a position_qualifications row = Not Started. No not_started enum.
-- 3. INSERT status must be learning. Authorized Admin/Trainer may later skip
--    or backtrack to any enum value. No workflow engine.
-- 4. No self-write: actor membership must not equal target membership.
-- 5. Volunteer SELECT own history; never INSERT/UPDATE/DELETE own rows.
-- 6. Builder / Department Editor configure positions. Admin / Trainer manage
--    qualification. Leadership never implies either.
-- 7. No training tables, no qualification is_active, no workspace_id copy,
--    no VOA position seed rows.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. Qualification status enum
-- -----------------------------------------------------------------------------

CREATE TYPE public.position_qualification_status AS ENUM (
  'learning',
  'shadowing',
  'assisted',
  'qualified',
  'advanced'
);

COMMENT ON TYPE public.position_qualification_status IS
  'Position qualification current state. Not Started is the absence of a row, not an enum value. Independent from department_growth_level (Ready to Serve ≠ Qualified).';

GRANT USAGE ON TYPE public.position_qualification_status TO authenticated, service_role;

-- -----------------------------------------------------------------------------
-- 2. Narrow private helpers (SECURITY DEFINER, empty search_path)
-- Query base tables directly so policies never recurse through RLS.
-- -----------------------------------------------------------------------------

CREATE FUNCTION private.membership_has_active_department_assignment(
  p_membership_id uuid,
  p_department_id uuid
)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.department_assignments a
    WHERE a.membership_id = p_membership_id
      AND a.workspace_department_id = p_department_id
      AND a.is_active
  );
$$;

COMMENT ON FUNCTION private.membership_has_active_department_assignment(uuid, uuid) IS
  'True when the membership has an active department_assignments row for that department. Reads base tables directly. Does not create assignments.';

CREATE FUNCTION private.position_is_active(p_position_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.positions p
    WHERE p.id = p_position_id
      AND p.is_active
  );
$$;

COMMENT ON FUNCTION private.position_is_active(uuid) IS
  'True when the position exists and is_active. Reads public.positions directly to avoid RLS recursion.';

REVOKE ALL ON FUNCTION private.membership_has_active_department_assignment(uuid, uuid)
  FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION private.position_is_active(uuid)
  FROM PUBLIC, anon;

GRANT EXECUTE ON FUNCTION private.membership_has_active_department_assignment(uuid, uuid)
  TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION private.position_is_active(uuid)
  TO authenticated, service_role;

-- -----------------------------------------------------------------------------
-- 3. position_qualifications
-- -----------------------------------------------------------------------------

CREATE TABLE public.position_qualifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  membership_id uuid NOT NULL REFERENCES public.team_memberships (id) ON DELETE RESTRICT,
  position_id uuid NOT NULL REFERENCES public.positions (id) ON DELETE RESTRICT,
  status public.position_qualification_status NOT NULL,
  status_entered_at timestamptz NOT NULL,
  status_changed_by_membership_id uuid NOT NULL REFERENCES public.team_memberships (id) ON DELETE RESTRICT,
  first_qualified_at timestamptz,
  first_qualified_by_membership_id uuid REFERENCES public.team_memberships (id) ON DELETE RESTRICT,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT position_qualifications_membership_id_position_id_key
    UNIQUE (membership_id, position_id),
  CONSTRAINT position_qualifications_first_qualified_pair CHECK (
    (first_qualified_at IS NULL AND first_qualified_by_membership_id IS NULL)
    OR (first_qualified_at IS NOT NULL AND first_qualified_by_membership_id IS NOT NULL)
  ),
  CONSTRAINT position_qualifications_qualified_has_audit CHECK (
    status NOT IN (
      'qualified'::public.position_qualification_status,
      'advanced'::public.position_qualification_status
    )
    OR first_qualified_at IS NOT NULL
  )
);

COMMENT ON TABLE public.position_qualifications IS
  'Church-specific position qualification for a team membership. UNIQUE (membership, position). Absence of a row = Not Started. Current truth is status. first_qualified_* is sticky first-authorization audit and is not cleared on backtrack. No is_active; serving context comes from membership + department assignment + position.is_active. Never writes department Growth.';

COMMENT ON COLUMN public.position_qualifications.status IS
  'Current qualification state. Independent from department_assignments.growth_level.';

COMMENT ON COLUMN public.position_qualifications.status_changed_by_membership_id IS
  'Authorized Admin/Trainer actor for the current status. Database-stamped from auth.uid(); never trusted from the client. NOT NULL after INSERT trigger.';

COMMENT ON COLUMN public.position_qualifications.first_qualified_at IS
  'First time status entered qualified or advanced. Sticky. Null until that event. Not current-state truth.';

COMMENT ON COLUMN public.position_qualifications.first_qualified_by_membership_id IS
  'Authorized actor membership for the first Qualified/Advanced authorization. Sticky. Null until that event.';

CREATE INDEX position_qualifications_position_id_idx
  ON public.position_qualifications (position_id);

CREATE INDEX position_qualifications_status_changed_by_idx
  ON public.position_qualifications (status_changed_by_membership_id);

CREATE TRIGGER position_qualifications_set_updated_at
  BEFORE UPDATE ON public.position_qualifications
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.position_qualifications ENABLE ROW LEVEL SECURITY;

-- Created after the table so CREATE FUNCTION can resolve the relation.
-- Reads base tables directly (owner bypass / DEFINER) — never SELECT via
-- qualification RLS, so positions_select_member cannot recurse.
CREATE FUNCTION private.member_has_position_qualification(p_position_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.position_qualifications q
    JOIN public.team_memberships m ON m.id = q.membership_id
    WHERE q.position_id = p_position_id
      AND m.user_id = auth.uid()
  );
$$;

COMMENT ON FUNCTION private.member_has_position_qualification(uuid) IS
  'True when the current Auth user has any position_qualifications row for this position (any membership status). Reads base tables directly so positions SELECT cannot recurse through qualification RLS. Does not grant qualification writes.';

REVOKE ALL ON FUNCTION private.member_has_position_qualification(uuid)
  FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION private.member_has_position_qualification(uuid)
  TO authenticated, service_role;

-- -----------------------------------------------------------------------------
-- 4. INSERT integrity + authority
-- Application may supply membership_id, position_id, status.
-- Database owns timestamps, actor, and first-qualified (forced null).
-- Authenticated actor required. No service_role/SQL backdoor.
-- -----------------------------------------------------------------------------

CREATE FUNCTION public.enforce_position_qualification_insert()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $$
DECLARE
  v_uid uuid;
  v_workspace_id uuid;
  v_position_workspace uuid;
  v_position_department uuid;
  v_position_active boolean;
  v_mem_status public.membership_status;
  v_actor_id uuid;
  v_is_admin boolean := false;
BEGIN
  IF NEW.status IS DISTINCT FROM 'learning'::public.position_qualification_status THEN
    RAISE EXCEPTION 'position_qualifications INSERT status must be learning';
  END IF;

  SELECT m.workspace_id, m.status
  INTO STRICT v_workspace_id, v_mem_status
  FROM public.team_memberships m
  WHERE m.id = NEW.membership_id;

  SELECT d.workspace_id, p.workspace_department_id, p.is_active
  INTO STRICT v_position_workspace, v_position_department, v_position_active
  FROM public.positions p
  JOIN public.workspace_departments d ON d.id = p.workspace_department_id
  WHERE p.id = NEW.position_id;

  IF v_position_workspace IS DISTINCT FROM v_workspace_id THEN
    RAISE EXCEPTION 'qualification position is not in the membership workspace';
  END IF;

  IF v_mem_status IS DISTINCT FROM 'active'::public.membership_status THEN
    RAISE EXCEPTION 'qualification requires an active team membership';
  END IF;

  IF NOT v_position_active THEN
    RAISE EXCEPTION 'qualification requires an active position';
  END IF;

  IF NOT private.membership_has_active_department_assignment(
    NEW.membership_id,
    v_position_department
  ) THEN
    RAISE EXCEPTION 'qualification requires an active department assignment';
  END IF;

  v_uid := auth.uid();
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'not authorized to insert position qualification';
  END IF;

  v_actor_id := private.active_membership_id(v_workspace_id);
  IF v_actor_id IS NULL THEN
    RAISE EXCEPTION 'not authorized to insert position qualification';
  END IF;

  IF v_actor_id = NEW.membership_id THEN
    RAISE EXCEPTION 'cannot mutate own position qualification';
  END IF;

  v_is_admin := private.has_permission(v_workspace_id, 'admin');
  IF NOT v_is_admin THEN
    IF NOT private.has_permission(
      v_workspace_id,
      'trainer',
      v_position_department
    ) THEN
      RAISE EXCEPTION 'not authorized to insert position qualification';
    END IF;
  END IF;

  NEW.status_entered_at := now();
  NEW.status_changed_by_membership_id := v_actor_id;
  NEW.first_qualified_at := NULL;
  NEW.first_qualified_by_membership_id := NULL;
  NEW.created_at := now();
  NEW.updated_at := now();

  RETURN NEW;
END;
$$;

COMMENT ON FUNCTION public.enforce_position_qualification_insert() IS
  'INSERT: status must be learning. Stamps actor/timestamps from auth.uid() + workspace. Forces first_qualified_* null. Requires active target membership, active position, active department assignment, same workspace, and actor ≠ target. Admin workspace-wide or scoped Trainer. Does not write Growth.';

CREATE TRIGGER position_qualifications_enforce_insert
  BEFORE INSERT ON public.position_qualifications
  FOR EACH ROW
  EXECUTE FUNCTION public.enforce_position_qualification_insert();

REVOKE ALL ON FUNCTION public.enforce_position_qualification_insert()
  FROM PUBLIC, anon, authenticated;

-- -----------------------------------------------------------------------------
-- 5. UPDATE column firewall + integrity + first-qualified audit
-- Trigger name sorts before position_qualifications_set_updated_at.
-- Authenticated Admin/Trainer may request ONLY status.
-- -----------------------------------------------------------------------------

CREATE FUNCTION public.enforce_position_qualification_update()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $$
DECLARE
  v_uid uuid;
  v_workspace_id uuid;
  v_position_workspace uuid;
  v_position_department uuid;
  v_position_active boolean;
  v_mem_status public.membership_status;
  v_actor_id uuid;
  v_is_admin boolean := false;
BEGIN
  IF NEW.id IS DISTINCT FROM OLD.id
     OR NEW.membership_id IS DISTINCT FROM OLD.membership_id
     OR NEW.position_id IS DISTINCT FROM OLD.position_id
     OR NEW.created_at IS DISTINCT FROM OLD.created_at THEN
    RAISE EXCEPTION
      'position_qualifications id, membership_id, position_id, and created_at are immutable';
  END IF;

  IF NEW.status_entered_at IS DISTINCT FROM OLD.status_entered_at THEN
    RAISE EXCEPTION 'position_qualifications.status_entered_at is database-owned';
  END IF;

  IF NEW.status_changed_by_membership_id IS DISTINCT FROM OLD.status_changed_by_membership_id THEN
    RAISE EXCEPTION
      'position_qualifications.status_changed_by_membership_id is database-owned';
  END IF;

  IF NEW.first_qualified_at IS DISTINCT FROM OLD.first_qualified_at
     OR NEW.first_qualified_by_membership_id
          IS DISTINCT FROM OLD.first_qualified_by_membership_id THEN
    RAISE EXCEPTION 'position_qualifications first-qualified audit fields are immutable';
  END IF;

  IF NEW.updated_at IS DISTINCT FROM OLD.updated_at THEN
    RAISE EXCEPTION 'position_qualifications.updated_at is database-owned';
  END IF;

  SELECT m.workspace_id, m.status
  INTO STRICT v_workspace_id, v_mem_status
  FROM public.team_memberships m
  WHERE m.id = NEW.membership_id;

  SELECT d.workspace_id, p.workspace_department_id, p.is_active
  INTO STRICT v_position_workspace, v_position_department, v_position_active
  FROM public.positions p
  JOIN public.workspace_departments d ON d.id = p.workspace_department_id
  WHERE p.id = NEW.position_id;

  IF v_position_workspace IS DISTINCT FROM v_workspace_id THEN
    RAISE EXCEPTION 'qualification position is not in the membership workspace';
  END IF;

  IF v_mem_status IS DISTINCT FROM 'active'::public.membership_status THEN
    RAISE EXCEPTION 'qualification requires an active team membership';
  END IF;

  IF NOT v_position_active THEN
    RAISE EXCEPTION 'qualification requires an active position';
  END IF;

  IF NOT private.membership_has_active_department_assignment(
    NEW.membership_id,
    v_position_department
  ) THEN
    RAISE EXCEPTION 'qualification requires an active department assignment';
  END IF;

  v_uid := auth.uid();
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'not authorized to update position qualification';
  END IF;

  v_actor_id := private.active_membership_id(v_workspace_id);
  IF v_actor_id IS NULL THEN
    RAISE EXCEPTION 'not authorized to update position qualification';
  END IF;

  IF v_actor_id = NEW.membership_id THEN
    RAISE EXCEPTION 'cannot mutate own position qualification';
  END IF;

  v_is_admin := private.has_permission(v_workspace_id, 'admin');
  IF NOT v_is_admin THEN
    IF NOT private.has_permission(
      v_workspace_id,
      'trainer',
      v_position_department
    ) THEN
      RAISE EXCEPTION 'not authorized to update position qualification';
    END IF;
  END IF;

  IF NEW.status IS DISTINCT FROM OLD.status THEN
    NEW.status_entered_at := now();
    NEW.status_changed_by_membership_id := v_actor_id;
  ELSE
    NEW.status_entered_at := OLD.status_entered_at;
    NEW.status_changed_by_membership_id := OLD.status_changed_by_membership_id;
  END IF;

  IF OLD.first_qualified_at IS NULL
     AND NEW.status IN (
       'qualified'::public.position_qualification_status,
       'advanced'::public.position_qualification_status
     ) THEN
    NEW.first_qualified_at := now();
    NEW.first_qualified_by_membership_id := v_actor_id;
  ELSE
    NEW.first_qualified_at := OLD.first_qualified_at;
    NEW.first_qualified_by_membership_id := OLD.first_qualified_by_membership_id;
  END IF;

  RETURN NEW;
END;
$$;

COMMENT ON FUNCTION public.enforce_position_qualification_update() IS
  'UPDATE firewall: authenticated callers may request status only. Identity, actor, clocks, and first-qualified audit are database-owned. Stamps first_qualified_* once on first qualified/advanced; never overwrites or clears. Requires active membership, active position, active department assignment, same workspace, actor ≠ target. Admin or scoped Trainer. Does not write Growth.';

CREATE TRIGGER position_qualifications_enforce_update
  BEFORE UPDATE ON public.position_qualifications
  FOR EACH ROW
  EXECUTE FUNCTION public.enforce_position_qualification_update();

REVOKE ALL ON FUNCTION public.enforce_position_qualification_update()
  FROM PUBLIC, anon, authenticated;

-- -----------------------------------------------------------------------------
-- 6. Qualification RLS
-- -----------------------------------------------------------------------------

CREATE POLICY position_qualifications_select_self
  ON public.position_qualifications
  FOR SELECT
  TO authenticated
  USING (
    private.membership_belongs_to_auth_user(membership_id)
  );

CREATE POLICY position_qualifications_select_admin
  ON public.position_qualifications
  FOR SELECT
  TO authenticated
  USING (
    private.has_permission(
      private.membership_workspace_id(membership_id),
      'admin'
    )
  );

CREATE POLICY position_qualifications_select_trainer
  ON public.position_qualifications
  FOR SELECT
  TO authenticated
  USING (
    private.has_permission(
      private.membership_workspace_id(membership_id),
      'trainer',
      private.position_department_id(position_id)
    )
  );

CREATE POLICY position_qualifications_insert_admin
  ON public.position_qualifications
  FOR INSERT
  TO authenticated
  WITH CHECK (
    private.has_permission(
      private.membership_workspace_id(membership_id),
      'admin'
    )
    AND private.membership_is_active(membership_id)
    AND private.position_is_active(position_id)
    AND private.membership_has_active_department_assignment(
      membership_id,
      private.position_department_id(position_id)
    )
    AND private.position_workspace_id(position_id)
      = private.membership_workspace_id(membership_id)
    AND status = 'learning'::public.position_qualification_status
    AND private.active_membership_id(private.membership_workspace_id(membership_id))
      IS DISTINCT FROM membership_id
  );

CREATE POLICY position_qualifications_insert_trainer
  ON public.position_qualifications
  FOR INSERT
  TO authenticated
  WITH CHECK (
    private.has_permission(
      private.membership_workspace_id(membership_id),
      'trainer',
      private.position_department_id(position_id)
    )
    AND private.membership_is_active(membership_id)
    AND private.position_is_active(position_id)
    AND private.membership_has_active_department_assignment(
      membership_id,
      private.position_department_id(position_id)
    )
    AND private.position_workspace_id(position_id)
      = private.membership_workspace_id(membership_id)
    AND status = 'learning'::public.position_qualification_status
    AND private.active_membership_id(private.membership_workspace_id(membership_id))
      IS DISTINCT FROM membership_id
  );

CREATE POLICY position_qualifications_update_admin
  ON public.position_qualifications
  FOR UPDATE
  TO authenticated
  USING (
    private.has_permission(
      private.membership_workspace_id(membership_id),
      'admin'
    )
    AND private.membership_is_active(membership_id)
    AND private.position_is_active(position_id)
    AND private.membership_has_active_department_assignment(
      membership_id,
      private.position_department_id(position_id)
    )
    AND private.active_membership_id(private.membership_workspace_id(membership_id))
      IS DISTINCT FROM membership_id
  )
  WITH CHECK (
    private.has_permission(
      private.membership_workspace_id(membership_id),
      'admin'
    )
    AND private.membership_is_active(membership_id)
    AND private.position_is_active(position_id)
    AND private.membership_has_active_department_assignment(
      membership_id,
      private.position_department_id(position_id)
    )
    AND private.position_workspace_id(position_id)
      = private.membership_workspace_id(membership_id)
    AND private.active_membership_id(private.membership_workspace_id(membership_id))
      IS DISTINCT FROM membership_id
  );

CREATE POLICY position_qualifications_update_trainer
  ON public.position_qualifications
  FOR UPDATE
  TO authenticated
  USING (
    private.has_permission(
      private.membership_workspace_id(membership_id),
      'trainer',
      private.position_department_id(position_id)
    )
    AND private.membership_is_active(membership_id)
    AND private.position_is_active(position_id)
    AND private.membership_has_active_department_assignment(
      membership_id,
      private.position_department_id(position_id)
    )
    AND private.active_membership_id(private.membership_workspace_id(membership_id))
      IS DISTINCT FROM membership_id
  )
  WITH CHECK (
    private.has_permission(
      private.membership_workspace_id(membership_id),
      'trainer',
      private.position_department_id(position_id)
    )
    AND private.membership_is_active(membership_id)
    AND private.position_is_active(position_id)
    AND private.membership_has_active_department_assignment(
      membership_id,
      private.position_department_id(position_id)
    )
    AND private.position_workspace_id(position_id)
      = private.membership_workspace_id(membership_id)
    AND private.active_membership_id(private.membership_workspace_id(membership_id))
      IS DISTINCT FROM membership_id
  );

-- -----------------------------------------------------------------------------
-- 7. Table grants — no DELETE
-- -----------------------------------------------------------------------------

REVOKE ALL ON TABLE public.position_qualifications FROM PUBLIC, anon, authenticated;
GRANT SELECT, INSERT, UPDATE ON TABLE public.position_qualifications TO authenticated;
GRANT ALL ON TABLE public.position_qualifications TO service_role;

-- -----------------------------------------------------------------------------
-- 8. Position definition authority — drop Admin write
-- -----------------------------------------------------------------------------

DROP POLICY IF EXISTS positions_insert_admin_builder_editor ON public.positions;
DROP POLICY IF EXISTS positions_update_admin_builder_editor ON public.positions;

CREATE POLICY positions_insert_builder_editor
  ON public.positions
  FOR INSERT
  TO authenticated
  WITH CHECK (
    private.has_permission(private.department_workspace_id(workspace_department_id), 'builder')
    OR private.has_permission(
      private.department_workspace_id(workspace_department_id),
      'department_editor',
      workspace_department_id
    )
  );

CREATE POLICY positions_update_builder_editor
  ON public.positions
  FOR UPDATE
  TO authenticated
  USING (
    private.has_permission(private.department_workspace_id(workspace_department_id), 'builder')
    OR private.has_permission(
      private.department_workspace_id(workspace_department_id),
      'department_editor',
      workspace_department_id
    )
  )
  WITH CHECK (
    private.has_permission(private.department_workspace_id(workspace_department_id), 'builder')
    OR private.has_permission(
      private.department_workspace_id(workspace_department_id),
      'department_editor',
      workspace_department_id
    )
  );

-- -----------------------------------------------------------------------------
-- 9. Position slug immutability (department FK already immutable)
-- -----------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.enforce_position_immutable_department()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
  IF NEW.workspace_department_id IS DISTINCT FROM OLD.workspace_department_id THEN
    RAISE EXCEPTION 'positions.workspace_department_id is immutable';
  END IF;
  IF NEW.slug IS DISTINCT FROM OLD.slug THEN
    RAISE EXCEPTION 'positions.slug is immutable';
  END IF;
  RETURN NEW;
END;
$$;

COMMENT ON FUNCTION public.enforce_position_immutable_department() IS
  'positions.workspace_department_id and positions.slug are immutable after INSERT. name may still change.';

-- -----------------------------------------------------------------------------
-- 10. Position prerequisites mutation authority — drop Admin write
-- -----------------------------------------------------------------------------

DROP POLICY IF EXISTS position_prerequisites_insert_admin_builder_editor
  ON public.position_prerequisites;
DROP POLICY IF EXISTS position_prerequisites_delete_admin_builder_editor
  ON public.position_prerequisites;

CREATE POLICY position_prerequisites_insert_builder_editor
  ON public.position_prerequisites
  FOR INSERT
  TO authenticated
  WITH CHECK (
    private.has_permission(private.position_workspace_id(position_id), 'builder')
    OR private.has_permission(
      private.position_workspace_id(position_id),
      'department_editor',
      private.position_department_id(position_id)
    )
  );

CREATE POLICY position_prerequisites_delete_builder_editor
  ON public.position_prerequisites
  FOR DELETE
  TO authenticated
  USING (
    private.has_permission(private.position_workspace_id(position_id), 'builder')
    OR private.has_permission(
      private.position_workspace_id(position_id),
      'department_editor',
      private.position_department_id(position_id)
    )
  );

-- -----------------------------------------------------------------------------
-- 11. Inactive-position historical SELECT
-- Volunteer: only positions they have a qualification for (helper, no recursion).
-- Scoped Trainer: inactive positions in the granted department (name lookup for
-- historical qualifications they can already SELECT). Not unrelated members.
-- Admin/Builder/Department Editor already saw inactive positions.
-- Archived members can still resolve names via the helper even without an
-- active membership, because qualification history is preserved.
-- -----------------------------------------------------------------------------

DROP POLICY IF EXISTS positions_select_member ON public.positions;

CREATE POLICY positions_select_member
  ON public.positions
  FOR SELECT
  TO authenticated
  USING (
    (
      private.has_active_membership(private.department_workspace_id(workspace_department_id))
      AND (
        is_active
        OR private.has_permission(
          private.department_workspace_id(workspace_department_id),
          'admin'
        )
        OR private.has_permission(
          private.department_workspace_id(workspace_department_id),
          'builder'
        )
        OR private.has_permission(
          private.department_workspace_id(workspace_department_id),
          'department_editor',
          workspace_department_id
        )
        OR private.has_permission(
          private.department_workspace_id(workspace_department_id),
          'trainer',
          workspace_department_id
        )
      )
    )
    OR private.member_has_position_qualification(id)
  );

COMMENT ON TABLE public.positions IS
  'Church-configurable serving role. Not inferred from Sunday Setup sections. Do not seed Audio Setup Crew / FOH Operator here. Write = Builder or scoped Department Editor (not Admin/Trainer/Scheduler/leadership). slug is immutable. Inactive positions remain readable to Admin/Builder/Editor/scoped Trainer and to members who have a qualification row.';
