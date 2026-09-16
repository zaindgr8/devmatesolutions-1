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
            <div style={{ padding: '20px 0 16px 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>

              {/* Prominent Separate Button: Get Instant Call */}
              <button
                onClick={() => {
                  setIsActive(false);
                  setShowModal(true);
                }}
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #bd2120 0%, #991b1b 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '13px 18px',
                  fontSize: '14px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  letterSpacing: '0.2px',
                  boxShadow: '0 4px 14px rgba(189, 33, 32, 0.32)',
                  transition: 'all 0.2s ease',
                }}
              >
                <span style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.22)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                }}>
                  <i className="fal fa-phone" />
                </span>
                <span>Get Instant Call</span>
                <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center' }}>
                  <i className="fal fa-long-arrow-right" style={{ fontSize: '14px', opacity: 0.9 }} />
                </span>
              </button>

              {/* Sub items: Lead Mgmt | WhatsApp | Agent Calls */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                <Link
                  href="/aileadmanagementdubairealestate"
                  onClick={() => setIsActive(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    gap: '4px',
                    background: '#fff',
                    color: '#0d0d0d',
                    border: '1.5px solid #e5e7eb',
                    borderRadius: '8px',
                    padding: '10px 4px',
                    fontSize: '11px',
                    fontWeight: '700',
                    textDecoration: 'none',
                    letterSpacing: '0.1px',
                    lineHeight: 1.2,
                    textAlign: 'center',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
                  }}
                >
                  <i className="fal fa-chart-line" style={{ fontSize: '14px', color: '#bd2120' }} />
                  <span>Lead Mgmt</span>
                  <span style={{ fontSize: '9.5px', fontWeight: 400, color: '#888' }}>Real Estate</span>
                </Link>

                <Link
                  href="/whatsappautomation"
                  onClick={() => setIsActive(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    gap: '4px',
                    background: '#fff',
                    color: '#0d0d0d',
                    border: '1.5px solid #e5e7eb',
                    borderRadius: '8px',
                    padding: '10px 4px',
                    fontSize: '11px',
                    fontWeight: '700',
                    textDecoration: 'none',
                    letterSpacing: '0.1px',
                    lineHeight: 1.2,
                    textAlign: 'center',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
                  }}
                >
                  <i className="fab fa-whatsapp" style={{ fontSize: '14px', color: '#bd2120' }} />
                  <span>WhatsApp</span>
                  <span style={{ fontSize: '9.5px', fontWeight: 400, color: '#888' }}>Automation</span>
                </Link>

                <Link
                  href="/callagents"
                  onClick={() => setIsActive(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    gap: '4px',
                    background: '#fff',
                    color: '#0d0d0d',
                    border: '1.5px solid #e5e7eb',
                    borderRadius: '8px',
                    padding: '10px 4px',
                    fontSize: '11px',
                    fontWeight: '700',
                    textDecoration: 'none',
                    letterSpacing: '0.1px',
                    lineHeight: 1.2,
                    textAlign: 'center',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
                  }}
                >
                  <i className="fal fa-phone-volume" style={{ fontSize: '14px', color: '#bd2120' }} />
                  <span>Agent Calls</span>
                  <span style={{ fontSize: '9.5px', fontWeight: 400, color: '#888' }}>Demo</span>
                </Link>
              </div>

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