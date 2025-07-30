export interface ChangelogEntry {
  version: string
  date: string
  changes: string[]
}

export const changelog: ChangelogEntry[] = [
  {
    version: 'v1.1',
    date: '2025-07-29',
    changes: [
      'Added global search page (/search)',
      'New docs landing page with guides',
      'Pricing page with credits system'
    ]
  },
  {
    version: 'v1.0',
    date: '2025-05-12',
    changes: [
      'Initial release of HSWLP platform',
      'User authentication with email',
      'Cloudflare Workers API and D1 database'
    ]
  },
  {
    version: 'v0.9',
    date: '2025-04-01',
    changes: [
      'Beta release for internal testing',
      'Basic dashboard layout',
      'R2 storage for media files'
    ]
  }
]
