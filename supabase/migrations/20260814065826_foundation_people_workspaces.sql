-- =============================================================================
-- Production OS — Foundation Migration 1
-- foundation_people_workspaces
--
-- DRAFT FOR OWNER REVIEW. Do not treat this file as applied until an explicit
-- db push (without --dry-run) is approved.
--
-- Locked product rules encoded here:
-- 1. Volunteer access is implied by an active team membership. There is no
--    volunteer permission_key.
-- 2. Leadership appointments do NOT imply software permissions. Overseer is
--    not trainer/scheduler/admin/builder.
-- 3. Multiple active Overseers are allowed on a workspace and on a department.
-- 4. Operational Production OS content (Sunday Setup, equipment, docs, photos,
--    Blueprint) remains file-backed. production_os_key is a bridge, not a copy.
-- 5. No VOA / user / department / position seed rows in this migration.
-- 6. RLS helpers live in schema private (not Data API exposed).
-- =============================================================================

-- -----------------------------------------------------------------------------
-- Enums
-- -----------------------------------------------------------------------------

CREATE TYPE public.membership_status AS ENUM (
  'invited',
  'active',
  'inactive',
  'archived'
);

CREATE TYPE public.invitation_status AS ENUM (
  'pending',
  'accepted',
  'expired',
  'revoked'
);

-- Volunteer is intentionally absent. Active membership = volunteer access.
CREATE TYPE public.permission_key AS ENUM (
  'trainer',
  'scheduler',
  'department_editor',
  'admin',
  'builder'
);

CREATE TYPE public.leadership_role_key AS ENUM (
  'production_overseer',
  'department_overseer'
);

CREATE TYPE public.department_source AS ENUM (
  'production_os',
  'custom'
);

-- Snake_case storage; Volunteer Mode TypeScript uses kebab-case and maps later.
CREATE TYPE public.department_growth_level AS ENUM (
  'new_volunteer',
  'learning',
  'shadowing',
  'assisted',
  'ready_to_serve',
  'advanced'
);

COMMENT ON TYPE public.permission_key IS
  'Software permissions only. Volunteer is implied by active team membership and must never appear here. Leadership appointments do not imply these keys.';

COMMENT ON TYPE public.leadership_role_key IS
  'Church office only. Multiple active holders of the same role/scope are allowed. Does not grant software permissions.';

-- -----------------------------------------------------------------------------
-- private schema — RLS helpers only
-- Not listed in supabase/config.toml api.schemas (public, graphql_public).
-- Do not expose this schema through the Data API.
-- -----------------------------------------------------------------------------

CREATE SCHEMA private;

COMMENT ON SCHEMA private IS
  'Internal RLS/security helpers. Not part of the Supabase Data API. Do not add to api.schemas.';

REVOKE ALL ON SCHEMA private FROM PUBLIC;
REVOKE ALL ON SCHEMA private FROM anon;
REVOKE CREATE ON SCHEMA private FROM PUBLIC, anon, authenticated, service_role;
GRANT USAGE ON SCHEMA private TO authenticated, service_role;

ALTER DEFAULT PRIVILEGES IN SCHEMA private
  REVOKE EXECUTE ON FUNCTIONS FROM PUBLIC;

ALTER DEFAULT PRIVILEGES IN SCHEMA private
  REVOKE EXECUTE ON FUNCTIONS FROM anon;

-- -----------------------------------------------------------------------------
-- updated_at helper
-- -----------------------------------------------------------------------------

CREATE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END;
$$;

COMMENT ON FUNCTION public.set_updated_at() IS
  'Minimal BEFORE UPDATE trigger: sets NEW.updated_at = now(). Explicit empty search_path.';

-- -----------------------------------------------------------------------------
-- 1. profiles
-- -----------------------------------------------------------------------------

CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
  display_name text,
  first_name text,
  last_name text,
  avatar_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT profiles_display_name_len CHECK (display_name IS NULL OR char_length(display_name) BETWEEN 1 AND 120),
  CONSTRAINT profiles_first_name_len CHECK (first_name IS NULL OR char_length(first_name) BETWEEN 1 AND 80),
  CONSTRAINT profiles_last_name_len CHECK (last_name IS NULL OR char_length(last_name) BETWEEN 1 AND 80),
  CONSTRAINT profiles_avatar_url_len CHECK (avatar_url IS NULL OR char_length(avatar_url) BETWEEN 1 AND 2048)
);

COMMENT ON TABLE public.profiles IS
  'App person record. PK matches auth.users.id. Email, passwords, and tokens stay in Supabase Auth. Names are nullable until the user (or a later profile step) fills them in. ON DELETE CASCADE from auth.users: the profile is only the Auth mirror.';

COMMENT ON COLUMN public.profiles.id IS
  'ON DELETE CASCADE from auth.users. Ministry history is NOT cascaded: team_memberships.user_id is ON DELETE RESTRICT, so an Auth user who has a membership cannot be deleted. An Auth user with a profile and no memberships can be deleted cleanly.';

CREATE TRIGGER profiles_set_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

-- -----------------------------------------------------------------------------
-- 2. church_workspaces
-- -----------------------------------------------------------------------------

