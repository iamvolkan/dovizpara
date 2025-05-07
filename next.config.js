/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['www.doviz.com', 'www.tcmb.gov.tr', 'api.coingecko.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    experimental: {
        serverActions: true,
    }
}

module.exports = nextConfig 