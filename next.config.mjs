/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [80, 100],

    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "smbknbobmshtxgcyaakk.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
