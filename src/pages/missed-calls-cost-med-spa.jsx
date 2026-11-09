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
    q: "How do we work out what missed calls cost our med spa?",
    a: "Count the missed new-client calls in a typical week, multiply by the share that would have booked, and multiply that by the value of a new client to your clinic. The formula is simple; the hard part is counting honestly — voicemail alone does not count, because a caller who hangs up without leaving a message never appears in it.",
  },
  {
    q: "When do most med spa calls get missed?",
    a: "At lunch, between treatments, and after hours. The front desk is busiest exactly when clients call: the lunch-hour enquiry, the evening caller checking availability, the weekend caller ready to book a consultation. Those are also the callers most likely to be new clients, not existing ones.",
  },
  {
    q: "Is an AI call assistant the same as an answering service?",
    a: "No. An answering service takes a message. The assistant holds the conversation: it answers from your approved script, books or reschedules the consultation into a real calendar, sends the confirmation, and logs everything for your team. The output is a booked consultation, not a note to call back.",
  },
  {
    q: "What does an answered call need to do, to actually win the client?",
    a: "Three things: answer in seconds, answer the caller's real question — treatments offered, availability, what a consultation involves — from your approved script, and book the consultation before the call ends. A friendly message that still needs a callback has only moved the problem, not solved it.",
  },
  {
    q: "What about callers who only want prices?",
    a: "Answer them honestly from your approved script, then offer the consultation as the next step. A price-only answer with no booking offer loses the caller; a price answer that ends in a booked consultation keeps them. Your team decides exactly what the assistant may quote, so nothing is promised that the clinic would not promise itself.",
  },
  {
    q: "Is AI calling compliant in the United States?",
    a: "It is built with consent, opt-out, and do-not-call screening in mind: outbound contact is screened against do-not-call lists, consent is recorded, every caller can opt out, and calls respect the caller's local time zone. Your team reviews and signs off the scripts and calling rules before anything goes live. Client records stay in your own systems, and any medical question is routed to your team.",
  },
  {
    q: "How much does it cost?",
    a: "Contact our sales team for pricing. Pricing depends on your call volume, your locations, and which systems we connect, so we quote after a short demo call, not from a fixed list on this page.",
  },
  {
    q: "How fast can we go live?",
    a: "Most clinics go live in about two weeks from briefing: share your treatments and your script, review the call flows, connect your phone numbers and calendar, test live with your team, then launch with a tuning window after go-live.",
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
  headline: "What a Missed Call Costs a Med Spa — and How to Work It Out",
  description:
    "A missed new-client call is not a missed message; it is usually a client booked elsewhere. A simple formula for working out what missed calls cost a med spa, where they happen, and what an answered call must do instead.",
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
  datePublished: "2026-11-06",
  dateModified: "2026-11-06",
  mainEntityOfPage: "https://devmatesolutions.com/missed-calls-cost-med-spa",
};

const MOMENTS = [
  {
    icon: "fal fa-utensils",
    title: "Lunch hour",
    good: "The working client finally has a free moment — and calls to book a consultation.",
    dies: "The front desk is at lunch too, or covering the phones between treatments.",
    fix: "Every lunch-hour call answered live, booked into a real calendar.",
  },
  {
    icon: "fal fa-moon",
    title: "After hours",
    good: "The evening caller checking availability, or the weekend caller ready to book.",
    dies: "Voicemail until Monday morning — by which time the client has booked elsewhere.",
    fix: "Evening and weekend callers get the same live answer as a weekday caller.",
  },
  {
    icon: "fal fa-user-clock",
    title: "Between treatments",
    good: "A caller who needs a reschedule, a question answered, or a first consultation.",
    dies: "The phone rings while the team is with clients, and the caller hangs up without leaving a message.",
    fix: "No call waits for a free pair of hands — the assistant answers in seconds.",
  },
];

const STEPS = [
  { stage: "Step 1", title: "Count the missed calls", desc: "Pull a typical week from your phone system: total missed calls, and how many were new clients rather than existing ones. Count hang-ups too — a caller who leaves no message is still a missed call.", fix: "Use the phone log, not the voicemail inbox.", impact: "Most clinics find the real number is higher than they guessed." },
  { stage: "Step 2", title: "Estimate the booking share", desc: "Of the new-client callers you do reach, how many book? That share — not 100% — is what applies to the missed ones. Be conservative: a low estimate still tells the story.", fix: "Apply your own booking share, not an industry average.", impact: "The maths stays honest, and the result stays believable." },
  { stage: "Step 3", title: "Value a new client", desc: "Use your own figure: the first consultation plus the follow-up treatments a new client typically books in year one. Every clinic's number is different, and that is the point.", fix: "Your numbers, your result — no borrowed averages.", impact: "The weekly cost is a figure your team can defend." },
];

