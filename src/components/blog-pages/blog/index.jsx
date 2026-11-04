import FooterThree from "@/src/layout/footers/footer-3";
import HeaderThree from "@/src/layout/headers/header-3";
import React from "react";
import BlogArea from "./blog-area";

const Blog = () => {
  return (
    <>
      <HeaderThree />
      <main>
        <BlogArea />
      </main>
      <FooterThree />
    </>
  );
};

export default Blog;
