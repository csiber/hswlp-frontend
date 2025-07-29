'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import type { Route } from 'next'

interface Category {
  name: string
  description: string
  icon: string
  href: string
}

const categories: Category[] = [
  { name: 'Shell apps', description: 'Run CLI programs in a secure container.', icon: '🧊', href: '/apps/shell' },
  { name: 'Pages', description: 'Static sites, blogs and docs.', icon: '🧩', href: '/apps/pages' },
  { name: 'Tools', description: 'Handy utilities for everyday use.', icon: '🛠️', href: '/apps/tools' },
  { name: 'VR', description: 'Immersive WebXR experiences.', icon: '🕶️', href: '/apps/vr' },
  { name: 'NAS', description: 'Store files with ease.', icon: '🧱', href: '/apps/nas' },
  { name: 'Hosting', description: 'Deploy your own services.', icon: '🚀', href: '/apps/hosting' },
]

export function CategoryGrid() {
  return (
    <section className="py-16 sm:py-24 bg-muted/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map(cat => (
            <motion.div
              key={cat.name}
              whileHover={{ scale: 1.03 }}
              className="rounded-2xl border shadow-xl p-6 flex flex-col bg-background"
            >
              <div className="flex-1 space-y-3">
                <div className="text-3xl">{cat.icon}</div>
                <h3 className="text-lg font-semibold">{cat.name}</h3>
                <p className="text-sm text-muted-foreground">{cat.description}</p>
              </div>
              <Link href={cat.href as Route} className="mt-4">
                <Button size="sm" className="w-full rounded-full">View</Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
