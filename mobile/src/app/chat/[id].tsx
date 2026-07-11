import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, FlatList, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { MessageBubble, MessageProps } from '../../components/chat/MessageBubble';
import { CrisisAlertModal } from '../../components/chat/CrisisAlertModal'; // Force TS reload
import { chatApi } from '../../api/chat';
import { useAuthStore } from '../../store/useAuthStore';
import { format, parseISO } from 'date-fns';

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { user } = useAuthStore();
  
  const isAi = id === 'ai';
  
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [inputText, setInputText] = useState('');
  const [isCrisisModalVisible, setCrisisModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionId, setSessionId] = useState<string | undefined>(undefined);
  
  const flatListRef = useRef<FlatList>(null);

  const fetchHistory = useCallback(async () => {
    setIsLoading(true);
    try {
      if (isAi) {
        // Fetch AI session history if we have a session. Since we might just start a new session, let's list sessions first.
        const sessions = await chatApi.getAiSessions();
        if (sessions && sessions.length > 0) {
          const currentSessionId = sessions[0].session_id || sessions[0]._id; // Adjust based on actual backend response
          setSessionId(currentSessionId);
          const history = await chatApi.getAiChatHistory(currentSessionId);
          const formattedMessages: MessageProps[] = history.map((msg: any, index: number) => ({
            id: index.toString(),
            text: msg.content,
            sender: msg.role === 'user' ? 'user' : 'ai',
            timestamp: '' // AI API might not return timestamp directly, handled below
          }));
          setMessages(formattedMessages);
        } else {
           setMessages([
            {
              id: 'initial',
              text: "Hello! I'm your AI companion. How are you feeling today?",
              sender: 'ai',
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]);
        }
      } else {
        // Normal chat history
        const historyResponse = await chatApi.getChatHistory(id as string);
        const formattedMessages: MessageProps[] = historyResponse.messages.map((msg: any) => ({
          id: msg.message_id,
          text: msg.content,
          sender: msg.sender_id === user?.user_id ? 'user' : 'therapist',
          timestamp: msg.created_at ? format(parseISO(msg.created_at), 'h:mm a') : ''
        }));
        setMessages(formattedMessages);
      }
    } catch (error) {
      console.error('Error fetching chat history:', error);
    } finally {
      setIsLoading(false);
    }
  }, [id, isAi, user?.user_id]);

  useEffect(() => {
    fetchHistory();
    // TODO: Connect to WebSocket here for real-time normal chat
  }, [fetchHistory]);

  const handleSend = async () => {
    if (!inputText.trim() || !user) return;

    const currentText = inputText.trim();
    setInputText('');
    
    const userMessage: MessageProps = {
      id: Date.now().toString(),
      text: currentText,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);

    try {
      if (isAi) {
        const response = await chatApi.sendAiMessage(currentText, sessionId);
        if (response.session_id && !sessionId) {
            setSessionId(response.session_id);
        }
        
        const aiMessage: MessageProps = {
          id: (Date.now() + 1).toString(),
          text: response.reply,
          sender: 'ai',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        setMessages(prev => [...prev, aiMessage]);
        
        if (response.is_crisis) {
            setCrisisModalVisible(true);
        }
      } else {
        await chatApi.sendMessageREST(id as string, user.user_id, currentText, user.user_type);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      // Revert optimistic update or show error indicator
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-surface">
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 border-b border-surface-variant bg-surface">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 justify-center">
          <Ionicons name="arrow-back" size={24} color="#1b1b20" />
        </TouchableOpacity>
        <View className="w-10 h-10 rounded-full bg-surface-container-highest items-center justify-center mr-3">
           <Ionicons name={isAi ? "sparkles" : "medical"} size={20} color={isAi ? "#002da5" : "#5a3039"} />
        </View>
        <View className="flex-1">
          <Text className="font-headline-md text-on-surface font-bold text-lg">
            {isAi ? 'AI Companion' : 'Chat'}
          </Text>
          <Text className="font-body-md text-on-surface-variant text-xs">
            {isAi ? 'Always active' : 'Connected'}
          </Text>
        </View>
        {isAi && (
          <TouchableOpacity onPress={() => router.push('/chat/insights')} className="w-10 h-10 justify-center items-end">
            <Ionicons name="bulb-outline" size={24} color="#002da5" />
          </TouchableOpacity>
        )}
      </View>

      {/* Messages */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
      >
        {isLoading ? (
          <ActivityIndicator size="large" color="#002da5" className="mt-8 flex-1" />
        ) : (
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <MessageBubble message={item} />}
            contentContainerStyle={{ padding: 16, paddingBottom: 24 }}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          />
        )}

        {/* Input Bar */}
        <View className="flex-row items-center px-4 py-3 border-t border-surface-variant bg-surface">
          <TouchableOpacity className="mr-3">
            <Ionicons name="add-circle-outline" size={28} color="#747687" />
          </TouchableOpacity>
          <TextInput
            className="flex-1 bg-surface-container-highest rounded-full px-4 py-2 font-body-md text-on-surface max-h-24"
            placeholder="Type a message..."
            placeholderTextColor="#747687"
            value={inputText}
            onChangeText={setInputText}
            multiline
          />
          <TouchableOpacity 
            onPress={handleSend}
            disabled={!inputText.trim()}
            className={`ml-3 w-10 h-10 rounded-full items-center justify-center ${inputText.trim() ? 'bg-primary' : 'bg-surface-variant'}`}
          >
            <Ionicons name="send" size={18} color={inputText.trim() ? "#ffffff" : "#747687"} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      <CrisisAlertModal 
        visible={isCrisisModalVisible} 
        onClose={() => setCrisisModalVisible(false)} 
      />
    </SafeAreaView>
  );
}
