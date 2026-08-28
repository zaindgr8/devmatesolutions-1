"use client";
import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import HeaderThree from "@/src/layout/headers/header-3";
import FooterThree from "@/src/layout/footers/footer-3";
import FormModal from "@/src/components/FormModal";

/* ─────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────── */

const FEATURES = [
  {
    icon: "fab fa-whatsapp",
    colorClass: "alms-feature-icon--wa",
    title: "WhatsApp Business API",
    desc: "Send notifications, automate conversations, and manage your entire customer journey on the world's most-used messaging platform — fully Meta-verified.",
  },
  {
    icon: "fal fa-robot",
    colorClass: "alms-feature-icon--red",
    title: "AI-Powered Chatbots",
    desc: "Deploy intelligent chatbots that qualify leads, answer FAQs, book appointments, and hand off to human agents exactly when needed — 24/7.",
  },
  {
    icon: "fal fa-broadcast-tower",
    colorClass: "alms-feature-icon--blue",
    title: "Broadcast Campaigns",
    desc: "Reach thousands of opted-in contacts with personalised WhatsApp broadcasts. Track delivery, read receipts, and replies in real time.",
  },
  {
    icon: "fal fa-users",
    colorClass: "alms-feature-icon--green",
    title: "Team Inbox & Collaboration",
    desc: "One shared inbox for your entire team. Assign conversations, add notes, set SLAs, and ensure no customer ever falls through the cracks.",
  },
  {
    icon: "fal fa-plug",
    colorClass: "alms-feature-icon--purple",
    title: "CRM & Tool Integrations",
    desc: "Connect with HubSpot, Salesforce, Zoho, Shopify, and 50+ tools via native integrations or our open API — syncing data both ways automatically.",
  },
  {
    icon: "fal fa-chart-bar",
    colorClass: "alms-feature-icon--orange",
    title: "Analytics & Reporting",
    desc: "Track response times, CSAT scores, conversation volumes, agent performance, and campaign ROI — all in one clear dashboard.",
  },
];

const STEPS = [
  {
    num: "01",
    icon: "fal fa-shield-check",
    iconBg: "#bd2120",
    title: "Get Your WhatsApp Business API Access",
    desc: "We handle your Meta Business verification and API provisioning — live within 48 hours, zero technical overhead on your side.",
  },
  {
    num: "02",
    icon: "fal fa-robot",
    iconBg: "#25d366",
    title: "Build Your AI Chatbot Flows",
    desc: "Our team configures your qualifying scripts, FAQ responses, and handoff rules. Visual builder — no code required.",
  },
  {
    num: "03",
    icon: "fal fa-plug",
    iconBg: "#3b82f6",
    title: "Connect Your Existing Tools",
    desc: "CRM, ticketing, calendar, e-commerce — we integrate your stack so every WhatsApp interaction syncs automatically.",
  },
  {
    num: "04",
    icon: "fal fa-rocket",
    iconBg: "#f97316",
    title: "Go Live & Scale",
    desc: "Launch with your team on the shared inbox, run your first broadcast, and watch leads qualify themselves while you sleep.",
  },
];

const CHANNELS = [
  { icon: "fab fa-whatsapp",      name: "WhatsApp Business API",   detail: "Official Meta BSP — verified green tick available" },
  { icon: "fab fa-instagram",     name: "Instagram DM",            detail: "Respond to DMs, story replies & comments" },
  { icon: "fab fa-facebook",      name: "Facebook Messenger",      detail: "Automate Messenger conversations & lead ads" },
  { icon: "fal fa-globe",         name: "Website Chat Widget",     detail: "Seamless web-to-WhatsApp handoff" },
  { icon: "fal fa-envelope",      name: "Email",                   detail: "Unified inbox with automated email flows" },
  { icon: "fal fa-database",      name: "CRM Integrations",        detail: "HubSpot · Salesforce · Zoho · Pipedrive" },
];

