import Link from "next/link";
import React from "react";
import Tilt from "react-parallax-tilt";
import ConsultationPayment from "../consultation/ConsultationPayment";

const HeroAboutMe = () => {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        /* ── CEO Section ── */
        .dm-ceo-section {
          padding: 100px 0 110px;
          background: #fff;
          border-top: 1px solid #f0f0f0;
        }

        /* ── Left: Image block ── */
        .dm-ceo-image-block {
          position: relative;
        }
        .dm-ceo-img-wrap {
          border-radius: 16px;
          overflow: hidden;
          max-width: 420px;
          aspect-ratio: 4/5;
          background: #f3f4f6;
        }
        .dm-ceo-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          display: block;
        }

        /* Floating badge */
        .dm-ceo-badge {
          position: absolute;
          bottom: 28px;
          right: -16px;
          background: #c0392b;
          color: #fff;
          padding: 16px 22px;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 600;
          box-shadow: 0 10px 30px rgba(192,57,43,0.35);
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .dm-ceo-badge-num {
          font-size: 26px;
          font-weight: 800;
          line-height: 1;
        }

        /* ── Right: Content ── */
          gap: 8px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: #c0392b;
          margin-bottom: 14px;
        }
        .dm-ceo-eyebrow::before {
          content: '';
          width: 20px; height: 2px;
          background: #c0392b;
          border-radius: 2px;
          display: block;
        }

        .dm-ceo-name {
          font-size: clamp(32px, 4vw, 48px);
          font-weight: 900;
          color: #0d0d0d;
          letter-spacing: -1.5px;
          line-height: 1.1;
          margin-bottom: 6px;
        }

        .dm-ceo-title {
          font-size: 14px;
          color: #9ca3af;
          font-weight: 600;
          letter-spacing: 0.5px;
          margin-bottom: 24px;
        }

        .dm-ceo-divider {
          width: 40px;
          height: 3px;
          background: #c0392b;
          border-radius: 2px;
          margin-bottom: 24px;
        }

        .dm-ceo-message {
          font-size: 15px;
          color: #4b5563;
          line-height: 1.75;
          margin-bottom: 0;
        }

        .dm-ceo-highlight {
          margin-top: 24px;
          padding: 18px 20px;
          background: #fef9f9;
          border-left: 3px solid #c0392b;
          border-radius: 0 8px 8px 0;
          font-size: 14px;
          font-weight: 600;
          color: #374151;
          line-height: 1.55;
        }

        /* ── CTA row ── */
        .dm-ceo-cta-row {
          margin-top: 32px;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }

        /* ── Social icons ── */
        .dm-ceo-socials {
          margin-top: 28px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .dm-ceo-social-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #9ca3af;
          margin-right: 4px;
        }
        .dm-ceo-social-link {
          width: 36px; height: 36px;
          border-radius: 50%;
          border: 1.5px solid #e5e7eb;
          display: flex; align-items: center; justify-content: center;
          color: #374151;
          font-size: 13px;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .dm-ceo-social-link:hover {
          background: #0d0d0d;
          border-color: #0d0d0d;
          color: #fff;
        }
      `}</style>

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
                <p className="dm-ceo-title">Founder & CEO — DEVMATE SOLUTIONS</p>
                <div className="dm-ceo-divider"></div>
                <p className="dm-ceo-message">
                  I am honored to lead an exceptional team committed to delivering outstanding services
                  and achieving our goals with dedication. We take pride in partnering with industry
                  leaders to shape the future. As a forward-thinking company, we are relentlessly
                  working on AI and innovation to stay ahead. With our Vision 2030, we aspire to
                  become a tech giant, create hundreds of jobs, and lead the tech industry.
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
                  <Link href="https://www.linkedin.com/company/devmatesolutions" target="_blank" className="dm-ceo-social-link">
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
