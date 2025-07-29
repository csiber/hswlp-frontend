import { Metadata } from "next";
import appsData from "@/data/apps.json";
import categoriesData from "@/data/categories.json";
import tagsData from "@/data/tags.json";
import SearchClient from "./search.client";
import { AppInfo } from "@/components/app-card";

interface AppsData {
  apps: AppInfo[];
}
interface CategoriesData {
  categories: { id: string; name: string }[];
}
interface TagsData {
  tags: { id: string; name: string }[];
}

export const metadata: Metadata = {
  title: "Search",
};

export default function SearchPage() {
  const { apps } = appsData as AppsData;
  const { categories } = categoriesData as CategoriesData;
  const { tags } = tagsData as TagsData;

  return <SearchClient apps={apps} categories={categories} tags={tags} />;
}
