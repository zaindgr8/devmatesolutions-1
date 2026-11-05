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
    q: "How many Dubai buyers enquire in Arabic?",
    a: "A large share of them. Portal, WhatsApp, and phone enquiries arrive in both languages, and the Arabic ones are just as serious as the English ones — often from buyers further along in their decision. A brokerage that only answers in English is only answering part of its own demand, and the rest of that demand is answered by whichever competitor replies in the buyer's language first.",
  },
  {
    q: "Should we reply in the language the buyer used?",
    a: "Yes, whenever we can tell. Arabic enquiries answered in Arabic, English enquiries in English. It is a small detail that changes how the reply lands — a buyer who wrote in Arabic and gets an English template feels like a lead, not a client, even when the property details in the reply are correct.",
  },
  {
    q: "What goes wrong when an Arabic enquiry gets an English template?",
    a: "Two things. First, trust drops: the buyer has to work out whether anyone actually read their message. Second, details get lost: a question about payment plans, service charges, or viewing times is harder to answer when the buyer has to translate the reply before they can act on it. Both cost viewings that a matched-language reply would have kept.",
  },
  {
    q: "Can a buyer be qualified properly in Arabic?",
    a: "Yes — the qualification is the same in both languages: budget, area, property type, bedrooms, timeline, and finance readiness, asked in the same order. A buyer answers honestly when the questions are easy to answer, and questions in the buyer's own language are the easiest kind there is.",
  },
  {
    q: "What about buyers who switch languages mid-conversation?",
    a: "It happens often — a buyer starts in Arabic, switches to English for a term, then goes back. The reply follows the buyer's latest message, and the full conversation stays in one record either way, so no agent has to guess which language the buyer prefers.",
  },
  {
    q: "Does answering in Arabic change DNCR, PDPL, or RERA?",
    a: "No. The same safeguards apply in both languages: numbers are screened against the Do Not Call Register, consent and data handling follow PDPL principles, and listings and claims stay honest under RERA. Your team signs off the Arabic and English scripts before anything goes live. This is a plain-language summary, not legal advice — your brokerage team confirms the final wording.",
  },
  {
    q: "How much does it cost?",
    a: "Contact our sales team for pricing. Pricing depends on your lead volume, your languages, and which portals and systems we connect, so we quote after a short demo call, not from a fixed list on this page.",
  },
  {
    q: "How fast can we go live?",
    a: "Most brokerages go live in about two weeks from briefing: share your listings and your scripts, review the Arabic and English flows, connect your portals and phone numbers, test live with your team, then launch with a tuning window after go-live.",
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
  headline: "What Changes When a Dubai Buyer Writes in Arabic First?",
  description:
    "Many Dubai buyers enquire in Arabic first. What changes when the first reply matches their language, how qualification works in Arabic and English, and why one pipeline matters.",
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
  datePublished: "2026-11-05",
  dateModified: "2026-11-05",
  mainEntityOfPage: "https://devmatesolutions.com/arabic-first-buyers-dubai-real-estate",
};

const MOMENTS = [
  {
    icon: "fal fa-comment-dots",
    title: "The Arabic WhatsApp enquiry",
    good: "A buyer messages in Arabic about a listing they saw — often with a specific question about price, payment plan, or viewing times.",
    dies: "An English template goes back, and the buyer has to work out whether anyone actually read their message.",
    fix: "An immediate reply in Arabic, with availability and a viewing offer.",
  },
  {
    icon: "fal fa-building",
    title: "The portal enquiry in Arabic",
    good: "Bayut and Property Finder enquiries arrive in both languages — the Arabic ones are just as serious, and often from buyers further along.",
    dies: "The Arabic enquiry waits while the English ones get answered, because the team's process was built for one language.",
    fix: "Both languages get the same first reply, at the same speed, from the same pipeline.",
  },
  {
    icon: "fal fa-globe",
    title: "The overseas Arabic-speaking investor",
    good: "An investor in the Gulf or beyond enquires in Arabic, from another time zone, and expects an answer, not silence.",
    dies: "A reply in the wrong language — or a day late — reads as a brokerage that does not work with buyers like them.",
    fix: "Every time zone gets the same first reply, in Arabic or English as the buyer wrote.",
  },
];

const STEPS = [
  { stage: "Step 1", title: "Match the language before anything else", desc: "The first decision is not what to say, it is which language to say it in. Arabic enquiries answered in Arabic, English enquiries in English — the buyer should never have to translate the brokerage's reply before they can act on it.", fix: "Reply in the language the buyer used.", impact: "The conversation starts warm instead of formal." },
  { stage: "Step 2", title: "Qualify in the same language", desc: "Budget, area, property type, bedrooms, timeline, and finance readiness — the same questions, in the same order, in the language the buyer is thinking in. A buyer answers honestly when the questions are easy to answer.", fix: "Full qualification, in Arabic or English.", impact: "Viewings fill with buyers who can actually buy." },
  { stage: "Step 3", title: "Keep one pipeline for both languages", desc: "Arabic and English conversations land in the same place, with the full conversation attached. No buyer gets called twice because two agents answered the same enquiry in different languages.", fix: "One pipeline, every language, every channel.", impact: "Monday morning starts mid-conversation, not from zero." },
];

