"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const DISCORD_URL = "https://discord.gg/hswlp";

export function CallToAction() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-16 sm:py-24 bg-primary text-primary-foreground text-center"
    >
      <p className="text-2xl font-bold mb-6">
        Join our developer community – build, use, share!
      </p>
      <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer">
        <Button
          size="lg"
          className="rounded-full bg-zinc-900 text-white hover:bg-zinc-800 transition-colors duration-200"
        >
          Join HSWLP Discord
        </Button>
      </a>
    </motion.section>
  );
}
