/** @type {import('next').NextConfig} */


const nextConfig = {
  // 로그인 2번 호출되는 경우 FALSE처리하면 됨
    reactStrictMode: true,
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