// Office soundscape for Freya's calls, generated in the browser (no audio files).
// Everything plays straight to the speakers, never through the orb's analyser, so it doesn't move the orb.
//
//   startAmbience(ctx)  room tone, muffled colleagues talking, typing and mouse clicks, plus the odd
//                       distant phone, cup clink and paper rustle. Returns { stop, duck, setEnabled }.
//   playRingback(ctx)   the "ring… ring…" you hear before someone picks up. Returns a stop function.
//   playPickup(ctx)     a soft handset click when Freya answers.
//   createVoiceRoom(ctx) a light, short room reflection so Freya sounds like she's at a desk, not in a booth.

const AMBIENCE_VOLUME = 1; // overall level; 0 turns the office off, 1.5 is a busier office

const rand = (a, b) => a + Math.random() * (b - a);

function noiseBuffer(ctx, seconds, brown) {
  const len = Math.floor(ctx.sampleRate * seconds);
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const d = buf.getChannelData(0);
  let last = 0;
  for (let i = 0; i < len; i++) {
    const w = Math.random() * 2 - 1;
    if (brown) { last = (last + 0.02 * w) / 1.02; d[i] = last * 3.5; } else d[i] = w;
  }
  return buf;
}

function panner(ctx, pan) {
  if (!ctx.createStereoPanner) return ctx.createGain();
  const p = ctx.createStereoPanner();
  p.pan.value = pan;
  return p;
}

