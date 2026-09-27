"use client";
import { motion, useInView } from "framer-motion";
import { Check } from "lucide-react";
import { useRef } from "react";
import type { Skill } from "@/types/content";

type Group = { title: string; display: Skill["display"]; items: Skill[] };

/** Groups skills by their group title, keeping the admin order. */
function groupSkills(skills: Skill[]): Group[] {
  const groups: Group[] = [];
  for (const s of skills) {
    const display = s.display ?? "bar";
    const found = groups.find((g) => g.title === s.category && g.display === display);
    if (found) found.items.push(s);
    else groups.push({ title: s.category, display, items: [s] });
  }
  return groups;
}

const ease = [0.22, 1, 0.36, 1] as const;

function Bars({ items }: { items: Skill[] }) {
  return (
    <ul className="flex flex-col gap-6">
      {items.map((s) => (
        <li key={s.id}>
          <div className="mb-2 flex justify-between font-heading text-[15px] font-semibold text-heading">
            <span>{s.name}</span>
            <span className="text-muted">{s.level}%</span>
          </div>
          <div className="h-[3px] w-full bg-track" role="progressbar" aria-label={s.name} aria-valuenow={s.level} aria-valuemin={0} aria-valuemax={100}>
            <motion.div
              className="h-full bg-accent"
              initial={{ width: 0 }}
              whileInView={{ width: `${s.level}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

function Circle({ skill }: { skill: Skill }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const r = 46;
  const len = 2 * Math.PI * r;
  return (
    <div ref={ref} className="flex flex-col items-center gap-3 text-center">
      <div className="relative h-[110px] w-[110px]" role="img" aria-label={`${skill.name}: ${skill.level}%`}>
        <svg viewBox="0 0 110 110" className="h-full w-full -rotate-90">
          <circle cx="55" cy="55" r={r} fill="none" stroke="var(--track)" strokeWidth="5" />
          <motion.circle
            cx="55"
            cy="55"
            r={r}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={len}
            initial={{ strokeDashoffset: len }}
            animate={{ strokeDashoffset: inView ? len * (1 - skill.level / 100) : len }}
            transition={{ duration: 1.6, ease }}
          />
        </svg>
        <span className="absolute inset-0 grid place-items-center font-heading text-lg font-bold text-heading">{skill.level}%</span>
      </div>
      <span className="font-heading text-[15px] font-semibold text-heading">{skill.name}</span>
    </div>
  );
}

function Tags({ items }: { items: Skill[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((s) => (
        <li key={s.id} className="flex items-center gap-3">
          <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent text-on-accent">
            <Check size={12} strokeWidth={3} aria-hidden />
          </span>
          <span className="font-heading text-[15px] font-medium">{s.name}</span>
        </li>
      ))}
    </ul>
  );
}

export function Skills({ skills }: { skills: Skill[] }) {
  const groups = groupSkills(skills);
  if (!groups.length) return null;
  const bars = groups.filter((g) => g.display === "bar");
  const others = groups.filter((g) => g.display !== "bar");
  return (
    <section aria-label="Skills" className="flex flex-col gap-16">
      {bars.length > 0 && (
        <div className="grid gap-14 md:grid-cols-2 md:gap-16">
          {bars.map((g) => (
            <motion.div key={g.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease }}>
              <h2 className="block-title mb-8">{g.title}</h2>
              <Bars items={g.items} />
            </motion.div>
          ))}
        </div>
      )}
      {others.length > 0 && (
        <div className="grid gap-14 md:grid-cols-2 md:gap-16">
          {others.map((g) => (
            <motion.div key={g.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease }}>
              <h2 className="block-title mb-8">{g.title}</h2>
              {g.display === "circle" ? (
                <div className="flex flex-wrap gap-8">
                  {g.items.map((s) => (
                    <Circle key={s.id} skill={s} />
                  ))}
                </div>
              ) : (
                <Tags items={g.items} />
              )}
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
