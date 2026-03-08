"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import type { Route } from 'next'
import { CheckIcon, Sparkles, Zap, ShieldCheck, ArrowRight, Coins } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const tiers = [
  {
    name: 'Starter',
    id: 'tier-starter',
    href: '/sign-up',
    price: '$0',
    description: 'Perfect for exploring the ecosystem and testing basic tools.',
    features: [
      'Access to community shells',
      '100MB Cloud R2 Storage',
      'Standard performance',
      'Free monthly credits (50 CR)',
      'Community support',
    ],
    mostPopular: false,
    icon: Zap,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  {
    name: 'Pro Platform',
    id: 'tier-pro',
    href: '/sign-up',
    price: '$19',
    description: 'Advanced infrastructure for high-performance applications.',
    features: [
      'Full access to all HSWLP apps',
      '5GB Cloud R2 Storage',
      'Turbo-charged Edge execution',
      'Bonus monthly credits (500 CR)',
      'Priority developer support',
      'Custom subdomains',
    ],
    mostPopular: true,
    icon: Sparkles,
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
];

const creditUsage = [
  { action: 'AI Content Generation', cost: '5 CR', icon: Sparkles },
  { action: 'Large File Sharing', cost: '2 CR', icon: Zap },
  { action: 'Persistent Shell Session', cost: '1 CR / hr', icon: Coins },
];

export default function PricingClient() {
  return (
    <div className="py-24 sm:py-32 space-y-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <Badge variant="outline" className="mb-4 rounded-full px-4 py-1 text-xs font-bold uppercase tracking-widest text-primary border-primary/20 bg-primary/5">
            Pricing Plans
          </Badge>
          <h1 className="text-4xl font-black tracking-tight text-foreground sm:text-6xl text-balance">
            Flexible plans for <span className="text-primary">unlimited</span> potential
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
            Choose the right level of performance. Upgrade anytime as your needs grow.
            All plans include access to our core secure infrastructure.
          </p>
        </div>

        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={cn(
                "flex flex-col justify-between h-full rounded-[2.5rem] p-2 transition-all duration-300",
                tier.mostPopular 
                  ? "border-primary/50 bg-primary/5 shadow-2xl shadow-primary/10 ring-1 ring-primary/20" 
                  : "border-muted-foreground/10 bg-card/50 backdrop-blur-xl hover:border-primary/30"
              )}>
                <CardHeader className="p-8 pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className={cn("p-3 rounded-2xl", tier.bg, tier.color)}>
                      <tier.icon className="h-6 w-6" />
                    </div>
                    {tier.mostPopular && (
                      <Badge className="rounded-full bg-primary text-primary-foreground font-black px-4 py-1 text-[10px] uppercase tracking-widest">
                        Most Popular
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-3xl font-black tracking-tight">{tier.name}</CardTitle>
                  <div className="mt-4 flex items-baseline gap-x-2">
                    <span className="text-5xl font-black tracking-tight">{tier.price}</span>
                    <span className="text-sm font-semibold leading-6 text-muted-foreground">/month</span>
                  </div>
                  <CardDescription className="mt-4 text-base leading-7">
                    {tier.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="p-8 pt-0 flex-1">
                  <div className="mt-8 space-y-4">
                    {tier.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <CheckIcon className="h-3 w-3 stroke-[3px]" />
                        </div>
                        <span className="text-sm text-muted-foreground font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="p-8 pt-0">
                  <Button asChild size="lg" variant={tier.mostPopular ? 'default' : 'outline'} className={cn(
                    "w-full h-14 rounded-2xl text-lg font-bold transition-all shadow-xl",
                    tier.mostPopular ? "shadow-primary/20 hover:shadow-primary/30" : "backdrop-blur-sm border-muted-foreground/20 hover:bg-muted/50"
                  )}>
                    <Link href={tier.href as Route}>
                      Get started with {tier.name}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Credit System Explained */}
      <div className="relative isolate overflow-hidden bg-muted/30 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-black leading-7 text-primary uppercase tracking-[0.2em]">Fuel your workflow</h2>
            <p className="mt-2 text-3xl font-black tracking-tight sm:text-4xl text-balance">
              Transparent credit-based economy
            </p>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              HSWLP uses a credit system to handle high-compute tasks. Credits are included in your monthly plan and can be topped up anytime.
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-3">
              {creditUsage.map((item) => (
                <Card key={item.action} className="bg-card/50 border-muted-foreground/10 rounded-3xl p-8 hover:border-primary/30 transition-all group">
                  <div className="flex flex-col items-center text-center gap-4">
                    <div className="p-4 rounded-2xl bg-primary/5 text-primary group-hover:scale-110 transition-transform">
                      <item.icon className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-xl font-bold">{item.action}</CardTitle>
                    <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 font-black text-lg px-4 py-1 rounded-xl">
                      {item.cost}
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <Button asChild variant="link" className="text-primary font-bold text-lg group">
              <Link href={"/dashboard/billing" as Route} className="flex items-center">
                Learn more about our economy <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Trust Badge Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-24 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-500 text-sm font-bold border border-emerald-500/20">
          <ShieldCheck className="h-4 w-4" />
          Secure Enterprise-Grade Infrastructure
        </div>
      </div>
    </div>
  )
}
