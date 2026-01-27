/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  images: {
    domains: [
      'localhost',
      'bharatwebpro.in',
      's3.ap-south-1.amazonaws.com',
      'res.cloudinary.com'
    ],
    formats: ['image/avif', 'image/webp'],
  },

  // serverActions no longer needs to be enabled explicitly in recent Next.js versions
  experimental: {},

  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/admin/dashboard',
        permanent: true,
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: '/api/razorpay/:path*',
        destination: 'https://api.razorpay.com/:path*',
      },
    ];
  },

  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
};

module.exports = nextConfig;
