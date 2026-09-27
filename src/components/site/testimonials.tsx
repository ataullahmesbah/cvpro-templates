"use client";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useEffect, useState } from "react";
import type { Testimonial } from "@/types/content";
import { cn } from "@/lib/utils";

export function Testimonials({ items }: { items: Testimonial[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = items.length;

  useEffect(() => {
    if (count < 2 || paused) return;
    const t = setInterval(() => setI((v) => (v + 1) % count), 6500);
    return () => clearInterval(t);
  }, [count, paused]);

  if (!count) return null;
  const t = items[i % count];
  const go = (d: number) => setI((v) => (v + d + count) % count);

  return (
    <section aria-label="Testimonials" aria-roledescription="carousel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      <h2 className="block-title mb-8">Testimonials</h2>
      <AnimatePresence mode="wait">
        <motion.figure
          key={t.id}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          aria-live="polite"
        >
          <div className="relative border border-line px-7 py-8 sm:px-10 sm:py-10">
            <Quote size={34} className="absolute top-6 right-6 text-accent-ink opacity-40" aria-hidden />
            <div className="mb-4 flex gap-1 text-accent" aria-label={`${t.rating} out of 5 stars`}>
              {Array.from({ length: t.rating }, (_, k) => (
                <Star key={k} size={15} fill="currentColor" aria-hidden />
              ))}
            </div>
            <blockquote className="font-heading text-[17px] leading-[1.9] font-medium text-heading/85 italic">&ldquo;{t.quote}&rdquo;</blockquote>
            {/* speech-bubble tail */}
            <span aria-hidden className="absolute -bottom-[10px] left-12 h-5 w-5 rotate-45 border-r border-b border-line bg-bg" />
          </div>
          <figcaption className="mt-8 flex items-center gap-4 pl-4">
            {t.avatar_url && (
              <span className="relative h-14 w-14 overflow-hidden rounded-full bg-surface">
                <Image src={t.avatar_url} alt="" fill sizes="56px" className="object-cover" />
              </span>
            )}
            <span>
              <span className="block font-heading font-bold text-heading">{t.name}</span>
              <span className="block text-sm">{[t.role, t.company].filter(Boolean).join(", ")}</span>
            </span>
          </figcaption>
        </motion.figure>
      </AnimatePresence>

      {count > 1 && (
        <div className="mt-8 flex items-center gap-4">
          <button type="button" onClick={() => go(-1)} className="grid h-10 w-10 place-items-center border border-line text-heading transition-colors hover:border-accent hover:text-accent-ink" aria-label="Previous testimonial">
            <ChevronLeft size={18} />
          </button>
          <div className="flex gap-2">
            {items.map((x, k) => (
              <button
                key={x.id}
                type="button"
                onClick={() => setI(k)}
                aria-label={`Show testimonial ${k + 1}`}
                aria-current={k === i % count}
                className={cn("h-2 rounded-full transition-all duration-300", k === i % count ? "w-7 bg-accent" : "w-2 bg-track hover:bg-muted")}
              />
            ))}
          </div>
          <button type="button" onClick={() => go(1)} className="grid h-10 w-10 place-items-center border border-line text-heading transition-colors hover:border-accent hover:text-accent-ink" aria-label="Next testimonial">
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </section>
  );
}
