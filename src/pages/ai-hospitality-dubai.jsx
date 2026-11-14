import Link from "next/link";
import React from "react";
import ArticleLayout from "../components/articles/ArticleLayout";

const FAQS = [
  {
    q: "How are hotels in Dubai using AI?",
    a: "Mostly to answer guests faster: AI handles reservation calls and messages, answers common questions about rooms, rates and facilities, takes changes and cancellations, books restaurant and spa slots, and passes anything unusual to the front desk with the full context.",
  },
  {
    q: "Can AI take a room booking?",
    a: "Yes. An AI agent connected to your booking or property management system can check availability, offer the right room, take the booking and send the confirmation, or hand over to your reservations team if you prefer a person to confirm.",
  },
  {
    q: "Does it work for holiday homes and short-term rentals?",
    a: "Yes. Holiday home operators use AI to answer enquiries from booking platforms and WhatsApp, handle check-in questions, and follow up on enquiries that did not book.",
  },
  {
    q: "Which languages can guests use?",
    a: "We build in Arabic and English as standard, and guests are answered in the language they write or speak in.",
  },
  {
    q: "Will guests feel they are talking to a machine?",
    a: "The assistant is warm, natural and quick, and says it is an AI if asked. It always offers a person for complaints, special requests and anything that needs judgement.",
  },
  {
    q: "Can AI help with upselling?",
    a: "Yes. After a booking it can offer an upgrade, airport transfer, breakfast or a spa slot at the right moment, without the pressure of a sales call.",
  },
  {
    q: "How much does it cost?",
    a: "Contact our sales team for pricing. It depends on your channels, volume and the systems we connect, so we quote after a short demo call.",
  },
  {
    q: "Can I try a hotel AI agent?",
    a: "Yes. Our live voice demos include a hotel booking agent in English and in Arabic that you can talk to in your browser.",
  },
];

const AiHospitalityDubai = () => (
  <ArticleLayout
    slug="/ai-hospitality-dubai"
    title="AI for Hotels and Holiday Homes in Dubai: Every Guest Answered"
    description="How Dubai hotels and holiday home operators use AI agents and AI call assistants to answer every reservation call and message, take bookings, handle changes and upsell, in Arabic and English, 24/7."
    datePublished="2026-11-14"
    badge="Dubai · Hospitality AI"
    headline="Your guests book at 2 a.m."
    headlineAccent="Someone should answer."
    intro="Guests call and message at all hours, from every time zone, in many languages. AI agents and AI call assistants answer each one instantly, take the booking, handle changes and pass anything special to your team, so no reservation is lost to a slow reply."
    answerTitle="Fast answers win bookings,"
    answerAccent="in hotels more than anywhere."
    answer={
      <>
        <p>
          A guest comparing hotels books with whoever answers first and answers well. AI makes sure that is you:
          every call and message answered in seconds, from your own rates, rooms and policies, with the booking
          taken or handed to your reservations team with every detail attached.
        </p>
        <p>
          Hear it for yourself: our <Link href="/callagents">live voice demos</Link> include a hotel booking agent
          in English and in Arabic.
        </p>
      </>
    }
    rule="Our standard for hospitality: answer every guest in their language, never invent a rate or a room, confirm in writing, and hand over special requests to a person."
    sections={[
      {
        eyebrow: "What AI handles",
        title: "Where AI helps a hotel team most",
        cards: [
          { icon: "fal fa-bed", title: "Reservations", desc: "Availability, room types and bookings answered and taken at any hour, from your own system." },
          { icon: "fal fa-exchange-alt", title: "Changes and cancellations", desc: "Date changes, extra nights and cancellations handled to your policy, with the record updated." },
          { icon: "fal fa-question-circle", title: "Guest questions", desc: "Parking, check-in times, facilities and directions answered instantly, so the front desk can focus on guests in the lobby." },
          { icon: "fal fa-glass-cheers", title: "Upsells", desc: "Upgrades, transfers, breakfast and spa slots offered at the right moment after the booking." },
        ],
      },
      {
        eyebrow: "Channels",
        title: "One AI across every guest channel",
        cards: [
          { icon: "fal fa-phone-volume", title: "Phone", desc: "An AI call assistant that answers reservation calls instantly, in Arabic and English.", href: "/ai-call-assistant-dubai", linkLabel: "See AI call assistants" },
          { icon: "fab fa-whatsapp", title: "WhatsApp", desc: "Instant replies, booking links and confirmations on the channel guests already use.", href: "/whatsappautomation", linkLabel: "See WhatsApp automation" },
          { icon: "fal fa-globe", title: "Website chat", desc: "Questions answered and bookings started while the guest is still on your site." },
        ],
      },
    ]}
    related={[
      { href: "/callagents", label: "Live AI voice demos" },
      { href: "/ai-agency-dubai", label: "AI Agency in Dubai" },
      { href: "/agentic-ai-dubai", label: "Agentic AI in Dubai" },
      { href: "/ai-call-assistant-dubai", label: "AI Call Assistant in Dubai" },
    ]}
    faqs={FAQS}
    cta={{
      title: "Let AI answer your next 2 a.m. booking",
      sub: "Book a demo and we will show an AI agent answering your guests, from your own rooms and rates, in Arabic and English.",
    }}
  />
);

export default AiHospitalityDubai;
