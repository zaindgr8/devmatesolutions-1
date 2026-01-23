import ScrollToTop from "@/hooks/scroll-to-top";
import { animationCreate } from "@/utils/utils";
import React, { useEffect } from "react";
import VoiceFlowChat from "../pages/voiceflow_chatBot";
import AIAvatarWidget from "../components/ai_avatar_widget/AIAvatarWidget";
import Whatsapp from "../pages/whatsapp";


const Wrapper = ({ children }) => {

  useEffect(() => {
    setTimeout(() => {
      animationCreate();
    }, 500);
  }, []);

  return (
    <>
      {/* <Whatsapp/> */}
      <VoiceFlowChat />
      <AIAvatarWidget />
      {children}
      {/* <ScrollToTop /> */}
    </>
  );
};

export default Wrapper;
