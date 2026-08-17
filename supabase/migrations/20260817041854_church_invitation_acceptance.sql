-- =============================================================================
-- PRODUCTION OS PHASE 4H-B — Migration 4 (Security Revision 2)
-- Secure church invitation preview, acceptance, Admin revoke, and INSERT integrity
--
-- Public SECURITY INVOKER wrappers (Data API) call private SECURITY DEFINER
-- helpers. Schema private is NOT in api.schemas and MUST NEVER be added.
-- INVOKER wrappers require the exact helper EXECUTE grants below; exposing
-- private through the Data API would turn those helpers into direct RPCs.
--
-- No table redesign. Invitation child tables keep schema; authenticated
-- INSERT/DELETE on them is revoked until a later product phase.
-- No membership INSERT grant.
-- No explicit service_role EXECUTE on invitation RPCs or their private helpers.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- Result contracts (stable, minimal, no internals)
-- -----------------------------------------------------------------------------

CREATE TYPE public.invitation_preview_result AS (
  state text,
  workspace_name text
);

CREATE TYPE public.invitation_accept_result AS (
  outcome text,
  workspace_name text
);

CREATE TYPE public.invitation_revoke_result AS (
  outcome text
);

COMMENT ON TYPE public.invitation_preview_result IS
  'Preview contract: state in (valid, expired, revoked, accepted, invalid). workspace_name only when a matching invitation row exists.';

COMMENT ON TYPE public.invitation_accept_result IS
  'Accept contract: outcome in (joined, already_member, reactivated, expired, revoked, wrong_account, unverified, archived, blocked, invalid, unauthenticated). workspace_name only when an invitation row was found and is safe to name.';

COMMENT ON TYPE public.invitation_revoke_result IS
  'Revoke contract: outcome in (revoked, not_pending, not_found, unauthorized). Never returns token_hash, email, or IDs.';

REVOKE ALL ON TYPE public.invitation_preview_result FROM PUBLIC, anon, authenticated, service_role;
REVOKE ALL ON TYPE public.invitation_accept_result FROM PUBLIC, anon, authenticated, service_role;
REVOKE ALL ON TYPE public.invitation_revoke_result FROM PUBLIC, anon, authenticated, service_role;
GRANT USAGE ON TYPE public.invitation_preview_result TO anon, authenticated;
GRANT USAGE ON TYPE public.invitation_accept_result TO authenticated;
GRANT USAGE ON TYPE public.invitation_revoke_result TO authenticated;

-- -----------------------------------------------------------------------------
-- Remove ordinary authenticated UPDATE on team_invitations.
-- Acceptance and revoke go through RPCs only. Keep Admin SELECT + INSERT.
-- -----------------------------------------------------------------------------

DROP POLICY IF EXISTS team_invitations_update_admin ON public.team_invitations;

REVOKE UPDATE ON TABLE public.team_invitations FROM authenticated;

-- -----------------------------------------------------------------------------
-- Child tables unused in v1: remove authenticated mutation until a later phase
-- restores it. Keep Admin SELECT. Do not drop or redesign the tables.
-- -----------------------------------------------------------------------------

DROP POLICY IF EXISTS team_invitation_departments_insert_admin
  ON public.team_invitation_departments;
DROP POLICY IF EXISTS team_invitation_departments_delete_admin
  ON public.team_invitation_departments;
DROP POLICY IF EXISTS team_invitation_permissions_insert_admin
  ON public.team_invitation_permissions;
DROP POLICY IF EXISTS team_invitation_permissions_delete_admin
  ON public.team_invitation_permissions;

REVOKE INSERT, DELETE ON TABLE public.team_invitation_departments FROM authenticated;
REVOKE INSERT, DELETE ON TABLE public.team_invitation_permissions FROM authenticated;

COMMENT ON TABLE public.team_invitation_departments IS
  'Intended invitation departments. Unused in v1 acceptance. Authenticated mutation revoked until a later product phase restores INSERT/DELETE.';

COMMENT ON TABLE public.team_invitation_permissions IS
  'Intended invitation permissions. Unused in v1 acceptance. Authenticated mutation revoked until a later product phase restores INSERT/DELETE.';