export function startAmbience(ctx) {
  const noop = { stop() {}, duck() {}, setEnabled() {} };
  if (!AMBIENCE_VOLUME) return noop;

  const timers = new Set();
  const later = (fn, ms) => { const t = setTimeout(() => { timers.delete(t); fn(); }, ms); timers.add(t); };
  const every = (fn, ms) => { const t = setInterval(fn, ms); timers.add(t); return t; };
  const loops = [];
  const loop = (buf) => { const s = ctx.createBufferSource(); s.buffer = buf; s.loop = true; s.start(); loops.push(s); return s; };

  let enabled = true;
  let ducked = false;
  const level = () => (enabled ? AMBIENCE_VOLUME * (ducked ? 0.7 : 1) : 0);

  const master = ctx.createGain();
  master.gain.setValueAtTime(0, ctx.currentTime);
  master.gain.linearRampToValueAtTime(level(), ctx.currentTime + 2); // fade in
  master.connect(ctx.destination);

  const white = noiseBuffer(ctx, 3, false);
  const brown = noiseBuffer(ctx, 4, true);

  // 1. Room tone: air conditioning and the low rumble of a building.
  {
    const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 600;
    const g = ctx.createGain(); g.gain.value = 0.045;
    loop(brown).connect(lp).connect(g).connect(master);
    const vent = ctx.createBiquadFilter(); vent.type = "bandpass"; vent.frequency.value = 1400; vent.Q.value = 0.4;
    const vg = ctx.createGain(); vg.gain.value = 0.0035;
    loop(white).connect(vent).connect(vg).connect(master);
  }

  // 2. Colleagues talking across the room. Each "talker" is noise shaped by two vowel-like formants,
  //    pulsed at syllable rate in talk spurts, then muffled by distance. Reads as speech you can't make out.
  const talkers = [
    { pan: -0.6, base: 0.010, pitch: 1 },
    { pan: 0.45, base: 0.008, pitch: 1.25 },
    { pan: 0.1, base: 0.005, pitch: 0.85 },
  ].map(({ pan, base, pitch }) => {
    const src = loop(white);
    const f1 = ctx.createBiquadFilter(); f1.type = "bandpass"; f1.Q.value = 5;
    const f2 = ctx.createBiquadFilter(); f2.type = "bandpass"; f2.Q.value = 7;
    const mix = ctx.createGain();
    const env = ctx.createGain(); env.gain.value = 0;
    const far = ctx.createBiquadFilter(); far.type = "lowpass"; far.frequency.value = 1700;
    src.connect(f1).connect(mix);
    src.connect(f2).connect(mix);
    mix.connect(env).connect(far).connect(panner(ctx, pan)).connect(master);
    return { f1, f2, env, base, pitch, talking: false, until: 0 };
  });
  every(() => {
    const now = ctx.currentTime;
    for (const t of talkers) {
      if (now >= t.until) {
        // Switch between a talk spurt (2–6 s) and a pause (1.5–7 s).
        t.talking = !t.talking && Math.random() < 0.75;
        t.until = now + (t.talking ? rand(2, 6) : rand(1.5, 7));
      }
      if (t.talking) {
        // A new syllable: new vowel shape and loudness.
        t.f1.frequency.setTargetAtTime(rand(350, 800) * t.pitch, now, 0.03);
        t.f2.frequency.setTargetAtTime(rand(1000, 2200) * t.pitch, now, 0.03);
        t.env.gain.setTargetAtTime(t.base * rand(0.35, 1), now, 0.025);
        t.env.gain.setTargetAtTime(t.base * 0.15, now + rand(0.09, 0.16), 0.04);
      } else {
        t.env.gain.setTargetAtTime(0, now, 0.15);
      }
    }
  }, 190);

  // One-shot helper: a short burst of filtered noise.
  const burst = (at, { dur, gain, type = "highpass", freq, q = 0.7, pan = 0 }) => {
    const s = ctx.createBufferSource(); s.buffer = white;
    const f = ctx.createBiquadFilter(); f.type = type; f.frequency.value = freq; f.Q.value = q;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, at);
    g.gain.exponentialRampToValueAtTime(gain, at + Math.min(0.004, dur / 4));
    g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
    s.connect(f).connect(g).connect(panner(ctx, pan)).connect(master);
    s.start(at, rand(0, 2)); s.stop(at + dur + 0.02);
  };

  // 3. Someone typing nearby in bursts, with a mouse click now and then.
  const typing = () => {
    let t = ctx.currentTime + 0.05;
    const pan = rand(-0.5, 0.5);
    const keys = 6 + Math.floor(Math.random() * 26);
    for (let i = 0; i < keys; i++) {
      t += rand(0.06, 0.2);
      burst(t, { dur: 0.018, gain: rand(0.01, 0.025), freq: rand(1800, 3300), pan });
      if (Math.random() < 0.08) t += rand(0.3, 0.7); // thinking pause
    }
    if (Math.random() < 0.6) {
      t += rand(0.4, 1.2);
      burst(t, { dur: 0.012, gain: 0.02, freq: 3500, pan });
      burst(t + 0.09, { dur: 0.012, gain: 0.016, freq: 3500, pan });
    }
    later(typing, rand(3500, 11000));
  };
  later(typing, 1800);

  // 4. A desk phone trilling somewhere across the office, two rings, nobody near us picks it up.
  const phone = () => {
    const pan = rand(-0.8, 0.8);
    const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 1900;
    const out = ctx.createGain(); out.gain.value = 0.0035;
    lp.connect(out).connect(panner(ctx, pan)).connect(master);
    const start = ctx.currentTime + 0.05;
    for (let r = 0; r < 2; r++) {
      const at = start + r * 3;
      [1020, 1180].forEach((freq) => {
        const o = ctx.createOscillator(); o.type = "triangle"; o.frequency.value = freq;
        const g = ctx.createGain(); g.gain.value = 0;
        for (let k = 0; k < 24; k++) g.gain.setValueAtTime(k % 2 ? 0 : 1, at + k * 0.05); // 20 Hz trill for 1.2 s
        g.gain.setValueAtTime(0, at + 1.2);
        o.connect(g).connect(lp);
        o.start(at); o.stop(at + 1.25);
      });
    }
    later(phone, rand(45000, 100000));
  };
  later(phone, rand(14000, 30000));

  // 5. A spoon against a mug.
  const clink = () => {
    const at = ctx.currentTime + 0.05;
    const pan = rand(-0.6, 0.6);
    const hits = Math.random() < 0.5 ? 1 : 2;
    for (let h = 0; h < hits; h++) {
      [2650, 4150, 5900].forEach((freq, i) => {
        const o = ctx.createOscillator(); o.frequency.value = freq * rand(0.98, 1.02);
        const g = ctx.createGain();
        const t0 = at + h * rand(0.18, 0.3);
        g.gain.setValueAtTime(0.0001, t0);
        g.gain.exponentialRampToValueAtTime(0.004 / (i + 1), t0 + 0.003);
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + rand(0.25, 0.45));
        o.connect(g).connect(panner(ctx, pan)).connect(master);
        o.start(t0); o.stop(t0 + 0.5);
      });
    }
    later(clink, rand(30000, 75000));
  };
  later(clink, rand(9000, 25000));

  // 6. Papers being shuffled or a page turned.
  const rustle = () => {
    let t = ctx.currentTime + 0.05;
    const pan = rand(-0.7, 0.7);
    const n = 2 + Math.floor(Math.random() * 5);
    for (let i = 0; i < n; i++) {
      burst(t, { dur: rand(0.08, 0.22), gain: rand(0.006, 0.012), type: "bandpass", freq: rand(2500, 5000), q: 0.6, pan });
      t += rand(0.08, 0.25);
    }
    later(rustle, rand(20000, 55000));
  };
  later(rustle, rand(6000, 18000));

  const apply = () => master.gain.setTargetAtTime(level(), ctx.currentTime, ducked ? 0.08 : 0.4);

  return {
    // Dip the office slightly while Freya talks so she stays easy to understand.
    duck(on) { if (on !== ducked) { ducked = on; apply(); } },
    setEnabled(on) { enabled = on; apply(); },
    stop() {
      timers.forEach((t) => { clearTimeout(t); clearInterval(t); });
      timers.clear();
      try { master.gain.setTargetAtTime(0, ctx.currentTime, 0.2); } catch { /* context closed */ }
      setTimeout(() => {
        loops.forEach((s) => { try { s.stop(); } catch { /* already stopped */ } });
        try { master.disconnect(); } catch { /* already disconnected */ }
      }, 700);
    },
  };
}

