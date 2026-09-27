"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { BrandIcon } from "@/components/ui/brand-icon";
import { CountUp } from "@/components/motion/count-up";
import { Typed } from "@/components/site/typed";
import type { SocialLink, Stat } from "@/types/content";

type Props = {
  name: string;
  roles: string[];
  intro: string;
  photo: string;
  socials: SocialLink[];
  resumeUrl: string | null;
  contactHref: string;
  hireLabel: string;
  stats: Stat[];
};

const ease = [0.22, 1, 0.36, 1] as const;
const item = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease, delay },
});

export function HomeHero({ name, roles, intro, photo, socials, resumeUrl, contactHref, hireLabel, stats }: Props) {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden px-5 pt-[100px] pb-16 sm:px-10 lg:pt-16">
      <div className="mx-auto flex w-full max-w-[1000px] flex-col items-center gap-12 text-center md:flex-row md:gap-16 md:text-left">
        {/* Morphing photo */}
        <motion.div
          className="group relative shrink-0"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease }}
        >
          <div aria-hidden className="blob-ring absolute -inset-3 border-[7px] border-heading/15" />
          <div className="blob relative h-[240px] w-[240px] overflow-hidden bg-surface sm:h-[300px] sm:w-[300px]">
            <Image src={photo} alt={name} fill preload sizes="300px" className="mono object-cover" />
          </div>
        </motion.div>

        <div className="min-w-0">
          <motion.h1 {...item(0.15)} className="text-[clamp(2.3rem,6vw,3.6rem)] leading-[1.05] font-extrabold tracking-tight uppercase">
            {name}
          </motion.h1>
          <motion.p {...item(0.3)} className="mt-4 min-h-[1.4em] font-heading text-[clamp(1.3rem,2.6vw,1.75rem)] font-semibold text-heading">
            <Typed words={roles} />
          </motion.p>
          <motion.p {...item(0.45)} className="mt-4 max-w-[470px] font-heading text-[16px] leading-[1.9] font-medium md:max-w-[450px]">
            {intro}
          </motion.p>

          {socials.length > 0 && (
            <motion.ul {...item(0.6)} className="mt-6 flex flex-wrap justify-center gap-5 md:justify-start" aria-label="Social profiles">
              {socials.map((s) => (
                <li key={s.platform + s.url}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.platform}
                    className="inline-grid text-heading transition-all duration-300 hover:-translate-y-1 hover:text-accent-ink"
                  >
                    <BrandIcon name={s.platform} size={17} />
                  </a>
                </li>
              ))}
            </motion.ul>
          )}

          <motion.div {...item(0.75)} className="mt-9 flex flex-wrap justify-center gap-4 md:justify-start">
            <Link href={contactHref} className="btn btn-solid">
              {hireLabel}
            </Link>
            {resumeUrl && (
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-line">
                <Download size={17} aria-hidden /> Download CV
              </a>
            )}
          </motion.div>

          {stats.length > 0 && (
            <motion.dl {...item(0.9)} className="mt-11 flex flex-wrap justify-center gap-x-10 gap-y-5 md:justify-start">
              {stats.map((s) => (
                <div key={s.id}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <CountUp value={s.value} className="block font-heading text-3xl font-extrabold text-heading" />
                    <span className="text-sm text-muted">{s.label}</span>
                  </dd>
                </div>
              ))}
            </motion.dl>
          )}
        </div>
      </div>
    </section>
  );
}