CREATE TABLE public.church_workspaces (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL,
  timezone text NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  production_os_key text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT church_workspaces_name_len CHECK (char_length(name) BETWEEN 1 AND 200),
  CONSTRAINT church_workspaces_slug_format CHECK (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  CONSTRAINT church_workspaces_timezone_len CHECK (char_length(timezone) BETWEEN 1 AND 100),
  CONSTRAINT church_workspaces_production_os_key_format
    CHECK (production_os_key IS NULL OR production_os_key ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  CONSTRAINT church_workspaces_slug_key UNIQUE (slug),
  CONSTRAINT church_workspaces_production_os_key_key UNIQUE (production_os_key)
);

COMMENT ON TABLE public.church_workspaces IS
  'One church. UUID PK. slug and production_os_key map to file-backed church identity. Do not store branding or operational content here.';

COMMENT ON COLUMN public.church_workspaces.production_os_key IS
  'Nullable unique bridge to file-backed Production OS church identity. Operational pages remain in the repo until a later Builder phase.';

CREATE TRIGGER church_workspaces_set_updated_at
  BEFORE UPDATE ON public.church_workspaces
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

-- -----------------------------------------------------------------------------
-- 3. workspace_departments
-- -----------------------------------------------------------------------------

CREATE TABLE public.workspace_departments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES public.church_workspaces (id) ON DELETE RESTRICT,
  department_key text NOT NULL,
  name text NOT NULL,
  source public.department_source NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT workspace_departments_key_format CHECK (department_key ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  CONSTRAINT workspace_departments_name_len CHECK (char_length(name) BETWEEN 1 AND 120),
  CONSTRAINT workspace_departments_workspace_id_department_key_key
    UNIQUE (workspace_id, department_key)
);

COMMENT ON TABLE public.workspace_departments IS
  'Department bridge per church. department_key is text (not an enum) so Builder Mode can add custom keys. Current Production OS keys include audio, lighting, media — they are not hardcoded as a database enum.';

CREATE TRIGGER workspace_departments_set_updated_at
  BEFORE UPDATE ON public.workspace_departments
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX workspace_departments_workspace_id_idx
  ON public.workspace_departments (workspace_id);

-- -----------------------------------------------------------------------------
-- 4. team_memberships
-- Created before invitations so invited_by can FK here.
-- -----------------------------------------------------------------------------

CREATE TABLE public.team_memberships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES public.church_workspaces (id) ON DELETE RESTRICT,
  user_id uuid NOT NULL REFERENCES public.profiles (id) ON DELETE RESTRICT,
  status public.membership_status NOT NULL,
  joined_at timestamptz,
  inactive_at timestamptz,
  archived_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT team_memberships_workspace_id_user_id_key UNIQUE (workspace_id, user_id)
);

COMMENT ON TABLE public.team_memberships IS
  'Person ↔ church. UNIQUE (workspace_id, user_id) forever — rejoining updates this row. Do not DELETE; archive. Active status is what implies Volunteer access. user_id ON DELETE RESTRICT intentionally blocks Auth/profile deletion when ministry history exists.';

COMMENT ON COLUMN public.team_memberships.user_id IS
  'ON DELETE RESTRICT. Preserved membership rows block deletion of the referenced profile, which in turn blocks deletion of the Auth user. This is intentional until a later historical-account deletion design.';

CREATE TRIGGER team_memberships_set_updated_at
  BEFORE UPDATE ON public.team_memberships
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX team_memberships_user_id_idx
  ON public.team_memberships (user_id);

CREATE INDEX team_memberships_workspace_id_status_idx
  ON public.team_memberships (workspace_id, status);

-- -----------------------------------------------------------------------------
-- 5. team_invitations
-- token_hash is stored here but is not granted for SELECT to authenticated.
-- -----------------------------------------------------------------------------

CREATE TABLE public.team_invitations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES public.church_workspaces (id) ON DELETE RESTRICT,
  email text NOT NULL,
  email_normalized text GENERATED ALWAYS AS (lower(btrim(email))) STORED,
  invited_by_membership_id uuid NOT NULL REFERENCES public.team_memberships (id) ON DELETE RESTRICT,
  token_hash bytea NOT NULL,
  expires_at timestamptz NOT NULL,
  status public.invitation_status NOT NULL DEFAULT 'pending',
  accepted_user_id uuid REFERENCES public.profiles (id) ON DELETE SET NULL,
  accepted_at timestamptz,
  intended_leadership_role public.leadership_role_key,
  intended_leadership_department_id uuid REFERENCES public.workspace_departments (id) ON DELETE RESTRICT,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT team_invitations_email_format
    CHECK (email ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'),
  CONSTRAINT team_invitations_token_hash_sha256
    CHECK (octet_length(token_hash) = 32),
  CONSTRAINT team_invitations_token_hash_key UNIQUE (token_hash),
  CONSTRAINT team_invitations_expires_after_create
    CHECK (expires_at > created_at),
  CONSTRAINT team_invitations_accepted_consistency
    CHECK (
      (status = 'accepted' AND accepted_user_id IS NOT NULL AND accepted_at IS NOT NULL)
      OR (status <> 'accepted' AND accepted_user_id IS NULL AND accepted_at IS NULL)
    ),
  CONSTRAINT team_invitations_intended_leadership_scope
    CHECK (
      (intended_leadership_role IS NULL AND intended_leadership_department_id IS NULL)
      OR (intended_leadership_role = 'production_overseer' AND intended_leadership_department_id IS NULL)
      OR (intended_leadership_role = 'department_overseer' AND intended_leadership_department_id IS NOT NULL)
    )
);

COMMENT ON TABLE public.team_invitations IS
  'Pre-account invite. Stores SHA-256 token_hash only — never a plaintext token. Acceptance is a later server/RPC; there is no public SELECT-by-email path. Intended leadership is recorded here but still does not create software grants. No scheduled expiry job: future accept logic MUST reject when expires_at <= now() even if status is still pending.';

COMMENT ON COLUMN public.team_invitations.token_hash IS
  'SHA-256 digest (32 bytes). Column-level privileges withhold this from authenticated SELECT, including Admin select(*).';

COMMENT ON COLUMN public.team_invitations.expires_at IS
  'Accept RPC (later) must treat expires_at <= now() as invalid regardless of status still being pending.';

COMMENT ON COLUMN public.team_invitations.email_normalized IS
  'lower(btrim(email)) generated column. Used for pending-invite uniqueness without citext.';

CREATE TRIGGER team_invitations_set_updated_at
  BEFORE UPDATE ON public.team_invitations
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

CREATE UNIQUE INDEX team_invitations_one_pending_per_email
  ON public.team_invitations (workspace_id, email_normalized)
  WHERE status = 'pending';

CREATE INDEX team_invitations_workspace_id_status_idx
  ON public.team_invitations (workspace_id, status);

-- No team_invitations_safe view in Migration 1. A view is unused until
-- invitation UI exists, and even security_invoker views widen the API
-- surface. Admins select explicit columns (never token_hash).

-- -----------------------------------------------------------------------------
-- 6. team_invitation_departments
-- -----------------------------------------------------------------------------

CREATE TABLE public.team_invitation_departments (
  invitation_id uuid NOT NULL REFERENCES public.team_invitations (id) ON DELETE CASCADE,
  workspace_department_id uuid NOT NULL REFERENCES public.workspace_departments (id) ON DELETE RESTRICT,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (invitation_id, workspace_department_id)
);

COMMENT ON TABLE public.team_invitation_departments IS
  'Intended departments on an invitation. Duplicate (invitation, department) pairs are the primary key.';

-- -----------------------------------------------------------------------------
-- 7. team_invitation_permissions
-- -----------------------------------------------------------------------------

CREATE TABLE public.team_invitation_permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  invitation_id uuid NOT NULL REFERENCES public.team_invitations (id) ON DELETE CASCADE,
  permission_key public.permission_key NOT NULL,
  workspace_department_id uuid REFERENCES public.workspace_departments (id) ON DELETE RESTRICT,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT team_invitation_permissions_admin_builder_workspace_wide
    CHECK (
      permission_key NOT IN ('admin', 'builder')
      OR workspace_department_id IS NULL
    )
);

COMMENT ON TABLE public.team_invitation_permissions IS
  'Intended software grants on an invitation. Not leadership. Duplicate equivalent grants are blocked by partial unique indexes.';

COMMENT ON COLUMN public.team_invitation_permissions.workspace_department_id IS
  'NULL = intended workspace-wide grant. Same scope rule as permission_grants: department_editor NULL means all departments.';

CREATE UNIQUE INDEX team_invitation_permissions_workspace_wide_key
  ON public.team_invitation_permissions (invitation_id, permission_key)
  WHERE workspace_department_id IS NULL;

CREATE UNIQUE INDEX team_invitation_permissions_department_key
  ON public.team_invitation_permissions (invitation_id, permission_key, workspace_department_id)
  WHERE workspace_department_id IS NOT NULL;

-- -----------------------------------------------------------------------------
-- 8. leadership_appointments
-- -----------------------------------------------------------------------------

