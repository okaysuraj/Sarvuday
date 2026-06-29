import React from 'react';
import styles from './ChatMessage.module.css';

const ChatMessage = ({ message }) => {
  const isUser = message.sender === 'user';

  return (
    <div className={`${styles.messageRow} ${isUser ? styles.userRow : styles.botRow}`}>
      <div className={`${styles.messageContent} ${isUser ? styles.userContent : styles.botContent}`}>
        <div className={styles.avatar}>
          {isUser ? 'U' : 'D'}
        </div>
        <div className={styles.bubble}>
          <p>{message.text}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
