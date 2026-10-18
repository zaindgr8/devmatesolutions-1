// Live voice with Freya on Gemini Live (ported from the Sixty landing page).
// /api/freya-token returns a one-time Gemini token (prompt, voice and tools are locked server-side).
// The browser streams 16 kHz mic audio up and plays Gemini's 24 kHz audio back.
// When the call ends, the lead details + transcript go to /api/freya-lead, which emails them via Resend.
import { startAmbience, playRingback, playPickup, createVoiceRoom } from "./ambience";

const WS_URL =
  "wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContentConstrained";
const MAX_CALL_MS = 10 * 60_000;
const MIN_RING_MS = 1800; // let the line ring at least once before Freya "picks up"

const b64 = {
  fromBytes(bytes) {
    let s = "";
    for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
    return btoa(s);
  },
  toBytes(str) {
    const bin = atob(str);
    const out = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  },
};

// Captures mic audio, downsamples to 16 kHz and converts to 16-bit PCM in an AudioWorklet.
const WORKLET = `
class Pcm16 extends AudioWorkletProcessor {
  constructor() { super(); this.buf = []; this.ratio = sampleRate / 16000; this.pos = 0; }
  process(inputs) {
    const ch = inputs[0][0];
    if (!ch) return true;
    for (; this.pos < ch.length; this.pos += this.ratio) {
      const s = Math.max(-1, Math.min(1, ch[Math.floor(this.pos)]));
      this.buf.push(s < 0 ? s * 0x8000 : s * 0x7fff);
    }
    this.pos -= ch.length;
    if (this.buf.length >= 1600) { // 100 ms chunks
      const pcm = new Int16Array(this.buf); this.buf = [];
      this.port.postMessage(pcm.buffer, [pcm.buffer]);
    }
    return true;
  }
}
registerProcessor('pcm16', Pcm16);`;

/**
 * Creates the voice engine. `emit(type, detail)` receives:
 *   phase {phase: idle|connecting|live, message?} · level {lvl} · user {text} · agent {text} · turn {} · saved {lead}
 *   show {section} (scroll the page) · booked {when}
 */
