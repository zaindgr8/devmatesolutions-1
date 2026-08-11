import React, { useState, useEffect } from "react";
import Link from "next/link";
import Tilt from "react-parallax-tilt";
import { TypeAnimation } from "react-type-animation";

const HeroBanner = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  return (
    <>
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
