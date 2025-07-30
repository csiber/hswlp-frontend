import { Metadata } from "next";
import { AppCard } from "@/components/apps/AppCard";
import { notFound } from "next/navigation";
import {
  getAppsByCategory,
  getCategories,
} from "@/lib/db/apps";
import type { App } from "@/db/schema";

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map(c => ({ category: c }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  return {
    title: `${category} Apps`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const apps: App[] = await getAppsByCategory(category);
  if (apps.length === 0) return notFound();
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 p-4">
      {apps.map(app => (
        <AppCard key={app.id} app={app} />
      ))}
    </div>
  );
}
