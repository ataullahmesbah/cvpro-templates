import { serviceIconKeys } from "@/components/ui/service-icon";

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "boolean"
  | "select"
  | "image"
  | "gallery"
  | "file"
  | "list"
  | "slug"
  | "color"
  | "date"
  | "url"
  | "email"
  | "links"
  | "tools"
  | "info"
  | "embed"
  | "sections";

export type Field = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  help?: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
  /** Storage folder for uploads */
  folder?: string;
  min?: number;
  max?: number;
  rows?: number;
  maxLength?: number;
  /** Take the full row in the two-column form grid */
  full?: boolean;
  /** For slug fields: the field it is generated from */
  from?: string;
};

export type Column = {
  name: string;
  label: string;
  kind?: "image" | "badge" | "boolean" | "date" | "text";
};

export type Resource = {
  key: string;
  table: string;
  label: string;
  singular: string;
  description: string;
  fields: Field[];
  columns: Column[];
  /** Fields that can be toggled from the list view */
  toggles?: { name: string; label: string; on: unknown; off: unknown }[];
  orderBy: { column: string; ascending: boolean };
  sortable?: boolean;
  /** Public path to revalidate / preview (use {slug}) */
  publicPath?: string;
  emptyText: string;
};

const sortOrder: Field = { name: "sort_order", label: "Sort order", type: "number", min: 0, max: 9999, help: "Lower numbers appear first." };
const active: Field = { name: "active", label: "Visible on website", type: "boolean" };
const activeToggle = { name: "active", label: "Visible", on: true, off: false };

