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
    q: "What is an off-plan handover?",
    a: "The handover is the sequence that ends an off-plan purchase: the developer issues a handover notice saying the unit is ready, the buyer inspects it and lists any defects, the final payment is made, the transfer is registered, and the title deed is issued in the buyer's name — then, and only then, the keys change hands. A handover notice is not a handover: it is the start of the sequence, and the buyer owns the home when the deed is issued, not when the notice arrives.",
  },
  {
    q: "What is snagging, and who does it?",
    a: "Snagging is the inspection of the finished unit before the final payment: the buyer — or a professional snagging inspector — walks every room, tests every fitting, tap, door and switch, and lists every defect in writing, with photos. The list goes to the developer, who fixes the items before the final payment is made. Snagging is the buyer's only real leverage: once the money is paid in full, the list waits on the developer's timetable, not the buyer's.",
  },
  {
    q: "What does the buyer pay at handover?",
    a: "The final payment of the purchase price — paid through the project's RERA-registered escrow account, never outside it — plus the DLD transfer fee, 4% of the purchase price, paid by the buyer unless the contract says otherwise, and the registration trustee's fee. The amounts should be confirmed with the developer and the trustee in writing before handover day, not discovered at the counter.",
  },
  {
    q: "What is Oqood, and why does it matter?",
    a: "Oqood is the Dubai Land Department's interim register for off-plan sales: the sale contract is registered there when the buyer first purchases from the developer. At handover, the Oqood registration is what the title deed replaces — the deed is issued in the buyer's name once the final payment is made and the transfer is registered. A unit whose Oqood record is not in order cannot get its deed, so the brokerage should check the record the week before handover, not on the day.",
  },
  {
    q: "What happens if the developer does not fix the snagging list?",
    a: "The list stays in writing, with a named date for each fix, and the final payment waits until the list is agreed — not paid in full and hoped for afterwards. Most items are fixed quickly once they are listed with photos and a date; the ones that drag are the ones that were never written down. The brokerage follows up on the named date, in Arabic or English as the buyer wrote, and the buyer hears the same update the developer hears.",
  },
  {
    q: "When does the buyer get the title deed and the keys?",
    a: "After the final payment is made and the transfer is registered — usually within days of handover, at the registration trustee office or straight after. The keys, the access cards, the parking remote and the service-charge account should change hands only once the deed is in the buyer's name. The listing comes down from Bayut and Property Finder once the deed is issued. The deed first, then the keys — in that order, every time.",
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
  headline: "Off-Plan Handover in Dubai: Snagging, the Final Payment and the Title Deed",
  description:
    "The developer has issued the handover notice — now what? The snagging inspection, the final payment, the DLD fee and Oqood, the title deed and the keys — and the three mistakes that cost a buyer their leverage.",
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
  mainEntityOfPage: "https://devmatesolutions.com/off-plan-handover-dubai-real-estate",
};

const MOMENTS = [
  {
    icon: "fal fa-search",
    title: "The snagging list that was never made",
    good: "The handover notice arrives, the buyer is keen to move in, and the keys are a week away. The unit looks finished — fresh paint, new fittings, everything in place.",
    dies: "Nobody inspected the unit before the keys changed hands. The buyer moves in and finds the defects one by one: a door that does not close, a tap that leaks, a socket that does not work. Each one is now a favour to ask of the developer, not a fix the developer owes before payment.",
    fix: "Inspect before paying — every room, every fitting, every defect in writing with photos.",
  },
  {
    icon: "fal fa-money-check",
    title: "The final payment made before the inspection",
    good: "The developer asks for the final payment to 'get it over with', and the buyer pays in full so the handover can move faster.",
    dies: "The money is paid, the leverage is gone, and the snagging list — made afterwards — waits on the developer's timetable for weeks. The buyer is living in a home with defects they have already paid for in full.",
    fix: "Payment follows the inspection, never the other way round.",
  },
  {
    icon: "fal fa-file-signature",
    title: "The deed that waits on a paper nobody chased",
    good: "The inspection is done, the payment is made, and the buyer expects the title deed within days.",
    dies: "The Oqood record was never checked, the service-charge clearance was never requested, or a document the trustee needs is missing — and nobody chased it until handover day. The deed waits weeks while the buyer, who heard nothing, starts to wonder whether the deal is still alive.",
    fix: "Every paper has a named owner and a date — checked the week before handover.",
  },
];

const STEPS = [
  { stage: "Step 1", title: "Inspect first, list everything", desc: "The handover notice arrives, and the snagging inspection is booked before any money moves: the buyer — or a professional inspector — walks every room, tests every fitting, tap, door and switch, and lists every defect in writing, with photos, to the developer. The list has a named date for each fix, and the buyer hears the same update the developer hears, in Arabic or English as they wrote. A snagging list made after payment is a wish list; a snagging list made before payment is a condition.", fix: "No inspection, no payment.", impact: "The defects are the developer's to fix — before the money moves." },
  { stage: "Step 2", title: "Pay the balance, register the transfer", desc: "Once the snagging list is agreed, the final payment is made through the project's RERA-registered escrow account, the DLD transfer fee — 4% of the purchase price — and the trustee's fee are settled, and the transfer is registered so the Oqood record becomes a title deed in the buyer's name. Every amount is confirmed in writing before the day, and every dirham is traceable through the escrow account. A payment made outside the escrow account is a payment with no protection.", fix: "Every dirham through the escrow account, every fee confirmed in writing.", impact: "The money is traceable, and the deed is in motion." },
  { stage: "Step 3", title: "Deed, then keys, then the record", desc: "The title deed is issued in the buyer's name, and only then do the keys, the access cards, the parking remote and the service-charge account change hands. The listing comes down from Bayut and Property Finder, and the handover is logged to the CRM so the next person who speaks to the buyer knows the deal is closed and what was handed over. A closed deal that is never logged becomes a lost referral: the buyer who was kept informed through the handover is the buyer who recommends the brokerage.", fix: "Keys, cards and remotes — only after the deed, and logged the same day.", impact: "The buyer moves in, and the brokerage keeps the relationship." },
];

