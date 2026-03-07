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
  { name: 'Shell apps', description: 'Run CLI programs in a secure container.', icon: '🧊', href: '/apps/type/shell' },
  { name: 'Pages', description: 'Static sites, blogs and docs.', icon: '🧩', href: '/apps/type/pages' },
  { name: 'Tools', description: 'Handy utilities for everyday use.', icon: '🛠️', href: '/apps/type/tools' },
  { name: 'VR', description: 'Immersive WebXR experiences.', icon: '🕶️', href: '/apps/type/vr' },
  { name: 'NAS', description: 'Store files with ease.', icon: '🧱', href: '/apps/type/nas' },
  { name: 'Hosting', description: 'Deploy your own services.', icon: '🚀', href: '/apps/type/hosting' },
]

export function CategoryGrid() {
  return (
    <section className="py-24 sm:py-32 bg-muted/30 relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Explore by category
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from a wide range of specialized environments and tools tailored for your needs.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.2 }
              }}
              className="group relative rounded-3xl border border-muted-foreground/10 p-8 flex flex-col bg-card/40 backdrop-blur-sm hover:bg-card/60 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="flex-1 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center text-4xl group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-500">
                  {cat.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                    {cat.name}
                  </h3>
                  <p className="mt-2 text-muted-foreground leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              </div>
              
              <Link href={cat.href as Route} className="mt-8">
                <Button variant="outline" className="w-full rounded-xl h-12 font-semibold group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300">
                  Browse {cat.name}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