const ArabicFirstBuyersArticle = () => {
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
        pageTitle="What Changes When a Dubai Buyer Writes in Arabic First? | DevMate Solutions"
        pageDescription="Many Dubai buyers enquire in Arabic first. What changes when the first reply matches their language, how qualification works in Arabic and English, and why one pipeline matters."
        pageUrl="/arabic-first-buyers-dubai-real-estate"
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
                <h1 className="ailm-hero-headline">Your buyer wrote in Arabic. <span className="ailm-red">Answer in Arabic.</span></h1>
                <p className="ailm-hero-sub">
                  A large share of Dubai enquiries arrive in Arabic — on WhatsApp, on Bayut and Property Finder, and by phone. The brokerages that win those buyers are the ones whose first reply arrives in the language the buyer used, with a real answer and a viewing offered.
                </p>
                <div className="ailm-hero-ctas">
                  <a className="ailm-btn-primary" href="https://cal.com/devmate/sixty-onboarding">Book a demo <i className="fal fa-long-arrow-right ml-2"></i></a>
                  <a className="ailm-btn-ghost" href="#moments">See where language decides</a>
                </div>
                <div className="ailm-hero-metrics">
                  <div className="ailm-metric"><span className="ailm-metric-num">Arabic + English</span><span className="ailm-metric-label">Matched To The Buyer</span></div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric"><span className="ailm-metric-num">Under 60 seconds</span><span className="ailm-metric-label">First Useful Reply</span></div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric"><span className="ailm-metric-num">Budget · Area · Timeline</span><span className="ailm-metric-label">Qualified In Both Languages</span></div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric"><span className="ailm-metric-num">1 pipeline</span><span className="ailm-metric-label">Every Language, Every Channel</span></div>
                </div>
              </div>
            </div>
          </section>

          <section className="ailm-section ailm-section--light" id="answer">
            <div className="container">
              <div className="chatbot-grid-two">
                <div className="chatbot-reveal">
                  <p className="ailm-eyebrow">The direct answer</p>
                  <h2 className="ailm-section-title">Match the language first. <span className="ailm-red">The viewing follows.</span></h2>
                  <p style={{ fontSize: 17, lineHeight: 1.7, color: "#4b5563" }}>
                    A buyer who writes in Arabic and gets an English template has learned something before reading a word of it: this brokerage answers everyone the same way. The property details might be right and the price might be right, but the reply already feels like it was sent to a list — and a buyer who feels like a lead keeps looking.
                  </p>
                  <p style={{ fontSize: 17, lineHeight: 1.7, color: "#4b5563" }}>
                    This article follows our pieces on{" "}
                    <Link href="/how-fast-to-reply-dubai-real-estate-leads">how fast a Dubai brokerage should reply</Link>,{" "}
                    <Link href="/whatsapp-phone-portal-dubai-real-estate-leads">WhatsApp vs phone vs portal</Link>, and{" "}
                    <Link href="/dncr-pdpl-rera-dubai-real-estate">DNCR, PDPL, and RERA in plain language</Link>.
                  </p>
                </div>
                <div className="chatbot-reveal">
                  <div className="speed-answer">
                    <p>
                      <strong>The rule we work to:</strong> every enquiry — portal, WhatsApp, or phone — gets a first reply in under 60 seconds, 24/7, in the language the buyer used, Arabic or English, and that reply ends with a viewing offered, not a callback promised.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="ailm-section" id="moments">
            <div className="container">
              <div className="ailm-section-header chatbot-reveal">
                <p className="ailm-eyebrow">Where it decides</p>
                <h2 className="ailm-section-title">Three moments the language of the reply decides the outcome</h2>
                <p className="ailm-section-sub">If your process was built for one language, these are the buyers it quietly loses.</p>
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
                <h2 className="ailm-section-title">Three habits that keep Arabic-first buyers in the conversation</h2>
                <p className="ailm-section-sub">None of these needs a bigger team — they need a system that answers in the language it was written in.</p>
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
                <h2 className="ailm-section-title">Two languages does not mean two standards</h2>
                <p style={{ fontSize: 17, lineHeight: 1.7, color: "#4b5563", maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
                  The worry we hear most is that answering in Arabic means a different, looser process. It does not. The same safeguards apply in both languages: numbers are screened against the Do Not Call Register, consent and data handling follow PDPL principles, and listings stay honest under RERA. Your team reviews and signs off the Arabic and English scripts before anything goes live, and every conversation is logged where your team can see it. The brokerage stays in control — it just stops answering half its buyers in a language they did not choose.
                </p>
              </div>
              <p style={{ textAlign: "center", marginTop: 28 }}>
                Related reading:{" "}
                <Link href="/ai-agent-dubai-real-estate">AI Agent for Dubai Real Estate</Link>,{" "}
                <Link href="/ai-chatbot-dubai-real-estate">AI Chatbot for Dubai Real Estate</Link>,{" "}
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
                <h2 className="ailm-final-cta-title">See it on your own enquiries, in both languages</h2>
                <p className="ailm-final-cta-sub">
                  Book a demo and we will walk through your own Arabic and English enquiries with you —
                  then show the first reply going out in the language the buyer used.
                </p>
                <div className="ailm-final-cta-btns">
                  <a className="ailm-btn-primary ailm-btn-white" href="https://cal.com/devmate/sixty-onboarding">
                    Book a demo <i className="fal fa-long-arrow-right ml-2"></i></a>
                  <Link className="ailm-btn-ghost ailm-btn-ghost--light" href="/ai-chatbot-dubai-real-estate">
                    See the Dubai chatbot
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

export default ArabicFirstBuyersArticle;
