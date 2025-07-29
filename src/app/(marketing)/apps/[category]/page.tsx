import { Metadata } from "next";
import appsData from "@/data/apps.json";
import { AppCard, AppInfo } from "@/components/app-card";

const categoryMap: Record<string, string> = {
  shell: "Cloudflare Shell Apps",
  pages: "Static Pages",
  vr: "Virtual Reality Apps",
  tools: "Utility & Tools",
  creative: "Creative Tools",
  nas: "Local NAS Apps",
};

interface AppsData {
  categories: { id: string; name: string }[];
  apps: AppInfo[];
}

interface PageProps {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  const { categories } = appsData as AppsData;
  return categories.map(c => ({ category: c.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const name = categoryMap[category] ?? category;
  return { title: `${name} Apps` };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const { apps } = appsData as AppsData;
  const filtered = apps.filter(a => a.category.includes(category));
  const title = categoryMap[category] ?? category;
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      {filtered.length === 0 ? (
        <p>No apps found in this category.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(app => (
            <AppCard key={app.slug} app={app} />
          ))}
        </div>
      )}
    </div>
  );
}
