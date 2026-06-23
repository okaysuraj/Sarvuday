import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import apiClient from '../../api/client';
import { useRouter } from 'expo-router';
import { Colors, Typography, Spacing } from '../../constants/theme';
import { StickerInput } from '../../components/StickerInput';
import { StickerButton } from '../../components/StickerButton';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('normal_user');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    setLoading(true);
    try {
      const response = await apiClient.post('/auth/login', {
        email,
        password,
        user_type: userType,
      });

      if (response.status === 200) {
        await login(response.data.access_token, userType);
      }
    } catch (error) {
      console.error('Login Error:', error);
      Alert.alert('Login Failed', 'Invalid credentials or network error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      
      <StickerInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <StickerInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {loading ? (
        <ActivityIndicator size="large" color={Colors.light.primary} style={{ marginTop: 20 }} />
      ) : (
        <StickerButton 
          title="Login" 
          onPress={handleLogin} 
          style={{ marginTop: 10 }}
        />
      )}

      <TouchableOpacity style={styles.linkButton} onPress={() => router.push('/(auth)/register')}>
        <Text style={styles.linkText}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: Spacing.containerPaddingMobile,
    justifyContent: 'center',
    backgroundColor: Colors.light.background,
  },
  title: {
    ...Typography.headlineMd,
    marginBottom: 40,
    textAlign: 'center',
    color: Colors.light.text,
  },
  linkButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    ...Typography.labelBold,
    color: Colors.light.primary,
  },
});
