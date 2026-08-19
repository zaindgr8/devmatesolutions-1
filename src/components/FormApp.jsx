"use client";

import React, { useState } from "react";

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

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(false);

    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const country = form.country.value;
    const contact = form.contact.value.trim();
    const query = form.query ? form.query.value.trim() : "";

    // Detect source page for the notification email
    const source =
      customSource ||
      (typeof window !== "undefined"
        ? isCallRequest
          ? `Get Instant Call (${window.location.pathname})`
          : `Website (${window.location.pathname})`
        : "Website");

    const payload = { name, email, country, contact, query, source };

    try {
      // 1. If this is an Instant Call form, trigger Make.com webhook for the 60s phone call
      if (isCallRequest) {
        fetch("https://hook.eu2.make.com/1zy2xcx4j4twvg8f1gbjqbcxlstd2r6v", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }).catch((err) => console.warn("Make calling webhook error:", err));
      }

      // 2. Direct email submission (sends notification to contact@devmatesolutions.com and user confirmation email)
      const res = await fetch("/api/send-lead-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSubmittedData(payload);
        setSuccess(true);
        form.reset();
      } else {
        setError(true);
      }
    } catch {
      setError(true);
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
                Something went wrong. Please check your connection and try again.
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
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
                  />
                </div>
              </div>

              {/* Query / Reason */}
              <div className="dm-form-group">
                <label className="dm-form-label" htmlFor="inq-query">
                  Reason for Meeting / Your Query
                </label>
                <textarea
                  id="inq-query"
                  name="query"
                  placeholder="What would you like to discuss with our team?"
                  className="dm-form-input"
                  style={{ minHeight: "84px", resize: "vertical" }}
                  disabled={loading}
                />
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
                    {buttonText}
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
        }
      ` }} />
    </div>
  );
};

export default FormApp;
