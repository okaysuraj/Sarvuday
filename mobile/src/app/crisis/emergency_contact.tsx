import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function CallEmergencyContactScreen() {
  const router = useRouter();
  const [showOverlay, setShowOverlay] = useState(false);

  const handleCall = () => {
    setShowOverlay(true);
  };

  const closeOverlay = () => {
    setShowOverlay(false);
  };

  return (
    <View className="flex-1 bg-cream-bg">
      {/* Header */}
      <View className="w-full top-0 bg-cream-bg border-b-[1.5px] border-ink-black flex-row justify-between items-center px-6 py-4 z-50">
        <View className="flex-row items-center gap-4">
          <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full active:bg-surface-container">
            <Ionicons name="menu" size={24} color="#002da5" />
          </TouchableOpacity>
          <Text className="font-headline-md font-bold text-primary text-xl tracking-tighter uppercase">MindEase AI</Text>
        </View>
        <TouchableOpacity className="w-10 h-10 rounded-full border-[1.5px] border-ink-black bg-accent-sage items-center justify-center">
          <Ionicons name="person" size={24} color="#1A1A1A" />
        </TouchableOpacity>
      </View>

      <View className="flex-1 items-center justify-center px-4 py-8 max-w-lg mx-auto w-full">
        
        {/* Context */}
        <View className="items-center mb-10 w-full">
          <Text className="font-headline-md text-ink-black font-bold text-3xl mb-2">Crisis Support</Text>
          <Text className="font-body-lg text-on-surface-variant text-center max-w-sm">We're here for you. Reach out to your trusted support person immediately.</Text>
        </View>

        {/* Contact Card */}
        <View className="bg-white w-full rounded-[48px] p-8 items-center border-[1.5px] border-ink-black relative shadow-[4px_4px_0px_0px_#1A1A1A]">
          
          {/* Decorative Elements */}
          <View className="absolute -top-10 -right-10 w-32 h-32 bg-accent-pink rounded-full opacity-50 border-[1.5px] border-ink-black z-0" />
          <View className="absolute -bottom-6 -left-6 w-24 h-24 bg-secondary-container rounded-full opacity-30 border-[1.5px] border-ink-black z-0" />
          
          <View className="relative z-10 mb-6">
            <View className="w-40 h-40 rounded-full border-[1.5px] border-ink-black overflow-hidden shadow-[8px_8px_0px_0px_#1A1A1A] bg-accent-sage">
              <Image 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgP-I1bBUmIB4Ztgl2EoneQEdC4xT4lhuwbzrNpK3n6FfEU0lPlCEfq1US7IrOPYRyzxcHj-dWvAPtq_vj_e88nO7OSL8OORxwk4BBWr2bAXLq4CBuCebpTy5jZRC7uTeXkaWQVrLFmWseIByRL6flcnORJaKWKkyaz_DBhi_zNtHBVp3Us_3GO_En3tK6dkqQa-zhHWxD6J7VElp4Qxy7P7OhtJW7xDIfnyVhFr6OK-2juDBKWMeibQ' }}
                className="w-full h-full"
              />
            </View>
            <View className="absolute bottom-2 right-2 bg-primary w-12 h-12 rounded-full items-center justify-center border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A]">
              <Ionicons name="heart" size={24} color="#ffffff" />
            </View>
          </View>

          <View className="z-10 w-full mb-8 items-center">
            <Text className="font-display-lg-mobile text-ink-black font-bold text-4xl mb-2">Maya Chen</Text>
            <View className="flex-row items-center gap-2 px-4 py-1 rounded-full border-[1px] border-ink-black bg-accent-sage">
              <Ionicons name="person" size={14} color="#1A1A1A" />
              <Text className="font-label-bold text-ink-black font-bold text-xs uppercase">Sister & Primary Contact</Text>
            </View>
          </View>

          <TouchableOpacity 
            onPress={handleCall}
            className="w-full py-6 bg-primary border-[1.5px] border-ink-black rounded-2xl flex-row items-center justify-center gap-4 shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            <Ionicons name="call" size={32} color="#ffffff" />
            <Text className="font-headline-sm text-white font-bold text-2xl uppercase tracking-wider">Call Now</Text>
          </TouchableOpacity>
          
          <Text className="mt-6 font-label-md text-outline italic">Typical response: Under 2 mins</Text>
        </View>

        {/* Alternatives */}
        <View className="w-full max-w-md mt-10 gap-4">
          <TouchableOpacity className="bg-accent-orange border-[1.5px] border-ink-black p-4 rounded-xl flex-row items-center justify-between shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
            <View className="flex-row items-center gap-3">
              <Ionicons name="chatbubbles" size={24} color="#1A1A1A" />
              <Text className="font-label-bold text-ink-black font-bold">Text Maya instead</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#1A1A1A" />
          </TouchableOpacity>
          
          <TouchableOpacity className="bg-white border-[1.5px] border-ink-black p-4 rounded-xl flex-row items-center justify-between shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
            <View className="flex-row items-center gap-3">
              <Ionicons name="warning" size={24} color="#ba1a1a" />
              <Text className="font-label-bold text-ink-black font-bold">National Helpline</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#1A1A1A" />
          </TouchableOpacity>
        </View>

      </View>

      {/* Calling Modal */}
      <Modal visible={showOverlay} transparent animationType="fade">
        <View className="flex-1 bg-ink-black/20 justify-center items-center p-6">
          <View className="bg-white p-10 rounded-[40px] max-w-sm w-full items-center border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A]">
            <View className="w-20 h-20 bg-accent-sage rounded-full items-center justify-center mb-6 border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A]">
              <Ionicons name="volume-high" size={32} color="#1A1A1A" />
            </View>
            <Text className="font-headline-sm text-ink-black font-bold text-2xl mb-2">Connecting...</Text>
            <Text className="font-body-md text-on-surface-variant mb-8 text-center">Calling Maya Chen. Keep your phone close.</Text>
            <TouchableOpacity 
              onPress={closeOverlay}
              className="bg-[#ba1a1a] border-[1.5px] border-ink-black w-full py-4 rounded-xl items-center shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            >
              <Text className="font-label-bold text-white font-bold">Cancel Call</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
}