CREATE TABLE public.leadership_appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  membership_id uuid NOT NULL REFERENCES public.team_memberships (id) ON DELETE RESTRICT,
  role_key public.leadership_role_key NOT NULL,
  workspace_department_id uuid REFERENCES public.workspace_departments (id) ON DELETE RESTRICT,
  appointed_by_membership_id uuid REFERENCES public.team_memberships (id) ON DELETE RESTRICT,
  appointed_at timestamptz NOT NULL DEFAULT now(),
  removed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT leadership_appointments_role_scope
    CHECK (
      (role_key = 'production_overseer' AND workspace_department_id IS NULL)
      OR (role_key = 'department_overseer' AND workspace_department_id IS NOT NULL)
    ),
  CONSTRAINT leadership_appointments_removed_after_appointed
    CHECK (removed_at IS NULL OR removed_at >= appointed_at),
  CONSTRAINT leadership_appointments_no_self_appoint
    CHECK (
      appointed_by_membership_id IS NULL
      OR appointed_by_membership_id <> membership_id
    )
);

COMMENT ON TABLE public.leadership_appointments IS
  'Church office only. Multiple active Overseers are allowed for the same workspace or department. Uniqueness is only: the same membership cannot hold two active copies of the same role/scope. appointed_by NULL is reserved for system/bootstrap SQL. This table does not grant software permissions. Ordinary members may SELECT current (removed_at IS NULL) appointments; removed history is self or admin only.';

-- Same member cannot hold two active copies of production_overseer.
CREATE UNIQUE INDEX leadership_appointments_active_production_overseer_per_member
  ON public.leadership_appointments (membership_id)
  WHERE removed_at IS NULL AND role_key = 'production_overseer';

-- Same member cannot hold two active copies of department_overseer for one department.
-- Different members MAY all be active department_overseer for that department.
CREATE UNIQUE INDEX leadership_appointments_active_department_overseer_per_member
  ON public.leadership_appointments (membership_id, workspace_department_id)
  WHERE removed_at IS NULL AND role_key = 'department_overseer';

CREATE INDEX leadership_appointments_membership_id_active_idx
  ON public.leadership_appointments (membership_id)
  WHERE removed_at IS NULL;

CREATE INDEX leadership_appointments_department_id_idx
  ON public.leadership_appointments (workspace_department_id)
  WHERE removed_at IS NULL AND workspace_department_id IS NOT NULL;

-- -----------------------------------------------------------------------------
-- 9. permission_grants
-- -----------------------------------------------------------------------------

CREATE TABLE public.permission_grants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  membership_id uuid NOT NULL REFERENCES public.team_memberships (id) ON DELETE RESTRICT,
  permission_key public.permission_key NOT NULL,
  workspace_department_id uuid REFERENCES public.workspace_departments (id) ON DELETE RESTRICT,
  granted_by_membership_id uuid REFERENCES public.team_memberships (id) ON DELETE RESTRICT,
  granted_at timestamptz NOT NULL DEFAULT now(),
  revoked_at timestamptz,
  CONSTRAINT permission_grants_revoked_after_granted
    CHECK (revoked_at IS NULL OR revoked_at >= granted_at),
  CONSTRAINT permission_grants_no_self_grant
    CHECK (
      granted_by_membership_id IS NULL
      OR granted_by_membership_id <> membership_id
    ),
  CONSTRAINT permission_grants_admin_builder_workspace_wide
    CHECK (
      permission_key NOT IN ('admin', 'builder')
      OR workspace_department_id IS NULL
    )
);

COMMENT ON TABLE public.permission_grants IS
  'Explicit software access. Never implied by leadership_appointments or growth_level. granted_by NULL is reserved for system/bootstrap SQL (first Admin in Phase 4E). Duplicate equivalent active grants are blocked. Admin/Builder must be workspace-wide (department NULL).';

COMMENT ON COLUMN public.permission_grants.workspace_department_id IS
  'NULL = workspace-wide scope. Locked: department_editor with NULL means editor of ALL departments in the workspace. A non-NULL UUID means that department only. Trainer/Scheduler may use the same scope pattern later.';

CREATE UNIQUE INDEX permission_grants_active_workspace_wide_key
  ON public.permission_grants (membership_id, permission_key)
  WHERE revoked_at IS NULL AND workspace_department_id IS NULL;

CREATE UNIQUE INDEX permission_grants_active_department_key
  ON public.permission_grants (membership_id, permission_key, workspace_department_id)
  WHERE revoked_at IS NULL AND workspace_department_id IS NOT NULL;

CREATE INDEX permission_grants_membership_id_active_idx
  ON public.permission_grants (membership_id)
  WHERE revoked_at IS NULL;

-- -----------------------------------------------------------------------------
-- 10. department_assignments
-- -----------------------------------------------------------------------------

CREATE TABLE public.department_assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  membership_id uuid NOT NULL REFERENCES public.team_memberships (id) ON DELETE RESTRICT,
  workspace_department_id uuid NOT NULL REFERENCES public.workspace_departments (id) ON DELETE RESTRICT,
  growth_level public.department_growth_level NOT NULL DEFAULT 'new_volunteer',
  growth_level_entered_at timestamptz NOT NULL DEFAULT now(),
  is_active boolean NOT NULL DEFAULT true,
  assigned_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT department_assignments_membership_id_workspace_department_id_key
    UNIQUE (membership_id, workspace_department_id)
);

COMMENT ON TABLE public.department_assignments IS
  'Personal department membership + current growth level. UNIQUE (membership, department) so unassign/reassign updates the same row. No leader-only notes and no stored progress counters on this volunteer-readable record.';

CREATE TRIGGER department_assignments_set_updated_at
  BEFORE UPDATE ON public.department_assignments
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX department_assignments_department_id_idx
  ON public.department_assignments (workspace_department_id)
  WHERE is_active;

-- -----------------------------------------------------------------------------
-- 11. positions
-- -----------------------------------------------------------------------------

CREATE TABLE public.positions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_department_id uuid NOT NULL REFERENCES public.workspace_departments (id) ON DELETE RESTRICT,
  name text NOT NULL,
  slug text NOT NULL,
  description text,
  is_active boolean NOT NULL DEFAULT true,
  required_shadow_services integer NOT NULL DEFAULT 0,
  required_assisted_services integer NOT NULL DEFAULT 0,
  scheduling_guidance text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT positions_name_len CHECK (char_length(name) BETWEEN 1 AND 120),
  CONSTRAINT positions_slug_format CHECK (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  CONSTRAINT positions_description_len CHECK (description IS NULL OR char_length(description) <= 4000),
  CONSTRAINT positions_scheduling_guidance_len CHECK (scheduling_guidance IS NULL OR char_length(scheduling_guidance) <= 4000),
  CONSTRAINT positions_required_shadow_nonneg CHECK (required_shadow_services >= 0),
  CONSTRAINT positions_required_assisted_nonneg CHECK (required_assisted_services >= 0),
  CONSTRAINT positions_workspace_department_id_slug_key UNIQUE (workspace_department_id, slug)
);

COMMENT ON TABLE public.positions IS
  'Church-configurable serving role. Not inferred from Sunday Setup sections. Do not seed Audio Setup Crew / FOH Operator here.';

CREATE TRIGGER positions_set_updated_at
  BEFORE UPDATE ON public.positions
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX positions_department_id_idx
  ON public.positions (workspace_department_id);

-- -----------------------------------------------------------------------------
-- 12. position_prerequisites
-- -----------------------------------------------------------------------------