export function createFreyaEngine(emit) {
  let phase = "idle";
  let ws = null, mic = null, out = null;
  let raf = null, limitTimer = null, pickupTimer = null;
  let ambience = null, stopRing = () => {}, ringStartedAt = 0, officeOn = true;
  let callId = "", startedAt = 0, lead = null, transcript = [];
  let timezone = "Asia/Dubai";
  try { timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || timezone; } catch { /* keep Dubai */ }

  const setPhase = (p, message) => { phase = p; emit("phase", { phase: p, message }); };

  // Transcription arrives in fragments; merge consecutive fragments from the same speaker.
  const record = (role, text) => {
    const last = transcript[transcript.length - 1];
    if (last && last.role === role && !last.done) last.text += text;
    else transcript.push({ role, text });
  };

  async function startMic() {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true, channelCount: 1 },
    });
    const ctx = new AudioContext();
    const url = URL.createObjectURL(new Blob([WORKLET], { type: "application/javascript" }));
    await ctx.audioWorklet.addModule(url);
    URL.revokeObjectURL(url);
    const source = ctx.createMediaStreamSource(stream);
    const node = new AudioWorkletNode(ctx, "pcm16");
    node.port.onmessage = (e) => {
      if (ws?.readyState !== WebSocket.OPEN || phase !== "live") return;
      ws.send(JSON.stringify({
        realtimeInput: { audio: { data: b64.fromBytes(new Uint8Array(e.data)), mimeType: "audio/pcm;rate=16000" } },
      }));
    };
    source.connect(node);
    mic = { stream, ctx };
  }

  function startOutput() {
    const ctx = new AudioContext({ sampleRate: 24000 });
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 512;
    analyser.connect(ctx.destination);
    // Freya's voice: dry through the analyser (drives the orb) plus a touch of room reflection.
    const voice = ctx.createGain();
    voice.connect(analyser);
    voice.connect(createVoiceRoom(ctx));
    out = { ctx, analyser, voice, nextAt: 0, sources: new Set() };
  }

  function playPcm(base64) {
    if (!out) return;
    const bytes = b64.toBytes(base64);
    const pcm = new Int16Array(bytes.buffer, bytes.byteOffset, bytes.byteLength >> 1);
    const f32 = new Float32Array(pcm.length);
    for (let i = 0; i < pcm.length; i++) f32[i] = pcm[i] / 0x8000;
    const buf = out.ctx.createBuffer(1, f32.length, 24000);
    buf.copyToChannel(f32, 0);
    const src = out.ctx.createBufferSource();
    src.buffer = buf;
    src.connect(out.voice);
    const at = Math.max(out.ctx.currentTime + 0.02, out.nextAt);
    src.start(at);
    out.nextAt = at + buf.duration;
    out.sources.add(src);
    src.onended = () => out?.sources.delete(src);
  }

  function flushPlayback() {
    if (!out) return;
    for (const s of out.sources) { try { s.stop(); } catch { /* already stopped */ } }
    out.sources.clear();
    out.nextAt = 0;
  }

  function level() {
    let lvl = 0;
    if (out) {
      const buf = new Uint8Array(out.analyser.fftSize);
      out.analyser.getByteTimeDomainData(buf);
      let sum = 0;
      for (const v of buf) { const x = (v - 128) / 128; sum += x * x; }
      lvl = Math.min(1, Math.sqrt(sum / buf.length) * 4);
    }
    ambience?.duck(lvl > 0.04);
    emit("level", { lvl });
    raf = requestAnimationFrame(level);
  }

  function answer() {
    if (!ws || !out) return;
    stopRing();
    stopRing = () => {};
    playPickup(out.ctx);
    setPhase("live");
    level();
    ambience = startAmbience(out.ctx);
    ambience.setEnabled(officeOn);
    limitTimer = setTimeout(() => stop("That’s the end of our call. Thanks for talking to Freya!"), MAX_CALL_MS);
    ws.send(JSON.stringify({
      clientContent: {
        turns: [{ role: "user", parts: [{ text: '(The visitor just joined the call from the DevMate Solutions website. Greet them warmly and briefly as "Freya from DevMate" and ask who you are speaking with.)' }] }],
        turnComplete: true,
      },
    }));
  }

  async function onMessage(ev) {
    const text = typeof ev.data === "string" ? ev.data : await ev.data.text();
    let m;
    try { m = JSON.parse(text); } catch { return; }

    if (m.setupComplete) {
      // Let the ringback finish its first ring so the pickup feels like a real call.
      pickupTimer = setTimeout(answer, Math.max(0, ringStartedAt + MIN_RING_MS - Date.now()));
      return;
    }

    const sc = m.serverContent;
    if (sc) {
      if (sc.interrupted) flushPlayback();
      for (const p of sc.modelTurn?.parts || []) if (p.inlineData?.data) playPcm(p.inlineData.data);
      if (sc.inputTranscription?.text) { record("user", sc.inputTranscription.text); emit("user", { text: sc.inputTranscription.text }); }
      if (sc.outputTranscription?.text) { record("agent", sc.outputTranscription.text); emit("agent", { text: sc.outputTranscription.text }); }
      if (sc.turnComplete) {
        transcript.forEach((t) => { t.done = true; });
        emit("turn");
      }
    }
    if (m.toolCall?.functionCalls) {
      const responses = await Promise.all(m.toolCall.functionCalls.map(async (fc) => ({
        id: fc.id,
        name: fc.name,
        response: await runTool(fc.name, fc.args || {}),
      })));
      ws?.send(JSON.stringify({ toolResponse: { functionResponses: responses } }));
    }
    if (m.goAway) stop("The call reached its time limit. Thanks for talking to Freya!");
  }

  async function runTool(name, args) {
    try {
      if (name === "save_lead") return saveLead(args);
      if (name === "check_availability") return await calendar({ action: "slots", date: args.date });
      if (name === "book_meeting") return await bookMeeting(args);
      if (name === "show_section") { emit("show", { section: args.section }); return { result: `Scrolled to ${args.section}.` }; }
      return { error: "Unknown tool" };
    } catch {
      return { error: "That didn't work because of a connection problem. Offer to have the team follow up by email instead." };
    }
  }

  async function calendar(body) {
    const res = await fetch("/api/freya-calendar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...body, timezone }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) return { error: data.error || "The calendar is unavailable. Offer to have the team email them times instead." };
    return data;
  }

  async function bookMeeting(args) {
    const r = await calendar({ action: "book", ...args });
    if (r.error) return r;
    lead = { ...(lead || {}), name: args.name, email: args.email, meeting_time: r.label, meeting_status: "Booked in Cal.com" };
    if (r.meeting_url) lead.meeting_url = r.meeting_url;
    emit("booked", { when: r.label });
    return { booked: true, when: r.label };
  }

  // Kept in memory and emailed with the transcript when the call ends.
  function saveLead(args) {
    lead = { ...(lead || {}), ...args };
    emit("saved", { lead });
    return { result: "Saved for the team." };
  }

  function sendSummary() {
    const lines = transcript.map(({ role, text }) => ({ role, text: text.trim() })).filter((t) => t.text);
    if (!lead && !lines.some((t) => t.role === "user")) return;
    const body = JSON.stringify({
      callId,
      durationSec: Math.round((Date.now() - startedAt) / 1000),
      lead,
      transcript: lines,
    });
    // keepalive lets the request finish even if the visitor closes the tab right after hanging up.
    fetch("/api/freya-lead", { method: "POST", headers: { "Content-Type": "application/json" }, body, keepalive: body.length < 60_000 })
      .catch(() => {});
  }

  async function start() {
    if (phase !== "idle") return;
    lead = null;
    transcript = [];
    callId = `call-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
    startedAt = Date.now();
    setPhase("connecting");
    startOutput(); // created inside the click so the browser lets it play sound
    try {
      await startMic();
    } catch {
      return cleanup("Please allow microphone access to talk to Freya.");
    }
    out?.ctx.resume().catch(() => {});
    ringStartedAt = Date.now();
    if (out) stopRing = playRingback(out.ctx);
    try {
      const res = await fetch("/api/freya-token", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ timezone }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.token) throw new Error(data.error || "We couldn't start the call. Please try again.");
      ws = new WebSocket(`${WS_URL}?access_token=${encodeURIComponent(data.token)}`);
      ws.onopen = () => ws.send(JSON.stringify({ setup: { model: data.model } }));
      ws.onmessage = onMessage;
      ws.onerror = () => cleanup("The call dropped. Please try again.");
      ws.onclose = (e) => { if (phase !== "idle") cleanup(e.code === 1000 ? "" : "The call ended unexpectedly. Please try again."); };
    } catch (err) {
      cleanup(err.message);
    }
  }

  function stop(message) {
    cleanup(message || (lead?.meeting_status?.startsWith("Booked")
      ? "You're booked! The invite is in your inbox."
      : "Call ended. Thanks for talking to Freya!"));
  }

  function cleanup(message) {
    const wasCall = phase !== "idle";
    clearTimeout(limitTimer);
    clearTimeout(pickupTimer);
    cancelAnimationFrame(raf);
    stopRing();
    stopRing = () => {};
    ambience?.stop();
    ambience = null;
    const socket = ws;
    ws = null;
    if (socket && socket.readyState <= 1) { socket.onclose = null; socket.close(1000); }
    if (mic) { mic.stream.getTracks().forEach((t) => t.stop()); mic.ctx.close().catch(() => {}); mic = null; }
    if (out) { flushPlayback(); out.ctx.close().catch(() => {}); out = null; }
    if (wasCall) sendSummary();
    lead = null;
    transcript = [];
    emit("level", { lvl: 0 });
    setPhase("idle", message || "");
  }

  const onPageHide = () => { if (phase !== "idle") cleanup(); };
  addEventListener("pagehide", onPageHide);

  return {
    start,
    stop,
    get phase() { return phase; },
    // Office background sound on/off (the ringback and room tone on Freya's voice stay).
    setOffice(on) { officeOn = on; ambience?.setEnabled(on); },
    destroy() {
      removeEventListener("pagehide", onPageHide);
      if (phase !== "idle") cleanup();
    },
  };
}
