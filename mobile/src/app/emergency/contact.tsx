import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function EmergencyContactScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-ink-black">
      <View className="flex-row items-center px-4 py-3 bg-ink-black z-10">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 justify-center">
          <Ionicons name="close" size={32} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <View className="flex-1 items-center justify-center px-6 pb-20">
        <Text className="font-headline-md text-white text-3xl font-bold mb-16 text-center">
          Call Jane Doe?
        </Text>

        {/* Pulse Effect Rings Mockup */}
        <View className="items-center justify-center relative w-64 h-64">
          <View className="absolute w-64 h-64 rounded-full bg-error opacity-20" />
          <View className="absolute w-52 h-52 rounded-full bg-error opacity-40" />
          
          <TouchableOpacity 
            onPress={() => Linking.openURL('tel:5550000000')}
            className="w-40 h-40 rounded-full bg-error items-center justify-center shadow-lg"
          >
            <Ionicons name="call" size={64} color="#ffffff" />
          </TouchableOpacity>
        </View>

        <Text className="font-body-md text-white text-center mt-16 opacity-80">
          This will immediately dial your designated emergency contact.
        </Text>
      </View>
    </SafeAreaView>
  );
}
