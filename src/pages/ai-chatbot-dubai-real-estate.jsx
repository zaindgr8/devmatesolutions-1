"use client";
import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import SEO from "../common/seo";
import Wrapper from "../layout/wrapper";
import HeaderThree from "@/src/layout/headers/header-3";
import FooterThree from "@/src/layout/footers/footer-3";

const FAQS = [
  {
    q: "Will this replace my brokers?",
    a: "No. It replaces the first reply, not the broker. The chatbot answers, qualifies, and books, then hands a warm lead to a human broker with the full conversation attached. Closers stop chasing cold enquiries and start with buyers who have already shared budget, area, and timeline.",
  },
  {
    q: "Does it really work in Arabic?",
    a: "Yes, in Arabic and English, with additional languages for Dubai's international buyers. It is trained on your qualifying script in both languages, so a buyer in Arabic gets the same careful qualification as a buyer in English — not a translated afterthought.",
  },
  {
    q: "Can it connect to Bayut, Property Finder and my CRM?",
    a: "Yes. Portal enquiries from Bayut, Property Finder, and Dubizzle are deduplicated with WhatsApp and website leads, then logged to your CRM — PropSpace, HubSpot, Bitrix24, Zoho, Salesforce, or Pipedrive, where connected — tagged by intent, with the full history for the broker.",
  },
  {
    q: "How is this different from a website chatbot?",
    a: "A website chatbot usually answers FAQs and leaves a transcript. This one runs your qualifying script, checks answers against your live inventory and payment plans, books a viewing into a real calendar, and scores the lead before a human spends a minute on it. The output is a booked viewing, not a chat log.",
  },
  {
    q: "Is using AI to process buyer data legal under UAE PDPL?",
    a: "It is built with UAE PDPL and RERA data handling in mind: consent records, DNCR screening for outbound contact, an audit trail, and a tested opt-out that propagates across channels, not just the one the buyer used. Your team reviews and signs off the script and data handling before anything goes live.",
  },
  {
    q: "How fast can we go live?",
    a: "Most brokerages go live in about two weeks from briefing: share listings and your script, review the Arabic and English flows, connect WhatsApp, portals, and CRM, test live with your team, then launch with a tuning window after go-live.",
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
  name: "AI Chatbot for Dubai Real Estate",
  provider: {
    "@type": "Organization",
    name: "DevMate Solutions",
    url: "https://devmatesolutions.com",
  },
  areaServed: { "@type": "City", name: "Dubai" },
  description:
    "AI chatbot for Dubai real estate brokerages: instant WhatsApp and web replies, lead qualification, viewing bookings, and CRM logging, in Arabic and English, 24/7.",
};

const AGENTS = [
  {
    num: "01",
    icon: "fal fa-bolt",
    title: "Instant first reply",
    desc: "Every enquiry gets a useful reply in under 60 seconds, 24/7 — nights, weekends, and launch days included.",
  },
  {
    num: "02",
    icon: "fal fa-comments",
    title: "Real qualification",
    desc: "Budget, area, property type, bedrooms, timeline, and finance readiness — asked in order, in the buyer's language.",
  },
  {
    num: "03",
    icon: "fal fa-calendar-check",
    title: "Booked viewings, not chats",
    desc: "Viewings go straight into broker calendars, with reminders and post-viewing follow-up so fewer slots are wasted.",
  },
  {
    num: "04",
    icon: "fal fa-check-circle",
    title: "Grounded in your inventory",
    desc: "Answers come from your live listings, off-plan documents, and payment plans. When it does not know, it says so and routes to a human.",
  },
  {
    num: "05",
    icon: "fal fa-plug",
    title: "Logged to your CRM",
    desc: "Every conversation lands in PropSpace, HubSpot, Bitrix24, Zoho, Salesforce, or Pipedrive, tagged by intent and scored.",
  },
  {
    num: "06",
    icon: "fal fa-shield-check",
    title: "Human handover, on demand",
    desc: "The moment a buyer asks for a person, or a deal needs one, the full history goes to the broker. No dead ends, no repeated questions.",
  },
];

const LEAKS = [
  {
    stage: "Stage 1",
    title: "Night and weekend leads die unanswered",
    desc: "An enquiry lands at 1 a.m. By the time anyone sees it, the buyer has booked a viewing with a competitor.",
    fix: "24/7 AI answers every enquiry in seconds.",
    impact: "The first useful reply usually wins the viewing.",
  },
  {
    stage: "Stage 2",
    title: "Agents drown in unqualified viewings",
    desc: "Closers spend days driving to viewings with buyers who were never going to transact — wrong budget, wrong area, no finance.",
    fix: "AI pre-qualifies every lead before agents spend a minute.",
    impact: "Diaries fill with buyers who can actually buy.",
  },
  {
    stage: "Stage 3",
    title: "Lead data scattered across portals and WhatsApp",
    desc: "The same buyer exists as a Bayut enquiry, a WhatsApp thread, a spreadsheet row, and a half-filled CRM record.",
    fix: "One unified pipeline, deduplicated and enriched.",
    impact: "No buyer is chased twice, and none is lost between channels.",
  },
];

const STEPS = [
  {
    num: "1",
    title: "Share your script and listings",
    desc: "We read your listings, areas, and services and draft your chatbot in Arabic and English.",
    time: "20 min",
  },
  {
    num: "2",
    title: "Review and sign off",
    desc: "Your full qualifying script and conversation flow, reviewed by your team before anything is built.",
    time: "45 min",
  },
  {
    num: "3",
    title: "Connect numbers, portals, and CRM",
    desc: "WhatsApp, website, Bayut, Property Finder, Dubizzle, and your CRM, wired into one pipeline.",
    time: "One approval",
  },
  {
    num: "4",
    title: "Live test, then go live",
    desc: "Real WhatsApp threads in both languages, with your agents watching, tuned on the spot, then launch with a tuning window.",
    time: "1 hour",
  },
];

const COMPLIANCE = [
  { title: "DNCR Screening", desc: "Every outbound contact screened against the Do Not Call Registry in real time before dial." },
  { title: "Consent Records", desc: "Every enquiry stored with timestamp, source, exact wording shown, and revocation status." },
  { title: "Audit Log Access", desc: "Read-only view of every contact attempt — DNCR result, consent reference, time window, and disclosure." },
  { title: "Opt-out Procedure", desc: "A tested mechanism that propagates across every channel, not just the one the buyer used." },
  { title: "Data Processing Agreement", desc: "Defines what we process, on whose instructions, with which sub-processors, and what happens at contract end." },
  { title: "Retention Policy", desc: "Documented and automated deletion schedules per data type." },
];

const ChatbotDubaiRealEstate = () => {
  const [openFaq, setOpenFaq] = useState(0);
  const revealRef = useRef(null);

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
        pageTitle="AI Chatbot for Dubai Real Estate"
        pageDescription="AI chatbot for Dubai real estate brokerages: instant replies on WhatsApp and your website, qualification from Bayut, Property Finder and Dubizzle leads, viewing bookings and CRM logging, in Arabic and English, 24/7."
        pageUrl="/ai-chatbot-dubai-real-estate"
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
        <main className="ailm-page" ref={revealRef}>
          {/* ─── HERO ─── */}
          <section className="ailm-hero">
            <div className="container">
              <div className="ailm-hero-header-wrap">
                <div className="ailm-hero-badge">
                  <span className="ailm-hero-dot"></span>
                  Dubai Real Estate · AI Chatbot
                </div>
                <h1 className="ailm-hero-headline">
                  Every enquiry answered in <span className="ailm-red">seconds.</span>
                  <br />
                  Even at 2 a.m.
                </h1>
                <p className="ailm-hero-sub">
                  A buyer messages at 1 a.m. from Property Finder. Another asks
                  about a Marina 2-bed on WhatsApp at lunch. A third lands from
                  Bayut during an off-plan launch. This chatbot answers all three
                  properly — in Arabic or English — qualifies them, and books
                  the viewing, while your team is still on the last call.
                </p>
                <div className="ailm-hero-ctas">
                  <a className="ailm-btn-primary" href="https://cal.com/devmate/sixty-onboarding">
                    Book a demo <i className="fal fa-long-arrow-right ml-2"></i>
                  </a>
                  <a className="ailm-btn-ghost" href="#how-it-works">
                    See how it works
                  </a>
                </div>
                <div className="ailm-hero-metrics">
                  <div className="ailm-metric">
                    <span className="ailm-metric-num">&lt; 60s</span>
                    <span className="ailm-metric-label">First Response</span>
                  </div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric">
                    <span className="ailm-metric-num">24 / 7</span>
                    <span className="ailm-metric-label">Coverage</span>
                  </div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric">
                    <span className="ailm-metric-num">AR + EN</span>
                    <span className="ailm-metric-label">Languages First</span>
                  </div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric">
                    <span className="ailm-metric-num">Bayut · PF</span>
                    <span className="ailm-metric-label">Portal Leads</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ─── SAMPLE CONVERSATION ─── */}
          <section className="ailm-section ailm-section--light">
            <div className="container">
              <div className="chatbot-grid-two">
                <div className="chatbot-reveal">
                  <p className="ailm-eyebrow">What a good first reply looks like</p>
                  <h2 className="ailm-section-title">
                    Not a greeting. <span className="ailm-red">A qualification.</span>
                  </h2>
                  <p style={{ fontSize: 17, lineHeight: 1.7, color: "#4b5563" }}>
                    Most bots say hello and wait. This one does the job a good
                    junior broker does in the first five minutes: it asks the
                    right questions, in the right order, and it does not let a
                    warm buyer cool down while someone finds the price list.
                  </p>
                  <p style={{ fontSize: 17, lineHeight: 1.7, color: "#4b5563" }}>
                    If the answer is in your inventory, it gives it. If it is
                    not, it says so — and it still captures budget, area, and
                    timeline, then routes the lead to a human with the whole
                    conversation attached.
                  </p>
                </div>
                <div className="chatbot-reveal">
                  <div className="chatbot-chat">
                    <p className="chatbot-sample">Sample conversation · WhatsApp</p>
                    <div className="chatbot-bubble chatbot-bubble--buyer">
                      Hi, is the 2-bed in Dubai Marina still available?
                    </div>
                    <div className="chatbot-bubble chatbot-bubble--bot">
                      Yes — and it is vacant. Is your budget around AED 1.5M to
                      2M, and are you buying to live in or to invest?
                    </div>
                    <div className="chatbot-bubble chatbot-bubble--buyer">
                      To live in. Budget up to 1.9M.
                    </div>
                    <div className="chatbot-bubble chatbot-bubble--bot">
                      Perfect. We have a viewing tomorrow at 6 p.m. with Sara,
                      your Marina specialist. Shall we hold that slot for you?
                    </div>
                    <div className="chatbot-typing">
                      <span></span><span></span><span></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ─── WHERE LEADS DIE ─── */}
          <section className="ailm-section">
            <div className="container">
              <div className="ailm-section-header chatbot-reveal">
                <p className="ailm-eyebrow">The problem, honestly</p>
                <h2 className="ailm-section-title">Where Dubai leads actually die</h2>
                <p className="ailm-section-sub">
                  It is rarely the listing. It is the gap between the enquiry
                  and the first useful reply.
                </p>
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

          {/* ─── WHAT IT DOES ─── */}
          <section className="ailm-section ailm-section--light">
            <div className="container">
              <div className="ailm-section-header chatbot-reveal">
                <p className="ailm-eyebrow">What it does</p>
                <h2 className="ailm-section-title">Six jobs, one chatbot</h2>
              </div>
              <div className="ailm-agents-grid">
                {AGENTS.map((a, i) => (
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

          {/* ─── CHANNELS ─── */}
          <section className="ailm-section">
            <div className="container">
              <div className="ailm-section-header chatbot-reveal">
                <p className="ailm-eyebrow">One pipeline</p>
                <h2 className="ailm-section-title">Every channel, one scored lead</h2>
                <p className="ailm-section-sub">
                  WhatsApp, website, Instagram, Botim, and portals — no buyer
                  chased twice, none lost between channels.
                </p>
              </div>
              <div className="ailm-channels-grid">
                {[
                  { icon: "fab fa-whatsapp", label: "WhatsApp", items: "Portal leads, ads, and direct messages" },
                  { icon: "fal fa-comments", label: "Website chat", items: "Enquiry forms and live chat, answered instantly" },
                  { icon: "fal fa-globe", label: "Bayut · Property Finder · Dubizzle", items: "Deduplicated with WhatsApp and web leads" },
                  { icon: "fal fa-plug", label: "Your CRM", items: "PropSpace, HubSpot, Bitrix24, Zoho, Salesforce, Pipedrive" },
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

          {/* ─── HOW IT WORKS ─── */}
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
                For the full system — chat plus voice, portals, and attribution — see{" "}
                <Link href="/aileadmanagementdubairealestate">AI Lead Management for Dubai Real Estate</Link>,{" "}
                <Link href="/whatsappautomation">WhatsApp Automation</Link>, and{" "}
                <Link href="/callagents">AI Call Agents</Link>.
              </p>
            </div>
          </section>

          {/* ─── COMPLIANCE ─── */}
          <section className="ailm-section">
            <div className="container">
              <div className="ailm-section-header chatbot-reveal">
                <p className="ailm-eyebrow">Built for Dubai</p>
                <h2 className="ailm-section-title">Compliance your team can actually audit</h2>
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

          {/* ─── FAQ ─── */}
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

          {/* ─── FINAL CTA ─── */}
          <section className="ailm-final-cta">
            <div className="container">
              <div className="ailm-final-cta-inner">
                <p className="ailm-eyebrow ailm-eyebrow--light">Next Step</p>
                <h2 className="ailm-final-cta-title">See it on your own leads, not a demo script</h2>
                <p className="ailm-final-cta-sub">
                  Book a demo and we will map a chatbot flow to your brokerage —
                  your portals, your CRM, and your qualifying script — before
                  anything is built.
                </p>
                <div className="ailm-final-cta-btns">
                  <a className="ailm-btn-primary ailm-btn-white" href="https://cal.com/devmate/sixty-onboarding">
                    Book a demo <i className="fal fa-long-arrow-right ml-2"></i>
                  </a>
                  <Link className="ailm-btn-ghost ailm-btn-ghost--light" href="/aileadmanagementdubairealestate">
                    See AI Lead Management
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

export default ChatbotDubaiRealEstate;
