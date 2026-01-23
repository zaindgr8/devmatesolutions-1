"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const EXPIRY_TIME_MS = 60 * 60 * 1000; // 1 hour in milliseconds
const BOOKING_URL = "https://cal.com/devmate-solutions/secret";

const ConsultationPayment = () => {
  const router = useRouter();
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);

  // Check for payment success on mount (after redirect from Ziina)
  useEffect(() => {
    const checkPaymentReturn = async () => {
      const { payment } = router.query;

      if (payment === "success") {
        setIsVerifying(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        unlockAccess();
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 5000);
        setIsVerifying(false);
        router.replace("/book-meeting#booking", undefined, { shallow: true });
      } else if (payment === "cancelled") {
        setPaymentError("Payment was cancelled. Please try again.");
        router.replace("/book-meeting#booking", undefined, { shallow: true });
      }
    };

    if (router.isReady) {
      checkPaymentReturn();
    }
  }, [router.isReady, router.query]);

  // Check localStorage on mount for existing unlock
  useEffect(() => {
    const checkAndUpdateUnlockStatus = () => {
      const unlockedData = localStorage.getItem("ceo_consultation_unlocked");

      if (unlockedData) {
        try {
          const { timestamp } = JSON.parse(unlockedData);
          const now = Date.now();
          const elapsed = now - timestamp;

          if (elapsed < EXPIRY_TIME_MS) {
            setIsUnlocked(true);
            const remaining = EXPIRY_TIME_MS - elapsed;
            setTimeRemaining(Math.ceil(remaining / 1000));
          } else {
            localStorage.removeItem("ceo_consultation_unlocked");
            setIsUnlocked(false);
            setTimeRemaining(null);
          }
        } catch (e) {
          localStorage.removeItem("ceo_consultation_unlocked");
          setIsUnlocked(false);
        }
      }
    };

    checkAndUpdateUnlockStatus();
    const interval = setInterval(checkAndUpdateUnlockStatus, 1000);
    return () => clearInterval(interval);
  }, []);

  // Countdown timer
  useEffect(() => {
    if (timeRemaining !== null && timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0) {
      localStorage.removeItem("ceo_consultation_unlocked");
      setIsUnlocked(false);
      setTimeRemaining(null);
    }
  }, [timeRemaining]);

  const unlockAccess = () => {
    const unlockData = {
      timestamp: Date.now(),
      unlocked: true,
    };
    localStorage.setItem("ceo_consultation_unlocked", JSON.stringify(unlockData));
    setIsUnlocked(true);
    setTimeRemaining(EXPIRY_TIME_MS / 1000);
  };

  const formatTimeRemaining = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m ${secs.toString().padStart(2, "0")}s`;
    }
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handlePaymentClick = async () => {
    setIsPaymentLoading(true);
    setPaymentError(null);

    try {
      const response = await fetch("/api/ziina-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (data.success && data.redirect_url) {
        window.location.href = data.redirect_url;
      } else {
        setPaymentError(
          data.error || "Failed to create payment. Please try again."
        );
        setIsPaymentLoading(false);
      }
    } catch (error) {
      console.error("Payment error:", error);
      setPaymentError("Connection error. Please try again.");
      setIsPaymentLoading(false);
    }
  };

  // Show verifying state
  if (isVerifying) {
    return (
      <div className="text-center py-6">
        <div className="inline-flex items-center gap-2 text-gray-500">
          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-sm">Verifying payment...</span>
        </div>
      </div>
    );
  }

  // If unlocked, show the booking button
  if (isUnlocked) {
    return (
      <div className="text-center">
        {showSuccess && (
          <p className="text-green-600 text-sm mb-4">✓ Payment successful</p>
        )}

        {timeRemaining !== null && (
          <p className="text-gray-400 text-xs mb-4">
            Expires in {formatTimeRemaining(timeRemaining)}
          </p>
        )}

        <Link
          href={BOOKING_URL}
          target="_blank"
          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg transition-all duration-200"
        >
          Book Your Session
          <i className="fal fa-arrow-right text-sm"></i>
        </Link>
      </div>
    );
  }

  // Default: Show just the payment button
  return (
    <div className="text-center">
      {paymentError && (
        <p className="text-red-500 text-sm mb-4">{paymentError}</p>
      )}

      {/* Pay Button - Minimalist */}
      <button
        onClick={handlePaymentClick}
        disabled={isPaymentLoading}
        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#B91C1B] hover:bg-[#991B1B] disabled:bg-gray-400 text-white font-medium rounded-lg transition-all duration-200 disabled:cursor-not-allowed"
      >
        {isPaymentLoading ? (
          <>
            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </>
        ) : (
          <>
            Pay $286 & Unlock
            <i className="fal fa-arrow-right text-sm"></i>
          </>
        )}
      </button>
    </div>
  );
};

export default ConsultationPayment;
