"use client";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import HeaderThree from "@/src/layout/headers/header-3";
import FooterThree from "@/src/layout/footers/footer-3";

/* ─── Country list ──────────────────────────────────────────── */
const COUNTRIES = [
  { code: "971", flag: "🇦🇪", name: "UAE" },
  { code: "966", flag: "🇸🇦", name: "Saudi Arabia" },
  { code: "965", flag: "🇰🇼", name: "Kuwait" },
  { code: "974", flag: "🇶🇦", name: "Qatar" },
  { code: "973", flag: "🇧🇭", name: "Bahrain" },
  { code: "968", flag: "🇴🇲", name: "Oman" },
  { code: "1",   flag: "🇺🇸", name: "USA" },
  { code: "44",  flag: "🇬🇧", name: "UK" },
  { code: "92",  flag: "🇵🇰", name: "Pakistan" },
  { code: "91",  flag: "🇮🇳", name: "India" },
  { code: "86",  flag: "🇨🇳", name: "China" },
  { code: "81",  flag: "🇯🇵", name: "Japan" },
  { code: "49",  flag: "🇩🇪", name: "Germany" },
  { code: "33",  flag: "🇫🇷", name: "France" },
  { code: "39",  flag: "🇮🇹", name: "Italy" },
  { code: "34",  flag: "🇪🇸", name: "Spain" },
  { code: "61",  flag: "🇦🇺", name: "Australia" },
  { code: "55",  flag: "🇧🇷", name: "Brazil" },
  { code: "7",   flag: "🇷🇺", name: "Russia" },
  { code: "82",  flag: "🇰🇷", name: "South Korea" },
  { code: "31",  flag: "🇳🇱", name: "Netherlands" },
  { code: "46",  flag: "🇸🇪", name: "Sweden" },
  { code: "41",  flag: "🇨🇭", name: "Switzerland" },
  { code: "43",  flag: "🇦🇹", name: "Austria" },
  { code: "32",  flag: "🇧🇪", name: "Belgium" },
  { code: "353", flag: "🇮🇪", name: "Ireland" },
  { code: "351", flag: "🇵🇹", name: "Portugal" },
  { code: "30",  flag: "🇬🇷", name: "Greece" },
  { code: "48",  flag: "🇵🇱", name: "Poland" },
];

const PUBLIC_FORMS = [
  { id: "real-estate",            label: "Real Estate" },
  { id: "hotel-booking",          label: "Hotel Booking" },
  { id: "emirates-customer-care", label: "Emirates Care" },
];

const PRIVATE_FORMS = [
  { id: "dubai-fun-broker", label: "Fun Broker" },
];

/* ─── Industry data ─────────────────────────────────────────── */
const INDUSTRIES = [
  {
    id: "real-estate",
    icon: "fal fa-building",
    color: "#bd2120",
    name: "Dubai Real Estate",
    tag: "Property & Brokerage",
    desc: "AI call agents qualify property leads instantly — asking budget, property type, location preference, and timeline before a human agent ever picks up the phone.",
    features: [
      "Instant lead qualification & scoring",
      "Bayut / Property Finder integration",
      "Viewing appointment scheduling",
      "CRM auto-logging (PropSpace, HubSpot)",
    ],
    langs: ["English", "Arabic"],
    formId: "real-estate",
  },
  {
    id: "hotel-booking",
    icon: "fal fa-concierge-bell",
    color: "#d97706",
    name: "Hotel & Hospitality",
    tag: "Booking & Reservations",
    desc: "Handle room enquiries, check-in questions, and booking confirmations 24/7 in multiple languages — reducing front-desk load without losing the personal touch.",
    features: [
      "24/7 multilingual reservation support",
      "Room type & availability queries",
      "Upsell packages automatically",
      "PMS system handoff",
    ],
    langs: ["English", "Arabic"],
    formId: "hotel-booking",
  },
  {
    id: "emirates-customer-care",
    icon: "fal fa-plane",
    color: "#0369a1",
    name: "Emirates Customer Care",
    tag: "Aviation & Travel",
    desc: "Scalable AI call support for flight enquiries, loyalty programme questions, baggage claims, and rebooking — handling thousands of simultaneous calls without wait times.",
    features: [
      "Flight status & rebooking queries",
      "Skywards loyalty programme support",
      "Baggage claim assistance",
      "Escalation to human agent on demand",
    ],
    langs: ["English"],
    formId: "emirates-customer-care",
  },
  {
    id: "dubai-fun-broker",
    icon: "fal fa-umbrella-beach",
    color: "#7c3aed",
    name: "Dubai Fun Broker",
    tag: "Tourism & Experiences",
    desc: "AI agents that sell leisure experiences — desert safaris, yacht charters, skydiving, and city tours — capturing interest in Russian and English for the highest-value tourist segments.",
    features: [
      "Experience upselling & booking",
      "Russian & English dual-language",
      "Payment link dispatch after call",
      "Seasonal package promotion",
    ],
    langs: ["English", "Russian"],
    formId: "dubai-fun-broker",
    isPrivate: true,
  },
];

