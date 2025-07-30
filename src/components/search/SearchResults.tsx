"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import type { Route } from "next";
import { motion } from "framer-motion";
import { Highlight } from "./Highlight";

type ResultType = "app" | "category" | "tag";

export interface SearchResult {
  type: ResultType;
  name: string;
  description?: string;
  href: Route;
  tags?: string[];
}

interface SearchResultsProps {
  results: SearchResult[];
  query: string;
}

export function SearchResults({ results, query }: SearchResultsProps) {
  if (results.length === 0) {
    return (
      <div className="text-center mt-8 text-muted-foreground">
        <div className="text-4xl">🔍</div>
        <p>No results found</p>
      </div>
    );
  }

  return (
    <motion.div
      layout
      className="grid gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3"
    >
      {results.map(r => (
        <motion.div key={r.href} whileHover={{ scale: 1.03 }} layout>
          <Link href={r.href}>
            <Card className="h-full cursor-pointer">
              <CardHeader>
                <CardTitle>
                  <Highlight text={r.name} query={query} />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {r.description && (
                  <p>
                    <Highlight text={r.description} query={query} />
                  </p>
                )}
                {r.tags && r.tags.length > 0 && (
                  <p className="text-sm text-muted-foreground">
                    {r.tags.join(", ")}
                  </p>
                )}
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
