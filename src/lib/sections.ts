/**
 * Website sections: which ones are shown and in what order.
 * Stored in site_settings.sections and edited in Admin → Settings.
 * The home hero is always shown. Each block lives on one page (About, Services …);
 * inside a page the blocks follow the saved order. Turning off a "page" section
 * (About, Services, Portfolio, News, Contact) also removes it from the sidebar menu.
 */
export type SectionKey =
  | "about"
  | "skills"
  | "resume"
  | "stats"
  | "testimonials"
  | "clients"
  | "awards"
  | "services"
  | "process"
  | "pricing"
  | "portfolio"
  | "blog"
  | "contact";

export type SectionSetting = { key: SectionKey; visible: boolean };

export type PageKey = "about" | "services" | "portfolio" | "blog" | "contact";

type SectionDef = {
  key: SectionKey;
  label: string;
  description: string;
  /** The page this block is shown on. */
  on: PageKey;
  /** Sidebar link to a full page (the page is hidden too when the section is turned off). */
  page?: { label: string; href: string };
};

export const SECTION_DEFS: SectionDef[] = [
  { key: "about", label: "About me", description: "Photo, bio, personal info and CV button (/about)", on: "about", page: { label: "About", href: "/about" } },
  { key: "skills", label: "Skills", description: "Skill bars, language circles and knowledge list (About page)", on: "about" },
  { key: "resume", label: "Resume", description: "Experience and education timeline (About page)", on: "about" },
  { key: "stats", label: "Counters", description: "Animated numbers (About page and home)", on: "about" },
  { key: "testimonials", label: "Testimonials", description: "Client quotes slider (About page)", on: "about" },
  { key: "clients", label: "Clients", description: "Client logos (About page)", on: "about" },
  { key: "awards", label: "Awards", description: "Awards (About page, hidden when empty)", on: "about" },
  { key: "services", label: "Services", description: "Service cards (/services)", on: "services", page: { label: "Service", href: "/services" } },
  { key: "process", label: "Work process", description: "Step-by-step process (Services page)", on: "services" },
  { key: "pricing", label: "Pricing", description: "Pricing plans (Services page)", on: "services" },
  { key: "portfolio", label: "Portfolio", description: "Filterable projects (/portfolio)", on: "portfolio", page: { label: "Portfolio", href: "/portfolio" } },
  { key: "blog", label: "News", description: "Articles (/news)", on: "blog", page: { label: "News", href: "/news" } },
  { key: "contact", label: "Contact", description: "Map, contact details and form (/contact)", on: "contact", page: { label: "Contact", href: "/contact" } },
];

export const SECTION_KEYS = SECTION_DEFS.map((d) => d.key);

export const defaultSections: SectionSetting[] = SECTION_DEFS.map((d) => ({ key: d.key, visible: true }));

/** Merges saved settings with the known sections: keeps saved order, drops unknown keys, appends new ones. */
export function normalizeSections(saved: unknown): SectionSetting[] {
  // Older saves may have stored the list as a JSON string — accept both.
  if (typeof saved === "string") {
    try {
      saved = JSON.parse(saved);
    } catch {
      saved = [];
    }
  }
  const list = Array.isArray(saved) ? saved : [];
  const seen = new Set<string>();
  const result: SectionSetting[] = [];
  for (const item of list) {
    const key = (item as SectionSetting)?.key;
    if (!SECTION_KEYS.includes(key) || seen.has(key)) continue;
    seen.add(key);
    result.push({ key, visible: (item as SectionSetting).visible !== false });
  }
  for (const d of SECTION_DEFS) if (!seen.has(d.key)) result.push({ key: d.key, visible: true });
  return result;
}

export function isSectionVisible(saved: unknown, key: SectionKey) {
  return normalizeSections(saved).find((s) => s.key === key)?.visible ?? true;
}

export type NavItem = { label: string; href: string };

/** Sidebar links, in a fixed, familiar order (Home, About, Service, Portfolio, News, Contact). */
export function navItems(saved: unknown): NavItem[] {
  const items: NavItem[] = [{ label: "Home", href: "/" }];
  const visible = new Set(normalizeSections(saved).filter((s) => s.visible).map((s) => s.key));
  for (const d of SECTION_DEFS) if (d.page && visible.has(d.key)) items.push(d.page);
  return items;
}

/** Visible blocks of one page, in the saved order. */
export function pageBlocks(saved: unknown, page: PageKey): SectionKey[] {
  const onPage = new Set(SECTION_DEFS.filter((d) => d.on === page).map((d) => d.key));
  return normalizeSections(saved)
    .filter((s) => s.visible && onPage.has(s.key))
    .map((s) => s.key);
}

export function sectionLabel(key: SectionKey) {
  return SECTION_DEFS.find((d) => d.key === key)?.label ?? key;
}

export function sectionDescription(key: SectionKey) {
  return SECTION_DEFS.find((d) => d.key === key)?.description ?? "";
}

/** Where "Hire me" style buttons go: the contact page, or email when Contact is turned off. */
export function contactLink(saved: unknown, email: string) {
  return isSectionVisible(saved, "contact") ? "/contact" : `mailto:${email}`;
}
