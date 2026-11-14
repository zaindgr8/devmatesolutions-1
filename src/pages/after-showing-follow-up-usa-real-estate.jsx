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
    q: "What should happen right after a showing?",
    a: "A voice call within the hour: ask what the buyer liked, what worried them, and what would change their mind — while the home is still fresh in their mind. Then name the next step before hanging up — a second showing with a time, a pre-approval check, or the offer — and confirm it in writing the same day. A showing with no follow-up is a showing that never happened: the buyer will tour three more homes by the weekend, and the team that called first is the team they remember.",
  },
  {
    q: "How fast should the follow-up call be?",
    a: "Within the hour, while the buyer is still thinking about the home — and the same day at the latest. A Saturday showing needs a Saturday call, not a Monday one: by Monday the buyer has a favourite, and it may not be yours. The call is a voice call, not a text: a text gets a thumbs-up or nothing, and neither tells you what the buyer actually thought.",
  },
  {
    q: "What should the call actually ask?",
    a: "Three things, in the buyer's own words: what they liked, what worried them, and what would change their mind. Then the practical ones: their timing, whether they are pre-approved, and whether they are touring with another agent. The answers go into the CRM the same day — Follow Up Boss, kvCORE, or your own system — so the next person who calls knows the story and never asks the same question twice.",
  },
  {
    q: "What if the buyer says they are still thinking?",
    a: "Ask what would decide it — and name a date to speak again. A buyer who is still thinking needs one useful fact, not pressure: the answer to the worry they named, a comparable sale, or a second look at the part of the home they liked most. 'We will be in touch' is not a next step. A date, a fact, and a reason to talk again — that is a next step.",
  },
  {
    q: "What if the buyer wants a second showing?",
    a: "Book it on the call, with a time, before hanging up. A second showing promised and never booked is a slot another buyer takes. Bring the answers to the worries the buyer named on the first showing — the noise at a different time of day, the storage, the commute — and confirm the time in writing the same day, so the showing is in a real calendar and not in someone's head.",
  },
  {
    q: "How do you keep consent and do-not-call screening straight?",
    a: "Call only the numbers the buyer gave for this purpose, respect an opt-out the moment it is given, and keep the record in the CRM so no one calls a number that asked to be left alone. Call in the buyer's local time zone — a buyer in Miami, Houston or Dallas-Fort Worth is called when it suits them, not when it suits the office. Consent is checked before the call, not assumed after it.",
  },
  {
    q: "How much does it cost?",
    a: "Contact our sales team for pricing. Pricing depends on your lead volume, your markets, and which systems we connect, so we quote after a short demo call, not from a fixed list on this page.",
  },
  {
    q: "How fast can we go live?",
    a: "Most teams go live in about two weeks from briefing: share your listings and your scripts, review the qualification and follow-up flows, connect your phone numbers and your CRM, test live with your team, then launch with a tuning window after go-live.",
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
  headline: "After the Showing: What a Real Estate Team Should Do Before the Buyer Moves On",
  description:
    "The showing went well — now what? The follow-up call within the hour, the feedback while it is fresh, the second showing or the offer — and the three ways a good showing quietly dies.",
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
  datePublished: "2026-11-14",
  dateModified: "2026-11-14",
  mainEntityOfPage: "https://devmatesolutions.com/after-showing-follow-up-usa-real-estate",
};

const MOMENTS = [
  {
    icon: "fal fa-clock",
    title: "The 'we'll think about it' silence",
    good: "The showing went well. The buyer liked the kitchen, the light, the street — and said they would think about it. The agent says the team will be in touch on Monday.",
    dies: "By Monday the buyer has toured three more homes over the weekend and has a favourite — and it is not yours. The home they liked on Saturday is now the home they compare everything else against, and nobody called while it was still the one they were thinking about.",
    fix: "Call within the hour, while the home is still the one they are thinking about.",
  },
  {
    icon: "fal fa-comment-slash",
    title: "The feedback asked by text, answered never",
    good: "The agent sends a text after the showing: 'How did you like it?' The buyer replies with a thumbs-up, or nothing at all.",
    dies: "A thumbs-up tells the team nothing: not what the buyer liked, not what worried them, not what would change their mind. There is no record, no next step, and no reason for the buyer to talk again — so they do not. The showing becomes a memory, not a pipeline.",
    fix: "Ask on a call, in their words — and write the answers down the same day.",
  },
  {
    icon: "fal fa-calendar-times",
    title: "The second showing promised, never booked",
    good: "The buyer wants a second look, and the agent says 'let's do a second showing' — a good sign, and the buyer leaves happy.",
    dies: "No time was ever put on it. The week passes, the slot goes to another buyer, and the second showing never happens. The buyer reads the silence as a lack of interest and moves on to a team that books the time while they are still on the phone.",
    fix: "Book the second showing on the call, with a time, before hanging up.",
  },
];

