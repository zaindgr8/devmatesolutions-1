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
    q: "How soon after a viewing should we follow up?",
    a: "The same day, while the home is still fresh in the buyer's mind. A viewing on Saturday morning followed by a call on Saturday evening is a conversation; the same viewing followed up on Monday is a cold call to someone who has since viewed two more homes with someone else. The follow-up should ask what worked, what did not, and what would change their mind — and it should end with a named next step.",
  },
  {
    q: "What should the follow-up ask?",
    a: "Three things, plainly: what the buyer liked about the home, what held them back, and what would change their mind. Those three answers tell the agent whether to book a second viewing, open an offer discussion, or keep looking — and they tell the seller, honestly, what the market thinks of the listing. A follow-up that only asks 'so, what did you think?' gets a polite answer and no direction.",
  },
  {
    q: "What if the buyer liked the home but not the price?",
    a: "Carry the feedback to the seller honestly, with the buyer's own words, and let the seller decide. A buyer who likes the home at a lower figure is a negotiation, not a dead lead — and a seller who hears real feedback early can adjust before the listing goes stale. What neither side benefits from is silence: the buyer assumes the price is fixed, the seller assumes there is no interest, and the deal dies in the gap between them.",
  },
  {
    q: "Should the follow-up go out in Arabic or English?",
    a: "In the language the buyer used, whenever we can tell. A follow-up in the wrong language reads as a template even when it is not, and this is the conversation where the buyer is deciding whether to trust the brokerage with an offer. Our approach answers in Arabic and English, matching the enquiry, so the follow-up feels like it was written for that buyer, not sent to a list.",
  },
  {
    q: "What if the buyer says they need time to think?",
    a: "Give them the time — and agree exactly when you will speak again. 'Take the weekend, and we will talk on Monday at 6 p.m.' is a next step; 'let us know' is a goodbye. The agreed time, the buyer's concerns, and the home they viewed are logged in the same pipeline, so the Monday call picks up mid-conversation and nobody asks the buyer twice what they already said.",
  },
  {
    q: "Does following up this way break DNCR, PDPL, or RERA rules?",
    a: "Not when it is set up properly. A follow-up goes to a buyer who has already enquired and viewed — that is a reply, not cold outreach: numbers are screened against the Do Not Call Register, consent and data handling follow PDPL principles, and listings and claims stay honest under RERA, including never inventing competing offers to push a decision. Your team signs off the scripts and the contact rules before anything goes live. This is a plain-language summary, not legal advice — your brokerage team confirms the final wording.",
  },
  {
    q: "How much does it cost?",
    a: "Contact our sales team for pricing. Pricing depends on your lead volume, your languages, and which portals and systems we connect, so we quote after a short demo call, not from a fixed list on this page.",
  },
  {
    q: "How fast can we go live?",
    a: "Most brokerages go live in about two weeks from briefing: share your listings and your scripts, review the follow-up flows, connect your portals and phone numbers, test live with your team, then launch with a tuning window after go-live.",
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
  headline: "After the Viewing: How a Dubai Brokerage Follows Up Without Losing the Buyer",
  description:
    "The viewing went well — now what? What has to happen after a Dubai buyer views a home: a same-day follow-up, honest feedback in both directions, and a named next step — a second viewing, an offer, or a clear reason to keep looking — across WhatsApp and phone, in Arabic and English.",
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
  datePublished: "2026-11-07",
  dateModified: "2026-11-07",
  mainEntityOfPage: "https://devmatesolutions.com/after-viewing-follow-up-dubai-real-estate",
};

const MOMENTS = [
  {
    icon: "fal fa-calendar-times",
    title: "The follow-up that waits until Monday",
    good: "The viewing goes well on Saturday, the buyer likes the home, and the agent plans to call on Monday.",
    dies: "Monday brings new enquiries, the call slips — and by then the buyer has viewed two more homes with another brokerage.",
    fix: "Follow up the same day, while the home is still fresh and the decision is still warm.",
  },
  {
    icon: "fal fa-comments",
    title: "The feedback that never reaches the seller",
    good: "The buyer liked the home but not the price, and told the agent so honestly at the viewing.",
    dies: "Nobody passes it on, the seller never adjusts, and the listing sits while the buyer moves on.",
    fix: "Honest feedback both ways, the same day — the buyer's own words to the seller, and the seller's answer back.",
  },
  {
    icon: "fal fa-handshake",
    title: "The offer that stays a conversation",
    good: "The buyer says they are thinking about it, and the agent takes that as progress.",
    dies: "Nothing goes in writing, no time is agreed — and another buyer puts an offer in first.",
    fix: "When the buyer is ready, the offer goes in writing, with a clear response time.",
  },
];

const STEPS = [
  { stage: "Step 1", title: "Follow up the same day", desc: "A call or WhatsApp on the evening of the viewing, in the language the buyer used: what they liked, what held them back, what would change their mind. The buyer is still deciding; the brokerage that calls first shapes the decision, and the one that waits competes with every home viewed since.", fix: "Same-day follow-up, in the buyer's language.", impact: "The buyer decides with your brokerage in the room, not without it." },
  { stage: "Step 2", title: "Agree the next step before the call ends", desc: "A second viewing, an offer discussion, or a clear no with a reason — agreed on the call, not left open. The viewing notes, the buyer's answers, and the agreed next step are logged in the same pipeline, so the next conversation starts where this one ended.", fix: "Every follow-up ends with a named next step.", impact: "No buyer is chased, no buyer is forgotten, and nobody is asked twice." },
  { stage: "Step 3", title: "Put the offer in writing", desc: "When the buyer is ready, the offer goes in writing — price, timeline, and conditions — and the seller's response comes back the same way. No invented competing offers, no pressure invented to force a decision: the offer stands on its own terms, and the buyer knows exactly where they stand.", fix: "Offers in writing, honest on both sides.", impact: "Deals close on real terms, and both sides trust the process." },
];

