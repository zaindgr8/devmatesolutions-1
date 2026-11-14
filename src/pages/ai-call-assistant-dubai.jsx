import Link from "next/link";
import React from "react";
import ArticleLayout from "../components/articles/ArticleLayout";

const FAQS = [
  {
    q: "What is an AI call assistant?",
    a: "An AI call assistant is a voice agent that answers and makes phone calls for your business. It speaks naturally, understands what the caller needs, answers from your own information, qualifies the caller, books the appointment and logs the call, at any hour.",
  },
  {
    q: "Can an AI call assistant speak Arabic and English?",
    a: "Yes. We build and test every call flow in Arabic and English, and the assistant replies in the caller's language, so every caller gets the same care.",
  },
  {
    q: "Will callers know they are talking to AI?",
    a: "If they ask, the assistant says so honestly. Most callers care more that they are answered immediately, helped properly and handed to a person when they want one.",
  },
  {
    q: "What happens when the caller wants a person?",
    a: "The assistant transfers the call or books a callback with your team, and passes on a short summary so the caller never has to repeat themselves.",
  },
  {
    q: "Can it make outbound calls to new leads?",
    a: "Yes. It can call new web, ad and portal leads back within seconds of the enquiry, and follow up on older leads, with numbers screened and consent respected wherever calling rules apply.",
  },
  {
    q: "Which systems does it connect to?",
    a: "Your calendar for bookings and your CRM for records, such as HubSpot, Salesforce, Zoho, PropSpace, Bitrix24 or Pipedrive, plus WhatsApp for confirmations and reminders.",
  },
  {
    q: "How much does an AI call assistant cost?",
    a: "Contact our sales team for pricing. It depends on your call volume, languages and the systems we connect, so we quote after a short demo call.",
  },
  {
    q: "Can I hear one before we decide?",
    a: "Yes. Try our live voice demos in your browser on our AI call agents page, or book a demo and we will build a test on your own script.",
  },
];

const AiCallAssistantDubai = () => (
  <ArticleLayout
    slug="/ai-call-assistant-dubai"
    title="AI Call Assistant in Dubai: Answer Every Call in Arabic and English"
    description="An AI call assistant for Dubai businesses that answers every call in seconds, in Arabic and English, qualifies the caller, books the appointment and logs it to your CRM. How it works, where it fits and what to ask."
    datePublished="2026-11-14"
    badge="Dubai · AI Call Assistant"
    headline="Every unanswered call is a customer"
    headlineAccent="calling your competitor next."
    intro="An AI call assistant answers every call in seconds, day and night, in Arabic and English. It answers questions from your own information, qualifies the caller, books the appointment and logs the call, then hands over to your team when a person is needed."
    answerTitle="Answered in seconds,"
    answerAccent="booked before they hang up."
    answer={
      <>
        <p>
          Calls arrive at the worst times: during a viewing, after hours, on a weekend, during a launch. An AI
          call assistant picks up every one, the same way every time, and turns it into a booked appointment or
          a qualified lead your team can act on.
        </p>
        <p>
          It is one of the core services we build as an <Link href="/ai-agency-dubai">AI agency in Dubai</Link>,
          and you can hear one now in our <Link href="/callagents">live AI voice demos</Link>.
        </p>
      </>
    }
    rule="Our standard: every call answered, the caller served in their language, the outcome logged, and a person one request away."
    sections={[
      {
        eyebrow: "What it does",
        title: "What an AI call assistant handles for you",
        cards: [
          { icon: "fal fa-phone-alt", title: "Inbound calls, 24/7", desc: "No hold music and no voicemail. Every caller is greeted, helped and booked, even at 2 a.m." },
          { icon: "fal fa-redo", title: "Fast callbacks to new leads", desc: "New web, ad and portal leads get a call within seconds, while they are still interested." },
          { icon: "fal fa-calendar-alt", title: "Bookings and reminders", desc: "Appointments, viewings and reservations booked into your real calendar, with reminders that cut no-shows." },
          { icon: "fal fa-file-alt", title: "A summary of every call", desc: "Intent, details and next step written to your CRM, so your team picks up exactly where the AI left off." },
        ],
      },
      {
        eyebrow: "Industries",
        title: "Where Dubai businesses use AI call assistants",
        cards: [
          { icon: "fal fa-building", title: "Real estate", desc: "Buyer and tenant calls qualified on budget, area and timeline, with viewings booked straight into an agent's calendar.", href: "/ai-agent-dubai-real-estate", linkLabel: "See AI for real estate" },
          { icon: "fal fa-concierge-bell", title: "Hotels and holiday homes", desc: "Reservation calls, changes and guest questions answered at any hour, in the guest's language.", href: "/ai-hospitality-dubai", linkLabel: "See AI for hotels" },
          { icon: "fal fa-clinic-medical", title: "Clinics", desc: "New patient bookings, reschedules and reminders handled while your front desk looks after the patients in front of them." },
        ],
      },
      {
        eyebrow: "Before you choose",
        title: "Three things to ask any AI call assistant provider",
        cards: [
          { stage: "Ask 1", title: "Can I hear it on my script?", desc: "A test on your own questions and callers, in Arabic and English, tells you far more than a generic demo." },
          { stage: "Ask 2", title: "What happens on a hard call?", desc: "Ask how it handles a caller who is upset, off-topic or asks for a person, and how fast the handover is." },
          { stage: "Ask 3", title: "Where does the data go?", desc: "Know where recordings and transcripts are stored, who can access them, and how consent and opt-outs are handled under UAE rules." },
        ],
      },
    ]}
    related={[
      { href: "/callagents", label: "Live AI voice demos" },
      { href: "/ai-agency-dubai", label: "AI Agency in Dubai" },
      { href: "/agentic-ai-dubai", label: "Agentic AI in Dubai" },
      { href: "/how-fast-to-reply-dubai-real-estate-leads", label: "How Fast Should a Dubai Brokerage Reply to a Lead?" },
      { href: "/dncr-pdpl-rera-dubai-real-estate", label: "DNCR, PDPL and RERA in Plain Language" },
    ]}
    faqs={FAQS}
    cta={{
      title: "Hear an AI call assistant on your own script",
      sub: "Book a demo and we will set up a test call flow for your business, in Arabic and English, before anything is built.",
    }}
  />
);

export default AiCallAssistantDubai;
