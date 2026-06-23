import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import BASE_URL from "../../config/apiConfig";
import styles from './AIChat.module.css';
import { toast } from 'react-toastify';
import { FaPlus, FaTrash, FaMicrophone, FaMicrophoneSlash, FaPaperPlane, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AIChat = () => {
  const [sessions, setSessions] = useState([]);
  const [activeSessionId, setActiveSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [matchedCounsellors, setMatchedCounsellors] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const navigate = useNavigate();
  
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  useEffect(() => {
    fetchSessions();
    
    // Initialize SpeechRecognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setInput(currentTranscript);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  useEffect(() => {
    if (activeSessionId) {
      fetchChatHistory(activeSessionId);
    } else {
      setMessages([{ role: 'assistant', content: 'Hi there! I am SarvUday AI, your cognitive behavioral therapy companion. How are you feeling today?' }]);
    }
  }, [activeSessionId]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      if (recognitionRef.current) {
        recognitionRef.current.start();
        setIsListening(true);
      } else {
        toast.error("Voice typing is not supported in this browser.");
      }
    }
  };

  const fetchSessions = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const res = await axios.get(`${BASE_URL}/ai/sessions`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSessions(res.data);
    } catch (err) {
      console.error("Failed to fetch sessions", err);
    }
  };

  const fetchChatHistory = async (sessionId) => {
    try {
      const token = localStorage.getItem('accessToken');
      const res = await axios.get(`${BASE_URL}/ai/chat/${sessionId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.length === 0) {
        setMessages([{ role: 'assistant', content: 'Hi there! I am SarvUday AI. How are you feeling today?' }]);
      } else {
        setMessages(res.data);
      }
    } catch (err) {
      console.error("Failed to fetch history", err);
    }
  };

  const createNewChat = async () => {
    setActiveSessionId(null);
    setMessages([{ role: 'assistant', content: 'Hi there! I am SarvUday AI, your cognitive behavioral therapy companion. How are you feeling today?' }]);
  };

  const deleteSession = async (sessionId, e) => {
    e.stopPropagation();
    try {
      const token = localStorage.getItem('accessToken');
      await axios.delete(`${BASE_URL}/ai/sessions/${sessionId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (activeSessionId === sessionId) {
        setActiveSessionId(null);
      }
      fetchSessions();
      toast.success("Chat deleted");
    } catch (err) {
      toast.error("Failed to delete chat");
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    if (isListening) {
        recognitionRef.current?.stop();
        setIsListening(false);
    }

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setLoading(true);

    try {
      const token = localStorage.getItem('accessToken');
      const payload = { message: userMessage };
      if (activeSessionId) {
        payload.session_id = activeSessionId;
      }

      const res = await axios.post(`${BASE_URL}/ai/chat`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const aiReply = res.data.reply;
      const isCrisis = res.data.is_crisis;
      const returnedSessionId = res.data.session_id;

      setMessages(prev => [...prev, { role: 'assistant', content: aiReply }]);
      
      if (!activeSessionId) {
        setActiveSessionId(returnedSessionId);
        fetchSessions();
      }

      if (isCrisis) {
        toast.error("Crisis Alert: We detected high distress. Please consider speaking to a professional.");
        fetchMatches();
      }
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I couldn't connect to the AI model right now." }]);
    } finally {
      setLoading(false);
    }
  };

  const fetchMatches = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const res = await axios.get(`${BASE_URL}/ai/match-counsellor`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMatchedCounsellors(res.data.matches);
      toast.info("We've matched you with some counsellors who can help.");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.layoutContainer}>
      {/* Sidebar for Sessions */}
      <div className={styles.sidebar}>
        <button className={styles.newChatBtn} onClick={createNewChat}>
          <FaPlus /> New Chat
        </button>
        <div className={styles.sessionList}>
          {sessions.map(sess => (
            <div 
              key={sess.session_id} 
              className={`${styles.sessionItem} ${activeSessionId === sess.session_id ? styles.activeSession : ''}`}
              onClick={() => setActiveSessionId(sess.session_id)}
            >
              <div className={styles.sessionTitle}>
                {sess.title || "New Chat"}
              </div>
              <button className={styles.deleteBtn} onClick={(e) => deleteSession(sess.session_id, e)}>
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className={styles.mainArea}>
        <div className={styles.header}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <button 
              onClick={() => navigate('/normal-user-dashboard/home')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', fontSize: '20px', color: 'var(--color-on-surface)' }}
              title="Back to Dashboard"
            >
              <FaArrowLeft />
            </button>
            <h2>AI CBT Companion</h2>
          </div>
          <button className={styles.matchBtn} onClick={fetchMatches}>Find Therapist For Me</button>
        </div>

        <div className={styles.chatContent}>
          {messages.map((msg, idx) => (
            <div key={idx} className={`${styles.messageWrapper} ${msg.role === 'user' ? styles.userWrapper : styles.aiWrapper}`}>
              <div className={styles.messageContainer}>
                <div className={`${styles.avatar} ${msg.role === 'user' ? styles.userAvatar : styles.aiAvatar}`}>
                  {msg.role === 'user' ? 'U' : 'AI'}
                </div>
                <div className={styles.messageBubble}>
                  {msg.content}
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div className={`${styles.messageWrapper} ${styles.aiWrapper}`}>
              <div className={styles.messageContainer}>
                <div className={`${styles.avatar} ${styles.aiAvatar}`}>AI</div>
                <div className={styles.loadingBubble}>
                  Thinking...
                </div>
              </div>
            </div>
          )}
          {/* Invisible div to scroll to */}
          <div ref={messagesEndRef} style={{ height: '40px' }} />
        </div>

        <div className={styles.inputAreaContainer}>
          <div className={styles.inputBox}>
            <button 
              className={`${styles.iconBtn} ${isListening ? styles.recording : ''}`} 
              onClick={toggleListening}
              title={isListening ? "Stop listening" : "Start voice typing"}
            >
              {isListening ? <FaMicrophone /> : <FaMicrophoneSlash />}
            </button>
            <input 
              type="text" 
              placeholder="Send a message to SarvUday AI..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if(e.key === 'Enter') {
                  e.preventDefault();
                  sendMessage();
                }
              }}
            />
            <button className={styles.sendBtn} onClick={sendMessage} disabled={loading || !input.trim()}>
                <FaPaperPlane />
            </button>
          </div>
        </div>
      </div>

      {/* Matched Counsellors Sidebar (conditional) */}
      {matchedCounsellors.length > 0 && (
        <div className={styles.matchesContainer}>
          <h4>Recommended Counsellors</h4>
          <div>
            {matchedCounsellors.map((c, i) => (
              <div key={i} className={styles.matchCard}>
                <strong>{c.name}</strong>
                <p>{c.specialization}</p>
                <span className={styles.matchScore}>{c.match_score} Match</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AIChat;

