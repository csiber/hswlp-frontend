'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardTitle, CardDescription } from '@/components/ui/card'
import { SiCloudflareworkers, SiCloudflarepages, SiStripe, SiGithub } from '@icons-pack/react-simple-icons'
import { DatabaseIcon, HardDriveIcon, KeyRoundIcon } from 'lucide-react'

export default function AboutPageClient() {
  const stack = [
    { name: 'Cloudflare Workers', desc: 'Runtime for our apps', icon: SiCloudflareworkers },
    { name: 'Pages', desc: 'Static hosting for frontends', icon: SiCloudflarepages },
    { name: 'R2', desc: 'Object storage for media', icon: HardDriveIcon },
    { name: 'D1', desc: 'SQL database', icon: DatabaseIcon },
    { name: 'KV', desc: 'Key-value cache', icon: KeyRoundIcon },
    { name: 'Stripe', desc: 'Payments and subscriptions', icon: SiStripe },
    { name: 'GitHub', desc: 'Deploys and integrations', icon: SiGithub },
  ]

  return (
    <div className="space-y-24">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="py-24 text-center"
      >
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-balance">
          What is HSWLP?
        </h1>
        <p className="mt-4 text-xl text-muted-foreground text-balance">
          A modular launch platform for hybrid digital services.
        </p>
        <p className="mt-6 text-lg leading-8 text-muted-foreground text-balance">
          From single-page sites to full-stack SaaS apps, HSWLP helps you build, deploy, and monetize with modern edge-first tools.
        </p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-16 sm:py-24 bg-muted/50"
      >
        <div className="mx-auto max-w-5xl px-6 space-y-8">
          <h2 className="text-2xl font-bold text-center text-balance">
            Built on modern edge infrastructure.
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {stack.map(item => {
              const Icon = item.icon
              return (
                <Card key={item.name} className="p-6 flex items-start gap-4">
                  <Icon className="h-8 w-8" />
                  <div>
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    <CardDescription>{item.desc}</CardDescription>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-16 sm:py-24"
      >
        <div className="mx-auto max-w-3xl px-6 space-y-6 prose dark:prose-invert text-center text-balance">
          <h2>Our mission</h2>
          <p>
            HSWLP is designed to empower solo developers and indie teams. We believe in low-cost, high-efficiency tools that just work — without vendor lock-in.
          </p>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-16 sm:py-24 bg-muted/20 text-center"
      >
        <h2 className="text-2xl font-bold mb-6 text-balance">Ready to explore the ecosystem?</h2>
        <Link href="/apps">
          <Button size="lg" className="rounded-full">Explore apps</Button>
        </Link>
      </motion.section>
    </div>
  )
}

