"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { validateDemoLead } from "@/src/lib/demoLead";
import { FaArrowRight, FaBuilding, FaConciergeBell, FaGlobeAsia, FaMicrophone, FaPhoneSlash } from "react-icons/fa";

const DEMOS = [
  { id: "real-estate", title: "Real Estate", desc: "Property lead follow-up", Icon: FaBuilding },
  { id: "hotel-booking", title: "Hotel Booking", desc: "Room reservations in English", Icon: FaConciergeBell },
  { id: "hotel-booking-ar", title: "Hotel Booking (Arabic)", desc: "Room reservations in Arabic", Icon: FaGlobeAsia },
];

const FIELDS = [
  { name: "customer_name", type: "text", autoComplete: "name", placeholder: "Name", label: "Your name, so the agent can greet you", maxLength: 40 },
  { name: "contact", type: "tel", autoComplete: "tel", placeholder: "Contact (+971 50 123 4567)", label: "Contact number with country code, so our team can call you back", maxLength: 24 },
  { name: "email", type: "email", autoComplete: "email", placeholder: "Email", label: "Email, so our team can contact you", maxLength: 120 },
];

// Landing page voice demos: pick one, enter your details, talk in the browser.
// /api/retell-web-call passes the name to the agent and emails the details to the team.
const VoiceDemo = () => {
  const [demo, setDemo] = useState(DEMOS[0].id);
  // idle | connecting | live
  const [phase, setPhase] = useState("idle");
  const [notice, setNotice] = useState("");
  const [details, setDetails] = useState({ customer_name: "", contact: "", email: "" });
  const [errors, setErrors] = useState({});
  const clientRef = useRef(null);

  useEffect(() => () => { try { clientRef.current?.stopCall(); } catch { /* not in a call */ } }, []);

  const update = (e) => {
    const { name, value } = e.target;
    setDetails((d) => ({ ...d, [name]: value }));
    setErrors((errs) => ({ ...errs, [name]: undefined }));
  };

  function finish(message) {
    clientRef.current = null;
    setPhase("idle");
    setNotice(message || "");
  }

  function endCall() {
    try { clientRef.current?.stopCall(); } catch { /* already ended */ }
    finish("Call ended. Thanks for trying the demo.");
  }

  async function startCall(e) {
    e.preventDefault();
    const found = validateDemoLead(details);
    setErrors(found);
    if (Object.keys(found).length) return;
    setNotice("");
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
      client.on("call_started", () => setPhase("live"));
      client.on("call_ended", () => finish("Call ended. Thanks for trying the demo."));
      client.on("error", () => finish("The call dropped. Please try again."));

      await client.startCall({
        accessToken: data.access_token,
        transport: data.transport || "gateway",
        callId: data.call_id,
        iceServers: data.ice_servers,
      });
    } catch (err) {
      const denied = err?.name === "NotAllowedError" || /permission/i.test(err?.message || "");
      finish(denied ? "Allow microphone access to try the demo." : err?.message || "Couldn't start the call.");
    }
  }

  return (
    <section className="dm-voice-demo" id="live-demo">
      <div className="container">
        <span className="tp-section__subtitle">Live Demo</span>
        <h2 className="tp-section__title">AI Voice Demo</h2>
        <p className="dm-voice-demo__sub">Pick a demo and talk to our AI agent live in your browser.</p>

        <div className="dm-voice-demo__grid">
          {DEMOS.map(({ id, title, desc, Icon }) => (
            <button
              key={id}
              type="button"
              className={`dm-voice-demo__card${demo === id ? " is-active" : ""}`}
              aria-pressed={demo === id}
              disabled={phase !== "idle"}
              onClick={() => { setDemo(id); setNotice(""); }}
            >
              <Icon aria-hidden="true" />
              <strong>{title}</strong>
              <span>{desc}</span>
            </button>
          ))}
        </div>

        {phase === "live" ? (
          <button type="button" className="dm-voice-demo__talk is-live" onClick={endCall}>
            <FaPhoneSlash /> End call
          </button>
        ) : (
          <form className="dm-voice-demo__form" noValidate onSubmit={startCall}>
            {FIELDS.map((f) => (
              <div key={f.name}>
                <input
                  type={f.type}
                  name={f.name}
                  autoComplete={f.autoComplete}
                  placeholder={f.placeholder}
                  aria-label={f.label}
                  aria-invalid={!!errors[f.name]}
                  aria-describedby={errors[f.name] ? `dm-voice-error-${f.name}` : undefined}
                  maxLength={f.maxLength}
                  value={details[f.name]}
                  onChange={update}
                />
                {errors[f.name] && <p className="dm-voice-demo__error" id={`dm-voice-error-${f.name}`}>{errors[f.name]}</p>}
              </div>
            ))}
            <button type="submit" className="dm-voice-demo__talk" disabled={phase === "connecting"}>
              <FaMicrophone /> {phase === "connecting" ? "Connecting…" : "Talk"}
            </button>
          </form>
        )}

        <p className="dm-voice-demo__notice" role="status" aria-live="polite">{notice}</p>

        <div className="dm-voice-demo__links">
          <Link href="/callagents">
            See all voice demos <FaArrowRight />
          </Link>
          <a href="https://sixty.devmatesolutions.com/" target="_blank" rel="noopener noreferrer">
            Go to SIXTY <FaArrowRight />
          </a>
        </div>
      </div>
    </section>
  );
};

export default VoiceDemo;
