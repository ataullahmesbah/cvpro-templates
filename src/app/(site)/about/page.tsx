import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHead } from "@/components/site/page-head";
import { AboutIntro } from "@/components/site/about-intro";
import { Skills } from "@/components/site/skills";
import { Resume } from "@/components/site/resume";
import { Stats } from "@/components/site/stats";
import { Testimonials } from "@/components/site/testimonials";
import { Clients } from "@/components/site/clients";
import { Awards } from "@/components/site/awards";
import { getAwards, getClients, getProfile, getResume, getSettings, getSkills, getStats, getTestimonials } from "@/lib/data";
import { contactLink, isSectionVisible, pageBlocks, type SectionKey } from "@/lib/sections";

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile();
  return {
    title: "About",
    description: (profile.bio || profile.short_intro).slice(0, 160),
    alternates: { canonical: "/about" },
  };
}

export default async function AboutPage() {
  const [settings, profile, skills, stats, resume, testimonials, clients, awards] = await Promise.all([
    getSettings(),
    getProfile(),
    getSkills(),
    getStats(),
    getResume(),
    getTestimonials(),
    getClients(),
    getAwards(),
  ]);
  if (!isSectionVisible(settings.sections, "about")) notFound();
  const contactHref = contactLink(settings.sections, settings.contact_email);

  const render: Partial<Record<SectionKey, React.ReactNode>> = {
    about: <AboutIntro profile={profile} contactHref={contactHref} hireLabel={settings.hire_label} />,
    skills: skills.length ? <Skills skills={skills} /> : null,
    resume: resume.length ? <Resume items={resume} /> : null,
    stats: stats.length ? <Stats stats={stats} /> : null,
    testimonials: testimonials.length ? <Testimonials items={testimonials} /> : null,
    clients: clients.length ? <Clients clients={clients} /> : null,
    awards: awards.length ? <Awards awards={awards} /> : null,
  };
  const blocks = pageBlocks(settings.sections, "about").filter((k) => render[k]);

  return (
    <div className="page">
      <PageHead chip="About" title="About Me" />
      <div className="flex flex-col gap-24">
        {blocks.map((k) => (
          <div key={k}>{render[k]}</div>
        ))}
      </div>
    </div>
  );
}
