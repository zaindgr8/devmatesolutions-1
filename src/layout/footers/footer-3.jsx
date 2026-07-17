"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FaLinkedinIn, 
  FaFacebookF, 
  FaInstagram, 
  FaWhatsapp, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaTimes, 
  FaShieldAlt, 
  FaFileContract, 
  FaQuestionCircle 
} from 'react-icons/fa';

const FooterThree = () => {
  const [activeModal, setActiveModal] = useState(null); // null | 'privacy' | 'terms' | 'faq'

  /* Lock body scroll when modal is active */
  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeModal]);

  /* Handle Escape key to close modal */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <style>{`
        .dm-footer-section {
          background: #0d0d11;
          color: #9ca3af;
          font-family: inherit;
          position: relative;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          font-size: 14px;
          line-height: 1.5;
        }

        .dm-footer-main {
          padding: 70px 0 45px;
        }

        .dm-footer-widget-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: #ffffff;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 24px;
          position: relative;
          display: inline-block;
        }

        .dm-footer-widget-title::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -6px;
          width: 24px;
          height: 2px;
          background: #bd2120;
          border-radius: 2px;
        }

        .dm-footer-brand-desc {
          font-size: 0.875rem;
          line-height: 1.65;
          color: #9ca3af;
          margin-bottom: 20px;
        }

        .dm-footer-locations {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .dm-footer-location-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 0.875rem;
          color: #d1d5db;
          line-height: 1.5;
        }

        .dm-footer-location-item svg {
          color: #bd2120;
          flex-shrink: 0;
          margin-top: 3px;
          font-size: 14px;
        }

        .dm-footer-contact-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .dm-footer-contact-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.875rem;
          color: #d1d5db;
        }

        .dm-footer-contact-item svg {
          color: #bd2120;
          flex-shrink: 0;
          font-size: 14px;
        }

        .dm-footer-contact-item a {
          color: #ffffff;
          font-weight: 600;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .dm-footer-contact-item a:hover {
          color: #f87171;
        }

        .dm-footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .dm-footer-links a,
        .dm-footer-modal-btn {
          font-size: 0.875rem;
          color: #9ca3af;
          text-decoration: none;
          transition: color 0.2s ease, transform 0.2s ease;
          display: inline-block;
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          font-family: inherit;
          text-align: left;
        }

        .dm-footer-links a:hover,
        .dm-footer-modal-btn:hover {
          color: #ffffff;
          transform: translateX(4px);
        }

        .dm-footer-socials {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 14px;
        }

        .dm-social-badge {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          text-decoration: none;
          transition: all 0.25s ease;
        }

        .dm-social-badge:hover {
          background: #bd2120;
          border-color: #bd2120;
          color: #ffffff;
          transform: translateY(-3px);
          box-shadow: 0 4px 12px rgba(189, 33, 32, 0.4);
        }

        .dm-footer-bottom {
          padding: 24px 0;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          font-size: 0.8125rem;
          color: #6b7280;
        }

        .dm-footer-bottom a {
          color: #9ca3af;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .dm-footer-bottom a:hover {
          color: #ffffff;
        }

        /* ─── Modal Styles ─── */
        .dm-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.78);
          backdrop-filter: blur(8px);
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: dmFadeIn 0.25s ease-out;
        }

        @keyframes dmFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        .dm-modal-card {
          background: #16161e;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 20px;
          width: 100%;
          max-width: 700px;
          max-height: 84vh;
          display: flex;
          flex-direction: column;
          box-shadow: 0 24px 70px rgba(0, 0, 0, 0.75);
          position: relative;
          overflow: hidden;
          animation: dmSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes dmSlideUp {
          from { opacity: 0; transform: translateY(24px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .dm-modal-header {
          padding: 20px 24px;
          background: linear-gradient(135deg, #1f1f2a 0%, #16161e 100%);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-shrink: 0;
        }

        .dm-modal-title-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .dm-modal-title-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(189, 33, 32, 0.15);
          border: 1px solid rgba(189, 33, 32, 0.35);
          color: #f87171;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          flex-shrink: 0;
        }

        .dm-modal-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0;
        }

        .dm-modal-subtitle {
          font-size: 0.78rem;
          color: #9ca3af;
          margin: 2px 0 0;
        }

        .dm-modal-close-btn {
          background: rgba(255, 255, 255, 0.08);
          border: none;
          color: #ffffff;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.2s ease;
          flex-shrink: 0;
        }

        .dm-modal-close-btn:hover {
          background: #bd2120;
          transform: rotate(90deg);
        }

        .dm-modal-body {
          padding: 24px 28px;
          overflow-y: auto;
          color: #d1d5db;
          font-size: 0.88rem;
          line-height: 1.7;
          flex: 1;
        }

        .dm-modal-body::-webkit-scrollbar {
          width: 6px;
        }
        .dm-modal-body::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.15);
          border-radius: 4px;
        }

        .dm-legal-section {
          margin-bottom: 22px;
        }

        .dm-legal-section-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .dm-legal-section-title span {
          color: #bd2120;
        }

        .dm-faq-item {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 12px;
        }

        .dm-faq-question {
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 6px;
          font-size: 0.9rem;
        }

        .dm-faq-answer {
          color: #9ca3af;
          font-size: 0.85rem;
          margin: 0;
        }

        .dm-modal-footer {
          padding: 16px 28px;
          background: rgba(0, 0, 0, 0.2);
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          display: flex;
          justify-content: flex-end;
          flex-shrink: 0;
        }

        .dm-modal-action-btn {
          background: linear-gradient(135deg, #bd2120, #e63939);
          color: #ffffff;
          border: none;
          padding: 9px 20px;
          border-radius: 10px;
          font-weight: 700;
          font-size: 0.85rem;
          cursor: pointer;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }

        .dm-modal-action-btn:hover {
          opacity: 0.9;
          transform: translateY(-1px);
        }
      `}</style>

      <footer className="dm-footer-section">
        <div className="container">
          <div className="dm-footer-main">
            <div className="row g-4">
              
              {/* Column 1: Brand Info */}
              <div className="col-xl-4 col-lg-4 col-md-6">
                <div className="pe-lg-4">
                  <h3 className="dm-footer-widget-title">Devmate Solutions</h3>
                  <p className="dm-footer-brand-desc">
                    We engineer competitive software, AI solutions, and digital growth campaigns for startups and global enterprises.
                  </p>
                  <ul className="dm-footer-contact-list mb-3">
                    <li className="dm-footer-contact-item">
                      <FaEnvelope />
                      <a href="mailto:contact@devmatesolutions.com">contact@devmatesolutions.com</a>
                    </li>
                    <li className="dm-footer-contact-item">
                      <FaPhoneAlt />
                      <a href="tel:+971542968754">+971 542968754</a>
                    </li>
                  </ul>
                  <div className="dm-footer-socials">
                    <a href="https://www.linkedin.com/company/devmatesolutions" target="_blank" rel="noopener noreferrer" className="dm-social-badge" title="LinkedIn">
                      <FaLinkedinIn />
                    </a>
                    <a href="https://www.facebook.com/devmatesolutions" target="_blank" rel="noopener noreferrer" className="dm-social-badge" title="Facebook">
                      <FaFacebookF />
                    </a>
                    <a href="https://www.instagram.com/devmatesolutions/" target="_blank" rel="noopener noreferrer" className="dm-social-badge" title="Instagram">
                      <FaInstagram />
                    </a>
                    <a href="https://wa.me/971542968754" target="_blank" rel="noopener noreferrer" className="dm-social-badge" title="WhatsApp">
                      <FaWhatsapp />
                    </a>
                  </div>
                </div>
              </div>

              {/* Column 2: Global Locations */}
              <div className="col-xl-4 col-lg-4 col-md-6">
                <h3 className="dm-footer-widget-title">Global Offices</h3>
                <ul className="dm-footer-locations">
                  <li className="dm-footer-location-item">
                    <FaMapMarkerAlt />
                    <div>
                      <strong className="text-white">UAE:</strong> Business Bay, Dubai
                    </div>
                  </li>
                  <li className="dm-footer-location-item">
                    <FaMapMarkerAlt />
                    <div>
                      <strong className="text-white">USA:</strong> Atlanta, GA &amp; New York, NY
                    </div>
                  </li>
                  <li className="dm-footer-location-item">
                    <FaMapMarkerAlt />
                    <div>
                      <strong className="text-white">Oman:</strong> Al Mouj, Muscat
                    </div>
                  </li>
                </ul>
              </div>

              {/* Column 3: Quick Links */}
              <div className="col-xl-2 col-lg-2 col-md-6">
                <h3 className="dm-footer-widget-title">Quick Links</h3>
                <ul className="dm-footer-links">
                  <li><Link href="/service-3">Services</Link></li>
                  <li><Link href="/team-2">Our Team</Link></li>
                  <li><Link href="/portfolio-2">Portfolio</Link></li>
                  <li><Link href="/job">Careers</Link></li>
                  <li><Link href="/#ceo">Book 1:1 Session</Link></li>
                </ul>
              </div>

              {/* Column 4: Support */}
              <div className="col-xl-2 col-lg-2 col-md-6">
                <h3 className="dm-footer-widget-title">Support</h3>
                <ul className="dm-footer-links">
                  <li><Link href="/contact">Contact Us</Link></li>
                  <li>
                    <button type="button" className="dm-footer-modal-btn" onClick={() => setActiveModal('faq')}>
                      FAQ
                    </button>
                  </li>
                  <li>
                    <button type="button" className="dm-footer-modal-btn" onClick={() => setActiveModal('privacy')}>
                      Privacy Policy
                    </button>
                  </li>
                  <li>
                    <button type="button" className="dm-footer-modal-btn" onClick={() => setActiveModal('terms')}>
                      Terms of Service
                    </button>
                  </li>
                </ul>
              </div>

            </div>
          </div>

          {/* Copyright Bar */}
          <div className="dm-footer-bottom">
            <div className="row align-items-center">
              <div className="col-md-6 text-center text-md-start mb-2 mb-md-0">
                © {new Date().getFullYear()} <strong className="text-white">Devmate Solutions</strong>. All rights reserved.
              </div>
              <div className="col-md-6 text-center text-md-end">
                <span>Operating Globally · Dubai · New York · Muscat</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* ─── MODALS ─── */}
      {activeModal && (
        <div className="dm-modal-overlay" onClick={(e) => e.target === e.currentTarget && setActiveModal(null)}>
          <div className="dm-modal-card" role="dialog" aria-modal="true">
            
            {/* ── 1. PRIVACY POLICY MODAL ── */}
            {activeModal === 'privacy' && (
              <>
                <div className="dm-modal-header">
                  <div className="dm-modal-title-wrap">
                    <div className="dm-modal-title-icon">
                      <FaShieldAlt />
                    </div>
                    <div>
                      <h2 className="dm-modal-title">Privacy Policy</h2>
                      <p className="dm-modal-subtitle">Devmate Solutions · Data Privacy &amp; Confidentiality</p>
                    </div>
                  </div>
                  <button className="dm-modal-close-btn" onClick={() => setActiveModal(null)} aria-label="Close modal">
                    <FaTimes />
                  </button>
                </div>
                <div className="dm-modal-body">
                  <div className="dm-legal-section">
                    <div className="dm-legal-section-title"><span>1.</span> Overview &amp; Commitment</div>
                    <p>
                      Devmate Solutions ("we", "our", or "us") is dedicated to safeguarding the personal and commercial data of our visitors, clients, and partners. This policy outlines how information is gathered, managed, and protected across devmatesolutions.com and our client engagements.
                    </p>
                  </div>

                  <div className="dm-legal-section">
                    <div className="dm-legal-section-title"><span>2.</span> Information We Collect</div>
                    <p>
                      We collect details submitted voluntarily through our contact forms, live chat, or booking portals—including your Full Name, Email Address, Phone Number, and Project Requirements. Technical diagnostics (such as IP addresses and browser type) are collected strictly for security and performance optimization.
                    </p>
                  </div>

                  <div className="dm-legal-section">
                    <div className="dm-legal-section-title"><span>3.</span> How We Use Your Information</div>
                    <p>
                      Your data is utilized solely to deliver custom software engineering, AI automation solutions, and growth marketing services. We communicate regarding project milestones, respond to consultations, and deliver customer support. We do not sell, rent, or lease client information to third parties.
                    </p>
                  </div>

                  <div className="dm-legal-section">
                    <div className="dm-legal-section-title"><span>4.</span> Confidentiality &amp; NDAs</div>
                    <p>
                      Confidentiality is paramount to our practice. We routinely execute bilateral Non-Disclosure Agreements (NDAs) prior to receiving proprietary source code, business blueprints, or sensitive intellectual property.
                    </p>
                  </div>

                  <div className="dm-legal-section">
                    <div className="dm-legal-section-title"><span>5.</span> Security &amp; Data Rights</div>
                    <p>
                      We employ enterprise-grade SSL/TLS encryption, restricted access controls, and secure server environments. You retain full rights to request inspection, modification, or total deletion of your personal data by emailing <strong>contact@devmatesolutions.com</strong>.
                    </p>
                  </div>
                </div>
              </>
            )}

            {/* ── 2. TERMS OF SERVICE MODAL ── */}
            {activeModal === 'terms' && (
              <>
                <div className="dm-modal-header">
                  <div className="dm-modal-title-wrap">
                    <div className="dm-modal-title-icon">
                      <FaFileContract />
                    </div>
                    <div>
                      <h2 className="dm-modal-title">Terms &amp; Conditions</h2>
                      <p className="dm-modal-subtitle">Devmate Solutions · Service Standards &amp; Terms</p>
                    </div>
                  </div>
                  <button className="dm-modal-close-btn" onClick={() => setActiveModal(null)} aria-label="Close modal">
                    <FaTimes />
                  </button>
                </div>
                <div className="dm-modal-body">
                  <div className="dm-legal-section">
                    <div className="dm-legal-section-title"><span>1.</span> Acceptance of Terms</div>
                    <p>
                      By accessing devmatesolutions.com or engaging our software engineering, AI integration, or growth consultancy services, you agree to comply with these Terms of Service and all applicable laws and regulations.
                    </p>
                  </div>

                  <div className="dm-legal-section">
                    <div className="dm-legal-section-title"><span>2.</span> Scope of Work &amp; Deliverables</div>
                    <p>
                      All client engagements, project scopes, timelines, deliverables, and payment milestones are governed by formal individual Statements of Work (SOW) or master service agreements executed between Devmate Solutions and the client.
                    </p>
                  </div>

                  <div className="dm-legal-section">
                    <div className="dm-legal-section-title"><span>3.</span> Intellectual Property Rights</div>
                    <p>
                      Upon complete settlement of agreed project fees, all custom source code, design assets, and proprietary systems developed specifically for the client become the exclusive intellectual property of the client, subject to standard open-source licenses where applicable.
                    </p>
                  </div>

                  <div className="dm-legal-section">
                    <div className="dm-legal-section-title"><span>4.</span> Consultations &amp; Payments</div>
                    <p>
                      Consultation bookings and deposit payments are processed via secured merchant payment channels. Rescheduling or cancellation requests must be communicated at least 24 hours in advance of the scheduled call.
                    </p>
                  </div>

                  <div className="dm-legal-section">
                    <div className="dm-legal-section-title"><span>5.</span> Limitation of Liability</div>
                    <p>
                      Devmate Solutions maintains high engineering standards but shall not be held liable for indirect or consequential losses resulting from third-party API disruptions, hosting provider outages, or client-managed infrastructure changes.
                    </p>
                  </div>
                </div>
              </>
            )}

            {/* ── 3. FAQ MODAL ── */}
            {activeModal === 'faq' && (
              <>
                <div className="dm-modal-header">
                  <div className="dm-modal-title-wrap">
                    <div className="dm-modal-title-icon">
                      <FaQuestionCircle />
                    </div>
                    <div>
                      <h2 className="dm-modal-title">Frequently Asked Questions</h2>
                      <p className="dm-modal-subtitle">Devmate Solutions · Everything You Need To Know</p>
                    </div>
                  </div>
                  <button className="dm-modal-close-btn" onClick={() => setActiveModal(null)} aria-label="Close modal">
                    <FaTimes />
                  </button>
                </div>
                <div className="dm-modal-body">
                  
                  <div className="dm-faq-item">
                    <div className="dm-faq-question">Q: What core services does Devmate Solutions provide?</div>
                    <p className="dm-faq-answer">
                      We offer end-to-end Custom Software Development (Web &amp; Mobile), AI &amp; Machine Learning Integration, UI/UX Product Design, Growth Marketing (SEO/SEM), and Executive Technology Consulting.
                    </p>
                  </div>

                  <div className="dm-faq-item">
                    <div className="dm-faq-question">Q: Where are your primary teams and offices located?</div>
                    <p className="dm-faq-answer">
                      We operate global hubs in Dubai (Business Bay, UAE), New York &amp; Atlanta (USA), and Muscat (Al Mouj, Oman), partnering with clients across North America, Europe, and the GCC.
                    </p>
                  </div>

                  <div className="dm-faq-item">
                    <div className="dm-faq-question">Q: How do we get started or request a project quote?</div>
                    <p className="dm-faq-answer">
                      You can schedule a free consultation through our website modals, speak with our AI live chat assistant, or click "Get Instant Call" to be connected directly with our senior team.
                    </p>
                  </div>

                  <div className="dm-faq-item">
                    <div className="dm-faq-question">Q: Do you sign Non-Disclosure Agreements (NDAs)?</div>
                    <p className="dm-faq-answer">
                      Yes! Confidentiality is mandatory for all our client relationships. We execute mutual NDAs prior to reviewing project specs or proprietary codebases.
                    </p>
                  </div>

                  <div className="dm-faq-item">
                    <div className="dm-faq-question">Q: What are your typical project timelines and engagement models?</div>
                    <p className="dm-faq-answer">
                      MVPs and custom tools typically take 3–6 weeks, while complex enterprise platforms span 2–5 months. We support fixed milestone billing and dedicated team retainer models.
                    </p>
                  </div>

                </div>
              </>
            )}

            <div className="dm-modal-footer">
              <button className="dm-modal-action-btn" onClick={() => setActiveModal(null)}>
                Close Window
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default FooterThree;