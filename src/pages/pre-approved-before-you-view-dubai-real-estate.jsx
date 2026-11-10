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
    q: "What is mortgage pre-approval, in plain language?",
    a: "A letter from a lender saying how much they are willing to lend this buyer, and on what terms — before the buyer makes an offer. It is based on the buyer's income, existing commitments, and deposit, and it turns a budget from a guess into a number the brokerage can plan viewings around. How long it takes depends on the lender and on how complete the buyer's documents are — a buyer with everything ready moves faster than one still gathering statements. A pre-approved buyer is a buyer who can move when the right home appears.",
  },
  {
    q: "What should a buyer have ready before the first viewing?",
    a: "Three things: a realistic budget, the deposit they can actually pay, and a timeline — when they need to move and how fast they can decide. A buyer who has those three answers gets viewings that match; a buyer who does not gets a tour of homes they cannot buy, or cannot decide on. The documents follow: identification, proof of income, and bank statements — what a lender usually asks for — gathered early, not the week an offer is made.",
  },
  {
    q: "What if the buyer is paying cash?",
    a: "The same three answers still matter: budget, deposit readiness, and timeline — plus proof the funds are available, so the seller takes the offer seriously. A cash buyer who cannot show the funds is in the same position as a buyer without pre-approval: an offer the seller cannot trust. The qualification is the same; only the lender is different.",
  },
  {
    q: "Should the agent ask about budget on the first call?",
    a: "Yes — in order, and in the buyer's language. Budget, deposit readiness, and timeline are the first three qualification questions, asked before viewings are offered, not after a Saturday has been spent touring the wrong homes. A buyer who is asked properly feels taken seriously; a buyer who is shown homes they cannot afford feels their time was wasted.",
  },
  {
    q: "What if the buyer is overseas?",
    a: "The same readiness applies, with one addition: the buyer needs a way to decide at a distance — a trusted person who can view, or a viewing the buyer can join live, and documents that can be shared and checked before an offer. The brokerage's job is the same: qualify first, in Arabic or English as the buyer wrote, then offer viewings that match the budget and the timeline.",
  },
  {
    q: "Does asking about finance and documents break DNCR, PDPL, or RERA rules?",
    a: "Not when it is set up properly. These questions go to a buyer who has already enquired — that is a reply, not cold outreach: numbers are screened against the Do Not Call Register, consent and data handling follow PDPL principles, and listings and claims stay honest under RERA, including the price, the service charges, and the payment terms. Your team signs off the scripts and the contact rules before anything goes live. This is a plain-language summary, not legal advice — your brokerage team confirms the final wording.",
  },
  {
    q: "How much does it cost?",
    a: "Contact our sales team for pricing. Pricing depends on your lead volume, your languages, and which portals and systems we connect, so we quote after a short demo call, not from a fixed list on this page.",
  },
  {
    q: "How fast can we go live?",
    a: "Most brokerages go live in about two weeks from briefing: share your listings and your scripts, review the qualification and viewing flows, connect your portals and phone numbers, test live with your team, then launch with a tuning window after go-live.",
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
  headline: "Pre-Approved Before You View: What a Dubai Buyer Should Have Ready First",
  description:
    "The viewing is booked — but is the buyer ready? What a Dubai buyer should have sorted before the first viewing: a realistic budget, the deposit they can actually pay, a timeline, and the documents a lender asks for — and how a brokerage qualifies in order, in Arabic and English, before a Saturday is spent touring the wrong homes.",
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
  mainEntityOfPage: "https://devmatesolutions.com/pre-approved-before-you-view-dubai-real-estate",
};

const MOMENTS = [
  {
    icon: "fal fa-heart-broken",
    title: "The buyer who loves a home they cannot afford",
    good: "The buyer views a home in Dubai Marina, falls for it, and asks to make an offer — and only then discovers the budget does not stretch.",
    dies: "The offer never happens, the buyer feels misled, and the agent has spent a Saturday on a viewing that was never going to close.",
    fix: "Budget, deposit, and timeline agreed before the first viewing is offered — never after the buyer has chosen.",
  },
  {
    icon: "fal fa-users",
    title: "The viewing tour with no decision and no budget",
    good: "A buyer tours five homes in a week, each one a little further from what they can pay, with no one in the group able to say yes.",
    dies: "Every viewing is a maybe, the agent cannot prioritise, and the buyer drifts to another brokerage with a clearer plan.",
    fix: "Qualify the decision-maker and the numbers first, then show only the homes that fit both.",
  },
  {
    icon: "fal fa-file-times",
    title: "The offer that stalls on missing documents",
    good: "The buyer is ready, the seller is ready, and the offer is agreed in principle — then the lender asks for documents nobody gathered.",
    dies: "Days pass, the seller loses patience, and another buyer with their papers ready takes the home.",
    fix: "Documents gathered at the start, kept in one record, so the offer moves the day it is agreed.",
  },
];

