import SocialLinks from "@/src/common/social-links";
import Image from "next/image";
import React from "react";
import Tilt from "react-parallax-tilt";
import ConsultationPayment from "../consultation/ConsultationPayment";

const CeoProfile = () => {
  return (
    <div className="ceo-profile-area pt-120 pb-120 bg-gray-50 dark:bg-[#111111] min-h-screen flex items-center">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          {/* Image Section */}
          <div
            className="col-lg-5 col-md-10 mb-50 lg:mb-0 wow tpfadeUp"
            data-wow-delay=".3s"
          >
            <div className="ceo-profile-image relative group">
              <Tilt
                tiltMaxAngleX={5}
                tiltMaxAngleY={5}
                perspective={1000}
                transitionSpeed={1500}
                gyroscope={true}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-2xl transition-all duration-500 group-hover:scale-[1.02]">
                  <img
                    src="/assets/img/about/me.svg"
                    alt="Zain Ul Abideen Baloch"
                    className="w-full h-auto object-cover"
                  />
                  {/* Subtle Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                </div>
              </Tilt>
              {/* Decorative Elements */}
              <div className="absolute -z-10 -bottom-6 -right-6 w-full h-full border-2 border-[#B91C1B]/20 rounded-2xl transition-all duration-500 group-hover:translate-x-2 group-hover:translate-y-2"></div>
            </div>
          </div>

          {/* Content Section */}
          <div
            className="col-lg-6 offset-lg-1 wow tpfadeUp"
            data-wow-delay=".5s"
          >
            <div className="ceo-profile-content">
              <span className="inline-block px-4 py-1.5 mb-20 text-xs font-bold tracking-widest uppercase text-[#B91C1B] bg-[#B91C1B]/10 rounded-full">
                Founder & CEO of DEVMATE
              </span>

              <h1 className="text-5xl md:text-6xl font-extrabold mb-30 text-gray-900 dark:text-white leading-tight">
                Zain Ul Abideen <span className="text-[#B91C1B]">Baloch</span>
              </h1>

              <div className="bio-text mb-40 border-l-4 border-[#B91C1B] pl-25">
                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-0">
                  "I am honored to lead an exceptional team committed to
                  delivering outstanding services and achieving our goals with
                  dedication. We take pride in partnering with industry leaders
                  to shape the future."
                </p>
              </div>

              <div className="mb-40 space-y-20">
                <p className="text-lg text-gray-500 dark:text-gray-400">
                  As a forward-thinking company, we are relentlessly working on
                  AI and innovation to stay ahead. With our Vision 2030, we
                  aspire to become a tech giant and lead the tech industry.
                </p>

                <div className="discovery-box p-25 bg-white dark:bg-[#18181b] rounded-xl shadow-lg border border-gray-100 dark:border-gray-800">
                  <h4 className="text-lg font-bold mb-10 text-gray-900 dark:text-white flex items-center gap-2">
                    <span className="w-8 h-8 flex items-center justify-center bg-[#B91C1B] text-white rounded-full text-sm">
                      <i className="fas fa-calendar-check"></i>
                    </span>
                    Book a 1:1 Discovery Session
                  </h4>
                  <p className="text-gray-500 dark:text-gray-400 mb-20">
                    Perfect for Business Owners, Entrepreneurs, and Students
                    seeking expert consultancy.
                  </p>
                  <ConsultationPayment />
                </div>
              </div>

              {/* Social Section */}
              <div className="social-links-area pt-20 border-t border-gray-200 dark:border-gray-800 flex items-center gap-20">
                <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                  Follow Me
                </span>
                <div className="flex gap-15">
                  <SocialLinks />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Shapes */}
      <div className="absolute top-0 right-0 -z-10 opacity-5 dark:opacity-10">
        <img src="/assets/img/breadcrumb/breadcrumb-bg.png" alt="" />
      </div>
    </div>
  );
};

export default CeoProfile;
