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
    q: "What should a provider show us before we sign?",
    a: "A live test on your own calls — real callers, your numbers, your script, your calendar. A recording of someone else's calls is not proof. A slide deck is not proof. The test is the proof: if the provider will not run one on your calls, that tells you what you need to know before you sign anything.",
  },
  {
    q: "What does a live test actually look like?",
    a: "You share your services and the script your team already uses. The provider connects your numbers and your calendar, and runs real calls through the system while your team listens: the first answer, the qualifying questions in order, the appointment or showing offered, the booking confirmed, and the record logged. Your team hears the whole call, including where the assistant hands over to a person. Then you decide, on evidence, not on a promise.",
  },
  {
    q: "How does consent and opt-out work?",
    a: "Consent is recorded before any outbound call is made, and every message carries a tested opt-out that propagates across every channel — so a caller who opts out once is never contacted again on another number or channel. Your team reviews and signs off the scripts and the calling rules before anything goes live, and every call is logged where your team can see it. Outbound contact is always consent-recorded, never cold.",
  },
  {
    q: "What about do-not-call screening?",
    a: "Numbers are screened against do-not-call lists before any outbound call, and calling follows local time zone rules — so nobody is called at an hour your team would not call them. Ask the provider to show you the screening step, not just describe it: the list it checks, the record it keeps, and what happens when a number is on it. A provider that cannot show the screening cannot prove it happens.",
  },
  {
    q: "Will it replace our front desk, agents, or team?",
    a: "No. It replaces the missed call, not the team. The assistant answers every call in seconds, qualifies, books into a real calendar, and hands over with full context whenever the caller asks for a person or a question needs one — a clinical question goes to the team, a pricing question goes to an agent, an urgent concern goes to a person straight away. Your team stays in control of every conversation; the assistant just stops the calls from dying unanswered.",
  },
  {
    q: "What systems does it connect to?",
    a: "Your calendar and your CRM, where connected — so a booked appointment is a real booking, not a message slip. For real estate teams, that means Follow Up Boss, kvCORE, HubSpot, Salesforce, or Pipedrive. For dental practices and med spas, the calendar and the CRM log the booking, the reminder, and the follow-up, so the front desk sees the same record the caller heard. One call, one record, every channel.",
  },
  {
    q: "How much does it cost?",
    a: "Contact our sales team for pricing. Pricing depends on your call volume, your locations, and which systems we connect, so we quote after a short demo call, not from a fixed list on this page.",
  },
  {
    q: "How fast can we go live?",
    a: "Most teams go live in about two weeks from briefing: share your services and your script, review the call flows, connect your numbers and calendar, test live with your team, then launch with a tuning window after go-live.",
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
  headline: "How to Choose an AI Call Assistant in the USA",
  description:
    "Hiring an AI call assistant for your real estate team, dental practice or med spa? The questions to ask before you sign: what a good provider proves on your own calls, how consent, opt-out and do-not-call screening work, and the red flags that tell you to walk away.",
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
  datePublished: "2026-11-11",
  dateModified: "2026-11-11",
  mainEntityOfPage: "https://devmatesolutions.com/choose-ai-call-assistant-usa",
};

const MOMENTS = [
  {
    icon: "fal fa-play-circle",
    title: "The recording that is not your business",
    good: "The demo calls are polished: scripted callers, perfect answers, a booking made in seconds. It looks like the problem is solved.",
    dies: "Real callers ask about a showing at 8 p.m., a toothache on a Saturday, a treatment they cannot name — and the assistant that aced the recording has never met a real caller.",
    fix: "A live test on your own calls, on your numbers, before anything is signed.",
  },
  {
    icon: "fal fa-sticky-note",
    title: "The booking that is only a message",
    good: "The assistant takes a message and promises a callback. The caller hangs up feeling heard, and the team gets a note.",
    dies: "The callback never happens, or happens hours later, and the caller has already booked with the practice that answered first.",
    fix: "Booked into a real calendar, not a message slip — with a confirmation, a reminder, and a record.",
  },
  {
    icon: "fal fa-moon",
    title: "The after-hours gap nobody covers",
    good: "Phones are answered nine to five, and voicemail takes the rest. The team assumes the evening callers will ring back tomorrow.",
    dies: "Evenings and weekends decide the booking — the homebuyer calling after work, the patient in pain on a Sunday — and they do not ring back. They book elsewhere.",
    fix: "Every call answered in seconds, nights and weekends included, with the booking made on the spot.",
  },
];

