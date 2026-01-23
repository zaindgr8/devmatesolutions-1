import Link from "next/link";
import React from "react";
import { SiMinutemailer } from "react-icons/si";

const business_journey_content = {
  sub_title: "Take the Leap Toward Digital Success with Us",
  title: (
    <>
      Ready to Level Up? Let's talk!
      <br /> Connect Now!
    </>
  ),
  img_1: "/assets/img/cta/1 2.svg",
  img_2: "/assets/img/cta/2 2.svg",
};
const { sub_title, title, img_1, img_2 } = business_journey_content;

const BusinessJourney = ({ style_service }) => {
  const handleEmailClick = () => {
    // Simulate opening email client (for user feedback)
    alert("Your email client should be open now.");

    // Example using Fetch API (replace with your server logic)
    fetch("/send-email", {
      method: "POST",
      body: JSON.stringify({
        email: "user@example.com",
        message: "My Inquiry",
      }),
    })
      .then(() => {
        alert("Your email has been sent successfully!");
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        alert("There was an error sending your email. Please try again later.");
      });
  };

  return (
    <>
      <div
        className="tp-bs-cta-area pt-105 pb-120 black-bg p-relative"
        style={{
          backgroundImage: `url(${
            style_service ? null : "/assets/img/cta/ca-cata-pattern.png"
          })`,
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="bs-cta-section text-center">
                <span
                  className={`bs-cta-section__subtitle ${
                    style_service ? "" : "ca-cta-section-subtitle"
                  } wow tpfadeUp`}
                >
                  {sub_title}
                </span>
                <div className="cd-intro">
                  <h3 className="bs-cta-section__title ca-cta-section-title cd-headline loading-bar mb-55 ca-cta-title wow tpfadeUp">
                    <span>{title}</span>
                    <span className="cd-words-wrapper bs-cta-wrapper ca-cta-wrapper">
                      <b className="is-hidden"> DEVMATE</b>
                      {/* <b className="is-hidden">Branding</b>
                                        <b className="is-visible">Markting</b> */}
                    </span>
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="bs-cta-btns text-center">
              <Link
                target="_blank"
                href="https://cal.com/devmate-solutions/team"
                className={`${
                  style_service ? "tp-btn" : "tp-grd-btn"
                } mr-30 wow tpfadeUp`}
              >
                Schedule a meeting
                <span className="ml-10">
                  <i className="fal fa-long-arrow-right"></i>
                  <i className="fal fa-long-arrow-right"></i>
                </span>
              </Link>{" "}
              <Link
                href={`mailto:contact@devmatesolutions.com?subject=Business Journey Inquiry`}
                className={`${
                  style_service ? "tp-white-btn" : "tp-black-btn-rgb"
                } wow tpfadeUp`}
              >
                <span className="mr-15">
                  <SiMinutemailer />
                  <SiMinutemailer />
                </span>
                Contact Us
              </Link>
            </div>
          </div>
        </div>
        <div className="ca-cta-avata">
          <img src={img_1} alt="" />
        </div>
        <div className="ca-cta-avata-2 ">
          <img src={img_2} alt="" />
        </div>
      </div>
    </>
  );
};

export default BusinessJourney;