export const resources: Record<string, Resource> = {
  projects: {
    key: "projects",
    table: "projects",
    label: "Projects",
    singular: "Project",
    description: "Projects on the /portfolio page and each project page.",
    orderBy: { column: "sort_order", ascending: true },
    sortable: true,
    publicPath: "/portfolio/{slug}",
    emptyText: "No projects yet. Add your first project to begin building your portfolio.",
    columns: [
      { name: "cover_image_url", label: "", kind: "image" },
      { name: "title", label: "Title" },
      { name: "category", label: "Category", kind: "badge" },
      { name: "year", label: "Year" },
      { name: "updated_at", label: "Last updated", kind: "date" },
    ],
    toggles: [
      { name: "status", label: "Published", on: "published", off: "draft" },
      { name: "featured", label: "Featured", on: true, off: false },
    ],
    fields: [
      { name: "title", label: "Title", type: "text", required: true, maxLength: 140 },
      { name: "slug", label: "URL slug", type: "slug", from: "title", required: true, help: "Used in the page address: /portfolio/your-slug" },
      { name: "category", label: "Category", type: "text", required: true, maxLength: 60, placeholder: "e.g. Websites", help: "Also used as the filter tab on the Portfolio page." },
      { name: "year", label: "Year", type: "number", required: true, min: 1990, max: 2100 },
      { name: "client", label: "Client", type: "text", maxLength: 120 },
      { name: "role", label: "Your role", type: "text", maxLength: 160, placeholder: "e.g. Art Direction, UI Design" },
      { name: "intro", label: "Short summary", type: "textarea", required: true, rows: 3, maxLength: 400, full: true },
      { name: "challenge", label: "The challenge", type: "textarea", rows: 4, maxLength: 3000, full: true },
      { name: "solution", label: "The approach", type: "textarea", rows: 4, maxLength: 3000, full: true },
      { name: "result", label: "The result", type: "textarea", rows: 4, maxLength: 3000, full: true },
      { name: "cover_image_url", label: "Cover image", type: "image", required: true, folder: "projects", full: true },
      { name: "gallery", label: "Gallery images", type: "gallery", folder: "projects", full: true, help: "Drag the arrows to reorder. Max 12 images." },
      { name: "live_url", label: "Live project URL", type: "url" },
      { name: "likes", label: "Likes (display)", type: "number", min: 0, max: 1000000 },
      { name: "featured", label: "Featured (shown first)", type: "boolean" },
      {
        name: "status",
        label: "Status",
        type: "select",
        required: true,
        options: [
          { value: "published", label: "Published" },
          { value: "draft", label: "Draft (hidden)" },
        ],
      },
      sortOrder,
    ],
  },

  services: {
    key: "services",
    table: "services",
    label: "Services",
    singular: "Service",
    description: "Service cards on the /services page.",
    orderBy: { column: "sort_order", ascending: true },
    sortable: true,
    emptyText: "No services yet. Add what you offer to your clients.",
    columns: [
      { name: "title", label: "Title" },
      { name: "icon_key", label: "Icon", kind: "badge" },
    ],
    toggles: [activeToggle],
    fields: [
      { name: "title", label: "Title", type: "text", required: true, maxLength: 80 },
      { name: "icon_key", label: "Icon", type: "select", options: serviceIconKeys.map((k) => ({ value: k, label: k })) },
      { name: "short_description", label: "Description", type: "textarea", required: true, rows: 4, maxLength: 300, full: true },
      active,
      sortOrder,
    ],
  },

  resume: {
    key: "resume",
    table: "resume_items",
    label: "Resume",
    singular: "Resume item",
    description: "Experience and education timeline on the About page.",
    orderBy: { column: "sort_order", ascending: true },
    sortable: true,
    emptyText: "No education or experience yet.",
    columns: [
      { name: "title", label: "Title" },
      { name: "type", label: "Type", kind: "badge" },
      { name: "period", label: "Period" },
    ],
    toggles: [activeToggle],
    fields: [
      {
        name: "type",
        label: "Type",
        type: "select",
        required: true,
        options: [
          { value: "education", label: "Education" },
          { value: "experience", label: "Experience" },
        ],
      },
      { name: "title", label: "Title", type: "text", required: true, maxLength: 120, placeholder: "e.g. Senior Product Designer" },
      { name: "subtitle", label: "Institution / company", type: "text", required: true, maxLength: 120 },
      { name: "period", label: "Period", type: "text", required: true, maxLength: 40, placeholder: "e.g. 2021 – Present" },
      { name: "badge", label: "Badge", type: "text", maxLength: 30, placeholder: "e.g. 4.30/5 or Remote" },
      { name: "description", label: "Description", type: "textarea", rows: 4, maxLength: 800, full: true },
      active,
      sortOrder,
    ],
  },

  skills: {
    key: "skills",
    table: "skills",
    label: "Skills",
    singular: "Skill",
    description: "Skills on the About page. Skills with the same group are shown together: bars, round meters (languages) or a check-mark list (knowledge).",
    orderBy: { column: "sort_order", ascending: true },
    sortable: true,
    emptyText: "No skills yet.",
    columns: [
      { name: "name", label: "Skill" },
      { name: "category", label: "Group", kind: "badge" },
      { name: "level", label: "Level %" },
      { name: "display", label: "Style", kind: "badge" },
    ],
    toggles: [activeToggle],
    fields: [
      { name: "name", label: "Skill name", type: "text", required: true, maxLength: 60 },
      { name: "category", label: "Group title", type: "text", required: true, maxLength: 40, placeholder: "e.g. Programming Skills" },
      {
        name: "display",
        label: "Style",
        type: "select",
        required: true,
        options: [
          { value: "bar", label: "Progress bar" },
          { value: "circle", label: "Round meter (e.g. languages)" },
          { value: "tag", label: "Check-mark list (e.g. knowledge)" },
        ],
      },
      { name: "level", label: "Level (0–100)", type: "number", required: true, min: 0, max: 100, help: "Not shown for the check-mark list." },
      active,
      sortOrder,
    ],
  },

  testimonials: {
    key: "testimonials",
    table: "testimonials",
    label: "Testimonials",
    singular: "Testimonial",
    description: "Client quotes in the testimonial slider.",
    orderBy: { column: "sort_order", ascending: true },
    sortable: true,
    emptyText: "No testimonials yet.",
    columns: [
      { name: "avatar_url", label: "", kind: "image" },
      { name: "name", label: "Name" },
      { name: "company", label: "Company" },
      { name: "rating", label: "Rating" },
    ],
    toggles: [activeToggle],
    fields: [
      { name: "name", label: "Person name", type: "text", required: true, maxLength: 80 },
      { name: "role", label: "Role", type: "text", maxLength: 80 },
      { name: "company", label: "Company", type: "text", maxLength: 80 },
      { name: "project_title", label: "Project title", type: "text", maxLength: 100 },
      { name: "quote", label: "Quote", type: "textarea", required: true, rows: 5, maxLength: 1000, full: true },
      { name: "avatar_url", label: "Photo", type: "image", folder: "testimonials" },
      { name: "rating", label: "Rating (1–5)", type: "number", required: true, min: 1, max: 5 },
      active,
      sortOrder,
    ],
  },

  clients: {
    key: "clients",
    table: "clients",
    label: "Clients",
    singular: "Client",
    description: "Client logos on the About page.",
    orderBy: { column: "sort_order", ascending: true },
    sortable: true,
    emptyText: "No clients yet.",
    columns: [
      { name: "logo_url", label: "", kind: "image" },
      { name: "name", label: "Name" },
      { name: "category", label: "Group", kind: "badge" },
    ],
    toggles: [activeToggle],
    fields: [
      { name: "name", label: "Name", type: "text", required: true, maxLength: 80 },
      { name: "category", label: "Group (tab)", type: "text", required: true, maxLength: 40, placeholder: "e.g. Brand" },
      { name: "logo_url", label: "Logo", type: "image", folder: "clients" },
      { name: "website_url", label: "Website", type: "url" },
      active,
      sortOrder,
    ],
  },

  awards: {
    key: "awards",
    table: "awards",
    label: "Awards",
    singular: "Award",
    description: "Optional awards slider. Leave empty (or hide it in Settings → Page sections) if you have no awards.",
    orderBy: { column: "sort_order", ascending: true },
    sortable: true,
    emptyText: "No awards yet. The Awards section stays hidden on the website until you add one.",
    columns: [
      { name: "image_url", label: "", kind: "image" },
      { name: "title", label: "Award" },
      { name: "organization", label: "Organization", kind: "badge" },
      { name: "year", label: "Year" },
    ],
    toggles: [activeToggle],
    fields: [
      { name: "title", label: "Award title", type: "text", required: true, maxLength: 120, placeholder: "e.g. Site of the Day" },
      { name: "organization", label: "Organization", type: "text", maxLength: 80, placeholder: "e.g. Awwwards" },
      { name: "year", label: "Year", type: "text", maxLength: 20, placeholder: "e.g. 2026" },
      { name: "link_url", label: "Link (optional)", type: "url", help: "Public page of the award, if any." },
      { name: "short_description", label: "Short description", type: "textarea", required: true, rows: 3, maxLength: 300, full: true },
      { name: "image_url", label: "Image", type: "image", required: true, folder: "awards", full: true, help: "Trophy, certificate or award badge. Landscape (16:10) works best." },
      active,
      sortOrder,
    ],
  },

  pricing: {
    key: "pricing",
    table: "pricing_plans",
    label: "Pricing",
    singular: "Pricing plan",
    description: "Packages on the Services page.",
    orderBy: { column: "sort_order", ascending: true },
    sortable: true,
    emptyText: "No pricing plans yet.",
    columns: [
      { name: "name", label: "Plan" },
      { name: "price", label: "Price" },
      { name: "tagline", label: "Tagline", kind: "badge" },
    ],
    toggles: [activeToggle, { name: "highlighted", label: "Popular", on: true, off: false }],
    fields: [
      { name: "name", label: "Plan name", type: "text", required: true, maxLength: 60 },
      { name: "tagline", label: "Tagline", type: "text", maxLength: 60 },
      { name: "price", label: "Price", type: "text", required: true, maxLength: 30, placeholder: "$990" },
      { name: "period", label: "Period", type: "text", maxLength: 40, placeholder: "per project" },
      { name: "description", label: "Description", type: "textarea", rows: 3, maxLength: 400, full: true },
      { name: "features", label: "Features", type: "list", full: true, help: "One feature per line." },
      { name: "cta_label", label: "Button label", type: "text", required: true, maxLength: 30 },
      { name: "highlighted", label: "Mark as popular", type: "boolean" },
      active,
      sortOrder,
    ],
  },

  stats: {
    key: "stats",
    table: "stats",
    label: "Counters",
    singular: "Counter",
    description: "Numbers like “120+ Projects completed”. They count up on the About page; the first 3 also appear on the home page.",
    orderBy: { column: "sort_order", ascending: true },
    sortable: true,
    emptyText: "No counters yet.",
    columns: [
      { name: "value", label: "Value" },
      { name: "label", label: "Label" },
    ],
    toggles: [activeToggle],
    fields: [
      { name: "value", label: "Value", type: "text", required: true, maxLength: 12, placeholder: "e.g. 120+ or 4.9 or 95%" },
      { name: "label", label: "Label", type: "text", required: true, maxLength: 40, placeholder: "e.g. Projects delivered" },
      active,
      sortOrder,
    ],
  },

  process: {
    key: "process",
    table: "process_steps",
    label: "Process",
    singular: "Process step",
    description: "The “How I Work” steps on the Services page. Four steps look best.",
    orderBy: { column: "sort_order", ascending: true },
    sortable: true,
    emptyText: "No process steps yet.",
    columns: [
      { name: "title", label: "Step" },
      { name: "description", label: "Description" },
    ],
    toggles: [activeToggle],
    fields: [
      { name: "title", label: "Title", type: "text", required: true, maxLength: 40 },
      { name: "description", label: "Description", type: "textarea", required: true, rows: 3, maxLength: 200, full: true },
      active,
      sortOrder,
    ],
  },

  blog: {
    key: "blog",
    table: "blog_posts",
    label: "Blog",
    singular: "Blog post",
    description: "Articles on the /news page.",
    orderBy: { column: "published_at", ascending: false },
    publicPath: "/news/{slug}",
    emptyText: "No blog posts yet.",
    columns: [
      { name: "cover_image_url", label: "", kind: "image" },
      { name: "title", label: "Title" },
      { name: "category", label: "Category", kind: "badge" },
      { name: "published_at", label: "Date", kind: "date" },
    ],
    toggles: [{ name: "status", label: "Published", on: "published", off: "draft" }],
    fields: [
      { name: "title", label: "Title", type: "text", required: true, maxLength: 160, full: true },
      { name: "slug", label: "URL slug", type: "slug", from: "title", required: true, help: "/news/your-slug" },
      { name: "category", label: "Category", type: "text", required: true, maxLength: 40 },
      { name: "excerpt", label: "Excerpt", type: "textarea", required: true, rows: 3, maxLength: 300, full: true },
      {
        name: "content",
        label: "Content",
        type: "textarea",
        required: true,
        rows: 16,
        maxLength: 30000,
        full: true,
        help: "Leave a blank line between paragraphs. Start a line with “## ” for a heading and “- ” for a bullet point.",
      },
      { name: "cover_image_url", label: "Cover image", type: "image", required: true, folder: "blog", full: true },
      { name: "read_time", label: "Read time", type: "text", maxLength: 20, placeholder: "4 min read" },
      { name: "published_at", label: "Publish date", type: "date", required: true },
      {
        name: "status",
        label: "Status",
        type: "select",
        required: true,
        options: [
          { value: "published", label: "Published" },
          { value: "draft", label: "Draft (hidden)" },
        ],
      },
    ],
  },
};

