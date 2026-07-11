import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { CustomButton } from '../../components/CustomButton';
import { Ionicons } from '@expo/vector-icons';

export default function BasicProfileSetupScreen() {
  const router = useRouter();
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [timezone, setTimezone] = useState('');

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <View className="flex-row items-center px-4 py-3 border-b border-surface-variant bg-surface">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 justify-center">
          <Ionicons name="arrow-back" size={24} color="#1b1b20" />
        </TouchableOpacity>
        <Text className="font-headline-md text-on-surface font-bold text-xl ml-2 flex-1">
          Basic Profile
        </Text>
        <Text className="font-label-bold text-on-surface-variant">Step 1 of 4</Text>
      </View>

      <View className="h-1 bg-surface-variant w-full">
        <View className="h-1 bg-primary" style={{ width: '25%' }} />
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} className="flex-1">
        <ScrollView className="flex-1 px-6 pt-6">
          <Text className="font-headline-md text-on-surface text-2xl font-bold mb-2">Tell us about yourself</Text>
          <Text className="font-body-md text-on-surface-variant mb-8">
            This helps us match you with the right therapist and personalize your experience.
          </Text>

          <View className="gap-6 mb-8">
            <View>
              <Text className="font-label-bold text-on-surface mb-2">Date of Birth</Text>
              <TextInput
                className="bg-surface-container-highest rounded-xl p-4 font-body-md text-on-surface border border-outline-variant"
                placeholder="MM/DD/YYYY"
                placeholderTextColor="#747687"
                value={dob}
                onChangeText={setDob}
              />
            </View>

            <View>
              <Text className="font-label-bold text-on-surface mb-2">Gender Identity (Optional)</Text>
              <TextInput
                className="bg-surface-container-highest rounded-xl p-4 font-body-md text-on-surface border border-outline-variant"
                placeholder="e.g., Non-binary, Female, Male"
                placeholderTextColor="#747687"
                value={gender}
                onChangeText={setGender}
              />
            </View>

            <View>
              <Text className="font-label-bold text-on-surface mb-2">Timezone</Text>
              <TextInput
                className="bg-surface-container-highest rounded-xl p-4 font-body-md text-on-surface border border-outline-variant"
                placeholder="e.g., EST, PST, GMT"
                placeholderTextColor="#747687"
                value={timezone}
                onChangeText={setTimezone}
              />
              <Text className="font-body-md text-on-surface-variant text-xs mt-2">
                Crucial for scheduling therapy sessions accurately.
              </Text>
            </View>
          </View>
        </ScrollView>

        <View className="p-6 border-t border-surface-variant bg-surface">
          <CustomButton 
            title="Next"
            onPress={() => router.push('/intake/history')}
            disabled={!dob || !timezone}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
