import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import HeaderThree from "@/src/layout/headers/header-3";
import FooterThree from "@/src/layout/footers/footer-3";
import FormModal from "@/src/components/FormModal";

// ─── Response-time leak rates (% of leads lost) ───────────────────
const RESPONSE_LEAK = {
  "under5":  0.05,
  "under1h": 0.25,
  "6plus":   0.55,
  "nextday": 0.75,
};

const RESPONSE_OPTIONS = [
  { key: "under5",  label: "Under 5 min" },
  { key: "under1h", label: "Within an hour" },
  { key: "6plus",   label: "6+ hours" },
  { key: "nextday", label: "Next day" },
];

const getSuggestedPackage = (leadCount) => {
  if (leadCount <= 80) {
    return {
      name: "Speed-to-Lead",
      price: "AED 2,490 / mo",
      badge: "Best Fit for Your Volume",
      reason: "Optimized for boutique teams (3–10 agents) handling up to 1,000 monthly conversations.",
    };
  } else if (leadCount <= 220) {
    return {
      name: "Pipeline",
      price: "AED 4,900 / mo",
      badge: "Recommended for Your Volume",
      reason: "Covers 10–40 agents with inbound voice, full portal sync, and 4,000 monthly conversations.",
    };
  } else if (leadCount <= 420) {
    return {
      name: "Brokerage Command",
      price: "AED 9,900 / mo",
      badge: "High-Volume Powerhouse",
      reason: "Full multi-channel triage, closed-deal attribution, and 12,000 conversations for 40–100 agents.",
    };
  } else {
    return {
      name: "Developer / Master Broker",
      price: "From AED 25,000 / mo",
      badge: "Enterprise Launch Grade",
      reason: "Unlimited conversation capacity, project launch triage, and automated sub-broker distribution.",
    };
  }
};

