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
    q: "When do Dubai real estate leads actually arrive?",
    a: "All week, and often outside office hours: the evening portal enquiry after work, the weekend viewing request, the overseas buyer messaging in another time zone. A brokerage that only answers between 9 and 6 is only staffed for part of its own demand — and the rest of that demand is answered by whichever competitor replies first.",
  },
  {
    q: "Why is a fast after-hours reply worth more than a Monday-morning callback?",
    a: "Because a portal lead is rarely talking to one brokerage. By Monday morning the buyer has usually had a reply, a viewing, or both — from someone else. Speed is not a nice-to-have at the weekend; it is the difference between being the first conversation and being a follow-up to a conversation that already happened.",
  },
  {
    q: "Should after-hours replies go out in Arabic or English?",
    a: "In the language the buyer used, whenever we can tell. Many Dubai buyers enquire in Arabic, many in English, and a reply in the wrong language reads as a template even when it is not. Our approach answers in Arabic and English, matching the enquiry, so the first reply feels like it was written for that buyer, not sent to a list.",
  },
  {
    q: "What should an after-hours first reply contain?",
    a: "Four things: acknowledgement of the exact property or area they asked about, one useful answer — availability, price guidance, or viewing times — a clear next step, and a named contact route. A generic 'thank you for your enquiry, we will call you' contains none of them, and it tells the buyer to keep looking.",
  },
  {
    q: "Does answering after hours break DNCR, PDPL, or RERA rules?",
    a: "Not when it is set up properly. Replying to an enquiry a buyer has already made is different from cold outreach: numbers are screened against the Do Not Call Register, consent and data handling follow PDPL principles, and listings and claims stay honest under RERA. Your team signs off the scripts and the contact rules before anything goes live. This is a plain-language summary, not legal advice — your brokerage team confirms the final wording.",
  },
  {
    q: "What happens to the lead after the first reply?",
    a: "It goes into one pipeline, not into someone's inbox. The conversation, the property, the viewing request, and the follow-up are all logged in the same place your team already works — so the Monday-morning agent picks up the thread mid-conversation instead of starting from zero, or worse, calling a buyer who has already been answered.",
  },
  {
    q: "How much does it cost?",
    a: "Contact our sales team for pricing. Pricing depends on your lead volume, your languages, and which portals and systems we connect, so we quote after a short demo call, not from a fixed list on this page.",
  },
  {
    q: "How fast can we go live?",
    a: "Most brokerages go live in about two weeks from briefing: share your listings and your scripts, review the after-hours flows, connect your portals and phone numbers, test live with your team, then launch with a tuning window after go-live.",
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
  headline: "After Hours and Weekend Leads: Why Dubai Brokerages Lose Enquiries When the Office Closes",
  description:
    "Dubai property enquiries arrive in the evening, at weekends, and from other time zones. What an after-hours first reply must contain, how Arabic and English handling changes the outcome, and how to keep every lead in one pipeline.",
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
  datePublished: "2026-11-04",
  dateModified: "2026-11-04",
  mainEntityOfPage: "https://devmatesolutions.com/after-hours-weekend-leads-dubai-real-estate",
};

const MOMENTS = [
  {
    icon: "fal fa-moon",
    title: "The evening enquiry",
    good: "A buyer finishes work, opens Bayut or Property Finder, and messages about a listing they liked.",
    dies: "The reply waits until morning — and by then three other brokerages have answered.",
    fix: "An immediate reply in the buyer's language, with availability and a viewing offer.",
  },
  {
    icon: "fal fa-calendar-week",
    title: "The weekend viewing request",
    good: "Weekends are when buyers are free to view — so weekend enquiries are often the most serious ones.",
    dies: "A weekend request answered on Monday reads as a brokerage that is closed when buyers are buying.",
    fix: "Weekend requests get a viewing booked, not a promise to call back.",
  },
  {
    icon: "fal fa-globe",
    title: "The overseas buyer",
    good: "An investor in another time zone enquires while Dubai sleeps — and expects an answer, not silence.",
    dies: "A 12-hour delay looks like disinterest, and the buyer moves on to a more responsive brokerage.",
    fix: "Every time zone gets the same first reply, in Arabic or English as the buyer wrote.",
  },
];

const STEPS = [
  { stage: "Step 1", title: "Answer the enquiry, not the inbox", desc: "The first reply names the property or area, answers one real question, and offers a next step. A generic acknowledgement is worse than a short delay — it tells the buyer nobody is actually reading.", fix: "One useful answer, one clear next step, every time.", impact: "The buyer stops shopping and starts talking to you." },
  { stage: "Step 2", title: "Match the language", desc: "Arabic enquiries answered in Arabic, English enquiries in English. It is a small detail that changes how the reply lands — a buyer who wrote in Arabic and gets an English template feels like a lead, not a client.", fix: "Reply in the language the buyer used.", impact: "The conversation starts warm instead of formal." },
  { stage: "Step 3", title: "Keep one pipeline", desc: "Portal, WhatsApp, and phone enquiries land in the same place, with the full conversation attached. No lead lives in a single agent's phone, and no buyer gets called twice by two agents who did not know the other had replied.", fix: "One pipeline for every channel, every hour.", impact: "Monday morning starts mid-conversation, not from zero." },
];

