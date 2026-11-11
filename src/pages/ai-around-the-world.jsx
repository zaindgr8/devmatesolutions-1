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
    q: "What did Anthropic's new Claude models actually do?",
    a: "Anthropic's newest Claude models — Fable 5.2 and Mythos 5.2 — coordinated more than 1,000 AI agents over eight days and produced a working operating system that boots on a laptop, with windows, file storage and a login screen. The same models also helped solve two open problems in black hole physics and designed three working electronic devices. Standard pricing is $8 per million input tokens and $40 per million output tokens.",
  },
  {
    q: "What is Meta's Muse Ember, and who is it for?",
    a: "Muse Ember is Meta's smallest, most efficient Muse model, built for the repetitive work that turns an agent demo into an expensive production service — tool calls, routing and repeated agent tasks. It is priced at $0.10 per million input tokens and $0.50 per million output tokens. It is for businesses that want agents running all day, on every enquiry, without the model bill growing faster than the bookings.",
  },
  {
    q: "What are Google's TPU 8tx and 8i Max?",
    a: "They are two new systems in Google's eighth-generation TPU portfolio, built for AI training and real-time agentic inference — the work agents do when they act on a lead, not just reply to it. The infrastructure behind AI is being rebuilt around agents that do jobs, and these chips are part of that shift.",
  },
  {
    q: "What is NVIDIA's GR00T 2?",
    a: "GR00T 2 is a robot foundation model that learns manual skills from human first-person video. NVIDIA reports it handles new tasks in unfamiliar places twice as well as the previous leading model — a company-reported figure, not independently verified. The idea behind it matters for every business: systems improve fastest by watching what good work actually looks like.",
  },
  {
    q: "Why do so many businesses see no return from AI?",
    a: "A recent UK survey of 504 decision makers found 83% either could not demonstrate a return from at least some of their AI spending or did not measure returns at all. The lesson is not that AI does not work — it is that buying AI without a job to do and a number to measure is how money disappears. Pick one job, give it to one system end to end, and measure booked work, not activity.",
  },
  {
    q: "How does DevMate use these new models?",
    a: "We test them on real business jobs — answering a new lead in seconds, qualifying it, and booking the appointment — before anything goes into production for a client. A model that is impressive in a press release can still fail on a 9 p.m. caller, so we run it on real enquiries first. Your team reviews and signs off the scripts and the rules before anything goes live, and every conversation is logged where your team can see it.",
  },
  {
    q: "How much does it cost?",
    a: "Contact our sales team for pricing. Pricing depends on your lead volume, your languages, and which channels and systems we connect, so we quote after a short demo call, not from a fixed list on this page.",
  },
  {
    q: "How fast can we go live?",
    a: "Most businesses go live in about two weeks from briefing: share your services and your script, review the flows, connect your channels and calendar, test live with your team, then launch with a tuning window after go-live.",
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
  headline: "AI Around the World: What This Week's AI News Means for a Business That Answers Its Customers",
  description:
    "Claude's 1,000-agent experiment built a working operating system in eight days, Meta launched a tiny model for high-volume agent work, Google shipped new AI chips, and NVIDIA taught robots by watching humans — plus the honest number: most AI spending still shows no return. What each move means for your business, and what to do with it.",
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
  mainEntityOfPage: "https://devmatesolutions.com/ai-around-the-world",
};

const MOMENTS = [
  {
    icon: "fal fa-network-wired",
    title: "Claude's 1,000-agent experiment built an operating system",
    what: "Anthropic's newest Claude models coordinated more than 1,000 AI agents over eight days and produced a working operating system that boots on a laptop — with windows, file storage and a login screen. The same models also helped solve two open problems in black hole physics and designed three working electronic devices.",
    why: "Agents are moving from answering one question at a time to doing long, coordinated jobs. The question for a business is no longer whether AI can hold a conversation — it is which long job you hand it first.",
    do: "Pick one long job in your business — answering every new lead, for example — and give it to one system, end to end, instead of five tools that each do a step.",
  },
  {
    icon: "fal fa-microchip",
    title: "Meta's Muse Ember makes high-volume agent work cheap",
    what: "Meta launched Muse Ember, a small multimodal model built for the repetitive work of AI agents — tool calls, routing and repeated tasks — at $0.10 per million input tokens and $0.50 per million output tokens.",
    why: "The cost of running agents all day is falling fast. The expensive part is no longer the model — it is the workflow around it, and a demo that never becomes a system.",
    do: "Price the job, not the model. Work out what a missed lead costs you, using your own figures, then check what an always-on answer costs. If the diary fills, the maths is simple.",
  },
  {
    icon: "fal fa-server",
    title: "Google's new chips are built for agents",
    what: "Google unveiled TPU 8tx and TPU 8i Max, new systems in its eighth-generation TPU portfolio, aimed at AI training and real-time agentic inference — the work agents do when they act on a lead, not just reply to it.",
    why: "The infrastructure behind AI is being rebuilt around agents that do jobs. A system that only replies is already behind the hardware it runs on.",
    do: "When a vendor tells you their system is AI-powered, ask what it does when the customer asks something unexpected. That is where agents earn their keep — and where chatbots stop.",
  },
  {
    icon: "fal fa-robot",
    title: "NVIDIA taught robots by watching humans",
    what: "NVIDIA unveiled GR00T 2, a robot foundation model that learns manual skills from human first-person video, and reports it handles new tasks in unfamiliar places twice as well as the previous leading model.",
    why: "The same learning-by-watching idea is already how voice agents are trained on real calls — the system improves by watching what good work actually looks like, not by reading a manual about it.",
    do: "Record what your best people actually say on a good call, and make that the script the system learns from. The best training data you own is already in your business.",
  },
];

