import React, { useState } from 'react';

// ── Our Own Ventures ─────────────────────────────────────────
const own_ventures = [
  {
    id: 1,
    title: "AI Founder Hub",
    flag: "🌐",
    country: "Global",
    category: "AI Community Platform",
    tagline: "Connecting AI founders, investors & builders across the Globe",
    logo: "/assets/img/portfolio/AI Founder Hub.png",
    link: "https://aifounderhub.com/",
  },
  {
    id: 2,
    title: "Reveal AI",
    flag: "🌐",
    country: "Global",
    category: "Voice AI Technology",
    tagline: "Enterprise-grade voice AI for intelligent customer conversations",
    logo: "/assets/img/portfolio/RevealAI.png",
    link: "https://www.revealvoice.com/",
  },
];

// ── Startups We've Helped Build ──────────────────────────────
const client_ventures = [
  { id: 1,  title: "Vodafone",            flag: "🇴🇲", country: "Oman",           logo: "/assets/img/portfolio/VodaFone.png",                 link: "https://www.vodafone.om/" },
  { id: 2,  title: "Shift",               flag: "🇴🇲", country: "Oman",           logo: "/assets/img/portfolio/Shift.png",                    link: "https://hireshift.om/" },
  { id: 3,  title: "Revio",              flag: "🇶🇦", country: "Qatar",          logo: "/assets/img/portfolio/Revio.png",                    link: "https://shop.revio.me/" },
  { id: 4,  title: "Maison Serdoun",     flag: "🇦🇪", country: "UAE",            logo: "/assets/img/portfolio/MaisonSerdoun.png",            link: "https://www.maisonserdoun.com/" },
  { id: 5,  title: "Procope AI",         flag: "🇺🇸", country: "United States",  logo: "/assets/img/portfolio/Procope.png",                  link: "https://www.procope.ai/" },
  { id: 6,  title: "Finaxe",             flag: "🇬🇧", country: "United Kingdom", logo: "/assets/img/portfolio/Finaxe.png",                   link: "https://finaxe.com/" },
  { id: 7,  title: "Be A Masterpiece",   flag: "🇦🇪", country: "UAE",            logo: "/assets/img/portfolio/BeAMasterPiece.png",           link: "https://beamasterpiece.ae/" },
  { id: 8,  title: "KoCoach",            flag: "🇵🇱", country: "Poland",         logo: "/assets/img/portfolio/KO Coach.png",                 link: "https://kocoach.tech/" },
  { id: 9,  title: "IWantStyle",         flag: "🇬🇧", country: "United Kingdom", logo: "/assets/img/portfolio/IWantStyle.png",               link: "https://kifashion-website.vercel.app/" },
  { id: 10, title: "HoppSwap",           flag: "🇬🇧", country: "United Kingdom", logo: "/assets/img/portfolio/HopSwap.png",                  link: "https://www.hoppswap.com/" },
  { id: 11, title: "Alwalaa Real Estate",flag: "🇴🇲", country: "Oman",           logo: "/assets/img/portfolio/Alwala Real Estate Oman.png", link: "https://alwalaaoman.com/" },
  { id: 12, title: "The Maison EM",      flag: "🇦🇪", country: "UAE",            logo: "/assets/img/portfolio/Maison EM.png",                link: "https://www.themaisonem.com/" },
  { id: 13, title: "Senioriser",         flag: "🇺🇸", country: "United States",  logo: "/assets/img/portfolio/Seniorisers.png",              link: "https://www.seniorisers.com/" },
];

// Split into two rows for staggered carousel
const row1 = client_ventures.slice(0, 7);
const row2 = client_ventures.slice(6);   // slight overlap for visual density

