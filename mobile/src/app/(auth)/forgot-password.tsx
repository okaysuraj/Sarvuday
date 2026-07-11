import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { CustomButton } from '../../components/CustomButton';
import { CustomInput } from '../../components/CustomInput';
import { Ionicons } from '@expo/vector-icons';
import { authApi } from '../../api/auth';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSendLink = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }
    
    setIsLoading(true);
    try {
      await authApi.forgotPassword(email);
      setIsSent(true);
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
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
          Forgot Password?
        </Text>
        <Text className="font-body-md text-on-surface-variant text-base mb-8">
          {isSent 
            ? "We've sent a password reset link to your email." 
            : "Enter your email address and we'll send you a link to reset your password."}
        </Text>

        {!isSent ? (
          <>
            <CustomInput
              label="Email Address"
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              containerClassName="mb-8"
            />
            <CustomButton
              title="Send Reset Link"
              onPress={handleSendLink}
              isLoading={isLoading}
            />
          </>
        ) : (
          <CustomButton
            title="Back to Login"
            onPress={() => router.replace('/(auth)/login')}
            variant="outline"
          />
        )}
      </View>
    </SafeAreaView>
  );
}
