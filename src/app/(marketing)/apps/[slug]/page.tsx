import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAppBySlugAsync,
  getSimilarAppsAsync,
} from "@/lib/db/apps";
import type { App } from "@/db/schema";
import AppDetailPage from "@/components/apps/AppDetailPage";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}


export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const app = await getAppBySlugAsync(slug);
  return {
    title: app ? `${app.name} – HSWLP` : "App – HSWLP",
    description: app?.description,
  };
}

export default async function AppPage({ params }: PageProps) {
  const { slug } = await params;
  const app: App | undefined = await getAppBySlugAsync(slug);
  if (!app) return notFound();
  if (app.category) {
    await getSimilarAppsAsync(app.category, slug)
  }
  return <AppDetailPage app={app} />;
}
