import React from 'react';
import Link from 'next/link';
import { FaLinkedinIn, FaFacebookF, FaInstagram, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

const FooterThree = () => {
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

        .dm-footer-links a {
          font-size: 0.875rem;
          color: #9ca3af;
          text-decoration: none;
          transition: color 0.2s ease, transform 0.2s ease;
          display: inline-block;
        }

        .dm-footer-links a:hover {
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
                      <a href="tel:+971585984869">+971 58 598 4869</a>
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
                    <a href="https://wa.me/971585984869" target="_blank" rel="noopener noreferrer" className="dm-social-badge" title="WhatsApp">
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
                  <li><Link href="/faq">FAQ</Link></li>
                  <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                  <li><Link href="/terms">Terms of Service</Link></li>
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
    </>
  );
};

export default FooterThree;