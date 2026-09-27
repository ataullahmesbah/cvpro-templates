/**
 * DEMO CONTENT
 * Used when Supabase is not configured, and mirrored by supabase/seed.sql.
 * Everything here is placeholder content meant to be replaced by the client
 * from the admin dashboard.
 */
import type {
  Award,
  BlogPost,
  Client,
  PricingPlan,
  ProcessStep,
  Profile,
  Project,
  ResumeItem,
  Service,
  SiteSettings,
  Skill,
  Stat,
  Testimonial,
} from "@/types/content";

export const demoSettings: SiteSettings = {
  website_name: "Julian",
  logo_url: null,
  accent_color: "#f2b35b",
  accent_color_2: "#f2b35b",
  default_theme: "dark",
  contact_email: "hello@julianhart.demo",
  public_phone: "+49 30 1234 5678",
  seo_title: "Julian Hart — Web Developer & UI Designer",
  seo_description:
    "Julian Hart is a web developer and UI designer in Berlin building fast, beautiful websites and web apps for brands and startups.",
  footer_text: "Web developer & UI designer",
  hire_label: "Hire Me",
  // Empty = every section visible in the default order (see src/lib/sections.ts).
  sections: [],
  // OpenStreetMap needs no API key. Paste a Google Maps embed link in Admin → Settings to use Google instead.
  map_embed_url:
    "https://www.openstreetmap.org/export/embed.html?bbox=13.3050%2C52.4870%2C13.5050%2C52.5570&layer=mapnik&marker=52.5200%2C13.4050",
  cursor_enabled: true,
};

export const demoProfile: Profile = {
  full_name: "Julian Hart",
  professional_title: "Web Developer & UI Designer",
  typed_roles: ["Web Developer", "UI Designer", "Freelancer", "Photographer"],
  short_intro:
    "Creative developer based in Berlin, building fast and beautiful websites for brands, startups and people who love good design.",
  bio: "Hi, my name is Julian Hart. I have been designing and building websites for more than eight years, from simple landing pages to complete web apps with dashboards and online payments.\n\nI love taking an idea from a rough sketch to a polished product. Clean code, clear design and fast pages are what I care about most — so my clients can focus on their business while their website quietly does its job.",
  email: "hello@julianhart.demo",
  phone: "+49 30 1234 5678",
  location: "Berlin, Germany",
  profile_image_url: "/demo/avatar-owner.svg",
  hero_image_url: "/demo/portrait.svg",
  hero_headline: "",
  hero_background_url: null,
  resume_url: "/demo/julian-hart-cv.pdf",
  availability_status: "Available for freelance work",
  trust_line: "",
  about_title: "",
  about_image_url: "/demo/about-wide.svg",
  about_points: [],
  experience_years: 8,
  work_photos: [],
  personal_info: [
    { label: "Birthday", value: "14.03.1994" },
    { label: "Age", value: "32" },
    { label: "Address", value: "Torstraße 18, Berlin" },
    { label: "Email", value: "hello@julianhart.demo" },
    { label: "Phone", value: "+49 30 1234 5678" },
    { label: "Nationality", value: "German" },
    { label: "Study", value: "TU Berlin" },
    { label: "Degree", value: "Master" },
    { label: "Interest", value: "Photography, Cycling" },
    { label: "Freelance", value: "Available" },
  ],
  social_links: [
    { platform: "facebook", url: "https://facebook.com/" },
    { platform: "x", url: "https://x.com/" },
    { platform: "instagram", url: "https://instagram.com/" },
    { platform: "dribbble", url: "https://dribbble.com/" },
    { platform: "github", url: "https://github.com/" },
  ],
  skill_tools: [],
};

