import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { Text, View } from 'react-native';

export interface MessageProps {
  id: string;
  text: string;
  sender: 'user' | 'ai' | 'therapist';
  timestamp: string;
}

export const MessageBubble: React.FC<{ message: MessageProps }> = ({ message }) => {
  const isUser = message.sender === 'user';

  return (
    <View className={`w-full flex-row ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
      {!isUser && (
        <View className="w-8 h-8 rounded-full bg-secondary-container border border-outline flex items-center justify-center mr-2.5 self-end">
          {message.sender === 'ai' ? (
            <Ionicons name="sparkles-outline" size={14} color="#2E4B3E" />
          ) : (
            <Ionicons name="medkit-outline" size={14} color="#204165" />
          )}
        </View>
      )}

      <View
        className={`max-w-[78%] px-4 py-3 rounded-2xl ${
          isUser ? 'bg-primary rounded-br-sm' : 'bg-surface border border-outline rounded-bl-sm'
        }`}
      >
        <Text className={`text-sm leading-relaxed ${isUser ? 'text-white' : 'text-on-surface'}`}>
          {message.text}
        </Text>
        {message.timestamp ? (
          <Text
            className={`text-[10px] mt-1 text-right ${isUser ? 'text-white/60' : 'text-on-surface-variant'}`}
          >
            {message.timestamp}
          </Text>
        ) : null}
      </View>
    </View>
  );
};
