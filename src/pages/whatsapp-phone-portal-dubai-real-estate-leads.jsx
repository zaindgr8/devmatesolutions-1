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
    q: "Which channel should a Dubai brokerage answer first — portal, WhatsApp, or phone?",
    a: "Whichever one the buyer used, answered in the same place, in minutes. Buyers do not wait while a brokerage moves an enquiry from a portal to a phone queue. The channel that wins is the one that answers first with something useful — availability, a payment-plan answer, and the qualifying questions — not the channel the brokerage prefers.",
  },
  {
    q: "Why do portal leads die more often than direct enquiries?",
    a: "Because they sit in a queue. A portal enquiry arrives with no phone conversation attached, so it waits for a human to open it, read it, and reply. By then the buyer has often heard back from a competitor. Portal leads need an instant, useful first reply in the portal thread itself — and a follow-up that does not depend on anyone remembering.",
  },
  {
    q: "Is WhatsApp enough on its own for Dubai real estate leads?",
    a: "No, and that is the trap. WhatsApp is where many Dubai buyers want to talk, but a WhatsApp-only setup misses the buyer who enquired on Bayut or Property Finder and never gave a WhatsApp number, and the buyer who called instead. WhatsApp should be one channel in one pipeline, not the whole pipeline.",
  },
  {
    q: "Where does the phone actually beat chat?",
    a: "When the buyer is ready to decide. A buyer comparing two units, asking about a payment plan, or ready to book a viewing will often take a call — and a call qualifies faster than ten messages. The mistake is making the call the only option, so buyers who prefer to type never get answered at all.",
  },
  {
    q: "How do we stop the same buyer being chased twice?",
    a: "One record per buyer, across every channel. Portal enquiries from Bayut, Property Finder, and Dubizzle are deduplicated with WhatsApp and website leads, so the same buyer is never answered by two agents at once and never gets two different answers about the same unit.",
  },
  {
    q: "What should a brokerage check before automating replies across channels?",
    a: "Consent records, Do Not Call Registry screening for outbound contact, a tested opt-out that propagates across every channel, and an audit trail of every contact attempt. Your team reviews and signs off the script, the agent's permissions, and the data handling before anything goes live — built with UAE PDPL and RERA expectations in mind.",
  },
  {
    q: "How much does it cost to run one pipeline across portal, WhatsApp, and phone?",
    a: "Contact our sales team for pricing. Pricing depends on your channels, your lead volume, and which systems we connect, so we quote after a short demo call, not from a fixed list on this page.",
  },
  {
    q: "How fast can we go live?",
    a: "Most brokerages go live in about two weeks from briefing: share listings and your script, review the Arabic and English flows, connect portals, WhatsApp, phone, and CRM, test live with your team, then launch with a tuning window after go-live.",
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
  headline: "WhatsApp vs Phone vs Portal: Where Dubai Real Estate Leads Actually Die",
  description:
    "Portal, WhatsApp, and phone each lose Dubai real estate leads in a different place. What each channel is good at, where each one leaks, and why one pipeline across all three beats a favourite channel.",
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
  datePublished: "2026-11-02",
  dateModified: "2026-11-02",
  mainEntityOfPage: "https://devmatesolutions.com/whatsapp-phone-portal-dubai-real-estate-leads",
};

const CHANNELS = [
  {
    icon: "fal fa-building",
    title: "Portal — Bayut, Property Finder, Dubizzle",
    good: "Where the buyer starts. High intent, unit-specific, and the enquiry already names the property.",
    dies: "In the queue. The enquiry waits for a human to open it, and the first reply arrives hours later — if at all.",
    fix: "An instant, useful reply inside the portal thread itself, then follow-up that runs on its own.",
  },
  {
    icon: "fal fa-comment",
    title: "WhatsApp",
    good: "Where the buyer wants to talk. Fast, informal, and easy to keep a conversation alive over days.",
    dies: "When it becomes the only channel. Portal and phone buyers never enter it, and threads pile up unread.",
    fix: "WhatsApp as one channel in one pipeline — portal and phone leads land in the same record.",
  },
  {
    icon: "fal fa-phone",
    title: "Phone",
    good: "Where decisions happen. A call qualifies faster than ten messages and books the viewing on the spot.",
    dies: "When nobody answers. A missed call with no instant callback is a buyer already calling the next brokerage.",
    fix: "Every call answered in seconds, qualified on the call, and booked into a real calendar.",
  },
];