CREATE TABLE public.position_prerequisites (
  position_id uuid NOT NULL REFERENCES public.positions (id) ON DELETE CASCADE,
  prerequisite_position_id uuid NOT NULL REFERENCES public.positions (id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (position_id, prerequisite_position_id),
  CONSTRAINT position_prerequisites_no_self CHECK (position_id <> prerequisite_position_id)
);

COMMENT ON TABLE public.position_prerequisites IS
  'Position A requires qualification in position B. Self-prerequisites are forbidden. Cross-department prerequisites are allowed when both positions belong to the same church workspace (production teams share skills). Cross-workspace links are rejected by trigger. Cycles are not detected in M1.';

-- =============================================================================
-- Integrity triggers (immutable keys, same-workspace FKs)
-- =============================================================================

CREATE FUNCTION public.enforce_church_workspace_immutable_keys()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
  IF NEW.slug IS DISTINCT FROM OLD.slug THEN
    RAISE EXCEPTION 'church_workspaces.slug is immutable';
  END IF;
  IF NEW.production_os_key IS DISTINCT FROM OLD.production_os_key THEN
    RAISE EXCEPTION 'church_workspaces.production_os_key is immutable';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER church_workspaces_immutable_keys
  BEFORE UPDATE ON public.church_workspaces
  FOR EACH ROW
  EXECUTE FUNCTION public.enforce_church_workspace_immutable_keys();

CREATE FUNCTION public.enforce_workspace_department_immutable_keys()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
  IF NEW.workspace_id IS DISTINCT FROM OLD.workspace_id THEN
    RAISE EXCEPTION 'workspace_departments.workspace_id is immutable';
  END IF;
  IF NEW.department_key IS DISTINCT FROM OLD.department_key THEN
    RAISE EXCEPTION 'workspace_departments.department_key is immutable';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER workspace_departments_immutable_keys
  BEFORE UPDATE ON public.workspace_departments
  FOR EACH ROW
  EXECUTE FUNCTION public.enforce_workspace_department_immutable_keys();

CREATE FUNCTION public.enforce_team_membership_immutable_keys()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
  IF NEW.workspace_id IS DISTINCT FROM OLD.workspace_id OR NEW.user_id IS DISTINCT FROM OLD.user_id THEN
    RAISE EXCEPTION 'team_memberships workspace_id and user_id are immutable';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER team_memberships_immutable_keys
  BEFORE UPDATE ON public.team_memberships
  FOR EACH ROW
  EXECUTE FUNCTION public.enforce_team_membership_immutable_keys();

CREATE FUNCTION public.enforce_invitation_immutable_secrets()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
  IF NEW.token_hash IS DISTINCT FROM OLD.token_hash THEN
    RAISE EXCEPTION 'team_invitations.token_hash is immutable';
  END IF;
  IF NEW.email IS DISTINCT FROM OLD.email OR NEW.workspace_id IS DISTINCT FROM OLD.workspace_id THEN
    RAISE EXCEPTION 'team_invitations email and workspace_id are immutable';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER team_invitations_immutable_secrets
  BEFORE UPDATE ON public.team_invitations
  FOR EACH ROW
  EXECUTE FUNCTION public.enforce_invitation_immutable_secrets();

CREATE FUNCTION public.enforce_leadership_workspace_integrity()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $$
DECLARE
  mem_workspace uuid;
  dept_workspace uuid;
  actor_workspace uuid;
BEGIN
  SELECT m.workspace_id INTO STRICT mem_workspace
  FROM public.team_memberships m
  WHERE m.id = NEW.membership_id;

  IF NEW.workspace_department_id IS NOT NULL THEN
    SELECT d.workspace_id INTO STRICT dept_workspace
    FROM public.workspace_departments d
    WHERE d.id = NEW.workspace_department_id;

    IF dept_workspace IS DISTINCT FROM mem_workspace THEN
      RAISE EXCEPTION 'department is not in the membership workspace';
    END IF;
  END IF;

  IF NEW.appointed_by_membership_id IS NOT NULL THEN
    SELECT m.workspace_id INTO STRICT actor_workspace
    FROM public.team_memberships m
    WHERE m.id = NEW.appointed_by_membership_id;

    IF actor_workspace IS DISTINCT FROM mem_workspace THEN
      RAISE EXCEPTION 'appointed_by membership is not in the same workspace';
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER leadership_appointments_workspace_integrity
  BEFORE INSERT OR UPDATE ON public.leadership_appointments
  FOR EACH ROW
  EXECUTE FUNCTION public.enforce_leadership_workspace_integrity();

CREATE FUNCTION public.enforce_permission_grant_workspace_integrity()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $$
DECLARE
  mem_workspace uuid;
  dept_workspace uuid;
  actor_workspace uuid;
BEGIN
  SELECT m.workspace_id INTO STRICT mem_workspace
  FROM public.team_memberships m
  WHERE m.id = NEW.membership_id;

  IF NEW.workspace_department_id IS NOT NULL THEN
    SELECT d.workspace_id INTO STRICT dept_workspace
    FROM public.workspace_departments d
    WHERE d.id = NEW.workspace_department_id;

    IF dept_workspace IS DISTINCT FROM mem_workspace THEN
      RAISE EXCEPTION 'department is not in the membership workspace';
    END IF;
  END IF;

  IF NEW.granted_by_membership_id IS NOT NULL THEN
    SELECT m.workspace_id INTO STRICT actor_workspace
    FROM public.team_memberships m
    WHERE m.id = NEW.granted_by_membership_id;

    IF actor_workspace IS DISTINCT FROM mem_workspace THEN
      RAISE EXCEPTION 'granted_by membership is not in the same workspace';
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER permission_grants_workspace_integrity
  BEFORE INSERT OR UPDATE ON public.permission_grants
  FOR EACH ROW
  EXECUTE FUNCTION public.enforce_permission_grant_workspace_integrity();

CREATE FUNCTION public.enforce_department_assignment_workspace_integrity()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $$
DECLARE
  mem_workspace uuid;
  dept_workspace uuid;
BEGIN
  SELECT m.workspace_id INTO STRICT mem_workspace
  FROM public.team_memberships m
  WHERE m.id = NEW.membership_id;

  SELECT d.workspace_id INTO STRICT dept_workspace
  FROM public.workspace_departments d
  WHERE d.id = NEW.workspace_department_id;

  IF dept_workspace IS DISTINCT FROM mem_workspace THEN
    RAISE EXCEPTION 'department is not in the membership workspace';
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER department_assignments_workspace_integrity
  BEFORE INSERT OR UPDATE ON public.department_assignments
  FOR EACH ROW
  EXECUTE FUNCTION public.enforce_department_assignment_workspace_integrity();

CREATE FUNCTION public.enforce_invitation_workspace_integrity()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $$
DECLARE
  inviter_workspace uuid;
  dept_workspace uuid;
BEGIN
  SELECT m.workspace_id INTO STRICT inviter_workspace
  FROM public.team_memberships m
  WHERE m.id = NEW.invited_by_membership_id;

  IF inviter_workspace IS DISTINCT FROM NEW.workspace_id THEN
    RAISE EXCEPTION 'invited_by membership is not in the invitation workspace';
  END IF;

  IF NEW.intended_leadership_department_id IS NOT NULL THEN
    SELECT d.workspace_id INTO STRICT dept_workspace
    FROM public.workspace_departments d
    WHERE d.id = NEW.intended_leadership_department_id;

    IF dept_workspace IS DISTINCT FROM NEW.workspace_id THEN
      RAISE EXCEPTION 'intended leadership department is not in the invitation workspace';
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER team_invitations_workspace_integrity
  BEFORE INSERT OR UPDATE ON public.team_invitations
  FOR EACH ROW
  EXECUTE FUNCTION public.enforce_invitation_workspace_integrity();

CREATE FUNCTION public.enforce_invitation_department_workspace()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $$
DECLARE
  invite_workspace uuid;
  dept_workspace uuid;
BEGIN
  SELECT i.workspace_id INTO STRICT invite_workspace
  FROM public.team_invitations i
  WHERE i.id = NEW.invitation_id;

  SELECT d.workspace_id INTO STRICT dept_workspace
  FROM public.workspace_departments d
  WHERE d.id = NEW.workspace_department_id;

  IF dept_workspace IS DISTINCT FROM invite_workspace THEN
    RAISE EXCEPTION 'invitation department is not in the invitation workspace';
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER team_invitation_departments_workspace
  BEFORE INSERT OR UPDATE ON public.team_invitation_departments
  FOR EACH ROW
  EXECUTE FUNCTION public.enforce_invitation_department_workspace();

CREATE FUNCTION public.enforce_invitation_permission_workspace()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $$
DECLARE
  invite_workspace uuid;
  dept_workspace uuid;
BEGIN
  SELECT i.workspace_id INTO STRICT invite_workspace
  FROM public.team_invitations i
  WHERE i.id = NEW.invitation_id;

  IF NEW.workspace_department_id IS NOT NULL THEN
    SELECT d.workspace_id INTO STRICT dept_workspace
    FROM public.workspace_departments d
    WHERE d.id = NEW.workspace_department_id;

    IF dept_workspace IS DISTINCT FROM invite_workspace THEN
      RAISE EXCEPTION 'invitation permission department is not in the invitation workspace';
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER team_invitation_permissions_workspace
  BEFORE INSERT OR UPDATE ON public.team_invitation_permissions
  FOR EACH ROW
  EXECUTE FUNCTION public.enforce_invitation_permission_workspace();

CREATE FUNCTION public.enforce_position_prerequisite_workspace()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $$
DECLARE
  position_workspace uuid;
  prereq_workspace uuid;
BEGIN
  SELECT d.workspace_id INTO STRICT position_workspace
  FROM public.positions p
  JOIN public.workspace_departments d ON d.id = p.workspace_department_id
  WHERE p.id = NEW.position_id;

  SELECT d.workspace_id INTO STRICT prereq_workspace
  FROM public.positions p
  JOIN public.workspace_departments d ON d.id = p.workspace_department_id
  WHERE p.id = NEW.prerequisite_position_id;

  IF position_workspace IS DISTINCT FROM prereq_workspace THEN
    RAISE EXCEPTION 'position prerequisites must stay inside the same workspace';
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER position_prerequisites_workspace
  BEFORE INSERT OR UPDATE ON public.position_prerequisites
  FOR EACH ROW
  EXECUTE FUNCTION public.enforce_position_prerequisite_workspace();

CREATE FUNCTION public.enforce_permission_grant_immutable_keys()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
  IF NEW.membership_id IS DISTINCT FROM OLD.membership_id
     OR NEW.permission_key IS DISTINCT FROM OLD.permission_key
     OR NEW.granted_by_membership_id IS DISTINCT FROM OLD.granted_by_membership_id
     OR NEW.granted_at IS DISTINCT FROM OLD.granted_at THEN
    RAISE EXCEPTION 'permission_grants may only update revoked_at (and department scope is immutable)';
  END IF;
  IF NEW.workspace_department_id IS DISTINCT FROM OLD.workspace_department_id THEN
    RAISE EXCEPTION 'permission_grants.workspace_department_id is immutable';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER permission_grants_immutable_keys
  BEFORE UPDATE ON public.permission_grants
  FOR EACH ROW
  EXECUTE FUNCTION public.enforce_permission_grant_immutable_keys();

CREATE FUNCTION public.enforce_leadership_immutable_keys()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
  IF NEW.membership_id IS DISTINCT FROM OLD.membership_id
     OR NEW.role_key IS DISTINCT FROM OLD.role_key
     OR NEW.workspace_department_id IS DISTINCT FROM OLD.workspace_department_id
     OR NEW.appointed_by_membership_id IS DISTINCT FROM OLD.appointed_by_membership_id
     OR NEW.appointed_at IS DISTINCT FROM OLD.appointed_at THEN
    RAISE EXCEPTION 'leadership_appointments may only update removed_at';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER leadership_appointments_immutable_keys
  BEFORE UPDATE ON public.leadership_appointments
  FOR EACH ROW
  EXECUTE FUNCTION public.enforce_leadership_immutable_keys();

CREATE FUNCTION public.enforce_position_immutable_department()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
  IF NEW.workspace_department_id IS DISTINCT FROM OLD.workspace_department_id THEN
    RAISE EXCEPTION 'positions.workspace_department_id is immutable';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER positions_immutable_department
  BEFORE UPDATE ON public.positions
  FOR EACH ROW
  EXECUTE FUNCTION public.enforce_position_immutable_department();

-- =============================================================================
-- Auth signup profile bootstrap
-- =============================================================================

CREATE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- Insert the person row only. Do not copy raw_user_meta_data, email, or
  -- avatar URLs from Auth metadata (untrusted / easy to stuff).
  INSERT INTO public.profiles (id)
  VALUES (NEW.id)
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

COMMENT ON FUNCTION public.handle_new_user() IS
  'SECURITY DEFINER bootstrap: create a profiles row with nullable names on auth.users INSERT. Does not copy Auth metadata.';

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- =============================================================================
-- RLS helpers (schema private — not Data API / RPC)
-- SECURITY DEFINER + empty search_path + schema-qualified names.
-- Query base tables directly so policies never recurse through RLS.
-- Leadership helpers never grant software capabilities.
-- =============================================================================

CREATE FUNCTION private.has_active_membership(p_workspace_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.team_memberships m
    WHERE m.workspace_id = p_workspace_id
      AND m.user_id = auth.uid()
      AND m.status = 'active'
  );
$$;

COMMENT ON FUNCTION private.has_active_membership(uuid) IS
  'True when the current Auth user has an active membership in the workspace. This is Volunteer access. Invited/inactive/archived fail closed.';

CREATE FUNCTION private.membership_workspace_id(p_membership_id uuid)
RETURNS uuid
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT m.workspace_id
  FROM public.team_memberships m
  WHERE m.id = p_membership_id;
$$;

CREATE FUNCTION private.membership_belongs_to_auth_user(p_membership_id uuid)
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
      AND m.user_id = auth.uid()
  );
