import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/types/content";
import { formatDate } from "@/lib/utils";

export function NewsCard({ post, author }: { post: BlogPost; author: string }) {
  return (
    <article className="group h-full bg-card shadow-[var(--shadow)]">
      <Link href={`/news/${post.slug}`} className="block h-full">
        <div className="relative aspect-[16/10] overflow-hidden bg-surface">
          <Image src={post.cover_image_url} alt="" fill sizes="(min-width: 1040px) 480px, (min-width: 640px) 50vw, 100vw" className="mono object-cover group-hover:scale-105" />
        </div>
        <div className="px-7 py-8 sm:px-10">
          <p className="border-b border-line pb-3 font-heading text-[13px] font-medium text-muted uppercase italic">
            By {author} / {formatDate(post.published_at)}
          </p>
          <h3 className="mt-4 text-[19px] leading-snug font-bold transition-colors group-hover:text-accent-ink">{post.title}</h3>
          <span aria-hidden className="mt-6 block h-[2px] w-6 bg-heading transition-all duration-500 group-hover:w-14 group-hover:bg-accent" />
        </div>
      </Link>
    </article>
  );
}
