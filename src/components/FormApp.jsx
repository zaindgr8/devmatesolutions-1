"use client";

import React, { useState, useRef, useEffect } from "react";
import TurnstileWidget from "./common/TurnstileWidget";
import { generateMathChallenge } from "../lib/mathChallenge";

// ── Client-side bot token (lightweight HMAC-like fingerprint) ──────────────
function generateBotToken(formId) {
  const ts = Date.now();
  let hash = 0;
  const raw = `${formId}:${ts}:dm_devmate_2024`;
  for (let i = 0; i < raw.length; i++) {
    hash = ((hash << 5) - hash + raw.charCodeAt(i)) | 0;
  }
  return `${ts}.${Math.abs(hash).toString(36)}`;
}

const FormApp = ({
  title = "Get Instant Call",
  subtitle = "Fill in your details — receive a call from DevMate Solutions within 60 seconds",
  badgeLabel,
  badgeSub,
  badgeHighlight,
  triggerCall,
  source: customSource,
  buttonText,
  onClose,
}) => {
  const isCallRequest = triggerCall !== undefined ? triggerCall : (title && title.toLowerCase().includes("call"));

  const finalBadgeLabel = badgeLabel || (isCallRequest ? "LIVE CALL" : "INQUIRY");
  const finalBadgeSub = badgeSub || (isCallRequest ? "Get a call within 60 seconds" : "Direct Consultation & Solutions Brief");
  const finalBadgeHighlight = badgeHighlight || (isCallRequest ? "Instant connection to DevMate Solutions team" : "No payment required · Tailored to your use case");
  const finalButtonText = buttonText || (isCallRequest ? "Get Call in 60 Seconds" : "Submit Inquiry");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // ── Bot-protection & CAPTCHA state ─────────────────────────────────────────
  const formLoadTime = useRef(Date.now());
  const keydownCount = useRef(0);
  const [challenge, setChallenge] = useState(() => generateMathChallenge());
  const [mathInput, setMathInput] = useState("");
  const [mathError, setMathError] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaError, setCaptchaError] = useState(false);
  const turnstileRef = useRef(null);
  const botToken = useRef(generateBotToken("instant-call"));

  // Reset challenge each time modal opens
  useEffect(() => {
    formLoadTime.current = Date.now();
    keydownCount.current = 0;
    botToken.current = generateBotToken("instant-call");
    setChallenge(generateMathChallenge());
    setMathInput("");
    setMathError(false);
    setCaptchaToken("");
    setCaptchaError(false);
  }, []);

  const trackKeydown = () => { keydownCount.current += 1; };

  async function handleSubmit(e) {
    e.preventDefault();
    setMathError(false);
    setCaptchaError(false);
    setError(false);
    setErrorMessage("");

    const form = e.target;
    const name    = form.name.value.trim();
    const email   = form.email.value.trim();
    const country = form.country.value;
    const contact = form.contact.value.trim();
    const query   = form.query ? form.query.value.trim() : "";

    // ── Validation checks ──
    if (!name || name.length < 2) {
      setError(true);
      setErrorMessage("Please enter your full name.");
      return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(true);
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (!contact || contact.replace(/\D/g, "").length < 6) {
      setError(true);
      setErrorMessage("Please enter a valid phone number.");
      return;
    }
    if (!query || query.length < 4) {
      setError(true);
      setErrorMessage("Please provide a message / reason for your call (minimum 4 characters).");
      return;
    }

    // ── Math CAPTCHA verification ──
    const parsedMath = parseInt(mathInput.trim(), 10);
    if (isNaN(parsedMath) || parsedMath !== challenge.expectedAnswer) {
      setMathError(true);
      setChallenge(generateMathChallenge());
      setMathInput("");
      return;
    }

    // ── Turnstile Human verification check ──
    if (!captchaToken) {
      setCaptchaError(true);
      return;
    }

    setLoading(true);
    setSuccess(false);

    // ── Honeypot check (silently drop) ──
    const honeypot = form.hp_field ? form.hp_field.value : "";
    if (honeypot) {
      setSuccess(true);
      setLoading(false);
      return;
    }

    const formAge = Math.floor((Date.now() - formLoadTime.current) / 1000);
    const keyCount = keydownCount.current;

    const source =
      customSource ||
      (typeof window !== "undefined"
        ? isCallRequest
          ? `Get Instant Call (${window.location.pathname})`
          : `Website (${window.location.pathname})`
        : "Website");

    const payload = {
      name, email, country, contact, query, source,
      mathAnswer: mathInput,
      mathToken: challenge.token,
      captchaToken,
      isCallRequest,
      _hp: honeypot,
      _age: formAge,
      _kc: keyCount,
      _tok: botToken.current,
    };

    try {
      // Direct email & calling submission to secure Next.js API
      const res = await fetch("/api/send-lead-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        setSubmittedData(payload);
        setSuccess(true);
        form.reset();
        setMathInput("");
        setChallenge(generateMathChallenge());
        setCaptchaToken("");
        turnstileRef.current?.reset();
      } else {
        setError(true);
        setErrorMessage(data?.error || "Submission failed. Please try again.");
        setChallenge(generateMathChallenge());
        setMathInput("");
        turnstileRef.current?.reset();
        setCaptchaToken("");
      }
    } catch {
      setError(true);
      setErrorMessage("Network error occurred. Please try again.");
      setChallenge(generateMathChallenge());
      setMathInput("");
      turnstileRef.current?.reset();
      setCaptchaToken("");
    }
    setLoading(false);
  }

  return (
    <div className="dm-inquiry-form-wrapper">
      {/* ── Modal Header ── */}
      <div className="dm-modal-header">
        <div className="dm-modal-header-text">
          <h2 className="dm-modal-title">{success ? "Request Confirmed ✓" : title}</h2>
          <p className="dm-modal-sub">
            {success ? "Details sent to your email & call initiated" : subtitle}
          </p>
        </div>
        {onClose && (
          <button className="dm-modal-close" onClick={onClose} aria-label="Close" type="button">
            <i className="fal fa-times" />
          </button>
        )}
      </div>

      {/* ── Modal Body ── */}
      <div className="dm-modal-body">
        {success ? (
          /* Success Screen */
          <div className="dm-success-wrap">
            <div className="dm-success-icon">✓</div>
            <h3 className="dm-success-title">
              {isCallRequest ? "Call is on its way! 📞" : "Inquiry Received! 🚀"}
            </h3>
            <p className="dm-success-sub">
              Thanks <strong>{submittedData?.name}</strong>!{" "}
              {isCallRequest
                ? "You will receive a call from DevMate Solutions on your phone within the next 60 seconds."
                : "We've received your details."}{" "}
              A confirmation email has also been sent to <strong>{submittedData?.email}</strong>.
            </p>
            {submittedData && (
              <div className="dm-success-detail">
                <strong>Name:</strong> {submittedData.name}<br />
                <strong>Email:</strong> {submittedData.email}<br />
                <strong>Contact Number:</strong> {submittedData.country} {submittedData.contact}<br />
                {submittedData.query && (
                  <><strong>Query / Requirements:</strong> {submittedData.query}<br /></>
                )}
                <strong>Type:</strong> {submittedData.source}
              </div>
            )}
            <button
              onClick={onClose}
              className="dm-submit-btn"
              style={{ marginTop: 24 }}
              type="button"
            >
              Done
            </button>
          </div>
        ) : (
          /* Form Content */
          <>
            {/* Top Badge Card */}
            <div className="dm-inquiry-badge-card">
              <span className="dm-inquiry-badge-tag">{finalBadgeLabel}</span>
              <div>
                <div className="dm-inquiry-badge-sub">{finalBadgeSub}</div>
                <div className="dm-inquiry-badge-highlight">{finalBadgeHighlight}</div>
              </div>
            </div>

            {error && (
              <div className="dm-alert-error">
                <i className="fal fa-exclamation-circle" style={{ marginTop: 1 }} />
                {errorMessage || "Something went wrong. Please check your connection and try again."}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              {/* ── Honeypot hidden field (never visible to humans) ── */}
              <div style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, overflow: "hidden" }} aria-hidden="true">
                <input
                  type="text"
                  name="hp_field"
                  tabIndex={-1}
                  autoComplete="off"
                  placeholder="Leave this blank"
                />
              </div>

              {/* Name */}
              <div className="dm-form-group">
                <label className="dm-form-label" htmlFor="inq-name">
                  Full Name <span style={{ color: "#bd2120" }}>*</span>
                </label>
                <input
                  id="inq-name"
                  name="name"
                  type="text"
                  required
                  placeholder="ENTER YOUR FULL NAME"
                  className="dm-form-input"
                  disabled={loading}
                  onKeyDown={trackKeydown}
                />
              </div>

              {/* Email */}
              <div className="dm-form-group">
                <label className="dm-form-label" htmlFor="inq-email">
                  Email Address <span style={{ color: "#bd2120" }}>*</span>
                </label>
                <input
                  id="inq-email"
                  name="email"
                  type="email"
                  required
                  placeholder="ENTER YOUR EMAIL"
                  className="dm-form-input"
                  disabled={loading}
                  onKeyDown={trackKeydown}
                />
              </div>

              {/* Contact Number */}
              <div className="dm-form-group">
                <label className="dm-form-label" htmlFor="inq-contact">
                  Contact Number <span style={{ color: "#bd2120" }}>*</span>
                </label>
                <div style={{ display: "flex", gap: "8px" }}>
                  <select
                    name="country"
                    aria-label="Country Code"
                    className="dm-form-input"
                    style={{ width: "120px", flexShrink: 0, paddingRight: "8px" }}
                    defaultValue="+971"
                    disabled={loading}
                  >
                    <option value="+971">🇦🇪 +971</option>
                    <option value="+966">🇸🇦 +966</option>
                    <option value="+968">🇴🇲 +968</option>
                    <option value="+974">🇶🇦 +974</option>
                    <option value="+965">🇰🇼 +965</option>
                    <option value="+973">🇧🇭 +973</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+49">🇩🇪 +49</option>
                    <option value="+33">🇫🇷 +33</option>
                    <option value="+39">🇮🇹 +39</option>
                    <option value="+34">🇪🇸 +34</option>
                    <option value="+41">🇨🇭 +41</option>
                    <option value="+31">🇳🇱 +31</option>
                    <option value="+32">🇧🇪 +32</option>
                    <option value="+46">🇸🇪 +46</option>
                    <option value="+48">🇵🇱 +48</option>
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+92">🇵🇰 +92</option>
                  </select>
                  <input
                    id="inq-contact"
                    name="contact"
                    type="tel"
                    required
                    placeholder="ENTER YOUR PHONE NUMBER"
                    className="dm-form-input"
                    style={{ flex: 1 }}
                    disabled={loading}
                    onKeyDown={trackKeydown}
                  />
                </div>
              </div>

              {/* Query / Reason */}
              <div className="dm-form-group">
                <label className="dm-form-label" htmlFor="inq-query">
                  Reason for Call / Message <span style={{ color: "#bd2120" }}>*</span>
                </label>
                <textarea
                  id="inq-query"
                  name="query"
                  required
                  placeholder="Tell us what you would like to discuss on this call..."
                  className="dm-form-input"
                  style={{ minHeight: "84px", resize: "vertical" }}
                  disabled={loading}
                  onKeyDown={trackKeydown}
                />
              </div>

              {/* ── Math CAPTCHA ── */}
              <div className="dm-form-group">
                <label className="dm-form-label" htmlFor="inq-math">
                  Math Check: What is <strong style={{ color: "#bd2120" }}>{challenge.question}</strong>?{" "}
                  <span style={{ color: "#bd2120" }}>*</span>
                </label>
                <input
                  id="inq-math"
                  name="mathAnswer"
                  type="number"
                  inputMode="numeric"
                  placeholder="Enter the math answer"
                  className={`dm-form-input${mathError ? " dm-error" : ""}`}
                  value={mathInput}
                  onChange={(e) => { setMathInput(e.target.value); setMathError(false); }}
                  disabled={loading}
                  autoComplete="off"
                  required
                />
                {mathError && (
                  <p style={{ fontSize: "11px", color: "#ef4444", marginTop: "3px", fontWeight: 600 }}>
                    ✗ Incorrect answer — please solve the new question above.
                  </p>
                )}
              </div>

              {/* ── Human Verification / CAPTCHA ── */}
              <div className="dm-form-group" style={{ marginBottom: "16px" }}>
                <label className="dm-form-label" style={{ marginBottom: "6px" }}>
                  Security Verification <span style={{ color: "#bd2120" }}>*</span>
                </label>
                <TurnstileWidget
                  ref={turnstileRef}
                  theme="light"
                  onVerify={(tok) => {
                    setCaptchaToken(tok);
                    setCaptchaError(false);
                  }}
                  onExpire={() => setCaptchaToken("")}
                  onError={() => setCaptchaToken("")}
                />
                {captchaError && (
                  <p style={{ fontSize: "11px", color: "#ef4444", marginTop: "4px", fontWeight: 600 }}>
                    ✗ Please complete the security verification above.
                  </p>
                )}
              </div>

              {/* Submit */}
              <button type="submit" className="dm-submit-btn" disabled={loading}>
                {loading ? (
                  <>
                    <div className="dm-spinner" />
                    Submitting...
                  </>
                ) : (
                  <>
                    {finalButtonText}
                    <i className="fal fa-long-arrow-right" />
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .dm-inquiry-form-wrapper {
          width: 100%;
        }
        .dm-inquiry-badge-card {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 10px;
          padding: 11px 16px;
          margin-bottom: 20px;
          width: 100%;
          box-sizing: border-box;
        }
        .dm-inquiry-badge-tag {
          font-size: 20px;
          font-weight: 900;
          color: #bd2120;
          letter-spacing: -0.5px;
          line-height: 1;
        }
        .dm-inquiry-badge-sub {
          font-size: 12px;
          color: #6b7280;
          font-weight: 600;
        }
        .dm-inquiry-badge-highlight {
          font-size: 12px;
          color: #bd2120;
          font-weight: 700;
        }
        .dm-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
          flex-shrink: 0;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .dm-form-input.dm-error {
          border-color: #ef4444;
          box-shadow: 0 0 0 3px rgba(239,68,68,0.07);
        }
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type=number] { -moz-appearance: textfield; }
      ` }} />
    </div>
  );
};

export default FormApp;
