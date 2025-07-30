'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { CheckIcon, XIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const features = [
  { label: 'Image & file uploads', free: true, pro: true },
  { label: 'Use credits', free: true, pro: true },
  { label: 'App access', free: 'Limited', pro: 'Full' },
  { label: 'Comment & like', free: true, pro: true },
  { label: 'R2 storage', free: '100 MB', pro: '2 GB' },
  { label: 'Priority support', free: false, pro: true },
]

export default function PricingClient() {
  return (
    <div className="space-y-20 pb-20">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="px-6 pt-20 text-center"
      >
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-balance">
          Simple pricing. Powerful features.
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Start for free, upgrade anytime with credits or a Pro plan.
        </p>
      </motion.section>

      <section className="mx-auto max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="overflow-x-auto"
        >
          <Table className="min-w-full text-center">
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                <TableHead className="text-2xl font-semibold">Free</TableHead>
                <TableHead className="text-2xl font-semibold">Pro</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {features.map((f) => (
                <TableRow key={f.label} className="border-b last:border-b-0">
                  <TableCell className="font-medium text-left">
                    {f.label}
                  </TableCell>
                  <TableCell>
                    {typeof f.free === 'boolean' ? (
                      f.free ? (
                        <CheckIcon className="mx-auto h-5 w-5 text-primary" />
                      ) : (
                        <XIcon className="mx-auto h-5 w-5 text-muted-foreground" />
                      )
                    ) : (
                      f.free
                    )}
                  </TableCell>
                  <TableCell>
                    {typeof f.pro === 'boolean' ? (
                      f.pro ? (
                        <CheckIcon className="mx-auto h-5 w-5 text-primary" />
                      ) : (
                        <XIcon className="mx-auto h-5 w-5 text-muted-foreground" />
                      )
                    ) : (
                      f.pro
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </motion.div>
      </section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="space-y-6 px-6"
      >
        <h2 className="text-3xl font-bold text-center">How credits work</h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto">
          You can use credits to upload images, comment, unlock premium content,
          or generate AI content.
        </p>
        <ul className="mx-auto max-w-md list-disc space-y-2 pl-5 text-left text-muted-foreground">
          <li>1 credit = 1 image upload</li>
          <li>2 credits = AI generation</li>
          <li>5 credits = Unlock Pro-only content</li>
        </ul>
        <div className="text-center">
          <Button asChild>
            <Link href="/dashboard/billing">Buy credits</Link>
          </Button>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="space-y-4 text-center"
      >
        <h2 className="text-3xl font-bold">Start building today</h2>
        <div className="flex justify-center gap-4">
          <Button asChild>
            <Link href="/sign-up">Create account</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/apps">Explore apps</Link>
          </Button>
        </div>
      </motion.section>
    </div>
  )
}
