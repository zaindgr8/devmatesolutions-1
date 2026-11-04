import { formatDate } from "@/src/components/blog-pages/blog-card";
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
            <span className="tp-section__subtitle">DevMate AI Insights</span>
            <h2 className="tp-section__title">Stay ahead of AI. Not just informed.</h2>
          </div>
          <Link href="/blog" className="dm-home-blog__all">
            Read all insights <FaArrowRight />
          </Link>
        </div>
        <ul className="dm-home-blog__list">
          {blog_posts.slice(0, 3).map((post) => (
            <li key={post.href} className="dm-home-blog__row">
              <Link href={post.href}>
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <h3>{post.title}</h3>
                <FaArrowRight aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default BlogArea;
