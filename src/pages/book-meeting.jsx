import React from "react";
import SEO from "../common/seo";
import Wrapper from "../layout/wrapper";
import CeoPage from "../components/ceo/CeoPage";

const index = () => {
  return (
    <Wrapper>
      <SEO pageTitle={"Book Meeting - Devmate Solutions"} />
      <CeoPage />
    </Wrapper>
  );
};

export default index;
