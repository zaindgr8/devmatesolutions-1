import Head from "next/head";
import { useState, useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import {
  DASHBOARD_COOKIE_NAME,
  isValidDashboardSession,
  parseCookies,
} from "@/src/lib/dashboardAuth";

/* ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ──
   ICON SET  (minimal inline SVGs — replaces emoji glyphs)
── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── */
function Icon({ name, size = 16, style }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style,
  };
  switch (name) {
    case "chart":
      return <svg {...common}><path d="M3 3v18h18" /><rect x="7" y="12" width="3" height="6" /><rect x="12" y="8" width="3" height="10" /><rect x="17" y="5" width="3" height="13" /></svg>;
    case "users":
      return <svg {...common}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
    case "phone":
      return <svg {...common}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>;
    case "message":
      return <svg {...common}><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>;
    case "activity":
      return <svg {...common}><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>;
    case "settings":
      return <svg {...common}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>;
    case "bell":
      return <svg {...common}><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>;
    case "check":
      return <svg {...common}><path d="M20 6L9 17l-5-5" /></svg>;
    case "target":
      return <svg {...common}><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>;
    case "trending":
      return <svg {...common}><path d="M23 6l-9.5 9.5-5-5L1 18" /><path d="M17 6h6v6" /></svg>;
    case "eye":
      return <svg {...common}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>;
    case "eye-off":
      return <svg {...common}><path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><path d="M1 1l22 22" /></svg>;
    case "lock":
      return <svg {...common}><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>;
    case "clock":
      return <svg {...common}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>;
    case "pencil":
      return <svg {...common}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>;
    case "search":
      return <svg {...common}><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>;
    case "warning":
      return <svg {...common}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg>;
    case "compass":
      return <svg {...common}><circle cx="12" cy="12" r="10" /><path d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36z" /></svg>;
    case "power":
      return <svg {...common}><path d="M12 2v10" /><path d="M18.36 6.64a9 9 0 1 1-12.73 0" /></svg>;
    case "star":
      return <svg {...common}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01z" /></svg>;
    case "x":
      return <svg {...common}><path d="M18 6L6 18" /><path d="M6 6l12 12" /></svg>;
    case "layers":
      return <svg {...common}><path d="M12 2 2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>;
    case "image":
      return <svg {...common}><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>;
    case "radio":
      return <svg {...common}><circle cx="12" cy="12" r="2" /><path d="M16.24 7.76a6 6 0 0 1 0 8.49M7.76 16.24a6 6 0 0 1 0-8.49M19.07 4.93a10 10 0 0 1 0 14.14M4.93 19.07a10 10 0 0 1 0-14.14" /></svg>;
    case "file":
      return <svg {...common}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /><path d="M9 13h6" /><path d="M9 17h6" /></svg>;
    case "dollar":
      return <svg {...common}><path d="M12 1v22" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>;
    case "briefcase":
      return <svg {...common}><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>;
    case "arrow-right":
      return <svg {...common}><path d="M5 12h14" /><path d="M13 5l7 7-7 7" /></svg>;
    case "mic":
      return <svg {...common}><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><path d="M12 19v4" /><path d="M8 23h8" /></svg>;
    case "play":
      return <svg {...common} fill="currentColor" stroke="none"><path d="M6 3l15 9-15 9V3z" /></svg>;
    case "chevron-down":
      return <svg {...common}><path d="M6 9l6 6 6-6" /></svg>;
    default:
      return null;
  }
}

/* ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ──
   MOCK DATA  (replace with real API/DB calls later)
── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── */
const AVATARS_COLORS = [
  "#1e293b", "#475569", "#7c3aed", "#0f766e", "#b45309", "#bd2120",
];

function avatarColor(name) {
  const idx = (name.charCodeAt(0) + (name.charCodeAt(1) || 0)) % AVATARS_COLORS.length;
  return AVATARS_COLORS[idx];
}

function initials(name) {
  return name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();
}

const STATUSES = ["New", "Contacted", "Qualified", "Demo Booked", "Closed", "Lost"];

