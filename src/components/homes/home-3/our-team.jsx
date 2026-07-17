import team_data from "@/src/data/team-data";
import Link from "next/link";
import React from "react";

const partners = team_data.filter(member => member.id === 1); // Ahmed (Oman)

const flagMap = {
  "Oman": "🇴🇲",
  "Cyprus": "🇨🇾",
  "USA": "🇺🇸",
  "Cyrpus": "🇨🇾",
};

const getFlag = (title) => {
  const match = Object.keys(flagMap).find(k => title.includes(k));
  return match ? flagMap[match] : "🌍";
};

const OurTeam = () => {
  return (
    <>
      <style>{`
        /* ── Global Partners Section ── */
        .dm-partners-section {
          padding: 100px 0 110px;
          background: #fafafa;
          border-top: 1px solid #f0f0f0;
          position: relative;
        }

        .dm-partners-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 56px;
          flex-wrap: wrap;
          gap: 20px;
        }

        .dm-partners-subtitle-text {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: #9ca3af;
          display: block;
          margin-bottom: 12px;
        }

        .dm-partners-tagline {
          font-size: 15px;
          color: #6b7280;
          max-width: 360px;
          line-height: 1.65;
        }

        /* ── Partner Cards Grid ── */
        .dm-partner-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
          max-width: 800px;
          margin: 0 auto;
        }
        @media (max-width: 575px) { .dm-partner-grid { grid-template-columns: 1fr; } }

        .dm-partner-card {
          background: #fff;
          border: 1px solid #f0f0f0;
          border-radius: 14px;
          padding: 36px 28px 28px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          transition: box-shadow 0.25s ease, transform 0.25s ease;
          position: relative;
          overflow: hidden;
        }
        .dm-partner-card::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #c0392b, #e74c3c);
          opacity: 0;
          transition: opacity 0.25s ease;
        }
        .dm-partner-card:hover {
          box-shadow: 0 16px 48px rgba(0,0,0,0.08);
          transform: translateY(-4px);
        }
        .dm-partner-card:hover::after { opacity: 1; }

        .dm-partner-photo-wrap {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          overflow: hidden;
          margin-bottom: 20px;
          border: 3px solid #f3f4f6;
          flex-shrink: 0;
        }
        .dm-partner-photo-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .dm-partner-flag {
          position: absolute;
          top: 24px; right: 24px;
          font-size: 28px;
          line-height: 1;
        }

        .dm-partner-role {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.8px;
          text-transform: uppercase;
          color: #c0392b;
          margin-bottom: 6px;
        }

        .dm-partner-name {
          font-size: 18px;
          font-weight: 800;
          color: #0d0d0d;
          letter-spacing: -0.3px;
          margin-bottom: 8px;
        }

        .dm-partner-location {
          font-size: 13px;
          color: #9ca3af;
          display: flex;
          align-items: center;
          gap: 5px;
          margin-bottom: 20px;
        .dm-partner-links {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: auto;
        }

        .dm-partner-linkedin {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 12.5px;
          font-weight: 700;
          color: #0d0d0d;
          text-decoration: none;
          border: 1.5px solid #e5e7eb;
          padding: 7px 14px;
          border-radius: 6px;
          transition: all 0.2s ease;
        }
        .dm-partner-linkedin:hover {
          background: #0d0d0d;
          color: #fff;
          border-color: #0d0d0d;
        }

        /* ── Bottom trust bar ── */
        .dm-partners-trust {
          margin-top: 56px;
          padding-top: 40px;
          border-top: 1px solid #f0f0f0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
        }
        .dm-partners-trust-text {
          font-size: 13.5px;
          color: #9ca3af;
          font-weight: 500;
        }
        .dm-partners-trust-flags {
          display: flex;
          gap: 8px;
          font-size: 22px;
        }
      `}</style>

      <div className="dm-partners-section">
        <div className="container">

          {/* Header */}
          <div className="dm-partners-header">
            <div>
              <span className="tp-section__subtitle shadow-none text-grey p-0 mb-15">
                We Are Operating Globally
              </span>
              <h2 className="tp-section__title mb-0 wow tpfadeUp">
                OUR <b className="text-red-700">PARTNERS</b>
              </h2>
            </div>
            <p className="dm-partners-tagline">
              A worldwide network of trusted regional partners — extending our reach across continents and cultures.
            </p>
          </div>

          {/* Partner Cards */}
          <div className="dm-partner-grid">
            {partners.map((member) => {
              const flag = getFlag(member.title);
              const country = member.title.replace("Partner in ", "").trim();
              return (
                <div className="dm-partner-card wow tpfadeUp" key={member.id} data-wow-delay={member.delay}>
                  <span className="dm-partner-flag">{flag}</span>
                  <div className="dm-partner-photo-wrap">
                    <img src={member.img} alt={member.name} />
                  </div>
                  <span className="dm-partner-role">Regional Partner</span>
                  <h3 className="dm-partner-name">{member.name}</h3>
                  <span className="dm-partner-location">
                    <i className="fal fa-map-marker-alt" style={{ fontSize: 11 }}></i>
                    {country}
                  </span>
                  <div className="dm-partner-links">
                    {member.link && (
                      <Link href={member.link} target="_blank" className="dm-partner-linkedin">
                        <i className="fab fa-linkedin"></i>
                        View Profile
                      </Link>
                    )}
                    {member.website && (
                      <Link href={member.website} target="_blank" className="dm-partner-linkedin">
                        <i className="fal fa-globe"></i>
                        Website
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Trust bar */}
          {/* <div className="dm-partners-trust">
            <span className="dm-partners-trust-text">Active presence across 4+ continents</span>
            <div className="dm-partners-trust-flags">
              <span title="Oman">🇴🇲</span>
              <span title="Cyprus">🇨🇾</span>
              <span title="USA">🇺🇸</span>
              <span title="UAE">🇦🇪</span>
              <span title="UK">🇬🇧</span>
              <span title="Poland">🇵🇱</span>
              <span title="Qatar">🇶🇦</span>
            </div>
          </div> */}

        </div>
      </div>
    </>
  );
};

export default OurTeam;
