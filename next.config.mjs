/** @type {import('next').NextConfig} */


const nextConfig = {
<<<<<<< HEAD
  // 로그인 2번 호출되는 경우 FALSE처리하면 됨
    reactStrictMode: true,
=======
    reactStrictMode: false,
>>>>>>> 15eef43f81a2241aefcb4b1978497c5bbd748310
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