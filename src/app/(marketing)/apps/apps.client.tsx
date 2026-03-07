"use client";

import { AppCard } from "@/components/apps/AppCard";
import CategoryFilter from "@/components/apps/CategoryFilter";
import type { App } from "@/db/schema";
import { motion } from "framer-motion";
import { Search, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";

export default function AppsClient({ apps }: { apps: App[] }) {
  const [category, setCategory] = useState<string>("all");
  const [search, setSearch] = useState<string>("");

  const categories = useMemo(() => {
    return Array.from(
      new Set(apps.map(a => a.category).filter((c): c is string => Boolean(c)))
    ).sort();
  }, [apps]);

  const filteredApps = useMemo(() => {
    return apps.filter(app => {
      const matchesCategory = category === "all" || app.category === category;
      const matchesSearch = 
        app.name.toLowerCase().includes(search.toLowerCase()) || 
        app.description?.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [apps, category, search]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Marketplace Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-black tracking-tight sm:text-5xl"
        >
          App Marketplace
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-muted-foreground"
        >
          Discover official HSWLP tools, shells, immersive worlds and services to supercharge your workflow.
        </motion.p>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-card/30 backdrop-blur-md border border-muted-foreground/10 p-6 rounded-3xl sticky top-24 z-30 shadow-xl shadow-primary/5">
        <div className="w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          <CategoryFilter
            categories={categories}
            value={category}
            onChange={setCategory}
          />
        </div>
        <div className="relative w-full md:w-72 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Search applications..." 
            className="pl-10 rounded-xl bg-background/50 border-muted-foreground/20 focus:border-primary/50 transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* App Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        {filteredApps.length === 0 ? (
          <div className="col-span-full py-20 flex flex-col items-center gap-4 text-center text-muted-foreground">
            <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-2">
              <Sparkles className="h-8 w-8 opacity-20" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">No applications found</h3>
            <p className="max-w-xs">Try adjusting your search or category filters to find what you&apos;re looking for.</p>
          </div>
        ) : (
          filteredApps.map((app, index) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <AppCard app={app} />
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
}
