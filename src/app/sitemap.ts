import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getPosts, getProjects, getSettings } from "@/lib/data";
import { isSectionVisible } from "@/lib/sections";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [allProjects, allPosts, settings] = await Promise.all([getProjects(), getPosts(), getSettings()]);
  const showWork = isSectionVisible(settings.sections, "portfolio");
  const showBlog = isSectionVisible(settings.sections, "blog");
  const pages = (["about", "services", "contact"] as const).filter((k) => isSectionVisible(settings.sections, k));
  const projects = showWork ? allProjects : [];
  const posts = showBlog ? allPosts : [];
  const base = siteConfig.url;
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...pages.map((k) => ({ url: `${base}/${k}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...(showWork ? [{ url: `${base}/portfolio`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.9 }] : []),
    ...(showBlog ? [{ url: `${base}/news`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.7 }] : []),
    ...projects.map((p) => ({
      url: `${base}/portfolio/${p.slug}`,
      lastModified: p.updated_at ? new Date(p.updated_at) : now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...posts.map((p) => ({
      url: `${base}/news/${p.slug}`,
      lastModified: new Date(p.updated_at ?? p.published_at),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
