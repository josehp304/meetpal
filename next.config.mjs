/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'public.readdy.ai',
        port: '',
        pathname: '/ai/**',
      },
    ],
  },
};

export default nextConfig; 