const HOW_IT_WORKS = [
  { step: "01", title: "Lead Submits Interest", desc: "Visitor fills a form or calls in — our AI agent picks up instantly, no wait." },
  { step: "02", title: "Agent Qualifies", desc: "AI asks the right questions in the right language, scoring intent in real time." },
  { step: "03", title: "Webhook Fires", desc: "Qualified lead data routes to AI Automation, your CRM, and your team via email." },
  { step: "04", title: "Follow-Up Automated", desc: "Sales pitch email auto-sends to the lead. Your team receives a fully enriched profile." },
];

/* ─── Shared sub-components ─────────────────────────────────── */
function CountrySelect({ name, defaultValue = "971" }) {
  return (
    <select name={name} defaultValue={defaultValue} className="cad-country-select">
      {COUNTRIES.map((c) => (
        <option key={c.code} value={c.code}>{c.flag} +{c.code}</option>
      ))}
    </select>
  );
}

function FormField({ id, label, children }) {
  return (
    <div className="cad-field-group">
      <label htmlFor={id} className="cad-field-label">{label}</label>
      {children}
    </div>
  );
}

function StatusMessage({ success, error }) {
  if (success) return <div className="cad-status-msg cad-status-success">✓ Submitted successfully — we'll be in touch shortly.</div>;
  if (error)   return <div className="cad-status-msg cad-status-error">✗ Something went wrong. Please try again.</div>;
  return null;
}

function SubmitButton({ loading }) {
  return (
    <button type="submit" className="cad-submit-btn" disabled={loading}>
      {loading ? (
        <span className="cad-btn-inner">
          <svg className="cad-spinner" viewBox="0 0 24 24" fill="none">
            <circle className="cad-spinner-track" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
            <path className="cad-spinner-arc" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Sending…
        </span>
      ) : "Submit Demo Request"}
    </button>
  );
}

/* ─── Forms ─────────────────────────────────────────────────── */
function useForm(formName) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError]     = useState(false);

  async function handleSubmit(e, payload) {
    e.preventDefault();
    setLoading(true); setSuccess(false); setError(false);
    try {
      const res = await fetch("/api/call-agents-webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (res.ok && result.success) { setSuccess(true); e.target.reset(); }
      else setError(true);
    } catch { setError(true); }
    setLoading(false);
  }

  return { loading, success, error, handleSubmit };
}

function RealEstateForm() {
  const { loading, success, error, handleSubmit } = useForm("Dubai Real Estate");
  return (
    <form onSubmit={(e) => handleSubmit(e, {
      form: "Dubai Real Estate",
      name: e.target.name.value,
      email: e.target.email?.value || "",
      country: e.target.country.value,
      contact: e.target.contact.value,
    })} className="cad-form-body">
      <div className="cad-form-title-wrap">
        <h3 className="cad-form-title">Dubai Real Estate</h3>
        <div className="cad-form-title-line" />
      </div>
      <div className="cad-fields-stack">
        <FormField id="re-name" label="Full Name">
          <input id="re-name" type="text" name="name" required placeholder="Enter your name" className="cad-field-input" />
        </FormField>
        <FormField id="re-email" label="Email Address">
          <input id="re-email" type="email" name="email" placeholder="Enter your email (optional)" className="cad-field-input" />
        </FormField>
        <FormField id="re-contact" label="Phone Number">
          <div className="cad-phone-inner">
            <CountrySelect name="country" />
            <input id="re-contact" type="tel" name="contact" required placeholder="Phone number" className="cad-field-input cad-phone-input" />
          </div>
        </FormField>
      </div>
      <SubmitButton loading={loading} />
      <StatusMessage success={success} error={error} />
    </form>
  );
}

