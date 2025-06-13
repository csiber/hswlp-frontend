/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Az "output: 'export'" beállítással a Next.js statikus állományokat generál az 'out' könyvtárba.
  output: 'export',
  images: {
    // Az exportálás miatt az Image component optimalizálása kikapcsolva
    unoptimized: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: 'removeViewBox',
                  active: false,
                },
              ],
            },
          },
        },
      ],
    })
    return config
  },
}

export default nextConfig
