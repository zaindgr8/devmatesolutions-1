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
    q: "What should happen right after a new patient books?",
    a: "A confirmation in writing, within minutes: the date and time, the address, what to bring, and one number to call with questions. The confirmation should go by the channel the patient used to book — a call answered on the phone is confirmed on the phone — and the appointment should be a real booking in the practice calendar, not a message for the front desk to enter later. A patient who books and hears nothing until the day before is a patient who may not come.",
  },
  {
    q: "What should the patient be sent before the visit?",
    a: "The intake forms, the insurance details to have ready, what to expect at the first visit, and what to bring — sent in writing, with enough time to complete everything at home. A patient who arrives with the forms done sits in the chair on time; a patient who starts them at reception costs the practice twenty minutes of chair time and a waiting room full of people watching the clock.",
  },
  {
    q: "What should the patient bring to the first visit?",
    a: "A photo ID, their insurance card and details, a list of current medications and allergies, and the name of their previous dentist where relevant. The practice should ask for these before the visit, not at the desk on the day — and the patient should be told in writing what is needed, so nothing is forgotten and the first visit is about the patient, not the paperwork.",
  },
  {
    q: "How do reminders and rescheduling work?",
    a: "A reminder the day before, in the patient's local time zone, with the date, time, and address — and rescheduling in one step, by replying or by calling, without a phone queue. A reminder that arrives at the wrong hour is ignored; a reschedule that needs three calls is abandoned. The practice should also confirm the booking again when a patient reschedules, so the new slot is a real booking, not a note.",
  },
  {
    q: "What happens when a patient does not show?",
    a: "A same-day follow-up: a call or message that asks what happened, offers the next available slot, and makes rebooking one step. A no-show is not a lost patient until the practice decides it is — most patients who miss once will come back if someone reaches out the same day. The follow-up should be logged to the same record as the booking, so the front desk sees the whole story when the patient calls back.",
  },
  {
    q: "Does this replace the front desk?",
    a: "No. It replaces the missed call and the empty chair, not the team. The assistant answers every call in seconds, confirms the booking in writing, sends the forms, reminds the patient, and makes rescheduling one step — and hands over with full context whenever a question needs a person, a clinical concern needs the team, or a patient asks for one. Your front desk stays in control of every conversation; the assistant just stops the bookings from dying unanswered.",
  },
  {
    q: "How much does it cost?",
    a: "Contact our sales team for pricing. Pricing depends on your call volume, your locations, and which systems we connect, so we quote after a short demo call, not from a fixed list on this page.",
  },
  {
    q: "How fast can we go live?",
    a: "Most practices go live in about two weeks from briefing: share your services and your script, review the call flows, connect your numbers and calendar, test live with your team, then launch with a tuning window after go-live.",
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
  headline: "Your First Dental Visit Is Booked. What Should Happen Before You Sit in the Chair?",
  description:
    "The first dental visit is booked — but booked is not the same as kept. What a dental practice should do between the booking and the visit: confirm in writing, send the forms and insurance details to complete at home, remind the patient, make rescheduling one step, and follow up the same day on a no-show.",
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
  datePublished: "2026-11-12",
  dateModified: "2026-11-12",
  mainEntityOfPage: "https://devmatesolutions.com/new-patient-prep-dental-usa",
};

const MOMENTS = [
  {
    icon: "fal fa-clipboard-list",
    title: "The forms that arrive at the chair",
    good: "The new patient is booked and the front desk has the slot filled. Everything looks ready for the first visit.",
    dies: "The patient arrives and starts the intake forms at reception — twenty minutes of chair time gone, the next patient waiting, the schedule slipping before the day has started.",
    fix: "Forms sent in writing before the visit, completed at home, so the first visit starts in the chair.",
  },
  {
    icon: "fal fa-id-card",
    title: "The insurance question nobody asked",
    good: "The visit is booked, the patient is in the chair, the exam is done. The front desk asks for the insurance details at checkout.",
    dies: "The coverage was never checked, the plan does not cover what was done, and the patient leaves with a bill they did not expect — and a reason not to come back.",
    fix: "Insurance details collected before the visit, so the patient knows what to expect before treatment starts.",
  },
  {
    icon: "fal fa-bell-slash",
    title: "The reminder that never came",
    good: "The appointment is in the calendar and the team assumes the patient will remember. The chair is held for Tuesday at 10 a.m.",
    dies: "Tuesday at 10 a.m. arrives and the chair is empty. No confirmation, no reminder, no follow-up — and the patient, who simply forgot, books with the practice that called them back.",
    fix: "A confirmation in writing right after booking, a reminder the day before, and a same-day follow-up on a no-show.",
  },
];

