import { PageHeader } from "@/components/page-header";
import { getCategoriesAction } from "@/actions/app-admin-actions";
import { useServerAction } from "zsa-react";
import { useEffect } from "react";
import type { AppCategory } from "@/db/schema";

export default function AdminCategoriesPage() {
  const { execute, data } = useServerAction(getCategoriesAction);
  useEffect(() => {
    execute();
  }, [execute]);

  return (
    <div className="container mx-auto py-10 px-6">
      <PageHeader items={[{ href: "/admin/categories", label: "Categories" }]} />
      <h1 className="text-3xl font-bold mb-4">Categories</h1>
      {!data ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-2">
          {data.categories.map((cat: AppCategory) => (
            <li key={cat.slug} className="border p-4 rounded-md">
              <div className="font-semibold">{cat.name}</div>
              <div className="text-sm text-muted-foreground">{cat.slug}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
