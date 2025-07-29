import { Metadata } from "next";
import appsData from "@/data/apps.json";
import { AppCard, AppInfo } from "@/components/app-card";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ category: string }>;
}

interface AppsData {
  categories: { id: string; name: string }[];
  apps: AppInfo[];
}

export function generateStaticParams() {
  const { categories } = appsData as AppsData;
  return categories.map(c => ({ category: c.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const { categories } = appsData as AppsData;
  const cat = categories.find(c => c.id === category);
  return {
    title: cat ? `${cat.name} Apps` : "Apps",
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const { apps } = appsData as AppsData;
  const filtered = apps.filter(a => a.category.includes(category));
  if (filtered.length === 0) return notFound();
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 p-4">
      {filtered.map(app => (
        <AppCard key={app.slug} app={app} />
      ))}
    </div>
  );
}
