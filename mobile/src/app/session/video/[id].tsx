import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../../store/useAuthStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function VideoCallScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const user = useAuthStore(state => state.user);
  
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [duration, setDuration] = useState(0);
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const joinSession = async () => {
      try {
        const token = await AsyncStorage.getItem('access_token');
        const rolePath = user?.role === 'therapist' ? 'counsellor' : 'normal_user';
        const res = await fetch(`http://10.0.2.2:8000/${rolePath}/sessions/join/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const json = await res.json();
          setSessionToken(json.token);
          console.log(`Joined session. Token: ${json.token}`);
        } else {
          Alert.alert('Notice', 'Mocking video session (Backend returned error).');
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    joinSession();
  }, [id, user?.role]);

  useEffect(() => {
    if (loading) return;
    const timer = setInterval(() => {
      setDuration(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    router.replace(`/session/end?sessionId=${id}`);
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-ink-black items-center justify-center">
        <ActivityIndicator size="large" color="#ffffff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-ink-black">
      {/* Remote Video Feed (Mocked) */}
      <View className="absolute inset-0 bg-surface-variant items-center justify-center">
        <Ionicons name="person" size={120} color="#747687" />
        <Text className="font-headline-md text-on-surface-variant font-bold text-xl mt-4">
          {user?.role === 'therapist' ? 'Patient' : 'Dr. Jenkins'}
        </Text>
      </View>

      {/* Local PiP (Mocked) */}
      <View className="absolute top-12 right-6 w-28 h-40 bg-surface-container-highest rounded-xl overflow-hidden border-2 border-surface border-opacity-50 justify-center items-center">
        {isVideoOff ? (
          <Ionicons name="videocam-off" size={32} color="#747687" />
        ) : (
          <Text className="font-label-bold text-on-surface-variant">You</Text>
        )}
      </View>

      {/* Top Header */}
      <View className="absolute top-12 left-6 bg-ink-black/50 px-4 py-2 rounded-full">
        <Text className="font-headline-md text-white font-bold">{formatTime(duration)}</Text>
      </View>

      {/* Bottom Controls */}
      <View className="absolute bottom-12 left-0 right-0 flex-row justify-center items-center gap-6">
        <TouchableOpacity 
          onPress={() => setIsMuted(!isMuted)}
          className={`w-14 h-14 rounded-full items-center justify-center ${isMuted ? 'bg-surface' : 'bg-surface-variant/40'}`}
        >
          <Ionicons name={isMuted ? "mic-off" : "mic"} size={28} color={isMuted ? "#1b1b20" : "#ffffff"} />
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={handleEndCall}
          className="w-16 h-16 rounded-full bg-error items-center justify-center"
        >
          <Ionicons name="call" size={32} color="#ffffff" style={{ transform: [{ rotate: '135deg' }] }} />
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => setIsVideoOff(!isVideoOff)}
          className={`w-14 h-14 rounded-full items-center justify-center ${isVideoOff ? 'bg-surface' : 'bg-surface-variant/40'}`}
        >
          <Ionicons name={isVideoOff ? "videocam-off" : "videocam"} size={28} color={isVideoOff ? "#1b1b20" : "#ffffff"} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
