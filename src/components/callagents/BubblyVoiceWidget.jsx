"use client";
import React, { useEffect, useRef, useState } from "react";
import { validateDemoLead } from "@/src/lib/demoLead";

// Live voice demos on /callagents: pick a demo, enter your details, tap the orb, talk in the browser.
// The name goes to the Retell agent as the customer_name dynamic variable, so it greets you by it.
// The contact number and email are emailed to the team. The Retell key stays on the server
// (/api/retell-web-call).

const FIELDS = [
  { name: "customer_name", type: "text", autoComplete: "name", placeholder: "Name", label: "Your name, so Freya can greet you", maxLength: 40 },
  { name: "contact", type: "tel", autoComplete: "tel", placeholder: "Contact (+971 50 123 4567)", label: "Contact number with country code, so our team can call you back", maxLength: 24 },
  { name: "email", type: "email", autoComplete: "email", placeholder: "Email", label: "Email, so our team can contact you", maxLength: 120 },
];

const DEMOS = [
  { id: "real-estate", label: "Real Estate" },
  { id: "hotel-booking", label: "Hotel Booking" },
  { id: "hotel-booking-ar", label: "Hotel Booking (Arabic)" },
];

const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

const Icon = {
  mic: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3Z" fill="currentColor" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  micOff: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M15 10V6a3 3 0 0 0-5.7-1.3M9 9v3a3 3 0 0 0 4.5 2.6M5 11a7 7 0 0 0 11.2 5.6M19 11a7 7 0 0 1-.6 2.8M12 18v3M4 4l16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  hang: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 15.5c5-4.5 13-4.5 18 0l-2.3 2.3a1 1 0 0 1-1.3.1l-2.2-1.6a1 1 0 0 1-.4-.9l.2-1.7a12 12 0 0 0-6 0l.2 1.7a1 1 0 0 1-.4.9l-2.2 1.6a1 1 0 0 1-1.3-.1Z" fill="currentColor" />
    </svg>
  ),
};