export const demoServices: Service[] = [
  { id: "s1", title: "Web Development", short_description: "Fast, secure websites and web apps built with modern tools and easy to update from a dashboard.", icon_key: "monitor", active: true, sort_order: 1 },
  { id: "s2", title: "UI / UX Design", short_description: "Clean, modern interfaces designed around your users, from wireframes to polished screens.", icon_key: "layers", active: true, sort_order: 2 },
  { id: "s3", title: "Mobile Friendly", short_description: "Every page looks great and works smoothly on phones, tablets and large screens.", icon_key: "mobile", active: true, sort_order: 3 },
  { id: "s4", title: "Branding", short_description: "Logo, colours and a consistent visual style that make your brand easy to remember.", icon_key: "palette", active: true, sort_order: 4 },
  { id: "s5", title: "SEO Optimisation", short_description: "Solid technical SEO, fast loading and clear structure so people find you on Google.", icon_key: "search", active: true, sort_order: 5 },
  { id: "s6", title: "Photography", short_description: "Portraits and product photos that give your website a real, personal feel.", icon_key: "camera", active: true, sort_order: 6 },
];

const story = {
  challenge:
    "The client had a great product but an outdated website that was slow on mobile and hard to update. Visitors left before they understood what the product did.",
  solution:
    "We rewrote the key messages, designed a clean mobile-first layout and built it with a fast, modern stack. A simple dashboard lets the team edit every section on their own.",
  result:
    "Pages now load in under a second, bounce rate dropped by a third and the team publishes new content every week without a developer.",
};

export const demoProjects: Project[] = [
  { id: "p1", title: "Summit Outdoor Store", slug: "summit-outdoor-store", category: "Web Design", year: 2026, client: "Summit Gear", role: "Design & Development", intro: "An online store for outdoor gear with quick checkout and a trip journal.", ...story, cover_image_url: "/demo/pf-mountains.svg", gallery: ["/demo/pf-mountains.svg", "/demo/pf-workspace.svg"], live_url: "https://example.com", likes: 240, featured: true, status: "published", sort_order: 1 },
  { id: "p2", title: "Lens & Light Studio", slug: "lens-and-light-studio", category: "Photography", year: 2026, client: "Lens & Light", role: "Photography, Website", intro: "Portfolio website and photo shoot for a small photography studio.", ...story, cover_image_url: "/demo/pf-camera.svg", gallery: ["/demo/pf-camera.svg", "/demo/pf-architecture.svg"], live_url: null, likes: 310, featured: true, status: "published", sort_order: 2 },
  { id: "p3", title: "Nord Coffee Identity", slug: "nord-coffee-identity", category: "Branding", year: 2025, client: "Nord Coffee", role: "Brand Identity", intro: "Logo, packaging and a calm Nordic visual style for a speciality coffee brand.", ...story, cover_image_url: "/demo/pf-brand.svg", gallery: ["/demo/pf-brand.svg", "/demo/pf-mobile.svg"], live_url: null, likes: 180, featured: false, status: "published", sort_order: 3 },
  { id: "p4", title: "Pulse Fitness App", slug: "pulse-fitness-app", category: "Mobile App", year: 2025, client: "Pulse", role: "UI/UX Design", intro: "A workout tracker app with habit streaks and simple progress charts.", ...story, cover_image_url: "/demo/pf-mobile.svg", gallery: ["/demo/pf-mobile.svg", "/demo/pf-brand.svg"], live_url: "https://example.com", likes: 275, featured: false, status: "published", sort_order: 4 },
  { id: "p5", title: "Atlas Architects", slug: "atlas-architects", category: "Web Design", year: 2024, client: "Atlas Architects", role: "Design & Development", intro: "A minimal portfolio website for an architecture office with large project galleries.", ...story, cover_image_url: "/demo/pf-architecture.svg", gallery: ["/demo/pf-architecture.svg", "/demo/pf-mountains.svg"], live_url: null, likes: 205, featured: false, status: "published", sort_order: 5 },
  { id: "p6", title: "Remote Desk Dashboard", slug: "remote-desk-dashboard", category: "Web Design", year: 2024, client: "Remote Desk", role: "Front-end Development", intro: "A booking dashboard for a co-working space with live desk availability.", ...story, cover_image_url: "/demo/pf-workspace.svg", gallery: ["/demo/pf-workspace.svg", "/demo/pf-camera.svg"], live_url: null, likes: 190, featured: false, status: "published", sort_order: 6 },
];

