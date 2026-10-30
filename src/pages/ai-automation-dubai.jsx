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
    q: "What does AI automation actually do for our business?",
    a: "It takes the repetitive work between a lead arriving and a deal moving forward — first reply, qualification, follow-up, booking, and CRM logging — and runs it the same way every time, in Arabic or English, around the clock. Your team stops re-typing the same answers and starts with leads that are already qualified and booked.",
  },
  {
    q: "Is this only for real estate?",
    a: "No, but Dubai real estate is where we have built the deepest version of it: Bayut, Property Finder, and Dubizzle enquiries, viewing bookings, and portal-to-CRM routing. The same automation pattern — instant reply, qualification, booking, follow-up — is then fitted to your services, your script, and your CRM.",
  },
  {
    q: "Does it work in Arabic as well as English?",
    a: "Yes. Arabic and English are built in from the start, not added as a translation layer. A buyer or client in Arabic gets the same careful qualification, the same follow-up, and the same booking flow as one in English.",
  },
  {
    q: "Can it connect to Bayut, Property Finder and our CRM?",
    a: "Yes. Portal enquiries from Bayut, Property Finder, and Dubizzle are deduplicated with WhatsApp and website leads, then logged to your CRM — PropSpace, HubSpot, Bitrix24, Zoho, Salesforce, or Pipedrive, where connected — tagged by intent, with the full history attached.",
  },
  {
    q: "Is using AI automation compliant in the UAE?",
    a: "It is built with UAE PDPL and RERA data handling in mind: consent records, DNCR screening for outbound contact, an audit trail, and a tested opt-out that propagates across channels, not just the one the client used. Your team reviews and signs off the flows and data handling before anything goes live.",
  },
  {
    q: "How much does it cost?",
    a: "Contact our sales team for pricing. Pricing depends on your channels, your volume, and which systems we connect, so we quote after a short demo call, not from a fixed list on this page.",
  },
  {
    q: "How fast can we go live?",
    a: "Most teams go live in about two weeks from briefing: share your services and your script, review the Arabic and English flows, connect WhatsApp, portals, and CRM, test live with your team, then launch with a tuning window after go-live.",
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
  name: "AI Automation Services Dubai",
  provider: {
    "@type": "Organization",
    name: "DevMate Solutions",
    url: "https://devmatesolutions.com",
  },
  areaServed: { "@type": "City", name: "Dubai" },
  description:
    "AI automation services in Dubai: instant first replies, lead qualification, follow-up, booking, and CRM logging across WhatsApp, web, and portals, in Arabic and English, 24/7.",
};

const JOBS = [
  { num: "01", icon: "fal fa-bolt", title: "Instant first reply", desc: "Every enquiry gets a useful reply in under 60 seconds, 24/7 — nights, weekends, and launch days included." },
  { num: "02", icon: "fal fa-comments", title: "Real qualification", desc: "Budget, area, timeline, and readiness — asked in order, in the client's language, before a human spends a minute." },
  { num: "03", icon: "fal fa-calendar-check", title: "Booked meetings and viewings", desc: "Meetings and viewings go straight into real calendars, with reminders and follow-up so fewer slots are wasted." },
  { num: "04", icon: "fal fa-sync", title: "Follow-up that does not forget", desc: "Polite, timed follow-up across WhatsApp, email, and phone, until the lead replies, books, or opts out." },
  { num: "05", icon: "fal fa-plug", title: "Logged to your CRM", desc: "Every conversation lands in PropSpace, HubSpot, Bitrix24, Zoho, Salesforce, or Pipedrive, tagged by intent and scored." },
  { num: "06", icon: "fal fa-chart-line", title: "A pipeline you can measure", desc: "Speed to first reply, qualification rate, and booked meetings, reported from the same pipeline — not from three spreadsheets." },
];

