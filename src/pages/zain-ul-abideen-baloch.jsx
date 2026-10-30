"use client";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import SEO from "../common/seo";
import Wrapper from "../layout/wrapper";
import HeaderThree from "@/src/layout/headers/header-3";
import FooterThree from "@/src/layout/footers/footer-3";

const SAME_AS = [
  "https://www.linkedin.com/in/zainulabideenunicorn/",
  "https://www.instagram.com/zainulabideen.unicorn/",
  "https://www.instagram.com/devmatesolutions/",
  "https://www.instagram.com/aifounderhubofficial/",
  "https://www.youtube.com/channel/UC990B95EKNuVaCVcdo_-9Yg",
  "https://www.youtube.com/@zainulabideen.unicorn",
  "https://devmatesolutions.com",
  "https://aifounderhub.com",
  "https://sixty.devmatesolutions.com",
];

const FAQS = [
  {
    q: "Who is Zain Ul Abideen Baloch?",
    a: "Zain Ul Abideen Baloch is the Founder and CEO of DevMate Solutions, a Dubai AI and software agency, and the co-founder of AI Founder Hub. He is based in Dubai, and he works with businesses in Dubai, Muscat, and New York, building AI systems that answer leads, qualify them, and book the next step.",
  },
  {
    q: "What does DevMate Solutions do?",
    a: "DevMate Solutions is an AI-powered software agency based in Business Bay, Dubai, operating since 2019 with more than 40 past B2B clients. We build AI lead management systems, AI call assistants, WhatsApp automation, AI chatbots, and custom software for businesses in the GCC, the UK, the US, and Europe.",
  },
  {
    q: "What is SIXTY?",
    a: "SIXTY is DevMate's AI WhatsApp and voice lead-response product. Every new lead is answered in 6.0 seconds, or your money back. It qualifies the lead, books the next step, and syncs to the client's CRM. It is done-for-you and live in 7 days. For pricing, contact our sales team.",
  },
  {
    q: "What is AI Founder Hub?",
    a: "AI Founder Hub is an AI education platform for entrepreneurs, co-founded by Zain Ul Abideen Baloch and Ahmed Yahya. It runs free weekly live masterclasses, a monthly cohort, and the AAA Accelerator, which helps founders start an AI agency and land a first client. It also runs the Inner Circle Dxb founder community in Dubai.",
  },
  {
    q: "Where is Zain Ul Abideen Baloch based?",
    a: "Dubai, United Arab Emirates. DevMate Solutions is headquartered in Business Bay, Dubai, with a presence in Muscat and New York.",
  },
  {
    q: "How can we book a meeting with Zain Ul Abideen Baloch?",
    a: "Book a meeting at https://cal.com/devmate/meet-zain. For a SIXTY demo, book at https://cal.com/devmate/sixty-onboarding.",
  },
  {
    q: "How much does it cost to work with DevMate Solutions?",
    a: "Contact our sales team for pricing. Pricing depends on your channels, your volume, and which systems we connect, so we quote after a short demo call, not from a fixed list on this page.",
  },
];

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Zain Ul Abideen Baloch",
  alternateName: "Zain Ul Abideen",
  jobTitle: "Founder & CEO, DevMate Solutions",
  description:
    "Founder and CEO of DevMate Solutions, a Dubai AI and software agency, and co-founder of AI Founder Hub, an AI education platform for entrepreneurs.",
  url: "https://devmatesolutions.com/zain-ul-abideen-baloch",
  address: { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" },
  worksFor: [
    { "@type": "Organization", name: "DevMate Solutions", url: "https://devmatesolutions.com" },
    { "@type": "Organization", name: "AI Founder Hub", url: "https://aifounderhub.com" },
  ],
  founder: [
    { "@type": "Organization", name: "DevMate Solutions", url: "https://devmatesolutions.com" },
  ],
  sameAs: SAME_AS,
  knowsAbout: [
    "AI Lead Management",
    "AI Call Assistants",
    "WhatsApp Automation",
    "AI Chatbots",
    "AI Automation",
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const VENTURES = [
  {
    num: "01",
    icon: "fal fa-robot",
    title: "DevMate Solutions",
    desc: "AI-powered software agency in Dubai, operating since 2019. AI lead management, AI call assistants, WhatsApp automation, chatbots, and custom software for more than 40 past B2B clients.",
    href: "/ai-automation-dubai",
    linkText: "See AI Automation Dubai",
  },
  {
    num: "02",
    icon: "fal fa-bolt",
    title: "SIXTY",
    desc: "Every new lead answered in 6.0 seconds, or your money back. AI voice and WhatsApp that qualifies leads, books the next step, and syncs to your CRM — done-for-you, live in 7 days.",
    href: "https://sixty.devmatesolutions.com",
    linkText: "See SIXTY",
  },
  {
    num: "03",
    icon: "fal fa-users",
    title: "AI Founder Hub",
    desc: "AI education for entrepreneurs, co-founded with Ahmed Yahya. Free weekly live masterclasses, a monthly cohort, and the AAA Accelerator, plus the Inner Circle Dxb founder community in Dubai.",
    href: "https://aifounderhub.com",
    linkText: "See AI Founder Hub",
  },
];

const PROFILES = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/zainulabideenunicorn/", note: "Founder posts on AI tools and founder strategy" },
  { label: "Instagram — personal", href: "https://www.instagram.com/zainulabideen.unicorn/", note: "@zainulabideen.unicorn — daily AI and founder content" },
  { label: "Instagram — DevMate", href: "https://www.instagram.com/devmatesolutions/", note: "@devmatesolutions" },
  { label: "Instagram — AI Founder Hub", href: "https://www.instagram.com/aifounderhubofficial/", note: "@aifounderhubofficial" },
  { label: "YouTube", href: "https://www.youtube.com/@zainulabideen.unicorn", note: "@zainulabideen.unicorn" },
  { label: "DevMate Solutions", href: "https://devmatesolutions.com", note: "devmatesolutions.com" },
  { label: "AI Founder Hub", href: "https://aifounderhub.com", note: "aifounderhub.com" },
  { label: "SIXTY", href: "https://sixty.devmatesolutions.com", note: "sixty.devmatesolutions.com" },
];

const ZainUlAbideenBaloch = () => {
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
        pageTitle="Zain Ul Abideen Baloch | Founder & CEO, DevMate Solutions | Co-founder, AI Founder Hub, Dubai"
        pageDescription="Zain Ul Abideen Baloch is the Founder & CEO of DevMate Solutions and co-founder of AI Founder Hub, based in Dubai. We build AI lead management, AI call assistants, WhatsApp automation, and SIXTY — every new lead answered in 6.0 seconds."
        pageUrl="/zain-ul-abideen-baloch"
      />
      <Head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <style>{`
          .chatbot-reveal { opacity: 0; transform: translateY(18px); transition: opacity .6s ease, transform .6s ease; }
          .chatbot-reveal--visible { opacity: 1; transform: translateY(0); }
          .chatbot-grid-two { display: grid; grid-template-columns: 1.1fr .9fr; gap: 40px; align-items: center; }
          @media (max-width: 768px) { .chatbot-grid-two { grid-template-columns: 1fr; } }
        `}</style>
      </Head>
      <Wrapper>
        <HeaderThree />
        <main className="ailm-page">
          <section className="ailm-hero">
            <div className="container">
              <div className="ailm-hero-header-wrap">
                <div className="ailm-hero-badge"><span className="ailm-hero-dot"></span>Dubai · Founder &amp; CEO, DevMate Solutions</div>
                <h1 className="ailm-hero-headline">Zain Ul Abideen Baloch — <span className="ailm-red">building AI that answers first.</span></h1>
                <p className="ailm-hero-sub">
                  Zain Ul Abideen Baloch is the Founder and CEO of DevMate Solutions, a Dubai AI and software agency, and the co-founder of AI Founder Hub. We build AI systems that answer every new lead, qualify it, and book the next step — so businesses stop losing customers in the gap between an enquiry and a reply.
                </p>
                <div className="ailm-hero-ctas">
                  <a className="ailm-btn-primary" href="https://cal.com/devmate/meet-zain">Book a meeting <i className="fal fa-long-arrow-right ml-2"></i></a>
                  <a className="ailm-btn-ghost" href="#ventures">See what we build</a>
                </div>
                <div className="ailm-hero-metrics">
                  <div className="ailm-metric"><span className="ailm-metric-num">Dubai</span><span className="ailm-metric-label">Based · Business Bay HQ</span></div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric"><span className="ailm-metric-num">2019</span><span className="ailm-metric-label">DevMate Operating Since</span></div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric"><span className="ailm-metric-num">40+</span><span className="ailm-metric-label">Past B2B Clients</span></div>
                  <div className="ailm-metric-divider"></div>
                  <div className="ailm-metric"><span className="ailm-metric-num">6.0s</span><span className="ailm-metric-label">SIXTY Lead Answer</span></div>
                </div>
              </div>
            </div>
          </section>

          <section className="ailm-section ailm-section--light">
            <div className="container">
              <div className="chatbot-grid-two">
                <div className="chatbot-reveal">
                  <p className="ailm-eyebrow">Who we are</p>
                  <h2 className="ailm-section-title">One founder, <span className="ailm-red">three things we do well.</span></h2>
                  <p style={{ fontSize: 17, lineHeight: 1.7, color: "#4b5563" }}>
                    DevMate Solutions started in 2019 as a software, AI, and digital marketing agency. Today we run AI lead management for businesses that live or die on speed to first reply — real estate teams, clinics, and service businesses in Dubai and abroad.
                  </p>
                  <p style={{ fontSize: 17, lineHeight: 1.7, color: "#4b5563" }}>
                    AI Founder Hub, co-founded with Ahmed Yahya, teaches founders the same systems we sell: how to build an AI lead management system, package it, and land a first client. Inner Circle Dxb brings Dubai founders together in person, regularly, to do business with each other.
                  </p>
                </div>
                <div className="chatbot-reveal">
                  <div className="chatbot-chat" style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 20, boxShadow: "0 20px 50px rgba(13,13,13,.08)", padding: 20, maxWidth: 420, margin: "0 auto" }}>
                    <p style={{ fontSize: 12, letterSpacing: ".08em", textTransform: "uppercase", color: "#6b7280", textAlign: "center", marginBottom: 14 }}>At a glance</p>
                    <p style={{ fontSize: 16, lineHeight: 1.7, color: "#374151" }}><strong>Founder &amp; CEO:</strong> DevMate Solutions (TechMate Solutions FZ LLC)</p>
                    <p style={{ fontSize: 16, lineHeight: 1.7, color: "#374151" }}><strong>Co-founder:</strong> AI Founder Hub, with Ahmed Yahya</p>
                    <p style={{ fontSize: 16, lineHeight: 1.7, color: "#374151" }}><strong>Community:</strong> Inner Circle Dxb, Dubai founders</p>
                    <p style={{ fontSize: 16, lineHeight: 1.7, color: "#374151" }}><strong>Based:</strong> Dubai · presence in Muscat and New York</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="ailm-section" id="ventures">
            <div className="container">
              <div className="ailm-section-header chatbot-reveal">
                <p className="ailm-eyebrow">What we build</p>
                <h2 className="ailm-section-title">DevMate, SIXTY, and AI Founder Hub</h2>
              </div>
              <div className="ailm-agents-grid">
                {VENTURES.map((v, i) => (
                  <div className="ailm-agent-card chatbot-reveal" key={i}>
                    <span className="ailm-agent-num">{v.num}</span>
                    <i className={`${v.icon} ailm-agent-icon`}></i>
                    <h3 className="ailm-agent-name">{v.title}</h3>
                    <p className="ailm-agent-desc">{v.desc}</p>
                    <p><a href={v.href}>{v.linkText}</a></p>
                  </div>
                ))}
              </div>
              <p style={{ textAlign: "center", marginTop: 28 }}>
                For the services behind these products, see{" "}
                <Link href="/ai-automation-dubai">AI Automation Dubai</Link>,{" "}
                <Link href="/ai-chatbot-dubai-real-estate">AI Chatbot for Dubai Real Estate</Link>,{" "}
                <Link href="/aileadmanagementdubairealestate">AI Lead Management for Dubai Real Estate</Link>,{" "}
                <Link href="/whatsappautomation">WhatsApp Automation</Link>,{" "}
                <Link href="/callagents">AI Call Agents</Link>, and{" "}
                <Link href="/ai-call-assistant-usa-real-estate">AI Call Assistant for US Real Estate</Link>.
              </p>
            </div>
          </section>

          <section className="ailm-section ailm-section--light">
            <div className="container">
              <div className="ailm-section-header chatbot-reveal">
                <p className="ailm-eyebrow">Find us everywhere</p>
                <h2 className="ailm-section-title">The official profiles for Zain Ul Abideen Baloch</h2>
                <p className="ailm-section-sub">These are the profiles linked from this page. If a profile is not listed here, it is not the official one.</p>
              </div>
              <div className="ailm-channels-grid">
                {PROFILES.map((p, i) => (
                  <div className="ailm-channel-card chatbot-reveal" key={i}>
                    <h3 className="ailm-channel-label"><a href={p.href}>{p.label}</a></h3>
                    <p className="ailm-channel-items">{p.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="ailm-section">
            <div className="container">
              <div className="ailm-section-header chatbot-reveal">
                <p className="ailm-eyebrow">Pricing</p>
                <h2 className="ailm-section-title">Contact our sales team for pricing</h2>
                <p className="ailm-section-sub">Pricing depends on your channels, your volume, and which systems we connect. We quote after a short demo call, so you get a price for your setup — not a generic list.</p>
              </div>
              <p style={{ textAlign: "center" }}>
                <a className="ailm-btn-primary" href="https://cal.com/devmate/sixty-onboarding">Contact our sales team <i className="fal fa-long-arrow-right ml-2"></i></a>
              </p>
            </div>
          </section>

          <section className="ailm-section ailm-section--light">
            <div className="container">
              <div className="ailm-section-header chatbot-reveal">
                <p className="ailm-eyebrow">Common Questions</p>
                <h2 className="ailm-section-title">Frequently Asked Questions</h2>
              </div>
              <div className="ailm-faqs">
                {FAQS.map((faq, i) => (
                  <div className={`ailm-faq ${openFaq === i ? "ailm-faq--open" : ""}`} key={i}>
                    <button className="ailm-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
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
                <h2 className="ailm-final-cta-title">Book a meeting with Zain Ul Abideen Baloch</h2>
                <p className="ailm-final-cta-sub">For a personal meeting, book at cal.com/devmate/meet-zain. For a SIXTY demo, book at cal.com/devmate/sixty-onboarding.</p>
                <div className="ailm-final-cta-btns">
                  <a className="ailm-btn-primary ailm-btn-white" href="https://cal.com/devmate/meet-zain">Book a meeting <i className="fal fa-long-arrow-right ml-2"></i></a>
                  <a className="ailm-btn-primary ailm-btn-white" href="https://cal.com/devmate/sixty-onboarding">Book a SIXTY demo <i className="fal fa-long-arrow-right ml-2"></i></a>
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

export default ZainUlAbideenBaloch;
