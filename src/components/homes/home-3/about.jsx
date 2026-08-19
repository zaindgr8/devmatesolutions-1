import React, { useState } from "react";
import Link from "next/link";
import Tilt from "react-parallax-tilt";
import FormModal from "../../FormModal";

const features = [
  { icon: "fal fa-shopping-cart", label: "Headless Ecommerce", sub: "NextJS & Shopify" },
  { icon: "fal fa-mobile-alt", label: "Mobile Apps", sub: "Android & iOS" },
  { icon: "fal fa-robot", label: "AI Agents & Automation", sub: "Autonomous systems" },
  { icon: "fal fa-link", label: "NFTs & Blockchain", sub: "Web3 Tokenization" },
];

const stats = [
  { number: "40+", label: "Global Brands" },
  { number: "25+", label: "Industries" },
  { number: "6+", label: "Years Active" },
  { number: "96%", label: "Client Rating" },
];

const About = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && (
        <FormModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title="Get Instant Call"
          subtitle="Fill in your details — receive a call from DevMate Solutions within 60 seconds"
          triggerCall={true}
        />
      )}

      <div className="dm-about-section">
        <div className="container">
          <div className="row align-items-center">

            {/* ── Left: Image ── */}
            <div className="col-lg-6 wow tpfadeUp" data-wow-delay=".3s">
              <div className="dm-about-img-col">
                <Tilt
                  tiltMaxAngleX={4}
                  tiltMaxAngleY={4}
                  perspective={1200}
                  transitionSpeed={1000}
                  gyroscope={true}
                >
                  <div className="dm-about-img-wrap">
                    <img src="/assets/img/new/about1.png" alt="DevMate Solutions — Chess strategy visual" />
                  </div>
                </Tilt>
                {/* <div className="dm-about-year-badge">
                  <strong>2019</strong>
                  <span>Pioneering</span>
                </div> */}
              </div>
            </div>

            {/* ── Right: Content ── */}
            <div className="col-lg-6 wow tpfadeUp" data-wow-delay=".5s">
              <div className="dm-about-content">

                <span className="dm-about-eyebrow">Pioneering Digital Revolution Since 2019</span>

                <h2 className="tp-section__title mb-20">
                  <b className="text-red-700">Checkmate</b> your<br />
                  Software & Digital Goals<br />
                  with <b className="text-red-700">DEVMATE</b>
                </h2>

                <p style={{ fontSize: 15, color: '#4b5563', lineHeight: 1.7, marginBottom: 0 }}>
                  We don't just build software — we engineer competitive advantages. From AI-powered
                  products to enterprise ecommerce, every solution we deliver is built to win.
                </p>

                {/* Feature grid */}
                <div className="dm-about-features">
                  {features.map((f, i) => (
                    <div className="dm-about-feature-card" key={i}>
                      <div className="dm-about-feature-icon">
                        <i className={f.icon}></i>
                      </div>
                      <div className="dm-about-feature-text">
                        <strong>{f.label}</strong>
                        <span>{f.sub}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Stats strip */}
                {/* <div className="dm-about-stats">
                  {stats.map((s, i) => (
                    <div className="dm-about-stat" key={i}>
                      <span className="dm-about-stat-num">{s.number}</span>
                      <span className="dm-about-stat-label">{s.label}</span>
                    </div>
                  ))}
                </div> */}

                {/* CTA */}
                <div className="dm-about-cta">
                  <button
                    onClick={() => setShowModal(true)}
                    className="tp-grd-btn"
                  >
                    Get Instant Call
                    <span className="ml-10">
                      <i className="fal fa-long-arrow-right"></i>
                      <i className="fal fa-long-arrow-right"></i>
                    </span>
                  </button>
                  <a
                    href="#ceo"
                    className="dm-about-secondary-link"
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.getElementById("ceo");
                      if (el) {
                        el.scrollIntoView({ behavior: "smooth" });
                      } else {
                        window.location.href = "/#ceo";
                      }
                    }}
                  >
                    Book 1:1 Session <i className="fal fa-long-arrow-right"></i>
                  </a>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default About;
