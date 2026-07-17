import React, { useState } from 'react';

// ── Our Own Ventures (shown FIRST) ─────────────────────────────
const own_ventures = [
  {
    id: 1,
    title: "AI Founder Hub",
    flag: "🇦🇪",
    country: "UAE",
    category: "AI Community",
    hover_img: "/assets/img/portfolio/aifounderhub.png",
    link: "https://aifounderhub.com/",
    hasLink: true,
  },
  {
    id: 2,
    title: "Reveal Voice",
    flag: "🇦🇪",
    country: "UAE",
    category: "Voice AI",
    hover_img: "/assets/img/portfolio/revealvoice.png",
    link: "https://www.revealvoice.com/",
    hasLink: true,
  },
];

// ── Startups We've Helped Build (shown SECOND) ─────────────────
const client_ventures = [
  {
    id: 1,
    title: "Procope AI",
    flag: "🇺🇸",
    country: "United States",
    category: "AI & Healthcare",
    hover_img: "/assets/img/portfolio/procopeai.png",
    link: "https://www.procope.ai/",
    hasLink: true,
  },
  {
    id: 2,
    title: "Finaxe",
    flag: "🇬🇧",
    country: "United Kingdom",
    category: "Fintech",
    hover_img: "/assets/img/portfolio/finaxe.png",
    link: "https://finaxe.com/",
    hasLink: true,
  },
  {
    id: 3,
    title: "Shift Application",
    flag: "🇴🇲",
    country: "Oman",
    category: "Mobile App",
    hover_img: "/assets/img/portfolio/shift.png",
    link: "https://hireshift.om/",
    hasLink: true,
  },
  {
    id: 4,
    title: "Revio Store",
    flag: "🇶🇦",
    country: "Qatar",
    category: "E-Commerce",
    hover_img: "/assets/img/portfolio/revio.png",
    link: "https://shop.revio.me/",
    hasLink: true,
  },
  {
    id: 5,
    title: "Refurbly CRM",
    flag: "🇶🇦",
    country: "Qatar",
    category: "SaaS / CRM",
    hover_img: "/assets/img/portfolio/vf.png",
    link: "https://www.vodafone.om/",
    hasLink: true,
  },
  {
    id: 6,
    title: "KoCoach",
    flag: "🇵🇱",
    country: "Poland",
    category: "Coaching Tech",
    hover_img: "/assets/img/portfolio/kocoach.png",
    link: "https://kocoach.tech/",
    hasLink: true,
  },
  {
    id: 7,
    title: "Ki Fashion",
    flag: "🇬🇧",
    country: "United Kingdom",
    category: "Supply Chain",
    hover_img: "/assets/img/portfolio/kifashion.png",
    link: "https://kifashion-website.vercel.app/",
    hasLink: true,
  },
  {
    id: 8,
    title: "HoppSwap",
    flag: "🇬🇧",
    country: "United Kingdom",
    category: "Marketplace",
    hover_img: "/assets/img/portfolio/hoppswap.png",
    link: "https://www.hoppswap.com/",
    hasLink: true,
  },
  {
    id: 9,
    title: "Alwalaa Real Estate",
    flag: "🇴🇲",
    country: "Oman",
    category: "Real Estate",
    hover_img: "/assets/img/portfolio/alwala.png",
    link: "https://alwalaaoman.com/",
    hasLink: true,
  },
  {
    id: 10,
    title: "Maison Serdoun",
    flag: "🇦🇪",
    country: "UAE",
    category: "Luxury Perfume",
    hover_img: "/assets/img/portfolio/maisonserdoun.png",
    link: "https://www.maisonserdoun.com/",
    hasLink: true,
  },
  {
    id: 11,
    title: "The Maison EM",
    flag: "🇦🇪",
    country: "UAE",
    category: "Fragrance & Lifestyle",
    hover_img: "/assets/img/portfolio/maisonem.png",
    link: "https://www.themaisonem.com/",
    hasLink: true,
  },
  {
    id: 12,
    title: "Senioriser",
    flag: "🇺🇸",
    country: "United States",
    category: "Senior Care Platform",
    hover_img: "/assets/img/portfolio/senioriser.png",
    link: "https://www.seniorisers.com/",
    hasLink: true,
  },
];

const INITIAL_VISIBLE = 6;
const ROW_SIZE = 3;

