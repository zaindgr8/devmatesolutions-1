"use client";
import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import SEO from "../common/seo";
import Wrapper from "../layout/wrapper";
import HeaderThree from "@/src/layout/headers/header-3";
import FooterThree from "@/src/layout/footers/footer-3";

const CATEGORIES = [
  "All",
  "Dubai Real Estate",
  "USA Real Estate",
  "Dental",
  "Aesthetics / Med Spas",
  "AI Automation & SIXTY",
  "Company & Services",
];

// Every card below links to a page that is live on devmatesolutions.com
// today (see the live sitemap). Summaries are written in our own words.
// No prices anywhere: contact our sales team for pricing.
const POSTS = [
  {
    title: "AI Agent for Dubai Real Estate",
    slug: "/ai-agent-dubai-real-estate",
    category: "Dubai Real Estate",
    summary:
      "An AI agent that answers Dubai brokerage enquiries, qualifies buyers and renters, and books viewings — built around Bayut, Property Finder, RERA and DNCR rules.",
  },
  {
    title: "AI Chatbot for Dubai Real Estate",
    slug: "/ai-chatbot-dubai-real-estate",
    category: "Dubai Real Estate",
    summary:
      "A chatbot for Dubai property teams that answers portal and website enquiries in Arabic and English, and hands qualified leads to the agents.",
  },
  {
    title: "How Fast Should a Dubai Brokerage Reply to a Bayut / Property Finder Lead?",
    slug: "/how-fast-to-reply-dubai-real-estate-leads",
    category: "Dubai Real Estate",
    summary:
      "Why reply speed decides which Dubai brokerage wins the listing — and what a fast, useful first answer looks like in practice.",
  },
  {
    title: "WhatsApp vs Phone vs Portal: Where Dubai Real Estate Leads Actually Die",
    slug: "/whatsapp-phone-portal-dubai-real-estate-leads",
    category: "Dubai Real Estate",
    summary:
      "WhatsApp, phone and portal enquiries compared: where Dubai leads actually arrive, and which channel your team should answer first.",
  },
  {
    title: "AI Lead Management System for Dubai Real Estate",
    slug: "/aileadmanagementdubairealestate",
    category: "Dubai Real Estate",
    summary:
      "The done-for-you front desk for Dubai brokerages: AI voice, WhatsApp and chat answering, qualifying and booking every new lead.",
  },
  {
    title: "AI Call Assistant for US Real Estate",
    slug: "/ai-call-assistant-usa-real-estate",
    category: "USA Real Estate",
    summary:
      "AI voice calls that answer US real estate leads in seconds, qualify them and book viewings — voice first, for Miami, Houston and Dallas–Fort Worth teams.",
  },
  {
    title: "AI Lead Response USA — Every New Lead Answered in Seconds",
    slug: "/ai-lead-response-usa",
    category: "USA Real Estate",
    summary:
      "How US businesses answer every new lead on the phone in seconds, book it into a real calendar and log it — no callback, no message slip.",
  },
  {
    title: "AI Call Assistant for Dental Clinics USA",
    slug: "/ai-call-assistant-dental-usa",
    category: "Dental",
    summary:
      "AI voice answering for US dental clinics: appointment bookings, reschedules and confirmations handled on the call itself, with consent and opt-out built in.",
  },
  {
    title: "AI Call Assistant for Med Spas and Aesthetics Clinics USA",
    slug: "/ai-call-assistant-aesthetics-usa",
    category: "Aesthetics / Med Spas",
    summary:
      "AI voice for US med spas and aesthetics clinics: consultations and treatments booked on the first call — including after-hours enquiries.",
  },
  {
    title: "AI Automation Agency Dubai",
    slug: "/ai-automation-dubai",
    category: "AI Automation & SIXTY",
    summary:
      "AI automation for Dubai businesses: the systems that answer, qualify and book leads while your team serves the clients in front of them.",
  },
  {
    title: "WhatsApp Automation Dubai",
    slug: "/whatsappautomation",
    category: "AI Automation & SIXTY",
    summary:
      "WhatsApp automation that answers new enquiries instantly, qualifies them and books the next step, on the official WhatsApp Business API.",
  },
  {
    title: "AI Call Agents & Voice Automation",
    slug: "/callagents",
    category: "AI Automation & SIXTY",
    summary:
      "AI call agents that hold real phone conversations: answering questions, qualifying callers and booking appointments on your behalf.",
  },
  {
    title: "AI Automation & Software Development Services",
    slug: "/ourservices",
    category: "Company & Services",
    summary:
      "Everything we build at DevMate: AI agents, automation and custom software, from one Dubai-based team.",
  },
  {
    title: "Meet Our Team — AI & Software Experts",
    slug: "/our-team",
    category: "Company & Services",
    summary:
      "The people behind DevMate Solutions, the Dubai AI and software agency.",
  },
  {
    title: "Careers at DevMate Solutions — Join Our AI Team in Dubai",
    slug: "/job",
    category: "Company & Services",
    summary:
      "Open roles at DevMate Solutions and how to apply to join the team.",
  },
  {
    title: "Zain Ul Abideen Baloch — Founder & CEO, DevMate Solutions",
    slug: "/zain-ul-abideen-baloch",
    category: "Company & Services",
    summary:
      "The founder behind DevMate Solutions and AI Founder Hub, and the work behind the 6-second lead promise.",
  },
];

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "DevMate Insights",
  url: "https://devmatesolutions.com/blog",
  description:
    "Insights from DevMate Solutions on AI that answers, qualifies and books every new lead — for Dubai real estate, US real estate, dental and aesthetics teams.",
  blogPost: POSTS.map((p) => ({
    "@type": "BlogPosting",
    headline: p.title,
    url: `https://devmatesolutions.com${p.slug}`,
    author: { "@type": "Organization", name: "DevMate Solutions" },
  })),
};

