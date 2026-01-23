import BreadcrumbArea from "@/src/common/breadcrumb-area";
import Footer from "@/src/layout/footers/footer-3";
import Header from "@/src/layout/headers/header-3";
import React from "react";
import OurTeam from "../homes/home-8/our-team";

import TeamArea from "./team-area";

const TeamTwo = () => {
  return (
    <>
      <Header />
      <BreadcrumbArea acive_menu="Tech Wizards" title="Meet The Team" />
      <OurTeam />
      {/* <TeamArea /> */}
      <Footer tp_border={true} />
    </>
  );
};

export default TeamTwo;
