import Link from "next/link";
import React from "react";
import ArticleLayout from "../components/articles/ArticleLayout";

const FAQS = [
  {
    q: "What does an AI agency in Dubai actually do?",
    a: "It designs, builds and runs AI systems that do real work for a business: AI call assistants that answer and make calls, chat and WhatsApp agents that reply to enquiries, agentic AI that completes multi-step tasks across your systems, and automations that move data between your CRM, calendar and inbox. A good agency also handles the setup, testing in Arabic and English, compliance and tuning after launch.",
  },
  {
    q: "Which AI services do Dubai businesses ask for most?",
    a: "The most common requests we see are AI call assistants for inbound and outbound calls, WhatsApp and website AI agents, lead qualification and follow-up, appointment and viewing booking, CRM automation, and custom AI agents that handle a specific workflow such as reservations, onboarding or customer support.",
  },
  {
    q: "What is the difference between a chatbot and an AI agent?",
    a: "A chatbot answers questions from a script or a knowledge base. An AI agent works towards a goal: it can look up information, decide the next step, book an appointment, update a CRM record and hand over to a person, across several systems, without someone pushing every step.",
  },
  {
    q: "Do your AI systems work in Arabic and English?",
    a: "Yes. We build and test every flow in both languages, so an Arabic-speaking customer gets the same questions, the same care and the same outcome as an English-speaking one, and both land in the same record.",
  },
  {
    q: "Which industries in Dubai use AI the most?",
    a: "Real estate, hospitality, healthcare and clinics, banking and finance, retail and government services are all moving quickly. Any business that loses customers when a call or message goes unanswered benefits first.",
  },
  {
    q: "How do you handle data protection and compliance?",
    a: "We design around UAE PDPL principles for consent and data handling, screen outbound numbers where calling rules apply, keep audit trails of every contact, and agree the scripts, permissions and data flows with your team in writing before anything goes live.",
  },
  {
    q: "How much does an AI project cost?",
    a: "Contact our sales team for pricing. It depends on your channels, your volume, your languages and which systems we connect, so we quote after a short demo call rather than from a fixed list.",
  },
  {
    q: "How fast can we go live?",
    a: "Many projects go live in about two weeks from briefing: we agree the use case, build and test the flows with your team, connect your systems, then launch with a tuning window afterwards. Larger agentic projects are planned in phases.",
  },
];

