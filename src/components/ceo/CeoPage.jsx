import React from "react";
import HeaderThree from "@/src/layout/headers/header-3";
import FooterThree from "@/src/layout/footers/footer-3";
import BreadcrumbArea from "@/src/common/breadcrumb-area";
import SocialLinks from "@/src/common/social-links";
import Link from "next/link";
import ConsultationPayment from "@/src/components/consultation/ConsultationPayment";
import {
  FaGlobe,
  FaUsers,
  FaChartLine,
  FaRobot,
  FaCode,
  FaSearchDollar,
} from "react-icons/fa";

const CeoPage = () => {
  return (
    <>
      <HeaderThree />
      <BreadcrumbArea
        acive_menu="Book Meeting"
        title="Book 1:1 Discovery Session (599$)"
      />
      <main className="ceo-page-main bg-white">
        {/* 1. Hero Section (The Hook) */}
        <section className="ceo-hero pt-150 pb-100 bg-gray-50 overflow-hidden">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-7 wow tpfadeUp">
                <div className="ceo-hero-content pr-50">
                  <span className="text-[#B91C1B] font-bold tracking-widest uppercase text-sm mb-20 block">
                    Zain Ul Abideen Baloch | CEO & Founder
                  </span>
                  <h1 className="text-6xl font-black text-gray-900 mb-30 leading-tight">
                    Master <span className="text-[#B91C1B]">AI Automation</span>{" "}
                    & Drive Global Business Growth.
                  </h1>
                  <p className="text-xl text-gray-600 mb-40 leading-relaxed">
                    Get direct 1:1 access to our 5+ years of experience scaling
                    tech firms across 40+ industries. Whether you want to
                    automate your workflow or launch your own AI agency.
                    Leverage our global experience to future-proof your business
                    and maximize your productivity today.
                  </p>
                  <div className="ceo-hero-btns flex flex-col gap-4 items-start">
                    <a
                      href="#booking"
                      className="tp-grd-btn text-white px-10 py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:translate-x-2"
                    >
                      Book 1:1 Discovery Session with CEO
                      <i className="fal fa-long-arrow-right"></i>
                    </a>
                    <button
                      type="button"
                      onClick={() => window.dispatchEvent(new CustomEvent("open-free-consultation"))}
                      className="px-10 py-4 rounded-xl flex items-center justify-center gap-2 border-2 border-[#B91C1B] text-[#B91C1B] bg-white !hover:bg-[#B91C1B] !hover:text-white transition-all duration-300 hover:translate-x-2 font-bold"
                    >
                      Book Meeting With Team Expert (FREE)
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-lg-5 wow tpfadeUp" data-wow-delay=".3s">
                <div className="ceo-hero-img relative">
                  <div className="absolute inset-0 bg-red-600 rounded-[3rem] rotate-6 -z-10 opacity-10"></div>
                  <img
                    src="/assets/img/about/me.svg"
                    alt="Zain Ul Abideen Baloch"
                    className="rounded-[3rem] shadow-2xl w-full transform -rotate-3 hover:rotate-0 transition-transform duration-500"
                  />
                  <div
                    className="ceo-hero-social mt-40 flex items-center gap-4 wow tpfadeUp"
                    data-wow-delay=".5s"
                  >
                    <span className="text-sm font-bold text-gray-900 uppercase tracking-widest whitespace-nowrap">
                      Let's Connect
                    </span>
                    <div className="h-[1px] w-12 bg-gray-300"></div>
                    <div className="flex gap-3 text-xl text-gray-400">
                      <SocialLinks />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. The Visionary Statement */}
        <section className="ceo-bio py-120 overflow-hidden">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <div className="ceo-bio-card p-10 lg:p-20 border-l-8 border-red-600 bg-white shadow-sm wow tpfadeUp">
                  <h2 className="text-3xl font-bold mb-30 text-gray-900">
                    Visionary Manifesto
                  </h2>
                  <div className="text-2xl text-gray-700 leading-relaxed italic">
                    "With a footprint across Oman, USA and the UAE, our mission
                    is to bridge the gap between complex technology and business
                    growth. At Devmate Solutions, we don't just build software;
                    we build the digital infrastructure that allows companies to
                    scale effortlessly. From the heart of Dubai's Business Bay,
                    we lead a team of 25+ specialists dedicated to making Vision
                    2030 a reality through AI, Blockchain, and Full-Stack
                    excellence."
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Proof in Numbers (Trust Indicators) */}
        <section className="ceo-stats py-100 bg-gray-900 text-white overflow-hidden">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <FaChartLine />,
                  val: "40+",
                  label: "Industries Served",
                  sub: "Real Estate, FinTech, & more",
                },
                {
                  icon: <FaUsers />,
                  val: "25+",
                  label: "Active Experts",
                  sub: "Developers & AI Engineers",
                },
                {
                  icon: <FaGlobe />,
                  val: "Global",
                  label: "Reach",
                  sub: "GCC, Europe, and USA",
                },
                {
                  icon: <FaRobot />,
                  val: "AI-First",
                  label: "Specialization",
                  sub: "Custom AI Agents & Automation",
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="stat-card p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors wow tpfadeUp"
                  data-wow-delay={`${i * 0.1}s`}
                >
                  <div className="text-3xl text-red-500 mb-4">{stat.icon}</div>
                  <div className="text-4xl font-black mb-2">{stat.val}</div>
                  <div className="text-lg font-bold mb-1">{stat.label}</div>
                  <div className="text-sm text-gray-400">{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Specialization Spotlight: The AI Revolution */}
        <section className="ceo-ai py-120 bg-white">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 mb-50 wow tpfadeLeft">
                <div className="ai-spotlight-img relative">
                  <img
                    src="/assets/img/new/about1.png"
                    alt="AI Transformation"
                    className="rounded-3xl shadow-xl"
                  />
                  <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-2xl shadow-2xl border border-gray-100 hidden lg:block">
                    <div className="text-red-600 text-4xl mb-2 font-black">
                      70%
                    </div>
                    <div className="text-gray-900 font-bold">
                      Efficiency Boost
                    </div>
                    <div className="text-gray-500 text-sm italic">
                      via AI Implementation
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 wow tpfadeRight">
                <div className="pl-50">
                  <h2 className="text-4xl font-black text-gray-900 mb-30">
                    Future-Proofing Your Business with AI.
                  </h2>
                  <p className="text-lg text-gray-600 mb-30 leading-relaxed">
                    We are currently moving beyond simple automation. Our focus
                    is on deploying AI Call Assistants, Intelligent Chatbots,
                    and Custom AI Agents that act as virtual employees—reducing
                    overhead and increasing 24/7 productivity.
                  </p>
                  <div className="consultancy-angle bg-red-50 p-6 rounded-2xl border-l-4 border-red-600">
                    <p className="text-gray-900 font-bold mb-0 italic">
                      "We provide executive-level consulting on how to integrate
                      AI into your existing workflow to maximize ROI."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Services at a Glance (The CEO Perspective) */}
        <section className="ceo-services py-120 bg-gray-50">
          <div className="container">
            <div className="text-center mb-80">
              <h2 className="text-4xl font-black text-gray-900 mb-4">
                Strategic Tech Pillars
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                What our team excels at under our leadership to drive your
                bottom line.
              </p>
            </div>
            <div className="row">
              {[
                {
                  icon: <FaCode />,
                  title: "Custom App & Web",
                  desc: "Full-stack solutions that are built to scale with your user base.",
                },
                {
                  icon: <FaGlobe />,
                  title: "Blockchain & Web3",
                  desc: "Secure, decentralized architecture for modern digital assets.",
                },
                {
                  icon: <FaSearchDollar />,
                  title: "Strategic SEO",
                  desc: "Dominating search results to drive organic, high-intent revenue.",
                },
              ].map((service, i) => (
                <div
                  key={i}
                  className="col-lg-4 mb-30 wow tpfadeUp"
                  data-wow-delay={`${i * 0.2}s`}
                >
                  <div className="service-card-minimal bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300">
                    <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-2xl text-red-600 mb-6">
                      {service.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {service.title}
                    </h3>
                    <p className="text-gray-500 leading-relaxed mb-0">
                      {service.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. The "Discovery Session" (High-Value CTA) */}
        <section id="booking" className="ceo-booking py-150 bg-white">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-8 col-lg-10">
                <div className="booking-card-premium p-8 lg:p-20 rounded-[3rem] bg-white border-2 border-red-50 shadow-2xl relative overflow-hidden wow tpfadeUp">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 rounded-full -mr-32 -mt-32"></div>

                  <div className="text-center mb-60">
                    <span className="bg-red-100 text-red-700 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-4 inline-block">
                      Limited Monthly Slots
                    </span>
                    <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4">
                      Strategic 1:1 Discovery Session
                    </h2>
                    <p className="text-gray-500 text-lg">
                      (45 Minutes of Strategy & Discovery Session with CEO for 45 Minutes)
                    </p>
                  </div>

                  <div className="row mb-50">
                    <div className="col-md-6 mb-30">
                      <div className="value-item flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold">
                          1
                        </div>
                        <div>
                          <h4 className="text-gray-900 font-bold mb-1">
                            AI Automation For Your Business
                          </h4>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            Learn how we can automate your manual business tasks
                            using AI.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 mb-30">
                      <div className="value-item flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold">
                          2
                        </div>
                        <div>
                          <h4 className="text-gray-900 font-bold mb-1">
                            Start Your AI Agency
                          </h4>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            A roadmap to building and scaling your own AI Agency
                            in 2026.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 mb-30">
                      <div className="value-item flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold">
                          3
                        </div>
                        <div>
                          <h4 className="text-gray-900 font-bold mb-1">
                            B2B Collaboration
                          </h4>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            Discuss official partnerships and high-level
                            projects with our company.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 mb-30">
                      <div className="value-item flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold">
                          4
                        </div>
                        <div>
                          <h4 className="text-gray-900 font-bold mb-1">
                            Learn From Experience
                          </h4>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            Global Business Growth and how we were able to scale
                            and run tech firms across 20+ countries, 40+
                            Industries & 5 Years+ Experience.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Final CTA Section — Booking Form */}
                  <div className="booking-cta-area mt-10 pt-20 border-t border-gray-100">
                    <ConsultationPayment />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Connect Section */}
        <section className="ceo-connect py-80 bg-white">
          <div className="container">
            <div className="flex flex-col items-center gap-6">
              <div className="flex gap-4 text-2xl text-gray-400">
                <SocialLinks />
              </div>
              <Link
                href="/"
                className="text-gray-400 hover:text-red-600 transition-colors text-sm font-bold uppercase tracking-widest"
              >
                ← Return to Devmate Home
              </Link>
            </div>
          </div>
        </section>
      </main>
      <FooterThree />

      <style jsx>{`
        .ceo-hero-img img {
          filter: drop-shadow(0 40px 100px rgba(0, 0, 0, 0.15));
        }
        .stat-card {
          backdrop-filter: blur(10px);
        }
        .service-card-minimal {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .service-card-minimal:hover {
          transform: translateY(-15px);
        }
        .booking-card-premium {
          transition: all 0.3s ease;
        }
        @media (max-width: 991px) {
          .pl-50 {
            padding-left: 0;
          }
          .pr-50 {
            padding-right: 0;
          }
        }
      `}</style>
    </>
  );
};

export default CeoPage;
