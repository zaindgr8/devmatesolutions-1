import Link from 'next/link';
import React from 'react';

const job_post_data = [
  {
    id: 1,
    job_info: "Part-Time",
    location: "Remote",
    title: "Next-JS Developer",
  },
  {
    id: 2,
    job_info: "Part-Time",
    location: "Remote",
    title: "AI Agent Expert",
  },
  {
    id: 3,
    job_info: "Full-time",
    location: "Remote",
    title: "AI Call Assistant Expert",
  },
  {
    id: 4,
    job_info: "Full-Time",
    location: "Remote",
    title: "AI Chat Bot Expert",
  },
  {
    id: 5,
    job_info: "Part-Time",
    location: "Remote",
    title: "React Native Developer",
  },
  {
    id: 6,
    job_info: "Full-Time",
    location: "Remote",
    title: "Social Media Expert",
  },
  {
    id: 7,
    job_info: "Full-Time",
    location: "Remote",
    title: "SEO Expert",
  },
];

const JobPostArea = () => {
    return (
      <>
        <div className="tp-job-post-area theme-bg pb-40">
          <div className="container">
            <div className="row">
              {job_post_data.map((item, i) => (
                <div key={i} className="col-lg-6 wow tpfadeUp">
                  <div className="tp-job-item white-bg">
                    <div className="row align-items-center">
                      <div className="col-lg-6">
                        <div className="tp-job-item__info">
                          <span>
                            {item.job_info}, {item.location}
                          </span>
                          <h3 className="tp-job-item__title">{item.title}</h3>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="tp-job-item__btn text-lg-end">
                          <Link target="_blank" href="https://forms.gle/gMqEpHVmBoo4uUk27">
                            Apply Now{" "}
                            <span>
                              {" "}
                              <i className="fal fa-long-arrow-right"></i>
                            </span>{" "}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
};

export default JobPostArea;