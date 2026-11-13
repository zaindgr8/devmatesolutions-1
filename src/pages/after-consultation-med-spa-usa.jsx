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
    q: "How soon after the consultation should a med spa follow up?",
    a: "The same day, while the consultation is still fresh in the client's mind. The treatment plan should go out in writing within hours — not the next morning, and never three days later. A client who leaves the clinic without anything in writing is deciding with nothing to hold on to, and by the time the follow-up arrives, the next clinic that called back has already won. The same-day plan is the follow-up; the call the next day is the reminder, not the first contact.",
  },
  {
    q: "What should the follow-up include?",
    a: "The treatment plan as discussed, the aftercare the client needs to know, the price they were quoted, and one clear next step — book the first session — with a single link or a single call to do it. It should go out in the language and the channel the client used, and it should name the person they spoke to, so the client feels the conversation continued rather than restarted. Anything the client asked about during the consultation should be answered in that same message, not left for a later call.",
  },
  {
    q: "What if the client needs time to decide?",
    a: "Give it to them — and name the date you will check back. A client who needs time is not a lost client; a client who is chased daily is. The follow-up should say when the plan stays open until, and offer one check-in call on a named day, at a named hour, in the client's local time zone. If the client says no, the answer is recorded and the follow-up stops. Consent is not a one-time permission — it is checked at every step, and every message carries a simple way to opt out.",
  },
  {
    q: "How do you handle a client who does not answer?",
    a: "One call, then one written message, then stop — and record both in the CRM so the next person who speaks to the client does not start from zero. A client who does not answer has not necessarily said no; they may be at work, driving, or simply busy. But a client who is called five times in two days has heard the message, and the message is that the clinic does not listen. One well-timed follow-up respects the client's time and keeps the door open; a barrage closes it.",
  },
  {
    q: "What about aftercare questions after the first session?",
    a: "Aftercare questions go straight to the clinic team — the assistant never answers a medical question, and never guesses at one. The assistant's job is to take the question, log it, and route it to the right person the same day, then confirm back to the client that the team has it. A client with an aftercare concern is deciding whether they trust the clinic with their next treatment, and the fastest way to earn that trust is a same-day answer from a human, not a confident answer from a system.",
  },
  {
    q: "How does consent work for follow-up calls?",
    a: "Consent is recorded at the consultation, in writing, and checked before every outbound call — the number is screened against do-not-call lists, the call respects the client's local time zone, and the client can opt out at any point and have it honoured immediately. The clinic's team approves the scripts and the calling rules before anything goes live, and every call is logged where the team can see it. A follow-up that arrives without consent is not persistence — it is a complaint waiting to happen.",
  },
  {
    q: "How much does it cost?",
    a: "Contact our sales team for pricing. Pricing depends on your call volume, your locations, and which booking and CRM systems we connect, so we quote after a short demo call, not from a fixed list on this page.",
  },
  {
    q: "How fast can we go live?",
    a: "Most clinics go live in about two weeks from briefing: share your treatment menus and your scripts, review the consultation and follow-up flows, connect your booking system and phone numbers, test live with your team, then launch with a tuning window after go-live.",
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
  headline: "After the Consultation: What a Med Spa Should Do Before the Client Decides",
  description:
    "The consultation went well — now what? The treatment plan in writing the same day, one well-timed follow-up call, and a first session that takes one step to book — so the client decides with you, not with the next clinic that calls back.",
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
  datePublished: "2026-11-13",
  dateModified: "2026-11-13",
  mainEntityOfPage: "https://devmatesolutions.com/after-consultation-med-spa-usa",
};

