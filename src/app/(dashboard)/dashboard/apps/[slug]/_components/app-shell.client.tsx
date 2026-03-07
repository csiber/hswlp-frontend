"use client";

import { App } from "@/db/schema";
import { motion } from "framer-motion";
import { 
  Maximize2,
  Settings,
  ArrowUpRight,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

// Dynamically import simulation components to reduce bundle size
const ShareAI = dynamic(() => import("@/components/apps/simulations/ShareAI"), {
  loading: () => <Skeleton className="flex-1 w-full rounded-3xl" />,
  ssr: false
});

const Talk = dynamic(() => import("@/components/apps/simulations/Talk"), {
  loading: () => <Skeleton className="flex-1 w-full rounded-3xl" />,
  ssr: false
});

const DevShell = dynamic(() => import("@/components/apps/simulations/DevShell"), {
  loading: () => <Skeleton className="flex-1 w-full rounded-3xl" />,
  ssr: false
});

const NAS = dynamic(() => import("@/components/apps/simulations/NAS"), {
  loading: () => <Skeleton className="flex-1 w-full rounded-3xl" />,
  ssr: false
});

const Builder = dynamic(() => import("@/components/apps/simulations/Builder"), {
  loading: () => <Skeleton className="flex-1 w-full rounded-3xl" />,
  ssr: false
});

export function AppShell({ app }: { app: App }) {
  const renderApp = () => {
    switch (app.slug) {
      case 'shareai': return <ShareAI />;
      case 'talk': return <Talk />;
      case 'devshell': return <DevShell />;
      case 'nas': return <NAS />;
      case 'builder': return <Builder />;
      default: return (
        <div className="flex-1 flex flex-col items-center justify-center p-12 text-center space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-muted/50 flex items-center justify-center">
            <ExternalLink className="h-10 w-10 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">{app.name}</h2>
            <p className="text-muted-foreground max-w-sm">
              This app is currently only available as an external service or its dashboard interface is under development.
            </p>
          </div>
          {app.url && (
            <Button asChild className="rounded-xl h-12 px-8">
              <a href={app.url} target="_blank" rel="noopener noreferrer">
                Visit External Site <ArrowUpRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
      );
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex-1 flex flex-col h-[calc(100vh-12rem)]"
    >
      <div className="flex items-center justify-between mb-6 px-2">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-primary/5 text-primary">
             <Settings className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight">{app.name}</h1>
            <Badge variant="outline" className="mt-1">{app.type}</Badge>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="rounded-xl h-10 w-10">
            <Maximize2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-xl h-10 w-10">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {renderApp()}
    </motion.div>
  );
}