export const demoResume: ResumeItem[] = [
  { id: "r1", type: "experience", title: "Freelance Web Developer", subtitle: "Self-employed — Berlin", period: "2022 – Present", badge: null, description: "Websites, web apps and brand design for startups and small businesses across Europe.", active: true, sort_order: 1 },
  { id: "r2", type: "experience", title: "Senior Front-end Developer", subtitle: "Pixelwerk Agency", period: "2019 – 2022", badge: null, description: "Led front-end work for e-commerce and SaaS clients and mentored two junior developers.", active: true, sort_order: 2 },
  { id: "r3", type: "experience", title: "Web Designer", subtitle: "Studio Nord", period: "2017 – 2019", badge: null, description: "Designed and built landing pages, email templates and brand assets.", active: true, sort_order: 3 },
  { id: "r4", type: "education", title: "Master in Computer Science", subtitle: "TU Berlin", period: "2015 – 2017", badge: null, description: "Focus on human–computer interaction and web technologies.", active: true, sort_order: 1 },
  { id: "r5", type: "education", title: "Bachelor in Media Design", subtitle: "HTW Berlin", period: "2012 – 2015", badge: null, description: "Typography, visual design, photography and interactive media.", active: true, sort_order: 2 },
  { id: "r6", type: "education", title: "UX Design Certificate", subtitle: "Interaction Design Foundation", period: "2020", badge: null, description: "User research, usability testing and design systems.", active: true, sort_order: 3 },
];

export const demoSkills: Skill[] = [
  { id: "k1", name: "HTML & CSS", category: "Programming Skills", display: "bar", level: 95, active: true, sort_order: 1 },
  { id: "k2", name: "JavaScript / TypeScript", category: "Programming Skills", display: "bar", level: 88, active: true, sort_order: 2 },
  { id: "k3", name: "React & Next.js", category: "Programming Skills", display: "bar", level: 85, active: true, sort_order: 3 },
  { id: "k4", name: "Figma", category: "Design Skills", display: "bar", level: 90, active: true, sort_order: 4 },
  { id: "k5", name: "Photoshop", category: "Design Skills", display: "bar", level: 78, active: true, sort_order: 5 },
  { id: "k6", name: "Branding", category: "Design Skills", display: "bar", level: 72, active: true, sort_order: 6 },
  { id: "k7", name: "German", category: "Language Skills", display: "circle", level: 100, active: true, sort_order: 7 },
  { id: "k8", name: "English", category: "Language Skills", display: "circle", level: 90, active: true, sort_order: 8 },
  { id: "k9", name: "Spanish", category: "Language Skills", display: "circle", level: 55, active: true, sort_order: 9 },
  { id: "k10", name: "Website hosting", category: "Knowledge", display: "tag", level: 0, active: true, sort_order: 10 },
  { id: "k11", name: "iOS and Android apps", category: "Knowledge", display: "tag", level: 0, active: true, sort_order: 11 },
  { id: "k12", name: "Create logo design", category: "Knowledge", display: "tag", level: 0, active: true, sort_order: 12 },
  { id: "k13", name: "Design for print", category: "Knowledge", display: "tag", level: 0, active: true, sort_order: 13 },
  { id: "k14", name: "Modern and mobile-ready", category: "Knowledge", display: "tag", level: 0, active: true, sort_order: 14 },
  { id: "k15", name: "Advertising services", category: "Knowledge", display: "tag", level: 0, active: true, sort_order: 15 },
];

export const demoStats: Stat[] = [
  { id: "st1", value: "8+", label: "Years of experience", placement: "band", percent: 0, active: true, sort_order: 1 },
  { id: "st2", value: "140+", label: "Projects completed", placement: "band", percent: 0, active: true, sort_order: 2 },
  { id: "st3", value: "90+", label: "Happy clients", placement: "band", percent: 0, active: true, sort_order: 3 },
  { id: "st4", value: "12", label: "Awards won", placement: "band", percent: 0, active: true, sort_order: 4 },
];

