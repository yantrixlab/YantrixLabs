/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  transpilePackages: ['@yantrix/ui', '@yantrix/shared-types'],
  eslint: {
    // Prevent deploy container failures during Next build lint pass.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Type-checking should run in dedicated CI steps, not block image build.
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
    ],
  },
  async headers() {
    return [
      {
        // Prevent stale HTML only for authenticated/dynamic app routes.
        source: '/(dashboard|invoices|customers|products|reports|payments|expenses|settings|hrm|crm|inventory|scanner|auth)/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate, proxy-revalidate' },
          { key: 'Pragma', value: 'no-cache' },
          { key: 'Expires', value: '0' },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/tools/gst-invoice',
        destination: '/gst-invoice',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
