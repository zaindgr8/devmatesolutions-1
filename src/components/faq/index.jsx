import BreadcrumbArea from "@/src/common/breadcrumb-area";
import Footer from "@/src/layout/footers/footer-3";
import Header from "@/src/layout/headers/header-3";
import React from "react";
import Brand from "../homes/brand";
import FaqArea from "./faq-area";

const FAQ = () => {
  return (
    <>
      <Header />
      <BreadcrumbArea acive_menu="FAQ"  title="Some Q & Answer" />
      <FaqArea />
      <Brand style_faq={true} />
      <Footer />
    </>
  );
};

export default FAQ;
