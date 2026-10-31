"use client";
import React, { useState, useEffect, useRef } from "react";

const AGENT_ID = "agent_99b7b8c0593b742b4e0aac4bf2";
const RETELL_API_KEY = "key_2da9e1e85942a0ee5c28b6686984";

const PROMPTS = [
  "I'm looking for a 2-bedroom apartment in Downtown Dubai",
  "My budget is around 3.5 Million AED for investment",
  "Do you have villas near Palm Jumeirah or Dubai Hills?",
  "Can I schedule a viewing this Saturday morning?",
];

export default function BubblyVoiceWidget() {
  const [callStatus, setCallStatus] = useState("idle"); // idle | connecting | live | ended | error
  const [isAgentTalking, setIsAgentTalking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [transcript, setTranscript] = useState([]);
  const [audioLevel, setAudioLevel] = useState(0);
  const [floatingOpen, setFloatingOpen] = useState(true);

  const retellClientRef = useRef(null);
  const timerRef = useRef(null);
  const animFrameRef = useRef(null);
  const transcriptScrollRef = useRef(null);

  // Auto-scroll transcript when new messages arrive
  useEffect(() => {
    if (transcriptScrollRef.current) {
      transcriptScrollRef.current.scrollTop = transcriptScrollRef.current.scrollHeight;
    }
  }, [transcript]);

  // Duration timer
  useEffect(() => {
    if (callStatus === "live") {
      setDuration(0);
      timerRef.current = setInterval(() => {
        setDuration((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [callStatus]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (retellClientRef.current) {
        try {
          retellClientRef.current.stopCall();
        } catch {
          // ignore
        }
      }
      if (timerRef.current) clearInterval(timerRef.current);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins < 10 ? "0" : ""}${mins}:${s < 10 ? "0" : ""}${s}`;
  };

  const startVoiceCall = async () => {
    setErrorMessage("");
    setCallStatus("connecting");
    setTranscript([
      {
        role: "system",
        content: "Connecting to Freya (DevMate Real Estate AI)...",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);

    try {
      // Check microphone access
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Your browser does not support microphone audio capture.");
      }

      await navigator.mediaDevices.getUserMedia({ audio: true });

      // 1. Get access token from backend API route
      let webCallData = null;
      try {
        const res = await fetch("/api/retell-web-call", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ agent_id: AGENT_ID }),
        });
        if (res.ok) {
          webCallData = await res.json();
        }
      } catch (err) {
        console.warn("Backend token call failed, falling back to direct API:", err);
      }

      // If backend API route failed or returned error, try direct create-web-call v3
      if (!webCallData || !webCallData.access_token) {
        const directRes = await fetch("https://api.retellai.com/v3/create-web-call", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${RETELL_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            agent_id: AGENT_ID,
            metadata: { source: "bubbly_voice_widget" },
          }),
        });

        if (!directRes.ok) {
          const errBody = await directRes.json().catch(() => ({}));
          throw new Error(errBody.message || "Failed to initialize Retell AI voice session.");
        }
        webCallData = await directRes.json();
      }

      // 2. Initialize Retell Client SDK dynamically
      const retellSdk = await import("retell-client-js-sdk");
      const { RetellWebClient } = retellSdk;

      const client = new RetellWebClient();
      retellClientRef.current = client;

      // Event listeners
      client.on("call_started", () => {
        setCallStatus("live");
        setIsMuted(false);
        setTranscript((prev) => [
          ...prev,
          {
            role: "system",
            content: "Call connected! Speak into your microphone.",
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
      });

      client.on("agent_start_talking", () => {
        setIsAgentTalking(true);
      });

      client.on("agent_stop_talking", () => {
        setIsAgentTalking(false);
      });

      client.on("update", (update) => {
        if (update && update.transcript && Array.isArray(update.transcript)) {
          const formatted = update.transcript.map((item) => ({
            role: item.role === "agent" ? "agent" : "user",
            content: item.content,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          }));
          setTranscript(formatted);
        }
      });

      client.on("audio", (samples) => {
        if (samples && samples.length) {
          let sum = 0;
          for (let i = 0; i < samples.length; i += 16) {
            sum += Math.abs(samples[i]);
          }
          const avg = sum / (samples.length / 16);
          setAudioLevel(Math.min(1, avg * 5));
        }
      });

      client.on("call_ended", () => {
        setCallStatus("ended");
        setIsAgentTalking(false);
        setAudioLevel(0);
        setTimeout(() => {
          setCallStatus("idle");
        }, 4000);
      });

      client.on("error", (err) => {
        console.error("Retell client error:", err);
        setErrorMessage(typeof err === "string" ? err : err.message || "Voice session encountered an error.");
        setCallStatus("error");
      });

      // 3. Start call with access token and gateway transport
      await client.startCall({
        accessToken: webCallData.access_token,
        transport: webCallData.transport || "gateway",
        callId: webCallData.call_id,
        iceServers: webCallData.ice_servers,
        emitRawAudioSamples: true,
      });

    } catch (err) {
      console.error("Failed to start voice call:", err);
      let msg = err.message || "Could not start voice call.";
      if (err.name === "NotAllowedError" || err.message?.includes("Permission denied")) {
        msg = "Microphone permission was denied. Please allow microphone access in your browser to talk directly to the AI.";
      }
      setErrorMessage(msg);
      setCallStatus("error");
    }
  };

  const handleEndCall = () => {
    if (retellClientRef.current) {
      try {
        retellClientRef.current.stopCall();
      } catch (e) {
        console.error("Error stopping call:", e);
      }
    }
    setCallStatus("ended");
    setIsAgentTalking(false);
    setAudioLevel(0);
    setTimeout(() => {
      setCallStatus("idle");
    }, 3000);
  };

  const toggleMute = () => {
    if (!retellClientRef.current) return;
    if (isMuted) {
      retellClientRef.current.unmute();
      setIsMuted(false);
    } else {
      retellClientRef.current.mute();
      setIsMuted(true);
    }
  };

  const scrollToBubblySection = () => {
    const el = document.getElementById("cad-bubbly-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* ══ DEDICATED IN-PAGE BUBBLY SECTION (PLACED RIGHT AFTER FORMS) ══ */}
      <section className="cad-bubbly-section" id="cad-bubbly-section">
        <div className="cad-container">
          {/* Header */}
          <div className="cad-section-header">
            <p className="cad-eyebrow">
              <i className="fal fa-bolt" /> Instant AI Voice Demo · Zero Waiting
            </p>
            <h2 className="cad-section-title">
              Skip the form. <span style={{ color: "#bd2120" }}>Talk directly to the AI.</span>
            </h2>
            <p className="cad-section-sub">
              Prefer speaking? Click the bubble below to launch a live, real-time voice call with
              our Dubai Real Estate AI agent right from your browser.
            </p>
          </div>

          {/* Interactive Bubbly Widget Container */}
          <div className="cad-bubbly-wrapper">
            <div className={`cad-bubbly-card ${callStatus === "live" ? "cad-bubbly-card--live" : ""}`}>
              {/* Agent Top Bar */}
              <div className="cad-bubbly-header">
                <div className="cad-bubbly-agent-info">
                  <div className="cad-bubbly-avatar">
                    <span className="cad-bubbly-avatar-glow" />
                    <i className="fal fa-robot" />
                  </div>
                  <div>
                    <div className="cad-bubbly-agent-name">
                      Freya · AI Voice Agent
                      <span className="cad-bubbly-agent-role">Dubai Real Estate</span>
                    </div>
                    <div className="cad-bubbly-agent-sub">
                      Agent ID: <code style={{ color: "#bd2120" }}>agent_99b7b8c...</code> · Retell AI WebRTC
                    </div>
                  </div>
                </div>

                <div className="cad-bubbly-status-wrap">
                  {callStatus === "idle" && (
                    <span className="cad-status-pill cad-status-pill--ready">
                      <span className="cad-dot cad-dot--green" /> Ready to Talk
                    </span>
                  )}
                  {callStatus === "connecting" && (
                    <span className="cad-status-pill cad-status-pill--connecting">
                      <span className="cad-spinner-mini" /> Connecting…
                    </span>
                  )}
                  {callStatus === "live" && (
                    <span className="cad-status-pill cad-status-pill--live">
                      <span className="cad-dot cad-dot--red-pulse" />
                      {isAgentTalking ? "Freya Speaking" : "Listening to you"} · {formatTime(duration)}
                    </span>
                  )}
                  {callStatus === "ended" && (
                    <span className="cad-status-pill">
                      ✓ Call Ended
                    </span>
                  )}
                  {callStatus === "error" && (
                    <span className="cad-status-pill cad-status-pill--error">
                      ⚠️ Error
                    </span>
                  )}
                </div>
              </div>

              {/* Main Interactive Bubble Area */}
              <div className="cad-bubbly-main">
                {/* Visualizer & Ripple Aura */}
                <div className="cad-orb-stage">
                  <div className={`cad-orb-ripples ${callStatus === "live" ? "cad-orb-ripples--active" : ""}`}>
                    <span className="cad-ripple r1" />
                    <span className="cad-ripple r2" />
                    <span className="cad-ripple r3" />
                  </div>

                  {/* The Interactive Bubbly Orb Button */}
                  <button
                    type="button"
                    id="cad-bubbly-talk-button"
                    className={`cad-bubbly-orb ${callStatus === "live" ? "cad-bubbly-orb--live" : ""} ${
                      isAgentTalking ? "cad-bubbly-orb--speaking" : ""
                    } ${callStatus === "connecting" ? "cad-bubbly-orb--connecting" : ""}`}
                    onClick={() => {
                      if (callStatus === "idle" || callStatus === "ended" || callStatus === "error") {
                        startVoiceCall();
                      }
                    }}
                    disabled={callStatus === "connecting"}
                    aria-label="Click bubble to talk to AI"
                  >
                    <div className="cad-orb-glass-highlight" />
                    <div className="cad-orb-inner">
                      {callStatus === "idle" && (
                        <div className="cad-orb-content">
                          <i className="fal fa-microphone cad-orb-mic" />
                          <span className="cad-orb-prompt">CLICK TO TALK</span>
                          <span className="cad-orb-sub">Tap bubble &amp; speak</span>
                        </div>
                      )}

                      {callStatus === "connecting" && (
                        <div className="cad-orb-content">
                          <svg className="cad-orb-spinner" viewBox="0 0 50 50">
                            <circle cx="25" cy="25" r="20" fill="none" strokeWidth="4" />
                          </svg>
                          <span className="cad-orb-prompt">CONNECTING</span>
                          <span className="cad-orb-sub">Starting mic stream…</span>
                        </div>
                      )}

                      {callStatus === "live" && (
                        <div className="cad-orb-content">
                          <div className={`cad-orb-wave-bars ${isAgentTalking ? "cad-orb-wave-bars--talking" : ""}`}>
                            <span style={{ transform: `scaleY(${1 + audioLevel * 2.5})` }} />
                            <span style={{ transform: `scaleY(${1 + audioLevel * 3.5})` }} />
                            <span style={{ transform: `scaleY(${1 + audioLevel * 4.0})` }} />
                            <span style={{ transform: `scaleY(${1 + audioLevel * 3.2})` }} />
                            <span style={{ transform: `scaleY(${1 + audioLevel * 2.0})` }} />
                          </div>
                          <span className="cad-orb-prompt">
                            {isAgentTalking ? "AI TALKING" : "YOU SPEAK"}
                          </span>
                          <span className="cad-orb-timer">{formatTime(duration)}</span>
                        </div>
                      )}

                      {(callStatus === "ended" || callStatus === "error") && (
                        <div className="cad-orb-content">
                          <i className="fal fa-redo cad-orb-mic" />
                          <span className="cad-orb-prompt">TALK AGAIN</span>
                          <span className="cad-orb-sub">Tap to restart</span>
                        </div>
                      )}
                    </div>
                  </button>
                </div>

                {/* Subtitle helper under bubble */}
                <div className="cad-bubbly-hint">
                  {callStatus === "idle" && (
                    <p>
                      <i className="fal fa-sparkles" style={{ color: "#bd2120", marginRight: 6 }} />
                      No telephone or form needed — talk straight via your laptop or phone microphone.
                    </p>
                  )}
                  {callStatus === "connecting" && (
                    <p>
                      Connecting secure WebRTC audio channel to Retell AI…
                    </p>
                  )}
                  {callStatus === "live" && (
                    <p>
                      {isAgentTalking
                        ? "Freya is responding with real-time AI voice generation…"
                        : "Listening to your voice. Ask about Dubai properties, budget, or viewing times."}
                    </p>
                  )}
                </div>

                {/* Active Call Controls (Mute & End) */}
                {callStatus === "live" && (
                  <div className="cad-bubbly-controls">
                    <button
                      type="button"
                      className={`cad-ctrl-btn ${isMuted ? "cad-ctrl-btn--muted" : ""}`}
                      onClick={toggleMute}
                      title={isMuted ? "Unmute microphone" : "Mute microphone"}
                    >
                      <i className={`fal ${isMuted ? "fa-microphone-slash" : "fa-microphone"}`} />
                      <span>{isMuted ? "Unmute" : "Mute Mic"}</span>
                    </button>
                    <button
                      type="button"
                      className="cad-ctrl-btn cad-ctrl-btn--hangup"
                      onClick={handleEndCall}
                      title="End Call"
                    >
                      <i className="fal fa-phone-slash" />
                      <span>End Call</span>
                    </button>
                  </div>
                )}

                {/* Error Banner */}
                {errorMessage && (
                  <div className="cad-bubbly-error">
                    <i className="fal fa-exclamation-circle" />
                    <span>{errorMessage}</span>
                    <button type="button" onClick={() => setErrorMessage("")}>✕</button>
                  </div>
                )}

                {/* Live Conversation Transcript Feed */}
                {transcript.length > 0 && (
                  <div className="cad-transcript-box">
                    <div className="cad-transcript-header">
                      <span><i className="fal fa-comments" /> Live Conversation Dialogue</span>
                      <span className="cad-transcript-tag">Real-Time WebRTC</span>
                    </div>
                    <div className="cad-transcript-body" ref={transcriptScrollRef}>
                      {transcript.map((item, idx) => (
                        <div
                          key={idx}
                          className={`cad-transcript-msg cad-transcript-msg--${item.role}`}
                        >
                          <div className="cad-msg-sender">
                            {item.role === "agent" ? "🤖 Freya (AI)" : item.role === "user" ? "👤 You" : "⚡ System"}
                            <span className="cad-msg-time">{item.time}</span>
                          </div>
                          <div className="cad-msg-bubble">{item.content}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Suggested Conversation Prompts */}
                <div className="cad-bubbly-prompts">
                  <div className="cad-prompts-label">Try asking Freya:</div>
                  <div className="cad-prompts-grid">
                    {PROMPTS.map((p, i) => (
                      <div key={i} className="cad-prompt-pill">
                        <i className="fal fa-comment-alt-lines" />
                        "{p}"
                      </div>
                    ))}
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="cad-bubbly-footer-meta">
                  <span><i className="fal fa-shield-check" /> 100% Private WebRTC Audio</span>
                  <span><i className="fal fa-stopwatch" /> &lt;600ms Real-Time Response</span>
                  <span><i className="fal fa-bolt" /> Retell v3 Engine</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FLOATING BUBBLY WIDGET (CORNER ACCESS) ══ */}
      {floatingOpen && (
        <div className={`cad-float-bubble ${callStatus === "live" ? "cad-float-bubble--live" : ""}`}>
          {callStatus !== "live" ? (
            <div className="cad-float-content">
              <button
                type="button"
                className="cad-float-orb"
                onClick={startVoiceCall}
                title="Click to talk directly to AI voice agent"
                aria-label="Talk to AI Voice Agent"
              >
                <span className="cad-float-pulse" />
                <i className="fal fa-microphone" />
                <span className="cad-float-badge">TALK</span>
              </button>
              <div className="cad-float-tooltip">
                <strong>Talk to Freya AI</strong>
                <span>Click bubble to speak live</span>
              </div>
              <button
                type="button"
                className="cad-float-close"
                onClick={() => setFloatingOpen(false)}
                title="Dismiss"
              >
                ✕
              </button>
            </div>
          ) : (
            <div className="cad-float-live-pill">
              <div className="cad-float-live-avatar" onClick={scrollToBubblySection}>
                <span className="cad-float-live-dot" />
                <i className="fal fa-robot" />
              </div>
              <div className="cad-float-live-info" onClick={scrollToBubblySection}>
                <div className="cad-float-live-title">
                  {isAgentTalking ? "Freya Speaking" : "Listening…"}
                </div>
                <div className="cad-float-live-timer">{formatTime(duration)}</div>
              </div>
              <button
                type="button"
                className="cad-float-hangup"
                onClick={handleEndCall}
                title="End Call"
              >
                <i className="fal fa-phone-slash" />
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