const OffPlanHandoverDubaiArticle = () => {
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
        pageTitle="Off-Plan Handover in Dubai: Snagging, the Final Payment and the Title Deed"
        pageDescription="The developer has issued the handover notice — now what? The snagging inspection, the final payment, the DLD fee and Oqood, the title deed and the keys — and the three mistakes that cost a buyer their leverage."
        pageUrl="/off-plan-handover-dubai-real-estate"
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
                <h1 className="ailm-hero-headline">The handover notice is in. <span className="ailm-red">What has to happen before the keys change hands?</span></h1>
                <p className="ailm-hero-sub">
                  An off-plan handover is not a single appointment — it is a sequence: the snagging inspection, the final payment, the DLD fee and the Oqood registration, the title deed, and only then the keys. This is the sequence in order, and the three mistakes that cost a buyer their leverage.
                </p>
                <div className="ailm-hero-ctas">
                  <a className="ailm-btn-primary" href="https://cal.com/devmate/sixty-onboarding">Book a demo <i className="fal fa-long-arrow-right ml-2"></i></a>
                  <a className="ailm-btn-ghost" href="#moments">See what goes wrong</a>
                </div>
                <div className="ailm-hero-metrics">
                  <div className="ailm-metric"><span className="ailm-metric-num">3 steps</span><span className="ailm-metric-label">From Notice To Keys</span></div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric"><span className="ailm-metric-num">1 snagging list</span><span className="ailm-metric-label">Fixed Before Payment</span></div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric"><span className="ailm-metric-num">Arabic + English</span><span className="ailm-metric-label">Same Record Either Way</span></div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric"><span className="ailm-metric-num">1 title deed</span><span className="ailm-metric-label">Issued In The Buyer&apos;s Name</span></div>
                </div>
              </div>
            </div>
          </section>

          <section className="ailm-section ailm-section--light" id="answer">
            <div className="container">
              <div className="chatbot-grid-two">
                <div className="chatbot-reveal">
                  <p className="ailm-eyebrow">The direct answer</p>
                  <h2 className="ailm-section-title">The buyer owns the home <span className="ailm-red">when the deed is issued.</span></h2>
                  <p style={{ fontSize: 17, lineHeight: 1.7, color: "#4b5563" }}>
                    The handover notice says the unit is ready — it does not say the buyer owns it. First comes the snagging inspection, with every defect listed in writing and agreed with the developer. Then the final payment, made through the project&apos;s RERA-registered escrow account, with the DLD transfer fee and the trustee&apos;s fee settled. Then the transfer is registered, the Oqood record becomes a title deed in the buyer&apos;s name, and the listing comes down from Bayut and Property Finder. The keys change hands after the deed, not before. A brokerage that runs the sequence in order, and keeps the buyer updated in Arabic or English as they wrote, turns a handover that usually drifts for weeks into a single, clean close.
                  </p>
                  <p style={{ fontSize: 17, lineHeight: 1.7, color: "#4b5563" }}>
                    This guide follows our pieces on{" "}
                    <Link href="/after-offer-dubai-real-estate">what has to happen after the offer</Link>,{" "}
                    <Link href="/pre-approved-before-you-view-dubai-real-estate">getting pre-approved before the first viewing</Link>, and{" "}
                    <Link href="/second-viewing-dubai-real-estate">what a buyer is really checking on the second viewing</Link>.
                  </p>
                </div>
                <div className="chatbot-reveal">
                  <div className="speed-answer">
                    <p>
                      <strong>The rule we work to:</strong> no verified listing, no claim about it. No consent record, no outbound contact. No snagging list agreed, no final payment made. In Arabic or English, as the buyer wrote.
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
                <h2 className="ailm-section-title">Three mistakes that cost a buyer their leverage</h2>
                <p className="ailm-section-sub">Each one looks harmless on handover day. Each one costs weeks.</p>
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
                <p className="ailm-eyebrow">The handover</p>
                <h2 className="ailm-section-title">Three steps from notice to keys</h2>
                <p className="ailm-section-sub">None of these needs a bigger budget — they need a brokerage that runs them in order.</p>
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
                <h2 className="ailm-section-title">A handover is a checklist, not a hope</h2>
                <p style={{ fontSize: 17, lineHeight: 1.7, color: "#4b5563", maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
                  Done properly, the buyer walks into the finished unit with a snagging list already agreed, pays the final balance through the escrow account with every fee confirmed in writing, and walks out with the title deed in their name and the keys in their hand. The brokerage leaves with the same record in one CRM, in Arabic or English, so the handover is logged and the relationship is kept. The handover is the last step in the chain, and it is the one the buyer remembers: the day they owned the home. Run the checklist, and the day does its job.
                </p>
              </div>
              <p style={{ textAlign: "center", marginTop: 28 }}>
                Related reading:{" "}
                <Link href="/after-offer-dubai-real-estate">After the Offer: What Has to Happen Before a Dubai Buyer Gets the Keys</Link>,{" "}
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

export default OffPlanHandoverDubaiArticle;
