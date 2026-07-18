import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { CustomButton } from '../../components/CustomButton';
import { Ionicons } from '@expo/vector-icons';
import { userApi } from '../../api/user';
import { useAuthStore } from '../../store/authStore';

export default function BasicProfileSetupScreen() {
  const router = useRouter();
  const user = useAuthStore(state => state.user);
  
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState('');
  const [dob, setDob] = useState('');
  const [timezone, setTimezone] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = async () => {
    setIsLoading(true);
    try {
      await userApi.updateProfile({
        name,
        bio,
        dob,
        timezone,
      });
      router.push('/intake/history');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-surface">
      {/* TopAppBar */}
      <View className="w-full border-b border-outline-variant bg-surface flex-row items-center justify-between px-4 h-16">
        <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full hover:bg-surface-container-low">
          <Ionicons name="arrow-back" size={24} color="#1b1b20" />
        </TouchableOpacity>
        <Text className="font-headline-md text-xl font-bold text-primary">SarvUday</Text>
        <View className="w-10" />
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} className="flex-1">
        <ScrollView className="flex-1 px-6 pt-8 pb-8">
          {/* Progress Indicator */}
          <View className="flex-col gap-2 mb-6">
            <View className="flex-row justify-between items-end">
              <Text className="font-label-bold text-on-surface-variant uppercase tracking-wider text-xs">Step 1 of 4</Text>
              <Text className="font-label-md text-primary">Profile Setup</Text>
            </View>
            <View className="h-3 w-full rounded-full border border-ink-black bg-surface-container-low overflow-hidden">
              <View className="h-full bg-secondary-container border-r border-ink-black" style={{ width: '25%' }} />
            </View>
          </View>

          {/* Header */}
          <View className="text-center flex-col gap-2 mb-8 items-center">
            <Text className="font-headline-md text-3xl font-bold text-ink-black text-center">Let's get to know you</Text>
            <Text className="font-body-md text-on-surface-variant text-center max-w-xs">
              Setting up your profile helps us personalize your journey and connect you with the right resources.
            </Text>
          </View>

          {/* Form Card */}
          <View className="bg-surface-container-lowest border border-ink-black rounded-[32px] p-6 mb-8 shadow-[4px_4px_0px_0px_#1A1A1A]">
            {/* Avatar Selection */}
            <View className="flex-col items-center gap-2 mb-6">
              <View className="relative">
                <View className="w-32 h-32 rounded-full border border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] bg-accent-sage flex items-center justify-center overflow-hidden">
                  <Image 
                    source={{ uri: 'https://api.dicebear.com/7.x/notionists/png?seed=Felix' }} 
                    className="w-full h-full"
                  />
                </View>
                <TouchableOpacity className="absolute bottom-0 right-0 w-10 h-10 bg-secondary-fixed border border-ink-black rounded-full flex items-center justify-center shadow-[2px_2px_0px_0px_#1A1A1A]">
                  <Ionicons name="camera" size={20} color="#1A1A1A" />
                </TouchableOpacity>
              </View>
              <Text className="font-label-bold text-on-surface-variant mt-2">Choose an Avatar</Text>
            </View>

            {/* Input: Full Name */}
            <View className="flex-col gap-2 mb-4">
              <Text className="font-label-bold text-ink-black">Full Name</Text>
              <TextInput
                className="bg-surface-container-low border border-ink-black rounded-xl p-4 font-body-md text-ink-black"
                placeholder="e.g. Jane Doe"
                value={name}
                onChangeText={setName}
              />
            </View>

            {/* Input: Date of Birth */}
            <View className="flex-col gap-2 mb-4">
              <Text className="font-label-bold text-ink-black">Date of Birth</Text>
              <TextInput
                className="bg-surface-container-low border border-ink-black rounded-xl p-4 font-body-md text-ink-black"
                placeholder="MM/DD/YYYY"
                value={dob}
                onChangeText={setDob}
              />
            </View>

            {/* Input: Timezone */}
            <View className="flex-col gap-2 mb-4">
              <Text className="font-label-bold text-ink-black">Timezone</Text>
              <TextInput
                className="bg-surface-container-low border border-ink-black rounded-xl p-4 font-body-md text-ink-black"
                placeholder="e.g. EST, PST, IST"
                value={timezone}
                onChangeText={setTimezone}
              />
            </View>

            {/* Textarea: Bio */}
            <View className="flex-col gap-2">
              <View className="flex-row justify-between">
                <Text className="font-label-bold text-ink-black">Bio / About Me</Text>
                <Text className="text-outline font-label-md text-xs mt-1">Optional</Text>
              </View>
              <TextInput
                className="bg-surface-container-low border border-ink-black rounded-xl p-4 font-body-md text-ink-black"
                placeholder="Share a little bit about yourself..."
                multiline
                numberOfLines={4}
                value={bio}
                onChangeText={setBio}
                style={{ textAlignVertical: 'top' }}
              />
            </View>
          </View>

          <CustomButton 
            title="Continue"
            onPress={handleContinue}
            isLoading={isLoading}
            disabled={!name || !dob || !timezone}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
