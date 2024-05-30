/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: {
      displayName: false,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "photos.smugmug.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