const STEPS = [
  { stage: "Step 1", title: "Call within the hour", desc: "A voice call, not a text, within the hour of the showing — while the home is still fresh. Ask what the buyer liked, what worried them, and what would change their mind, in their own words, and listen for the timing and the pre-approval status underneath the answers. The call is short, human, and specific to the home they just walked through — never a generic check-in. A buyer in Miami, Houston or Dallas-Fort Worth is called in their local time, when it suits them.", fix: "One call, within the hour — before the next showing.", impact: "The feedback is real, and the buyer feels heard." },
  { stage: "Step 2", title: "Name the next step before hanging up", desc: "A second showing with a time on it, a pre-approval check, or the offer — named on the call, not left as 'we will be in touch'. If the buyer is still thinking, ask what would decide it and name a date to speak again, with one useful fact to bring them back: the answer to the worry they named, a comparable sale, or a second look at the part of the home they liked most. Nothing leaves the call without a date attached to it.", fix: "A next step with a date, or the call did not finish the job.", impact: "The buyer knows what happens next — and when." },
  { stage: "Step 3", title: "Confirm in writing and log it", desc: "The next step is confirmed in writing the same day — the second showing in a real calendar, the pre-approval check with a named owner, the offer prep with its own date — and everything is logged to the CRM, whether that is Follow Up Boss, kvCORE, or your own system, so the next person who calls knows the story and never asks the same question twice. A showing that is never logged is a showing the team forgets by Monday.", fix: "Written confirmation the same day, logged the same day.", impact: "The showing becomes a pipeline, not a memory." },
];

