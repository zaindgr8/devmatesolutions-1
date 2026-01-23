import SocialLinks from "@/src/common/social-links";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Tilt from "react-parallax-tilt";
import ConsultationPayment from "../consultation/ConsultationPayment";

const HeroAboutMe = () => {
  return (
    <>
      <div
        className="tp-about__me  pt-5"
        style={{
          backgroundImage: `url(/assets/img/breadcrumb/breadcrumb-bg.png)`,
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 col-xl-5 wow tpfadeUp">
              <div
                className="about-me-1 mb-30"
                data-tilt=""
                data-tilt-perspective="2000"
              >
                <Tilt
                  className="tilt-img"
                  tiltMaxAngleX={5}
                  tiltMaxAngleY={5}
                  perspective={900}
                  transitionSpeed={1000}
                  gyroscope={true}
                >
                  <img src="/assets/img/about/me.svg" alt="" />
                </Tilt>
              </div>
            </div>
            <div className="col-md-6 wow tpfadeUp">
              <div className="section-title-wraper">
                <div className="tp-section">
                  <span className="tp-section__subtitle shadow-none text-[#B91C1B] mb-10 p-0">
                    Message from the CEO
                  </span>
                  <h2 className="tp-section__title mb-20">
                    Zain Ul Abideen Baloch
                  </h2>
                  <p className="mb-0 pb-20">
                    I am honored to lead an exceptional team committed to
                    delivering outstanding services and achieving our goals with
                    dedication. We take pride in partnering with industry
                    leaders to shape the future. As a forward-thinking company,
                    we are relentlessly working on AI and innovation to stay
                    ahead. With our Vision 2030, we aspire to become a tech
                    giant, create hundreds of jobs, and lead the tech industry.
                    Join us on our journey toward excellence!
                    <br />
                    <br />
                    <b>
                      Offering 1:1 Discovery Session for Business Owners, Entrepreneurs,
                      and Students seeking expert consultancy. (286 $ for 45 Minutes)
                    </b>
                  </p>
                </div>

                <ConsultationPayment />

                <div className="about-me-socials mb-6">
                  <div className="flex gap-x-2 space-x-2 w-[4vh] ">
                    <SocialLinks />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroAboutMe;
