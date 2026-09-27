import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import type { Award } from "@/types/content";

export function Awards({ awards }: { awards: Award[] }) {
  if (!awards.length) return null;
  return (
    <section aria-label="Awards">
      <h2 className="block-title mb-8">Awards</h2>
      <Stagger className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {awards.map((a) => (
          <StaggerItem key={a.id}>
            <article className="group h-full border border-line bg-card transition-transform duration-500 hover:-translate-y-1.5">
              <div className="relative aspect-[16/10] overflow-hidden bg-surface">
                <Image src={a.image_url} alt="" fill sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw" className="mono object-cover group-hover:scale-105" />
              </div>
              <div className="p-6">
                <p className="font-heading text-[13px] font-medium text-muted italic">{[a.organization, a.year].filter(Boolean).join(" / ")}</p>
                <h3 className="mt-2 text-[18px] font-bold">
                  {a.link_url ? (
                    <a href={a.link_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-accent-ink">
                      {a.title} <ArrowUpRight size={16} aria-hidden />
                    </a>
                  ) : (
                    a.title
                  )}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed">{a.short_description}</p>
              </div>
            </article>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
