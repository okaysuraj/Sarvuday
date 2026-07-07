import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Daily, { DailyCall } from '@daily-co/react-native-daily-js';

// Note: To render video, we typically use the DailyMediaView component provided by the daily-js package
// Example: import { DailyMediaView } from '@daily-co/react-native-daily-js';

export default function VideoConsultationScreen() {
  const { id } = useLocalSearchParams(); // Therapist ID
  const router = useRouter();
  const [callObject, setCallObject] = useState<DailyCall | null>(null);
  const [isJoined, setIsJoined] = useState(false);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isCamMuted, setIsCamMuted] = useState(false);

  useEffect(() => {
    // Initialize Daily Call Object
    const co = Daily.createCallObject();
    setCallObject(co);

    // Event listeners
    co.on('joined-meeting', () => setIsJoined(true));
    co.on('left-meeting', () => setIsJoined(false));
    co.on('error', (e) => console.error('Daily error:', e));

    // Cleanup
    return () => {
      co.leave();
      co.destroy();
    };
  }, []);

  const handleJoin = async () => {
    if (!callObject) return;
    // Replace this with your actual dynamic room URL generated from backend
    const roomUrl = 'https://yourdomain.daily.co/demo-room'; 
    try {
      await callObject.join({ url: roomUrl });
    } catch (e) {
      console.error(e);
    }
  };

  const handleLeave = () => {
    if (callObject) {
      callObject.leave();
    }
    router.back();
  };

  const toggleMic = () => {
    if (callObject) {
      callObject.setLocalAudio(!isMicMuted);
      setIsMicMuted(!isMicMuted);
    }
  };

  const toggleCam = () => {
    if (callObject) {
      callObject.setLocalVideo(!isCamMuted);
      setIsCamMuted(!isCamMuted);
    }
  };

  return (
    <View style={styles.container}>
      {!isJoined ? (
        <View style={styles.lobbyContainer}>
          <Text style={styles.title}>Session with Therapist #{id}</Text>
          <Text style={styles.subtitle}>Get ready for your consultation. Ensure you are in a quiet place.</Text>
          <TouchableOpacity style={styles.joinButton} onPress={handleJoin}>
            <Text style={styles.joinButtonText}>Join Session</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.callContainer}>
          {/* Here you would map over callObject.participants() and render DailyMediaView for each */}
          <View style={styles.videoPlaceholder}>
            <Ionicons name="person" size={100} color="#334155" />
            <Text style={styles.participantText}>Waiting for others...</Text>
          </View>
          
          <View style={styles.controlsContainer}>
            <TouchableOpacity style={styles.controlButton} onPress={toggleMic}>
              <Ionicons name={isMicMuted ? "mic-off" : "mic"} size={24} color="#FFF" />
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.controlButton, styles.leaveButton]} onPress={handleLeave}>
              <Ionicons name="call" size={24} color="#FFF" style={{ transform: [{ rotate: '135deg' }] }} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.controlButton} onPress={toggleCam}>
              <Ionicons name={isCamMuted ? "videocam-off" : "videocam"} size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A', // Dark mode background
  },
  lobbyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#94A3B8',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  joinButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 30,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  joinButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  callContainer: {
    flex: 1,
    justifyContent: 'flex-end', // Push controls to bottom
  },
  videoPlaceholder: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E293B',
  },
  participantText: {
    color: '#94A3B8',
    marginTop: 16,
    fontSize: 16,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingBottom: 40,
    paddingTop: 20,
    backgroundColor: 'rgba(15, 23, 42, 0.8)', // Semi-transparent overlay
  },
  controlButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#334155',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leaveButton: {
    backgroundColor: '#EF4444',
  }
});
