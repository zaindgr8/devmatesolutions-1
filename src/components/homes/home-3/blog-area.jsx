import BlogCard from "@/src/components/blog-pages/blog-card";
import blog_posts from "@/src/data/blog-posts";
import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

const BlogArea = () => {
  return (
    <section className="dm-home-blog" id="blog">
      <div className="container">
        <div className="dm-home-blog__head">
          <div>
            <span className="tp-section__subtitle">From the blog</span>
            <h2 className="tp-section__title">Latest AI automation guides</h2>
          </div>
          <Link href="/blog" className="dm-blog-btn">
            View all articles <FaArrowRight />
          </Link>
        </div>
        <div className="dm-post-grid">
          {blog_posts.slice(0, 3).map((post) => (
            <BlogCard key={post.href} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogArea;
