import { Metadata } from "next";
import { SITE_NAME, SITE_DESCRIPTION } from "@/constants";
import LandingPage from "@/components/landing-page/LandingPage";

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
};

export default function Home() {
  return <LandingPage />;
}
