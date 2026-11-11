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
    q: "What should an agency show us before we sign?",
    a: "A live test on your own leads — real enquiries from Bayut, Property Finder, WhatsApp, and the phone, answered from your listings and your script, qualified in order, and booked into a real calendar. A recording of someone else's calls is not proof. A slide deck is not proof. The test is the proof: if the agency will not run one on your leads, that tells you what you need to know before you sign anything.",
  },
  {
    q: "What does a live test actually look like?",
    a: "You share a few of your listings and the script your team already uses. The agency connects your channels — portals, WhatsApp, phone, website — and runs real enquiries through the system while your team watches: the first reply, the qualification questions in order, the viewing offered, the booking confirmed, and the record logged to your CRM. Your team sees the whole conversation, including where the system hands over to a person. Then you decide, on evidence, not on a promise.",
  },
  {
    q: "How do we know the automation follows DNCR, PDPL, and RERA?",
    a: "Ask for it in writing, before the build starts: numbers screened against the Do Not Call Register, consent recorded and data handled under PDPL principles, and listings and claims kept honest under RERA — including the price, the service charges, and the payment terms. Your team reviews and signs off the scripts, the permissions, and the data handling before anything goes live, and every conversation is logged where your team can see it. This is a plain-language summary, not legal advice — your brokerage team confirms the final wording.",
  },
  {
    q: "What should Arabic and English coverage really mean?",
    a: "The same qualification, in both languages — not a translated afterthought. A buyer who writes in Arabic should get the same questions, in the same order, with the same care as a buyer who writes in English, and the answers should land in the same record either way. Ask the agency to show you a conversation in Arabic, end to end, on your listings. If the Arabic version is a shorter script with fewer questions, the coverage is not real.",
  },
  {
    q: "What systems should it connect to?",
    a: "Your portals and your record-keeping, in one pipeline: Bayut, Property Finder, and Dubizzle for enquiries; WhatsApp, phone, and your website for replies; and your CRM for the record — PropSpace, HubSpot, Bitrix24, Zoho, Salesforce, or Pipedrive. One enquiry, one record, every channel. If the agency's system keeps its own separate list that your team never sees, your team will be chasing conversations it cannot find.",
  },
  {
    q: "What happens after go-live?",
    a: "There should be a tuning window after launch, reporting your team can read in plain language, and a named person who answers when a call goes wrong or a flow needs changing. Ask who that person is, how fast they respond, and what changes cost. An agency that disappears after launch leaves you with a system that slowly goes stale — scripts that no longer match your listings, flows that no longer match your team. The build is the start, not the finish.",
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
  headline: "How to Choose an AI Automation Agency in Dubai",
  description:
    "Hiring an AI automation agency in Dubai? The questions to ask before you sign: what a good agency proves on your own leads, how it handles DNCR, PDPL and RERA in plain language, what Arabic and English coverage really means, and the red flags that tell you to walk away.",
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
  datePublished: "2026-11-11",
  dateModified: "2026-11-11",
  mainEntityOfPage: "https://devmatesolutions.com/choose-ai-automation-agency-dubai",
};

const MOMENTS = [
  {
    icon: "fal fa-play-circle",
    title: "The demo that never touches your leads",
    good: "The demo is polished: scripted questions, perfect answers, a booking made in seconds. It looks like the problem is solved.",
    dies: "Real enquiries arrive with typos, in Arabic, at 9 p.m., about a listing that changed yesterday — and the system that aced the demo has never met a real buyer.",
    fix: "A live test on your own enquiries, on your listings, before anything is signed.",
  },
  {
    icon: "fal fa-file-invoice-dollar",
    title: "The quote that arrives before the questions",
    good: "The price lands fast, before the agency has seen your portals, your CRM, or the script your team actually uses. It feels efficient.",
    dies: "The build starts, the gaps appear — a portal that needs connecting, a language that needs building, a flow your team never approved — and each one arrives as an extra.",
    fix: "A quote after a short demo call, once the agency has seen your systems and your leads.",
  },
  {
    icon: "fal fa-user-times",
    title: "The handover that never happens",
    good: "The automation answers, and the conversation ends there — no booking, no record, no person handed the buyer with the context attached.",
    dies: "Your team finds bookings in a chat thread, missed calls in a voicemail, and a buyer who has already been answered twice and helped never.",
    fix: "Booked into a real calendar, logged to your CRM, handed over with full context whenever the buyer asks for a person.",
  },
];