const STEPS = [
  { stage: "Step 1", title: "Ask the three numbers first", desc: "Budget, deposit readiness, and timeline — in that order, in the buyer's language, on the first proper conversation. These three answers decide which homes are shown, which are skipped, and how fast the brokerage moves when the right one appears. A buyer who has answered them feels taken seriously; a buyer who has not is being shown homes at random.", fix: "Three questions, asked in order, before any viewing is offered.", impact: "Viewings match the buyer, and Saturdays stop being wasted." },
  { stage: "Step 2", title: "Start the pre-approval before the first viewing", desc: "Once the numbers are agreed, the pre-approval conversation starts — the lender, the documents, the timeline — while the viewings are being planned, not after the buyer has chosen a home. The buyer who walks into a viewing already pre-approved is a buyer who can offer on the spot; the one who is not is a buyer who has to go away and come back, and may not.", fix: "Pre-approval started early, alongside the viewing plan.", impact: "An offer can be made the day the buyer decides, not a week later." },
  { stage: "Step 3", title: "Keep every answer in one record", desc: "Budget, deposit, timeline, documents, the homes viewed, and the buyer's reaction to each — all in the same pipeline, in Arabic or English as the buyer wrote. The next viewing, the next call, and the next offer all pick up mid-conversation, with nothing re-asked and nothing lost between the agent, the lender, and the team.", fix: "One record, from first enquiry to offer.", impact: "No buyer is asked the same question twice, and no offer stalls on a missing paper." },
];