// ── Venture Card (Our Own — Featured) ────────────────────────
const VentureCard = ({ item, index }) => (
  <div className="dm-venture-card wow tpfadeUp" data-wow-delay={`${index * 0.12}s`}>
    <div className="dm-venture-card-inner">
      <div className="dm-venture-logo-wrap">
        <img src={item.logo} alt={item.title} className="dm-venture-logo" loading="lazy" />
      </div>
      <div className="dm-venture-body">
        <span className="dm-venture-category">{item.category}</span>
        <h3 className="dm-venture-name">{item.title}</h3>
        <p className="dm-venture-tagline">{item.tagline}</p>
        <div className="dm-venture-footer">
          <span className="dm-venture-country">{item.flag} {item.country}</span>
          <a href={item.link} target="_blank" rel="noopener noreferrer" className="dm-venture-link">
            Visit <i className="fal fa-arrow-up-right"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
);

// ── Single Marquee Logo Card ──────────────────────────────────
const MarqueeCard = ({ item }) => (
  <a
    href={item.link}
    target="_blank"
    rel="noopener noreferrer"
    className="dm-marquee-card"
    title={item.title}
  >
    <div className="dm-marquee-logo-wrap">
      <img src={item.logo} alt={item.title} className="dm-marquee-logo" loading="lazy" />
    </div>
    <div className="dm-marquee-info">
      <span className="dm-marquee-name">{item.title}</span>
      <span className="dm-marquee-country">{item.flag} {item.country}</span>
    </div>
  </a>
);

