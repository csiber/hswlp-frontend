"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { CheckCircle, ArrowRight, Sparkles } from "lucide-react"
import { formatDate } from "@/utils/format-date"
import { cn } from "@/lib/utils"
import type { ChangelogEntry } from "@/data/changelog"

const icons = [CheckCircle, ArrowRight, Sparkles]

export default function ChangelogItem({ entry, isLatest }: { entry: ChangelogEntry; isLatest?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card className={cn("relative", isLatest && "border-primary")}> 
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle className="text-2xl">{entry.version}</CardTitle>
            {isLatest && <Badge className="uppercase">Latest</Badge>}
          </div>
          <CardDescription>{formatDate(entry.date)}</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 pl-1">
            {entry.changes.map((change, index) => {
              const Icon = icons[index % icons.length]
              return (
                <li key={index} className="flex items-start gap-2">
                  <Icon className="h-4 w-4 text-primary mt-0.5" />
                  <span>{change}</span>
                </li>
              )
            })}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  )
}
