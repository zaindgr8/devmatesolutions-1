# DevMate Blog Automation Playbook

Instructions for an automated writer (for example, a Muse agent) that publishes to the DevMate Solutions blog on a schedule. Follow every section. When this file and an older plan disagree, this file wins.

## 1. Goal

Make DevMate Solutions the first name people, search engines and AI assistants (ChatGPT, Gemini, Perplexity, Claude) associate with **AI in Dubai**.

Anyone searching for an AI service in Dubai should find a DevMate page that answers the question and leads to a demo:

- AI agency or AI company in Dubai
- AI call assistants and AI voice agents
- Agentic AI and AI agents
- AI automation and WhatsApp AI agents
- AI news in Dubai and the UAE

Then cover the top Dubai industries: real estate, hospitality, clinics and healthcare, banking and finance, retail, and government services.

### Internal rule: Dubai targeting stays behind the scenes
Dubai is our SEO target, not our public positioning.
- **Brand-level copy stays generic AI.** This covers the `/blog` hub heading, intro, labels and category names: "our AI blog and R&D research", not "AI in Dubai".
- **Target Dubai at the article level.** Use the slug, title and meta description, the article's own content, local examples, and the industry pages.
- **Never describe the blog or the company as "Dubai-only".** Use phrasing like "an AI agency based in Dubai" only where location helps the reader.
- **Category names stay generic**: `AI News`, not `AI News`.

## 2. Weekly publishing plan

Publish **one article per weekday**. Rotate the types below so every pillar keeps growing.

| Day | Type | Category in `blog-posts.js` |
|---|---|---|
| Monday | AI News Dubai roundup | `AI News` |
| Tuesday | AI service deep-dive | `AI Services`, `AI Call Assistants` or `AI Automation` |
| Wednesday | Industry guide | `Dubai Real Estate`, `Hospitality`, or a new industry category |
| Thursday | Agentic AI | `Agentic AI` |
| Friday | Global AI news, and what it means for Dubai | `AI Around the World` |

**Focus.** At least 4 of every 5 articles must be about Dubai or the UAE. US articles (dental, med spa, US real estate) are allowed at most once a week, and only if asked.

**News accuracy.** Only report announcements you can link to a published source. Give the source's date.

## 2a. Daily routine (run every weekday)

1. **Search for new AI news in Dubai and the UAE from the last 7 days.** Run these web searches:
   - `Dubai AI news this week`
   - `UAE artificial intelligence announcement`
   - `agentic AI UAE government`
   - `Dubai Future Foundation AI`
   - `Digital Dubai AI`
   - `UAE AI and Data Authority`
   - `Emirates NBD OR "Dubai Islamic Bank" AI`
   - `Dubai real estate AI`
   - `Dubai hotels AI`
   - `UAE healthcare AI`
   - `GITEX OR "Dubai AI Week" 2026`

   Prefer primary sources: WAM, Dubai Media Office, Digital Dubai, Dubai Future Foundation, and the official sites of companies and authorities. Use trusted news (The National, Khaleej Times, Gulf News, Gulf Business) when no primary source exists.
2. **Search for what businesses are asking.** Look at "People also ask" results and AI assistant answers for the search phrases in section 3. Note any question no DevMate page answers yet.
3. **Pick today's article.**
   - Follow the weekly plan in section 2.
   - If a major Dubai or UAE AI announcement appeared, it takes priority: write the news item, or add it to `/ai-news-dubai`.
   - Otherwise take the next unused topic from section 4.
4. **Verify every fact.** Open each source page you will cite, confirm the exact wording, numbers and date, and list it in `sources`. If you can't confirm a fact, leave it out.
5. **Publish** by following section 5, check against sections 6 and 7, and open the pull request.
6. **Log what you used.** In the PR description, list the searches you ran and the sources you used, so the next run doesn't repeat a topic.

## 3. Market priorities (research, November 2026)

Use this to decide what to write first. The priorities come from public surveys and reports. No exact keyword search volumes were available, so check Google Search Console or a keyword tool before relying on any single phrase.

