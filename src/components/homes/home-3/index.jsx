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



// One type scale for every section on the landing page, so headings and
// eyebrows read the same from Portfolio down to the CEO block.
const homeTypography = `
  .dm-home .tp-section__title,
  .dm-home .dm-partners-title,
  .dm-home .dm-ceo-name {
    font-size: clamp(32px, 3.2vw, 46px);
    font-weight: 800;
    line-height: 1.12;
    letter-spacing: -1.5px;
  }
  .dm-home .tp-section__subtitle,
  .dm-home .dm-partners-eyebrow,
  .dm-home .dm-ceo-eyebrow,
  .dm-home .dm-about-eyebrow {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #c0392b;
    line-height: 1.4;
  }
  .dm-home .tp-section__subtitle.text-grey { color: #c0392b !important; }
  .dm-home .dm-partners-subtitle,
  .dm-home .dm-port-subtitle,
  .dm-home .dm-about-lead-desc {
    font-size: 16px;
    line-height: 1.7;
  }
`;

const HomeThree = () => {
  return (
    <div className="dm-home">
      <style dangerouslySetInnerHTML={{ __html: homeTypography }} />
      <LineWrap />
      <HeaderThree />
      <HeroBanner />
      <FeatureLists />
      <Portfolio />
      <About />
      <Testimonial />
      <PricePlan />
      <CtaArea />
      <OurTeam />
      {/* <OurTeam1/> */}
       {/* <ServiceArea /> */}
      <AboutMe />
      <FooterThree />
    </div>
  );
};

export default HomeThree;