const MOMENTS = [
  {
    icon: "fal fa-file-medical",
    title: "The treatment plan that never arrived",
    good: "The consultation goes well: the client likes the practitioner, the plan makes sense, the price is agreed. The client leaves saying they will think about it.",
    dies: "Nothing arrives in writing — no plan, no aftercare, no price as quoted, no next step. The client has nothing to show a partner, nothing to compare, and nothing to come back to. Three days later the clinic calls, and the client has already booked with the clinic that sent the plan the same evening.",
    fix: "The plan in writing the same day — treatment, aftercare, price as quoted, and one next step.",
  },
  {
    icon: "fal fa-phone-slash",
    title: "The follow-up that came too late",
    good: "The clinic means to follow up. The practitioner is busy, the front desk is short-staffed, and the note about the consultation sits in a diary until Friday.",
    dies: "The client, who was ready to book on Tuesday, has spent three days deciding alone — and on Wednesday another clinic answered their enquiry, sent a plan, and booked the first session. The follow-up call on Friday reaches a client who has already decided.",
    fix: "One follow-up call the next day, at the right hour — the plan itself goes out the same day.",
  },
  {
    icon: "fal fa-question-circle",
    title: "The question nobody answered",
    good: "The client has one concern after the consultation — about aftercare, or about what the treatment actually involves. They call the clinic to ask.",
    dies: "The call goes to voicemail, the message is never returned, and the concern sits unanswered while the client decides. A client with an unanswered question does not book — they book somewhere the question was answered.",
    fix: "Every question logged the same day, routed to the team, and answered by a human.",
  },
];

const STEPS = [
  { stage: "Step 1", title: "Send the plan in writing the same day", desc: "The treatment plan as discussed, the aftercare the client needs to know, the price they were quoted, and one clear next step — book the first session — sent within hours of the consultation, in the language and the channel the client used, naming the person they spoke to. A client who leaves with the plan in writing is deciding with something to hold on to; a client who leaves with nothing is deciding with the next clinic that calls back.", fix: "The plan in writing, the same day, with one next step.", impact: "The client decides with you in front of them — not with a competitor." },
  { stage: "Step 2", title: "Follow up once, at the right hour", desc: "One call the next day, in the client's local time zone, screened against do-not-call lists and checked against the consent recorded at the consultation — with the plan already in the client's hands, so the call is a reminder, not a pitch. If the client needs more time, name the date you will check back and record it. If the client says no, record it and stop. One well-timed call respects the client's time; five calls in two days closes the door.", fix: "One call, the next day, at the right hour — consent checked first.", impact: "The client hears from the clinic once, clearly, and the door stays open." },
  { stage: "Step 3", title: "Make booking the first session one step", desc: "A single link or a single call books the first session — no form filled in twice, no details asked for again, and a reminder before the session that the client can move in one step. The booking is confirmed in writing within minutes, and the reminder goes out the day before. A client who has to repeat everything they already told the clinic feels like a stranger — and strangers do not come back.", fix: "One step to book, confirmed in writing, reminded the day before.", impact: "The consultation becomes a kept first session — not a lost lead." },
];

