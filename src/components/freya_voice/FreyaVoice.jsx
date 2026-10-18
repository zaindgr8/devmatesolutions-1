import React, { useEffect, useRef, useState } from "react";
import { createFreyaEngine } from "./engine";

// Floating "Talk to Freya" ball. One tap starts the call; a small pill shows the timer and lets you hang up.
const OFFICE_PREF_KEY = "freya-office-sound";
const readOfficePref = () => {
  try { return localStorage.getItem(OFFICE_PREF_KEY) !== "off"; } catch { return true; }
};

// Where show_section scrolls to on the landing page.
const SECTIONS = {
  portfolio: "#portfolio",
  ventures: "#our-own-ventures",
  clients: "#startups-helped-build",
  services: "#services",
  testimonials: ".dm-testimonial-section",
  team: "#regional-partners",
  ceo: "#ceo",
};

function showSection(section) {
  if (section === "top") return window.scrollTo({ top: 0, behavior: "smooth" });
  const el = document.querySelector(SECTIONS[section] || "");
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 100, behavior: "smooth" });
  el.classList.remove("fv-spotlight");
  void el.offsetWidth; // restart the highlight animation
  el.classList.add("fv-spotlight");
  setTimeout(() => el.classList.remove("fv-spotlight"), 2600);
}

const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

