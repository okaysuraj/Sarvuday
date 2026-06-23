import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, ScrollView } from 'react-native';
import apiClient from '../../api/client';
import { useRouter } from 'expo-router';
import { Colors, Typography, Spacing } from '../../constants/theme';
import { StickerInput } from '../../components/StickerInput';
import { StickerButton } from '../../components/StickerButton';

export default function RegisterScreen() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    user_type: 'normal_user',
    firstName: '',
    lastName: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    setLoading(true);
    try {
      const response = await apiClient.post('/auth/register', formData);

      if (response.status === 200 || response.status === 201) {
        Alert.alert('Success', 'Registration successful! Please login.');
        router.replace('/(auth)/login');
      }
    } catch (error) {
      console.error('Register Error:', error);
      Alert.alert('Registration Failed', 'Could not register user. Check inputs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      
      <StickerInput
        placeholder="Username"
        value={formData.username}
        onChangeText={(text) => setFormData({ ...formData, username: text })}
      />
      <StickerInput
        placeholder="Email"
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <StickerInput
        placeholder="First Name"
        value={formData.firstName}
        onChangeText={(text) => setFormData({ ...formData, firstName: text })}
      />
      <StickerInput
        placeholder="Last Name"
        value={formData.lastName}
        onChangeText={(text) => setFormData({ ...formData, lastName: text })}
      />
      <StickerInput
        placeholder="Password"
        value={formData.password}
        onChangeText={(text) => setFormData({ ...formData, password: text })}
        secureTextEntry
      />

      {loading ? (
        <ActivityIndicator size="large" color={Colors.light.primary} style={{ marginTop: 20 }} />
      ) : (
        <StickerButton 
          title="Register" 
          onPress={handleRegister} 
          backgroundColor={Colors.light.success}
          style={{ marginTop: 10 }}
        />
      )}

      <TouchableOpacity style={styles.linkButton} onPress={() => router.replace('/(auth)/login')}>
        <Text style={styles.linkText}>Already have an account? Login</Text>
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
    marginBottom: 30,
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
