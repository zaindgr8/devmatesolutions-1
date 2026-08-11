import BreadcrumbArea from "@/src/common/breadcrumb-area";
import FooterThree from "@/src/layout/footers/footer-3";
import HeaderThree from "@/src/layout/headers/header-3";
import React from "react";
import PrivacyPolicyArea from "./privacy-policy-area";

const PrivacyPolicy = () => {
  return (
    <>
      <HeaderThree />
      <BreadcrumbArea acive_menu="Privacy Policy" title="Privacy Policy" />
      <PrivacyPolicyArea />
      <FooterThree />
    </>
  );
};

export default PrivacyPolicy;
