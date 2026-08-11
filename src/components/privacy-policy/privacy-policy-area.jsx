import React from 'react';

const UPDATED = "August 11, 2026";
const COMPANY = "TechMate Solutions FZ LLC";
const TRADING = "DevMate Solutions";
const ADDRESS = "Business Bay, Dubai, UAE";
const EMAIL = "contact@devmatesolutions.com";
const SITE = "devmatesolutions.com";

const PrivacyPolicyArea = () => {
  return (
    <>
      <div className="tp-job-details pt-120 pb-60 wow tpfadeUp">
        <div className="container">
          <div className="tp-privacy-policy-box">
            <div className="tp-inner-page-hero mb-60 pb-20 tp-border-bottom">
              <h1 style={{ fontSize: "2.25rem", fontWeight: 700, marginBottom: "8px" }}>Privacy Policy</h1>
              <span><b>Last updated:</b> {UPDATED}</span><br />
              <span style={{ fontSize: "14px", color: "#666" }}>
                {COMPANY} trading as {TRADING} · {ADDRESS} · <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </span>
            </div>

            <div className="row justify-content-center">
              <div className="col-lg-12">
                <div className="tp-inner-pt-section">

                  <h4 className="tp-inner-pt-section__title mb-20">1. Overview &amp; Data Controller</h4>
                  <p className="mb-40">
                    {COMPANY} (trading as {TRADING}, "we", "us", "our") operates the website{" "}
                    <a href={`https://${SITE}`}>https://{SITE}</a> and acts as the Data Controller for personal
                    data collected in connection with our web development, custom software engineering, UI/UX design,
                    AI automation, and digital consultation services. We are committed to processing your personal data
                    transparently, securely, and in compliance with applicable data protection legislation, including
                    UAE Federal Decree-Law No. 45 of 2021 on Personal Data Protection (PDPL) and international regulatory framework standards.
                  </p>

                  <h4 className="tp-inner-pt-section__title mb-20">2. Information We Collect</h4>
                  <p className="mb-20">We collect information to deliver our services, process payments, verify client identities, and enhance website security. The information we collect includes:</p>
                  <div className="tp-inner-pg-list mb-40">
                    <ul>
                      <li>
                        <strong>Identity &amp; Contact Data:</strong> Full name, business email address, phone number, physical address, company details, and job title when filling forms, requesting quotes, or scheduling meetings.
                      </li>
                      <li>
                        <strong>Billing &amp; Payment Data:</strong> Transaction references, invoice identifiers, billing addresses, cryptocurrency payment details (via processors such as NOWPayments and MoonPay), and fiat payment records. We do not store full credit card numbers or private cryptocurrency keys directly on our servers.
                      </li>
                      <li>
                        <strong>KYC &amp; Verification Data:</strong> Identity documentation, business registration details, and verification data collected directly or via authorised third-party payment gateways (e.g. MoonPay) to satisfy Anti-Money Laundering (AML) and Know-Your-Customer (KYC) regulatory compliance requirements.
                      </li>
                      <li>
                        <strong>Technical &amp; Usage Data:</strong> IP address, device type, browser specifications, operating system, geolocation data, referring URL, time zone, and interaction logs collected automatically via server logs and analytical cookies.
                      </li>
                      <li>
                        <strong>Communication Data:</strong> Records of correspondence, project briefs, client requirements, support tickets, and direct messages exchanged across email or live chat integrations.
                      </li>
                    </ul>
                  </div>

                  <h4 className="tp-inner-pt-section__title mb-20">3. Purpose and Legal Basis for Processing</h4>
                  <p className="mb-20">We process personal data based on the following legal grounds:</p>
                  <div className="tp-inner-pg-list mb-40">
                    <ul>
                      <li>
                        <strong>Contractual Performance:</strong> To fulfill contracts, process client orders, deliver custom software and consultancy deliverables, and handle client account management.
                      </li>
                      <li>
                        <strong>Legal &amp; Regulatory Obligations:</strong> To adhere to statutory accounting standards, anti-fraud regulations, sanction checks, and KYC/AML compliance required under UAE commercial and international payment processing regulations.
                      </li>
                      <li>
                        <strong>Legitimate Interests:</strong> To maintain system security, protect our legal rights, optimize platform performance, prevent fraudulent activity, and send business communications.
                      </li>
                      <li>
                        <strong>Consent:</strong> Where explicitly provided (e.g., opting into newsletter updates or accepting analytical cookies).
                      </li>
                    </ul>
                  </div>

                  <h4 className="tp-inner-pt-section__title mb-20">4. Third-Party Data Sharing &amp; Processors</h4>
                  <p className="mb-20">
                    We do not sell, rent, or trade your personal data. We only share personal data with trusted third-party service providers who process information on our behalf under legal data processing agreements:
                  </p>
                  <div className="tp-inner-pg-list mb-40">
                    <ul>
                      <li>
                        <strong>Payment &amp; On-Ramp Gateways:</strong> <em>MoonPay</em> and <em>NOWPayments</em> for processing credit/debit card, bank transfer, and cryptocurrency transactions, including required identity verification and AML screening.
                      </li>
                      <li>
                        <strong>Email &amp; Communication Providers:</strong> <em>Resend</em> and transactional email routing infrastructure for delivering receipts, updates, and service notices.
                      </li>
                      <li>
                        <strong>Analytics &amp; Infrastructure:</strong> Google Analytics for aggregate web usage analysis, alongside secure cloud hosting providers and web application firewall services.
                      </li>
                      <li>
                        <strong>Legal &amp; Regulatory Authorities:</strong> Competent government entities, law enforcement agencies, or auditors where required by subpoena, statute, or court order.
                      </li>
                    </ul>
                  </div>

                  <h4 className="tp-inner-pt-section__title mb-20">5. International Data Transfers</h4>
                  <p className="mb-40">
                    Because {TRADING} serves clients globally, personal data may be transferred to and processed in countries outside your jurisdiction. We implement appropriate cross-border safeguards, standard contractual clauses, and encryption standards to ensure your information receives an equivalent level of protection regardless of location.
                  </p>

                  <h4 className="tp-inner-pt-section__title mb-20">6. Data Retention Period</h4>
                  <p className="mb-40">
                    We retain personal data for as long as necessary to fulfill the purposes set out in this policy. Transactional, billing, and identity verification records are retained for a minimum of seven (7) years following the completion of an engagement to comply with UAE tax, commercial statutory obligations, and anti-financial crime audit standards. Non-personally identifiable technical logs are deleted or anonymised within 26 months.
                  </p>

                  <h4 className="tp-inner-pt-section__title mb-20">7. Your Data Subject Rights</h4>
                  <p className="mb-20">Depending on your country of residence, you hold rights under applicable privacy laws:</p>
                  <div className="tp-inner-pg-list mb-40">
                    <ul>
                      <li><strong>Right of Access:</strong> Request a copy of the personal data held about you.</li>
                      <li><strong>Right to Rectification:</strong> Request corrections to inaccurate or incomplete data.</li>
                      <li><strong>Right to Erasure ("Right to be Forgotten"):</strong> Request deletion of data where legal retention mandates do not apply.</li>
                      <li><strong>Right to Restriction &amp; Objection:</strong> Object to processing based on legitimate interest or restrict direct marketing.</li>
                      <li><strong>Data Portability:</strong> Obtain your data in a structured, machine-readable format.</li>
                      <li><strong>Right to Withdraw Consent:</strong> Revoke active consent at any time without affecting prior lawful processing.</li>
                    </ul>
                  </div>
                  <p className="mb-40">
                    To exercise any of these rights, please submit a written request to <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
                  </p>

                  <h4 className="tp-inner-pt-section__title mb-20">8. Security Controls</h4>
                  <p className="mb-40">
                    We enforce robust technical and organisational security measures—including TLS/SSL web encryption, strict access control policies, regular security audits, and encrypted database storage—to protect your personal information against unauthorised access, alteration, disclosure, or destruction.
                  </p>

                  <h4 className="tp-inner-pt-section__title mb-20">9. Cookies and Analytics</h4>
                  <p className="mb-40">
                    Our website utilizes essential session cookies required for core platform performance and analytical cookies to understand user interaction patterns. You can manage or disable cookies via your internet browser preferences; however, disabling essential cookies may impact specific platform features.
                  </p>

                  <h4 className="tp-inner-pt-section__title mb-20">10. Updates to This Policy</h4>
                  <p className="mb-40">
                    We reserve the right to revise this Privacy Policy at any time. Any changes will be published on this page with an updated revision date. Continued interaction with our platform after amendments constitutes acceptance of the revised terms.
                  </p>

                  <div style={{
                    background: "#f8f9fa",
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                    padding: "28px",
                    marginTop: "40px",
                  }}>
                    <h5 style={{ fontWeight: 700, marginBottom: "12px", fontSize: "1.1rem" }}>Data Controller Contact</h5>
                    <p style={{ margin: 0, fontSize: "14px", color: "#4a5568", lineHeight: 1.6 }}>
                      <strong>{COMPANY}</strong> (trading as {TRADING})<br />
                      {ADDRESS}<br />
                      <strong>Email:</strong> <a href={`mailto:${EMAIL}`}>{EMAIL}</a><br />
                      <strong>Website:</strong> <a href={`https://${SITE}`} target="_blank" rel="noreferrer">https://{SITE}</a>
                    </p>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicyArea;