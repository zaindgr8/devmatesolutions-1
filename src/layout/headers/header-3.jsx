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
        <FormModal isOpen={showModal} onClose={() => setShowModal(false)} />
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
                <div className="col-xl-3 col-3">
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

                <div className="col-xl-3 d-none d-xl-block">
                  <div className="da-header-cta-btn d-flex align-items-center justify-content-end">
                    <button
                      onClick={() => setShowModal(true)}
                      className="tp-grd-btn"
                    >
                      Get Instant Call
                      <span className="ml-10">
                        <i className="fal fa-long-arrow-right"></i>
                        <i className="fal fa-long-arrow-right"></i>
                      </span>
                    </button>
                    {/* <p className="mt-10 mb-0">
                      or send an
                      <b>
                        <a
                          className="ml-2"
                          href="mailto:contact@devmatesolutions.com"
                        >
                          <i className="fal fa-envelope ml-1"></i> EMAIL
                        </a>
                      </b>
                    </p> */}
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
