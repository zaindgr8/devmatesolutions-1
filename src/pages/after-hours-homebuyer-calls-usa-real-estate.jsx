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
    q: "When do US homebuyer calls actually arrive?",
    a: "Often after hours: the evening caller checking a listing after work, the weekend caller ready to book a showing, the lunch-hour caller squeezing in a question between meetings. A brokerage that only answers during showing hours is only staffed for part of its own demand — and the rest of it is answered by whichever brokerage picks up first.",
  },
  {
    q: "Why is a fast after-hours answer worth more than a Monday callback?",
    a: "Because a buyer comparing homes is usually talking to two or three brokerages at once. By Monday morning they have usually had a reply, a showing, or both — from someone else. Speed is not a nice-to-have in the evening; it is the difference between being the first conversation and being a follow-up to one that already happened.",
  },
  {
    q: "Is an AI call assistant the same as an answering service?",
    a: "No. An answering service takes a message. The assistant holds the conversation: it answers from your approved script, qualifies the buyer, books the showing into a real calendar, sends the confirmation, and logs everything for your team. The output is a booked showing, not a note to call back.",
  },
  {
    q: "What should an after-hours first answer do?",
    a: "Three things: answer in seconds, answer the buyer's real question — the listing, the area, viewing times — from your approved script, and book the showing before the call ends. A friendly message that still needs a callback has only moved the problem, not solved it.",
  },
  {
    q: "What about buyers who only want the price?",
    a: "Answer them honestly from your approved script, then offer the showing as the next step. A price-only answer with no booking offer loses the buyer; a price answer that ends in a booked showing keeps them. Your team decides exactly what the assistant may quote, so nothing is promised that the brokerage would not promise itself.",
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
    a: "Most brokerages go live in about two weeks from briefing: share your listings and your script, review the call flows, connect your phone numbers and calendar, test live with your team, then launch with a tuning window after go-live.",
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
  headline: "After-Hours Calls from US Homebuyers: Why Evenings and Weekends Decide the Showing",
  description:
    "US homebuyer calls arrive in the evening, at weekends, and from other time zones. What an after-hours answer must do, why a message is not a showing, and how a voice-first assistant turns evening callers into booked showings.",
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
  mainEntityOfPage: "https://devmatesolutions.com/after-hours-homebuyer-calls-usa-real-estate",
};

const MOMENTS = [
  {
    icon: "fal fa-moon",
    title: "The evening caller",
    good: "A buyer finishes work and rings about a listing they saw — often ready to book a showing for the weekend.",
    dies: "Voicemail until morning — by which time the buyer has booked a showing with the brokerage that answered.",
    fix: "Every evening call answered live, with the showing booked before the call ends.",
  },
  {
    icon: "fal fa-calendar-week",
    title: "The weekend caller",
    good: "Weekends are when buyers are free to view — so weekend callers are often the most motivated ones.",
    dies: "A weekend enquiry answered on Monday reads as a brokerage that is closed when buyers are buying.",
    fix: "Weekend callers get a showing booked, not a promise to call back.",
  },
  {
    icon: "fal fa-globe",
    title: "The out-of-state relocator",
    good: "A buyer relocating to Houston, Dallas, or Miami calls from another time zone — and expects an answer, not silence.",
    dies: "A 12-hour delay looks like disinterest, and the buyer moves on to a more responsive brokerage.",
    fix: "Every time zone gets the same first answer, with local showing times offered in the call.",
  },
];

const STEPS = [
  { stage: "Step 1", title: "Answer the call, not the voicemail", desc: "The first answer names the listing or area, gives one useful answer from your approved script, and offers a showing time. A message that needs a callback is a delay wearing a friendly voice.", fix: "One useful answer, one booked showing, every call.", impact: "The buyer stops comparing and starts planning their visit." },
  { stage: "Step 2", title: "Qualify and book before the call ends", desc: "Budget, area, property type, timeline, and pre-approval — asked in order, in the same call — then availability, showing times, and confirmation, all before the buyer hangs up.", fix: "Calendar booking inside the call, confirmation sent at once.", impact: "Diaries fill with buyers who can actually buy." },
  { stage: "Step 3", title: "Keep one log", desc: "Every call, showing, and follow-up is logged where your team already works — Follow Up Boss, kvCORE, HubSpot, Salesforce, or Pipedrive — so Monday morning starts with a booked diary, not a voicemail inbox to work through.", fix: "One log for every call, every hour.", impact: "Your team follows up on booked buyers, not on missed messages." },
];