const INITIAL_LEADS = [
  {
    id: 1,
    name: "Ahmed Al Mansouri",
    email: "ahmed.mansouri@email.com",
    phone: "+971 50 123 4567",
    country: "UAE",
    company: "Al Noor Properties",
    source: "Bayut",
    status: "Demo Booked",
    channel: "both",
    budget: "AED 1.2M",
    propertyType: "Villa — Palm Jumeirah",
    callsCount: 3,
    whatsappCount: 8,
    lastActivity: "2 hours ago",
    createdAt: "Sep 23, 2026",
    score: 92,
    timeline: [
      { type: "whatsapp", event: "WhatsApp received", detail: "Inquiry about Palm Jumeirah villa, 4BR", time: "Sep 23 — 9:14 AM" },
      { type: "call", event: "Outbound call placed", detail: "Agent called. Duration: 4m 32s. Client interested, asked for brochure.", time: "Sep 23 — 10:05 AM" },
      { type: "whatsapp", event: "WhatsApp sent", detail: "Brochure PDF + virtual tour link delivered", time: "Sep 23 — 10:12 AM" },
      { type: "status", event: "Status updated → Qualified", detail: "High intent confirmed. Budget AED 1.2M", time: "Sep 24 — 9:00 AM" },
      { type: "call", event: "Follow-up call", detail: "Client confirmed viewing slot for Sep 26", time: "Sep 24 — 11:30 AM" },
      { type: "status", event: "Status updated → Demo Booked", detail: "Live demo scheduled via Zoom — Sep 26, 3 PM", time: "Sep 24 — 11:35 AM" },
    ],
  },
  {
    id: 2,
    name: "Sarah Mitchell",
    email: "sarah.m@gmail.com",
    phone: "+44 7700 900123",
    country: "UK",
    company: "Individual Investor",
    source: "Property Finder",
    status: "Qualified",
    channel: "call",
    budget: "AED 850K",
    propertyType: "Apartment — Downtown Dubai",
    callsCount: 2,
    whatsappCount: 3,
    lastActivity: "5 hours ago",
    createdAt: "Sep 22, 2026",
    score: 78,
    timeline: [
      { type: "call", event: "Inbound call", detail: "Called regarding Downtown 2BR listing. Duration: 6m 10s", time: "Sep 22 — 2:00 PM" },
      { type: "whatsapp", event: "WhatsApp follow-up", detail: "Sent floor plan and payment plan options", time: "Sep 22 — 2:30 PM" },
      { type: "status", event: "Status updated → Contacted", detail: "", time: "Sep 22 — 2:31 PM" },
      { type: "call", event: "Second call", detail: "Discussed payment plan. Client needs 2 weeks to decide.", time: "Sep 23 — 11:00 AM" },
      { type: "status", event: "Status updated → Qualified", detail: "Strong intent, ROI-focused investor", time: "Sep 23 — 11:08 AM" },
    ],
  },
  {
    id: 3,
    name: "Khalid Al Rashid",
    email: "k.rashid@outlook.com",
    phone: "+971 55 987 6543",
    country: "UAE",
    company: "Rashid Family Office",
    source: "WhatsApp Direct",
    status: "New",
    channel: "whatsapp",
    budget: "AED 3M+",
    propertyType: "Penthouse — Marina",
    callsCount: 0,
    whatsappCount: 4,
    lastActivity: "15 min ago",
    createdAt: "Sep 25, 2026",
    score: 85,
    timeline: [
      { type: "whatsapp", event: "WhatsApp received", detail: "Inquiry about Marina penthouse. Very specific requirements.", time: "Sep 25 — 7:10 PM" },
      { type: "whatsapp", event: "AI auto-reply sent", detail: "Greeting + qualification questions dispatched", time: "Sep 25 — 7:10 PM" },
      { type: "whatsapp", event: "Client responded", detail: "Confirmed AED 3M+ budget, wants sea view only", time: "Sep 25 — 7:14 PM" },
      { type: "whatsapp", event: "WhatsApp sent", detail: "Shortlisted 3 penthouses. Awaiting confirmation.", time: "Sep 25 — 7:19 PM" },
    ],
  },
  {
    id: 4,
    name: "Priya Sharma",
    email: "priya.sharma@techcorp.ae",
    phone: "+971 52 456 7890",
    country: "India (based in UAE)",
    company: "TechCorp MEA",
    source: "Bayut",
    status: "Closed",
    channel: "both",
    budget: "AED 620K",
    propertyType: "Studio — JVC",
    callsCount: 5,
    whatsappCount: 12,
    lastActivity: "2 days ago",
    createdAt: "Sep 18, 2026",
    score: 99,
    timeline: [
      { type: "whatsapp", event: "WhatsApp inquiry", detail: "Asked about JVC studios, budget AED 600-650K", time: "Sep 18 — 10:00 AM" },
      { type: "call", event: "Call #1", detail: "Qualification call. First-time buyer.", time: "Sep 18 — 10:30 AM" },
      { type: "status", event: "Status → Contacted", detail: "", time: "Sep 18 — 10:32 AM" },
      { type: "call", event: "Call #2", detail: "Sent SPA draft for review", time: "Sep 20 — 2:00 PM" },
      { type: "status", event: "Status → Qualified", detail: "", time: "Sep 20 — 2:05 PM" },
      { type: "call", event: "Demo call", detail: "Virtual tour of unit 4B. Client loved it.", time: "Sep 21 — 4:00 PM" },
      { type: "status", event: "Status → Demo Booked", detail: "", time: "Sep 21 — 4:01 PM" },
      { type: "call", event: "Closing call", detail: "Negotiated final price. Deal signed!", time: "Sep 23 — 12:00 PM" },
      { type: "status", event: "Status → Closed ✓", detail: "AED 620K — JVC Studio Unit 4B", time: "Sep 23 — 12:10 PM" },
    ],
  },
  {
    id: 5,
    name: "Mohammed Al Zaabi",
    email: "m.zaabi@invest.ae",
    phone: "+971 56 321 0987",
    country: "UAE",
    company: "Zaabi Investments",
    source: "Property Finder",
    status: "Lost",
    channel: "call",
    budget: "AED 500K",
    propertyType: "Apartment — Dubai South",
    callsCount: 4,
    whatsappCount: 2,
    lastActivity: "3 days ago",
    createdAt: "Sep 17, 2026",
    score: 30,
    timeline: [
      { type: "call", event: "Inbound call", detail: "Interested in Dubai South. Duration 3m", time: "Sep 17 — 3:00 PM" },
      { type: "call", event: "Follow-up #1", detail: "No answer", time: "Sep 18 — 10:00 AM" },
      { type: "call", event: "Follow-up #2", detail: "Briefly spoke — said still deciding", time: "Sep 19 — 2:00 PM" },
      { type: "call", event: "Final follow-up", detail: "Client chose competitor. Closed as Lost.", time: "Sep 22 — 11:00 AM" },
      { type: "status", event: "Status → Lost", detail: "Went with Damac direct", time: "Sep 22 — 11:05 AM" },
    ],
  },
  {
    id: 6,
    name: "Elena Petrova",
    email: "elena.p@realestate.ru",
    phone: "+7 926 555 1234",
    country: "Russia",
    company: "Petrova Holdings",
    source: "WhatsApp Direct",
    status: "Contacted",
    channel: "whatsapp",
    budget: "AED 1.8M",
    propertyType: "Villa — Arabian Ranches",
    callsCount: 1,
    whatsappCount: 9,
    lastActivity: "1 hour ago",
    createdAt: "Sep 24, 2026",
    score: 70,
    timeline: [
      { type: "whatsapp", event: "WhatsApp (Arabic)", detail: "Inquiry in Arabic about gated communities", time: "Sep 24 — 6:00 PM" },
      { type: "whatsapp", event: "AI auto-reply (Arabic)", detail: "Responded in Arabic with qualification questions", time: "Sep 24 — 6:01 PM" },
      { type: "whatsapp", event: "Client replied", detail: "Budget AED 1.8M, prefers Arabian Ranches", time: "Sep 24 — 6:15 PM" },
      { type: "call", event: "Intro call", detail: "15 min call, sent listing brochures", time: "Sep 25 — 9:00 AM" },
      { type: "status", event: "Status → Contacted", detail: "", time: "Sep 25 — 9:10 AM" },
    ],
  },
  {
    id: 7,
    name: "James Okafor",
    email: "j.okafor@vc.com",
    phone: "+234 803 123 4567",
    country: "Nigeria",
    company: "Okafor Ventures",
    source: "Bayut",
    status: "New",
    channel: "whatsapp",
    budget: "AED 2.5M",
    propertyType: "Townhouse — The Springs",
    callsCount: 0,
    whatsappCount: 2,
    lastActivity: "3 hours ago",
    createdAt: "Sep 25, 2026",
    score: 64,
    timeline: [
      { type: "whatsapp", event: "WhatsApp inquiry", detail: "Interested in townhouse. Budget flexible.", time: "Sep 25 — 4:30 PM" },
      { type: "whatsapp", event: "Auto-reply sent", detail: "Qualification questions delivered", time: "Sep 25 — 4:30 PM" },
    ],
  },
  {
    id: 8,
    name: "Fatima Al Maktoum",
    email: "fatima.m@gmail.com",
    phone: "+971 54 789 0123",
    country: "UAE",
    company: "Individual Buyer",
    source: "Referral",
    status: "Demo Booked",
    channel: "both",
    budget: "AED 4M+",
    propertyType: "Penthouse — Business Bay",
    callsCount: 4,
    whatsappCount: 11,
    lastActivity: "30 min ago",
    createdAt: "Sep 21, 2026",
    score: 97,
    timeline: [
      { type: "call", event: "Referral call", detail: "Referred by existing client. High-intent.", time: "Sep 21 — 11:00 AM" },
      { type: "whatsapp", event: "Sent listings", detail: "3 Business Bay penthouses with sea view", time: "Sep 21 — 11:20 AM" },
      { type: "status", event: "Status → Qualified", detail: "Pre-approved for AED 4M", time: "Sep 22 — 9:00 AM" },
      { type: "call", event: "Demo scheduling call", detail: "Confirmed in-person viewing Sep 27", time: "Sep 24 — 2:00 PM" },
      { type: "status", event: "Status → Demo Booked", detail: "In-person viewing at Business Bay Showroom", time: "Sep 24 — 2:05 PM" },
    ],
  },
  {
    id: 9,
    name: "David Chen",
    email: "d.chen@wealthgroup.sg",
    phone: "+65 9123 4567",
    country: "Singapore",
    company: "Wealth Group Holdings",
    source: "Google Ads",
    status: "Qualified",
    channel: "call",
    budget: "AED 2.1M",
    propertyType: "Apartment — Dubai Marina",
    callsCount: 2,
    whatsappCount: 1,
    lastActivity: "4 hours ago",
    createdAt: "Sep 23, 2026",
    score: 81,
    campaign: '"Apartments for Sale Dubai" — Search',
    timeline: [
      { type: "call", event: "Inbound call", detail: "Clicked Google search ad, called directly. Duration 5m", time: "Sep 23 — 8:00 AM" },
      { type: "status", event: "Status → Contacted", detail: "", time: "Sep 23 — 8:06 AM" },
      { type: "whatsapp", event: "WhatsApp follow-up", detail: "Sent Marina floor plans and ROI sheet", time: "Sep 23 — 8:30 AM" },
      { type: "call", event: "Qualification call", detail: "Confirmed AED 2.1M budget, investor buyer", time: "Sep 24 — 9:15 AM" },
      { type: "status", event: "Status → Qualified", detail: "", time: "Sep 24 — 9:20 AM" },
    ],
  },
  {
    id: 10,
    name: "Amara Diallo",
    email: "amara.diallo@outlook.com",
    phone: "+971 58 234 5678",
    country: "UAE",
    company: "Individual Buyer",
    source: "Meta Ads",
    status: "New",
    channel: "whatsapp",
    budget: "AED 780K",
    propertyType: "Apartment — JVC",
    callsCount: 0,
    whatsappCount: 2,
    lastActivity: "40 min ago",
    createdAt: "Sep 25, 2026",
    score: 46,
    campaign: "Payment Plan Carousel",
    timeline: [
      { type: "whatsapp", event: "WhatsApp received", detail: "Clicked Instagram carousel ad, asked about payment plans", time: "Sep 25 — 5:50 PM" },
      { type: "whatsapp", event: "AI auto-reply sent", detail: "Qualification questions + payment plan PDF sent", time: "Sep 25 — 5:51 PM" },
    ],
  },
  {
    id: 11,
    name: "Yusuf Ibrahim",
    email: "yusuf.ibrahim@gmail.com",
    phone: "+971 50 876 5432",
    country: "UAE",
    company: "Individual Buyer",
    source: "Dubizzle",
    status: "Lost",
    channel: "call",
    budget: "AED 450K",
    propertyType: "Studio — Dubai South",
    callsCount: 3,
    whatsappCount: 1,
    lastActivity: "4 days ago",
    createdAt: "Sep 16, 2026",
    score: 22,
    timeline: [
      { type: "call", event: "Inbound call", detail: "Asked about Dubai South studios", time: "Sep 16 — 1:00 PM" },
      { type: "call", event: "Follow-up #1", detail: "No answer", time: "Sep 17 — 10:00 AM" },
      { type: "call", event: "Follow-up #2", detail: "Said budget dropped to AED 350K, out of range", time: "Sep 19 — 3:00 PM" },
      { type: "status", event: "Status → Lost", detail: "Budget mismatch", time: "Sep 19 — 3:05 PM" },
    ],
  },
];

const ACTIVITY_FEED = [
  { icon: "phone", text: <><strong>Ahmed Al Mansouri</strong> — Demo confirmed for Sep 26, 3 PM via Zoom</>, time: "2h ago" },
  { icon: "message", text: <><strong>Khalid Al Rashid</strong> — New WhatsApp inquiry. Budget AED 3M+</>, time: "15m ago" },
  { icon: "check", text: <><strong>Priya Sharma</strong> — Deal CLOSED. AED 620K — JVC Studio 4B</>, time: "2d ago" },
  { icon: "phone", text: <><strong>Elena Petrova</strong> — Follow-up call completed. Sending brochures.</>, time: "1h ago" },
  { icon: "star", text: <><strong>Fatima Al Maktoum</strong> — High-score referral. Penthouse viewing booked.</>, time: "30m ago" },
  { icon: "message", text: <><strong>James Okafor</strong> — New WhatsApp inquiry from Bayut.</>, time: "3h ago" },
  { icon: "x", text: <><strong>Mohammed Al Zaabi</strong> — Marked as Lost. Chose Damac direct.</>, time: "3d ago" },
];

/* ────────────────────────────────── */

const STATUS_COLOR = {
  "New": "#94a3b8",
  "Contacted": "#f59e0b",
  "Qualified": "#8b5cf6",
  "Demo Booked": "#3b82f6",
  "Closed": "#10b981",
  "Lost": "#ef4444",
};

/* ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ──
   PERIOD-LEVEL MOCK DATA  (Last 30 Days — what the channel/attribution
   screens report; decoupled from the sample lead records above, the
   same way a real CRM's period KPIs cover more volume than the working
   lead list currently on screen)
── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── */
const PERIOD_SUMMARY = {
  label: "Last 30 Days",
  spend: 24000,
  leads: 145,
  meetingsBooked: 34,
  meetingsAttended: 27,
  dealsClosed: 6,
  revenue: 4620000,
  openPipelineValue: 6150000,
  target: { metric: "Meetings Booked", value: 30 },
};

/* costSource reflects how the spend number actually gets into this table:
   "api"      — synced live from the platform's ads/insights API (Google, Meta)
   "manual"   — portals are subscription/credit packages, not pay-per-lead bidding;
                spend is the monthly package cost, entered once and split across leads
   "organic"  — no media cost */
