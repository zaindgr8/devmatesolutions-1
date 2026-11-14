import React from "react";
import SEO from "../common/seo";
import Terms from "../components/terms";

const index = () => {
  return (
    <>
      <SEO pageTitle={"Terms of Service — DevMate Solutions"} pageUrl={"/terms"} />
      <Terms />
    </>
  );
};

export default index;
