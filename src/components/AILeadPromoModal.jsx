import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const AILeadPromoModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Don't show if already on the /aileadmanagement page
    if (router.pathname === "/aileadmanagement") {
      return;
    }

    // Check if user already dismissed or interacted with it in this session
    const hasSeen = typeof window !== "undefined" && sessionStorage.getItem("devmate_lead_promo_seen");
    if (hasSeen) {
      return;
    }

    // Trigger popup after exactly 4 seconds
    const timer = setTimeout(() => {
      // Re-verify route before opening
      if (window.location.pathname !== "/aileadmanagement") {
        setIsOpen(true);
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [router.pathname]);

  const handleClose = () => {
    setIsOpen(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("devmate_lead_promo_seen", "true");
    }
  };

  const handleGoToPage = () => {
    handleClose();
    router.push("/aileadmanagement");
  };

  if (!isOpen) return null;

  return (
    <div className="ailm-promo-backdrop" onClick={handleClose}>
      <div
        className="ailm-promo-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="ailm-promo-close"
          onClick={handleClose}
          aria-label="Close modal"
        >
          &times;
        </button>

        {/* Header Graphic / Badge */}
        <div className="ailm-promo-badge-wrap">
          <span className="ailm-promo-badge">
            <span className="ailm-promo-dot"></span>
            AI Lead Management System
          </span>
        </div>

        {/* Content */}
        <h3 className="ailm-promo-title">
          Stop losing real estate leads <span className="ailm-red">overnight.</span>
        </h3>

        <p className="ailm-promo-desc">
          Every portal enquiry answered in seconds, qualified in <strong>Arabic &amp; English</strong>, and booked directly into your brokers' calendars — 24/7.
        </p>

        {/* Key Points */}
        <div className="ailm-promo-features">
          <div className="ailm-promo-feature-item">
            <div className="ailm-promo-icon-circle">
              <i className="fal fa-bolt"></i>
            </div>
            <div>
              <strong>&lt; 60s First Response</strong>
              <p>Instant engagement on WhatsApp, Bayut, Property Finder &amp; Meta</p>
            </div>
          </div>

          <div className="ailm-promo-feature-item">
            <div className="ailm-promo-icon-circle">
              <i className="fal fa-globe"></i>
            </div>
            <div>
              <strong>Native Multilingual</strong>
              <p>Flawless Arabic &amp; English conversation triage for UAE buyers</p>
            </div>
          </div>

          <div className="ailm-promo-feature-item">
            <div className="ailm-promo-icon-circle">
              <i className="fal fa-calendar-check"></i>
            </div>
            <div>
              <strong>Automated Viewing Booking</strong>
              <p>Pre-qualifies budget and books ready buyers into your CRM</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="ailm-promo-actions">
          <button
            className="ailm-btn-primary ailm-promo-btn-primary"
            onClick={handleGoToPage}
          >
            Explore AI Lead System
            <i className="fal fa-long-arrow-right ml-2"></i>
          </button>

          <button
            className="ailm-promo-btn-dismiss"
            onClick={handleClose}
          >
            No thanks, maybe later
          </button>
        </div>
      </div>
    </div>
  );
};

export default AILeadPromoModal;
