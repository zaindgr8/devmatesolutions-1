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
    q: "Will an AI call assistant replace our agents?",
    a: "No. It replaces the missed call, not the agent. It answers, qualifies, and books, then hands a warm buyer or seller to a human agent with the full conversation attached. Agents stop playing phone tag and start with people who have already shared budget, area, and timeline.",
  },
  {
    q: "Does it sound like a robot?",
    a: "It is built to sound like a natural phone conversation: it listens, pauses, handles interruptions, and answers in plain language. When a caller asks for a person, or a deal needs one, it hands over immediately with the full context, so nobody has to repeat themselves.",
  },
  {
    q: "Can it connect to our CRM and lead sources?",
    a: "Yes. Calls from your website, ads, and listing portals are logged to your CRM — Follow Up Boss, kvCORE, HubSpot, Salesforce, or Pipedrive, where connected — tagged by intent, with the call summary, recording reference, and next step for the agent.",
  },
  {
    q: "How is this different from voicemail or a call centre?",
    a: "Voicemail waits for a callback, and a call centre usually takes a message. This assistant holds the actual conversation: it answers the caller's questions from your listings, qualifies them, books a showing into a real calendar, and follows up if they do not answer. The output is a booked showing, not a message slip.",
  },
  {
    q: "Is AI calling compliant in the United States?",
    a: "It is built with consent, opt-out, and do-not-call screening in mind: outbound contact is screened against do-not-call lists, consent is recorded, every caller can opt out, and calls respect the caller's local time zone. Your team reviews and signs off the scripts and calling rules before anything goes live.",
  },
  {
    q: "How much does it cost?",
    a: "Contact our sales team for pricing. Pricing depends on your call volume, your markets, and which systems we connect, so we quote after a short demo call, not from a fixed list on this page.",
  },
  {
    q: "How fast can we go live?",
    a: "Most brokerages go live in about two weeks from briefing: share your listings and your script, review the call flows, connect your phone numbers and CRM, test live with your team, then launch with a tuning window after go-live.",
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
  name: "AI Call Assistant for US Real Estate",
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
    "AI call assistant for US real estate brokerages: every call answered in seconds, qualified, and booked as a showing, with CRM logging, in Miami, Houston, Dallas-Fort Worth, Florida, and Texas.",
};

const JOBS = [
  { num: "01", icon: "fal fa-phone", title: "Every call answered", desc: "No more missed calls going to voicemail while your agents are on showings. Every caller gets a live, helpful answer in seconds." },
  { num: "02", icon: "fal fa-comments", title: "Real qualification", desc: "Budget, area, property type, timeline, and pre-approval readiness — asked in order, before an agent spends a minute." },
  { num: "03", icon: "fal fa-calendar-check", title: "Booked showings, not messages", desc: "Showings go straight into agent calendars, with reminders and follow-up so fewer slots are wasted." },
  { num: "04", icon: "fal fa-moon", title: "After-hours coverage", desc: "Evening and weekend callers — often the most motivated buyers — get the same careful handling as a weekday caller." },
  { num: "05", icon: "fal fa-plug", title: "Logged to your CRM", desc: "Every call lands in Follow Up Boss, kvCORE, HubSpot, Salesforce, or Pipedrive, tagged by intent, with a summary and next step." },
  { num: "06", icon: "fal fa-user", title: "Human handover, on demand", desc: "The moment a caller asks for a person, or a deal needs one, the full history goes to the agent. No dead ends, no repeated questions." },
];

const LEAKS = [
  { stage: "Stage 1", title: "Missed calls become lost listings", desc: "A buyer calls during a showing. It goes to voicemail. By the time anyone calls back, they have toured with another agent.", fix: "AI answers every call in seconds, live.", impact: "The first live answer usually wins the showing." },
  { stage: "Stage 2", title: "Agents drown in unqualified showings", desc: "Agents spend days driving to showings with buyers who were never going to transact — wrong budget, wrong area, no pre-approval.", fix: "AI pre-qualifies every caller before an agent spends a minute.", impact: "Diaries fill with buyers who can actually buy." },
  { stage: "Stage 3", title: "Lead data scattered across phones and inboxes", desc: "The same buyer exists as a missed call, a text thread, a form fill, and a half-filled CRM record.", fix: "One unified pipeline, deduplicated and logged.", impact: "No buyer is chased twice, and none is lost between channels." },
];

