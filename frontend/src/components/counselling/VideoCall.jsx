import React, { useEffect, useRef, useState } from 'react';
import DailyIframe from '@daily-co/daily-js';
import styles from './VideoCall.module.css';
import { FaPhoneSlash } from 'react-icons/fa';

const VideoCall = ({ url, token, onLeave }) => {
  const callFrameRef = useRef(null);
  const [callObject, setCallObject] = useState(null);

  useEffect(() => {
    if (!callFrameRef.current) return;

    // Initialize DailyIframe
    const daily = DailyIframe.createFrame(callFrameRef.current, {
      showLeaveButton: true,
      iframeStyle: {
        width: '100%',
        height: '100%',
        border: '0',
        borderRadius: '12px',
        backgroundColor: '#121212',
      },
    });

    setCallObject(daily);

    // Join the call
    daily.join({ url, token });

    // Handle left-meeting event
    daily.on('left-meeting', () => {
      daily.destroy();
      if (onLeave) onLeave();
    });

    return () => {
      daily.destroy();
    };
  }, [url, token, onLeave]);

  return (
    <div className={styles.videoCallContainer}>
      <div className={styles.callFrame} ref={callFrameRef}></div>
      <div className={styles.controlsOverlay}>
        <button className={styles.leaveButton} onClick={() => callObject?.leave()}>
          <FaPhoneSlash /> Leave
        </button>
      </div>
    </div>
  );
};

export default VideoCall;
