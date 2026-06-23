// src/components/chat/ChatSidebar.jsx
// Production chat sidebar listing user-counsellor conversations.

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './ChatSidebar.module.css';
import BASE_URL from '../../config/apiConfig';

const ChatSidebar = ({ selectedRoom, setSelectedRoom, preSelectedRoomId }) => {
  const [rooms, setRooms] = useState([]);
  const token = localStorage.getItem('accessToken');

  // Decode user_id from JWT
  const getUserId = () => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.sub;
    } catch { return null; }
  };

  const userId = getUserId();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/chat/rooms?user_id=${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const fetchedRooms = res.data.rooms || [];
        setRooms(fetchedRooms);
        if (preSelectedRoomId && !selectedRoom) {
          const roomToSelect = fetchedRooms.find(r => r.room_id === preSelectedRoomId);
          if (roomToSelect) {
            setSelectedRoom(roomToSelect);
          }
        }
      } catch (err) {
        console.error('Error fetching chat rooms:', err);
      }
    };

    if (userId) fetchRooms();
    // Poll for new rooms every 30s
    const interval = setInterval(fetchRooms, 30000);
    return () => clearInterval(interval);
  }, [userId, token]);

  return (
    <>
      <ul className={styles.chatList}>
        {rooms.length === 0 && (
          <li className={styles.chatItem} style={{ opacity: 0.5, cursor: 'default' }}>
            No conversations yet
          </li>
        )}
        {rooms.map(room => (
          <li
            key={room.room_id}
            className={`${styles.chatItem} ${selectedRoom?.room_id === room.room_id ? styles.active : ''}`}
            onClick={() => {
              setRooms(prev => prev.map(r => r.room_id === room.room_id ? {...r, unread_count: 0} : r));
              setSelectedRoom(room);
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <div>
                <strong>{room.other_user_name || room.room_id.replace('chat_', '').replace(userId, '').replace('_', '')}</strong>
                <p style={{ fontSize: 12, color: '#888', margin: '4px 0 0' }}>
                  {room.last_message || 'Start a conversation'}
                </p>
              </div>
              {room.unread_count > 0 && (
                <span style={{
                  background: '#003fdd', color: 'white', borderRadius: '50%',
                  width: 20, height: 20, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: 11, fontWeight: 'bold', flexShrink: 0
                }}>
                  {room.unread_count}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ChatSidebar;
