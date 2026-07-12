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
      {showModal && <FormModal />}
      <style>{`
        /* ── About Section ── */
        .dm-about-section {
          padding: 100px 0 110px;
          background: #fff;
          position: relative;
          overflow: hidden;
        }

        /* Subtle background accent */
        .dm-about-section::before {
          content: '';
          position: absolute;
          top: -200px; right: -200px;
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(192,57,43,0.04) 0%, transparent 70%);
          pointer-events: none;
        }

        /* ── Left image col ── */
        .dm-about-img-col {
          position: relative;
        }
        .dm-about-img-wrap {
          position: relative;
          display: inline-block;
          width: 100%;
        }
        .dm-about-img-wrap img {
          width: 100%;
          max-width: 520px;
          display: block;
        }

        /* Floating year badge */
        .dm-about-year-badge {
          position: absolute;
          bottom: 40px;
          right: 0px;
          background: #0d0d0d;
          color: #fff;
          padding: 18px 24px;
          border-radius: 12px;
          text-align: center;
          box-shadow: 0 16px 40px rgba(0,0,0,0.2);
        }
        .dm-about-year-badge strong {
          display: block;
          font-size: 32px;
          font-weight: 900;
          line-height: 1;
          color: #e74c3c;
        }
        .dm-about-year-badge span {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          opacity: 0.7;
          margin-top: 4px;
          display: block;
        }

        /* ── Right content col ── */
        .dm-about-content {
          padding-left: 40px;
        }
        @media (max-width: 991px) {
          .dm-about-content { padding-left: 0; margin-top: 48px; }
        }

        .dm-about-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: #c0392b;
          margin-bottom: 16px;
        }
        .dm-about-eyebrow::before {
          content: '';
          width: 20px; height: 2px;
          background: #c0392b;
          border-radius: 2px;
        }

        /* ── Feature grid ── */
        .dm-about-features {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
          margin: 28px 0 32px;
        }
        @media (max-width: 480px) { .dm-about-features { grid-template-columns: 1fr; } }

        .dm-about-feature-card {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 16px 18px;
          background: #fafafa;
          border: 1px solid #f0f0f0;
          border-radius: 10px;
          transition: all 0.2s ease;
        }
        .dm-about-feature-card:hover {
          border-color: rgba(192,57,43,0.2);
          background: #fff;
          box-shadow: 0 4px 16px rgba(0,0,0,0.06);
        }
        .dm-about-feature-icon {
          width: 36px; height: 36px;
          background: rgba(192,57,43,0.08);
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          color: #c0392b;
          font-size: 14px;
          flex-shrink: 0;
        }
        .dm-about-feature-text strong {
          display: block;
          font-size: 13px;
          font-weight: 700;
          color: #0d0d0d;
          margin-bottom: 2px;
        }
        .dm-about-feature-text span {
          font-size: 11.5px;
          color: #9ca3af;
          font-weight: 500;
        }

        /* ── Stats strip ── */
        .dm-about-stats {
          display: flex;
          gap: 0;
          border: 1px solid #f0f0f0;
          border-radius: 10px;
          overflow: hidden;
          margin-bottom: 32px;
        }
        .dm-about-stat {
          flex: 1;
          text-align: center;
          padding: 16px 10px;
          border-right: 1px solid #f0f0f0;
        }
        .dm-about-stat:last-child { border-right: none; }
        .dm-about-stat-num {
          display: block;
          font-size: 22px;
          font-weight: 900;
          color: #c0392b;
          letter-spacing: -0.5px;
          line-height: 1;
          margin-bottom: 4px;
        }
        .dm-about-stat-label {
          font-size: 10.5px;
          color: #9ca3af;
          font-weight: 600;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        /* ── CTA ── */
        .dm-about-cta {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }
        .dm-about-secondary-link {
          font-size: 13.5px;
          font-weight: 700;
          color: #374151;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 7px;
          transition: color 0.2s ease;
        }
        .dm-about-secondary-link:hover { color: #c0392b; }
      `}</style>

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
                  <Link href="/services" className="dm-about-secondary-link">
                    View All Services <i className="fal fa-long-arrow-right"></i>
                  </Link>
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
