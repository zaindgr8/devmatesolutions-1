import Head from "next/head";

const SEO = ({ pageTitle, pageDescription, pageUrl, pageImage }) => {
  const baseUrl = "https://devmatesolutions.com";
  const canonicalUrl = pageUrl ? `${baseUrl}${pageUrl}` : baseUrl;
  const ogImage = pageImage || `${baseUrl}/red-logo.png`;
  const description =
    pageDescription ||
    "DevMate Solutions — AI-powered software agency in Dubai. We build AI agents, WhatsApp automation, lead management systems, and custom software for businesses worldwide.";

  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "DevMate Solutions",
    alternateName: "DEVMATE Solutions",
    url: baseUrl,
    logo: `${baseUrl}/red-logo.png`,
    description:
      "AI-powered software agency based in Dubai. Custom AI agents, WhatsApp automation, lead management systems, and full-stack web development for startups and enterprises.",
    sameAs: [
      "https://www.instagram.com/devmatesolutions",
      "https://www.linkedin.com/company/devmate-solutions",
      "https://www.facebook.com/devmatesolutions",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Business Bay",
      addressLocality: "Dubai",
      addressRegion: "DXB",
      addressCountry: "AE",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+971-54-2968754",
      contactType: "customer service",
      availableLanguage: ["English", "Arabic"],
    },
    areaServed: [
      { "@type": "City", name: "Dubai" },
      { "@type": "City", name: "Muscat" },
      { "@type": "City", name: "New York" },
    ],
  };

  // WebSite Schema with SearchAction
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "DevMate Solutions",
    alternateName: "DEVMATE Solutions",
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

  // SiteNavigation Schema
  const siteNavigationSchema = {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    name: "Main Navigation",
    url: baseUrl,
    hasPart: [
      { "@type": "SiteNavigationElement", name: "Home", url: `${baseUrl}/` },
      { "@type": "SiteNavigationElement", name: "Services", url: `${baseUrl}/ourservices` },
      { "@type": "SiteNavigationElement", name: "AI Lead Management", url: `${baseUrl}/aileadmanagementdubairealestate` },
      { "@type": "SiteNavigationElement", name: "WhatsApp Automation", url: `${baseUrl}/whatsappautomation` },
      { "@type": "SiteNavigationElement", name: "AI Call Agents", url: `${baseUrl}/callagents` },
      { "@type": "SiteNavigationElement", name: "Team", url: `${baseUrl}/our-team` },
      { "@type": "SiteNavigationElement", name: "Careers", url: `${baseUrl}/job` },
    ],
  };

  return (
    <>
      <Head>
        <title>{pageTitle ? `${pageTitle} | DevMate Solutions` : "DevMate Solutions — AI-Powered Software Agency in Dubai"}</title>
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="author" content="DevMate Solutions" />
        <meta name="keywords" content="DevMate Solutions, AI agency Dubai, AI automation, WhatsApp automation, lead management, AI call agents, software development Dubai, digital marketing UAE" />

        {/* Canonical — unique per page, prevents duplicate content deindex */}
        <link rel="canonical" href={canonicalUrl} />

        {/* Favicon */}
        <link rel="icon" href="/red-logo.png" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="DevMate Solutions" />
        <meta property="og:title" content={pageTitle ? `${pageTitle} | DevMate Solutions` : "DevMate Solutions — AI-Powered Software Agency in Dubai"} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter / X Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@devmatesolutions" />
        <meta name="twitter:title" content={pageTitle ? `${pageTitle} | DevMate Solutions` : "DevMate Solutions — AI-Powered Software Agency in Dubai"} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteNavigationSchema) }}
        />
      </Head>
    </>
  );
};

export default SEO;
