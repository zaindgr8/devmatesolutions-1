import React, { useState } from "react";
import FormModal from "../../FormModal";

const CtaArea = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && (
        <FormModal isOpen={showModal} onClose={() => setShowModal(false)} />
      )}
      <div
        className="da-cta-section d-none d-lg-block wow tpfadeUp py-2"
        data-wow-delay=".3s"
      >
        <div className="container">
          <div
            className="da-cta-area  pb-45"
            style={{ backgroundImage: `url(/assets/img/cta/da-pattern2.png)` }}
          >
            <div className="row">
              <div className="col-lg-8 col-12">
                <div className="da-cta-info ml-160">
                  <h4>Do You Want Us To Checkmate Your Software Challenges?</h4>
                  <p
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      lineHeight: "1.2",
          
                    }}
                    className="text-gray-600"
                  >
                    Get Call from FREYA our AI Assistant Now Within 60 Seconds!!
                  </p>
                </div>
              </div>
              <div className="col-xl-4 d-none d-lg-block">
                <div className="da-cta-wraper mr-60 text-end">
                  <button
                    onClick={() => setShowModal(true)}
                    className="tp-grd-btn"
                  >
                    Get Call Now
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
