-- =============================================================================
-- Production OS — Migration 2
-- bootstrap_voa_workspace
--
-- DATA INSERTIONS ONLY. No schema changes.
--
-- Persistent Victory Outreach Antioch church baseline:
--   church_workspaces + Audio / Lighting / Media workspace_departments
--
-- Do NOT insert Auth users, emails, profiles, memberships, permission grants,
-- department assignments, leadership appointments, positions, or invitations.
-- First-owner bootstrap remains a one-time SQL Editor operation after this
-- migration is applied.
--
-- Operational Production OS content (equipment, Sunday Setup, troubleshooting,
-- documentation, Blueprint, photos) remains file-backed and is not copied here.
--
-- Idempotent: create missing baseline rows. Preserve existing UUIDs.
-- Do not overwrite church-edited name / timezone / is_active / department name.
-- =============================================================================

INSERT INTO public.church_workspaces (
  name,
  slug,
  timezone,
  is_active,
  production_os_key
)
VALUES (
  'Victory Outreach Antioch',
  'victory-outreach-antioch',
  'America/Los_Angeles',
  true,
  'victory-outreach-antioch'
)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.workspace_departments (
  workspace_id,
  department_key,
  name,
  source,
  is_active
)
SELECT
  w.id,
  d.department_key,
  d.name,
  'production_os'::public.department_source,
  true
FROM public.church_workspaces AS w
CROSS JOIN (
  VALUES
    ('audio', 'Audio'),
    ('lighting', 'Lighting'),
    ('media', 'Media')
) AS d(department_key, name)
WHERE w.slug = 'victory-outreach-antioch'
ON CONFLICT (workspace_id, department_key) DO NOTHING;

DO $$
DECLARE
  workspace_count integer;
  missing integer;
BEGIN
  SELECT count(*) INTO workspace_count
  FROM public.church_workspaces
  WHERE slug = 'victory-outreach-antioch';

  IF workspace_count <> 1 THEN
    RAISE EXCEPTION
      'VOA baseline aborted: church_workspaces slug victory-outreach-antioch resolved % time(s), expected 1.',
      workspace_count;
  END IF;

  SELECT count(*) INTO missing
  FROM (
    VALUES ('audio'), ('lighting'), ('media')
  ) AS expected(department_key)
  WHERE NOT EXISTS (
    SELECT 1
    FROM public.workspace_departments AS d
    JOIN public.church_workspaces AS w ON w.id = d.workspace_id
    WHERE w.slug = 'victory-outreach-antioch'
      AND d.department_key = expected.department_key
  );

  IF missing > 0 THEN
    RAISE EXCEPTION
      'VOA baseline aborted: % expected Production OS department(s) missing (audio, lighting, media).',
      missing;
  END IF;
END $$;
