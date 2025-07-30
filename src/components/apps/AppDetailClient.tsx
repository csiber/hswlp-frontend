'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MotionSection } from '@/components/ui/MotionSection'
import type { App } from '@/db/schema'
import * as Icons from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { marked } from 'marked'

interface Props {
  app: App
}

export default function AppDetailClient({ app }: Props) {
  const Icon =
    (Icons[app.icon as keyof typeof Icons] as LucideIcon | undefined) ??
    Icons.AppWindow

  const description = useMemo(() => {
    if (!app.description) return ''
    return marked.parse(app.description)
  }, [app.description])

  return (
    <MotionSection
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6 pb-12 pt-20 container mx-auto max-w-3xl"
    >
      <div className="flex items-center gap-3">
        <Icon className="h-8 w-8" />
        <h1 className="text-3xl font-bold tracking-tight">{app.name}</h1>
        {app.featured === 1 && (
          <Badge variant="secondary" className="ml-auto flex items-center gap-1">
            <Icons.Star className="h-4 w-4 fill-current" /> Featured
          </Badge>
        )}
      </div>

      <div className="flex gap-2">
        {app.category && (
          <Badge variant="outline" className="capitalize">
            {app.category}
          </Badge>
        )}
        <Badge variant="outline" className="capitalize">
          {app.type}
        </Badge>
      </div>

      {app.description && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      )}

      {app.url && (
        <Button asChild className="mt-4 transition-transform active:scale-95 hover:scale-100">
          <a href={app.url} target="_blank" rel="noopener noreferrer">
            Visit app
          </a>
        </Button>
      )}
    </MotionSection>
  )
}
