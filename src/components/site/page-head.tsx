import { Reveal } from "@/components/motion/reveal";

/** "ABOUT" chip + big page title, like the reference CV theme. */
export function PageHead({ chip, title, as = "h1" }: { chip: string; title: string; as?: "h1" | "h2" }) {
  const Tag = as;
  return (
    <Reveal y={24} className="mb-12 sm:mb-14">
      <span className="chip">{chip}</span>
      <Tag className="page-title">{title}</Tag>
    </Reveal>
  );
}

/** Smaller title for blocks inside a page (Skills, Resume …). */
export function BlockTitle({ children }: { children: React.ReactNode }) {
  return (
    <Reveal y={20}>
      <h2 className="block-title mb-8">{children}</h2>
    </Reveal>
  );
}
