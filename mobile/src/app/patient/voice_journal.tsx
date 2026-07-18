import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function VoiceMoodJournalScreen() {
  const router = useRouter();
  const [isRecording, setIsRecording] = useState(true);
  const [timer, setTimer] = useState(14); // Mock start at 14s
  const [loading, setLoading] = useState(false);
  
  // Animation values for wave
  const wave1 = useState(new Animated.Value(24))[0];
  const wave2 = useState(new Animated.Value(40))[0];
  const wave3 = useState(new Animated.Value(32))[0];
  const wave4 = useState(new Animated.Value(56))[0];
  const wave5 = useState(new Animated.Value(24))[0];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setTimer(t => t + 1);
      }, 1000);
      
      // Animate waves
      const animateWave = (anim: Animated.Value, min: number, max: number, duration: number) => {
        Animated.loop(
          Animated.sequence([
            Animated.timing(anim, { toValue: max, duration: duration / 2, useNativeDriver: false }),
            Animated.timing(anim, { toValue: min, duration: duration / 2, useNativeDriver: false })
          ])
        ).start();
      };
      
      animateWave(wave1, 24, 64, 1200);
      animateWave(wave2, 40, 80, 1400);
      animateWave(wave3, 32, 96, 1100);
      animateWave(wave4, 56, 112, 1300);
      animateWave(wave5, 24, 48, 1500);
      
    } else {
      wave1.stopAnimation();
      wave2.stopAnimation();
      wave3.stopAnimation();
      wave4.stopAnimation();
      wave5.stopAnimation();
    }
    
    return () => clearInterval(interval);
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View className="flex-1 bg-background">
      {/* TopAppBar */}
      <View className="w-full bg-background border-b-[1.5px] border-ink-black px-4 md:px-10 py-4 flex-row items-center justify-between sticky top-0 z-50">
        <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full hover:bg-surface-variant active:translate-x-[2px] active:translate-y-[2px]">
          <Ionicons name="arrow-back" size={24} color="#002da5" />
        </TouchableOpacity>
        <Text className="font-display-lg-mobile text-primary font-bold text-2xl tracking-tighter">SarvUday</Text>
        <TouchableOpacity className="p-2 rounded-full hover:bg-surface-variant active:translate-x-[2px] active:translate-y-[2px]">
          <Ionicons name="settings-outline" size={24} color="#434655" />
        </TouchableOpacity>
      </View>

      {/* Main Canvas */}
      <View className="flex-1 items-center justify-center px-4 md:px-10 py-8 relative">
        
        {/* Background Decorative Memphis Shapes */}
        <View className="absolute top-20 left-10 w-16 h-16 bg-secondary-container rounded-full border-[1.5px] border-ink-black opacity-60 hidden md:block" />
        <View className="absolute bottom-20 right-10 w-24 h-24 bg-accent-pink rounded-xl border-[1.5px] border-ink-black opacity-60 hidden md:block" style={{ transform: [{ rotate: '12deg' }] }} />
        <View className="absolute top-1/2 left-4 w-8 h-8 bg-surface-dim rounded-full border-[1.5px] border-ink-black opacity-80" />

        {/* Recording Module Card */}
        <View className="w-full max-w-lg bg-white border-[1.5px] border-ink-black rounded-[32px] p-8 md:p-10 shadow-[8px_8px_0px_0px_#1A1A1A] flex-col items-center gap-10 relative z-10">
          
          {/* Context Text */}
          <View className="text-center space-y-4 max-w-sm">
            <Text className="font-headline-sm text-ink-black font-bold text-2xl text-center mb-2">Ready when you are.</Text>
            <Text className="font-body-lg text-on-surface-variant text-lg text-center">
              Tap to speak your mind. Our AI will analyze your tone for deeper insights.
            </Text>
          </View>

          {/* Dynamic Audio Visualization Area */}
          <View className="w-full h-32 flex-row items-center justify-center gap-2 md:gap-3 bg-surface-dim/30 rounded-2xl border-[1.5px] border-outline-variant/30 p-4">
            <Animated.View className="w-4 bg-primary rounded-full border border-ink-black" style={{ height: wave1 }} />
            <Animated.View className="w-4 bg-primary rounded-full border border-ink-black" style={{ height: wave2 }} />
            <Animated.View className="w-5 bg-secondary-container rounded-full border-[1.5px] border-ink-black z-10 shadow-[2px_2px_0px_0px_#1A1A1A]" style={{ height: wave3 }} />
            <Animated.View className="w-4 bg-primary rounded-full border border-ink-black" style={{ height: wave4 }} />
            <Animated.View className="w-4 bg-primary rounded-full border border-ink-black" style={{ height: wave5 }} />
            <Animated.View className="w-4 bg-accent-orange rounded-full border border-ink-black hidden md:block" style={{ height: wave2 }} />
            <Animated.View className="w-4 bg-primary rounded-full border border-ink-black hidden md:block" style={{ height: wave1 }} />
          </View>

          {/* Interaction Controls */}
          <View className="flex-row items-center justify-center gap-8 w-full mt-4">
            
            {/* Pause Button */}
            <TouchableOpacity 
              onPress={() => setIsRecording(!isRecording)}
              className="w-14 h-14 items-center justify-center rounded-full bg-accent-sage border-[1.5px] border-ink-black shadow-[3px_3px_0px_0px_#1A1A1A] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
            >
              <Ionicons name={isRecording ? "pause" : "play"} size={24} color="#1A1A1A" />
            </TouchableOpacity>

            {/* Primary Record Button */}
            <View className="relative">
              <TouchableOpacity 
                onPress={() => setIsRecording(!isRecording)}
                className="relative z-10 w-24 h-24 items-center justify-center rounded-full bg-primary border-[1.5px] border-ink-black shadow-[6px_6px_0px_0px_#1A1A1A] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
              >
                <Ionicons name="mic" size={48} color="#ffffff" />
              </TouchableOpacity>
            </View>

            {/* Done Button */}
            <TouchableOpacity 
              onPress={async () => {
                setLoading(true);
                try {
                  const token = await AsyncStorage.getItem('access_token');
                  // Simulate backend processing of voice to text
                  const res = await fetch('http://10.0.2.2:8000/normal_user/tracking/journal', {
                    method: 'POST',
                    headers: {
                      'Authorization': `Bearer ${token}`,
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      text: "Mock transcription of voice journal audio...",
                      entry_type: "voice"
                    })
                  });
                  if (res.ok) {
                    router.push('/patient/journal_entry');
                  } else {
                    Alert.alert('Error', 'Failed to save voice journal');
                  }
                } catch (e) {
                  console.error(e);
                  Alert.alert('Error', 'An error occurred.');
                } finally {
                  setLoading(false);
                }
              }}
              disabled={loading}
              className="w-14 h-14 items-center justify-center rounded-full bg-secondary-container border-[1.5px] border-ink-black shadow-[3px_3px_0px_0px_#1A1A1A] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
            >
              {loading ? <ActivityIndicator size="small" color="#1A1A1A" /> : <Ionicons name="checkmark" size={24} color="#1A1A1A" />}
            </TouchableOpacity>
          </View>

          {/* Micro-interaction text */}
          <View className="mt-2 text-center">
            <Text className="font-label-bold text-primary font-bold uppercase tracking-widest opacity-80 text-center">
              {isRecording ? `Recording... ${formatTime(timer)}` : `Paused ${formatTime(timer)}`}
            </Text>
          </View>

        </View>
      </View>
    </View>
  );
}
