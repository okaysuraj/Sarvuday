import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, FlatList, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { MessageBubble, MessageProps } from '../../components/chat/MessageBubble';
import { CrisisAlertModal } from '../../components/chat/CrisisAlertModal';
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
              text: "Good morning! I'm here to help you process your thoughts today. How are you feeling right now?",
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
  }, [id, isAi, user?.user_id]);

  useEffect(() => {
    fetchHistory();
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
    }
  };

  const handleQuickReply = (text: string) => {
    setInputText(text);
  };

  return (
    <SafeAreaView className="flex-1 bg-cream-bg">
      {/* Header */}
      <View className="flex-row items-center px-6 py-4 border-b-[1.5px] border-ink-black bg-cream-bg">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 justify-center items-center border-[1.5px] border-ink-black rounded-full shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none bg-white mr-4">
          <Ionicons name="arrow-back" size={20} color="#1A1A1A" />
        </TouchableOpacity>
        
        <View className="flex-1 flex-row items-center">
          <View className="w-10 h-10 rounded-full bg-accent-sage border-[1.5px] border-ink-black items-center justify-center mr-3 overflow-hidden shadow-[2px_2px_0px_0px_#1A1A1A]">
             <Ionicons name={isAi ? "hardware-chip" : "medical"} size={20} color="#1A1A1A" />
          </View>
          <View>
            <Text className="font-headline-md text-ink-black font-bold text-lg uppercase tracking-tighter">
              {isAi ? 'MindEase AI' : 'Chat'}
            </Text>
            <Text className="font-body-md text-on-surface-variant text-xs">
              {isAi ? 'Always active' : 'Connected'}
            </Text>
          </View>
        </View>

        {isAi && (
          <TouchableOpacity onPress={() => router.push('/chat/insights')} className="w-10 h-10 justify-center items-center border-[1.5px] border-ink-black rounded-full bg-secondary-fixed shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
            <Ionicons name="bulb" size={20} color="#1A1A1A" />
          </TouchableOpacity>
        )}
      </View>

      {/* Messages */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1 bg-cream-bg"
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

        {/* Input Area */}
        <View className="border-t-[1.5px] border-ink-black bg-cream-bg pb-safe pt-2">
          
          {/* Quick Replies */}
          {isAi && (
            <FlatList 
              horizontal
              showsHorizontalScrollIndicator={false}
              className="px-4 pb-2"
              contentContainerStyle={{ gap: 8 }}
              data={[
                { label: 'Grounding Exercise', icon: 'leaf', color: 'bg-accent-sage' },
                { label: 'Talk it out', icon: 'chatbubbles', color: 'bg-accent-pink' },
                { label: 'Journal this', icon: 'book', color: 'bg-surface-container' },
              ]}
              keyExtractor={item => item.label}
              renderItem={({item}) => (
                <TouchableOpacity 
                  onPress={() => handleQuickReply(item.label)}
                  className={`px-4 py-2 rounded-full border-[1.5px] border-ink-black flex-row items-center gap-1 shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${item.color}`}
                >
                  <Ionicons name={item.icon as any} size={16} color="#1A1A1A" />
                  <Text className="font-label-bold text-ink-black text-xs font-bold">{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          )}

          {/* Text Input */}
          <View className="flex-row items-end px-4 py-3 gap-2">
            <View className="flex-1 relative justify-center">
              <TextInput
                className="w-full bg-surface-container border-[1.5px] border-ink-black rounded-xl px-4 py-3 font-body-md text-ink-black min-h-[50px] max-h-32 focus:border-primary focus:shadow-[2px_2px_0px_0px_#1A1A1A]"
                placeholder="Type a message..."
                placeholderTextColor="#747687"
                value={inputText}
                onChangeText={setInputText}
                multiline
              />
            </View>
            <TouchableOpacity 
              onPress={handleSend}
              disabled={!inputText.trim()}
              className={`w-[50px] h-[50px] shrink-0 rounded-xl border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] flex items-center justify-center transition-all ${inputText.trim() ? 'bg-primary' : 'bg-surface-variant'}`}
            >
              <Ionicons name="send" size={20} color={inputText.trim() ? "#ffffff" : "#1A1A1A"} />
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
