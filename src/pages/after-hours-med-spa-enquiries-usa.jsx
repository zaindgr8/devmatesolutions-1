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
    q: "When do med spa enquiries actually arrive?",
    a: "Often after hours: the evening caller checking prices and availability, the weekend caller ready to book a consultation, the lunch-hour caller squeezing in a question between meetings. A med spa that only answers during treatment hours is only staffed for part of its own demand — and the rest of it is answered by whichever clinic replies first.",
  },
  {
    q: "Why is a fast after-hours reply worth more than a Monday callback?",
    a: "Because a caller comparing med spas is usually choosing between two or three at once. By Monday morning they have usually had a reply, a consultation booking, or both — from someone else. Speed is not a nice-to-have in the evening; it is the difference between being the first conversation and being a follow-up to one that already happened.",
  },
  {
    q: "Is an AI call assistant the same as an answering service?",
    a: "No. An answering service takes a message. The assistant holds the conversation: it answers from your approved script, books or reschedules the consultation into a real calendar, sends the confirmation, and logs everything for your team. The output is a booked consultation, not a note to call back.",
  },
  {
    q: "What should an after-hours first answer do?",
    a: "Three things: answer in seconds, answer the caller's real question — treatments offered, availability, what a consultation involves — from your approved script, and book the consultation before the call ends. A friendly message that still needs a callback has only moved the problem, not solved it.",
  },
  {
    q: "What about callers who only want prices?",
    a: "Answer them honestly from your approved script, then offer the consultation as the next step. A price-only answer with no booking offer loses the caller; a price answer that ends in a booked consultation keeps them. Your team decides exactly what the assistant may quote, so nothing is promised that the clinic would not promise itself.",
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
  headline: "After-Hours Enquiries: Why Med Spas Lose Bookings When the Phones Go Unanswered",
  description:
    "Med spa enquiries arrive in the evening, at weekends, and at lunch. What an after-hours answer must do, why a message is not a booking, and how a voice-first assistant turns evening callers into booked consultations.",
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
  mainEntityOfPage: "https://devmatesolutions.com/after-hours-med-spa-enquiries-usa",
};

const MOMENTS = [
  {
    icon: "fal fa-moon",
    title: "The evening caller",
    good: "A caller finishes work and rings to ask about treatments and availability — often ready to book.",
    dies: "Voicemail until morning — by which time the caller has booked with the clinic that answered.",
    fix: "Every evening call answered live, with the consultation booked before the call ends.",
  },
  {
    icon: "fal fa-calendar-week",
    title: "The weekend caller",
    good: "Weekends are when clients are free to think about themselves — so weekend callers are often the most motivated ones.",
    dies: "A weekend enquiry answered on Monday reads as a clinic that is closed when clients are deciding.",
    fix: "Weekend callers get a consultation booked, not a promise to call back.",
  },
  {
    icon: "fal fa-user-clock",
    title: "The lunch-hour caller",
    good: "A caller squeezing a question in between meetings, with ten minutes to decide.",
    dies: "The phone rings while the team is with clients, and the caller hangs up without leaving a message.",
    fix: "No call waits for a free pair of hands — the assistant answers in seconds.",
  },
];

const STEPS = [
  { stage: "Step 1", title: "Answer the call, not the voicemail", desc: "The first answer names the treatment or question, gives one useful answer from your approved script, and offers a consultation time. A message that needs a callback is a delay wearing a friendly voice.", fix: "One useful answer, one booked consultation, every call.", impact: "The caller stops comparing and starts planning their visit." },
  { stage: "Step 2", title: "Book before the call ends", desc: "Availability, consultation times, and confirmation all happen inside the same call. The caller hangs up with a booking, not with a hope that someone will ring back.", fix: "Calendar booking inside the call, confirmation sent at once.", impact: "No-shows drop, because the booking is real before the call ends." },
  { stage: "Step 3", title: "Keep one log", desc: "Every call, booking, and reschedule is logged where your team already works — so Monday morning starts with a booked diary, not a voicemail inbox to work through.", fix: "One log for every call, every hour.", impact: "Your team follows up on booked clients, not on missed messages." },
];