const MicIcon = () => (
  <svg className="fv-mic" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3Z" fill="currentColor" />
    <path d="M5 11a7 7 0 0 0 14 0M12 18v3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const FreyaVoice = () => {
  const wrapRef = useRef(null);
  const engineRef = useRef(null);
  const [phase, setPhase] = useState("idle");
  const [talking, setTalking] = useState(false);
  const [notice, setNotice] = useState("");
  const [seconds, setSeconds] = useState(0);
  const [showLabel, setShowLabel] = useState(false);
  const [office, setOffice] = useState(true);
  const [bookedFor, setBookedFor] = useState("");

  useEffect(() => {
    const engine = createFreyaEngine((type, d) => {
      if (type === "phase") {
        setPhase(d.phase);
        if (d.phase === "connecting") { setNotice(""); setSeconds(0); setBookedFor(""); }
        if (d.phase === "idle") { setNotice(d.message || ""); setTalking(false); }
      } else if (type === "level") {
        // Written straight to the CSS variable so the ball animates without re-rendering every frame.
        wrapRef.current?.style.setProperty("--lvl", d.lvl.toFixed(3));
        setTalking(d.lvl > 0.04);
      } else if (type === "show") {
        showSection(d.section);
      } else if (type === "booked") {
        setBookedFor(d.when);
      }
    });
    engineRef.current = engine;
    const pref = readOfficePref();
    setOffice(pref);
    engine.setOffice(pref);
    const labelTimer = setTimeout(() => setShowLabel(true), 1800);
    return () => { clearTimeout(labelTimer); engine.destroy(); };
  }, []);

  useEffect(() => {
    if (phase !== "live") return;
    const startedAt = Date.now();
    const t = setInterval(() => setSeconds(Math.floor((Date.now() - startedAt) / 1000)), 500);
    return () => clearInterval(t);
  }, [phase]);

  // End-of-call and error messages fade out on their own.
  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(""), 5000);
    return () => clearTimeout(t);
  }, [notice]);

  const inCall = phase !== "idle";
  const toggleCall = () => (inCall ? engineRef.current?.stop() : engineRef.current?.start());
  const toggleOffice = () => {
    const next = !office;
    setOffice(next);
    engineRef.current?.setOffice(next);
    try { localStorage.setItem(OFFICE_PREF_KEY, next ? "on" : "off"); } catch { /* storage blocked */ }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div ref={wrapRef} className={`fv${talking ? " talking" : ""}`} data-phase={phase}>
        {inCall ? (
          <div className="fv-pill" role="status" aria-live="polite">
            <span className="fv-dot" aria-hidden="true"></span>
            <span className="fv-pill-text">
              {phase === "connecting" ? "Ringing…" : <>Freya <span className="fv-time">{fmt(seconds)}</span></>}
              {bookedFor && <span className="fv-booked" title={`Meeting booked: ${bookedFor}`}>✓ Booked</span>}
            </span>
            <button
              type="button"
              className={`fv-icon${office ? " on" : ""}`}
              aria-pressed={office}
              aria-label={office ? "Turn off office background sound" : "Turn on office background sound"}
              title="Office sound"
              onClick={toggleOffice}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 10v4h3l4 4V6L7 10H4Z" fill="currentColor" />
                {office ? (
                  <path d="M15 9.5a3.5 3.5 0 0 1 0 5M17.5 7a7 7 0 0 1 0 10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                ) : (
                  <path d="M15.5 9.5l5 5M20.5 9.5l-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                )}
              </svg>
            </button>
            <button type="button" className="fv-icon fv-hang" aria-label="End call" title="End call" onClick={() => engineRef.current?.stop()}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 15.5c5-4.5 13-4.5 18 0l-2.3 2.3a1 1 0 0 1-1.3.1l-2.2-1.6a1 1 0 0 1-.4-.9l.2-1.7a12 12 0 0 0-6 0l.2 1.7a1 1 0 0 1-.4.9l-2.2 1.6a1 1 0 0 1-1.3-.1Z" fill="currentColor" />
              </svg>
            </button>
          </div>
        ) : notice ? (
          <span className="fv-label show fv-notice" role="alert">{notice}</span>
        ) : (
          <span className={`fv-label${showLabel ? " show" : ""}`} aria-hidden="true">
            Talk to Freya <em>live</em>
          </span>
        )}

        <button
          type="button"
          className="fv-orb"
          aria-label={inCall ? "End call with Freya" : "Talk to Freya, DevMate's AI agent, live. Uses your microphone."}
          onClick={toggleCall}
        >
          <span className="fv-ring" aria-hidden="true"></span>
          <span className="fv-ring r2" aria-hidden="true"></span>
          <span className="fv-core" aria-hidden="true">
            <MicIcon />
            <span className="fv-bars"><i></i><i></i><i></i><i></i></span>
          </span>
        </button>
      </div>
    </>
  );
};

const css = `
.fv {
  --lvl: 0; --fv-ease: cubic-bezier(.2,.7,.1,1);
  position: fixed; z-index: 9990;
  right: max(20px, calc(env(safe-area-inset-right, 0px) + 16px));
  bottom: max(20px, calc(env(safe-area-inset-bottom, 0px) + 16px));
  display: flex; align-items: center; gap: 12px;
}
.fv-orb { position: relative; order: 2; width: 68px; height: 68px; flex: none; border-radius: 50%; border: 0; padding: 0; cursor: pointer;
  background: transparent; display: grid; place-items: center; -webkit-tap-highlight-color: transparent; }
.fv-core { position: relative; z-index: 1; width: 100%; height: 100%; border-radius: 50%; display: grid; place-items: center; color: #fff;
  background: radial-gradient(circle at 32% 28%, rgba(255,255,255,.55), transparent 34%),
    radial-gradient(circle at 70% 78%, #7a1214, transparent 60%),
    conic-gradient(from 200deg, #ff8a8c, #e5484d, #bd2120, #ff6b6f, #ff8a8c);
  box-shadow: 0 0 0 1px rgba(255,255,255,.12) inset, 0 12px 40px -6px rgba(229,72,77,.75),
    0 0 calc(30px + var(--lvl) * 50px) rgba(229,72,77, calc(.35 + var(--lvl) * .5));
  scale: calc(1 + var(--lvl) * .18); transition: scale .08s linear, box-shadow .2s;
  animation: fv-spin 9s linear infinite; }
.fv-core > * { animation: fv-spin 9s linear infinite reverse; }
.fv-orb:hover .fv-core { box-shadow: 0 0 0 1px rgba(255,255,255,.2) inset, 0 16px 50px -6px rgba(229,72,77,.95), 0 0 46px rgba(229,72,77,.55); }
.fv-mic { width: 26px; height: 26px; filter: drop-shadow(0 1px 2px rgba(0,0,0,.3)); }
.fv-bars { display: none; gap: 3px; align-items: center; height: 26px; }
.fv-bars i { width: 3px; height: 30%; border-radius: 3px; background: #fff; }
.fv-ring { position: absolute; inset: 0; border-radius: 50%; border: 1px solid rgba(229,72,77,.6); animation: fv-ping 2.6s var(--fv-ease) infinite; }
.fv-ring.r2 { animation-delay: 1.3s; }
.fv-orb:focus-visible { outline: none; }
.fv-orb:focus-visible .fv-core { outline: 2px solid #0d0d0d; outline-offset: 4px; }
.fv[data-phase="connecting"] .fv-ring { animation-duration: 1.1s; }
.fv[data-phase="live"] .fv-mic { display: none; }
.fv[data-phase="live"] .fv-bars { display: flex; }
.fv[data-phase="live"] .fv-bars i { height: calc(22% + var(--lvl) * 70%); transition: height .08s linear; }
.fv[data-phase="live"] .fv-bars i:nth-child(2) { height: calc(30% + var(--lvl) * 85%); }
.fv[data-phase="live"] .fv-bars i:nth-child(3) { height: calc(26% + var(--lvl) * 60%); }
.fv[data-phase="live"] .fv-ring { animation-duration: 1.6s; border-color: rgba(255,138,140,.7); }

.fv-label, .fv-pill { order: 1; font-size: 14px; font-weight: 500; color: #f2f2f2; border-radius: 999px;
  background: rgba(18,18,19,.88); border: 1px solid rgba(255,255,255,.12);
  backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); box-shadow: 0 10px 30px -10px rgba(0,0,0,.4); }
.fv-label { white-space: nowrap; padding: 7px 14px; opacity: 0; transform: translateX(8px);
  transition: opacity .4s var(--fv-ease), transform .4s var(--fv-ease); pointer-events: none; }
.fv-label em { font: 500 10.5px ui-monospace, SFMono-Regular, Menlo, monospace; font-style: normal; letter-spacing: .1em; text-transform: uppercase; color: #ff8a8c; margin-left: 6px; }
.fv-label.show { opacity: 1; transform: none; }
.fv-notice { white-space: normal; max-width: 240px; line-height: 1.35; }

.fv-pill { display: flex; align-items: center; gap: 6px; padding: 5px 5px 5px 14px; animation: fv-in .3s var(--fv-ease); }
.fv-dot { width: 7px; height: 7px; border-radius: 50%; background: #3ddc84; box-shadow: 0 0 0 3px rgba(61,220,132,.2); }
.fv[data-phase="connecting"] .fv-dot { background: #ff8a8c; box-shadow: 0 0 0 3px rgba(255,138,140,.2); animation: fv-blink 1s infinite; }
.fv-pill-text { padding-right: 4px; white-space: nowrap; }
.fv-booked { margin-left: 8px; padding: 2px 8px; border-radius: 999px; font-size: 12px; font-weight: 600; color: #3ddc84; background: rgba(61,220,132,.14); }
.fv-time { font: 500 13px ui-monospace, SFMono-Regular, Menlo, monospace; color: #a1a1aa; margin-left: 4px; }
.fv-icon { width: 32px; height: 32px; flex: none; border-radius: 50%; border: 0; display: grid; place-items: center; cursor: pointer;
  background: rgba(255,255,255,.08); color: #71717a; transition: background .2s, color .2s; }
.fv-icon svg { width: 16px; height: 16px; }
.fv-icon.on { color: #f2f2f2; }
.fv-icon:hover { background: rgba(255,255,255,.16); color: #fff; }
.fv-hang { background: #e5484d; color: #fff; }
.fv-hang:hover { background: #f05257; }

/* Section Freya scrolls the visitor to */
.fv-spotlight { animation: fv-spotlight 2.6s var(--fv-ease); }

@keyframes fv-ping { 0% { transform: scale(1); opacity: .9; } 100% { transform: scale(1.75); opacity: 0; } }
@keyframes fv-spin { to { transform: rotate(360deg); } }
@keyframes fv-in { from { opacity: 0; transform: translateX(8px); } to { opacity: 1; transform: none; } }
@keyframes fv-blink { 0%, 100% { opacity: .35; } 50% { opacity: 1; } }
@keyframes fv-spotlight { 0% { box-shadow: 0 0 0 0 rgba(229,72,77,0); } 20% { box-shadow: 0 0 0 4px rgba(229,72,77,.35); } 100% { box-shadow: 0 0 0 0 rgba(229,72,77,0); } }

@media (max-width: 560px) {
  .fv-orb { width: 60px; height: 60px; }
  .fv-label:not(.fv-notice) { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .fv-core, .fv-core > *, .fv-ring, .fv-spotlight { animation: none; }
}
`;

export default FreyaVoice;
