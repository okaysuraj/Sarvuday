import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { CustomButton } from '../../components/CustomButton';
import { CustomInput } from '../../components/CustomInput';
import { Ionicons } from '@expo/vector-icons';
import { authApi } from '../../api/auth';

import { useAuthStore } from '../../store/authStore';

export default function SignUpScreen() {
  const router = useRouter();
  const { role } = useLocalSearchParams<{ role: string }>();
  const login = useAuthStore(state => state.login);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      const userType = role === 'therapist' ? 'therapist' : 'patient';
      const response = await authApi.signUp({ name, email, password, user_type: userType });
      
      // Store user info and token from backend
      login(
        { 
          uid: response.firebaseUser.uid, 
          email: response.firebaseUser.email,
          role: response.backendData.user.user_type
        }, 
        response.backendData.access_token
      );
      
      // Go to intake profile for patients, or dashboard for therapists
      if (userType === 'patient') {
        router.replace('/intake/consent');
      } else {
        router.replace('/');
      }
    } catch (error: any) {
      console.log('SignUp Error:', error);
      Alert.alert('Sign Up Failed', error?.response?.data?.detail || error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-6 pt-4 pb-8">
        <TouchableOpacity onPress={() => router.back()} className="mb-6 w-10 h-10 justify-center">
          <Ionicons name="arrow-back" size={24} color="#1b1b20" />
        </TouchableOpacity>

        <Text className="font-headline-md text-on-surface text-3xl font-bold mb-2">
          Create Account
        </Text>
        <Text className="font-body-md text-on-surface-variant text-base mb-8">
          Sign up as a {role === 'therapist' ? 'Therapist' : 'Patient'} to begin your journey.
        </Text>

        <View className="gap-4 mb-6">
          <CustomInput
            label="Full Name"
            placeholder="Enter your full name"
            value={name}
            onChangeText={setName}
          />
          <CustomInput
            label="Email Address"
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <View>
            <CustomInput
              label="Password"
              placeholder="Create a password"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity 
              className="absolute right-4 top-[38px] p-2"
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color="#747687" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex-row items-start mb-8 pr-4">
          <Ionicons name="information-circle-outline" size={20} color="#747687" className="mt-1 mr-2" />
          <Text className="font-body-md text-on-surface-variant text-xs leading-5 flex-1">
            By signing up, you agree to our Terms of Service, Privacy Policy, and Data Usage Guidelines.
          </Text>
        </View>

        <CustomButton
          title="Sign Up"
          onPress={handleSignUp}
          isLoading={isLoading}
          className="mb-8"
        />

        <View className="flex-row justify-center items-center mt-auto">
          <Text className="text-on-surface-variant font-body-md mr-1">Already have an account?</Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
            <Text className="text-primary font-label-bold font-bold">Sign in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