function HotelBookingForm() {
  const [lang, setLang] = useState("english");
  const { loading, success, error, handleSubmit } = useForm("Hotel Booking DXB");
  const isArabic = lang === "arabic";
  return (
    <form onSubmit={(e) => handleSubmit(e, {
      form: isArabic ? "Hotel Booking — DXB (Arabic)" : "Hotel Booking — DXB (English)",
      language: isArabic ? "Arabic" : "English",
      name: e.target.name.value,
      email: e.target.email?.value || "",
      country: e.target.country.value,
      contact: e.target.contact.value,
    })} className="cad-form-body">
      <div className="cad-sub-nav">
        <button type="button" className={`cad-sub-tab${lang === "english" ? " cad-sub-tab--active" : ""}`} onClick={() => setLang("english")}>English</button>
        <button type="button" className={`cad-sub-tab${lang === "arabic" ? " cad-sub-tab--active" : ""}`} onClick={() => setLang("arabic")}>Arabic / عربي</button>
      </div>
      <div className="cad-form-title-wrap">
        <h3 className="cad-form-title">{isArabic ? "Hotel Booking (Arabic)" : "Hotel Booking — DXB"}</h3>
        <div className="cad-form-title-line" />
      </div>
      <div className="cad-fields-stack">
        <FormField id="hb-name" label={isArabic ? "Name / الاسم" : "Full Name"}>
          <input id="hb-name" type="text" name="name" required placeholder={isArabic ? "أدخل اسمك" : "Enter your name"} className="cad-field-input" />
        </FormField>
        <FormField id="hb-email" label={isArabic ? "Email / البريد الإلكتروني" : "Email Address"}>
          <input id="hb-email" type="email" name="email" placeholder={isArabic ? "أدخل بريدك الإلكتروني" : "Enter your email (optional)"} className="cad-field-input" />
        </FormField>
        <FormField id="hb-contact" label={isArabic ? "Phone / رقم الهاتف" : "Phone Number"}>
          <div className="cad-phone-inner">
            <CountrySelect name="country" />
            <input id="hb-contact" type="tel" name="contact" required placeholder={isArabic ? "رقم الهاتف" : "Phone number"} className="cad-field-input cad-phone-input" />
          </div>
        </FormField>
      </div>
      <SubmitButton loading={loading} />
      <StatusMessage success={success} error={error} />
    </form>
  );
}

function EmiratesForm() {
  const { loading, success, error, handleSubmit } = useForm("Emirates Customer Care");
  return (
    <form onSubmit={(e) => handleSubmit(e, {
      form: "Emirates- Customer Care",
      name: e.target.name.value,
      email: e.target.email?.value || "",
      country: e.target.country.value,
      contact: e.target.contact.value,
    })} className="cad-form-body">
      <div className="cad-form-title-wrap">
        <h3 className="cad-form-title">Emirates Customer Care</h3>
        <div className="cad-form-title-line" />
      </div>
      <div className="cad-fields-stack">
        <FormField id="ecc-name" label="Full Name">
          <input id="ecc-name" type="text" name="name" required placeholder="Enter your name" className="cad-field-input" />
        </FormField>
        <FormField id="ecc-email" label="Email Address">
          <input id="ecc-email" type="email" name="email" placeholder="Enter your email (optional)" className="cad-field-input" />
        </FormField>
        <FormField id="ecc-contact" label="Phone Number">
          <div className="cad-phone-inner">
            <CountrySelect name="country" />
            <input id="ecc-contact" type="tel" name="contact" required placeholder="Phone number" className="cad-field-input cad-phone-input" />
          </div>
        </FormField>
      </div>
      <SubmitButton loading={loading} />
      <StatusMessage success={success} error={error} />
    </form>
  );
}

