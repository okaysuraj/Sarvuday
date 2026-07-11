import React from 'react';
import { View, Text } from 'react-native';

export interface MessageProps {
  id: string;
  text: string;
  sender: 'user' | 'ai' | 'therapist';
  timestamp: string;
}

export const MessageBubble: React.FC<{ message: MessageProps }> = ({ message }) => {
  const isUser = message.sender === 'user';
  
  return (
    <View className={`w-full flex-row ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      {!isUser && (
        <View className="w-8 h-8 rounded-full bg-surface-variant items-center justify-center mr-2 self-end">
          <Text className="text-xs">{message.sender === 'ai' ? '🤖' : '👩‍⚕️'}</Text>
        </View>
      )}
      
      <View 
        className={`max-w-[75%] px-4 py-3 rounded-2xl ${
          isUser 
            ? 'bg-primary rounded-br-sm' 
            : 'bg-surface-container-highest border border-surface-variant rounded-bl-sm'
        }`}
      >
        <Text className={`font-body-md text-base ${isUser ? 'text-on-primary' : 'text-on-surface'}`}>
          {message.text}
        </Text>
        <Text className={`font-label-md text-xs mt-1 text-right ${isUser ? 'text-primary-fixed-dim' : 'text-on-surface-variant'}`}>
          {message.timestamp}
        </Text>
      </View>
    </View>
  );
};
