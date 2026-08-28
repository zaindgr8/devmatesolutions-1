import React, { useState } from "react";
import Link from "next/link";
import Tilt from "react-parallax-tilt";
import FormModal from "../../FormModal";

const features = [
  {
    icon: "fal fa-chart-line",
    label: "AI Lead Management",
    sub: "Autonomous lead capture, scoring & qualification pipelines for Real Estate and all high-ticket niches.",
    tag: "Omni-Niche",
    href: "/aileadmanagementdubairealestate",
  },
  {
    icon: "fab fa-whatsapp",
    label: "WhatsApp AI Automation",
    sub: "0-second auto-replies, multi-lingual smart chatbots, and automated broadcast nurturing funnels.",
    tag: "24/7 Engagement",
    href: "/whatsappautomation",
  },
  {
    icon: "fal fa-phone-volume",
    label: "AI Voice & Call Agents",
    sub: "Human-like conversational voice agents for instant sub-60s lead callbacks and appointment bookings.",
    tag: "<60s Callback",
    href: "/callagents",
  },
  {
    icon: "fal fa-chess-knight",
    label: "Strategic CRM & Pipelines",
    sub: "Seamless CRM integrations, calendar sync, and automated deal-closing workflows engineered to win.",
    tag: "Endgame Conversion",
    href: "/aileadmanagementdubairealestate",
  },
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

            {/* ── Left: Chess Strategy Visual ── */}
            <div className="col-lg-6 wow tpfadeUp" data-wow-delay=".3s">
              <div className="dm-about-img-col dm-about-media">
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
                <div className="dm-about-exp-card">
                  <div className="dm-about-exp-num">&lt;60s</div>
                  <div className="dm-about-exp-text">
                    <strong>Instant Response</strong>
                    <span>Autonomous AI Qualification</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Right: Content ── */}
            <div className="col-lg-6 wow tpfadeUp" data-wow-delay=".5s">
              <div className="dm-about-content">

                <div className="dm-about-badge-row">
                  <span className="dm-about-eyebrow">
                    <i className="fal fa-chess-queen mr-5"></i> Strategic AI Automation
                  </span>
                  {/* <span className="dm-about-sub-badge">ALL IN</span> */}
                </div>

                <h2 className="tp-section__title mb-20">
                  <b className="text-red-700">Checkmate</b> Your Competition<br />
                  with <b className="text-red-700">AI Lead Management</b>
                </h2>

                <p className="dm-about-lead-desc">
                  In business as in chess, speed, positioning, and strategy win the game. 
                  We build end-to-end <strong>AI Lead Management Systems</strong> — intelligent WhatsApp automations, 
                  hyper-realistic voice call agents, and autonomous qualification funnels engineered to turn prospects 
                  into closed deals 24/7 across every industry.
                </p>

                {/* Feature grid */}
                <div className="dm-about-features">
                  {features.map((f, i) => (
                    <Link href={f.href} key={i} className="dm-about-feature-card">
                      <div className="dm-about-feature-top">
                        <div className="dm-about-feature-icon">
                          <i className={f.icon}></i>
                        </div>
                        <span className="dm-about-feature-pill">{f.tag}</span>
                      </div>
                      <div className="dm-about-feature-text">
                        <div className="dm-about-feature-heading">
                          <strong>{f.label}</strong>
                          <i className="fal fa-arrow-up-right dm-about-card-arrow"></i>
                        </div>
                        <span>{f.sub}</span>
                      </div>
                    </Link>
                  ))}
                </div>

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
                    Book Meeting <i className="fal fa-long-arrow-right"></i>
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