function DubaiFunBrokerForm() {
  const [lang, setLang] = useState("english");
  const { loading, success, error, handleSubmit } = useForm("Dubai Fun Broker");
  const isRussian = lang === "russian";
  return (
    <form onSubmit={(e) => handleSubmit(e, {
      form: isRussian ? "Dubai Fun Broker (Russian)" : "Dubai Fun Broker",
      language: isRussian ? "Russian" : "English",
      name: e.target.name.value,
      email: e.target.email?.value || "",
      country: e.target.country.value,
      contact: e.target.contact.value,
    })} className="cad-form-body">
      <div className="cad-sub-nav">
        <button type="button" className={`cad-sub-tab${lang === "english" ? " cad-sub-tab--active" : ""}`} onClick={() => setLang("english")}>English</button>
        <button type="button" className={`cad-sub-tab${lang === "russian" ? " cad-sub-tab--active" : ""}`} onClick={() => setLang("russian")}>Русский</button>
      </div>
      <div className="cad-form-title-wrap">
        <h3 className="cad-form-title">{isRussian ? "Dubai Fun Broker (RU)" : "Dubai Fun Broker"}</h3>
        <div className="cad-form-title-line" />
      </div>
      <div className="cad-fields-stack">
        <FormField id="dfb-name" label={isRussian ? "Name / Имя" : "Full Name"}>
          <input id="dfb-name" type="text" name="name" required placeholder={isRussian ? "Введите имя" : "Enter your name"} className="cad-field-input" />
        </FormField>
        <FormField id="dfb-email" label={isRussian ? "Email / Эл. почта" : "Email Address"}>
          <input id="dfb-email" type="email" name="email" placeholder={isRussian ? "Введите email" : "Enter your email (optional)"} className="cad-field-input" />
        </FormField>
        <FormField id="dfb-contact" label={isRussian ? "Phone / Номер" : "Phone Number"}>
          <div className="cad-phone-inner">
            <CountrySelect name="country" defaultValue="7" />
            <input id="dfb-contact" type="tel" name="contact" required placeholder={isRussian ? "Номер телефона" : "Phone number"} className="cad-field-input cad-phone-input" />
          </div>
        </FormField>
      </div>
      <SubmitButton loading={loading} />
      <StatusMessage success={success} error={error} />
    </form>
  );
}

