import React, { useState } from "react";
import Link from "next/link";
import Tilt from "react-parallax-tilt";
import FormModal from "../../FormModal";

const About = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && <FormModal />}
      <div className="tp-da-about pt-60 pb-90">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 wow tpfadeUp" data-wow-delay=".3s">
              <Tilt
                className="tilt-img"
                tiltMaxAngleX={5}
                tiltMaxAngleY={5}
                perspective={900}
                transitionSpeed={1000}
                gyroscope={true}
              >
                <div
                  className="da-about-img mb-30"
                  data-tilt=""
                  data-tilt-perspective="2000"
                >
                  <img src="/assets/img/new/about1.png" alt="about-img" />
                </div>
              </Tilt>
            </div>
            <div className="col-lg-6 wow tpfadeUp" data-wow-delay=".5s">
              <div className="tp-da-about-info mb-30">
                <div className="section-title-wraper">
                  <div className="tp-section">
                    <span className="tp-section__subtitle mb-15 shadow-none text-grey p-0">
                      Pioneering Digital Revolution Since 2018
                    </span>
                    <h2 className="tp-section__title mb-30">
                      <b className="text-red-700">Checkmate</b> your Software
                      and Digital Marketing goals with{" "}
                      <b className="text-red-700">DEVMATE</b>
                    </h2>
                  </div>
                </div>

                <div className="tp-da-about-fea pb-25 mb-10">
                  <ul>
                    <li>
                      <span>
                        <i className="fal fa-check"></i>
                      </span>
                      Top-Notch Websites & Apps
                    </li>
                    <li>
                      <span>
                        <i className="fal fa-check"></i>
                      </span>
                      Advanced Ai Agents and Automation
                    </li>
                    <li>
                      <span>
                        <i className="fal fa-check"></i>
                      </span>
                      NFTs & Blockchain Tokenization
                    </li>
                    <li>
                      <span>
                        <i className="fal fa-check"></i>
                      </span>
                      Meta & Google Lead Generation
                    </li>
                  </ul>
                </div>
                <div className="tp--indo-btns d-flex flex-wrap align-items-center">
                  <div className="tp-da-link-btn mr-30 mb-30">
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
