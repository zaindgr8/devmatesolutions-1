import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

export default function PaySuccessPage() {
  const router  = useRouter();
  const orderId = router.query.order || "";
  const [count, setCount] = useState(5);

  // Auto-redirect to home after 5 seconds
  useEffect(() => {
    if (!router.isReady) return;
    const t = setInterval(() => {
      setCount((c) => {
        if (c <= 1) { clearInterval(t); router.push("/"); }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [router.isReady]);

  return (
    <>
      <Head>
        <title>Payment Successful — DevMate Solutions</title>
        <meta name="description" content="Your crypto payment was received successfully." />
      </Head>

      <div style={styles.page}>
        <div style={styles.orb1} />
        <div style={styles.orb2} />

        <div style={styles.card}>
          {/* Animated checkmark */}
          <div style={styles.iconWrap}>
            <svg style={styles.icon} viewBox="0 0 52 52">
              <circle cx="26" cy="26" r="25" fill="none" stroke="url(#g)" strokeWidth="2" />
              <defs>
                <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
              <path
                fill="none"
                stroke="#6366f1"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14 27 l9 9 l16 -16"
              />
            </svg>
            <div style={styles.iconGlow} />
          </div>

          <h1 style={styles.title}>Payment Received!</h1>
          <p style={styles.subtitle}>
            Thank you for your payment. Your transaction has been successfully
            submitted to the blockchain.
          </p>

          {orderId && (
            <div style={styles.orderBox}>
              <span style={styles.orderLabel}>Order ID</span>
              <span style={styles.orderValue}>{orderId}</span>
            </div>
          )}

          <div style={styles.infoBox}>
            <p style={styles.infoText}>
              📧 A confirmation will be sent to your email once the payment is
              confirmed on-chain. This typically takes a few minutes.
            </p>
          </div>

          <div style={styles.actions}>
            <Link href="/" style={styles.btnPrimary}>
              Return to Home
            </Link>
            <Link href="/contact" style={styles.btnSecondary}>
              Contact Support
            </Link>
          </div>

          <p style={styles.redirect}>
            Redirecting to home in{" "}
            <span style={styles.countdown}>{count}s</span>…
          </p>
        </div>

        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
          @keyframes orbFloat {
            0%, 100% { transform: translateY(0) scale(1); }
            50%       { transform: translateY(-30px) scale(1.05); }
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          @keyframes scaleIn {
            from { transform: scale(0.5); opacity: 0; }
            to   { transform: scale(1); opacity: 1; }
          }
          @keyframes pulse {
            0%, 100% { box-shadow: 0 0 30px rgba(99,102,241,0.4); }
            50%       { box-shadow: 0 0 60px rgba(99,102,241,0.7); }
          }
        `}</style>
      </div>
    </>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0a0a1a 0%, #0d1b3e 50%, #0a0a1a 100%)",
    fontFamily: "'Inter', sans-serif",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    position: "relative",
    overflow: "hidden",
  },
  orb1: {
    position: "fixed", top: "-80px", left: "-80px",
    width: "400px", height: "400px", borderRadius: "50%",
    background: "radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)",
    animation: "orbFloat 8s ease-in-out infinite",
    pointerEvents: "none",
  },
  orb2: {
    position: "fixed", bottom: "-80px", right: "-80px",
    width: "400px", height: "400px", borderRadius: "50%",
    background: "radial-gradient(circle, rgba(6,182,212,0.25) 0%, transparent 70%)",
    animation: "orbFloat 10s ease-in-out infinite 2s",
    pointerEvents: "none",
  },
  card: {
    background: "rgba(255,255,255,0.04)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "24px",
    padding: "48px 36px",
    maxWidth: "520px",
    width: "100%",
    textAlign: "center",
    animation: "fadeIn 0.7s ease both",
    boxShadow: "0 25px 80px rgba(0,0,0,0.5)",
  },
  iconWrap: {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "28px",
  },
  icon: {
    width: "80px",
    height: "80px",
    animation: "scaleIn 0.6s ease both",
  },
  iconGlow: {
    position: "absolute",
    inset: "-8px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)",
    animation: "pulse 2s ease-in-out infinite",
  },
  title: {
    fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
    fontWeight: 800,
    margin: "0 0 12px",
    background: "linear-gradient(135deg, #fff 0%, #a5b4fc 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  subtitle: {
    fontSize: "15px",
    color: "rgba(255,255,255,0.55)",
    lineHeight: 1.6,
    margin: "0 0 28px",
  },
  orderBox: {
    background: "rgba(99,102,241,0.1)",
    border: "1px solid rgba(99,102,241,0.25)",
    borderRadius: "12px",
    padding: "14px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  orderLabel: {
    fontSize: "12px",
    fontWeight: 600,
    color: "rgba(255,255,255,0.4)",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  orderValue: {
    fontSize: "13px",
    fontWeight: 600,
    color: "#a5b4fc",
    fontFamily: "monospace",
  },
  infoBox: {
    background: "rgba(6,182,212,0.08)",
    border: "1px solid rgba(6,182,212,0.2)",
    borderRadius: "12px",
    padding: "16px 20px",
    marginBottom: "28px",
    textAlign: "left",
  },
  infoText: {
    fontSize: "14px",
    color: "rgba(255,255,255,0.6)",
    lineHeight: 1.6,
    margin: 0,
  },
  actions: {
    display: "flex",
    gap: "12px",
    justifyContent: "center",
    marginBottom: "20px",
    flexWrap: "wrap",
  },
  btnPrimary: {
    background: "linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)",
    color: "#fff",
    textDecoration: "none",
    padding: "12px 28px",
    borderRadius: "12px",
    fontWeight: 700,
    fontSize: "14px",
    boxShadow: "0 6px 24px rgba(99,102,241,0.4)",
  },
  btnSecondary: {
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.12)",
    color: "rgba(255,255,255,0.7)",
    textDecoration: "none",
    padding: "12px 28px",
    borderRadius: "12px",
    fontWeight: 600,
    fontSize: "14px",
  },
  redirect: {
    fontSize: "13px",
    color: "rgba(255,255,255,0.25)",
    margin: 0,
  },
  countdown: {
    color: "#a5b4fc",
    fontWeight: 700,
  },
};
