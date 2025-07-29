import { Metadata } from "next";
import appsData from "@/data/apps.json";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { AppInfo } from "@/components/app-card";

interface AppsData {
  categories: { id: string; name: string }[];
  apps: AppInfo[];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  const { apps } = appsData as AppsData;
  return apps.map(a => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { apps } = appsData as AppsData;
  const app = apps.find(a => a.slug === slug);
  return {
    title: app ? app.name : "App",
  };
}

export default async function AppPage({ params }: PageProps) {
  const { slug } = await params;
  const { apps } = appsData as AppsData;
  const app = apps.find(a => a.slug === slug);
  if (!app) return notFound();
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl font-bold flex items-center gap-2">
        {app.name}
        <Badge variant="secondary" className="capitalize">{app.status}</Badge>
      </h1>
      <p className="text-muted-foreground">{app.description}</p>
    </div>
  );
}
