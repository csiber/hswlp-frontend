import { Metadata } from 'next'
import PricingClient from './pricing.client'

export const metadata: Metadata = {
  title: 'Pricing',
}

export default function PricingPage() {
  return <PricingClient />
}