export default function BubblyVoiceWidget({ demo = "real-estate", onDemoChange }) {
  // idle | connecting | live
  const [phase, setPhase] = useState("idle");
  const [agentTalking, setAgentTalking] = useState(false);
  const [muted, setMuted] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [caption, setCaption] = useState("");
  const [notice, setNotice] = useState("");
  const [details, setDetails] = useState({ customer_name: "", contact: "", email: "" });
  const [errors, setErrors] = useState({});
  const [sectionVisible, setSectionVisible] = useState(true);

  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const formRef = useRef(null);
  const clientRef = useRef(null);

  // Call timer
  useEffect(() => {
    if (phase !== "live") return;
    setSeconds(0);
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [phase]);

  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(""), 6000);
    return () => clearTimeout(t);
  }, [notice]);

  // The floating orb only shows while the demo section is off screen.
  useEffect(() => {
    if (!sectionRef.current || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => setSectionVisible(e.isIntersecting), { threshold: 0.15 });
    io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => () => { try { clientRef.current?.stopCall(); } catch { /* not in a call */ } }, []);

  const setLevel = (lvl) => stageRef.current?.style.setProperty("--lvl", lvl.toFixed(3));

  function update(e) {
    const { name, value } = e.target;
    setDetails((d) => ({ ...d, [name]: value }));
    setErrors((errs) => ({ ...errs, [name]: undefined }));
  }

  function submit(e) {
    e.preventDefault();
    const found = validateDemoLead(details);
    setErrors(found);
    if (Object.keys(found).length) return;
    talkInBrowser();
  }

  async function talkInBrowser() {
    if (phase === "connecting") return;
    if (phase === "live") return endCall();
    setNotice("");
    setCaption("");
    setPhase("connecting");
    try {
      if (!navigator.mediaDevices?.getUserMedia) throw new Error("Your browser can't use the microphone.");
      await navigator.mediaDevices.getUserMedia({ audio: true });

      const res = await fetch("/api/retell-web-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ demo, ...details }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.access_token) throw new Error(data.error || "Couldn't start the call.");

      const { RetellWebClient } = await import("retell-client-js-sdk");
      const client = new RetellWebClient();
      clientRef.current = client;

      client.on("call_started", () => { setPhase("live"); setMuted(false); });
      client.on("agent_start_talking", () => setAgentTalking(true));
      client.on("agent_stop_talking", () => setAgentTalking(false));
      client.on("update", (u) => {
        const last = [...(u?.transcript || [])].reverse().find((t) => t.role === "agent");
        if (last?.content) setCaption(last.content);
      });
      client.on("audio", (samples) => {
        if (!samples?.length) return;
        let sum = 0;
        for (let i = 0; i < samples.length; i += 16) sum += Math.abs(samples[i]);
        setLevel(Math.min(1, (sum / (samples.length / 16)) * 5));
      });
      client.on("call_ended", () => finish("Call ended. Thanks for talking to Freya."));
      client.on("error", () => finish("The call dropped. Please try again."));

      await client.startCall({
        accessToken: data.access_token,
        transport: data.transport || "gateway",
        callId: data.call_id,
        iceServers: data.ice_servers,
        emitRawAudioSamples: true,
      });
    } catch (err) {
      const denied = err?.name === "NotAllowedError" || /permission/i.test(err?.message || "");
      finish(denied ? "Allow microphone access to talk to Freya." : err?.message || "Couldn't start the call.");
    }
  }

  function finish(message) {
    clientRef.current = null;
    setAgentTalking(false);
    setLevel(0);
    setPhase("idle");
    setNotice(message || "");
  }

  function endCall() {
    try { clientRef.current?.stopCall(); } catch { /* already ended */ }
    finish("Call ended. Thanks for talking to Freya.");
  }

  function toggleMute() {
    const c = clientRef.current;
    if (!c) return;
    if (muted) c.unmute(); else c.mute();
    setMuted(!muted);
  }

  const status =
    phase === "connecting" ? "Connecting…" :
    phase === "live" ? `${agentTalking ? "Freya" : "Listening"} · ${fmt(seconds)}` :
    "Tap to talk";

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <section className="cv" id="cad-demo" ref={sectionRef}>
        <div className="cv-wrap">
          <p className="cv-eyebrow">Live demo</p>
          <h2 className="cv-title">Talk to Freya</h2>

          <div className="cv-tabs" role="group" aria-label="Choose a demo">
            {DEMOS.map((d) => (
              <button
                key={d.id}
                type="button"
                id={`cad-tab-${d.id}`}
                className={`cv-tab${demo === d.id ? " on" : ""}`}
                aria-pressed={demo === d.id}
                disabled={phase !== "idle"}
                onClick={() => onDemoChange?.(d.id)}
              >
                {d.label}
              </button>
            ))}
          </div>

          <div ref={stageRef} className={`cv-stage${agentTalking ? " talking" : ""}`} data-phase={phase}>
            <span className="cv-ring" aria-hidden="true" />
            <span className="cv-ring cv-ring--2" aria-hidden="true" />
            <button
              type="button"
              id="cad-bubbly-talk-button"
              className="cv-orb"
              onClick={() => (phase === "idle" ? formRef.current?.requestSubmit() : talkInBrowser())}
              disabled={phase === "connecting"}
              aria-label={phase === "live" ? "End call" : "Talk to Freya in your browser"}
            >
              <span className="cv-core" aria-hidden="true">
                {phase === "live" ? (
                  <span className="cv-bars"><i /><i /><i /><i /><i /></span>
                ) : phase === "connecting" ? (
                  <span className="cv-spin" />
                ) : (
                  <span className="cv-icon">{Icon.mic}</span>
                )}
              </span>
            </button>
          </div>

          <p className="cv-status" role="status" aria-live="polite">{status}</p>

          {phase === "live" && (
            <>
              <p className="cv-caption" aria-live="off" dir="auto">{caption}</p>
              <div className="cv-controls">
                <button type="button" className={`cv-ctrl${muted ? " on" : ""}`} onClick={toggleMute} aria-label={muted ? "Unmute" : "Mute"} title={muted ? "Unmute" : "Mute"}>
                  {muted ? Icon.micOff : Icon.mic}
                </button>
                <button type="button" className="cv-ctrl cv-ctrl--end" onClick={endCall} aria-label="End call" title="End call">
                  {Icon.hang}
                </button>
              </div>
            </>
          )}

          {phase === "idle" && (
            <form className="cv-form" ref={formRef} noValidate onSubmit={submit}>
              {FIELDS.map((f) => (
                <div key={f.name}>
                  <input
                    className="cv-input"
                    type={f.type}
                    name={f.name}
                    autoComplete={f.autoComplete}
                    placeholder={f.placeholder}
                    aria-label={f.label}
                    aria-invalid={!!errors[f.name]}
                    aria-describedby={errors[f.name] ? `cv-error-${f.name}` : undefined}
                    maxLength={f.maxLength}
                    value={details[f.name]}
                    onChange={update}
                  />
                  {errors[f.name] && <p className="cv-error" id={`cv-error-${f.name}`}>{errors[f.name]}</p>}
                </div>
              ))}
              <button className="cv-call" type="submit">
                {Icon.mic}
                <span>Talk</span>
              </button>
            </form>
          )}

          {notice && <p className="cv-notice" role="alert">{notice}</p>}
        </div>
      </section>

      {/* Floating orb while the demo is scrolled out of view */}
      {!sectionVisible && (
        <div className="cv-float" data-phase={phase}>
          {phase === "live" && (
            <span className="cv-float-pill">
              <i className="cv-dot" /> Freya <b>{fmt(seconds)}</b>
              <button type="button" className="cv-ctrl cv-ctrl--end cv-ctrl--sm" onClick={endCall} aria-label="End call">{Icon.hang}</button>
            </span>
          )}
          <button
            type="button"
            className="cv-float-orb"
            aria-label="Go to the Freya demo"
            onClick={() => sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })}
          >
            <span className="cv-core">{phase === "live" ? <span className="cv-bars cv-bars--sm"><i /><i /><i /></span> : <span className="cv-icon">{Icon.mic}</span>}</span>
          </button>
        </div>
      )}
    </>
  );
}