### What the research shows
- **Usage is very high.** The UAE ranks at or near the top worldwide for AI use. Microsoft reported 70.1% of the working-age population using AI in Q1 2026 ([Microsoft AI Diffusion via nqshmedia](https://nqshmedia.com/ai-adoption-uae)).
- **People already ask AI assistants.** 89% of UAE respondents start at least some searches with an AI assistant ([Campaign Middle East](https://campaignme.com/from-ranking-to-being-cited-the-gulf-regions-next-search-advantage/)). Clear, quotable answers matter as much as Google rankings.
- **Agentic AI is the top skills need.** 57% of UAE organisations named agentic AI as their most in-demand skill ([Red Hat](https://www.redhat.com/en/about/press-releases/red-hat-survey-uae-organisations-prepare-for-widespread-ai-adoption-corrections-skills-gaps)). Government and banks are moving to agentic AI.
- **Chat AI is normal in commerce.** 51% of UAE shoppers use AI chat tools when shopping online, and 91% of e-commerce businesses have integrated it ([DHL via Aletihad](https://en.aletihad.ae/news/business/4674426/uae-ranks-among-top-markets-for-ai-assisted-shopping--survey)).
- **Results lag spending.** Over 90% of organisations say AI is not yet delivering customer value ([Red Hat](https://www.redhat.com/en/about/press-releases/red-hat-survey-uae-organisations-prepare-for-widespread-ai-adoption-corrections-skills-gaps)). Content about measurable results and doing AI properly answers a real need.
- **AI voice agents are the most crowded niche.** Many Dubai vendors compete on it. Win by being specific about Arabic and English, UAE compliance, live tests on the buyer's own calls, and named industries.
- **Industries.** Sources rank sectors differently:
  - healthcare as the leading end use ([IMARC via molecularcloud](https://www.molecularcloud.org/p/uae-artificial-intelligence-market-report-2026-growth-trends-and-demand-forecast-by-2034))
  - government and public services leading the market ([GlobeNewswire](https://www.globenewswire.com/news-release/2026/10/28/3390454/28124/en/uae-artificial-intelligence-ai-market-size-share-trends-and-industry-analysis-forecast-to-2036-market-to-reach-usd-51-29-billion-at-18-cagr-driven-by-sovereign-ai-and-data-centers.html))
  - technology, media and telecoms leading AI hiring ([PwC](https://www.pwc.com/m1/en/publications/ai-jobs-barometer-uae-2026.html))

  Real estate, clinics and business setup firms are common voice agent buyers in Dubai.

### What people search for
These are the phrase patterns to target. They are the intent we expect, not measured volumes.

| Intent | Example searches |
|---|---|
| Hiring an agency | "AI agency Dubai", "AI company in Dubai", "AI development company UAE", "best AI agency Dubai" |
| Voice | "AI voice agent Dubai", "AI call assistant Dubai", "AI receptionist Dubai", "Arabic voice AI" |
| Agents | "AI agent development UAE", "agentic AI Dubai", "AI agents for business" |
| Chat and WhatsApp | "AI chatbot Dubai", "WhatsApp chatbot UAE", "Arabic chatbot" |
| Automation | "AI automation Dubai", "AI for CRM", "AI lead generation Dubai" |
| Industry + AI | "AI for real estate Dubai", "AI for clinics UAE", "AI for hotels Dubai", "AI in banking UAE" |
| Questions people ask AI assistants | "how much does an AI chatbot cost in Dubai", "is AI calling legal in UAE", "which is the best AI agency in Dubai" |
| News | "AI news Dubai", "UAE AI law", "Dubai AI events" |

### Priority order
1. **Services.**
   - AI voice and call agents
   - agentic AI and AI agents
   - WhatsApp and chat AI
   - AI automation and CRM
   - choosing an AI agency
2. **Industries.**
   - real estate
   - clinics and healthcare
   - banking and fintech
   - hotels and tourism
   - retail and e-commerce
   - business setup and professional services
   - logistics
3. **AI news Dubai.** Publish monthly at least, sourced and dated.

## 4. Topic backlog (in priority order)

Pick the first unused topic. Each topic needs its own slug, ending in `-dubai` where the topic is local.

### Tier 1: highest demand
- AI voice agent in Dubai: inbound, outbound and Arabic dialects, and what to ask a provider
- AI receptionist for Dubai clinics: bookings, reschedules and reminders
- AI agent development in the UAE: custom agents vs off-the-shelf tools
- WhatsApp AI agent for Dubai businesses: setup, rules and what to automate
- Arabic AI chatbot: what good Arabic customer service AI looks like
- How much does an AI chatbot or voice agent cost in Dubai? Explain the factors only, with no prices.
- Is AI calling legal in the UAE? Consent, DNCR, PDPL and opt-out in plain language
- Best AI agency in Dubai: 7 questions to ask before you hire. Keep it neutral, with no competitor names.
- AI lead generation and qualification in Dubai: from enquiry to booked meeting
- Why most AI projects do not deliver value yet, and how to make yours one that does

### Tier 2: industries
- AI for Dubai clinics and healthcare providers
- AI in UAE banking and fintech: what other businesses can learn
- AI for Dubai hotels: reservations, upsells and guest messaging
- AI for holiday home operators in Dubai
- AI for e-commerce and retail in the UAE: chat, WhatsApp and order questions
- AI for business setup and PRO service firms in Dubai
- AI for car dealerships in Dubai
- AI for restaurants in Dubai: bookings and delivery questions
- AI for logistics companies in Dubai
- AI for education and training centres in the UAE

### Tier 3: agentic AI explainers
- Agentic AI use cases for Dubai SMEs
- How UAE government agentic AI services change what customers expect
- Building safe AI agents: permissions, approvals and audit trails
- Multi-agent systems explained for business owners
- AI agents for operations: invoices, documents and follow-ups
- AI voice agent vs IVR: what Dubai businesses should switch to
- AI chatbot vs AI agent: which one does your business need?

### Recurring: news and ecosystem
- Monthly AI news in Dubai and the UAE. Update `/ai-news-dubai` or publish a dated edition.
- AI events in Dubai: GITEX, Dubai AI Week and Future Week. What to watch and why it matters.
- UAE AI and data rules explained: the AI and Data Authority, PDPL and what businesses must do
- Arabic large language models and what they mean for UAE businesses

## 5. How to publish one article

### Step 1: Create the page
Create `src/pages/<slug>.jsx` using the shared layout `src/components/articles/ArticleLayout.jsx`. Copy `src/pages/ai-call-assistant-dubai.jsx` as the starting template and replace all content.

Required props:

| Prop | Value |
|---|---|
| `slug` | `"/<slug>"` |
| `title` | Headline, 50–65 characters. Do not add "DevMate Solutions"; the site appends it. |
| `description` | 140–160 characters, including the main keyword and Dubai or UAE |
| `datePublished` | `"YYYY-MM-DD"`, today |
| `badge` | e.g. `"Dubai · Agentic AI"` |
| `headline`, `headlineAccent` | H1 in two parts; the accent renders in red |
| `intro` | 2–3 sentences that directly answer what the page is about |
| `answerTitle`, `answerAccent`, `answer` | The direct answer section. `answer` is 2 paragraphs and must link to at least 2 other DevMate pages. |
| `rule` | One sentence on how we do it |
| `sections` | 2–3 sections, each with 3–6 cards (`icon` or `stage`, `title`, `desc`, optional `fix`, `href`, `linkLabel`) |
| `sources` | **Required for news.** List of `{ href, label }`, where each label includes the publisher and date. |
| `related` | 4–6 internal links |
| `faqs` | 6–8 questions with full-sentence answers. These feed the FAQ schema. |
| `cta` | `{ title, sub }` |

The layout adds Article, FAQPage and BreadcrumbList schema automatically.

### Step 2: Add it to the blog list
Add an entry at the **top** of the array in `src/data/blog-posts.js`:

```js
{
  href: "/<slug>",
  title: "<same as title prop>",
  excerpt: "<one or two sentences, no more than 220 characters>",
  category: "<one of BLOG_CATEGORIES>",
  date: "YYYY-MM-DD",
},
```

The `category` must exactly match a name in `BLOG_CATEGORIES` in the same file. To add a new industry category:
1. Add it to `BLOG_CATEGORIES`.
2. Add an icon to `CATEGORY_ICONS` in `src/components/blog-pages/blog-card.jsx`.

### Step 3: Add it to the sitemap
Add a `<url>` block before `</urlset>` in `public/sitemap.xml`:
- `<loc>`: the full URL
- `<lastmod>`: today
- `<changefreq>`: `weekly`
- `<priority>`: `0.90`, or `0.95` for service pillars

Also update `<lastmod>` on the `/blog` entry.

### Step 4: Cross-link
Add a link to the new article from 1–2 related existing pages, such as a pillar page's `related` list or an older article's "Related reading" line.

Pillar pages:
- `/ai-agency-dubai`
- `/ai-call-assistant-dubai`
- `/agentic-ai-dubai`
- `/ai-automation-dubai`
- `/ai-news-dubai`
- `/ai-hospitality-dubai`
- `/ai-agent-dubai-real-estate`

### Step 5: Update `llms.txt` (pillars only)
If the article is a new service, industry or pillar page, add one line to the matching section of `public/llms.txt`.

### Step 6: Verify
Run `npx next build`. It must finish with "Compiled successfully" and list the new route. Also check that:
- `public/sitemap.xml` parses as XML and has no duplicate `<loc>`.
- Every `href` in `blog-posts.js` is unique and has a matching file in `src/pages`.

### Step 7: Open a pull request
1. Branch: `seo/daily-YYYY-MM-DD`.
2. In the PR description, list what changed and the checks you ran.
3. Do not merge without Zain's approval.

## 6. Writing rules (always)

- **Voice.** "We" and "us" for DevMate. Never "I".
- **Prices.** Never state a price or price range. Pricing questions get: "Contact our sales team for pricing", plus why it depends.
- **Facts.** Never invent statistics, client names, results or quotes.
  - Every number must come from a linked source.
  - News items need the publisher and date.
- **Languages.** Mention Arabic and English where it is relevant to the service.
- **Compliance.** For calls and messaging, mention consent, opt-out and UAE PDPL principles where relevant. For Dubai real estate, add DNCR and RERA.
- **Product claims.** Make no promises about SIXTY timings or setup days beyond what the SIXTY site states.
- **Style.** Plain English, short sentences, one idea per paragraph.
- **Every article must:**
  - answer the main question in its first section,
  - contain at least 3 internal links,
  - end with a demo call to action.

## 7. SEO and AI-search checklist

Search engines and AI assistants quote pages that answer clearly. Every article needs all of these:

- [ ] Main keyword with "Dubai" or "UAE" in the slug, title, H1 or intro, and description
- [ ] A direct, quotable answer in the first section, in 2–3 sentences, that defines the topic
- [ ] Clear entity names: DevMate Solutions, Dubai, UAE, plus the service names exactly as people search them
- [ ] 6–8 FAQs phrased the way people ask ChatGPT or Google
- [ ] Sources with dates for any news or statistic
- [ ] At least 3 internal links, including one pillar page
- [ ] A unique title and description, not reused from another page
- [ ] The page builds and appears in the sitemap and the blog list

## 8. Files reference

| File | Purpose |
|---|---|
| `src/components/articles/ArticleLayout.jsx` | Shared article layout and schema |
| `src/pages/<slug>.jsx` | One file per article |
| `src/data/blog-posts.js` | Blog list, categories and order. Newest first. |
| `src/components/blog-pages/blog-card.jsx` | Category icons |
| `src/components/blog-pages/blog/blog-area.jsx` | `/blog` hub copy and the "start here" pillar links |
| `public/sitemap.xml` | Sitemap |
| `public/llms.txt` | Summary of the site for AI assistants |
| `src/common/seo.jsx` | Site-wide meta tags and organisation schema |