const LEAKS = [
  { stage: "Stage 1", title: "Night and weekend leads die unanswered", desc: "An enquiry lands late at night. By the time anyone sees it, the buyer has booked with a competitor.", fix: "24/7 AI answers every enquiry in seconds.", impact: "The first useful reply usually wins the meeting." },
  { stage: "Stage 2", title: "Good teams drown in unqualified work", desc: "Senior people spend days on enquiries that were never going to transact — wrong budget, wrong area, no timeline.", fix: "AI pre-qualifies every lead before a human spends a minute.", impact: "Diaries fill with people who can actually move forward." },
  { stage: "Stage 3", title: "Lead data scattered across portals and chats", desc: "The same person exists as a portal enquiry, a WhatsApp thread, a spreadsheet row, and a half-filled CRM record.", fix: "One unified pipeline, deduplicated and enriched.", impact: "No lead is chased twice, and none is lost between channels." },
];

const STEPS = [
  { num: "1", title: "Share your script and services", desc: "We read your services, areas, and listings and draft your automation in Arabic and English.", time: "20 min" },
  { num: "2", title: "Review and sign off", desc: "Your full qualifying script and conversation flows, reviewed by your team before anything is built.", time: "45 min" },
  { num: "3", title: "Connect numbers, portals, and CRM", desc: "WhatsApp, website, Bayut, Property Finder, Dubizzle, and your CRM, wired into one pipeline.", time: "One approval" },
  { num: "4", title: "Live test, then go live", desc: "Real threads in both languages, with your team watching, tuned on the spot, then launch with a tuning window.", time: "1 hour" },
];

const COMPLIANCE = [
  { title: "DNCR Screening", desc: "Every outbound contact screened against the Do Not Call Registry in real time before dial." },
  { title: "Consent Records", desc: "Every enquiry stored with timestamp, source, exact wording shown, and revocation status." },
  { title: "Audit Log Access", desc: "Read-only view of every contact attempt — DNCR result, consent reference, time window, and disclosure." },
  { title: "Opt-out Procedure", desc: "A tested mechanism that propagates across every channel, not just the one the client used." },
  { title: "Data Processing Agreement", desc: "Defines what we process, on whose instructions, with which sub-processors, and what happens at contract end." },
  { title: "Retention Policy", desc: "Documented and automated deletion schedules per data type." },
];

