"use client";
import React from "react";
import Head from "next/head";
import Link from "next/link";
import SEO from "../common/seo";
import Wrapper from "../layout/wrapper";
import HeaderThree from "@/src/layout/headers/header-3";
import FooterThree from "@/src/layout/footers/footer-3";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is an AI chatbot for Dubai real estate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An AI chatbot for Dubai real estate answers property enquiries on WhatsApp, your website, and portal leads in seconds, 24/7. It qualifies budget, area, property type, bedrooms, and timeline, then books a viewing and hands a scored lead to the right broker.",
      },
    },
    {
      "@type": "Question",
      name: "Which lead sources can it handle?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It can handle enquiries from Bayut, Property Finder, Dubizzle, WhatsApp, Instagram, and your website, with every conversation logged to your CRM, including PropSpace, HubSpot, Bitrix24, Zoho, and Salesforce where connected.",
      },
    },
    {
      "@type": "Question",
      name: "Does it work in Arabic and English?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. It qualifies leads in Arabic and English, with additional languages available for Dubai's international buyers, and hands over to a human broker when a buyer asks for one or when a question needs a person.",
      },
    },
    {
      "@type": "Question",
      name: "Is it compliant with UAE rules?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It is built with UAE PDPL and RERA data handling in mind, with DNCR screening, consent records, and an audit trail for outbound contact, as used on DevMate's AI Lead Management system for Dubai real estate.",
      },
    },
    {
      "@type": "Question",
      name: "How is an AI chatbot different from an AI call agent?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A chatbot handles written enquiries on WhatsApp and the web. An AI call agent handles voice calls and missed-call callbacks. For Dubai brokerages, the strongest setup is often both: chat for portal and WhatsApp leads, voice for phone and missed calls, with one shared, scored pipeline.",
      },
    },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI Chatbot for Dubai Real Estate",
  provider: {
    "@type": "Organization",
    name: "DevMate Solutions",
    url: "https://devmatesolutions.com",
  },
  areaServed: {
    "@type": "City",
    name: "Dubai",
  },
  description:
    "AI chatbot for Dubai real estate brokerages: instant WhatsApp and web replies, lead qualification, viewing bookings, and CRM logging, in Arabic and English, 24/7.",
};

const sectionStyle = { maxWidth: 900, margin: "0 auto", padding: "32px 20px" };
const h1Style = { fontSize: 40, lineHeight: 1.15, marginBottom: 16 };
const h2Style = { fontSize: 26, marginTop: 36, marginBottom: 12 };
const pStyle = { fontSize: 17, lineHeight: 1.7, marginBottom: 14 };
const liStyle = { fontSize: 17, lineHeight: 1.7, marginBottom: 8 };
const ctaStyle = {
  display: "inline-block",
  background: "#bd2120",
  color: "#fff",
  padding: "14px 24px",
  borderRadius: 8,
  fontWeight: 700,
  textDecoration: "none",
  marginRight: 12,
};

