import { Metadata } from "next";
import { getAllCategories } from "@/db/apps";
import { CategoryCard } from "@/components/category-card";

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse app categories",
};

export default async function CategoriesPage() {
  const categories = await getAllCategories();
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 p-4">
      {categories.map(cat => (
        <CategoryCard key={cat.slug} category={cat} />
      ))}
    </div>
  );
}
