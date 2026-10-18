import React, { useState, useRef, useEffect } from "react";
import NavMenu from "./nav-menu";
import Link from "next/link";
import useSticky from "./../../../hooks/use-sticky";
import Sidebar from "@/src/layout/headers/sidebar";
import FormModal from "@/src/components/FormModal";

const HeaderThree = () => {
  const { sticky } = useSticky();
  const [isActive, setIsActive] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleOpenInstantCall = () => {
      setShowModal(true);
    };
    window.addEventListener("open-instant-call", handleOpenInstantCall);
    return () => {
      window.removeEventListener("open-instant-call", handleOpenInstantCall);
    };
  }, []);

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
      <header>
        <div
          id="header-sticky"
          className={`tp-da-header py-3 p-relative ${
            sticky ? "header-sticky" : ""
          }`}
          style={{
            paddingLeft: sticky ? "24px" : "clamp(16px, 2.5vw, 48px)",
            paddingRight: sticky ? "24px" : "clamp(16px, 2.5vw, 48px)",
          }}
        >
          <div className="container-fluid" style={{ maxWidth: 1600 }}>
            <div className="tp-da-header__main">
              <div
                className="d-flex align-items-center justify-content-between"
                style={{ width: "100%", gap: "clamp(12px, 1.8vw, 32px)" }}
              >
                {/* 1. Logo */}
                <div style={{ flexShrink: 0 }}>
                  <div className="logo">
                    <Link href="/">
                      <img
                        src="/red-logo.png"
                        alt="logo"
                        style={{ height: 40, width: "auto", display: "block" }}
                      />
                    </Link>
                  </div>
                </div>

                {/* 2. Desktop Navigation Menu */}
                <div
                  className="d-none d-xl-flex justify-content-center align-items-center flex-grow-1"
                  style={{ minWidth: 0 }}
                >
                  <div className="main-menu da-menu" style={{ margin: 0 }}>
                    <nav id="mobile-menu">
                      <NavMenu />
                    </nav>
                  </div>
                </div>

                {/* 3. Desktop CTA Buttons: SIXTY & PORTAL */}
                <div
                  className="d-none d-xl-flex align-items-center justify-content-end dm-header-actions"
                >
                  <a
                    href="https://sixty.devmatesolutions.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    id="header-btn-sixty"
                    className="dm-ext-btn dm-ext-btn--sixty"
                    title="Launch Sixty AI — sixty.devmatesolutions.com"
                  >
                    <span className="dm-pulse-dot" aria-hidden="true" />
                    <span>SIXTY</span>
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="dm-ext-arrow"
                      aria-hidden="true"
                    >
                      <path
                        d="M3 9L9 3M9 3H4.5M9 3V7.5"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>

                  <a
                    href="https://portal.devmatesolutions.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    id="header-btn-portal"
                    className="dm-ext-btn dm-ext-btn--portal"
                    title="Open Client Portal — portal.devmatesolutions.com"
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ opacity: 0.9 }}
                      aria-hidden="true"
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <span>PORTAL</span>
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="dm-ext-arrow"
                      aria-hidden="true"
                    >
                      <path
                        d="M3 9L9 3M9 3H4.5M9 3V7.5"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </div>

                {/* 4. Mobile Hamburger Toggle */}
                <div className="d-xl-none d-flex align-items-center justify-content-end flex-grow-1">
                  <div className="tp-header-search-nav d-flex justify-content-end">
                    <div
                      className="tp-header-nav"
                      onClick={() => setIsActive(true)}
                    >
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Sidebar isActive={isActive} setIsActive={setIsActive} />
      <style jsx>{`
        .dm-header-actions {
          flex-shrink: 0;
          gap: 10px;
          flex-wrap: nowrap;
        }
        .dm-ext-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          height: 38px;
          padding: 0 16px;
          border-radius: 9px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.6px;
          line-height: 1;
          text-decoration: none;
          white-space: nowrap;
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          cursor: pointer;
          user-select: none;
        }
        .dm-ext-btn :global(.dm-ext-arrow) {
          transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.22s ease;
          opacity: 0.75;
        }
        .dm-ext-btn:hover {
          transform: translateY(-1.5px);
          text-decoration: none;
        }
        .dm-ext-btn:hover :global(.dm-ext-arrow) {
          transform: translate(2px, -2px);
          opacity: 1;
        }
        .dm-ext-btn:active {
          transform: translateY(0);
        }
        .dm-ext-btn--sixty {
          background: #0d0d0d;
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.16);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.16);
        }
        .dm-ext-btn--sixty:hover {
          background: #171717;
          color: #ffffff;
          border-color: rgba(239, 68, 68, 0.55);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.28), 0 0 16px rgba(239, 68, 68, 0.2);
        }
        .dm-ext-btn--portal {
          background: linear-gradient(135deg, #bd2120 0%, #991b1b 100%);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.22);
          box-shadow: 0 3px 12px rgba(189, 33, 32, 0.3);
        }
        .dm-ext-btn--portal:hover {
          background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
          color: #ffffff;
          box-shadow: 0 6px 22px rgba(189, 33, 32, 0.5);
        }
        .dm-pulse-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #ef4444;
          box-shadow: 0 0 6px #ef4444;
          display: inline-block;
          animation: dmPulseDot 2s infinite ease-in-out;
        }
        @keyframes dmPulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.45; transform: scale(0.8); }
        }
      `}</style>
    </>
  );
};

export default HeaderThree;
