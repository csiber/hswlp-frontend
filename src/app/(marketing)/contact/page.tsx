import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl font-bold">Contact</h1>
      <p className="text-muted-foreground">Send us a message at contact@example.com.</p>
    </div>
  );
}