COMMENT ON TABLE public.team_invitations IS
  'Pre-account invite. Stores SHA-256 token_hash only — never a plaintext token. Authenticated has SELECT (Admin policy, token_hash withheld) and INSERT (Admin policy). No authenticated UPDATE or DELETE. INSERT is pending/unaccepted/no leadership only; database owns created_at, updated_at, and expires_at = created_at + 7 days. pending → accepted only via public.accept_team_invitation. pending → revoked only via public.revoke_team_invitation. pending → expired only via accept when expires_at <= now().';

COMMENT ON COLUMN public.team_invitations.expires_at IS
  'Set only by BEFORE INSERT integrity: created_at + 7 days. Immutable after INSERT. Accept treats expires_at <= now() as expired even if status is still pending.';

-- -----------------------------------------------------------------------------
-- INSERT integrity: fail closed on lifecycle/leadership input.
-- Database owns created_at, updated_at, and 7-day expires_at.
-- Existing team_invitations_set_updated_at remains BEFORE UPDATE only.
-- -----------------------------------------------------------------------------

CREATE FUNCTION public.enforce_invitation_insert_integrity()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
  IF NEW.status IS DISTINCT FROM 'pending' THEN
    RAISE EXCEPTION 'team_invitations insert requires status pending';
  END IF;

  IF NEW.accepted_user_id IS NOT NULL OR NEW.accepted_at IS NOT NULL THEN
    RAISE EXCEPTION 'team_invitations insert cannot set acceptance metadata';
  END IF;

  IF NEW.intended_leadership_role IS NOT NULL
     OR NEW.intended_leadership_department_id IS NOT NULL THEN
    RAISE EXCEPTION 'team_invitations insert cannot set intended leadership';
  END IF;

  NEW.created_at := now();
  NEW.updated_at := now();
  NEW.expires_at := NEW.created_at + interval '7 days';

  RETURN NEW;
END;
$$;

COMMENT ON FUNCTION public.enforce_invitation_insert_integrity() IS
  'Fail-closed INSERT: status must be pending; accepted_user_id/accepted_at and intended leadership must be NULL. Overwrites created_at/updated_at/expires_at so the client cannot choose lifetime. Does not coerce terminal status to pending.';

CREATE TRIGGER team_invitations_insert_integrity
  BEFORE INSERT ON public.team_invitations
  FOR EACH ROW
  EXECUTE FUNCTION public.enforce_invitation_insert_integrity();

REVOKE ALL ON FUNCTION public.enforce_invitation_insert_integrity()
  FROM PUBLIC, anon, authenticated, service_role;

-- -----------------------------------------------------------------------------
-- Identity immutability (extends Migration 1 secrets trigger)
-- token_hash, email, workspace_id already locked. Also lock issuer, created_at,
-- and expires_at so historical invitations cannot be rewritten.
-- -----------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.enforce_invitation_immutable_secrets()
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
  IF NEW.invited_by_membership_id IS DISTINCT FROM OLD.invited_by_membership_id THEN
    RAISE EXCEPTION 'team_invitations.invited_by_membership_id is immutable';
  END IF;
  IF NEW.created_at IS DISTINCT FROM OLD.created_at THEN
    RAISE EXCEPTION 'team_invitations.created_at is immutable';
  END IF;
  IF NEW.expires_at IS DISTINCT FROM OLD.expires_at THEN
    RAISE EXCEPTION 'team_invitations.expires_at is immutable';
  END IF;
  RETURN NEW;
END;
$$;

COMMENT ON FUNCTION public.enforce_invitation_immutable_secrets() IS
  'Locks token_hash, email, workspace_id, invited_by_membership_id, created_at, and expires_at. expires_at is chosen at INSERT; expiry changes status only.';

-- -----------------------------------------------------------------------------
-- Status machine: pending may move once to a terminal state.
-- accepted / expired / revoked are historical and cannot be rewritten.
-- updated_at may be stamped by set_updated_at on a legitimate transition.
-- -----------------------------------------------------------------------------

