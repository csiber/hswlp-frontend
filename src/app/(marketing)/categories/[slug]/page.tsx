import { Metadata } from "next";
import { getCategoryBySlug, getAppsByCategorySlug, getAllCategories } from "@/db/apps";
import { AppCard } from "@/components/app-card";
import { notFound } from "next/navigation";

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map(c => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const category = await getCategoryBySlug(params.slug);
  return { title: category ? `${category.name} Apps` : "Category" };
}

export default async function CategoryPage({ params }: PageProps) {
  const category = await getCategoryBySlug(params.slug);
  if (!category) return notFound();
  const apps = await getAppsByCategorySlug(params.slug);
  return (
    <div className="pb-12">
      <section className="py-12 px-4 text-center space-y-4">
        {category.emoji && <div className="text-6xl">{category.emoji}</div>}
        <h1 className="text-4xl font-bold">{category.name}</h1>
        <p className="text-muted-foreground">{category.description}</p>
      </section>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 p-4">
        {apps.length ? (
          apps.map(app => <AppCard key={app.slug} app={app} />)
        ) : (
          <p>No apps available in this category yet.</p>
        )}
      </div>
    </div>
  );
}
