import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { ServiceIcon } from "@/components/ui/service-icon";
import type { Service } from "@/types/content";

export function Services({ services }: { services: Service[] }) {
  if (!services.length) return null;
  return (
    <section aria-label="Services">
      <Stagger className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <StaggerItem key={s.id}>
            <article className="group relative h-full overflow-hidden border border-line bg-card px-8 py-10 transition-transform duration-500 hover:-translate-y-2">
              {/* colour sweep on hover */}
              <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />
              <div className="flex items-start justify-between">
                <span className="grid h-14 w-14 place-items-center bg-surface text-heading transition-colors duration-500 group-hover:bg-accent group-hover:text-on-accent">
                  <ServiceIcon name={s.icon_key} className="h-6 w-6" />
                </span>
                <span className="font-heading text-[15px] font-bold text-muted">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="mt-7 text-[19px] font-bold">{s.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed">{s.short_description}</p>
            </article>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