const USE_CASES = [
  {
    id: "real-estate",
    label: "Real Estate",
    icon: "fal fa-building",
    eyebrow: "Real Estate & Property",
    title: "Qualify Every Property Lead Before Your Agent Picks Up",
    desc: "In Dubai's fast-moving market, speed wins. Our AI chatbot asks budget, location preference, property type, and timeline — then routes hot leads to the right agent, instantly, on WhatsApp.",
    features: [
      "Instant lead capture from Bayut, Property Finder & Dubizzle",
      "Automated qualification scripts in English & Arabic",
      "Viewing appointment scheduling with calendar sync",
      "CRM auto-logging to PropSpace, HubSpot & Bitrix24",
      "DNCR compliance screening built in",
    ],
    chatMessages: [
      { type: "in",  text: "Hi, I saw your listing for the Marina apartment 🏠", time: "10:01 AM" },
      { type: "bot", text: "Hello! Great to hear from you. To find you the perfect property, could you share your budget range? 🏡", time: "10:01 AM" },
      { type: "in",  text: "Around AED 1.8M, ready to buy this quarter", time: "10:02 AM" },
      { type: "bot", text: "Perfect! Would you prefer 1-bed or 2-bed? And do you need sea view? I can book a viewing for you today! 📅", time: "10:02 AM" },
      { type: "out", text: "2-bed with sea view please! Available tomorrow?", time: "10:03 AM" },
    ],
  },
  {
    id: "ecommerce",
    label: "E-Commerce",
    icon: "fal fa-shopping-bag",
    eyebrow: "E-Commerce & Retail",
    title: "Turn Abandoned Carts Into Completed Orders on WhatsApp",
    desc: "Recover lost revenue with personalised WhatsApp nudges. Automate order confirmations, shipping updates, return requests, and upsell campaigns — all measurable, all on brand.",
    features: [
      "Abandoned cart recovery with personalised offers",
      "Automated order & delivery notifications",
      "Return & exchange handling without human agents",
      "Post-purchase upsell & cross-sell sequences",
      "Shopify, WooCommerce & Magento integrations",
    ],
    chatMessages: [
      { type: "bot", text: "Hi Sarah! You left some items in your cart 🛒 Your Nike Air Max 90 are selling fast — only 2 left!", time: "2:15 PM" },
      { type: "in",  text: "Oh I forgot! Is there still a discount?", time: "2:16 PM" },
      { type: "bot", text: "Yes! Use SAVE10 for 10% off — that's AED 45 saved. Want me to complete your order right now? 🎉", time: "2:16 PM" },
      { type: "out", text: "Yes please, complete it!", time: "2:17 PM" },
      { type: "bot", text: "Order confirmed! 📦 You'll receive tracking in 30 minutes. Thank you!", time: "2:17 PM" },
    ],
  },
  {
    id: "hospitality",
    label: "Hospitality",
    icon: "fal fa-concierge-bell",
    eyebrow: "Hotels & Hospitality",
    title: "Deliver 5-Star Guest Experience From First Inquiry to Check-Out",
    desc: "Guests message you on WhatsApp — meet them there. Handle room inquiries, reservations, concierge requests, and post-stay reviews with AI that never sleeps and always stays on brand.",
    features: [
      "24/7 multilingual reservation handling (EN, AR, RU, ZH)",
      "Room type, availability & rate queries automated",
      "Pre-arrival messaging & upsell packages",
      "In-stay concierge request management",
      "Post-stay review request automation",
    ],
    chatMessages: [
      { type: "in",  text: "Do you have a suite available for 3 nights from Sept 15?", time: "8:30 AM" },
      { type: "bot", text: "Welcome! Yes, our Ocean Suite is available from Sept 15–18. It's 180m² with private pool & sea view. Rate: AED 2,800/night 🌊", time: "8:30 AM" },
      { type: "in",  text: "Wonderful! Can I book it and add airport pickup?", time: "8:31 AM" },
      { type: "bot", text: "Of course! Booking confirmed ✅ Airport transfer added — AED 150. Your confirmation will arrive via WhatsApp within 2 mins!", time: "8:31 AM" },
    ],
  },
  {
    id: "healthcare",
    label: "Healthcare",
    icon: "fal fa-hospital",
    eyebrow: "Healthcare & Clinics",
    title: "Reduce No-Shows & Free Your Reception Team",
    desc: "Automate appointment bookings, reminders, pre-visit forms, and post-consultation follow-ups. Patients get instant, personalised responses at any hour — fully HIPAA-aligned.",
    features: [
      "Appointment booking, rescheduling & cancellation",
      "Automated 24h & 2h reminder sequences",
      "Pre-visit form collection on WhatsApp",
      "Lab result & prescription notifications",
      "Post-visit feedback & follow-up automation",
    ],
    chatMessages: [
      { type: "in",  text: "I need to book a dermatology consultation", time: "9:00 AM" },
      { type: "bot", text: "Of course! Dr. Alali has slots available tomorrow at 10:00 AM or 2:30 PM. Which works best for you? 🏥", time: "9:00 AM" },
      { type: "in",  text: "10 AM please", time: "9:01 AM" },
      { type: "bot", text: "Booked! ✅ You'll receive a reminder tonight at 8PM and a pre-visit form to complete at home. See you tomorrow!", time: "9:01 AM" },
    ],
  },
];

const PRICING_TIERS = [
  {
    name: "Starter",
    bestFor: "Small teams (1–3 agents) getting started with WhatsApp automation",
    monthly: "AED 1,490",
    setup: "AED 2,000",
    badge: null,
    conversations: "1,000",
    channels: "WhatsApp Business API",
    chatbot: "Basic flow builder",
    agents: "Up to 3",
    broadcasts: "5/month",
    integrations: "Webhook + Zapier",
    highlight: false,
  },
  {
    name: "Growth",
    bestFor: "Growing businesses (4–15 agents) across multiple channels",
    monthly: "AED 3,490",
    setup: "AED 3,500",
    badge: "Most Popular",
    conversations: "5,000",
    channels: "WhatsApp + Instagram + Messenger",
    chatbot: "Advanced AI flows + NLP",
    agents: "Up to 15",
    broadcasts: "Unlimited",
    integrations: "HubSpot, Zoho, Salesforce",
    highlight: true,
  },
  {
    name: "Enterprise",
    bestFor: "Large operations (15+ agents) needing full customisation",
    monthly: "From AED 7,500",
    setup: "Custom",
    badge: "Full Power",
    conversations: "Unlimited",
    channels: "All channels + custom",
    chatbot: "Custom AI model + GPT-4 grounding",
    agents: "Unlimited",
    broadcasts: "Unlimited",
    integrations: "Full API + custom build",
    highlight: false,
  },
];

