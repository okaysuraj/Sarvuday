import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { CustomButton } from '../../components/CustomButton';
import { Ionicons } from '@expo/vector-icons';

export default function RoleSelectionScreen() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<'patient' | 'therapist' | null>(null);

  const handleContinue = () => {
    if (selectedRole) {
      router.push({ pathname: '/(auth)/sign-up', params: { role: selectedRole } });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <View className="px-6 pt-4 pb-8 flex-1">
        <TouchableOpacity onPress={() => router.back()} className="mb-6 w-10 h-10 justify-center">
          <Ionicons name="arrow-back" size={24} color="#1b1b20" />
        </TouchableOpacity>

        <Text className="font-headline-md text-on-surface text-3xl font-bold mb-2">
          Who are you?
        </Text>
        <Text className="font-body-md text-on-surface-variant text-base mb-10">
          Select your role to get the best experience tailored for you.
        </Text>

        <View className="gap-6 flex-1">
          <TouchableOpacity
            onPress={() => setSelectedRole('patient')}
            className={`p-6 rounded-xl border-2 ${
              selectedRole === 'patient' ? 'border-primary bg-primary-fixed' : 'border-outline-variant bg-surface-container-highest'
            } flex-row items-center`}
          >
            <View className="w-12 h-12 rounded-full bg-primary-fixed-dim items-center justify-center mr-4">
               <Ionicons name="person" size={24} color="#002da5" />
            </View>
            <View className="flex-1">
              <Text className="font-headline-md font-bold text-lg text-on-surface">I'm looking for help</Text>
              <Text className="font-body-md text-on-surface-variant text-sm mt-1">Patient / User</Text>
            </View>
            {selectedRole === 'patient' && (
              <Ionicons name="checkmark-circle" size={24} color="#002da5" />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setSelectedRole('therapist')}
            className={`p-6 rounded-xl border-2 ${
              selectedRole === 'therapist' ? 'border-primary bg-primary-fixed' : 'border-outline-variant bg-surface-container-highest'
            } flex-row items-center`}
          >
            <View className="w-12 h-12 rounded-full bg-tertiary-fixed-dim items-center justify-center mr-4">
               <Ionicons name="medical" size={24} color="#5a3039" />
            </View>
            <View className="flex-1">
              <Text className="font-headline-md font-bold text-lg text-on-surface">I'm a Therapist</Text>
              <Text className="font-body-md text-on-surface-variant text-sm mt-1">Provide care and support</Text>
            </View>
            {selectedRole === 'therapist' && (
              <Ionicons name="checkmark-circle" size={24} color="#002da5" />
            )}
          </TouchableOpacity>
        </View>

        <CustomButton
          title="Continue"
          onPress={handleContinue}
          disabled={!selectedRole}
          className="mt-auto"
        />
      </View>
    </SafeAreaView>
  );
}
