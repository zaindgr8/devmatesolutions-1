import React from 'react';
import CommonFooter, { FooterCopyRight } from './common-footer';
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import Link from 'next/link';


const FooterThree = ({style_4}) => {
    return (
      <>
        <footer>
          <div
            className={`bs-footer da-footer-bg ${
              style_4 ? "p-relative" : "da-footer"
            } `}
          >
            <div className="container">
              <div
                className={`bs-footer__main pb-10 pt-80 ${
                  style_4 ? "z-index-11 p-relative" : ""
                }`}
              >
                <div className="row justify-content-center">
                  {/* <CommonFooter />                      */}
                  <div className="col-xl-3 col-md-6">
                    <div className="tp-footer__widget mb-40">
                      <h3 className="tp-footer__widget-title mb-35">
                        Get In Touch
                      </h3>
                      <div className="tp-footer-cta d-flex align-items-center mb-30">
                        <span className="call-icon">
                          {/* <img
                            src="/assets/img/footer/footer-rbg-call.png"
                            alt=""
                          /> */}
                          {/* <FaPhoneAlt /> */}
                        </span>
                        <span>
                          <span className="d-block mb-0">
                            UAE: Business Bay, Dubai
                          </span>
                          <span className="d-block mb-0">
                            USA: Atlanta, GA
                          </span>
                          <span className="d-block mb-0">
                            Oman: Al Mouj, Muscat
                          </span>
                        </span>
                      </div>
                      <div className="tp-footer-cta d-flex align-items-center mb-30">
                        <span className="call-icon">
                          {/* <img
                            src="/assets/img/footer/message-rgb-ison.png"
                            alt=""
                          /> */}
                        </span>
                        <span>
                          <span className="d-block mb-0">
                            24/7 Customer Support
                          </span>
                          <b>
                            <a href="mailto:info@gencio.com">
                              contact@devmatesolutions.com
                            </a>
                          </b>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-4 col-md-6">
                    <div className="tp-footer__widget bs-pl-60 mb-40">
                      <h3 className="tp-footer__widget-title mb-35">
                        Quick Links
                      </h3>
                      <ul className="mb-30">
                        <li>
                          <Link href="/service-3">Services</Link>
                        </li>
                        <li>
                          <Link href="/team-2">Team</Link>
                        </li>
                        <li>
                          <Link href="/job">Career</Link>
                        </li>
                        <li>
                          <Link href="/book-meeting">Book Meeting with CEO</Link>
                        </li>
                      </ul>

                      <div className="da-ft-social">
                        <b> Connect Here:</b>
                        <span className="text-red-700">
                          <a
                            target="_blank"
                            href="https://www.facebook.com/devmatesolutions"
                          >
                            <i className="fab fa-facebook-f text-red-700"></i>
                          </a>
                        </span>
                        <span>
                          <a
                            target="_blank"
                            href="https://www.instagram.com/devmatesolutions/"
                          >
                            <i className="fab fa-instagram text-red-700"></i>
                          </a>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <FooterCopyRight style_3={true} />
            </div>
            {style_4 && (
              <div className="bs-footer__circle d-none d-lg-block"></div>
            )}
          </div>
        </footer>
      </>
    );
};

export default FooterThree;