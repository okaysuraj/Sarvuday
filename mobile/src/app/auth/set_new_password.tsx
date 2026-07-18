import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function SetNewPasswordScreen() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="flex-1 bg-cream-bg items-center pt-10 px-4">
      
      {/* Top Navigation / Progress Indicator Area */}
      <View className="w-full flex-col gap-4 mb-10">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity 
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full border-[1.5px] border-ink-black flex items-center justify-center bg-white shadow-[2px_2px_0px_0px_#1A1A1A] active:shadow-none active:translate-x-[1px] active:translate-y-[1px]"
          >
            <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
          </TouchableOpacity>
          <Text className="font-label-bold text-outline font-bold">Step 3 of 3</Text>
          <View className="w-10 h-10" />
        </View>
        
        {/* Progress Indicator */}
        <View className="w-full max-w-[160px] mx-auto mt-2 h-3 border-[1.5px] border-ink-black rounded-full overflow-hidden bg-cream-bg flex-row">
          <View className="bg-accent-orange h-full w-full border-r-[1.5px] border-ink-black" />
        </View>
      </View>

      {/* Main Content Canvas */}
      <View className="flex-1 w-full max-w-sm flex-col items-center">
        
        {/* Heading */}
        <View className="text-center w-full mb-10 items-center">
          <Text className="font-headline-md text-ink-black font-bold text-3xl mb-2 text-center">Set New Password</Text>
          <Text className="font-body-md text-on-surface-variant text-base text-center">Your new password must be different from previously used passwords.</Text>
        </View>

        {/* Form */}
        <View className="w-full flex-col gap-6">
          
          {/* New Password Input */}
          <View className="flex-col gap-2">
            <Text className="font-label-bold text-ink-black font-bold">New Password</Text>
            <View className="relative w-full justify-center">
              <TextInput
                className="w-full bg-[#f9f8f3] border-[1.5px] border-ink-black rounded-xl px-4 py-4 font-body-md text-ink-black pr-12 focus:border-primary focus:shadow-[2px_2px_0px_0px_#1A1A1A]"
                placeholder="Enter new password"
                placeholderTextColor="#747687"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity 
                className="absolute right-4"
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="#747687" />
              </TouchableOpacity>
            </View>
            <Text className="text-xs text-outline font-body-md mt-1">Must be at least 8 characters long.</Text>
          </View>

          {/* Confirm Password Input */}
          <View className="flex-col gap-2">
            <Text className="font-label-bold text-ink-black font-bold">Confirm Password</Text>
            <TextInput
              className="w-full bg-[#f9f8f3] border-[1.5px] border-ink-black rounded-xl px-4 py-4 font-body-md text-ink-black focus:border-primary focus:shadow-[2px_2px_0px_0px_#1A1A1A]"
              placeholder="Confirm new password"
              placeholderTextColor="#747687"
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>

        </View>

        <View className="flex-1" />

        {/* Action Button */}
        <TouchableOpacity 
          className="w-full bg-primary border-[1.5px] border-ink-black py-4 rounded-full shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none mb-10 items-center justify-center"
        >
          <Text className="font-label-bold text-white font-bold tracking-wider uppercase text-lg">Reset Password</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}
