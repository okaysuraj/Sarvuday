import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CustomButton } from '../../../components/CustomButton';

export default function PatientDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <View className="flex-row items-center px-4 py-3 border-b border-surface-variant bg-surface">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 justify-center">
          <Ionicons name="arrow-back" size={24} color="#1b1b20" />
        </TouchableOpacity>
        <Text className="font-headline-md text-on-surface font-bold text-xl ml-2 flex-1">
          Patient Detail
        </Text>
      </View>

      <ScrollView className="flex-1 px-6 pt-6">
        <View className="items-center mb-8">
          <View className="w-20 h-20 rounded-full bg-surface-variant items-center justify-center mb-4">
            <Ionicons name="person" size={40} color="#747687" />
          </View>
          <Text className="font-headline-md text-on-surface font-bold text-2xl">Maria Garcia</Text>
          <Text className="font-body-md text-on-surface-variant text-base mt-1">Diagnosis: GAD</Text>
        </View>

        <Text className="font-headline-md text-on-surface text-lg font-bold mb-4">Recent AI Alerts</Text>
        <View className="bg-error-container p-4 rounded-xl border border-error mb-8">
          <View className="flex-row items-center mb-2">
            <Ionicons name="warning" size={20} color="#ba1a1a" className="mr-2" />
            <Text className="font-headline-md text-on-error-container font-bold">High Stress Flag</Text>
          </View>
          <Text className="font-body-md text-on-error-container">
            Maria's recent journal entries indicate elevated anxiety regarding work deadlines. 
            Consider discussing coping mechanisms next session.
          </Text>
        </View>

        <Text className="font-headline-md text-on-surface text-lg font-bold mb-4">Mood Trends (Shared)</Text>
        <View className="bg-surface-container-highest p-6 rounded-2xl mb-8 border border-outline-variant">
          <View className="h-32 justify-end flex-row items-end gap-3 mb-4">
            <View className="w-8 h-12 bg-secondary rounded-t-sm" />
            <View className="w-8 h-8 bg-error rounded-t-sm" />
            <View className="w-8 h-10 bg-error rounded-t-sm" />
            <View className="w-8 h-16 bg-secondary rounded-t-sm" />
            <View className="w-8 h-20 bg-primary rounded-t-sm" />
          </View>
          <Text className="font-body-md text-on-surface-variant text-sm text-center">
            Last 5 check-ins. Recovery noted in the last 2 days.
          </Text>
        </View>

        <View className="gap-3 mb-8">
          <TouchableOpacity className="bg-surface-container-highest p-4 rounded-xl flex-row justify-between items-center border border-outline-variant">
            <View className="flex-row items-center">
              <Ionicons name="document-text" size={24} color="#1b1b20" className="mr-3" />
              <Text className="font-headline-md text-on-surface font-bold text-base">Treatment Plan</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#747687" />
          </TouchableOpacity>
          
          <TouchableOpacity className="bg-surface-container-highest p-4 rounded-xl flex-row justify-between items-center border border-outline-variant">
            <View className="flex-row items-center">
              <Ionicons name="book" size={24} color="#1b1b20" className="mr-3" />
              <Text className="font-headline-md text-on-surface font-bold text-base">Past Session Notes</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#747687" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View className="p-6 border-t border-surface-variant bg-surface">
        <CustomButton 
          title="Message Maria"
          onPress={() => router.push(`/chat/${id}`)}
        />
      </View>
    </SafeAreaView>
  );
}
