"use client";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import SEO from "../common/seo";
import Wrapper from "../layout/wrapper";
import HeaderThree from "@/src/layout/headers/header-3";
import FooterThree from "@/src/layout/footers/footer-3";

const FAQS = [
  {
    q: "Will an AI call assistant replace our front desk?",
    a: "No. It replaces the missed call, not the front desk. It answers, books, and reschedules, then hands the patient to your team with the full conversation attached. Your front desk stops playing phone tag and starts with patients who are already booked — or with the calls that genuinely need a human.",
  },
  {
    q: "Does it sound like a robot?",
    a: "It is built to sound like a natural phone conversation: it listens, pauses, handles interruptions, and answers in plain language. When a caller asks for a person, or a situation needs one, it hands over immediately with the full context, so nobody has to repeat themselves.",
  },
  {
    q: "What kinds of calls can it handle?",
    a: "New-patient bookings, existing-patient reschedules, appointment confirmations, and common questions answered from your practice's approved script — opening hours, location, and the services you offer. Anything outside that script, and any urgent or clinical concern, is routed to your team under the escalation rules your practice sets.",
  },
  {
    q: "What about urgent calls — a patient in pain, or a broken tooth?",
    a: "Your practice sets the escalation rules before anything goes live. Urgent-sounding calls are flagged and routed to your team or your on-call route right away, with the caller's details attached — the assistant does not try to triage or advise, it gets the patient to a human fast.",
  },
  {
    q: "Can it connect to our scheduling calendar and CRM?",
    a: "Yes. Bookings go straight into your practice calendar, with reminders and follow-up so fewer slots are wasted, and call summaries are logged to your CRM, where connected — tagged by intent, with the next step for your team.",
  },
  {
    q: "Is AI calling compliant in the United States?",
    a: "It is built with consent, opt-out, and do-not-call screening in mind: outbound contact is screened against do-not-call lists, consent is recorded, every caller can opt out, and calls respect the caller's local time zone. Your team reviews and signs off the scripts and calling rules before anything goes live. Patient records stay in your practice's own systems.",
  },
  {
    q: "How much does it cost?",
    a: "Contact our sales team for pricing. Pricing depends on your call volume, your locations, and which systems we connect, so we quote after a short demo call, not from a fixed list on this page.",
  },
  {
    q: "How fast can we go live?",
    a: "Most practices go live in about two weeks from briefing: share your services and your script, review the call flows, connect your phone numbers and calendar, test live with your team, then launch with a tuning window after go-live.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI Call Assistant for Dental Clinics USA",
  provider: {
    "@type": "Organization",
    name: "DevMate Solutions",
    url: "https://devmatesolutions.com",
  },
  areaServed: [
    { "@type": "City", name: "Miami" },
    { "@type": "City", name: "Houston" },
    { "@type": "City", name: "Dallas" },
    { "@type": "City", name: "Fort Worth" },
  ],
  description:
    "AI call assistant for US dental clinics: every call answered in seconds, new-patient bookings, reschedules, and reminders, with calendar and CRM logging, in Miami, Houston, Dallas-Fort Worth, Florida, and Texas.",
};

const JOBS = [
  { num: "01", icon: "fal fa-phone", title: "Every call answered", desc: "No more missed calls going to voicemail while your team is with patients. Every caller gets a live, helpful answer in seconds." },
  { num: "02", icon: "fal fa-calendar-check", title: "Booked appointments, not messages", desc: "New-patient bookings and reschedules go straight into your practice calendar, with reminders so fewer slots are wasted." },
  { num: "03", icon: "fal fa-moon", title: "After-hours coverage", desc: "Evening and weekend callers — often patients choosing a new dentist — get the same careful handling as a weekday caller." },
  { num: "04", icon: "fal fa-bell", title: "Reminders that fill chairs", desc: "Confirmation and reminder follow-up for booked appointments, so no-shows drop and the schedule stays full." },
  { num: "05", icon: "fal fa-plug", title: "Logged to your calendar and CRM", desc: "Every call is logged with a summary and next step, where connected, so your team starts the morning with a clean book — not a pile of voicemails." },
  { num: "06", icon: "fal fa-user", title: "Human handover, on demand", desc: "The moment a caller asks for a person, or a situation needs one, the full history goes to your team. No dead ends, no repeated questions." },
];

const LEAKS = [
  { stage: "Stage 1", title: "Missed calls become lost patients", desc: "A new patient calls while your team is chairside. It goes to voicemail. By the time anyone calls back, they have booked with another practice.", fix: "AI answers every call in seconds, live.", impact: "The first live answer usually wins the patient." },
  { stage: "Stage 2", title: "Front desks drown in phone tag", desc: "Your team spends the day returning calls, confirming appointments, and rescheduling — instead of helping the patients in the building.", fix: "AI books, confirms, and reschedules on the call itself.", impact: "The front desk handles people, not voicemail." },
  { stage: "Stage 3", title: "Empty chairs from no-shows", desc: "A booked patient forgets, or cannot make it and never says so. The slot sits empty while another patient waits for one.", fix: "Reminders and easy rescheduling keep the book full.", impact: "Fewer empty chairs, without extra staff hours." },
];

const STEPS = [
  { num: "1", title: "Share your services and script", desc: "We read your services, hours, and locations and draft your call assistant in your practice's voice.", time: "20 min" },
  { num: "2", title: "Review and sign off", desc: "Your full call script and escalation rules, reviewed by your team before anything is built.", time: "45 min" },
  { num: "3", title: "Connect numbers and calendar", desc: "Your phone numbers, practice calendar, and CRM, wired into one pipeline with consent and do-not-call screening.", time: "One approval" },
  { num: "4", title: "Live test, then go live", desc: "Real test calls with your team listening, tuned on the spot, then launch with a tuning window.", time: "1 hour" },
];

const COMPLIANCE = [
  { title: "Do-Not-Call Screening", desc: "Every outbound contact screened against do-not-call lists before dial." },
  { title: "Consent Records", desc: "Every call stored with timestamp, source, consent reference, and revocation status." },
  { title: "Opt-out Procedure", desc: "A tested opt-out that stops further contact and is recorded for your team." },
  { title: "Local Time Zone Calling", desc: "Calls respect the caller's local time zone, so nobody is called at an unreasonable hour." },
  { title: "Audit Log Access", desc: "Read-only view of every contact attempt — screening result, consent reference, time, and disclosure." },
  { title: "Retention Policy", desc: "Documented and automated deletion schedules per data type." },
];

const AiCallAssistantDentalUsa = () => {
  const [openFaq, setOpenFaq] = useState(0);
  useEffect(() => {
    const els = document.querySelectorAll(".chatbot-reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("chatbot-reveal--visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("chatbot-reveal--visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <SEO
        pageTitle="AI Call Assistant for Dental Clinics USA | Miami, Houston, Dallas"
        pageDescription="AI call assistant for US dental clinics in Miami, Houston, Dallas-Fort Worth, Florida and Texas: every call answered in seconds, new-patient bookings, reschedules, and reminders, with calendar and CRM logging."
        pageUrl="/ai-call-assistant-dental-usa"
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
        <style>{`
          .chatbot-reveal { opacity: 0; transform: translateY(18px); transition: opacity .6s ease, transform .6s ease; }
          .chatbot-reveal--visible { opacity: 1; transform: translateY(0); }
          .chatbot-chat { background: #fff; border: 1px solid #e5e7eb; border-radius: 20px; box-shadow: 0 20px 50px rgba(13,13,13,.08); padding: 20px; max-width: 420px; margin: 0 auto; }
          .chatbot-bubble { max-width: 85%; padding: 12px 16px; border-radius: 16px; font-size: 15px; line-height: 1.6; margin-bottom: 12px; animation: chatbot-bubble-in .5s ease both; }
          .chatbot-bubble--buyer { background: #f3f4f6; margin-left: auto; border-bottom-right-radius: 4px; }
          .chatbot-bubble--bot { background: #fef2f2; border: 1px solid #fecaca; border-bottom-left-radius: 4px; }
          .chatbot-bubble:nth-child(2) { animation-delay: .15s; }
          .chatbot-bubble:nth-child(3) { animation-delay: .3s; }
          .chatbot-bubble:nth-child(4) { animation-delay: .45s; }
          .chatbot-bubble:nth-child(5) { animation-delay: .6s; }
          @keyframes chatbot-bubble-in { from { opacity: 0; transform: translateY(10px) scale(.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
          .chatbot-typing span { display: inline-block; width: 7px; height: 7px; border-radius: 50%; background: #bd2120; margin-right: 4px; animation: chatbot-typing 1.2s infinite; }
          .chatbot-typing span:nth-child(2) { animation-delay: .2s; }
          .chatbot-typing span:nth-child(3) { animation-delay: .4s; }
          @keyframes chatbot-typing { 0%, 60%, 100% { transform: translateY(0); opacity: .4; } 30% { transform: translateY(-4px); opacity: 1; } }
          .chatbot-sample { font-size: 12px; letter-spacing: .08em; text-transform: uppercase; color: #6b7280; text-align: center; margin-bottom: 14px; }
          .chatbot-grid-two { display: grid; grid-template-columns: 1.1fr .9fr; gap: 40px; align-items: center; }
          @media (max-width: 768px) { .chatbot-grid-two { grid-template-columns: 1fr; } }
        `}</style>
      </Head>
      <Wrapper>
        <HeaderThree />
        <main className="ailm-page">
          <section className="ailm-hero">
            <div className="container">
              <div className="ailm-hero-header-wrap">
                <div className="ailm-hero-badge"><span className="ailm-hero-dot"></span>US Dental Clinics · AI Call Assistant</div>
                <h1 className="ailm-hero-headline">AI Call Assistant for Dental Clinics that answers every call in <span className="ailm-red">seconds.</span></h1>
                <p className="ailm-hero-sub">
                  A new patient calls while your team is chairside. Another wants to reschedule at 7 p.m. A third calls on Saturday, choosing a new dentist. This assistant answers all three on the phone itself — books the appointment, confirms it, and logs it — while your front desk keeps helping the patients in the building.
                </p>
                <div className="ailm-hero-ctas">
                  <a className="ailm-btn-primary" href="https://cal.com/devmate/sixty-onboarding">Book a demo <i className="fal fa-long-arrow-right ml-2"></i></a>
                  <a className="ailm-btn-ghost" href="#how-it-works">See how it works</a>
                </div>
                <div className="ailm-hero-metrics">
                  <div className="ailm-metric"><span className="ailm-metric-num">&lt; 60s</span><span className="ailm-metric-label">First Answer</span></div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric"><span className="ailm-metric-num">24 / 7</span><span className="ailm-metric-label">Coverage</span></div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric"><span className="ailm-metric-num">Voice first</span><span className="ailm-metric-label">AI Call</span></div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric"><span className="ailm-metric-num">FL · TX</span><span className="ailm-metric-label">Sun Belt Focus</span></div>
                </div>
              </div>
            </div>
          </section>

          <section className="ailm-section ailm-section--light">
            <div className="container">
              <div className="chatbot-grid-two">
                <div className="chatbot-reveal">
                  <p className="ailm-eyebrow">What a good first call sounds like</p>
                  <h2 className="ailm-section-title">Not a message slip. <span className="ailm-red">A booked appointment.</span></h2>
                  <p style={{ fontSize: 17, lineHeight: 1.7, color: "#4b5563" }}>
                    Voicemail waits for a callback, and a call centre usually takes a message. This assistant holds the actual conversation: it answers the caller's questions from your practice's approved script, books the appointment into a real calendar, and follows up if the patient does not confirm.
                  </p>
                  <p style={{ fontSize: 17, lineHeight: 1.7, color: "#4b5563" }}>
                    When a caller asks for a person, or a situation needs one, it hands over immediately with the full context, so nobody has to repeat themselves.
                  </p>
                </div>
                <div className="chatbot-reveal">
                  <div className="chatbot-chat">
                    <p className="chatbot-sample">Sample call · Transcript</p>
                    <div className="chatbot-bubble chatbot-bubble--buyer">Hi, I would like to book a cleaning. Are you taking new patients?</div>
                    <div className="chatbot-bubble chatbot-bubble--bot">Yes, we are. Are you looking for a routine cleaning and check-up, and is weekday morning or afternoon better for you?</div>
                    <div className="chatbot-bubble chatbot-bubble--buyer">Weekday morning works. I am in Houston.</div>
                    <div className="chatbot-bubble chatbot-bubble--bot">Perfect. We have Thursday at 9:30 a.m. with Dr. Lee's team. Shall we hold that slot for you, and send a confirmation?</div>
                    <div className="chatbot-typing"><span></span><span></span><span></span></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="ailm-section">
            <div className="container">
              <div className="ailm-section-header chatbot-reveal">
                <p className="ailm-eyebrow">The problem, honestly</p>
                <h2 className="ailm-section-title">Where dental calls actually die</h2>
                <p className="ailm-section-sub">It is rarely the dentistry. It is the gap between the call and the first live answer.</p>
              </div>
              <div className="ailm-leak-grid">
                {LEAKS.map((l, i) => (
                  <div className="ailm-leak-card chatbot-reveal" key={i}>
                    <p className="ailm-leak-stage">{l.stage}</p>
                    <h3 className="ailm-leak-title">{l.title}</h3>
                    <p className="ailm-leak-desc">{l.desc}</p>
                    <p className="ailm-leak-fix">{l.fix}</p>
                    <p className="ailm-leak-impact">{l.impact}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="ailm-section ailm-section--light">
            <div className="container">
              <div className="ailm-section-header chatbot-reveal">
                <p className="ailm-eyebrow">What it does</p>
                <h2 className="ailm-section-title">Six jobs, one call assistant</h2>
              </div>
              <div className="ailm-agents-grid">
                {JOBS.map((a, i) => (
                  <div className="ailm-agent-card chatbot-reveal" key={i}>
                    <span className="ailm-agent-num">{a.num}</span>
                    <i className={`${a.icon} ailm-agent-icon`}></i>
                    <h3 className="ailm-agent-name">{a.title}</h3>
                    <p className="ailm-agent-desc">{a.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="ailm-section">
            <div className="container">
              <div className="ailm-section-header chatbot-reveal">
                <p className="ailm-eyebrow">One pipeline</p>
                <h2 className="ailm-section-title">Every call, one booked appointment</h2>
                <p className="ailm-section-sub">Phone, website, and ads — no patient chased twice, none lost to voicemail.</p>
              </div>
              <div className="ailm-channels-grid">
                {[
                  { icon: "fal fa-phone", label: "Phone calls", items: "New-patient bookings, reschedules, confirmations" },
                  { icon: "fal fa-globe", label: "Website", items: "Callers from your site and ads, answered live" },
                  { icon: "fal fa-calendar-check", label: "Practice calendar", items: "Bookings straight into real calendars, with reminders" },
                  { icon: "fal fa-plug", label: "Your CRM", items: "Call summaries logged, tagged by intent, with next step" },
                ].map((c, i) => (
                  <div className="ailm-channel-card chatbot-reveal" key={i}>
                    <i className={`${c.icon} ailm-channel-icon`}></i>
                    <h3 className="ailm-channel-label">{c.label}</h3>
                    <p className="ailm-channel-items">{c.items}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="ailm-section ailm-section--light" id="how-it-works">
            <div className="container">
              <div className="ailm-section-header chatbot-reveal">
                <p className="ailm-eyebrow">How it works</p>
                <h2 className="ailm-section-title">From briefing to live, in about two weeks</h2>
              </div>
              <div className="ailm-onboarding-steps">
                {STEPS.map((s, i) => (
                  <div className="ailm-step chatbot-reveal" key={i}>
                    <span className="ailm-step-num">{s.num}</span>
                    <div className="ailm-step-content">
                      <h3 className="ailm-step-title">{s.title}</h3>
                      <p className="ailm-step-desc">{s.desc}</p>
                      <p className="ailm-step-time">{s.time}</p>
                    </div>
                    {i < STEPS.length - 1 && <div className="ailm-step-connector"></div>}
                  </div>
                ))}
              </div>
              <p style={{ textAlign: "center", marginTop: 28 }}>
                For the same voice-first approach in real estate, see{" "}
                <Link href="/ai-call-assistant-usa-real-estate">AI Call Assistant for US Real Estate</Link>.
              </p>
            </div>
          </section>

          <section className="ailm-section">
            <div className="container">
              <div className="ailm-section-header chatbot-reveal">
                <p className="ailm-eyebrow">Built for US calling</p>
                <h2 className="ailm-section-title">Safeguards your team can actually audit</h2>
              </div>
              <div className="ailm-compliance-grid">
                {COMPLIANCE.map((c, i) => (
                  <div className="ailm-compliance-card chatbot-reveal" key={i}>
                    <i className="fal fa-shield-check ailm-compliance-icon"></i>
                    <h4 className="ailm-compliance-title">{c.title}</h4>
                    <p className="ailm-compliance-desc">{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="ailm-section">
            <div className="container">
              <div className="ailm-section-header chatbot-reveal">
                <p className="ailm-eyebrow">Common Questions</p>
                <h2 className="ailm-section-title">Frequently Asked Questions</h2>
              </div>
              <div className="ailm-faqs">
                {FAQS.map((faq, i) => (
                  <div className={`ailm-faq ${openFaq === i ? "ailm-faq--open" : ""}`} key={i}>
                    <button
                      className="ailm-faq-q"
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    >
                      {faq.q}
                      <i className={`fal ${openFaq === i ? "fa-chevron-up" : "fa-chevron-down"}`}></i>
                    </button>
                    {openFaq === i && <div className="ailm-faq-a">{faq.a}</div>}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="ailm-final-cta">
            <div className="container">
              <div className="ailm-final-cta-inner">
                <p className="ailm-eyebrow ailm-eyebrow--light">Next Step</p>
                <h2 className="ailm-final-cta-title">Hear it on your own calls, not a demo script</h2>
                <p className="ailm-final-cta-sub">
                  Book a demo and we will map a call flow to your practice —
                  your services, your calendar, and your escalation rules — before
                  anything is built.
                </p>
                <div className="ailm-final-cta-btns">
                  <a className="ailm-btn-primary ailm-btn-white" href="https://cal.com/devmate/sixty-onboarding">
                    Book a demo <i className="fal fa-long-arrow-right ml-2"></i>
                  </a>
                  <Link className="ailm-btn-ghost ailm-btn-ghost--light" href="/ai-call-assistant-usa-real-estate">
                    See US Real Estate
                  </Link>
                </div>
                <p className="ailm-final-footnote">TechMate Solutions FZ LLC, trading as DevMate Solutions · Dubai | Muscat | NY · devmatesolutions.com</p>
              </div>
            </div>
          </section>
        </main>
        <FooterThree />
      </Wrapper>
    </>
  );
};

export default AiCallAssistantDentalUsa;
