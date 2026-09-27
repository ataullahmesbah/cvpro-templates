import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Mail, MapPin, Phone } from "lucide-react";
import { ClipReveal, Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { PageHead } from "@/components/site/page-head";
import { ContactForm } from "@/components/site/contact-form";
import { getProfile, getServices, getSettings } from "@/lib/data";
import { isSectionVisible } from "@/lib/sections";
import { isAllowedEmbedUrl } from "@/lib/admin/schema";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell me about your project. I usually reply within one working day.",
  alternates: { canonical: "/contact" },
};

type Props = { searchParams: Promise<{ service?: string | string[]; plan?: string | string[] }> };

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v)?.slice(0, 80) ?? "";

export default async function ContactPage({ searchParams }: Props) {
  const [settings, profile, services, query] = await Promise.all([getSettings(), getProfile(), getServices(), searchParams]);
  if (!isSectionVisible(settings.sections, "contact")) notFound();
  const plan = one(query.plan);
  const map = settings.map_embed_url && isAllowedEmbedUrl(settings.map_embed_url) ? settings.map_embed_url : null;
  const phone = settings.public_phone ?? profile.phone;
  const info = [
    profile.location && { Icon: MapPin, label: "Address", value: profile.location, href: null },
    { Icon: Mail, label: "Email", value: settings.contact_email, href: `mailto:${settings.contact_email}` },
    phone && { Icon: Phone, label: "Phone", value: phone, href: `tel:${phone.replace(/[^+\d]/g, "")}` },
  ].filter(Boolean) as { Icon: typeof Mail; label: string; value: string; href: string | null }[];

  return (
    <div className="page">
      <PageHead chip="Contact" title="Get in Touch" />

      {map && (
        <ClipReveal className="relative mb-12 aspect-[16/10] overflow-hidden bg-surface sm:aspect-[16/7]">
          <iframe
            src={map}
            title={`Map: ${profile.location || "location"}`}
            className="map-frame absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </ClipReveal>
      )}

      <Stagger className="mb-14 grid gap-6 sm:grid-cols-3">
        {info.map(({ Icon, label, value, href }) => (
          <StaggerItem key={label}>
            <div className="group flex h-full flex-col items-center gap-3 border border-line px-5 py-8 text-center transition-colors duration-300 hover:border-accent">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-surface text-heading transition-colors duration-300 group-hover:bg-accent group-hover:text-on-accent">
                <Icon size={20} aria-hidden />
              </span>
              <span className="font-heading text-[13px] font-semibold tracking-wider text-muted uppercase">{label}</span>
              {href ? (
                <a href={href} className="font-heading font-semibold break-all text-heading hover:text-accent-ink">
                  {value}
                </a>
              ) : (
                <span className="font-heading font-semibold text-heading">{value}</span>
              )}
            </div>
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal>
        <ContactForm
          services={services.map((s) => s.title)}
          defaultService={one(query.service)}
          defaultMessage={plan ? `Hi! I'm interested in the ${plan} plan.` : ""}
        />
      </Reveal>
    </div>
  );
}
