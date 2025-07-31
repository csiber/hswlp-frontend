import { Metadata } from "next";
import { BASE_METADATA } from "@/lib/base-metadata";
import { MotionSection } from "@/components/ui/MotionSection";

export const metadata: Metadata = {
  ...BASE_METADATA,
  title: "Shell App",
};

export default function ShellPage() {
  return (
    <MotionSection className="space-y-6 mx-auto max-w-3xl px-6 py-16 prose dark:prose-invert">
      <h1>Shell App</h1>
      <p>A shell is a preconfigured frontend that connects directly to Cloudflare Workers APIs.</p>
      <p>Each shell runs entirely on the edge without traditional servers. D1 provides relational storage while R2 stores user-generated media. Authentication relies on JWT tokens stored in local storage.</p>
      <h2>Project Structure</h2>
      <ul>
        <li><code>functions/api/**</code> – Worker routes for data access</li>
        <li><code>src/app</code> – Nuxt 3 pages and layouts</li>
        <li><code>src/components</code> – Reusable UI modules</li>
      </ul>
      <h2>Building Features</h2>
      <p>You can compose your own shell by adding new Workers functions and importing them through <code>fetch()</code>. The platform does not rely on Laravel or any PHP backend.</p>
      <p>Because everything is serverless, deployments are fast and cost-effective.</p>
    </MotionSection>
  );
}
