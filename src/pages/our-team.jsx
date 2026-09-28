import React from "react";
import SEO from "../common/seo";
import TeamTwo from "../components/team-2";

const index = () => {
  return (
    <>
      <SEO
        pageTitle={"Meet Our Team — AI & Software Experts"}
        pageDescription={"Meet the team behind DevMate Solutions — a group of AI engineers, software developers, and digital marketing specialists based in Dubai, UAE."}
        pageUrl={"/our-team"}
      />
      <TeamTwo />
    </>
  );
};

export default index;
