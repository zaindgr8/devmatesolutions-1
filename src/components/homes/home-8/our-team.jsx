import team_data from "@/src/data/team-data";
import Link from "next/link";
import React from "react";

const OurTeam = () => {
  return (
    <>
      <div className=" pt-80 pb-40">
        <div className="container">
          {/* <div className="row">
              <div className="col-12 wow tpfadeUp">
                <div className="section-title-wraper">
                  <div className="tp-section">
                    <span className="tp-section__bigtitle">DEVMATE</span>
                    <span className="tp-section__subtitle shadow-none text-rgb mb-15 p-0">
                      Our Team
                    </span>
                    <h2 className="tp-section__title mb-40">
                      Meet Our Experts
                    </h2>
                  </div>
                </div>
              </div>
            </div> */}

          <div className="row">
            {(() => {
              const visibleMembers = team_data.slice(3).filter((m) => m.name !== "Joshua" && m.id !== 103);
              const reordered = [
                ...visibleMembers.slice(-5),
                ...visibleMembers.slice(0, -5),
              ];
              return reordered;
            })().map((item, i) => (
              <div key={i} className="col-md-6 col-lg-4 col-xl-3">
                <div
                  className="ca-team-item mb-30 wow tpfadeUp"
                  data-wow-delay=".5s"
                >
                  <div
                    className="w-img mb-25 fix"
                    style={{ width: "100%", aspectRatio: "1 / 1.15", overflow: "hidden", borderRadius: "12px", background: "#18181b" }}
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
                    />
                    {/* <div className="ca-team-item__img-social">
                                    <a href="#"><i className="fab fa-facebook-f"></i></a>
                                    <a href="#"><i className="fab fa-twitter"></i></a>
                                    <a href="#"><i className="fab fa-behance"></i></a>
                                    <a href="#"><i className="fab fa-youtube"></i></a>
                                    <a href="#"><i className="fab fa-linkedin"></i></a>
                                </div> */}
                  </div>
                  <div className="ca-team-item__content">
                    <h3 className="ca-team-item__content-title">
                      <Link href="">{item.name}</Link>
                    </h3>
                    <span>{item.title}</span>
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

export default OurTeam;