const TESTIMONIALS = [
  {
    stars: 5,
    quote: "We reduced our lead response time from 4 hours to under 60 seconds. Our conversion rate jumped by 34% in the first month alone.",
    name: "Khalid Al-Mansoori",
    role: "Sales Director, Gulf Real Estate Group",
    initials: "KA",
    avatarBg: "#bd2120",
  },
  {
    stars: 5,
    quote: "The abandoned cart recovery sequence alone paid for the entire system in the first week. Our WhatsApp revenue stream is now our fastest growing.",
    name: "Layla Hassan",
    role: "Head of E-Commerce, Elegance Boutique",
    initials: "LH",
    avatarBg: "#25d366",
  },
  {
    stars: 5,
    quote: "No-show rates dropped by 60%. Patients love the automated reminders and pre-visit form on WhatsApp — it feels personal, not robotic.",
    name: "Dr. Sami Yousef",
    role: "Clinic Director, MedPoint Dubai",
    initials: "SY",
    avatarBg: "#3b82f6",
  },
];

const FAQS = [
  {
    q: "Do I need to already have a WhatsApp Business account?",
    a: "No. We handle the entire WhatsApp Business API onboarding process — including Meta Business Manager setup, phone number verification, and green-tick application if you qualify. Most clients are live within 48 hours.",
  },
  {
    q: "How is this different from the regular WhatsApp Business app?",
    a: "The free WhatsApp Business app is designed for individuals. The API unlocks multi-agent inboxes, automation, broadcasts to unlimited contacts, CRM integration, chatbots, and full analytics — all of which are unavailable in the app.",
  },
  {
    q: "Can the chatbot speak Arabic?",
    a: "Yes. Our AI flows support English, Arabic, and additional languages including Russian, Chinese, and French. Conversations can switch language mid-chat based on the customer's preference.",
  },
  {
    q: "What happens when a customer needs a human agent?",
    a: "The AI detects escalation intent (frustration, complex queries, explicit requests) and seamlessly hands the conversation to the right team member with full context — no repeat explanations for your customer.",
  },
  {
    q: "Is WhatsApp marketing compliant with UAE regulations?",
    a: "Yes, when done correctly. WhatsApp only allows messaging opted-in contacts, which aligns with UAE PDPL requirements. We set up proper consent capture, opt-out mechanisms, and maintain full audit records — so you stay compliant.",
  },
  {
    q: "What's the minimum contract term?",
    a: "Monthly plans have a 3-month minimum. Annual plans are discounted by 20% and include 2 months free. Enterprise contracts are structured based on scope — we're happy to discuss flexible arrangements.",
  },
  {
    q: "How long does setup take?",
    a: "Standard setup is 5–7 business days: API provisioning (48h), chatbot configuration (2–3 days), integrations (1–2 days), team training (half a day). Rush delivery is available in 48 hours for an additional fee.",
  },
];

