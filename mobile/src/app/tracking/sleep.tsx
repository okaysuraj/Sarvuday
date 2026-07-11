import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CustomButton } from '../../components/CustomButton';

export default function SleepTrackingScreen() {
  const router = useRouter();
  const [hours, setHours] = useState('7');
  const [quality, setQuality] = useState<'poor' | 'fair' | 'good' | 'excellent'>('good');

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <View className="flex-row items-center px-4 py-3 border-b border-surface-variant bg-surface">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 justify-center">
          <Ionicons name="arrow-back" size={24} color="#1b1b20" />
        </TouchableOpacity>
        <Text className="font-headline-md text-on-surface font-bold text-xl ml-2 flex-1">
          Sleep Tracker
        </Text>
      </View>

      <ScrollView className="flex-1 px-6 pt-6">
        <View className="items-center mb-12">
          <Ionicons name="moon" size={64} color="#002da5" className="mb-4" />
          <Text className="font-headline-md text-on-surface text-2xl font-bold mb-2">How did you sleep?</Text>
          <Text className="font-body-md text-on-surface-variant text-center px-4">
            Tracking your sleep helps us find correlations with your mood swings.
          </Text>
        </View>

        <View className="mb-8">
          <Text className="font-headline-md text-on-surface text-lg font-bold mb-4">Duration (Hours)</Text>
          <View className="flex-row justify-center items-center gap-6">
            <TouchableOpacity 
              onPress={() => setHours(String(Math.max(0, parseInt(hours) - 1)))}
              className="w-12 h-12 rounded-full bg-surface-variant items-center justify-center"
            >
              <Ionicons name="remove" size={24} color="#1b1b20" />
            </TouchableOpacity>
            
            <Text className="font-headline-md text-on-surface font-bold text-5xl w-24 text-center">{hours}</Text>
            
            <TouchableOpacity 
              onPress={() => setHours(String(Math.min(24, parseInt(hours) + 1)))}
              className="w-12 h-12 rounded-full bg-surface-variant items-center justify-center"
            >
              <Ionicons name="add" size={24} color="#1b1b20" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="mb-12">
          <Text className="font-headline-md text-on-surface text-lg font-bold mb-4">Quality</Text>
          <View className="flex-row justify-between">
            {['poor', 'fair', 'good', 'excellent'].map((q) => (
              <TouchableOpacity 
                key={q}
                onPress={() => setQuality(q as any)}
                className={`flex-1 mx-1 py-3 items-center rounded-xl border-2 ${quality === q ? 'bg-primary border-primary' : 'bg-surface border-outline-variant'}`}
              >
                <Text className={`font-label-bold capitalize ${quality === q ? 'text-white' : 'text-on-surface'}`}>
                  {q}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <View className="p-6 border-t border-surface-variant bg-surface">
        <CustomButton 
          title="Log Sleep"
          onPress={() => router.replace('/(tabs)')}
        />
      </View>
    </SafeAreaView>
  );
}
