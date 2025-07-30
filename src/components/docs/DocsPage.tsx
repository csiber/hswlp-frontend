"use client";

import { motion } from "framer-motion";
import DocsGrid from "./DocsGrid";

export default function DocsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <h1 className="text-3xl font-bold">Documentation</h1>
      <p className="text-muted-foreground">
        Browse guides, API references, and platform tips for building with HSWLP.
      </p>
      <DocsGrid />
    </motion.div>
  );
}
