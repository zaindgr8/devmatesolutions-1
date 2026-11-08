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
    q: "What should an offer in writing contain?",
    a: "The price, the timeline, and any conditions — in writing, with a clear response time. A written offer means both sides know exactly where they stand: the buyer knows what they offered and by when they will hear back, and the seller can accept, decline, or counter on the same terms. A verbal offer has none of that, and a deal agreed by voice alone can unravel before anyone has written it down.",
  },
  {
    q: "What is the MOU, or Form F?",
    a: "The memorandum of understanding — RERA Form F — is the document buyer and seller sign once the price is agreed. It records the terms both sides accepted, and the buyer pays the deposit against it. It is the point where the negotiation becomes a commitment, and everything after it — the NOC, the mortgage, the transfer — follows from what it says.",
  },
  {
    q: "What is the NOC, and why does it slow things down?",
    a: "The no-objection certificate comes from the developer or the community, and the transfer cannot complete without it. Timelines vary: some developers issue one quickly, others take days, and any outstanding service charges have to be settled first. The delay itself is rarely the problem — the problem is a buyer who hears nothing while it is happening. A named date and a same-day update when it moves keep the deal alive.",
  },
  {
    q: "What if the mortgage valuation comes in below the agreed price?",
    a: "Then the buyer, the seller, and the bank have a real decision to make — the buyer covers the gap, the price is renegotiated, or the buyer walks away on the terms the MOU allows. What neither side benefits from is a brokerage that hides the number or pressures a quick answer. Explain the valuation plainly, in the buyer's language, and let both sides decide with the facts in front of them.",
  },
  {
    q: "Should the follow-up go out in Arabic or English?",
    a: "In the language the buyer used, whenever we can tell. An update about a deposit, a valuation, or a transfer date is the conversation where the buyer is deciding whether they trust the brokerage with the biggest purchase of their life. Our approach answers in Arabic and English, matching the enquiry, so the update feels like it was written for that buyer, not sent to a list.",
  },
  {
    q: "Does following up this way break DNCR, PDPL, or RERA rules?",
    a: "Not when it is set up properly. A follow-up goes to a buyer who has already enquired, viewed, and made an offer — that is a reply, not cold outreach: numbers are screened against the Do Not Call Register, consent and data handling follow PDPL principles, and listings and claims stay honest under RERA, including the MOU terms and never inventing competing offers to push a decision. Your team signs off the scripts and the contact rules before anything goes live. This is a plain-language summary, not legal advice — your brokerage team confirms the final wording.",
  },
  {
    q: "How much does it cost?",
    a: "Contact our sales team for pricing. Pricing depends on your lead volume, your languages, and which portals and systems we connect, so we quote after a short demo call, not from a fixed list on this page.",
  },
  {
    q: "How fast can we go live?",
    a: "Most brokerages go live in about two weeks from briefing: share your listings and your scripts, review the offer and follow-up flows, connect your portals and phone numbers, test live with your team, then launch with a tuning window after go-live.",
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
  headline: "After the Offer: What Has to Happen Before a Dubai Buyer Gets the Keys",
  description:
    "The offer is agreed — now what? What has to happen between a Dubai buyer's offer and the keys: the offer in writing, the MOU and Form F, the deposit, the NOC, the mortgage and the DLD transfer — and how a brokerage keeps both sides moving without losing the deal.",
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
  mainEntityOfPage: "https://devmatesolutions.com/after-offer-dubai-real-estate",
};

const MOMENTS = [
  {
    icon: "fal fa-file-signature",
    title: "The verbal offer that never becomes a paper offer",
    good: "The buyer says yes on the phone at the viewing, and the agent takes that as a deal done.",
    dies: "Nothing is written down, no response time is agreed — and another buyer puts an offer in first, or the seller changes their mind.",
    fix: "Every offer in writing — price, timeline, and conditions — with a clear response time.",
  },
  {
    icon: "fal fa-hourglass-half",
    title: "The MOU signed, then silence",
    good: "Form F is signed, the deposit is paid, and both sides wait for the NOC and the mortgage to move.",
    dies: "A week passes with no update, the buyer assumes trouble and starts looking again, and the seller doubts the buyer is serious.",
    fix: "A named checklist with dates, shared with both sides and updated the same day anything moves.",
  },
  {
    icon: "fal fa-temperature-low",
    title: "The buyer who cools while the paperwork waits",
    good: "The mortgage approval drags, the valuation comes in low, and the transfer date slips by a week.",
    dies: "Nobody explains the delay in plain language, so the buyer fills the silence with worst cases and walks away.",
    fix: "Explain each delay plainly, in the buyer's language, with the next date named.",
  },
];

const STEPS = [
  { stage: "Step 1", title: "Put the offer in writing", desc: "Price, timeline, and conditions, in writing, with a clear response time — and the seller's answer back the same way. No invented competing offers, no pressure invented to force a decision: the offer stands on its own terms, and the buyer knows exactly where they stand.", fix: "Offers in writing, honest on both sides.", impact: "A negotiation both sides can trust, and a price that holds." },
  { stage: "Step 2", title: "Run the checklist, with dates", desc: "The MOU and Form F, the deposit, the NOC, the mortgage pre-approval and valuation, and the DLD transfer date — each with a named owner and a date, in one pipeline both sides can see. When a date moves, the new date is agreed the same day, not discovered a week later.", fix: "Every step named, dated, and owned.", impact: "No step is forgotten, and no delay is a surprise." },
  { stage: "Step 3", title: "Update both sides the same day", desc: "Buyer and seller hear the same facts, in their own language, on the day something happens — a document signed, a valuation in, a date moved. The viewing notes, the offer terms, and every update are logged in the same pipeline, so the next conversation starts where the last one ended.", fix: "Same-day updates, both directions.", impact: "The deal is held together by information, not by hope." },
];

