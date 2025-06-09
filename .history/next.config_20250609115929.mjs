/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        unoptimized: true,
    },
    rewrites: async () => [
        {
            source: '/api/:path*',
            destination:
                `${process.env.API_BASE_URL}/api/:path*` ||
                'http://localhost:3001/api/:path*',
        },
    ],
};

export default nextConfig