const STEPS = [
  { stage: "Step 1", title: "Ask for a live test on your own leads", desc: "Real enquiries from Bayut, Property Finder, WhatsApp, and the phone — your listings, your script, your team watching. The system should qualify in order, offer a viewing, confirm the booking, and log the record, all while your team sees the whole conversation. A test on your leads shows you what the system does with a real buyer; a recording shows you what it does with a scripted one.", fix: "A test on your leads, not a recording of someone else's.", impact: "You see the system work — or you see it fail — before you pay for it." },
  { stage: "Step 2", title: "Check the compliance setup in writing", desc: "Numbers screened against the Do Not Call Register, consent recorded and data handled under PDPL principles, listings and claims kept honest under RERA — including the price, the service charges, and the payment terms. Your team reviews and signs off the scripts, the permissions, and the data handling before anything goes live. If the agency cannot explain these three rules in plain language, it cannot build a system that follows them.", fix: "The three rules, in writing, before the build starts.", impact: "Automation that helps your brokerage instead of putting it at risk." },
  { stage: "Step 3", title: "Check what happens after go-live", desc: "A tuning window after launch, reporting your team can read in plain language, and a named person who answers when a call goes wrong or a flow needs changing. Ask who that person is, how fast they respond, and what changes cost — before you sign, not after the first problem. The agency you hire is the one that stays after launch, not the one that sells the build.", fix: "A named person, a tuning window, and reporting in plain language.", impact: "The system keeps improving after launch instead of slowly going stale." },
];