const index = () => {
  const [active, setActive] = useState("All");
  const visible = active === "All" ? POSTS : POSTS.filter((p) => p.category === active);

  return (
    <>
      <SEO
        pageTitle="Blog | AI Insights for Real Estate, Dental & Aesthetics Teams"
        pageDescription="Insights from DevMate Solutions: AI that answers, qualifies and books every new lead. Dubai real estate, US real estate, dental clinics, med spas and AI automation."
        pageUrl="/blog"
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
        />
        <style>{`
          .blog-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
          @media (max-width: 992px) { .blog-grid { grid-template-columns: repeat(2, 1fr); } }
          @media (max-width: 640px) { .blog-grid { grid-template-columns: 1fr; } }
          .blog-card { background: #fff; border: 1px solid #e5e7eb; border-radius: 20px; padding: 26px; display: flex; flex-direction: column; height: 100%; transition: box-shadow .25s ease, transform .25s ease; }
          .blog-card:hover { box-shadow: 0 20px 50px rgba(13,13,13,.10); transform: translateY(-3px); }
          .blog-card-cat { display: inline-block; font-size: 12px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: #C8102E; margin-bottom: 12px; }
          .blog-card-title { font-size: 21px; line-height: 1.35; color: #2B2E34; margin: 0 0 10px; }
          .blog-card-summary { font-size: 16px; line-height: 1.65; color: #4b5563; margin: 0 0 18px; flex: 1; }
          .blog-card-link { font-weight: 700; color: #C8102E; text-decoration: none; }
          .blog-card-link:hover { text-decoration: underline; }
          .blog-filters { display: flex; flex-wrap: wrap; gap: 10px; margin: 28px 0 8px; }
          .blog-filter { border: 1px solid #e5e7eb; background: #fff; color: #2B2E34; border-radius: 999px; padding: 9px 18px; font-size: 14px; font-weight: 600; cursor: pointer; }
          .blog-filter--active { background: #2B2E34; color: #fff; border-color: #2B2E34; }
          .blog-feature { background: #2B2E34; border-radius: 24px; padding: 36px; color: #fff; display: grid; grid-template-columns: 1.2fr .8fr; gap: 28px; align-items: center; margin: 30px 0 10px; }
          @media (max-width: 768px) { .blog-feature { grid-template-columns: 1fr; } }
          .blog-feature-eyebrow { font-size: 12px; letter-spacing: .1em; text-transform: uppercase; color: #fca5a5; font-weight: 700; }
          .blog-feature-title { font-size: 30px; line-height: 1.25; margin: 10px 0 12px; }
          .blog-feature-title span { color: #f87171; }
          .blog-feature-text { font-size: 16px; line-height: 1.65; color: #e5e7eb; margin: 0; }
          .blog-feature-num { font-size: 64px; font-weight: 800; line-height: 1; color: #fff; }
          .blog-feature-num small { font-size: 20px; color: #fca5a5; }
          .blog-feature-note { font-size: 14px; color: #d1d5db; margin-top: 8px; }
          .blog-count { font-size: 15px; color: #6b7280; margin: 18px 0 0; }
        `}</style>
      </Head>
      <Wrapper>
        <HeaderThree />
        <main className="ailm-page">
          <section className="ailm-hero">
            <div className="container">
              <div className="ailm-hero-header-wrap">
                <div className="ailm-hero-badge">
                  <span className="ailm-hero-dot"></span>DevMate Insights · Blog
                </div>
                <h1 className="ailm-hero-headline">
                  Insights from DevMate — AI that answers, qualifies and <span className="ailm-red">books.</span>
                </h1>
                <p className="ailm-hero-sub">
                  Everything we have published so far, in one place: how Dubai
                  brokerages, US real estate teams, dental clinics and med spas
                  stop losing leads to slow replies — and what we build to fix
                  it. No theory for its own sake, just what works on real
                  enquiries.
                </p>
                <div className="ailm-hero-ctas">
                  <a className="ailm-btn-primary" href="https://cal.com/devmate/sixty-onboarding">
                    Book a demo <i className="fal fa-long-arrow-right ml-2"></i>
                  </a>
                  <a className="ailm-btn-ghost" href="#articles">Browse the articles</a>
                </div>
              </div>

              <div className="blog-feature">
                <div>
                  <p className="blog-feature-eyebrow">Featured · SIXTY by DevMate</p>
                  <h2 className="blog-feature-title">
                    Every new lead answered in <span>6.0 seconds.</span> Or your money back.
                  </h2>
                  <p className="blog-feature-text">
                    That is the SIXTY promise: a done-for-you AI voice and
                    WhatsApp front desk that answers, qualifies and books every
                    new lead — live in 7 days. The articles below show how it
                    plays out, niche by niche.
                  </p>
                </div>
                <div>
                  <div className="blog-feature-num">6.0<small> seconds</small></div>
                  <p className="blog-feature-note">
                    First answer, every new lead · Live in 7 days · Contact our
                    sales team for pricing
                  </p>
                  <div style={{ marginTop: 18 }}>
                    <a className="ailm-btn-primary ailm-btn-white" href="https://cal.com/devmate/sixty-onboarding">
                      Book a demo <i className="fal fa-long-arrow-right ml-2"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="ailm-section" id="articles">
            <div className="container">
              <p className="ailm-eyebrow">All articles &amp; pages</p>
              <h2 className="ailm-section-title">
                Browse by <span className="ailm-red">topic.</span>
              </h2>
              <div className="blog-filters">
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    type="button"
                    className={`blog-filter${active === c ? " blog-filter--active" : ""}`}
                    onClick={() => setActive(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <p className="blog-count">
                Showing {visible.length} of {POSTS.length} pages live on devmatesolutions.com.
              </p>
              <div className="blog-grid" style={{ marginTop: 22 }}>
                {visible.map((p) => (
                  <article className="blog-card" key={p.slug}>
                    <span className="blog-card-cat">{p.category}</span>
                    <h3 className="blog-card-title">{p.title}</h3>
                    <p className="blog-card-summary">{p.summary}</p>
                    <Link className="blog-card-link" href={p.slug}>
                      Read more →
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="ailm-final-cta">
            <div className="container">
              <div className="ailm-final-cta-inner">
                <p className="ailm-eyebrow ailm-eyebrow--light">Next Step</p>
                <h2 className="ailm-final-cta-title">Want this for your own leads?</h2>
                <p className="ailm-final-cta-sub">
                  Book a demo and we will map a lead-response flow to your
                  business — your markets, your calendar, and your qualifying
                  script — before anything is built.
                </p>
                <div className="ailm-final-cta-btns">
                  <a className="ailm-btn-primary ailm-btn-white" href="https://cal.com/devmate/sixty-onboarding">
                    Book a demo <i className="fal fa-long-arrow-right ml-2"></i>
                  </a>
                  <Link className="ailm-btn-ghost ailm-btn-ghost--light" href="/ourservices">
                    See our services
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

export default index;
