import LineWrap from "@/src/common/line-wrap";
import FooterThree from "@/src/layout/footers/footer-3";
import HeaderThree from "@/src/layout/headers/header-3";
import React from "react";
import AboutMe from "../../about-me";
import GallerySlider from "../home-6/gallery-slider";
import Portfolio from "../home-6/portfolio";
import OurTeam1 from "../home-8/our-team";
import About from "./about";
import BlogArea from "./blog-area";
import CtaArea from "./cta-area";
import FeatureLists from "./feature-lists";
import HeroBanner from "./hero-banner";
import OurTeam from "./our-team";
import PricePlan from "./price-plan";
import ProjectArea from "./project-area";
import ServiceArea from "./service-area";
import Testimonial from "./testimonial";



const HomeThree = () => {
  return (
    <>
      <LineWrap />
      <HeaderThree />
      <HeroBanner />
      <FeatureLists />
      <Portfolio />
      <About />
      <Testimonial />
      <ServiceArea />
      <CtaArea />
      <OurTeam />
      {/* <OurTeam1/> */}
      <PricePlan />
      <AboutMe />
      <FooterThree />
    </>
  );
};

export default HomeThree;