const AfterViewingFollowUpDubaiArticle = () => {
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
        pageTitle="After the Viewing: How a Dubai Brokerage Follows Up Without Losing the Buyer"
        pageDescription="The viewing went well — now what? What has to happen after a Dubai buyer views a home: a same-day follow-up, honest feedback in both directions, and a named next step — a second viewing, an offer, or a clear reason to keep looking — across WhatsApp and phone, in Arabic and English."
        pageUrl="/after-viewing-follow-up-dubai-real-estate"
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
                <h1 className="ailm-hero-headline">The viewing went well. <span className="ailm-red">Now what?</span></h1>
                <p className="ailm-hero-sub">
                  A Dubai buyer who has just viewed a home leaves with feelings, not decisions — and the brokerage that follows up the same day shapes the decision, while the one that waits until Monday competes with every other home the buyer has viewed since. Between the viewing and the offer sit three jobs: follow up fast, carry honest feedback both ways, and agree a named next step.
                </p>
                <div className="ailm-hero-ctas">
                  <a className="ailm-btn-primary" href="https://cal.com/devmate/sixty-onboarding">Book a demo <i className="fal fa-long-arrow-right ml-2"></i></a>
                  <a className="ailm-btn-ghost" href="#moments">See where viewings die</a>
                </div>
                <div className="ailm-hero-metrics">
                  <div className="ailm-metric"><span className="ailm-metric-num">Same day</span><span className="ailm-metric-label">Follow-Up After Viewing</span></div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric"><span className="ailm-metric-num">Arabic + English</span><span className="ailm-metric-label">Matched To The Buyer</span></div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric"><span className="ailm-metric-num">1 next step</span><span className="ailm-metric-label">Agreed, Not Assumed</span></div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric"><span className="ailm-metric-num">1 pipeline</span><span className="ailm-metric-label">Viewing To Offer</span></div>
                </div>
              </div>
            </div>
          </section>

          <section className="ailm-section ailm-section--light" id="answer">
            <div className="container">
              <div className="chatbot-grid-two">
                <div className="chatbot-reveal">
                  <p className="ailm-eyebrow">The direct answer</p>
                  <h2 className="ailm-section-title">A viewing with no follow-up is <span className="ailm-red">a lead cooling by the hour.</span></h2>
                  <p style={{ fontSize: 17, lineHeight: 1.7, color: "#4b5563" }}>
                    Most brokerages measure the viewing and stop there. But a buyer who views on Saturday and hears nothing until Monday has spent two days viewing other homes, talking to other agents, and cooling on the one they liked. The viewing earns interest; the follow-up is what turns interest into a second viewing, an offer, or an honest no that frees the agent to move on.
                  </p>
                  <p style={{ fontSize: 17, lineHeight: 1.7, color: "#4b5563" }}>
                    This article follows our earlier pieces on{" "}
                    <Link href="/how-fast-to-reply-dubai-real-estate-leads">how fast a Dubai brokerage should reply</Link>,{" "}
                    <Link href="/whatsapp-phone-portal-dubai-real-estate-leads">WhatsApp vs phone vs portal</Link>,{" "}
                    <Link href="/after-hours-weekend-leads-dubai-real-estate">after-hours and weekend leads</Link>,{" "}
                    <Link href="/first-reply-to-viewing-booked-dubai-real-estate">from first reply to viewing booked</Link>, and{" "}
                    <Link href="/dncr-pdpl-rera-dubai-real-estate">DNCR, PDPL, and RERA in plain language</Link>.
                  </p>
                  <p style={{ fontSize: 17, lineHeight: 1.7, color: "#4b5563" }}>
                    The next step in the chain is{" "}
                    <Link href="/second-viewing-dubai-real-estate">the second viewing</Link>.
                  </p>
                </div>
                <div className="chatbot-reveal">
                  <div className="speed-answer">
                    <p>
                      <strong>The rule we work to:</strong> every viewing gets a same-day follow-up, and every follow-up ends with a named next step — a second viewing, an offer, or a clear reason to keep looking — never a &ldquo;let us know&rdquo;. In Arabic or English, as the buyer wrote.
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
                <h2 className="ailm-section-title">Three ways a good viewing never becomes an offer</h2>
                <p className="ailm-section-sub">The viewing worked. The chain after it did not.</p>
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
                <h2 className="ailm-section-title">Three habits that turn viewings into offers</h2>
                <p className="ailm-section-sub">None of these needs a bigger team — they need a system that finishes what the viewing starts.</p>
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
                  The worry we hear most is that following up fast means pressuring the buyer. It does not. Follow-ups go to buyers who have already enquired and viewed, numbers are screened against the Do Not Call Register, consent and data handling follow PDPL principles, and listings and claims stay honest under RERA — including never inventing competing offers to push a decision. Your team approves the scripts and the contact rules before anything goes live, and every conversation is logged where your team can see it. The brokerage stays in control — it just stops losing buyers between the viewing and the offer.
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
                <h2 className="ailm-final-cta-title">See a follow-up happen on your own viewings</h2>
                <p className="ailm-final-cta-sub">
                  Book a demo and we will walk through your own viewings with you —
                  then show the same-day follow-up, the feedback, and the agreed next step happening in one conversation.
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

export default AfterViewingFollowUpDubaiArticle;
