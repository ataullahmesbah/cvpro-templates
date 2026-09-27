import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHead } from "@/components/site/page-head";
import { Services } from "@/components/site/services";
import { Process } from "@/components/site/process";
import { Pricing } from "@/components/site/pricing";
import { getPricing, getProcess, getServices, getSettings } from "@/lib/data";
import { contactLink, isSectionVisible, pageBlocks, type SectionKey } from "@/lib/sections";

export async function generateMetadata(): Promise<Metadata> {
  const services = await getServices();
  return {
    title: "Services",
    description: `Services: ${services.map((s) => s.title).join(", ")}.`.slice(0, 160),
    alternates: { canonical: "/services" },
  };
}

export default async function ServicesPage() {
  const [settings, services, process, pricing] = await Promise.all([getSettings(), getServices(), getProcess(), getPricing()]);
  if (!isSectionVisible(settings.sections, "services")) notFound();
  const contactHref = contactLink(settings.sections, settings.contact_email);

  const render: Partial<Record<SectionKey, React.ReactNode>> = {
    services: services.length ? <Services services={services} /> : null,
    process: process.length ? <Process steps={process} /> : null,
    pricing: pricing.length ? <Pricing plans={pricing} contactHref={contactHref} /> : null,
  };
  const blocks = pageBlocks(settings.sections, "services").filter((k) => render[k]);

  return (
    <div className="page">
      <PageHead chip="Services" title="What I Do" />
      <div className="flex flex-col gap-24">
        {blocks.map((k) => (
          <div key={k}>{render[k]}</div>
        ))}
      </div>
    </div>
  );
}
