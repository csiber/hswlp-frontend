"use client";
import Link from "next/link";
import { type Route } from "next";
import { motion } from "framer-motion";

interface Category {
  name: string;
  href: string;
  icon: string;
}
const categories: Category[] = [
  { name: "Shell Apps", href: "/apps/type/shell", icon: "🧊" },
  { name: "Pages", href: "/apps/type/pages", icon: "🧩" },
  { name: "VR", href: "/apps/type/vr", icon: "🕶️" },
  { name: "NAS", href: "/apps/type/nas", icon: "🧱" },
  { name: "Creative Tools", href: "/apps/type/creative", icon: "🎨" },
  { name: "Utilities", href: "/apps/type/tools", icon: "🛠️" },
];

export function Categories() {
  return (
    <section className="py-16 sm:py-24 bg-muted/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map(cat => (
            <motion.div
              key={cat.name}
              whileHover={{ scale: 1.05 }}
              className="rounded-lg border p-6 text-center bg-background transition-colors hover:bg-accent"
            >
              <Link href={cat.href as Route} className="flex flex-col items-center space-y-4">
                <span className="text-3xl">{cat.icon}</span>
                <span className="text-lg font-semibold">{cat.name}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
