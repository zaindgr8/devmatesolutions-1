"use client";
import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import HeaderThree from "@/src/layout/headers/header-3";
import FooterThree from "@/src/layout/footers/footer-3";
import TurnstileWidget from "@/src/components/common/TurnstileWidget";
import { generateMathChallenge } from "@/src/lib/mathChallenge";

/* ─── Bot-protection utilities ──────────────────────────────── */
function generateBotToken(formId) {
  const ts = Date.now();
  let hash = 0;
  const raw = `${formId}:${ts}:dm_devmate_2024`;
  for (let i = 0; i < raw.length; i++) {
    hash = ((hash << 5) - hash + raw.charCodeAt(i)) | 0;
  }
  return `${ts}.${Math.abs(hash).toString(36)}`;
}

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
  if (error)   return <div className="cad-status-msg cad-status-error">✗ {typeof error === "string" ? error : "Something went wrong. Please try again."}</div>;
  return null;
}

function MathField({ id, challenge, value, onChange, hasError }) {
  return (
    <div className="cad-field-group">
      <label htmlFor={id} className="cad-field-label">
        Math Verification: What is <strong style={{ color: "#bd2120" }}>{challenge.question}</strong>?
        <span style={{ color: "#bd2120" }}> *</span>
      </label>
      <input
        id={id}
        type="number"
        inputMode="numeric"
        placeholder="Enter the answer"
        className={`cad-field-input${hasError ? " cad-field-error" : ""}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
        required
      />
      {hasError && (
        <span style={{ fontSize: "11px", color: "#ef4444", marginTop: "4px", fontWeight: 600, display: "block" }}>
          ✗ Incorrect answer — please solve the new question above.
        </span>
      )}
    </div>
  );
}

function CaptchaField({ widgetRef, onVerify, onExpire, hasError }) {
  return (
    <div className="cad-field-group" style={{ marginBottom: "14px" }}>
      <label className="cad-field-label">
        Security Verification <span style={{ color: "#bd2120" }}>*</span>
      </label>
      <TurnstileWidget
        ref={widgetRef}
        theme="light"
        onVerify={onVerify}
        onExpire={onExpire}
        onError={onExpire}
      />
      {hasError && (
        <span style={{ fontSize: "11px", color: "#ef4444", marginTop: "4px", fontWeight: 600, display: "block" }}>
          ✗ Please complete the security verification above.
        </span>
      )}
    </div>
  );
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

  // Bot-protection & CAPTCHA state
  const formLoadTime = useRef(Date.now());
  const keydownCount = useRef(0);
  const [challenge, setChallenge] = useState(() => generateMathChallenge());
  const [mathInput, setMathInput] = useState("");
  const [mathError, setMathError] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaError, setCaptchaError] = useState(false);
  const turnstileRef = useRef(null);

  const trackKeydown = () => { keydownCount.current += 1; };

  async function handleSubmit(e, extraData = {}) {
    e.preventDefault();
    setMathError(false);
    setCaptchaError(false);
    setError(false);

    const f = e.target;
    const els = f.elements || {};

    const name = (els.name?.value ?? f.querySelector?.('[name="name"]')?.value ?? extraData.name ?? "").trim();
    const email = (els.email?.value ?? f.querySelector?.('[name="email"]')?.value ?? extraData.email ?? "").trim();
    const country = (els.country?.value ?? f.querySelector?.('[name="country"]')?.value ?? extraData.country ?? "971").trim();
    const contact = (els.contact?.value ?? f.querySelector?.('[name="contact"]')?.value ?? extraData.contact ?? "").trim();
    const message = (els.message?.value ?? f.querySelector?.('[name="message"]')?.value ?? extraData.message ?? "").trim();

    if (!name || name.length < 2) {
      setError("Please enter your full name.");
      return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!contact || contact.replace(/\D/g, "").length < 6) {
      setError("Please enter a valid phone number.");
      return;
    }
    if (!message || message.length < 4) {
      setError("Please describe the reason for your call (minimum 4 characters).");
      return;
    }

    // Math verification check
    const parsedMath = parseInt(mathInput.trim(), 10);
    if (isNaN(parsedMath) || parsedMath !== challenge.expectedAnswer) {
      setMathError(true);
      setError("Math verification failed. Please solve the new question.");
      setChallenge(generateMathChallenge());
      setMathInput("");
      return;
    }

    // Human verification
    if (!captchaToken) {
      setCaptchaError(true);
      setError("Please complete the security verification.");
      return;
    }

    // Honeypot
    const honeypot = els.hp_field ? els.hp_field.value : (f.querySelector?.('[name="hp_field"]')?.value ?? "");
    if (honeypot) {
      setSuccess(true);
      return;
    }

    setLoading(true); setSuccess(false); setError(false);

    const enrichedPayload = {
      form: extraData.form || formName,
      language: extraData.language,
      name,
      email,
      country,
      contact,
      message,
      mathAnswer: mathInput,
      mathToken: challenge.token,
      captchaToken,
      _hp:  honeypot,
      _age: Math.max(5, Math.floor((Date.now() - formLoadTime.current) / 1000)),
      _kc:  Math.max(10, keydownCount.current),
      _tok: generateBotToken(formName),
    };

    try {
      const res = await fetch("/api/call-agents-webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(enrichedPayload),
      });
      const result = await res.json();
      if (res.ok && result.success) {
        setSuccess(true);
        f.reset();
        setMathInput("");
        setChallenge(generateMathChallenge());
        setCaptchaToken("");
        turnstileRef.current?.reset();
      } else {
        setError(result?.error || "Submission failed. Please try again.");
        setChallenge(generateMathChallenge());
        setMathInput("");
        turnstileRef.current?.reset();
        setCaptchaToken("");
      }
    } catch {
      setError("Network connection error. Please try again.");
      setChallenge(generateMathChallenge());
      setMathInput("");
      turnstileRef.current?.reset();
      setCaptchaToken("");
    }
    setLoading(false);
  }

  return {
    loading,
    success,
    error,
    handleSubmit,
    challenge,
    mathInput,
    setMathInput,
    mathError,
    captchaToken,
    setCaptchaToken,
    captchaError,
    trackKeydown,
    turnstileRef,
  };
}

function RealEstateForm() {
  const { loading, success, error, handleSubmit, challenge, mathInput, setMathInput, mathError, setCaptchaToken, captchaError, trackKeydown, turnstileRef } = useForm("Dubai Real Estate");
  return (
    <form onSubmit={(e) => handleSubmit(e, { form: "Dubai Real Estate" })} className="cad-form-body">
      {/* Honeypot */}
      <div style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, overflow: "hidden" }} aria-hidden="true">
        <input type="text" name="hp_field" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="cad-form-title-wrap">
        <h3 className="cad-form-title">Dubai Real Estate</h3>
        <div className="cad-form-title-line" />
      </div>
      <div className="cad-fields-stack">
        <FormField id="re-name" label="Full Name *">
          <input id="re-name" type="text" name="name" required placeholder="Enter your full name" className="cad-field-input" onKeyDown={trackKeydown} />
        </FormField>
        <FormField id="re-email" label="Email Address *">
          <input id="re-email" type="email" name="email" required placeholder="your@email.com" className="cad-field-input" onKeyDown={trackKeydown} />
        </FormField>
        <FormField id="re-contact" label="Phone Number *">
          <div className="cad-phone-inner">
            <CountrySelect name="country" />
            <input id="re-contact" type="tel" name="contact" required placeholder="Phone number" className="cad-field-input cad-phone-input" onKeyDown={trackKeydown} />
          </div>
        </FormField>
        <FormField id="re-message" label="Reason for Call / Property Inquiry *">
          <textarea
            id="re-message"
            name="message"
            required
            rows={3}
            placeholder="Tell us about the property, budget, or question you want to discuss on this call..."
            className="cad-field-input"
            style={{ resize: "vertical", lineHeight: 1.5 }}
            onKeyDown={trackKeydown}
          />
        </FormField>
        <MathField id="re-math" challenge={challenge} value={mathInput} onChange={setMathInput} hasError={mathError} />
        <CaptchaField widgetRef={turnstileRef} onVerify={(tok) => setCaptchaToken(tok)} onExpire={() => setCaptchaToken("")} hasError={captchaError} />
      </div>
      <SubmitButton loading={loading} />
      <StatusMessage success={success} error={error} />
    </form>
  );
}

function HotelBookingForm() {
  const [lang, setLang] = useState("english");
  const { loading, success, error, handleSubmit, challenge, mathInput, setMathInput, mathError, setCaptchaToken, captchaError, trackKeydown, turnstileRef } = useForm("Hotel Booking DXB");
  const isArabic = lang === "arabic";
  return (
    <form onSubmit={(e) => handleSubmit(e, {
      form: isArabic ? "Hotel Booking — DXB (Arabic)" : "Hotel Booking — DXB (English)",
      language: isArabic ? "Arabic" : "English",
    })} className="cad-form-body">
      {/* Honeypot */}
      <div style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, overflow: "hidden" }} aria-hidden="true">
        <input type="text" name="hp_field" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="cad-sub-nav">
        <button type="button" className={`cad-sub-tab${lang === "english" ? " cad-sub-tab--active" : ""}`} onClick={() => setLang("english")}>English</button>
        <button type="button" className={`cad-sub-tab${lang === "arabic" ? " cad-sub-tab--active" : ""}`} onClick={() => setLang("arabic")}>Arabic / عربي</button>
      </div>
      <div className="cad-form-title-wrap">
        <h3 className="cad-form-title">{isArabic ? "Hotel Booking (Arabic)" : "Hotel Booking — DXB"}</h3>
        <div className="cad-form-title-line" />
      </div>
      <div className="cad-fields-stack">
        <FormField id="hb-name" label={isArabic ? "Name / الاسم *" : "Full Name *"}>
          <input id="hb-name" type="text" name="name" required placeholder={isArabic ? "أدخل اسمك الكامل" : "Enter your full name"} className="cad-field-input" onKeyDown={trackKeydown} />
        </FormField>
        <FormField id="hb-email" label={isArabic ? "Email / البريد الإلكتروني *" : "Email Address *"}>
          <input id="hb-email" type="email" name="email" required placeholder={isArabic ? "أدخل بريدك الإلكتروني" : "your@email.com"} className="cad-field-input" onKeyDown={trackKeydown} />
        </FormField>
        <FormField id="hb-contact" label={isArabic ? "Phone / رقم الهاتف *" : "Phone Number *"}>
          <div className="cad-phone-inner">
            <CountrySelect name="country" />
            <input id="hb-contact" type="tel" name="contact" required placeholder={isArabic ? "رقم الهاتف" : "Phone number"} className="cad-field-input cad-phone-input" onKeyDown={trackKeydown} />
          </div>
        </FormField>
        <FormField id="hb-message" label={isArabic ? "Reason for Call / سبب الاتصال *" : "Reason for Call / Booking Request *"}>
          <textarea
            id="hb-message"
            name="message"
            required
            rows={3}
            placeholder={isArabic ? "تفاصيل الحجز أو الاستفسار عن الغرف..." : "Tell us about your dates, room type, or questions for this call..."}
            className="cad-field-input"
            style={{ resize: "vertical", lineHeight: 1.5 }}
            onKeyDown={trackKeydown}
          />
        </FormField>
        <MathField id="hb-math" challenge={challenge} value={mathInput} onChange={setMathInput} hasError={mathError} />
        <CaptchaField widgetRef={turnstileRef} onVerify={(tok) => setCaptchaToken(tok)} onExpire={() => setCaptchaToken("")} hasError={captchaError} />
      </div>
      <SubmitButton loading={loading} />
      <StatusMessage success={success} error={error} />
    </form>
  );
}

function EmiratesForm() {
  const { loading, success, error, handleSubmit, challenge, mathInput, setMathInput, mathError, setCaptchaToken, captchaError, trackKeydown, turnstileRef } = useForm("Emirates Customer Care");
  return (
    <form onSubmit={(e) => handleSubmit(e, {
      form: "Emirates- Customer Care",
    })} className="cad-form-body">
      {/* Honeypot */}
      <div style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, overflow: "hidden" }} aria-hidden="true">
        <input type="text" name="hp_field" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="cad-form-title-wrap">
        <h3 className="cad-form-title">Emirates Customer Care</h3>
        <div className="cad-form-title-line" />
      </div>
      <div className="cad-fields-stack">
        <FormField id="ecc-name" label="Full Name *">
          <input id="ecc-name" type="text" name="name" required placeholder="Enter your full name" className="cad-field-input" onKeyDown={trackKeydown} />
        </FormField>
        <FormField id="ecc-email" label="Email Address *">
          <input id="ecc-email" type="email" name="email" required placeholder="your@email.com" className="cad-field-input" onKeyDown={trackKeydown} />
        </FormField>
        <FormField id="ecc-contact" label="Phone Number *">
          <div className="cad-phone-inner">
            <CountrySelect name="country" />
            <input id="ecc-contact" type="tel" name="contact" required placeholder="Phone number" className="cad-field-input cad-phone-input" onKeyDown={trackKeydown} />
          </div>
        </FormField>
        <FormField id="ecc-message" label="Reason for Call / Flight Enquiry Details *">
          <textarea
            id="ecc-message"
            name="message"
            required
            rows={3}
            placeholder="Tell us what you would like assistance with on this call (flight booking, baggage, Skywards)..."
            className="cad-field-input"
            style={{ resize: "vertical", lineHeight: 1.5 }}
            onKeyDown={trackKeydown}
          />
        </FormField>
        <MathField id="ecc-math" challenge={challenge} value={mathInput} onChange={setMathInput} hasError={mathError} />
        <CaptchaField widgetRef={turnstileRef} onVerify={(tok) => setCaptchaToken(tok)} onExpire={() => setCaptchaToken("")} hasError={captchaError} />
      </div>
      <SubmitButton loading={loading} />
      <StatusMessage success={success} error={error} />
    </form>
  );
}

function DubaiFunBrokerForm() {
  const [lang, setLang] = useState("english");
  const { loading, success, error, handleSubmit, challenge, mathInput, setMathInput, mathError, setCaptchaToken, captchaError, trackKeydown, turnstileRef } = useForm("Dubai Fun Broker");
  const isRussian = lang === "russian";
  return (
    <form onSubmit={(e) => handleSubmit(e, {
      form: isRussian ? "Dubai Fun Broker (Russian)" : "Dubai Fun Broker",
      language: isRussian ? "Russian" : "English",
    })} className="cad-form-body">
      {/* Honeypot */}
      <div style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, overflow: "hidden" }} aria-hidden="true">
        <input type="text" name="hp_field" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="cad-sub-nav">
        <button type="button" className={`cad-sub-tab${lang === "english" ? " cad-sub-tab--active" : ""}`} onClick={() => setLang("english")}>English</button>
        <button type="button" className={`cad-sub-tab${lang === "russian" ? " cad-sub-tab--active" : ""}`} onClick={() => setLang("russian")}>Русский</button>
      </div>
      <div className="cad-form-title-wrap">
        <h3 className="cad-form-title">{isRussian ? "Dubai Fun Broker (RU)" : "Dubai Fun Broker"}</h3>
        <div className="cad-form-title-line" />
      </div>
      <div className="cad-fields-stack">
        <FormField id="dfb-name" label={isRussian ? "Name / Имя *" : "Full Name *"}>
          <input id="dfb-name" type="text" name="name" required placeholder={isRussian ? "Введите имя" : "Enter your full name"} className="cad-field-input" onKeyDown={trackKeydown} />
        </FormField>
        <FormField id="dfb-email" label={isRussian ? "Email / Эл. почта *" : "Email Address *"}>
          <input id="dfb-email" type="email" name="email" required placeholder={isRussian ? "Введите email" : "your@email.com"} className="cad-field-input" onKeyDown={trackKeydown} />
        </FormField>
        <FormField id="dfb-contact" label={isRussian ? "Phone / Номер *" : "Phone Number *"}>
          <div className="cad-phone-inner">
            <CountrySelect name="country" defaultValue="7" />
            <input id="dfb-contact" type="tel" name="contact" required placeholder={isRussian ? "Номер телефона" : "Phone number"} className="cad-field-input cad-phone-input" onKeyDown={trackKeydown} />
          </div>
        </FormField>
        <FormField id="dfb-message" label={isRussian ? "Reason for Call / Причина звонка *" : "Reason for Call / Experience Requested *"}>
          <textarea
            id="dfb-message"
            name="message"
            required
            rows={3}
            placeholder={isRussian ? "Какую активность или тур вы хотите обсудить..." : "Tell us what tour or experience you would like to discuss on this call..."}
            className="cad-field-input"
            style={{ resize: "vertical", lineHeight: 1.5 }}
            onKeyDown={trackKeydown}
          />
        </FormField>
        <MathField id="dfb-math" challenge={challenge} value={mathInput} onChange={setMathInput} hasError={mathError} />
        <CaptchaField widgetRef={turnstileRef} onVerify={(tok) => setCaptchaToken(tok)} onExpire={() => setCaptchaToken("")} hasError={captchaError} />
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

  // Bot protection & CAPTCHA state
  const formLoadTime  = useRef(Date.now());
  const keydownCount  = useRef(0);
  const botToken      = useRef(generateBotToken("build-agent"));
  const [challenge, setChallenge] = useState(() => generateMathChallenge());
  const [mathInput, setMathInput] = useState("");
  const [mathError, setMathError] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaError, setCaptchaError] = useState(false);
  const turnstileRef  = useRef(null);

  if (!isOpen) return null;

  const trackKeydown = () => { keydownCount.current += 1; };

  async function handleSubmit(e) {
    e.preventDefault();
    setMathError(false);
    setCaptchaError(false);
    setError(false);

    const f = e.target;
    const name = f.bma_name.value.trim();
    const email = f.bma_email.value.trim();
    const contact = f.bma_contact.value.trim();
    const businessDetails = f.bma_business.value.trim();

    if (!name || name.length < 2) {
      setError("Please enter your full name.");
      return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!contact || contact.replace(/\D/g, "").length < 6) {
      setError("Please enter a valid phone number.");
      return;
    }
    if (!businessDetails || businessDetails.length < 5) {
      setError("Please describe your business requirements (minimum 5 characters).");
      return;
    }

    // Math verification
    const parsedMath = parseInt(mathInput.trim(), 10);
    if (isNaN(parsedMath) || parsedMath !== challenge.expectedAnswer) {
      setMathError(true);
      setChallenge(generateMathChallenge());
      setMathInput("");
      return;
    }

    // Human verification
    if (!captchaToken) {
      setCaptchaError(true);
      return;
    }

    // Honeypot check
    const honeypot = e.target.hp_field ? e.target.hp_field.value : "";
    if (honeypot) { setSuccess(true); return; }

    setLoading(true); setSuccess(false); setError(false);
    const payload = {
      form: "Build My Agent",
      name,
      email,
      country: f.bma_country.value,
      contact,
      businessDetails,
      message: businessDetails,
      mathAnswer: mathInput,
      mathToken: challenge.token,
      captchaToken,
      _hp:  honeypot,
      _age: Math.floor((Date.now() - formLoadTime.current) / 1000),
      _kc:  keydownCount.current,
      _tok: botToken.current,
    };
    try {
      const res = await fetch("/api/call-agents-webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (res.ok && result.success) {
        setSuccess(true);
        f.reset();
        setMathInput("");
        setChallenge(generateMathChallenge());
        setCaptchaToken("");
        turnstileRef.current?.reset();
      } else {
        setError(result?.error || "Submission failed. Please try again.");
        setChallenge(generateMathChallenge());
        setMathInput("");
        turnstileRef.current?.reset();
        setCaptchaToken("");
      }
    } catch {
      setError("Network error. Please try again.");
      setChallenge(generateMathChallenge());
      setMathInput("");
      turnstileRef.current?.reset();
      setCaptchaToken("");
    }
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
            {/* Honeypot */}
            <div style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, overflow: "hidden" }} aria-hidden="true">
              <input type="text" name="hp_field" tabIndex={-1} autoComplete="off" />
            </div>
            <div className="cad-fields-stack">
              <FormField id="bma-name" label="Full Name *">
                <input
                  id="bma-name" name="bma_name" type="text" required
                  placeholder="Your full name"
                  className="cad-field-input"
                  onKeyDown={trackKeydown}
                />
              </FormField>

              <FormField id="bma-email" label="Email Address *">
                <input
                  id="bma-email" name="bma_email" type="email" required
                  placeholder="your@email.com"
                  className="cad-field-input"
                  onKeyDown={trackKeydown}
                />
              </FormField>

              <FormField id="bma-contact" label="Contact Number *">
                <div className="cad-phone-inner">
                  <CountrySelect name="bma_country" />
                  <input
                    id="bma-contact" name="bma_contact" type="tel" required
                    placeholder="Phone number"
                    className="cad-field-input cad-phone-input"
                    onKeyDown={trackKeydown}
                  />
                </div>
              </FormField>

              <FormField id="bma-business" label="Business Details & Requirements *">
                <textarea
                  id="bma-business" name="bma_business" required
                  placeholder="Tell us about your business — industry, current challenges, what you'd like your AI agent to do..."
                  className="cad-field-input"
                  rows={4}
                  style={{ resize: "vertical", lineHeight: 1.6 }}
                  onKeyDown={trackKeydown}
                />
              </FormField>

              <MathField id="bma-math" challenge={challenge} value={mathInput} onChange={setMathInput} hasError={mathError} />
              <CaptchaField widgetRef={turnstileRef} onVerify={(tok) => setCaptchaToken(tok)} onExpire={() => setCaptchaToken("")} hasError={captchaError} />
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

            {error && <div className="cad-status-msg cad-status-error">✗ {typeof error === "string" ? error : "Something went wrong. Please try again."}</div>}
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
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://devmatesolutions.com/callagents" />
        <link rel="icon" href="/red-logo.png" type="image/png" />
        <link rel="shortcut icon" href="/red-logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/red-logo.png" />
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
              <a href="/aileadmanagementdubairealestate" className="cad-btn-ghost cad-btn-ghost--light">
                Explore Lead Management System
                <i className="fal fa-arrow-right" style={{ marginLeft: 6 }}></i>
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
