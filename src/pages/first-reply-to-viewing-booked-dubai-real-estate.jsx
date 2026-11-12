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
    q: "When should a viewing be offered to a Dubai buyer?",
    a: "As soon as the buyer is qualified enough to view — budget, area, and property type confirmed, and a rough timeline known. Offering a viewing before any qualification wastes the agent's Saturday; waiting until every detail is confirmed wastes the buyer's patience. The first reply should qualify in order, then offer a real slot in the same conversation.",
  },
  {
    q: "What if the buyer will not share a budget?",
    a: "Ask once, plainly, and explain why: so the agent only shows homes the buyer can actually buy. If the buyer still will not say, offer a range to react to — 'most buyers looking in this area are between these two figures' — and let the answer narrow it. A buyer who will not discuss budget at all is not ready for a viewing yet, and the follow-up should say so kindly, not chase them into one.",
  },
  {
    q: "Should the viewing offer go out in Arabic or English?",
    a: "In the language the buyer used, whenever we can tell. Many Dubai buyers enquire in Arabic, many in English, and a viewing offer in the wrong language reads as a template even when it is not. Our approach answers in Arabic and English, matching the enquiry, so the offer feels like it was written for that buyer, not sent to a list.",
  },
  {
    q: "How do we cut viewing no-shows?",
    a: "Three things: confirm the slot the moment it is agreed, with the day, time, meeting point, and the agent's name; send a reminder the day before, and a short one on the morning of the viewing; and make the confirmation a question the buyer answers, not a message they can ignore. A confirmed viewing with a named agent is far harder to forget than a vague 'see you Saturday'.",
  },
  {
    q: "What happens after the viewing?",
    a: "The next step is agreed before the buyer leaves, not chased days later: a second viewing, an offer discussion, or a clear reason to keep looking. The viewing notes, the buyer's reaction, and the agreed next step are logged in the same pipeline, so the follow-up picks up mid-conversation and no buyer is asked twice what they already said.",
  },
  {
    q: "Does booking viewings this way break DNCR, PDPL, or RERA rules?",
    a: "Not when it is set up properly. A viewing is offered to a buyer who has already enquired — that is a reply, not cold outreach: numbers are screened against the Do Not Call Register, consent and data handling follow PDPL principles, and listings and claims stay honest under RERA. Your team signs off the scripts and the contact rules before anything goes live. This is a plain-language summary, not legal advice — your brokerage team confirms the final wording.",
  },
  {
    q: "How much does it cost?",
    a: "Contact our sales team for pricing. Pricing depends on your lead volume, your languages, and which portals and systems we connect, so we quote after a short demo call, not from a fixed list on this page.",
  },
  {
    q: "How fast can we go live?",
    a: "Most brokerages go live in about two weeks from briefing: share your listings and your scripts, review the viewing-booking flows, connect your portals and phone numbers, test live with your team, then launch with a tuning window after go-live.",
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
  headline: "From First Reply to Viewing Booked: What Has to Happen After a Dubai Buyer Enquires",
  description:
    "A fast first reply is only the start: what has to happen between a Dubai buyer's first enquiry and a viewing in the diary — qualification in order, a real slot offered, confirmation and follow-up — across Bayut, Property Finder, WhatsApp and phone, in Arabic and English.",
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
  datePublished: "2026-11-06",
  dateModified: "2026-11-06",
  mainEntityOfPage: "https://devmatesolutions.com/first-reply-to-viewing-booked-dubai-real-estate",
};

const MOMENTS = [
  {
    icon: "fal fa-search",
    title: "The unqualified viewing",
    good: "A buyer asks about a listing and the agent books a viewing straight away — it feels like progress.",
    dies: "Saturday is spent showing homes to a buyer who cannot buy at that price, in that area, or on that timeline.",
    fix: "Qualify first — budget, area, property type, bedrooms, timeline — then offer the slot.",
  },
  {
    icon: "fal fa-calendar-times",
    title: "The viewing that never gets confirmed",
    good: "The buyer agrees to Saturday in chat, and everyone assumes it is settled.",
    dies: "No confirmation goes out, no reminder follows, and Saturday arrives with an empty diary.",
    fix: "Confirm the slot at once, with day, time, meeting point, and the agent's name — then remind.",
  },
  {
    icon: "fal fa-phone-slash",
    title: "The follow-up that never happens",
    good: "The viewing goes well, the buyer likes the home, and the agent plans to call on Monday.",
    dies: "Monday brings new enquiries, the follow-up slips, and another brokerage answers the buyer first.",
    fix: "The next step is agreed before the buyer leaves — and logged, so nobody has to remember it.",
  },
];