const STEPS = [
  { stage: "Step 1", title: "Ask for a live test on your own calls", desc: "Real callers, your numbers, your script, your calendar — in Miami, Houston, Dallas-Fort Worth, or wherever your team works. The assistant should answer, qualify in order, offer a showing or an appointment, confirm the booking, and log the record, all while your team listens to the whole call. A test on your calls shows you what the assistant does with a real caller; a recording shows you what it does with a scripted one.", fix: "A test on your calls, not a recording of someone else's.", impact: "You hear the assistant work — or you hear it fail — before you pay for it." },
  { stage: "Step 2", title: "Check consent, opt-out, and do-not-call screening in writing", desc: "Consent recorded before any outbound call, a tested opt-out that propagates across every channel, numbers screened against do-not-call lists, and calling that follows local time zone rules. Your team reviews and signs off the scripts and the calling rules before anything goes live. If the provider cannot explain these rules in plain language, it cannot build a system that follows them.", fix: "The calling rules, in writing, before the build starts.", impact: "A system that books appointments instead of creating risk." },
  { stage: "Step 3", title: "Check the calendar, the CRM, and the handover", desc: "A booked appointment is a real booking in your calendar, logged to your CRM where connected, with a reminder and a follow-up that does not forget. And when a caller asks for a person, or a question needs one — a clinical concern, a pricing decision, an urgent problem — the assistant hands over with the full context attached, so the caller never has to start again. Ask to hear a handover, not just a booking.", fix: "A real booking, a real record, and a real handover.", impact: "Your team sees every call, and no caller is ever left repeating themselves." },
];

