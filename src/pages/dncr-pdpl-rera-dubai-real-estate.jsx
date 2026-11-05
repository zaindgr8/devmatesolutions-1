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
    q: "What is the DNCR, in plain terms?",
    a: "The UAE Do Not Call Registry is the list of numbers that must not receive unsolicited marketing calls. Before any outbound call or message campaign, numbers are screened against it, and anyone on it is left out. Screening is not a one-off job: the list is checked again for every campaign, and every screening result is logged.",
  },
  {
    q: "What does the PDPL change for a real estate brokerage?",
    a: "The UAE Personal Data Protection Law sets the ground rules for handling buyer data: collect it for a clear purpose, keep only what is needed, protect it, and delete it when it is no longer needed. For a brokerage that means consent records for calls and messages, a clear answer to “how did you get my number”, and data that stays in the brokerage's own systems, not scattered across personal phones.",
  },
  {
    q: "Where does RERA fit in — is it not about agents and listings?",
    a: "Yes, and that is exactly why it matters here. RERA's rules cover licensed agents and honest advertising, so an automated reply must never invent availability, prices, or payment plans, and must never present an unlicensed agent as the broker of record. The assistant answers only from live listings and the brokerage's approved script, and hands anything it cannot verify to a licensed agent.",
  },
  {
    q: "Can an AI assistant call a buyer who has never heard from us?",
    a: "Only within the rules the brokerage signs off: consent on file where it is required, DNCR screening before dialling, a clear introduction that the caller is an assistant, and an opt-out that works on the call itself. Cold outreach without consent or screening is where brokerages get into trouble — automated or not, the rules do not change because a machine made the call.",
  },
  {
    q: "What happens when a buyer says “stop calling me”?",
    a: "The opt-out must work the first time, on every channel. One “stop” ends calls, WhatsApp messages, and follow-ups for that buyer, and the record is kept so the buyer is never contacted again by mistake. A tested opt-out that propagates across portal, WhatsApp, and phone is part of the pre-launch checklist, not an afterthought.",
  },
  {
    q: "Does Arabic change any of this?",
    a: "The rules are the same in Arabic and English, but the wording must be right in both. Consent wording, opt-out instructions, and disclosures are reviewed in Arabic and English before launch, because a buyer who cannot understand the opt-out has not really been given one.",
  },
  {
    q: "How much does a compliant setup cost?",
    a: "Contact our sales team for pricing. Pricing depends on your channels, your lead volume, and which systems we connect, so we quote after a short demo call, not from a fixed list on this page.",
  },
  {
    q: "Who signs off before anything goes live?",
    a: "Your team does, with your legal advisers where needed. We draft the call flows, the consent and opt-out wording, and the data handling, and nothing is switched on until your team has reviewed and approved the script, the agent's permissions, and the data flows. This article is a plain-language explainer, not legal advice.",
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

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "DNCR, PDPL and RERA: The Three Rules Behind Every Automated Call and WhatsApp Message in Dubai Real Estate",
  description:
    "Three sets of rules decide whether automated calls and WhatsApp messages help a Dubai brokerage or put it at risk: DNCR screening, PDPL consent and data handling, and RERA licensing and honest advertising. What each one requires, in plain language.",
  author: {
    "@type": "Organization",
    name: "DevMate Solutions",
    url: "https://devmatesolutions.com",
  },
  publisher: {
    "@type": "Organization",
    name: "DevMate Solutions",
    url: "https://devmatesolutions.com",
  },
  datePublished: "2026-11-03",
  dateModified: "2026-11-03",
  mainEntityOfPage: "https://devmatesolutions.com/dncr-pdpl-rera-dubai-real-estate",
};

