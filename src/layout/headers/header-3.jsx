import React, { useState } from "react";
import NavMenu from "./nav-menu";
import Link from "next/link";
import useSticky from "./../../../hooks/use-sticky";
import Sidebar from "@/src/layout/headers/sidebar";
import FormModal from "@/src/components/FormModal";

const HeaderThree = () => {
  const { sticky } = useSticky();
  const [isActive, setIsActive] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showAIMenu, setShowAIMenu] = useState(false);

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
          className={`tp-da-header pl-200 pr-200 py-3 p-relative ${
            sticky ? "header-sticky" : ""
          }`}
        >
          <div className="container-fluid">
            <div className="tp-da-header__main">
              <div className="row align-items-center">
                <div className="col-xl-2 col-3">
                  <div className="logo">
                    <Link href="/">
                      <img src="/red-logo.png" className="w-20" alt="logo" />
                    </Link>
                  </div>
                </div>

                <div className="col-xl-6 col-lg-9 d-none d-xl-block">
                  <div className="main-menu da-menu">
                    <nav id="mobile-menu">
                      <NavMenu />
                    </nav>
                  </div>
                </div>

                <div className="col-xl-4 d-none d-xl-block">
                  <div className="da-header-cta-btn d-flex align-items-center justify-content-end" style={{ gap: 10, flexWrap: "nowrap" }}>
                    {/* ── AI Lead Management Dropdown ── */}
                    <div
                      style={{ position: "relative", flexShrink: 0 }}
                      onMouseEnter={() => setShowAIMenu(true)}
                      onMouseLeave={() => setShowAIMenu(false)}
                    >
                      {/* Main Button */}
                      <button
                        id="ai-lead-dropdown-btn"
                        type="button"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 7,
                          background: "#0d0d0d",
                          color: "#ffffff",
                          fontWeight: 700,
                          fontSize: 13,
                          padding: "10px 18px",
                          borderRadius: 8,
                          border: "1.5px solid #0d0d0d",
                          cursor: "pointer",
                          transition: "all 0.22s ease",
                          whiteSpace: "nowrap",
                          letterSpacing: "0.2px",
                          lineHeight: 1,
                          fontFamily: "inherit",
                          background: showAIMenu ? "#bd2120" : "#0d0d0d",
                          borderColor: showAIMenu ? "#bd2120" : "#0d0d0d",
                        }}
                      >
                        <i className="fal fa-robot" style={{ fontSize: 12 }}></i>
                        AI Lead Management
                        <svg
                          width="10" height="10" viewBox="0 0 10 6" fill="none"
                          style={{ transition: "transform 0.2s ease", transform: showAIMenu ? "rotate(180deg)" : "rotate(0deg)" }}
                        >
                          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                        </svg>
                      </button>

                      {/* Dropdown Menu */}
                      {showAIMenu && (
                        <div
                          id="ai-lead-dropdown-menu"
                          style={{
                            position: "absolute",
                            top: "calc(100% + 6px)",
                            right: 0,
                            minWidth: 230,
                            background: "#ffffff",
                            border: "1px solid #e5e7eb",
                            borderRadius: 10,
                            boxShadow: "0 12px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
                            overflow: "hidden",
                            zIndex: 9999,
                            animation: "hdrDropFade 0.18s ease both",
                          }}
                        >
                          {/* Sub-item 1 */}
                          <Link
                            href="/aileadmanagement"
                            id="ai-submenu-lead-mgmt"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 12,
                              padding: "13px 16px",
                              color: "#111111",
                              textDecoration: "none",
                              fontSize: 13,
                              fontWeight: 600,
                              borderBottom: "1px solid #f3f4f6",
                              transition: "background 0.15s ease, color 0.15s ease",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "#fef2f2";
                              e.currentTarget.style.color = "#bd2120";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "transparent";
                              e.currentTarget.style.color = "#111111";
                            }}
                          >
                            <span style={{
                              width: 32, height: 32, borderRadius: 8,
                              background: "rgba(189,33,32,0.15)",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              flexShrink: 0,
                            }}>
                              <i className="fal fa-chart-line" style={{ fontSize: 13, color: "#dc2626" }}></i>
                            </span>
                            <span>
                              <span style={{ display: "block", lineHeight: 1.2 }}>Lead Management</span>
                              <span style={{ display: "block", fontSize: 11, color: "#9ca3af", fontWeight: 400, marginTop: 2 }}>Real Estate</span>
                            </span>
                          </Link>

                          {/* Sub-item 2 */}
                          <Link
                            href="/callagents"
                            id="ai-submenu-call-agents"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 12,
                              padding: "13px 16px",
                              color: "#111111",
                              textDecoration: "none",
                              fontSize: 13,
                              fontWeight: 600,
                              transition: "background 0.15s ease, color 0.15s ease",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "#fef2f2";
                              e.currentTarget.style.color = "#bd2120";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "transparent";
                              e.currentTarget.style.color = "#111111";
                            }}
                          >
                            <span style={{
                              width: 32, height: 32, borderRadius: 8,
                              background: "rgba(189,33,32,0.15)",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              flexShrink: 0,
                            }}>
                              <i className="fal fa-phone-volume" style={{ fontSize: 13, color: "#dc2626" }}></i>
                            </span>
                            <span>
                              <span style={{ display: "block", lineHeight: 1.2 }}>Agent Calls</span>
                              <span style={{ display: "block", fontSize: 11, color: "#666", fontWeight: 400, marginTop: 2 }}>Demo</span>
                            </span>
                          </Link>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => setShowModal(true)}
                      className="tp-grd-btn"
                      style={{
                        fontSize: 13,
                        padding: "10px 18px",
                        borderRadius: 8,
                        lineHeight: 1,
                        textTransform: "none",
                        letterSpacing: "0.2px",
                        whiteSpace: "nowrap",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        flexShrink: 0,
                      }}
                    >
                      Get Instant Call
                      <span style={{ display: "inline-flex", alignItems: "center", position: "relative", width: 14, height: 14 }}>
                        <i className="fal fa-long-arrow-right"></i>
                        <i className="fal fa-long-arrow-right"></i>
                      </span>
                    </button>
                  </div>
                </div>

                <div className="col-9 d-xl-none d-block">
                  <div className="tp-header-search-nav d-flex justify-content-end">
                    {/* <div className="tp-header-search p-relative">
                      <form onSubmit={(e) => e.preventDefault()}>
                        <input type="text" placeholder="Keyword..." />
                        <button type="submit">
                          <i className="fal fa-search"></i>
                        </button>
                      </form>
                    </div> */}

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
    </>
  );
};

export default HeaderThree;