const AfterHoursMedSpaArticle = () => {
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
        pageTitle="After-Hours Enquiries for Med Spas and Aesthetics Clinics USA"
        pageDescription="Med spa enquiries arrive in the evening, at weekends, and at lunch. What an after-hours answer must do, why a message is not a booking, and how a voice-first assistant turns evening callers into booked consultations."
        pageUrl="/after-hours-med-spa-enquiries-usa"
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
                <h1 className="ailm-hero-headline">Your clients do not stop calling at closing time. <span className="ailm-red">Your phones should not stop answering.</span></h1>
                <p className="ailm-hero-sub">
                  The evening caller checking treatments, the weekend caller ready to book a consultation, the lunch-hour caller with ten minutes to decide — these are not edge cases for a med spa. They are a large share of the demand, and they arrive exactly when the team is with clients or gone home.
                </p>
                <div className="ailm-hero-ctas">
                  <a className="ailm-btn-primary" href="https://cal.com/devmate/sixty-onboarding">Book a demo <i className="fal fa-long-arrow-right ml-2"></i></a>
                  <a className="ailm-btn-ghost" href="#moments">See when callers ring</a>
                </div>
                <div className="ailm-hero-metrics">
                  <div className="ailm-metric"><span className="ailm-metric-num">Seconds</span><span className="ailm-metric-label">To First Answer</span></div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric"><span className="ailm-metric-num">Evenings</span><span className="ailm-metric-label">Peak Enquiry Hours</span></div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric"><span className="ailm-metric-num">Weekends</span><span className="ailm-metric-label">Peak Booking Intent</span></div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric"><span className="ailm-metric-num">1 call</span><span className="ailm-metric-label">1 Booked Consultation</span></div>
                </div>
              </div>
            </div>
          </section>

          <section className="ailm-section ailm-section--light" id="answer">
            <div className="container">
              <div className="chatbot-grid-two">
                <div className="chatbot-reveal">
                  <p className="ailm-eyebrow">The direct answer</p>
                  <h2 className="ailm-section-title">After-hours enquiries are lost on Monday morning — <span className="ailm-red">not on Friday night.</span></h2>
                  <p style={{ fontSize: 17, lineHeight: 1.7, color: "#4b5563" }}>
                    The enquiry itself is rarely the problem. The problem is the gap between the enquiry and the first useful answer. A caller who rings on Friday evening and hears nothing until Monday has spent the weekend talking to clinics that did answer — and the Monday callback lands as a follow-up to a decision that is already forming.
                  </p>
                  <p style={{ fontSize: 17, lineHeight: 1.7, color: "#4b5563" }}>
                    This article follows our med spa call-assistant page,{" "}
                    <Link href="/ai-call-assistant-aesthetics-usa">AI Call Assistant for Med Spas and Aesthetics Clinics USA</Link>, and the cross-niche{" "}
                    <Link href="/ai-lead-response-usa">AI Lead Response USA</Link> page — and it pairs with our dental article on{" "}
                    <Link href="/missed-calls-cost-dental-practice">what a missed call costs a dental practice</Link>.
                  </p>
                </div>
                <div className="chatbot-reveal">
                  <div className="speed-answer">
                    <p>
                      <strong>The rule we work to:</strong> every call gets answered in seconds, the caller's real question is answered from your approved script, and the consultation is booked before the call ends. That answer goes out whether it is 8pm, Saturday, or a holiday.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="ailm-section" id="moments">
            <div className="container">
              <div className="ailm-section-header chatbot-reveal">
                <p className="ailm-eyebrow">When they ring</p>
                <h2 className="ailm-section-title">Three moments a med spa is usually busy — and callers are not waiting</h2>
                <p className="ailm-section-sub">If your answer window is treatment hours, these are the callers you never hear from.</p>
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
                <h2 className="ailm-section-title">Three habits that keep after-hours callers booked</h2>
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
                  The worry we hear most is that answering at all hours means calling anyone, any time. It does not. Outbound contact is screened against do-not-call lists, consent is recorded, every caller can opt out, and calls respect the caller's local time zone. Your team approves the scripts and the calling rules before anything goes live, and every call is logged where your team can see it. The clinic stays in control — it just stops being silent when its clients are deciding.
                </p>
              </div>
              <p style={{ textAlign: "center", marginTop: 28 }}>
                See it in practice:{" "}
                <Link href="/ai-call-assistant-aesthetics-usa">AI Call Assistant for Med Spas and Aesthetics Clinics USA</Link>,{" "}
                <Link href="/ai-lead-response-usa">AI Lead Response USA</Link>,{" "}
                <Link href="/after-first-reply-med-spa-usa">After the First Reply: What a Med Spa Does With an After-Hours Enquiry</Link>,{" "}
                <Link href="/ai-call-assistant-dental-usa">AI Call Assistant for Dental Clinics USA</Link>, and{" "}
                <Link href="/ai-call-assistant-usa-real-estate">AI Call Assistant for US Real Estate</Link>.
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
                  Book a demo and we will show the assistant answering, booking, and logging a live test call —
                  the same call your evening and weekend callers would get.
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

export default AfterHoursMedSpaArticle;
