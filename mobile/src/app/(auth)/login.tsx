import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { CustomButton } from '../../components/CustomButton';
import { CustomInput } from '../../components/CustomInput';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../store/authStore';
import { authApi } from '../../api/auth';

export default function LoginScreen() {
  const router = useRouter();
  const login = useAuthStore(state => state.login);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    
    setIsLoading(true);
    try {
      // API call to backend
      const response = await authApi.login(email, password, 'patient');
      
      // Store user info and token from backend
      login(
        { 
          uid: response.firebaseUser.uid, 
          email: response.firebaseUser.email,
          role: response.backendData.user_type
        }, 
        response.backendData.access_token
      );
      
      router.replace('/');
    } catch (error: any) {
      console.log('Login Error:', error);
      Alert.alert('Login Failed', error?.response?.data?.detail || error.message || 'Invalid credentials or server error.');
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
          Welcome back
        </Text>
        <Text className="font-body-md text-on-surface-variant text-base mb-8">
          Sign in to continue your mental wellness journey.
        </Text>

        <View className="gap-4 mb-6">
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
              placeholder="Enter your password"
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
          
          <TouchableOpacity onPress={() => router.push('/(auth)/forgot-password')} className="self-end mt-2">
            <Text className="text-primary font-label-md text-sm font-bold">Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <CustomButton
          title="Sign In"
          onPress={handleLogin}
          isLoading={isLoading}
          className="mb-8"
        />

        <View className="flex-row justify-center items-center mt-auto">
          <Text className="text-on-surface-variant font-body-md mr-1">Don't have an account?</Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/role-selection')}>
            <Text className="text-primary font-label-bold font-bold">Sign up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
