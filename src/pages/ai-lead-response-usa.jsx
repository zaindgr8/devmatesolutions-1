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
    q: "What is AI lead response, in plain terms?",
    a: "Every new lead gets a live, useful answer on the phone in seconds — not a voicemail, not a message slip, and not a callback hours later. The assistant answers the caller's questions from your approved script, qualifies the enquiry, books the appointment or viewing into a real calendar, and logs everything for your team.",
  },
  {
    q: "Is this the same as an answering service?",
    a: "No. An answering service takes a message. This assistant holds the conversation: it books, reschedules, confirms, and follows up, then hands the caller to your team with the full context when a person is needed. The output is a booked appointment, not a note to call back.",
  },
  {
    q: "Which kinds of businesses is it built for?",
    a: "The three wave-one niches we serve in the USA: real estate brokerages in Miami, Houston, and Dallas-Fort Worth; dental clinics; and med spas and aesthetics clinics. The call flow is tuned per niche — viewings and qualifying questions for real estate, appointment bookings and reschedules for dental, consultations and treatments for med spas — but the promise is the same: no lead waits for a callback.",
  },
  {
    q: "What about after-hours leads — someone calling at 9 p.m.?",
    a: "That is exactly when it earns its keep. Evening, weekend, and holiday callers get the same careful handling as a weekday caller: the assistant answers from your approved script, books into a real calendar, and logs it for your team. Nobody has to wait until Monday, and nobody is lost to a competitor who answered first.",
  },
  {
    q: "Does it replace our front desk or agents?",
    a: "No. It replaces the missed call, not the team. It answers, books, and reschedules, then hands the caller to your team with the full conversation attached. Your team stops playing phone tag and starts with clients who are already booked — or with the calls that genuinely need a human.",
  },
  {
    q: "Is AI calling compliant in the United States?",
    a: "It is built with consent, opt-out, and do-not-call screening in mind: outbound contact is screened against do-not-call lists, consent is recorded, every caller can opt out, and calls respect the caller's local time zone. Your team reviews and signs off the scripts and calling rules before anything goes live. Client records stay in your own systems.",
  },
  {
    q: "How much does it cost?",
    a: "Contact our sales team for pricing. Pricing depends on your call volume, your locations, and which systems we connect, so we quote after a short demo call, not from a fixed list on this page.",
  },
  {
    q: "How fast can we go live?",
    a: "Most businesses go live in about two weeks from briefing: share your services and your script, review the call flows, connect your phone numbers and calendar, test live with your team, then launch with a tuning window after go-live.",
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
  name: "AI Lead Response USA",
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
    "AI lead response for US businesses: every new lead answered on the phone in seconds, qualified, booked into a real calendar, and logged — for real estate, dental clinics, and med spas in Miami, Houston, Dallas-Fort Worth, Florida, and Texas.",
};

const JOBS = [
  { num: "01", icon: "fal fa-phone", title: "Every lead answered in seconds", desc: "No more missed calls going to voicemail while your team is with clients. Every caller gets a live, helpful answer in seconds." },
  { num: "02", icon: "fal fa-filter", title: "Qualified on the call itself", desc: "Budget, area, and timeline for real estate; treatment or appointment need for clinics — asked plainly, in order, before anything is booked." },
  { num: "03", icon: "fal fa-calendar-check", title: "Booked appointments, not messages", desc: "Viewings, dental appointments, and consultations go straight into a real calendar, with reminders so fewer slots are wasted." },
  { num: "04", icon: "fal fa-moon", title: "After-hours coverage", desc: "Evening and weekend callers — often buyers and patients choosing a new provider — get the same careful handling as a weekday caller." },
  { num: "05", icon: "fal fa-bell", title: "Follow-up that does not depend on memory", desc: "Timed, polite follow-up for leads that go quiet, until they reply, book, or opt out — so warm leads stay warm." },
  { num: "06", icon: "fal fa-user", title: "Human handover, on demand", desc: "The moment a caller asks for a person, or a situation needs one, the full history goes to your team. No dead ends, no repeated questions." },
];

const LEAKS = [
  { stage: "Stage 1", title: "The lead waits for a callback", desc: "A new lead calls while your team is busy. It goes to voicemail. By the time anyone calls back, they have booked with a competitor.", fix: "AI answers every call in seconds, live.", impact: "The first live answer usually wins the client." },
  { stage: "Stage 2", title: "The team drowns in phone tag", desc: "Your team spends the day returning calls, confirming appointments, and rescheduling — instead of helping the clients in the building.", fix: "AI books, confirms, and reschedules on the call itself.", impact: "The team handles people, not voicemail." },
  { stage: "Stage 3", title: "Quiet leads cool and disappear", desc: "A warm lead goes quiet for two days. Nobody follows up, because nobody owns the follow-up. The lead cools and is gone.", fix: "Timed follow-up runs until the lead replies, books, or opts out.", impact: "Warm leads stay warm without a human chasing them." },
];

