import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Types
type Message = {
  id: string;
  text: string;
  isUser: boolean;
};

// Mock CBT Options
const CBT_OPTIONS = [
  "I'm feeling anxious",
  "Breathing exercise",
  "Journaling prompt",
  "I can't sleep"
];

export default function AICompanionScreen() {
  const router = useRouter();
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: "Hi there. I'm your AI companion. How are you feeling today?", isUser: false }
  ]);
  const [isCrisis, setIsCrisis] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const handleSend = (text: string = inputText) => {
    if (!text.trim()) return;

    const newUserMsg: Message = { id: Date.now().toString(), text, isUser: true };
    setMessages(prev => [...prev, newUserMsg]);
    setInputText('');

    // Trigger dummy AI response
    setTimeout(() => {
      let aiText = "I hear you. Tell me more about why you feel that way.";
      
      // Basic crisis detection simulation
      if (text.toLowerCase().includes('suicide') || text.toLowerCase().includes('kill myself')) {
        aiText = "I'm so sorry you're feeling this way, but please know you don't have to go through this alone. I am alerting your emergency contact and suggesting immediate resources.";
        setIsCrisis(true);
      }
      
      const newAiMsg: Message = { id: (Date.now() + 1).toString(), text: aiText, isUser: false };
      setMessages(prev => [...prev, newAiMsg]);
    }, 1000);
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[styles.messageBubble, item.isUser ? styles.userBubble : styles.aiBubble]}>
      <Text style={[styles.messageText, item.isUser ? styles.userText : styles.aiText]}>{item.text}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#F8FAFC" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AI Companion</Text>
        <Ionicons name="information-circle-outline" size={24} color="#F8FAFC" />
      </View>

      {/* Crisis Banner */}
      {isCrisis && (
        <View style={styles.crisisBanner}>
          <Ionicons name="warning" size={24} color="#FFF" style={{ marginRight: 8 }} />
          <View style={{ flex: 1 }}>
            <Text style={styles.crisisTitle}>Emergency Resources Available</Text>
            <Text style={styles.crisisText}>Call 988 (National Suicide Prevention Lifeline)</Text>
          </View>
          <TouchableOpacity onPress={() => setIsCrisis(false)}>
            <Ionicons name="close" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
      )}

      {/* Chat History */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.chatContainer}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

      {/* CBT / Quick Actions */}
      <View style={styles.cbtContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {CBT_OPTIONS.map((opt, idx) => (
            <TouchableOpacity 
              key={idx} 
              style={styles.cbtPill}
              onPress={() => handleSend(opt)}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={`Start CBT exercise: ${opt}`}
            >
              <Text style={styles.cbtText}>{opt}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Type your message..."
          placeholderTextColor="#94A3B8"
          value={inputText}
          onChangeText={setInputText}
          multiline
          accessible={true}
          accessibilityLabel="Message input field"
          accessibilityHint="Type your message to the AI companion"
        />
        <TouchableOpacity 
          style={[styles.sendButton, !inputText.trim() && { opacity: 0.5 }]}
          onPress={() => handleSend()}
          disabled={!inputText.trim()}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Send message"
        >
          <Ionicons name="send" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#1E293B',
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F8FAFC',
  },
  crisisBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EF4444',
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
  },
  crisisTitle: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  crisisText: {
    color: '#FEE2E2',
    fontSize: 14,
    marginTop: 4,
  },
  chatContainer: {
    padding: 16,
    paddingBottom: 10,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 14,
    borderRadius: 20,
    marginBottom: 12,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#3B82F6',
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#334155',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userText: {
    color: '#FFF',
  },
  aiText: {
    color: '#F8FAFC',
  },
  cbtContainer: {
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  cbtPill: {
    backgroundColor: '#1E293B',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#475569',
  },
  cbtText: {
    color: '#CBD5E1',
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    paddingHorizontal: 16,
    backgroundColor: '#1E293B',
    borderTopWidth: 1,
    borderTopColor: '#334155',
    paddingBottom: Platform.OS === 'ios' ? 30 : 12,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#0F172A',
    color: '#F8FAFC',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
    fontSize: 16,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: '#3B82F6',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
});
