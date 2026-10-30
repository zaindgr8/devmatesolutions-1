/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: "/aileadmanagement",
        destination: "/aileadmanagementdubairealestate",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
