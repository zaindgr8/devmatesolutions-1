import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "./QRLogin.module.css";

const QRLogin = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/qr/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || "Invalid username or password.");
        setLoading(false);
        return;
      }
      // Re-run getServerSideProps now that the auth cookie is set
      router.replace(router.asPath);
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <div className={styles.logoRow}>
          <img src="/red-logo.png" alt="Devmate Solutions" />
          <span>DevMate</span>
        </div>
        <h1 className={styles.title}>Digital Business Card</h1>
        <p className={styles.subtitle}>
          Team-only tool for generating your Devmate Solutions contact card &amp; QR code. Sign in to continue.
        </p>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="qr-username">Username</label>
            <input
              id="qr-username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="qr-password">Password</label>
            <input
              id="qr-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.submit} disabled={loading}>
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className={styles.footnote}>Internal use only · Devmate Solutions</p>
      </div>
    </div>
  );
};

export default QRLogin;
