import team_data from "@/src/data/team-data";
import Link from "next/link";
import React from "react";

const TeamArea = () => {
  return (
    <>
      <div className="da-team-area pt-120 pb-90">
        <div className="container">
          <div className="row">
            {team_data
              .filter((item) => 
                !item.name.includes("Joshua") &&
                item.id !== 103 &&
                !item.name.includes("Jhonson") && 
                !item.name.includes("Samrat") && 
                !item.name.includes("Berat") && 
                !item.name.includes("Dowson") && 
                !item.name.includes("Swanson") && 
                !item.name.includes("Peters") && 
                !item.name.includes("Watson") && 
                !item.name.includes("Duncan") && 
                !item.name.includes("Sullivan") && 
                !item.name.includes("Mcdermott")
              )
              .slice(3)
              .map((item, i) => (
              <div key={i} className="col-md-6 col-lg-4 col-xl-3">
                <div className="ca-team-item mb-30 wow tpfadeUp">
                  <div
                    className="ca-team-item__img ca-team-item-after w-img mb-25 fix"
                    style={{ width: "100%", aspectRatio: "1 / 1.15", overflow: "hidden", borderRadius: "12px", background: "#18181b" }}
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
                    />
                    <div className="ca-team-item__img-social">
                      <a href="#">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                      <a href="#">
                        <i className="fab fa-twitter"></i>
                      </a>
                      <a href="#">
                        <i className="fab fa-behance"></i>
                      </a>
                      <a href="#">
                        <i className="fab fa-youtube"></i>
                      </a>
                      <a href="#">
                        <i className="fab fa-linkedin"></i>
                      </a>
                    </div>
                  </div>
                  <div className="ca-team-item__content">
                    <h3 className="ca-team-item__content-title">
                      <Link href="/team-details">{item.name}</Link>
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

export default TeamArea;
