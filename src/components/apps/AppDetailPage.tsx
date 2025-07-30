import type { App } from '@/db/schema'
import AppDetailClient from './AppDetailClient'

interface Props {
  app: App
}

export default function AppDetailPage({ app }: Props) {
  return <AppDetailClient app={app} />
}
