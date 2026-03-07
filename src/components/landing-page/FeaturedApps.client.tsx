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
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4 sm:text-4xl">
            Featured apps
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our ecosystem is growing. Check back soon for the first featured applications!
          </p>
        </div>
      </section>
    );

  const featured = apps.slice(0, 4);

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background glow for the section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/5 blur-[120px] rounded-full -z-10" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Featured apps
            </h2>
            <p className="text-lg text-muted-foreground">
              Discover the most innovative projects built on the HSWLP infrastructure.
            </p>
          </div>
          <Link href="/apps">
            <Button variant="ghost" className="group text-primary hover:bg-primary/10">
              View all apps 
              <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
          </Link>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((app, index) => {
            const screenshot = (app as unknown as { media?: string[] }).media?.[0]
            return (
              <motion.div
                key={app.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative rounded-2xl border border-muted-foreground/10 bg-card/50 backdrop-blur-sm shadow-xl overflow-hidden flex flex-col h-full transition-all duration-300 hover:border-primary/50 hover:shadow-primary/5"
              >
                <div className="relative h-52 w-full overflow-hidden">
                  {screenshot ? (
                    <Image
                      src={screenshot}
                      alt={`${app.name} screenshot`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center group-hover:bg-primary/5 transition-colors duration-500">
                      <span className="text-4xl opacity-20 group-hover:opacity-40 transition-opacity">🧩</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-60" />
                </div>

                <div className="p-8 flex flex-col gap-5 flex-1 relative z-10">
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                      {app.name}
                    </h3>
                    <p className="text-muted-foreground line-clamp-2 leading-relaxed">
                      {app.description}
                    </p>
                  </div>
                  
                  <Link href={`/apps/${app.slug}` as Route} className="mt-auto pt-2">
                    <Button className="w-full rounded-xl h-12 text-base font-semibold transition-all group-hover:shadow-lg group-hover:shadow-primary/20">
                      Launch app <ArrowUpRight className="ml-2 h-4 w-4" />
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
