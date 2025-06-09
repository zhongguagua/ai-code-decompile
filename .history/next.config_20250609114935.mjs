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
            source: '/op-front-manager/:path*',
            destination: `https://test-developer.moqipobing.com/op-front-manager/:path*`,
            // destination: `http://devmanager.wb-intra.com/op-front-manager/:path*`,
            basePath: false,
        },
    ],
};

export default nextConfig