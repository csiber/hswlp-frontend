import { Metadata } from "next";
import { SITE_NAME, SITE_DESCRIPTION } from "@/constants";
import { Hero } from "@/components/home/hero";
import { Introduction } from "@/components/home/introduction";
import { Categories } from "@/components/home/categories";
import { FeaturedApps } from "@/components/home/featured-apps";
import { CallToAction } from "@/components/home/cta";

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Introduction />
      <Categories />
      <FeaturedApps />
      <CallToAction />
    </main>
  );
}
