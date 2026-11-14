import blog_posts from "@/src/data/blog-posts";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaArrowRight, FaTimes } from "react-icons/fa";

const STORAGE_KEY = "dm-dismissed-blog";

// Thin bar above the header announcing the newest blog post. Dismissing it hides only that post,
// so the bar comes back on its own when a newer post is published.
const LatestBlogBanner = () => {
  const latest = blog_posts[0];
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === latest?.href) setHidden(true);
    } catch {
      // Storage blocked: keep the banner visible.
    }
  }, [latest?.href]);

  if (!latest || hidden) return null;

  function dismiss() {
    setHidden(true);
    try {
      localStorage.setItem(STORAGE_KEY, latest.href);
    } catch {
      // Storage blocked: hidden for this page view only.
    }
  }

  return (
    <div className="dm-blog-banner" role="region" aria-label="Latest blog post">
      <Link href={latest.href} className="dm-blog-banner__link">
        <span className="dm-blog-banner__tag">New blog live</span>
        <span className="dm-blog-banner__title">{latest.title}</span>
        <FaArrowRight className="dm-blog-banner__arrow" aria-hidden="true" />
      </Link>
      <button type="button" className="dm-blog-banner__close" onClick={dismiss} aria-label="Dismiss announcement">
        <FaTimes aria-hidden="true" />
      </button>
    </div>
  );
};

export default LatestBlogBanner;