$$;

CREATE FUNCTION private.department_workspace_id(p_department_id uuid)
RETURNS uuid
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT d.workspace_id
  FROM public.workspace_departments d
  WHERE d.id = p_department_id;
$$;

CREATE FUNCTION private.position_workspace_id(p_position_id uuid)
RETURNS uuid
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT d.workspace_id
  FROM public.positions p
  JOIN public.workspace_departments d ON d.id = p.workspace_department_id
  WHERE p.id = p_position_id;
$$;

CREATE FUNCTION private.position_department_id(p_position_id uuid)
RETURNS uuid
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT p.workspace_department_id
  FROM public.positions p
  WHERE p.id = p_position_id;
$$;

CREATE FUNCTION private.invitation_workspace_id(p_invitation_id uuid)
RETURNS uuid
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT i.workspace_id
  FROM public.team_invitations i
  WHERE i.id = p_invitation_id;
$$;

CREATE FUNCTION private.shares_active_workspace_with(p_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.team_memberships mine
    JOIN public.team_memberships theirs
      ON theirs.workspace_id = mine.workspace_id
    WHERE mine.user_id = auth.uid()
      AND mine.status = 'active'
      AND theirs.user_id = p_user_id
      AND theirs.status = 'active'
  );
$$;

CREATE FUNCTION private.has_permission(
  p_workspace_id uuid,
  p_permission public.permission_key,
  p_department_id uuid DEFAULT NULL
)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.team_memberships m
    JOIN public.permission_grants g ON g.membership_id = m.id
    WHERE m.workspace_id = p_workspace_id
      AND m.user_id = auth.uid()
      AND m.status = 'active'
      AND g.permission_key = p_permission
      AND g.revoked_at IS NULL
      AND (
        g.workspace_department_id IS NULL
        OR (
          p_department_id IS NOT NULL
          AND g.workspace_department_id = p_department_id
        )
      )
  );
