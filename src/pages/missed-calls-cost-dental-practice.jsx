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
    q: "How do we work out what missed calls cost our practice?",
    a: "Count the missed new-patient calls in a typical week, multiply by the share that would have booked, and multiply that by the value of a new patient to your practice. The formula is simple; the hard part is counting honestly — voicemail alone does not count, because a caller who hangs up without leaving a message never appears in it.",
  },
  {
    q: "Why do new patients not just call back?",
    a: "Because they are usually choosing between two or three practices at once. The caller who reaches a live answer books; the caller who reaches voicemail keeps dialling. By the time a callback happens, the decision is often already made — and it was made with the practice that answered first.",
  },
  {
    q: "When do most dental calls get missed?",
    a: "At lunch, between patients, and after hours. The front desk is busiest exactly when patients call: the lunch-hour enquiry, the evening caller checking tomorrow's availability, the weekend caller with a broken tooth. Those are also the callers most likely to be new patients, not existing ones.",
  },
  {
    q: "Is an AI call assistant the same as an answering service?",
    a: "No. An answering service takes a message. The assistant holds the conversation: it answers from your approved script, books or reschedules into a real calendar, sends the confirmation, and logs everything for your team. The output is a booked appointment, not a note to call back.",
  },
  {
    q: "What does an answered call need to do, to actually win the patient?",
    a: "Three things: answer in seconds, answer the caller's real question — availability, treatment, insurance accepted — from your approved script, and book the appointment before the call ends. A friendly message that still needs a callback has only moved the problem, not solved it.",
  },
  {
    q: "Is AI calling compliant in the United States?",
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
  headline: "What a Missed Call Costs a Dental Practice — and How to Work It Out",
  description:
    "A missed new-patient call is not a missed message; it is usually a patient booked elsewhere. A simple formula for working out what missed calls cost a dental practice, where they happen, and what an answered call must do instead.",
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
  datePublished: "2026-11-03",
  dateModified: "2026-11-03",
  mainEntityOfPage: "https://devmatesolutions.com/missed-calls-cost-dental-practice",
};

const MOMENTS = [
  {
    icon: "fal fa-utensils",
    title: "Lunch hour",
    good: "The working patient finally has a free moment — and calls to book.",
    dies: "The front desk is at lunch too, or covering the phones between patients.",
    fix: "Every lunch-hour call answered live, booked into a real calendar.",
  },
  {
    icon: "fal fa-moon",
    title: "After hours",
    good: "The evening caller checking tomorrow's availability, or the weekend caller with a broken tooth.",
    dies: "Voicemail until Monday morning — by which time the patient has booked elsewhere.",
    fix: "Evening and weekend callers get the same live answer as a weekday caller.",
  },
  {
    icon: "fal fa-user-clock",
    title: "Between patients",
    good: "A caller who needs a reschedule, a question answered, or a first appointment.",
    dies: "The phone rings while the team is chairside, and the caller hangs up without leaving a message.",
    fix: "No call waits for a free pair of hands — the assistant answers in seconds.",
  },
];

const STEPS = [
  { stage: "Step 1", title: "Count the missed calls", desc: "Pull a typical week from your phone system: total missed calls, and how many were new patients rather than existing ones. Count hang-ups too — a caller who leaves no message is still a missed call.", fix: "Use the phone log, not the voicemail inbox.", impact: "Most practices find the real number is higher than they guessed." },
  { stage: "Step 2", title: "Estimate the booking share", desc: "Of the new-patient callers you do reach, how many book? That share — not 100% — is what applies to the missed ones. Be conservative: a low estimate still tells the story.", fix: "Apply your own booking share, not an industry average.", impact: "The maths stays honest, and the result stays believable." },
  { stage: "Step 3", title: "Value a new patient", desc: "Use your own figure: the first visit plus the follow-up care a new patient typically needs in year one. Every practice's number is different, and that is the point.", fix: "Your numbers, your result — no borrowed averages.", impact: "The weekly cost is a figure your team can defend." },
];

