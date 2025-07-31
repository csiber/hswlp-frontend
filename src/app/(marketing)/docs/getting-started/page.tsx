import { Metadata } from "next";
import { BASE_METADATA } from "@/lib/base-metadata";
import { MotionSection } from "@/components/ui/MotionSection";

export const metadata: Metadata = {
  ...BASE_METADATA,
  title: "Getting Started",
};

export default function GettingStartedPage() {
  return (
    <MotionSection className="space-y-6 mx-auto max-w-3xl px-6 py-16 prose dark:prose-invert">
      <h1>Getting Started</h1>
      <p>This guide helps you set up a local development environment for the HSWLP platform.</p>
      <h2>Prerequisites</h2>
      <ul>
        <li>A Cloudflare account</li>
        <li>Node.js and <code>pnpm</code> installed locally</li>
        <li>Access to the repository</li>
      </ul>
      <h2>Installation</h2>
      <p>Clone the project and install dependencies:</p>
      <pre><code>git clone https://github.com/csiber/hswlp-next.git
cd hswlp-frontend
pnpm install</code></pre>
      <p>Copy <code>custom-env.d.ts</code> to <code>.env</code> and adjust the environment variables.</p>
      <h2>Running locally</h2>
      <p>Start the dev server and workers:</p>
      <pre><code>pnpm dev</code></pre>
      <p>The application runs at <code>http://localhost:3000</code>. API endpoints are served through local Cloudflare Workers.</p>
      <h2>Next steps</h2>
      <p>Once you are comfortable with the basics, explore the <a href="/docs/deploy">deployment guide</a> and the <a href="/docs/api">API reference</a>.</p>
    </MotionSection>
  );
}
