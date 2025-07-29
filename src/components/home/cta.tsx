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
        Csatlakozz a fejlesztői közösséghez – építs, használj, terjeszd!
      </p>
      <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer">
        <Button size="lg" className="rounded-full bg-background text-foreground">
          Join HSWLP Discord
        </Button>
      </a>
    </motion.section>
  );
}
