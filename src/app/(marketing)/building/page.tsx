import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BASE_METADATA } from "@/lib/base-metadata";

export const metadata: Metadata = {
  ...BASE_METADATA,
  title: "Start Building",
  description: "Get ready to create on HSWLP",
};

export default function BuildingPage() {
  return (
    <div className="container mx-auto max-w-3xl px-6 py-24 space-y-6 text-center">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Builder in progress</h1>
      <p className="text-muted-foreground">We are working on tools that will let you deploy apps with ease. Stay tuned!</p>
      <Link href="/" className="inline-block">
        <Button className="rounded-full">Back to home</Button>
      </Link>
    </div>
  );
}
