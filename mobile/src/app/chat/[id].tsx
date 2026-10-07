import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { MessageBubble, MessageProps } from '../../components/chat/MessageBubble';
import { CrisisAlertModal } from '../../components/chat/CrisisAlertModal';
import { chatApi } from '../../api/chat';
import { useAuthStore } from '../../store/authStore';
import { format, parseISO } from 'date-fns';

export default function ChatScreen() {
  const { id, initialTopic } = useLocalSearchParams<{ id: string; initialTopic?: string }>();
  const router = useRouter();
  const { user } = useAuthStore();
  
  const isAi = id === 'ai' || id === 'ai-session';
  
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
        const sessions = await chatApi.getAiSessions();
        if (sessions && sessions.length > 0) {
          const currentSessionId = sessions[0].session_id || sessions[0]._id;
          setSessionId(currentSessionId);
          const history = await chatApi.getAiChatHistory(currentSessionId);
          const formattedMessages: MessageProps[] = history.map((msg: any, index: number) => ({
            id: index.toString(),
            text: msg.content,
            sender: msg.role === 'user' ? 'user' : 'ai',
            timestamp: '' 
          }));
          setMessages(formattedMessages);
        } else {
          setMessages([
            {
              id: 'initial',
              text: initialTopic 
                ? `Welcome to your session on ${initialTopic}. Take your time, breathe deeply, and tell me what is on your mind.`
                : "Hello. I am here to help you process your thoughts today. Take a moment, and share whatever is present for you.",
              sender: 'ai',
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]);
        }
      } else {
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
  }, [id, isAi, user?.user_id, initialTopic]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const handleSend = async () => {
    if (!inputText.trim()) return;

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
        // Fixed: correct argument order (sessionId, currentText)
        const response = await chatApi.sendAiMessage(sessionId, currentText);
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
      } else if (user) {
        await chatApi.sendMessageREST(id as string, user.user_id, currentText, user.user_type);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: MessageProps = {
        id: (Date.now() + 1).toString(),
        text: 'Unable to connect to the assistant. Please check your connection and try again.',
        sender: 'ai',
        timestamp: ''
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleQuickReply = (text: string) => {
    setInputText(text);
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      {/* Editorial Header */}
      <View className="flex-row items-center px-4 py-3.5 border-b border-outline bg-background">
        <TouchableOpacity 
          onPress={() => router.back()} 
          className="w-8 h-8 justify-center items-center border border-outline rounded-full bg-surface mr-3"
        >
          <Ionicons name="arrow-back" size={16} color="#18181B" />
        </TouchableOpacity>
        
        <View className="flex-1 flex-row items-center">
          <View className="w-8 h-8 rounded-full bg-secondary-container border border-outline items-center justify-center mr-2.5">
             <Ionicons name={isAi ? "sparkles-outline" : "medkit-outline"} size={14} color="#2E4B3E" />
          </View>
          <View>
            <Text className="text-on-surface font-semibold text-sm">
              {isAi ? 'Sarvuday AI' : 'Consultation'}
            </Text>
            <Text className="text-on-surface-variant text-[11px]">
              {isAi ? 'Continuous reflection' : 'Active session'}
            </Text>
          </View>
        </View>

        {isAi && (
          <TouchableOpacity 
            onPress={() => router.push('/chat/insights')} 
            className="w-8 h-8 justify-center items-center border border-outline rounded-full bg-surface"
          >
            <Ionicons name="bulb-outline" size={16} color="#18181B" />
          </TouchableOpacity>
        )}
      </View>

      {/* Messages Feed */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1 bg-background"
      >
        {isLoading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="small" color="#18181B" />
          </View>
        ) : (
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <MessageBubble message={item} />}
            contentContainerStyle={{ padding: 16, paddingBottom: 20 }}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          />
        )}

        {/* Input Area */}
        <View className="border-t border-outline bg-background pb-safe pt-2">
          
          {/* Quick Replies */}
          {isAi && (
            <FlatList 
              horizontal
              showsHorizontalScrollIndicator={false}
              className="px-4 pb-2"
              contentContainerStyle={{ gap: 6 }}
              data={[
                { label: 'Grounding exercise', icon: 'leaf-outline' },
                { label: 'Challenge this thought', icon: 'git-branch-outline' },
                { label: 'Summarize our conversation', icon: 'document-text-outline' },
              ]}
              keyExtractor={item => item.label}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  onPress={() => handleQuickReply(item.label)}
                  className="px-3 py-1.5 rounded-full border border-outline bg-surface flex-row items-center gap-1.5"
                >
                  <Ionicons name={item.icon as any} size={12} color="#18181B" />
                  <Text className="text-on-surface text-xs font-medium">{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          )}

          {/* Text Input */}
          <View className="flex-row items-end px-4 py-2 gap-2">
            <View className="flex-1">
              <TextInput
                className="w-full bg-surface border border-outline rounded-xl px-3.5 py-2.5 text-on-surface text-sm min-h-[42px] max-h-28"
                placeholder="Share what is on your mind..."
                placeholderTextColor="#8E8D9A"
                value={inputText}
                onChangeText={setInputText}
                multiline
              />
            </View>
            <TouchableOpacity 
              onPress={handleSend}
              disabled={!inputText.trim()}
              className={`w-10 h-10 rounded-xl items-center justify-center ${inputText.trim() ? 'bg-primary' : 'bg-surface-container opacity-50'}`}
            >
              <Ionicons name="arrow-up" size={18} color={inputText.trim() ? "#FFFFFF" : "#8E8D9A"} />
            </TouchableOpacity>
          </View>

        </View>
      </KeyboardAvoidingView>

      <CrisisAlertModal 
        visible={isCrisisModalVisible} 
        onClose={() => setCrisisModalVisible(false)} 
      />
    </SafeAreaView>
  );
}
