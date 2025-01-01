/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            // Existing pattern
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                pathname: '/a/**',
            },
            // New patterns
            { hostname: "avatar.vercel.sh", port: "", protocol: "https" },
            { hostname: "utfs.io", port: "", protocol: "https" },
            {
                hostname: "avatars.githubusercontent.com",
                port: "",
                protocol: "https",
            },
        ],
    },
};

export default nextConfig;