const RULES = [
  {
    icon: "fal fa-phone-slash",
    title: "DNCR — Do Not Call Registry",
    rule: "Screen every outbound number before dialling, every campaign, and log the result.",
    risk: "Calling a registered number with a marketing message is the fastest way to turn automation into a complaint.",
    fix: "Screening runs before every campaign, results are logged per attempt, and registered numbers are suppressed automatically.",
  },
  {
    icon: "fal fa-shield-check",
    title: "PDPL — Personal Data Protection Law",
    rule: "Collect buyer data for a clear purpose, keep only what is needed, protect it, and delete it when done.",
    risk: "Buyer numbers and conversations scattered across personal phones, with no consent record and no answer to “how did you get my number”.",
    fix: "Consent records with source and timestamp, data kept in the brokerage's own CRM, and documented deletion schedules.",
  },
  {
    icon: "fal fa-badge-check",
    title: "RERA — Licensing and honest advertising",
    rule: "Licensed agents only, and every claim about a listing must be true and verifiable.",
    risk: "An assistant that invents availability, prices, or payment plans — or speaks as if it were the licensed broker.",
    fix: "Answers drawn only from live listings and the approved script; anything unverified goes to a licensed agent.",
  },
];

const CHECKLIST = [
  { stage: "Check 1", title: "Consent records in place", desc: "Every number has a source, a timestamp, and a consent reference before the first automated contact — and a way for the buyer to withdraw it.", fix: "No consent record, no outbound contact.", impact: "Every campaign starts from a clean, auditable list." },
  { stage: "Check 2", title: "DNCR screening tested, not assumed", desc: "A test campaign is screened end to end and the suppression is verified, before any real buyer is contacted.", fix: "Screening runs before every campaign, not once at setup.", impact: "Registered numbers never slip through on a later campaign." },
  { stage: "Check 3", title: "Opt-out that works everywhere", desc: "One “stop” ends calls, WhatsApp, and follow-ups across all channels, and the suppression is recorded permanently.", fix: "Opt-out tested on a live call and a live WhatsApp thread before launch.", impact: "A buyer who opts out stays opted out." },
  { stage: "Check 4", title: "Script and listings signed off", desc: "Your team reviews the Arabic and English flows, the agent's permissions, and which listings it may quote — and signs them off.", fix: "Nothing goes live on a draft script.", impact: "The assistant says only what your brokerage would say." },
];

