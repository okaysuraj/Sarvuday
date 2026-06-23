import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Daily, { DailyCall } from '@daily-co/react-native-daily-js';
import { useAuth } from '../../context/AuthContext';
import apiClient from '../../api/client';
import { Ionicons } from '@expo/vector-icons';

export default function VideoCallScreen() {
  const { sessionId } = useLocalSearchParams();
  const router = useRouter();
  const { userToken } = useAuth();
  
  const [callObject, setCallObject] = useState<DailyCall | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);

  useEffect(() => {
    let call: DailyCall | null = null;

    const fetchTokenAndJoin = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${userToken}` } };
        const res = await apiClient.get(`/user/sessions/join/${sessionId}`, config);
        
        const { video_url, token } = res.data;

        call = Daily.createCallObject();
        setCallObject(call);

        call.on('left-meeting', () => {
          router.back();
        });

        await call.join({ url: video_url, token });
        setLoading(false);
      } catch (err: any) {
        console.error(err);
        setError(err.response?.data?.detail || 'Failed to join video call');
        setLoading(false);
      }
    };

    if (sessionId && userToken) {
      fetchTokenAndJoin();
    }

    return () => {
      if (call) {
        call.leave();
        call.destroy();
      }
    };
  }, [sessionId, userToken]);

  const toggleCamera = useCallback(() => {
    if (callObject) {
      const videoEnabled = callObject.localVideo();
      callObject.setLocalVideo(!videoEnabled);
      setIsCameraOn(!videoEnabled);
    }
  }, [callObject]);

  const toggleMic = useCallback(() => {
    if (callObject) {
      const audioEnabled = callObject.localAudio();
      callObject.setLocalAudio(!audioEnabled);
      setIsMicOn(!audioEnabled);
    }
  }, [callObject]);

  const leaveCall = useCallback(() => {
    if (callObject) {
      callObject.leave();
    } else {
      router.back();
    }
  }, [callObject, router]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#003fdd" />
        <Text style={{ marginTop: 10 }}>Connecting to secure session...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Ionicons name="warning" size={48} color="#dc3545" />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.btn} onPress={() => router.back()}>
          <Text style={styles.btnText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // NOTE: react-native-daily-js does NOT provide a prebuilt UI component.
  // It requires manually mapping video tracks to react-native-webrtc RTCViews.
  // For production, you iterate over callObject.participants() and render their video/audio tracks.
  
  return (
    <View style={styles.container}>
      <View style={styles.videoArea}>
         <Text style={{ color: 'white' }}>Daily.co Video Stream active</Text>
         <Text style={{ color: '#ccc', fontSize: 12, marginTop: 10 }}>
           (WebRTC streams are running. Track rendering setup required for video layout.)
         </Text>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity style={[styles.controlBtn, !isMicOn && styles.controlBtnOff]} onPress={toggleMic}>
          <Ionicons name={isMicOn ? "mic" : "mic-off"} size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.controlBtn, { backgroundColor: '#dc3545' }]} onPress={leaveCall}>
          <Ionicons name="call" size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.controlBtn, !isCameraOn && styles.controlBtnOff]} onPress={toggleCamera}>
          <Ionicons name={isCameraOn ? "videocam" : "videocam-off"} size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  container: { flex: 1, backgroundColor: '#000' },
  videoArea: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { color: '#dc3545', fontSize: 16, textAlign: 'center', marginVertical: 20 },
  btn: { backgroundColor: '#1a1a2e', padding: 12, borderRadius: 8 },
  btnText: { color: 'white', fontWeight: 'bold' },
  controls: { 
    flexDirection: 'row', 
    justifyContent: 'space-evenly', 
    paddingBottom: 40,
    paddingTop: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    bottom: 0,
    width: '100%'
  },
  controlBtn: {
    width: 60, height: 60, borderRadius: 30,
    backgroundColor: '#333',
    justifyContent: 'center', alignItems: 'center'
  },
  controlBtnOff: {
    backgroundColor: '#555'
  }
});