const AfterConsultationMedSpaArticle = () => {
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
        pageTitle="After the Consultation: What a Med Spa Should Do Before the Client Decides"
        pageDescription="The consultation went well — now what? The treatment plan in writing the same day, one well-timed follow-up call, and a first session that takes one step to book — so the client decides with you, not with the next clinic that calls back."
        pageUrl="/after-consultation-med-spa-usa"
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
                <div className="ailm-hero-badge"><span className="ailm-hero-dot"></span>USA · Med Spas &amp; Aesthetics</div>
                <h1 className="ailm-hero-headline">The consultation went well. <span className="ailm-red">Why hasn&apos;t the client booked?</span></h1>
                <p className="ailm-hero-sub">
                  Because the decision happens after the client leaves — and most clinics go quiet at exactly that moment. The treatment plan in writing the same day, one well-timed follow-up call, and a first session that takes one step to book: this is what should happen between the consultation and the decision.
                </p>
                <div className="ailm-hero-ctas">
                  <a className="ailm-btn-primary" href="https://cal.com/devmate/sixty-onboarding">Book a demo <i className="fal fa-long-arrow-right ml-2"></i></a>
                  <a className="ailm-btn-ghost" href="#moments">See what goes wrong</a>
                </div>
                <div className="ailm-hero-metrics">
                  <div className="ailm-metric"><span className="ailm-metric-num">Same day</span><span className="ailm-metric-label">Plan In Writing</span></div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric"><span className="ailm-metric-num">1 call</span><span className="ailm-metric-label">The Follow-Up</span></div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric"><span className="ailm-metric-num">1 step</span><span className="ailm-metric-label">Book The First Session</span></div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric"><span className="ailm-metric-num">Local time</span><span className="ailm-metric-label">Always</span></div>
                </div>
              </div>
            </div>
          </section>

          <section className="ailm-section ailm-section--light" id="answer">
            <div className="container">
              <div className="chatbot-grid-two">
                <div className="chatbot-reveal">
                  <p className="ailm-eyebrow">The direct answer</p>
                  <h2 className="ailm-section-title">The decision happens <span className="ailm-red">after the client leaves.</span></h2>
                  <p style={{ fontSize: 17, lineHeight: 1.7, color: "#4b5563" }}>
                    What a med spa does between the consultation and the decision is what decides it: the treatment plan in writing the same day, one follow-up call the next day at the right hour, and a first session that takes one step to book. The follow-up is voice-first — a call, screened against do-not-call lists, with consent recorded at the consultation and checked before every call, in the client&apos;s local time zone. A clinic that sends the plan the same day and follows up once, well, keeps the client deciding with them; a clinic that waits three days finds the client has already booked elsewhere. Miami, Houston, Dallas-Fort Worth, Florida and Texas — the pattern is the same.
                  </p>
                  <p style={{ fontSize: 17, lineHeight: 1.7, color: "#4b5563" }}>
                    This guide follows our piece on{" "}
                    <Link href="/consultation-prep-med-spa-usa">what should happen before the client walks in</Link>, and sits alongside{" "}
                    <Link href="/after-first-reply-med-spa-usa">what a med spa does with an after-hours enquiry</Link>.
                  </p>
                </div>
                <div className="chatbot-reveal">
                  <div className="speed-answer">
                    <p>
                      <strong>The rule we work to:</strong> no consent record, no outbound call. No do-not-call screening, no contact. No medical question answered by the assistant — ever. In the client&apos;s local time zone, at the right hour.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="ailm-section" id="moments">
            <div className="container">
              <div className="ailm-section-header chatbot-reveal">
                <p className="ailm-eyebrow">What goes wrong</p>
                <h2 className="ailm-section-title">Three ways a good consultation never becomes a booking</h2>
                <p className="ailm-section-sub">Each one looks harmless on the day. Each one ends the chain before the first session.</p>
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
                <p className="ailm-eyebrow">The follow-up</p>
                <h2 className="ailm-section-title">Three habits that turn a consultation into a kept first session</h2>
                <p className="ailm-section-sub">None of these needs a bigger budget — they need a clinic that follows up in order.</p>
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
                <h2 className="ailm-section-title">A consultation is a beginning, not a booking</h2>
                <p style={{ fontSize: 17, lineHeight: 1.7, color: "#4b5563", maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
                  Done properly, the client leaves the consultation with the plan in writing the same day, hears once from the clinic the next day at the right hour, and books the first session in a single step — with the booking confirmed in writing within minutes and a reminder the day before. The clinic leaves with the same record in one CRM, consent checked and every call logged, so the follow-up picks up exactly where the consultation left off. The consultation is the most expensive minute in the chain to waste: the client is there, the practitioner is there, and the decision is half made. Follow up once, well, and the consultation does its job.
                </p>
              </div>
              <p style={{ textAlign: "center", marginTop: 28 }}>
                Related reading:{" "}
                <Link href="/consultation-prep-med-spa-usa">Your Consultation Is Booked. What Should Happen Before the Client Walks In?</Link>,{" "}
                <Link href="/after-first-reply-med-spa-usa">After the First Reply: What a Med Spa Does With an After-Hours Enquiry</Link>,{" "}
                <Link href="/ai-call-assistant-aesthetics-usa">AI Call Assistant for Med Spas and Aesthetics Clinics USA | Miami, Houston, Dallas</Link>,{" "}
                <Link href="/missed-calls-cost-med-spa">What a Missed Call Costs a Med Spa — and How to Work It Out</Link>, and{" "}
                <Link href="/after-hours-med-spa-enquiries-usa">After-Hours Enquiries for Med Spas and Aesthetics Clinics USA</Link>.
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
                <h2 className="ailm-final-cta-title">See a proven system on your own calls</h2>
                <p className="ailm-final-cta-sub">
                  Book a demo and we will run a live test on your own enquiries — your treatment menus, your script, your booking system — before anything is built.
                </p>
                <div className="ailm-final-cta-btns">
                  <a className="ailm-btn-primary ailm-btn-white" href="https://cal.com/devmate/sixty-onboarding">
                    Book a demo <i className="fal fa-long-arrow-right ml-2"></i>
                  </a>
                  <Link className="ailm-btn-ghost ailm-btn-ghost--light" href="/ai-call-assistant-aesthetics-usa">
                    See AI Call Assistant for Med Spas
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

export default AfterConsultationMedSpaArticle;
