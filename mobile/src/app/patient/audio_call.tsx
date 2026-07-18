import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function AudioCallTherapyScreen() {
  const router = useRouter();
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(true);

  return (
    <View className="flex-1 bg-[#fbf8ff] items-center justify-center relative">
      {/* Top Navigation */}
      <View className="absolute top-0 left-0 w-full flex-row justify-between items-center px-4 md:px-10 py-6 z-50">
        <TouchableOpacity 
          onPress={() => router.back()}
          className="w-12 h-12 bg-white rounded-full border-[1.5px] border-ink-black flex items-center justify-center shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-transform"
        >
          <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <Text className="font-headline-sm-mobile md:font-headline-sm text-primary font-bold text-2xl">SarvUday</Text>
        <View className="w-12 h-12" /> {/* Spacer */}
      </View>

      {/* Decorative Background Elements */}
      <View className="absolute top-1/4 left-10 w-16 h-16 bg-[#d9d9e6] rounded-full opacity-50 z-0" />
      <View className="absolute bottom-1/3 right-10 w-24 h-24 bg-[#ffd9df] rounded-xl rotate-12 opacity-50 z-0" />

      {/* Main Content */}
      <View className="w-full max-w-sm items-center z-10 px-4">
        
        {/* Call Status Header */}
        <View className="items-center mb-12">
          <Text className="font-display-lg-mobile md:font-display-lg text-ink-black font-bold text-4xl mb-2">Dr. Emily Chen</Text>
          <View className="flex-row items-center justify-center gap-2">
            <View className="w-2 h-2 rounded-full bg-[#fdd33f]" />
            <Text className="font-body-lg text-on-surface-variant text-lg">In Session</Text>
          </View>
        </View>

        {/* Avatar Central Focus */}
        <View className="relative items-center justify-center mb-12">
          {/* Pulsating Rings */}
          <View className="absolute inset-[-20px] bg-[#003fdd] rounded-full opacity-10" />
          <View className="absolute inset-[-10px] bg-[#003fdd] rounded-full opacity-20" />
          
          <View className="w-48 h-48 md:w-56 md:h-56 rounded-full border-[1.5px] border-ink-black shadow-[0px_8px_0px_0px_#1A1A1A] bg-[#e4e1e8] items-center justify-center overflow-hidden">
            <Ionicons name="person" size={80} color="#1A1A1A" />
          </View>

          {/* Audio Waveform Indicator */}
          <View className="absolute -bottom-4 bg-white border-[1.5px] border-ink-black rounded-full shadow-[0px_2px_0px_0px_#1A1A1A] px-4 py-2 flex-row items-end gap-1 h-8">
            <View className="w-1 h-full bg-primary rounded-full" />
            <View className="w-1 h-3/4 bg-primary rounded-full" />
            <View className="w-1 h-1/2 bg-primary rounded-full" />
            <View className="w-1 h-full bg-primary rounded-full" />
            <View className="w-1 h-2/3 bg-primary rounded-full" />
          </View>
        </View>

        {/* Timer */}
        <View className="mb-12">
          <Text className="font-headline-md text-primary font-bold text-3xl tracking-widest bg-[#f5f2f9] px-8 py-3 rounded-xl border-[1.5px] border-ink-black">
            12:34
          </Text>
        </View>

        {/* Call Controls Container */}
        <View className="flex-row items-center justify-center gap-6">
          {/* Mute Button */}
          <TouchableOpacity 
            onPress={() => setIsMuted(!isMuted)}
            className="flex-col items-center gap-2"
          >
            <View className={`w-16 h-16 rounded-2xl border-[1.5px] border-ink-black items-center justify-center shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-y-[2px] active:shadow-none ${isMuted ? 'bg-[#d9d9e6]' : 'bg-white'}`}>
              <Ionicons name={isMuted ? "mic-off" : "mic"} size={28} color="#1A1A1A" />
            </View>
            <Text className="font-label-md text-on-surface-variant font-bold text-sm">Mute</Text>
          </TouchableOpacity>

          {/* End Call Button */}
          <TouchableOpacity 
            onPress={() => router.back()}
            className="flex-col items-center gap-2 mx-2"
          >
            <View className="w-20 h-20 rounded-full bg-error border-[1.5px] border-ink-black items-center justify-center shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-y-[2px] active:shadow-none">
              <Ionicons name="call" size={36} color="#ffffff" style={{ transform: [{ rotate: '135deg' }] }} />
            </View>
            <Text className="font-label-bold text-error font-bold text-sm mt-1">End Call</Text>
          </TouchableOpacity>

          {/* Speaker Button */}
          <TouchableOpacity 
            onPress={() => setIsSpeaker(!isSpeaker)}
            className="flex-col items-center gap-2"
          >
            <View className={`w-16 h-16 rounded-2xl border-[1.5px] border-ink-black items-center justify-center shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-y-[2px] active:shadow-none ${isSpeaker ? 'bg-[#ffd9df]' : 'bg-white'}`}>
              <Ionicons name={isSpeaker ? "volume-high" : "volume-medium"} size={28} color="#1A1A1A" />
            </View>
            <Text className="font-label-md text-on-surface-variant font-bold text-sm">Speaker</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
}