// ── Reusable Card ──────────────────────────────────────────────
const ClientCard = ({ item, index, isVenture }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`dm-client-card ${isVenture ? 'dm-client-card--venture' : ''} wow tpfadeUp`}
      data-wow-delay={`${index * 0.08}s`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >


      {/* Card body */}
      <div className="dm-client-card-body">
        <div className="dm-client-top">
          <span className="dm-client-number">
            {String(index + 1).padStart(2, '0')}
          </span>
          {item.hasLink ? (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="dm-client-arrow"
              title={`Visit ${item.title}`}
            >
              <i className="fal fa-long-arrow-right"></i>
            </a>
          ) : (
            <div className="dm-client-arrow" style={{ cursor: 'default', opacity: 0.3 }}>
              <i className="fal fa-long-arrow-right"></i>
            </div>
          )}
        </div>
        <div className="dm-client-bottom">
          {isVenture && (
            <span className="dm-venture-badge">
              <i className="fal fa-star"></i> Our Venture
            </span>
          )}
          <h3 className="dm-client-name">{item.title}</h3>
          <div className="dm-client-meta">
            <span className="dm-client-flag">{item.flag}</span>
            <span className="dm-client-country">{item.country}</span>
          </div>
          <span className="dm-client-category-tag">{item.category}</span>
        </div>
      </div>
    </div>
  );
};

// ── Section Label ──────────────────────────────────────────────
const SectionLabel = ({ number, label, description, isVenture }) => (
  <div className={`dm-group-label ${isVenture ? 'dm-group-label--venture' : 'dm-group-label--client'}`}>
    <div className="dm-group-label-left">
      <span className="dm-group-label-num">{number}</span>
      <div>
        <h3 className="dm-group-label-title">{label}</h3>
        <p className="dm-group-label-desc">{description}</p>
      </div>
    </div>
    {isVenture && (
      <span className="dm-group-badge">In-house</span>
    )}
  </div>
);

