import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { ClipReveal, Reveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/site/json-ld";
import { getProfile, getProjectBySlug, getProjects, getSettings } from "@/lib/data";
import { contactLink, isSectionVisible } from "@/lib/sections";
import { siteConfig } from "@/config/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project not found" };
  const isRaster = !project.cover_image_url.endsWith(".svg");
  return {
    title: project.title,
    description: project.intro,
    alternates: { canonical: `/portfolio/${project.slug}` },
    openGraph: {
      type: "article",
      title: project.title,
      description: project.intro,
      url: `/portfolio/${project.slug}`,
      images: [{ url: isRaster ? project.cover_image_url : "/opengraph-image" }],
    },
    twitter: { card: "summary_large_image", title: project.title, description: project.intro },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const [project, projects, profile, settings] = await Promise.all([getProjectBySlug(slug), getProjects(), getProfile(), getSettings()]);
  if (!project || !isSectionVisible(settings.sections, "portfolio")) notFound();

  const i = projects.findIndex((p) => p.id === project.id);
  const prev = projects.length > 1 ? projects[(i - 1 + projects.length) % projects.length] : null;
  const next = projects.length > 1 ? projects[(i + 1) % projects.length] : null;
  const contactHref = contactLink(settings.sections, settings.contact_email);
  const facts = [
    { label: "Client", value: project.client },
    { label: "Category", value: project.category },
    { label: "Year", value: String(project.year) },
    { label: "Role", value: project.role },
  ].filter((f) => f.value);
  const story = [
    { title: "The Challenge", text: project.challenge },
    { title: "The Approach", text: project.solution },
    { title: "The Result", text: project.result },
  ].filter((s) => s.text);
  const gallery = project.gallery.filter((g) => g !== project.cover_image_url);

  return (
    <article className="page">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: project.title,
          description: project.intro,
          dateCreated: String(project.year),
          image: new URL(project.cover_image_url, siteConfig.url).toString(),
          url: `${siteConfig.url}/portfolio/${project.slug}`,
          creator: { "@type": "Person", name: profile.full_name, url: siteConfig.url },
        }}
      />
      <Reveal y={20}>
        <Link href="/portfolio" className="inline-flex items-center gap-2 font-heading text-sm font-semibold text-muted hover:text-heading">
          <ArrowLeft size={16} aria-hidden /> All projects
        </Link>
      </Reveal>
      <Reveal y={24} className="mt-8">
        <span className="chip">{project.category}</span>
        <h1 className="page-title">{project.title}</h1>
        <p className="mt-4 max-w-[680px] text-[17px]">{project.intro}</p>
      </Reveal>

      <ClipReveal className="group relative mt-10 aspect-[16/9] overflow-hidden bg-surface">
        <Image src={project.cover_image_url} alt={project.title} fill preload sizes="(min-width: 1040px) 960px, 100vw" className="object-cover" />
      </ClipReveal>

      <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="flex flex-col gap-10">
          {story.map((s) => (
            <Reveal key={s.title}>
              <h2 className="block-title">{s.title}</h2>
              <p className="mt-3 whitespace-pre-line">{s.text}</p>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <aside className="border border-line p-7 lg:sticky lg:top-10">
            <dl className="flex flex-col gap-4">
              {facts.map((f) => (
                <div key={f.label}>
                  <dt className="font-heading text-[13px] font-semibold tracking-wider text-muted uppercase">{f.label}</dt>
                  <dd className="font-heading font-bold text-heading">{f.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-7 flex flex-col gap-3">
              {project.live_url && (
                <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="btn btn-solid w-full">
                  Live Site <ArrowUpRight size={17} aria-hidden />
                </a>
              )}
              <Link href={contactHref} className="btn btn-line w-full">
                {settings.hire_label}
              </Link>
            </div>
          </aside>
        </Reveal>
      </div>

      {gallery.length > 0 && (
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {gallery.map((src, idx) => (
            <ClipReveal key={src + idx} className="relative aspect-[4/3] overflow-hidden bg-surface">
              <Image src={src} alt={`${project.title} — image ${idx + 1}`} fill sizes="(min-width: 768px) 480px, 100vw" className="object-cover" />
            </ClipReveal>
          ))}
        </div>
      )}

      {prev && next && (
        <nav aria-label="More projects" className="divider mt-16 grid gap-5 pt-10 sm:grid-cols-2">
          <Link href={`/portfolio/${prev.slug}`} className="group flex items-center gap-4 border border-line p-6 transition-colors hover:border-accent">
            <ArrowLeft className="shrink-0 transition-transform group-hover:-translate-x-1" aria-hidden />
            <span className="min-w-0">
              <span className="block text-sm text-muted">Previous</span>
              <span className="block truncate font-heading font-bold text-heading">{prev.title}</span>
            </span>
          </Link>
          <Link href={`/portfolio/${next.slug}`} className="group flex items-center justify-end gap-4 border border-line p-6 text-right transition-colors hover:border-accent">
            <span className="min-w-0">
              <span className="block text-sm text-muted">Next</span>
              <span className="block truncate font-heading font-bold text-heading">{next.title}</span>
            </span>
            <ArrowRight className="shrink-0 transition-transform group-hover:translate-x-1" aria-hidden />
          </Link>
        </nav>
      )}
    </article>
  );
}
