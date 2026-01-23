"use client"
import React, { useState } from "react";


const contact_data = [
  {
    id: 1,
    titel: "For General Queries!",
    email: "contact@devmatesolutions.com",
    phone: "+971585984869",
    tel: "+971585984869",
  },
];

// contact_info
const contact_info = {
  img: "/assets/img/cta/main1.svg",
  hi_text: "Say Hello",
  title: <>Have a question or a game-changing idea? We're here to listen! </>,
};

const { img, hi_text, title } = contact_info;

const ContactArea = () => {
      const [isOpen, setIsOpen] = useState(false);
      const [isShipOpen, setIsShipOpen] = useState(false);
              const [isLoginOpen, setIsLoginOpen] = useState(false);
              const [isCodeOpen, setIsCodeOpen] = useState(false);
  return (
    <>
      <div className="contact-page-area pt-120 pb-90 wow tpfadeUp">
        <div className="container">
          {/* <div className="row">
            <div className="col-12">
              <div className="contact-img-1 pb-100 ">
                <img className="w-[100vh]" src={img} alt="" />
              </div>
            </div>
          </div> */}
          <div className="row">
            {/* <div className="col-lg-2">
              <span className="say-hello">{hi_text}</span>
            </div> */}
            <div className="col-lg-10">
              <div className="tp-contact-page-info ">
                <h3 className="tp-section__title pb-60 mb-60 tp-border-bottom">
                  {title}
                </h3>
              </div>

              <div className="col-lg-6">
                <div className="checkbox-form">
                  <h3>Enter Your Details!</h3>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="country-select">
                        <label>
                          Country <span className="required">*</span>
                        </label>
                        <select>
                          <option value="audi2">United Arab Emirates</option>
                          <option value="volvo">Pakistan</option>
                          <option value="mercedes">France</option>
                          <option value="audi">Netherlands</option>
                          <option value="audi3">
                            United States of America
                          </option>
                          <option value="audi4">United Kingdom</option>
                          <option value="audi5">India</option>
                          <option value="audi6">Italy</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="checkout-form-list">
                        <label>
                          First Name <span className="required">*</span>
                        </label>
                        <input type="text" placeholder="" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="checkout-form-list">
                        <label>
                          Last Name <span className="required">*</span>
                        </label>
                        <input type="text" placeholder="" />
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="checkout-form-list">
                        <label>
                          Town / City <span className="required">*</span>
                        </label>
                        <input type="text" placeholder="Town / City" />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="checkout-form-list">
                        <label>
                          Email Address <span className="required">*</span>
                        </label>
                        <input type="email" placeholder="" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="checkout-form-list">
                        <label>
                          Phone <span className="required">*</span>
                        </label>
                        <input type="text" placeholder="Contact Number" />
                      </div>
                    </div>
                  </div>
                  <div className="different-address">
                    <div className="ship-different-title">
                      <h3>
                        <label>What can We help you with today?</label>
                      </h3>
                    </div>

                    <div className="order-notes">
                      <div className="checkout-form-list">
                        <textarea
                          id="checkout-mess"
                          cols="30"
                          rows="10"
                          placeholder=" Let's start a conversation. We're just a click away!"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                {contact_data.map((item, i) => (
                  <div key={i} className="col-lg-3">
                    <div className="contact-cta-item mb-30">
                      <b>{item.titel}</b> <br />
                      <a href={`mailto:${item.email}`}>{item.email}</a> <br />
                      <a href={`tel:${item.tel}`}>{item.phone}</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactArea;
