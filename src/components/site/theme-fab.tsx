import { ThemeToggle } from "@/components/ui/theme-toggle";

/** Floating light/dark switch on the right edge (desktop). On phones it sits in the top bar. */
export function ThemeFab() {
  return (
    <div className="fixed top-1/2 right-0 z-30 hidden -translate-y-1/2 rounded-l-full bg-card py-2 pr-3 pl-2.5 shadow-[var(--shadow)] lg:block">
      <ThemeToggle className="!border-0 text-heading hover:!text-accent-ink" />
    </div>
  );
}
