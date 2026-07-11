import React, { useState, useRef } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { CustomButton } from '../../components/CustomButton';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../store/authStore';

export default function OTPVerificationScreen() {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>();
  const login = useAuthStore(state => state.login);
  
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const inputs = useRef<Array<TextInput | null>>([]);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpCode = otp.join('');
    if (otpCode.length < 6) {
      Alert.alert('Error', 'Please enter a valid 6-digit OTP');
      return;
    }
    
    setIsLoading(true);
    try {
      // const response = await authApi.verifyOtp(email, otpCode);
      setTimeout(() => {
        login({ id: 1, email, role: 'patient' }, 'mock-token');
        router.replace('/');
      }, 1000);
    } catch (error) {
      Alert.alert('Verification Failed', 'Invalid OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <View className="px-6 pt-4 pb-8 flex-1">
        <TouchableOpacity onPress={() => router.back()} className="mb-6 w-10 h-10 justify-center">
          <Ionicons name="arrow-back" size={24} color="#1b1b20" />
        </TouchableOpacity>

        <Text className="font-headline-md text-on-surface text-3xl font-bold mb-2">
          Verify your email
        </Text>
        <Text className="font-body-md text-on-surface-variant text-base mb-8">
          We've sent a 6-digit verification code to <Text className="font-bold">{email || 'your email'}</Text>.
        </Text>

        <View className="flex-row justify-between mb-8">
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => inputs.current[index] = ref}
              className="w-12 h-14 bg-surface-container-highest border border-outline-variant rounded-lg text-center text-xl font-bold text-on-surface focus:border-primary"
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={(val) => handleOtpChange(val, index)}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
                  inputs.current[index - 1]?.focus();
                }
              }}
            />
          ))}
        </View>

        <CustomButton
          title="Verify & Continue"
          onPress={handleVerify}
          isLoading={isLoading}
          disabled={otp.join('').length < 6}
        />

        <View className="flex-row justify-center items-center mt-8">
          <Text className="text-on-surface-variant font-body-md mr-1">Didn't receive code?</Text>
          <TouchableOpacity>
            <Text className="text-primary font-label-bold font-bold">Resend OTP</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
