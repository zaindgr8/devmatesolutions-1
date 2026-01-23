import Head from "next/head";

const SEO = ({ pageTitle }) => {
  const baseUrl = "https://devmatesolutions.com";

  // Organization Schema for sitelinks
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "DEVMATE Solutions",
    alternateName: "DevMate Solutions",
    url: baseUrl,
    logo: `${baseUrl}/red-logo.png`,
    description:
      "Checkmate your software and digital marketing goals with DEVMATE - AI Powered Software Agency",
    sameAs: [
      "https://www.instagram.com/devmatesolutions",
      "https://www.linkedin.com/company/devmate-solutions",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dubai",
      addressRegion: "DXB",
      addressCountry: "AE",
    },
    areaServed: [
      {
        "@type": "City",
        name: "Dubai",
      },
      {
        "@type": "City",
        name: "Muscat",
      },
      {
        "@type": "City",
        name: "New York",
      },
    ],
  };

  // SiteNavigationElement Schema for sitelinks
  const siteNavigationSchema = {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    name: "Main Navigation",
    url: baseUrl,
    hasPart: [
      {
        "@type": "SiteNavigationElement",
        name: "Home",
        url: `${baseUrl}/`,
      },
      {
        "@type": "SiteNavigationElement",
        name: "Services",
        url: `${baseUrl}/service-3`,
      },
      {
        "@type": "SiteNavigationElement",
        name: "Portfolio",
        url: `${baseUrl}/portfolio-2`,
      },
      {
        "@type": "SiteNavigationElement",
        name: "Team",
        url: `${baseUrl}/team-2`,
      },
      {
        "@type": "SiteNavigationElement",
        name: "Career",
        url: `${baseUrl}/job`,
      },
    ],
  };

  // WebSite Schema with potentialAction for sitelinks
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "DEVMATE Solutions",
    alternateName: "DevMate Solutions",
    url: baseUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <Head>
        <title>
          {pageTitle &&
            `${pageTitle} - Software & Digital Marketing Solutions `}
        </title>
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="description"
          content="Checkmate your software and digital marketing goals with DEVMATE 🎯🚀"
        />
        <meta name="robots" content="index, follow" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="icon" href="/red-logo.png" />
        <link rel="canonical" href={baseUrl} />

        {/* Structured Data for SEO Sitelinks */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(siteNavigationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </Head>
    </>
  );
};

export default SEO;
