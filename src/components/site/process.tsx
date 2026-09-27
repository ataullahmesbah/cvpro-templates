import { Stagger, StaggerItem } from "@/components/motion/reveal";
import type { ProcessStep } from "@/types/content";

export function Process({ steps }: { steps: ProcessStep[] }) {
  if (!steps.length) return null;
  return (
    <section aria-label="Work process">
      <h2 className="block-title mb-10">How I Work</h2>
      <Stagger className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {steps.map((s, i) => (
          <StaggerItem key={s.id} className="group relative">
            {i < steps.length - 1 && <span aria-hidden className="absolute top-7 left-16 hidden h-px w-[calc(100%-3rem)] bg-line lg:block" />}
            <span className="relative grid h-14 w-14 place-items-center rounded-full border-2 border-heading bg-bg font-heading text-lg font-extrabold text-heading transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-5 text-[18px] font-bold">{s.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed">{s.description}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
