// src/pages/chat/Chat.jsx
// Production chat page for user-counsellor messaging.

import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import styles from './Chat.module.css';
import ChatSidebar from '../../components/chat/ChatSidebar';
import ChatWindow from '../../components/chat/ChatWindow';

const Chat = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const preSelectedRoomId = location.state?.selectedRoomId;

  // Decode user_id from JWT
  const getUserId = () => {
    try {
      const token = localStorage.getItem('accessToken');
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.sub;
    } catch { return null; }
  };

  const currentUserId = getUserId();

  return (
    <div className={styles.fullPageContainer}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <button 
            onClick={() => {
              const userType = localStorage.getItem('userType');
              if (userType === 'counsellor') {
                navigate('/counsellor-dashboard/home');
              } else {
                navigate('/normal-user-dashboard/home');
              }
            }}
            className={styles.backBtn}
            title="Back to Dashboard"
          >
            <FaArrowLeft />
          </button>
          <h2>Messages</h2>
        </div>
        <ChatSidebar
          selectedRoom={selectedRoom}
          setSelectedRoom={setSelectedRoom}
          preSelectedRoomId={preSelectedRoomId}
        />
      </aside>

      <main className={styles.chatWindow}>
        {selectedRoom ? (
          <ChatWindow room={selectedRoom} currentUserId={currentUserId} />
        ) : (
          <div className={styles.noChatSelected}>
            <p>Select a conversation to start messaging</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Chat;
