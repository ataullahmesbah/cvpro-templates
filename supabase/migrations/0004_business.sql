-- =====================================================================
-- Business Portfolio additions (run after 0003_awards_sections.sql). Safe to re-run.
-- Second brand colour, new hero/about fields, counters and process steps.
-- =====================================================================

-- ---------- Settings: second brand colour (gradients) ----------
alter table public.site_settings
  add column if not exists accent_color_2 text not null default '#14d4f0';

alter table public.site_settings drop constraint if exists site_settings_accent_color_2_check;
alter table public.site_settings add constraint site_settings_accent_color_2_check
  check (accent_color_2 ~* '^#([0-9a-f]{3}|[0-9a-f]{6})$');

-- ---------- Profile: hero + about content ----------
alter table public.profile
  add column if not exists hero_headline text not null default '',
  add column if not exists trust_line text not null default '',
  add column if not exists hero_background_url text,
  add column if not exists about_title text not null default '',
  add column if not exists about_image_url text,
  add column if not exists about_points text[] not null default '{}',
  add column if not exists experience_years int not null default 0 check (experience_years between 0 and 80),
  add column if not exists work_photos jsonb not null default '[]'::jsonb;

-- ---------- Counters (About bars + numbers strip) ----------
create table if not exists public.stats (
  id uuid primary key default gen_random_uuid(),
  value text not null,
  label text not null,
  placement text not null default 'band' check (placement in ('band', 'about')),
  percent int not null default 0 check (percent between 0 and 100),
  active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------- Work process steps ----------
create table if not exists public.process_steps (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

do $$
declare t text;
begin
  foreach t in array array['stats', 'process_steps'] loop
    execute format('drop trigger if exists trg_%1$s_updated on public.%1$s', t);
    execute format('create trigger trg_%1$s_updated before update on public.%1$s for each row execute function public.set_updated_at()', t);
    execute format('alter table public.%1$s enable row level security', t);
    execute format('drop policy if exists "public read %1$s" on public.%1$s', t);
    execute format('drop policy if exists "admin insert %1$s" on public.%1$s', t);
    execute format('drop policy if exists "admin update %1$s" on public.%1$s', t);
    execute format('drop policy if exists "admin delete %1$s" on public.%1$s', t);
    execute format('create policy "public read %1$s" on public.%1$s for select using (active or public.is_admin())', t);
    execute format('create policy "admin insert %1$s" on public.%1$s for insert to authenticated with check (public.is_admin())', t);
    execute format('create policy "admin update %1$s" on public.%1$s for update to authenticated using (public.is_admin()) with check (public.is_admin())', t);
    execute format('create policy "admin delete %1$s" on public.%1$s for delete to authenticated using (public.is_admin())', t);
  end loop;
end $$;
