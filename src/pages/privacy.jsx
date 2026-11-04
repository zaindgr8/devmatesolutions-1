import React from "react";
import SEO from "../common/seo";
import PrivacyPolicy from "../components/privacy-policy";

const PrivacyAliasPage = () => {
  return (
    <>
      <SEO pageTitle={"Privacy Policy — DevMate Solutions"} pageUrl={"/privacy-policy"} />
      <PrivacyPolicy />
    </>
  );
};

export default PrivacyAliasPage;
