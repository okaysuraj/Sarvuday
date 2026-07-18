import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
        <View className="w-10 h-10 rounded-full bg-secondary-fixed border-[1.5px] border-ink-black flex items-center justify-center mr-3 self-end shadow-[2px_2px_0px_0px_#1A1A1A]">
          {message.sender === 'ai' ? (
            <Ionicons name="hardware-chip" size={20} color="#1A1A1A" />
          ) : (
            <Ionicons name="medkit" size={20} color="#1A1A1A" />
          )}
        </View>
      )}
      
      <View 
        className={`max-w-[75%] px-4 py-3 rounded-2xl ${
          isUser 
            ? 'bg-primary border-[1.5px] border-ink-black rounded-br-sm shadow-[2px_2px_0px_0px_#1A1A1A]' 
            : 'bg-white border-[1.5px] border-ink-black rounded-bl-sm'
        }`}
      >
        <Text className={`font-body-md text-base ${isUser ? 'text-white' : 'text-ink-black'}`}>
          {message.text}
        </Text>
        {message.timestamp ? (
          <Text className={`font-label-md text-xs mt-1 text-right ${isUser ? 'text-primary-fixed-dim' : 'text-on-surface-variant'}`}>
            {message.timestamp}
          </Text>
        ) : null}
      </View>
    </View>
  );
};
