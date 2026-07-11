import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CustomButton } from '../../components/CustomButton';

export default function VoiceJournalScreen() {
  const router = useRouter();
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRecording) {
      timer = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSave = () => {
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <View className="flex-row items-center px-4 py-3 border-b border-surface-variant bg-surface">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 justify-center">
          <Ionicons name="close" size={24} color="#1b1b20" />
        </TouchableOpacity>
        <Text className="font-headline-md text-on-surface font-bold text-xl ml-2 flex-1">
          Voice Journal
        </Text>
      </View>

      <View className="flex-1 items-center justify-center px-6">
        <Text className="font-headline-md text-on-surface text-2xl font-bold mb-2">Speak your mind</Text>
        <Text className="font-body-md text-on-surface-variant text-center mb-16">
          Your recording will be securely saved and transcribed for your AI companion.
        </Text>

        <View className="w-full h-32 flex-row items-center justify-center gap-1 mb-16">
          {/* Mock Audio Visualizer */}
          {[1, 3, 5, 2, 4, 8, 3, 5, 2, 6, 4, 2].map((h, i) => (
            <View 
              key={i} 
              className={`w-2 rounded-full ${isRecording ? 'bg-primary' : 'bg-surface-variant'}`} 
              style={{ height: isRecording ? h * 10 : 4 }} 
            />
          ))}
        </View>

        <Text className="font-headline-md text-on-surface text-5xl font-bold mb-12">
          {formatTime(duration)}
        </Text>

        <TouchableOpacity 
          onPress={() => setIsRecording(!isRecording)}
          className={`w-24 h-24 rounded-full items-center justify-center shadow-lg ${isRecording ? 'bg-error' : 'bg-primary'}`}
        >
          <Ionicons name={isRecording ? "stop" : "mic"} size={40} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <View className="p-6 border-t border-surface-variant bg-surface">
        <CustomButton 
          title="Save Recording"
          onPress={handleSave}
          disabled={duration === 0 || isRecording}
        />
      </View>
    </SafeAreaView>
  );
}
