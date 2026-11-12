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
    q: "What should a buyer check first on a viewing?",
    a: "The things a photo cannot show: light at the hour the buyer will actually be home, noise from the road or the neighbours, water pressure, the air conditioning, storage, and the view from the windows that matter. A viewing that only walks through the rooms and admires the finish has checked the least important part. The checks that matter take ten minutes and a few direct questions — and they are the ones that decide whether the buyer comes back for a second viewing.",
  },
  {
    q: "What time of day should a viewing happen?",
    a: "At the time the buyer will live there — usually the evening, after work, when the building is full and the community is awake. A midday viewing hides the evening sun on the balcony, the traffic at the gate, and the noise from the floor above. Where a second viewing is possible, it should be at a different time of day from the first. A brokerage that only offers midday viewings is showing the home at its easiest hour, not its real one.",
  },
  {
    q: "What costs should be confirmed before an offer?",
    a: "The service charges, the chiller charge, parking, and the DLD fees — in writing, with the numbers attached to this unit, not a building average. A price that looks right can change by thousands of dirhams a year once the charges are added, and the buyer should know the full number before the offer, not after it. The agent should also confirm the payment plan and what is included — the white goods, the parking bay, the storage — so the offer is made on the real price, not the headline one.",
  },
  {
    q: "What should the agent send after the viewing?",
    a: "A short written summary the same day: what the buyer liked, what they asked about, the answers to the questions that were raised, and the next step with a time attached — a second viewing, a revised shortlist, or an offer. The summary should go to the buyer in the language they wrote in, Arabic or English, and the same record should land in the brokerage CRM so the next person who speaks to the buyer does not start from zero.",
  },
  {
    q: "How many viewings should a buyer expect?",
    a: "As many as the shortlist needs — but each one should narrow the choice, not restart it. The first viewing tests the home against the budget and the brief. The second viewing, at a different time of day, tests the light, the noise, and the community. A buyer who has viewed five homes and is no closer to a decision has not been qualified in order; the brokerage should tighten the shortlist between viewings, not add to it.",
  },
  {
    q: "What if the unit is not the one in the photos?",
    a: "Say so on the spot, and ask for the real unit. Photos from another unit, another floor, or an old renovation are the fastest way to lose a buyer — and a brokerage that shows them has already spent the trust the viewing was meant to build. Listings should carry the real unit, the real view, and the real price, with the service charges and the payment terms stated honestly. That is a RERA matter as much as a trust matter, and your team should confirm the final wording.",
  },
  {
    q: "How much does it cost?",
    a: "Contact our sales team for pricing. Pricing depends on your lead volume, your languages, and which portals and systems we connect, so we quote after a short demo call, not from a fixed list on this page.",
  },
  {
    q: "How fast can we go live?",
    a: "Most brokerages go live in about two weeks from briefing: share your listings and your scripts, review the qualification and viewing flows in Arabic and English, connect your portals and phone numbers, test live with your team, then launch with a tuning window after go-live.",
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
  headline: "Viewing Day in Dubai: The Checklist a Buyer Should Run Before They Say Yes",
  description:
    "A Dubai property viewing is the moment a buyer decides — so what should they actually check? The light at the hour they will live there, the noise, the water and the air conditioning, the service charges and the payment terms in writing, and the next step named before they leave.",
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
  mainEntityOfPage: "https://devmatesolutions.com/viewing-day-checklist-dubai-real-estate",
};

const MOMENTS = [
  {
    icon: "fal fa-sun",
    title: "The viewing at the wrong hour",
    good: "The viewing is at midday: the rooms are bright, the balcony is sunny, the community is quiet. The buyer likes what they see and the agent books the second viewing.",
    dies: "The buyer comes back at 6 p.m. and the home is different — the sun bakes the living room, the road below is loud, the lift queue runs out the door. The second viewing never happens, and neither does the offer.",
    fix: "View at the hour the buyer will live there — and book the second viewing at a different time of day.",
  },
  {
    icon: "fal fa-file-invoice-dollar",
    title: "The price that hides the charges",
    good: "The price is agreed, the buyer is happy, the offer is nearly made. The agent mentions the service charges at the end, as an afterthought.",
    dies: "The charges add thousands of dirhams a year, the chiller is separate, parking is extra — and the buyer, who had budgeted to the headline price, walks away from a home they loved.",
    fix: "Every cost in writing, attached to this unit, before the offer — service charges, chiller, parking, DLD fees, payment plan.",
  },
  {
    icon: "fal fa-image",
    title: "The unit that is not the one in the photos",
    good: "The Bayut or Property Finder photos are beautiful: a bright living room, a marina view, a finished kitchen. The buyer arrives ready to say yes.",
    dies: "The living room faces a wall, the view is of a car park, the kitchen is from the show unit downstairs. The buyer does not ask for the real photos — they stop answering.",
    fix: "The real unit, the real view, the real price — in the listing, before the viewing is booked.",
  },
];

