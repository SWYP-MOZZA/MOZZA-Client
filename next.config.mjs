/** @type {import('next').NextConfig} */


const nextConfig = {
    reactStrictMode: false,
    async rewrites() {
      return [
        {
          source: '/:path*',
          destination: `http://13.124.244.7:8080/:path*`,
        },
      ];
    },
  };
  
export default nextConfig;