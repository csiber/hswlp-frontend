import { Metadata } from "next";
import ContactForm from "./contact-form";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return <ContactForm />;
}
