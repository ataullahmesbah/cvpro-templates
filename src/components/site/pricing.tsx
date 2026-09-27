import Link from "next/link";
import { Check } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import type { PricingPlan } from "@/types/content";
import { cn } from "@/lib/utils";

export function Pricing({ plans, contactHref }: { plans: PricingPlan[]; contactHref: string }) {
  if (!plans.length) return null;
  const href = (plan: string) => (contactHref.startsWith("/") ? `${contactHref}?plan=${encodeURIComponent(plan)}` : contactHref);
  return (
    <section aria-label="Pricing">
      <h2 className="block-title mb-10">Pricing</h2>
      <Stagger className="grid gap-7 md:grid-cols-3">
        {plans.map((p) => (
          <StaggerItem key={p.id}>
            <article className={cn("relative flex h-full flex-col border bg-card px-8 py-10 transition-transform duration-500 hover:-translate-y-2", p.highlighted ? "border-accent" : "border-line")}>
              {p.highlighted && <span className="absolute -top-3 left-8 bg-accent px-3 py-0.5 font-heading text-[12px] font-bold tracking-wider text-on-accent uppercase">Popular</span>}
              <h3 className="text-[20px] font-bold">{p.name}</h3>
              {p.tagline && <p className="mt-1 font-heading text-[14px] font-medium text-muted italic">{p.tagline}</p>}
              <p className="mt-6 flex items-baseline gap-2">
                <span className="font-heading text-[40px] leading-none font-extrabold text-heading">{p.price}</span>
                {p.period && <span className="text-sm">{p.period}</span>}
              </p>
              {p.description && <p className="mt-4 text-[15px] leading-relaxed">{p.description}</p>}
              <ul className="mt-6 flex flex-col gap-2.5 border-t border-line pt-6">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-[15px]">
                    <Check size={16} className="mt-1 shrink-0 text-accent-ink" aria-hidden /> {f}
                  </li>
                ))}
              </ul>
              <Link href={href(p.name)} prefetch={false} className={cn("btn mt-auto w-full", p.highlighted ? "btn-accent" : "btn-line")} style={{ marginTop: "2rem" }}>
                {p.cta_label}
              </Link>
            </article>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