// ── Infinite Marquee Row ──────────────────────────────────────
const MarqueeRow = ({ items, direction = 'left', speed = 35 }) => {
  // Duplicate 3× so the loop is seamless at any viewport width
  const tripled = [...items, ...items, ...items];
  const animName = direction === 'left' ? 'dm-scroll-left' : 'dm-scroll-right';

  return (
    <div className="dm-marquee-track-wrap">
      <div
        className="dm-marquee-track"
        style={{ animation: `${animName} ${speed}s linear infinite` }}
      >
        {tripled.map((item, i) => (
          <MarqueeCard key={`${item.id}-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
};

// ── Main Component ────────────────────────────────────────────
const Portfolio = () => {
  const [showPortfolioForm, setShowPortfolioForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [formStatus, setFormStatus] = useState(null);

  const handleFormChange = (e) => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');
    try {
      await fetch('/api/send-chat-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formData.name, email: formData.email, phone: formData.phone || 'Not provided', message: formData.message }),
      });
    } catch (err) { console.error(err); }
    setFormStatus('sent');
    setTimeout(() => { setShowPortfolioForm(false); setFormStatus(null); setFormData({ name: '', email: '', phone: '', message: '' }); }, 2400);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `

        /* ═══════════════════════════════════════
           KEYFRAMES — Infinite Marquee Scrolls
        ═══════════════════════════════════════ */
        @keyframes dm-scroll-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes dm-scroll-right {
          0%   { transform: translateX(-33.333%); }
          100% { transform: translateX(0); }
        }

        /* ═══════════════════════════════════════
           PORTFOLIO SECTION
        ═══════════════════════════════════════ */
        .dm-portfolio-section {
          padding: 90px 0 100px;
          background: #ffffff;
          position: relative;
        }
        .dm-portfolio-section::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #e0e0e0 25%, #e0e0e0 75%, transparent);
        }

        /* ═══════════════════════════════════════
           SECTION HEADER
        ═══════════════════════════════════════ */
        .dm-port-header { margin-bottom: 60px; }
        .dm-port-header .tp-section__title {
          color: #0a0a0a;
          font-size: 40px;
          font-weight: 800;
          line-height: 1.2;
        }
        .dm-port-subtitle {
          font-size: 15.5px;
          color: #6b7280;
          max-width: 500px;
          line-height: 1.7;
          margin: 0;
        }
        .dm-port-count {
          font-size: 14px;
          color: #9ca3af;
          font-weight: 500;
        }
        .dm-port-count strong {
          font-size: 22px;
          font-weight: 800;
          color: #0a0a0a;
        }

        /* ═══════════════════════════════════════
           BLOCK SPACING
        ═══════════════════════════════════════ */
        .dm-port-block { margin-bottom: 72px; }
        .dm-port-block:last-child { margin-bottom: 0; }

        /* ═══════════════════════════════════════
           GROUP HEADING
        ═══════════════════════════════════════ */
        .dm-port-group-heading {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 6px;
        }
        .dm-port-group-num {
          font-size: 10.5px;
          font-weight: 800;
          letter-spacing: 1.5px;
          color: #c0392b;
          background: rgba(192, 57, 43, 0.08);
          padding: 4px 10px;
          border-radius: 20px;
          line-height: 1;
        }
        .dm-port-group-title {
          font-size: 21px;
          font-weight: 800;
          color: #0a0a0a;
          margin: 0;
          line-height: 1.2;
        }
        .dm-port-group-tag {
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 3px 10px;
          border-radius: 12px;
          background: #0a0a0a;
          color: #fff;
          margin-left: 4px;
        }
        .dm-port-group-desc {
          font-size: 13.5px;
          color: #9ca3af;
          margin: 0 0 26px;
          padding-left: 2px;
        }

        /* ═══════════════════════════════════════
           OUR OWN VENTURES — FEATURED CARDS
        ═══════════════════════════════════════ */
        .dm-ventures-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }
        @media (max-width: 768px) { .dm-ventures-grid { grid-template-columns: 1fr; } }

        .dm-venture-card { display: block; text-decoration: none; }
        .dm-venture-card-inner {
          display: flex;
          align-items: stretch;
          border: 1px solid #f0f0f0;
          border-radius: 18px;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
          background: #ffffff;
          border-top: 3px solid #c0392b;
          height: 100%;
        }
        .dm-venture-card:hover .dm-venture-card-inner {
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.1), 0 0 0 1px rgba(192,57,43,0.15);
          border-color: rgba(192,57,43,0.3);
          border-top-color: #c0392b;
        }
        .dm-venture-logo-wrap {
          width: 130px;
          min-width: 130px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f8f9fb;
          border-right: 1px solid #f0f0f0;
          padding: 20px;
          transition: background 0.3s ease;
        }
        .dm-venture-card:hover .dm-venture-logo-wrap { background: #f2f2f5; }
        .dm-venture-logo {
          width: 72px; height: 72px;
          object-fit: contain;
          border-radius: 14px;
          transition: transform 0.3s ease;
        }
        .dm-venture-card:hover .dm-venture-logo { transform: scale(1.08); }
        .dm-venture-body {
          flex: 1;
          padding: 22px 24px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 4px;
        }
        .dm-venture-category {
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #c0392b;
        }
        .dm-venture-name {
          font-size: 20px;
          font-weight: 800;
          color: #0a0a0a;
          margin: 2px 0 6px;
          line-height: 1.2;
        }
        .dm-venture-tagline {
          font-size: 13px;
          color: #6b7280;
          line-height: 1.5;
          margin: 0 0 14px;
        }
        .dm-venture-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .dm-venture-country {
          font-size: 12.5px;
          font-weight: 600;
          color: #9ca3af;
        }
        .dm-venture-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12.5px;
          font-weight: 700;
          color: #0a0a0a;
          text-decoration: none;
          background: #f3f4f6;
          padding: 6px 14px;
          border-radius: 20px;
          transition: all 0.25s ease;
        }
        .dm-venture-link i { font-size: 10px; transition: transform 0.2s ease; }
        .dm-venture-card:hover .dm-venture-link {
          background: #c0392b;
          color: #ffffff;
        }
        .dm-venture-card:hover .dm-venture-link i { transform: translate(2px, -2px); }

        /* ═══════════════════════════════════════
           STARTUPS — INFINITE MARQUEE CAROUSEL
        ═══════════════════════════════════════ */
        .dm-marquee-section {
          position: relative;
          /* Fade-out edges for premium feel */
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            #000 8%,
            #000 92%,
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            #000 8%,
            #000 92%,
            transparent 100%
          );
          overflow: hidden;
          padding: 8px 0 4px;
        }

        /* Each row is a single scrolling strip */
        .dm-marquee-track-wrap {
          overflow: hidden;
          margin-bottom: 16px;
        }
        .dm-marquee-track-wrap:last-child { margin-bottom: 0; }

        .dm-marquee-track {
          display: flex;
          gap: 16px;
          width: max-content;
          will-change: transform;
        }

        /* Pause on hover */
        .dm-marquee-section:hover .dm-marquee-track {
          animation-play-state: paused;
        }

        /* ── Individual Card ── */
        .dm-marquee-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          width: 148px;
          padding: 18px 16px 14px;
          border: 1px solid #efefef;
          border-radius: 16px;
          background: #ffffff;
          text-decoration: none;
          color: inherit;
          flex-shrink: 0;
          transition: all 0.25s ease;
          box-shadow: 0 1px 6px rgba(0,0,0,0.04);
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .dm-marquee-card::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 0;
          background: #c0392b;
          transition: height 0.25s ease;
          border-radius: 0 0 16px 16px;
        }
        .dm-marquee-card:hover {
          border-color: rgba(192,57,43,0.25);
          box-shadow: 0 8px 24px rgba(192,57,43,0.12), 0 2px 8px rgba(0,0,0,0.06);
          transform: translateY(-4px);
          text-decoration: none;
          color: inherit;
        }
        .dm-marquee-card:hover::after { height: 2.5px; }

        .dm-marquee-logo-wrap {
          width: 64px;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .dm-marquee-logo {
          max-width: 64px;
          max-height: 52px;
          width: auto;
          height: auto;
          object-fit: contain;
          border-radius: 10px;
          transition: transform 0.25s ease;
          opacity: 0.85;
        }
        .dm-marquee-card:hover .dm-marquee-logo {
          transform: scale(1.1);
          opacity: 1;
        }

        .dm-marquee-info {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
          text-align: center;
        }
        .dm-marquee-name {
          font-size: 12px;
          font-weight: 700;
          color: #1a1a1a;
          line-height: 1.2;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 116px;
          transition: color 0.2s ease;
        }
        .dm-marquee-card:hover .dm-marquee-name { color: #c0392b; }
        .dm-marquee-country {
          font-size: 10.5px;
          color: #9ca3af;
          font-weight: 500;
          white-space: nowrap;
          transition: color 0.2s ease;
        }
        .dm-marquee-card:hover .dm-marquee-country { color: #374151; }

        /* ── Marquee counter badge ── */
        .dm-marquee-count-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 22px;
          background: #f8f9fb;
          border: 1px solid #efefef;
          border-radius: 30px;
          padding: 7px 16px;
          font-size: 12.5px;
          font-weight: 600;
          color: #374151;
        }
        .dm-marquee-count-badge .badge-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #c0392b;
          animation: dm-pulse 2s ease-in-out infinite;
        }
        @keyframes dm-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.55; transform: scale(0.8); }
        }

        /* ═══════════════════════════════════════
           CTA STRIP
        ═══════════════════════════════════════ */
        .dm-port-cta-wrap {
          margin-top: 52px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          padding: 36px 40px;
          background: #0a0a0a;
          border-radius: 20px;
          flex-wrap: wrap;
        }
        .dm-port-cta-left strong {
          display: block;
          font-size: 19px;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 4px;
        }
        .dm-port-cta-left span { font-size: 14px; color: #6b7280; }
        .dm-port-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: #c0392b;
          color: #ffffff;
          font-size: 14px;
          font-weight: 700;
          padding: 14px 30px;
          border-radius: 30px;
          border: none;
          cursor: pointer;
          transition: all 0.25s ease;
          white-space: nowrap;
          box-shadow: 0 6px 20px rgba(192,57,43,0.4);
        }
        .dm-port-cta-btn:hover {
          background: #e74c3c;
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(192,57,43,0.5);
        }
        .dm-port-cta-icon {
          width: 22px; height: 22px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
          display: flex; align-items: center; justify-content: center;
          font-size: 11px;
        }

        /* ═══════════════════════════════════════
           MODAL
        ═══════════════════════════════════════ */
        .dm-modal-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.65);
          backdrop-filter: blur(6px);
          z-index: 99999;
          display: flex; align-items: center; justify-content: center;
          padding: 20px;
        }
        .dm-modal {
          background: #ffffff;
          border-radius: 20px;
          padding: 36px;
          max-width: 460px; width: 100%;
          position: relative;
          box-shadow: 0 24px 60px rgba(0,0,0,0.18);
        }
        .dm-modal-close {
          position: absolute; top: 18px; right: 18px;
          background: #f3f4f6; border: none; color: #6b7280;
          width: 32px; height: 32px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; font-size: 14px; transition: all 0.2s;
        }
        .dm-modal-close:hover { background: #0a0a0a; color: #fff; }
        .dm-modal-eyebrow { font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #c0392b; display: block; margin-bottom: 6px; }
        .dm-modal-title { font-size: 22px; font-weight: 800; color: #0a0a0a; margin-bottom: 8px; }
        .dm-modal-desc { font-size: 13.5px; color: #6b7280; line-height: 1.5; margin-bottom: 24px; }
        .dm-modal-field { margin-bottom: 16px; }
        .dm-modal-field label { display: block; font-size: 12px; font-weight: 600; color: #374151; margin-bottom: 6px; }
        .dm-modal-field input, .dm-modal-field textarea {
          width: 100%; background: #f9fafb; border: 1px solid #e5e7eb;
          border-radius: 10px; padding: 12px 14px; color: #0a0a0a;
          font-size: 14px; outline: none; transition: border-color 0.2s;
        }
        .dm-modal-field input:focus, .dm-modal-field textarea:focus {
          border-color: #c0392b; box-shadow: 0 0 0 3px rgba(192,57,43,0.1);
        }
        .dm-modal-submit {
          width: 100%; background: #c0392b; color: #fff;
          font-size: 15px; font-weight: 700; padding: 14px;
          border-radius: 10px; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          margin-top: 8px; transition: all 0.2s;
        }
        .dm-modal-submit:hover:not(:disabled) { background: #e74c3c; box-shadow: 0 8px 24px rgba(192,57,43,0.3); }
        .dm-modal-submit:disabled { opacity: 0.6; cursor: not-allowed; }
        .dm-modal-success { text-align: center; padding: 30px 10px; }
        .dm-modal-success-icon {
          width: 64px; height: 64px; border-radius: 50%;
          background: rgba(192,57,43,0.1); color: #c0392b;
          font-size: 26px; display: flex; align-items: center;
          justify-content: center; margin: 0 auto 18px;
        }
        .dm-modal-success h3 { font-size: 22px; font-weight: 800; color: #0a0a0a; margin-bottom: 8px; }
        .dm-modal-success p { font-size: 14px; color: #6b7280; }
      `}} />

      <div className="dm-portfolio-section" id="portfolio">
        <div className="container">

          {/* ── HEADER ── */}
          <div className="row dm-port-header align-items-end">
            <div className="col-lg-7">
              <div className="tp-section">
                <span className="tp-section__subtitle mb-15 shadow-none text-grey p-0 wow tpfadeUp">Our Portfolio</span>
                <h2 className="tp-section__title mb-20 wow tpfadeUp" data-wow-delay=".2s">
                  Built In-House &amp; <b>Delivered</b> Globally
                </h2>
              </div>
              <p className="dm-port-subtitle wow tpfadeUp" data-wow-delay=".3s">
                From proprietary AI ventures to high-growth startups — every product reflects engineering excellence.
              </p>
            </div>
            <div className="col-lg-5 d-flex align-items-end justify-content-lg-end mt-4 mt-lg-0 wow tpfadeUp" data-wow-delay=".35s">
              <div className="dm-port-count"><strong>40+</strong> Global Brands &amp; Ventures</div>
            </div>
          </div>

          {/* ── GROUP 1: OUR OWN VENTURES ── */}
          <div className="dm-port-block" id="our-own-ventures">
            <div className="dm-port-group-heading">
              <span className="dm-port-group-num">01</span>
              <h3 className="dm-port-group-title">Our Own Ventures</h3>
              <span className="dm-port-group-tag">In-House Lab</span>
            </div>
            <p className="dm-port-group-desc">Products we ideated, built and launched ourselves</p>
            <div className="dm-ventures-grid">
              {own_ventures.map((item, i) => (
                <VentureCard key={item.id} item={item} index={i} />
              ))}
            </div>
          </div>

          {/* ── GROUP 2: STARTUPS WE'VE HELPED BUILD ── */}
          <div className="dm-port-block" id="startups-helped-build">
            <div className="dm-port-group-heading">
              <span className="dm-port-group-num">02</span>
              <h3 className="dm-port-group-title">Startups We've Helped Build</h3>
            </div>
            <p className="dm-port-group-desc">Client products and startups we engineered, designed, and scaled globally</p>

            {/* Live badge */}
            <div className="dm-marquee-count-badge wow tpfadeUp" data-wow-delay=".1s">
              <span className="badge-dot"></span>
              {client_ventures.length} active brands &amp; startups worldwide
            </div>

            {/* ── Marquee: Row 1 → Left ── */}
            <div className="dm-marquee-section">
              <MarqueeRow items={row1} direction="left"  speed={38} />
              <MarqueeRow items={row2} direction="right" speed={34} />
            </div>

            {/* ── CTA ── */}
            <div className="dm-port-cta-wrap wow tpfadeUp">
              <div className="dm-port-cta-left">
                <strong>Want to see the full picture?</strong>
                <span>Request our full portfolio with case studies, tech stacks &amp; live demos</span>
              </div>
              <button className="dm-port-cta-btn" onClick={() => setShowPortfolioForm(true)}>
                Request Full Portfolio
                <span className="dm-port-cta-icon"><i className="fal fa-long-arrow-right"></i></span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* ── MODAL ── */}
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
                <p>We'll send our full portfolio to your email shortly.</p>
              </div>
            ) : (
              <>
                <span className="dm-modal-eyebrow">Portfolio Access</span>
                <h2 className="dm-modal-title">Request Full Portfolio</h2>
                <p className="dm-modal-desc">Fill in your details and we'll send our complete showcase with case studies and technical breakdowns.</p>
                <form onSubmit={handleFormSubmit}>
                  <div className="dm-modal-field">
                    <label>Full Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleFormChange} placeholder="Your name" required />
                  </div>
                  <div className="dm-modal-field">
                    <label>Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={handleFormChange} placeholder="you@company.com" required />
                  </div>
                  <div className="dm-modal-field">
                    <label>Contact Number</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleFormChange} placeholder="+971 50 123 4567" />
                  </div>
                  <div className="dm-modal-field">
                    <label>Message <span style={{ fontWeight: 400, color: '#9ca3af' }}>(optional)</span></label>
                    <textarea name="message" rows={3} value={formData.message} onChange={handleFormChange} placeholder="Tell us about your project..." />
                  </div>
                  <button type="submit" className="dm-modal-submit" disabled={formStatus === 'sending'}>
                    {formStatus === 'sending' ? 'Sending...' : 'Send Request'}
                    {formStatus !== 'sending' && <i className="fal fa-long-arrow-right" style={{ marginLeft: 10 }}></i>}
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