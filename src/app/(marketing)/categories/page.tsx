import { Metadata } from "next";
import Link from "next/link";
import type { Route } from "next";
import { getCategories } from "@/lib/db/apps";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Categories",
};

export default async function CategoriesPage() {
  const categories = await getCategories();
  return (
    <div className="container mx-auto max-w-3xl px-4 pt-20 pb-16 space-y-6">
      <h1 className="text-3xl font-bold text-center">Categories</h1>
      <ul className="grid gap-4">
        {categories.map(cat => (
          <li key={cat} className="capitalize">
            <Link
              href={`/categories/${cat}` as Route}
              className="block border rounded-md p-4 hover:bg-accent transition-colors"
            >
              {cat}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
