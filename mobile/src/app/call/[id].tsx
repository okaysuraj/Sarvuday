import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function CallScreen() {
  const { id, type } = useLocalSearchParams();
  const router = useRouter();
  
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(type === 'audio');

  const isAudioCall = type === 'audio';

  const handleEndCall = () => {
    // End call logic here
    router.back();
  };

  return (
    <View className="flex-1 bg-background relative overflow-hidden p-4 md:p-10 pt-10">
      <View className="w-full h-full rounded-[32px] border-[1.5px] border-ink-black overflow-hidden relative shadow-[4px_4px_0px_0px_#1A1A1A] bg-surface-container">
        
        {/* Main Feed: Therapist */}
        {isVideoOff && !isAudioCall ? (
          <View className="absolute inset-0 w-full h-full bg-ink-black items-center justify-center">
            <Ionicons name="person" size={100} color="#333" />
          </View>
        ) : isAudioCall ? (
          <View className="absolute inset-0 w-full h-full bg-accent-sage items-center justify-center flex-col">
            <Image 
              source={{ uri: `https://api.dicebear.com/7.x/notionists/png?seed=${id}` }} 
              className="w-40 h-40 rounded-full border-[2px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] mb-6"
            />
            <Text className="font-headline-sm text-ink-black font-bold text-2xl">Therapist</Text>
            <Text className="font-body-md text-on-surface-variant">Audio Call</Text>
          </View>
        ) : (
          <Image 
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOs5ndX4ghu1niN_FE7iOrZKKPUYgczkWBjcR57pwim5TpcAjmWH0EHnmL1REKlsWrWLwNKoIug_AGaRCl20yPvxON5LDX_rTjm5bm08p3YgtTgHWi4Yn1FtQ0tuBcarOQ9FB0vKJ9FCp0ex4OJORHXH431ssSinfsVna8MRVVLdgkFjNOkAvFAZx_QFVoJQd81yH253uiJCg3xyBA91047nvxSbFWtVzT0YkI42U6QTYlnLKRSnqbdw' }}
            className="absolute inset-0 w-full h-full"
            resizeMode="cover"
          />
        )}

        {/* Top Info Pill */}
        <View className="absolute top-6 left-6 flex-row items-center bg-background border-[1.5px] border-ink-black rounded-full px-4 py-2 shadow-[2px_2px_0px_0px_#1A1A1A]">
          <View className="w-2 h-2 rounded-full bg-[#10b981] mr-2" />
          <Text className="font-label-bold text-ink-black font-bold text-xs uppercase tracking-wider">Dr. Sarah Jenkins</Text>
        </View>

        {/* Duration */}
        <View className="absolute top-6 right-6 flex-row items-center bg-accent-sage border-[1.5px] border-ink-black rounded-full px-4 py-2 shadow-[2px_2px_0px_0px_#1A1A1A]">
          <Ionicons name="timer-outline" size={16} color="#1b1b20" className="mr-2" />
          <Text className="font-label-md text-ink-black ml-1 text-sm font-bold">42:15</Text>
        </View>

        {/* User PiP Video (Only show in video call if video is on) */}
        {!isAudioCall && !isVideoOff && (
          <View className="absolute top-24 right-6 w-32 h-48 rounded-2xl border-[1.5px] border-ink-black overflow-hidden shadow-[4px_4px_0px_0px_#1A1A1A] bg-surface">
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfLYdCywAgT7NX8tUPwSZGkBbb7wjOjOQOdt83OLHJQsOsbfyDWxEWVUfi0oGBr2gTjOkiSOiAOp1OdN56H8iQuWuyPWvdUpsiq1WcgMBKqQHrCdfMlX7QFkohboy5JBwGTjFltSP5tVC0EwG2L55hqlrMzXM4Kv46ZRu3bHpQol7eg_JzaHPbF4ODTEJp14_9B3r8v-uFq4hTqcfCirFQnlq_-xCsDXEhAjQEXJd6Qhr3n-XpuasOug' }}
              className="absolute inset-0 w-full h-full"
              resizeMode="cover"
            />
          </View>
        )}

        {/* Controls */}
        <View className="absolute bottom-6 left-0 right-0 items-center justify-center">
          <View className="flex-row items-center gap-4 bg-background border-[1.5px] border-ink-black rounded-[24px] px-6 py-4 shadow-[4px_4px_0px_0px_#1A1A1A]">
            
            <TouchableOpacity 
              onPress={() => setIsMuted(!isMuted)}
              className={`w-12 h-12 rounded-full border-[1.5px] border-ink-black flex items-center justify-center ${isMuted ? 'bg-error text-white' : 'bg-background hover:bg-surface-variant'}`}
            >
              <Ionicons name={isMuted ? "mic-off" : "mic"} size={24} color={isMuted ? "#ffffff" : "#1A1A1A"} />
            </TouchableOpacity>

            {!isAudioCall && (
              <TouchableOpacity 
                onPress={() => setIsVideoOff(!isVideoOff)}
                className={`w-12 h-12 rounded-full border-[1.5px] border-ink-black flex items-center justify-center ${isVideoOff ? 'bg-error text-white' : 'bg-background hover:bg-surface-variant'}`}
              >
                <Ionicons name={isVideoOff ? "videocam-off" : "videocam"} size={24} color={isVideoOff ? "#ffffff" : "#1A1A1A"} />
              </TouchableOpacity>
            )}

            <TouchableOpacity 
              onPress={handleEndCall}
              className="w-16 h-12 rounded-[16px] border-[1.5px] border-ink-black flex items-center justify-center bg-error shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)] active:shadow-none active:translate-x-[1px] active:translate-y-[1px]"
            >
              <Ionicons name="call" size={24} color="#ffffff" style={{ transform: [{ rotate: '135deg' }] }} />
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => router.push(`/chat/${id}`)}
              className="w-12 h-12 rounded-full border-[1.5px] border-ink-black flex items-center justify-center bg-secondary-container"
            >
              <Ionicons name="chatbubble" size={24} color="#715b00" />
              <View className="absolute -top-1 -right-1 w-4 h-4 bg-error rounded-full border border-ink-black flex items-center justify-center">
                <Text className="text-[10px] text-white font-bold">1</Text>
              </View>
            </TouchableOpacity>

          </View>
        </View>
      </View>
    </View>
  );
}