const PreApprovedBeforeYouViewDubaiArticle = () => {
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
        pageTitle="Pre-Approved Before You View: What a Dubai Buyer Should Have Ready First"
        pageDescription="The viewing is booked — but is the buyer ready? What a Dubai buyer should have sorted before the first viewing: a realistic budget, the deposit they can actually pay, a timeline, and the documents a lender asks for — and how a brokerage qualifies in order, in Arabic and English, before a Saturday is spent touring the wrong homes."
        pageUrl="/pre-approved-before-you-view-dubai-real-estate"
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
                <div className="ailm-hero-badge"><span className="ailm-hero-dot"></span>Dubai · Real Estate</div>
                <h1 className="ailm-hero-headline">The viewing is booked. <span className="ailm-red">Is the buyer ready?</span></h1>
                <p className="ailm-hero-sub">
                  A Dubai buyer found a home on Bayut or Property Finder, and the viewing is in the diary. But nobody has asked the three questions that decide whether the viewing can become an offer: what the budget really is, what deposit the buyer can actually pay, and how fast they can decide. The brokerage that qualifies before the first viewing shows the right homes; the one that qualifies after it shows the wrong ones first.
                </p>
                <div className="ailm-hero-ctas">
                  <a className="ailm-btn-primary" href="https://cal.com/devmate/sixty-onboarding">Book a demo <i className="fal fa-long-arrow-right ml-2"></i></a>
                  <a className="ailm-btn-ghost" href="#moments">See where viewings die</a>
                </div>
                <div className="ailm-hero-metrics">
                  <div className="ailm-metric"><span className="ailm-metric-num">3 numbers</span><span className="ailm-metric-label">Before The First Viewing</span></div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric"><span className="ailm-metric-num">Arabic + English</span><span className="ailm-metric-label">Matched To The Buyer</span></div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric"><span className="ailm-metric-num">1 record</span><span className="ailm-metric-label">Buyer Answers Kept</span></div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric"><span className="ailm-metric-num">Same day</span><span className="ailm-metric-label">Offer Can Move</span></div>
                </div>
              </div>
            </div>
          </section>

          <section className="ailm-section ailm-section--light" id="answer">
            <div className="container">
              <div className="chatbot-grid-two">
                <div className="chatbot-reveal">
                  <p className="ailm-eyebrow">The direct answer</p>
                  <h2 className="ailm-section-title">A viewing is not a qualification. <span className="ailm-red">The qualification comes first.</span></h2>
                  <p style={{ fontSize: 17, lineHeight: 1.7, color: "#4b5563" }}>
                    Most brokerages treat the first viewing as the start of the process. It is not — it is the middle. Before it, the buyer should have three answers ready: a realistic budget, the deposit they can actually pay, and a timeline for deciding. With those three, the agent shows homes the buyer can buy and can decide on. Without them, the agent shows homes at random and hopes one of them fits.
                  </p>
                  <p style={{ fontSize: 17, lineHeight: 1.7, color: "#4b5563" }}>
                    This article sits before our pieces on{" "}
                    <Link href="/first-reply-to-viewing-booked-dubai-real-estate">from first reply to viewing booked</Link>,{" "}
                    <Link href="/after-viewing-follow-up-dubai-real-estate">after the viewing</Link>,{" "}
                    <Link href="/how-fast-to-reply-dubai-real-estate-leads">how fast a Dubai brokerage should reply</Link>, and{" "}
                    <Link href="/dncr-pdpl-rera-dubai-real-estate">DNCR, PDPL, and RERA in plain language</Link>.
                  </p>
                </div>
                <div className="chatbot-reveal">
                  <div className="speed-answer">
                    <p>
                      <strong>The rule we work to:</strong> every buyer is qualified in order — budget, deposit readiness, timeline — before a viewing is offered, and the pre-approval starts alongside the viewing plan, not after the buyer has chosen a home. In Arabic or English, as the buyer wrote.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="ailm-section" id="moments">
            <div className="container">
              <div className="ailm-section-header chatbot-reveal">
                <p className="ailm-eyebrow">Where they die</p>
                <h2 className="ailm-section-title">Three ways a viewing dies before the buyer is ready</h2>
                <p className="ailm-section-sub">The home was right. The buyer was not ready — and nobody had asked.</p>
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
                <h2 className="ailm-section-title">Three habits that put the buyer first — before the viewing</h2>
                <p className="ailm-section-sub">None of these needs a bigger team — they need a system that qualifies before it tours.</p>
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
                <h2 className="ailm-section-title">Qualifying is not interrogating</h2>
                <p style={{ fontSize: 17, lineHeight: 1.7, color: "#4b5563", maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
                  The worry we hear most is that asking about budget and deposits will put the buyer off. It does the opposite, when it is done in order and in the buyer&apos;s language: the buyer sees a brokerage that takes their search seriously, and shows them homes they can actually buy. These questions go to buyers who have already enquired, numbers are screened against the Do Not Call Register, consent and data handling follow PDPL principles, and listings and claims stay honest under RERA — including the price, the service charges, and the payment terms. Your team approves the scripts and the contact rules before anything goes live, and every conversation is logged where your team can see it. The brokerage stays in control — it just stops touring buyers around homes they cannot buy.
                </p>
              </div>
              <p style={{ textAlign: "center", marginTop: 28 }}>
                Related reading:{" "}
                <Link href="/first-reply-to-viewing-booked-dubai-real-estate">From First Reply to Viewing Booked: What Has to Happen After a Dubai Buyer Enquires</Link>,{" "}
                <Link href="/after-viewing-follow-up-dubai-real-estate">After the Viewing: How a Dubai Brokerage Follows Up Without Losing the Buyer</Link>,{" "}
                <Link href="/ai-agent-dubai-real-estate">AI Agent for Dubai Real Estate</Link>,{" "}
                <Link href="/ai-chatbot-dubai-real-estate">AI Chatbot for Dubai Real Estate</Link>,{" "}
                <Link href="/aileadmanagementdubairealestate">AI Lead Management for Real Estate</Link>, and{" "}
                <Link href="/whatsappautomation">WhatsApp Automation</Link>.
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
                <h2 className="ailm-final-cta-title">See a qualified buyer booked on your own listings</h2>
                <p className="ailm-final-cta-sub">
                  Book a demo and we will walk through your own enquiries with you — then show the qualification, the pre-approval start, and the viewing booking happening in one conversation.
                </p>
                <div className="ailm-final-cta-btns">
                  <a className="ailm-btn-primary ailm-btn-white" href="https://cal.com/devmate/sixty-onboarding">
                    Book a demo <i className="fal fa-long-arrow-right ml-2"></i>
                  </a>
                  <Link className="ailm-btn-ghost ailm-btn-ghost--light" href="/first-reply-to-viewing-booked-dubai-real-estate">
                    Read from first reply to viewing booked
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

export default PreApprovedBeforeYouViewDubaiArticle;
