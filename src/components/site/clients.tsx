import Image from "next/image";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import type { Client } from "@/types/content";

export function Clients({ clients }: { clients: Client[] }) {
  if (!clients.length) return null;
  return (
    <section aria-label="Clients">
      <h2 className="block-title mb-8">Clients</h2>
      <Stagger className="grid grid-cols-2 border-t border-l border-line sm:grid-cols-3">
        {clients.map((c) => {
          const inner = c.logo_url ? (
            <Image src={c.logo_url} alt={c.name} width={180} height={60} className="h-11 w-auto object-contain opacity-60 transition-opacity duration-300 group-hover:opacity-100 dark:invert" />
          ) : (
            <span className="font-heading text-lg font-bold text-muted group-hover:text-heading">{c.name}</span>
          );
          return (
            <StaggerItem key={c.id} className="group grid h-[120px] place-items-center border-r border-b border-line px-6">
              {c.website_url ? (
                <a href={c.website_url} target="_blank" rel="noopener noreferrer" aria-label={c.name}>
                  {inner}
                </a>
              ) : (
                inner
              )}
            </StaggerItem>
          );
        })}
      </Stagger>
    </section>
  );
}
