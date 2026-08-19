import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";

const _INLINE_CSS_1 = "\n        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');\n        @keyframes tickerScroll {\n          from { transform: translateX(0); }\n          to   { transform: translateX(-50%); }\n        }\n        @keyframes spin {\n          to { transform: rotate(360deg); }\n        }\n        @keyframes fadeIn {\n          from { opacity: 0; transform: translateY(16px); }\n          to   { opacity: 1; transform: translateY(0); }\n        }\n        @keyframes orbFloat {\n          0%, 100% { transform: translateY(0) scale(1); }\n          50%       { transform: translateY(-30px) scale(1.05); }\n        }\n        * { box-sizing: border-box; }\n      ";


// ─── Product catalogue (mirrors the server-side PRODUCTS list) ───────────────
const PRODUCTS = [
  {
    id: "session-1on1",
    label: "1:1 Strategy Session",
    description: "Direct strategy session with Zain Ul Abideen",
    amount: 599,
    icon: "💡",
  },
  {
    id: "deposit-seo",
    label: "SEO Retainer Deposit",
    description: "Initial deposit for your SEO retainer package",
    amount: 750,
    icon: "📈",
  },
  {
    id: "deposit-web",
    label: "Web Development Deposit",
    description: "Project deposit for web development engagement",
    amount: 1500,
    icon: "🌐",
  },
  {
    id: "invoice-custom",
    label: "Custom Invoice Payment",
    description: "Pay a custom invoice amount (min $25)",
    amount: null, // user-supplied
    icon: "📄",
  },
];

// ─── Popular payment methods (decorative ticker) ───────────────────────────────
const PAYMENT_ICONS = ["💳 Card (USD)", " Apple Pay", "BTC", "ETH", "USDT", "SOL", "BNB", "USDC", "🏦 Bank Transfer"];

