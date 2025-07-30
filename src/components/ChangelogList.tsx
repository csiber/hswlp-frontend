"use client"

import ChangelogItem from "./ChangelogItem"
import type { ChangelogEntry } from "@/data/changelog"

export default function ChangelogList({ entries }: { entries: ChangelogEntry[] }) {
  return (
    <div className="space-y-6">
      {entries.map((entry, idx) => (
        <ChangelogItem key={entry.version} entry={entry} isLatest={idx === 0} />
      ))}
    </div>
  )
}