export const demoProcess: ProcessStep[] = [
  { id: "ps1", title: "Discuss", description: "A short call to understand your goals, audience and budget.", active: true, sort_order: 1 },
  { id: "ps2", title: "Design", description: "Wireframes and visual design you can review and comment on.", active: true, sort_order: 2 },
  { id: "ps3", title: "Develop", description: "Clean, fast code with weekly previews on a live link.", active: true, sort_order: 3 },
  { id: "ps4", title: "Launch", description: "Go live, then support and small updates when you need them.", active: true, sort_order: 4 },
];

export const demoTestimonials: Testimonial[] = [
  { id: "t1", name: "Sofia Lindqvist", role: "Founder", company: "Nord Coffee", project_title: "Brand Identity", quote: "Julian understood our brand from the first call. The new identity and website feel exactly like us — calm, simple and warm.", avatar_url: "/demo/avatar-1.svg", rating: 5, active: true, sort_order: 1 },
  { id: "t2", name: "Marcus Bell", role: "CEO", company: "Summit Gear", project_title: "Online Store", quote: "Fast, reliable and full of good ideas. Our online sales grew 35% in the first three months after launch.", avatar_url: "/demo/avatar-2.svg", rating: 5, active: true, sort_order: 2 },
  { id: "t3", name: "Emma Novak", role: "Product Manager", company: "Pulse", project_title: "Fitness App", quote: "The app design is clean and easy to use. Julian was always on time and explained every decision clearly.", avatar_url: "/demo/avatar-3.svg", rating: 5, active: true, sort_order: 3 },
];

export const demoClients: Client[] = [
  { id: "c1", name: "Nord", category: "Brand", logo_url: "/demo/logo-nord.svg", website_url: null, active: true, sort_order: 1 },
  { id: "c2", name: "Atlas", category: "Brand", logo_url: "/demo/logo-atlas.svg", website_url: null, active: true, sort_order: 2 },
  { id: "c3", name: "Lumen", category: "Brand", logo_url: "/demo/logo-lumen.svg", website_url: null, active: true, sort_order: 3 },
  { id: "c4", name: "Kite", category: "Brand", logo_url: "/demo/logo-kite.svg", website_url: null, active: true, sort_order: 4 },
  { id: "c5", name: "Orbit", category: "Brand", logo_url: "/demo/logo-orbit.svg", website_url: null, active: true, sort_order: 5 },
  { id: "c6", name: "Vela", category: "Brand", logo_url: "/demo/logo-vela.svg", website_url: null, active: true, sort_order: 6 },
];

export const demoPricing: PricingPlan[] = [
  { id: "pr1", name: "Basic", tagline: "Landing page", price: "$690", period: "one-time", description: "A single, beautiful page to present you or your product.", features: ["1 responsive page", "Contact form", "Basic SEO", "5-day delivery"], cta_label: "Choose Plan", highlighted: false, active: true, sort_order: 1 },
  { id: "pr2", name: "Standard", tagline: "Most popular", price: "$1,900", period: "one-time", description: "A complete website with admin dashboard, blog and SEO.", features: ["Up to 6 pages", "Admin dashboard", "Blog & SEO setup", "Speed optimisation", "30 days support"], cta_label: "Choose Plan", highlighted: true, active: true, sort_order: 2 },
  { id: "pr3", name: "Premium", tagline: "Web app", price: "$4,500", period: "starting from", description: "Custom web apps with accounts, payments and integrations.", features: ["Custom features", "User accounts", "Online payments", "API integrations", "90 days support"], cta_label: "Choose Plan", highlighted: false, active: true, sort_order: 3 },
];