export const profileFields: Field[] = [
  { name: "full_name", label: "Full name", type: "text", required: true, maxLength: 80 },
  { name: "professional_title", label: "Job title", type: "text", required: true, maxLength: 100, placeholder: "Web Developer", help: "Shown under your name on the About page." },
  { name: "typed_roles", label: "Home: typing words", type: "list", full: true, help: "One per line, e.g. “Web Developer”. They are typed one after another under your name." },
  { name: "short_intro", label: "Home: short intro", type: "textarea", required: true, rows: 3, maxLength: 300, full: true },
  { name: "hero_image_url", label: "Home photo", type: "image", folder: "profile", help: "Square portrait. It is shown inside the animated shape." },
  { name: "profile_image_url", label: "Profile photo (small, square)", type: "image", required: true, folder: "profile", help: "Used as a fallback and for SEO / sharing." },
  { name: "about_image_url", label: "About: wide photo", type: "image", folder: "profile", help: "Wide photo (16:9) at the top of the About page." },
  { name: "bio", label: "About text", type: "textarea", rows: 6, maxLength: 1500, full: true, help: "Leave a blank line between paragraphs." },
  { name: "personal_info", label: "About: personal info", type: "info", full: true, help: "Rows like Birthday, Age, Address, Nationality, Degree, Freelance. Up to 16." },
  { name: "resume_url", label: "CV / Resume (PDF)", type: "file", folder: "documents", help: "Used by the “Download CV” button." },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "phone", label: "Phone", type: "text", maxLength: 30 },
  { name: "location", label: "Location", type: "text", maxLength: 80 },
  { name: "availability_status", label: "Availability status", type: "text", maxLength: 60, placeholder: "Available for freelance work" },
  { name: "social_links", label: "Social links", type: "links", full: true },
];

export const settingsFields: Field[] = [
  { name: "website_name", label: "Website name", type: "text", required: true, maxLength: 60 },
  { name: "hire_label", label: "“Hire me” button label", type: "text", required: true, maxLength: 24 },
  { name: "logo_url", label: "Logo (optional — profile image is used otherwise)", type: "image", folder: "settings" },
  { name: "accent_color", label: "Accent colour", type: "color", required: true, help: "Cursor circle, active menu, skill bars and buttons." },
  { name: "cursor_enabled", label: "Animated mouse circle", type: "boolean", help: "A circle follows the mouse on computers (never on phones)." },
  {
    name: "default_theme",
    label: "Default theme",
    type: "select",
    required: true,
    options: [
      { value: "dark", label: "Dark" },
      { value: "light", label: "Light" },
      { value: "system", label: "Follow visitor's system" },
    ],
  },
  { name: "contact_email", label: "Public contact email", type: "email", required: true },
  { name: "footer_text", label: "Sidebar footer line", type: "text", maxLength: 80, full: true, placeholder: "Created by Your Name" },
  {
    name: "map_embed_url",
    label: "Contact map (embed link)",
    type: "embed",
    full: true,
    help: "Google Maps → Share → Embed a map → copy only the link inside src=\"...\". Leave empty to hide the map.",
  },
  { name: "public_phone", label: "Public phone", type: "text", maxLength: 30 },
  {
    name: "sections",
    label: "Page sections",
    type: "sections",
    full: true,
    help: "Turn sections on or off and change their order inside each page. Turning off About, Services, Portfolio, News or Contact also removes that page from the menu.",
  },
  { name: "seo_title", label: "SEO title", type: "text", required: true, maxLength: 70, full: true, help: "Shown in Google results and browser tabs. ~60 characters." },
  { name: "seo_description", label: "SEO description", type: "textarea", required: true, rows: 3, maxLength: 170, full: true, help: "~155 characters." },
];