const AfterHoursHomebuyerCallsArticle = () => {
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
        pageTitle="After-Hours Calls from US Homebuyers: Evenings and Weekends | DevMate Solutions"
        pageDescription="US homebuyer calls arrive in the evening, at weekends, and from other time zones. What an after-hours answer must do, why a message is not a showing, and how a voice-first assistant turns evening callers into booked showings."
        pageUrl="/after-hours-homebuyer-calls-usa-real-estate"
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
                <div className="ailm-hero-badge"><span className="ailm-hero-dot"></span>USA · Real Estate</div>
                <h1 className="ailm-hero-headline">Your buyers call after 6pm. <span className="ailm-red">Your phones should still answer.</span></h1>
                <p className="ailm-hero-sub">
                  The evening caller checking a listing after work, the weekend caller ready to book a showing, the relocator calling from another time zone — these are not edge cases for a US brokerage. They are a large share of the demand, and they arrive exactly when the team is out showing homes or gone home.
                </p>
                <div className="ailm-hero-ctas">
                  <a className="ailm-btn-primary" href="https://cal.com/devmate/sixty-onboarding">Book a demo <i className="fal fa-long-arrow-right ml-2"></i></a>
                  <a className="ailm-btn-ghost" href="#moments">See when buyers call</a>
                </div>
                <div className="ailm-hero-metrics">
                  <div className="ailm-metric"><span className="ailm-metric-num">Seconds</span><span className="ailm-metric-label">To First Answer</span></div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric"><span className="ailm-metric-num">Evenings</span><span className="ailm-metric-label">Peak Call Hours</span></div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric"><span className="ailm-metric-num">Weekends</span><span className="ailm-metric-label">Peak Showing Intent</span></div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric"><span className="ailm-metric-num">1 call</span><span className="ailm-metric-label">1 Booked Showing</span></div>
                </div>
              </div>
            </div>
          </section>

          <section className="ailm-section ailm-section--light" id="answer">
            <div className="container">
              <div className="chatbot-grid-two">
                <div className="chatbot-reveal">
                  <p className="ailm-eyebrow">The direct answer</p>
                  <h2 className="ailm-section-title">Evening callers are not browsing — <span className="ailm-red">they are choosing.</span></h2>
                  <p style={{ fontSize: 17, lineHeight: 1.7, color: "#4b5563" }}>
                    The call itself is rarely the problem. The problem is the gap between the call and the first useful answer. A buyer who rings on Friday evening and gets voicemail has spent the weekend talking to brokerages that did answer — and the Monday callback lands as a follow-up to a decision that is already forming.
                  </p>
                  <p style={{ fontSize: 17, lineHeight: 1.7, color: "#4b5563" }}>
                    This article follows our{" "}
                    <Link href="/ai-call-assistant-usa-real-estate">AI Call Assistant for US Real Estate</Link> page and the cross-niche{" "}
                    <Link href="/ai-lead-response-usa">AI Lead Response USA</Link> page — and it pairs with our dental article on{" "}
                    <Link href="/missed-calls-cost-dental-practice">what a missed call costs a dental practice</Link>.
                  </p>
                </div>
                <div className="chatbot-reveal">
                  <div className="speed-answer">
                    <p>
                      <strong>The rule we work to:</strong> every buyer call gets answered in seconds, the buyer's real question is answered from your approved script, and the showing is booked before the call ends — whether it is 8pm, Saturday, or a holiday.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="ailm-section" id="moments">
            <div className="container">
              <div className="ailm-section-header chatbot-reveal">
                <p className="ailm-eyebrow">When they call</p>
                <h2 className="ailm-section-title">Three moments a brokerage is usually out — and buyers are not waiting</h2>
                <p className="ailm-section-sub">If your answer window is showing hours, these are the buyers you never hear from.</p>
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
                <h2 className="ailm-section-title">Three habits that keep after-hours buyers booked</h2>
                <p className="ailm-section-sub">None of these needs a bigger team — they need a system that answers when the team cannot.</p>
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
                  The worry we hear most is that answering at all hours means calling anyone, any time. It does not. Outbound contact is screened against do-not-call lists, consent is recorded, every caller can opt out, and calls respect the caller's local time zone. Your team approves the scripts and the calling rules before anything goes live, and every call is logged where your team can see it. The brokerage stays in control — it just stops being silent when its buyers are deciding.
                </p>
              </div>
              <p style={{ textAlign: "center", marginTop: 28 }}>
                See it in practice:{" "}
                <Link href="/ai-call-assistant-usa-real-estate">AI Call Assistant for US Real Estate</Link>,{" "}
                <Link href="/ai-lead-response-usa">AI Lead Response USA</Link>,{" "}
                <Link href="/ai-call-assistant-dental-usa">AI Call Assistant for Dental Clinics USA</Link>, and{" "}
                <Link href="/ai-call-assistant-aesthetics-usa">AI Call Assistant for Med Spas and Aesthetics Clinics USA</Link>.
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
                <h2 className="ailm-final-cta-title">Hear it on your own calls, not a demo script</h2>
                <p className="ailm-final-cta-sub">
                  Book a demo and we will show the assistant answering, qualifying, and booking a live test call —
                  the same call your evening and weekend buyers would get.
                </p>
                <div className="ailm-final-cta-btns">
                  <a className="ailm-btn-primary ailm-btn-white" href="https://cal.com/devmate/sixty-onboarding">
                    Book a demo <i className="fal fa-long-arrow-right ml-2"></i></a>
                  <Link className="ailm-btn-ghost ailm-btn-ghost--light" href="/ai-call-assistant-usa-real-estate">
                    See the US real estate assistant
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

export default AfterHoursHomebuyerCallsArticle;
