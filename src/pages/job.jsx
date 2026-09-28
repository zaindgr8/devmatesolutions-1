import React from "react";
import SEO from "../common/seo";
import Job from "../components/job";

const index = () => {
  return (
    <>
      <SEO
        pageTitle={"Careers at DevMate Solutions — Join Our AI Team in Dubai"}
        pageDescription={"Looking for a career in AI, software development, or digital marketing? Join DevMate Solutions — a fast-growing AI agency based in Dubai with offices in New York and Muscat."}
        pageUrl={"/job"}
      />
      <Job />
    </>
  );
};

export default index;
