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
  const items: {
    icon: string;
    title: string;
    description: string;
    href: string;
    cta: string;
  }[] = [
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
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  <Link href={item.href as any}>{item.cta} →</Link>
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
            {stats && stats.currentCredits < 100 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-sm text-yellow-600"
              >
                🔋 You&apos;re low on credit! Buy now or invite friends.
              </motion.p>
            )}
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
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              <Link href={"/dashboard/usage" as any}>View details →</Link>
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </>
  );
}
