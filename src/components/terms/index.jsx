import BreadcrumbArea from "@/src/common/breadcrumb-area";
import FooterThree from "@/src/layout/footers/footer-3";
import HeaderThree from "@/src/layout/headers/header-3";
import React from "react";
import TermsArea from "./terms-area";

const Terms = () => {
  return (
    <>
      <HeaderThree />
      <BreadcrumbArea acive_menu="Terms" title="Terms of Service" />
      <TermsArea />
      <FooterThree />
    </>
  );
};

export default Terms;
