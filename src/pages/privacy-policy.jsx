import React from "react";
import SEO from "../common/seo";
import PrivacyPolicy from "../components/privacy-policy"; 

const index = () => {
  return (
    <>
      <SEO pageTitle={"Privacy Policy — DevMate Solutions"} pageUrl={"/privacy-policy"} />
      <PrivacyPolicy />

      
    </>
  );
};

export default index;
