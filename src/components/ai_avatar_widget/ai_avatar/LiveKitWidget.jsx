import { useState, useCallback, useEffect } from "react";
import { LiveKitRoom, RoomAudioRenderer } from "@livekit/components-react";
import "@livekit/components-styles";
import AvatarVoiceAgent from "./AvatarVoiceAgent";
import styles from "./LiveKitWidget.module.css";

const LiveKitWidget = ({ setShowSupport }) => {
  const [token, setToken] = useState(null);
  const [isConnecting, setIsConnecting] = useState(true);

  const getToken = useCallback(async () => {
    try {
      const livekitUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;
      console.log("LiveKit Config - URL:", livekitUrl);
      
      if (!livekitUrl) {
        console.error("CRITICAL: NEXT_PUBLIC_LIVEKIT_URL is not defined in .env.local");
      }

      console.log("Fetching token from API...");
      const response = await fetch(
        `/api/getToken?name=${encodeURIComponent("User")}`
      );
      
      if (!response.ok) {
        throw new Error(`Failed to fetch token: ${response.statusText}`);
      }
      
      const token = await response.text();
      setToken(token);
      setIsConnecting(false);
    } catch (error) {
      console.error("Token Error:", error);
      setIsConnecting(false);
    }
  }, []);

  useEffect(() => {
    getToken();
  }, [getToken]);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.supportRoom}>
          {isConnecting ? (
            <div className={styles.connectingStatus}>
              <h2>Getting ready to help you...</h2>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={() => setShowSupport(false)}
              >
                Cancel
              </button>
            </div>
          ) : token ? (
            <LiveKitRoom
              serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
              token={token}
              connect={true}
              video={false} // We don't publish our own camera
              audio={true}  // But we publish our mic
              onDisconnected={() => {
                setShowSupport(false);
                setIsConnecting(true);
              }}
            >
              <div className={styles.supportHeader}>
                <h3>DevMate AI Assistant</h3>
                <button className={styles.closeButton} onClick={() => setShowSupport(false)}>×</button>
              </div>
              <RoomAudioRenderer />
              <AvatarVoiceAgent />
            </LiveKitRoom>
          ) : (
            <div className={styles.errorStatus}>
              <h2>Sorry, Not Available Right Now!</h2>
              <button className={styles.cancelButton} onClick={() => setShowSupport(false)}>Close</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveKitWidget;
