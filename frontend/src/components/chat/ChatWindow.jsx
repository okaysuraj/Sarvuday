// src/components/chat/ChatWindow.jsx
// Production WebRTC-based real-time chat window.

import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import styles from './ChatWindow.module.css';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import BASE_URL from '../../config/apiConfig';
import { FaPhone, FaVideo, FaEllipsisV, FaCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';

const WS_BASE = BASE_URL.replace('http', 'ws').replace('/api/v1', '');

const ChatWindow = ({ room, currentUserId }) => {
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState(null);
  
  const wsRef = useRef(null);
  const pcRef = useRef(null);
  const dataChannelRef = useRef(null);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const handleReceiveMessage = useCallback((event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'message') {
          setMessages(prev => {
              if (prev.some(m => m.message_id === data.message.message_id)) return prev;
              return [...prev, data.message];
          });
      } else if (data.type === 'typing') {
          setTypingUser(data.user_id);
          setIsTyping(data.is_typing);
          if (data.is_typing) {
              clearTimeout(typingTimeoutRef.current);
              typingTimeoutRef.current = setTimeout(() => setIsTyping(false), 2000);
          }
      }
  }, []);

  const sendReadReceipts = useCallback((msgs) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
        setMessages(prev => {
            const currentMsgs = msgs || prev;
            const unreads = currentMsgs.filter(m => m.sender_id !== currentUserId && !m.is_read);
            if (unreads.length === 0) return prev;
            
            unreads.forEach(m => wsRef.current.send(JSON.stringify({ type: 'read', message_id: m.message_id })));
            
            return prev.map(m => unreads.some(u => u.message_id === m.message_id) ? { ...m, is_read: true } : m);
        });
    }
  }, [currentUserId]);

  useEffect(() => {
    sendReadReceipts(messages);
  }, [messages, sendReadReceipts]);

  const initializePeerConnection = useCallback(() => {
    if (pcRef.current) return pcRef.current;
    
    const pc = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
    });
    
    pc.onicecandidate = (event) => {
        if (event.candidate && wsRef.current?.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify({
                type: 'ice_candidate',
                payload: event.candidate
            }));
        }
    };
    
    pc.ondatachannel = (event) => {
        const receiveChannel = event.channel;
        receiveChannel.onmessage = handleReceiveMessage;
        dataChannelRef.current = receiveChannel;
    };
    
    pcRef.current = pc;
    return pc;
  }, [handleReceiveMessage]);

  const initiateCall = useCallback(async () => {
      const pc = initializePeerConnection();
      if (dataChannelRef.current) return; // already initiated

      const sendChannel = pc.createDataChannel('text-chat');
      sendChannel.onmessage = handleReceiveMessage;
      dataChannelRef.current = sendChannel;
      
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      
      if (wsRef.current?.readyState === WebSocket.OPEN) {
          wsRef.current.send(JSON.stringify({ type: 'sdp_offer', payload: offer }));
      }
  }, [initializePeerConnection, handleReceiveMessage]);

  // Connect WebSocket & WebRTC Signaling
  useEffect(() => {
    if (!room?.room_id) return;

    const token = localStorage.getItem('accessToken');

    // Fetch message history first
    fetch(`${BASE_URL}/chat/rooms/${room.room_id}/messages?limit=100`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setMessages(data.messages || []))
      .catch(console.error);

    // Open WebSocket for signaling
    const ws = new WebSocket(`${WS_BASE}/ws/chat/${room.room_id}?token=${token}`);
    wsRef.current = ws;

    ws.onopen = () => {
        sendReadReceipts();
    };

    ws.onmessage = async (event) => {
      const data = JSON.parse(event.data);

      switch (data.type) {
        case 'online':
          setOnlineUsers(data.users || []);
          // WebRTC initiator logic: Alphabetically smaller user ID initiates
          const otherUser = data.users.find(u => u.user_id !== currentUserId);
          if (otherUser && currentUserId < otherUser.user_id) {
              initiateCall();
          }
          break;
        case 'sdp_offer':
          const pc = initializePeerConnection();
          await pc.setRemoteDescription(new RTCSessionDescription(data.payload));
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          ws.send(JSON.stringify({ type: 'sdp_answer', payload: answer }));
          break;
        case 'sdp_answer':
          if (pcRef.current) {
              await pcRef.current.setRemoteDescription(new RTCSessionDescription(data.payload));
          }
          break;
        case 'ice_candidate':
          if (pcRef.current && pcRef.current.remoteDescription) {
              try {
                await pcRef.current.addIceCandidate(new RTCIceCandidate(data.payload));
              } catch(e) { console.error("Error adding ice candidate", e); }
          }
          break;
        case 'message':
          // Catch old WS messages just in case
          setMessages(prev => {
              if (prev.some(m => m.message_id === data.message_id)) return prev;
              return [...prev, data];
          });
          break;
        case 'typing':
          if (data.user_id !== currentUserId) {
            setTypingUser(data.user_id);
            setIsTyping(data.is_typing);
          }
          break;
        case 'read_receipt':
          setMessages(prev => prev.map(m =>
            m.message_id === data.message_id ? { ...m, is_read: true } : m
          ));
          break;
      }
    };

    ws.onerror = (err) => console.error('[WS Error]', err);
    ws.onclose = () => console.log('[WS] Disconnected from', room.room_id);

    return () => {
      ws.close();
      if (pcRef.current) {
          pcRef.current.close();
          pcRef.current = null;
      }
    };
  }, [room?.room_id, currentUserId, initializePeerConnection, initiateCall]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = useCallback(async (text) => {
    const userType = localStorage.getItem('userType');
    const token = localStorage.getItem('accessToken');
    
    // 1. Send via WebRTC if possible
    if (dataChannelRef.current?.readyState === 'open') {
        const tempMsg = {
            message_id: Date.now().toString(),
            sender_id: currentUserId,
            sender_type: userType,
            content: text,
            created_at: new Date().toISOString(),
            is_read: false
        };
        setMessages(prev => [...prev, tempMsg]);

        dataChannelRef.current.send(JSON.stringify({
            type: 'message',
            message: tempMsg
        }));

        // Fire & forget REST to persist
        axios.post(`${BASE_URL}/chat/rooms/${room.room_id}/messages?user_id=${currentUserId}`, {
            message_id: tempMsg.message_id,
            content: text,
            sender_type: userType,
            message_type: 'text'
        }, { headers: { Authorization: `Bearer ${token}` } }).catch(console.error);

    } else {
        // Fallback: Send only via WebSocket, which persists and broadcasts it back to us
        if (wsRef.current?.readyState === WebSocket.OPEN) {
             wsRef.current.send(JSON.stringify({ type: 'message', content: text }));
        } else {
             toast.error("Not connected to chat server");
        }
    }
  }, [room, currentUserId]);

  const handleTyping = useCallback(() => {
    const typingData = { type: 'typing', user_id: currentUserId, is_typing: true };
    if (dataChannelRef.current?.readyState === 'open') {
        dataChannelRef.current.send(JSON.stringify(typingData));
    } else if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify(typingData));
    }

    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      const stopTypingData = { type: 'typing', user_id: currentUserId, is_typing: false };
      if (dataChannelRef.current?.readyState === 'open') {
          dataChannelRef.current.send(JSON.stringify(stopTypingData));
      } else if (wsRef.current?.readyState === WebSocket.OPEN) {
          wsRef.current.send(JSON.stringify(stopTypingData));
      }
    }, 2000);
  }, [currentUserId]);

  const otherUser = room?.other_user_name || room?.room_id?.split('_').pop() || 'Counsellor';
  const isOtherOnline = onlineUsers.some(u => u.user_id !== currentUserId);

  return (
    <div className={styles.chatWindowContainer}>
      <header className={styles.chatHeader}>
        <div className={styles.headerInfo}>
          <div className={styles.botAvatar}>
            {room?.other_user_pic ? (
              <img src={room.other_user_pic} alt={otherUser} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
            ) : (
              <span>👤</span>
            )}
          </div>
          <div className={styles.headerText}>
            <h2>{otherUser}</h2>
            <span className={styles.activeStatus}>
              <FaCircle style={{ color: isOtherOnline ? '#28a745' : '#999', fontSize: 8, marginRight: 5 }} />
              {isOtherOnline ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className={styles.iconBtn} title="Audio Call"><FaPhone /></button>
          <button className={styles.iconBtn} title="Video Call"><FaVideo /></button>
          <button className={styles.iconBtn}><FaEllipsisV /></button>
        </div>
      </header>

      {isTyping && typingUser && (
        <div className={styles.warningBanner} style={{ backgroundColor: 'var(--color-surface-container-low)', padding: '8px 24px', borderBottom: 'var(--border-width) solid var(--border-color)' }}>
          <span style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)', fontStyle: 'italic', fontWeight: 600 }}>typing...</span>
        </div>
      )}

      <div className={styles.chatMessages}>
        {messages.map((msg, idx) => (
          <ChatMessage
            key={msg.message_id || idx}
            message={{
              sender: msg.sender_id === currentUserId ? 'user' : 'other',
              text: msg.content,
              timestamp: msg.created_at,
              is_read: msg.is_read
            }}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput onSend={handleSend} onTyping={handleTyping} />
    </div>
  );
};

export default ChatWindow;
