import { CountUp } from "@/components/motion/count-up";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import type { Stat } from "@/types/content";

export function Stats({ stats }: { stats: Stat[] }) {
  if (!stats.length) return null;
  return (
    <section aria-label="In numbers">
      <Stagger className="grid grid-cols-2 border-t border-l border-line lg:grid-cols-4">
        {stats.map((s) => (
          <StaggerItem key={s.id} className="group border-r border-b border-line px-6 py-9 text-center transition-colors duration-300 hover:bg-card">
            <CountUp value={s.value} className="block font-heading text-[clamp(2rem,4vw,2.8rem)] leading-none font-extrabold text-heading transition-colors group-hover:text-accent-ink" />
            <span className="mt-3 block font-heading text-[14px] font-medium">{s.label}</span>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
