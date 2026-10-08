import Link from 'next/link';
import React, { useState } from 'react';
import FormModal from '@/src/components/FormModal';


const about_content_2  ={
    img: "/assets/img/about/ab-about-img.jpg",
    title: <>We help you build and grow your business.</>,
    description: <>We have developed search strategies for leading brands to small &
                medium sized businesses across many industries in the UK and
                worldwide. We will be all in the ways. <br /> 
                <br />
                We are an experienced and talented team of passionate consultants
                who live and breathe search engine.</>
}
const {img, title, description}  = about_content_2


const AboutPageAbout = () => {
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
        <div className="about-page-about pt-120 pb-90">
          <div className="container">
            <div className="row align-items-md-center">
              <div className="col-xl-6 wow tpfadeUp">
                <div className="about-page-about-img mb-30">
                  <img src={img} alt={title} />
                </div>
              </div>
              <div className="col-xl-6 wow tpfadeUp">
                <div className="about-page-ab">
                  <div className="section-title-wraper">
                    <div className="tp-section">
                      <h2 className="tp-section__title mb-30">{title}</h2>
                      <p>{description}</p>
                    </div>
                  </div>
                  <div className="about-page-ab-btn-wrapper mb-30 wow tpfadeUp">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setShowModal(true);
                      }}
                      className="tp-btn"
                      style={{ border: "none" }}
                    >
                      Get a Call in 5 Seconds
                      <span>
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
      </>
    );
};

export default AboutPageAbout;