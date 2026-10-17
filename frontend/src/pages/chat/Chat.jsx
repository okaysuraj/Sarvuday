import { dashboardPath, useSession } from '../../utils/session';
// src/pages/chat/Chat.jsx
// Production chat page for user-counsellor messaging.

import { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import ChatSidebar from '../../components/chat/ChatSidebar';
import ChatWindow from '../../components/chat/ChatWindow';
import styles from './Chat.module.css';

const Chat = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const preSelectedRoomId = location.state?.selectedRoomId;

  const session = useSession();
  const currentUserId = session?.userId;

  return (
    <div className={styles.fullPageContainer}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <button
            onClick={() => navigate(dashboardPath(session?.userType))}
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
