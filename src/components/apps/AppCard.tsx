"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { App } from "@/db/schema";

export function AppCard({ app }: { app: App }) {
  const Icon =
    (Icons[app.icon as keyof typeof Icons] as LucideIcon | undefined) ??
    Icons.AppWindow;
  return (
    <motion.div whileHover={{ scale: 1.05 }} layout>
      <Card className={cn("h-full flex flex-col justify-between", app.featured && "border-2 border-primary")}> 
        <CardHeader>
          <div className="flex items-center gap-2">
            <Icon className="h-6 w-6" />
            <CardTitle>{app.name}</CardTitle>
            {app.featured ? (
              <Badge className="ml-auto" variant="secondary">Featured</Badge>
            ) : null}
          </div>
          {app.description && (
            <CardDescription>{app.description}</CardDescription>
          )}
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <Badge variant="outline" className="capitalize">
            {app.category}
          </Badge>
          {app.url && (
            <a
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm underline"
            >
              Visit
            </a>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

