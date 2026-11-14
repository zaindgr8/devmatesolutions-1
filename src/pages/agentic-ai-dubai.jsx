import Link from "next/link";
import React from "react";
import ArticleLayout from "../components/articles/ArticleLayout";

const FAQS = [
  {
    q: "What is agentic AI?",
    a: "Agentic AI is AI that works towards a goal instead of only answering a question. An AI agent can plan the steps, use tools such as your CRM, calendar or booking system, check the result and decide what to do next, with people setting the limits and approving what matters.",
  },
  {
    q: "How is agentic AI different from a chatbot?",
    a: "A chatbot replies. An agent acts. A chatbot can tell a customer which slots are free; an agent can check the calendar, book the slot, send the confirmation, update the CRM and remind the customer the day before.",
  },
  {
    q: "Why is agentic AI such a big topic in Dubai right now?",
    a: "The UAE government has announced that half of its government sectors, services and operations will run on agentic AI within two years, and Dubai has launched an accelerator to bring AI agents into public-facing government services. Banks and large companies in Dubai are moving the same way, so customers are starting to expect agent-level service everywhere.",
  },
  {
    q: "Which business tasks suit AI agents best?",
    a: "Repetitive, rules-based work with clear outcomes: qualifying leads, booking and rescheduling appointments, answering order or reservation questions, chasing missing documents, following up after a viewing or a quote, and keeping records up to date across systems.",
  },
  {
    q: "Is it safe to let an AI agent act on its own?",
    a: "Only within limits you set. We give each agent the smallest set of permissions it needs, require human approval for sensitive actions, log every step, and hand over to a person whenever the customer asks or the agent is unsure.",
  },
  {
    q: "Do AI agents work in Arabic?",
    a: "Yes. We build and test agents in Arabic and English, so customers are served in the language they write or speak in, and every conversation lands in the same record.",
  },
  {
    q: "How much does an agentic AI project cost?",
    a: "Contact our sales team for pricing. It depends on the workflow, the systems the agent connects to, and your volume, so we quote after a short demo call.",
  },
  {
    q: "Where should a business start with agentic AI?",
    a: "With one workflow that costs you customers or hours every week, such as lead follow-up or appointment booking. Prove it on real customers, measure it, then add the next agent.",
  },
];

const AgenticAiDubai = () => (
  <ArticleLayout
    slug="/agentic-ai-dubai"
    title="Agentic AI in Dubai: What AI Agents Do and Where They Pay Off"
    description="Agentic AI explained for Dubai businesses: what AI agents are, how they differ from chatbots, why the UAE is moving government and banking to agentic AI, and which business workflows to automate first."
    datePublished="2026-11-14"
    badge="Dubai · Agentic AI"
    headline="AI that answers is useful."
    headlineAccent="AI that gets the job done is better."
    intro="Agentic AI is the shift from AI that replies to AI that acts: it plans the steps, uses your systems and finishes the task. The UAE is putting it at the centre of government services, and Dubai businesses are following. Here is what it means and where to start."
    answerTitle="An AI agent works towards a goal,"
    answerAccent="inside limits you set."
    answer={
      <>
        <p>
          Ask a chatbot for an appointment and it lists the free slots. Ask an AI agent and it books the slot,
          sends the confirmation, updates your CRM and reminds the customer the day before. That is the
          difference: agents complete work across your systems instead of handing it back to your team.
        </p>
        <p>
          In Dubai the shift is happening at every level. The government has set a target for agentic AI across
          its services, and banks are moving their operations the same way. See the details in our{" "}
          <Link href="/ai-news-dubai">AI news roundup for Dubai and the UAE</Link>.
        </p>
      </>
    }
    rule="How we build agents: the smallest set of permissions for the job, human approval for anything sensitive, every step logged, and a person one request away."
    sections={[
      {
        eyebrow: "What agents do",
        title: "Four things an AI agent does that a chatbot cannot",
        cards: [
          { icon: "fal fa-route", title: "Plans the steps", desc: "Breaks a goal such as 'book a viewing' into the questions, checks and actions it needs." },
          { icon: "fal fa-plug", title: "Uses your tools", desc: "Reads and writes to your CRM, calendar, booking system and inbox, instead of telling the customer to do it." },
          { icon: "fal fa-check-double", title: "Checks the result", desc: "Confirms the booking went through, the record was saved and the customer was told, and retries or escalates if not." },
          { icon: "fal fa-user-friends", title: "Hands over cleanly", desc: "Passes the conversation to a person with the full context whenever the customer asks or the case needs judgement." },
        ],
      },
      {
        eyebrow: "Where to start",
        title: "Agentic AI use cases that pay off first",
        sub: "Start where a slow or missed step costs you a customer.",
        cards: [
          { icon: "fal fa-bolt", title: "Lead follow-up", desc: "Reply to every new lead in seconds, qualify it, and keep following up until it books or says no.", href: "/ai-automation-dubai", linkLabel: "See AI automation" },
          { icon: "fal fa-calendar-check", title: "Booking and rescheduling", desc: "Viewings, appointments, tables and rooms booked and moved without a person on the phone.", href: "/ai-call-assistant-dubai", linkLabel: "See AI call assistants" },
          { icon: "fal fa-concierge-bell", title: "Guest and customer service", desc: "Reservations, changes and common questions handled at any hour, in Arabic and English.", href: "/ai-hospitality-dubai", linkLabel: "See AI for hotels" },
        ],
      },
      {
        eyebrow: "Done safely",
        title: "Three rules for putting agents to work",
        cards: [
          { stage: "Rule 1", title: "Narrow permissions", desc: "An agent that books viewings does not need to change prices. Give each agent only the access its job requires." },
          { stage: "Rule 2", title: "Humans approve what matters", desc: "Refunds, contracts and anything sensitive go to a person for approval. The agent prepares, the person decides." },
          { stage: "Rule 3", title: "Everything is logged", desc: "Every action the agent takes is recorded, so your team can review it, correct it and keep improving it." },
        ],
      },
    ]}
    related={[
      { href: "/ai-agency-dubai", label: "AI Agency in Dubai" },
      { href: "/ai-news-dubai", label: "AI News in Dubai and the UAE" },
      { href: "/ai-call-assistant-dubai", label: "AI Call Assistant in Dubai" },
      { href: "/ai-agent-dubai-real-estate", label: "AI Agent for Dubai Real Estate" },
      { href: "/ai-automation-dubai", label: "AI Automation Services Dubai" },
    ]}
    faqs={FAQS}
    cta={{
      title: "See an AI agent work on your own workflow",
      sub: "Book a demo and we will map one workflow in your business to an AI agent, and show it working on real examples.",
    }}
  />
);

export default AgenticAiDubai;
