/** @type {import('next').NextConfig} */
const nextConfig = {
    compress: true, // Enable gzip/brotli compression
    images: {
        formats: ["image/avif", "image/webp"], // Prefer AVIF (30% smaller), fallback to WebP
        qualities: [100, 75],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.ctfassets.net",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "placehold.co",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
