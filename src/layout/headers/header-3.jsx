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
  const [showAIMenu, setShowAIMenu] = useState(false);
  const aiMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (aiMenuRef.current && !aiMenuRef.current.contains(event.target)) {
        setShowAIMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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

                {/* 3. Desktop CTA Buttons */}
                <div
                  className="d-none d-xl-flex align-items-center justify-content-end"
                  style={{ flexShrink: 0, gap: 10, flexWrap: "nowrap" }}
                >
                  {/* ── AI Lead Management Dropdown ── */}
                  <div
                    ref={aiMenuRef}
                    style={{ position: "relative", flexShrink: 0 }}
                  >
                    {/* Main Button */}
                    <button
                      id="ai-lead-dropdown-btn"
                      type="button"
                      onClick={() => setShowAIMenu((prev) => !prev)}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        background: showAIMenu ? "#bd2120" : "#0d0d0d",
                        color: "#ffffff",
                        fontWeight: 700,
                        fontSize: 12.5,
                        padding: "9px 15px",
                        borderRadius: 8,
                        border: "1.5px solid",
                        borderColor: showAIMenu ? "#bd2120" : "#0d0d0d",
                        cursor: "pointer",
                        transition: "all 0.22s ease",
                        whiteSpace: "nowrap",
                        letterSpacing: "0.2px",
                        lineHeight: 1,
                        fontFamily: "inherit",
                        flexShrink: 0,
                      }}
                    >
                      <i className="fal fa-robot" style={{ fontSize: 11 }}></i>
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
                          href="/aileadmanagementdubairealestate"
                          id="ai-submenu-lead-mgmt"
                          onClick={() => setShowAIMenu(false)}
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

                        {/* Sub-item 2: WhatsApp Automation */}
                        <Link
                          href="/whatsappautomation"
                          id="ai-submenu-whatsapp-automation"
                          onClick={() => setShowAIMenu(false)}
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
                            <i className="fab fa-whatsapp" style={{ fontSize: 15, color: "#dc2626" }}></i>
                          </span>
                          <span>
                            <span style={{ display: "block", lineHeight: 1.2 }}>WhatsApp Automation</span>
                            <span style={{ display: "block", fontSize: 11, color: "#9ca3af", fontWeight: 400, marginTop: 2 }}>Meta Business API</span>
                          </span>
                        </Link>

                        {/* Sub-item 3 */}
                        <Link
                          href="/callagents"
                          id="ai-submenu-call-agents"
                          onClick={() => setShowAIMenu(false)}
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
                      fontSize: 12.5,
                      padding: "9px 16px",
                      borderRadius: 8,
                      lineHeight: 1,
                      textTransform: "none",
                      letterSpacing: "0.2px",
                      whiteSpace: "nowrap",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 7,
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
    </>
  );
};

export default HeaderThree;
