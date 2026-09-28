import React from "react";
import SEO from "../common/seo";
import ServiceThree from "../components/service-3";

const OurServices = () => {
  return (
    <>
      <SEO
        pageTitle={"AI Automation & Software Development Services"}
        pageDescription={"DevMate Solutions offers AI automation, WhatsApp chatbots, AI call agents, web development, and digital marketing services for businesses in Dubai, UAE and worldwide."}
        pageUrl={"/ourservices"}
      />
      <ServiceThree />
    </>
  );
};

export default OurServices;