/* ─────────────────────────────────────────────────────────
   ANIMATED CHAT PREVIEW COMPONENT
───────────────────────────────────────────────────────── */
function AnimatedChatPreview({ messages, headerTitle }) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    setVisibleCount(0);
    const timers = messages.map((_, i) => {
      return setTimeout(() => setVisibleCount(i + 1), i * 900 + 300);
    });
    return () => timers.forEach(clearTimeout);
  }, [messages]);

  return (
    <div className="alms-chat-preview">
      <div className="alms-chat-preview-header">
        <div className="alms-chat-preview-av">🤖</div>
        <div>
          <div className="alms-chat-preview-title">{headerTitle}</div>
          <div className="alms-chat-preview-sub">● Online · AI-powered</div>
        </div>
      </div>
      <div className="alms-chat-preview-body">
        {messages.slice(0, visibleCount).map((msg, i) => (
          <div
            key={i}
            className={`alms-chat-bubble ${
              msg.type === "in"  ? "alms-chat-bubble--in"  :
              msg.type === "out" ? "alms-chat-bubble--out" :
                                   "alms-chat-bubble--bot"
            }`}
          >
            {msg.text}
            <span className={`alms-chat-time ${msg.type === "bot" ? "alms-chat-time--light" : ""}`}>
              {msg.time} {msg.type === "out" && "✓✓"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   PHONE MOCKUP HERO VISUAL
───────────────────────────────────────────────────────── */
function PhoneMockup() {
  const [visible, setVisible] = useState(0);
  const msgs = [
    { type: "in",  text: "Hi! I'm interested in your Marina listing 🏠", time: "10:01" },
    { type: "bot", text: "Hello! What's your budget and preferred bedrooms?", time: "10:01" },
    { type: "in",  text: "AED 1.8M, 2-bed with sea view", time: "10:02" },
    { type: "bot", text: "Perfect! I have 3 units matching your brief. Shall I book a viewing tomorrow? 📅", time: "10:02" },
    { type: "out", text: "Yes please! Tomorrow at 10am 👍", time: "10:03" },
  ];

  useEffect(() => {
    setVisible(0);
    const timers = msgs.map((_, i) => setTimeout(() => setVisible(i + 1), i * 1100 + 500));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="alms-phone-mockup">
      <div className="alms-phone-header">
        <div className="alms-phone-avatar">🏡</div>
        <div>
          <div className="alms-phone-contact-name">DevMate AI Agent</div>
          <div className="alms-phone-contact-status">● Online now</div>
        </div>
      </div>
      <div className="alms-phone-body">
        {msgs.slice(0, visible).map((m, i) => (
          <div
            key={i}
            className={`alms-chat-bubble ${
              m.type === "in"  ? "alms-chat-bubble--in"  :
              m.type === "out" ? "alms-chat-bubble--out" :
                                  "alms-chat-bubble--bot"
            }`}
          >
            {m.text}
            <span className={`alms-chat-time ${m.type === "bot" ? "alms-chat-time--light" : ""}`}>
              {m.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   COUNTER HOOK
───────────────────────────────────────────────────────── */
function useCountUp(target, duration = 2000, inView = true) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, inView]);
  return count;
}

/* ─────────────────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────────────────── */
export default function WhatsAppAutomation() {
  const [activeTab, setActiveTab] = useState("real-estate");
  const [openFaq, setOpenFaq]     = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({});
  const statsRef = useRef(null);
  const [statsInView, setStatsInView] = useState(false);

  const activeCase = USE_CASES.find((u) => u.id === activeTab) ?? USE_CASES[0];

  // Stats counter intersection observer
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsInView(true); },
      { threshold: 0.4 }
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const c1 = useCountUp(10000, 2200, statsInView);
  const c2 = useCountUp(98,    1800, statsInView);
  const c3 = useCountUp(60,    2000, statsInView);
  const c4 = useCountUp(3,     1500, statsInView);

  function openModal(config) {
    setModalConfig(config);
    setModalOpen(true);
  }

  return (
    <>
      <Head>
        <title>WhatsApp Automation | AI Lead Management System | DevMate Solutions</title>
        <link rel="icon" href="/red-logo.png" type="image/png" />
        <link rel="shortcut icon" href="/red-logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/red-logo.png" />
        <meta
          name="description"
          content="DevMate Solutions — WhatsApp Business API, AI chatbots, broadcast campaigns & team inbox. Automate your lead management, customer support & sales across every channel. Trusted by businesses across the UAE & Middle East."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://devmatesolutions.com/whatsappautomation" />
        <meta property="og:title" content="WhatsApp Automation | AI Lead Management System | DevMate Solutions" />
        <meta property="og:description" content="Automate WhatsApp Business conversations, qualify leads 24/7, and close more deals with DevMate's WhatsApp Automation platform." />
        <meta property="og:type" content="website" />
      </Head>

      <HeaderThree />

      <main className="alms-page">

        {/* ───────────── HERO ───────────── */}
        <section className="alms-hero">
          <div className="alms-hero-grid" />
          <div className="alms-hero-glow" />
          <div className="alms-hero-glow-2" />

          <div className="alms-container">
            <div className="alms-hero-inner">
              {/* Left — copy */}
              <div>
                <div className="alms-hero-badge">
                  <span className="alms-hero-badge-dot" />
                  Official Meta WhatsApp BSP
                </div>

                <h1 className="alms-hero-title">
                  Business Messaging,{" "}
                  <span className="alms-hero-title-accent">Simplified.</span>
                  <br />
                  On{" "}
                  <span className="alms-hero-title-wa">WhatsApp.</span>
                </h1>

                <p className="alms-hero-sub">
                  DevMate's AI Lead Management System lets you capture, qualify,
                  and close leads entirely on WhatsApp — with AI chatbots, team
                  inboxes, and broadcast campaigns trusted by growing businesses
                  across the UAE, KSA, and beyond.
                </p>

                <div className="alms-hero-btns">
                  <button
                    className="alms-btn-wa"
                    id="hero-cta-demo"
                    onClick={() =>
                      openModal({
                        title: "Book a Free Demo",
                        subtitle: "See the AI Lead Management System live — we'll map it to your business in 30 minutes.",
                        badgeLabel: "Free 30-Min Demo",
                        badgeSub: "No commitment required",
                        source: "alms-hero-demo",
                        buttonText: "Book My Free Demo",
                      })
                    }
                  >
                    <i className="fab fa-whatsapp" />
                    Get Free Demo
                  </button>
                  <a
                    href="#how-it-works"
                    className="alms-btn-ghost alms-btn-ghost--light"
                    id="hero-cta-learn"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    See How It Works
                    <i className="fal fa-arrow-down" />
                  </a>
                </div>

                <div className="alms-hero-trust">
                  {[
                    { icon: "fal fa-shield-check", text: "Meta Official BSP" },
                    { icon: "fal fa-lock",         text: "GDPR & UAE PDPL Compliant" },
                    { icon: "fal fa-clock",         text: "Live in 48 Hours" },
                    { icon: "fal fa-headset",       text: "24/7 Support" },
                  ].map((t, i) => (
                    <div className="alms-hero-trust-item" key={i}>
                      <i className={t.icon} />
                      {t.text}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — phone mockup */}
              <div className="alms-hero-visual">
                <PhoneMockup />

                {/* Floating stat cards */}
                <div className="alms-hero-stat-card alms-hero-stat-card--1">
                  <div className="alms-hero-stat-icon alms-hero-stat-icon--green">
                    <i className="fal fa-bolt" />
                  </div>
                  <div>
                    <div className="alms-hero-stat-num">&lt;60s</div>
                    <div className="alms-hero-stat-label">Avg. first reply</div>
                  </div>
                </div>

                <div className="alms-hero-stat-card alms-hero-stat-card--2">
                  <div className="alms-hero-stat-icon alms-hero-stat-icon--wa">
                    <i className="fab fa-whatsapp" />
                  </div>
                  <div>
                    <div className="alms-hero-stat-num">98%</div>
                    <div className="alms-hero-stat-label">Open rate</div>
                  </div>
                </div>

                <div className="alms-hero-stat-card alms-hero-stat-card--3">
                  <div className="alms-hero-stat-icon alms-hero-stat-icon--red">
                    <i className="fal fa-chart-line" />
                  </div>
                  <div>
                    <div className="alms-hero-stat-num">3×</div>
                    <div className="alms-hero-stat-label">Higher conversion</div>
                  </div>
                </div>

                <div className="alms-hero-stat-card alms-hero-stat-card--4">
                  <div className="alms-hero-stat-icon alms-hero-stat-icon--blue">
                    <i className="fal fa-users" />
                  </div>
                  <div>
                    <div className="alms-hero-stat-num">10K+</div>
                    <div className="alms-hero-stat-label">Businesses trust us</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ───────────── LOGOS STRIP ───────────── */}
        <div className="alms-logos-strip">
          <div className="alms-container">
            <p className="alms-logos-strip-label">Trusted by businesses across</p>
            <div className="alms-logos-row">
              {[
                { icon: "fal fa-building",       label: "Real Estate" },
                { icon: "fal fa-shopping-bag",   label: "E-Commerce" },
                { icon: "fal fa-concierge-bell", label: "Hospitality" },
                { icon: "fal fa-hospital",       label: "Healthcare" },
                { icon: "fal fa-car",            label: "Automotive" },
                { icon: "fal fa-graduation-cap", label: "Education" },
                { icon: "fal fa-plane",          label: "Travel & Tourism" },
                { icon: "fal fa-bank",           label: "Finance & Banking" },
              ].map((l, i) => (
                <div className="alms-logo-item" key={i}>
                  <i className={l.icon} />
                  {l.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ───────────── STATS ───────────── */}
        <div className="alms-stats-section" ref={statsRef}>
          <div className="alms-container">
            <div className="alms-stats-grid">
              <div className="alms-stat-item">
                <div className="alms-stat-num">{c1.toLocaleString()}<span>+</span></div>
                <div className="alms-stat-desc">Businesses using our platform globally</div>
              </div>
              <div className="alms-stat-item">
                <div className="alms-stat-num">{c2}<span>%</span></div>
                <div className="alms-stat-desc">Average WhatsApp message open rate vs 20% for email</div>
              </div>
              <div className="alms-stat-item">
                <div className="alms-stat-num">{c3}<span>%</span></div>
                <div className="alms-stat-desc">Average reduction in lead response time after go-live</div>
              </div>
              <div className="alms-stat-item">
                <div className="alms-stat-num">{c4}<span>×</span></div>
                <div className="alms-stat-desc">Average ROI reported by clients in Year 1</div>
              </div>
            </div>
          </div>
        </div>

        {/* ───────────── FEATURES ───────────── */}
        <section className="alms-section">
          <div className="alms-container">
            <div className="alms-section-header">
              <p className="alms-eyebrow">Platform Features</p>
              <h2 className="alms-section-title">
                Everything you need to run your business
                <br />
                on <span className="alms-red">WhatsApp.</span>
              </h2>
              <p className="alms-section-sub">
                One platform. Every feature your team needs to automate conversations,
                qualify leads, support customers, and drive revenue — without writing a
                single line of code.
              </p>
            </div>
            <div className="alms-features-grid">
              {FEATURES.map((f, i) => (
                <div className="alms-feature-card" key={i}>
                  <div className={`alms-feature-icon ${f.colorClass}`}>
                    <i className={f.icon} />
                  </div>
                  <h3 className="alms-feature-title">{f.title}</h3>
                  <p className="alms-feature-desc">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────── HOW IT WORKS ───────────── */}
        <section className="alms-section alms-section--light" id="how-it-works">
          <div className="alms-container">
            <div className="alms-section-header">
              <p className="alms-eyebrow">How It Works</p>
              <h2 className="alms-section-title">
                Live in 48 hours.
                <br />
                <span className="alms-red">Zero technical overhead.</span>
              </h2>
              <p className="alms-section-sub">
                Our team handles every step of setup — API provisioning, chatbot
                configuration, CRM integration, and team training. You just need
                2 hours of your time.
              </p>
            </div>
            <div className="alms-steps-grid">
              {STEPS.map((s, i) => (
                <div className="alms-step-card" key={i}>
                  <div
                    className="alms-step-icon-alt"
                    style={{ background: `${s.iconBg}15`, color: s.iconBg }}
                  >
                    <i className={s.icon} />
                  </div>
                  <span style={{
                    display: "inline-block",
                    fontSize: 11, fontWeight: 800,
                    letterSpacing: 2, textTransform: "uppercase",
                    color: "#9ca3af", marginBottom: 10
                  }}>Step {s.num}</span>
                  <h3 className="alms-step-title">{s.title}</h3>
                  <p className="alms-step-desc">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────── USE CASES ───────────── */}
        <section className="alms-section">
          <div className="alms-container">
            <div className="alms-section-header">
              <p className="alms-eyebrow">Use Cases</p>
              <h2 className="alms-section-title">
                Built for your industry.
                <br />
                <span className="alms-red">Ready in days, not months.</span>
              </h2>
              <p className="alms-section-sub">
                Pre-built chatbot flows, industry-specific qualification scripts,
                and native integrations for the tools your sector already uses.
              </p>
            </div>

            {/* Tabs */}
            <div className="alms-tabs" role="tablist">
              {USE_CASES.map((uc) => (
                <button
                  key={uc.id}
                  className={`alms-tab-btn ${activeTab === uc.id ? "alms-tab-btn--active" : ""}`}
                  role="tab"
                  aria-selected={activeTab === uc.id}
                  id={`tab-${uc.id}`}
                  onClick={() => setActiveTab(uc.id)}
                >
                  <i className={`${uc.icon}`} style={{ marginRight: 6 }} />
                  {uc.label}
                </button>
              ))}
            </div>

            {/* Panel */}
            <div className="alms-usecase-panel">
              <div>
                <p className="alms-usecase-eyebrow">{activeCase.eyebrow}</p>
                <h3 className="alms-usecase-title">{activeCase.title}</h3>
                <p className="alms-usecase-desc">{activeCase.desc}</p>
                <ul className="alms-usecase-features">
                  {activeCase.features.map((f, i) => (
                    <li key={i}>
                      <i className="fal fa-check-circle" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  className="alms-btn-primary"
                  id={`usecase-cta-${activeCase.id}`}
                  onClick={() =>
                    openModal({
                      title: `${activeCase.label} WhatsApp Automation`,
                      subtitle: `Let's build your ${activeCase.label.toLowerCase()} chatbot and get you live in 48 hours.`,
                      badgeLabel: `${activeCase.label} Specialist`,
                      source: `alms-usecase-${activeCase.id}`,
                      buttonText: "Request Industry Demo",
                    })
                  }
                >
                  Get {activeCase.label} Demo
                  <i className="fal fa-long-arrow-right" />
                </button>
              </div>
              <AnimatedChatPreview
                messages={activeCase.chatMessages}
                headerTitle={`${activeCase.label} AI Agent`}
                key={activeCase.id}
              />
            </div>
          </div>
        </section>

        {/* ───────────── CHANNELS ───────────── */}
        <section className="alms-section alms-section--light">
          <div className="alms-container">
            <div className="alms-section-header">
              <p className="alms-eyebrow">Integrations & Channels</p>
              <h2 className="alms-section-title">
                Meet your customers where they already are.
              </h2>
              <p className="alms-section-sub">
                WhatsApp is the core — but your customers also reach you via
                Instagram, Messenger, your website, and email. One inbox handles
                all of it.
              </p>
            </div>
            <div className="alms-channels-grid">
              {CHANNELS.map((c, i) => (
                <div className="alms-channel-card" key={i}>
                  <div className="alms-channel-icon">
                    <i className={c.icon} />
                  </div>
                  <div>
                    <div className="alms-channel-name">{c.name}</div>
                    <div className="alms-channel-detail">{c.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────── CTA BAND ───────────── */}
        <div className="alms-cta-band">
          <div className="alms-container">
            <div className="alms-cta-band-inner">
              <div>
                <h3 className="alms-cta-band-title">
                  Ready to see 98% open rates in action?
                </h3>
                <p className="alms-cta-band-sub">
                  Book a free 30-minute demo — we'll map a custom WhatsApp
                  automation flow to your business and show you the ROI live.
                </p>
              </div>
              <button
                className="alms-btn-primary alms-btn-primary--white"
                id="band-cta-demo"
                onClick={() =>
                  openModal({
                    title: "Book Your Free Demo",
                    subtitle: "30 minutes to see how WhatsApp AI can transform your lead management.",
                    badgeLabel: "Free Demo",
                    source: "alms-cta-band",
                    buttonText: "Book Free Demo Now",
                  })
                }
              >
                Book Free Demo
                <i className="fal fa-long-arrow-right" />
              </button>
            </div>
          </div>
        </div>

        {/* ───────────── COMPARE ───────────── */}
        <section className="alms-section">
          <div className="alms-container">
            <div className="alms-section-header">
              <p className="alms-eyebrow">Why WhatsApp API?</p>
              <h2 className="alms-section-title">
                The WhatsApp Business App vs.{" "}
                <span className="alms-red">the API Platform.</span>
              </h2>
              <p className="alms-section-sub">
                The free app is a starting point. The API is where real business
                automation — and real revenue — happens.
              </p>
            </div>
            <div className="alms-compare-wrap">
              <div className="alms-compare-header">
                <div className="alms-compare-col-head">Feature</div>
                <div className="alms-compare-col-head">WhatsApp Business App (Free)</div>
                <div className="alms-compare-col-head alms-compare-col-head--active">
                  DevMate AI Platform (API)
                </div>
              </div>
              {[
                ["Number of agents",       "1 device only",                          "Unlimited agents, any device"],
                ["Automation / Chatbots",  "Basic auto-replies only",                "Full AI chatbot with NLP & GPT-4"],
                ["Broadcast reach",        "Max 256 contacts per batch",             "Unlimited opted-in contacts"],
                ["CRM Integration",        "Not available",                          "HubSpot, Salesforce, Zoho & 50+ tools"],
                ["Analytics",              "Basic message stats",                    "Full funnel: delivery, read, reply, revenue"],
                ["AI Lead Qualification",  "Not available",                          "24/7 automated qualification & routing"],
                ["Green Tick Verification","Not available",                          "Available via Meta verification process"],
                ["Multi-channel inbox",    "WhatsApp only",                          "WhatsApp + IG + Messenger + email"],
              ].map(([label, bad, good], i) => (
                <div
                  className={`alms-compare-row ${i % 2 === 0 ? "alms-compare-row--alt" : ""}`}
                  key={i}
                >
                  <div className="alms-compare-label">{label}</div>
                  <div className="alms-compare-bad">
                    <i className="fal fa-times alms-compare-bad-x" style={{ marginRight: 6 }} />
                    {bad}
                  </div>
                  <div className="alms-compare-good">
                    <i className="fal fa-check" />
                    {good}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────── PRICING ───────────── */}
        <section className="alms-section alms-section--dark" id="pricing">
          <div className="alms-container">
            <div className="alms-section-header">
              <p className="alms-eyebrow alms-eyebrow--light">Transparent Pricing</p>
              <h2 className="alms-section-title alms-title--light">
                Priced against your revenue — not headcount.
              </h2>
              <p className="alms-section-sub alms-sub--light">
                No hidden fees. No per-seat surprises. Pay for conversations and
                capability — and scale up only when you need to.
              </p>
            </div>

            <div className="alms-pricing-grid">
              {PRICING_TIERS.map((tier, i) => (
                <div
                  className={`alms-pricing-card ${tier.highlight ? "alms-pricing-card--featured" : ""}`}
                  key={i}
                  id={`pricing-card-${tier.name.toLowerCase()}`}
                >
                  {tier.badge && (
                    <span className={`alms-pricing-badge ${tier.name === "Growth" ? "alms-pricing-badge--wa" : ""}`}>
                      {tier.badge}
                    </span>
                  )}
                  <h3 className="alms-pricing-name">{tier.name}</h3>
                  <p className="alms-pricing-best">{tier.bestFor}</p>
                  <div className="alms-pricing-price">
                    <span className="alms-pricing-amount">{tier.monthly}</span>
                    <span className="alms-pricing-period"> / month</span>
                  </div>
                  <div className="alms-pricing-setup">Setup fee: {tier.setup}</div>
                  <ul className="alms-pricing-features">
                    <li><i className="fal fa-check" /> {tier.conversations} conversations/mo</li>
                    <li><i className="fal fa-check" /> Channels: {tier.channels}</li>
                    <li><i className="fal fa-check" /> {tier.chatbot}</li>
                    <li><i className="fal fa-check" /> {tier.agents} agents</li>
                    <li><i className="fal fa-check" /> Broadcasts: {tier.broadcasts}</li>
                    <li><i className="fal fa-check" /> Integrations: {tier.integrations}</li>
                  </ul>
                  <button
                    className={`alms-pricing-cta ${tier.highlight ? "alms-pricing-cta--featured" : ""}`}
                    id={`pricing-cta-${tier.name.toLowerCase()}`}
                    onClick={() =>
                      openModal({
                        title: `${tier.name} Plan — ${tier.monthly}/mo`,
                        subtitle: `Let's get you started on the ${tier.name} plan. Our team will handle the full setup.`,
                        badgeLabel: tier.name,
                        badgeSub: tier.monthly + "/month",
                        source: `alms-pricing-${tier.name.toLowerCase()}`,
                        buttonText: `Get Started with ${tier.name}`,
                      })
                    }
                  >
                    Get Started
                    <i className="fal fa-long-arrow-right" />
                  </button>
                </div>
              ))}
            </div>

            {/* Pilot box */}
            <div className="alms-pilot-box">
              <div className="alms-pilot-box-inner">
                <div>
                  <h4 className="alms-pilot-title">
                    🚀 30-Day Pilot — Try Before You Commit
                  </h4>
                  <p className="alms-pilot-desc">
                    Start with a 30-day pilot at setup cost only — no monthly fee
                    until you're satisfied with the results. If you don't see a
                    measurable improvement in lead response time, we'll refund
                    the setup fee in full. Annual plans: 2 months free + setup
                    waived. All prices in AED, exclusive of 5% VAT.
                  </p>
                </div>
                <button
                  className="alms-btn-wa"
                  id="pilot-cta"
                  onClick={() =>
                    openModal({
                      title: "Start Your 30-Day Pilot",
                      subtitle: "Try the full platform risk-free. No monthly fee until you're happy with the results.",
                      badgeLabel: "30-Day Pilot",
                      badgeSub: "Risk-free guarantee",
                      source: "alms-pilot",
                      buttonText: "Start My Pilot",
                    })
                  }
                >
                  <i className="fab fa-whatsapp" />
                  Start Pilot
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ───────────── TESTIMONIALS ───────────── */}
        <section className="alms-section">
          <div className="alms-container">
            <div className="alms-section-header">
              <p className="alms-eyebrow">Client Results</p>
              <h2 className="alms-section-title">
                Real businesses.
                <br />
                <span className="alms-red">Real results on WhatsApp.</span>
              </h2>
            </div>
            <div className="alms-testimonials-grid">
              {TESTIMONIALS.map((t, i) => (
                <div className="alms-testimonial-card" key={i}>
                  <div className="alms-testimonial-stars">
                    {"★".repeat(t.stars)}
                  </div>
                  <p className="alms-testimonial-quote">"{t.quote}"</p>
                  <div className="alms-testimonial-author">
                    <div
                      className="alms-testimonial-av"
                      style={{ background: t.avatarBg }}
                    >
                      {t.initials}
                    </div>
                    <div>
                      <div className="alms-testimonial-name">{t.name}</div>
                      <div className="alms-testimonial-role">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────── FAQ ───────────── */}
        <section className="alms-section alms-section--light">
          <div className="alms-container">
            <div className="alms-section-header">
              <p className="alms-eyebrow">Common Questions</p>
              <h2 className="alms-section-title">Frequently Asked Questions</h2>
              <p className="alms-section-sub">
                Still not sure? Here are the questions we hear most often.
              </p>
            </div>
            <div className="alms-faqs">
              {FAQS.map((faq, i) => (
                <div
                  className={`alms-faq ${openFaq === i ? "alms-faq--open" : ""}`}
                  key={i}
                >
                  <button
                    className="alms-faq-q"
                    id={`faq-alms-${i}`}
                    aria-expanded={openFaq === i}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    {faq.q}
                    <i
                      className={`fal ${openFaq === i ? "fa-chevron-up" : "fa-chevron-down"}`}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="alms-faq-a">{faq.a}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────── FINAL CTA ───────────── */}
        <section className="alms-final-cta">
          <div className="alms-final-cta-glow" />
          <div className="alms-container">
            <div className="alms-final-cta-inner">
              <p className="alms-eyebrow alms-eyebrow--light">Get Started Today</p>
              <h2 className="alms-final-cta-title">
                Your customers are already on WhatsApp.
                <br />
                Are you meeting them there?
              </h2>
              <p className="alms-final-cta-sub">
                Join 10,000+ businesses that automate their conversations,
                qualify leads 24/7, and close more deals — all on WhatsApp.
                Book a free demo and we'll show you exactly how it works for
                your business.
              </p>
              <div className="alms-final-cta-btns">
                <button
                  className="alms-btn-wa"
                  id="final-cta-demo"
                  onClick={() =>
                    openModal({
                      title: "Book Your Free Demo",
                      subtitle: "See the AI Lead Management System live — we'll map it to your business in 30 minutes.",
                      badgeLabel: "Free 30-Min Demo",
                      source: "alms-final-cta",
                      buttonText: "Book My Free Demo",
                    })
                  }
                >
                  <i className="fab fa-whatsapp" />
                  Book Free Demo
                </button>
                <a
                  href="https://wa.me/971509999999"
                  className="alms-btn-ghost alms-btn-ghost--light"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="final-cta-wa"
                >
                  <i className="fab fa-whatsapp" />
                  Chat with Us on WhatsApp
                </a>
              </div>
              <p className="alms-final-footnote">
                TechMate Solutions FZ LLC, trading as DevMate Solutions · Dubai |
                Muscat | New York · devmatesolutions.com
              </p>
            </div>
          </div>
        </section>
      </main>

      <FooterThree />

      {/* ─── FORM MODAL ─── */}
      <FormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalConfig.title}
        subtitle={modalConfig.subtitle}
        badgeLabel={modalConfig.badgeLabel}
        badgeSub={modalConfig.badgeSub}
        badgeHighlight={modalConfig.badgeHighlight}
        triggerCall={modalConfig.triggerCall}
        source={modalConfig.source}
        buttonText={modalConfig.buttonText}
      />
    </>
  );
}
