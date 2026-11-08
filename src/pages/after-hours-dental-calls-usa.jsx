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
    q: "What should an after-hours answer do that voicemail cannot?",
    a: "Three things: answer the caller's real question — availability, treatment, insurance accepted — from your approved script, book the appointment into a real calendar, and send the confirmation. A friendly message that still needs a callback has only moved the problem. The output of an answered call is a booked appointment, not a note to call back.",
  },
  {
    q: "What happens when a caller is in pain, or it sounds urgent?",
    a: "The call takes the details calmly, offers the next available slot, and routes the caller to the on-call team under your practice's own escalation script. Anything medical or urgent goes to the team — the assistant never diagnoses, never gives medical advice, and never guesses. The caller is heard and helped in the moment, and the team sees the full record when they are back.",
  },
  {
    q: "Can it book a new patient, not just take a message?",
    a: "Yes — from your approved script. New or existing patient, the reason for the visit, insurance accepted, and the next available slot, then the booking goes into a real calendar and the confirmation goes out. A new patient who calls on Saturday morning decides on the spot; a booking made on that call is a patient kept.",
  },
  {
    q: "What about reschedules and cancellations after hours?",
    a: "They are handled on the call. The appointment moves, the freed slot is offered to the waitlist, and both patients get a confirmation. A reschedule that waits until Monday is a slot that stays blocked and a Tuesday gap nobody can fill; the same reschedule handled on Saturday evening keeps the diary full.",
  },
  {
    q: "Does it work in the evenings and at weekends?",
    a: "Yes — nights, weekends, and lunch hours included. The calls that decide the diary arrive exactly when the front desk is not there: the toothache at 6 p.m., the new patient on Saturday morning, the reschedule at lunch. Those callers get the same live answer as a weekday caller.",
  },
  {
    q: "How does it handle consent and do-not-call rules?",
    a: "It is built with consent, opt-out, and do-not-call screening in mind: outbound contact is screened against do-not-call lists, consent is recorded, every caller can opt out, and calls respect the caller's local time zone. Your team reviews and signs off the scripts and calling rules before anything goes live. Patient records stay in your own systems.",
  },
  {
    q: "How much does it cost?",
    a: "Contact our sales team for pricing. Pricing depends on your call volume, your locations, and which systems we connect, so we quote after a short demo call, not from a fixed list on this page.",
  },
  {
    q: "How fast can we go live?",
    a: "Most practices go live in about two weeks from briefing: share your services and your script, review the call flows, connect your phone numbers and calendar, test live with your team, then launch with a tuning window after go-live.",
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
  headline: "After-Hours Dental Calls: What Happens When the Front Desk Goes Home",
  description:
    "Dental calls do not stop at 5 p.m. What an after-hours answer must do for a US dental practice: take the toothache call seriously, book the new patient, handle the reschedule — and route anything clinical to the team, never guess.",
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
  datePublished: "2026-11-08",
  dateModified: "2026-11-08",
  mainEntityOfPage: "https://devmatesolutions.com/after-hours-dental-calls-usa",
};

const MOMENTS = [
  {
    icon: "fal fa-tooth",
    title: "The 6 p.m. toothache",
    good: "A caller in pain rings at 6 p.m., when the front desk has gone home — and needs help tonight, not tomorrow.",
    dies: "Voicemail says to call back tomorrow, and the caller books with the next practice on their list instead.",
    fix: "Answer in seconds, take the details, offer the next available slot — and route anything urgent to the on-call team.",
  },
  {
    icon: "fal fa-calendar-plus",
    title: "The Saturday morning new patient",
    good: "A new patient calls on Saturday morning, ready to book — and decides on the spot, while they are thinking about it.",
    dies: "The message waits until Monday, and by then the patient has booked elsewhere.",
    fix: "New-patient booking on the call, from your approved script, with the confirmation sent before the call ends.",
  },
  {
    icon: "fal fa-clock",
    title: "The lunch-hour reschedule",
    good: "An existing patient calls at lunch to move Tuesday's appointment — a small ask, handled in a minute.",
    dies: "The message is missed, the slot stays blocked, and Tuesday becomes a gap nobody can fill.",
    fix: "Reschedule on the call, free the slot, offer it to the waitlist, and confirm both patients.",
  },
];

const STEPS = [
  { stage: "Step 1", title: "Answer in seconds, day and night", desc: "Every after-hours call gets a live answer in seconds — nights, weekends, and lunch hours included. No voicemail for new patients, no message slip that needs a callback on Monday.", fix: "A live answer, whenever the phone rings.", impact: "The caller who would have dialled the next practice books with you instead." },
  { stage: "Step 2", title: "Qualify from your approved script", desc: "New or existing patient, the reason for the visit, insurance accepted, and the next available slot — all from the script your team approved. Any medical question, or anything that sounds urgent, is routed to the team under your escalation script, never diagnosed or guessed at on the call.", fix: "Your script, your rules — clinical questions go to the team.", impact: "Every caller is helped, and nothing clinical is improvised." },
  { stage: "Step 3", title: "Book, confirm, remind", desc: "The appointment goes into a real calendar, the confirmation goes out before the call ends, and a reminder goes out before the visit. Everything is logged where your team can see it, so Monday morning starts with a diary that is already full — not a voicemail inbox to work through.", fix: "Booked, confirmed, and logged — not messaged.", impact: "Chairs fill with patients who actually arrive." },
];