/* ─── Build My Agent Modal ───────────────────────────────────── */
function BuildAgentModal({ isOpen, onClose }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError]     = useState(false);

  if (!isOpen) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true); setSuccess(false); setError(false);
    const f = e.target;
    const payload = {
      form: "Build My Agent",
      name: f.bma_name.value,
      email: f.bma_email.value,
      country: f.bma_country.value,
      contact: f.bma_contact.value,
      businessDetails: f.bma_business.value,
    };
    try {
      const res = await fetch("/api/call-agents-webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (res.ok && result.success) { setSuccess(true); f.reset(); }
      else setError(true);
    } catch { setError(true); }
    setLoading(false);
  }

  return (
    <div className="cad-modal-overlay" onClick={onClose}>
      <div
        className="cad-modal-box"
        style={{ maxWidth: 480 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="cad-modal-close" onClick={onClose}>✕</button>

        {/* Header */}
        <div className="cad-modal-header">
          <div className="cad-modal-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h2 className="cad-modal-title">Build My AI Agent</h2>
          <p className="cad-modal-subtitle">Tell us about your business — we'll design your agent and reply within 24 hours</p>
        </div>

        {!success ? (
          <form onSubmit={handleSubmit} className="cad-form-body">
            <div className="cad-fields-stack">
              <FormField id="bma-name" label="Full Name">
                <input
                  id="bma-name" name="bma_name" type="text" required
                  placeholder="Your full name"
                  className="cad-field-input"
                />
              </FormField>

              <FormField id="bma-email" label="Email Address">
                <input
                  id="bma-email" name="bma_email" type="email" required
                  placeholder="your@email.com"
                  className="cad-field-input"
                />
              </FormField>

              <FormField id="bma-contact" label="Contact Number">
                <div className="cad-phone-inner">
                  <CountrySelect name="bma_country" />
                  <input
                    id="bma-contact" name="bma_contact" type="tel" required
                    placeholder="Phone number"
                    className="cad-field-input cad-phone-input"
                  />
                </div>
              </FormField>

              <FormField id="bma-business" label="Business Details">
                <textarea
                  id="bma-business" name="bma_business" required
                  placeholder="Tell us about your business — industry, current challenges, what you'd like your AI agent to do..."
                  className="cad-field-input"
                  rows={4}
                  style={{ resize: "vertical", lineHeight: 1.6 }}
                />
              </FormField>
            </div>

            <button type="submit" className="cad-submit-btn" disabled={loading}>
              {loading ? (
                <span className="cad-btn-inner">
                  <svg className="cad-spinner" viewBox="0 0 24 24" fill="none">
                    <circle className="cad-spinner-track" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                    <path className="cad-spinner-arc" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Sending…
                </span>
              ) : "Submit — We'll Be In Touch"}
            </button>

            {error && <div className="cad-status-msg cad-status-error">✗ Something went wrong. Please try again.</div>}
          </form>
        ) : (
          <div style={{ textAlign: "center", padding: "16px 0 8px" }}>
            <div style={{
              width: 56, height: 56, borderRadius: "50%",
              background: "#f0fdf4", border: "2px solid #bbf7d0",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 16px", fontSize: 22,
            }}>✓</div>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: "#0d0d0d", marginBottom: 8 }}>
              Request Received!
            </h3>
            <p style={{ fontSize: 13.5, color: "#6b7280", lineHeight: 1.6, marginBottom: 20 }}>
              We've sent a confirmation to your email. Our team will review your brief
              and reach out within 24 hours with a proposal.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="cad-btn-primary"
              style={{ width: "100%", justifyContent: "center" }}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Private Login Modal ────────────────────────────────────── */
function PrivateLoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);
  if (!isOpen) return null;
  function handleSubmit(e) {
    e.preventDefault();
    if (username.trim() === "devmate" && password === "Wegrowtogether@yo1") { setErr(false); onLoginSuccess(); }
    else setErr(true);
  }
  return (
    <div className="cad-modal-overlay" onClick={onClose}>
      <div className="cad-modal-box" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="cad-modal-close" onClick={onClose}>✕</button>
        <div className="cad-modal-header">
          <div className="cad-modal-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a5 5 0 00-10 0v4h10z" />
            </svg>
          </div>
          <h2 className="cad-modal-title">Private Use-Cases</h2>
          <p className="cad-modal-subtitle">Sign in to access restricted demos</p>
        </div>
        <form onSubmit={handleSubmit} className="cad-form-body">
          <div className="cad-fields-stack">
            <FormField id="modal-user" label="Username">
              <input id="modal-user" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" className="cad-field-input" required autoFocus />
            </FormField>
            <FormField id="modal-pass" label="Password">
              <input id="modal-pass" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" className="cad-field-input" required />
            </FormField>
          </div>
          <button type="submit" className="cad-submit-btn">Sign In</button>
          {err && <div className="cad-status-msg cad-status-error">✗ Invalid credentials. Please try again.</div>}
        </form>
      </div>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function CallAgentsPage() {
  const [mounted, setMounted]             = useState(false);
  const [activeForm, setActiveForm]       = useState("real-estate");
  const [activePrivateForm, setActivePrivateForm] = useState("dubai-fun-broker");
  const [isAuthenticated, setIsAuthenticated]     = useState(false);
  const [showLoginModal, setShowLoginModal]       = useState(false);
  const [showBuildModal, setShowBuildModal]       = useState(false);
  const [activeSection, setActiveSection]         = useState("public");

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      if (sessionStorage.getItem("devmate_private_auth") === "true") setIsAuthenticated(true);
    }
  }, []);

  function handleLoginSuccess() {
    setIsAuthenticated(true);
    if (typeof window !== "undefined") sessionStorage.setItem("devmate_private_auth", "true");
    setShowLoginModal(false);
    setActiveSection("private");
  }

  function handleSignOut() {
    setIsAuthenticated(false);
    if (typeof window !== "undefined") sessionStorage.removeItem("devmate_private_auth");
    setActiveSection("public");
  }

  function scrollToDemo() {
    document.getElementById("cad-demo")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <Head>
        <title>AI Call Agent Demos — DevMate Solutions</title>
        <meta name="description" content="Try live AI Call Agent demos for Real Estate, Hotel Booking, Airlines, and more. DevMate builds custom AI voice and call agents for any industry — deployed in 14 days." />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </Head>

      <HeaderThree />

      <main className="cad-page">

        {/* ══ HERO ══ */}
        <section className="cad-hero">
          <div className="cad-container">
            <div className="cad-hero-grid">
              {/* Left */}
              <div>
                <div className="cad-hero-tag">
                  <span className="cad-hero-tag-dot" />
                  Live AI Call Agent Demos
                </div>
                <h1 className="cad-hero-title">
                  AI Agents That<br />
                  <em>Answer. Qualify.</em><br />
                  Convert.
                </h1>
                <p className="cad-hero-sub">
                  We build custom AI call assistants for any industry — real estate, hospitality,
                  aviation, tourism, and beyond. Each demo below routes to a live Make.com
                  workflow. Submit a lead and see it in action.
                </p>
                <div className="cad-hero-btns">
                  <button className="cad-btn-primary" onClick={scrollToDemo}>
                    Try a Demo <i className="fal fa-arrow-down" style={{ marginLeft: 4 }} />
                  </button>
                  <button className="cad-btn-ghost cad-btn-ghost--light" onClick={() => setShowBuildModal(true)}>
                    Build My Agent <i className="fal fa-long-arrow-right" />
                  </button>
                </div>
                <div className="cad-hero-stats">
                  <div>
                    <span className="cad-hero-stat-val">5<span>s</span></span>
                    <span className="cad-hero-stat-label">Avg Response</span>
                  </div>
                  <div>
                    <span className="cad-hero-stat-val">4<span>+</span></span>
                    <span className="cad-hero-stat-label">Industries</span>
                  </div>
                  <div>
                    <span className="cad-hero-stat-val">20<span>+</span></span>
                    <span className="cad-hero-stat-label">Languages</span>
                  </div>
                  <div>
                    <span className="cad-hero-stat-val">14<span>d</span></span>
                    <span className="cad-hero-stat-label">To Deploy</span>
                  </div>
                </div>
              </div>

              {/* Right — chat preview card */}
              <div className="cad-hero-demo-card">
                <div className="cad-hero-demo-header">
                  <div className="cad-hero-demo-avatar">
                    <i className="fal fa-robot" />
                  </div>
                  <div>
                    <p className="cad-hero-demo-name">DevMate AI Agent</p>
                    <p className="cad-hero-demo-status">
                      <span className="cad-hero-demo-status-dot" />
                      Online · Responding instantly
                    </p>
                  </div>
                </div>
                <div className="cad-chat-bubble cad-chat-bubble--agent">
                  Hello! I'm the DevMate AI Call Agent for Dubai Real Estate. May I have your name and phone number to connect you with the right property specialist?
                </div>
                <div className="cad-chat-bubble cad-chat-bubble--user">
                  Hi, I'm Sara. I'm looking for a 2BR apartment in Downtown Dubai, budget around AED 2.5M.
                </div>
                <div className="cad-chat-bubble cad-chat-bubble--agent">
                  Perfect, Sara! I have 3 units in that range with full Burj views. Let me send you the shortlist — what's the best number to reach you?
                </div>
                <div className="cad-hero-demo-industries">
                  <span className="cad-industry-pill">🏠 Real Estate</span>
                  <span className="cad-industry-pill">🏨 Hospitality</span>
                  <span className="cad-industry-pill">✈️ Aviation</span>
                  <span className="cad-industry-pill">🏝️ Tourism</span>
                  <span className="cad-industry-pill">🛍️ Retail</span>
                  <span className="cad-industry-pill">🏥 Healthcare</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ STATS BAND ══ */}
        <div className="cad-stats-band">
          <div className="cad-container">
            <div className="cad-stats-row">
              <div className="cad-stat-item">
                <span className="cad-stat-val">&lt;5s</span>
                <span className="cad-stat-label">First Response Time</span>
              </div>
              <div className="cad-stat-item">
                <span className="cad-stat-val">24/7</span>
                <span className="cad-stat-label">Always On, Never Sick</span>
              </div>
              <div className="cad-stat-item">
                <span className="cad-stat-val">20+</span>
                <span className="cad-stat-label">Languages Supported</span>
              </div>
              <div className="cad-stat-item">
                <span className="cad-stat-val">14d</span>
                <span className="cad-stat-label">From Briefing to Live</span>
              </div>
            </div>
          </div>
        </div>

        {/* ══ INDUSTRIES ══ */}
        <section className="cad-section" id="industries">
          <div className="cad-container">
            <div className="cad-section-header">
              <p className="cad-eyebrow">Industry Demos</p>
              <h2 className="cad-section-title">One platform. Every industry.</h2>
              <p className="cad-section-sub">
                Each AI agent is custom-trained on your industry's terminology, workflows, and
                compliance requirements. These live demos connect directly to our Make.com
                automation infrastructure.
              </p>
            </div>
            <div className="cad-industry-grid">
              {INDUSTRIES.map((ind) => (
                <div key={ind.id} className="cad-industry-card">
                  <div className="cad-industry-icon" style={{ background: `${ind.color}15`, color: ind.color }}>
                    <i className={ind.icon} />
                  </div>
                  <h3 className="cad-industry-name">{ind.name}</h3>
                  <span className="cad-industry-tag">{ind.tag}</span>
                  <p className="cad-industry-desc">{ind.desc}</p>
                  <ul className="cad-industry-features">
                    {ind.features.map((f, i) => (
                      <li key={i}><i className="fal fa-check" />{f}</li>
                    ))}
                  </ul>
                  <div className="cad-industry-langs">
                    {ind.langs.map((l) => <span key={l} className="cad-lang-badge">{l}</span>)}
                    {ind.isPrivate && <span className="cad-lang-badge" style={{ borderColor: "#bd2120", color: "#bd2120" }}>🔒 Private</span>}
                  </div>
                  <button
                    className="cad-industry-btn"
                    onClick={() => {
                      document.getElementById("cad-demo")?.scrollIntoView({ behavior: "smooth" });
                      setTimeout(() => {
                        if (ind.isPrivate) {
                          setShowLoginModal(!isAuthenticated ? true : false);
                          if (isAuthenticated) setActiveSection("private");
                        } else {
                          setActiveSection("public");
                          setActiveForm(ind.formId);
                        }
                      }, 600);
                    }}
                  >
                    <i className="fal fa-flask" />
                    Try This Demo
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ HOW IT WORKS ══ */}
        <section className="cad-section cad-section--light" id="how-it-works">
          <div className="cad-container">
            <div className="cad-section-header">
              <p className="cad-eyebrow">How It Works</p>
              <h2 className="cad-section-title">From form submit to qualified lead — in seconds.</h2>
              <p className="cad-section-sub">
                Every demo form below is wired to a live pipeline. Submit a lead and watch
                the full automation fire in real time.
              </p>
            </div>
            <div className="cad-steps-grid">
              {HOW_IT_WORKS.map((s) => (
                <div key={s.step} className="cad-step">
                  <div className="cad-step-num">{s.step}</div>
                  <h4 className="cad-step-title">{s.title}</h4>
                  <p className="cad-step-desc">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ DEMO FORM ══ */}
        <section className="cad-demo-section" id="cad-demo">
          <div className="cad-container">
            <div className="cad-demo-layout">
              {/* Left copy */}
              <div>
                <p className="cad-eyebrow" style={{ justifyContent: "flex-start" }}>Try It Live</p>
                <h2 className="cad-demo-left-title">
                  Submit a lead.<br />
                  Watch the AI<br />
                  <span style={{ color: "#bd2120" }}>work in real time.</span>
                </h2>
                <p className="cad-demo-left-sub">
                  Every form on the right triggers a live Make.com scenario — the lead is
                  qualified, routed to the right agent, and a confirmation email is sent
                  to you instantly. This is exactly what your customers experience.
                </p>
                <div className="cad-demo-trust">
                  {[
                    ["fal fa-bolt", "Lead reaches Make.com in under 2 seconds"],
                    ["fal fa-envelope", "Auto sales-pitch email sent to the lead"],
                    ["fal fa-bell", "Admin notification sent to management@devmatesolutions.com"],
                    ["fal fa-language", "Language-aware routing — Arabic, Russian & English"],
                    ["fal fa-lock", "Private forms protected by session auth"],
                  ].map(([icon, text]) => (
                    <div key={text} className="cad-demo-trust-item">
                      <i className={icon} />
                      {text}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — form */}
              <div>
                {/* Private toggle */}
                <div className="cad-top-bar">
                  <button
                    id="cad-private-toggle-btn"
                    type="button"
                    className={`cad-private-btn${isAuthenticated ? " cad-private-btn--unlocked" : ""}`}
                    onClick={() => {
                      if (isAuthenticated) setActiveSection(activeSection === "private" ? "public" : "private");
                      else setShowLoginModal(true);
                    }}
                  >
                    <svg className="cad-lock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      {isAuthenticated
                        ? <path d="M8 11V7a4 4 0 118 0v4m-8 0h8a2 2 0 012 2v7a2 2 0 01-2 2H6a2 2 0 01-2-2v-7a2 2 0 012-2z" />
                        : <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a5 5 0 00-10 0v4h10z" />}
                    </svg>
                    <span>{activeSection === "private" ? "← Public Demos" : "Private Use-Cases"}</span>
                    {isAuthenticated && <span className="cad-unlocked-dot" />}
                  </button>
                </div>

                {!mounted ? (
                  <div className="cad-skeleton">
                    <div className="cad-sk-bar cad-sk-bar--short" />
                    <div className="cad-sk-bar cad-sk-bar--long" />
                    <div className="cad-sk-bar cad-sk-bar--long" />
                    <div className="cad-sk-bar cad-sk-bar--btn" />
                  </div>
                ) : activeSection === "public" ? (
                  <div id="cad-public-card" className="cad-form-card">
                    <nav className="cad-form-nav" aria-label="Select demo form">
                      {PUBLIC_FORMS.map((f) => (
                        <button
                          key={f.id} type="button"
                          id={`cad-tab-${f.id}`}
                          className={`cad-nav-tab${activeForm === f.id ? " cad-nav-tab--active" : ""}`}
                          onClick={() => setActiveForm(f.id)}
                        >
                          {f.label}
                        </button>
                      ))}
                    </nav>
                    <div className="cad-form-area">
                      {activeForm === "real-estate"            && <RealEstateForm />}
                      {activeForm === "hotel-booking"          && <HotelBookingForm />}
                      {activeForm === "emirates-customer-care" && <EmiratesForm />}
                    </div>
                  </div>
                ) : (
                  <div id="cad-private-card" className="cad-form-card">
                    <div className="cad-private-header">
                      <span className="cad-private-badge">
                        <svg className="cad-lock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M8 11V7a4 4 0 118 0v4m-8 0h8a2 2 0 012 2v7a2 2 0 01-2 2H6a2 2 0 01-2-2v-7a2 2 0 012-2z" />
                        </svg>
                        Private Use-Cases
                      </span>
                      <button id="cad-signout-btn" type="button" className="cad-signout-btn" onClick={handleSignOut}>
                        Lock & Sign Out
                      </button>
                    </div>
                    <nav className="cad-form-nav" aria-label="Select private demo">
                      {PRIVATE_FORMS.map((f) => (
                        <button key={f.id} type="button"
                          id={`cad-private-tab-${f.id}`}
                          className={`cad-nav-tab${activePrivateForm === f.id ? " cad-nav-tab--active" : ""}`}
                          onClick={() => setActivePrivateForm(f.id)}
                        >
                          {f.label}
                        </button>
                      ))}
                    </nav>
                    <div className="cad-form-area">
                      {activePrivateForm === "dubai-fun-broker" && <DubaiFunBrokerForm />}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ══ FINAL CTA ══ */}
        <section className="cad-final-cta">
          <div className="cad-container">
            <p className="cad-eyebrow cad-eyebrow--light">Next Step</p>
            <h2 className="cad-final-cta-title">
              Ready to deploy your own<br />
              <span style={{ color: "#bd2120" }}>AI Call Agent?</span>
            </h2>
            <p className="cad-final-cta-sub">
              We go from briefing to live agent in 14 days. Custom-trained on your scripts,
              your CRM, your languages. Let's build yours.
            </p>
            <div className="cad-final-cta-btns">
              <button className="cad-btn-primary" id="final-build-agent-btn" onClick={() => setShowBuildModal(true)}>
                Build My Agent <i className="fal fa-long-arrow-right" style={{ marginLeft: 4 }} />
              </button>
              <a href="/aileadmanagement" className="cad-btn-ghost cad-btn-ghost--light">
                <i className="fal fa-chart-line" />
                AI Lead Management
              </a>
            </div>
            <p className="cad-final-footnote">
              TechMate Solutions FZ LLC, trading as DevMate Solutions · Dubai | Muscat | NY · devmatesolutions.com
            </p>
          </div>
        </section>

      </main>

      <BuildAgentModal
        isOpen={showBuildModal}
        onClose={() => setShowBuildModal(false)}
      />

      <PrivateLoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <FooterThree />
    </>
  );
}
