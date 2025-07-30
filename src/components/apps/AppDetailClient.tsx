'use client'

import { MotionSection } from '@/components/ui/MotionSection'

export default function AppDetailClient() {
  return (
    <MotionSection
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-16 pb-12"
    >
      <p>App detail content goes here.</p>
    </MotionSection>
  )
}
