import Head from "next/head";
import React from "react";
import SEO from "../common/seo";
import Blog from "../components/blog-pages/blog";
import blog_posts from "../data/blog-posts";
import Wrapper from "../layout/wrapper";

const BASE_URL = "https://devmatesolutions.com";
const TITLE = "AI Around the World — AI News, Tools and Practical Guides | DevMate Solutions";
const DESCRIPTION =
  "What is happening in AI around the world, what it means for your business, and how to use it — practical guides on AI agents, chatbots and call assistants for Dubai real estate and US clinics.";

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
