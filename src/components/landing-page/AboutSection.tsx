'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import type { Route } from 'next'

export function AboutSection() {
  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-16 sm:py-24 bg-muted/20"
    >
      <div className="mx-auto max-w-3xl px-6 space-y-6 prose dark:prose-invert text-balance">
        <h2>What is HSWLP?</h2>
        <p>
          HSWLP is a modular platform that allows you to run many kinds of apps
          on a single infrastructure. Whether it&apos;s a blog, game or VR world,
          every project uses the same credit system.
        </p>
        <p>
          It provides a scalable, developer-friendly environment where credits
          help you flexibly share resources between services.
        </p>
        <p>
          <Link href={'/pricing' as Route} className="text-primary underline">
            Apps are powered by a shared credit system.
          </Link>
        </p>
      </div>
    </motion.section>
  )
}
