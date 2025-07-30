import { Metadata } from "next";
import SearchClient from "./search.client";
import { getAllApps, getCategories } from "@/lib/db/apps";
import type { App } from "@/db/schema";


export const metadata: Metadata = {
  title: "Search",
};

export default async function SearchPage() {
  const apps: App[] = await getAllApps();
  const categories = await getCategories();

  return (
    <SearchClient
      apps={apps}
      categories={categories.map(c => ({ id: c, name: c }))}
      tags={[]}
    />
  );
}
