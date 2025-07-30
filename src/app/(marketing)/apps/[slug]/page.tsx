import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAppBySlugAsync,
  getAllAppsAsync,
  getSimilarAppsAsync,
} from "@/lib/db/apps";
import type { App } from "@/db/schema";
import AppDetailPage from "@/components/apps/AppDetailPage";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const apps = await getAllAppsAsync();
  return apps.map(app => ({ slug: app.slug }));
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
  const similarApps =
    app.category ? await getSimilarAppsAsync(app.category, slug) : [];
  return <AppDetailPage app={app} similarApps={similarApps} />;
}
