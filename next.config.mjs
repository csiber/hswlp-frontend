import withBundleAnalyzer from '@next/bundle-analyzer';
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
import { AsyncLocalStorage } from 'node:async_hooks';

// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
// Next.js dev server might not expose AsyncLocalStorage on the global object,
// which prevents the Cloudflare context from initializing. Explicitly set it
// before calling the init function.
// next.js config can export an async function. Initialize the Cloudflare
// context before returning the configuration object.
globalThis.AsyncLocalStorage ??= AsyncLocalStorage;


// TODO cache-control headers don't work for static files
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  eslint: {
    ignoreDuringBuilds: process.env.SKIP_LINTER === 'true'
  },
  typescript: {
    ignoreBuildErrors: process.env.SKIP_LINTER === 'true'
  }
};

export default async () => {
  await initOpenNextCloudflareForDev();
  return process.env.ANALYZE === 'true'
    ? withBundleAnalyzer()(nextConfig)
    : nextConfig;
};