const ChooseAiCallAssistantUsaArticle = () => {
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
        pageTitle="How to Choose an AI Call Assistant in the USA"
        pageDescription="Hiring an AI call assistant for your real estate team, dental practice or med spa? The questions to ask before you sign: what a good provider proves on your own calls, how consent, opt-out and do-not-call screening work, and the red flags that tell you to walk away."
        pageUrl="/choose-ai-call-assistant-usa"
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
                <div className="ailm-hero-badge"><span className="ailm-hero-dot"></span>USA · AI Call Assistants</div>
                <h1 className="ailm-hero-headline">The recording sounded perfect. <span className="ailm-red">Will it work on your calls?</span></h1>
                <p className="ailm-hero-sub">
                  Every AI call assistant provider in the USA has a polished demo. The question is not whether the recording works — it is whether the assistant works on your callers: the homebuyer calling after work in Houston, the new patient in pain on a Saturday in Miami, the med spa client rescheduling in Dallas. This guide is the five questions that separate a provider that books appointments from one that sells a voice.
                </p>
                <div className="ailm-hero-ctas">
                  <a className="ailm-btn-primary" href="https://cal.com/devmate/sixty-onboarding">Book a demo <i className="fal fa-long-arrow-right ml-2"></i></a>
                  <a className="ailm-btn-ghost" href="#moments">See the red flags</a>
                </div>
                <div className="ailm-hero-metrics">
                  <div className="ailm-metric"><span className="ailm-metric-num">5 questions</span><span className="ailm-metric-label">Before You Sign</span></div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric"><span className="ailm-metric-num">Voice first</span><span className="ailm-metric-label">Phone, Not Chat</span></div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric"><span className="ailm-metric-num">1 live test</span><span className="ailm-metric-label">On Your Own Calls</span></div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric"><span className="ailm-metric-num">2 weeks</span><span className="ailm-metric-label">Typical Go-Live</span></div>
                </div>
              </div>
            </div>
          </section>

          <section className="ailm-section ailm-section--light" id="answer">
            <div className="container">
              <div className="chatbot-grid-two">
                <div className="chatbot-reveal">
                  <p className="ailm-eyebrow">The direct answer</p>
                  <h2 className="ailm-section-title">A good call assistant proves itself on your calls, <span className="ailm-red">not on a recording.</span></h2>
                  <p style={{ fontSize: 17, lineHeight: 1.7, color: "#4b5563" }}>
                    Choosing an AI call assistant is not buying a voice. It is hiring a system that will speak to your callers, in your name, at hours when your team is out — on showings, chairside, or between appointments. The provider worth hiring is the one that will run a live test on your own calls before you sign, explain consent, opt-out, and do-not-call screening in plain language and in writing, and book into a real calendar instead of taking a message. Everything else — the demo, the deck, the price — comes after that.
                  </p>
                  <p style={{ fontSize: 17, lineHeight: 1.7, color: "#4b5563" }}>
                    This guide builds on our pieces on{" "}
                    <Link href="/ai-call-assistant-usa-real-estate">the AI call assistant for US real estate teams</Link>,{" "}
                    <Link href="/ai-call-assistant-dental-usa">the AI call assistant for dental clinics</Link>,{" "}
                    <Link href="/ai-call-assistant-aesthetics-usa">the AI call assistant for med spas</Link>, and{" "}
                    <Link href="/ai-lead-response-usa">AI lead response across all three</Link>.
                  </p>
                </div>
                <div className="chatbot-reveal">
                  <div className="speed-answer">
                    <p>
                      <strong>The rule we work to:</strong> no proof on your own calls, no signature. No consent record, no outbound call. No screening, no campaign.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="ailm-section" id="moments">
            <div className="container">
              <div className="ailm-section-header chatbot-reveal">
                <p className="ailm-eyebrow">The red flags</p>
                <h2 className="ailm-section-title">Three signs to walk away from a provider</h2>
                <p className="ailm-section-sub">Each one looks harmless in a sales call. Each one costs a business its bookings.</p>
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
                <p className="ailm-eyebrow">How to choose</p>
                <h2 className="ailm-section-title">Three checks before you sign anything</h2>
                <p className="ailm-section-sub">None of these needs a bigger budget — they need a provider willing to be tested.</p>
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
                <h2 className="ailm-section-title">Choosing is not buying a voice</h2>
                <p style={{ fontSize: 17, lineHeight: 1.7, color: "#4b5563", maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
                  A good provider leaves your business with a system your team can run: scripts your team approved, in your words; records your team can read, in one place; bookings your team can see, in a real calendar. The assistant answers every call in seconds, qualifies in order, books the appointment or the showing, and hands over with full context whenever the caller asks for a person. It replaces the missed call, not the front desk, not the agent, not the team. The five questions in this guide are the fastest way to tell whether the provider in front of you will build that system — or sell you a recording of one.
                </p>
              </div>
              <p style={{ textAlign: "center", marginTop: 28 }}>
                Related reading:{" "}
                <Link href="/ai-call-assistant-usa-real-estate">AI Call Assistant for US Real Estate</Link>,{" "}
                <Link href="/ai-call-assistant-dental-usa">AI Call Assistant for Dental Clinics USA</Link>,{" "}
                <Link href="/ai-call-assistant-aesthetics-usa">AI Call Assistant for Med Spas and Aesthetics Clinics USA</Link>,{" "}
                <Link href="/ai-lead-response-usa">AI Lead Response USA</Link>,{" "}
                <Link href="/missed-calls-cost-dental-practice">What a Missed Call Costs a Dental Practice — and How to Work It Out</Link>,{" "}
                <Link href="/missed-calls-cost-med-spa">What a Missed Call Costs a Med Spa</Link>, and{" "}
                <Link href="/missed-calls-cost-real-estate-usa">What a Missed Call Costs a US Real Estate Team</Link>.
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
                  Book a demo and we will run a live test on your own calls — your numbers, your script, your calendar — before anything is built.
                </p>
                <div className="ailm-final-cta-btns">
                  <a className="ailm-btn-primary ailm-btn-white" href="https://cal.com/devmate/sixty-onboarding">
                    Book a demo <i className="fal fa-long-arrow-right ml-2"></i>
                  </a>
                  <Link className="ailm-btn-ghost ailm-btn-ghost--light" href="/ai-lead-response-usa">
                    See AI Lead Response USA
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

export default ChooseAiCallAssistantUsaArticle;
