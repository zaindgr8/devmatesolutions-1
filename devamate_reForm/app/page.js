"use client";

import React, { useState, useEffect } from "react";

const FORMS = [
  { id: "real-estate", label: "Dubai Real Estate" },
  { id: "hotel-booking", label: "Hotel Booking — DXB" },
  { id: "emirates-customer-care", label: "Emirates- Customer Care" },
];

const PRIVATE_FORMS = [
  { id: "dubai-fun-broker", label: "Dubai Fun Broker" },
];

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

function CountrySelect({ name, defaultValue = "971" }) {
  return (
    <select
      name={name}
      defaultValue={defaultValue}
      className="country-select"
    >
      {COUNTRIES.map((c) => (
        <option key={c.code} value={c.code}>
          {c.flag} +{c.code}
        </option>
      ))}
    </select>
  );
}

function FormField({ id, label, children }) {
  return (
    <div className="field-group">
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      {children}
    </div>
  );
}

function StatusMessage({ success, error }) {
  if (success)
    return (
      <div className="status-msg status-success">
        ✓ Submitted successfully. We'll be in touch shortly.
      </div>
    );
  if (error)
    return (
      <div className="status-msg status-error">
        ✗ Something went wrong. Please try again.
      </div>
    );
  return null;
}

function SubmitButton({ loading }) {
  return (
    <button type="submit" className="submit-btn" disabled={loading}>
      {loading ? (
        <span className="btn-inner">
          <svg className="spinner" viewBox="0 0 24 24" fill="none">
            <circle className="spinner-track" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
            <path className="spinner-arc" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Sending…
        </span>
      ) : (
        "Submit"
      )}
    </button>
  );
}

/* ─── Individual Forms ─────────────────────────────────────── */

function RealEstateForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError]   = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true); setSuccess(false); setError(false);
    const f = e.target;
    const payload = {
      form: "Dubai Real Estate",
      name: f.name.value,
      email: f.email?.value || "",
      country: f.country.value,
      contact: f.contact.value,
    };
    try {
      const res = await fetch("/api/webhook", {
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
    <form onSubmit={handleSubmit} className="form-body">
      <div className="form-title-wrap">
        <h1 className="form-title">Dubai Real Estate</h1>
        <div className="form-title-line" />
      </div>
      <div className="fields-stack">
        <FormField id="re-name" label="Name">
          <input id="re-name" type="text" name="name" required placeholder="Enter your name" className="field-input" />
        </FormField>
        <FormField id="re-email" label="Email Address">
          <input id="re-email" type="email" name="email" placeholder="Enter your email" className="field-input" />
        </FormField>
        <FormField id="re-contact" label="Phone Number">
          <div className="phone-row">
            <CountrySelect name="country" />
            <input id="re-contact" type="tel" name="contact" required placeholder="Phone number" className="field-input phone-input" />
          </div>
        </FormField>
      </div>
      <SubmitButton loading={loading} />
      <StatusMessage success={success} error={error} />
    </form>
  );
}

function HotelBookingForm() {
  const [language, setLanguage] = useState("english");
  const [loading, setLoading]   = useState(false);
  const [success, setSuccess]   = useState(false);
  const [error, setError]       = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true); setSuccess(false); setError(false);
    const f = e.target;
    const isArabic = language === "arabic";
    const payload = {
      form: isArabic ? "Hotel Booking — DXB (Arabic)" : "Hotel Booking — DXB (English)",
      language: isArabic ? "Arabic" : "English",
      name: f.name.value,
      email: f.email?.value || "",
      country: f.country.value,
      contact: f.contact.value,
    };
    try {
      const res = await fetch("/api/webhook", {
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

  const isArabic = language === "arabic";

  return (
    <form onSubmit={handleSubmit} className="form-body">
      {/* Sub Tab Menu */}
      <div className="sub-nav-bar">
        <button
          type="button"
          className={`sub-nav-tab${language === "english" ? " sub-nav-tab--active" : ""}`}
          onClick={() => { setLanguage("english"); setSuccess(false); setError(false); }}
        >
          English
        </button>
        <button
          type="button"
          className={`sub-nav-tab${language === "arabic" ? " sub-nav-tab--active" : ""}`}
          onClick={() => { setLanguage("arabic"); setSuccess(false); setError(false); }}
        >
          Arabic
        </button>
      </div>

      <div className="form-title-wrap">
        <h1 className="form-title">
          {isArabic ? "Hotel Booking — DXB (Arabic)" : "Hotel Booking — DXB"}
        </h1>
        <div className="form-title-line" />
      </div>

      <div className="fields-stack">
        <FormField id="hb-name" label={isArabic ? "Name / الاسم" : "Name"}>
          <input
            id="hb-name"
            type="text"
            name="name"
            required
            placeholder={isArabic ? "Enter your name / أدخل اسمك" : "Enter your name"}
            className="field-input"
          />
        </FormField>
        <FormField id="hb-email" label={isArabic ? "Email Address / البريد الإلكتروني" : "Email Address"}>
          <input
            id="hb-email"
            type="email"
            name="email"
            placeholder={isArabic ? "Enter your email / أدخل بريدك الإلكتروني" : "Enter your email"}
            className="field-input"
          />
        </FormField>
        <FormField id="hb-contact" label={isArabic ? "Phone Number / رقم الهاتف" : "Phone Number"}>
          <div className="phone-row">
            <CountrySelect name="country" />
            <input
              id="hb-contact"
              type="tel"
              name="contact"
              required
              placeholder={isArabic ? "Phone number / رقم الهاتف" : "Phone number"}
              className="field-input phone-input"
            />
          </div>
        </FormField>
      </div>
      <SubmitButton loading={loading} />
      <StatusMessage success={success} error={error} />
    </form>
  );
}

function EmiratesCustomerCareForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError]   = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true); setSuccess(false); setError(false);
    const f = e.target;
    const payload = {
      form: "Emirates- Customer Care",
      name: f.name.value,
      email: f.email?.value || "",
      country: f.country.value,
      contact: f.contact.value,
    };
    try {
      const res = await fetch("/api/webhook", {
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
    <form onSubmit={handleSubmit} className="form-body">
      <div className="form-title-wrap">
        <h1 className="form-title">Emirates- Customer Care</h1>
        <div className="form-title-line" />
      </div>
      <div className="fields-stack">
        <FormField id="ecc-name" label="Name">
          <input id="ecc-name" type="text" name="name" required placeholder="Enter your name" className="field-input" />
        </FormField>
        <FormField id="ecc-email" label="Email Address">
          <input id="ecc-email" type="email" name="email" placeholder="Enter your email" className="field-input" />
        </FormField>
        <FormField id="ecc-contact" label="Phone Number">
          <div className="phone-row">
            <CountrySelect name="country" />
            <input id="ecc-contact" type="tel" name="contact" required placeholder="Phone number" className="field-input phone-input" />
          </div>
        </FormField>
      </div>
      <SubmitButton loading={loading} />
      <StatusMessage success={success} error={error} />
    </form>
  );
}

function DubaiFunBrokerForm() {
  const [language, setLanguage] = useState("english");
  const [loading, setLoading]   = useState(false);
  const [success, setSuccess]   = useState(false);
  const [error, setError]       = useState(false);

  const isRussian = language === "russian";

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true); setSuccess(false); setError(false);
    const f = e.target;
    const payload = {
      form: isRussian ? "Dubai Fun Broker (Russian)" : "Dubai Fun Broker",
      language: isRussian ? "Russian" : "English",
      name: f.name.value,
      email: f.email?.value || "",
      country: f.country.value,
      contact: f.contact.value,
    };
    try {
      const res = await fetch("/api/webhook", {
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
    <form onSubmit={handleSubmit} className="form-body">
      {/* Sub Tab Menu */}
      <div className="sub-nav-bar">
        <button
          type="button"
          className={`sub-nav-tab${language === "english" ? " sub-nav-tab--active" : ""}`}
          onClick={() => { setLanguage("english"); setSuccess(false); setError(false); }}
        >
          English
        </button>
        <button
          type="button"
          className={`sub-nav-tab${language === "russian" ? " sub-nav-tab--active" : ""}`}
          onClick={() => { setLanguage("russian"); setSuccess(false); setError(false); }}
        >
          Russian
        </button>
      </div>

      <div className="form-title-wrap">
        <h1 className="form-title">
          {isRussian ? "Dubai Fun Broker (Russian)" : "Dubai Fun Broker"}
        </h1>
        <div className="form-title-line" />
      </div>

      <div className="fields-stack">
        <FormField id="dfb-name" label={isRussian ? "Name / Имя" : "Name"}>
          <input
            id="dfb-name"
            type="text"
            name="name"
            required
            placeholder={isRussian ? "Enter your name / Введите имя" : "Enter your name"}
            className="field-input"
          />
        </FormField>
        <FormField id="dfb-email" label={isRussian ? "Email Address / Эл. почта" : "Email Address"}>
          <input
            id="dfb-email"
            type="email"
            name="email"
            placeholder={isRussian ? "Enter your email / Введите email" : "Enter your email"}
            className="field-input"
          />
        </FormField>
        <FormField id="dfb-contact" label={isRussian ? "Phone Number / Номер телефона" : "Phone Number"}>
          <div className="phone-row">
            <CountrySelect name="country" defaultValue="7" />
            <input
              id="dfb-contact"
              type="tel"
              name="contact"
              required
              placeholder={isRussian ? "Phone number / Номер телефона" : "Phone number"}
              className="field-input phone-input"
            />
          </div>
        </FormField>
      </div>
      <SubmitButton loading={loading} />
      <StatusMessage success={success} error={error} />
    </form>
  );
}

/* ─── Private Login Modal ─────────────────────────────────── */

function PrivateLoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState(false);

  if (!isOpen) return null;

  function handleSubmit(e) {
    e.preventDefault();
    if (username.trim() === "devmate" && password === "Wegrowtogether@yo1") {
      setError(false);
      onLoginSuccess();
    } else {
      setError(true);
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close-btn" onClick={onClose}>
          ✕
        </button>

        <div className="modal-header">
          <h2 className="modal-title">Private Use-Cases</h2>
          <div className="form-title-line" />
          <p className="modal-subtitle">Sign in to access private custom forms</p>
        </div>

        <form onSubmit={handleSubmit} className="form-body">
          <div className="fields-stack">
            <FormField id="modal-user" label="Username">
              <input
                id="modal-user"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="field-input"
                required
                autoFocus
              />
            </FormField>

            <FormField id="modal-pass" label="Password">
              <input
                id="modal-pass"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="field-input"
                required
              />
            </FormField>
          </div>

          <button type="submit" className="submit-btn">
            Sign In
          </button>

          {error && (
            <div className="status-msg status-error">
              ✗ Invalid username or password. Please try again.
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

/* ─── Page Shell ───────────────────────────────────────────── */

export default function Home() {
  const [mounted, setMounted]           = useState(false);
  const [activeForm, setActiveForm]     = useState("real-estate");
  const [activePrivateForm, setActivePrivateForm] = useState("dubai-fun-broker");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginModal, setShowLoginModal]   = useState(false);
  const [activeSection, setActiveSection]     = useState("public"); // "public" | "private"

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const storedAuth = sessionStorage.getItem("devmate_private_auth");
      if (storedAuth === "true") {
        setIsAuthenticated(true);
      }
    }
  }, []);

  function handleLoginSuccess() {
    setIsAuthenticated(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("devmate_private_auth", "true");
    }
    setShowLoginModal(false);
    setActiveSection("private");
  }

  if (!mounted) {
    return (
      <div className="page-shell">
        <div className="skeleton-pulse">
          <div className="sk-bar sk-bar--short" />
          <div className="sk-bar sk-bar--long" />
          <div className="sk-bar sk-bar--long" />
          <div className="sk-bar sk-bar--btn" />
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell">
      {/* ── Top Bar ── */}
      <div className="top-header-bar">
        <button
          type="button"
          className={`private-nav-btn${isAuthenticated ? " private-nav-btn--unlocked" : ""}`}
          onClick={() => {
            if (isAuthenticated) {
              setActiveSection(activeSection === "private" ? "public" : "private");
            } else {
              setShowLoginModal(true);
            }
          }}
        >
          <svg className="lock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {isAuthenticated ? (
              <path d="M8 11V7a4 4 0 118 0v4m-8 0h8a2 2 0 012 2v7a2 2 0 01-2 2H6a2 2 0 01-2-2v-7a2 2 0 012-2z" />
            ) : (
              <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a5 5 0 00-10 0v4h10z" />
            )}
          </svg>
          <span>{activeSection === "private" ? "Public Forms" : "Private Use-Cases"}</span>
          {isAuthenticated && <span className="unlocked-dot" />}
        </button>
      </div>

      {/* ── Logo ── */}
      <header className="page-header">
        <a href="https://devmatesolutions.com" target="_blank" rel="noopener noreferrer" className="logo-link">
          <div className="logo-title">
            <span className="logo-mate">DEVMATE</span><span className="logo-solutions"> SOLUTIONS</span>
          </div>
          <div className="logo-subtitle">DXB | NY | MUSCAT</div>
        </a>
      </header>

      {/* ── Public Form Card ── */}
      {activeSection === "public" && (
        <main className="card">
          {/* Form Switcher */}
          <nav className="form-nav" aria-label="Select form">
            {FORMS.map((f) => (
              <button
                key={f.id}
                type="button"
                className={`nav-tab${activeForm === f.id ? " nav-tab--active" : ""}`}
                onClick={() => setActiveForm(f.id)}
              >
                {f.label}
              </button>
            ))}
          </nav>

          {/* Active Form */}
          <div className="form-area">
            {activeForm === "real-estate" && <RealEstateForm />}
            {activeForm === "hotel-booking" && <HotelBookingForm />}
            {activeForm === "emirates-customer-care" && <EmiratesCustomerCareForm />}
          </div>
        </main>
      )}

      {/* ── Private Use-Cases Card ── */}
      {activeSection === "private" && (
        <main className="card">
          <div className="private-header-bar">
            <span className="private-badge">
              <svg className="lock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 11V7a4 4 0 118 0v4m-8 0h8a2 2 0 012 2v7a2 2 0 01-2 2H6a2 2 0 01-2-2v-7a2 2 0 012-2z" />
              </svg>
              Private Use-Cases
            </span>
            <button
              type="button"
              className="private-action-btn"
              onClick={() => {
                setIsAuthenticated(false);
                if (typeof window !== "undefined") {
                  sessionStorage.removeItem("devmate_private_auth");
                }
                setActiveSection("public");
              }}
            >
              Lock & Sign Out
            </button>
          </div>

          {/* Private Form Switcher */}
          <nav className="form-nav" aria-label="Select private form">
            {PRIVATE_FORMS.map((f) => (
              <button
                key={f.id}
                type="button"
                className={`nav-tab${activePrivateForm === f.id ? " nav-tab--active" : ""}`}
                onClick={() => setActivePrivateForm(f.id)}
              >
                {f.label}
              </button>
            ))}
          </nav>

          {/* Active Private Form */}
          <div className="form-area">
            {activePrivateForm === "dubai-fun-broker" && <DubaiFunBrokerForm />}
          </div>
        </main>
      )}

      {/* ── Login Modal ── */}
      <PrivateLoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* ── Footer ── */}
      <footer className="page-footer">
        <a href="mailto:management@devmatesolutions.com" className="footer-link">
          management@devmatesolutions.com
        </a>
        <span className="footer-sep">·</span>
        <a href="https://devmatesolutions.com" target="_blank" rel="noopener noreferrer" className="footer-link">
          devmatesolutions.com
        </a>
      </footer>
    </div>
  );
}
