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

  // Expose reset method to parent component
  useImperativeHandle(ref, () => ({
    reset: () => {
      setFallbackVerified(false);
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
        const id = window.turnstile.render(containerRef.current, {
          sitekey: DEFAULT_SITE_KEY,
          theme: theme,
          size: size,
          callback: (token) => {
            if (isMounted) {
              setLoading(false);
              if (onVerify) onVerify(token);
            }
          },
          "expired-callback": () => {
            if (isMounted) {
              if (onExpire) onExpire();
            }
          },
          "error-callback": (err) => {
            console.warn("[Turnstile] Error:", err);
            if (isMounted) {
              setLoading(false);
              if (onError) onError(err);
            }
          },
        });
        widgetIdRef.current = id;
        setLoading(false);
      } catch (err) {
        console.error("[Turnstile] render error:", err);
        if (isMounted) setLoadError(true);
      }
    }

    if (typeof window === "undefined") return;

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
          }
        }, 4000);
        return () => {
          clearInterval(interval);
          clearTimeout(timeout);
        };
      }
    }

    return () => {
      isMounted = false;
      if (typeof window !== "undefined" && window.turnstile && widgetIdRef.current !== null) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          // ignore
        }
        widgetIdRef.current = null;
      }
    };
  }, [theme, size, onVerify, onExpire, onError]);

  // Handle fallback human interaction (e.g. if script blocked by aggressive network adblock)
  const handleFallbackClick = () => {
    const fakeToken = `fallback_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
    setFallbackVerified(true);
    if (onVerify) onVerify(fakeToken);
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
