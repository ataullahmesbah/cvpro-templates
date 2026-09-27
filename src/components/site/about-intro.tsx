import Image from "next/image";
import Link from "next/link";
import { Download } from "lucide-react";
import { ClipReveal, Reveal } from "@/components/motion/reveal";
import type { Profile } from "@/types/content";

export function AboutIntro({ profile, contactHref, hireLabel }: { profile: Profile; contactHref: string; hireLabel: string }) {
  const photo = profile.about_image_url || profile.hero_image_url || profile.profile_image_url;
  const paragraphs = profile.bio.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  return (
    <section aria-label="About me">
      <ClipReveal className="group relative aspect-[16/9] overflow-hidden bg-surface">
        <Image src={photo} alt={profile.full_name} fill preload sizes="(min-width: 1040px) 960px, 100vw" className="mono object-cover group-hover:scale-[1.03]" />
      </ClipReveal>

      <Reveal className="mt-10">
        <h2 className="text-[26px] font-bold">{profile.full_name}</h2>
        <p className="mt-1 font-heading text-[17px] font-medium text-muted">{profile.professional_title}</p>
      </Reveal>

      {paragraphs.length > 0 && (
        <Reveal className="divider mt-7 pt-7">
          {paragraphs.map((p, i) => (
            <p key={i} className="mb-3 last:mb-0">
              {p}
            </p>
          ))}
        </Reveal>
      )}

      {profile.personal_info.length > 0 && (
        <Reveal className="divider mt-7 pt-7">
          <dl className="grid gap-x-10 gap-y-2.5 sm:grid-cols-2">
            {profile.personal_info.map((row) => (
              <div key={row.label + row.value} className="flex gap-4">
                <dt className="w-[110px] shrink-0 font-heading font-bold text-heading">{row.label}:</dt>
                <dd className="min-w-0 break-words">{row.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      )}

      <Reveal className="divider mt-7 flex flex-wrap gap-4 pt-8">
        {profile.resume_url && (
          <a href={profile.resume_url} target="_blank" rel="noopener noreferrer" className="btn btn-solid">
            <Download size={17} aria-hidden /> Download CV
          </a>
        )}
        <Link href={contactHref} className={profile.resume_url ? "btn btn-line" : "btn btn-solid"}>
          {hireLabel}
        </Link>
      </Reveal>
    </section>
  );
}
