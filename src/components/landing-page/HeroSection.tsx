'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32">
      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[50%] top-0 h-[1000px] w-[1000px] -translate-x-[50%] translate-y-[-20%] [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-[-20%] sm:h-[1500px] sm:w-[1500px] sm:translate-x-0">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 blur-3xl animate-pulse" />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          v0.1.0 Beta is now live
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl font-extrabold tracking-tight sm:text-7xl text-balance bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60"
        >
          Your ideas. <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-blue-500 animate-gradient-x">
            Our infrastructure.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 text-xl leading-8 text-muted-foreground max-w-2xl mx-auto"
        >
          HSWLP is a high-performance launchpad for next-gen tools, immersive games, 
          and distributed infrastructure. Scalable, secure, and ready for your vision.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6"
        >
          <Link href="/apps">
            <Button
              size="lg"
              className="rounded-full px-8 h-14 text-lg font-semibold shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all hover:-translate-y-1 active:translate-y-0"
            >
              Explore ecosystem
            </Button>
          </Link>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/start">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full px-8 h-14 text-lg font-semibold backdrop-blur-sm border-muted-foreground/20 hover:bg-muted/50 transition-all hover:-translate-y-1 active:translate-y-0"
                >
                  Start building
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent className="bg-primary text-primary-foreground font-medium">
              Join the builder beta program
            </TooltipContent>
          </Tooltip>
        </motion.div>
        
        {/* Floating elements for visual depth */}
        <div className="mt-20 flex justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
           {/* Here could go some tech logos or partners */}
        </div>
      </div>
    </section>
  )
}
