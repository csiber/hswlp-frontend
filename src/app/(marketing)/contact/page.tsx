import { Metadata } from "next";
import { BASE_METADATA } from "@/lib/base-metadata";
import ContactForm from "./contact-form";

export const metadata: Metadata = {
  ...BASE_METADATA,
  title: "Contact",
};

export default function ContactPage() {
  return <ContactForm />;
}
