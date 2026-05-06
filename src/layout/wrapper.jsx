import ScrollToTop from "@/hooks/scroll-to-top";
import { animationCreate } from "@/utils/utils";
import React, { useEffect } from "react";
import GeminiChat from "../components/gemini_chat/GeminiChat";
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
      <GeminiChat />
      <AIAvatarWidget />
      {children}
      {/* <ScrollToTop /> */}
    </>
  );
};

export default Wrapper;
