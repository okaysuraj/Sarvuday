import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function VideoCallTherapyScreen() {
  const router = useRouter();
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);

  return (
    <View className="flex-1 bg-[#fbf8ff] p-4 md:p-10">
      
      {/* Video Container (Sticker Card) */}
      <View className="flex-1 rounded-[32px] md:rounded-[48px] border-[1.5px] border-ink-black overflow-hidden relative shadow-[4px_4px_0px_0px_#1A1A1A] bg-[#efedf4]">
        
        {/* Simulated Video Background */}
        <View className="absolute inset-0 w-full h-full bg-[#f4b6c1] opacity-50" />
        <View className="absolute inset-0 w-full h-full items-center justify-center">
          <Ionicons name="person" size={200} color="#1A1A1A" opacity={0.2} />
        </View>
        
        {/* Therapist Info Pill */}
        <View className="absolute top-6 left-6 flex-row items-center bg-white border-[1.5px] border-ink-black rounded-full px-4 py-2 shadow-[2px_2px_0px_0px_#1A1A1A] z-20">
          <View className="w-2 h-2 rounded-full bg-[#10b981] mr-2" />
          <Text className="font-label-bold text-ink-black font-bold text-sm">Dr. Sarah Jenkins</Text>
        </View>

        {/* Call Duration */}
        <View className="absolute top-6 right-6 flex-row items-center bg-[#d9d9e6] border-[1.5px] border-ink-black rounded-full px-4 py-2 shadow-[2px_2px_0px_0px_#1A1A1A] z-20">
          <Ionicons name="time" size={18} color="#1A1A1A" className="mr-2" />
          <Text className="font-label-md text-ink-black text-sm">42:15</Text>
        </View>

        {/* PiP: User Video */}
        <View className="absolute top-24 right-6 w-32 h-48 md:w-48 md:h-64 rounded-2xl border-[1.5px] border-ink-black overflow-hidden shadow-[4px_4px_0px_0px_#1A1A1A] bg-white z-20 items-center justify-center">
          {isCameraOff ? (
            <Ionicons name="videocam-off" size={48} color="#1A1A1A" />
          ) : (
            <Ionicons name="person" size={80} color="#1A1A1A" opacity={0.5} />
          )}
        </View>

        {/* Bottom Control Bar */}
        <View className="absolute bottom-6 w-full items-center z-20">
          <View className="flex-row items-center gap-4 bg-white border-[1.5px] border-ink-black rounded-[24px] px-6 py-4 shadow-[4px_4px_0px_0px_#1A1A1A]">
            
            {/* Mute */}
            <TouchableOpacity 
              onPress={() => setIsMuted(!isMuted)}
              className={`w-12 h-12 rounded-full border-[1.5px] border-ink-black items-center justify-center active:bg-surface-variant ${isMuted ? 'bg-[#d9d9e6]' : 'bg-white'}`}
            >
              <Ionicons name={isMuted ? "mic-off" : "mic"} size={24} color="#1A1A1A" />
            </TouchableOpacity>

            {/* Camera */}
            <TouchableOpacity 
              onPress={() => setIsCameraOff(!isCameraOff)}
              className={`w-12 h-12 rounded-full border-[1.5px] border-ink-black items-center justify-center active:bg-surface-variant ${isCameraOff ? 'bg-[#d9d9e6]' : 'bg-white'}`}
            >
              <Ionicons name={isCameraOff ? "videocam-off" : "videocam"} size={24} color="#1A1A1A" />
            </TouchableOpacity>

            {/* End Call (Primary Red) */}
            <TouchableOpacity 
              onPress={() => router.back()}
              className="w-16 h-12 rounded-[16px] border-[1.5px] border-ink-black items-center justify-center bg-error active:opacity-80"
            >
              <Ionicons name="call" size={24} color="#ffffff" style={{ transform: [{ rotate: '135deg' }] }} />
            </TouchableOpacity>

            {/* Chat */}
            <TouchableOpacity className="w-12 h-12 rounded-full border-[1.5px] border-ink-black items-center justify-center bg-secondary-container active:opacity-80 relative">
              <Ionicons name="chatbubbles" size={24} color="#715b00" />
              <View className="absolute -top-1 -right-1 w-4 h-4 bg-error rounded-full border border-ink-black items-center justify-center z-30">
                <Text className="text-[10px] text-white font-bold">1</Text>
              </View>
            </TouchableOpacity>

          </View>
        </View>

      </View>

    </View>
  );
}
