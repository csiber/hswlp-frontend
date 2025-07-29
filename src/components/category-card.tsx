"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import type { Route } from "next";

export interface CategoryInfo {
  slug: string;
  name: string;
  emoji: string | null;
  description: string | null;
}

export function CategoryCard({ category }: { category: CategoryInfo }) {
  return (
    <Link href={`/categories/${category.slug}` as Route}>
      <Card className="hover:shadow-md transition-shadow h-full">
        <CardHeader className="flex items-center gap-2">
          {category.emoji && <span className="text-4xl">{category.emoji}</span>}
          <CardTitle>{category.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {category.description}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
