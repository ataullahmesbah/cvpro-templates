import { Sidebar } from "@/components/site/sidebar";
import { Cursor } from "@/components/site/cursor";
import { ThemeFab } from "@/components/site/theme-fab";
import { getProfile, getSettings } from "@/lib/data";
import { navItems } from "@/lib/sections";

export const revalidate = 3600;

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [profile, settings] = await Promise.all([getProfile(), getSettings()]);
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-accent focus:px-4 focus:py-2 focus:text-on-accent"
      >
        Skip to content
      </a>
      <Sidebar
        name={settings.website_name || profile.full_name}
        logo={settings.logo_url}
        nav={navItems(settings.sections)}
        footerLine={settings.footer_text}
        year={new Date().getFullYear()}
      />
      <main id="main" tabIndex={-1} className="min-h-[100svh] outline-none lg:pl-[var(--sidebar-w)]">
        {children}
      </main>
      <ThemeFab />
      {settings.cursor_enabled !== false && <Cursor />}
    </>
  );
}
