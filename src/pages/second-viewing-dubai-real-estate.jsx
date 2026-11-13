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
    q: "What is a second viewing for?",
    a: "Checking what the first viewing could not: the home at a different time of day, the light and the noise, the community after dark, the corridor and the lift, and the numbers — service charges, the payment plan, the parking. A first viewing answers whether the buyer likes the home. A second viewing answers whether they would live in it.",
  },
  {
    q: "How fast should a second viewing be booked?",
    a: "The same day it is asked for. Offer two times, confirm the chosen one in writing, and send the confirmation before the buyer leaves the first viewing if you can — the buyer who has to chase a second viewing is a buyer already looking at another listing.",
  },
  {
    q: "What should the agent prepare before a second viewing?",
    a: "The buyer's questions from the first viewing, answered from the listing and checked with the seller or developer — not guessed. Service charges, the payment plan, what is included, and the community facts the buyer asked about. A second viewing that repeats the first one, with the same script and no new answers, wastes the buyer's time and the agent's.",
  },
  {
    q: "What if the buyer brings family, or the person who decides?",
    a: "Welcome it — the decision-maker's questions are the real qualification. Prepare the same answers for them, in their language, and let them see the home at the time of day they asked about. A second viewing with the decision-maker present is the closest a brokerage gets to a decision without an offer on the table.",
  },
  {
    q: "Should the second viewing happen in Arabic or English?",
    a: "In the language the buyer used, whenever we can tell. A buyer deciding on the biggest purchase of their life should not have to translate the answers in their head. Our approach answers in Arabic and English, matching the enquiry, so the second viewing feels like it was arranged for that buyer, not sent to a list.",
  },
  {
    q: "Does following up this way break DNCR, PDPL, or RERA rules?",
    a: "Not when it is set up properly. A follow-up goes to a buyer who has already enquired and viewed — that is a reply, not cold outreach: numbers are screened against the Do Not Call Register, consent and data handling follow PDPL principles, and listings and claims stay honest under RERA, including the service charges and payment terms and never inventing competing offers to push a decision. Your team signs off the scripts and the contact rules before anything goes live. This is a plain-language summary, not legal advice — your brokerage team confirms the final wording.",
  },
  {
    q: "How much does it cost?",
    a: "Contact our sales team for pricing. Pricing depends on your lead volume, your languages, and which portals and systems we connect, so we quote after a short demo call, not from a fixed list on this page.",
  },
  {
    q: "How fast can we go live?",
    a: "Most brokerages go live in about two weeks from briefing: share your listings and your scripts, review the viewing and follow-up flows, connect your portals and phone numbers, test live with your team, then launch with a tuning window after go-live.",
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
  headline: "The Second Viewing: What a Dubai Buyer Is Really Checking — and What Your Follow-Up Should Do",
  description:
    "The first viewing went well — now what? What a Dubai buyer is really checking on a second viewing: light and noise at a different time of day, service charges, the community after dark — and how a brokerage books it the same day, prepares the answers, and names the next step.",
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
  datePublished: "2026-11-09",
  dateModified: "2026-11-09",
  mainEntityOfPage: "https://devmatesolutions.com/second-viewing-dubai-real-estate",
};

const MOMENTS = [
  {
    icon: "fal fa-sun",
    title: "The buyer checks what the first viewing hid",
    good: "The buyer liked the home at 11 a.m. on a Saturday — and now wants to see it at 6 p.m. on a weekday, when the light, the noise, and the community are different.",
    dies: "The second viewing is booked at the same time of day, along the same route, with the same script — and the buyer learns nothing new.",
    fix: "Book the time the buyer asked about, and walk the route the buyer wants to see.",
  },
  {
    icon: "fal fa-file-invoice-dollar",
    title: "The numbers nobody prepared",
    good: "Service charges, the chiller, the parking, the payment plan — the buyer asks, and the answers decide the offer.",
    dies: "The agent guesses, or promises to check and never comes back — and the buyer stops trusting the numbers entirely.",
    fix: "Every figure checked with the seller or developer before the visit, never guessed on the spot.",
  },
  {
    icon: "fal fa-phone-slash",
    title: "The second viewing that never gets booked",
    good: "The buyer asks for a second viewing, and the agent says they will call back with times.",
    dies: "The call back comes two days later, or never — and the buyer has already viewed another home with another brokerage.",
    fix: "Two times offered the same day, confirmed in writing before the buyer leaves the first viewing.",
  },
];

const STEPS = [
  { stage: "Step 1", title: "Book it before the buyer leaves the first", desc: "Offer two times for the second viewing while the buyer is still in the home — the time of day they asked about, and one alternative. Confirm the chosen time in writing, with the address and the agent's name, before the buyer leaves. A second viewing booked on the spot is a decision in motion; one left to a callback is a lead cooling.", fix: "Two times offered, one confirmed in writing, the same day.", impact: "The buyer stops shopping around and starts planning the decision." },
  { stage: "Step 2", title: "Answer the buyer's real questions first", desc: "Take the questions from the first viewing — the charges, the payment plan, the community, what is included — and answer them from the listing, checked with the seller or developer, before the second viewing starts. The buyer should arrive to answers, not to another round of 'we will check'.", fix: "Prepared answers, checked, not guessed.", impact: "The second viewing feels like progress, not a repeat." },
  { stage: "Step 3", title: "End with the next step named", desc: "Before the buyer leaves the second viewing, agree what happens next: an offer discussion, a third visit with the decision-maker, or an honest no that frees the agent to move on. The viewing notes, the buyer's reaction, and the agreed next step are logged in the same pipeline, so the follow-up picks up mid-conversation.", fix: "A named next step, agreed on the spot.", impact: "No buyer is left wondering, and no agent is left guessing." },
];