const STEPS = [
  { stage: "Step 1", title: "Qualify before you offer a slot", desc: "Budget, area, property type, bedrooms, timeline, and finance readiness — asked in order, in the language the buyer wrote in. A viewing offered to a qualified buyer is a viewing that happens; a viewing offered to anyone is a diary full of maybe.", fix: "Qualification in order, in the buyer's language.", impact: "Agents spend Saturdays with buyers who can actually buy." },
  { stage: "Step 2", title: "Offer a real slot, not a callback", desc: "A specific day and time, with a named agent, and a confirmation question: 'Shall we hold Saturday at 11 a.m. with Omar, your JVC specialist, and send a confirmation?' The buyer leaves the conversation with a viewing, not with a promise that someone will ring back.", fix: "One real slot, one named agent, one confirmation.", impact: "The buyer stops shopping and starts planning the visit." },
  { stage: "Step 3", title: "Confirm, remind, follow up", desc: "Confirmation the moment the slot is agreed, a reminder the day before, a short one on the morning — and after the viewing, the next step agreed and logged in the same pipeline. Nothing in the chain depends on one agent remembering.", fix: "Every step confirmed and logged, in one pipeline.", impact: "Viewings happen, and every viewing leads somewhere." },
];

const FirstReplyToViewingDubaiArticle = () => {
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
        pageTitle="From First Reply to Viewing Booked for Dubai Real Estate Brokerages"
        pageDescription="A fast first reply is only the start: what has to happen between a Dubai buyer's first enquiry and a viewing in the diary — qualification in order, a real slot offered, confirmation and follow-up — across Bayut, Property Finder, WhatsApp and phone, in Arabic and English."
        pageUrl="/first-reply-to-viewing-booked-dubai-real-estate"
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
                <div className="ailm-hero-badge"><span className="ailm-hero-dot"></span>Dubai · Real Estate</div>
                <h1 className="ailm-hero-headline">A fast first reply wins the conversation. <span className="ailm-red">The viewing wins the buyer.</span></h1>
                <p className="ailm-hero-sub">
                  A Dubai buyer who enquires on Bayut or Property Finder, on WhatsApp, or by phone has started a journey — and the first reply is only the first step of it. Between that reply and a viewing in the diary sit three jobs: qualify the buyer, offer a real slot, and confirm it so it actually happens.
                </p>
                <div className="ailm-hero-ctas">
                  <a className="ailm-btn-primary" href="https://cal.com/devmate/sixty-onboarding">Book a demo <i className="fal fa-long-arrow-right ml-2"></i></a>
                  <a className="ailm-btn-ghost" href="#moments">See where viewings die</a>
                </div>
                <div className="ailm-hero-metrics">
                  <div className="ailm-metric"><span className="ailm-metric-num">Under 60 seconds</span><span className="ailm-metric-label">To First Useful Reply</span></div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric"><span className="ailm-metric-num">Arabic + English</span><span className="ailm-metric-label">Matched To The Buyer</span></div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric"><span className="ailm-metric-num">1 slot</span><span className="ailm-metric-label">Held With Confirmation</span></div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric"><span className="ailm-metric-num">1 pipeline</span><span className="ailm-metric-label">Enquiry To Viewing</span></div>
                </div>
              </div>
            </div>
          </section>

          <section className="ailm-section ailm-section--light" id="answer">
            <div className="container">
              <div className="chatbot-grid-two">
                <div className="chatbot-reveal">
                  <p className="ailm-eyebrow">The direct answer</p>
                  <h2 className="ailm-section-title">A reply is not a booking. <span className="ailm-red">A viewing is.</span></h2>
                  <p style={{ fontSize: 17, lineHeight: 1.7, color: "#4b5563" }}>
                    Most brokerages measure the first reply and stop there. But a buyer who gets a fast reply and then waits two days for a viewing slot has still been left waiting — and a buyer who gets a viewing slot with no confirmation has still been left guessing. The first reply earns attention; the viewing is what turns attention into a buyer in a home.
                  </p>
                  <p style={{ fontSize: 17, lineHeight: 1.7, color: "#4b5563" }}>
                    This article follows our earlier pieces on{" "}
                    <Link href="/how-fast-to-reply-dubai-real-estate-leads">how fast a Dubai brokerage should reply</Link>,{" "}
                    <Link href="/whatsapp-phone-portal-dubai-real-estate-leads">WhatsApp vs phone vs portal</Link>,{" "}
                    <Link href="/after-hours-weekend-leads-dubai-real-estate">after-hours and weekend leads</Link>, and{" "}
                    <Link href="/dncr-pdpl-rera-dubai-real-estate">DNCR, PDPL, and RERA in plain language</Link>.
                  </p>
                </div>
                <div className="chatbot-reveal">
                  <div className="speed-answer">
                    <p>
                      <strong>The rule we work to:</strong> every enquiry gets a useful reply in under 60 seconds, 24/7 — and that reply ends with a viewing offered, a slot held, and a confirmation sent, not a callback promised. In Arabic or English, as the buyer wrote.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="ailm-section" id="moments">
            <div className="container">
              <div className="ailm-section-header chatbot-reveal">
                <p className="ailm-eyebrow">Where they die</p>
                <h2 className="ailm-section-title">Three ways a good enquiry never becomes a viewing</h2>
                <p className="ailm-section-sub">The first reply worked. The chain after it did not.</p>
              </div>
              <div className="ailm-leak-grid">
                {MOMENTS.map((c, i) => (
                  <div className="ailm-leak-card chatbot-reveal" key={i}>
                    <i className={`${c.icon} ailm-agent-icon`}></i>
                    <h3 className="ailm-leak-title">{c.title}</h3>
                    <p className="ailm-leak-desc"><strong>Why it matters:</strong> {c.good}</p>
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
                <p className="ailm-eyebrow">How to fix it</p>
                <h2 className="ailm-section-title">Three habits that turn replies into viewings</h2>
                <p className="ailm-section-sub">None of these needs a bigger team — they need a system that finishes what the first reply starts.</p>
              </div>
              <div className="ailm-leak-grid">
                {STEPS.map((l, i) => (
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
                <p className="ailm-eyebrow">Done properly</p>
                <h2 className="ailm-section-title">Fast does not mean careless</h2>
                <p style={{ fontSize: 17, lineHeight: 1.7, color: "#4b5563", maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
                  The worry we hear most is that moving fast means booking anyone, any time. It does not. Viewings are offered to buyers who have already enquired, numbers are screened against the Do Not Call Register, consent and data handling follow PDPL principles, and listings stay honest under RERA. Your team approves the scripts and the contact rules before anything goes live, and every conversation is logged where your team can see it. The brokerage stays in control — it just stops losing buyers between the reply and the viewing.
                </p>
              </div>
              <p style={{ textAlign: "center", marginTop: 28 }}>
                Related reading:{" "}
                <Link href="/ai-agent-dubai-real-estate">AI Agent for Dubai Real Estate</Link>,{" "}
                <Link href="/ai-chatbot-dubai-real-estate">AI Chatbot for Dubai Real Estate</Link>,{" "}
                <Link href="/second-viewing-dubai-real-estate">The Second Viewing: What a Dubai Buyer Is Really Checking</Link>,{" "}
                <Link href="/viewing-day-checklist-dubai-real-estate">Viewing Day in Dubai: The Checklist a Buyer Should Run Before They Say Yes</Link>,{" "}
                <Link href="/aileadmanagementdubairealestate">AI Lead Management for Real Estate</Link>, and{" "}
                <Link href="/whatsappautomation">WhatsApp Automation</Link>.
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
                <h2 className="ailm-final-cta-title">See a viewing booked on your own leads</h2>
                <p className="ailm-final-cta-sub">
                  Book a demo and we will walk through your own enquiries with you —
                  then show the first reply, the qualification, and the viewing booking happening in one conversation.
                </p>
                <div className="ailm-final-cta-btns">
                  <a className="ailm-btn-primary ailm-btn-white" href="https://cal.com/devmate/sixty-onboarding">
                    Book a demo <i className="fal fa-long-arrow-right ml-2"></i>
                  </a>
                  <Link className="ailm-btn-ghost ailm-btn-ghost--light" href="/how-fast-to-reply-dubai-real-estate-leads">
                    Read how fast to reply
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

export default FirstReplyToViewingDubaiArticle;
