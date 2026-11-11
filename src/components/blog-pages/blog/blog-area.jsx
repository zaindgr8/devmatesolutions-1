import blog_posts, { BLOG_CATEGORIES } from "@/src/data/blog-posts";
import Link from "next/link";
import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import BlogCard from "../blog-card";

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
          <h1>AI Around the World</h1>
          <p>
            What is happening in AI, what it means for your business, and how to use it. We follow
            the models, tools and moves from around the world — and turn them into practical guides
            on AI agents, chatbots and call assistants that answer every lead fast, qualify it and
            book the meeting, in Dubai and across the USA.
          </p>
          <p>
            Every week, AI moves somewhere in the world. We track it, test it on real business
            problems, and write down what actually matters — no hype, no jargon, just what to do
            with it.
          </p>
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