export default function PayPage() {
  const [selectedId, setSelectedId] = useState("session-1on1");
  const [email, setEmail]           = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState("");

  const selectedProduct = PRODUCTS.find((p) => p.id === selectedId);

  async function handlePay(e) {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (
      selectedId === "invoice-custom" &&
      (isNaN(Number(customAmount)) || Number(customAmount) < 25)
    ) {
      setError("Please enter a valid amount (minimum $25).");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/nowpayments/create-invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: selectedId,
          email: email.trim(),
          customAmount: selectedId === "invoice-custom" ? Number(customAmount) : undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Surface the server-side error message directly (spec requirement)
        throw new Error(data.error || "Could not start payment");
      }

      // Redirect — keep spinner running during the navigation
      window.location.href = data.invoiceUrl;
    } catch (err) {
      console.error(err);
      setError(err.message || "Network error. Please check your connection and try again.");
      setLoading(false); // only reset on error; let it spin during redirect
    }
  }

  const displayAmount =
    selectedId === "invoice-custom"
      ? customAmount
        ? `$${Number(customAmount).toLocaleString()}`
        : "—"
      : `$${selectedProduct?.amount?.toLocaleString()}`;

  return (
    <>
      <Head>
        <title>Pay in USD or Crypto — DevMate Solutions</title>
        <meta
          name="description"
          content="Pay for DevMate Solutions services using Credit Card, Apple Pay (USD Fiat-to-Crypto On-Ramp) or Cryptocurrency. Powered by NOWPayments."
        />
      </Head>

      <div style={styles.page}>
        {/* ── Background orbs ── */}
        <div style={styles.orb1} />
        <div style={styles.orb2} />
        <div style={styles.orb3} />

        {/* ── Back link ── */}
        <div style={styles.backWrap}>
          <Link href="/" style={styles.backLink}>
            ← Back to DevMate Solutions
          </Link>
        </div>

        {/* ── Hero header ── */}
        <div style={styles.heroWrap}>
          <div style={styles.badge}>
            <span style={styles.badgeDot} />
            Powered by NOWPayments — Fiat & Crypto On-Ramp
          </div>
          <h1 style={styles.hero}>Pay DevMate Solutions</h1>
          <p style={styles.heroSub}>
            Secure checkout. Pay USD via Card, Apple Pay, Bank Transfer, or Crypto.
          </p>

          {/* Scrolling payment ticker */}
          <div style={styles.tickerWrap}>
            <div style={styles.tickerTrack}>
              {[...PAYMENT_ICONS, ...PAYMENT_ICONS].map((c, i) => (
                <span key={i} style={styles.tickerChip}>
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Card ── */}
        <div style={styles.card}>
          <form onSubmit={handlePay}>

            {/* ── Step 1 — Choose service ── */}
            <fieldset style={styles.fieldset}>
              <legend style={styles.legend}>
                <span style={styles.step}>01</span> Choose a service
              </legend>
              <div style={styles.productGrid}>
                {PRODUCTS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => { setSelectedId(p.id); setError(""); }}
                    style={{
                      ...styles.productCard,
                      ...(selectedId === p.id ? styles.productCardActive : {}),
                    }}
                  >
                    <span style={styles.productIcon}>{p.icon}</span>
                    <span style={styles.productLabel}>{p.label}</span>
                    <span style={styles.productDesc}>{p.description}</span>
                    {p.amount !== null && (
                      <span style={styles.productPrice}>${p.amount.toLocaleString()}</span>
                    )}
                    {selectedId === p.id && (
                      <span style={styles.productCheck}>✓</span>
                    )}
                  </button>
                ))}
              </div>
            </fieldset>

            {/* ── Custom amount (only for invoice-custom) ── */}
            {selectedId === "invoice-custom" && (
              <fieldset style={styles.fieldset}>
                <legend style={styles.legend}>
                  <span style={styles.step}>02</span> Enter invoice amount
                </legend>
                <div style={styles.inputWrap}>
                  <span style={styles.inputPrefix}>$</span>
                  <input
                    id="customAmount"
                    type="number"
                    min="25"
                    max="100000"
                    step="0.01"
                    placeholder="e.g. 1200"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    style={styles.input}
                  />
                  <span style={styles.inputSuffix}>USD</span>
                </div>
              </fieldset>
            )}

            {/* ── Step — Email ── */}
            <fieldset style={styles.fieldset}>
              <legend style={styles.legend}>
                <span style={styles.step}>
                  {selectedId === "invoice-custom" ? "03" : "02"}
                </span>{" "}
                Your email (for receipt)
              </legend>
              <div style={styles.inputWrap}>
                <span style={styles.inputPrefix}>✉</span>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={styles.input}
                  required
                />
              </div>
            </fieldset>

            {/* ── Summary ── */}
            <div style={styles.summary}>
              <div style={styles.summaryRow}>
                <span style={styles.summaryLabel}>Service</span>
                <span style={styles.summaryValue}>{selectedProduct?.label}</span>
              </div>
              <div style={styles.summaryRow}>
                <span style={styles.summaryLabel}>Amount (USD)</span>
                <span style={{ ...styles.summaryValue, ...styles.summaryAmount }}>
                  {displayAmount}
                </span>
              </div>
              <div style={styles.divider} />
              <p style={styles.summaryNote}>
                You&apos;ll be redirected to the NOWPayments secure checkout to select your
                preferred cryptocurrency and complete payment.
              </p>
            </div>

            {/* ── Error ── */}
            {error && <div style={styles.errorBox}>⚠ {error}</div>}

            {/* ── Submit ── */}
            <button
              type="submit"
              disabled={loading}
              style={loading ? { ...styles.btn, ...styles.btnLoading } : styles.btn}
            >
              {loading ? (
                <>
                  <span style={styles.spinner} /> Opening secure checkout…
                </>
              ) : (
                <>
                  <svg style={styles.btnIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                  Continue to payment
                </>
              )}
            </button>
          </form>

          {/* ── Trust row ── */}
          <div style={styles.trustRow}>
            <span style={styles.trustItem}>🔒 256-bit encrypted</span>
            <span style={styles.trustItem}>⚡ Instant confirmation</span>
            <span style={styles.trustItem}>🌍 Global payments</span>
          </div>
        </div>

        <p style={styles.footer}>
          Questions?{" "}
          <a href="mailto:hello@devmatesolutions.com" style={styles.footerLink}>
            hello@devmatesolutions.com
          </a>
        </p>
        <p style={{ ...styles.footer, marginTop: "8px" }}>
          Payments processed by NOWPayments. TechMate Solutions FZ LLC, Business Bay, Dubai, UAE.
        </p>
      </div>

      <style dangerouslySetInnerHTML={{ __html: _INLINE_CSS_1 }} />
    </>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0a0a1a 0%, #0d1b3e 50%, #0a0a1a 100%)",
    fontFamily: "'Inter', sans-serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "24px 16px 64px",
    position: "relative",
    overflow: "hidden",
  },
  orb1: {
    position: "fixed", top: "-100px", left: "-100px",
    width: "500px", height: "500px", borderRadius: "50%",
    background: "radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)",
    animation: "orbFloat 8s ease-in-out infinite",
    pointerEvents: "none",
  },
  orb2: {
    position: "fixed", bottom: "-120px", right: "-120px",
    width: "600px", height: "600px", borderRadius: "50%",
    background: "radial-gradient(circle, rgba(6,182,212,0.2) 0%, transparent 70%)",
    animation: "orbFloat 10s ease-in-out infinite 2s",
    pointerEvents: "none",
  },
  orb3: {
    position: "fixed", top: "40%", left: "60%",
    width: "300px", height: "300px", borderRadius: "50%",
    background: "radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)",
    animation: "orbFloat 12s ease-in-out infinite 4s",
    pointerEvents: "none",
  },
  backWrap: {
    alignSelf: "flex-start",
    maxWidth: "640px",
    width: "100%",
    margin: "0 auto 24px",
  },
  backLink: {
    color: "rgba(255,255,255,0.5)",
    textDecoration: "none",
    fontSize: "14px",
    transition: "color 0.2s",
  },
  heroWrap: {
    textAlign: "center",
    maxWidth: "640px",
    width: "100%",
    marginBottom: "32px",
    animation: "fadeIn 0.6s ease both",
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    background: "rgba(99,102,241,0.15)",
    border: "1px solid rgba(99,102,241,0.3)",
    borderRadius: "100px",
    padding: "6px 16px",
    fontSize: "13px",
    color: "#a5b4fc",
    marginBottom: "20px",
  },
  badgeDot: {
    width: "8px", height: "8px", borderRadius: "50%",
    background: "#6366f1",
    boxShadow: "0 0 8px #6366f1",
    display: "inline-block",
    animation: "spin 2s linear infinite",
  },
  hero: {
    fontSize: "clamp(2rem, 6vw, 3.5rem)",
    fontWeight: 800,
    color: "#fff",
    margin: "0 0 12px",
    lineHeight: 1.1,
    background: "linear-gradient(135deg, #fff 0%, #a5b4fc 50%, #67e8f9 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  heroSub: {
    fontSize: "16px",
    color: "rgba(255,255,255,0.55)",
    margin: "0 0 24px",
  },
  tickerWrap: {
    overflow: "hidden",
    width: "100%",
    maskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
  },
  tickerTrack: {
    display: "flex",
    gap: "12px",
    animation: "tickerScroll 18s linear infinite",
    width: "max-content",
  },
  tickerChip: {
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "8px",
    padding: "6px 16px",
    fontSize: "13px",
    fontWeight: 600,
    color: "rgba(255,255,255,0.7)",
    whiteSpace: "nowrap",
    letterSpacing: "0.5px",
  },
  card: {
    background: "rgba(255,255,255,0.04)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "24px",
    padding: "36px",
    maxWidth: "640px",
    width: "100%",
    animation: "fadeIn 0.8s ease both 0.1s",
    boxShadow: "0 25px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
  },
  fieldset: {
    border: "none",
    padding: 0,
    margin: "0 0 28px",
  },
  legend: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "13px",
    fontWeight: 600,
    color: "rgba(255,255,255,0.5)",
    textTransform: "uppercase",
    letterSpacing: "1.5px",
    marginBottom: "16px",
  },
  step: {
    background: "linear-gradient(135deg, #6366f1, #06b6d4)",
    borderRadius: "6px",
    padding: "2px 8px",
    fontSize: "12px",
    fontWeight: 700,
    color: "#fff",
  },
  productGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "12px",
  },
  productCard: {
    position: "relative",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "16px",
    padding: "20px",
    cursor: "pointer",
    textAlign: "left",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    transition: "all 0.2s ease",
    outline: "none",
    color: "#fff",
  },
  productCardActive: {
    background: "rgba(99,102,241,0.15)",
    border: "1px solid rgba(99,102,241,0.5)",
    boxShadow: "0 0 24px rgba(99,102,241,0.2)",
  },
  productIcon: {
    fontSize: "24px",
    marginBottom: "4px",
  },
  productLabel: {
    fontSize: "15px",
    fontWeight: 600,
    color: "#fff",
  },
  productDesc: {
    fontSize: "12px",
    color: "rgba(255,255,255,0.45)",
    lineHeight: 1.4,
  },
  productPrice: {
    marginTop: "8px",
    fontSize: "20px",
    fontWeight: 700,
    color: "#a5b4fc",
  },
  productCheck: {
    position: "absolute",
    top: "14px",
    right: "14px",
    background: "linear-gradient(135deg, #6366f1, #06b6d4)",
    borderRadius: "50%",
    width: "22px",
    height: "22px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    color: "#fff",
    fontWeight: 700,
  },
  inputWrap: {
    display: "flex",
    alignItems: "center",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "12px",
    overflow: "hidden",
    transition: "border-color 0.2s",
  },
  inputPrefix: {
    padding: "0 14px",
    color: "rgba(255,255,255,0.4)",
    fontSize: "16px",
    borderRight: "1px solid rgba(255,255,255,0.08)",
    height: "52px",
    display: "flex",
    alignItems: "center",
    flexShrink: 0,
  },
  input: {
    flex: 1,
    background: "transparent",
    border: "none",
    outline: "none",
    padding: "0 16px",
    height: "52px",
    fontSize: "15px",
    color: "#fff",
    fontFamily: "'Inter', sans-serif",
  },
  inputSuffix: {
    padding: "0 14px",
    color: "rgba(255,255,255,0.35)",
    fontSize: "13px",
    fontWeight: 600,
    letterSpacing: "0.5px",
    borderLeft: "1px solid rgba(255,255,255,0.08)",
    height: "52px",
    display: "flex",
    alignItems: "center",
    flexShrink: 0,
  },
  summary: {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "16px",
    padding: "20px",
    marginBottom: "24px",
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  summaryLabel: {
    fontSize: "13px",
    color: "rgba(255,255,255,0.45)",
  },
  summaryValue: {
    fontSize: "14px",
    fontWeight: 600,
    color: "rgba(255,255,255,0.8)",
  },
  summaryAmount: {
    fontSize: "20px",
    color: "#a5b4fc",
  },
  divider: {
    height: "1px",
    background: "rgba(255,255,255,0.07)",
    margin: "14px 0",
  },
  summaryNote: {
    fontSize: "12px",
    color: "rgba(255,255,255,0.35)",
    lineHeight: 1.6,
    margin: 0,
  },
  errorBox: {
    background: "rgba(239,68,68,0.12)",
    border: "1px solid rgba(239,68,68,0.3)",
    borderRadius: "12px",
    padding: "14px 16px",
    fontSize: "14px",
    color: "#fca5a5",
    marginBottom: "20px",
  },
  btn: {
    width: "100%",
    padding: "16px",
    background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 50%, #06b6d4 100%)",
    border: "none",
    borderRadius: "14px",
    fontSize: "16px",
    fontWeight: 700,
    color: "#fff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    transition: "opacity 0.2s, transform 0.2s",
    letterSpacing: "0.3px",
    boxShadow: "0 8px 32px rgba(99,102,241,0.4)",
  },
  btnLoading: {
    opacity: 0.7,
    cursor: "not-allowed",
  },
  btnIcon: {
    width: "20px",
    height: "20px",
  },
  spinner: {
    display: "inline-block",
    width: "16px",
    height: "16px",
    borderRadius: "50%",
    border: "2px solid rgba(255,255,255,0.3)",
    borderTopColor: "#fff",
    animation: "spin 0.7s linear infinite",
  },
  trustRow: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
    marginTop: "20px",
  },
  trustItem: {
    fontSize: "12px",
    color: "rgba(255,255,255,0.35)",
    letterSpacing: "0.3px",
  },
  footer: {
    marginTop: "28px",
    fontSize: "13px",
    color: "rgba(255,255,255,0.25)",
  },
  footerLink: {
    color: "rgba(165,180,252,0.6)",
    textDecoration: "none",
  },
};
