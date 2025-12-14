/** @type {import('next').NextConfig} */
const nextConfig = {
    compress: true, // Enable gzip/brotli compression
    images: {
        formats: ["image/avif", "image/webp"], // Prefer AVIF (30% smaller), fallback to WebP
        qualities: [100, 75],
        // Cache optimized images for 1 year on Vercel's edge network
        // This dramatically reduces repeat requests to Contentful
        minimumCacheTTL: 31536000, // 1 year in seconds
        // Optimized device sizes for common breakpoints
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        // Smaller image sizes for icons, thumbnails, etc.
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
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