const AfterShowingFollowUpUsaArticle = () => {
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
        pageTitle="After the Showing: What a Real Estate Team Should Do Before the Buyer Moves On"
        pageDescription="The showing went well — now what? The follow-up call within the hour, the feedback while it is fresh, the second showing or the offer — and the three ways a good showing quietly dies."
        pageUrl="/after-showing-follow-up-usa-real-estate"
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
                <h1 className="ailm-hero-headline">The showing went well. <span className="ailm-red">The next hour decides whether it becomes an offer.</span></h1>
                <p className="ailm-hero-sub">
                  A buyer who liked the home will tour three more by the weekend. The team that calls within the hour, asks what they actually thought, and names the next step — a second showing, a pre-approval check, or the offer — is the team that keeps the buyer.
                </p>
                <div className="ailm-hero-ctas">
                  <a className="ailm-btn-primary" href="https://cal.com/devmate/sixty-onboarding">Book a demo <i className="fal fa-long-arrow-right ml-2"></i></a>
                  <a className="ailm-btn-ghost" href="#moments">See what goes wrong</a>
                </div>
                <div className="ailm-hero-metrics">
                  <div className="ailm-metric"><span className="ailm-metric-num">1 hour</span><span className="ailm-metric-label">To The Follow-Up Call</span></div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric"><span className="ailm-metric-num">1 next step</span><span className="ailm-metric-label">Named Before Hanging Up</span></div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric"><span className="ailm-metric-num">Same day</span><span className="ailm-metric-label">Second Showing Booked</span></div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric"><span className="ailm-metric-num">Local time</span><span className="ailm-metric-label">Called When It Suits Them</span></div>
                </div>
              </div>
            </div>
          </section>

          <section className="ailm-section ailm-section--light" id="answer">
            <div className="container">
              <div className="chatbot-grid-two">
                <div className="chatbot-reveal">
                  <p className="ailm-eyebrow">The direct answer</p>
                  <h2 className="ailm-section-title">The showing is only half the job — <span className="ailm-red">the follow-up is the other half.</span></h2>
                  <p style={{ fontSize: 17, lineHeight: 1.7, color: "#4b5563" }}>
                    The follow-up is a voice call within the hour, while the home is still fresh: what the buyer liked, what worried them, and what would change their mind — asked in their own words, not guessed from a thumbs-up on a text. Then the next step is named before hanging up: a second showing with a time on it, a pre-approval check, or the offer. The step is confirmed in writing the same day and logged to the CRM, so the next person who calls knows the story. In Miami, Houston and Dallas-Fort Worth, the buyers who get the call within the hour are the buyers who come back — the ones who wait until Monday have already found a favourite somewhere else.
                  </p>
                  <p style={{ fontSize: 17, lineHeight: 1.7, color: "#4b5563" }}>
                    This guide follows our pieces on{" "}
                    <Link href="/ai-call-assistant-usa-real-estate">the AI call assistant for US real estate brokerages</Link>,{" "}
                    <Link href="/ai-lead-response-usa">AI lead response for US teams</Link>, and{" "}
                    <Link href="/missed-calls-cost-real-estate-usa">what a missed call costs a US real estate team</Link>.
                  </p>
                </div>
                <div className="chatbot-reveal">
                  <div className="speed-answer">
                    <p>
                      <strong>The rule we work to:</strong> no consent record, no outbound call. No answer recorded, no next step assumed. No second showing booked, no &ldquo;we will be in touch&rdquo;. In the buyer&apos;s local time, and in their words.
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
                <h2 className="ailm-section-title">Three ways a good showing quietly dies</h2>
                <p className="ailm-section-sub">Each one looks harmless on Saturday. Each one costs the buyer by Monday.</p>
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
                <h2 className="ailm-section-title">Three steps from showing to next step</h2>
                <p className="ailm-section-sub">None of these needs a bigger budget — they need a team that does them the same day.</p>
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
                <h2 className="ailm-section-title">A showing is a beginning, not a result</h2>
                <p style={{ fontSize: 17, lineHeight: 1.7, color: "#4b5563", maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
                  Done properly, the buyer gets a call within the hour, is asked what they actually thought, and leaves the call knowing exactly what happens next — a second showing with a time on it, a pre-approval check, or the offer. The team leaves with the feedback in the CRM, the next step in a real calendar, and a buyer who knows they were heard. The showing is the beginning of the deal, and the follow-up is what makes it one. Run the follow-up, and the showing does its job.
                </p>
              </div>
              <p style={{ textAlign: "center", marginTop: 28 }}>
                Related reading:{" "}
                <Link href="/ai-call-assistant-usa-real-estate">AI Call Assistant for US Real Estate Brokerages</Link>,{" "}
                <Link href="/ai-lead-response-usa">AI Lead Response USA</Link>,{" "}
                <Link href="/missed-calls-cost-real-estate-usa">What a Missed Call Costs a US Real Estate Team</Link>,{" "}
                <Link href="/after-hours-homebuyer-calls-usa-real-estate">After-Hours Homebuyer Calls: What a US Real Estate Team Does When the Office Is Closed</Link>, and{" "}
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
                <h2 className="ailm-final-cta-title">See a proven system on your own leads</h2>
                <p className="ailm-final-cta-sub">
                  Book a demo and we will run a live test on your own calls — your listings, your script, your CRM — before anything is built.
                </p>
                <div className="ailm-final-cta-btns">
                  <a className="ailm-btn-primary ailm-btn-white" href="https://cal.com/devmate/sixty-onboarding">
                    Book a demo <i className="fal fa-long-arrow-right ml-2"></i>
                  </a>
                  <Link className="ailm-btn-ghost ailm-btn-ghost--light" href="/ai-call-assistant-usa-real-estate">
                    See AI Call Assistant for US Real Estate
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

export default AfterShowingFollowUpUsaArticle;