const STEPS = [
  { stage: "Step 1", title: "Check the home itself", desc: "Light at the hour the buyer will live there, noise from the road and the neighbours, water pressure, the air conditioning, storage, parking, and the view from the windows that matter. These are the checks a photo cannot do, and they take ten minutes with a few direct questions. A viewing that skips them has shown the finish and hidden the home.", fix: "The practical checks, on the viewing, in ten minutes.", impact: "The buyer leaves knowing the home — not just liking the photos." },
  { stage: "Step 2", title: "Get the numbers in writing", desc: "Service charges, chiller, parking, DLD fees, the payment plan, and what is included — white goods, the parking bay, the storage — stated in writing and attached to this unit, in Arabic or English as the buyer wrote. The offer should be made on the full number, not the headline one. A brokerage that gives the numbers late has already spent the buyer's trust.", fix: "Every cost, in writing, before the offer.", impact: "No surprise at the offer stage, and no buyer lost to a number they should have had on day one." },
  { stage: "Step 3", title: "Name the next step before you leave", desc: "A second viewing at a different time of day, a revised shortlist, or an offer — with a time attached, confirmed in writing the same day, and logged to the CRM so the next person who speaks to the buyer does not start from zero. A viewing that ends with 'we will be in touch' ends the chain. The follow-up should be agreed in the room, not chased afterwards.", fix: "The next step, named and timed, before anyone leaves.", impact: "The viewing becomes the next booking — not a dead end." },
];

