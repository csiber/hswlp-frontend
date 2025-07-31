"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { App } from "@/db/schema";
import type { Route } from "next";

interface Props {
  apps: App[];
}

export default function FeaturedAppsClient({ apps }: Props) {
  if (apps.length === 0)
    return (
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 text-center text-balance">
            Featured apps
          </h2>
          <p className="text-center text-muted-foreground">No featured apps yet.</p>
        </div>
      </section>
    );
  const featured = apps.slice(0, 4);

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-8 text-center text-balance">
          Featured apps
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map(app => {
            // Optional screenshots may be defined later
            const screenshot = (app as unknown as { media?: string[] }).media?.[0]
            return (
              <motion.div
                key={app.slug}
                whileHover={{ scale: 1.03 }}
                className="rounded-2xl border shadow-xl overflow-hidden flex flex-col bg-background"
              >
                {screenshot && (
                  <Image
                    src={screenshot}
                    alt={`${app.name} screenshot`}
                    width={800}
                    height={450}
                    className="h-48 w-full object-cover"
                  />
                )}
                <div className="p-6 flex flex-col gap-4 flex-1">
                  <div>
                    <h3 className="text-xl font-semibold">{app.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {app.description}
                    </p>
                  </div>
                  <Link href={`/apps/${app.slug}` as Route} className="mt-auto">
                    <Button className="w-full rounded-full transition-transform hover:scale-105">
                      View <ArrowUpRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
