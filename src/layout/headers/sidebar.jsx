import Link from 'next/link';
import React, { useState } from 'react';
import MobileMenus from './mobile-menus';
import FormModal from '@/src/components/FormModal';

const Sidebar = ({isActive, setIsActive}) => {
  const [showModal, setShowModal] = useState(false);

    return (
      <>
        <div className="tp-offcanvas-wrapper">
          <div className={`tp-offcanvas white-bg ${isActive ? "opened" : ""}`}>
            <div className="offc-top-pattern">
              <img src="/assets/img/hero/nav-parrten-top.png" alt="" />
            </div>
            <div className="tp-offcanvas__top tp-border-bottom pb-30 mb-30">
              <div
                className="tp-offcanvas-close"
                onClick={() => setIsActive(false)}
              >
                <span>
                  <i className="fal fa-times"></i>
                </span>
              </div>
              <div className="tp-offcanvas__logo mb-50">
                <Link href="/">
                  <img src="/assets/img/logo/logo-red.png" alt="sticky-logo" />
                </Link>
              </div>
              <p>
                {" "}
                Checkmate your Software and Digital Marketing goals with
                DEVMATE!
              </p>
              <div className="tp-offcanvas__social">
                <span>
                  {" "}
                  <a href="https://www.facebook.com/devmatesolutions">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </span>
                <span>
                  {" "}
                  <a href="https://www.instagram.com/devmatesolutions/">
                    <i className="fab fa-instagram"></i>
                  </a>
                </span>
                <span>
                  {" "}
                  <a href="https://www.linkedin.com/company/69294183">
                    <i className="fab fa-linkedin"></i>
                  </a>
                </span>
              </div>
            </div>

            {/* <div className="tp-offcanvas__widget mb-40 d-none d-xl-block">
              <h3 className="tp-footer__widget-title mb-35">Get In Touch</h3>
              <div className="tp-offcanvas-cta d-flex align-items-center tp-border-bottom pb-20  mb-30">
                <span className="icon mr-20">
                  <img src="/assets/img/icons/ofp-phone.png" alt="" />
                </span>
                <span>
                  <span className="d-block mb-0">Phone number</span>
                  <b>
                    <a href="callto:0002229090"> Call Us: 000-222-9090 </a>
                  </b>
                </span>
              </div>

              <div className="tp-offcanvas-cta d-flex align-items-center tp-border-bottom pb-20 mb-30">
                <span className="icon mr-20">
                  <img src="/assets/img/icons/ofc-mail-icon.png" alt="" />
                </span>
                <span>
                  <span className="d-block mb-0">Email address</span>
                  <b>
                    <a href="mailto:info@webmail.com"> info@webmail.com </a>
                  </b>
                </span>
              </div>
              <div className="tp-offcanvas-cta d-flex align-items-center pb-20  mb-30">
                <span className="icon mr-20">
                  <img src="/assets/img/icons/ofc-locaiton.png" alt="" />
                </span>
                <span>
                  <span className="d-block mb-0">1300 Don City, NYC</span>
                  <b>
                    <a href="callto:0002229090"> Call Us: 000-222-9090 </a>
                  </b>
                </span>
              </div>
            </div> */}

            <div className={`tp-mobile-menu mean-container d-xl-none`}>
              <div className="mean-bar">
                <MobileMenus />
              </div>
            </div>

            {/* Mobile CTA Buttons */}
            <div style={{ padding: '20px 0 10px 0', display: 'flex', gap: '10px' }}>

              {/* AI Lead Management — sub items */}
              <Link
                href="/aileadmanagement"
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  gap: '3px',
                  background: '#fff',
                  color: '#0d0d0d',
                  border: '1.5px solid #d1d5db',
                  borderRadius: '8px',
                  padding: '10px 8px',
                  fontSize: '11px',
                  fontWeight: '700',
                  textDecoration: 'none',
                  letterSpacing: '0.1px',
                  lineHeight: 1.2,
                  whiteSpace: 'nowrap',
                  textAlign: 'center',
                }}
              >
                <i className="fal fa-chart-line" style={{ fontSize: '14px', color: '#bd2120' }} />
                <span>Lead Mgmt</span>
                <span style={{ fontSize: '10px', fontWeight: 400, color: '#888' }}>Real Estate</span>
              </Link>

              <Link
                href="/callagents"
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  gap: '3px',
                  background: '#fff',
                  color: '#0d0d0d',
                  border: '1.5px solid #d1d5db',
                  borderRadius: '8px',
                  padding: '10px 8px',
                  fontSize: '11px',
                  fontWeight: '700',
                  textDecoration: 'none',
                  letterSpacing: '0.1px',
                  lineHeight: 1.2,
                  whiteSpace: 'nowrap',
                  textAlign: 'center',
                }}
              >
                <i className="fal fa-phone-volume" style={{ fontSize: '14px', color: '#bd2120' }} />
                <span>Agent Calls</span>
                <span style={{ fontSize: '10px', fontWeight: 400, color: '#888' }}>Demo</span>
              </Link>

              {/* Get Instant Call */}
              <button
                onClick={() => setShowModal(true)}
                style={{
                  flex: 1,
                  background: '#bd2120',
                  color: '#fff',
                  border: '1.5px solid #bd2120',
                  borderRadius: '8px',
                  padding: '12px 10px',
                  fontSize: '13px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '7px',
                  letterSpacing: '0.1px',
                  lineHeight: 1,
                  whiteSpace: 'nowrap',
                }}
              >
                <i className="fal fa-phone" style={{ fontSize: '12px' }} />
                Instant Call
              </button>

            </div>

            {/* Modal - same as desktop */}
            {showModal && (
              <FormModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title="Get Instant Call"
                subtitle="Fill in your details — receive a call from DevMate Solutions within 60 seconds"
                triggerCall={true}
              />
            )}

            {/* <div className="tp-offcanvas__bottom mt-80 d-none d-lg-block">
              <p>
                Our team applies its wide ranging in experience to determining.
              </p>
              <div className="tp-offcanvas-btn-wrapper">
                <a href="#" className="tp-common-btn">
                  get in touch
                  <span>
                    <i className="fal fa-long-arrow-right"></i>
                    <i className="fal fa-long-arrow-right"></i>
                  </span>
                </a>
              </div>
            </div> */}

            <div className="offc-bottom-pattern">
              <img src="/assets/img/hero/nav-parrten-botoom.png" alt="" />
            </div>
          </div>
        </div>

        <div
          className={`body-overlay ${isActive ? "opened" : ""}`}
          onClick={() => setIsActive(false)}
        ></div>
      </>
    );
};

export default Sidebar;