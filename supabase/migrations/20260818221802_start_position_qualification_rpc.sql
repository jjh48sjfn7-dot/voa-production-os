-- =============================================================================
-- PRODUCTION OS PHASE 4I-E — Migration 6
-- Start position qualification write contract
--
-- Thin SECURITY INVOKER RPC so the app can start a qualification without
-- sending trigger-owned actor/timestamp columns. Table RLS + Migration 5
-- INSERT trigger remain the security authority.
-- =============================================================================

CREATE FUNCTION public.start_position_qualification(
  p_membership_id uuid,
  p_position_id uuid
)
RETURNS public.position_qualifications
LANGUAGE sql
SECURITY INVOKER
SET search_path = ''
AS $$
  INSERT INTO public.position_qualifications (
    membership_id,
    position_id,
    status
  )
  VALUES (
    p_membership_id,
    p_position_id,
    'learning'::public.position_qualification_status
  )
  RETURNING *;
$$;

COMMENT ON FUNCTION public.start_position_qualification(uuid, uuid) IS
  'Starts a position qualification at Learning. Does not itself grant qualification authority. Table RLS and the Migration 5 INSERT trigger remain final authority.';

REVOKE ALL ON FUNCTION public.start_position_qualification(uuid, uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.start_position_qualification(uuid, uuid) FROM anon;
GRANT EXECUTE ON FUNCTION public.start_position_qualification(uuid, uuid) TO authenticated;