const SOURCE_PERFORMANCE = [
  { source: "Bayut", leads: 42, spend: 8400, costSource: "manual", meetingsBooked: 11, meetingsAttended: 9, closed: 2, revenue: 1850000 },
  { source: "Property Finder", leads: 28, spend: 6200, costSource: "manual", meetingsBooked: 9, meetingsAttended: 7, closed: 1, revenue: 980000 },
  { source: "Dubizzle", leads: 19, spend: 2600, costSource: "manual", meetingsBooked: 3, meetingsAttended: 2, closed: 0, revenue: 0 },
  { source: "Google Ads", leads: 16, spend: 4300, costSource: "api", meetingsBooked: 5, meetingsAttended: 4, closed: 1, revenue: 890000 },
  { source: "Meta Ads", leads: 25, spend: 2500, costSource: "api", meetingsBooked: 3, meetingsAttended: 2, closed: 0, revenue: 0 },
  { source: "WhatsApp Direct", leads: 11, spend: 0, costSource: "organic", meetingsBooked: 2, meetingsAttended: 2, closed: 1, revenue: 620000 },
  { source: "Referral", leads: 4, spend: 0, costSource: "organic", meetingsBooked: 1, meetingsAttended: 1, closed: 1, revenue: 280000 },
];

const COST_SOURCE_LABEL = {
  api: "Live · Ads API",
  manual: "Manual · Monthly Package",
  organic: "Organic",
};

const COST_SOURCE_COLOR = {
  api: "#10b981",
  manual: "#f59e0b",
  organic: "#94a3b8",
};

const AD_CREATIVES = [
  { platform: "Meta", name: "Downtown Skyline — Video", type: "Video", spend: 1100, leads: 14, meetings: 2 },
  { platform: "Meta", name: "Payment Plan Carousel", type: "Carousel", spend: 900, leads: 8, meetings: 1 },
  { platform: "Meta", name: "Investor ROI — Static", type: "Image", spend: 500, leads: 3, meetings: 0 },
  { platform: "Google", name: '"Apartments for Sale Dubai" — Search', type: "Search", spend: 2600, leads: 10, meetings: 3 },
  { platform: "Google", name: '"Off-Plan Palm Jumeirah" — Search', type: "Search", spend: 1700, leads: 6, meetings: 2 },
];

const LIVE_CALL = {
  lead: "Khalid Al Rashid",
  phone: "+971 55 987 6543",
  context: "Marina Penthouse inquiry — WhatsApp Direct",
  duration: "02:14",
  agent: "AI Voice Agent (Arabic / English)",
};

/* Text turns only — the voice platform streams a transcript-so-far update each
   time speaker turn flips, not a live audio feed. */
const LIVE_TRANSCRIPT = [
  { speaker: "agent", text: "Hi Khalid, this is DevMate calling about the Marina penthouse you asked about on WhatsApp." },
  { speaker: "lead", text: "Yes, I'm interested. Does it have a sea view?" },
  { speaker: "agent", text: "Unit 42 has a full sea view, three bedrooms. Would Thursday at 4 PM work for a viewing?" },
  { speaker: "lead", text: "Let me check... yes, Thursday works for me." },
];

const CALL_QUEUE = [
  { lead: "James Okafor", eta: "Next in 3 min", reason: "New WhatsApp inquiry — first response" },
  { lead: "Mohammed Al Zaabi", eta: "Next in 9 min", reason: "Follow-up — 3rd attempt" },
  { lead: "Elena Petrova", eta: "Next in 14 min", reason: "Scheduled follow-up call" },
];

const CALLBACK_REQUESTS = [
  { lead: "Sarah Mitchell", when: "Today, 6:00 PM", note: "Wants to revisit the payment plan" },
  { lead: "Fatima Al Maktoum", when: "Tomorrow, 11:00 AM", note: "Confirm in-person viewing" },
];

const SENTIMENT_COLOR = {
  Positive: "#10b981",
  Neutral: "#94a3b8",
  Negative: "#ef4444",
};

/* Mirrors what the voice platform's per-call record actually returns:
   recording_url, transcript, an auto-generated summary + sentiment, and
   custom structured fields extracted from the conversation. */
const CALL_RECORDINGS = [
  {
    lead: "Ahmed Al Mansouri",
    time: "Sep 24 — 11:30 AM",
    duration: "4:32",
    sentiment: "Positive",
    summary: "Client confirmed the viewing slot for Sep 26 and re-confirmed a AED 1.2M budget for the Palm Jumeirah villa.",
    extracted: { "Budget confirmed": "AED 1.2M", "Viewing requested": "Sep 26, 3 PM", "Next action": "Send calendar invite" },
    cost: "AED 3.12",
    transcript: [
      { speaker: "agent", text: "Hi Ahmed, following up on the Palm Jumeirah villa — did you get a chance to look at the brochure?" },
      { speaker: "lead", text: "Yes, it looks great. Can we arrange a viewing this week?" },
      { speaker: "agent", text: "Thursday the 26th at 3 PM works on our side — shall I lock that in?" },
      { speaker: "lead", text: "Perfect, let's do that. Budget is still around 1.2 million." },
    ],
  },
  {
    lead: "Sarah Mitchell",
    time: "Sep 23 — 11:00 AM",
    duration: "3:47",
    sentiment: "Neutral",
    summary: "Discussed the Downtown 2BR payment plan. Client needs roughly two weeks to decide, requested a callback.",
    extracted: { "Objection": "Needs more time", "Callback requested": "Today, 6:00 PM" },
    cost: "AED 2.68",
    transcript: [
      { speaker: "agent", text: "Sarah, wanted to check in on the payment plan options we sent over." },
      { speaker: "lead", text: "I've seen them, still comparing with another unit. Can you call me back later today?" },
      { speaker: "agent", text: "Of course — 6 PM work for you?" },
      { speaker: "lead", text: "Yes, that's fine." },
    ],
  },
  {
    lead: "Priya Sharma",
    time: "Sep 23 — 12:00 PM",
    duration: "6:05",
    sentiment: "Positive",
    summary: "Final negotiation call. Client agreed on price for JVC Studio Unit 4B — deal verbally closed.",
    extracted: { "Outcome": "Deal signed", "Unit": "JVC Studio 4B", "Final price": "AED 620K" },
    cost: "AED 4.40",
  },
  {
    lead: "Elena Petrova",
    time: "Sep 25 — 9:00 AM",
    duration: "2:51",
    sentiment: "Positive",
    summary: "Intro call in Arabic. Sent listing brochures for Arabian Ranches, client engaged and asked follow-up questions.",
    extracted: { "Language": "Arabic", "Preferred community": "Arabian Ranches" },
    cost: "AED 1.94",
  },
  {
    lead: "Mohammed Al Zaabi",
    time: "Sep 22 — 11:00 AM",
    duration: "1:12",
    sentiment: "Negative",
    summary: "Client confirmed he went with a competitor (Damac direct). No further action needed — marked Lost.",
    extracted: { "Outcome": "Lost", "Reason": "Chose competitor" },
    cost: "AED 0.81",
  },
  {
    lead: "David Chen",
    time: "Sep 24 — 9:15 AM",
    duration: "5:18",
    sentiment: "Positive",
    summary: "Qualification call with an investor buyer. Confirmed AED 2.1M budget and strong interest in Dubai Marina ROI.",
    extracted: { "Buyer type": "Investor", "Budget confirmed": "AED 2.1M" },
    cost: "AED 3.71",
  },
];

const PIPELINE_NEW = [
  { stage: "New", count: 52 },
  { stage: "Contacted", count: 41 },
  { stage: "Qualified", count: 28 },
  { stage: "Meeting Booked", count: 22 },
  { stage: "Meeting Attended", count: 17 },
  { stage: "Closed", count: 5 },
];

const PIPELINE_REACTIVATION = [
  { stage: "Re-engaged", count: 30 },
  { stage: "Responded", count: 14 },
  { stage: "Qualified", count: 9 },
  { stage: "Meeting Booked", count: 6 },
  { stage: "Meeting Attended", count: 5 },
  { stage: "Closed", count: 1 },
];

const DAILY_REPORTS = [
  { date: "Today — Sep 25", dialled: 186, pickedUp: 74, conversations: 51, meetingsBooked: 4, meetingsAttended: 2, bestSource: "Bayut" },
  { date: "Sep 24", dialled: 218, pickedUp: 92, conversations: 63, meetingsBooked: 5, meetingsAttended: 4, bestSource: "Property Finder" },
  { date: "Sep 23", dialled: 164, pickedUp: 61, conversations: 40, meetingsBooked: 3, meetingsAttended: 3, bestSource: "WhatsApp Direct" },
  { date: "Sep 22", dialled: 201, pickedUp: 85, conversations: 55, meetingsBooked: 4, meetingsAttended: 3, bestSource: "Bayut" },
  { date: "Sep 21", dialled: 60, pickedUp: 22, conversations: 15, meetingsBooked: 1, meetingsAttended: 1, bestSource: "Referral" },
];

const TEAM = [
  { broker: "Omar Hassan", assigned: 38, received: 12, attended: 9, closed: 2, revenue: 1850000 },
  { broker: "Layla Khoury", assigned: 29, received: 9, attended: 7, closed: 1, revenue: 980000 },
  { broker: "Ravi Menon", assigned: 22, received: 6, attended: 5, closed: 1, revenue: 620000 },
  { broker: "Noora Al Suwaidi", assigned: 18, received: 5, attended: 4, closed: 1, revenue: 890000 },
  { broker: "Unassigned Pool", assigned: 8, received: 2, attended: 2, closed: 1, revenue: 280000 },
];

const FUNNEL_COLORS = {
  "New": "#f87171",
  "Contacted": "#ef4444",
  "Qualified": "#dc2626",
  "Demo Booked": "#b91c1c",
  "Closed": "#7f1d1d",
  "Lost": "#9ca3af",
};

