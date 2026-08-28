import React, { useState } from "react";
import FormModal from "../../FormModal";

const CtaArea = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && (
        <FormModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title="Get Instant Call"
          subtitle="Fill in your details — receive a call from DevMate Solutions within 60 seconds"
          triggerCall={true}
        />
      )}

      <style dangerouslySetInnerHTML={{
        __html: `
        .dm-cta-box {
          background-color: #ffffff;
          background-image: url(/assets/img/cta/da-pattern2.png);
          background-position: left 20px center;
          background-repeat: no-repeat;
          background-size: 110px auto;
          border: 1px solid #f0f0f0;
          border-radius: 16px;
          padding: 36px 40px;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.04), 0 2px 8px rgba(189, 33, 32, 0.04);
          position: relative;
        }

        .dm-cta-text {
          padding-left: 110px;
        }

        @media (max-width: 991px) {
          .dm-cta-box {
            background-size: 80px auto;
            background-position: left 15px top 30px;
            padding: 30px 24px;
          }
          .dm-cta-text {
            padding-left: 80px;
          }
        }

        @media (max-width: 640px) {
          .dm-cta-box {
            background-image: none;
            padding: 24px 20px;
          }
          .dm-cta-text {
            padding-left: 0;
          }
        }
      ` }} />

      <div
        className="da-cta-section wow tpfadeUp py-4"
        data-wow-delay=".3s"
      >
        <div className="container">
          <div className="dm-cta-box">
            <div className="row align-items-center">
              <div className="col-lg-8 col-12">
                <div className="dm-cta-text">
                  <h4 style={{ fontSize: "clamp(20px, 2.4vw, 26px)", fontWeight: 800, color: "#111827", margin: 0, lineHeight: 1.35 }}>
                    Want to <b className="text-red-700">Scale Your Business</b> with AI? <b className="text-red-700"></b>
                  </h4>
                </div>
              </div>

              <div className="col-lg-4 col-12 text-lg-end mt-4 mt-lg-0">
                <div className="da-cta-wraper">
                  <button
                    onClick={() => setShowModal(true)}
                    className="tp-grd-btn"
                  >
                    CheckMate Now
                    <span className="ml-10">
                      <i className="fal fa-long-arrow-right"></i>
                      <i className="fal fa-long-arrow-right"></i>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CtaArea;