const SecondViewingDubaiArticle = () => {
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
        pageTitle="The Second Viewing: What a Dubai Buyer Is Really Checking — and What Your Follow-Up Should Do"
        pageDescription="The first viewing went well — now what? What a Dubai buyer is really checking on a second viewing: light and noise at a different time of day, service charges, the community after dark — and how a brokerage books it the same day, prepares the answers, and names the next step."
        pageUrl="/second-viewing-dubai-real-estate"
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
                <h1 className="ailm-hero-headline">The first viewing went well. <span className="ailm-red">The second viewing decides it.</span></h1>
                <p className="ailm-hero-sub">
                  A second viewing is where a Dubai buyer stops browsing and starts deciding — the home at a different time of day, the light and the noise, the service charges, the community after dark. The brokerage that books it the same day, prepares the answers, and names the next step holds the buyer; the one that treats it as a repeat of the first loses them to another listing.
                </p>
                <div className="ailm-hero-ctas">
                  <a className="ailm-btn-primary" href="https://cal.com/devmate/sixty-onboarding">Book a demo <i className="fal fa-long-arrow-right ml-2"></i></a>
                  <a className="ailm-btn-ghost" href="#moments">See where second viewings die</a>
                </div>
                <div className="ailm-hero-metrics">
                  <div className="ailm-metric"><span className="ailm-metric-num">Same day</span><span className="ailm-metric-label">Second Viewing Booked</span></div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric"><span className="ailm-metric-num">Arabic + English</span><span className="ailm-metric-label">Matched To The Buyer</span></div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric"><span className="ailm-metric-num">1 checklist</span><span className="ailm-metric-label">Second Viewing Answers</span></div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric"><span className="ailm-metric-num">1 pipeline</span><span className="ailm-metric-label">Buyer Notes Kept</span></div>
                </div>
              </div>
            </div>
          </section>

          <section className="ailm-section ailm-section--light" id="answer">
            <div className="container">
              <div className="chatbot-grid-two">
                <div className="chatbot-reveal">
                  <p className="ailm-eyebrow">The direct answer</p>
                  <h2 className="ailm-section-title">A second viewing is not a repeat. <span className="ailm-red">It is a decision with a checklist.</span></h2>
                  <p style={{ fontSize: 17, lineHeight: 1.7, color: "#4b5563" }}>
                    Most brokerages treat the second viewing like the first one, only shorter. But the buyer is not coming back to admire the home again — they are coming back to check it. They found the home on Bayut or Property Finder, viewed it once, and are now deciding whether to make an offer. The light at 6 p.m., the noise from the road, the lift at rush hour, the service charges, the payment plan, the community after dark. A first viewing answers whether the buyer likes the home. A second viewing answers whether they would live in it — and whether the brokerage has the answers.
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
                      <strong>The rule we work to:</strong> every second viewing gets booked the same day it is asked for, with the buyer's questions answered before they arrive — never a &ldquo;let us know&rdquo;, and never a second viewing that repeats the first. In Arabic or English, as the buyer wrote.
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
                <h2 className="ailm-section-title">Three ways a second viewing never becomes an offer</h2>
                <p className="ailm-section-sub">The buyer asked to come back. The brokerage gave them nothing new to come back for.</p>
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
                <h2 className="ailm-section-title">Three habits that turn a second viewing into a decision</h2>
                <p className="ailm-section-sub">None of these needs a bigger team — they need a system that finishes what the first viewing starts.</p>
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
                  The worry we hear most is that following up fast means pressuring the buyer. It does not. Follow-ups go to buyers who have already enquired and viewed, numbers are screened against the Do Not Call Register, consent and data handling follow PDPL principles, and listings and claims stay honest under RERA — including the service charges and payment terms and never inventing competing offers to push a decision. Your team approves the scripts and the contact rules before anything goes live, and every conversation is logged where your team can see it. The brokerage stays in control — it just stops losing buyers between the viewing and the offer.
                </p>
              </div>
              <p style={{ textAlign: "center", marginTop: 28 }}>
                Related reading:{" "}
                <Link href="/dld-transfer-dubai-real-estate">The DLD Transfer: What Happens on the Day a Dubai Buyer Gets the Keys</Link>,{" "}
                <Link href="/after-viewing-follow-up-dubai-real-estate">After the Viewing: How a Dubai Brokerage Follows Up Without Losing the Buyer</Link>,{" "}
                <Link href="/first-reply-to-viewing-booked-dubai-real-estate">From First Reply to Viewing Booked: What Has to Happen After a Dubai Buyer Enquires</Link>,{" "}
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
                <h2 className="ailm-final-cta-title">See a second viewing booked on your own listings</h2>
                <p className="ailm-final-cta-sub">
                  Book a demo and we will walk through your own viewings with you — then show the same-day booking, the prepared answers, and the named next step happening in one conversation.
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

export default SecondViewingDubaiArticle;
