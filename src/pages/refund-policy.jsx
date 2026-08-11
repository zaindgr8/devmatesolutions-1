import React from "react";
import SEO from "../common/seo";
import HeaderThree from "../layout/headers/header-3";
import FooterThree from "../layout/footers/footer-3";
import BreadcrumbArea from "../common/breadcrumb-area";

const UPDATED = "August 11, 2025";
const COMPANY = "TechMate Solutions FZ LLC";
const TRADING = "DevMate Solutions";
const ADDRESS = "Business Bay, Dubai, UAE";
const EMAIL = "contact@devmatesolutions.com";

export default function RefundPolicyPage() {
  return (
    <>
      <SEO
        pageTitle="Refund Policy — DevMate Solutions"
        description={`Refund and cancellation policy for ${TRADING}. Understand how we handle refunds for strategy sessions, SEO retainers, and web development projects.`}
      />
      <HeaderThree />
      <BreadcrumbArea acive_menu="Refund Policy" title="Refund Policy" />

      <div className="tp-job-details pt-120 pb-60">
        <div className="container">
          <div className="tp-privacy-policy-box">
            <div className="tp-inner-page-hero mb-60 pb-20 tp-border-bottom">
              <span><b>Last updated: </b>{UPDATED}</span><br />
              <span style={{ fontSize: "14px", color: "#666" }}>
                {COMPANY} trading as {TRADING} · {ADDRESS} · <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </span>
            </div>

            <div className="row justify-content-center">
              <div className="col-lg-12">
                <div className="tp-inner-pt-section">

                  <h4 className="tp-inner-pt-section__title mb-30">Overview</h4>
                  <p className="mb-40">
                    We want every engagement with {TRADING} to deliver real value. This policy explains
                    your rights to a refund or credit for each service type we offer. If you have any
                    questions, please contact us at <a href={`mailto:${EMAIL}`}>{EMAIL}</a> before
                    making a purchase.
                  </p>

                  <h4 className="tp-inner-pt-section__title mb-30">1. Strategy Sessions (1:1 with Zain Ul Abideen — $299)</h4>
                  <p className="mb-20">
                    <strong>Full refund:</strong> You may cancel and receive a full refund up to{" "}
                    <strong>48 hours before the scheduled session</strong>. To cancel, email{" "}
                    <a href={`mailto:${EMAIL}`}>{EMAIL}</a> with your order ID.
                  </p>
                  <p className="mb-20">
                    <strong>No refund:</strong> Cancellations made less than 48 hours before the session,
                    or no-shows, are non-refundable. If we need to reschedule due to our availability,
                    you will receive a full credit toward a future session.
                  </p>
                  <p className="mb-40">
                    <strong>Reschedule:</strong> You may reschedule once at no charge if done more than
                    24 hours before the session. A second reschedule incurs a $50 administrative fee.
                  </p>

                  <h4 className="tp-inner-pt-section__title mb-30">2. Retainer Deposits (SEO — $750 / Web Development — $1,500)</h4>
                  <p className="mb-20">
                    Deposits secure your project slot and cover initial research, planning, and setup.
                  </p>
                  <ul style={{ marginBottom: "24px", paddingLeft: "24px" }}>
                    <li style={{ marginBottom: "10px" }}>
                      <strong>Within 7 days of payment, before work begins:</strong> 50% refund of the deposit.
                    </li>
                    <li style={{ marginBottom: "10px" }}>
                      <strong>After work has commenced:</strong> No refund of the deposit. Any deliverables
                      completed to date remain yours.
                    </li>
                    <li style={{ marginBottom: "10px" }}>
                      <strong>Project cancelled by {TRADING}:</strong> Full refund of the deposit within 5 business days.
                    </li>
                  </ul>
                  <p className="mb-40">
                    Ongoing monthly retainer fees are billed in advance and are non-refundable once the
                    billing period has started. You may cancel future billing with 30 days written notice.
                  </p>

                  <h4 className="tp-inner-pt-section__title mb-30">3. Custom Invoice Payments</h4>
                  <p className="mb-40">
                    Payments made against custom invoices are governed by the terms stated on that invoice.
                    Where no specific terms are stated, the general policy below applies. If work has not
                    yet begun, a full refund may be issued within 5 business days of the request.
                  </p>

                  <h4 className="tp-inner-pt-section__title mb-30">4. Crypto Payments</h4>
                  <p className="mb-40">
                    All crypto payments are processed by NOWPayments. Refunds for crypto transactions are
                    issued in the <strong>equivalent USD value</strong> at the time of payment, transferred
                    back to the original wallet address where technically possible. Crypto refunds may take
                    up to 10 business days due to blockchain settlement times. We do not compensate for
                    cryptocurrency price fluctuations between the time of payment and the time of refund.
                  </p>

                  <h4 className="tp-inner-pt-section__title mb-30">5. How to Request a Refund</h4>
                  <p className="mb-20">To request a refund:</p>
                  <ol style={{ marginBottom: "40px", paddingLeft: "24px" }}>
                    <li style={{ marginBottom: "10px" }}>Email <a href={`mailto:${EMAIL}`}>{EMAIL}</a> with subject line: <em>"Refund Request — [Your Order ID]"</em>.</li>
                    <li style={{ marginBottom: "10px" }}>Include your name, the service purchased, the order ID, and the reason for the request.</li>
                    <li style={{ marginBottom: "10px" }}>We will acknowledge your request within 2 business days and process eligible refunds within 5 business days of approval.</li>
                  </ol>

                  <h4 className="tp-inner-pt-section__title mb-30">6. Chargebacks</h4>
                  <p className="mb-40">
                    We encourage you to contact us directly before initiating a chargeback. Initiating a
                    chargeback without first contacting us may result in suspension of your account and
                    referral to our legal team. We will always work with you to find a fair resolution.
                  </p>

                  <h4 className="tp-inner-pt-section__title mb-30">7. Changes to This Policy</h4>
                  <p className="mb-40">
                    We may update this Refund Policy from time to time. The date at the top of this page
                    reflects the most recent revision. Continued use of our services after changes
                    constitutes acceptance of the updated policy.
                  </p>

                  <div style={{
                    background: "#f8f8f8",
                    border: "1px solid #e0e0e0",
                    borderRadius: "12px",
                    padding: "24px",
                    marginTop: "40px",
                  }}>
                    <p style={{ margin: 0, fontSize: "14px", color: "#555" }}>
                      <strong>{COMPANY}</strong> (trading as {TRADING})<br />
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

      <FooterThree />
    </>
  );
}