export const demoPosts: BlogPost[] = [
  {
    id: "b1",
    title: "Format releases a new tool that makes portfolio hosting simple",
    slug: "new-tool-portfolio-hosting",
    excerpt: "A quick look at the new wave of simple hosting tools for designers and developers — and what they mean for your portfolio.",
    content:
      "Hosting a portfolio used to mean servers, FTP and a lot of patience. Today it takes a few clicks.\n\n## Why it matters\nYour portfolio is often the first thing a client sees. If it is slow or broken, you lose the job before the first call.\n\n## What to look for\n- Automatic HTTPS\n- Deploys from GitHub\n- A free plan for small sites\n\n## My setup\nI use Next.js, a small database for content and a hosting platform that deploys every push automatically. Updates take seconds, not hours.",
    cover_image_url: "/demo/news-sneakers.svg",
    category: "Tools",
    read_time: "4 min read",
    published_at: "2026-09-18",
    status: "published",
  },
  {
    id: "b2",
    title: "How I find direction when starting a new design",
    slug: "finding-direction-new-design",
    excerpt: "Blank canvas? These five questions help me pick a clear direction before I open Figma.",
    content:
      "Every project starts with a blank page. These questions help me move forward quickly.\n\n## 1. Who is it for?\nA website for teenagers looks very different from one for lawyers.\n\n## 2. What is the one action?\nBook a call, buy a product, read an article — pick one.\n\n## 3. What should it feel like?\nThree words, for example calm, bold and friendly.\n\n## 4. What do competitors do?\nLook, learn and then do something different.\n\n## 5. What content exists?\nDesign around real text and photos, never lorem ipsum.",
    cover_image_url: "/demo/news-compass.svg",
    category: "Design",
    read_time: "5 min read",
    published_at: "2026-09-02",
    status: "published",
  },
  {
    id: "b3",
    title: "Why small details make websites feel alive",
    slug: "small-details-websites-alive",
    excerpt: "Hover effects, smooth scrolling and a custom cursor — small touches that make a big difference.",
    content:
      "Good websites are not only about layout and colour. Small details make them feel alive.\n\n## Motion with purpose\nAnimations should guide the eye, not distract it. Keep them short and smooth.\n\n## Feedback everywhere\nButtons that react, forms that confirm and links that change on hover all tell users the site is listening.\n\n## Respect the user\nAlways turn heavy motion off for people who prefer reduced motion in their system settings.",
    cover_image_url: "/demo/news-cat.svg",
    category: "Web Design",
    read_time: "3 min read",
    published_at: "2026-08-20",
    status: "published",
  },
  {
    id: "b4",
    title: "A calm home studio setup for focused work",
    slug: "calm-home-studio-setup",
    excerpt: "The simple desk, light and tools I use every day to stay focused while working from home.",
    content:
      "A good workspace does not need to be expensive. It needs to be calm.\n\n## Light\nWarm, indirect light in the evening and daylight during the day.\n\n## One screen\nA single large monitor keeps me focused on one task at a time.\n\n## Sound\nGood headphones and a simple playlist without lyrics.\n\n## Routine\nThe same start time and a short walk before work make the biggest difference of all.",
    cover_image_url: "/demo/news-studio.svg",
    category: "Lifestyle",
    read_time: "3 min read",
    published_at: "2026-08-04",
    status: "published",
  },
];

export const demoAwards: Award[] = [
  { id: "a1", title: "Site of the Day", organization: "Awwwards", year: "2026", short_description: "For the Summit Outdoor Store website — design, usability and creativity.", image_url: "/demo/award-1.svg", link_url: null, active: true, sort_order: 1 },
  { id: "a2", title: "Top Rated Freelancer", organization: "Upwork", year: "2025", short_description: "Top 3% of freelancers for five-star client feedback and on-time delivery.", image_url: "/demo/award-2.svg", link_url: null, active: true, sort_order: 2 },
  { id: "a3", title: "Certified UX Designer", organization: "IxDF", year: "2024", short_description: "Professional certificate in user experience and interaction design.", image_url: "/demo/award-3.svg", link_url: null, active: true, sort_order: 3 },
];
