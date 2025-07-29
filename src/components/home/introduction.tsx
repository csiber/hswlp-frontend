"use client";
import { motion } from "framer-motion";

export function Introduction() {
  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-16 sm:py-24"
    >
      <div className="mx-auto max-w-3xl px-6 text-center space-y-4">
        <p className="text-2xl font-bold sm:text-3xl">What is HSWLP?</p>
        <p className="text-lg text-muted-foreground">
          A modular ecosystem where every app lives on its own. No vendor lock-in, no bloat — just efficiency.
        </p>
        <p className="text-lg text-muted-foreground">
          Powered by Cloudflare Workers and Pages, integrating Unity experiences and other modern stacks.
        </p>
        <div className="text-3xl">🧊 🧩 🕶️ 🧱</div>
      </div>
    </motion.section>
  );
}