const AiAutomationDubai = () => {
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
        pageTitle="AI Automation Agency Dubai | AI Automation Services Dubai"
        pageDescription="AI automation services in Dubai: instant first replies, lead qualification, follow-up, booking, and CRM logging across WhatsApp, web, Bayut and Property Finder leads, in Arabic and English, 24/7."
        pageUrl="/ai-automation-dubai"
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
                <div className="ailm-hero-badge"><span className="ailm-hero-dot"></span>Dubai · AI Automation Agency</div>
                <h1 className="ailm-hero-headline">Automation that does the chasing, <span className="ailm-red">so your team can close.</span></h1>
                <p className="ailm-hero-sub">
                  A lead arrives from Property Finder at midnight. Another asks about a viewing on WhatsApp at lunch. A third fills a website form during an off-plan launch. Automation answers all three properly — in Arabic or English — qualifies them, follows up, and books the meeting, while your team is still on the last call.
                </p>
                <div className="ailm-hero-ctas">
                  <a className="ailm-btn-primary" href="https://cal.com/devmate/sixty-onboarding">Book a demo <i className="fal fa-long-arrow-right ml-2"></i></a>
                  <a className="ailm-btn-ghost" href="#how-it-works">See how it works</a>
                </div>
                <div className="ailm-hero-metrics">
                  <div className="ailm-metric"><span className="ailm-metric-num">&lt; 60s</span><span className="ailm-metric-label">First Response</span></div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric"><span className="ailm-metric-num">24 / 7</span><span className="ailm-metric-label">Coverage</span></div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric"><span className="ailm-metric-num">AR + EN</span><span className="ailm-metric-label">Languages First</span></div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric"><span className="ailm-metric-num">Bayut · PF</span><span className="ailm-metric-label">Portal Leads</span></div>
                </div>
              </div>
            </div>
          </section>

          <section className="ailm-section ailm-section--light">
            <div className="container">
              <div className="chatbot-grid-two">
                <div className="chatbot-reveal">
                  <p className="ailm-eyebrow">What good automation looks like</p>
                  <h2 className="ailm-section-title">Not a bot. <span className="ailm-red">A workflow.</span></h2>
                  <p style={{ fontSize: 17, lineHeight: 1.7, color: "#4b5563" }}>
                    Most automation sends a greeting and waits. This one does the job a good operations team does in the first hour: it replies, asks the right questions in the right order, follows up when there is no reply, books the meeting, and logs everything to your CRM.
                  </p>
                  <p style={{ fontSize: 17, lineHeight: 1.7, color: "#4b5563" }}>
                    If the answer is in your inventory or services, it gives it. If it is not, it says so — and it still captures budget, area, and timeline, then routes the lead to a human with the whole conversation attached.
                  </p>
                </div>
                <div className="chatbot-reveal">
                  <div className="chatbot-chat">
                    <p className="chatbot-sample">Sample automation · WhatsApp</p>
                    <div className="chatbot-bubble chatbot-bubble--buyer">Hi, is this property still available?</div>
                    <div className="chatbot-bubble chatbot-bubble--bot">Yes — and it is vacant. Are you buying to live in or to invest, and what area are you focused on?</div>
                    <div className="chatbot-bubble chatbot-bubble--buyer">To live in, Dubai Marina area.</div>
                    <div className="chatbot-bubble chatbot-bubble--bot">Perfect. We have a viewing tomorrow evening with your Marina specialist. Shall we hold that slot for you?</div>
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
                <h2 className="ailm-section-title">Where Dubai leads actually die</h2>
                <p className="ailm-section-sub">It is rarely the listing. It is the gap between the enquiry and the first useful reply.</p>
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
                <h2 className="ailm-section-title">Six jobs, one system</h2>
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
                <h2 className="ailm-section-title">Every channel, one scored lead</h2>
                <p className="ailm-section-sub">WhatsApp, website, and portals — no lead chased twice, none lost between channels.</p>
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
                <Link href="/ai-chatbot-dubai-real-estate">AI Chatbot for Dubai Real Estate</Link>,{" "}
                <Link href="/whatsappautomation">WhatsApp Automation</Link>, and{" "}
                <Link href="/callagents">AI Call Agents</Link>.
              </p>
            </div>
          </section>

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

          <section className="ailm-section ailm-section--light">
            <div className="container">
              <div className="ailm-section-header chatbot-reveal">
                <p className="ailm-eyebrow">Pricing</p>
                <h2 className="ailm-section-title">Contact our sales team for pricing</h2>
                <p className="ailm-section-sub">Pricing depends on your channels, your volume, and which systems we connect. We quote after a short demo call, so you get a price for your setup — not a generic list.</p>
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

          <section className="ailm-final-cta">
            <div className="container">
              <div className="ailm-final-cta-inner">
                <p className="ailm-eyebrow ailm-eyebrow--light">Next Step</p>
                <h2 className="ailm-final-cta-title">See it on your own leads, not a demo script</h2>
                <p className="ailm-final-cta-sub">Book a demo and we will map an automation flow to your business — your channels, your CRM, and your qualifying script — before anything is built.</p>
                <div className="ailm-final-cta-btns">
                  <a className="ailm-btn-primary ailm-btn-white" href="https://cal.com/devmate/sixty-onboarding">Book a demo <i className="fal fa-long-arrow-right ml-2"></i></a>
                  <Link className="ailm-btn-ghost ailm-btn-ghost--light" href="/aileadmanagementdubairealestate">See AI Lead Management</Link>
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

export default AiAutomationDubai;