const MissedCallsDentalArticle = () => {
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
        pageTitle="What a Missed Call Costs a Dental Practice — and How to Work It Out"
        pageDescription="A missed new-patient call is usually a patient booked elsewhere. A simple formula for working out what missed calls cost a dental practice, the three moments they happen most, and what an answered call must do instead."
        pageUrl="/missed-calls-cost-dental-practice"
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
          .maths-table { width: 100%; border-collapse: collapse; font-size: 16px; line-height: 1.6; color: #1f2937; }
          .maths-table th, .maths-table td { text-align: left; padding: 12px 16px; border-bottom: 1px solid #e5e7eb; }
          .maths-table th { color: #6b7280; font-size: 13px; text-transform: uppercase; letter-spacing: .04em; }
          .maths-table tr:last-child td { border-bottom: none; font-weight: 700; }
        `}</style>
      </Head>
      <Wrapper>
        <HeaderThree />
        <main className="ailm-page">
          <section className="ailm-hero">
            <div className="container">
              <div className="ailm-hero-header-wrap">
                <div className="ailm-hero-badge"><span className="ailm-hero-dot"></span>USA · Dental Clinics</div>
                <h1 className="ailm-hero-headline">What a missed call costs a dental practice — and how to <span className="ailm-red">work it out</span></h1>
                <p className="ailm-hero-sub">
                  A missed new-patient call is not a missed message. It is usually a patient who has just booked with the practice that answered first. The cost is not the phone bill — it is the appointment that never happened, and the patient who never came back.
                </p>
                <div className="ailm-hero-ctas">
                  <a className="ailm-btn-primary" href="https://cal.com/devmate/sixty-onboarding">Book a demo <i className="fal fa-long-arrow-right ml-2"></i></a>
                  <a className="ailm-btn-ghost" href="#formula">Work out your number</a>
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

          <section className="ailm-section ailm-section--light" id="formula">
            <div className="container">
              <div className="chatbot-grid-two">
                <div className="chatbot-reveal">
                  <p className="ailm-eyebrow">The direct answer</p>
                  <h2 className="ailm-section-title">Missed new-patient calls × booking share × patient value = <span className="ailm-red">the weekly cost.</span></h2>
                  <p style={{ fontSize: 17, lineHeight: 1.7, color: "#4b5563" }}>
                    Three numbers, all from your own practice. Count the missed new-patient calls in a typical week, apply the share of reached callers who book, and multiply by what a new patient is worth to you. Nothing in the formula needs an industry average — and that is what makes the result hard to argue with.
                  </p>
                  <p style={{ fontSize: 17, lineHeight: 1.7, color: "#4b5563" }}>
                    The companion to this article is our dental call-assistant page:{" "}
                    <Link href="/ai-call-assistant-dental-usa">AI Call Assistant for Dental Clinics USA</Link> — and the cross-niche version,{" "}
                    <Link href="/ai-lead-response-usa">AI Lead Response USA</Link>. After hours are covered in{" "}
                    <Link href="/after-hours-dental-calls-usa">after-hours dental calls</Link>.
                  </p>
                </div>
                <div className="chatbot-reveal">
                  <div className="speed-answer">
                    <p>
                      <strong>An illustrative example, not an average:</strong> 20 missed new-patient calls in a week, half of whom would have booked, is 10 lost appointments a week — before any of those patients' follow-up care. Put your own patient value on those 10 appointments and the weekly cost writes itself. Replace each figure with your own and the maths still works.
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
                <p className="ailm-section-sub">The front desk is busiest exactly when patients call. That overlap is the whole problem.</p>
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
                <p className="ailm-eyebrow">Your own numbers</p>
                <h2 className="ailm-section-title">Work it out in three steps</h2>
                <p className="ailm-section-sub">Ten minutes with your phone log beats any borrowed statistic.</p>
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
                  A friendly message that still needs a callback has only moved the problem. The call must answer the caller's real question — availability, treatment, insurance accepted — from your approved script, book the appointment into a real calendar, send the confirmation, and log everything for your team. That is the difference between an answering service and an assistant, and it is the difference between a caller who books and a caller who keeps dialling.
                </p>
              </div>
              <p style={{ textAlign: "center", marginTop: 28 }}>
                See it in practice:{" "}
                <Link href="/ai-call-assistant-dental-usa">AI Call Assistant for Dental Clinics USA</Link>,{" "}
                <Link href="/ai-lead-response-usa">AI Lead Response USA</Link>,{" "}
                <Link href="/ai-call-assistant-usa-real-estate">AI Call Assistant for US Real Estate</Link>, and{" "}
                <Link href="/ai-call-assistant-aesthetics-usa">AI Call Assistant for Med Spas and Aesthetics Clinics USA</Link>, and{" "}
                <Link href="/missed-calls-cost-med-spa">What a Missed Call Costs a Med Spa</Link>.
                <Link href="/ai-call-assistant-aesthetics-usa">AI Call Assistant for Med Spas and Aesthetics Clinics USA</Link>, and for real estate, see{" "}
                <Link href="/missed-calls-cost-real-estate-usa">What a Missed Call Costs a US Real Estate Team</Link>, and after hours, see{" "}
                <Link href="/after-hours-dental-calls-usa">After-Hours Dental Calls: What Happens When the Front Desk Goes Home</Link>.              </p>
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
                  Book a demo and we will run your own missed-call numbers through the formula with you —
                  then show the assistant answering, booking, and logging a live test call.
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

export default MissedCallsDentalArticle;