// Ringback before pickup: 400 + 450 Hz, double ring (ring-ring, pause), as heard on UAE/UK lines.
export function playRingback(ctx) {
  const out = ctx.createGain(); out.gain.value = 0.06;
  out.connect(ctx.destination);
  const oscs = [400, 450].map((f) => { const o = ctx.createOscillator(); o.frequency.value = f; o.connect(out); o.start(); return o; });
  const gate = out.gain;
  const t0 = ctx.currentTime;
  gate.setValueAtTime(0, t0);
  for (let cycle = 0; cycle < 10; cycle++) {
    const c = t0 + 0.15 + cycle * 3;
    gate.setValueAtTime(0.06, c); gate.setValueAtTime(0, c + 0.4);
    gate.setValueAtTime(0.06, c + 0.6); gate.setValueAtTime(0, c + 1.0);
  }
  return () => {
    try { gate.cancelScheduledValues(ctx.currentTime); gate.setValueAtTime(0, ctx.currentTime); } catch { /* closed */ }
    oscs.forEach((o) => { try { o.stop(); } catch { /* already stopped */ } });
    setTimeout(() => { try { out.disconnect(); } catch { /* already */ } }, 50);
  };
}

// Soft handset click when Freya answers.
export function playPickup(ctx) {
  const at = ctx.currentTime + 0.01;
  const s = ctx.createBufferSource(); s.buffer = noiseBuffer(ctx, 0.08, false);
  const f = ctx.createBiquadFilter(); f.type = "bandpass"; f.frequency.value = 900; f.Q.value = 0.8;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, at);
  g.gain.exponentialRampToValueAtTime(0.09, at + 0.004);
  g.gain.exponentialRampToValueAtTime(0.0001, at + 0.07);
  s.connect(f).connect(g).connect(ctx.destination);
  s.start(at); s.stop(at + 0.09);
}

// A small, bright room: early reflections only, mixed in quietly behind Freya's dry voice.
export function createVoiceRoom(ctx) {
  const seconds = 0.45;
  const len = Math.floor(ctx.sampleRate * seconds);
  const ir = ctx.createBuffer(2, len, ctx.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const d = ir.getChannelData(ch);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3.2);
  }
  const conv = ctx.createConvolver(); conv.buffer = ir;
  const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 4200;
  const wet = ctx.createGain(); wet.gain.value = 0.11;
  conv.connect(lp).connect(wet).connect(ctx.destination);
  return conv;
}
