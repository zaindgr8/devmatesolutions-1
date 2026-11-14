"use client";
import React from "react";
import SEO from "../common/seo";
import HomeThree from "../components/homes/home-3";
import Wrapper from "../layout/wrapper";
// import FormModal from "../components/FormModal";
// import Popup from "../components/pop_up/pop_up";

const Home = () => {
  // const [showModal, setShowModal] = useState(true);

  return (
    <>
      {/* <FormModal isOpen={showModal} onClose={() => setShowModal(false)} /> */}
      <Wrapper voiceAgent>
        <SEO
          pageTitle={"AI Agency in Dubai — AI Call Assistants, Agentic AI & Automation"}
          pageDescription={"DevMate Solutions is an AI agency in Dubai. We build AI call assistants, agentic AI, WhatsApp AI agents and AI automation in Arabic and English, plus custom software for startups and enterprises."}
          pageUrl={"/"}
        />
        <HomeThree />
        {/* <Popup /> */}
      </Wrapper>
    </>
  );
};

export default Home;