$$;

COMMENT ON FUNCTION private.has_permission(uuid, public.permission_key, uuid) IS
  'Explicit permission_grants only. Does not consult leadership_appointments. A workspace-wide grant (department NULL) satisfies a department-scoped check — including department_editor NULL = all departments. A department-scoped grant does not satisfy a workspace-wide check.';

CREATE FUNCTION private.has_leadership_appointment(
  p_workspace_id uuid,
  p_role public.leadership_role_key,
  p_department_id uuid DEFAULT NULL
)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.team_memberships m
    JOIN public.leadership_appointments a ON a.membership_id = m.id
    WHERE m.workspace_id = p_workspace_id
      AND m.user_id = auth.uid()
      AND m.status = 'active'
      AND a.role_key = p_role
      AND a.removed_at IS NULL
      AND (
        (p_role = 'production_overseer' AND a.workspace_department_id IS NULL)
        OR (
          p_role = 'department_overseer'
          AND p_department_id IS NOT NULL
          AND a.workspace_department_id = p_department_id
        )
      )
  );
$$;

COMMENT ON FUNCTION private.has_leadership_appointment(uuid, public.leadership_role_key, uuid) IS
  'Church office lookup only. Not granted to authenticated (unused by M1 RLS writes). Must not authorize software writes. Leadership does not imply trainer, scheduler, department_editor, admin, or builder.';

CREATE FUNCTION private.active_membership_id(p_workspace_id uuid)
RETURNS uuid
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT m.id
  FROM public.team_memberships m
  WHERE m.workspace_id = p_workspace_id
    AND m.user_id = auth.uid()
    AND m.status = 'active'
  LIMIT 1;
$$;

-- =============================================================================
-- Row Level Security
-- =============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.church_workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspace_departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_invitation_departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_invitation_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leadership_appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.permission_grants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.department_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.positions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.position_prerequisites ENABLE ROW LEVEL SECURITY;

-- profiles
CREATE POLICY profiles_select_self_or_teammate
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (
    id = auth.uid()
    OR private.shares_active_workspace_with(id)
  );

CREATE POLICY profiles_update_self
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- church_workspaces
CREATE POLICY church_workspaces_select_member
  ON public.church_workspaces
  FOR SELECT
  TO authenticated
  USING (private.has_active_membership(id));

CREATE POLICY church_workspaces_update_admin
  ON public.church_workspaces
  FOR UPDATE
  TO authenticated
  USING (private.has_permission(id, 'admin'))
  WITH CHECK (private.has_permission(id, 'admin'));

-- workspace_departments
CREATE POLICY workspace_departments_select_member
  ON public.workspace_departments
  FOR SELECT
  TO authenticated
  USING (private.has_active_membership(workspace_id));

CREATE POLICY workspace_departments_insert_admin_builder
  ON public.workspace_departments
  FOR INSERT
  TO authenticated
  WITH CHECK (
    private.has_permission(workspace_id, 'admin')
    OR private.has_permission(workspace_id, 'builder')
  );

CREATE POLICY workspace_departments_update_admin_builder
  ON public.workspace_departments
  FOR UPDATE
  TO authenticated
  USING (
    private.has_permission(workspace_id, 'admin')
    OR private.has_permission(workspace_id, 'builder')
  )
  WITH CHECK (
    private.has_permission(workspace_id, 'admin')
    OR private.has_permission(workspace_id, 'builder')
  );

-- team_memberships
-- SELF: own row at any status (invited/active/inactive/archived).
-- ACTIVE VOLUNTEER: other rows only when the target is ACTIVE in a workspace
--   where the caller also has an active membership. No inactive/archived peers.
-- ADMIN: full membership history in that workspace.
CREATE POLICY team_memberships_select_self
  ON public.team_memberships
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY team_memberships_select_active_peers
  ON public.team_memberships
  FOR SELECT
  TO authenticated
  USING (
    user_id IS DISTINCT FROM auth.uid()
    AND status = 'active'
    AND private.has_active_membership(workspace_id)
  );

CREATE POLICY team_memberships_select_admin_history
  ON public.team_memberships
  FOR SELECT
  TO authenticated
  USING (private.has_permission(workspace_id, 'admin'));

CREATE POLICY team_memberships_update_admin_not_self
  ON public.team_memberships
  FOR UPDATE
  TO authenticated
  USING (
    private.has_permission(workspace_id, 'admin')
    AND user_id IS DISTINCT FROM auth.uid()
  )
  WITH CHECK (
    private.has_permission(workspace_id, 'admin')
    AND user_id IS DISTINCT FROM auth.uid()
  );

-- team_invitations (admin only; token_hash withheld by GRANT)
CREATE POLICY team_invitations_select_admin
  ON public.team_invitations
  FOR SELECT
  TO authenticated
  USING (private.has_permission(workspace_id, 'admin'));

CREATE POLICY team_invitations_insert_admin
  ON public.team_invitations
  FOR INSERT
  TO authenticated
  WITH CHECK (
    private.has_permission(workspace_id, 'admin')
    AND private.membership_belongs_to_auth_user(invited_by_membership_id)
    AND private.active_membership_id(workspace_id) = invited_by_membership_id
  );

CREATE POLICY team_invitations_update_admin
  ON public.team_invitations
  FOR UPDATE
  TO authenticated
  USING (private.has_permission(workspace_id, 'admin'))
  WITH CHECK (private.has_permission(workspace_id, 'admin'));

CREATE POLICY team_invitation_departments_select_admin
  ON public.team_invitation_departments
  FOR SELECT
  TO authenticated
  USING (private.has_permission(private.invitation_workspace_id(invitation_id), 'admin'));

CREATE POLICY team_invitation_departments_insert_admin
  ON public.team_invitation_departments
  FOR INSERT
  TO authenticated
  WITH CHECK (private.has_permission(private.invitation_workspace_id(invitation_id), 'admin'));

CREATE POLICY team_invitation_departments_delete_admin
  ON public.team_invitation_departments
  FOR DELETE
  TO authenticated
  USING (private.has_permission(private.invitation_workspace_id(invitation_id), 'admin'));

