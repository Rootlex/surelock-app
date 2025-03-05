/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                hostname: "ng.jumia.is",
                protocol: "https",
            },
        ],
    },
};

export default nextConfig;