/* ── LOGIN FORM ── */
function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/dashboard/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, remember }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || "Invalid credentials.");
      } else {
        router.reload();
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="db-login">
      <div className="db-login__bg" />
      <div className="db-login__grid" />
      <div className="db-login__card">
        <div className="db-login__logo">
          <div className="db-login__logo-icon">AI</div>
          <div>
            <div className="db-login__logo-text">DevMate Solutions</div>
            <div className="db-login__logo-sub">AI Lead Dashboard</div>
          </div>
        </div>
        <h1 className="db-login__title">Welcome back</h1>
        <p className="db-login__sub">
          Sign in to view your leads, calls and WhatsApp conversations.
        </p>
        <form onSubmit={handleLogin}>
          <div className="db-login__field">
            <label className="db-login__label" htmlFor="db-login-username">Username</label>
            <input
              id="db-login-username"
              className={`db-login__input ${error ? "db-login__input--error" : ""}`}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              autoFocus
              required
            />
          </div>
          <div className="db-login__field">
            <label className="db-login__label" htmlFor="db-login-password">Password</label>
            <div className="db-login__input-wrap">
              <input
                id="db-login-password"
                className={`db-login__input ${error ? "db-login__input--error" : ""}`}
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="db-login__toggle-visibility"
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <Icon name={showPassword ? "eye-off" : "eye"} size={16} />
              </button>
            </div>
          </div>

          <label className="db-login__remember">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            Keep me signed in for 7 days
          </label>

          {error && (
            <div className="db-login__error">
              <Icon name="warning" size={14} /> {error}
            </div>
          )}
          <button
            id="db-login-submit"
            className="db-login__btn"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing in…" : "Sign In"}
            {!loading && <Icon name="arrow-right" size={15} />}
          </button>
        </form>

        <div className="db-login__footer">
          <Icon name="lock" size={12} />
          Private &amp; encrypted — your leads are never shared.
        </div>
      </div>

      <div className="db-login__help">
        Trouble signing in? <a href="mailto:contact@devmatesolutions.com">Contact support</a>
      </div>
    </div>
  );
}

