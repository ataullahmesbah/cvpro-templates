"use client";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/types/content";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const facts = [
    { label: "Client", value: project.client },
    { label: "Category", value: project.category },
    { label: "Year", value: String(project.year) },
    { label: "Role", value: project.role },
  ].filter((f) => f.value);

  return (
    <motion.div className="fixed inset-0 z-[60] grid place-items-center overflow-y-auto bg-black/75 p-4 backdrop-blur-sm sm:p-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        className="relative w-full max-w-[900px] bg-bg"
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.97 }}
        transition={{ duration: 0.45, ease }}
        onClick={(e) => e.stopPropagation()}
      >
        <button ref={closeRef} type="button" onClick={onClose} className="absolute top-3 right-3 z-10 grid h-11 w-11 place-items-center bg-bg text-heading transition-colors hover:text-accent-ink" aria-label="Close">
          <X size={22} />
        </button>
        <div className="relative aspect-[16/9] bg-surface">
          <Image src={project.cover_image_url} alt={project.title} fill sizes="(min-width: 940px) 900px, 100vw" className="object-cover" />
        </div>
        <div className="p-7 sm:p-10">
          <span className="chip">{project.category}</span>
          <h2 id="project-modal-title" className="mt-3 text-[clamp(1.5rem,3vw,2rem)] font-bold">
            {project.title}
          </h2>
          <p className="mt-4">{project.intro}</p>
          <dl className="mt-6 grid gap-x-8 gap-y-2 border-t border-line pt-6 sm:grid-cols-2">
            {facts.map((f) => (
              <div key={f.label} className="flex gap-3">
                <dt className="w-[80px] shrink-0 font-heading font-bold text-heading">{f.label}:</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href={`/portfolio/${project.slug}`} className="btn btn-solid">
              View Details <ArrowRight size={17} aria-hidden />
            </Link>
            {project.live_url && (
              <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="btn btn-line">
                Live Site <ArrowUpRight size={17} aria-hidden />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function PortfolioGrid({ projects }: { projects: Project[] }) {
  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState<Project | null>(null);
  const list = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      {categories.length > 2 && (
        <div role="tablist" aria-label="Filter projects" className="mb-10 flex flex-wrap gap-x-7 gap-y-3">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={filter === c}
              onClick={() => setFilter(c)}
              className={cn("relative pb-1 font-heading text-[15px] font-semibold transition-colors", filter === c ? "text-heading" : "text-muted hover:text-heading")}
            >
              {c}
              {filter === c && <motion.span layoutId="pf-filter" className="absolute inset-x-0 -bottom-0.5 h-[2px] bg-accent" />}
            </button>
          ))}
        </div>
      )}

      <LayoutGroup>
        <motion.ul layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <motion.li
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.5, ease, delay: Math.min(i, 6) * 0.05 }}
              >
                <button type="button" onClick={() => setOpen(p)} className="group relative block aspect-square w-full overflow-hidden bg-surface text-left" aria-label={`${p.title} — ${p.category}`}>
                  <Image src={p.cover_image_url} alt="" fill sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw" className="mono object-cover group-hover:scale-110" />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100" />
                  <span className="absolute inset-x-0 bottom-0 translate-y-4 p-6 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                    <span className="block font-heading text-[18px] font-bold text-white">{p.title}</span>
                    <span className="mt-1 block font-heading text-[13px] text-white/75 italic">{p.category}</span>
                  </span>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </LayoutGroup>

      <AnimatePresence>{open && <ProjectModal project={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </>
  );
}