// ─── Lead Leak Calculator ─────────────────────────────────────────
function LeadLeakCalculator({ onCtaClick, onSuggestTier }) {
  const [mode, setMode] = useState("basic"); // "basic" | "advanced"

  // Shared inputs
  const [leads, setLeads] = useState(80);
  const [commission, setCommission] = useState(40000);
  const [responseTime, setResponseTime] = useState("6plus");

  // Advanced-only inputs
  const [closeRate, setCloseRate] = useState(3);
  const [portalSpend, setPortalSpend] = useState(15000);

  const calcRef = useRef(null);

  // Suggested Package
  const suggestedPackage = getSuggestedPackage(leads);

  useEffect(() => {
    if (onSuggestTier) {
      onSuggestTier(suggestedPackage.name);
    }
  }, [leads, onSuggestTier]);

  // ── Core calculations (shared) ──
  const leakRate = RESPONSE_LEAK[responseTime];
  // Basic uses fixed 3% close rate, advanced uses slider
  const effectiveClose = mode === "basic" ? 3 : closeRate;
  const leadsLost = Math.round(leads * leakRate);
  const dealsLost = Math.round(leadsLost * (effectiveClose / 100));
  const monthlyLeak = dealsLost * commission;
  const annualLeak = monthlyLeak * 12;

  const recoveredLeads = Math.round(leadsLost * 0.85);
  const recoveredDeals = Math.round(recoveredLeads * (effectiveClose / 100));
  const monthlyRecovery = recoveredDeals * commission;

  const roi = monthlyRecovery > 0 ? Math.round(monthlyRecovery / 2490) : 0;
  const currentVal = Math.round(leads * (1 - leakRate) * (effectiveClose / 100) * commission);
  const portalEff = portalSpend > 0 ? Math.round((currentVal / portalSpend) * 10) / 10 : 0;

  const fmt = (n) => "AED " + n.toLocaleString("en-AE");

  const leakSeverity =
    leakRate <= 0.05 ? { label: "Low Risk", color: "#10b981", bg: "#f0fdf4" }
    : leakRate <= 0.25 ? { label: "Moderate", color: "#f59e0b", bg: "#fffbeb" }
    : leakRate <= 0.55 ? { label: "High Risk", color: "#bd2120", bg: "#fef2f2" }
    : { label: "Critical", color: "#7f1d1d", bg: "#fee2e2" };

  // Shared sub-components
  const SliderField = ({ label, min, max, step, value, onChange, displayVal }) => {
    const pct = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
    return (
      <div className="ailm-calc-field">
        <div className="ailm-calc-field-header">
          <label>{label}</label>
          <span className="ailm-calc-value">{displayVal ?? value}</span>
        </div>
        <input
          type="range" min={min} max={max} step={step}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="ailm-slider"
          style={{
            background: `linear-gradient(to right, #bd2120 0%, #bd2120 ${pct}%, #e5e7eb ${pct}%, #e5e7eb 100%)`
          }}
        />
        <div className="ailm-calc-field-hints">
          <span>{min.toLocaleString()}</span>
          <span>{max.toLocaleString()}</span>
        </div>
      </div>
    );
  };

  const ResponseButtons = () => (
    <div className="ailm-calc-field">
      <label style={{ fontWeight: 700, fontSize: 14, color: "#374151", marginBottom: 10, display: "block" }}>
        Your current average response time
      </label>
      <div className="ailm-resp-grid">
        {RESPONSE_OPTIONS.map(opt => (
          <button
            key={opt.key}
            className={`ailm-resp-btn ${responseTime === opt.key ? "ailm-resp-btn--active" : ""}`}
            onClick={() => setResponseTime(opt.key)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );

  const ResultsPanel = () => (
    <div className="ailm-calc-results">
      {/* Leak block */}
      <div className="ailm-calc-stat-block ailm-calc-stat-block--leak">
        <p className="ailm-calc-stat-label">You're leaking about</p>
        <p className="ailm-calc-stat-big ailm-calc-stat-big--red">{fmt(monthlyLeak)}</p>
        <p className="ailm-calc-stat-sub">
          {leadsLost} leads lost every month to slow response
        </p>
      </div>

      {/* Recovery block */}
      <div className="ailm-calc-stat-block ailm-calc-stat-block--recover">
        <div className="ailm-calc-recover-label">
          <i className="fal fa-robot" style={{ marginRight: 6, color: "#10b981" }}></i>
          Recoverable with AI
        </div>
        <p className="ailm-calc-stat-big ailm-calc-stat-big--green">{fmt(monthlyRecovery)} / mo</p>
        <p className="ailm-calc-stat-sub" style={{ color: "#374151" }}>
          AI replies in <strong style={{ color: "#bd2120" }}>&lt; 60 seconds</strong> · 24/7 — on WhatsApp &amp; web.
        </p>
      </div>

      {/* Suggested Package recommendation card */}
      <div className="ailm-calc-suggested-pkg">
        <div className="ailm-calc-suggested-header">
          <span className="ailm-calc-suggested-badge">
            <i className="fal fa-sparkles" style={{ marginRight: 5 }}></i>
            Recommended Package
          </span>
          <a
            href="#pricing"
            className="ailm-calc-suggested-link"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById("pricing");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Compare all tiers <i className="fal fa-arrow-down" style={{ fontSize: 11 }}></i>
          </a>
        </div>
        <div className="ailm-calc-suggested-body">
          <div className="ailm-calc-suggested-tier-info">
            <h4 className="ailm-calc-suggested-name">{suggestedPackage.name}</h4>
            <span className="ailm-calc-suggested-price">{suggestedPackage.price}</span>
          </div>
          <p className="ailm-calc-suggested-reason">{suggestedPackage.reason}</p>
        </div>
      </div>

      {/* Advanced extras */}
      {mode === "advanced" && (
        <div className="ailm-calc-stat-row">
          <div className="ailm-calc-mini-stat">
            <span className="ailm-calc-mini-num" style={{ color: "#bd2120" }}>{fmt(annualLeak)}</span>
            <span className="ailm-calc-mini-label">Annual leak</span>
          </div>
          <div className="ailm-calc-mini-divider"></div>
          <div className="ailm-calc-mini-stat">
            <span className="ailm-calc-mini-num" style={{ color: "#10b981" }}>{roi}×</span>
            <span className="ailm-calc-mini-label">ROI vs plan cost</span>
          </div>
          <div className="ailm-calc-mini-divider"></div>
          <div className="ailm-calc-mini-stat">
            <span className="ailm-calc-mini-num" style={{ color: "#0077b5" }}>{portalEff}×</span>
            <span className="ailm-calc-mini-label">Portal efficiency</span>
          </div>
        </div>
      )}

      {/* CTA */}
      <button className="ailm-calc-cta" onClick={onCtaClick} id="calc-cta-audit">
        Get my full breakdown &amp; audit
        <i className="fal fa-long-arrow-right" style={{ marginLeft: 8 }}></i>
      </button>

      <p className="ailm-calc-disclaimer">
        Estimate based on speed-to-lead benchmarks (assumes ~{effectiveClose}% lead-to-deal close rate). Book a consultation for a figure mapped to your funnel.
      </p>
    </div>
  );

  return (
    <section className="ailm-calc-section" ref={calcRef}>
      <div className="container">
        {/* Header */}
        <div className="ailm-calc-header">
          <p className="ailm-eyebrow">Lead Leakage Calculator</p>
          <h2 className="ailm-section-title">What are slow lead replies costing you?</h2>
          <p className="ailm-section-sub">
            Slide in your numbers — see the AED you're leaking every month, and how much AI can recover.
          </p>

          {/* ── Mode toggle ── */}
          <div className="ailm-calc-toggle">
            <button
              className={`ailm-calc-toggle-btn ${mode === "basic" ? "ailm-calc-toggle-btn--active" : ""}`}
              onClick={() => setMode("basic")}
              id="calc-toggle-basic"
            >
              Basic Calculation
            </button>
            <button
              className={`ailm-calc-toggle-btn ${mode === "advanced" ? "ailm-calc-toggle-btn--active" : ""}`}
              onClick={() => setMode("advanced")}
              id="calc-toggle-advanced"
            >
              Advanced Calculation
            </button>
          </div>
        </div>

        {/* Calculator card */}
        <div className="ailm-calc-card">
          {/* LEFT: Inputs */}
          <div className="ailm-calc-inputs">
            <SliderField
              label="Leads per month"
              min={10} max={500} step={5}
              value={leads} onChange={setLeads}
            />
            <SliderField
              label="Avg commission per deal (AED)"
              min={5000} max={200000} step={1000}
              value={commission} onChange={setCommission}
              displayVal={commission.toLocaleString()}
            />

            {/* Advanced-only sliders */}
            {mode === "advanced" && (
              <>
                <SliderField
                  label="Your lead-to-deal close rate"
                  min={1} max={20} step={0.5}
                  value={closeRate} onChange={setCloseRate}
                  displayVal={`${closeRate}%`}
                />
                <SliderField
                  label="Monthly portal spend (AED)"
                  min={0} max={100000} step={500}
                  value={portalSpend} onChange={setPortalSpend}
                  displayVal={portalSpend.toLocaleString()}
                />
              </>
            )}

            <ResponseButtons />
          </div>

          {/* RIGHT: Results */}
          <ResultsPanel />
        </div>
      </div>
    </section>
  );
}

const pricingTiers = [
  {
    name: "Speed-to-Lead",
    monthly: "AED 2,490",
    setup: "AED 7,500",
    bestFor: "3–10 agents",
    highlight: false,
    channels: "WhatsApp, web, 1 portal",
    voice: "300 inbound min",
    conversations: "1,000 / mo",
    languages: "EN + AR",
    leadScoring: "Basic",
    crm: "1 integration",
    routing: "Round-robin",
    compliance: "DNCR + consent log",
    dashboard: "Speed-to-lead",
    overage: "AED 1.20/min · AED 2/conv",
  },
  {
    name: "Pipeline",
    monthly: "AED 4,900",
    setup: "AED 12,000",
    bestFor: "10–40 agents",
    highlight: true,
    badge: "Most Popular",
    channels: "+ inbound voice, all portals, Meta & Google",
    voice: "1,000 inbound + 200 outbound",
    conversations: "4,000 / mo",
    languages: "EN + AR + 2",
    leadScoring: "Full 6-signal scoring",
    crm: "2 + deduplication",
    routing: "Skill & area based",
    compliance: "+ full audit trail",
    dashboard: "+ transcripts, recordings",
    overage: "AED 1.00/min · AED 1.50/conv",
  },
  {
    name: "Brokerage Command",
    monthly: "AED 9,900",
    setup: "AED 20,000",
    bestFor: "40–100 agents",
    highlight: false,
    channels: "+ Instagram, Botim, multi-number",
    voice: "3,000 inbound + 800 outbound",
    conversations: "12,000 / mo",
    languages: "Unlimited",
    leadScoring: "+ attribution to closed deal",
    crm: "Custom + dedup across all sources",
    routing: "+ senior-closer escalation",
    compliance: "+ PDPL pack, quarterly review",
    dashboard: "+ attribution, agent leaderboard",
    overage: "AED 0.80/min · AED 1/conv",
  },
  {
    name: "Developer / Master Broker",
    monthly: "From AED 25,000",
    setup: "From AED 45,000",
    bestFor: "Launches, 30–60 sub-brokers",
    highlight: false,
    channels: "+ full channel partner network",
    voice: "Custom",
    conversations: "Unlimited",
    languages: "Unlimited",
    leadScoring: "+ real-time launch triage",
    crm: "Custom + sub-broker routing",
    routing: "+ sub-broker distribution",
    compliance: "+ dedicated compliance review",
    dashboard: "+ partner performance",
    overage: "Contracted",
  },
];

const agents = [
  {
    num: "01",
    name: "Messaging Lead Agent",
    desc: "Replies to every WhatsApp, portal, web and Instagram lead in seconds, day or night. Qualifies budget, area and intent in Arabic and English, books the viewing, and hands a warm scored lead to your broker.",
    icon: "fal fa-comments",
    color: "#bd2120",
  },
  {
    num: "02",
    name: "Lead Scoring & Qualification",
    desc: "Reads every chat and portal enquiry and scores real buying intent from budget signals, questions and engagement — so your team calls the ready-to-transact buyers first.",
    icon: "fal fa-chart-bar",
    color: "#0077b5",
  },
  {
    num: "03",
    name: "Messaging-to-CRM Automation",
    desc: "Every conversation lands in PropSpace, Salesforce or your CRM automatically — logged, tagged by intent, follow-ups triggered, and the right broker alerted the moment a lead goes hot.",
    icon: "fal fa-database",
    color: "#10b981",
  },
  {
    num: "04",
    name: "Listing & Project Retrieval",
    desc: "Every answer is grounded in your live inventory, off-plan project documents, payment plans and policies. Buyers get accurate replies on availability, pricing and handover dates.",
    icon: "fal fa-building",
    color: "#f59e0b",
  },
  {
    num: "05",
    name: "Multilingual Coverage",
    desc: "Serves Dubai's international buyers in their own language — Arabic, English, Russian, Hindi, Chinese and more — inside WhatsApp, Botim, Instagram and your website.",
    icon: "fal fa-globe",
    color: "#8b5cf6",
  },
  {
    num: "06",
    name: "Viewing & Nurture Automation",
    desc: "Automates viewing scheduling, reminders and post-viewing follow-up so fewer slots are wasted and no warm buyer goes quiet. Nurtures long-cycle and off-plan buyers until they commit.",
    icon: "fal fa-calendar-check",
    color: "#ec4899",
  },
];

const onboardingSteps = [
  { step: "1", title: "Share your site & portal access", desc: "Our AI reads your listings, areas and services and drafts your agent.", time: "20 min" },
  { step: "2", title: "Lead Leak Audit", desc: "We measure your current response times and how many enquiries went unanswered last month.", time: "None (we do it)" },
  { step: "3", title: "Script & flow approved", desc: "Your full qualifying script and conversation flow in Arabic and English. You review and sign off before anything is built.", time: "45 min" },
  { step: "4", title: "Numbers, portals & CRM connected", desc: "We provision your +971 line, connect Bayut, Property Finder and Dubizzle, and wire your CRM.", time: "One approval" },
  { step: "5", title: "Compliance configured", desc: "DNCR screening, consent capture, recording notices and audit logging. You receive your PDPL pack.", time: "Sign the DPA" },
  { step: "6", title: "Live test with your team", desc: "Real calls and WhatsApp threads in both languages, with your agents watching. Tuned on the spot.", time: "1 hour" },
  { step: "7", title: "Go live & handover", desc: "Dashboard access, agent training, escalation contact, and a 30-day tuning window.", time: "30 min" },
];

const faqs = [
  {
    q: "Will this replace my brokers?",
    a: "No. It handles the first few minutes of every lead — response and qualification — and hands ready buyers to your agents with full context. Your closers spend their time closing, not chasing and re-typing the same five questions.",
  },
  {
    q: "Does it really work in Arabic?",
    a: "Yes, and we prove it before go-live. The agent detects and replies natively in Arabic or English, and we test intent accuracy against thirty real recorded calls from your own line as a condition of handover. Gulf dialect handling is where most generic tools fail.",
  },
  {
    q: "Can it connect to Bayut, Property Finder and my CRM?",
    a: "Yes. Leads are ingested from the portals, your website, ad channels and WhatsApp, and qualified leads are pushed with the full conversation into your CRM. Integration depth is scoped up front.",
  },
  {
    q: "How is this different from a website chatbot?",
    a: "A chatbot answers questions on one channel. This works across every channel, runs your qualifying script, books viewings, routes to the right agent, and is measured on speed-to-lead and qualified-lead lift.",
  },
  {
    q: "Is using AI to process buyer data legal under UAE PDPL?",
    a: "Yes, when built correctly. PDPL requires explicit, revocable consent. This system captures consent, honours revocation, and handles residency by design, with full documentation.",
  },
  {
    q: "How quickly will we see results?",
    a: "Response times change on day one of go-live. Booked-viewing volume typically moves within the first two to three weeks, and your baseline report lets you measure the difference.",
  },
];

export default function AILeadManagement() {
  const [modalConfig, setModalConfig] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [suggestedTier, setSuggestedTier] = useState("Pipeline");

  const openHeroAuditModal = () => {
    setModalConfig({
      title: "Get Call For Lead Leak Audit",
      subtitle: "Fill in your details — receive a call from DevMate Solutions within 60 seconds to discuss your audit",
      badgeLabel: "LIVE CALL",
      badgeSub: "Instant 60-Second Lead Audit Call",
      badgeHighlight: "Speed-to-lead analysis & confidential revenue recovery projection",
      source: "AI Lead Management — Hero (Call for Lead Leak Audit)",
      buttonText: "Get Call in 60 Seconds",
      triggerCall: true,
    });
  };

  const openCalcAuditModal = () => {
    setModalConfig({
      title: "Claim Your Lead Leak Audit",
      subtitle: "Fill in your details to receive your customized pipeline recovery plan",
      badgeLabel: "RECOVERY PLAN",
      badgeSub: "Based on your calculator estimate",
      badgeHighlight: "Custom ROI projection and agent setup plan",
      source: "AI Lead Management — Calculator Result (Audit Claim)",
      buttonText: "Claim Recovery Plan",
    });
  };

  const openBandAuditModal = () => {
    setModalConfig({
      title: "Book the Lead Leak Audit — AED 2,500",
      subtitle: "Full fee is credited in full against setup when you proceed",
      badgeLabel: "AUDIT",
      badgeSub: "AED 2,500 Credited to Setup",
      badgeHighlight: "Live response time measurement & DNCR exposure report",
      source: "AI Lead Management — Mid-Page CTA Band (Lead Leak Audit)",
      buttonText: "Book Lead Leak Audit",
    });
  };

  const openPricingTierModal = (tier) => {
    setModalConfig({
      title: `Get Started with ${tier.name}`,
      subtitle: `Setup & onboarding for the ${tier.name} tier (${tier.monthly}/mo)`,
      badgeLabel: tier.name.toUpperCase(),
      badgeSub: `${tier.monthly} / month`,
      badgeHighlight: `${tier.conversations} conversations · Setup: ${tier.setup}`,
      source: `AI Lead Management — Pricing Tier (${tier.name})`,
      buttonText: `Select ${tier.name} Plan`,
    });
  };

  const openPilotModal = () => {
    setModalConfig({
      title: "Apply for the 60-Day Pilot",
      subtitle: "AED 9,500 (setup included) · If we miss agreed target, month 3 is free",
      badgeLabel: "60-DAY PILOT",
      badgeSub: "Guaranteed Performance SLA",
      badgeHighlight: "14-day setup & dedicated pipeline engineer",
      source: "AI Lead Management — 60-Day Pilot Application",
      buttonText: "Apply for 60-Day Pilot",
    });
  };

  const openFinalAuditModal = () => {
    setModalConfig({
      title: "Book the Lead Leak Audit — AED 2,500",
      subtitle: "Stop losing leads overnight — credited 100% against system setup",
      badgeLabel: "AUDIT",
      badgeSub: "AED 2,500 Credited to Setup",
      badgeHighlight: "Full portal & WhatsApp leak diagnosis",
      source: "AI Lead Management — Bottom CTA (Lead Leak Audit)",
      buttonText: "Book Lead Leak Audit",
    });
  };

  return (
    <>
      <Head>
        <title>AI Lead Management System for Dubai Real Estate | DevMate Solutions</title>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
        <meta
          name="description"
          content="Every portal enquiry answered in seconds, qualified in Arabic or English, and booked into an agent's calendar — around the clock. Built for Dubai real estate brokerages."
        />
        <meta property="og:title" content="AI Lead Management System | DevMate Solutions" />
        <meta property="og:description" content="Stop losing leads overnight. Our AI handles the first 15 minutes of every enquiry, 24/7, across Bayut, Property Finder, WhatsApp and more." />
      </Head>

      {modalConfig && (
        <FormModal
          isOpen={!!modalConfig}
          onClose={() => setModalConfig(null)}
          title={modalConfig.title}
          subtitle={modalConfig.subtitle}
          badgeLabel={modalConfig.badgeLabel}
          badgeSub={modalConfig.badgeSub}
          badgeHighlight={modalConfig.badgeHighlight}
          triggerCall={modalConfig.triggerCall}
          source={modalConfig.source}
          buttonText={modalConfig.buttonText}
        />
      )}

      <HeaderThree />

      <main className="ailm-page">
        {/* ─── HERO ─── */}
        <section className="ailm-hero">
          <div className="container">
            <div className="ailm-hero-badge">
              <span className="ailm-hero-dot"></span>
              Real Estate · AI Lead Management System
            </div>
            <h1 className="ailm-hero-headline">
              Every lead answered in{" "}
              <span className="ailm-red">seconds.</span>
              <br />
              Qualified. Booked. Logged.
            </h1>
            <p className="ailm-hero-sub">
              An AI Lead Management System built for Dubai brokerages — handles the first 15 minutes of every Bayut, Property Finder, WhatsApp and portal enquiry, around the clock, in Arabic and English.
            </p>
            <div className="ailm-hero-ctas">
              <button className="ailm-btn-primary" id="hero-get-audit" onClick={openHeroAuditModal}>
                Get Call For Lead Leak Audit
                <i className="fal fa-long-arrow-right ml-2"></i>
              </button>
              <Link href="#pricing" className="ailm-btn-ghost" id="hero-see-pricing">
                See Pricing
              </Link>
            </div>
            <div className="ailm-hero-metrics">
              <div className="ailm-metric">
                <span className="ailm-metric-num">&lt; 60s</span>
                <span className="ailm-metric-label">First Response</span>
              </div>
              <div className="ailm-metric-divider"></div>
              <div className="ailm-metric">
                <span className="ailm-metric-num">24 / 7</span>
                <span className="ailm-metric-label">Coverage</span>
              </div>
              <div className="ailm-metric-divider"></div>
              <div className="ailm-metric">
                <span className="ailm-metric-num">AR + EN</span>
                <span className="ailm-metric-label">20+ Languages</span>
              </div>
              <div className="ailm-metric-divider"></div>
              <div className="ailm-metric">
                <span className="ailm-metric-num">14 Days</span>
                <span className="ailm-metric-label">Go Live</span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── LEAD LEAK CALCULATOR ─── */}
        <LeadLeakCalculator
          onCtaClick={openCalcAuditModal}
          onSuggestTier={setSuggestedTier}
        />

        {/* ─── PROBLEM: WHERE DEALS LEAK ─── */}
        <section className="ailm-section ailm-section--light">
          <div className="container">
            <div className="ailm-section-header">
              <p className="ailm-eyebrow">The Real Problem</p>
              <h2 className="ailm-section-title">
                You don't have a lead problem.
                <br />
                You have a <span className="ailm-red">leak</span> problem.
              </h2>
              <p className="ailm-section-sub">
                Most brokerages assume they need more leads. The real bleed is the paid leads already in the funnel — slipping away inside conversations nobody can see.
              </p>
            </div>

            <div className="ailm-leak-grid">
              {[
                {
                  stage: "Stage 1",
                  title: "Night & weekend leads die unanswered",
                  desc: "An enquiry lands at 1 a.m. By the time anyone sees it, the buyer has booked a viewing with a competitor.",
                  fix: "24/7 AI answers every enquiry in seconds.",
                  impact: "1 recovered AED 1.7M sale = AED 34,000 at 2% commission",
                  icon: "fal fa-moon",
                },
                {
                  stage: "Stage 2",
                  title: "Agents drown in unqualified viewings",
                  desc: "Closers spend days driving to viewings with buyers who were never going to transact — wrong budget, wrong area, no finance.",
                  fix: "AI pre-qualifies every lead before agents spend a minute.",
                  icon: "fal fa-user-slash",
                },
                {
                  stage: "Stage 3",
                  title: "Lead data scattered across portals & WhatsApp",
                  desc: "The same buyer exists as a Bayut enquiry, a WhatsApp thread, a spreadsheet row, and a half-filled CRM record.",
                  fix: "One unified pipeline, deduplicated and enriched.",
                  icon: "fal fa-layer-group",
                },
                {
                  stage: "Stage 4",
                  title: "Portal spend with no attribution",
                  desc: "Heavy spend across Property Finder, Bayut, Dubizzle — but no way to tell which source produced which closed deal.",
                  fix: "Every enquiry tracked source-to-closed-deal.",
                  icon: "fal fa-chart-line",
                },
                {
                  stage: "Stage 5",
                  title: "Off-plan launches flood faster than triage",
                  desc: "A developer launches a tower and enquiries flood in. Hot buyers cool while juniors chase weak leads.",
                  fix: "Real-time triage routes hot buyers to senior closers instantly.",
                  icon: "fal fa-bolt",
                },
              ].map((item, i) => (
                <div className="ailm-leak-card" key={i}>
                  <div className="ailm-leak-icon">
                    <i className={item.icon}></i>
                  </div>
                  <span className="ailm-leak-stage">{item.stage}</span>
                  <h3 className="ailm-leak-title">{item.title}</h3>
                  <p className="ailm-leak-desc">{item.desc}</p>
                  <div className="ailm-leak-fix">
                    <i className="fal fa-check-circle" style={{ color: "#10b981", marginRight: 6 }}></i>
                    {item.fix}
                  </div>
                  {item.impact && (
                    <div className="ailm-leak-impact">{item.impact}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── PILOT CTA ─── */}
        <section className="ailm-cta-band">
          <div className="container">
            <div className="ailm-cta-band-inner">
              <div>
                <h3 className="ailm-cta-band-title">Start with a Lead Leak Audit — AED 2,500</h3>
                <p className="ailm-cta-band-sub">We measure your live response times, count unanswered enquiries last month, and report your DNCR exposure. The full fee is credited against setup if you proceed.</p>
              </div>
              <button className="ailm-btn-primary ailm-btn-white" id="band-cta-audit" onClick={openBandAuditModal}>
                Book the Audit
                <i className="fal fa-long-arrow-right ml-2"></i>
              </button>
            </div>
          </div>
        </section>

        {/* ─── THE SIX AGENTS ─── */}
        <section className="ailm-section">
          <div className="container">
            <div className="ailm-section-header">
              <p className="ailm-eyebrow">How It Works</p>
              <h2 className="ailm-section-title">Six AI Agents. One Seamless Pipeline.</h2>
              <p className="ailm-section-sub">
                In the UAE, buyers move on WhatsApp. Six specialised agents work every enquiry in sequence — answered, qualified, logged, and booked with no human awake.
              </p>
            </div>
            <div className="ailm-agents-grid">
              {agents.map((a, i) => (
                <div className="ailm-agent-card" key={i}>
                  <div className="ailm-agent-icon" style={{ background: `${a.color}15`, color: a.color }}>
                    <i className={a.icon}></i>
                  </div>
                  <span className="ailm-agent-num">{a.num}</span>
                  <h3 className="ailm-agent-name">{a.name}</h3>
                  <p className="ailm-agent-desc">{a.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CHATBOT vs AI SYSTEM ─── */}
        <section className="ailm-section ailm-section--light">
          <div className="container">
            <div className="ailm-section-header">
              <p className="ailm-eyebrow">Why Not Just a Chatbot?</p>
              <h2 className="ailm-section-title">One is a help widget.<br />The other is a <span className="ailm-red">sales instrument.</span></h2>
            </div>
            <div className="ailm-compare-table">
              <div className="ailm-compare-header">
                <div></div>
                <div className="ailm-compare-col-label">Generic Chatbot</div>
                <div className="ailm-compare-col-label ailm-compare-col-label--active">AI Lead Management</div>
              </div>
              {[
                ["Scope", "One channel — your website", "Every channel — portals, WhatsApp, phone, web, social"],
                ["Job", "Answers FAQs", "Runs your qualifying script and books viewings"],
                ["Knowledge", "Fixed script", "Grounded in live inventory and project documents"],
                ["Language", "Usually English only", "Native Arabic & English, plus additional languages"],
                ["Output", "A transcript", "A scored, routed, CRM-logged lead with a booked viewing"],
                ["Measured on", "Deflected questions", "Speed-to-lead and qualified-lead lift"],
                ["Compliance", "None", "DNCR screening, consent records, full audit trail"],
              ].map(([label, bad, good], i) => (
                <div className={`ailm-compare-row ${i % 2 === 0 ? "ailm-compare-row--alt" : ""}`} key={i}>
                  <div className="ailm-compare-label">{label}</div>
                  <div className="ailm-compare-bad">{bad}</div>
                  <div className="ailm-compare-good">
                    <i className="fal fa-check" style={{ color: "#10b981", marginRight: 6 }}></i>
                    {good}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CHANNELS ─── */}
        <section className="ailm-section">
          <div className="container">
            <div className="ailm-section-header">
              <p className="ailm-eyebrow">Every Channel. One System.</p>
              <h2 className="ailm-section-title">Connected to where your leads already are.</h2>
            </div>
            <div className="ailm-channels-grid">
              {[
                { label: "Portals", items: "Bayut · Property Finder · Dubizzle", icon: "fal fa-home" },
                { label: "Paid Media", items: "Meta Lead Forms · Google Ads", icon: "fal fa-ad" },
                { label: "Messaging", items: "WhatsApp · Instagram DM · Botim", icon: "fab fa-whatsapp" },
                { label: "Web", items: "Chat widget · Enquiry forms", icon: "fal fa-globe" },
                { label: "Phone", items: "Inbound +971 line · Missed-call callback", icon: "fal fa-phone" },
                { label: "CRM", items: "PropSpace · Bitrix24 · Zoho · HubSpot · Salesforce · Pipedrive", icon: "fal fa-database" },
              ].map((c, i) => (
                <div className="ailm-channel-card" key={i}>
                  <div className="ailm-channel-icon">
                    <i className={c.icon}></i>
                  </div>
                  <span className="ailm-channel-label">{c.label}</span>
                  <p className="ailm-channel-items">{c.items}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── PRICING ─── */}
        <section className="ailm-section ailm-section--dark" id="pricing">
          <div className="container">
            <div className="ailm-section-header ailm-section-header--dark">
              <p className="ailm-eyebrow ailm-eyebrow--light">Transparent Pricing</p>
              <h2 className="ailm-section-title ailm-title--light">Priced against what you spend on leads — not a salary.</h2>
              <p className="ailm-section-sub ailm-sub--light">A custom build of this scope costs AED 80,000–250,000 in Dubai. This is delivered as a managed product, live in two weeks.</p>
            </div>
            <div className="ailm-pricing-grid">
              {pricingTiers.map((tier, i) => {
                const isSuggested = tier.name === suggestedTier;
                const isFeatured = isSuggested || (tier.highlight && !suggestedTier);

                return (
                  <div
                    id={`pricing-card-${tier.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                    className={`ailm-pricing-card ${isFeatured ? "ailm-pricing-card--featured" : ""} ${isSuggested ? "ailm-pricing-card--suggested" : ""}`}
                    key={i}
                  >
                    {isSuggested ? (
                      <span className="ailm-pricing-badge ailm-pricing-badge--suggested">
                        🎯 Recommended for You
                      </span>
                    ) : (
                      tier.badge && <span className="ailm-pricing-badge">{tier.badge}</span>
                    )}
                    <h3 className="ailm-pricing-name">{tier.name}</h3>
                    <p className="ailm-pricing-best">{tier.bestFor}</p>
                    <div className="ailm-pricing-price">
                      <span className="ailm-pricing-amount">{tier.monthly}</span>
                      <span className="ailm-pricing-period">/ month</span>
                    </div>
                    <div className="ailm-pricing-setup">Setup: {tier.setup}</div>
                    <ul className="ailm-pricing-features">
                      <li><i className="fal fa-check"></i> {tier.channels}</li>
                      <li><i className="fal fa-check"></i> {tier.voice}</li>
                      <li><i className="fal fa-check"></i> {tier.conversations} conversations</li>
                      <li><i className="fal fa-check"></i> Languages: {tier.languages}</li>
                      <li><i className="fal fa-check"></i> Lead scoring: {tier.leadScoring}</li>
                      <li><i className="fal fa-check"></i> CRM: {tier.crm}</li>
                      <li><i className="fal fa-check"></i> Compliance: {tier.compliance}</li>
                    </ul>
                    <button
                      className={`ailm-pricing-cta ${isFeatured ? "ailm-pricing-cta--featured" : ""}`}
                      id={`pricing-cta-${tier.name.replace(/\s+/g, "-").toLowerCase()}`}
                      onClick={() => openPricingTierModal(tier)}
                    >
                      Get Started
                      <i className="fal fa-long-arrow-right ml-2"></i>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Pilot offer */}
            <div className="ailm-pilot-box">
              <div className="ailm-pilot-box-inner">
                <div>
                  <h4 className="ailm-pilot-title">60-Day Pilot — AED 9,500 (setup included)</h4>
                  <p className="ailm-pilot-desc">If we miss the agreed target, month three is free. Annual prepay: 12 months upfront, 2 months free, setup waived. Minimum term: 6 months on monthly plans. All prices in AED, exclusive of 5% VAT.</p>
                </div>
                <button className="ailm-btn-primary" id="pilot-cta" onClick={openPilotModal}>
                  Start the Pilot
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ─── ONBOARDING ─── */}
        <section className="ailm-section">
          <div className="container">
            <div className="ailm-section-header">
              <p className="ailm-eyebrow">Onboarding</p>
              <h2 className="ailm-section-title">Live in 14 days.<br />Your time commitment: under 3 hours.</h2>
              <p className="ailm-section-sub">Rush track available in 7 days. Portal API keys and number provisioning depend on third parties — so your agent goes live on your website widget within 72 hours of kick-off while connections land.</p>
            </div>
            <div className="ailm-onboarding-steps">
              {onboardingSteps.map((s, i) => (
                <div className="ailm-step" key={i}>
                  <div className="ailm-step-num">{s.step}</div>
                  <div className="ailm-step-connector"></div>
                  <div className="ailm-step-content">
                    <h4 className="ailm-step-title">{s.title}</h4>
                    <p className="ailm-step-desc">{s.desc}</p>
                    <span className="ailm-step-time">
                      <i className="fal fa-clock" style={{ marginRight: 4 }}></i>
                      {s.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── COMPLIANCE ─── */}
        <section className="ailm-section ailm-section--light">
          <div className="container">
            <div className="ailm-section-header">
              <p className="ailm-eyebrow">UAE Compliance</p>
              <h2 className="ailm-section-title">Built for UAE regulation. Not bolted on.</h2>
              <p className="ailm-section-sub">Under UAE Cabinet Resolutions 56 & 57 of 2024, outbound marketing violations reach AED 150,000. UAE PDPL (Federal Decree-Law No. 45 of 2021) requires explicit, revocable consent. This system is inbound-first by design and ships with a full Compliance & Data Protection Pack.</p>
            </div>
            <div className="ailm-compliance-grid">
              {[
                { title: "Data Processing Agreement", desc: "Defines what we process, on whose instructions, with which sub-processors, and what happens at contract end." },
                { title: "Consent Records", desc: "Every enquiry stored with timestamp, source, exact wording shown, and revocation status." },
                { title: "Retention Policy", desc: "Documented and automated deletion schedules per data type." },
                { title: "Audit Log Access", desc: "Read-only view of every contact attempt — DNCR result, consent reference, time window, disclosure and recording notice." },
                { title: "DNCR Screening", desc: "Every outbound contact screened against the Do Not Call Registry in real time before dial." },
                { title: "Opt-out Procedure", desc: "A tested mechanism that propagates across every channel, not just the one the buyer used." },
              ].map((c, i) => (
                <div className="ailm-compliance-card" key={i}>
                  <i className="fal fa-shield-check ailm-compliance-icon"></i>
                  <h4 className="ailm-compliance-title">{c.title}</h4>
                  <p className="ailm-compliance-desc">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section className="ailm-section">
          <div className="container">
            <div className="ailm-section-header">
              <p className="ailm-eyebrow">Common Questions</p>
              <h2 className="ailm-section-title">Frequently Asked Questions</h2>
            </div>
            <div className="ailm-faqs">
              {faqs.map((faq, i) => (
                <div className={`ailm-faq ${openFaq === i ? "ailm-faq--open" : ""}`} key={i}>
                  <button
                    className="ailm-faq-q"
                    id={`faq-${i}`}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    {faq.q}
                    <i className={`fal ${openFaq === i ? "fa-chevron-up" : "fa-chevron-down"}`}></i>
                  </button>
                  {openFaq === i && <div className="ailm-faq-a">{faq.a}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FINAL CTA ─── */}
        <section className="ailm-final-cta">
          <div className="container">
            <div className="ailm-final-cta-inner">
              <p className="ailm-eyebrow ailm-eyebrow--light">Next Step</p>
              <h2 className="ailm-final-cta-title">The fastest way to know whether this is worth it?</h2>
              <p className="ailm-final-cta-sub">Measure what you are losing right now. The Lead Leak Audit is AED 2,500 — credited in full against setup if you proceed.</p>
              <div className="ailm-final-cta-btns">
                <button className="ailm-btn-primary ailm-btn-white" id="final-cta-audit" onClick={openFinalAuditModal}>
                  Book the Lead Leak Audit — AED 2,500
                  <i className="fal fa-long-arrow-right ml-2"></i>
                </button>
                <a href="https://wa.me/971000000000" className="ailm-btn-ghost ailm-btn-ghost--light" target="_blank" rel="noopener noreferrer" id="final-cta-wa">
                  <i className="fab fa-whatsapp" style={{ marginRight: 6 }}></i>
                  WhatsApp Us
                </a>
              </div>
              <p className="ailm-final-footnote">TechMate Solutions FZ LLC, trading as DevMate Solutions · Dubai | Muscat | NY · devmatesolutions.com</p>
            </div>
          </div>
        </section>
      </main>

      <FooterThree />
    </>
  );
}
