import { Metadata } from "next";
import { BASE_METADATA } from "@/lib/base-metadata";
import AboutPageClient from "./about.client";

export const metadata: Metadata = {
  ...BASE_METADATA,
  title: "About",
};

export default function AboutPage() {
  return <AboutPageClient />;
}
