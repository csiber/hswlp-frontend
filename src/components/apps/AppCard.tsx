"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import type { Route } from "next";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { App } from "@/db/schema";
import { ArrowUpRight } from "lucide-react";

export function AppCard({ app }: { app: App }) {
  const Icon =
    (Icons[app.icon as keyof typeof Icons] as LucideIcon | undefined) ??
    Icons.AppWindow;

  const isInternallyReady = ['shareai', 'talk', 'devshell', 'nas', 'builder'].includes(app.slug);
  const canLaunch = (app.url && app.status === 1) || isInternallyReady;

  return (
    <Link href={`/apps/${app.slug}` as Route} className="block h-full">
      <motion.div
        whileHover={{
          y: -5,
          transition: { duration: 0.2 },
        }}
        className="h-full"
      >
        <Card
          className={cn(
            "group relative cursor-pointer h-full flex flex-col justify-between overflow-hidden transition-all duration-300",
            "hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/50",
            "bg-card/50 backdrop-blur-sm border-muted-foreground/10",
            app.featured && "border-primary/40 bg-primary/5 shadow-lg shadow-primary/5"
          )}
        >
          {/* Subtle background glow on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <CardHeader className="relative z-10 pb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-muted/50 group-hover:bg-primary/10 transition-colors duration-300">
                  <Icon className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <CardTitle className="group-hover:text-primary transition-colors duration-300">
                  {app.name}
                </CardTitle>
              </div>
              {app.featured && (
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                  Featured
                </Badge>
              )}
            </div>
            <CardDescription className="line-clamp-3 text-sm leading-relaxed">
              {app.description}
            </CardDescription>
          </CardHeader>

          <CardContent className="relative z-10 flex items-center justify-between pt-0 mt-auto">
            <div className="flex gap-2">
              <Badge variant="outline" className="bg-background/50 backdrop-blur-sm border-muted-foreground/20 group-hover:border-primary/30 transition-colors capitalize">
                {app.category}
              </Badge>
            </div>
            
            <div className="flex items-center gap-3">
              {canLaunch ? (
                <div className="flex items-center gap-1.5 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                  Launch <ArrowUpRight className="h-4 w-4" />
                </div>
              ) : app.url ? (
                <TooltipProvider delayDuration={300}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="text-xs text-muted-foreground italic">
                        Developing...
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="top">Under development</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : null}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
}
