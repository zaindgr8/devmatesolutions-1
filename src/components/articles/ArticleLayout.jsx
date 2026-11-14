"use client";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import SEO from "@/src/common/seo";
import FooterThree from "@/src/layout/footers/footer-3";
import HeaderThree from "@/src/layout/headers/header-3";
import Wrapper from "@/src/layout/wrapper";

const BASE_URL = "https://devmatesolutions.com";
const BOOK_URL = "https://cal.com/devmate/sixty-onboarding";

// Shared layout for the long-form AI service and news articles. Each page passes its content as
// data; this renders the same sections, FAQ and Article/FAQ/Breadcrumb schema the other guides use.
const ArticleLayout = ({
  slug,
  title,
  description,
  datePublished,
  badge,
  headline,
  headlineAccent,
  intro,
  answerTitle,
  answerAccent,
  answer,
  rule,
  sections,
  sources,
  related,
  faqs,
  cta,
}) => {
  const [openFaq, setOpenFaq] = useState(0);
  const url = `${BASE_URL}${slug}`;

  useEffect(() => {
    const els = document.querySelectorAll(".chatbot-reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("chatbot-reveal--visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("chatbot-reveal--visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title,
      description,
      author: { "@type": "Organization", name: "DevMate Solutions", url: BASE_URL },
      publisher: { "@type": "Organization", name: "DevMate Solutions", url: BASE_URL },
      datePublished,
      dateModified: datePublished,
      mainEntityOfPage: url,
      about: { "@type": "Place", name: "Dubai, United Arab Emirates" },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE_URL}/blog` },
        { "@type": "ListItem", position: 3, name: title, item: url },
      ],
    },
  ];

  return (
    <>
      <SEO pageTitle={title} pageDescription={description} pageUrl={slug} />
      <Head>
        {schemas.map((s, i) => (
          <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
        ))}
        <style>{`
          .chatbot-reveal { opacity: 0; transform: translateY(18px); transition: opacity .6s ease, transform .6s ease; }
          .chatbot-reveal--visible { opacity: 1; transform: translateY(0); }
          .chatbot-grid-two { display: grid; grid-template-columns: 1.1fr .9fr; gap: 40px; align-items: center; }
          @media (max-width: 768px) { .chatbot-grid-two { grid-template-columns: 1fr; } }
          .speed-answer { background: #fef2f2; border: 1px solid #fecaca; border-left: 4px solid #bd2120; border-radius: 16px; padding: 24px 28px; }
          .speed-answer p { font-size: 18px; line-height: 1.7; color: #1f2937; margin: 0; }
          .article-body p { font-size: 17px; line-height: 1.7; color: #4b5563; }
          .article-sources { max-width: 760px; margin: 0 auto; padding-left: 20px; }
          .article-sources li { margin-bottom: 8px; font-size: 15px; line-height: 1.6; color: #4b5563; }
        `}</style>
      </Head>
      <Wrapper>
        <HeaderThree />
        <main className="ailm-page">
          <section className="ailm-hero">
            <div className="container">
              <div className="ailm-hero-header-wrap">
                <div className="ailm-hero-badge"><span className="ailm-hero-dot"></span>{badge}</div>
                <h1 className="ailm-hero-headline">
                  {headline} <span className="ailm-red">{headlineAccent}</span>
                </h1>
                <p className="ailm-hero-sub">{intro}</p>
                <div className="ailm-hero-ctas">
                  <a className="ailm-btn-primary" href={BOOK_URL}>Book a demo <i className="fal fa-long-arrow-right ml-2"></i></a>
                  <Link className="ailm-btn-ghost" href="/blog">More AI guides</Link>
                </div>
              </div>
            </div>
          </section>

          <section className="ailm-section ailm-section--light" id="answer">
            <div className="container">
              <div className="chatbot-grid-two">
                <div className="chatbot-reveal article-body">
                  <p className="ailm-eyebrow">The short answer</p>
                  <h2 className="ailm-section-title">{answerTitle} <span className="ailm-red">{answerAccent}</span></h2>
                  {answer}
                </div>
                <div className="chatbot-reveal">
                  <div className="speed-answer"><p>{rule}</p></div>
                </div>
              </div>
            </div>
          </section>

          {sections.map((section, s) => (
            <section className={`ailm-section${s % 2 ? " ailm-section--light" : ""}`} key={section.title}>
              <div className="container">
                <div className="ailm-section-header chatbot-reveal">
                  <p className="ailm-eyebrow">{section.eyebrow}</p>
                  <h2 className="ailm-section-title">{section.title}</h2>
                  {section.sub && <p className="ailm-section-sub">{section.sub}</p>}
                </div>
                <div className="ailm-leak-grid">
                  {section.cards.map((c) => (
                    <div className="ailm-leak-card chatbot-reveal" key={c.title}>
                      {c.icon && <i className={`${c.icon} ailm-agent-icon`}></i>}
                      {c.stage && <p className="ailm-leak-stage">{c.stage}</p>}
                      <h3 className="ailm-leak-title">{c.title}</h3>
                      <p className="ailm-leak-desc">{c.desc}</p>
                      {c.fix && <p className="ailm-leak-fix">{c.fix}</p>}
                      {c.href && (
                        <p className="ailm-leak-desc">
                          <Link href={c.href}>{c.linkLabel || "Read the guide"} →</Link>
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ))}

          {sources && (
            <section className="ailm-section">
              <div className="container">
                <div className="ailm-section-header chatbot-reveal">
                  <p className="ailm-eyebrow">Sources</p>
                  <h2 className="ailm-section-title">Where these facts come from</h2>
                </div>
                <ul className="article-sources">
                  {sources.map((src) => (
                    <li key={src.href}>
                      <a href={src.href} target="_blank" rel="noopener noreferrer">{src.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          <section className="ailm-section">
            <div className="container">
              <p style={{ textAlign: "center", fontSize: 16, lineHeight: 1.8, color: "#4b5563", maxWidth: 860, margin: "0 auto" }}>
                Related reading:{" "}
                {related.map((r, i) => (
                  <React.Fragment key={r.href}>
                    <Link href={r.href}>{r.label}</Link>
                    {i < related.length - 1 ? ", " : "."}
                  </React.Fragment>
                ))}
              </p>
            </div>
          </section>

          <section className="ailm-section ailm-section--light">
            <div className="container">
              <div className="ailm-section-header chatbot-reveal">
                <p className="ailm-eyebrow">Common Questions</p>
                <h2 className="ailm-section-title">Frequently Asked Questions</h2>
              </div>
              <div className="ailm-faqs">
                {faqs.map((faq, i) => (
                  <div className={`ailm-faq ${openFaq === i ? "ailm-faq--open" : ""}`} key={faq.q}>
                    <button className="ailm-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                      {faq.q}
                      <i className={`fal ${openFaq === i ? "fa-chevron-up" : "fa-chevron-down"}`}></i>
                    </button>
                    {openFaq === i && <div className="ailm-faq-a">{faq.a}</div>}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="ailm-final-cta">
            <div className="container">
              <div className="ailm-final-cta-inner">
                <p className="ailm-eyebrow ailm-eyebrow--light">Next Step</p>
                <h2 className="ailm-final-cta-title">{cta.title}</h2>
                <p className="ailm-final-cta-sub">{cta.sub}</p>
                <div className="ailm-final-cta-btns">
                  <a className="ailm-btn-primary ailm-btn-white" href={BOOK_URL}>
                    Book a demo <i className="fal fa-long-arrow-right ml-2"></i>
                  </a>
                  <Link className="ailm-btn-ghost ailm-btn-ghost--light" href="/callagents">
                    Try a live voice demo
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

export default ArticleLayout;
