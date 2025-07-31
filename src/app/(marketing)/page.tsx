import { Metadata } from "next";
import { BASE_METADATA } from "@/lib/base-metadata";
import { SITE_NAME, SITE_DESCRIPTION } from "@/constants";
import LandingPage from "@/components/landing-page/LandingPage";

export const metadata: Metadata = {
  ...BASE_METADATA,
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
};

export default function Home() {
  return <LandingPage />;
}
