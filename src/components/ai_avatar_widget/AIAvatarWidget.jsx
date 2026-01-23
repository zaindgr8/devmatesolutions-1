import React, { useState } from 'react';
import LiveKitWidget from './ai_avatar/LiveKitWidget';
import styles from './ai_avatar/LiveKitWidget.module.css';

const AIAvatarWidget = () => {
  const [showSupport, setShowSupport] = useState(false);

  return (
    <>
      {!showSupport && (
        <div 
          className={styles.aiAvatarWidgetButton} 
          onClick={() => setShowSupport(true)}
          title="Talk to AI Assistant"
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Video camera icon only */}
            <path d="M17 10.5V7C17 6.45 16.55 6 16 6H4C3.45 6 3 6.45 3 7V17C3 17.55 3.45 18 4 18H16C16.55 18 17 17.55 17 17V13.5L21 17.5V6.5L17 10.5Z" fill="currentColor"/>
          </svg>
        </div>
      )}
      {showSupport && <LiveKitWidget setShowSupport={setShowSupport} />}
    </>
  );
};

export default AIAvatarWidget;
