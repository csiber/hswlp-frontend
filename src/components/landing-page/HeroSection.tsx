'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative isolate overflow-hidden pt-20 pb-24 sm:pt-24 sm:pb-32 dark:bg-gray-900"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-balance">
          Your ideas. Our infrastructure.
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          HSWLP is a launchpad for tools, games, blogs, VR worlds and more.
        </p>
        <div className="mt-10 flex justify-center gap-x-6">
          <Link href="/apps">
            <Button size="lg" className="rounded-full">
              Explore apps
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="rounded-full" asChild>
            <a href="#">Start building</a>
          </Button>
        </div>
      </div>
    </motion.section>
  )
}
