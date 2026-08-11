import React from 'react';

const UPDATED = "August 11, 2025";
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
              <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "8px" }}>Terms of Service</h1>
              <span><b>Last updated:</b> {UPDATED}</span><br />
              <span style={{ fontSize: "14px", color: "#666" }}>
                {COMPANY} trading as {TRADING} · {ADDRESS} · <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </span>
            </div>

            <div className="row justify-content-center">
              <div className="col-lg-12">
                <div className="tp-inner-pt-section">

                  <p className="mb-40">
                    These Terms of Service ("Terms") govern your use of the website at{" "}
                    <a href={`https://${SITE}`}>{SITE}</a> and all services provided by{" "}
                    {COMPANY} (trading as {TRADING}, "we", "our", "us"). By accessing our
                    website or purchasing any service, you agree to these Terms in full.
                    If you do not agree, please do not use our services.
                  </p>

                  {[
                    {
                      id: "01",
                      title: "Services",
                      text: <>
                        {TRADING} provides digital services including but not limited to: business strategy
                        consulting, web development, search engine optimisation (SEO), UI/UX design,
                        and AI automation consulting. Specific deliverables, timelines, and fees are
                        agreed in writing prior to commencement of each engagement.
                      </>,
                    },
                    {
                      id: "02",
                      title: "Payment",
                      text: <>
                        All prices are quoted in USD unless otherwise stated. We accept payment via
                        cryptocurrency (processed by NOWPayments) and other methods as listed at checkout.
                        Invoices are due on receipt unless a payment schedule is agreed in writing.
                        Late payments may incur a 2% monthly interest charge. All fees are exclusive of
                        applicable taxes.
                      </>,
                    },
                    {
                      id: "03",
                      title: "Intellectual Property",
                      text: <>
                        Upon receipt of full payment, all custom deliverables produced for you become
                        your property. We retain the right to display the work in our portfolio unless
                        you request otherwise in writing. We retain ownership of any proprietary tools,
                        frameworks, or methodologies used to produce the deliverables.
                      </>,
                    },
                    {
                      id: "04",
                      title: "Confidentiality",
                      text: <>
                        Both parties agree to keep confidential any information disclosed during the
                        engagement that is designated as confidential or that reasonably should be
                        understood to be confidential. This obligation survives termination of the
                        engagement for a period of two (2) years.
                      </>,
                    },
                    {
                      id: "05",
                      title: "Limitation of Liability",
                      text: <>
                        To the maximum extent permitted by applicable law, {COMPANY}'s total liability
                        for any claim arising out of or relating to these Terms or our services shall not
                        exceed the total fees paid by you in the three (3) months preceding the claim.
                        We are not liable for indirect, incidental, or consequential damages, loss of
                        profit, or loss of data.
                      </>,
                    },
                    {
                      id: "06",
                      title: "Refunds",
                      text: <>
                        Refunds are governed by our{" "}
                        <a href="/refund-policy">Refund Policy</a>, which forms part of these Terms.
                      </>,
                    },
                    {
                      id: "07",
                      title: "Termination",
                      text: <>
                        Either party may terminate an ongoing engagement with 30 days written notice.
                        We reserve the right to suspend or terminate your access to our services
                        immediately for breach of these Terms, non-payment, or abusive conduct toward
                        our team.
                      </>,
                    },
                    {
                      id: "08",
                      title: "Governing Law",
                      text: <>
                        These Terms are governed by the laws of the United Arab Emirates. Any disputes
                        shall be subject to the exclusive jurisdiction of the courts of Dubai, UAE.
                      </>,
                    },
                    {
                      id: "09",
                      title: "Changes to These Terms",
                      text: <>
                        We may update these Terms from time to time. The updated date at the top of
                        this page reflects the most recent revision. Continued use of our services
                        after changes constitutes acceptance of the updated Terms.
                      </>,
                    },
                    {
                      id: "10",
                      title: "Contact",
                      text: <>
                        Questions about these Terms? Email us at{" "}
                        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.{" "}
                        {COMPANY}, {ADDRESS}.
                      </>,
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
                          <h5 style={{ marginBottom: "10px", fontWeight: 600 }}>{item.title}</h5>
                          <p>{item.text}</p>
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