import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function SignUpScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View className="flex-1 bg-background justify-center items-center p-4 relative">
      
      <View className="w-full max-w-md bg-surface border-[1.5px] border-ink-black rounded-[24px] p-8 shadow-[4px_4px_0px_0px_#1A1A1A] relative overflow-hidden">
        
        {/* Decorative Memphis Element */}
        <View className="absolute -top-6 -right-6 w-20 h-20 bg-accent-pink rounded-full border-[1.5px] border-ink-black opacity-50 pointer-events-none" />

        <View className="text-center mb-10 relative z-10 items-center">
          <Text className="font-headline-md text-primary font-bold text-3xl mb-2">SarvUday</Text>
          <Text className="font-body-md text-on-surface-variant text-base">Create an account to get started.</Text>
        </View>

        <View className="flex-col gap-6 relative z-10">
          
          {/* Full Name Input */}
          <View className="flex-col gap-2">
            <Text className="font-label-bold text-ink-black font-bold">Full Name</Text>
            <View className="relative w-full justify-center">
              <Ionicons name="person" size={20} color="#747687" style={{ position: 'absolute', left: 12, zIndex: 1 }} />
              <TextInput
                className="w-full bg-[#f9f8f3] border-[1.5px] border-ink-black rounded-xl py-3 pl-10 pr-4 font-body-md text-ink-black focus:border-primary focus:shadow-[2px_2px_0px_0px_#1A1A1A]"
                placeholder="Jane Doe"
                placeholderTextColor="#747687"
                value={fullName}
                onChangeText={setFullName}
              />
            </View>
          </View>

          {/* Email Input */}
          <View className="flex-col gap-2">
            <Text className="font-label-bold text-ink-black font-bold">Email</Text>
            <View className="relative w-full justify-center">
              <Ionicons name="mail" size={20} color="#747687" style={{ position: 'absolute', left: 12, zIndex: 1 }} />
              <TextInput
                className="w-full bg-[#f9f8f3] border-[1.5px] border-ink-black rounded-xl py-3 pl-10 pr-4 font-body-md text-ink-black focus:border-primary focus:shadow-[2px_2px_0px_0px_#1A1A1A]"
                placeholder="jane@example.com"
                placeholderTextColor="#747687"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </View>

          {/* Password Input */}
          <View className="flex-col gap-2">
            <Text className="font-label-bold text-ink-black font-bold">Password</Text>
            <View className="relative w-full justify-center">
              <Ionicons name="lock-closed" size={20} color="#747687" style={{ position: 'absolute', left: 12, zIndex: 1 }} />
              <TextInput
                className="w-full bg-[#f9f8f3] border-[1.5px] border-ink-black rounded-xl py-3 pl-10 pr-4 font-body-md text-ink-black focus:border-primary focus:shadow-[2px_2px_0px_0px_#1A1A1A]"
                placeholder="••••••••"
                placeholderTextColor="#747687"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
              />
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity 
            className="mt-2 w-full bg-primary border-[1.5px] border-ink-black rounded-xl py-4 shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none items-center justify-center"
          >
            <Text className="font-label-bold text-white font-bold text-lg">Create Account</Text>
          </TouchableOpacity>

        </View>

        <View className="mt-6 flex-row justify-center relative z-10 items-center">
          <Text className="font-body-md text-on-surface-variant text-base">Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/auth/login')}>
            <Text className="font-label-bold text-primary font-bold text-base hover:underline">Log In</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
}
