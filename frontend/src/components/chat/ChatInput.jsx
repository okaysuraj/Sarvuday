// src/components/chat/ChatInput.jsx
// Production chat input with typing indicator support.

import React, { useState } from 'react';
import styles from './ChatInput.module.css';
import { FaPaperclip, FaSmile, FaArrowUp } from 'react-icons/fa';

const ChatInput = ({ onSend, onTyping }) => {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    if (!input.trim()) return;
    onSend(input.trim());
    setInput('');
  };

  const handleChange = (e) => {
    setInput(e.target.value);
    if (onTyping) onTyping();
  };

  return (
    <div className={styles.chatInputContainer}>
      <div className={styles.chatInputWrapper}>
        <button className={styles.iconButton}><FaPaperclip /></button>
        <input
          type="text"
          className={styles.inputField}
          placeholder="Type your message..."
          value={input}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSubmit();
            }
          }}
        />
        <button className={styles.iconButton}><FaSmile /></button>
        <button className={styles.sendButton} onClick={handleSubmit}>
          <FaArrowUp />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