CREATE FUNCTION public.enforce_invitation_status_transition()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
  IF NEW.id IS DISTINCT FROM OLD.id
     OR NEW.workspace_id IS DISTINCT FROM OLD.workspace_id
     OR NEW.email IS DISTINCT FROM OLD.email
     OR NEW.invited_by_membership_id IS DISTINCT FROM OLD.invited_by_membership_id
     OR NEW.token_hash IS DISTINCT FROM OLD.token_hash
     OR NEW.expires_at IS DISTINCT FROM OLD.expires_at
     OR NEW.created_at IS DISTINCT FROM OLD.created_at
     OR NEW.intended_leadership_role IS DISTINCT FROM OLD.intended_leadership_role
     OR NEW.intended_leadership_department_id IS DISTINCT FROM OLD.intended_leadership_department_id
  THEN
    RAISE EXCEPTION 'team_invitations historical fields are immutable';
  END IF;

  IF OLD.status IN ('accepted', 'expired', 'revoked') THEN
    RAISE EXCEPTION 'team_invitations terminal status is immutable';
  END IF;

  IF OLD.status IS DISTINCT FROM 'pending' THEN
    RAISE EXCEPTION 'team_invitations status transition is not allowed';
  END IF;

  IF NEW.status = 'accepted' THEN
    IF NEW.accepted_user_id IS NULL OR NEW.accepted_at IS NULL THEN
      RAISE EXCEPTION 'accepted invitation requires accepted_user_id and accepted_at';
    END IF;
    RETURN NEW;
  END IF;

  IF NEW.status IN ('expired', 'revoked') THEN
    IF NEW.accepted_user_id IS NOT NULL OR NEW.accepted_at IS NOT NULL THEN
      RAISE EXCEPTION 'expired/revoked invitation cannot set accepted metadata';
    END IF;
    RETURN NEW;
  END IF;

  RAISE EXCEPTION 'team_invitations status transition is not allowed';
END;
$$;

COMMENT ON FUNCTION public.enforce_invitation_status_transition() IS
  'Pending may transition once to accepted | expired | revoked. Terminal rows are immutable, including accepted_user_id/accepted_at. Same-status business edits are rejected. updated_at stamping on a legal transition is allowed.';

CREATE TRIGGER team_invitations_status_transition
  BEFORE UPDATE ON public.team_invitations
  FOR EACH ROW
  EXECUTE FUNCTION public.enforce_invitation_status_transition();

REVOKE ALL ON FUNCTION public.enforce_invitation_status_transition()
  FROM PUBLIC, anon, authenticated, service_role;

-- -----------------------------------------------------------------------------
-- Hex digest → bytea. Called only from private DEFINER helpers.
-- Not granted to anon/authenticated/service_role. Not a Data API RPC.
-- -----------------------------------------------------------------------------

CREATE FUNCTION private.invitation_token_hash_from_hex(p_token_hash_hex text)
RETURNS bytea
LANGUAGE plpgsql
STABLE
SET search_path = ''
AS $$
DECLARE
  normalized text;
BEGIN
  normalized := lower(btrim(coalesce(p_token_hash_hex, '')));
  IF normalized !~ '^[0-9a-f]{64}$' THEN
    RETURN NULL;
  END IF;
  RETURN decode(normalized, 'hex');
END;
$$;

COMMENT ON FUNCTION private.invitation_token_hash_from_hex(text) IS
  'Returns SHA-256 digest as bytea from 64 lowercase hex chars, else NULL. Never accepts a raw invitation token.';

REVOKE ALL ON FUNCTION private.invitation_token_hash_from_hex(text)
  FROM PUBLIC, anon, authenticated, service_role;

-- -----------------------------------------------------------------------------
-- Private preview (DEFINER): token-hash lookup only. No listing, no email.
-- -----------------------------------------------------------------------------

CREATE FUNCTION private.preview_team_invitation_internal(p_token_hash_hex text)
RETURNS public.invitation_preview_result
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_hash bytea;
  v_status public.invitation_status;
  v_expires_at timestamptz;
  v_workspace_name text;
  v_result public.invitation_preview_result;
BEGIN
  v_result.state := 'invalid';
  v_result.workspace_name := NULL;

  v_hash := private.invitation_token_hash_from_hex(p_token_hash_hex);
  IF v_hash IS NULL THEN
    RETURN v_result;
  END IF;

  SELECT i.status, i.expires_at, w.name
  INTO v_status, v_expires_at, v_workspace_name
  FROM public.team_invitations i
  JOIN public.church_workspaces w ON w.id = i.workspace_id
  WHERE i.token_hash = v_hash;

  IF NOT FOUND THEN
    RETURN v_result;
  END IF;

  v_result.workspace_name := v_workspace_name;

  IF v_status = 'pending' AND v_expires_at <= now() THEN
    v_result.state := 'expired';
  ELSIF v_status = 'pending' THEN
    v_result.state := 'valid';
  ELSIF v_status = 'expired' THEN
    v_result.state := 'expired';
  ELSIF v_status = 'revoked' THEN
    v_result.state := 'revoked';
  ELSIF v_status = 'accepted' THEN
    v_result.state := 'accepted';
  ELSE
    v_result.state := 'invalid';
    v_result.workspace_name := NULL;
  END IF;

  RETURN v_result;
END;
$$;

COMMENT ON FUNCTION private.preview_team_invitation_internal(text) IS
  'SECURITY DEFINER preview by SHA-256 hex digest only. Returns workspace name only when a row matches. Does not list invitations or expose email/token_hash.';

REVOKE ALL ON FUNCTION private.preview_team_invitation_internal(text)
  FROM PUBLIC, anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION private.preview_team_invitation_internal(text)
  TO anon, authenticated;

-- -----------------------------------------------------------------------------
-- Private accept (DEFINER): atomic membership + invitation finalization.
-- Reads auth.users only WHERE id = auth.uid().
-- The only application path that may set status = accepted.
-- -----------------------------------------------------------------------------

CREATE FUNCTION private.accept_team_invitation_internal(p_token_hash_hex text)
RETURNS public.invitation_accept_result
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_uid uuid;
  v_hash bytea;
  v_inv public.team_invitations%ROWTYPE;
  v_workspace_name text;
  v_auth_email text;
  v_email_confirmed_at timestamptz;
  v_membership public.team_memberships%ROWTYPE;
  v_result public.invitation_accept_result;
  v_rowcount integer;
BEGIN
  v_result.outcome := 'invalid';
  v_result.workspace_name := NULL;

  v_uid := auth.uid();
  IF v_uid IS NULL THEN
    v_result.outcome := 'unauthenticated';
    RETURN v_result;
  END IF;

  v_hash := private.invitation_token_hash_from_hex(p_token_hash_hex);
  IF v_hash IS NULL THEN
    RETURN v_result;
  END IF;

  SELECT i.*
  INTO v_inv
  FROM public.team_invitations i
  WHERE i.token_hash = v_hash
  FOR UPDATE;

  IF NOT FOUND THEN
    RETURN v_result;
  END IF;

  SELECT w.name INTO v_workspace_name
  FROM public.church_workspaces w
  WHERE w.id = v_inv.workspace_id;

  v_result.workspace_name := v_workspace_name;

  IF v_inv.status = 'revoked' THEN
    v_result.outcome := 'revoked';
    RETURN v_result;
  END IF;

  IF v_inv.status = 'expired'
     OR (v_inv.status = 'pending' AND v_inv.expires_at <= now()) THEN
    IF v_inv.status = 'pending' THEN
      UPDATE public.team_invitations
      SET status = 'expired'
      WHERE id = v_inv.id
        AND status = 'pending';
      GET DIAGNOSTICS v_rowcount = ROW_COUNT;
      IF v_rowcount IS DISTINCT FROM 1 THEN
        RAISE EXCEPTION 'invitation accept could not expire';
      END IF;
    END IF;
    v_result.outcome := 'expired';
    RETURN v_result;
  END IF;

  IF v_inv.status = 'accepted' THEN
    IF v_inv.accepted_user_id = v_uid THEN
      v_result.outcome := 'already_member';
    ELSE
      v_result.outcome := 'invalid';
      v_result.workspace_name := NULL;
    END IF;
    RETURN v_result;
  END IF;

  IF v_inv.status IS DISTINCT FROM 'pending' THEN
    v_result.outcome := 'invalid';
    v_result.workspace_name := NULL;
    RETURN v_result;
  END IF;

  SELECT u.email, u.email_confirmed_at
  INTO v_auth_email, v_email_confirmed_at
  FROM auth.users u
  WHERE u.id = v_uid;

  IF NOT FOUND THEN
    v_result.outcome := 'unauthenticated';
    v_result.workspace_name := NULL;
    RETURN v_result;
  END IF;

  IF v_email_confirmed_at IS NULL THEN
    v_result.outcome := 'unverified';
    RETURN v_result;
  END IF;

  IF lower(btrim(v_auth_email)) IS DISTINCT FROM v_inv.email_normalized THEN
    v_result.outcome := 'wrong_account';
    RETURN v_result;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM public.profiles p WHERE p.id = v_uid
  ) THEN
    v_result.outcome := 'invalid';
    v_result.workspace_name := NULL;
    RETURN v_result;
  END IF;

  SELECT m.*
  INTO v_membership
  FROM public.team_memberships m
  WHERE m.workspace_id = v_inv.workspace_id
    AND m.user_id = v_uid
  FOR UPDATE;

  IF FOUND THEN
    IF v_membership.status = 'archived' THEN
      v_result.outcome := 'archived';
      RETURN v_result;
    END IF;

    IF v_membership.status = 'invited' THEN
      v_result.outcome := 'blocked';
      RETURN v_result;
    END IF;

    IF v_membership.status = 'inactive' THEN
      UPDATE public.team_memberships
      SET status = 'active',
          joined_at = now(),
          inactive_at = NULL
      WHERE id = v_membership.id
        AND status = 'inactive';
      GET DIAGNOSTICS v_rowcount = ROW_COUNT;
      IF v_rowcount IS DISTINCT FROM 1 THEN
        RAISE EXCEPTION 'invitation accept could not reactivate membership';
      END IF;

      UPDATE public.team_invitations
      SET status = 'accepted',
          accepted_user_id = v_uid,
          accepted_at = now()
      WHERE id = v_inv.id
        AND status = 'pending';
      GET DIAGNOSTICS v_rowcount = ROW_COUNT;
      IF v_rowcount IS DISTINCT FROM 1 THEN
        RAISE EXCEPTION 'invitation accept could not finalize';
      END IF;

      v_result.outcome := 'reactivated';
      RETURN v_result;
    END IF;

    IF v_membership.status = 'active' THEN
      UPDATE public.team_invitations
      SET status = 'accepted',
          accepted_user_id = v_uid,
          accepted_at = now()
      WHERE id = v_inv.id
        AND status = 'pending';
      GET DIAGNOSTICS v_rowcount = ROW_COUNT;
      IF v_rowcount IS DISTINCT FROM 1 THEN
        RAISE EXCEPTION 'invitation accept could not finalize';
      END IF;

      v_result.outcome := 'already_member';
      RETURN v_result;
    END IF;

    v_result.outcome := 'blocked';
    RETURN v_result;
  END IF;

  INSERT INTO public.team_memberships (
    workspace_id,
    user_id,
    status,
    joined_at
  ) VALUES (
    v_inv.workspace_id,
    v_uid,
    'active',
    now()
  );

  UPDATE public.team_invitations
  SET status = 'accepted',
      accepted_user_id = v_uid,
      accepted_at = now()
  WHERE id = v_inv.id
    AND status = 'pending';
  GET DIAGNOSTICS v_rowcount = ROW_COUNT;
  IF v_rowcount IS DISTINCT FROM 1 THEN
    RAISE EXCEPTION 'invitation accept could not finalize';
  END IF;

  v_result.outcome := 'joined';
  RETURN v_result;
