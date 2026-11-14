import blog_posts, { BLOG_CATEGORIES } from "@/src/data/blog-posts";
import Link from "next/link";
import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import BlogCard from "../blog-card";

// Core service and news pages, linked from the hub so search engines and AI assistants find them.
const PILLARS = [
  { href: "/ai-agency-dubai", label: "AI Agency" },
  { href: "/ai-call-assistant-dubai", label: "AI Voice & Call Agents" },
  { href: "/agentic-ai-dubai", label: "Agentic AI" },
  { href: "/whatsappautomation", label: "WhatsApp & Chat AI" },
  { href: "/ai-automation-dubai", label: "AI Automation" },
  { href: "/ai-news-dubai", label: "AI News" },
  { href: "/ai-agent-dubai-real-estate", label: "Real Estate" },
  { href: "/ai-hospitality-dubai", label: "Hospitality" },
];

const BlogArea = () => {
  const [category, setCategory] = useState("All");
  const posts = category === "All" ? blog_posts : blog_posts.filter((post) => post.category === category);
  const [featured, ...rest] = posts;

  return (
    <>
      <section className="dm-blog-hero">
        <div className="container">
          <nav aria-label="Breadcrumb">
            <ol className="dm-blog-crumbs">
              <li><Link href="/">Home</Link></li>
              <li aria-current="page">Blog</li>
            </ol>
          </nav>
          <p className="dm-blog-eyebrow">Our AI Blog &amp; R&amp;D Research</p>
          <h1>AI Research, Services and the News That Matters</h1>
          <p>
            Our blog on AI, written from the research of the DevMate R&amp;D team. We test new AI
            models, agents and tools on real business problems, then share what works: AI voice and
            call agents, agentic AI, WhatsApp and chat AI, and AI automation, in Arabic and English.
            Plus the latest AI news and what it means for real estate, healthcare, hospitality and
            every business that answers customers.
          </p>
          <nav className="dm-blog-pillars" aria-label="Start here">
            {PILLARS.map((p) => (
              <Link key={p.href} href={p.href}>{p.label}</Link>
            ))}
          </nav>
        </div>
      </section>

      <section className="dm-blog-list">
        <div className="container">
          <div className="dm-blog-filters" role="group" aria-label="Filter articles by topic">
            {["All", ...BLOG_CATEGORIES].map((name) => (
              <button
                key={name}
                type="button"
                className={`dm-blog-filter${category === name ? " is-active" : ""}`}
                aria-pressed={category === name}
                onClick={() => setCategory(name)}
              >
                {name}
              </button>
            ))}
          </div>

          <div className="dm-blog-featured">
            <BlogCard post={featured} featured headingLevel="h2" />
          </div>
          <div className="dm-post-grid">
            {rest.map((post) => (
              <BlogCard key={post.href} post={post} headingLevel="h2" />
            ))}
          </div>

          <div className="dm-blog-cta">
            <div>
              <h2>Want this working in your business?</h2>
              <p>Book a free call and we&apos;ll show you where AI can win you more leads.</p>
            </div>
            <Link href="/#ceo" className="dm-blog-btn">
              Book a meeting <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogArea;