const AfterOfferDubaiArticle = () => {
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
        pageTitle="After the Offer: What Has to Happen Before a Dubai Buyer Gets the Keys"
        pageDescription="The offer is agreed — now what? What has to happen between a Dubai buyer's offer and the keys: the offer in writing, the MOU and Form F, the deposit, the NOC, the mortgage and the DLD transfer — and how a brokerage keeps both sides moving without losing the deal."
        pageUrl="/after-offer-dubai-real-estate"
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
                <h1 className="ailm-hero-headline">The offer is agreed. <span className="ailm-red">The sale is not done yet.</span></h1>
                <p className="ailm-hero-sub">
                  A Dubai buyer who has just made an offer is still deciding — and between the offer and the keys sit the MOU, the deposit, the NOC, the mortgage, and the DLD transfer. The brokerage that keeps both sides informed, and every step named with a date, holds the deal together; the one that goes quiet watches it fall apart.
                </p>
                <div className="ailm-hero-ctas">
                  <a className="ailm-btn-primary" href="https://cal.com/devmate/sixty-onboarding">Book a demo <i className="fal fa-long-arrow-right ml-2"></i></a>
                  <a className="ailm-btn-ghost" href="#moments">See where offers die</a>
                </div>
                <div className="ailm-hero-metrics">
                  <div className="ailm-metric"><span className="ailm-metric-num">In writing</span><span className="ailm-metric-label">Every Offer</span></div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric"><span className="ailm-metric-num">Arabic + English</span><span className="ailm-metric-label">Matched To The Buyer</span></div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric"><span className="ailm-metric-num">1 checklist</span><span className="ailm-metric-label">Offer To Keys</span></div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric"><span className="ailm-metric-num">1 pipeline</span><span className="ailm-metric-label">Buyer And Seller</span></div>
                </div>
              </div>
            </div>
          </section>

          <section className="ailm-section ailm-section--light" id="answer">
            <div className="container">
              <div className="chatbot-grid-two">
                <div className="chatbot-reveal">
                  <p className="ailm-eyebrow">The direct answer</p>
                  <h2 className="ailm-section-title">An offer is not a sale. <span className="ailm-red">It is a deadline with paperwork attached.</span></h2>
                  <p style={{ fontSize: 17, lineHeight: 1.7, color: "#4b5563" }}>
                    Most brokerages celebrate the offer and stop managing it. But the buyer has only agreed a price — the seller still has to accept in writing, the MOU (Form F) still has to be signed, the deposit paid, the NOC obtained, the mortgage finalised, and the transfer registered at the DLD. Each step has a deadline and a document, and any one of them can stall the deal for a week.
                  </p>
                  <p style={{ fontSize: 17, lineHeight: 1.7, color: "#4b5563" }}>
                    This article follows our earlier pieces on{" "}
                    <Link href="/after-viewing-follow-up-dubai-real-estate">after the viewing</Link>,{" "}
                    <Link href="/first-reply-to-viewing-booked-dubai-real-estate">from first reply to viewing booked</Link>,{" "}
                    <Link href="/how-fast-to-reply-dubai-real-estate-leads">how fast a Dubai brokerage should reply</Link>, and{" "}
                    <Link href="/dncr-pdpl-rera-dubai-real-estate">DNCR, PDPL, and RERA in plain language</Link>.
                  </p>
                </div>
                <div className="chatbot-reveal">
                  <div className="speed-answer">
                    <p>
                      <strong>The rule we work to:</strong> every offer in writing, every step named with a date, and every update shared with both sides the same day — never a verbal offer, never a silent week. In Arabic or English, as the buyer wrote.
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
                <h2 className="ailm-section-title">Three ways an agreed offer never becomes a sale</h2>
                <p className="ailm-section-sub">The price was agreed. The chain after it was not managed.</p>
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
                <h2 className="ailm-section-title">Three habits that carry an offer to the keys</h2>
                <p className="ailm-section-sub">None of these needs a bigger team — they need a system that finishes what the offer starts.</p>
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
                <h2 className="ailm-section-title">Fast does not mean careless</h2>
                <p style={{ fontSize: 17, lineHeight: 1.7, color: "#4b5563", maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
                  The worry we hear most is that keeping a deal moving means pressuring the buyer. It does not. Follow-ups go to buyers who have already enquired, viewed, and made an offer, numbers are screened against the Do Not Call Register, consent and data handling follow PDPL principles, and listings and claims stay honest under RERA — including the MOU terms and never inventing competing offers to push a decision. Your team approves the scripts and the contact rules before anything goes live, and every conversation is logged where your team can see it. The brokerage stays in control — it just stops losing agreed deals between the offer and the keys.
                </p>
              </div>
              <p style={{ textAlign: "center", marginTop: 28 }}>
                Related reading:{" "}
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
                <h2 className="ailm-final-cta-title">See an offer carried to the keys on your own deals</h2>
                <p className="ailm-final-cta-sub">
                  Book a demo and we will walk through your own offers with you — then show the written offer, the checklist, and the same-day updates happening in one conversation.
                </p>
                <div className="ailm-final-cta-btns">
                  <a className="ailm-btn-primary ailm-btn-white" href="https://cal.com/devmate/sixty-onboarding">
                    Book a demo <i className="fal fa-long-arrow-right ml-2"></i>
                  </a>
                  <Link className="ailm-btn-ghost ailm-btn-ghost--light" href="/after-viewing-follow-up-dubai-real-estate">
                    Read after the viewing
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

export default AfterOfferDubaiArticle;