const css = `
.cv {
  position: relative; overflow: hidden; padding: 110px 0 120px; scroll-margin-top: 90px;
  background: radial-gradient(60% 55% at 50% 38%, rgba(189,33,32,.22), transparent 70%), #08080a;
  border-top: 1px solid rgba(255,255,255,.06); color: #f4f4f5; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}
.cv::before { /* faint grid for depth */
  content: ""; position: absolute; inset: 0; pointer-events: none; opacity: .5;
  background-image: linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px);
  background-size: 56px 56px; mask-image: radial-gradient(circle at 50% 40%, #000 0%, transparent 65%);
  -webkit-mask-image: radial-gradient(circle at 50% 40%, #000 0%, transparent 65%);
}
.cv-wrap { position: relative; max-width: 640px; margin: 0 auto; padding: 0 20px; display: flex; flex-direction: column; align-items: center; text-align: center; }
.cv-eyebrow { margin: 0 0 10px; font-size: 12px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #ff6b6b; }
.cv-title { margin: 0 0 24px; font-size: clamp(32px, 4.4vw, 48px); font-weight: 800; letter-spacing: -1.5px; line-height: 1.05; color: #fff; }

/* Demo picker */
.cv-tabs { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; margin-bottom: 36px; }
.cv-tab { min-height: 40px; padding: 0 16px; border-radius: 999px; border: 1px solid rgba(255,255,255,.14); background: rgba(255,255,255,.04);
  color: #d4d4d8; font-size: 14px; font-weight: 600; font-family: inherit; cursor: pointer; transition: background .2s, border-color .2s, color .2s; }
.cv-tab:hover:not(:disabled) { border-color: rgba(255,255,255,.4); color: #fff; }
.cv-tab.on { background: #bd2120; border-color: #bd2120; color: #fff; }
.cv-tab:disabled { cursor: default; opacity: .6; }
.cv-tab.on:disabled { opacity: 1; }
.cv-tab:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }

/* Orb */
.cv-stage { --lvl: 0; position: relative; width: 220px; height: 220px; display: grid; place-items: center; }
.cv-ring { position: absolute; inset: 0; border-radius: 50%; padding: 1.5px;
  background: conic-gradient(from 0deg, transparent 0 60%, rgba(255,107,107,.9) 75%, transparent 90%);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite: xor; mask-composite: exclude;
  animation: cv-spin 6s linear infinite; opacity: .55; }
.cv-ring--2 { inset: 16px; animation-duration: 9s; animation-direction: reverse; opacity: .35; }
.cv-orb { position: relative; width: 150px; height: 150px; border-radius: 50%; border: 0; padding: 0; cursor: pointer; background: transparent; -webkit-tap-highlight-color: transparent; }
.cv-orb:disabled { cursor: default; }
.cv-core { position: absolute; inset: 0; border-radius: 50%; display: grid; place-items: center; color: #fff;
  background: radial-gradient(circle at 32% 26%, rgba(255,255,255,.5), transparent 32%),
    radial-gradient(circle at 70% 80%, #5c0d0d, transparent 62%),
    conic-gradient(from 210deg, #ff7a7a, #e5484d, #bd2120, #8f1515, #ff7a7a);
  box-shadow: inset 0 0 0 1px rgba(255,255,255,.14), 0 24px 60px -12px rgba(189,33,32,.8),
    0 0 calc(40px + var(--lvl) * 70px) rgba(229,72,77, calc(.3 + var(--lvl) * .5));
  scale: calc(1 + var(--lvl) * .12); transition: scale .08s linear, box-shadow .25s; }
.cv-orb:not(:disabled):hover .cv-core { box-shadow: inset 0 0 0 1px rgba(255,255,255,.22), 0 28px 70px -10px rgba(189,33,32,.95), 0 0 60px rgba(229,72,77,.5); }
.cv-orb:focus-visible { outline: none; }
.cv-orb:focus-visible .cv-core { outline: 2px solid #fff; outline-offset: 6px; }
.cv-icon { display: grid; place-items: center; }
.cv-icon svg { width: 40px; height: 40px; filter: drop-shadow(0 2px 4px rgba(0,0,0,.3)); }
.cv-bars { display: flex; align-items: center; gap: 5px; height: 46px; }
.cv-bars i { width: 5px; border-radius: 5px; background: #fff; height: calc(20% + var(--lvl) * 75%); transition: height .08s linear; }
.cv-bars i:nth-child(2), .cv-bars i:nth-child(4) { height: calc(30% + var(--lvl) * 90%); }
.cv-bars i:nth-child(3) { height: calc(40% + var(--lvl) * 60%); }
.cv-stage:not(.talking)[data-phase="live"] .cv-bars i { animation: cv-idle 1.6s ease-in-out infinite; }
.cv-stage:not(.talking)[data-phase="live"] .cv-bars i:nth-child(2n) { animation-delay: .3s; }
.cv-stage[data-phase="live"] .cv-ring { opacity: .9; animation-duration: 2.4s; }
.cv-stage[data-phase="connecting"] .cv-ring { animation-duration: 1.2s; }
.cv-spin { width: 34px; height: 34px; border-radius: 50%; border: 3px solid rgba(255,255,255,.3); border-top-color: #fff; animation: cv-spin .8s linear infinite; }

.cv-status { margin: 22px 0 0; min-height: 22px; font-size: 15px; font-weight: 500; color: #a1a1aa; font-variant-numeric: tabular-nums; }
.cv-stage[data-phase="live"] + .cv-status { color: #fff; }
.cv-caption { margin: 10px 0 0; max-width: 460px; min-height: 2.8em; font-size: 15px; line-height: 1.45; color: #d4d4d8;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.cv-controls { display: flex; gap: 12px; margin-top: 18px; }
.cv-ctrl { width: 48px; height: 48px; border-radius: 50%; border: 1px solid rgba(255,255,255,.14); background: rgba(255,255,255,.06);
  color: #e4e4e7; display: grid; place-items: center; cursor: pointer; transition: background .2s, border-color .2s; }
.cv-ctrl svg { width: 20px; height: 20px; }
.cv-ctrl:hover { background: rgba(255,255,255,.12); }
.cv-ctrl.on { background: #fff; color: #0d0d0d; }
.cv-ctrl--end { background: #bd2120; border-color: transparent; color: #fff; }
.cv-ctrl--end:hover { background: #e5484d; }
.cv-ctrl--sm { width: 30px; height: 30px; }
.cv-ctrl--sm svg { width: 14px; height: 14px; }

/* Visitor details: the name becomes customer_name for the agent */
.cv-form { display: flex; flex-direction: column; gap: 10px; width: 100%; max-width: 420px; margin-top: 30px; }
.cv-form > div { width: 100%; text-align: left; }
.cv-error { margin: 6px 0 0 20px; font-size: 13px; line-height: 1.4; color: #fca5a5; }
.cv-input[aria-invalid="true"] { border-color: #f87171; }
.cv-input { width: 100%; height: 50px; padding: 0 20px; border-radius: 999px; outline: none; color: #fff; font-size: 15px; font-weight: 500; font-family: inherit;
  background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.1); transition: border-color .2s, box-shadow .2s; }
.cv-input:focus { border-color: rgba(255,107,107,.5); box-shadow: 0 0 0 4px rgba(189,33,32,.18); }
.cv-input::placeholder { color: #71717a; }
.cv-call { display: inline-flex; align-items: center; justify-content: center; gap: 8px; height: 50px; padding: 0 20px; border: 0; border-radius: 999px;
  background: #bd2120; color: #fff; font: 700 14.5px inherit; font-family: inherit; cursor: pointer; white-space: nowrap;
  box-shadow: 0 10px 26px -10px rgba(189,33,32,.9); transition: background .2s, transform .2s; }
.cv-call svg { width: 16px; height: 16px; }
.cv-call:hover { background: #d42a29; transform: translateY(-1px); }
.cv-notice { margin: 16px 0 0; font-size: 14px; color: #fca5a5; }

/* Floating orb */
.cv-float { position: fixed; z-index: 9990; right: max(20px, calc(env(safe-area-inset-right, 0px) + 16px)); bottom: max(20px, calc(env(safe-area-inset-bottom, 0px) + 16px));
  display: flex; align-items: center; gap: 10px; animation: cv-in .3s ease; }
.cv-float-orb { position: relative; width: 60px; height: 60px; border-radius: 50%; border: 0; padding: 0; cursor: pointer; background: transparent; }
.cv-float-orb .cv-icon svg { width: 24px; height: 24px; }
.cv-bars--sm { height: 22px; gap: 3px; }
.cv-bars--sm i { width: 3px; }
.cv-float-pill { display: inline-flex; align-items: center; gap: 8px; padding: 5px 5px 5px 14px; border-radius: 999px; font-size: 14px; color: #f4f4f5;
  background: rgba(14,14,16,.9); border: 1px solid rgba(255,255,255,.12); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); }
.cv-float-pill b { font-weight: 500; color: #a1a1aa; font-variant-numeric: tabular-nums; }
.cv-dot { width: 7px; height: 7px; border-radius: 50%; background: #3ddc84; box-shadow: 0 0 0 3px rgba(61,220,132,.2); }

@keyframes cv-spin { to { transform: rotate(360deg); } }
@keyframes cv-idle { 0%, 100% { height: 22%; } 50% { height: 42%; } }
@keyframes cv-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }

@media (max-width: 600px) {
  .cv { padding: 84px 0 92px; }
  .cv-tabs { margin-bottom: 28px; }
  .cv-stage { width: 184px; height: 184px; }
  .cv-orb { width: 128px; height: 128px; }
}
@media (prefers-reduced-motion: reduce) {
  .cv-ring, .cv-bars i { animation: none !important; }
}
`;
