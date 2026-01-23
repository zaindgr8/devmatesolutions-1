import React from 'react';
import Tilt from 'react-parallax-tilt';

import Link  from "next/link";
const portfolio_data = [
  {
    id: 1,
    title: "Procope AI 🇺🇸",
    hover_img: "/assets/img/portfolio/procopeai.png",
    cls: "mp-portfolio-btn",
    link: "http://mydent.ai/",
  },
  {
    id: 2,
    title: "Finaxe 🇬🇧",
    hover_img: "/assets/img/portfolio/finaxe.png",
    cls: "mp-portfolio-btn",
    link: "https://finaxe.com/",
  },
  {
    id: 3,
    title: "Shift- Application🇴🇲",
    hover_img: "/assets/img/portfolio/shift.png",
    cls: "mp-portfolio-btn",
    link: "/",
  },
 
  {
    id: 4,
    title: "Refurbly- Vodafone🇶🇦",
    hover_img: "/assets/img/portfolio/vf.png",
    cls: "mp-portfolio-btn",
    link: "/",
  },
];

const Portfolio = () => {
    return (
      <>
        <div className="mp-portfolio fix">
          <div className="container">
            <span className="tp-section__subtitle mb-5 shadow-none text-grey p-0 mt-20">
              Our Success Stories
            </span>
            {portfolio_data.map((item, i) => (
              <div
                key={i}
                className="mp-portfolio-item d-flex justify-content-between align-items-center p-relative"
              >
                <div className="mp-portfolio-info wow tpfadeUp wow tpfadeUp">
                  <h3 className="mp-portfolio-title">
                    {item.title}
                  </h3>
                  <div
                    className="mp-portfoio-img p-relative"
                    data-tilt=""
                    data-tilt-perspective="2000"
                  >
                    <Tilt
                      className="tilt-img"
                      tiltMaxAngleX={5}
                      tiltMaxAngleY={5}
                      perspective={900}
                      transitionSpeed={1000}
                      gyroscope={true}
                    >
                      <img src={item.hover_img} alt={item.title} />
                      {/* <a href="" className="mp-pt-btn">
                        <i className="fal fa-long-arrow-right"></i>
                      </a> */}
                    </Tilt>
                  </div>
                </div>
                {/* <div className={`${item.cls} wow tpfadeUp`}>
                  <span>
                    <a href="#">Social Media</a>
                  </span>
                  <span>,</span>
                  <span>
                    <a href="#">Website</a>
                  </span>
                </div> */}
              </div>
            ))}
            <div className="mp-pt-btn-wrapper text-center pt-60 wow tpfadeUp">
              <a
                href="https://drive.google.com/drive/folders/1oSJwZW1FWlV75pywC__V61oxpHDN7Nu3?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="tp-border-btn br-btn-bg-dark border-radious-none tp-btn-hover alt-black-color"
              >
                More Works
                <span className="ml-10">
                  <i className="fal fa-long-arrow-right"></i>
                  <i className="fal fa-long-arrow-right"></i>
                </span>
                <b></b>
              </a>
            </div>
          </div>
        </div>
      </>
    );
};

export default Portfolio;