const STEPS = [
  { num: "1", title: "Share your script and listings", desc: "We read your listings, areas, and services and draft your call assistant in your voice.", time: "20 min" },
  { num: "2", title: "Review and sign off", desc: "Your full qualifying script and call flows, reviewed by your team before anything is built.", time: "45 min" },
  { num: "3", title: "Connect numbers and CRM", desc: "Your phone numbers, website, and CRM, wired into one pipeline with consent and do-not-call screening.", time: "One approval" },
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

const AiCallAssistantUsaRealEstate = () => {
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
        pageTitle="AI Call Assistant for US Real Estate | Miami, Houston, Dallas"
        pageDescription="AI call assistant for US real estate brokerages in Miami, Houston, Dallas-Fort Worth, Florida and Texas: every call answered in seconds, qualified, and booked as a showing, with CRM logging."
        pageUrl="/ai-call-assistant-usa-real-estate"
      />
      <Head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
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
                <div className="ailm-hero-badge"><span className="ailm-hero-dot"></span>US Real Estate · AI Call Assistant</div>
                <h1 className="ailm-hero-headline">Every call answered in <span className="ailm-red">seconds.</span><br />Even during showings.</h1>
                <p className="ailm-hero-sub">
                  A buyer calls from a yard sign in Houston while your agent is on a showing in Dallas. Another calls after hours in Miami. A third calls from a listing ad in Fort Worth. This AI call assistant answers all three live — qualifies them, books the showing, and logs it to your CRM — while your team is still with the last client.
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
                  <h2 className="ailm-section-title">Not a message slip. <span className="ailm-red">A booked showing.</span></h2>
                  <p style={{ fontSize: 17, lineHeight: 1.7, color: "#4b5563" }}>
                    Most systems take a message and wait for a callback. This assistant holds the actual conversation: it answers the caller's questions from your listings, asks the right qualifying questions in the right order, and books the showing before the caller hangs up.
                  </p>
                  <p style={{ fontSize: 17, lineHeight: 1.7, color: "#4b5563" }}>
                    If the answer is in your inventory, it gives it. If it is not, it says so — and it still captures budget, area, and timeline, then routes the caller to an agent with the whole conversation attached.
                  </p>
                </div>
                <div className="chatbot-reveal">
                  <div className="chatbot-chat">
                    <p className="chatbot-sample">Sample call · Transcript</p>
                    <div className="chatbot-bubble chatbot-bubble--buyer">Hi, is the home on Maple Street still available?</div>
                    <div className="chatbot-bubble chatbot-bubble--bot">Yes — and it is showing this week. Are you buying to live in, and what area are you focused on?</div>
                    <div className="chatbot-bubble chatbot-bubble--buyer">To live in, Houston area. We are pre-approved.</div>
                    <div className="chatbot-bubble chatbot-bubble--bot">Perfect. We have a showing tomorrow afternoon with your Houston specialist. Shall we hold that slot for you?</div>
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
                <h2 className="ailm-section-title">Where US real estate calls actually die</h2>
                <p className="ailm-section-sub">It is rarely the listing. It is the gap between the call and the first live answer.</p>
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
                <h2 className="ailm-section-title">Every call, one logged lead</h2>
                <p className="ailm-section-sub">Phone, website, and ads — no caller chased twice, none lost between channels.</p>
              </div>
              <div className="ailm-channels-grid">
                {[
                  { icon: "fal fa-phone", label: "AI Call", items: "Live answering, qualification, and booking — first, not last" },
                  { icon: "fal fa-comments", label: "Website and ads", items: "Callers from listings, ads, and forms, handled the same way" },
                  { icon: "fal fa-globe", label: "Miami · Houston · Dallas-Fort Worth", items: "Florida and Texas focus, with local time zone calling" },
                  { icon: "fal fa-plug", label: "Your CRM", items: "Follow Up Boss, kvCORE, HubSpot, Salesforce, Pipedrive" },
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
                For the wider system — chat, voice, and lead management — see{" "}
                <Link href="/callagents">AI Call Agents</Link>,{" "}
                <Link href="/ai-chatbot-dubai-real-estate">AI Chatbot for Dubai Real Estate</Link>,{" "}
                <Link href="/aileadmanagementdubairealestate">AI Lead Management for Dubai Real Estate</Link>, and{" "}
                <Link href="/ai-automation-dubai">AI Automation Services Dubai</Link>.
              </p>
            </div>
          </section>

          <section className="ailm-section">
            <div className="container">
              <div className="ailm-section-header chatbot-reveal">
                <p className="ailm-eyebrow">Built for the US</p>
                <h2 className="ailm-section-title">Calling rules your team can actually audit</h2>
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

          <section className="ailm-section ailm-section--light">
            <div className="container">
              <div className="ailm-section-header chatbot-reveal">
                <p className="ailm-eyebrow">Pricing</p>
                <h2 className="ailm-section-title">Contact our sales team for pricing</h2>
                <p className="ailm-section-sub">Pricing depends on your call volume, your markets, and which systems we connect. We quote after a short demo call, so you get a price for your setup — not a generic list.</p>
              </div>
              <p style={{ textAlign: "center" }}>
                <a className="ailm-btn-primary" href="https://cal.com/devmate/sixty-onboarding">Contact our sales team <i className="fal fa-long-arrow-right ml-2"></i></a>
              </p>
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
                    <button className="ailm-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                      {faq.q}
                      <i className={`fal ${openFaq === i ? "fa-chevron-up" : "fa-chevron-down"}`}></i>
                    </button>
                    {openFaq === i && <div className="ailm-faq-a">{faq.a}</div>}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="ailm-section">
            <div className="container">
              <p style={{ textAlign: "center" }}>
                For the same voice-first approach in dental clinics, see{" "}
                <Link href="/ai-call-assistant-dental-usa">AI Call Assistant for Dental Clinics USA</Link>.
              </p>
            </div>
          </section>

          <section className="ailm-final-cta">
            <div className="container">
              <div className="ailm-final-cta-inner">
                <p className="ailm-eyebrow ailm-eyebrow--light">Next Step</p>
                <h2 className="ailm-final-cta-title">Hear it on your own calls, not a demo script</h2>
                <p className="ailm-final-cta-sub">Book a demo and we will map a call flow to your brokerage — your markets, your CRM, and your qualifying script — before anything is built.</p>
                <div className="ailm-final-cta-btns">
                  <a className="ailm-btn-primary ailm-btn-white" href="https://cal.com/devmate/sixty-onboarding">Book a demo <i className="fal fa-long-arrow-right ml-2"></i></a>
                  <Link className="ailm-btn-ghost ailm-btn-ghost--light" href="/callagents">See AI Call Agents</Link>
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

export default AiCallAssistantUsaRealEstate;
