import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";

// ── CSS ───────────────────────────────────────────────────────────
const CSS = `
  /* ── Modal Overlay ── */
  .dm-modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.65);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    z-index: 99999;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    animation: dm-overlay-in 0.2s ease;
  }
  @keyframes dm-overlay-in {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  /* ── Modal Box ── */
  .dm-modal-box {
    background: #fff;
    border-radius: 20px;
    width: 100%;
    max-width: 500px;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
    box-shadow: 0 32px 80px rgba(0,0,0,0.2);
    animation: dm-modal-in 0.25s cubic-bezier(0.34,1.56,0.64,1);
    scrollbar-width: thin;
    scrollbar-color: #f0f0f0 transparent;
  }
  .dm-modal-box::-webkit-scrollbar { width: 4px; }
  .dm-modal-box::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 4px; }

  @keyframes dm-modal-in {
    from { opacity: 0; transform: scale(0.92) translateY(20px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }

  /* ── Modal Header ── */
  .dm-modal-header {
    position: sticky;
    top: 0;
    background: #fff;
    border-bottom: 1px solid #f3f4f6;
    padding: 22px 28px 18px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
    z-index: 2;
    border-radius: 20px 20px 0 0;
  }
  .dm-modal-header-text {}
  .dm-modal-title {
    font-size: 19px;
    font-weight: 900;
    color: #0d0d0d;
    letter-spacing: -0.5px;
    margin: 0 0 2px;
    line-height: 1.2;
  }
  .dm-modal-sub {
    font-size: 12.5px;
    color: #9ca3af;
    margin: 0;
    font-weight: 500;
  }
  .dm-modal-close {
    flex-shrink: 0;
    width: 32px; height: 32px;
    border: 1.5px solid #e5e7eb;
    border-radius: 50%;
    background: #fff;
    color: #6b7280;
    font-size: 14px;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.18s ease;
    line-height: 1;
    padding: 0;
    margin-top: 2px;
  }
  .dm-modal-close:hover {
    background: #0d0d0d;
    border-color: #0d0d0d;
    color: #fff;
  }

  /* ── Modal Body ── */
  .dm-modal-body {
    padding: 24px 28px 28px;
  }

  /* ── Price badge ── */
  .dm-price-badge {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: #fef2f2;
    border: 1px solid #fecaca;
    border-radius: 10px;
    padding: 10px 16px;
    margin-bottom: 22px;
    width: 100%;
    box-sizing: border-box;
  }
  .dm-price-badge-amount {
    font-size: 26px;
    font-weight: 900;
    color: #c0392b;
    letter-spacing: -1px;
    line-height: 1;
  }
  .dm-price-badge-info {
    display: flex;
    flex-direction: column;
    gap: 1px;
  }
  .dm-price-badge-label {
    font-size: 12px;
    color: #6b7280;
    font-weight: 600;
  }
  .dm-price-badge-highlight {
    font-size: 12px;
    color: #c0392b;
    font-weight: 700;
  }

  /* ── Form fields ── */
  .dm-form-group {
    margin-bottom: 16px;
  }
  .dm-form-label {
    display: block;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #374151;
    margin-bottom: 5px;
  }
  .dm-form-input {
    width: 100%;
    border: 1.5px solid #e5e7eb;
    border-radius: 8px;
    padding: 11px 13px;
    font-size: 14px;
    font-family: inherit;
    color: #0d0d0d;
    background: #fff;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
    box-sizing: border-box;
    outline: none;
    appearance: none;
  }
  .dm-form-input:focus {
    border-color: #c0392b;
    box-shadow: 0 0 0 3px rgba(192,57,43,0.07);
  }
  .dm-form-input::placeholder { color: #d1d5db; }
  .dm-form-input.dm-error { border-color: #ef4444; }
  textarea.dm-form-input {
    resize: vertical;
    min-height: 88px;
  }
  .dm-field-error {
    font-size: 11px;
    color: #ef4444;
    margin-top: 3px;
    font-weight: 600;
  }

  /* ── API error alert ── */
  .dm-alert-error {
    background: #fef2f2;
    border: 1px solid #fecaca;
    border-radius: 8px;
    padding: 10px 14px;
    font-size: 13px;
    color: #c0392b;
    font-weight: 600;
    margin-bottom: 14px;
    display: flex;
    align-items: flex-start;
    gap: 8px;
  }

  /* ── Submit button ── */
  .dm-submit-btn {
    width: 100%;
    padding: 14px 24px;
    background: #0d0d0d;
    color: #fff;
    border: none;
    border-radius: 10px;
    font-size: 15px;
    font-weight: 800;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    transition: background 0.2s ease, transform 0.15s ease;
    margin-top: 6px;
    font-family: inherit;
    letter-spacing: -0.2px;
  }
  .dm-submit-btn:hover:not(:disabled) {
    background: #c0392b;
    transform: translateY(-1px);
  }
  .dm-submit-btn:disabled {
    opacity: 0.65;
    cursor: not-allowed;
    transform: none;
  }
  .dm-submit-btn-price {
    font-size: 12px;
    opacity: 0.7;
    font-weight: 600;
  }

  /* ── Spinner ── */
  @keyframes dm-spin { to { transform: rotate(360deg); } }
  .dm-spinner {
    width: 15px; height: 15px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: dm-spin 0.7s linear infinite;
    flex-shrink: 0;
  }

  /* ── Trust strip ── */
  .dm-trust-strip {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 14px;
    margin-top: 14px;
    flex-wrap: wrap;
  }
  .dm-trust-item {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 10.5px;
    font-weight: 600;
    color: #9ca3af;
  }
  .dm-trust-item i { font-size: 11px; }

  /* ── Verifying / Success inside modal ── */
  .dm-verifying {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 32px 0;
    font-size: 14px;
    color: #6b7280;
    font-weight: 600;
    justify-content: center;
  }
  .dm-verifying-spinner {
    width: 18px; height: 18px;
    border: 2.5px solid #e5e7eb;
    border-top-color: #c0392b;
    border-radius: 50%;
    animation: dm-spin 0.7s linear infinite;
    flex-shrink: 0;
  }

  .dm-success-wrap {
    text-align: center;
    padding: 8px 0 12px;
  }
  .dm-success-icon {
    width: 60px; height: 60px;
    background: #fef2f2;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 16px;
    font-size: 26px;
    color: #c0392b;
  }
  .dm-success-title {
    font-size: 20px;
    font-weight: 900;
    color: #0d0d0d;
    margin: 0 0 8px;
    letter-spacing: -0.5px;
  }
  .dm-success-sub {
    font-size: 13.5px;
    color: #4b5563;
    line-height: 1.65;
    margin: 0 0 20px;
  }
  .dm-success-detail {
    padding: 14px 16px;
    background: #f9fafb;
    border-radius: 10px;
    font-size: 13px;
    color: #374151;
    line-height: 1.7;
    text-align: left;
  }
  .dm-success-detail strong { color: #0d0d0d; }

  /* ── Trigger buttons row ── */
  .dm-btn-row {
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }

  /* ── Trigger button (paid — red) ── */
  .dm-book-trigger-btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 16px 36px;
    font-size: 15px;
    font-weight: 800;
    color: #fff;
    background: #B91C1B;
    border: none;
    border-radius: 14px;
    cursor: pointer;
    font-family: inherit;
    letter-spacing: -0.2px;
    transition: background 0.25s ease, transform 0.2s ease, box-shadow 0.25s ease;
    box-shadow: 0 8px 28px rgba(185,28,27,0.3);
    overflow: hidden;
  }
  .dm-book-trigger-btn:hover {
    background: #0d0d0d;
    transform: translateY(-2px);
    box-shadow: 0 16px 40px rgba(0,0,0,0.18);
  }
  .dm-book-trigger-btn i {
    font-size: 16px;
    transition: transform 0.2s ease;
  }
  .dm-book-trigger-btn:hover i { transform: rotate(12deg); }

  /* ── Trigger button (free — outline) ── */
  .dm-book-free-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 13px 28px;
    font-size: 14px;
    font-weight: 700;
    color: #374151;
    background: #fff;
    border: 1.5px solid #e5e7eb;
    border-radius: 12px;
    cursor: pointer;
    font-family: inherit;
    transition: all 0.2s ease;
  }
  .dm-book-free-btn:hover {
    border-color: #0d0d0d;
    color: #0d0d0d;
    background: #f9fafb;
    transform: translateY(-1px);
  }
  .dm-book-free-btn i { font-size: 14px; }
`;

