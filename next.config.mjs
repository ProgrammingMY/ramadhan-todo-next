// @ts-check
import withSerwistInit from "@serwist/next";

// You may want to use a more robust revision to cache
// files more efficiently.
// A viable option is `git rev-parse HEAD`.
const revision = crypto.randomUUID();

const withSerwist = withSerwistInit({
  cacheOnNavigation: true,
  swSrc: "app/sw.ts",
  swDest: "public/sw.js",
  additionalPrecacheEntries: [
    { url: "/", revision },
    { url: "/messages", revision },
  ],
  exclude: [
    // https://github.com/shadowwalker/next-pwa/issues/424#issuecomment-1332258575
    ({ asset }) => {
      // Add here any file that fails pre-caching
      const excludeList = [
        // Default Serwist https://serwist.pages.dev/docs/next/configuring/exclude
        /\.map$/,
        /^manifest.*\.js$/,
        /^server\//,
        /^(((app-)?build-manifest|react-loadable-manifest|dynamic-css-manifest)\.json)$/,
      ]
      if (excludeList.some(r => r.test(asset.name))) {
        return true
      }
      return false
    },
  ]
});

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/javascript; charset=utf-8',
          },
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self'",
          },
        ],
      },
    ]
  }
};

export default withSerwist(nextConfig);
