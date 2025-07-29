import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative isolate overflow-hidden pt-20 pb-24 sm:pt-24 sm:pb-32 dark:bg-gray-900"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Hybrid Service Workflow Launch Platform
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          One platform. Multiple apps. Infinite potential.
        </p>
        <div className="mt-10 flex justify-center gap-x-6">
          <Link href="/apps">
            <Button size="lg" className="rounded-full">
              Explore apps
            </Button>
          </Link>
          <Link href="#about">
            <Button variant="outline" size="lg" className="rounded-full">
              What is HSWLP?
            </Button>
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
