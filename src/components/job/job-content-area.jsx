import Link from 'next/link';
import React from 'react';


const job_content = {
  img: "/assets/img/job/logo.png",
  title: "We're Hiring: Young, Energetic, Innovative",
  description: (
    <>
      Devmate is on the lookout for young, dynamic individuals who bring energy,
      creativity, and a hunger for innovation.
      <br /> We believe in empowering the next generation of tech leaders to
      solve real-world problems and drive change.
      <br />
      If you’re ready to take your career to the next level, explore our
      opportunities and join us in redefining what’s possible. <br />
      The future is yours to build. Start here.
    </>
  ),
  btn_text: "apply now",
};

const {img, title, description, btn_text} = job_content


const JobContentArea = () => {
    return (
      <>
        <div className="job-about-area pt-120 pb-120">
          <div className="container">
            <div className="row">
              <div className="col-12">
                {/* <div className="job-about-cicle-img text-center mb-60">
                     <img src={img} alt="" />
                  </div> */}
                <div className="section-title-wraper text-center wow tpfadeUp">
                  <div className="tp-section">
                    <h2 className="tp-section__title mb-30">{title}</h2>
                    <p>{description}</p>
                  </div>
                </div>
                <div className="job-btn-wrapper text-center">
                  <Link
                  target="_blank"
                    href="https://forms.gle/gMqEpHVmBoo4uUk27"
                    className="tp-btn wow tpfadeUp"
                  >
                    {btn_text}
                    <span>
                      <i className="fal fa-long-arrow-right"></i>
                      <i className="fal fa-long-arrow-right"></i>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
};

export default JobContentArea;