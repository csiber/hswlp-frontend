import { Metadata } from "next";
import { AppCard } from "@/components/apps/AppCard";
import {
  getAppsByCategoryAsync,
  getCategoriesAsync,
} from "@/lib/db/apps";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const categories = await getCategoriesAsync();
  return categories.map(c => ({ category: c }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const decoded = decodeURIComponent(category);
  return { title: `${decoded} Apps` };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const decoded = decodeURIComponent(category);
  const apps = await getAppsByCategoryAsync(decoded);
  const displayName = decoded
    .split(" ")
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
  return (
    <div className="container mx-auto px-4 pt-20 pb-16 space-y-6">
      <h1 className="text-3xl font-bold text-center">{displayName}</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {apps.length === 0 ? (
          <p className="col-span-full flex flex-col items-center gap-2 text-center text-muted-foreground">
            No apps found in this category.
          </p>
        ) : (
          apps.map(app => <AppCard key={app.id} app={app} />)
        )}
      </div>
    </div>
  );
}
