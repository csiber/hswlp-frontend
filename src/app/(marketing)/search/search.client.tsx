"use client";
import { useMemo, useState } from "react";
import Fuse from "fuse.js";
import { SearchInput } from "@/components/search/SearchInput";
import { SearchResults, SearchResult } from "@/components/search/SearchResults";
import type { Route } from "next";
import { AppInfo } from "@/components/app-card";

interface Props {
  apps: AppInfo[];
  categories: { id: string; name: string }[];
  tags: { id: string; name: string }[];
}

export default function SearchClient({ apps, categories, tags }: Props) {
  const [query, setQuery] = useState("");

  const fuse = useMemo(() => {
    const list: SearchResult[] = [];

    list.push(
      ...apps.map(app => ({
        type: "app" as const,
        name: app.name,
        description: app.description,
        href: `/apps/${app.slug}` as Route,
        tags: app.category,
      }))
    );

    list.push(
      ...categories.map(cat => ({
        type: "category" as const,
        name: cat.name,
        description: "Category",
        href: `/apps/category/${cat.id}` as Route,
      }))
    );

    list.push(
      ...tags.map(tag => ({
        type: "tag" as const,
        name: tag.name,
        description: "Tag",
        href: `#tag-${tag.id}` as Route,
      }))
    );

    return new Fuse(list, {
      keys: ["name", "description", "tags"],
      includeScore: true,
      threshold: 0.4,
    });
  }, [apps, categories, tags]);

  const results = useMemo(() => {
    if (!query) return [] as SearchResult[];
    return fuse.search(query).map(r => r.item);
  }, [fuse, query]);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <SearchInput value={query} onChange={setQuery} />
      <SearchResults results={results} query={query} />
    </div>
  );
}
