import type { NextConfig } from 'next'
const isGithubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.tina.io',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
      }
    ],
  },
  output: 'export',
  distDir: 'docs',
  basePath: process.env.GITHUB_PAGES ? '/sfcf' : '',
  assetPrefix: process.env.GITHUB_PAGES ? '/sfcf/' : '',
  trailingSlash: true,

  async headers() {
    const headers = [
      {
        key: 'X-Frame-Options',
        value: 'SAMEORIGIN',
      },
      {
        key: 'Content-Security-Policy',
        value: "frame-ancestors 'self'",
      },
    ];
    return [
      {
        source: '/(.*)',
        headers,
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: '/admin',
        destination: '/admin/index.html',
      },
    ];
  },
}

export default nextConfig
