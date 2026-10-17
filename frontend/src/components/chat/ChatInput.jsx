// src/components/chat/ChatInput.jsx
// Production chat input with typing indicator support.

import { useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import styles from './ChatInput.module.css';

const ChatInput = ({ onSend, onTyping }) => {
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);

  const handleSubmit = async () => {
    if (!input.trim() || sending) return;
    setSending(true);
    try {
      if ((await onSend(input.trim())) !== false) setInput('');
    } finally {
      setSending(false);
    }
  };

  const handleChange = (e) => {
    setInput(e.target.value);
    if (onTyping) onTyping();
  };

  return (
    <div className={styles.chatInputContainer}>
      <div className={styles.chatInputWrapper}>
        <input
          type="text"
          className={styles.inputField}
          placeholder="Type your message..."
          aria-label="Message"
          maxLength={10000}
          value={input}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSubmit();
            }
          }}
        />
        <button
          className={styles.sendButton}
          onClick={handleSubmit}
          disabled={sending || !input.trim()}
          aria-label="Send message"
        >
          <FaArrowUp />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
