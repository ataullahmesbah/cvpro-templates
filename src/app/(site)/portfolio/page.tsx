import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHead } from "@/components/site/page-head";
import { PortfolioGrid } from "@/components/site/portfolio-grid";
import { getProjects, getSettings } from "@/lib/data";
import { isSectionVisible } from "@/lib/sections";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Selected projects: websites, apps, branding and photography.",
  alternates: { canonical: "/portfolio" },
};

export default async function PortfolioPage() {
  const [settings, projects] = await Promise.all([getSettings(), getProjects()]);
  if (!isSectionVisible(settings.sections, "portfolio")) notFound();
  // Featured projects first, then the admin order.
  const sorted = [...projects].sort((a, b) => Number(b.featured) - Number(a.featured));
  return (
    <div className="page">
      <PageHead chip="Portfolio" title="Creative Portfolio" />
      {sorted.length ? <PortfolioGrid projects={sorted} /> : <p>New projects are coming soon.</p>}
    </div>
  );
}
