import React, { useState, useEffect } from "react";
import Link from "next/link";
import Tilt from "react-parallax-tilt";
import { TypeAnimation } from "react-type-animation";

const HeroBanner = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  return (
    <>
      <style suppressHydrationWarning>{`
        /* ── Hero Section ── */
        .dm-hero {
          padding: 72px 0 80px;
          background: #fff;
          position: relative;
          overflow: hidden;
        }

        /* Subtle decorative background */
        .dm-hero::before {
          content: '';
          position: absolute;
          bottom: -100px; right: -100px;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(192,57,43,0.05) 0%, transparent 70%);
          pointer-events: none;
        }
        .dm-hero::after {
          content: '';
          position: absolute;
          top: -60px; left: 30%;
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(192,57,43,0.03) 0%, transparent 70%);
          pointer-events: none;
        }

        /* ── Location badge ── */
        .dm-hero-location {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #f8f8f8;
          border: 1px solid #e5e7eb;
          border-radius: 24px;
          padding: 7px 16px 7px 10px;
          font-size: 12.5px;
          font-weight: 600;
          color: #374151;
          margin-bottom: 24px;
        }
        .dm-hero-location-dot {
          width: 7px; height: 7px;
          background: #22c55e;
          border-radius: 50%;
          box-shadow: 0 0 0 3px rgba(34,197,94,0.2);
          animation: dm-pulse 2s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes dm-pulse {
          0%, 100% { box-shadow: 0 0 0 3px rgba(34,197,94,0.2); }
          50% { box-shadow: 0 0 0 6px rgba(34,197,94,0.1); }
        }
        .dm-hero-location b { color: #0d0d0d; }

        /* ── Headline ── */
        .dm-hero-headline {
          font-size: clamp(44px, 5.5vw, 72px);
          font-weight: 900;
          line-height: 1.08;
          letter-spacing: -2px;
          color: #0d0d0d;
          margin-bottom: 16px;
        }
        .dm-hero-headline .dm-type-line {
          color: #c0392b;
          display: block;
          min-height: 1.1em;
        }
        @media (max-width: 767px) {
          .dm-hero-headline { font-size: 38px; letter-spacing: -1px; }
        }

        /* ── Subtext ── */
        .dm-hero-subtext {
          font-size: 16px;
          color: #4b5563;
          line-height: 1.7;
          max-width: 420px;
          margin-bottom: 36px;
        }

        /* ── CTA row ── */
        .dm-hero-cta-row {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 14px;
          margin-bottom: 44px;
        }
        .dm-hero-secondary-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 700;
          color: #374151;
          text-decoration: none;
          border: 1.5px solid #e5e7eb;
          padding: 13px 22px;
          border-radius: 4px;
          transition: all 0.22s ease;
        }
        .dm-hero-secondary-cta:hover {
          border-color: #0d0d0d;
          color: #0d0d0d;
          background: #f9fafb;
        }

        /* ── Social proof strip ── */
        .dm-hero-proof {
          display: flex;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
        }
        .dm-hero-proof-divider {
          width: 1px; height: 28px;
          background: #e5e7eb;
        }
        .dm-hero-proof-item {
          display: flex;
          flex-direction: column;
        }
        .dm-hero-proof-num {
          font-size: 20px;
          font-weight: 900;
          color: #0d0d0d;
          line-height: 1;
          letter-spacing: -0.5px;
        }
        .dm-hero-proof-label {
          font-size: 11px;
          color: #9ca3af;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-top: 2px;
        }

        /* ── Right image col ── */
        .dm-hero-img-col {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .dm-hero-img-wrap img {
          width: 100%;
          max-width: 580px;
          display: block;
        }

        /* Floating metric cards */
        .dm-hero-float-card {
          position: absolute;
          background: #fff;
          border: 1px solid #f0f0f0;
          border-radius: 12px;
          padding: 12px 18px;
          box-shadow: 0 8px 28px rgba(0,0,0,0.1);
          display: flex;
          align-items: center;
          gap: 10px;
          white-space: nowrap;
          z-index: 2;
        }
        .dm-hero-float-icon {
          width: 34px; height: 34px;
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-size: 15px;
          flex-shrink: 0;
        }
        .dm-hero-float-icon--red { background: rgba(192,57,43,0.1); color: #c0392b; }
        .dm-hero-float-icon--green { background: rgba(34,197,94,0.1); color: #16a34a; }
        .dm-hero-float-text strong {
          display: block;
          font-size: 14px;
          font-weight: 800;
          color: #0d0d0d;
          line-height: 1;
        }
        .dm-hero-float-text span {
          font-size: 11px;
          color: #9ca3af;
          font-weight: 500;
        }

        .dm-hero-float-card--tl {
          top: 14%;
          left: -20px;
          animation: dm-float-a 4s ease-in-out infinite;
        }
        .dm-hero-float-card--br {
          bottom: 14%;
          right: -10px;
          animation: dm-float-b 4s ease-in-out infinite;
        }
        @keyframes dm-float-a {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes dm-float-b {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(8px); }
        }
        @media (max-width: 991px) {
          .dm-hero-float-card { display: none; }
        }
      `}</style>

      <div className="dm-hero">
        <div className="container">
          <div className="row align-items-center">

            {/* ── Left: Copy ── */}
            <div className="col-lg-5 col-xl-5">

              {/* Location badge */}
              <div className="dm-hero-location wow tpfadeUp">
                <span className="dm-hero-location-dot"></span>
                Registered &amp; operating in&nbsp;
                <b>DXB, MUSCAT &amp; NYC</b>
              </div>

              {/* Headline */}
              <h1 className="dm-hero-headline wow tpfadeUp" data-wow-delay=".1s">
                AI Powered<br />
                Agency&nbsp;
                <span className="dm-type-line">
                  {mounted ? (
                    <TypeAnimation
                      sequence={[
                        "for Websites",
                        1800,
                        "for Mobile Apps",
                        1800,
                        "for Lead Gen",
                        1800,
                        "for AI Agents",
                        1800,
                        "for Brands",
                        1800,
                      ]}
                      wrapper="span"
                      cursor={true}
                      repeat={Infinity}
                    />
                  ) : (
                    <span>for Websites</span>
                  )}
                </span>
              </h1>

              {/* Subtext */}
              <p className="dm-hero-subtext wow tpfadeUp" data-wow-delay=".2s">
                We engineer competitive software, AI solutions, and digital campaigns for startups and global enterprises — from Dubai to New York.
              </p>

              {/* CTAs */}
              <div className="dm-hero-cta-row wow tpfadeUp" data-wow-delay=".3s">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    window.dispatchEvent(new CustomEvent("open-free-consultation"));
                  }}
                  className="tp-grd-btn"
                  style={{ border: 'none' }}
                >
                  Book Free Consultation
                  <span className="ml-10">
                    <i className="fal fa-long-arrow-right"></i>
                    <i className="fal fa-long-arrow-right"></i>
                  </span>
                </button>
                <Link href="/#our-own-ventures" className="dm-hero-secondary-cta">
                  View Portfolio
                  <i className="fal fa-long-arrow-right"></i>
                </Link>
              </div>

              {/* Social proof strip */}
              {/* <div className="dm-hero-proof wow tpfadeUp" data-wow-delay=".4s">
                <div className="dm-hero-proof-item">
                  <span className="dm-hero-proof-num">40+</span>
                  <span className="dm-hero-proof-label">Global Brands</span>
                </div>
                <div className="dm-hero-proof-divider"></div>
                <div className="dm-hero-proof-item">
                  <span className="dm-hero-proof-num">25+</span>
                  <span className="dm-hero-proof-label">Industries</span>
                </div>
                <div className="dm-hero-proof-divider"></div>
                <div className="dm-hero-proof-item">
                  <span className="dm-hero-proof-num">96%</span>
                  <span className="dm-hero-proof-label">Client Rating</span>
                </div>
                <div className="dm-hero-proof-divider"></div>
                <div className="dm-hero-proof-item">
                  <span className="dm-hero-proof-num">2019</span>
                  <span className="dm-hero-proof-label">Since</span>
                </div>
              </div> */}

            </div>

            {/* ── Right: Image + floating cards ── */}
            <div className="col-lg-7 col-xl-7 wow tpfadeUp" data-wow-delay=".3s">
              <div className="dm-hero-img-col">

                {/* Floating top-left card */}
                {/* <div className="dm-hero-float-card dm-hero-float-card--tl">
                  <div className="dm-hero-float-icon dm-hero-float-icon--red">
                    <i className="fal fa-robot"></i>
                  </div>
                  <div className="dm-hero-float-text">
                    <strong>Agentic AI</strong>
                    <span>Autonomous systems</span>
                  </div>
                </div> */}

                {/* Main image */}
                <Tilt
                  tiltMaxAngleX={4}
                  tiltMaxAngleY={4}
                  perspective={1200}
                  transitionSpeed={1000}
                  gyroscope={true}
                  style={{ width: '100%' }}
                >
                  <div className="dm-hero-img-wrap text-end">
                    <img src="/assets/img/new/hero.jpg" alt="DevMate Solutions — AI-powered agency team" />
                  </div>
                </Tilt>

                {/* Floating bottom-right card */}
                <div className="dm-hero-float-card dm-hero-float-card--br">
                  <div className="dm-hero-float-icon dm-hero-float-icon--green">
                    <i className="fal fa-check-circle"></i>
                  </div>
                  <div className="dm-hero-float-text">
                    <strong>96% Satisfaction</strong>
                    <span>Across 40+ brands</span>
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

export default HeroBanner;
