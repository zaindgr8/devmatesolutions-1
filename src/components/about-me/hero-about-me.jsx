import Link from "next/link";
import React from "react";
import Tilt from "react-parallax-tilt";
import ConsultationPayment from "../consultation/ConsultationPayment";

const HeroAboutMe = () => {
  return (
    <>

      <div className="dm-ceo-section" id="ceo">
        <div className="container">
          <div className="row align-items-center">

            {/* ── Left: Photo ── */}
            <div className="col-md-5 col-xl-4 wow tpfadeUp">
              <div className="dm-ceo-image-block">
                <Tilt
                  tiltMaxAngleX={4}
                  tiltMaxAngleY={4}
                  perspective={1200}
                  transitionSpeed={1000}
                  gyroscope={true}
                >
                  <div className="dm-ceo-img-wrap">
                    <img src="/assets/img/about/me.svg" alt="Zain Ul Abideen Baloch – CEO of DevMate Solutions" />
                  </div>
                </Tilt>
                {/* Floating badge */}
                {/* <div className="dm-ceo-badge">
                  <strong>2019</strong>
                  Founded
                </div> */}
              </div>
            </div>

            {/* ── Right: Content ── */}
            <div className="col-md-7 col-xl-8 wow tpfadeUp" data-wow-delay=".2s">
              <div className="dm-ceo-content">
                <span className="dm-ceo-eyebrow">Message from the CEO</span>
                <h2 className="dm-ceo-name">Zain Ul Abideen<br />Baloch</h2>
                <p className="dm-ceo-title">
                  Founder &amp; CEO — DEVMATE SOLUTIONS
                </p>
                <p className="dm-ceo-subtitle-hub">
                  Founder @ <a href="https://aifounderhub.com/" target="_blank" rel="noopener noreferrer" className="dm-ceo-hub-link">AI Founder Hub <i className="fal fa-arrow-up-right"></i></a> — Empowering AI Founders Globally
                </p>
                <div className="dm-ceo-divider"></div>
                <p className="dm-ceo-message">
                  I am honored to lead an exceptional team committed to delivering outstanding services
                  and achieving our goals with dedication. We take pride in partnering with industry
                  leaders to shape the future. As a forward-thinking company, we are relentlessly
                  working on AI and innovation to stay ahead. With our Vision 2030, we aspire to
                  become a UNICORN, create jobs, and lead the tech industry.
                  Join us on our journey toward excellence!
                </p>
                <div className="dm-ceo-highlight">
                  Offering 1:1 Discovery Sessions for Business Owners, Entrepreneurs, and Students seeking expert consultancy.
                </div>

                {/* CTA */}
                <div className="dm-ceo-cta-row">
                  <ConsultationPayment />
                </div>

                {/* Social links */}
                <div className="dm-ceo-socials">
                  <span className="dm-ceo-social-label">Follow</span>
                  <Link href="https://www.linkedin.com/in/zainulabideenunicorn/" target="_blank" className="dm-ceo-social-link">
                    <i className="fab fa-linkedin-in"></i>
                  </Link>
                  <Link href="https://www.instagram.com/devmate.solutions/" target="_blank" className="dm-ceo-social-link">
                    <i className="fab fa-instagram"></i>
                  </Link>
                  <Link href="https://github.com/devmatesolutions" target="_blank" className="dm-ceo-social-link">
                    <i className="fab fa-github"></i>
                  </Link>
                  <Link href="https://www.youtube.com/@devmatesolutions" target="_blank" className="dm-ceo-social-link">
                    <i className="fab fa-youtube"></i>
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

export default HeroAboutMe;
