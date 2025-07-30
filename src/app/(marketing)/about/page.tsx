import { Metadata } from "next";
import AboutPageClient from "./about.client";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return <AboutPageClient />;
}
