/** @type {import('next').NextConfig} */
const nextConfig = {
  // TODO: remove allow all origins
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
      },
    ],
  },
};

export default nextConfig;
