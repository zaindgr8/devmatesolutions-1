import React, { useState } from 'react';
import Link from 'next/link';
import FormModal from '../FormModal';

const softwareServices = [
  {
    id: 1,
    img: "/assets/img/services/icon/web2.png",
    tag: "High Performance",
    title: "Web & Headless Platform Development",
    desc: "Next.js, React, Node.js, and custom cloud-native web architectures engineered for ultra-fast loading, conversion optimization, and enterprise scalability.",
    tags: ["Next.js", "React", "Node.js", "Headless CMS", "AWS / Cloud"],
  },
  {
    id: 2,
    img: "/assets/img/services/icon/app.svg",
    tag: "iOS & Android",
    title: "Mobile App Development",
    desc: "Sleek, intuitive mobile applications engineered with native speed and cross-platform flexibility, delivering seamless experiences across all devices.",
    tags: ["React Native", "Flutter", "Swift", "Kotlin", "REST & GraphQL"],
  },
  {
    id: 3,
    img: "/assets/img/services/icon/ai.svg",
    tag: "Autonomous AI",
    title: "Custom AI Agents & Automation",
    desc: "Bespoke LLM architectures, RAG knowledge retrieval, automated business workflows, and custom autonomous agents that streamline operations 24/7.",
    tags: ["Custom LLMs", "RAG Pipelines", "Workflow Automation", "AI Chatbots"],
  },
  {
    id: 4,
    img: "/assets/img/services/icon/blockchain.svg",
    tag: "Decentralized",
    title: "Blockchain & Web3 Solutions",
    desc: "Secure smart contracts, decentralized applications (DApps), real-world asset (RWA) tokenization, and enterprise Web3 blockchain integrations.",
    tags: ["Solidity", "Smart Contracts", "Web3 DApps", "RWA Tokenization"],
  },
  {
    id: 5,
    img: "/assets/img/services/icon/brand.svg",
    tag: "Creative & Design",
    title: "360° Branding & UI/UX Design",
    desc: "Comprehensive brand identity systems, product UI/UX prototyping, Figma design systems, and conversion-focused user interfaces that build market trust.",
    tags: ["Figma Systems", "UI/UX Research", "Brand Identity", "Motion Design"],
  },
  {
    id: 6,
    img: "/assets/img/services/icon/social.svg",
    tag: "Growth & ROI",
    title: "Digital & Performance Marketing",
    desc: "Data-driven digital campaigns, Meta & Google ad funnels, social media strategy, and ROI-focused growth funnels tailored to maximize qualified leads.",
    tags: ["Meta & Google Ads", "SEO Strategy", "Conversion Funnels", "Growth Hacking"],
  },
];