const AiAgencyDubai = () => (
  <ArticleLayout
    slug="/ai-agency-dubai"
    title="AI Agency in Dubai: The AI Services Businesses Need in 2026"
    description="DevMate Solutions is an AI agency in Dubai building AI call assistants, agentic AI, WhatsApp and website AI agents, and AI automation in Arabic and English. What each service does, which industries use it, and how to choose an AI partner."
    datePublished="2026-11-14"
    badge="Dubai · AI Agency"
    headline="Your customers already expect AI-fast answers."
    headlineAccent="We build the AI that gives them."
    intro="DevMate Solutions is an AI agency based in Business Bay, Dubai. We build AI call assistants, agentic AI, WhatsApp and website AI agents, and AI automation for businesses across the UAE, in Arabic and English. This guide explains each service, where it pays off, and how to choose the right partner."
    answerTitle="An AI agency builds AI that does the work,"
    answerAccent="not just AI that talks."
    answer={
      <>
        <p>
          Dubai has made AI a national priority, from government services to banking. For most businesses the
          question is no longer whether to use AI, but where it pays off first. The answer is usually the same:
          wherever a customer waits, a lead goes cold, or a team repeats the same task every day.
        </p>
        <p>
          An AI agency turns those moments into systems: an{" "}
          <Link href="/ai-call-assistant-dubai">AI call assistant</Link> that answers every call, an{" "}
          <Link href="/agentic-ai-dubai">AI agent</Link> that completes the next step on its own, and{" "}
          <Link href="/ai-automation-dubai">AI automation</Link> that keeps your CRM and calendar up to date.
        </p>
      </>
    }
    rule="What we work to: every system is tested on your own customers before launch, works in Arabic and English, hands over to a person when asked, and logs everything your team needs to trust it."
    sections={[
      {
        eyebrow: "AI services",
        title: "The AI services Dubai businesses ask for",
        sub: "Each one starts with a real business problem, not a technology.",
        cards: [
          { icon: "fal fa-phone-volume", title: "AI Call Assistants", desc: "Answer every inbound call in seconds, call new leads back, qualify them and book the appointment, 24/7, in Arabic and English.", href: "/ai-call-assistant-dubai" },
          { icon: "fal fa-robot", title: "Agentic AI", desc: "AI agents that plan and complete multi-step work across your systems: look up, decide, book, update and hand over.", href: "/agentic-ai-dubai" },
          { icon: "fal fa-cogs", title: "AI Automation", desc: "First replies, follow-ups, reminders and CRM updates that run on their own, so your team spends its time closing.", href: "/ai-automation-dubai" },
          { icon: "fab fa-whatsapp", title: "WhatsApp and Website AI Agents", desc: "Instant, useful replies on WhatsApp and your website that qualify the enquiry and book the next step.", href: "/whatsappautomation", linkLabel: "See WhatsApp automation" },
          { icon: "fal fa-funnel-dollar", title: "AI Lead Management", desc: "One pipeline for every lead source, scored and routed to the right person with the full conversation attached.", href: "/aileadmanagementdubairealestate", linkLabel: "See AI lead management" },
          { icon: "fal fa-newspaper", title: "AI News for Dubai", desc: "What is changing in AI in Dubai and the UAE, and what it means for your business.", href: "/ai-news-dubai", linkLabel: "Read the latest" },
        ],
      },
      {
        eyebrow: "Industries",
        title: "Where AI pays off first in Dubai",
        sub: "The fastest wins come where a missed call or a slow reply costs a customer.",
        cards: [
          { icon: "fal fa-building", title: "Real Estate", desc: "Portal and WhatsApp enquiries answered in seconds, buyers qualified, viewings booked and logged to the CRM.", href: "/ai-agent-dubai-real-estate" },
          { icon: "fal fa-concierge-bell", title: "Hotels and Hospitality", desc: "Reservations, guest questions and upsells handled around the clock, in the guest's language.", href: "/ai-hospitality-dubai" },
          { icon: "fal fa-clinic-medical", title: "Clinics and Healthcare", desc: "Appointment booking, reschedules and reminders, so no new patient call goes unanswered.", href: "/ai-call-assistant-dubai", linkLabel: "See AI call assistants" },
        ],
      },
      {
        eyebrow: "How to choose",
        title: "Three checks before you hire an AI agency",
        cards: [
          { stage: "Check 1", title: "A live test on your own customers", desc: "Ask to see the system handle your real enquiries, in Arabic and English, before you sign. A polished demo on someone else's data proves little." },
          { stage: "Check 2", title: "Compliance in writing", desc: "Consent, data handling under UAE PDPL principles, calling rules and audit trails should be agreed before the build, not after launch." },
          { stage: "Check 3", title: "A named owner after go-live", desc: "AI systems need tuning. Know who answers when something goes wrong, how fast, and how changes are handled.", href: "/choose-ai-automation-agency-dubai", linkLabel: "Read the full buyer's guide" },
        ],
      },
    ]}
    related={[
      { href: "/agentic-ai-dubai", label: "Agentic AI in Dubai" },
      { href: "/ai-call-assistant-dubai", label: "AI Call Assistant in Dubai" },
      { href: "/ai-automation-dubai", label: "AI Automation Services Dubai" },
      { href: "/ai-news-dubai", label: "AI News in Dubai and the UAE" },
      { href: "/ai-hospitality-dubai", label: "AI for Hotels in Dubai" },
      { href: "/choose-ai-automation-agency-dubai", label: "How to Choose an AI Automation Agency in Dubai" },
    ]}
    faqs={FAQS}
    cta={{
      title: "Find out where AI pays off in your business",
      sub: "Book a short demo call. We will look at your channels and your customers, and show you the AI system that wins back the most time first.",
    }}
  />
);

export default AiAgencyDubai;