// ── Validation ────────────────────────────────────────────────────
function validate(fields) {
  const errors = {};
  if (!fields.name.trim()) errors.name = "Full name is required";
  if (!fields.email.trim()) {
    errors.email = "Email address is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = "Enter a valid email address";
  }
  if (!fields.phone.trim()) {
    errors.phone = "Contact number is required";
  } else if (fields.phone.trim().length < 7) {
    errors.phone = "Enter a valid contact number";
  }
  if (!fields.reason.trim()) {
    errors.reason = "Please describe your reason for the meeting";
  }
  return errors;
}

// ── Main Component ────────────────────────────────────────────────
const ConsultationPayment = ({ mode = "buttons" }) => {
  const router = useRouter();
  const overlayRef = useRef(null);
  const freeOverlayRef = useRef(null);

  // ── CEO session (paid) states ──
  const [isOpen, setIsOpen] = useState(false);
  const [fields, setFields] = useState({ name: '', email: '', phone: '', reason: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookedData, setBookedData] = useState(null);
  const [emailSent, setEmailSent] = useState(false);

  // ── Free team meeting states ──
  const [isFreeOpen, setIsFreeOpen] = useState(false);
  const [freeFields, setFreeFields] = useState({ name: '', email: '', phone: '', reason: '' });
  const [freeErrors, setFreeErrors] = useState({});
  const [freeTouched, setFreeTouched] = useState({});
  const [isFreeSubmitting, setIsFreeSubmitting] = useState(false);
  const [freeApiError, setFreeApiError] = useState(null);
  const [isFreeSuccess, setIsFreeSuccess] = useState(false);
  const [freeBookedData, setFreeBookedData] = useState(null);

  // ── Global event listeners ──
  useEffect(() => {
    if (mode !== "global") return;

    const handleOpenFree = () => {
      setIsFreeOpen(true);
      setIsFreeSuccess(false);
      setFreeFields({ name: '', email: '', phone: '', reason: '' });
      setFreeErrors({});
      setFreeTouched({});
      setFreeApiError(null);
    };

    const handleOpenPaid = () => {
      setIsOpen(true);
      setIsSuccess(false);
      setFields({ name: '', email: '', phone: '', reason: '' });
      setErrors({});
      setTouched({});
      setApiError(null);
    };

    window.addEventListener("open-free-consultation", handleOpenFree);
    window.addEventListener("open-paid-consultation", handleOpenPaid);

    return () => {
      window.removeEventListener("open-free-consultation", handleOpenFree);
      window.removeEventListener("open-paid-consultation", handleOpenPaid);
    };
  }, [mode]);

  // ── On return from Ziina redirect ──────────────────────────────
  useEffect(() => {
    if (mode !== "global") return;
    if (!router.isReady) return;
    const { payment } = router.query;

    if (payment === "success") {
      setIsOpen(true);
      setIsVerifying(true);

      let savedData = null;
      try {
        const raw = sessionStorage.getItem("dm_booking_data");
        if (raw) savedData = JSON.parse(raw);
      } catch (_) {}

      const finalize = async () => {
        await new Promise((r) => setTimeout(r, 1800));
        if (savedData) {
          setBookedData(savedData);
          try {
            const emailRes = await fetch("/api/send-booking-email", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(savedData),
            });
            if (emailRes.ok) setEmailSent(true);
          } catch (_) {}
          sessionStorage.removeItem("dm_booking_data");
        }
        setIsVerifying(false);
        setIsSuccess(true);
        router.replace(router.pathname, undefined, { shallow: true });
      };

      finalize();
    } else if (payment === "cancelled") {
      setIsOpen(true);
      setApiError("Payment was cancelled. Please try again.");
      router.replace(router.pathname, undefined, { shallow: true });
    }
  }, [router.isReady, router.query]);

  // ── Close modals on Escape ─────────────────────────────────────
  useEffect(() => {
    if (!isOpen && !isFreeOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        if (isOpen && !isVerifying) handleClose();
        if (isFreeOpen && !isFreeSubmitting) setIsFreeOpen(false);
      }
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, isFreeOpen, isVerifying, isFreeSubmitting]);

  const handleClose = () => { if (!isVerifying) setIsOpen(false); };
  const handleOverlayClick = (e) => { if (e.target === overlayRef.current) handleClose(); };
  const handleFreeOverlayClick = (e) => { if (e.target === freeOverlayRef.current && !isFreeSubmitting) setIsFreeOpen(false); };

  // ── CEO field handlers ─────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) setErrors((prev) => ({ ...prev, ...validate({ ...fields, [name]: value }) }));
  };
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate({ ...fields, [name]: value }));
  };

  // ── Free field handlers ────────────────────────────────────────
  const handleFreeChange = (e) => {
    const { name, value } = e.target;
    setFreeFields((prev) => ({ ...prev, [name]: value }));
    if (freeTouched[name]) setFreeErrors((prev) => ({ ...prev, ...validate({ ...freeFields, [name]: value }) }));
  };
  const handleFreeBlur = (e) => {
    const { name, value } = e.target;
    setFreeTouched((prev) => ({ ...prev, [name]: true }));
    setFreeErrors(validate({ ...freeFields, [name]: value }));
  };

  // ── CEO submit (paid) ──────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    const allTouched = { name: true, email: true, phone: true, reason: true };
    setTouched(allTouched);
    const validationErrors = validate(fields);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    setIsSubmitting(true); setApiError(null);
    const payload = { name: fields.name.trim(), email: fields.email.trim(), phone: fields.phone.trim(), reason: fields.reason.trim() };
    try {
      sessionStorage.setItem('dm_booking_data', JSON.stringify(payload));
      const response = await fetch('/api/ziina-payment', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (data.success && data.redirect_url) {
        window.location.href = data.redirect_url;
      } else {
        setApiError(data.error || 'Failed to initiate payment. Please try again.');
        setIsSubmitting(false);
      }
    } catch (err) {
      setApiError('Connection error. Please check your internet and try again.');
      setIsSubmitting(false);
    }
  };

  // ── Free team submit ───────────────────────────────────────────
  const handleFreeSubmit = async (e) => {
    e.preventDefault();
    const allTouched = { name: true, email: true, phone: true, reason: true };
    setFreeTouched(allTouched);
    const validationErrors = validate(freeFields);
    setFreeErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    setIsFreeSubmitting(true); setFreeApiError(null);
    const payload = { name: freeFields.name.trim(), email: freeFields.email.trim(), phone: freeFields.phone.trim(), reason: freeFields.reason.trim(), meetingType: 'team' };
    try {
      const response = await fetch('/api/send-booking-email', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (data.success) {
        setFreeBookedData(payload);
        setIsFreeSuccess(true);
      } else {
        setFreeApiError(data.error || 'Failed to send request. Please try again.');
      }
    } catch (err) {
      setFreeApiError('Connection error. Please check your internet and try again.');
    } finally {
      setIsFreeSubmitting(false);
    }
  };

  // ── Modal inner content ────────────────────────────────────────
  const renderModalContent = () => {
    if (isVerifying) {
      return (
        <div className="dm-modal-body">
          <div className="dm-verifying">
            <div className="dm-verifying-spinner" />
            Verifying your payment...
          </div>
        </div>
      );
    }

    if (isSuccess) {
      return (
        <div className="dm-modal-body">
          <div className="dm-success-wrap">
            <div className="dm-success-icon">✓</div>
            <h3 className="dm-success-title">Session Booked!</h3>
            <p className="dm-success-sub">
              Your 1:1 Discovery Session has been confirmed.{" "}
              {emailSent
                ? "A confirmation email has been sent to your inbox."
                : "Our team will reach out to you shortly."}
            </p>
            {bookedData && (
              <div className="dm-success-detail">
                <strong>Name:</strong> {bookedData.name}<br />
                <strong>Email:</strong> {bookedData.email}<br />
                <strong>Phone:</strong> {bookedData.phone}<br />
                <strong>Amount Paid:</strong> $299 USD<br /><br />
                We'll contact you to confirm the <strong>exact date &amp; time</strong> of your session.
              </div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="dm-modal-body">
        {/* Price badge */}
        <div className="dm-price-badge">
          <span className="dm-price-badge-amount">$299</span>
          <div className="dm-price-badge-info">
            <span className="dm-price-badge-label">per session</span>
            <span className="dm-price-badge-highlight">1:1 with CEO — Zain Ul Abideen</span>
          </div>
        </div>

        {/* API error */}
        {apiError && (
          <div className="dm-alert-error">
            <i className="fal fa-exclamation-circle" style={{ marginTop: 1 }} />
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Full Name */}
          <div className="dm-form-group">
            <label className="dm-form-label" htmlFor="dm-name">Full Name</label>
            <input
              id="dm-name"
              name="name"
              type="text"
              className={`dm-form-input${errors.name && touched.name ? " dm-error" : ""}`}
              placeholder="ENTER YOUR NAME"
              value={fields.name}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="name"
            />
            {errors.name && touched.name && <p className="dm-field-error">{errors.name}</p>}
          </div>

          {/* Email */}
          <div className="dm-form-group">
            <label className="dm-form-label" htmlFor="dm-email">Email Address</label>
            <input
              id="dm-email"
              name="email"
              type="email"
              className={`dm-form-input${errors.email && touched.email ? " dm-error" : ""}`}
              placeholder="ENTER YOUR EMAIL"
              value={fields.email}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="email"
            />
            {errors.email && touched.email && <p className="dm-field-error">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div className="dm-form-group">
            <label className="dm-form-label" htmlFor="dm-phone">Contact Number</label>
            <input
              id="dm-phone"
              name="phone"
              type="tel"
              className={`dm-form-input${errors.phone && touched.phone ? " dm-error" : ""}`}
              placeholder="ENTER YOUR PHONE NUMBER"
              value={fields.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="tel"
            />
            {errors.phone && touched.phone && <p className="dm-field-error">{errors.phone}</p>}
          </div>

          {/* Reason */}
          <div className="dm-form-group">
            <label className="dm-form-label" htmlFor="dm-reason">Reason for Meeting</label>
            <textarea
              id="dm-reason"
              name="reason"
              className={`dm-form-input${errors.reason && touched.reason ? " dm-error" : ""}`}
              placeholder="Briefly describe what you'd like to discuss — e.g. launching an AI product, scaling my agency, business strategy..."
              value={fields.reason}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.reason && touched.reason && <p className="dm-field-error">{errors.reason}</p>}
          </div>

          {/* Submit */}
          <button type="submit" className="dm-submit-btn" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <div className="dm-spinner" />
                Redirecting to payment...
              </>
            ) : (
              <>
                Proceed to Pay
                <span className="dm-submit-btn-price">— $299 USD</span>
                <i className="fal fa-long-arrow-right" />
              </>
            )}
          </button>
        </form>

        {/* Trust signals */}
        <div className="dm-trust-strip">
          <span className="dm-trust-item"><i className="fal fa-lock" /> Secure Payment</span>
          <span className="dm-trust-item"><i className="fal fa-shield-check" /> Ziina Protected</span>
          <span className="dm-trust-item"><i className="fal fa-envelope" /> Email Confirmation</span>
        </div>
      </div>
    );
  };

  // ── Render ─────────────────────────────────────────────────────
  return (
    <>
      <style>{CSS}</style>

      {/* ── Buttons row ── */}
      {mode === "buttons" && (
        <div className="dm-btn-row">
          {/* Paid CEO session */}
          <button className="dm-book-trigger-btn" onClick={() => window.dispatchEvent(new CustomEvent("open-paid-consultation"))}>
            Book Your 1:1 Session (299$)
            <i className="fal fa-calendar-check" />
          </button>

          {/* Free team meeting */}
          <button className="dm-book-free-btn" onClick={() => window.dispatchEvent(new CustomEvent("open-free-consultation"))}>
            <i className="fal fa-users" />
            Book Meeting With Team (FREE)
          </button>
        </div>
      )}

      {/* ── CEO Session Modal (paid) ── */}
      {mode === "global" && isOpen && (
        <div className="dm-modal-overlay" ref={overlayRef} onClick={handleOverlayClick}>
          <div className="dm-modal-box">
            <div className="dm-modal-header">
              <div className="dm-modal-header-text">
                <h2 className="dm-modal-title">
                  {isSuccess ? 'Session Confirmed ✓' : 'Book Your 1:1 Session'}
                </h2>
                <p className="dm-modal-sub">
                  {isSuccess ? "You'll be contacted to confirm the exact time" : 'Fill in your details and proceed to payment'}
                </p>
              </div>
              {!isVerifying && (
                <button className="dm-modal-close" onClick={handleClose} aria-label="Close">
                  <i className="fal fa-times" />
                </button>
              )}
            </div>
            {renderModalContent()}
          </div>
        </div>
      )}

      {/* ── Free Team Meeting Modal ── */}
      {mode === "global" && isFreeOpen && (
        <div className="dm-modal-overlay" ref={freeOverlayRef} onClick={handleFreeOverlayClick}>
          <div className="dm-modal-box">
            {/* Header */}
            <div className="dm-modal-header">
              <div className="dm-modal-header-text">
                <h2 className="dm-modal-title">
                  {isFreeSuccess ? 'Request Sent ✓' : 'Book a Free Team Meeting'}
                </h2>
                <p className="dm-modal-sub">
                  {isFreeSuccess ? "We'll reach out to confirm your meeting time" : 'Fill in your details — completely free'}
                </p>
              </div>
              {!isFreeSubmitting && (
                <button className="dm-modal-close" onClick={() => setIsFreeOpen(false)} aria-label="Close">
                  <i className="fal fa-times" />
                </button>
              )}
            </div>

            {/* Body */}
            <div className="dm-modal-body">
              {isFreeSuccess ? (
                /* Success state */
                <div className="dm-success-wrap">
                  <div className="dm-success-icon">✓</div>
                  <h3 className="dm-success-title">Request Received!</h3>
                  <p className="dm-success-sub">
                    Thanks <strong>{freeBookedData?.name}</strong>! A confirmation has been sent to your email.
                    Our team will contact you shortly to schedule the meeting.
                  </p>
                  {freeBookedData && (
                    <div className="dm-success-detail">
                      <strong>Name:</strong> {freeBookedData.name}<br />
                      <strong>Email:</strong> {freeBookedData.email}<br />
                      <strong>Phone:</strong> {freeBookedData.phone}<br />
                      <strong>Session:</strong> Free Team Meeting
                    </div>
                  )}
                </div>
              ) : (
                /* Form */
                <>
                  {/* FREE badge */}
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, padding: '10px 16px', marginBottom: 22, width: '100%', boxSizing: 'border-box' }}>
                    <span style={{ fontSize: 22, fontWeight: 900, color: '#c0392b', letterSpacing: -1 }}>FREE</span>
                    <div>
                      <div style={{ fontSize: 12, color: '#6b7280', fontWeight: 600 }}>No payment required</div>
                      <div style={{ fontSize: 12, color: '#c0392b', fontWeight: 700 }}>Team consultation meeting</div>
                    </div>
                  </div>

                  {freeApiError && (
                    <div className="dm-alert-error">
                      <i className="fal fa-exclamation-circle" style={{ marginTop: 1 }} />
                      {freeApiError}
                    </div>
                  )}

                  <form onSubmit={handleFreeSubmit} noValidate>
                    <div className="dm-form-group">
                      <label className="dm-form-label" htmlFor="dm-free-name">Full Name</label>
                      <input id="dm-free-name" name="name" type="text"
                        className={`dm-form-input${freeErrors.name && freeTouched.name ? ' dm-error' : ''}`}
                        placeholder="ENTER YOUR NAME"
                        value={freeFields.name} onChange={handleFreeChange} onBlur={handleFreeBlur} autoComplete="name" />
                      {freeErrors.name && freeTouched.name && <p className="dm-field-error">{freeErrors.name}</p>}
                    </div>

                    <div className="dm-form-group">
                      <label className="dm-form-label" htmlFor="dm-free-email">Email Address</label>
                      <input id="dm-free-email" name="email" type="email"
                        className={`dm-form-input${freeErrors.email && freeTouched.email ? ' dm-error' : ''}`}
                        placeholder="ENTER YOUR EMAIL"
                        value={freeFields.email} onChange={handleFreeChange} onBlur={handleFreeBlur} autoComplete="email" />
                      {freeErrors.email && freeTouched.email && <p className="dm-field-error">{freeErrors.email}</p>}
                    </div>

                    <div className="dm-form-group">
                      <label className="dm-form-label" htmlFor="dm-free-phone">Contact Number</label>
                      <input id="dm-free-phone" name="phone" type="tel"
                        className={`dm-form-input${freeErrors.phone && freeTouched.phone ? ' dm-error' : ''}`}
                        placeholder="ENTER YOUR PHONE NUMBER"
                        value={freeFields.phone} onChange={handleFreeChange} onBlur={handleFreeBlur} autoComplete="tel" />
                      {freeErrors.phone && freeTouched.phone && <p className="dm-field-error">{freeErrors.phone}</p>}
                    </div>

                    <div className="dm-form-group">
                      <label className="dm-form-label" htmlFor="dm-free-reason">Reason for Meeting</label>
                      <textarea id="dm-free-reason" name="reason"
                        className={`dm-form-input${freeErrors.reason && freeTouched.reason ? ' dm-error' : ''}`}
                        placeholder="What would you like to discuss with our team?"
                        value={freeFields.reason} onChange={handleFreeChange} onBlur={handleFreeBlur} />
                      {freeErrors.reason && freeTouched.reason && <p className="dm-field-error">{freeErrors.reason}</p>}
                    </div>

                    <button type="submit" className="dm-submit-btn"
                      disabled={isFreeSubmitting}>
                      {isFreeSubmitting ? (
                        <><div className="dm-spinner" />Sending request...</>
                      ) : (
                        <>Request Free Meeting <i className="fal fa-long-arrow-right" /></>
                      )}
                    </button>
                  </form>

                  <div className="dm-trust-strip">
                    <span className="dm-trust-item"><i className="fal fa-check-circle" /> 100% Free</span>
                    <span className="dm-trust-item"><i className="fal fa-envelope" /> Email Confirmation</span>
                    <span className="dm-trust-item"><i className="fal fa-clock" /> Quick Response</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConsultationPayment;
