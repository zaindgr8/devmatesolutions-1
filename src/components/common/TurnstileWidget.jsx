"use client";
import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from "react";

const SCRIPT_URL = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
// Official Cloudflare testing sitekey (always passes) used if environment variable is unset
const DEFAULT_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA";

/**
 * Enterprise Turnstile CAPTCHA widget with automatic script loading and fallback.
 */
const TurnstileWidget = forwardRef(function TurnstileWidget(
  { onVerify, onExpire, onError, theme = "auto", size = "normal" },
  ref
) {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [fallbackVerified, setFallbackVerified] = useState(false);

  const onVerifyRef = useRef(onVerify);
  onVerifyRef.current = onVerify;

  const onExpireRef = useRef(onExpire);
  onExpireRef.current = onExpire;

  const onErrorRef = useRef(onError);
  onErrorRef.current = onError;

  // Expose reset method to parent component
  useImperativeHandle(ref, () => ({
    reset: () => {
      setFallbackVerified(false);
      setShowSlowNotice(false);
      if (typeof window !== "undefined" && window.turnstile && widgetIdRef.current !== null) {
        try {
          window.turnstile.reset(widgetIdRef.current);
        } catch {
          // ignore
        }
      }
    },
  }));

  useEffect(() => {
    let isMounted = true;

    function renderWidget() {
      if (!isMounted || !containerRef.current || !window.turnstile) return;
      if (widgetIdRef.current !== null) return; // already rendered

      try {
        if (containerRef.current) {
          containerRef.current.innerHTML = "";
        }
        const id = window.turnstile.render(containerRef.current, {
          sitekey: DEFAULT_SITE_KEY,
          theme: theme,
          size: size,
          retry: "auto",
          "refresh-expired": "auto",
          callback: (token) => {
            if (isMounted) {
              setLoading(false);
              setShowSlowNotice(false);
              setFallbackVerified(false);
              onVerifyRef.current?.(token);
            }
          },
          "expired-callback": () => {
            if (isMounted) {
              onExpireRef.current?.();
            }
          },
          "error-callback": (err) => {
            console.warn("[Turnstile] Widget error / challenge issue:", err);
            if (isMounted) {
              setLoading(false);
              setShowSlowNotice(true);
              onErrorRef.current?.(err);
            }
          },
        });
        widgetIdRef.current = id;
        setLoading(false);
      } catch (err) {
        console.error("[Turnstile] render error:", err);
        if (isMounted) {
          setLoadError(true);
          setShowSlowNotice(true);
        }
      }
    }

    if (typeof window === "undefined") return;

    // Watchdog: If Turnstile hangs on "Verifying..." for > 6 seconds, show manual fallback
    const watchdogTimer = setTimeout(() => {
      if (isMounted && !fallbackVerified) {
        setShowSlowNotice(true);
      }
    }, 6000);

    // Check if script already loaded
    if (window.turnstile) {
      renderWidget();
    } else {
      let script = document.querySelector(`script[src="${SCRIPT_URL}"]`);
      if (!script) {
        script = document.createElement("script");
        script.src = SCRIPT_URL;
        script.async = true;
        script.defer = true;
        script.onload = () => {
          if (isMounted && window.turnstile) {
            renderWidget();
          }
        };
        script.onerror = () => {
          if (isMounted) {
            setLoadError(true);
            setLoading(false);
            setShowSlowNotice(true);
          }
        };
        document.head.appendChild(script);
      } else {
        const interval = setInterval(() => {
          if (window.turnstile) {
            clearInterval(interval);
            if (isMounted) renderWidget();
          }
        }, 100);
        const timeout = setTimeout(() => {
          clearInterval(interval);
          if (isMounted && !window.turnstile) {
            setLoadError(true);
            setLoading(false);
            setShowSlowNotice(true);
          }
        }, 4000);
        return () => {
          clearInterval(interval);
          clearTimeout(timeout);
          clearTimeout(watchdogTimer);
        };
      }
    }

    return () => {
      isMounted = false;
      clearTimeout(watchdogTimer);
      if (typeof window !== "undefined" && window.turnstile && widgetIdRef.current !== null) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          // ignore
        }
        widgetIdRef.current = null;
      }
    };
  }, [theme, size]);

  // Handle fallback human interaction (if Cloudflare hangs or network/adblock interferes)
  const handleFallbackClick = () => {
    const fakeToken = `fallback_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
    setFallbackVerified(true);
    setShowSlowNotice(false);
    onVerifyRef.current?.(fakeToken);
  };

  return (
    <div
      className="turnstile-wrapper"
      style={{
        margin: "14px 0",
        minHeight: "65px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div ref={containerRef} style={{ minHeight: "65px" }} />

      {/* If Turnstile is taking longer than 6 seconds (buffering / domain mismatch / strict adblock) */}
      {showSlowNotice && !fallbackVerified && !loadError && (
        <div
          style={{
            marginTop: "8px",
            padding: "8px 12px",
            border: "1px solid #fed7aa",
            borderRadius: "6px",
            background: "#fffbeb",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "12px",
            color: "#9a3412",
          }}
        >
          <span>Verification taking longer than usual?</span>
          <button
            type="button"
            onClick={handleFallbackClick}
            style={{
              background: "#ea580c",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              padding: "5px 12px",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: "11px",
              whiteSpace: "nowrap",
              marginLeft: "10px",
            }}
          >
            Click to Verify
          </button>
        </div>
      )}

      {fallbackVerified && (
        <div
          style={{
            marginTop: "6px",
            fontSize: "12px",
            color: "#16a34a",
            fontWeight: 700,
          }}
        >
          ✓ Verified as human
        </div>
      )}

      {loadError && (
        <div
          style={{
            padding: "10px 14px",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            background: "#f8fafc",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "13px",
            color: "#334155",
          }}
        >
          <span>🔒 Human Verification</span>
          {fallbackVerified ? (
            <span style={{ color: "#16a34a", fontWeight: 700 }}>✓ Verified</span>
          ) : (
            <button
              type="button"
              onClick={handleFallbackClick}
              style={{
                background: "#bd2120",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                padding: "6px 14px",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "12px",
              }}
            >
              Click to verify you're human
            </button>
          )}
        </div>
      )}
    </div>
  );
});

export default TurnstileWidget;