END;
$$;

COMMENT ON FUNCTION private.accept_team_invitation_internal(text) IS
  'SECURITY DEFINER atomic accept. Only application path for pending → accepted. Token hex digest only. auth.users scoped to auth.uid(). Creates/reactivates membership only. Never writes permissions, leadership, or department_assignments. Archived and unexpected invited memberships fail closed without consuming the invitation. Pending timestamp expiry sets status = expired and does not rewrite expires_at.';

REVOKE ALL ON FUNCTION private.accept_team_invitation_internal(text)
  FROM PUBLIC, anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION private.accept_team_invitation_internal(text)
  TO authenticated;

-- -----------------------------------------------------------------------------
-- Private revoke (DEFINER): Admin-only pending → revoked. No DELETE.
-- -----------------------------------------------------------------------------

CREATE FUNCTION private.revoke_team_invitation_internal(p_invitation_id uuid)
RETURNS public.invitation_revoke_result
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_uid uuid;
  v_inv public.team_invitations%ROWTYPE;
  v_result public.invitation_revoke_result;
  v_rowcount integer;
BEGIN
  v_result.outcome := 'unauthorized';

  v_uid := auth.uid();
  IF v_uid IS NULL THEN
    RETURN v_result;
  END IF;

  SELECT i.*
  INTO v_inv
  FROM public.team_invitations i
  WHERE i.id = p_invitation_id
  FOR UPDATE;

  IF NOT FOUND THEN
    v_result.outcome := 'not_found';
    RETURN v_result;
  END IF;

  IF NOT private.has_permission(v_inv.workspace_id, 'admin') THEN
    v_result.outcome := 'unauthorized';
    RETURN v_result;
  END IF;

  IF v_inv.status IS DISTINCT FROM 'pending' THEN
    v_result.outcome := 'not_pending';
    RETURN v_result;
  END IF;

  UPDATE public.team_invitations
  SET status = 'revoked'
  WHERE id = v_inv.id
    AND status = 'pending';
  GET DIAGNOSTICS v_rowcount = ROW_COUNT;
  IF v_rowcount IS DISTINCT FROM 1 THEN
    RAISE EXCEPTION 'invitation revoke could not finalize';
  END IF;

  v_result.outcome := 'revoked';
  RETURN v_result;