const ChatbotDubaiRealEstate = () => {
  return (
    <>
      <SEO
        pageTitle="AI Chatbot for Dubai Real Estate"
        pageDescription="AI chatbot for Dubai real estate brokerages: instant replies on WhatsApp and your website, qualification from Bayut, Property Finder and Dubizzle leads, viewing bookings and CRM logging, in Arabic and English, 24/7."
        pageUrl="/ai-chatbot-dubai-real-estate"
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
      </Head>
      <Wrapper>
        <HeaderThree />
        <main style={sectionStyle}>
          <h1 style={h1Style}>AI Chatbot for Dubai Real Estate</h1>
          <p style={pStyle}>
            An AI chatbot for Dubai real estate answers every property enquiry
            in seconds, day or night, on WhatsApp and your website. It qualifies
            budget, area, property type, bedrooms, and timeline, books the
            viewing, and hands a warm, scored lead to the right broker — so
            closers spend time on buyers who are ready to transact, not on
            unqualified enquiries.
          </p>
          <p style={pStyle}>
            In Dubai, buyers message several brokerages at once. The first
            useful reply usually wins. A chatbot covers the gap between a
            portal enquiry landing and a human agent picking it up, including
            nights, weekends, and off-plan launch surges.
          </p>
          <a style={ctaStyle} href="https://cal.com/devmate/sixty-onboarding">
            Book a demo
          </a>
          <Link href="/aileadmanagementdubairealestate">
            See AI Lead Management for Dubai Real Estate
          </Link>

          <h2 style={h2Style}>What the chatbot does</h2>
          <ul>
            <li style={liStyle}>Replies in under 60 seconds, 24/7, on WhatsApp and web chat.</li>
            <li style={liStyle}>Qualifies every lead: budget, area, buy or rent, bedrooms, timeline, and finance readiness.</li>
            <li style={liStyle}>Books viewings directly into broker calendars, with reminders and post-viewing follow-up.</li>
            <li style={liStyle}>Answers approved listing questions only from your live inventory, off-plan documents, and payment plans — and says so when it does not know.</li>
            <li style={liStyle}>Logs every conversation to your CRM, tagged by intent, with the full history for the broker.</li>
            <li style={liStyle}>Hands over to a human broker instantly when a buyer asks for a person or a deal needs one.</li>
          </ul>

          <h2 style={h2Style}>Built for Dubai brokerages, not a generic bot</h2>
          <ul>
            <li style={liStyle}>Portals: Bayut, Property Finder, and Dubizzle enquiries, deduplicated with WhatsApp and web leads.</li>
            <li style={liStyle}>CRMs: PropSpace, HubSpot, Bitrix24, Zoho, Salesforce, and Pipedrive, where connected.</li>
            <li style={liStyle}>Languages: Arabic and English first, with additional languages for international buyers.</li>
            <li style={liStyle}>Compliance: DNCR screening, consent records, and an audit trail, with UAE PDPL and RERA data handling in mind.</li>
            <li style={liStyle}>Channels: WhatsApp, website chat, Instagram DM, and Botim, in one shared pipeline.</li>
          </ul>

          <h2 style={h2Style}>How it works</h2>
          <ol>
            <li style={liStyle}>Share your listings, areas, and qualifying script. We draft your chatbot in Arabic and English for your review.</li>
            <li style={liStyle}>Connect your WhatsApp number, website, portals, and CRM.</li>
            <li style={liStyle}>Test live with your team on real enquiries, in both languages, and tune on the spot.</li>
            <li style={liStyle}>Go live, with a dashboard, agent training, and a tuning window after launch.</li>
          </ol>

          <h2 style={h2Style}>Chatbot, call agent, or both?</h2>
          <p style={pStyle}>
            A chatbot is best for written leads: portal enquiries, WhatsApp
            messages, and website forms. An AI call agent is best for voice:
            inbound calls and missed-call callbacks. Many Dubai brokerages
            use both, with one scored pipeline behind them. See also our{" "}
            <Link href="/callagents">AI Call Agents</Link>,{" "}
            <Link href="/whatsappautomation">WhatsApp Automation</Link>, and{" "}
            <Link href="/aileadmanagementdubairealestate">
              AI Lead Management for Dubai Real Estate
            </Link>{" "}
            pages.
          </p>

          <h2 style={h2Style}>Frequently asked questions</h2>
          <h3>What is an AI chatbot for Dubai real estate?</h3>
          <p style={pStyle}>
            It answers property enquiries on WhatsApp, your website, and portal
            leads in seconds, 24/7, qualifies the buyer, books a viewing, and
            hands a scored lead to the right broker.
          </p>
          <h3>Which lead sources can it handle?</h3>
          <p style={pStyle}>
            Bayut, Property Finder, Dubizzle, WhatsApp, Instagram, and your
            website, with every conversation logged to your CRM where connected.
          </p>
          <h3>Does it work in Arabic and English?</h3>
          <p style={pStyle}>
            Yes, with additional languages available for Dubai&apos;s
            international buyers, and human handover whenever a buyer asks for
            a person.
          </p>
          <h3>Is it compliant with UAE rules?</h3>
          <p style={pStyle}>
            It is built with UAE PDPL and RERA data handling in mind, with
            DNCR screening, consent records, and an audit trail for outbound
            contact.
          </p>
          <h3>How is an AI chatbot different from an AI call agent?</h3>
          <p style={pStyle}>
            A chatbot handles written enquiries on WhatsApp and the web. An AI
            call agent handles voice calls and missed-call callbacks. Together,
            they cover both kinds of first response with one shared pipeline.
          </p>

          <h2 style={h2Style}>Next step</h2>
          <p style={pStyle}>
            Book a demo and we will map a chatbot flow to your brokerage —
            your portals, your CRM, and your qualifying script — before anything
            is built.
          </p>
          <a style={ctaStyle} href="https://cal.com/devmate/sixty-onboarding">
            Book a demo
          </a>
        </main>
        <FooterThree />
      </Wrapper>
    </>
  );
};

export default ChatbotDubaiRealEstate;
