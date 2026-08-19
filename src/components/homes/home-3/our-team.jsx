import team_data from "@/src/data/team-data";
import Link from "next/link";
import React from "react";

const partners = team_data.filter(member => [1, 101, 102].includes(member.id));

const flagMap = {
  "Oman": "🇴🇲",
  "UAE": "🇦🇪",
  "Cyprus": "🇨🇾",
  "USA": "🇺🇸",
};

const getFlag = (title) => {
  const match = Object.keys(flagMap).find(k => title.includes(k));
  return match ? flagMap[match] : "🌍";
};

const OurTeam = () => {
  return (
    <>
      <div className="dm-partners-section">
        <div className="container">

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 50 }}>
            <p className="dm-partners-eyebrow">We Are Operating Globally</p>
            <h2 className="dm-partners-title wow tpfadeUp">
              OUR <span style={{ color: "#bd2120" }}>PARTNERS</span>
            </h2>
            <p className="dm-partners-subtitle">
              A worldwide network of trusted regional partners — extending our reach across continents and cultures.
            </p>
          </div>

          <div className="dm-partners-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)", maxWidth: 900, margin: "0 auto" }}>
            {partners.map((member) => {
              const flag = getFlag(member.title);
              const country = member.title.replace("Partner in ", "").trim();
              return (
                <div className="dm-partner-card wow tpfadeUp" key={member.id} data-wow-delay={member.delay}>
                  <div className="dm-partner-img-wrap">
                    <img src={member.img} alt={member.name} />
                  </div>
                  <h3 className="dm-partner-name">
                    {member.name}
                    <span className="dm-partner-flag">{flag}</span>
                  </h3>
                  <span className="dm-partner-role">Regional Partner</span>
                  <p className="dm-partner-bio">
                    <i className="fal fa-map-marker-alt" style={{ fontSize: 12, color: "#bd2120", marginRight: 6 }}></i>
                    {country}
                  </p>
                  <div className="dm-partner-socials">
                    {member.link && (
                      <Link href={member.link} target="_blank" className="dm-partner-icon-btn dm-linkedin" title="LinkedIn Profile">
                        <i className="fab fa-linkedin-in"></i>
                      </Link>
                    )}
                    {member.instagram && (
                      <Link href={member.instagram} target="_blank" className="dm-partner-icon-btn dm-instagram" title="Instagram">
                        <i className="fab fa-instagram"></i>
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
    </>
  );
};

export default OurTeam;