const MissedCallsMedSpaArticle = () => {
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
        pageTitle="What a Missed Call Costs a Med Spa — and How to Work It Out"
        pageDescription="A missed new-client call is usually a client booked elsewhere. A simple formula for working out what missed calls cost a med spa, the three moments they happen most, and what an answered call must do instead."
        pageUrl="/missed-calls-cost-med-spa"
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
                <div className="ailm-hero-badge"><span className="ailm-hero-dot"></span>USA · Med Spas &amp; Aesthetics Clinics</div>
                <h1 className="ailm-hero-headline">What a missed call costs a med spa — and how to <span className="ailm-red">work it out</span></h1>
                <p className="ailm-hero-sub">
                  A missed new-client call is not a missed message. It is usually a client who has just booked with the clinic that answered first. The cost is not the phone bill — it is the consultation that never happened, and the client who never came back. For med spas in Miami, Houston, Dallas-Fort Worth, and across Florida and Texas, that cost repeats every week the phones go unanswered.
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
                  <div className="ailm-metric"><span className="ailm-metric-num">1 call</span><span className="ailm-metric-label">1 Booked Consultation</span></div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric"><span className="ailm-metric-num">0 voicemail</span><span className="ailm-metric-label">For New Clients</span></div>
                </div>
              </div>
            </div>
          </section>

          <section className="ailm-section ailm-section--light" id="formula">
            <div className="container">
              <div className="chatbot-grid-two">
                <div className="chatbot-reveal">
                  <p className="ailm-eyebrow">The direct answer</p>
                  <h2 className="ailm-section-title">Missed new-client calls × booking share × client value = <span className="ailm-red">the weekly cost.</span></h2>
                  <p style={{ fontSize: 17, lineHeight: 1.7, color: "#4b5563" }}>
                    Three numbers, all from your own clinic. Count the missed new-client calls in a typical week, apply the share of reached callers who book, and multiply by what a new client is worth to you. Nothing in the formula needs an industry average — and that is what makes the result hard to argue with.
                  </p>
                  <p style={{ fontSize: 17, lineHeight: 1.7, color: "#4b5563" }}>
                    The companion to this article is our med spa call-assistant page:{" "}
                    <Link href="/ai-call-assistant-aesthetics-usa">AI Call Assistant for Med Spas and Aesthetics Clinics USA</Link> — and the cross-niche version,{" "}
                    <Link href="/ai-lead-response-usa">AI Lead Response USA</Link>. The same maths, worked for dental practices, is in{" "}
                    <Link href="/missed-calls-cost-dental-practice">what a missed call costs a dental practice</Link>.
                  </p>
                </div>
                <div className="chatbot-reveal">
                  <div className="speed-answer">
                    <p>
                      <strong>An illustrative example, not an average:</strong> 16 missed new-client calls in a week, half of whom would have booked, is 8 lost consultations a week — before any of those clients' follow-up treatments. Put your own client value on those 8 consultations and the weekly cost writes itself. Replace each figure with your own and the maths still works.
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
                <h2 className="ailm-section-title">The three moments most med spa calls are missed</h2>
                <p className="ailm-section-sub">The front desk is busiest exactly when clients call. That overlap is the whole problem.</p>
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
                  A friendly message that still needs a callback has only moved the problem. The call must answer the caller's real question — treatments offered, availability, what a consultation involves — from your approved script, book the consultation into a real calendar, send the confirmation, and log everything for your team. That is the difference between an answering service and an assistant, and it is the difference between a caller who books and a caller who keeps dialling.
                </p>
              </div>
              <p style={{ textAlign: "center", marginTop: 28 }}>
                See it in practice:{" "}
                <Link href="/ai-call-assistant-aesthetics-usa">AI Call Assistant for Med Spas and Aesthetics Clinics USA</Link>,{" "}
                <Link href="/ai-lead-response-usa">AI Lead Response USA</Link>,{" "}
                <Link href="/ai-call-assistant-dental-usa">AI Call Assistant for Dental Clinics USA</Link>, and{" "}
                <Link href="/after-hours-med-spa-enquiries-usa">After-Hours Med Spa Enquiries</Link>, and{" "}
                <Link href="/after-first-reply-med-spa-usa">After the First Reply: What a Med Spa Does With an After-Hours Enquiry</Link>.
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
                  Book a demo and we will run your own missed-call numbers through the formula with you —
                  then show the assistant answering, booking, and logging a live test call.
                </p>
                <div className="ailm-final-cta-btns">
                  <a className="ailm-btn-primary ailm-btn-white" href="https://cal.com/devmate/sixty-onboarding">
                    Book a demo <i className="fal fa-long-arrow-right ml-2"></i>
                  </a>
                  <Link className="ailm-btn-ghost ailm-btn-ghost--light" href="/ai-call-assistant-aesthetics-usa">
                    See the med spa assistant
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

export default MissedCallsMedSpaArticle;
