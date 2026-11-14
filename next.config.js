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
      { source: "/home-2", destination: "/", permanent: true },
      { source: "/home-3", destination: "/", permanent: true },
      { source: "/home-4", destination: "/", permanent: true },
      { source: "/home-5", destination: "/", permanent: true },
      { source: "/home-6", destination: "/", permanent: true },
      { source: "/home-7", destination: "/", permanent: true },
      { source: "/home-8", destination: "/", permanent: true },
      { source: "/home-9", destination: "/", permanent: true },
      { source: "/home-10", destination: "/", permanent: true },
      { source: "/about", destination: "/our-team", permanent: true },
      { source: "/about-2", destination: "/our-team", permanent: true },
      { source: "/about-3", destination: "/our-team", permanent: true },
      { source: "/about-me", destination: "/zain-ul-abideen-baloch", permanent: true },
      { source: "/service", destination: "/ourservices", permanent: true },
      { source: "/service-2", destination: "/ourservices", permanent: true },
      { source: "/service-3", destination: "/ourservices", permanent: true },
      { source: "/service-details", destination: "/ourservices", permanent: true },
      { source: "/portfolio", destination: "/#our-own-ventures", permanent: true },
      { source: "/portfolio-2", destination: "/#our-own-ventures", permanent: true },
      { source: "/portfolio-3", destination: "/#our-own-ventures", permanent: true },
      { source: "/portfolio-4", destination: "/#our-own-ventures", permanent: true },
      { source: "/portfolio-5", destination: "/#our-own-ventures", permanent: true },
      { source: "/portfolio-details", destination: "/#our-own-ventures", permanent: true },
      { source: "/shop", destination: "/ourservices", permanent: true },
      { source: "/shop-details", destination: "/ourservices", permanent: true },
      { source: "/checkout", destination: "/ourservices", permanent: true },
      { source: "/price", destination: "/ourservices", permanent: true },
      { source: "/team", destination: "/our-team", permanent: true },
      { source: "/team-details", destination: "/our-team", permanent: true },
      { source: "/job-details", destination: "/job", permanent: true },
      { source: "/help", destination: "/faq", permanent: true },
      { source: "/search", destination: "/", permanent: true },
    ];
  },
};

module.exports = nextConfig;
