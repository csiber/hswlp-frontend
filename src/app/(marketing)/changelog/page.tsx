import { Metadata } from 'next'
import { changelog } from '@/data/changelog'
import ChangelogList from '@/components/ChangelogList'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Changelog'
}

export default function ChangelogPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 space-y-10">
      <h1 className="text-3xl font-bold">Changelog</h1>
      <ChangelogList entries={changelog} />
      <div className="text-center pt-6">
        <p className="mb-4 text-muted-foreground">Want to get notified of updates?</p>
        <Button className="rounded-full">Subscribe</Button>
      </div>
    </div>
  )
}
