/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'img.freepik.com',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'static.vecteezy.com',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'assets-global.website-files.com',
                pathname: '**',
            },
        ],
    },
};

export default nextConfig;