const LEAKS = [
  { stage: "Leak 1", title: "The handoff between channels", desc: "A buyer enquires on a portal, then messages on WhatsApp, then calls. Three agents, three records, three different answers. The buyer loses trust before the viewing is ever booked.", fix: "One record per buyer, across portal, WhatsApp, and phone.", impact: "One conversation, one answer, one next step." },
  { stage: "Leak 2", title: "The channel nobody owns", desc: "The team answers WhatsApp quickly, so the portal inbox is left to the morning — and the phone to voicemail. Whichever channel is slowest quietly loses the most buyers.", fix: "Every channel answered in seconds, 24/7, in Arabic and English.", impact: "No channel is the slow one anymore." },
  { stage: "Leak 3", title: "Follow-up that stops at one reply", desc: "The first reply lands, the buyer goes quiet for a day, and nobody follows up. The buyer was still deciding — just not with you.", fix: "Timed, polite follow-up across the buyer's own channel, until they reply, book, or opt out.", impact: "Quiet buyers stay in play without a human chasing them." },
];

const WhatsappPhonePortalArticle = () => {
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
        pageTitle="WhatsApp vs Phone vs Portal: Where Dubai Real Estate Leads Actually Die"
        pageDescription="Portal, WhatsApp, and phone each lose Dubai real estate leads in a different place. What each channel is good at, where each one leaks, and why one pipeline across Bayut, Property Finder, WhatsApp, and phone beats a favourite channel."
        pageUrl="/whatsapp-phone-portal-dubai-real-estate-leads"
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
                <div className="ailm-hero-badge"><span className="ailm-hero-dot"></span>Dubai Real Estate · Lead Channels</div>
                <h1 className="ailm-hero-headline">WhatsApp vs phone vs portal: where Dubai real estate leads actually <span className="ailm-red">die</span></h1>
                <p className="ailm-hero-sub">
                  It is rarely the listing, and rarely one bad channel. Leads die in the gaps: the portal enquiry that waits for the morning, the WhatsApp thread nobody owns, the missed call with no instant callback. Fix the gaps, and the channel argument mostly goes away.
                </p>
                <div className="ailm-hero-ctas">
                  <a className="ailm-btn-primary" href="https://cal.com/devmate/sixty-onboarding">Book a demo <i className="fal fa-long-arrow-right ml-2"></i></a>
                  <a className="ailm-btn-ghost" href="#channels">Compare the channels</a>
                </div>
                <div className="ailm-hero-metrics">
                  <div className="ailm-metric"><span className="ailm-metric-num">&lt; 60s</span><span className="ailm-metric-label">First Answer</span></div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric"><span className="ailm-metric-num">24 / 7</span><span className="ailm-metric-label">Nights &amp; Weekends</span></div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric"><span className="ailm-metric-num">AR · EN</span><span className="ailm-metric-label">Arabic + English</span></div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric"><span className="ailm-metric-num">1 record</span><span className="ailm-metric-label">Per Buyer</span></div>
                </div>
              </div>
            </div>
          </section>

          <section className="ailm-section ailm-section--light">
            <div className="container">
              <div className="chatbot-grid-two">
                <div className="chatbot-reveal">
                  <p className="ailm-eyebrow">The direct answer</p>
                  <h2 className="ailm-section-title">Answer in the channel the buyer used — and keep it in <span className="ailm-red">one record.</span></h2>
                  <p style={{ fontSize: 17, lineHeight: 1.7, color: "#4b5563" }}>
                    A buyer who enquires on Property Finder does not want to be moved to a phone queue. A buyer who messages on WhatsApp does not want a formal email in return. The winning reply arrives in the same place, in minutes, and it is useful: availability from live listings, a payment-plan answer, and the qualifying questions about budget, area, and timeline.
                  </p>
                  <p style={{ fontSize: 17, lineHeight: 1.7, color: "#4b5563" }}>
                    The channel itself is not the strategy. One pipeline across portal, WhatsApp, and phone — with one record per buyer — is. That is also the companion to our speed-to-lead piece:{" "}
                    <Link href="/how-fast-to-reply-dubai-real-estate-leads">how fast a Dubai brokerage should reply to a Bayut / Property Finder lead</Link> — and to{" "}
                    <Link href="/after-hours-weekend-leads-dubai-real-estate">after-hours and weekend leads, when the office is closed and buyers are not</Link> — and to{" "}
                    <Link href="/arabic-first-buyers-dubai-real-estate">what changes when a Dubai buyer writes in Arabic first</Link>.
                  </p>
                </div>
                <div className="chatbot-reveal">
                  <div className="speed-answer">
                    <p>
                      <strong>The rule we work to:</strong> every enquiry — portal, WhatsApp, or phone — gets a useful reply in under 60 seconds, 24/7, in Arabic and English, and lands in the same CRM record, so no buyer is ever chased twice or answered by two agents at once.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="ailm-section" id="channels">
            <div className="container">
              <div className="ailm-section-header chatbot-reveal">
                <p className="ailm-eyebrow">Channel by channel</p>
                <h2 className="ailm-section-title">What each channel is good at — and where it leaks</h2>
                <p className="ailm-section-sub">Pick a favourite channel and you inherit its leak. Cover all three and you cover the buyer.</p>
              </div>
              <div className="ailm-leak-grid">
                {CHANNELS.map((c, i) => (
                  <div className="ailm-leak-card chatbot-reveal" key={i}>
                    <i className={`${c.icon} ailm-agent-icon`}></i>
                    <h3 className="ailm-leak-title">{c.title}</h3>
                    <p className="ailm-leak-desc"><strong>Good at:</strong> {c.good}</p>
                    <p className="ailm-leak-desc"><strong>Dies when:</strong> {c.dies}</p>
                    <p className="ailm-leak-fix">{c.fix}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="ailm-section ailm-section--light">
            <div className="container">
              <div className="ailm-section-header chatbot-reveal">
                <p className="ailm-eyebrow">The problem, honestly</p>
                <h2 className="ailm-section-title">Three leaks that have nothing to do with the listing</h2>
                <p className="ailm-section-sub">Most lost leads were never badly handled. They were handed off badly, or not at all.</p>
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

          <section className="ailm-section">
            <div className="container">
              <div className="ailm-section-header chatbot-reveal">
                <p className="ailm-eyebrow">One pipeline</p>
                <h2 className="ailm-section-title">Portal, WhatsApp, phone, and web — one record</h2>
                <p className="ailm-section-sub">Bayut, Property Finder, and Dubizzle enquiries, deduplicated with WhatsApp, phone, and website leads, logged to your CRM.</p>
              </div>
              <div className="ailm-channels-grid">
                {[
                  { icon: "fal fa-building", label: "Bayut · Property Finder · Dubizzle", items: "Portal enquiries answered in seconds, deduplicated, logged" },
                  { icon: "fal fa-comment", label: "WhatsApp", items: "Portal leads, ads, and direct messages in one thread" },
                  { icon: "fal fa-phone", label: "Phone", items: "Every call answered, qualified, and booked into a calendar" },
                  { icon: "fal fa-plug", label: "Your CRM", items: "PropSpace, HubSpot, Bitrix24, Zoho, Salesforce, Pipedrive" },
                ].map((c, i) => (
                  <div className="ailm-channel-card chatbot-reveal" key={i}>
                    <i className={`${c.icon} ailm-channel-icon`}></i>
                    <h3 className="ailm-channel-label">{c.label}</h3>
                    <p className="ailm-channel-items">{c.items}</p>
                  </div>
                ))}
              </div>
              <p style={{ textAlign: "center", marginTop: 28 }}>
                The system behind this article:{" "}
                <Link href="/ai-agent-dubai-real-estate">AI Agent for Dubai Real Estate</Link>,{" "}
                <Link href="/ai-chatbot-dubai-real-estate">AI Chatbot for Dubai Real Estate</Link>,{" "}
                <Link href="/whatsappautomation">WhatsApp Automation Dubai</Link>,{" "}
                <Link href="/callagents">AI Call Agents Dubai</Link>, and{" "}
                <Link href="/aileadmanagementdubairealestate">AI Lead Management for Dubai Real Estate</Link>, and{" "}
                <Link href="/pre-approved-before-you-view-dubai-real-estate">Pre-Approved Before You View: What a Dubai Buyer Should Have Ready First</Link>.
              </p>
            </div>
          </section>

          <section className="ailm-section ailm-section--light">
            <div className="container">
              <div className="ailm-section-header chatbot-reveal">
                <p className="ailm-eyebrow">Before you automate</p>
                <h2 className="ailm-section-title">Speed, with the safeguards kept</h2>
                <p style={{ fontSize: 17, lineHeight: 1.7, color: "#4b5563", maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
                  Fast replies across channels still need consent records, Do Not Call Registry screening for outbound contact, a tested opt-out that propagates across every channel, and an audit trail of every contact attempt — built with UAE PDPL and RERA expectations in mind. Your team reviews and signs off the script, the agent's permissions, and the data handling before anything goes live. For the three rules behind those safeguards, see{" "}
                <Link href="/dncr-pdpl-rera-dubai-real-estate">DNCR, PDPL and RERA: the three rules behind automated calls and WhatsApp in Dubai real estate</Link>.
                </p>
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
                <h2 className="ailm-final-cta-title">See it on your own leads, across every channel</h2>
                <p className="ailm-final-cta-sub">
                  Book a demo and we will map one pipeline to your brokerage —
                  your portals, your WhatsApp, your phone, and your CRM — before anything is built.
                </p>
                <div className="ailm-final-cta-btns">
                  <a className="ailm-btn-primary ailm-btn-white" href="https://cal.com/devmate/sixty-onboarding">
                    Book a demo <i className="fal fa-long-arrow-right ml-2"></i>
                  </a>
                  <Link className="ailm-btn-ghost ailm-btn-ghost--light" href="/how-fast-to-reply-dubai-real-estate-leads">
                    Read the speed-to-lead piece
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

export default WhatsappPhonePortalArticle;
