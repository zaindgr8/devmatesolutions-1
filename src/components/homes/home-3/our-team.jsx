import team_data from "@/src/data/team-data";
import Link from "next/link";
import React from "react";

const allRegional = team_data.filter((m) => [1, 101, 102, 103].includes(m.id));
const partners = allRegional.filter((m) => m.category === "partner");
const representatives = allRegional.filter((m) => m.category === "representative");

/* ── Card (original style) ── */
const PartnerCard = ({ member }) => (
  <div className="dm-partner-card wow tpfadeUp" data-wow-delay={member.delay}>
    <div className="dm-partner-img-wrap">
      <img src={member.img} alt={member.name} />
    </div>
    <h3 className="dm-partner-name">{member.name}</h3>
    <p className="dm-partner-bio">
      <i className="fal fa-map-marker-alt" style={{ fontSize: 12, color: "#bd2120", marginRight: 6 }} />
      {member.country}
    </p>
    <div className="dm-partner-socials">
      {member.link && (
        <Link href={member.link} target="_blank" className="dm-partner-icon-btn dm-linkedin" title="LinkedIn Profile">
          <i className="fab fa-linkedin-in" />
        </Link>
      )}
      {member.instagram && (
        <Link href={member.instagram} target="_blank" className="dm-partner-icon-btn dm-instagram" title="Instagram">
          <i className="fab fa-instagram" />
        </Link>
      )}
      {member.website && (
        <Link href={member.website} target="_blank" className="dm-partner-icon-btn dm-website" title="Personal Website">
          <i className="fal fa-globe" />
        </Link>
      )}
    </div>
  </div>
);

/* ── Sub-section ── */
const SubSection = ({ badge, label, members, centered }) => (
  <div className="dm-subsection">
    <div className="dm-subsection-header">
      <span className="dm-subsection-badge">{badge}</span>
      <h3 className="dm-subsection-title">{label}</h3>
      <div className="dm-subsection-line" />
    </div>
    <div
      className="dm-partners-grid"
      style={centered ? { maxWidth: members.length * 310, margin: "0 auto" } : undefined}
    >
      {members.map((m) => (
        <PartnerCard key={m.id} member={m} />
      ))}
    </div>
  </div>
);

const OurTeam = () => (
  <div className="dm-partners-section">
    <div className="container">

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <p className="dm-partners-eyebrow">We Are Operating Globally</p>
        <h2 className="dm-partners-title wow tpfadeUp">
          OUR <span style={{ color: "#bd2120" }}>REGIONAL NETWORK</span>
        </h2>
        <p className="dm-partners-subtitle">
          A worldwide network of trusted regional partners &amp; representatives — extending our reach across continents and cultures.
        </p>
      </div>

      {/* Regional Partners */}
      <SubSection badge="01" label="Regional Partners" members={partners} centered />

      {/* Divider */}
      <div className="dm-section-divider" />

      {/* Regional Representatives */}
      <SubSection badge="02" label="Regional Representatives" members={representatives} centered={false} />

    </div>
  </div>
);

export default OurTeam;
