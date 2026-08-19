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
                    <Link
                      href="/aileadmanagement"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        background: "#0d0d0d",
                        color: "#ffffff",
                        fontWeight: 700,
                        fontSize: 13,
                        padding: "10px 18px",
                        borderRadius: 8,
                        textDecoration: "none",
                        border: "1.5px solid #0d0d0d",
                        transition: "all 0.22s ease",
                        whiteSpace: "nowrap",
                        letterSpacing: "0.2px",
                        lineHeight: 1,
                        flexShrink: 0,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#bd2120";
                        e.currentTarget.style.borderColor = "#bd2120";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "#0d0d0d";
                        e.currentTarget.style.borderColor = "#0d0d0d";
                      }}
                    >
                      <i className="fal fa-robot" style={{ fontSize: 12 }}></i>
                      AI Lead Management
                    </Link>
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
