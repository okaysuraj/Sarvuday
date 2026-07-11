import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function EmergencyHubScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <View className="flex-row items-center px-4 py-3 border-b border-surface-variant bg-surface">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 justify-center">
          <Ionicons name="arrow-back" size={24} color="#1b1b20" />
        </TouchableOpacity>
        <Text className="font-headline-md text-on-surface font-bold text-xl ml-2 flex-1">
          Emergency Help
        </Text>
      </View>

      <ScrollView className="flex-1 px-6 pt-6">
        <View className="bg-error p-6 rounded-3xl mb-8 items-center shadow-lg">
          <Ionicons name="warning" size={48} color="#ffffff" className="mb-4" />
          <Text className="font-headline-md text-white font-bold text-2xl text-center mb-2">
            Are you in immediate danger?
          </Text>
          <Text className="font-body-md text-white text-center mb-6 opacity-90">
            If you or someone else is in immediate physical danger, please call emergency services right away.
          </Text>
          
          <TouchableOpacity 
            onPress={() => Linking.openURL('tel:911')}
            className="w-full bg-white py-4 rounded-xl flex-row justify-center items-center"
          >
            <Ionicons name="call" size={24} color="#ba1a1a" className="mr-2" />
            <Text className="font-headline-md text-error font-bold text-lg">Call 911</Text>
          </TouchableOpacity>
        </View>

        <Text className="font-headline-md text-on-surface text-lg font-bold mb-4">Personal Contacts</Text>
        <TouchableOpacity 
          onPress={() => router.push('/emergency/contact')}
          className="bg-surface-container-highest p-4 rounded-xl flex-row items-center justify-between border border-outline-variant mb-8"
        >
          <View className="flex-row items-center">
            <View className="w-12 h-12 rounded-full bg-error-container items-center justify-center mr-4">
              <Ionicons name="heart" size={24} color="#ba1a1a" />
            </View>
            <View>
              <Text className="font-headline-md text-on-surface font-bold text-base">My Emergency Contact</Text>
              <Text className="font-body-md text-on-surface-variant text-sm">Jane Doe (Spouse)</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#747687" />
        </TouchableOpacity>

        <Text className="font-headline-md text-on-surface text-lg font-bold mb-4">Helplines (Available 24/7)</Text>
        <View className="gap-4 mb-8">
          <TouchableOpacity className="bg-surface-container-highest p-4 rounded-xl flex-row items-center border border-outline-variant">
            <Ionicons name="call-outline" size={24} color="#1b1b20" className="mr-4" />
            <View className="flex-1">
              <Text className="font-headline-md text-on-surface font-bold text-base">National Suicide Prevention Lifeline</Text>
              <Text className="font-body-md text-on-surface-variant text-sm mt-1">Dial 988</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity className="bg-surface-container-highest p-4 rounded-xl flex-row items-center border border-outline-variant">
            <Ionicons name="chatbubble-outline" size={24} color="#1b1b20" className="mr-4" />
            <View className="flex-1">
              <Text className="font-headline-md text-on-surface font-bold text-base">Crisis Text Line</Text>
              <Text className="font-body-md text-on-surface-variant text-sm mt-1">Text HOME to 741741</Text>
            </View>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