const STEPS = [
  { stage: "Step 1", title: "Pick one job, not one tool", desc: "Choose the job AI should do first. For most businesses we work with, it is answering every new lead in seconds, in the customer's language, and booking the appointment. One job, done end to end, beats five tools that each do a step and none of them finish the job.", fix: "One job, end to end.", impact: "A system you can measure, not a demo you can show." },
  { stage: "Step 2", title: "Test it on your own leads", desc: "Run the system on your real enquiries, your real calls, your real customers — before anything is built for production. A model that is impressive in a press release can still fail on your 9 p.m. caller, your Arabic-first buyer, or your Saturday new patient.", fix: "Your leads, your calls, your test.", impact: "Proof on your own numbers, not on a benchmark." },
  { stage: "Step 3", title: "Measure booked work, not activity", desc: "The only number that matters is booked appointments — viewings, consultations, showings — not messages sent or calls answered. If the diary is not filling, the system is not working, whatever the dashboard says.", fix: "Booked work is the metric.", impact: "AI that pays for itself is AI you can see in the diary." },
];

const AiAroundTheWorldArticle = () => {
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
        pageTitle="AI Around the World: What This Week's AI News Means for a Business That Answers Its Customers"
        pageDescription="Claude's 1,000-agent experiment built a working operating system in eight days, Meta launched a tiny model for high-volume agent work, Google shipped new AI chips, and NVIDIA taught robots by watching humans — plus the honest number: most AI spending still shows no return. What each move means for your business, and what to do with it."
        pageUrl="/ai-around-the-world"
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
                <div className="ailm-hero-badge"><span className="ailm-hero-dot"></span>AI Around the World · Weekly</div>
                <h1 className="ailm-hero-headline">AI is moving fast everywhere. <span className="ailm-red">The gap is knowing what to point it at.</span></h1>
                <p className="ailm-hero-sub">
                  This week, one AI experiment coordinated more than 1,000 agents to build a working operating system in eight days. Meta launched a tiny model that makes high-volume agent work cheap. Google shipped new AI chips, and NVIDIA taught robots by watching humans. We read the news so you do not have to — here is what each move means for a business that answers its customers, and what to do with it.
                </p>
                <div className="ailm-hero-ctas">
                  <a className="ailm-btn-primary" href="https://cal.com/devmate/sixty-onboarding">Book a demo <i className="fal fa-long-arrow-right ml-2"></i></a>
                  <a className="ailm-btn-ghost" href="#moments">See the four moves</a>
                </div>
                <div className="ailm-hero-metrics">
                  <div className="ailm-metric"><span className="ailm-metric-num">1,000+ agents</span><span className="ailm-metric-label">One Experiment</span></div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric"><span className="ailm-metric-num">8 days</span><span className="ailm-metric-label">Working OS Built</span></div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric"><span className="ailm-metric-num">$0.10 / 1M tokens</span><span className="ailm-metric-label">Cheapest Agent Model</span></div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric"><span className="ailm-metric-num">83%</span><span className="ailm-metric-label">Can&apos;t Show An AI Return</span></div>
                </div>
              </div>
            </div>
          </section>

          <section className="ailm-section ailm-section--light" id="answer">
            <div className="container">
              <div className="chatbot-grid-two">
                <div className="chatbot-reveal">
                  <p className="ailm-eyebrow">The direct answer</p>
                  <h2 className="ailm-section-title">The models are getting cheaper and stranger every week. <span className="ailm-red">The gap is knowing what to point them at.</span></h2>
                  <p style={{ fontSize: 17, lineHeight: 1.7, color: "#4b5563" }}>
                    Models used to be the bottleneck — a business could not afford AI that was good enough. That bottleneck is gone. This week alone brought an experiment with more than 1,000 agents building an operating system, a model that runs agent work for cents, chips built for agents that act, and robots that learn by watching humans. All four moves point the same way: AI is moving from demos to systems that do real work.
                  </p>
                  <p style={{ fontSize: 17, lineHeight: 1.7, color: "#4b5563" }}>
                    So the question has changed. It is no longer whether AI can hold a conversation — it is which job you hand it first, and how you will know it worked. This article follows our guides on{" "}
                    <Link href="/ai-automation-dubai">AI Automation Services in Dubai</Link>,{" "}
                    <Link href="/ai-lead-response-usa">AI Lead Response USA</Link>, and{" "}
                    <Link href="/how-fast-to-reply-dubai-real-estate-leads">how fast a Dubai brokerage should reply</Link>.
                  </p>
                </div>
                <div className="chatbot-reveal">
                  <div className="speed-answer">
                    <p>
                      <strong>The rule we work to:</strong> use your own numbers. Test on your own leads. Never buy AI because the news told you to — buy it because it booked work on your own calls.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="ailm-section" id="moments">
            <div className="container">
              <div className="ailm-section-header chatbot-reveal">
                <p className="ailm-eyebrow">Around the world</p>
                <h2 className="ailm-section-title">Four moves that matter this week</h2>
                <p className="ailm-section-sub">Each one, in plain language: what happened, why it matters, and what to do with it.</p>
              </div>
              <div className="ailm-leak-grid">
                {MOMENTS.map((c, i) => (
                  <div className="ailm-leak-card chatbot-reveal" key={i}>
                    <i className={`${c.icon} ailm-agent-icon`}></i>
                    <h3 className="ailm-leak-title">{c.title}</h3>
                    <p className="ailm-leak-desc"><strong>What happened:</strong> {c.what}</p>
                    <p className="ailm-leak-desc"><strong>Why it matters:</strong> {c.why}</p>
                    <p className="ailm-leak-fix">{c.do}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="ailm-section ailm-section--light">
            <div className="container">
              <div className="ailm-section-header chatbot-reveal">
                <p className="ailm-eyebrow">What to do</p>
                <h2 className="ailm-section-title">Three habits that turn AI news into booked work</h2>
                <p className="ailm-section-sub">None of these needs a bigger team — they need one job, one test, and one number that matters.</p>
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
                  Here is the honest number from this week: a recent UK survey of 504 decision makers found 83% either could not demonstrate a return from at least some of their AI spending or did not measure returns at all. The lesson is not that AI does not work — it is that buying AI without a job to do and a number to measure is how money disappears. Your team reviews and signs off the scripts and the rules before anything goes live, and every conversation is logged where your team can see it. The business stays in control — it just stops buying tools and starts booking work.
                </p>
              </div>
              <p style={{ textAlign: "center", marginTop: 28 }}>
                Related reading:{" "}
                <Link href="/ai-automation-dubai">AI Automation Services in Dubai</Link>,{" "}
                <Link href="/ai-lead-response-usa">AI Lead Response USA</Link>,{" "}
                <Link href="/ai-agent-dubai-real-estate">AI Agent for Dubai Real Estate</Link>, and{" "}
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

          <section className="ailm-section ailm-section--light">
            <div className="container">
              <div className="chatbot-reveal">
                <p className="ailm-eyebrow">Additional Details</p>
                <ul style={{ fontSize: 17, lineHeight: 1.7, color: "#4b5563", maxWidth: 760, margin: "0 auto" }}>
                  <li><strong>Description:</strong> What this week&apos;s AI news means for a business that answers its customers — Claude&apos;s 1,000-agent experiment, Meta&apos;s Muse Ember, Google&apos;s new AI chips, NVIDIA&apos;s GR00T 2, and the honest number on AI returns.</li>
                  <li><strong>Published:</strong> 10 November 2026</li>
                  <li><strong>Contact:</strong> contact@devmatesolutions.com</li>
                  <li><strong>Phone:</strong> +1 (770) 285-5755 - Freya</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="ailm-final-cta">
            <div className="container">
              <div className="ailm-final-cta-inner">
                <p className="ailm-eyebrow ailm-eyebrow--light">Next Step</p>
                <h2 className="ailm-final-cta-title">See what this week&apos;s AI can do on your own leads</h2>
                <p className="ailm-final-cta-sub">
                  Book a demo and we will map one job — answering every new lead in seconds — to your business, your calendar, and your script — before anything is built.
                </p>
                <div className="ailm-final-cta-btns">
                  <a className="ailm-btn-primary ailm-btn-white" href="https://cal.com/devmate/sixty-onboarding">
                    Book a demo <i className="fal fa-long-arrow-right ml-2"></i>
                  </a>
                  <Link className="ailm-btn-ghost ailm-btn-ghost--light" href="/ai-automation-dubai">
                    Read AI Automation Services in Dubai
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

export default AiAroundTheWorldArticle;