const DncrPdplReraArticle = () => {
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
        pageTitle="DNCR, PDPL and RERA: The Three Rules Behind Automated Calls and WhatsApp in Dubai Real Estate"
        pageDescription="DNCR screening, PDPL consent and data handling, and RERA licensing and honest advertising — the three rules that decide whether automated calls and WhatsApp messages help a Dubai brokerage or put it at risk, explained in plain language."
        pageUrl="/dncr-pdpl-rera-dubai-real-estate"
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        <style>{`
          .chatbot-reveal { opacity: 0; transform: translateY(18px); transition: opacity .6s ease, transform .6s ease; }
          .chatbot-reveal--visible { opacity: 1; transform: translateY(0); }
          .chatbot-grid-two { display: grid; grid-template-columns: 1.1fr .9fr; gap: 40px; align-items: center; }
          @media (max-width: 768px) { .chatbot-grid-two { grid-template-columns: 1fr; } }
          .speed-answer { background: #fef2f2; border: 1px solid #fecaca; border-left: 4px solid #bd2120; border-radius: 16px; padding: 24px 28px; }
          .speed-answer p { font-size: 18px; line-height: 1.7; color: #1f2937; margin: 0; }
        `}</style>
      </Head>
      <Wrapper>
        <HeaderThree />
        <main className="ailm-page">
          <section className="ailm-hero">
            <div className="container">
              <div className="ailm-hero-header-wrap">
                <div className="ailm-hero-badge"><span className="ailm-hero-dot"></span>Dubai Real Estate · Rules &amp; Safeguards</div>
                <h1 className="ailm-hero-headline">DNCR, PDPL and RERA: the three rules behind every automated call and <span className="ailm-red">WhatsApp message</span></h1>
                <p className="ailm-hero-sub">
                  Speed is the easy part. The part that decides whether automation helps a Dubai brokerage or puts it at risk is quieter: who may be contacted, what may be said, and what happens to the buyer's data afterwards. Three sets of rules answer those questions.
                </p>
                <div className="ailm-hero-ctas">
                  <a className="ailm-btn-primary" href="https://cal.com/devmate/sixty-onboarding">Book a demo <i className="fal fa-long-arrow-right ml-2"></i></a>
                  <a className="ailm-btn-ghost" href="#rules">Read the three rules</a>
                </div>
                <div className="ailm-hero-metrics">
                  <div className="ailm-metric"><span className="ailm-metric-num">3 rules</span><span className="ailm-metric-label">DNCR · PDPL · RERA</span></div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric"><span className="ailm-metric-num">AR · EN</span><span className="ailm-metric-label">Arabic + English</span></div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric"><span className="ailm-metric-num">1 record</span><span className="ailm-metric-label">Per Buyer</span></div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric"><span className="ailm-metric-num">0 guesses</span><span className="ailm-metric-label">On Listings</span></div>
                </div>
              </div>
            </div>
          </section>

          <section className="ailm-section ailm-section--light">
            <div className="container">
              <div className="chatbot-grid-two">
                <div className="chatbot-reveal">
                  <p className="ailm-eyebrow">The direct answer</p>
                  <h2 className="ailm-section-title">Automation does not change the rules. It makes breaking them <span className="ailm-red">faster.</span></h2>
                  <p style={{ fontSize: 17, lineHeight: 1.7, color: "#4b5563" }}>
                    A human agent who calls a registered number makes one mistake. An automated system that calls a whole list without screening makes the same mistake hundreds of times before lunch. That is why the safeguards come before the speed: screening, consent records, and a script that only quotes verified listings.
                  </p>
                  <p style={{ fontSize: 17, lineHeight: 1.7, color: "#4b5563" }}>
                    The good news is that the same discipline that keeps a brokerage safe also makes its automation better. Clean consent records mean cleaner lists. One record per buyer means no buyer is chased twice. And a script that never guesses means buyers trust the answers they get. This is the safeguards companion to our channel piece:{" "}
                    <Link href="/whatsapp-phone-portal-dubai-real-estate-leads">WhatsApp vs phone vs portal — where Dubai real estate leads actually die</Link> — and to{" "}
                    <Link href="/how-fast-to-reply-dubai-real-estate-leads">how fast a Dubai brokerage should reply to a Bayut / Property Finder lead</Link> — and to{" "}
                    <Link href="/after-hours-weekend-leads-dubai-real-estate">after-hours and weekend leads, when the office is closed and buyers are not</Link>.
                  </p>
                </div>
                <div className="chatbot-reveal">
                  <div className="speed-answer">
                    <p>
                      <strong>The rule we work to:</strong> no consent record, no outbound contact. No screening, no campaign. No verified listing, no claim about it. And one “stop” from a buyer ends contact on every channel, permanently.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="ailm-section" id="rules">
            <div className="container">
              <div className="ailm-section-header chatbot-reveal">
                <p className="ailm-eyebrow">Rule by rule</p>
                <h2 className="ailm-section-title">What each rule actually requires</h2>
                <p className="ailm-section-sub">Plain language, not legal text — your legal advisers confirm the detail for your brokerage.</p>
              </div>
              <div className="ailm-leak-grid">
                {RULES.map((c, i) => (
                  <div className="ailm-leak-card chatbot-reveal" key={i}>
                    <i className={`${c.icon} ailm-agent-icon`}></i>
                    <h3 className="ailm-leak-title">{c.title}</h3>
                    <p className="ailm-leak-desc"><strong>Requires:</strong> {c.rule}</p>
                    <p className="ailm-leak-desc"><strong>Risk when skipped:</strong> {c.risk}</p>
                    <p className="ailm-leak-fix">{c.fix}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="ailm-section ailm-section--light">
            <div className="container">
              <div className="ailm-section-header chatbot-reveal">
                <p className="ailm-eyebrow">Calls vs WhatsApp</p>
                <h2 className="ailm-section-title">What changes between a call and a message</h2>
                <p className="ailm-section-sub">The three rules apply to both — but the failure mode is different.</p>
              </div>
              <div className="ailm-leak-grid">
                {[
                  { stage: "On a call", title: "The buyer can object in real time", desc: "A buyer who objects on a call expects the objection to stick immediately, not after a follow-up email. The assistant must recognise an opt-out in plain language, in Arabic or English, confirm it, and end the call gracefully.", fix: "Opt-out recognised on the call itself, confirmed, and recorded.", impact: "One objection, handled once, remembered everywhere." },
                  { stage: "On WhatsApp", title: "The thread is the record", desc: "WhatsApp threads live on. A buyer who opted out months ago must never be messaged again because a new campaign used an old list. Consent and suppression must travel with the thread, not sit in a separate spreadsheet.", fix: "Suppression checked against the live CRM record before every message.", impact: "Old lists cannot resurrect opted-out buyers." },
                  { stage: "On a portal", title: "The enquiry is consent for that enquiry", desc: "A Bayut or Property Finder enquiry is permission to answer that enquiry — not permission to add the buyer to every future campaign. Portal replies stay in the portal thread, and further contact follows the same consent and screening rules.", fix: "Portal replies answered in-thread; campaigns need their own consent basis.", impact: "Portal buyers get answers, not surprise campaigns." },
                ].map((l, i) => (
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

          <section className="ailm-section">
            <div className="container">
              <div className="ailm-section-header chatbot-reveal">
                <p className="ailm-eyebrow">Before you automate</p>
                <h2 className="ailm-section-title">The four checks we run before launch</h2>
                <p className="ailm-section-sub">If any check fails, launch waits. Speed never outranks a failed safeguard.</p>
              </div>
              <div className="ailm-leak-grid">
                {CHECKLIST.map((l, i) => (
                  <div className="ailm-leak-card chatbot-reveal" key={i}>
                    <p className="ailm-leak-stage">{l.stage}</p>
                    <h3 className="ailm-leak-title">{l.title}</h3>
                    <p className="ailm-leak-desc">{l.desc}</p>
                    <p className="ailm-leak-fix">{l.fix}</p>
                    <p className="ailm-leak-impact">{l.impact}</p>
                  </div>
                ))}
              </div>
              <p style={{ textAlign: "center", marginTop: 28 }}>
                The system behind this article:{" "}
                <Link href="/ai-agent-dubai-real-estate">AI Agent for Dubai Real Estate</Link>,{" "}
                <Link href="/ai-chatbot-dubai-real-estate">AI Chatbot for Dubai Real Estate</Link>,{" "}
                <Link href="/whatsappautomation">WhatsApp Automation Dubai</Link>,{" "}
                <Link href="/callagents">AI Call Agents Dubai</Link>, and{" "}
                <Link href="/aileadmanagementdubairealestate">AI Lead Management for Dubai Real Estate</Link>.
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
                <h2 className="ailm-final-cta-title">See a compliant setup on your own leads</h2>
                <p className="ailm-final-cta-sub">
                  Book a demo and we will walk through the screening, consent, and script sign-off for your brokerage —
                  before anything is built.
                </p>
                <div className="ailm-final-cta-btns">
                  <a className="ailm-btn-primary ailm-btn-white" href="https://cal.com/devmate/sixty-onboarding">
                    Book a demo <i className="fal fa-long-arrow-right ml-2"></i>
                  </a>
                  <Link className="ailm-btn-ghost ailm-btn-ghost--light" href="/whatsapp-phone-portal-dubai-real-estate-leads">
                    Read the channel piece
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

export default DncrPdplReraArticle;
