import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { PageHead } from "@/components/site/page-head";
import { NewsCard } from "@/components/site/news-card";
import { getPosts, getProfile, getSettings } from "@/lib/data";
import { isSectionVisible } from "@/lib/sections";

export const metadata: Metadata = {
  title: "News",
  description: "Latest articles on web design, development and working as a freelancer.",
  alternates: { canonical: "/news" },
};

export default async function NewsPage() {
  const [settings, profile, posts] = await Promise.all([getSettings(), getProfile(), getPosts()]);
  if (!isSectionVisible(settings.sections, "blog")) notFound();
  return (
    <div className="page">
      <PageHead chip="News" title="Latest News" />
      {posts.length ? (
        <Stagger className="grid gap-10 md:grid-cols-2">
          {posts.map((p) => (
            <StaggerItem key={p.id}>
              <NewsCard post={p} author={profile.full_name} />
            </StaggerItem>
          ))}
        </Stagger>
      ) : (
        <p>New articles are coming soon.</p>
      )}
    </div>
  );
}