const ChooseAiAutomationAgencyDubaiArticle = () => {
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
        pageTitle="How to Choose an AI Automation Agency in Dubai"
        pageDescription="Hiring an AI automation agency in Dubai? The questions to ask before you sign: what a good agency proves on your own leads, how it handles DNCR, PDPL and RERA in plain language, what Arabic and English coverage really means, and the red flags that tell you to walk away."
        pageUrl="/choose-ai-automation-agency-dubai"
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
                <div className="ailm-hero-badge"><span className="ailm-hero-dot"></span>Dubai · AI Automation</div>
                <h1 className="ailm-hero-headline">The demo looked perfect. <span className="ailm-red">Will it work on your leads?</span></h1>
                <p className="ailm-hero-sub">
                  Every AI automation agency in Dubai has a polished demo. The question is not whether the demo works — it is whether the system works on your buyers: the 9 p.m. portal enquiry, the WhatsApp message in Arabic, the caller who asks about service charges before they ask about the price. This guide is the five questions that separate an agency that books viewings from one that sells software.
                </p>
                <div className="ailm-hero-ctas">
                  <a className="ailm-btn-primary" href="https://cal.com/devmate/sixty-onboarding">Book a demo <i className="fal fa-long-arrow-right ml-2"></i></a>
                  <a className="ailm-btn-ghost" href="#moments">See the red flags</a>
                </div>
                <div className="ailm-hero-metrics">
                  <div className="ailm-metric"><span className="ailm-metric-num">5 questions</span><span className="ailm-metric-label">Before You Sign</span></div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric"><span className="ailm-metric-num">Arabic + English</span><span className="ailm-metric-label">Checked In Both</span></div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric"><span className="ailm-metric-num">1 live test</span><span className="ailm-metric-label">On Your Own Leads</span></div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric"><span className="ailm-metric-num">2 weeks</span><span className="ailm-metric-label">Typical Go-Live</span></div>
                </div>
              </div>
            </div>
          </section>

          <section className="ailm-section ailm-section--light" id="answer">
            <div className="container">
              <div className="chatbot-grid-two">
                <div className="chatbot-reveal">
                  <p className="ailm-eyebrow">The direct answer</p>
                  <h2 className="ailm-section-title">A good agency proves itself on your leads, <span className="ailm-red">not on a slide deck.</span></h2>
                  <p style={{ fontSize: 17, lineHeight: 1.7, color: "#4b5563" }}>
                    Choosing an AI automation agency is not buying software. It is hiring a system that will speak to your buyers, in your name, at hours when your team is asleep. The agency worth hiring is the one that will run a live test on your own enquiries before you sign, explain DNCR, PDPL, and RERA in plain language and in writing, and show you the same qualification in Arabic and in English. Everything else — the demo, the deck, the price — comes after that.
                  </p>
                  <p style={{ fontSize: 17, lineHeight: 1.7, color: "#4b5563" }}>
                    This guide builds on our pieces on{" "}
                    <Link href="/dncr-pdpl-rera-dubai-real-estate">DNCR, PDPL, and RERA in plain language</Link>,{" "}
                    <Link href="/how-fast-to-reply-dubai-real-estate-leads">how fast a Dubai brokerage should reply</Link>, and{" "}
                    <Link href="/ai-automation-dubai">what good AI automation looks like in Dubai</Link>.
                  </p>
                </div>
                <div className="chatbot-reveal">
                  <div className="speed-answer">
                    <p>
                      <strong>The rule we work to:</strong> no proof on your own leads, no signature. No consent record, no outbound contact. No verified listing, no claim about it. In Arabic or English, as the buyer wrote.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="ailm-section" id="moments">
            <div className="container">
              <div className="ailm-section-header chatbot-reveal">
                <p className="ailm-eyebrow">The red flags</p>
                <h2 className="ailm-section-title">Three signs to walk away from an agency</h2>
                <p className="ailm-section-sub">Each one looks harmless in a sales call. Each one costs a brokerage its buyers.</p>
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
                <p className="ailm-eyebrow">How to choose</p>
                <h2 className="ailm-section-title">Three checks before you sign anything</h2>
                <p className="ailm-section-sub">None of these needs a bigger budget — they need an agency willing to be tested.</p>
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
                <h2 className="ailm-section-title">Choosing is not buying software</h2>
                <p style={{ fontSize: 17, lineHeight: 1.7, color: "#4b5563", maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
                  A good agency leaves your brokerage with a system your team can run: scripts your team approved, in Arabic and English; records your team can read, in one CRM; bookings your team can see, in a real calendar. The automation answers every enquiry in seconds, qualifies in order, books the viewing, and hands over with full context whenever the buyer asks for a person. It replaces the missed call, not the broker. The five questions in this guide are the fastest way to tell whether the agency in front of you will build that system — or sell you a demo of one.
                </p>
              </div>
              <p style={{ textAlign: "center", marginTop: 28 }}>
                Related reading:{" "}
                <Link href="/ai-automation-dubai">AI Automation Services Dubai</Link>,{" "}
                <Link href="/ai-agent-dubai-real-estate">AI Agent for Dubai Real Estate</Link>,{" "}
                <Link href="/ai-chatbot-dubai-real-estate">AI Chatbot for Dubai Real Estate</Link>,{" "}
                <Link href="/dncr-pdpl-rera-dubai-real-estate">DNCR, PDPL and RERA: The Three Rules Behind Automated Calls and WhatsApp in Dubai Real Estate</Link>,{" "}
                <Link href="/how-fast-to-reply-dubai-real-estate-leads">How Fast Should a Dubai Brokerage Reply to a Bayut / Property Finder Lead?</Link>,{" "}
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

export default ChooseAiAutomationAgencyDubaiArticle;