const STEPS = [
  { stage: "Step 1", title: "Confirm in writing, right after booking", desc: "Date, time, address, what to bring, and one number to call with questions — sent in writing within minutes of the booking, by the channel the patient used, and held as a real booking in the practice calendar. In Miami, Houston, Dallas-Fort Worth, or anywhere your team works, a patient who books and hears nothing is a patient who may not come.", fix: "A written confirmation, within minutes, in the real calendar.", impact: "The patient knows where to be and when — and the practice knows the slot is real." },
  { stage: "Step 2", title: "Collect the forms and details before the visit", desc: "Intake forms, insurance details, current medications and allergies, and the name of the previous dentist — sent in writing with time to complete at home, and confirmed when they come back. A patient who arrives with the paperwork done sits in the chair on time; a patient who starts it at reception costs the practice the first twenty minutes of the visit.", fix: "Forms and insurance details done at home, before the visit.", impact: "The first visit is about the patient, not the paperwork — and the schedule holds." },
  { stage: "Step 3", title: "Remind, reschedule in one step, follow up the same day", desc: "A reminder the day before, in the patient's local time zone, with the date, time, and address — rescheduling in one step by replying or calling, without a phone queue — and a same-day follow-up when a patient does not show, offering the next available slot. Consent is recorded before any outbound call, and every message carries a tested opt-out. A no-show is not a lost patient until the practice decides it is.", fix: "Reminder, one-step reschedule, same-day follow-up.", impact: "Fewer empty chairs, more kept appointments — and patients who come back." },
];

