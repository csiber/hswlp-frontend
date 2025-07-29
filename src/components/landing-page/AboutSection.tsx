'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import type { Route } from 'next'

export function AboutSection() {
  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-16 sm:py-24 bg-muted/20"
    >
      <div className="mx-auto max-w-3xl px-6 space-y-6 prose dark:prose-invert text-balance">
        <h2>Mi az a HSWLP?</h2>
        <p>
          A HSWLP egy moduláris platform, amely lehetővé teszi különböző appok
          futtatását egyetlen infrastruktúrán. Legyen szó blogról, játékról vagy
          VR világról, minden projekt ugyanazon hitelrendszert használja.
        </p>
        <p>
          Egyszerűen skálázható és fejlesztőbarát környezetet biztosít, ahol a
          kreditek segítségével rugalmasan oszthatod meg az erőforrásokat a
          szolgáltatások között.
        </p>
        <p>
          <Link href={'/pricing' as Route} className="text-primary underline">
            Apps are powered by a shared credit system.
          </Link>
        </p>
      </div>
    </motion.section>
  )
}
