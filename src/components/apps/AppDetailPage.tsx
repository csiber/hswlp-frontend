import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { App } from "@/db/schema";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AppCard } from "./AppCard";

interface Props {
  app: App;
  similarApps?: App[];
}

export default function AppDetailPage({ app, similarApps = [] }: Props) {
  const Icon =
    (Icons[app.icon as keyof typeof Icons] as LucideIcon | undefined) ??
    Icons.AppWindow;
  return (
    <div className="space-y-16 pb-12">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="pt-12 pb-8 text-center space-y-4"
      >
        <Icon className="h-16 w-16 mx-auto" />
        <h1 className="text-4xl font-bold tracking-tight">{app.name}</h1>
        {app.category && (
          <Badge variant="outline" className="capitalize">
            {app.category}
          </Badge>
        )}
        {app.description && (
          <p className="text-muted-foreground text-lg text-balance px-4">
            {app.description}
          </p>
        )}
        {app.url && (
          <Button asChild size="lg">
            <a href={app.url} target="_blank" rel="noopener noreferrer">
              Launch app
            </a>
          </Button>
        )}
        <div className="flex justify-center gap-2 pt-4">
          <Badge variant="secondary" className="capitalize">
            {app.type}
          </Badge>
          {app.featured ? (
            <Badge variant="secondary">Featured</Badge>
          ) : null}
        </div>
      </motion.section>
      {similarApps.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto px-4 space-y-6"
        >
          <h2 className="text-2xl font-bold text-center">Similar apps</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {similarApps.map(sa => (
              <AppCard key={sa.id} app={sa} />
            ))}
          </div>
        </motion.section>
      )}
    </div>
  );
}
