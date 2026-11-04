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
      // Leftover template pages with placeholder content
      { source: "/blog-list", destination: "/blog", permanent: true },
      { source: "/blog-details", destination: "/blog", permanent: true },
    ];
  },
};

module.exports = nextConfig;
