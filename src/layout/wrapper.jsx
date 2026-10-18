import ScrollToTop from "@/hooks/scroll-to-top";
import { animationCreate } from "@/utils/utils";
import React, { useEffect } from "react";
import GeminiChat from "../components/gemini_chat/GeminiChat";
import AIAvatarWidget from "../components/ai_avatar_widget/AIAvatarWidget";
import FreyaVoice from "../components/freya_voice/FreyaVoice";
import Whatsapp from "../pages/whatsapp";


// voiceAgent: show the "Talk to Freya" voice orb instead of the chat + video widgets.
const Wrapper = ({ children, voiceAgent = false }) => {

  useEffect(() => {
    setTimeout(() => {
      animationCreate();
    }, 500);
  }, []);

  return (
    <>
      {/* <Whatsapp/> */}
      {voiceAgent ? (
        <FreyaVoice />
      ) : (
        <>
          <GeminiChat />
          <AIAvatarWidget />
        </>
      )}
      {children}
      {/* <ScrollToTop /> */}
    </>
  );
};

export default Wrapper;
