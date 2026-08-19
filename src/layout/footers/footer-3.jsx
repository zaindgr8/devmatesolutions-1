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
                  <li><Link href="/ourservices">Services</Link></li>
                  <li><Link href="/our-team">Our Team</Link></li>
                  <li><Link href="/#startups-helped-build">Portfolio</Link></li>
                  <li><Link href="/job">Careers</Link></li>
                  <li><Link href="/#ceo">Book 1:1 Session</Link></li>
                </ul>
              </div>

              {/* Column 4: Support */}
              <div className="col-xl-2 col-lg-2 col-md-6">
                <h3 className="dm-footer-widget-title">Support</h3>
                <ul className="dm-footer-links">
                  <li>
                    <Link href="/faq">FAQ</Link>
                  </li>
                  <li>
                    <Link href="/privacy-policy">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link href="/terms">Terms of Service</Link>
                  </li>
                  <li>
                    <Link href="/refund-policy">Refund Policy</Link>
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