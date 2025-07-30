import { Metadata } from "next";
import { MotionSection } from "@/components/ui/MotionSection";

export const metadata: Metadata = {
  title: "Deploy Guide",
};

export default function DeployPage() {
  return (
    <MotionSection className="space-y-6 mx-auto max-w-3xl px-6 py-16 prose dark:prose-invert">
      <h1>Deploy Guide</h1>
      <p>Deploying to Cloudflare Pages is straightforward. The project builds entirely in a serverless environment.</p>
      <ol>
        <li>Run <code>pnpm build</code> to generate the production bundle.</li>
        <li>Commit and push your code to your repository.</li>
        <li>In the Cloudflare dashboard create a Pages project and link it to your repo.</li>
        <li>Set the build command to <code>pnpm build</code> and the output directory to <code>.open-next</code>.</li>
        <li>Pages will automatically deploy each commit.</li>
      </ol>
      <p>For advanced usage you can deploy the Workers API separately using Wrangler.</p>
    </MotionSection>
  );
}
