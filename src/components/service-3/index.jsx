import BreadcrumbArea from "@/src/common/breadcrumb-area";
import Footer from "@/src/layout/footers/footer-3";
import Header from "@/src/layout/headers/header-3";
import React from "react";
import BusinessJourney from "../../common/business-journey";
import ServiceArea from "./service-area";

const ServiceThree = () => {
  return (
    <>
      <Header />
      <BreadcrumbArea acive_menu="Our Services"  title="What We Do" />
      <ServiceArea />
      <BusinessJourney style_service={true}/>
      <Footer />
    </>
  );
};

export default ServiceThree;
