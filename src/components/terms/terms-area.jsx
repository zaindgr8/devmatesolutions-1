import React from 'react';

const UPDATED = "August 11, 2026";
const COMPANY = "TechMate Solutions FZ LLC";
const TRADING = "DevMate Solutions";
const ADDRESS = "Business Bay, Dubai, UAE";
const EMAIL = "contact@devmatesolutions.com";
const SITE = "devmatesolutions.com";

const TermsArea = () => {
  return (
    <>
      <div className="tp-job-details pt-120 pb-60">
        <div className="container">
          <div className="tp-privacy-policy-box">
            <div className="tp-inner-page-hero mb-60 pb-20 tp-border-bottom">
              <h1 style={{ fontSize: "2.25rem", fontWeight: 700, marginBottom: "8px" }}>Terms of Service</h1>
              <span><b>Last updated:</b> {UPDATED}</span><br />
              <span style={{ fontSize: "14px", color: "#666" }}>
                {COMPANY} trading as {TRADING} · {ADDRESS} · <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </span>
            </div>

            <div className="row justify-content-center">
              <div className="col-lg-12">
                <div className="tp-inner-pt-section">

                  <p className="mb-40" style={{ fontSize: "1.05rem", lineHeight: "1.7" }}>
                    These Terms of Service ("Terms") set out the legally binding terms and conditions governing your
                    access to and use of the website located at{" "}
                    <a href={`https://${SITE}`}>https://{SITE}</a> and all software development, web applications, custom digital solutions, consulting, and payment services offered by{" "}
                    <strong>{COMPANY}</strong> (trading as <strong>{TRADING}</strong>, "we", "us", or "our").
                    By accessing our site, placing an order, paying an invoice, or utilizing any of our digital services,
                    you acknowledge that you have read, understood, and agreed to be bound by these Terms.
                  </p>

                  {[
                    {
                      id: "01",
                      title: "Eligibility & Agreement",
                      text: (
                        <>
                          By accessing our website or purchasing our services, you confirm that you are at least 18 years of age (or the legal age of majority in your jurisdiction) and possess full legal capacity and authority to enter into a binding contract on behalf of yourself or the entity you represent.
                        </>
                      ),
                    },
                    {
                      id: "02",
                      title: "Scope of Services",
                      text: (
                        <>
                          {TRADING} provides custom digital and technology services including custom web development, mobile application engineering, UI/UX interface design, search engine optimisation (SEO), AI automation, and technical consultancy. Specific project scope, milestones, deliverables, and fees are defined in individual statements of work, formal invoices, or service proposals issued to clients.
                        </>
                      ),
                    },
                    {
                      id: "03",
                      title: "Payments, Invoices & Processing",
                      text: (
                        <>
                          All price quotes and invoices are denominated in United States Dollars (USD) unless explicitly stated otherwise. We accept payments via credit/debit card, bank transfer, and cryptocurrency. Payments are processed through third-party payment gateways including <strong>MoonPay</strong> and <strong>NOWPayments</strong>. Invoices are due upon receipt or according to agreed project milestone schedules. You are responsible for any applicable bank transfer fees, network gas fees, or local tax liabilities.
                        </>
                      ),
                    },
                    {
                      id: "04",
                      title: "Identity Verification & AML Compliance",
                      text: (
                        <>
                          To satisfy international regulatory compliance, Anti-Money Laundering (AML) standards, and fraud protection guidelines, our integrated payment processors (including MoonPay) may require clients and users to complete Know-Your-Customer (KYC) identity verification procedures. You agree to provide accurate, complete, and truthful verification information when requested. We reserve the right to refuse service or pause transactions that fail verification or trigger risk alerts.
                        </>
                      ),
                    },
                    {
                      id: "05",
                      title: "Prohibited & Restricted Activities",
                      text: (
                        <>
                          You agree not to use our website or services for any unlawful, illegal, fraudulent, or malicious purpose. Prohibited activities include attempting to breach site security, uploading malicious software, engaging in unauthorized web scraping, violating intellectual property rights, or conducting financial transactions involving illegal proceeds, sanctioned entities, or unauthorized gambling.
                        </>
                      ),
                    },
                    {
                      id: "06",
                      title: "Intellectual Property Rights",
                      text: (
                        <>
                          Upon receipt of full and final payment for custom deliverables, all agreed custom source code, assets, and design deliverables produced specifically for you become your property. {COMPANY} retains full ownership of pre-existing core libraries, frameworks, developer tools, and proprietary methodologies used in creating the deliverables. We reserve the right to showcase completed non-confidential project visuals within our marketing portfolio unless explicitly restricted in writing.
                        </>
                      ),
                    },
                    {
                      id: "07",
                      title: "Confidentiality & Data Protection",
                      text: (
                        <>
                          Both parties agree to treat non-public, proprietary information shared during an engagement as strictly confidential. Confidential information shall not be disclosed to third parties without prior written consent, except to employees, subcontractors, or legal advisors bound by similar confidentiality obligations. Data processing is conducted in compliance with our <a href="/privacy-policy">Privacy Policy</a>.
                        </>
                      ),
                    },
                    {
                      id: "08",
                      title: "Refunds & Cancellations",
                      text: (
                        <>
                          All requests for refunds, service cancellations, or billing adjustments are governed by our dedicated <a href="/refund-policy">Refund Policy</a>, which forms an integral part of these Terms.
                        </>
                      ),
                    },
                    {
                      id: "09",
                      title: "Disclaimers & Limitation of Liability",
                      text: (
                        <>
                          Our site and services are provided on an "AS IS" and "AS AVAILABLE" basis. To the maximum extent permitted by applicable law, {COMPANY} explicitly disclaims all warranties of any kind, whether express or implied. In no event shall {COMPANY}, its directors, or employees be liable for any indirect, consequential, punitive, or incidental damages, loss of revenue, or loss of data. Our total liability for any claim shall not exceed the total fees paid by you to us in the three (3) months preceding the incident.
                        </>
                      ),
                    },
                    {
                      id: "10",
                      title: "Indemnification",
                      text: (
                        <>
                          You agree to indemnify, defend, and hold harmless {COMPANY}, its officers, directors, and agents from and against any third-party claims, damages, liabilities, costs, or legal expenses arising out of your breach of these Terms, your improper use of our services, or your violation of applicable laws.
                        </>
                      ),
                    },
                    {
                      id: "11",
                      title: "Governing Law & Dispute Resolution",
                      text: (
                        <>
                          These Terms are governed by and construed in accordance with the federal laws of the United Arab Emirates and the laws of the Emirate of Dubai. Any dispute, legal action, or claim arising from these Terms or our services shall be submitted to the exclusive jurisdiction of the competent courts in Dubai, UAE.
                        </>
                      ),
                    },
                    {
                      id: "12",
                      title: "Severability & Modifications",
                      text: (
                        <>
                          If any provision of these Terms is deemed invalid or unenforceable by a court of competent jurisdiction, such provision shall be enforced to the maximum extent permissible, and the remaining provisions shall remain in full force and effect. We reserve the right to modify these Terms at any time, with updates posted directly on this page.
                        </>
                      ),
                    },
                    {
                      id: "13",
                      title: "Contact Information",
                      text: (
                        <>
                          If you have any questions or legal inquiries regarding these Terms of Service, please contact us by email at{" "}
                          <a href={`mailto:${EMAIL}`}>{EMAIL}</a> or by mail at {COMPANY}, {ADDRESS}.
                        </>
                      ),
                    },
                  ].map((item) => (
                    <div key={item.id} className="trem-box wow tpfadeUp mb-40">
                      <div className="row">
                        <div className="col-lg-1">
                          <div className="trems-step">
                            <span>{item.id}</span>
                          </div>
                        </div>
                        <div className="col-lg-11">
                          <h5 style={{ marginBottom: "10px", fontWeight: 600, fontSize: "1.15rem" }}>{item.title}</h5>
                          <p style={{ lineHeight: "1.7" }}>{item.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsArea;