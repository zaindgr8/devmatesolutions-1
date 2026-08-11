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