CREATE POLICY team_invitation_permissions_select_admin
  ON public.team_invitation_permissions
  FOR SELECT
  TO authenticated
  USING (private.has_permission(private.invitation_workspace_id(invitation_id), 'admin'));

CREATE POLICY team_invitation_permissions_insert_admin
  ON public.team_invitation_permissions
  FOR INSERT
  TO authenticated
  WITH CHECK (private.has_permission(private.invitation_workspace_id(invitation_id), 'admin'));

CREATE POLICY team_invitation_permissions_delete_admin
  ON public.team_invitation_permissions
  FOR DELETE
  TO authenticated
  USING (private.has_permission(private.invitation_workspace_id(invitation_id), 'admin'));

-- leadership_appointments
-- Ordinary active members: CURRENT appointments only (removed_at IS NULL).
-- SELF: own rows including removed history.
-- ADMIN: full appointment history.
-- Multiple active Overseers remain allowed. Leadership grants no software keys.
CREATE POLICY leadership_appointments_select_self
  ON public.leadership_appointments
  FOR SELECT
  TO authenticated
  USING (private.membership_belongs_to_auth_user(membership_id));

CREATE POLICY leadership_appointments_select_current_for_members
  ON public.leadership_appointments
  FOR SELECT
  TO authenticated
  USING (
    removed_at IS NULL
    AND private.has_active_membership(private.membership_workspace_id(membership_id))
  );

CREATE POLICY leadership_appointments_select_admin_history
  ON public.leadership_appointments
  FOR SELECT
  TO authenticated
  USING (
    private.has_permission(private.membership_workspace_id(membership_id), 'admin')
  );

CREATE POLICY leadership_appointments_insert_admin_not_self
  ON public.leadership_appointments
  FOR INSERT
  TO authenticated
  WITH CHECK (
    private.has_permission(private.membership_workspace_id(membership_id), 'admin')
    AND private.membership_belongs_to_auth_user(appointed_by_membership_id)
    AND private.active_membership_id(private.membership_workspace_id(membership_id))
      = appointed_by_membership_id
    AND NOT private.membership_belongs_to_auth_user(membership_id)
  );

CREATE POLICY leadership_appointments_update_admin_not_self
  ON public.leadership_appointments
  FOR UPDATE
  TO authenticated
  USING (
    private.has_permission(private.membership_workspace_id(membership_id), 'admin')
    AND NOT private.membership_belongs_to_auth_user(membership_id)
  )
  WITH CHECK (
    private.has_permission(private.membership_workspace_id(membership_id), 'admin')
    AND NOT private.membership_belongs_to_auth_user(membership_id)
  );

-- permission_grants
CREATE POLICY permission_grants_select_own_or_admin
  ON public.permission_grants
  FOR SELECT
  TO authenticated
  USING (
    private.membership_belongs_to_auth_user(membership_id)
    OR private.has_permission(private.membership_workspace_id(membership_id), 'admin')
  );

CREATE POLICY permission_grants_insert_admin_not_self
  ON public.permission_grants
  FOR INSERT
  TO authenticated
  WITH CHECK (
    private.has_permission(private.membership_workspace_id(membership_id), 'admin')
    AND private.membership_belongs_to_auth_user(granted_by_membership_id)
    AND private.active_membership_id(private.membership_workspace_id(membership_id))
      = granted_by_membership_id
    AND NOT private.membership_belongs_to_auth_user(membership_id)
  );

CREATE POLICY permission_grants_update_admin_not_self
  ON public.permission_grants
  FOR UPDATE
  TO authenticated
  USING (
    private.has_permission(private.membership_workspace_id(membership_id), 'admin')
    AND NOT private.membership_belongs_to_auth_user(membership_id)
  )
  WITH CHECK (
    private.has_permission(private.membership_workspace_id(membership_id), 'admin')
    AND NOT private.membership_belongs_to_auth_user(membership_id)
  );

-- department_assignments
CREATE POLICY department_assignments_select_own_or_scoped
  ON public.department_assignments
  FOR SELECT
  TO authenticated
  USING (
    private.membership_belongs_to_auth_user(membership_id)
    OR private.has_permission(private.membership_workspace_id(membership_id), 'admin')
    OR private.has_permission(
      private.membership_workspace_id(membership_id),
      'department_editor',
      workspace_department_id
    )
    OR private.has_permission(
      private.membership_workspace_id(membership_id),
      'trainer',
      workspace_department_id
    )
  );

CREATE POLICY department_assignments_insert_admin_or_editor
  ON public.department_assignments
  FOR INSERT
  TO authenticated
  WITH CHECK (
    private.has_permission(private.membership_workspace_id(membership_id), 'admin')
    OR private.has_permission(
      private.membership_workspace_id(membership_id),
      'department_editor',
      workspace_department_id
    )
  );

CREATE POLICY department_assignments_update_admin_or_editor
  ON public.department_assignments
  FOR UPDATE
  TO authenticated
  USING (
    private.has_permission(private.membership_workspace_id(membership_id), 'admin')
    OR private.has_permission(
      private.membership_workspace_id(membership_id),
      'department_editor',
      workspace_department_id
    )
  )
  WITH CHECK (
    private.has_permission(private.membership_workspace_id(membership_id), 'admin')
    OR private.has_permission(
      private.membership_workspace_id(membership_id),
      'department_editor',
      workspace_department_id
    )
  );

-- positions
CREATE POLICY positions_select_member
  ON public.positions
  FOR SELECT
  TO authenticated
  USING (
    private.has_active_membership(private.department_workspace_id(workspace_department_id))
    AND (
      is_active
      OR private.has_permission(private.department_workspace_id(workspace_department_id), 'admin')
      OR private.has_permission(private.department_workspace_id(workspace_department_id), 'builder')
      OR private.has_permission(
        private.department_workspace_id(workspace_department_id),
        'department_editor',
        workspace_department_id
      )
    )
  );

CREATE POLICY positions_insert_admin_builder_editor
  ON public.positions
  FOR INSERT
  TO authenticated
  WITH CHECK (
    private.has_permission(private.department_workspace_id(workspace_department_id), 'admin')
    OR private.has_permission(private.department_workspace_id(workspace_department_id), 'builder')
    OR private.has_permission(
      private.department_workspace_id(workspace_department_id),
      'department_editor',
      workspace_department_id
    )
  );

CREATE POLICY positions_update_admin_builder_editor
  ON public.positions
  FOR UPDATE
  TO authenticated
  USING (
    private.has_permission(private.department_workspace_id(workspace_department_id), 'admin')
    OR private.has_permission(private.department_workspace_id(workspace_department_id), 'builder')
    OR private.has_permission(
      private.department_workspace_id(workspace_department_id),
      'department_editor',
      workspace_department_id
    )
  )
  WITH CHECK (
    private.has_permission(private.department_workspace_id(workspace_department_id), 'admin')
    OR private.has_permission(private.department_workspace_id(workspace_department_id), 'builder')
    OR private.has_permission(
      private.department_workspace_id(workspace_department_id),
      'department_editor',
      workspace_department_id
    )
  );

-- position_prerequisites
CREATE POLICY position_prerequisites_select_member
  ON public.position_prerequisites
  FOR SELECT
  TO authenticated
  USING (private.has_active_membership(private.position_workspace_id(position_id)));

