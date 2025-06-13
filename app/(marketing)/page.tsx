import type { Metadata } from 'next'
import LandingPage from './landing'

export const metadata: Metadata = {
  title: 'Saas UI Landingspage',
  description: 'Free SaaS landingspage starter kit',
}

export default function Page() {
  return <LandingPage />
}