/* ── LEAD DETAIL MODAL ── */
function LeadModal({ lead, onClose, onStatusChange }) {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);

  function addNote() {
    if (!note.trim()) return;
    setNotes((prev) => [
      {
        type: "note",
        event: "Note added",
        detail: note.trim(),
        time: "Just now",
      },
      ...prev,
    ]);
    setNote("");
  }

  const timeline = [...notes, ...lead.timeline];

  return (
    <div className="db-modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="db-modal">
        <div className="db-modal__header">
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              className="db-lead-avatar"
              style={{ background: avatarColor(lead.name), width: 48, height: 48, fontSize: 18 }}
            >
              {initials(lead.name)}
            </div>
            <div>
              <div className="db-modal__title">{lead.name}</div>
              <div className="db-modal__sub">{lead.company} · {lead.country}</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <select
              className="db-status-select"
              value={lead.status}
              onChange={(e) => onStatusChange(lead.id, e.target.value)}
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <button className="db-modal__close" onClick={onClose}>✕</button>
          </div>
        </div>

        <div className="db-modal__body">
          {/* Detail Grid */}
          <div className="db-detail-grid">
            <div className="db-detail-item">
              <div className="db-detail-item__label">Phone</div>
              <div className="db-detail-item__value">{lead.phone}</div>
            </div>
            <div className="db-detail-item">
              <div className="db-detail-item__label">Email</div>
              <div className="db-detail-item__value" style={{ fontSize: 12.5, wordBreak: "break-all" }}>{lead.email}</div>
            </div>
            <div className="db-detail-item">
              <div className="db-detail-item__label">Budget</div>
              <div className="db-detail-item__value">{lead.budget}</div>
            </div>
            <div className="db-detail-item">
              <div className="db-detail-item__label">Property Interest</div>
              <div className="db-detail-item__value" style={{ fontSize: 12.5 }}>{lead.propertyType}</div>
            </div>
            <div className="db-detail-item">
              <div className="db-detail-item__label">Source</div>
              <div className="db-detail-item__value">{lead.source}</div>
            </div>
            <div className="db-detail-item">
              <div className="db-detail-item__label">Lead Score</div>
              <div className="db-detail-item__value">{lead.score}/100</div>
            </div>
            <div className="db-detail-item">
              <div className="db-detail-item__label">Calls</div>
              <div className="db-detail-item__value">{lead.callsCount} calls</div>
            </div>
            <div className="db-detail-item">
              <div className="db-detail-item__label">WhatsApp</div>
              <div className="db-detail-item__value">{lead.whatsappCount} messages</div>
            </div>
          </div>

          {/* Note Input */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--db-text)", marginBottom: 10 }}>
              Add Note
            </div>
            <textarea
              className="db-note-input"
              placeholder="Write a note about this lead…"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <button className="db-btn db-btn--primary" onClick={addNote}>
              + Add Note
            </button>
          </div>

          {/* Timeline */}
          <div style={{ fontSize: 13, fontWeight: 700, color: "var(--db-text)", marginBottom: 16 }}>
            Activity Timeline
          </div>
          <div className="db-timeline">
            {timeline.map((item, i) => (
              <div key={i} className="db-timeline-item">
                <div
                  className={`db-timeline-dot db-timeline-dot--${item.type}`}
                >
                  <Icon name={item.type === "call" ? "phone" : item.type === "whatsapp" ? "message" : item.type === "note" ? "pencil" : "compass"} size={14} />
                </div>
                <div className="db-timeline-body">
                  <div className="db-timeline-event">{item.event}</div>
                  {item.detail && (
                    <div className="db-timeline-detail">{item.detail}</div>
                  )}
                  <div className="db-timeline-time">{item.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── SIDEBAR ── */
function Sidebar({ activeTab, setActiveTab, onLogout, counts }) {
  const sections = [
    {
      label: "Overview",
      items: [
        { id: "overview", label: "Overview", icon: "chart" },
        { id: "live", label: "Live Desk", icon: "radio" },
      ],
    },
    {
      label: "Pipeline",
      items: [
        { id: "leads", label: "All Leads", icon: "users", badge: counts.leads },
        { id: "pipeline", label: "Pipeline", icon: "target" },
        { id: "calls", label: "Calls", icon: "phone", badge: counts.calls },
        { id: "recordings", label: "Recordings", icon: "mic" },
        { id: "whatsapp", label: "WhatsApp", icon: "message", badge: counts.whatsapp },
      ],
    },
    {
      label: "Channels",
      items: [
        { id: "source", label: "By Source", icon: "layers" },
        { id: "creative", label: "By Creative", icon: "image" },
      ],
    },
    {
      label: "Business",
      items: [
        { id: "team", label: "Team", icon: "briefcase" },
        { id: "revenue", label: "Revenue", icon: "dollar" },
        { id: "daily", label: "Daily Report", icon: "file" },
        { id: "activity", label: "Activity Feed", icon: "activity" },
      ],
    },
  ];

  return (
    <aside className="db-sidebar">
      <div className="db-sidebar__brand">
        <div className="db-sidebar__brand-icon">AI</div>
        <div>
          <div className="db-sidebar__brand-name">AI Lead CRM</div>
          <div className="db-sidebar__brand-tag">DevMate Solutions</div>
        </div>
      </div>

      <nav className="db-sidebar__nav">
        {sections.map((section) => (
          <div key={section.label}>
            <div className="db-sidebar__section-label">{section.label}</div>
            {section.items.map((tab) => (
              <button
                key={tab.id}
                className={`db-nav-item ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="db-nav-icon"><Icon name={tab.icon} size={16} /></span>
                {tab.label}
                {tab.badge != null && (
                  <span className="db-nav-badge">{tab.badge}</span>
                )}
              </button>
            ))}
          </div>
        ))}

        <div className="db-sidebar__section-label">Settings</div>
        <button className="db-nav-item" disabled style={{ opacity: 0.5 }}>
          <span className="db-nav-icon"><Icon name="settings" size={16} /></span> Settings
        </button>
        <button className="db-nav-item" disabled style={{ opacity: 0.5 }}>
          <span className="db-nav-icon"><Icon name="bell" size={16} /></span> Notifications
        </button>
      </nav>

      <div className="db-sidebar__footer">
        <div className="db-sidebar__user">
          <div className="db-sidebar__avatar">DM</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="db-sidebar__user-name">DevMate Admin</div>
            <div className="db-sidebar__user-role">Lead Manager</div>
          </div>
          <button
            className="db-sidebar__logout"
            onClick={onLogout}
            title="Sign out"
          >
            <Icon name="power" size={15} />
          </button>
        </div>
      </div>
    </aside>
  );
}

/* ── OVERVIEW TAB ── */
function OverviewTab({ leads }) {
  const funnelData = STATUSES.map((s) => ({
    label: s,
    count: leads.filter((l) => l.status === s).length,
  })).filter((d) => d.count > 0);

  const maxFunnel = Math.max(...funnelData.map((d) => d.count), 1);
  const costPerLead = Math.round(PERIOD_SUMMARY.spend / PERIOD_SUMMARY.leads);
  const costPerMeeting = Math.round(PERIOD_SUMMARY.spend / PERIOD_SUMMARY.meetingsBooked);
  const roas = PERIOD_SUMMARY.revenue / PERIOD_SUMMARY.spend;
  const onTarget = PERIOD_SUMMARY.meetingsBooked >= PERIOD_SUMMARY.target.value;

  return (
    <>
      {/* Period + target */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
        <div style={{ fontSize: 12.5, color: "var(--db-text-dim)" }}>
          Showing <strong style={{ color: "var(--db-text)" }}>{PERIOD_SUMMARY.label}</strong>
        </div>
        <div className={`db-target-pill ${onTarget ? "db-target-pill--good" : "db-target-pill--bad"}`}>
          {onTarget ? "On target" : "Below target"} — {PERIOD_SUMMARY.target.metric}: {PERIOD_SUMMARY.meetingsBooked}/{PERIOD_SUMMARY.target.value}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="db-stats-grid">
        <div className="db-stat-card">
          <div className="db-stat-icon"><Icon name="users" size={17} /></div>
          <div className="db-stat-label">Total Leads</div>
          <div className="db-stat-value">{PERIOD_SUMMARY.leads}</div>
          <div className="db-stat-change">AED {PERIOD_SUMMARY.spend.toLocaleString()} spend</div>
        </div>
        <div className="db-stat-card">
          <div className="db-stat-icon"><Icon name="target" size={17} /></div>
          <div className="db-stat-label">Meetings Booked</div>
          <div className="db-stat-value">{PERIOD_SUMMARY.meetingsBooked}</div>
          <div className="db-stat-change">{PERIOD_SUMMARY.meetingsAttended} attended</div>
        </div>
        <div className="db-stat-card">
          <div className="db-stat-icon"><Icon name="check" size={17} /></div>
          <div className="db-stat-label">Deals Closed</div>
          <div className="db-stat-value">{PERIOD_SUMMARY.dealsClosed}</div>
          <div className="db-stat-change">AED {(PERIOD_SUMMARY.revenue / 1e6).toFixed(2)}M revenue</div>
        </div>
        <div className="db-stat-card">
          <div className="db-stat-icon"><Icon name="dollar" size={17} /></div>
          <div className="db-stat-label">Cost / Lead</div>
          <div className="db-stat-value">AED {costPerLead}</div>
          <div className="db-stat-change">Blended, all channels</div>
        </div>
        <div className="db-stat-card">
          <div className="db-stat-icon"><Icon name="briefcase" size={17} /></div>
          <div className="db-stat-label">Cost / Meeting</div>
          <div className="db-stat-value">AED {costPerMeeting}</div>
          <div className="db-stat-change">The number that matters</div>
        </div>
        <div className="db-stat-card">
          <div className="db-stat-icon"><Icon name="trending" size={17} /></div>
          <div className="db-stat-label">Blended ROAS</div>
          <div className="db-stat-value">{roas.toFixed(0)}x</div>
          <div className="db-stat-change">Revenue ÷ ad spend</div>
        </div>
      </div>

      {/* Charts */}
      <div className="db-overview-grid">
        {/* Pipeline Funnel */}
        <div className="db-chart-card">
          <div className="db-chart-card__title">Pipeline Funnel</div>
          <div className="db-chart-card__sub">Current working list — see the Pipeline tab for period totals</div>
          <div className="db-funnel">
            {STATUSES.map((s) => {
              const count = leads.filter((l) => l.status === s).length;
              const pct = Math.round((count / maxFunnel) * 100);
              return (
                <div key={s} className="db-funnel-row">
                  <div className="db-funnel-label">{s}</div>
                  <div className="db-funnel-bar-wrap">
                    {count > 0 && (
                    <div
                      className="db-funnel-bar"
                      style={{
                        width: `${pct}%`,
                        background: FUNNEL_COLORS[s],
                        minWidth: 30,
                      }}
                    >
                      {count}
                    </div>
                    )}
                  </div>
                  <div className="db-funnel-count">{count}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Leads */}
        <div className="db-chart-card">
          <div className="db-chart-card__title">Top Leads by Score</div>
          <div className="db-chart-card__sub">Sorted by AI lead score</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[...leads]
              .sort((a, b) => b.score - a.score)
              .slice(0, 5)
              .map((lead) => (
                <div key={lead.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div
                    className="db-lead-avatar"
                    style={{ background: avatarColor(lead.name), width: 32, height: 32, fontSize: 13, flexShrink: 0 }}
                  >
                    {initials(lead.name)}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {lead.name}
                    </div>
                    <div style={{ width: "100%", height: 4, background: "var(--db-dark-4)", borderRadius: 2, marginTop: 4, overflow: "hidden" }}>
                      <div
                        style={{
                          height: "100%",
                          width: `${lead.score}%`,
                          background: lead.score >= 80 ? "var(--db-green)" : lead.score >= 50 ? "var(--db-amber)" : "var(--db-red)",
                          borderRadius: 2,
                          transition: "width 1s ease",
                        }}
                      />
                    </div>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: lead.score >= 80 ? "#34d399" : lead.score >= 50 ? "#fbbf24" : "#f87171", width: 36, textAlign: "right" }}>
                    {lead.score}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="db-section-header">
        <div className="db-section-title">Recent Activity</div>
      </div>
      <div className="db-activity-feed">
        {ACTIVITY_FEED.map((item, i) => (
          <div key={i} className="db-activity-item">
            <div className="db-activity-icon">
              <Icon name={item.icon} size={15} />
            </div>
            <div className="db-activity-text">{item.text}</div>
            <div className="db-activity-time">{item.time}</div>
          </div>
        ))}
      </div>
    </>
  );
}

/* ── LEADS TABLE TAB ── */
function LeadsTab({ leads, onOpenLead, onStatusChange, filter, setFilter, search }) {
  const filtered = useMemo(() => {
    let list = [...leads];
    if (filter !== "All") list = list.filter((l) => l.status === filter);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.phone.includes(q) ||
          l.email.toLowerCase().includes(q) ||
          l.company.toLowerCase().includes(q) ||
          l.source.toLowerCase().includes(q)
      );
    }
    return list;
  }, [leads, filter, search]);

  return (
    <>
      <div className="db-filters">
        {["All", ...STATUSES].map((s) => (
          <button
            key={s}
            className={`db-filter-btn ${filter === s ? "active" : ""}`}
            onClick={() => setFilter(s)}
          >
            {s === "All" ? `All (${leads.length})` : `${s} (${leads.filter((l) => l.status === s).length})`}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="db-empty">
          <div className="db-empty__icon"><Icon name="search" size={28} /></div>
          <div className="db-empty__text">No leads match your filter.</div>
        </div>
      ) : (
        <div className="db-table-wrap">
          <table className="db-table">
            <thead>
              <tr>
                <th>Lead</th>
                <th>Status</th>
                <th>Channel</th>
                <th>Budget</th>
                <th>Source</th>
                <th>Score</th>
                <th>Last Activity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((lead) => (
                <tr key={lead.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div
                        className="db-lead-avatar"
                        style={{ background: avatarColor(lead.name) }}
                      >
                        {initials(lead.name)}
                      </div>
                      <div>
                        <div className="db-lead-name">{lead.name}</div>
                        <div className="db-lead-meta">{lead.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="db-badge">
                      <span className="db-badge-dot" style={{ background: STATUS_COLOR[lead.status] }} />
                      {lead.status}
                    </span>
                  </td>
                  <td>
                    <span className="db-channel">
                      {lead.channel === "call" && (<><Icon name="phone" size={12} /> Call</>)}
                      {lead.channel === "whatsapp" && (<><Icon name="message" size={12} /> WhatsApp</>)}
                      {lead.channel === "both" && (<><Icon name="phone" size={12} /><Icon name="message" size={12} /> Both</>)}
                    </span>
                  </td>
                  <td style={{ color: "var(--db-text)", fontWeight: 600 }}>{lead.budget}</td>
                  <td style={{ color: "var(--db-text-dim)" }}>{lead.source}</td>
                  <td>
                    <span
                      style={{
                        fontWeight: 800,
                        fontSize: 14,
                        color: lead.score >= 80 ? "#059669" : lead.score >= 50 ? "#b45309" : "#dc2626",
                      }}
                    >
                      {lead.score}
                    </span>
                  </td>
                  <td style={{ color: "var(--db-text-dim)", fontSize: 12.5 }}>{lead.lastActivity}</td>
                  <td>
                    <button
                      className="db-action-btn"
                      title="View detail"
                      onClick={() => onOpenLead(lead)}
                    >
                      <Icon name="eye" size={14} />
                    </button>
                    <button
                      className="db-action-btn"
                      title="Call"
                      onClick={() => window.open(`tel:${lead.phone}`, "_self")}
                    >
                      <Icon name="phone" size={13} />
                    </button>
                    <button
                      className="db-action-btn"
                      title="WhatsApp"
                      onClick={() => window.open(`https://wa.me/${lead.phone.replace(/\D/g, "")}`, "_blank")}
                    >
                      <Icon name="message" size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

/* ── CALLS TAB ── */
function CallsTab({ leads, onOpenLead }) {
  const callRecords = useMemo(() => {
    const records = [];
    leads.forEach((lead) => {
      lead.timeline.filter((t) => t.type === "call").forEach((t) => {
        records.push({ lead, event: t });
      });
    });
    return records;
  }, [leads]);

  return (
    <div className="db-table-wrap">
      <table className="db-table">
        <thead>
          <tr>
            <th>Client</th>
            <th>Event</th>
            <th>Detail</th>
            <th>Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {callRecords.map((r, i) => (
            <tr key={i}>
              <td>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div
                    className="db-lead-avatar"
                    style={{ background: avatarColor(r.lead.name), width: 32, height: 32, fontSize: 13 }}
                  >
                    {initials(r.lead.name)}
                  </div>
                  <div>
                    <div className="db-lead-name">{r.lead.name}</div>
                    <div className="db-lead-meta">{r.lead.phone}</div>
                  </div>
                </div>
              </td>
              <td>
                <span className="db-channel"><Icon name="phone" size={12} /> {r.event.event}</span>
              </td>
              <td style={{ color: "var(--db-text-dim)", fontSize: 12.5, maxWidth: 220 }}>{r.event.detail}</td>
              <td style={{ color: "var(--db-text-muted)", fontSize: 12 }}>{r.event.time}</td>
              <td>
                <span className="db-badge">
                  <span className="db-badge-dot" style={{ background: STATUS_COLOR[r.lead.status] }} />
                  {r.lead.status}
                </span>
              </td>
              <td>
                <button className="db-action-btn" onClick={() => onOpenLead(r.lead)} title="View lead"><Icon name="eye" size={14} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── WHATSAPP TAB ── */
function WhatsAppTab({ leads, onOpenLead }) {
  const waRecords = useMemo(() => {
    const records = [];
    leads.forEach((lead) => {
      lead.timeline.filter((t) => t.type === "whatsapp").forEach((t) => {
        records.push({ lead, event: t });
      });
    });
    return records;
  }, [leads]);

  return (
    <>
      <div className="db-chart-card__sub" style={{ marginBottom: 12 }}>
        Message events stream in via WhatsApp Business Platform webhooks in real time; conversation state — follow-up,
        meeting booked, qualified — is tracked here in the CRM, not pulled from Meta's own analytics.
      </div>
    <div className="db-table-wrap">
      <table className="db-table">
        <thead>
          <tr>
            <th>Client</th>
            <th>Message Event</th>
            <th>Content</th>
            <th>Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {waRecords.map((r, i) => (
            <tr key={i}>
              <td>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div
                    className="db-lead-avatar"
                    style={{ background: avatarColor(r.lead.name), width: 32, height: 32, fontSize: 13 }}
                  >
                    {initials(r.lead.name)}
                  </div>
                  <div>
                    <div className="db-lead-name">{r.lead.name}</div>
                    <div className="db-lead-meta">{r.lead.phone}</div>
                  </div>
                </div>
              </td>
              <td>
                <span className="db-channel"><Icon name="message" size={12} /> {r.event.event}</span>
              </td>
              <td style={{ color: "var(--db-text-dim)", fontSize: 12.5, maxWidth: 240 }}>{r.event.detail}</td>
              <td style={{ color: "var(--db-text-muted)", fontSize: 12 }}>{r.event.time}</td>
              <td>
                <span className="db-badge">
                  <span className="db-badge-dot" style={{ background: STATUS_COLOR[r.lead.status] }} />
                  {r.lead.status}
                </span>
              </td>
              <td>
                <button className="db-action-btn" onClick={() => onOpenLead(r.lead)} title="View lead"><Icon name="eye" size={14} /></button>
                <button
                  className="db-action-btn"
                  title="Open WhatsApp"
                  onClick={() => window.open(`https://wa.me/${r.lead.phone.replace(/\D/g, "")}`, "_blank")}
                >
                  <Icon name="message" size={13} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
}

/* ── ACTIVITY TAB ── */
function ActivityTab({ leads }) {
  const allEvents = useMemo(() => {
    const events = [];
    leads.forEach((lead) => {
      lead.timeline.forEach((t) => {
        events.push({ lead, event: t });
      });
    });
    return events;
  }, [leads]);

  return (
    <div className="db-activity-feed">
      {allEvents.map((r, i) => (
        <div key={i} className="db-activity-item">
          <div
            className={`db-activity-icon db-timeline-dot--${r.event.type}`}
            style={{ width: 32, height: 32, borderRadius: 8 }}
          >
            <Icon name={r.event.type === "call" ? "phone" : r.event.type === "whatsapp" ? "message" : r.event.type === "note" ? "pencil" : "compass"} size={14} />
          </div>
          <div className="db-activity-text">
            <strong>{r.lead.name}</strong> — {r.event.event}
            {r.event.detail && (
              <div style={{ fontSize: 12.5, color: "var(--db-text-dim)", marginTop: 2 }}>
                {r.event.detail}
              </div>
            )}
          </div>
          <div className="db-activity-time">{r.event.time}</div>
        </div>
      ))}
    </div>
  );
}

/* ── LIVE DESK ── */
function LiveDeskTab() {
  return (
    <>
      <div className="db-chart-card" style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
          <div className="db-status-dot" />
          <span style={{ fontSize: 11.5, fontWeight: 700, color: "var(--db-red-light)", textTransform: "uppercase", letterSpacing: "0.6px" }}>
            Live Now
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <div className="db-lead-avatar" style={{ background: avatarColor(LIVE_CALL.lead), width: 52, height: 52, fontSize: 19 }}>
            {initials(LIVE_CALL.lead)}
          </div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ fontSize: 17, fontWeight: 800, color: "var(--db-text)" }}>{LIVE_CALL.lead}</div>
            <div style={{ fontSize: 12.5, color: "var(--db-text-dim)", marginTop: 2 }}>{LIVE_CALL.context}</div>
            <div style={{ fontSize: 11.5, color: "var(--db-text-muted)", marginTop: 2 }}>{LIVE_CALL.agent}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 26, fontWeight: 900, color: "var(--db-red-light)", fontVariantNumeric: "tabular-nums" }}>
              {LIVE_CALL.duration}
            </div>
            <div style={{ fontSize: 11, color: "var(--db-text-muted)" }}>{LIVE_CALL.phone}</div>
          </div>
        </div>

        <div style={{ marginTop: 18, paddingTop: 16, borderTop: "1px solid var(--db-border)" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "var(--db-text-muted)", textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: 10 }}>
            Live Transcript
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {LIVE_TRANSCRIPT.map((t, i) => (
              <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <span style={{ fontSize: 10.5, fontWeight: 700, color: t.speaker === "agent" ? "var(--db-red-light)" : "var(--db-text-dim)", width: 40, flexShrink: 0, textTransform: "uppercase", marginTop: 2 }}>
                  {t.speaker === "agent" ? "AI" : "Lead"}
                </span>
                <span style={{ fontSize: 13, color: "var(--db-text)", lineHeight: 1.5 }}>{t.text}</span>
              </div>
            ))}
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span style={{ fontSize: 10.5, fontWeight: 700, color: "var(--db-red-light)", width: 40, flexShrink: 0, textTransform: "uppercase" }}>AI</span>
              <span className="db-typing-dots"><span /><span /><span /></span>
            </div>
          </div>
        </div>
      </div>

      <div className="db-overview-grid">
        <div className="db-chart-card">
          <div className="db-chart-card__title">Up Next</div>
          <div className="db-chart-card__sub">Call queue, in order</div>
          <div>
            {CALL_QUEUE.map((q) => (
              <div key={q.lead} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid var(--db-border)" }}>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: "var(--db-text)" }}>{q.lead}</div>
                  <div style={{ fontSize: 12, color: "var(--db-text-dim)" }}>{q.reason}</div>
                </div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "var(--db-text-muted)", whiteSpace: "nowrap" }}>{q.eta}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="db-chart-card">
          <div className="db-chart-card__title">Callback Requests</div>
          <div className="db-chart-card__sub">Leads who asked for a specific time</div>
          <div>
            {CALLBACK_REQUESTS.map((c) => (
              <div key={c.lead} style={{ padding: "10px 0", borderBottom: "1px solid var(--db-border)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: "var(--db-text)" }}>{c.lead}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "var(--db-red-light)", whiteSpace: "nowrap" }}>{c.when}</div>
                </div>
                <div style={{ fontSize: 12, color: "var(--db-text-dim)", marginTop: 2 }}>{c.note}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

/* ── RECORDINGS & TRANSCRIPTS ── */
function RecordingsTab() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <>
      <div className="db-chart-card__sub" style={{ marginBottom: 16 }}>
        Every AI call is recorded and transcribed automatically, with an auto-generated summary, sentiment, and
        structured data pulled straight out of the conversation. Recordings are retained 30 days; transcripts and
        summaries stay in the CRM indefinitely.
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {CALL_RECORDINGS.map((r, i) => {
          const open = openIndex === i;
          return (
            <div key={i} className="db-chart-card" style={{ padding: "18px 22px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
                <div className="db-lead-avatar" style={{ background: avatarColor(r.lead), width: 40, height: 40, fontSize: 15, flexShrink: 0 }}>
                  {initials(r.lead)}
                </div>
                <div style={{ flex: 1, minWidth: 180 }}>
                  <div style={{ fontSize: 14.5, fontWeight: 700, color: "var(--db-text)" }}>{r.lead}</div>
                  <div style={{ fontSize: 12, color: "var(--db-text-dim)" }}>{r.time}</div>
                </div>
                <button className="db-recording-play" title="Play recording">
                  <Icon name="play" size={11} /> {r.duration}
                </button>
                <span className="db-badge">
                  <span className="db-badge-dot" style={{ background: SENTIMENT_COLOR[r.sentiment] }} />
                  {r.sentiment}
                </span>
                <span style={{ fontSize: 11.5, color: "var(--db-text-muted)", whiteSpace: "nowrap" }}>{r.cost} / call</span>
                {r.transcript && (
                  <button
                    className="db-btn db-btn--ghost"
                    style={{ padding: "6px 12px", fontSize: 12 }}
                    onClick={() => setOpenIndex(open ? null : i)}
                  >
                    Transcript
                    <Icon name="chevron-down" size={12} style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.15s" }} />
                  </button>
                )}
              </div>

              <div style={{ marginTop: 12, fontSize: 13, color: "var(--db-text-dim)", lineHeight: 1.5 }}>{r.summary}</div>

              {r.extracted && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
                  {Object.entries(r.extracted).map(([k, v]) => (
                    <span key={k} className="db-badge">
                      <strong style={{ fontWeight: 700, color: "var(--db-text)" }}>{k}:</strong>&nbsp;{v}
                    </span>
                  ))}
                </div>
              )}

              {open && r.transcript && (
                <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid var(--db-border)", display: "flex", flexDirection: "column", gap: 8 }}>
                  {r.transcript.map((t, ti) => (
                    <div key={ti} style={{ display: "flex", gap: 8 }}>
                      <span style={{ fontSize: 10.5, fontWeight: 700, color: t.speaker === "agent" ? "var(--db-red-light)" : "var(--db-text-dim)", width: 40, flexShrink: 0, textTransform: "uppercase", marginTop: 2 }}>
                        {t.speaker === "agent" ? "AI" : "Lead"}
                      </span>
                      <span style={{ fontSize: 13, color: "var(--db-text)", lineHeight: 1.5 }}>{t.text}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

/* ── PIPELINE (new vs. reactivation) ── */
function PipelineTab() {
  const [mode, setMode] = useState("new");
  const data = mode === "new" ? PIPELINE_NEW : PIPELINE_REACTIVATION;
  const max = Math.max(...data.map((d) => d.count), 1);
  const booked = data.find((d) => d.stage.includes("Booked"))?.count || 0;
  const attended = data.find((d) => d.stage.includes("Attended"))?.count || 0;
  const noShowRate = booked ? Math.round(((booked - attended) / booked) * 100) : 0;

  return (
    <>
      <div className="db-filters">
        <button className={`db-filter-btn ${mode === "new" ? "active" : ""}`} onClick={() => setMode("new")}>
          New Leads
        </button>
        <button className={`db-filter-btn ${mode === "reactivation" ? "active" : ""}`} onClick={() => setMode("reactivation")}>
          Reactivation Campaign
        </button>
      </div>

      <div className="db-overview-grid">
        <div className="db-chart-card">
          <div className="db-chart-card__title">{mode === "new" ? "New Lead Funnel" : "Reactivation Funnel"}</div>
          <div className="db-chart-card__sub">
            {mode === "new" ? "First-touch leads, last 30 days" : "Re-engaged from the cold / lost list, last 30 days"}
          </div>
          <div className="db-funnel">
            {data.map((d, i) => {
              const pct = Math.round((d.count / max) * 100);
              const shade = 0.32 + (i / (data.length - 1)) * 0.68;
              return (
                <div key={d.stage} className="db-funnel-row">
                  <div className="db-funnel-label">{d.stage}</div>
                  <div className="db-funnel-bar-wrap">
                    {d.count > 0 && (
                      <div
                        className="db-funnel-bar"
                        style={{ width: `${pct}%`, background: `rgba(189,33,32,${shade})`, minWidth: 30 }}
                      >
                        {d.count}
                      </div>
                    )}
                  </div>
                  <div className="db-funnel-count">{d.count}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="db-chart-card">
          <div className="db-chart-card__title">Show-Up Rate</div>
          <div className="db-chart-card__sub">Meeting booked vs. attended</div>
          <div className="db-stat-value" style={{ fontSize: 38 }}>{100 - noShowRate}%</div>
          <div className="db-stat-change">{attended} attended of {booked} booked</div>
          <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid var(--db-border)" }}>
            <div className="db-detail-item__label" style={{ marginBottom: 6 }}>No-Show Rate</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: noShowRate > 25 ? "#dc2626" : "var(--db-text)" }}>
              {noShowRate}%
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ── BY SOURCE ── */
function SourceTab() {
  const totals = SOURCE_PERFORMANCE.reduce(
    (acc, s) => ({
      leads: acc.leads + s.leads,
      spend: acc.spend + s.spend,
      meetingsBooked: acc.meetingsBooked + s.meetingsBooked,
    }),
    { leads: 0, spend: 0, meetingsBooked: 0 }
  );
  const best = [...SOURCE_PERFORMANCE]
    .filter((s) => s.spend > 0 && s.meetingsBooked > 0)
    .sort((a, b) => a.spend / a.meetingsBooked - b.spend / b.meetingsBooked)[0];

  return (
    <>
      <div className="db-stats-grid" style={{ marginBottom: 24 }}>
        <div className="db-stat-card">
          <div className="db-stat-label">Blended Cost / Lead</div>
          <div className="db-stat-value">AED {Math.round(totals.spend / totals.leads)}</div>
        </div>
        <div className="db-stat-card">
          <div className="db-stat-label">Blended Cost / Meeting</div>
          <div className="db-stat-value">AED {Math.round(totals.spend / totals.meetingsBooked)}</div>
        </div>
        <div className="db-stat-card">
          <div className="db-stat-label">Most Efficient Source</div>
          <div className="db-stat-value" style={{ fontSize: 21 }}>{best?.source}</div>
          <div className="db-stat-change">AED {Math.round(best.spend / best.meetingsBooked)} / meeting</div>
        </div>
        <div className="db-stat-card">
          <div className="db-stat-label">Total Ad Spend</div>
          <div className="db-stat-value">AED {totals.spend.toLocaleString()}</div>
        </div>
      </div>

      <div className="db-chart-card__sub" style={{ marginBottom: 12 }}>
        Cost per lead looks cheap on paid social — cost per meeting and revenue tell the real story.
      </div>

      <div className="db-table-wrap">
        <table className="db-table">
          <thead>
            <tr>
              <th>Source</th><th>Leads</th><th>Spend</th><th>Cost Data</th><th>Cost / Lead</th>
              <th>Meetings</th><th>Cost / Meeting</th><th>Show Rate</th>
              <th>Closed</th><th>Revenue</th><th>ROAS</th>
            </tr>
          </thead>
          <tbody>
            {SOURCE_PERFORMANCE.map((s) => {
              const costPerLead = s.spend ? Math.round(s.spend / s.leads) : null;
              const costPerMeeting = s.spend && s.meetingsBooked ? Math.round(s.spend / s.meetingsBooked) : null;
              const showRate = s.meetingsBooked ? Math.round((s.meetingsAttended / s.meetingsBooked) * 100) : 0;
              const roas = s.spend ? s.revenue / s.spend : null;
              return (
                <tr key={s.source}>
                  <td style={{ fontWeight: 700 }}>{s.source}</td>
                  <td>{s.leads}</td>
                  <td>{s.spend ? `AED ${s.spend.toLocaleString()}` : <span style={{ color: "var(--db-text-muted)" }}>Organic</span>}</td>
                  <td>
                    <span className="db-badge">
                      <span className="db-badge-dot" style={{ background: COST_SOURCE_COLOR[s.costSource] }} />
                      {COST_SOURCE_LABEL[s.costSource]}
                    </span>
                  </td>
                  <td>{costPerLead ? `AED ${costPerLead}` : "—"}</td>
                  <td>{s.meetingsBooked}</td>
                  <td style={{ fontWeight: 700 }}>{costPerMeeting ? `AED ${costPerMeeting}` : "—"}</td>
                  <td>{showRate}%</td>
                  <td>{s.closed}</td>
                  <td style={{ color: s.revenue ? "var(--db-text)" : "var(--db-text-muted)", fontWeight: 600 }}>
                    {s.revenue ? `AED ${(s.revenue / 1000).toFixed(0)}K` : "—"}
                  </td>
                  <td>
                    {roas != null ? (
                      <span style={{ fontWeight: 800, color: roas >= 50 ? "#059669" : roas > 0 ? "#b45309" : "#9ca3af" }}>
                        {roas > 0 ? `${roas.toFixed(0)}x` : "—"}
                      </span>
                    ) : (
                      <span style={{ color: "var(--db-text-muted)" }}>—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div style={{ fontSize: 11.5, color: "var(--db-text-muted)", marginTop: 12, lineHeight: 1.6 }}>
        Google &amp; Meta spend syncs live from their Ads APIs. Bayut, Property Finder and Dubizzle are
        subscription / credit packages, not pay-per-lead bidding — their spend is the monthly package cost,
        entered once and split across the leads it produced that month.
      </div>
    </>
  );
}

/* ── BY CREATIVE ── */
function CreativeTab() {
  return (
    <>
      <div className="db-chart-card__sub" style={{ marginBottom: 16 }}>
        Ad-level attribution — which creative produced a qualified meeting, not just a cheap click.
      </div>
      <div className="db-table-wrap">
        <table className="db-table">
          <thead>
            <tr>
              <th>Platform</th><th>Creative</th><th>Type</th><th>Spend</th>
              <th>Leads</th><th>Cost / Lead</th><th>Meetings</th><th>Cost / Meeting</th>
            </tr>
          </thead>
          <tbody>
            {AD_CREATIVES.map((c) => {
              const costPerLead = Math.round(c.spend / c.leads);
              const costPerMeeting = c.meetings ? Math.round(c.spend / c.meetings) : null;
              return (
                <tr key={c.name}>
                  <td>
                    <span className="db-channel">
                      <Icon name={c.platform === "Meta" ? "message" : "search"} size={12} />
                      {c.platform}
                    </span>
                  </td>
                  <td style={{ fontWeight: 600 }}>{c.name}</td>
                  <td style={{ color: "var(--db-text-dim)" }}>{c.type}</td>
                  <td>AED {c.spend.toLocaleString()}</td>
                  <td>{c.leads}</td>
                  <td>AED {costPerLead}</td>
                  <td>{c.meetings}</td>
                  <td style={{ fontWeight: 700, color: costPerMeeting ? "var(--db-text)" : "#dc2626" }}>
                    {costPerMeeting ? `AED ${costPerMeeting}` : "No meetings yet"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

/* ── TEAM ── */
function TeamTab() {
  return (
    <div className="db-table-wrap">
      <table className="db-table">
        <thead>
          <tr>
            <th>Broker</th><th>Assigned</th><th>Meetings Received</th><th>Attended</th>
            <th>Show Rate</th><th>Closed</th><th>Revenue</th>
          </tr>
        </thead>
        <tbody>
          {TEAM.map((t) => {
            const showRate = t.received ? Math.round((t.attended / t.received) * 100) : 0;
            return (
              <tr key={t.broker}>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div className="db-lead-avatar" style={{ background: avatarColor(t.broker), width: 32, height: 32, fontSize: 13 }}>
                      {initials(t.broker)}
                    </div>
                    <div className="db-lead-name">{t.broker}</div>
                  </div>
                </td>
                <td>{t.assigned}</td>
                <td>{t.received}</td>
                <td>{t.attended}</td>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 60, height: 6, background: "var(--db-dark-4)", borderRadius: 3, overflow: "hidden" }}>
                      <div
                        style={{
                          width: `${showRate}%`,
                          height: "100%",
                          background: showRate >= 70 ? "var(--db-green)" : showRate >= 40 ? "var(--db-amber)" : "var(--db-red-light)",
                        }}
                      />
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 600 }}>{showRate}%</span>
                  </div>
                </td>
                <td>{t.closed}</td>
                <td style={{ fontWeight: 700, color: "var(--db-text)" }}>AED {(t.revenue / 1000).toFixed(0)}K</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* ── REVENUE ATTRIBUTION ── */
function RevenueTab() {
  const maxRevenue = Math.max(...SOURCE_PERFORMANCE.map((s) => s.revenue), 1);
  const blendedRoas = PERIOD_SUMMARY.revenue / PERIOD_SUMMARY.spend;

  return (
    <>
      <div className="db-stats-grid" style={{ marginBottom: 24 }}>
        <div className="db-stat-card">
          <div className="db-stat-label">Total Ad Spend</div>
          <div className="db-stat-value">AED {PERIOD_SUMMARY.spend.toLocaleString()}</div>
        </div>
        <div className="db-stat-card">
          <div className="db-stat-label">Revenue Closed</div>
          <div className="db-stat-value">AED {(PERIOD_SUMMARY.revenue / 1e6).toFixed(2)}M</div>
        </div>
        <div className="db-stat-card">
          <div className="db-stat-label">Blended ROAS</div>
          <div className="db-stat-value">{blendedRoas.toFixed(0)}x</div>
        </div>
        <div className="db-stat-card">
          <div className="db-stat-label">Open Pipeline Value</div>
          <div className="db-stat-value">AED {(PERIOD_SUMMARY.openPipelineValue / 1e6).toFixed(2)}M</div>
        </div>
      </div>

      <div className="db-chart-card">
        <div className="db-chart-card__title">Revenue by Source</div>
        <div className="db-chart-card__sub">Closed deal value attributed to the channel that produced the lead</div>
        <div className="db-funnel">
          {[...SOURCE_PERFORMANCE].sort((a, b) => b.revenue - a.revenue).map((s) => {
            const pct = Math.round((s.revenue / maxRevenue) * 100);
            return (
              <div key={s.source} className="db-funnel-row">
                <div className="db-funnel-label">{s.source}</div>
                <div className="db-funnel-bar-wrap">
                  {s.revenue > 0 && (
                    <div
                      className="db-funnel-bar"
                      style={{ width: `${pct}%`, background: "var(--db-red)", minWidth: 30 }}
                    >
                      {`AED ${(s.revenue / 1000).toFixed(0)}K`}
                    </div>
                  )}
                </div>
                <div className="db-funnel-count" style={{ width: "auto" }}>
                  {s.revenue > 0 && s.spend ? `${(s.revenue / s.spend).toFixed(0)}x` : "—"}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ fontSize: 11.5, color: "var(--db-text-muted)", marginTop: 16, lineHeight: 1.6 }}>
        Revenue lives in the CRM, not the ad platforms — Google and Meta only see a "lead." Closed deal value is
        synced back to Google Ads (offline conversion import) and Meta (Conversions API) so both platforms can
        optimize toward real deals instead of cheap leads.
      </div>
    </>
  );
}

/* ── DAILY REPORT ── */
function DailyReportTab() {
  const [today, ...history] = DAILY_REPORTS;
  const pickupRate = Math.round((today.pickedUp / today.dialled) * 100);

  return (
    <>
      <div className="db-chart-card" style={{ marginBottom: 24 }}>
        <div className="db-chart-card__title">{today.date} — Shift Summary</div>
        <div className="db-chart-card__sub">Compiled automatically at the end of each shift</div>
        <div className="db-detail-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
          <div className="db-detail-item">
            <div className="db-detail-item__label">Dialled</div>
            <div className="db-detail-item__value" style={{ fontSize: 19 }}>{today.dialled}</div>
          </div>
          <div className="db-detail-item">
            <div className="db-detail-item__label">Picked Up</div>
            <div className="db-detail-item__value" style={{ fontSize: 19 }}>
              {today.pickedUp} <span style={{ fontSize: 12, color: "var(--db-text-dim)", fontWeight: 500 }}>({pickupRate}%)</span>
            </div>
          </div>
          <div className="db-detail-item">
            <div className="db-detail-item__label">Real Conversations</div>
            <div className="db-detail-item__value" style={{ fontSize: 19 }}>{today.conversations}</div>
          </div>
          <div className="db-detail-item">
            <div className="db-detail-item__label">Meetings Booked</div>
            <div className="db-detail-item__value" style={{ fontSize: 19 }}>{today.meetingsBooked}</div>
          </div>
          <div className="db-detail-item">
            <div className="db-detail-item__label">Meetings Attended</div>
            <div className="db-detail-item__value" style={{ fontSize: 19 }}>{today.meetingsAttended}</div>
          </div>
          <div className="db-detail-item">
            <div className="db-detail-item__label">Best Source Today</div>
            <div className="db-detail-item__value" style={{ fontSize: 19 }}>{today.bestSource}</div>
          </div>
        </div>
      </div>

      <div className="db-chart-card__title" style={{ marginBottom: 16 }}>Previous Days</div>
      <div className="db-table-wrap">
        <table className="db-table">
          <thead>
            <tr>
              <th>Date</th><th>Dialled</th><th>Picked Up</th><th>Conversations</th>
              <th>Meetings Booked</th><th>Attended</th><th>Best Source</th>
            </tr>
          </thead>
          <tbody>
            {history.map((d) => (
              <tr key={d.date}>
                <td style={{ fontWeight: 600 }}>{d.date}</td>
                <td>{d.dialled}</td>
                <td>{d.pickedUp}</td>
                <td>{d.conversations}</td>
                <td>{d.meetingsBooked}</td>
                <td>{d.meetingsAttended}</td>
                <td style={{ color: "var(--db-text-dim)" }}>{d.bestSource}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN DASHBOARD COMPONENT
═══════════════════════════════════════════════════════════ */
function Dashboard() {
  const [leads, setLeads] = useState(INITIAL_LEADS);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedLead, setSelectedLead] = useState(null);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleStatusChange = useCallback((id, newStatus) => {
    setLeads((prev) =>
      prev.map((l) =>
        l.id === id
          ? {
              ...l,
              status: newStatus,
              timeline: [
                {
                  type: "status",
                  event: `Status updated → ${newStatus}`,
                  detail: "",
                  time: "Just now",
                },
                ...l.timeline,
              ],
              lastActivity: "Just now",
            }
          : l
      )
    );
    // Update selectedLead if it's the one being changed
    setSelectedLead((prev) =>
      prev && prev.id === id
        ? {
            ...prev,
            status: newStatus,
            timeline: [
              {
                type: "status",
                event: `Status updated → ${newStatus}`,
                detail: "",
                time: "Just now",
              },
              ...prev.timeline,
            ],
          }
        : prev
    );
  }, []);

  async function handleLogout() {
    await fetch("/api/dashboard/logout", { method: "POST" });
    router.reload();
  }

  const TAB_TITLES = {
    overview: "Overview",
    live: "Live Desk",
    leads: "All Leads",
    pipeline: "Pipeline",
    calls: "Call Records",
    recordings: "Recordings & Transcripts",
    whatsapp: "WhatsApp Records",
    source: "By Source",
    creative: "By Creative",
    team: "Team",
    revenue: "Revenue Attribution",
    daily: "Daily Report",
    activity: "Activity Feed",
  };

  return (
    <div className="db-shell">
      <div className="db-layout">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onLogout={handleLogout}
          counts={{
            leads: leads.length,
            calls: leads.reduce((s, l) => s + l.callsCount, 0),
            whatsapp: leads.reduce((s, l) => s + l.whatsappCount, 0),
          }}
        />

        <div className="db-main">
          {/* Top Bar */}
          <div className="db-topbar">
            <div className="db-topbar__left">
              <div className="db-topbar__title">{TAB_TITLES[activeTab]}</div>
              <div className="db-topbar__sub">
                AI Lead Management Dashboard — Dubai Real Estate
              </div>
            </div>
            <div className="db-topbar__right">
              <div className="db-topbar__search">
                <svg className="db-topbar__search-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                </svg>
                <input
                  className="db-topbar__search-input"
                  type="text"
                  placeholder="Search leads, phones, emails…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--db-text-dim)" }}>
                <div className="db-status-dot" />
                Live
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="db-content">
            {!["overview", "activity", "live", "pipeline"].includes(activeTab) && (
              <div className="db-section-header">
                <div className="db-section-title">
                  {TAB_TITLES[activeTab]}
                  <span className="db-section-count">
                    {activeTab === "leads" && leads.length}
                    {activeTab === "calls" && leads.reduce((s, l) => s + l.callsCount, 0)}
                    {activeTab === "recordings" && CALL_RECORDINGS.length}
                    {activeTab === "whatsapp" && leads.reduce((s, l) => s + l.whatsappCount, 0)}
                    {activeTab === "source" && SOURCE_PERFORMANCE.length}
                    {activeTab === "creative" && AD_CREATIVES.length}
                    {activeTab === "team" && TEAM.length}
                    {activeTab === "daily" && DAILY_REPORTS.length}
                  </span>
                </div>
              </div>
            )}

            {activeTab === "overview" && (
              <OverviewTab leads={leads} />
            )}

            {activeTab === "live" && <LiveDeskTab />}

            {activeTab === "leads" && (
              <LeadsTab
                leads={leads}
                onOpenLead={setSelectedLead}
                onStatusChange={handleStatusChange}
                filter={filter}
                setFilter={setFilter}
                search={search}
              />
            )}

            {activeTab === "pipeline" && <PipelineTab />}

            {activeTab === "calls" && (
              <CallsTab leads={leads} onOpenLead={setSelectedLead} />
            )}

            {activeTab === "recordings" && <RecordingsTab />}

            {activeTab === "whatsapp" && (
              <WhatsAppTab leads={leads} onOpenLead={setSelectedLead} />
            )}

            {activeTab === "source" && <SourceTab />}

            {activeTab === "creative" && <CreativeTab />}

            {activeTab === "team" && <TeamTab />}

            {activeTab === "revenue" && <RevenueTab />}

            {activeTab === "daily" && <DailyReportTab />}

            {activeTab === "activity" && (
              <ActivityTab leads={leads} />
            )}
          </div>
        </div>
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <LeadModal
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PAGE EXPORT + SSR AUTH
═══════════════════════════════════════════════════════════ */
export default function DashboardPage({ authenticated }) {
  return (
    <>
      <Head>
        <title>AI Lead Dashboard — DevMate Solutions</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="db-shell">
        {authenticated ? <Dashboard /> : <LoginPage />}
      </div>
    </>
  );
}

export async function getServerSideProps({ req }) {
  const cookies = parseCookies(req.headers.cookie || "");
  const authenticated = isValidDashboardSession(cookies[DASHBOARD_COOKIE_NAME]);
  return { props: { authenticated } };
}
