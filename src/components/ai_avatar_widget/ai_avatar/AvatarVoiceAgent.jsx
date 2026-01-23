import {
  useVoiceAssistant,
  BarVisualizer,
  VoiceAssistantControlBar,
  useTrackTranscription,
  useLocalParticipant,
  useRemoteParticipants,
} from "@livekit/components-react";
import { Track } from "livekit-client";
import { useEffect, useState, useMemo } from "react";
import { useTracks, VideoTrack } from '@livekit/components-react';
import styles from "./AvatarVoiceAgent.module.css";

const Message = ({ type, text }) => {
  return <div className={styles.message}>
    <strong className={type === "agent" ? styles.messageAgent : styles.messageUser}>
      {type === "agent" ? "Agent: " : "You: "}
    </strong>
    <span className={styles.messageText}>{text}</span>
  </div>;
};

const AvatarVoiceAgent = () => {
  const { state, audioTrack, agentTranscriptions } = useVoiceAssistant();
  const { localParticipant } = useLocalParticipant();
  const remoteParticipants = useRemoteParticipants();
  
  const { segments: userTranscriptions } = useTrackTranscription({
    publication: localParticipant?.microphoneTrack,
    source: Track.Source.Microphone,
    participant: localParticipant,
  });

  // Automatically track all remote camera feeds
  const trackRefs = useTracks([Track.Source.Camera]);
  
  const agentVideoTrack = useMemo(() => {
    // The agent is any participant that isn't us and is publishing video
    return trackRefs.find((trackRef) => 
      trackRef.participant.identity !== localParticipant?.identity
    );
  }, [trackRefs, localParticipant]);

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const allMessages = [
      ...(agentTranscriptions?.map((t) => ({ ...t, type: "agent" })) ?? []),
      ...(userTranscriptions?.map((t) => ({ ...t, type: "user" })) ?? []),
    ].sort((a, b) => a.firstReceivedTime - b.firstReceivedTime);
    setMessages(allMessages);
  }, [agentTranscriptions, userTranscriptions]);

  return (
    <div className={styles.voiceAssistantContainer}>
      <div className={styles.visualizerContainer}>
        <BarVisualizer state={state} barCount={5} trackRef={audioTrack} />
      </div>
      <div className={styles.videoContainer}>
        {agentVideoTrack ? (
          <VideoTrack trackRef={agentVideoTrack} className={styles.agentVideo} />
        ) : (
          <div className={styles.waitingMessage}>
            {remoteParticipants.length > 0 ? (
              <>
                <div className={styles.spinner}></div>
                <p>Initializing Video...</p>
              </>
            ) : (
              <p>Calling the Concierge...</p>
            )}
          </div>
        )}
      </div>
      <div className={styles.controlSection}>
        <VoiceAssistantControlBar />
      </div>
      <div className={styles.conversation}>
        {messages.length === 0 && <p className={styles.emptyConversation}>Start speaking to chat with Freya...</p>}
        {messages.map((msg, i) => (
          <Message key={i} type={msg.type} text={msg.text} />
        ))}
      </div>
    </div>
  );
};

export default AvatarVoiceAgent;
