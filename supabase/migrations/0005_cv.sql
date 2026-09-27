-- =====================================================================
-- CV Portfolio additions (run after 0004_business.sql). Safe to re-run.
-- Personal info list, skill display styles, contact map and cursor switch.
-- =====================================================================

-- ---------- Profile: "Birthday / Age / Nationality …" rows on the About page ----------
alter table public.profile
  add column if not exists personal_info jsonb not null default '[]'::jsonb;

-- ---------- Skills: bar, circle (languages) or tag (knowledge) ----------
alter table public.skills
  add column if not exists display text not null default 'bar';

alter table public.skills drop constraint if exists skills_display_check;
alter table public.skills add constraint skills_display_check
  check (display in ('bar', 'circle', 'tag'));

-- ---------- Settings: contact map and animated mouse cursor ----------
alter table public.site_settings
  add column if not exists map_embed_url text,
  add column if not exists cursor_enabled boolean not null default true;

-- Only Google Maps and OpenStreetMap embeds are allowed (they are the only frame sources in the CSP).
alter table public.site_settings drop constraint if exists site_settings_map_embed_url_check;
alter table public.site_settings add constraint site_settings_map_embed_url_check
  check (
    map_embed_url is null
    or map_embed_url = ''
    or map_embed_url ~* '^https://(www\.google\.com/maps/embed|maps\.google\.com/maps|www\.openstreetmap\.org/export/embed\.html)'
  );