const AfterHoursDubaiArticle = () => {
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
        pageTitle="After Hours and Weekend Leads for Dubai Real Estate Brokerages"
        pageDescription="Dubai property enquiries arrive in the evening, at weekends, and from other time zones. What an after-hours first reply must contain, how Arabic and English handling changes the outcome, and how to keep every lead in one pipeline."
        pageUrl="/after-hours-weekend-leads-dubai-real-estate"
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
                <h1 className="ailm-hero-headline">Your buyers do not stop at 6pm. <span className="ailm-red">Your replies should not either.</span></h1>
                <p className="ailm-hero-sub">
                  The evening portal enquiry, the weekend viewing request, the overseas buyer messaging from another time zone — these are not edge cases for a Dubai brokerage. They are a large share of the demand, and they arrive exactly when the office is closed.
                </p>
                <div className="ailm-hero-ctas">
                  <a className="ailm-btn-primary" href="https://cal.com/devmate/sixty-onboarding">Book a demo <i className="fal fa-long-arrow-right ml-2"></i></a>
                  <a className="ailm-btn-ghost" href="#moments">See when leads arrive</a>
                </div>
                <div className="ailm-hero-metrics">
                  <div className="ailm-metric"><span className="ailm-metric-num">Evenings</span><span className="ailm-metric-label">Peak Enquiry Hours</span></div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric"><span className="ailm-metric-num">Weekends</span><span className="ailm-metric-label">Peak Viewing Requests</span></div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric"><span className="ailm-metric-num">Arabic + English</span><span className="ailm-metric-label">Matched To The Buyer</span></div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric"><span className="ailm-metric-num">1 pipeline</span><span className="ailm-metric-label">Every Channel, Every Hour</span></div>
                </div>
              </div>
            </div>
          </section>

          <section className="ailm-section ailm-section--light" id="answer">
            <div className="container">
              <div className="chatbot-grid-two">
                <div className="chatbot-reveal">
                  <p className="ailm-eyebrow">The direct answer</p>
                  <h2 className="ailm-section-title">After-hours leads are lost on Monday morning — <span className="ailm-red">not on Friday night.</span></h2>
                  <p style={{ fontSize: 17, lineHeight: 1.7, color: "#4b5563" }}>
                    The enquiry itself is rarely the problem. The problem is the gap between the enquiry and the first useful reply. A buyer who messages on Friday evening and hears nothing until Monday has spent the weekend talking to brokerages that did reply — and the Monday callback lands as a follow-up to a decision that is already forming.
                  </p>
                  <p style={{ fontSize: 17, lineHeight: 1.7, color: "#4b5563" }}>
                    This article follows our earlier pieces on{" "}
                    <Link href="/how-fast-to-reply-dubai-real-estate-leads">how fast a Dubai brokerage should reply</Link>,{" "}
                    <Link href="/whatsapp-phone-portal-dubai-real-estate-leads">WhatsApp vs phone vs portal</Link>, and{" "}
                    <Link href="/dncr-pdpl-rera-dubai-real-estate">DNCR, PDPL, and RERA in plain language</Link>.
                  </p>
                </div>
                <div className="chatbot-reveal">
                  <div className="speed-answer">
                    <p>
                      <strong>The rule we work to:</strong> every enquiry — portal, WhatsApp, or phone — gets a first reply that names what the buyer asked about, answers one real question, and offers a viewing or a call. In Arabic or English, as the buyer wrote. That reply goes out whether it is 8pm, Friday, or a public holiday.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="ailm-section" id="moments">
            <div className="container">
              <div className="ailm-section-header chatbot-reveal">
                <p className="ailm-eyebrow">When they arrive</p>
                <h2 className="ailm-section-title">Three moments a brokerage is usually closed — and buyers are not</h2>
                <p className="ailm-section-sub">If your reply window is office hours, these are the leads you never see.</p>
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
                <h2 className="ailm-section-title">Three habits that keep after-hours leads alive</h2>
                <p className="ailm-section-sub">None of these needs a bigger team — they need a system that works when the team is off.</p>
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
                <h2 className="ailm-section-title">After-hours does not mean out of control</h2>
                <p style={{ fontSize: 17, lineHeight: 1.7, color: "#4b5563", maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
                  The worry we hear most is that answering at all hours means messaging anyone, any time. It does not. Replies go to buyers who have already enquired, numbers are screened against the Do Not Call Register, consent and data handling follow PDPL principles, and listings stay honest under RERA. Your team approves the scripts and the contact rules before anything goes live, and every conversation is logged where your team can see it. The brokerage stays in control — it just stops being closed when its buyers are awake.
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
                <h2 className="ailm-final-cta-title">See what your weekend enquiries are doing right now</h2>
                <p className="ailm-final-cta-sub">
                  Book a demo and we will walk through your own after-hours enquiries with you —
                  then show the first reply, in Arabic or English, going out the moment an enquiry arrives.
                </p>
                <div className="ailm-final-cta-btns">
                  <a className="ailm-btn-primary ailm-btn-white" href="https://cal.com/devmate/sixty-onboarding">
                    Book a demo <i className="fal fa-long-arrow-right ml-2"></i>
                  </a>
                  <Link className="ailm-btn-ghost ailm-btn-ghost--light" href="/dncr-pdpl-rera-dubai-real-estate">
                    Read the DNCR, PDPL &amp; RERA explainer
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

export default AfterHoursDubaiArticle;
