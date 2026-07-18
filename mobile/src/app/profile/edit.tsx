import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView, Platform, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import useAuthStore from '../../store/authStore';
import { userApi } from '../../api/user';

export default function EditProfileScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await userApi.getProfile();
        setName(profile.name || '');
        setEmail(profile.email || '');
        setPhone(profile.phone_number || '');
        setBio(profile.bio || '');
      } catch (e) {
        console.error('Failed to fetch profile', e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await userApi.updateProfile({
        name,
        phone_number: phone,
        bio
      });
      Alert.alert('Success', 'Profile updated successfully!', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } catch (e) {
      Alert.alert('Error', 'Failed to update profile.');
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 bg-cream-bg justify-center items-center">
        <ActivityIndicator size="large" color="#002da5" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-cream-bg"
    >
      {/* Header */}
      <View className="flex-row justify-between items-center px-6 py-4 w-full border-b-[1.5px] border-ink-black bg-cream-bg z-50">
        <View className="flex-row items-center gap-4">
          <TouchableOpacity 
            onPress={() => router.back()}
            className="p-2 rounded-xl active:translate-x-[2px] active:translate-y-[2px]"
          >
            <Ionicons name="arrow-back" size={24} color="#002da5" />
          </TouchableOpacity>
          <Text className="font-headline-sm text-primary font-bold text-xl tracking-tighter">Edit Profile</Text>
        </View>
        <TouchableOpacity className="w-10 h-10 rounded-full border-[1.5px] border-ink-black overflow-hidden bg-accent-sage">
           <Ionicons name="person" size={40} color="#1A1A1A" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 py-8" contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Profile Photo Upload */}
        <View className="flex-col items-center mb-8">
          <View className="relative">
            <View className="w-32 h-32 rounded-[48px] border-[1.5px] border-ink-black overflow-hidden bg-white shadow-[2px_2px_0px_0px_#1A1A1A]">
              <View className="w-full h-full bg-accent-sage items-center justify-center">
                <Ionicons name="person" size={80} color="#1A1A1A" />
              </View>
            </View>
            <TouchableOpacity className="absolute bottom-0 right-0 bg-secondary-container p-3 rounded-2xl border-[1.5px] border-ink-black shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none">
              <Ionicons name="pencil" size={20} color="#715b00" />
            </TouchableOpacity>
          </View>
          <Text className="mt-4 font-label-bold text-on-surface-variant uppercase font-bold tracking-wider text-xs">Change Avatar</Text>
        </View>

        {/* Form */}
        <View className="flex-col gap-6">
          <View className="flex-col gap-2">
            <Text className="font-label-bold text-ink-black font-bold ml-1">Full Name</Text>
            <TextInput 
              value={name}
              onChangeText={setName}
              className="bg-[#f9f8f3] border-[1.5px] border-ink-black rounded-xl px-4 py-4 font-body-md text-ink-black"
              placeholder="Enter your full name"
            />
          </View>

          <View className="flex-col gap-2">
            <Text className="font-label-bold text-ink-black font-bold ml-1">Email Address</Text>
            <TextInput 
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              className="bg-[#f9f8f3] border-[1.5px] border-ink-black rounded-xl px-4 py-4 font-body-md text-ink-black"
              placeholder="email@example.com"
            />
          </View>

          <View className="flex-col gap-2">
            <Text className="font-label-bold text-ink-black font-bold ml-1">Phone Number</Text>
            <TextInput 
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              className="bg-[#f9f8f3] border-[1.5px] border-ink-black rounded-xl px-4 py-4 font-body-md text-ink-black"
              placeholder="+1 (555) 000-0000"
            />
          </View>

          <View className="flex-col gap-2">
            <Text className="font-label-bold text-ink-black font-bold ml-1">Bio</Text>
            <TextInput 
              value={bio}
              onChangeText={setBio}
              multiline
              textAlignVertical="top"
              className="bg-[#f9f8f3] border-[1.5px] border-ink-black rounded-2xl px-4 py-4 font-body-md text-ink-black h-32"
              placeholder="Tell us a little about yourself..."
            />
            <Text className="text-right text-label-md text-on-surface-variant text-xs">{bio.length}/300 characters</Text>
          </View>
        </View>

        {/* Actions */}
        <View className="pt-6 flex-col gap-4">
          <TouchableOpacity 
            onPress={handleSave}
            disabled={isSaving}
            className="w-full bg-primary py-4 rounded-2xl border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none items-center"
          >
            <Text className="font-label-bold text-white font-bold text-lg tracking-wide uppercase">
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => router.back()}
            className="w-full bg-white py-4 rounded-2xl border-[1.5px] border-ink-black items-center active:bg-surface-container-low"
          >
            <Text className="font-label-bold text-ink-black font-bold text-lg tracking-wide uppercase">Discard Edits</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}
