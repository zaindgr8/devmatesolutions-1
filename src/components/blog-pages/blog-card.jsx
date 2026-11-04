import Link from "next/link";
import React from "react";
import { FaArrowRight, FaBuilding, FaCogs, FaPhoneAlt } from "react-icons/fa";

const CATEGORY_ICONS = {
  "Dubai Real Estate": FaBuilding,
  "AI Call Assistants": FaPhoneAlt,
  "AI Automation": FaCogs,
};

// Fixed locale and time zone, so the server and browser always print the same date.
export const formatDate = (iso) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

const BlogCard = ({ post, featured = false, headingLevel: Heading = "h3" }) => {
  const Icon = CATEGORY_ICONS[post.category] || FaCogs;
  return (
    <article className={`dm-post${featured ? " dm-post--featured" : ""}`}>
      <div className="dm-post__cover" aria-hidden="true">
        <Icon />
      </div>
      <div className="dm-post__body">
        <div className="dm-post__meta">
          <span className="dm-post__category">{post.category}</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </div>
        <Heading className="dm-post__title">
          <Link href={post.href}>{post.title}</Link>
        </Heading>
        <p className="dm-post__excerpt">{post.excerpt}</p>
        <span className="dm-post__more" aria-hidden="true">
          Read article <FaArrowRight />
        </span>
      </div>
    </article>
  );
};

export default BlogCard;
