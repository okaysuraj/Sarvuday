import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Dimensions, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View className="flex-1 bg-[#fbf8ff] items-center justify-center p-4">
      
      {/* Login Container */}
      <View className="w-full max-w-md bg-white border-[1.5px] border-ink-black rounded-[24px] p-8 flex-col items-center relative overflow-hidden">
        
        {/* Decorative Shapes */}
        <View className="absolute -top-6 -right-6 w-20 h-20 bg-[#ffd9df] rounded-full border-[1.5px] border-ink-black -z-10" />
        <View className="absolute -bottom-4 -left-4 w-16 h-16 bg-[#fdd33f] rounded-lg border-[1.5px] border-ink-black -z-10" style={{ transform: [{ rotate: '12deg' }] }} />

        {/* Header */}
        <View className="text-center w-full mb-8">
          <Text className="font-display-lg text-ink-black font-bold text-4xl mb-2 text-center">SarvUday</Text>
          <Text className="font-body-md text-on-surface-variant text-center">Welcome back to your safe space.</Text>
        </View>

        {/* Form */}
        <View className="w-full flex-col gap-4">
          
          {/* Email Input */}
          <View className="flex-col gap-1">
            <Text className="font-label-bold text-ink-black font-bold pl-1">Email</Text>
            <View className="relative w-full">
              <TextInput
                className="w-full bg-[#f9f8f3] border-[1.5px] border-ink-black rounded-xl py-3 pl-10 pr-4 font-body-md text-ink-black"
                placeholder="you@example.com"
                placeholderTextColor="#747687"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
              <Ionicons name="mail-outline" size={20} color="#747687" className="absolute left-3 top-3.5" />
            </View>
          </View>

          {/* Password Input */}
          <View className="flex-col gap-1">
            <Text className="font-label-bold text-ink-black font-bold pl-1">Password</Text>
            <View className="relative w-full">
              <TextInput
                className="w-full bg-[#f9f8f3] border-[1.5px] border-ink-black rounded-xl py-3 pl-10 pr-4 font-body-md text-ink-black"
                placeholder="••••••••"
                placeholderTextColor="#747687"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
              <Ionicons name="lock-closed-outline" size={20} color="#747687" className="absolute left-3 top-3.5" />
            </View>
            <View className="w-full items-end mt-1">
              <TouchableOpacity onPress={() => router.push('/auth/forgot_password')}>
                <Text className="font-label-md text-primary font-bold">Forgot Password?</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Login Button */}
          <TouchableOpacity 
            className="mt-4 w-full bg-primary rounded-xl border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-transform flex-row justify-center items-center gap-2 py-3"
            onPress={() => router.push('/patient/dashboard')}
          >
            <Text className="text-white font-label-bold font-bold">Log In</Text>
            <Ionicons name="arrow-forward" size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View className="w-full flex-row items-center gap-4 my-6">
          <View className="h-[1.5px] bg-ink-black flex-1" />
          <Text className="font-label-md text-[#747687]">or continue with</Text>
          <View className="h-[1.5px] bg-ink-black flex-1" />
        </View>

        {/* Social Logins */}
        <View className="flex-row gap-4 justify-center w-full mb-4">
          <TouchableOpacity className="w-12 h-12 rounded-full border-[1.5px] border-ink-black bg-white items-center justify-center shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-transform">
            <Ionicons name="logo-google" size={20} color="#1A1A1A" />
          </TouchableOpacity>
          <TouchableOpacity className="w-12 h-12 rounded-full border-[1.5px] border-ink-black bg-white items-center justify-center shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-transform">
            <Ionicons name="logo-apple" size={20} color="#1A1A1A" />
          </TouchableOpacity>
        </View>

        {/* Sign Up Link */}
        <View className="mt-4 flex-row justify-center w-full items-center">
          <Text className="font-body-md text-on-surface-variant">New here? </Text>
          <TouchableOpacity onPress={() => router.push('/auth/sign_up')}>
            <Text className="font-label-bold text-primary font-bold underline">Sign up</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
}
