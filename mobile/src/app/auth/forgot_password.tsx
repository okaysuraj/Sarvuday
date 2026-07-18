import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  return (
    <View className="flex-1 bg-background justify-center items-center relative overflow-hidden">
      
      {/* Decorative Background Elements */}
      <View className="absolute top-10 -right-5 w-32 h-32 bg-secondary-container rounded-full border-[1.5px] border-ink-black z-0" />
      <View className="absolute bottom-20 -left-8 w-24 h-24 bg-accent-pink border-[1.5px] border-ink-black z-0" style={{ transform: [{ rotate: '12deg' }] }} />

      <View className="w-full max-w-md px-4 relative z-10 flex-col gap-6 pt-10">
        
        {/* Illustration / Icon Anchor */}
        <View className="flex-row justify-center -mb-6 z-20">
          <View className="bg-accent-sage w-20 h-20 rounded-[24px] border-[1.5px] border-ink-black items-center justify-center shadow-[4px_4px_0px_0px_#1A1A1A]" style={{ transform: [{ rotate: '-6deg' }] }}>
            <Ionicons name="lock-closed" size={40} color="#1A1A1A" />
          </View>
        </View>

        {/* Card Container */}
        <View className="bg-white rounded-[32px] border-[1.5px] border-ink-black p-6 md:p-8 flex-col gap-6 shadow-[4px_4px_0px_0px_#1A1A1A] relative z-10 pt-10">
          
          <View className="flex-col gap-2 text-center items-center">
            <Text className="font-headline-md-mobile text-ink-black font-bold text-3xl">Forgot Password?</Text>
            <Text className="font-body-md text-on-surface-variant px-2 text-center">Enter your email and we'll send you a link to reset your password.</Text>
          </View>

          <View className="flex-col gap-6 mt-4">
            
            <View className="flex-col gap-2">
              <Text className="font-label-bold text-ink-black font-bold pl-2">Email Address</Text>
              <TextInput
                className="w-full bg-surface-container-low rounded-xl border-[1.5px] border-ink-black px-4 py-4 font-body-md text-ink-black focus:bg-white focus:border-primary focus:shadow-[2px_2px_0px_0px_#1A1A1A]"
                placeholder="hello@example.com"
                placeholderTextColor="#c4c5d8"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <TouchableOpacity className="w-full bg-primary border-[1.5px] border-ink-black py-4 rounded-2xl shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex-row justify-center items-center gap-2">
              <Text className="font-label-bold text-white font-bold text-lg">Send Link</Text>
              <Ionicons name="send" size={20} color="#ffffff" />
            </TouchableOpacity>

          </View>
        </View>

        {/* Secondary Action */}
        <View className="flex-row justify-center mt-4">
          <TouchableOpacity 
            onPress={() => router.back()}
            className="bg-surface-bright border-[1.5px] border-ink-black py-3 px-6 rounded-2xl active:bg-surface-variant flex-row justify-center items-center gap-2 active:translate-x-[1px] active:translate-y-[1px]"
          >
            <Ionicons name="arrow-back" size={18} color="#1A1A1A" />
            <Text className="font-label-bold text-ink-black font-bold">Back to Login</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
}