const AfterHoursDentalCallsUsaArticle = () => {
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
        pageTitle="After-Hours Dental Calls: What Happens When the Front Desk Goes Home"
        pageDescription="Dental calls do not stop at 5 p.m. What an after-hours answer must do for a US dental practice: take the toothache call seriously, book the new patient, handle the reschedule — and route anything clinical to the team, never guess."
        pageUrl="/after-hours-dental-calls-usa"
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
                <div className="ailm-hero-badge"><span className="ailm-hero-dot"></span>USA · Dental</div>
                <h1 className="ailm-hero-headline">The front desk goes home at five. <span className="ailm-red">The phones do not.</span></h1>
                <p className="ailm-hero-sub">
                  For dental practices in Miami, Houston, Dallas-Fort Worth, and across Florida and Texas, the calls that decide the diary arrive after hours — the toothache at 6 p.m., the new patient on Saturday morning, the reschedule at lunch. A voice-first assistant answers in seconds, books into a real calendar, and routes anything clinical to the team.
                </p>
                <div className="ailm-hero-ctas">
                  <a className="ailm-btn-primary" href="https://cal.com/devmate/sixty-onboarding">Book a demo <i className="fal fa-long-arrow-right ml-2"></i></a>
                  <a className="ailm-btn-ghost" href="#moments">See where patients are lost</a>
                </div>
                <div className="ailm-hero-metrics">
                  <div className="ailm-metric"><span className="ailm-metric-num">Seconds</span><span className="ailm-metric-label">To First Answer</span></div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric"><span className="ailm-metric-num">24 / 7</span><span className="ailm-metric-label">Nights &amp; Weekends</span></div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric"><span className="ailm-metric-num">1 call</span><span className="ailm-metric-label">1 Booked Appointment</span></div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric"><span className="ailm-metric-num">0 voicemail</span><span className="ailm-metric-label">For New Patients</span></div>
                </div>
              </div>
            </div>
          </section>

          <section className="ailm-section ailm-section--light" id="answer">
            <div className="container">
              <div className="chatbot-grid-two">
                <div className="chatbot-reveal">
                  <p className="ailm-eyebrow">The direct answer</p>
                  <h2 className="ailm-section-title">An after-hours caller is not leaving a message. <span className="ailm-red">They are choosing a practice.</span></h2>
                  <p style={{ fontSize: 17, lineHeight: 1.7, color: "#4b5563" }}>
                    A caller in pain at 6 p.m. does not wait until tomorrow — they dial the next practice. A new patient who calls on Saturday morning decides on the spot, while they are thinking about it. An existing patient who calls at lunch to move an appointment needs one minute, not a message that waits until Monday. In each case the practice that answers first usually wins the patient.
                  </p>
                  <p style={{ fontSize: 17, lineHeight: 1.7, color: "#4b5563" }}>
                    The companion to this article is our dental call-assistant page:{" "}
                    <Link href="/ai-call-assistant-dental-usa">AI Call Assistant for Dental Clinics USA</Link> — and the maths behind it, in{" "}
                    <Link href="/missed-calls-cost-dental-practice">what a missed call costs a dental practice</Link>. The cross-niche version is{" "}
                    <Link href="/ai-lead-response-usa">AI Lead Response USA</Link>.
                  </p>
                </div>
                <div className="chatbot-reveal">
                  <div className="speed-answer">
                    <p>
                      <strong>The rule we work to:</strong> every after-hours call answered in seconds, every caller booked or given a named next step, and every clinical question routed to the team — never a diagnosis, never a guess, never a voicemail for a new patient.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="ailm-section" id="moments">
            <div className="container">
              <div className="ailm-section-header chatbot-reveal">
                <p className="ailm-eyebrow">Where they happen</p>
                <h2 className="ailm-section-title">The three moments most dental calls are missed</h2>
                <p className="ailm-section-sub">The front desk is busiest — or gone — exactly when patients call. That overlap is the whole problem.</p>
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
                <h2 className="ailm-section-title">Three habits that keep the diary full after hours</h2>
                <p className="ailm-section-sub">None of these needs a bigger front desk — they need a system that answers when the team cannot.</p>
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
                <p className="ailm-eyebrow">What the answer must do</p>
                <h2 className="ailm-section-title">An answered call has to book — not just be polite</h2>
                <p style={{ fontSize: 17, lineHeight: 1.7, color: "#4b5563", maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
                  A friendly message that still needs a callback has only moved the problem. The call must answer the caller&apos;s real question — availability, treatment, insurance accepted — from your approved script, book the appointment into a real calendar, send the confirmation, and log everything for your team. Anything medical, or anything that sounds urgent, goes to the team under your escalation script — the assistant never diagnoses and never guesses. That is the difference between an answering service and an assistant, and it is the difference between a caller who books and a caller who keeps dialling.
                </p>
              </div>
              <p style={{ textAlign: "center", marginTop: 28 }}>
                See it in practice:{" "}
                <Link href="/ai-call-assistant-dental-usa">AI Call Assistant for Dental Clinics USA</Link>,{" "}
                <Link href="/ai-lead-response-usa">AI Lead Response USA</Link>,{" "}
                <Link href="/missed-calls-cost-dental-practice">What a Missed Call Costs a Dental Practice</Link>, and{" "}
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
                  Book a demo and we will map an after-hours call flow to your practice — your services, your calendar, and your escalation script — before anything is built.
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

export default AfterHoursDentalCallsUsaArticle;