const NewPatientPrepDentalUsaArticle = () => {
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
        pageTitle="Your First Dental Visit Is Booked. What Should Happen Before You Sit in the Chair?"
        pageDescription="The first dental visit is booked — but booked is not the same as kept. What a dental practice should do between the booking and the visit: confirm in writing, send the forms and insurance details to complete at home, remind the patient, make rescheduling one step, and follow up the same day on a no-show."
        pageUrl="/new-patient-prep-dental-usa"
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
                <div className="ailm-hero-badge"><span className="ailm-hero-dot"></span>USA · Dental Practices</div>
                <h1 className="ailm-hero-headline">The visit is booked. <span className="ailm-red">Will the patient actually show up?</span></h1>
                <p className="ailm-hero-sub">
                  A booked first visit is not a kept visit. Between the booking and the chair sits everything that decides whether the patient arrives ready — the confirmation in writing, the forms completed at home, the insurance details checked, the reminder the day before, and a reschedule that takes one step instead of three phone calls. This is what a dental practice should do in that gap, so the chair is full and the schedule holds.
                </p>
                <div className="ailm-hero-ctas">
                  <a className="ailm-btn-primary" href="https://cal.com/devmate/sixty-onboarding">Book a demo <i className="fal fa-long-arrow-right ml-2"></i></a>
                  <a className="ailm-btn-ghost" href="#moments">See what goes wrong</a>
                </div>
                <div className="ailm-hero-metrics">
                  <div className="ailm-metric"><span className="ailm-metric-num">3 steps</span><span className="ailm-metric-label">Booking To Chair</span></div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric"><span className="ailm-metric-num">Voice first</span><span className="ailm-metric-label">Phone, Not Chat</span></div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric"><span className="ailm-metric-num">1-step</span><span className="ailm-metric-label">Reschedule</span></div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric"><span className="ailm-metric-num">Same day</span><span className="ailm-metric-label">No-Show Follow-Up</span></div>
                </div>
              </div>
            </div>
          </section>

          <section className="ailm-section ailm-section--light" id="answer">
            <div className="container">
              <div className="chatbot-grid-two">
                <div className="chatbot-reveal">
                  <p className="ailm-eyebrow">The direct answer</p>
                  <h2 className="ailm-section-title">Booked is not the same as kept. <span className="ailm-red">The gap decides it.</span></h2>
                  <p style={{ fontSize: 17, lineHeight: 1.7, color: "#4b5563" }}>
                    What should happen between the booking and the first visit is simple: confirm in writing within minutes, send the forms and the insurance details to complete at home, remind the patient the day before, make rescheduling one step, and follow up the same day when a patient does not show. A practice that does those five things keeps more first visits than a practice that books well and then goes quiet — because the patient who is prepared, reminded, and able to reschedule easily is the patient who shows up.
                  </p>
                  <p style={{ fontSize: 17, lineHeight: 1.7, color: "#4b5563" }}>
                    This guide builds on our pieces on{" "}
                    <Link href="/ai-call-assistant-dental-usa">the AI call assistant for dental clinics</Link>,{" "}
                    <Link href="/missed-calls-cost-dental-practice">what a missed call costs a dental practice</Link>,{" "}
                    <Link href="/after-hours-dental-calls-usa">after-hours dental calls</Link>, and{" "}
                    <Link href="/consultation-prep-med-spa-usa">the same gap before a med spa consultation</Link>.
                  </p>
                </div>
                <div className="chatbot-reveal">
                  <div className="speed-answer">
                    <p>
                      <strong>The rule we work to:</strong> a booking is a real booking in a real calendar, or it is a note. No consent record, no outbound call. No reminder, no kept appointment.
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
                <h2 className="ailm-section-title">Three ways a booked visit becomes an empty chair</h2>
                <p className="ailm-section-sub">Each one looks harmless when the booking is made. Each one costs a practice its schedule.</p>
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
                <p className="ailm-eyebrow">The gap, handled</p>
                <h2 className="ailm-section-title">Three steps between the booking and the chair</h2>
                <p className="ailm-section-sub">None of these needs a bigger team — they need a system that does not forget.</p>
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
                <h2 className="ailm-section-title">The first visit starts before the patient arrives</h2>
                <p style={{ fontSize: 17, lineHeight: 1.7, color: "#4b5563", maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
                  Done properly, the patient arrives with the forms done, the insurance details checked, and the visit confirmed in writing — and the practice has the same record in one place, so the front desk, the hygienist, and the dentist all see the same story. The assistant answers every call in seconds, confirms the booking, sends what to bring, reminds the patient, and follows up the same day when a visit is missed. It replaces the missed call and the empty chair, not the front desk. The gap between the booking and the chair is where first visits are kept or lost — and it is the cheapest part of the chain to fix.
                </p>
              </div>
              <p style={{ textAlign: "center", marginTop: 28 }}>
                Related reading:{" "}
                <Link href="/ai-call-assistant-dental-usa">AI Call Assistant for Dental Clinics USA</Link>,{" "}
                <Link href="/missed-calls-cost-dental-practice">What a Missed Call Costs a Dental Practice, and How to Work It Out</Link>,{" "}
                <Link href="/after-hours-dental-calls-usa">After-Hours Dental Calls: What Happens When the Front Desk Goes Home</Link>,{" "}
                <Link href="/consultation-prep-med-spa-usa">Your Consultation Is Booked. What Should Happen Before the Client Walks In?</Link>,{" "}
                <Link href="/ai-call-assistant-aesthetics-usa">AI Call Assistant for Med Spas and Aesthetics Clinics USA</Link>,{" "}
                <Link href="/ai-lead-response-usa">AI Lead Response in the USA: Every New Lead Answered in Seconds</Link>,{" "}
                <Link href="/ai-call-assistant-usa-real-estate">AI Call Assistant for US Real Estate Brokerages</Link>, and{" "}
                <Link href="/choose-ai-call-assistant-usa">How to Choose an AI Call Assistant in the USA</Link>.
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
                  Book a demo and we will map a call flow to your practice — your services, your calendar, and your escalation rules — before anything is built.
                </p>
                <div className="ailm-final-cta-btns">
                  <a className="ailm-btn-primary ailm-btn-white" href="https://cal.com/devmate/sixty-onboarding">
                    Book a demo <i className="fal fa-long-arrow-right ml-2"></i>
                  </a>
                  <Link className="ailm-btn-ghost ailm-btn-ghost--light" href="/ai-call-assistant-dental-usa">
                    See the dental assistant
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

export default NewPatientPrepDentalUsaArticle;
