import React from 'react';

const UPDATED = "August 11, 2025";
const COMPANY = "TechMate Solutions FZ LLC";
const TRADING = "DevMate Solutions";
const ADDRESS = "Business Bay, Dubai, UAE";
const EMAIL = "contact@devmatesolutions.com";

const PrivacyPolicyArea = () => {
  return (
    <>
      <div className="tp-job-details pt-120 pb-60 wow tpfadeUp">
        <div className="container">
          <div className="tp-privacy-policy-box">
            <div className="tp-inner-page-hero mb-60 pb-20 tp-border-bottom">
              <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "8px" }}>Privacy Policy</h1>
              <span><b>Last updated:</b> {UPDATED}</span><br />
              <span style={{ fontSize: "14px", color: "#666" }}>
                {COMPANY} trading as {TRADING} · {ADDRESS} · <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </span>
            </div>

            <div className="row justify-content-center">
              <div className="col-lg-12">
                <div className="tp-inner-pt-section">

                  <h4 className="tp-inner-pt-section__title mb-30">Overview</h4>
                  <p className="mb-40">
                    {COMPANY} (trading as {TRADING}, "we", "us", "our") is committed to protecting your
                    personal data. This Privacy Policy explains what information we collect, how we use
                    it, and your rights in relation to it. It applies to all visitors of{" "}
                    <a href="https://devmatesolutions.com">devmatesolutions.com</a> and clients of our
                    services.
                  </p>

                  <h4 className="tp-inner-pt-section__title mb-30">Information We Collect</h4>
                  <p className="mb-20">We may collect the following categories of personal information:</p>
                  <div className="tp-inner-pg-list mb-40">
                    <ul>
                      <li><strong>Contact data:</strong> name, email address, phone number, and company name provided via our contact forms or booking system.</li>
                      <li><strong>Payment data:</strong> order IDs and transaction references (we do not store card numbers or crypto wallet keys).</li>
                      <li><strong>Usage data:</strong> IP address, browser type, pages visited, and referring URLs, collected automatically via server logs and analytics.</li>
                      <li><strong>Communications:</strong> emails, messages, and notes exchanged during a client engagement.</li>
                    </ul>
                  </div>

                  <h4 className="tp-inner-pt-section__title mb-30">How We Use Your Information</h4>
                  <div className="tp-inner-pg-list mb-40">
                    <ul>
                      <li>To deliver and manage services you have purchased.</li>
                      <li>To process payments and send receipts.</li>
                      <li>To respond to enquiries and provide customer support.</li>
                      <li>To send occasional service updates or marketing emails (you may opt out at any time).</li>
                      <li>To comply with legal obligations under UAE law and applicable international regulations.</li>
                      <li>To improve our website and services through anonymised analytics.</li>
                    </ul>
                  </div>

                  <h4 className="tp-inner-pt-section__title mb-30">Legal Basis for Processing</h4>
                  <p className="mb-40">
                    We process your personal data based on: (a) contract performance — to deliver the
                    services you have engaged us for; (b) legitimate interests — to operate and improve
                    our business; (c) legal obligation — to comply with applicable laws; and (d) consent —
                    where you have explicitly agreed to specific processing (e.g., marketing emails).
                  </p>

                  <h4 className="tp-inner-pt-section__title mb-30">Sharing Your Information</h4>
                  <p className="mb-20">We share your data only with:</p>
                  <div className="tp-inner-pg-list mb-40">
                    <ul>
                      <li><strong>NOWPayments</strong> — our crypto payment processor, who handles transaction data per their own privacy policy.</li>
                      <li><strong>Resend</strong> — our transactional email provider, who processes your email address to deliver receipts and notifications.</li>
                      <li><strong>Google Analytics</strong> — anonymised usage data for website analytics.</li>
                      <li>Professional advisors (legal, accounting) under strict confidentiality agreements.</li>
                      <li>Law enforcement or regulatory authorities, where required by law.</li>
                    </ul>
                  </div>
                  <p className="mb-40">We do not sell your personal data to third parties.</p>

                  <h4 className="tp-inner-pt-section__title mb-30">Data Retention</h4>
                  <p className="mb-40">
                    We retain client data for as long as necessary to fulfil the purposes described in
                    this policy and to comply with legal obligations (typically 7 years for financial
                    records under UAE commercial law). Usage data is anonymised or deleted after 26 months.
                  </p>

                  <h4 className="tp-inner-pt-section__title mb-30">Your Rights</h4>
                  <p className="mb-20">Depending on your jurisdiction, you may have the right to:</p>
                  <div className="tp-inner-pg-list mb-40">
                    <ul>
                      <li>Access the personal data we hold about you.</li>
                      <li>Request correction of inaccurate data.</li>
                      <li>Request deletion of your data (subject to our legal retention obligations).</li>
                      <li>Object to or restrict certain processing.</li>
                      <li>Data portability (where applicable).</li>
                      <li>Withdraw consent for marketing communications at any time.</li>
                    </ul>
                  </div>
                  <p className="mb-40">
                    To exercise any of these rights, contact us at{" "}
                    <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
                  </p>

                  <h4 className="tp-inner-pt-section__title mb-30">Cookies</h4>
                  <p className="mb-40">
                    Our website uses essential cookies to function correctly and analytical cookies
                    (via Google Analytics) to understand usage patterns. You can control cookies via
                    your browser settings. Disabling cookies may affect site functionality.
                  </p>

                  <h4 className="tp-inner-pt-section__title mb-30">Security</h4>
                  <p className="mb-40">
                    We implement industry-standard security measures including HTTPS encryption,
                    access controls, and regular security reviews. However, no internet transmission
                    is 100% secure and we cannot guarantee absolute security.
                  </p>

                  <h4 className="tp-inner-pt-section__title mb-30">Changes to This Policy</h4>
                  <p className="mb-40">
                    We may update this Privacy Policy from time to time. The date at the top reflects
                    the most recent revision. Continued use of our services after changes constitutes
                    acceptance of the updated policy.
                  </p>

                  <div style={{
                    background: "#f8f8f8",
                    border: "1px solid #e0e0e0",
                    borderRadius: "12px",
                    padding: "24px",
                    marginTop: "40px",
                  }}>
                    <p style={{ margin: 0, fontSize: "14px", color: "#555" }}>
                      <strong>Data Controller:</strong><br />
                      {COMPANY} (trading as {TRADING})<br />
                      {ADDRESS}<br />
                      <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
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