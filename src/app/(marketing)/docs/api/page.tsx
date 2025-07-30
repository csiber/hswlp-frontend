import { Metadata } from "next";
import { MotionSection } from "@/components/ui/MotionSection";

export const metadata: Metadata = {
  title: "API Reference",
};

export default function ApiPage() {
  return (
    <MotionSection className="space-y-6 mx-auto max-w-3xl px-6 py-16 prose dark:prose-invert">
      <h1>API Reference</h1>
      <p>The Workers API exposes a minimal set of endpoints for user management. All requests use JSON and are authenticated via bearer tokens.</p>
      <h2>POST /api/user/register</h2>
      <p>Create a new user account.</p>
      <pre><code>{`fetch('/api/user/register', {
  method: 'POST',
  body: JSON.stringify({ email, password })
})`}</code></pre>
      <h2>POST /api/user/login</h2>
      <p>Returns a JWT token when credentials are valid.</p>
      <pre><code>{`const res = await fetch('/api/user/login', {
  method: 'POST',
  body: JSON.stringify({ email, password })
})
const { token } = await res.json()`}</code></pre>
      <h2>GET /api/user/me</h2>
      <p>Get the current user&apos;s id. Requires <code>Authorization: Bearer &lt;token&gt;</code> header.</p>
      <pre><code>{`fetch('/api/user/me', {
  headers: { Authorization: 'Bearer ' + token }
})`}</code></pre>
    </MotionSection>
  );
}
