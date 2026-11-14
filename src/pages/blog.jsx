import Head from "next/head";
import React from "react";
import SEO from "../common/seo";
import Blog from "../components/blog-pages/blog";
import blog_posts from "../data/blog-posts";
import Wrapper from "../layout/wrapper";

const BASE_URL = "https://devmatesolutions.com";
const TITLE = "AI Blog: R&D Research, AI Services and AI News";
const DESCRIPTION =
  "Our blog on AI and our R&D team's research: AI voice and call agents, agentic AI, WhatsApp AI and automation, in Arabic and English, plus the latest AI news, from an AI agency based in Dubai.";

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: TITLE,
  description: DESCRIPTION,
  url: `${BASE_URL}/blog`,
  publisher: { "@type": "Organization", name: "DevMate Solutions", url: BASE_URL },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: blog_posts.map((post, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${BASE_URL}${post.href}`,
      name: post.title,
    })),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/` },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE_URL}/blog` },
  ],
};

const index = () => {
  return (
    <>
      <SEO pageTitle={TITLE} pageDescription={DESCRIPTION} pageUrl="/blog" />
      <Head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      </Head>
      <Wrapper>
        <Blog />
      </Wrapper>
    </>
  );
};

export default index;
