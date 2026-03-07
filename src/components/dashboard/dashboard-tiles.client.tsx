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
    color: string;
  }[] = [
    {
      icon: "🧱",
      title: "Start from a template",
      description: "Build your own website in minutes with our template builder.",
      href: "/dashboard/templates",
      cta: "Explore templates",
      color: "from-blue-500/10 to-cyan-500/10",
    },
    {
      icon: "📝",
      title: "Custom project request",
      description: "Need something more specific? Let us build it for you.",
      href: "/dashboard/start",
      cta: "Request a quote",
      color: "from-purple-500/10 to-pink-500/10",
    },
    {
      icon: "🛒",
      title: "Marketplace",
      description: "Browse and purchase ready-made apps from the HSWLP ecosystem.",
      href: "/apps",
      cta: "Open marketplace",
      color: "from-orange-500/10 to-yellow-500/10",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
            whileHover={{ y: -5 }}
            className="h-full"
          >
            <Card className={cn(
              "h-full flex flex-col justify-between overflow-hidden border-muted-foreground/10 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5",
              "relative group"
            )}>
              <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500", item.color)} />
              
              <CardHeader className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-muted/50 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-500">
                  {item.icon}
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">{item.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">{item.description}</CardDescription>
              </CardHeader>
              <CardFooter className="relative z-10">
                <Button asChild variant="ghost" className="p-0 text-primary hover:bg-transparent group-hover:translate-x-1 transition-transform">
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  <Link href={item.href as any}>
                    {item.cta} <span className="ml-1">→</span>
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Card className="border-muted-foreground/10 bg-card/50 backdrop-blur-sm overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
             <span className="text-9xl font-black">STATS</span>
          </div>
          
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/5">
                <span className="text-xl">📈</span>
              </div>
              <div>
                <CardTitle>Your usage & stats</CardTitle>
                <CardDescription>Overview of your account health and resources</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid gap-8 md:grid-cols-3 py-6">
            <div className="space-y-2">
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Current credits</span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black tracking-tight">{stats?.currentCredits ?? 0}</span>
                <span className="text-xs text-muted-foreground">CR</span>
              </div>
              {stats && stats.currentCredits < 100 && (
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="flex items-center gap-2 text-xs font-semibold text-amber-500"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                  Low balance alert
                </motion.div>
              )}
            </div>
            
            <div className="space-y-2">
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Active apps</span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black tracking-tight">{stats?.activeApps ?? 0}</span>
                <span className="text-xs text-muted-foreground">INSTANCES</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Storage usage</span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black tracking-tight">{stats?.storageUsage ?? 0}</span>
                <span className="text-xs text-muted-foreground">MB / 512MB</span>
              </div>
              <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-1000" 
                  style={{ width: `${Math.min(((stats?.storageUsage ?? 0) / 512) * 100, 100)}%` }} 
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-muted/5 border-t border-muted-foreground/5 py-4">
            <Button asChild variant="link" className="px-0 text-muted-foreground hover:text-primary">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              <Link href={"/dashboard/usage" as any}>Detailed resource breakdown →</Link>
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