END;
$$;

COMMENT ON FUNCTION private.revoke_team_invitation_internal(uuid) IS
  'SECURITY DEFINER Admin revoke. Requires auth.uid() and workspace-wide admin on the invitation workspace. pending → revoked only. Does not DELETE. Does not expose token_hash.';

REVOKE ALL ON FUNCTION private.revoke_team_invitation_internal(uuid)
  FROM PUBLIC, anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION private.revoke_team_invitation_internal(uuid)
  TO authenticated;

-- -----------------------------------------------------------------------------
-- Public Data API wrappers (INVOKER). Minimal logic. No table exposure.
--
-- GRANT map (smallest privileges for INVOKER → DEFINER):
--   anon          USAGE on schema private + EXECUTE preview helper
--   authenticated USAGE on schema private (Migration 1) + EXECUTE preview,
--                 accept, and revoke helpers
--   neither role  EXECUTE on invitation_token_hash_from_hex
--   no role       CREATE on schema private
--   no service_role EXECUTE on these invitation functions
--
-- REGRESSION: do not add schema private to api.schemas / Exposed schemas.
-- -----------------------------------------------------------------------------

GRANT USAGE ON SCHEMA private TO anon;

COMMENT ON SCHEMA private IS
  'Internal security helpers. NOT part of the Supabase Data API. MUST NEVER be added to api.schemas. Anon has USAGE only so public.preview_team_invitation (INVOKER) can call private.preview_team_invitation_internal. CREATE remains revoked. Other private routines remain non-executable by anon.';

CREATE FUNCTION public.preview_team_invitation(p_token_hash_hex text)
RETURNS public.invitation_preview_result
LANGUAGE plpgsql
STABLE
SECURITY INVOKER
SET search_path = ''
AS $$
BEGIN
  RETURN private.preview_team_invitation_internal(p_token_hash_hex);
END;
$$;

COMMENT ON FUNCTION public.preview_team_invitation(text) IS
  'Data API preview RPC. SECURITY INVOKER. EXECUTE: anon, authenticated. Argument is 64-char lowercase SHA-256 hex, never a raw token.';

REVOKE ALL ON FUNCTION public.preview_team_invitation(text)
  FROM PUBLIC, anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.preview_team_invitation(text)
  TO anon, authenticated;

CREATE FUNCTION public.accept_team_invitation(p_token_hash_hex text)
RETURNS public.invitation_accept_result
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = ''
AS $$
BEGIN
  RETURN private.accept_team_invitation_internal(p_token_hash_hex);
END;
$$;

COMMENT ON FUNCTION public.accept_team_invitation(text) IS
  'Data API accept RPC. SECURITY INVOKER. EXECUTE: authenticated only. Only application path for pending → accepted. Argument is 64-char lowercase SHA-256 hex, never a raw token.';

REVOKE ALL ON FUNCTION public.accept_team_invitation(text)
  FROM PUBLIC, anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.accept_team_invitation(text)
  TO authenticated;

CREATE FUNCTION public.revoke_team_invitation(p_invitation_id uuid)
RETURNS public.invitation_revoke_result
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = ''
AS $$
BEGIN
  RETURN private.revoke_team_invitation_internal(p_invitation_id);
END;
$$;

COMMENT ON FUNCTION public.revoke_team_invitation(uuid) IS
  'Data API Admin revoke RPC. SECURITY INVOKER. EXECUTE: authenticated only. Input is invitation UUID from authorized Admin SELECT. Does not expose token_hash. Does not DELETE.';

REVOKE ALL ON FUNCTION public.revoke_team_invitation(uuid)
  FROM PUBLIC, anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.revoke_team_invitation(uuid)
  TO authenticated;
