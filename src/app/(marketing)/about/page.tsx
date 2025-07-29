import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl font-bold">About Us</h1>
      <p className="text-muted-foreground">This project showcases apps built on Cloudflare Workers.</p>
    </div>
  );
}
