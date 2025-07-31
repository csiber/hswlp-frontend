import type { Metadata } from "next"
import { SITE_NAME, SITE_DESCRIPTION } from "@/constants"

export const BASE_METADATA: Metadata = {
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    images: "/web-app-manifest-512x512.png",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: ["/web-app-manifest-512x512.png"],
    creator: "@LubomirGeorg",
  }
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};