const ServiceArea = () => {
  const [modalConfig, setModalConfig] = useState(null);

  const openDemoModal = () => {
    setModalConfig({
      title: "Book a Live Demo",
      subtitle: "Fill in your details — completely free",
      badgeLabel: "FREE",
      badgeSub: "No payment required",
      badgeHighlight: "AI Lead Management System · Live Walkthrough",
      source: "AI Lead Management Demo Inquiry (What We Do Page)",
      buttonText: "Request Live Demo",
    });
  };

  const openProposalModal = (serviceTitle) => {
    setModalConfig({
      title: `Request a Proposal`,
      subtitle: "Fill in your details — completely free",
      badgeLabel: "FREE",
      badgeSub: "No payment required",
      badgeHighlight: `${serviceTitle} · Tailored Scope & Estimate`,
      source: `Proposal Request: ${serviceTitle} (What We Do Page)`,
      buttonText: "Request Proposal",
    });
  };

  return (
    <>
      {modalConfig && (
        <FormModal
          isOpen={!!modalConfig}
          onClose={() => setModalConfig(null)}
          title={modalConfig.title}
          subtitle={modalConfig.subtitle}
          badgeLabel={modalConfig.badgeLabel}
          badgeSub={modalConfig.badgeSub}
          badgeHighlight={modalConfig.badgeHighlight}
          source={modalConfig.source}
          buttonText={modalConfig.buttonText}
        />
      )}

      {/* ═══════════════════════════════════════════════════════
          SECTION 1: FLAGSHIP AI LEAD MANAGEMENT SYSTEM
          ═══════════════════════════════════════════════════════ */}
      <section className="dm-service-flagship-section">
        <div className="container">
          <div className="dm-service-flagship-card">
            <div className="row align-items-center">

              {/* Left Details */}
              <div className="col-lg-7">
                <div className="dm-flagship-badge">
                  <span className="dm-flagship-dot"></span>
                  Real Estate · AI & Lead Management System
                </div>

                <h2 className="dm-flagship-title">
                  AI Lead Management <span style={{ color: "#bd2120" }}>System</span>
                </h2>

                <p className="dm-flagship-subtitle">
                  Built for Dubai &amp; GCC Real Estate Brokerages — handles the first 15 minutes of every enquiry around the clock. Automatically responds in <strong>&lt; 60 seconds</strong>, qualifies buyers in native Arabic &amp; English, and books viewings straight into your agents' calendars.
                </p>

                {/* Metrics */}
                <div className="dm-flagship-metrics">
                  <div className="dm-flagship-metric">
                    <span className="dm-flagship-metric-num">&lt; 60s</span>
                    <span className="dm-flagship-metric-label">First Response</span>
                  </div>
                  <div className="dm-flagship-metric-divider"></div>
                  <div className="dm-flagship-metric">
                    <span className="dm-flagship-metric-num">24 / 7</span>
                    <span className="dm-flagship-metric-label">Live Coverage</span>
                  </div>
                  <div className="dm-flagship-metric-divider"></div>
                  <div className="dm-flagship-metric">
                    <span className="dm-flagship-metric-num">AR + EN</span>
                    <span className="dm-flagship-metric-label">20+ Languages</span>
                  </div>
                  <div className="dm-flagship-metric-divider"></div>
                  <div className="dm-flagship-metric">
                    <span className="dm-flagship-metric-num">14 Days</span>
                    <span className="dm-flagship-metric-label">Go-Live Handover</span>
                  </div>
                </div>

                {/* CTAs */}
                <div className="dm-flagship-ctas">
                  <Link
                    href="/aileadmanagementdubairealestate"
                    className="ailm-btn-primary"
                    style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}
                  >
                    Explore AI Lead System Details
                    <i className="fal fa-long-arrow-right"></i>
                  </Link>
                  <button
                    onClick={openDemoModal}
                    className="ailm-btn-ghost"
                    style={{ background: "#ffffff", color: "#0d0d0d", borderColor: "#e2e8f0", display: "inline-flex", alignItems: "center", gap: 8 }}
                  >
                    <i className="fal fa-calendar-alt" style={{ color: "#bd2120" }}></i>
                    Book a Demo
                  </button>
                </div>
              </div>

              {/* Right Visual Features */}
              <div className="col-lg-5 mt-4 mt-lg-0">
                <div className="dm-flagship-feature-box">
                  <h4 style={{ fontSize: 16, fontWeight: 800, color: "#0d0d0d", marginBottom: 16 }}>
                    Key System Capabilities
                  </h4>

                  <div className="dm-flagship-feature-list">
                    <div className="dm-flagship-feature-item">
                      <div className="dm-flagship-feature-icon">
                        <i className="fal fa-bolt"></i>
                      </div>
                      <div>
                        <strong>Instant Multi-Channel Ingestion</strong>
                        <p>Bayut, Property Finder, Dubizzle, WhatsApp &amp; Meta Lead Ads.</p>
                      </div>
                    </div>

                    <div className="dm-flagship-feature-item">
                      <div className="dm-flagship-feature-icon">
                        <i className="fal fa-robot"></i>
                      </div>
                      <div>
                        <strong>6 Specialized AI Agents</strong>
                        <p>Triage, scoring, live inventory matching, and CRM pipeline sync.</p>
                      </div>
                    </div>

                    <div className="dm-flagship-feature-item">
                      <div className="dm-flagship-feature-icon">
                        <i className="fal fa-shield-check"></i>
                      </div>
                      <div>
                        <strong>UAE PDPL &amp; DNCR Compliant</strong>
                        <p>Automatic consent logs, revocations &amp; real-time Do Not Call Registry checks.</p>
                      </div>
                    </div>
                  </div>

                  <div className="dm-flagship-box-footer">
                    <span>Includes Interactive Lead Leak Calculator &amp; 60-Day Pilot</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 2: 360° SOFTWARE HOUSE SERVICES
          ═══════════════════════════════════════════════════════ */}
      <section className="dm-service-360-section">
        <div className="container">

          {/* Section Header */}
          <div className="dm-service-360-header">
            <span className="dm-partners-eyebrow">Full-Spectrum Engineering</span>
            <h2 className="dm-partners-title">
              360° Software &amp; <span style={{ color: "#bd2120" }}>Digital Services</span>
            </h2>
            <p className="dm-partners-subtitle">
              We engineer competitive advantages for startups and global enterprises — from bespoke software architectures to custom AI integrations and high-impact digital growth.
            </p>
          </div>

          {/* Service Cards Grid */}
          <div className="row g-4">
            {softwareServices.map((item) => (
              <div key={item.id} className="col-lg-4 col-md-6 wow tpfadeUp">
                <div className="dm-360-card">

                  {/* Artwork & Tag */}
                  <div className="dm-360-img-wrap">
                    <img src={item.img} alt={item.title} />
                    <span className="dm-360-tag">{item.tag}</span>
                  </div>

                  {/* Content */}
                  <div className="dm-360-body">
                    <h3 className="dm-360-title">{item.title}</h3>
                    <p className="dm-360-desc">{item.desc}</p>

                    {/* Tech Pills */}
                    <div className="dm-360-tech-pills">
                      {item.tags.map((t, idx) => (
                        <span key={idx} className="dm-360-tech-pill">{t}</span>
                      ))}
                    </div>

                    {/* Card CTA */}
                    <button
                      onClick={() => openProposalModal(item.title)}
                      className="dm-360-action-btn"
                    >
                      Request a Proposal
                      <i className="fal fa-long-arrow-right"></i>
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
};

export default ServiceArea;