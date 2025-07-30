"use client";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from "next/link";
import type { Route } from "next";
import { ComponentType } from "react";

export interface DocsCardProps {
  title: string;
  subtitle: string;
  href: Route;
  icon: ComponentType<React.SVGProps<SVGSVGElement>>;
}

export default function DocsCard({ title, subtitle, href, icon: Icon }: DocsCardProps) {
  return (
    <Link href={href} className="block h-full">
      <motion.div
        whileHover={{ scale: 1.05 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="h-full"
      >
        <Card className="h-full cursor-pointer hover:bg-accent transition-colors flex flex-col">
          <CardHeader className="flex-1 space-y-2">
            <div className="flex items-center gap-3">
              <Icon className="w-6 h-6" />
              <CardTitle>{title}</CardTitle>
            </div>
            <CardDescription>{subtitle}</CardDescription>
          </CardHeader>
        </Card>
      </motion.div>
    </Link>
  );
}
