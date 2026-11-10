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
    q: "What should happen between booking and the consultation?",
    a: "Four things: the eligibility questions are answered before the visit, the client gets in writing what to bring and what the consultation involves, a reminder goes out the day before, and rescheduling takes one step. A booked consultation is not a kept consultation — the gap between the two is where chairs sit empty.",
  },
  {
    q: "What eligibility questions should be asked before the visit?",
    a: "The ones that decide whether the treatment can go ahead: skin type and concerns, recent treatments, medications and allergies, and what the client expects from the result. These are asked from your approved script, in the client's own words from the first call — and anything medical, or any urgent or clinical concern, is routed to your team. The assistant does not answer it.",
  },
  {
    q: "What should the confirmation contain?",
    a: "The date and time, the treatment or consultation, what to bring, what the consultation involves, and how to reschedule — in one message the client can find again. A confirmation the client cannot find is barely better than no confirmation at all, and a client who does not know what to expect arrives nervous instead of ready.",
  },
  {
    q: "What if the client needs to reschedule?",
    a: "Make it easy: one step, no phone queue, and the next available time offered at once. A client who has to call back three times to move an appointment is a client who stops trying. Every reschedule is logged, so the team sees the new time and the old one together.",
  },
  {
    q: "What happens if the client does not show up?",
    a: "The same day, not the next week: a short follow-up, in the client's own words from the first call, offering a new time. No penalty framing, no guilt — just the next available slot. A no-show is usually a forgotten booking, not a lost client, and a fast follow-up is what decides which one it is.",
  },
  {
    q: "Is AI calling compliant in the United States?",
    a: "It is built with consent, opt-out, and do-not-call screening in mind: outbound contact is screened against do-not-call lists, consent is recorded, every caller can opt out, and calls respect the caller's local time zone. Your team reviews and signs off the scripts and calling rules before anything goes live. Client records stay in your own systems. Any medical question, or urgent or clinical concern, is routed to your team — the assistant does not answer it.",
  },
  {
    q: "How much does it cost?",
    a: "Contact our sales team for pricing. Pricing depends on your call volume, your locations, and which systems we connect, so we quote after a short demo call, not from a fixed list on this page.",
  },
  {
    q: "How fast can we go live?",
    a: "Most clinics go live in about two weeks from briefing: share your services and your script, review the call flows, connect your phone numbers and calendar, test live with your team, then launch with a tuning window after go-live.",
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
  headline: "Your Consultation Is Booked. What Should Happen Before the Client Walks In?",
  description:
    "The consultation is booked — but booked is not the same as kept. What a med spa should do between the booking and the visit: answer the eligibility questions, send what to bring and what to expect in writing, remind the client, and make rescheduling one step — so the chair is full when the hour comes.",
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
  datePublished: "2026-11-10",
  dateModified: "2026-11-10",
  mainEntityOfPage: "https://devmatesolutions.com/consultation-prep-med-spa-usa",
};

const MOMENTS = [
  {
    icon: "fal fa-user-times",
    title: "The client who arrives unprepared",
    good: "The client booked a consultation, and arrives not knowing what it involves, what to bring, or whether the treatment suits them at all.",
    dies: "The eligibility question is discovered in the chair, the treatment cannot go ahead, and the hour is lost — for the client and the clinic.",
    fix: "Eligibility questions answered before the visit, from the approved script, with medical questions routed to the team.",
  },
  {
    icon: "fal fa-bell-slash",
    title: "The reminder that never comes",
    good: "The booking is real, the client is keen — and then life happens for three days.",
    dies: "No reminder goes out, the client forgets, and the chair sits empty at the hour it was booked for.",
    fix: "A reminder the day before, and a same-day follow-up if the client does not show.",
  },
  {
    icon: "fal fa-phone-slash",
    title: "The reschedule that takes a phone queue",
    good: "The client needs to move the consultation, and calls to do it — and reaches voicemail, or a queue, or a callback that never comes.",
    dies: "The client stops trying, the slot stays blocked, and the booking quietly dies.",
    fix: "A reschedule that takes one step, with the next available time offered at once.",
  },
];

const STEPS = [
  { stage: "Step 1", title: "Answer the eligibility questions before the visit", desc: "Skin type and concerns, recent treatments, medications and allergies, and what the client expects — asked from your approved script, before the client walks in. Anything medical, or any urgent or clinical concern, goes to your team, not to the assistant. The client arrives ready, and the team knows who is walking in.", fix: "Eligibility settled before the visit, not in the chair.", impact: "No hour lost to a treatment that cannot go ahead." },
  { stage: "Step 2", title: "Send what to bring and what happens, in writing", desc: "Date and time, treatment, what to bring, what the consultation involves, and how to reschedule — in one message the client can find again, sent before the visit. A client who knows what happens arrives calm and ready; a client who does not arrives nervous, late, or not at all.", fix: "One written confirmation, sent at once.", impact: "The client stops wondering, and starts preparing." },
  { stage: "Step 3", title: "Remind, and make rescheduling one step", desc: "A reminder the day before, and a reschedule that takes one step, not a phone queue — with the next available time offered at once. If the client does not show, the follow-up goes out the same day, offering a new time in the client's own words from the first call.", fix: "A reminder, a one-step reschedule, a same-day follow-up.", impact: "Chairs stay full, and a missed visit becomes a moved visit, not a lost client." },
];

