"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export interface UsageStats {
  currentCredits: number;
  activeApps: number;
  storageUsage: number;
}

interface DashboardTilesProps {
  stats: UsageStats | null;
}

export function DashboardTiles({ stats }: DashboardTilesProps) {
  const items = [
    {
      icon: "🧱",
      title: "Start from a template",
      description: "Build your own website in minutes with our template builder.",
      href: "/templates",
      cta: "Explore templates",
    },
    {
      icon: "📝",
      title: "Custom project request",
      description: "Need something more specific? Let us build it for you.",
      href: "/start",
      cta: "Request a quote",
    },
    {
      icon: "🛒",
      title: "Marketplace",
      description: "Browse and purchase ready-made apps from the HSWLP ecosystem.",
      href: "/apps",
      cta: "Open marketplace",
    },
  ];

  return (
    <>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        {items.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className="h-full"
          >
            <Card className="h-full flex flex-col justify-between">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <span className="text-xl">{item.icon}</span>
                  <CardTitle>{item.title}</CardTitle>
                </div>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild variant="link" className="p-0">
                  <Link href={item.href}>{item.cta} →</Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-4"
      >
        <Card className="flex flex-col h-full">
          <CardHeader>
            <div className="flex items-center gap-2">
              <span className="text-xl">📈</span>
              <CardTitle>Your usage & stats</CardTitle>
            </div>
            <CardDescription>Overview of your account</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Current credits</span>
              <span className="text-xl font-bold">{stats?.currentCredits ?? 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Active apps</span>
              <span className="text-xl font-bold">{stats?.activeApps ?? 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Storage usage</span>
              <span className="text-xl font-bold">{stats ? `${stats.storageUsage} MB` : 0}</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild variant="link" className="p-0">
              <Link href="/dashboard/usage">View details →</Link>
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </>
  );
}
