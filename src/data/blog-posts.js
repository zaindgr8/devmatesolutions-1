// Real articles and guides on the site, newest first. Add new posts at the top:
// the /blog page, the landing page section and the blog schema all read from here.
export const BLOG_CATEGORIES = ["AI Around the World", "Dubai Real Estate", "AI Call Assistants", "AI Automation"];

const blog_posts = [
  {
    href: "/off-plan-handover-dubai-real-estate",
    title: "Off-Plan Handover in Dubai: Snagging, the Final Payment and the Title Deed",
    excerpt:
      "The developer has issued the handover notice — now what? The snagging inspection, the final payment, the DLD fee and Oqood, the title deed and the keys — and the three mistakes that cost a buyer their leverage.",
    category: "Dubai Real Estate",
    date: "2026-11-14",
  },
  {
    href: "/after-showing-follow-up-usa-real-estate",
    title: "After the Showing: What a Real Estate Team Should Do Before the Buyer Moves On",
    excerpt:
      "The showing went well — now what? The follow-up call within the hour, the feedback while it is fresh, the second showing or the offer — and the three ways a good showing quietly dies.",
    category: "AI Call Assistants",
    date: "2026-11-14",
  },
  {
    href: "/choose-ai-automation-agency-dubai",
    title: "How to Choose an AI Automation Agency in Dubai",
    excerpt:
      "Hiring an AI automation agency in Dubai? The questions to ask before you sign: what a good agency proves on your own leads, how it handles DNCR, PDPL and RERA in plain language, what Arabic and English coverage really means, and the red flags that tell you to walk away.",
    category: "AI Automation",
    date: "2026-11-11",
  },
  {
    href: "/choose-ai-call-assistant-usa",
    title: "How to Choose an AI Call Assistant in the USA",
    excerpt:
      "Hiring an AI call assistant for your real estate team, dental practice or med spa? The questions to ask before you sign: what a good provider proves on your own calls, how consent, opt-out and do-not-call screening work, and the red flags that tell you to walk away.",
    category: "AI Call Assistants",
    date: "2026-11-11",
  },
  {
    href: "/ai-around-the-world",
    title: "AI Around the World: What This Week's AI News Means for a Business That Answers Its Customers",
    excerpt:
      "Claude's 1,000-agent experiment built a working operating system in eight days, Meta launched a tiny model for high-volume agent work, Google shipped new AI chips, and NVIDIA taught robots by watching humans — plus the honest number: most AI spending still shows no return. What each move means for your business, and what to do with it.",
    category: "AI Around the World",
    date: "2026-11-10",
  },
  {
    href: "/pre-approved-before-you-view-dubai-real-estate",
    title: "Pre-Approved Before You View: What a Dubai Buyer Should Have Ready First",
    excerpt:
      "The viewing is booked — but is the buyer ready? A realistic budget, the deposit they can actually pay, a timeline, and the documents a lender asks for — and how a brokerage qualifies in order, in Arabic and English, before a Saturday is spent touring the wrong homes.",
    category: "Dubai Real Estate",
    date: "2026-11-10",
  },
  {
    href: "/consultation-prep-med-spa-usa",
    title: "Your Consultation Is Booked. What Should Happen Before the Client Walks In?",
    excerpt:
      "The consultation is booked — but booked is not the same as kept. What a med spa should do between the booking and the visit: answer the eligibility questions, send what to bring and what to expect in writing, remind the client, and make rescheduling one step.",
    category: "AI Call Assistants",
    date: "2026-11-10",
  },
  {
    href: "/second-viewing-dubai-real-estate",
    title: "The Second Viewing: What a Dubai Buyer Is Really Checking — and What Your Follow-Up Should Do",
    excerpt:
      "The first viewing went well — now what? What a Dubai buyer is really checking on a second viewing: light and noise at a different time of day, service charges, the community after dark — and how a brokerage books it the same day, prepares the answers, and names the next step.",
    category: "Dubai Real Estate",
    date: "2026-11-09",
  },
  {
    href: "/after-first-reply-med-spa-usa",
    title: "After the First Reply: What a Med Spa Does With an After-Hours Enquiry",
    excerpt:
      "The enquiry was answered at 9 p.m. — now what? What a med spa must do in the next 24 hours after an after-hours enquiry: confirm the consultation in writing, hold the slot in a real calendar, send a reminder, and make rescheduling easy — so the booking actually happens.",
    category: "AI Call Assistants",
    date: "2026-11-09",
  },
  {
    href: "/after-offer-dubai-real-estate",
    title: "After the Offer: What Has to Happen Before a Dubai Buyer Gets the Keys",
    excerpt:
      "The offer is agreed — now what? The offer in writing, the MOU and Form F, the deposit, the NOC, the mortgage and the DLD transfer — and how a brokerage keeps both sides moving without losing the deal.",
    category: "Dubai Real Estate",
    date: "2026-11-08",
  },
  {
    href: "/after-hours-dental-calls-usa",
    title: "After-Hours Dental Calls: What Happens When the Front Desk Goes Home",
    excerpt:
      "Dental calls do not stop at 5 p.m. What an after-hours answer must do: take the toothache call seriously, book the new patient, handle the reschedule — and route anything clinical to the team, never guess.",
    category: "AI Call Assistants",
    date: "2026-11-08",
  },
  {
    href: "/after-viewing-follow-up-dubai-real-estate",
    title: "After the Viewing: How a Dubai Brokerage Follows Up Without Losing the Buyer",
    excerpt:
      "The viewing went well — now what? A same-day follow-up, honest feedback in both directions, and a named next step: a second viewing, an offer, or a clear reason to keep looking.",
    category: "Dubai Real Estate",
    date: "2026-11-07",
  },
  {
    href: "/missed-calls-cost-real-estate-usa",
    title: "What a Missed Call Costs a US Real Estate Team, and How to Work It Out",
    excerpt:
      "A missed buyer call is usually a showing booked with the team that answered first. A simple formula for the weekly cost, the three moments calls get missed most, and what an answered call must do instead.",
    category: "AI Call Assistants",
    date: "2026-11-07",
  },
  {
    href: "/first-reply-to-viewing-booked-dubai-real-estate",
    title: "From First Reply to Viewing Booked: What Has to Happen After a Dubai Buyer Enquires",
    excerpt:
      "A fast first reply is only the start: what has to happen between a Dubai buyer's first enquiry and a viewing in the diary — qualification in order, a real slot offered, confirmation and follow-up — across Bayut, Property Finder, WhatsApp and phone, in Arabic and English.",
    category: "Dubai Real Estate",
    date: "2026-11-06",
  },
  {
    href: "/missed-calls-cost-med-spa",
    title: "What a Missed Call Costs a Med Spa, and How to Work It Out",
    excerpt:
      "A missed new-client call is usually a client booked elsewhere. A simple formula for working out what missed calls cost a med spa, the three moments they happen most, and what an answered call must do instead.",
    category: "AI Call Assistants",
    date: "2026-11-06",
  },
  {
    href: "/arabic-first-buyers-dubai-real-estate",
    title: "What Changes When a Dubai Buyer Writes in Arabic First?",
    excerpt:
      "Many Dubai buyers enquire in Arabic first. What changes when the first reply matches their language, how qualification works in Arabic and English, and why one pipeline matters.",
    category: "Dubai Real Estate",
    date: "2026-11-05",
  },
  {
    href: "/after-hours-homebuyer-calls-usa-real-estate",
    title: "After-Hours Calls from US Homebuyers: Why Evenings and Weekends Decide the Showing",
    excerpt:
      "US homebuyer calls arrive in the evening, at weekends, and from other time zones. What an after-hours answer must do, why a message is not a showing, and how a voice-first assistant turns evening callers into booked showings.",
    category: "AI Call Assistants",
    date: "2026-11-05",
  },
  {
    href: "/after-hours-weekend-leads-dubai-real-estate",
    title: "After Hours and Weekend Leads: Why Dubai Brokerages Lose Enquiries When the Office Closes",
    excerpt:
      "Dubai property enquiries arrive in the evening, at weekends, and from other time zones. What an after-hours first reply must contain, how Arabic and English handling changes the outcome, and how to keep every lead in one pipeline.",
    category: "Dubai Real Estate",
    date: "2026-11-04",
  },
  {
    href: "/after-hours-med-spa-enquiries-usa",
    title: "After-Hours Enquiries: Why Med Spas Lose Bookings When the Phones Go Unanswered",
    excerpt:
      "Med spa enquiries arrive in the evening, at weekends, and at lunch. What an after-hours answer must do, why a message is not a booking, and how a voice-first assistant turns evening callers into booked consultations.",
    category: "AI Call Assistants",
    date: "2026-11-04",
  },
  {
    href: "/dncr-pdpl-rera-dubai-real-estate",
    title: "DNCR, PDPL and RERA: The Three Rules Behind Automated Calls and WhatsApp in Dubai Real Estate",
    excerpt:
      "DNCR screening, PDPL consent and data handling, and RERA licensing and honest advertising: the rules that decide whether automated outreach helps a Dubai brokerage or puts it at risk.",
    category: "Dubai Real Estate",
    date: "2026-11-03",
  },
  {
    href: "/missed-calls-cost-dental-practice",
    title: "What a Missed Call Costs a Dental Practice, and How to Work It Out",
    excerpt:
      "A missed new-patient call is usually a patient booked elsewhere. A simple formula for the cost, the three moments calls get missed most, and what an answered call must do instead.",
    category: "AI Call Assistants",
    date: "2026-11-03",
  },
  {
    href: "/whatsapp-phone-portal-dubai-real-estate-leads",
    title: "WhatsApp vs Phone vs Portal: Where Dubai Real Estate Leads Actually Die",
    excerpt:
      "Each channel loses leads in a different place. What each one is good at, where it leaks, and why one pipeline across Bayut, Property Finder, WhatsApp and phone beats a favourite channel.",
    category: "Dubai Real Estate",
    date: "2026-11-02",
  },
  {
    href: "/ai-lead-response-usa",
    title: "AI Lead Response in the USA: Every New Lead Answered in Seconds",
    excerpt:
      "Every new lead answered on the phone in seconds, qualified, booked into a real calendar and logged, for US real estate, dental clinics and med spas.",
    category: "AI Call Assistants",
    date: "2026-11-02",
  },
  {
    href: "/how-fast-to-reply-dubai-real-estate-leads",
    title: "How Fast Should a Dubai Brokerage Reply to a Bayut / Property Finder Lead?",
    excerpt:
      "The first useful reply usually wins the viewing. What speed to lead means for Dubai brokerages, where portal leads actually die, and what a good first reply contains.",
    category: "Dubai Real Estate",
    date: "2026-11-01",
  },
  {
    href: "/ai-call-assistant-aesthetics-usa",
    title: "AI Call Assistant for Med Spas and Aesthetics Clinics in the USA",
    excerpt:
      "Every call answered in seconds, with consultation and treatment bookings, reschedules and reminders, for clinics in Miami, Houston, Dallas-Fort Worth, Florida and Texas.",
    category: "AI Call Assistants",
    date: "2026-11-01",
  },
  {
    href: "/ai-call-assistant-dental-usa",
    title: "AI Call Assistant for Dental Clinics in the USA",
    excerpt:
      "New-patient bookings, reschedules and reminders handled in seconds, even while your team is chairside, with calendar and CRM logging on every call.",
    category: "AI Call Assistants",
    date: "2026-10-31",
  },
  {
    href: "/ai-agent-dubai-real-estate",
    title: "AI Agent for Dubai Real Estate Brokerages",
    excerpt:
      "Instant replies, full lead qualification, viewing bookings, follow-up and CRM logging across Bayut, Property Finder, WhatsApp and web, in Arabic and English.",
    category: "Dubai Real Estate",
    date: "2026-10-31",
  },
  {
    href: "/ai-automation-dubai",
    title: "AI Automation Services in Dubai",
    excerpt:
      "How automation handles first replies, qualification, follow-up, booking and CRM logging across WhatsApp, web and portal leads, so your team can focus on closing.",
    category: "AI Automation",
    date: "2026-10-30",
  },
  {
    href: "/ai-call-assistant-usa-real-estate",
    title: "AI Call Assistant for US Real Estate Brokerages",
    excerpt:
      "Every buyer call answered in seconds, qualified and booked as a showing, even while your agents are out, across Miami, Houston, Dallas-Fort Worth, Florida and Texas.",
    category: "AI Call Assistants",
    date: "2026-10-30",
  },
  {
    href: "/ai-chatbot-dubai-real-estate",
    title: "AI Chatbot for Dubai Real Estate",
    excerpt:
      "Instant replies on WhatsApp and your website, qualification of Bayut, Property Finder and Dubizzle leads, and viewing bookings, in Arabic and English, 24/7.",
    category: "Dubai Real Estate",
    date: "2026-10-30",
  },
];

export default blog_posts;