const STEPS = [
  { num: "1", title: "Share your services and script", desc: "We read your services, hours, and locations and draft your lead-response flow in your business's voice.", time: "20 min" },
  { num: "2", title: "Review and sign off", desc: "Your full call script and escalation rules, reviewed by your team before anything is built.", time: "45 min" },
  { num: "3", title: "Connect numbers and calendar", desc: "Your phone numbers, booking calendar, and CRM, wired into one pipeline with consent and do-not-call screening.", time: "One approval" },
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

const AiLeadResponseUsa = () => {
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
        pageTitle="AI Lead Response USA | Every New Lead Answered in Seconds"
        pageDescription="AI lead response for US real estate, dental clinics, and med spas in Miami, Houston, Dallas-Fort Worth, Florida and Texas: every new lead answered on the phone in seconds, qualified, booked into a real calendar, and logged."
        pageUrl="/ai-lead-response-usa"
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
                <div className="ailm-hero-badge"><span className="ailm-hero-dot"></span>USA · AI Lead Response · Voice First</div>
                <h1 className="ailm-hero-headline">AI lead response for US businesses that answers every new lead in <span className="ailm-red">seconds.</span></h1>
                <p className="ailm-hero-sub">
                  A buyer calls about a listing while your agents are out on viewings. A patient calls about an appointment while your front desk is with another patient. A new client calls a med spa at 9 p.m. This assistant answers all three on the phone itself — qualifies, books, and logs — while your team keeps serving the clients in front of them.
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
                    Voicemail waits for a callback, and a call centre usually takes a message. This assistant holds the actual conversation: it answers the caller's questions from your approved script, qualifies the enquiry, books into a real calendar, and follows up if the caller does not confirm.
                  </p>
                  <p style={{ fontSize: 17, lineHeight: 1.7, color: "#4b5563" }}>
                    When a caller asks for a person, or a situation needs one, it hands over immediately with the full context, so nobody has to repeat themselves.
                  </p>
                </div>
                <div className="chatbot-reveal">
                  <div className="chatbot-chat">
                    <p className="chatbot-sample">Sample call · Transcript</p>
                    <div className="chatbot-bubble chatbot-bubble--buyer">Hi, I saw a listing in Houston and I would like to see it this week.</div>
                    <div className="chatbot-bubble chatbot-bubble--bot">Of course. Is that for a home to live in or an investment, and is weekday morning or afternoon better for a viewing?</div>
                    <div className="chatbot-bubble chatbot-bubble--buyer">To live in. Afternoon works best.</div>
                    <div className="chatbot-bubble chatbot-bubble--bot">Perfect. We have Thursday at 2:30 p.m. with one of our agents. Shall we hold that viewing for you, and send a confirmation?</div>
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
                <h2 className="ailm-section-title">Where US leads actually die</h2>
                <p className="ailm-section-sub">It is rarely the service. It is the gap between the call and the first live answer.</p>
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
                <h2 className="ailm-section-title">Six jobs, one lead-response assistant</h2>
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
                <p className="ailm-eyebrow">One pipeline, three niches</p>
                <h2 className="ailm-section-title">Real estate, dental, and med spas — same promise</h2>
                <p className="ailm-section-sub">The call flow is tuned per niche. The standard — answered in seconds, qualified, booked, logged — is not.</p>
              </div>
              <div className="ailm-channels-grid">
                {[
                  { icon: "fal fa-building", label: "Real Estate", items: "Viewings booked, buyers qualified by budget, area, and timeline" },
                  { icon: "fal fa-tooth", label: "Dental Clinics", items: "Appointments booked, reschedules handled, reminders sent" },
                  { icon: "fal fa-spa", label: "Med Spas & Aesthetics", items: "Consultations booked, treatments answered from the approved script" },
                  { icon: "fal fa-plug", label: "Your Calendar & CRM", items: "Bookings straight into real calendars, call summaries logged" },
                ].map((c, i) => (
                  <div className="ailm-channel-card chatbot-reveal" key={i}>
                    <i className={`${c.icon} ailm-channel-icon`}></i>
                    <h3 className="ailm-channel-label">{c.label}</h3>
                    <p className="ailm-channel-items">{c.items}</p>
                  </div>
                ))}
              </div>
              <p style={{ textAlign: "center", marginTop: 28 }}>
                Niche pages:{" "}
                <Link href="/ai-call-assistant-usa-real-estate">AI Call Assistant for US Real Estate</Link>,{" "}
                <Link href="/ai-call-assistant-dental-usa">AI Call Assistant for Dental Clinics USA</Link>, and{" "}
                <Link href="/ai-call-assistant-aesthetics-usa">AI Call Assistant for Med Spas and Aesthetics Clinics USA</Link>.
              </p>
              <p style={{ textAlign: "center", marginTop: 12 }}>
                For dental practices:{" "}
                <Link href="/missed-calls-cost-dental-practice">What a Missed Call Costs a Dental Practice — and How to Work It Out</Link>.
              </p>
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
                <h2 className="ailm-final-cta-title">Hear it on your own leads, not a demo script</h2>
                <p className="ailm-final-cta-sub">
                  Book a demo and we will map a lead-response flow to your business —
                  your markets, your calendar, and your qualifying script — before anything is built.
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

export default AiLeadResponseUsa;
