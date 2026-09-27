import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ClipReveal, Reveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/site/json-ld";
import { NewsCard } from "@/components/site/news-card";
import { RichText } from "@/components/site/rich-text";
import { getPostBySlug, getPosts, getProfile, getSettings } from "@/lib/data";
import { isSectionVisible } from "@/lib/sections";
import { siteConfig } from "@/config/site";
import { formatDate } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Article not found" };
  const isRaster = !post.cover_image_url.endsWith(".svg");
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/news/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `/news/${post.slug}`,
      publishedTime: post.published_at,
      images: [{ url: isRaster ? post.cover_image_url : "/opengraph-image" }],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.excerpt },
  };
}

export default async function NewsArticle({ params }: Props) {
  const { slug } = await params;
  const [post, posts, profile, settings] = await Promise.all([getPostBySlug(slug), getPosts(), getProfile(), getSettings()]);
  if (!post || !isSectionVisible(settings.sections, "blog")) notFound();
  const more = posts.filter((p) => p.id !== post.id).slice(0, 2);

  return (
    <article className="page">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.published_at,
          ...(post.updated_at ? { dateModified: post.updated_at } : {}),
          image: new URL(post.cover_image_url, siteConfig.url).toString(),
          url: `${siteConfig.url}/news/${post.slug}`,
          author: { "@type": "Person", name: profile.full_name, url: siteConfig.url },
        }}
      />
      <Reveal y={20}>
        <Link href="/news" className="inline-flex items-center gap-2 font-heading text-sm font-semibold text-muted hover:text-heading">
          <ArrowLeft size={16} aria-hidden /> All news
        </Link>
      </Reveal>
      <Reveal y={24} className="mt-8 max-w-[780px]">
        <span className="chip">{post.category}</span>
        <h1 className="page-title !leading-tight">{post.title}</h1>
        <p className="mt-4 font-heading text-[14px] font-medium text-muted uppercase italic">
          By {profile.full_name} / {formatDate(post.published_at)}
          {post.read_time ? ` / ${post.read_time}` : ""}
        </p>
      </Reveal>
      <ClipReveal className="relative mt-10 aspect-[16/9] overflow-hidden bg-surface">
        <Image src={post.cover_image_url} alt="" fill preload sizes="(min-width: 1040px) 960px, 100vw" className="object-cover" />
      </ClipReveal>
      <Reveal className="mt-12 max-w-[760px]">
        <RichText content={post.content} />
      </Reveal>

      {more.length > 0 && (
        <section aria-label="More news" className="divider mt-16 pt-14">
          <h2 className="block-title mb-8">More News</h2>
          <div className="grid gap-10 md:grid-cols-2">
            {more.map((p) => (
              <NewsCard key={p.id} post={p} author={profile.full_name} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