const ConsultationPrepMedSpaUsaArticle = () => {
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
        pageTitle="Your Consultation Is Booked. What Should Happen Before the Client Walks In?"
        pageDescription="The consultation is booked — but booked is not the same as kept. What a med spa should do between the booking and the visit: answer the eligibility questions, send what to bring and what to expect in writing, remind the client, and make rescheduling one step — so the chair is full when the hour comes."
        pageUrl="/consultation-prep-med-spa-usa"
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
                <div className="ailm-hero-badge"><span className="ailm-hero-dot"></span>USA · Med Spas</div>
                <h1 className="ailm-hero-headline">The consultation is booked. <span className="ailm-red">Booked is not the same as kept.</span></h1>
                <p className="ailm-hero-sub">
                  The client asked about a treatment, got a useful answer, and took a consultation time. Between that booking and the visit, four things have to happen — the eligibility questions answered, what to bring and what to expect sent in writing, a reminder, and a reschedule that takes one step. The clinic that does them keeps the booking; the one that stops at the booking watches the chair sit empty.
                </p>
                <div className="ailm-hero-ctas">
                  <a className="ailm-btn-primary" href="https://cal.com/devmate/sixty-onboarding">Book a demo <i className="fal fa-long-arrow-right ml-2"></i></a>
                  <a className="ailm-btn-ghost" href="#moments">See where bookings fade</a>
                </div>
                <div className="ailm-hero-metrics">
                  <div className="ailm-metric"><span className="ailm-metric-num">4 steps</span><span className="ailm-metric-label">Booking To Kept Visit</span></div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric"><span className="ailm-metric-num">Seconds</span><span className="ailm-metric-label">To First Answer</span></div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric"><span className="ailm-metric-num">1 message</span><span className="ailm-metric-label">What To Bring & Expect</span></div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric"><span className="ailm-metric-num">1 step</span><span className="ailm-metric-label">To Reschedule</span></div>
                </div>
              </div>
            </div>
          </section>

          <section className="ailm-section ailm-section--light" id="answer">
            <div className="container">
              <div className="chatbot-grid-two">
                <div className="chatbot-reveal">
                  <p className="ailm-eyebrow">The direct answer</p>
                  <h2 className="ailm-section-title">The booking is the middle, <span className="ailm-red">not the end.</span></h2>
                  <p style={{ fontSize: 17, lineHeight: 1.7, color: "#4b5563" }}>
                    Four things have to happen after the consultation is booked: the eligibility questions are answered, the client gets in writing what to bring and what the consultation involves, a reminder goes out the day before, and rescheduling takes one step. Nothing in that list needs a bigger team. It needs a system that finishes what the booking starts, for clinics in Miami, Houston, Dallas-Fort Worth, and across Florida and Texas.
                  </p>
                  <p style={{ fontSize: 17, lineHeight: 1.7, color: "#4b5563" }}>
                    The companion to this article is our piece on{" "}
                    <Link href="/after-hours-med-spa-enquiries-usa">after-hours med spa enquiries</Link> — and the same maths, worked for med spas, is in{" "}
                    <Link href="/missed-calls-cost-med-spa">what a missed call costs a med spa</Link>. The assistant behind both is{" "}
                    <Link href="/ai-call-assistant-aesthetics-usa">AI Call Assistant for Med Spas and Aesthetics Clinics USA</Link>, and the cross-niche version is{" "}
                    <Link href="/ai-lead-response-usa">AI Lead Response USA</Link>.
                  </p>
                </div>
                <div className="chatbot-reveal">
                  <div className="speed-answer">
                    <p>
                      <strong>The rule we work to:</strong> every booked consultation arrives prepared — the client knows what happens, what to bring, and how to reschedule, and the team knows the client — never a booking that still needs a callback, and never a chair that sits empty because nobody reminded anyone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="ailm-section" id="moments">
            <div className="container">
              <div className="ailm-section-header chatbot-reveal">
                <p className="ailm-eyebrow">Where they fade</p>
                <h2 className="ailm-section-title">Three ways a booked consultation never becomes a visit</h2>
                <p className="ailm-section-sub">The booking was made. The preparation was never finished.</p>
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
                <h2 className="ailm-section-title">Three habits that turn a booking into a kept visit</h2>
                <p className="ailm-section-sub">None of these needs a bigger team — they need a system that finishes what the booking starts.</p>
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
                  The worry we hear most is that answering at all hours means calling anyone, any time. It does not. Outbound contact is screened against do-not-call lists, consent is recorded, every caller can opt out, and calls respect the caller&apos;s local time zone. Your team approves the scripts and the calling rules before anything goes live, and every call is logged where your team can see it. Any medical question, or urgent or clinical concern, is routed to your team — the assistant does not answer it. The clinic stays in control — it just stops being silent when its clients are deciding.
                </p>
              </div>
              <p style={{ textAlign: "center", marginTop: 28 }}>
                See it in practice:{" "}
                <Link href="/ai-call-assistant-aesthetics-usa">AI Call Assistant for Med Spas and Aesthetics Clinics USA</Link>,{" "}
                <Link href="/ai-lead-response-usa">AI Lead Response USA</Link>,{" "}
                <Link href="/after-hours-med-spa-enquiries-usa">After-Hours Med Spa Enquiries</Link>, and{" "}
                <Link href="/missed-calls-cost-med-spa">What a Missed Call Costs a Med Spa</Link>.
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
                  Book a demo and we will walk through your own bookings with you —
                  then show the preparation, the reminder, and the one-step reschedule happening on a live test call.
                </p>
                <div className="ailm-final-cta-btns">
                  <a className="ailm-btn-primary ailm-btn-white" href="https://cal.com/devmate/sixty-onboarding">
                    Book a demo <i className="fal fa-long-arrow-right ml-2"></i>
                  </a>
                  <Link className="ailm-btn-ghost ailm-btn-ghost--light" href="/after-hours-med-spa-enquiries-usa">
                    Read the after-hours piece
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

export default ConsultationPrepMedSpaUsaArticle;
