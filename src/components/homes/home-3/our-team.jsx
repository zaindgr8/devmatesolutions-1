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
      <style dangerouslySetInnerHTML={{ __html: `
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
          font-size: 12.5px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #c0392b;
          margin-bottom: 8px;
          display: block;
        }

        .dm-partners-title {
          font-size: clamp(28px, 4vw, 42px);
          font-weight: 800;
          color: #0d0d0d;
          line-height: 1.2;
          margin: 0;
        }

        .dm-partners-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        @media (max-width: 991px) {
          .dm-partners-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
        }
        @media (max-width: 575px) {
          .dm-partners-grid { grid-template-columns: 1fr; }
        }

        /* Card design */
        .dm-partner-card {
          background: #ffffff;
          border-radius: 16px;
          border: 1px solid #e5e7eb;
          padding: 32px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          transition: all 0.3s ease;
          position: relative;
        }

        .dm-partner-card:hover {
          transform: translateY(-4px);
          border-color: rgba(192,57,43,0.3);
          box-shadow: 0 16px 36px rgba(0,0,0,0.08);
        }

        .dm-partner-flag {
          font-size: 28px;
          line-height: 1;
        }

        .dm-partner-role {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.6px;
          text-transform: uppercase;
          color: #bd2120;
          margin-bottom: 4px;
        }

        .dm-partner-name {
          font-size: 18px;
          font-weight: 800;
          color: #0d0d0d;
          letter-spacing: -0.3px;
          margin-bottom: 6px;
        }

        .dm-partner-location {
          font-size: 13px;
          color: #6b7280;
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 20px;
        }

        .dm-partner-links {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: auto;
        }

        .dm-partner-icon-btn {
          width: 42px;
          height: 42px;
          border-radius: 10px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          color: #334155;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 17px;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .dm-partner-icon-btn.dm-linkedin:hover {
          background: #0077b5;
          border-color: #0077b5;
          color: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 119, 181, 0.3);
        }

        .dm-partner-icon-btn.dm-website:hover {
          background: #bd2120;
          border-color: #bd2120;
          color: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(189, 33, 32, 0.3);
        }
      `}</style>

      {/* OUR PARTNERS section — temporarily hidden */}
      {false && (
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
                    <div className="dm-partner-location">
                      <i className="fal fa-map-marker-alt" style={{ fontSize: 12, color: "#bd2120" }}></i>
                      {country}
                    </div>
                    <div className="dm-partner-links">
                      {member.link && (
                        <Link href={member.link} target="_blank" className="dm-partner-icon-btn dm-linkedin" title="LinkedIn Profile">
                          <i className="fab fa-linkedin-in"></i>
                        </Link>
                      )}
                      {member.website && (
                        <Link href={member.website} target="_blank" className="dm-partner-icon-btn dm-website" title="Personal Website">
                          <i className="fal fa-globe"></i>
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default OurTeam;
