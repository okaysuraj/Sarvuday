import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function OTPVerificationScreen() {
  const router = useRouter();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(30);
  const inputRefs = [useRef<TextInput>(null), useRef<TextInput>(null), useRef<TextInput>(null), useRef<TextInput>(null)];

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text !== '' && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  return (
    <View className="flex-1 bg-cream-bg items-center justify-center p-4">
      
      {/* Back Button */}
      <View className="absolute top-10 left-4 z-10">
        <TouchableOpacity 
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full border-[1.5px] border-ink-black bg-surface items-center justify-center active:bg-surface-variant"
        >
          <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
        </TouchableOpacity>
      </View>

      <View className="w-full max-w-sm flex-col relative z-0 mt-12">
        
        {/* Graphic Element */}
        <View className="w-24 h-24 bg-accent-pink rounded-full border-[1.5px] border-ink-black mx-auto items-center justify-center shadow-[4px_4px_0px_0px_#1A1A1A] relative mb-8">
          <Ionicons name="keypad" size={48} color="#1A1A1A" />
          <View className="absolute -top-2 -right-2 w-6 h-6 bg-secondary-container border-[1.5px] border-ink-black" style={{ transform: [{ rotate: '12deg' }] }} />
        </View>

        {/* Header Content */}
        <View className="text-center mb-10 items-center">
          <Text className="font-headline-md text-ink-black font-bold text-3xl mb-2 text-center">Enter Verification Code</Text>
          <Text className="font-body-md text-on-surface-variant text-base">Sent to <Text className="font-label-bold text-ink-black font-bold">+1 234 567 890</Text></Text>
        </View>

        {/* OTP Input Container */}
        <View className="flex-row justify-between mb-10">
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={inputRefs[index]}
              className="w-16 h-20 text-center font-display-lg-mobile text-ink-black font-bold text-3xl bg-[#f9f8f3] border-[1.5px] border-ink-black rounded-xl focus:border-primary focus:shadow-[2px_2px_0px_0px_#1A1A1A] focus:translate-x-[1px] focus:translate-y-[1px]"
              maxLength={1}
              keyboardType="number-pad"
              value={digit}
              onChangeText={(text) => handleOtpChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
            />
          ))}
        </View>

        {/* Actions */}
        <View className="flex-col gap-6 w-full">
          <TouchableOpacity 
            className="w-full bg-primary border-[1.5px] border-ink-black py-4 rounded-xl shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none flex-row justify-center items-center gap-2"
          >
            <Text className="font-label-bold text-white font-bold text-lg">Verify</Text>
            <Ionicons name="checkmark-circle" size={24} color="#ffffff" />
          </TouchableOpacity>

          <View className="flex-row justify-center items-center">
            <Text className="font-body-md text-on-surface-variant text-base">Didn't receive it? </Text>
            <TouchableOpacity 
              disabled={timeLeft > 0} 
              onPress={() => setTimeLeft(30)}
            >
              <Text className={`font-label-bold font-bold ml-1 ${timeLeft > 0 ? 'text-outline' : 'text-primary underline decoration-2'}`}>
                Resend Code {timeLeft > 0 ? `(${timeLeft}s)` : ''}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </View>
  );
}
