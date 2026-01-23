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
      <Wrapper>
        <SEO pageTitle={"DEVMATE"} />
        <HomeThree />
        {/* <Popup /> */}
      </Wrapper>
    </>
  );
};

export default Home;