CREATE POLICY position_prerequisites_insert_admin_builder_editor
  ON public.position_prerequisites
  FOR INSERT
  TO authenticated
  WITH CHECK (
    private.has_permission(private.position_workspace_id(position_id), 'admin')
    OR private.has_permission(private.position_workspace_id(position_id), 'builder')
    OR private.has_permission(
      private.position_workspace_id(position_id),
      'department_editor',
      private.position_department_id(position_id)
    )
  );

CREATE POLICY position_prerequisites_delete_admin_builder_editor
  ON public.position_prerequisites
  FOR DELETE
  TO authenticated
  USING (
    private.has_permission(private.position_workspace_id(position_id), 'admin')
    OR private.has_permission(private.position_workspace_id(position_id), 'builder')
    OR private.has_permission(
      private.position_workspace_id(position_id),
      'department_editor',
      private.position_department_id(position_id)
    )
  );

-- =============================================================================
-- Privileges
-- Fail closed: anon gets nothing. authenticated gets least privilege.
-- service_role keeps full access for Phase 4E SQL/bootstrap.
-- =============================================================================

REVOKE ALL ON FUNCTION public.set_updated_at() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.enforce_church_workspace_immutable_keys() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.enforce_workspace_department_immutable_keys() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.enforce_team_membership_immutable_keys() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.enforce_invitation_immutable_secrets() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.enforce_leadership_workspace_integrity() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.enforce_permission_grant_workspace_integrity() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.enforce_department_assignment_workspace_integrity() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.enforce_invitation_workspace_integrity() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.enforce_invitation_department_workspace() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.enforce_invitation_permission_workspace() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.enforce_position_prerequisite_workspace() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.enforce_permission_grant_immutable_keys() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.enforce_leadership_immutable_keys() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.enforce_position_immutable_department() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;

REVOKE ALL ON FUNCTION private.has_active_membership(uuid) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION private.membership_workspace_id(uuid) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION private.membership_belongs_to_auth_user(uuid) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION private.department_workspace_id(uuid) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION private.position_workspace_id(uuid) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION private.position_department_id(uuid) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION private.invitation_workspace_id(uuid) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION private.shares_active_workspace_with(uuid) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION private.has_permission(uuid, public.permission_key, uuid) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION private.has_leadership_appointment(uuid, public.leadership_role_key, uuid) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION private.active_membership_id(uuid) FROM PUBLIC, anon;

-- EXECUTE only where RLS policies invoke the helper. ID-returning helpers are
-- not Data API RPCs (schema private is not exposed). has_leadership_appointment
-- is unused by M1 policies and is not granted to authenticated.
GRANT EXECUTE ON FUNCTION private.has_active_membership(uuid) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION private.has_permission(uuid, public.permission_key, uuid) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION private.shares_active_workspace_with(uuid) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION private.active_membership_id(uuid) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION private.membership_workspace_id(uuid) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION private.membership_belongs_to_auth_user(uuid) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION private.department_workspace_id(uuid) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION private.position_workspace_id(uuid) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION private.position_department_id(uuid) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION private.invitation_workspace_id(uuid) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION private.has_leadership_appointment(uuid, public.leadership_role_key, uuid) TO service_role;

GRANT USAGE ON TYPE public.membership_status TO authenticated, service_role;
GRANT USAGE ON TYPE public.invitation_status TO authenticated, service_role;
GRANT USAGE ON TYPE public.permission_key TO authenticated, service_role;
GRANT USAGE ON TYPE public.leadership_role_key TO authenticated, service_role;
GRANT USAGE ON TYPE public.department_source TO authenticated, service_role;
GRANT USAGE ON TYPE public.department_growth_level TO authenticated, service_role;

REVOKE ALL ON TABLE public.profiles FROM PUBLIC, anon, authenticated;
REVOKE ALL ON TABLE public.church_workspaces FROM PUBLIC, anon, authenticated;
REVOKE ALL ON TABLE public.workspace_departments FROM PUBLIC, anon, authenticated;
REVOKE ALL ON TABLE public.team_invitations FROM PUBLIC, anon, authenticated;
REVOKE ALL ON TABLE public.team_invitation_departments FROM PUBLIC, anon, authenticated;
REVOKE ALL ON TABLE public.team_invitation_permissions FROM PUBLIC, anon, authenticated;
REVOKE ALL ON TABLE public.team_memberships FROM PUBLIC, anon, authenticated;
REVOKE ALL ON TABLE public.leadership_appointments FROM PUBLIC, anon, authenticated;
REVOKE ALL ON TABLE public.permission_grants FROM PUBLIC, anon, authenticated;
REVOKE ALL ON TABLE public.department_assignments FROM PUBLIC, anon, authenticated;
REVOKE ALL ON TABLE public.positions FROM PUBLIC, anon, authenticated;
REVOKE ALL ON TABLE public.position_prerequisites FROM PUBLIC, anon, authenticated;

GRANT SELECT, UPDATE (display_name, first_name, last_name, avatar_url) ON TABLE public.profiles TO authenticated;
GRANT SELECT, UPDATE ON TABLE public.church_workspaces TO authenticated;
GRANT SELECT, INSERT, UPDATE ON TABLE public.workspace_departments TO authenticated;
GRANT SELECT, UPDATE ON TABLE public.team_memberships TO authenticated;
GRANT SELECT, INSERT, UPDATE ON TABLE public.leadership_appointments TO authenticated;
GRANT SELECT, INSERT, UPDATE ON TABLE public.permission_grants TO authenticated;
GRANT SELECT, INSERT, UPDATE ON TABLE public.department_assignments TO authenticated;
GRANT SELECT, INSERT, UPDATE ON TABLE public.positions TO authenticated;
GRANT SELECT, INSERT, DELETE ON TABLE public.position_prerequisites TO authenticated;
GRANT SELECT, INSERT, DELETE ON TABLE public.team_invitation_departments TO authenticated;
GRANT SELECT, INSERT, DELETE ON TABLE public.team_invitation_permissions TO authenticated;

GRANT INSERT, UPDATE ON TABLE public.team_invitations TO authenticated;
GRANT SELECT (
  id,
  workspace_id,
  email,
  invited_by_membership_id,
  expires_at,
  status,
  accepted_user_id,
  accepted_at,
  intended_leadership_role,
  intended_leadership_department_id,
  created_at,
  updated_at
) ON TABLE public.team_invitations TO authenticated;

GRANT ALL ON TABLE public.profiles TO service_role;
GRANT ALL ON TABLE public.church_workspaces TO service_role;
GRANT ALL ON TABLE public.workspace_departments TO service_role;
GRANT ALL ON TABLE public.team_invitations TO service_role;
GRANT ALL ON TABLE public.team_invitation_departments TO service_role;
GRANT ALL ON TABLE public.team_invitation_permissions TO service_role;
GRANT ALL ON TABLE public.team_memberships TO service_role;
GRANT ALL ON TABLE public.leadership_appointments TO service_role;
GRANT ALL ON TABLE public.permission_grants TO service_role;
GRANT ALL ON TABLE public.department_assignments TO service_role;
GRANT ALL ON TABLE public.positions TO service_role;
GRANT ALL ON TABLE public.position_prerequisites TO service_role;
