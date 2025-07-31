import { Metadata } from 'next'
import { BASE_METADATA } from '@/lib/base-metadata'
import PricingClient from './pricing.client'

export const metadata: Metadata = {
  ...BASE_METADATA,
  title: 'Pricing',
}

export default function PricingPage() {
  return <PricingClient />
}