// ── Main Component ─────────────────────────────────────────────
const Portfolio = () => {
  const [visibleCount, setVisibleCount] = React.useState(INITIAL_VISIBLE);
  const showMore = () => setVisibleCount(v => Math.min(v + ROW_SIZE, client_ventures.length));
  const hasMore = visibleCount < client_ventures.length;

  // Portfolio request modal
  const [showPortfolioForm, setShowPortfolioForm] = React.useState(false);
  const [formData, setFormData] = React.useState({ name: '', email: '', phone: '', message: '' });
  const [formStatus, setFormStatus] = React.useState(null); // null | 'sending' | 'sent'

  const handleFormChange = (e) => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');
    try {
      await fetch('/api/send-chat-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || 'Not provided',
        }),
      });
    } catch (err) {
      console.error('Portfolio lead send error:', err);
    }
    setFormStatus('sent');
    setTimeout(() => { setShowPortfolioForm(false); setFormStatus(null); setFormData({ name: '', email: '', phone: '', message: '' }); }, 2400);
  };

  return (
    <>
      <style>{`
        /* ─── Section wrapper ─── */
        .dm-clients-section {
          padding: 100px 0 110px;
          background: #fff;
          position: relative;
          overflow: hidden;
        }
        .dm-clients-section::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #e5e5e5 20%, #e5e5e5 80%, transparent);
        }

        /* ─── Top header ─── */
        .dm-clients-header { margin-bottom: 64px; }

        .dm-clients-subtitle {
          font-size: 16px;
          color: #6b7280;
          max-width: 460px;
          line-height: 1.7;
          margin: 0;
        }
        .dm-clients-count {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 15px;
          color: #9ca3af;
          font-weight: 500;
        }
        .dm-clients-count strong {
          font-size: 20px;
          font-weight: 800;
          color: #0d0d0d;
        }

        /* ─── Group label bar ─── */
        .dm-group-label {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 28px;
          border-radius: 8px 8px 0 0;
          margin-bottom: 0;
          background: #0d0d0d;
          border: 1px solid #1a1a1a;
          border-left: 4px solid #c0392b;
        }
        .dm-group-label--venture {
          /* Uses dark theme default */
        }
        .dm-group-label--client {
          /* Uses dark theme default */
        }
 
        .dm-group-label-left {
          display: flex;
          align-items: center;
          gap: 18px;
        }
        .dm-group-label-num {
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 1.5px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          background: #c0392b;
          color: #fff;
        }
        .dm-group-label--client .dm-group-label-num {
          background: #2a2a2a;
          color: #ffffff;
        }
 
        .dm-group-label-title {
          font-size: 16px;
          font-weight: 800;
          margin: 0 0 4px;
          line-height: 1.2;
          color: #ffffff;
        }
        .dm-group-label--venture .dm-group-label-title { color: #ffffff; }
        .dm-group-label--client .dm-group-label-title { color: #ffffff; }
 
        .dm-group-label-desc {
          font-size: 12.5px;
          margin: 0;
          line-height: 1.4;
          color: #9ca3af;
        }
        .dm-group-label--venture .dm-group-label-desc { color: #9ca3af; }
        .dm-group-label--client .dm-group-label-desc { color: #9ca3af; }
 
        .dm-group-badge {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 5px 12px;
          border-radius: 20px;
          background: rgba(192,57,43,0.08);
          color: #c0392b;
          border: 1px solid rgba(192,57,43,0.2);
        }

        /* ─── Section spacing ─── */
        .dm-group-block { margin-bottom: 48px; }
        .dm-group-block:last-of-type { margin-bottom: 0; }

        /* ─── Grid ─── */
        .dm-clients-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          border-top: 1px solid #e8e8e8;
          border-left: 1px solid #e8e8e8;
        }
        .dm-clients-grid--venture {
          grid-template-columns: repeat(2, 1fr);
          border-color: #e8e8e8;
        }

        @media (max-width: 991px) {
          .dm-clients-grid { grid-template-columns: repeat(2, 1fr); }
          .dm-clients-grid--venture { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 575px) {
          .dm-clients-grid { grid-template-columns: 1fr; }
          .dm-clients-grid--venture { grid-template-columns: 1fr; }
        }

        /* ─── Card base ─── */
        .dm-client-card {
          border-right: 1px solid #e8e8e8;
          border-bottom: 1px solid #e8e8e8;
          padding: 36px 40px;
          position: relative;
          overflow: hidden;
          cursor: default;
          transition: background 0.25s ease, box-shadow 0.25s ease;
          background: #fff;
          display: flex;
          flex-direction: column;
          min-height: 220px;
        }
        .dm-client-card:hover {
          background: #0d0d0d;
          z-index: 2;
          box-shadow: 0 20px 60px rgba(0,0,0,0.12);
        }

        /* ─── Venture card variant ─── */
        .dm-client-card--venture {
          border-color: #e8e8e8;
          background: #fff;
          min-height: 260px;
          border-top: 2px solid #c0392b;
        }
        .dm-client-card--venture:hover {
          background: #0d0d0d;
          box-shadow: 0 20px 60px rgba(0,0,0,0.12);
        }
        .dm-client-card--venture .dm-client-preview img { display: none; }
        .dm-client-card--venture:hover .dm-client-preview img { display: none; }
        .dm-client-card--venture .dm-client-number { color: #d1d5db; }
        .dm-client-card--venture:hover .dm-client-number { color: #4b5563; }
        .dm-client-card--venture .dm-client-name { color: #0d0d0d; }
        .dm-client-card--venture:hover .dm-client-name { color: #fff; }
        .dm-client-card--venture .dm-client-country { color: #9ca3af; }
        .dm-client-card--venture:hover .dm-client-country { color: #6b7280; }
        .dm-client-card--venture .dm-client-arrow {
          border-color: #e8e8e8;
          color: #c0392b;
        }
        .dm-client-card--venture:hover .dm-client-arrow {
          border-color: #2a2a2a;
          color: #fff;
        }
        .dm-client-card--venture .dm-client-category-tag {
          background: rgba(192,57,43,0.07);
          color: #c0392b;
        }
        .dm-client-card--venture:hover .dm-client-category-tag {
          background: rgba(255,255,255,0.08);
          color: #9ca3af;
        }

        /* ─── Venture badge on card ─── */
        .dm-venture-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          color: #c0392b;
          margin-bottom: 6px;
        }
        .dm-venture-badge i { font-size: 9px; }

        /* ─── Preview image overlay (image hidden, overlay removed) ─── */
        .dm-client-preview { display: none; }

        /* ─── Card body ─── */
        .dm-client-card-body {
          position: relative;
          z-index: 2;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .dm-client-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 28px;
        }
        .dm-client-number {
          font-size: 11px;
          font-weight: 700;
          color: #d1d5db;
          letter-spacing: 1px;
          transition: color 0.25s ease;
        }
        .dm-client-card:hover .dm-client-number { color: #4b5563; }

        .dm-client-arrow {
          width: 36px; height: 36px;
          border-radius: 50%;
          border: 1.5px solid #e8e8e8;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          color: #c0392b;
          transition: all 0.25s ease;
          text-decoration: none;
          flex-shrink: 0;
        }
        .dm-client-arrow:hover {
          background: #c0392b;
          border-color: #c0392b;
          color: #fff;
          text-decoration: none;
        }
        .dm-client-card:hover .dm-client-arrow { border-color: #2a2a2a; color: #fff; }
        .dm-client-card:hover .dm-client-arrow:hover { background: #c0392b; border-color: #c0392b; }

        .dm-client-bottom {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .dm-client-name {
          font-size: 22px;
          font-weight: 700;
          color: #0d0d0d;
          line-height: 1.2;
          letter-spacing: -0.5px;
          margin: 0;
          transition: color 0.25s ease;
        }
        .dm-client-card:hover .dm-client-name { color: #fff; }

        .dm-client-meta {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .dm-client-flag { font-size: 17px; line-height: 1; }
        .dm-client-country {
          font-size: 13px;
          color: #9ca3af;
          font-weight: 500;
          transition: color 0.25s ease;
        }
        .dm-client-card:hover .dm-client-country { color: #6b7280; }

        .dm-client-category-tag {
          display: inline-block;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 20px;
          background: #f3f4f6;
          color: #6b7280;
          width: fit-content;
          margin-top: 4px;
          transition: all 0.25s ease;
        }
        .dm-client-card:hover .dm-client-category-tag {
          background: rgba(255,255,255,0.08);
          color: #9ca3af;
        }

        /* ─── Divider between groups ─── */
        .dm-group-divider {
          display: flex;
          align-items: center;
          gap: 16px;
          margin: 56px 0 48px;
        }
        .dm-group-divider::before,
        .dm-group-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #e8e8e8;
        }
        .dm-group-divider-text {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #d1d5db;
          white-space: nowrap;
        }

        /* ─── CTA ─── */
        .dm-clients-cta {
          margin-top: 56px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
        }
        .dm-clients-cta-text {
          font-size: 15px;
          color: #6b7280;
          line-height: 1.55;
        }
        .dm-clients-cta-text strong {
          display: block;
          font-size: 17px;
          color: #0d0d0d;
          font-weight: 700;
          margin-bottom: 2px;
        }
        .dm-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: #0d0d0d;
          color: #fff;
          font-size: 15px;
          font-weight: 600;
          padding: 16px 32px;
          border-radius: 4px;
          text-decoration: none;
          transition: all 0.25s ease;
          white-space: nowrap;
        }
        .dm-cta-btn:hover {
          background: #c0392b;
          color: #fff;
          text-decoration: none;
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(192,57,43,0.28);
        }
        .dm-cta-btn-icon {
          width: 20px; height: 20px;
          border-radius: 50%;
          border: 1.5px solid rgba(255,255,255,0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          transition: border-color 0.25s ease;
        }
        .dm-cta-btn:hover .dm-cta-btn-icon { border-color: rgba(255,255,255,0.65); }

        /* ─── Responsive ─── */
        @media (max-width: 767px) {
          .dm-clients-section { padding: 70px 0 80px; }
          .dm-client-card { padding: 28px 24px; min-height: 180px; }
          .dm-client-card--venture { min-height: 200px; }
          .dm-client-name { font-size: 18px; }
          .dm-clients-cta { flex-direction: column; align-items: flex-start; }
          .dm-group-label { flex-direction: column; align-items: flex-start; gap: 12px; }
        }

        /* ─── Show More Button ─── */
        .dm-show-more-wrap {
          padding-top: 36px;
          text-align: center;
        }
        .dm-show-more-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: transparent;
          border: 1.5px solid #e8e8e8;
          color: #0d0d0d;
          font-size: 14px;
          font-weight: 600;
          padding: 13px 28px;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.25s ease;
          letter-spacing: 0.2px;
        }
        .dm-show-more-btn:hover {
          background: #0d0d0d;
          border-color: #0d0d0d;
          color: #fff;
        }
        .dm-show-more-count {
          font-size: 11px;
          font-weight: 600;
          color: #9ca3af;
          background: #f3f4f6;
          padding: 2px 8px;
          border-radius: 10px;
          transition: all 0.25s ease;
        }
        .dm-show-more-btn:hover .dm-show-more-count {
          background: rgba(255,255,255,0.15);
          color: #fff;
        }

        /* ─── Request Full Portfolio Button ─── */
        .dm-portfolio-cta-wrap {
          padding-top: 44px;
          text-align: center;
        }
        .dm-portfolio-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: #c0392b;
          color: #fff;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.3px;
          padding: 15px 32px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .dm-portfolio-cta-btn:hover {
          background: #a93226;
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(192,57,43,0.25);
        }
        .dm-portfolio-cta-icon {
          width: 22px; height: 22px;
          border-radius: 50%;
          border: 1.5px solid rgba(255,255,255,0.45);
          display: flex; align-items: center; justify-content: center;
          font-size: 10px;
          transition: border-color 0.25s ease;
        }
        .dm-portfolio-cta-btn:hover .dm-portfolio-cta-icon { border-color: rgba(255,255,255,0.8); }

        /* ─── Modal Overlay ─── */
        .dm-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.65);
          backdrop-filter: blur(4px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: dm-fade-in 0.2s ease;
        }
        @keyframes dm-fade-in { from { opacity:0; } to { opacity:1; } }

        .dm-modal {
          background: #fff;
          border-radius: 12px;
          width: 100%;
          max-width: 500px;
          padding: 44px 40px;
          position: relative;
          box-shadow: 0 32px 80px rgba(0,0,0,0.18);
          animation: dm-slide-up 0.25s ease;
        }
        @keyframes dm-slide-up { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }

        @media (max-width: 575px) {
          .dm-modal { padding: 36px 24px; }
        }

        .dm-modal-close {
          position: absolute;
          top: 18px; right: 20px;
          background: #f3f4f6;
          border: none;
          width: 34px; height: 34px;
          border-radius: 50%;
          font-size: 14px;
          color: #6b7280;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s ease;
        }
        .dm-modal-close:hover { background: #e5e7eb; color: #0d0d0d; }

        .dm-modal-eyebrow {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #c0392b;
          display: block;
          margin-bottom: 10px;
        }
        .dm-modal-title {
          font-size: 26px;
          font-weight: 800;
          color: #0d0d0d;
          letter-spacing: -0.5px;
          margin-bottom: 8px;
        }
        .dm-modal-desc {
          font-size: 14px;
          color: #6b7280;
          line-height: 1.6;
          margin-bottom: 28px;
        }

        /* ─── Form ─── */
        .dm-modal-form { display: flex; flex-direction: column; gap: 16px; }

        .dm-modal-field { display: flex; flex-direction: column; gap: 6px; }
        .dm-modal-field label {
          font-size: 12.5px;
          font-weight: 700;
          color: #374151;
          letter-spacing: 0.2px;
        }
        .dm-modal-field input,
        .dm-modal-field textarea {
          border: 1.5px solid #e5e7eb;
          border-radius: 6px;
          padding: 11px 14px;
          font-size: 14px;
          color: #0d0d0d;
          font-family: inherit;
          outline: none;
          transition: border-color 0.2s ease;
          resize: none;
        }
        .dm-modal-field input:focus,
        .dm-modal-field textarea:focus {
          border-color: #c0392b;
          box-shadow: 0 0 0 3px rgba(192,57,43,0.08);
        }
        .dm-modal-field input::placeholder,
        .dm-modal-field textarea::placeholder { color: #9ca3af; }

        .dm-modal-submit {
          margin-top: 8px;
          background: #0d0d0d;
          color: #fff;
          border: none;
          padding: 14px 24px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.25s ease;
          font-family: inherit;
        }
        .dm-modal-submit:hover:not(:disabled) {
          background: #c0392b;
          transform: translateY(-1px);
          box-shadow: 0 8px 20px rgba(192,57,43,0.2);
        }
        .dm-modal-submit:disabled { opacity: 0.7; cursor: not-allowed; }

        /* ─── Success State ─── */
        .dm-modal-success {
          text-align: center;
          padding: 20px 0;
        }
        .dm-modal-success-icon {
          width: 60px; height: 60px;
          background: rgba(192,57,43,0.1);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 20px;
          font-size: 22px;
          color: #c0392b;
        }
        .dm-modal-success h3 { font-size: 22px; font-weight: 800; color: #0d0d0d; margin-bottom: 8px; }
        .dm-modal-success p { font-size: 14px; color: #6b7280; }
      `}</style>

      <div className="dm-clients-section" id="portfolio">
        <div className="container">

          {/* ── Top header ── */}
          <div className="row dm-clients-header">
            <div className="col-lg-7">
              <div className="tp-section">
                <span className="tp-section__subtitle mb-15 shadow-none text-grey p-0 wow tpfadeUp">
                  Our Portfolio
                </span>
                <h2 className="tp-section__title mb-30 wow tpfadeUp" data-wow-delay=".3s">
                  Built In-House &amp; <b className="text-red-700">Delivered</b> Across the Globe
                </h2>
              </div>
              <p className="dm-clients-subtitle">
                From our own AI ventures to high-growth startups we've engineered — every project reflects our obsession with quality.
              </p>
            </div>
            <div className="col-lg-5 d-flex align-items-end justify-content-lg-end mt-4 mt-lg-0">
              <div className="dm-clients-count">
                <strong>40+</strong>&nbsp;Global brands &amp; ventures
              </div>
            </div>
          </div>

          {/* ══ GROUP 1: Our Own Ventures ══ */}
          <div className="dm-group-block" id="our-own-ventures">
            <SectionLabel
              number="01"
              label="Our Own Ventures"
              description="Products we ideated, built, and launched ourselves"
              isVenture={true}
            />
            <div className="dm-clients-grid dm-clients-grid--venture">
              {own_ventures.map((item, i) => (
                <ClientCard key={item.id} item={item} index={i} isVenture={true} />
              ))}
            </div>
          </div>

          {/* ── Divider ── */}
          {/* <div className="dm-group-divider">
            <span className="dm-group-divider-text">+ Startups We've Helped Build</span>
          </div> */}

          {/* ══ GROUP 2: Startups We've Helped Build ══ */}
          <div className="dm-group-block" id="startups-helped-build">
            <SectionLabel
              number="02"
              label="Startups We've Helped Build"
              description="Client products we designed, engineered and scaled"
              isVenture={false}
            />
            <div className="dm-clients-grid">
              {client_ventures.slice(0, visibleCount).map((item, i) => (
                <ClientCard key={item.id} item={item} index={i} isVenture={false} />
              ))}
            </div>
            {hasMore && (
              <div className="dm-show-more-wrap">
                <button className="dm-show-more-btn" onClick={showMore}>
                  Show More
                  <span className="dm-show-more-count">
                    +{Math.min(ROW_SIZE, client_ventures.length - visibleCount)} more
                  </span>
                </button>
              </div>
            )}

            {/* Request Full Portfolio CTA */}
            <div className="dm-portfolio-cta-wrap">
              <button className="dm-portfolio-cta-btn" onClick={() => setShowPortfolioForm(true)}>
                Request Full Portfolio
                <span className="dm-portfolio-cta-icon">
                  <i className="fal fa-long-arrow-right"></i>
                </span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* ── Portfolio Request Modal ── */}
      {showPortfolioForm && (
        <div className="dm-modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowPortfolioForm(false)}>
          <div className="dm-modal">
            <button className="dm-modal-close" onClick={() => setShowPortfolioForm(false)}>
              <i className="fal fa-times"></i>
            </button>
            {formStatus === 'sent' ? (
              <div className="dm-modal-success">
                <div className="dm-modal-success-icon"><i className="fal fa-check"></i></div>
                <h3>Request Sent!</h3>
                <p>We'll send you our full portfolio shortly.</p>
              </div>
            ) : (
              <>
                <div className="dm-modal-header">
                  <span className="dm-modal-eyebrow">Portfolio Access</span>
                  <h2 className="dm-modal-title">Request Full Portfolio</h2>
                  <p className="dm-modal-desc">Fill in your details and we'll send our complete portfolio directly to you.</p>
                </div>
                <form className="dm-modal-form" onSubmit={handleFormSubmit}>
                  <div className="dm-modal-field">
                    <label>Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div className="dm-modal-field">
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      placeholder="you@company.com"
                      required
                    />
                  </div>
                  <div className="dm-modal-field">
                    <label>Contact Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                      placeholder="+971 50 000 0000"
                    />
                  </div>
                  <div className="dm-modal-field">
                    <label>Message <span style={{fontWeight:400,color:'#9ca3af'}}>(optional)</span></label>
                    <textarea
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleFormChange}
                      placeholder="Tell us about your project or what you're looking for..."
                    />
                  </div>
                  <button type="submit" className="dm-modal-submit" disabled={formStatus === 'sending'}>
                    {formStatus === 'sending' ? 'Sending...' : 'Send Request'}
                    {formStatus !== 'sending' && <i className="fal fa-long-arrow-right" style={{marginLeft:10}}></i>}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Portfolio;