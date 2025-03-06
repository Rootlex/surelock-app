/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                hostname: "ng.jumia.is",
                protocol: "https",
            },
            {
                hostname: "cdn.shopify.com",
            },
            {
                hostname: "m.media-amazon.com",
            },
        ],
    },
};

export default nextConfig;