const ViewingDayChecklistDubaiArticle = () => {
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
        pageTitle="Viewing Day in Dubai: The Checklist a Buyer Should Run Before They Say Yes"
        pageDescription="A Dubai property viewing is the moment a buyer decides — so what should they actually check? The light at the hour they will live there, the noise, the water and the air conditioning, the service charges and the payment terms in writing, and the next step named before they leave."
        pageUrl="/viewing-day-checklist-dubai-real-estate"
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
                <h1 className="ailm-hero-headline">The photos looked perfect. <span className="ailm-red">Will the home hold up at 6 p.m.?</span></h1>
                <p className="ailm-hero-sub">
                  A viewing is the moment a Dubai buyer decides — and most of what decides it never appears in a photo. The light at the hour they will actually be home, the noise from the road below, the water pressure, the air conditioning, the service charges, and the payment terms. This is the checklist to run on viewing day, before the buyer says yes — and the three things a brokerage should never let go unchecked.
                </p>
                <div className="ailm-hero-ctas">
                  <a className="ailm-btn-primary" href="https://cal.com/devmate/sixty-onboarding">Book a demo <i className="fal fa-long-arrow-right ml-2"></i></a>
                  <a className="ailm-btn-ghost" href="#moments">See what goes wrong</a>
                </div>
                <div className="ailm-hero-metrics">
                  <div className="ailm-metric"><span className="ailm-metric-num">3 checks</span><span className="ailm-metric-label">Before You Leave</span></div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric"><span className="ailm-metric-num">10 minutes</span><span className="ailm-metric-label">The Practical Checks</span></div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric"><span className="ailm-metric-num">Arabic + English</span><span className="ailm-metric-label">Same Record Either Way</span></div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric"><span className="ailm-metric-num">1 next step</span><span className="ailm-metric-label">Named Before You Leave</span></div>
                </div>
              </div>
            </div>
          </section>

          <section className="ailm-section ailm-section--light" id="answer">
            <div className="container">
              <div className="chatbot-grid-two">
                <div className="chatbot-reveal">
                  <p className="ailm-eyebrow">The direct answer</p>
                  <h2 className="ailm-section-title">A viewing checks the home, <span className="ailm-red">not the photos.</span></h2>
                  <p style={{ fontSize: 17, lineHeight: 1.7, color: "#4b5563" }}>
                    The checklist is short: the light at the hour the buyer will live there, the noise, the water, the air conditioning, the storage, the parking, and the view — then the numbers in writing, service charges and all, and a next step named before anyone leaves. A brokerage that runs that checklist on every viewing loses fewer buyers between the first viewing and the offer, because the buyer leaves knowing the home instead of liking a set of photos.
                  </p>
                  <p style={{ fontSize: 17, lineHeight: 1.7, color: "#4b5563" }}>
                    This guide sits between our pieces on{" "}
                    <Link href="/pre-approved-before-you-view-dubai-real-estate">getting pre-approved before the first viewing</Link>,{" "}
                    <Link href="/first-reply-to-viewing-booked-dubai-real-estate">booking the first viewing</Link>, and{" "}
                    <Link href="/after-viewing-follow-up-dubai-real-estate">what the follow-up should do after the viewing</Link>.
                  </p>
                </div>
                <div className="chatbot-reveal">
                  <div className="speed-answer">
                    <p>
                      <strong>The rule we work to:</strong> no verified listing, no claim about it. No consent record, no outbound contact. No numbers in writing, no offer on the headline price. In Arabic or English, as the buyer wrote.
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
                <h2 className="ailm-section-title">Three ways a viewing loses the buyer</h2>
                <p className="ailm-section-sub">Each one looks harmless on the day. Each one ends the chain before the offer.</p>
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
                <p className="ailm-eyebrow">The checklist</p>
                <h2 className="ailm-section-title">Three checks before anyone leaves the viewing</h2>
                <p className="ailm-section-sub">None of these needs a bigger budget — they need an agent who runs them every time.</p>
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
                <h2 className="ailm-section-title">A viewing is a decision, not a tour</h2>
                <p style={{ fontSize: 17, lineHeight: 1.7, color: "#4b5563", maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
                  Done properly, the buyer leaves the viewing with the home checked, the numbers in writing, and the next step agreed — a second viewing at a different time of day, or an offer on the real price. The brokerage leaves with the same record in one CRM, in Arabic or English, so the follow-up picks up exactly where the viewing left off. The viewing is the most expensive minute in the chain to waste: the buyer is there, the home is there, and the decision is half made. Run the checklist, and the viewing does its job.
                </p>
              </div>
              <p style={{ textAlign: "center", marginTop: 28 }}>
                Related reading:{" "}
                <Link href="/pre-approved-before-you-view-dubai-real-estate">Pre-Approved Before You View: What a Dubai Buyer Should Have Ready First</Link>,{" "}
                <Link href="/first-reply-to-viewing-booked-dubai-real-estate">From First Reply to Viewing Booked: What Has to Happen After a Dubai Buyer Enquires</Link>,{" "}
                <Link href="/second-viewing-dubai-real-estate">The Second Viewing: What a Dubai Buyer Is Really Checking — and What Your Follow-Up Should Do</Link>,{" "}
                <Link href="/after-viewing-follow-up-dubai-real-estate">After the Viewing: How a Dubai Brokerage Follows Up Without Losing the Buyer</Link>,{" "}
                <Link href="/dncr-pdpl-rera-dubai-real-estate">DNCR, PDPL and RERA: The Three Rules Behind Automated Calls and WhatsApp in Dubai Real Estate</Link>,{" "}
                <Link href="/ai-agent-dubai-real-estate">AI Agent for Dubai Real Estate</Link>,{" "}
                <Link href="/ai-chatbot-dubai-real-estate">AI Chatbot for Dubai Real Estate</Link>,{" "}
                <Link href="/aileadmanagementdubairealestate">AI Lead Management for Dubai Real Estate</Link>, and{" "}
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
                <h2 className="ailm-final-cta-title">See a proven system on your own leads</h2>
                <p className="ailm-final-cta-sub">
                  Book a demo and we will run a live test on your own enquiries — your listings, your script, your portals — before anything is built.
                </p>
                <div className="ailm-final-cta-btns">
                  <a className="ailm-btn-primary ailm-btn-white" href="https://cal.com/devmate/sixty-onboarding">
                    Book a demo <i className="fal fa-long-arrow-right ml-2"></i>
                  </a>
                  <Link className="ailm-btn-ghost ailm-btn-ghost--light" href="/ai-automation-dubai">
                    See AI Automation Services Dubai
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

export default ViewingDayChecklistDubaiArticle;
