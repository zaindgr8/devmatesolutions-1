"use client";

import { useEffect } from "react";

const VoiceFlowChat = () => {
  useEffect(() => {
    // Create script element
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.onload = () => {
      // Initialize VoiceFlow chat after script loads
      window.voiceflow?.chat.load({
        verify: { projectID: "6783eaab5b843c00cedad2d8" },
        url: "https://general-runtime.voiceflow.com",
        versionID: "production",
      });
      
      // Add CSS to position VoiceFlow widget at bottom-right, below avatar widget
      const style = document.createElement("style");
      style.textContent = `
        /* VoiceFlow Chat Widget Positioning */
        [data-voiceflow-element],
        .vf-chat,
        #voiceflow-chat,
        iframe[src*="voiceflow"] {
          position: fixed !important;
          bottom: 20px !important;
          right: 20px !important;
          z-index: 9997 !important;
        }
      `;
      document.head.appendChild(style);
    };
    script.src = "https://cdn.voiceflow.com/widget/bundle.mjs";

    // Append script to document
    document.head.appendChild(script);

    // Cleanup function to remove script when component unmounts
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []); // Empty dependency array means this runs once on mount

  return null; // This component doesn't render anything visible
};

export default VoiceFlowChat;
