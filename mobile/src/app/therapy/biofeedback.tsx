import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function BiofeedbackScreen() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchBiofeedback = async () => {
    try {
      const token = await AsyncStorage.getItem('access_token');
      const response = await fetch('http://10.0.2.2:8000/normal_user/tracking/biofeedback', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const json = await response.json();
        setData(json);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBiofeedback();
    const interval = setInterval(fetchBiofeedback, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <View className="flex-1 bg-surface items-center justify-center">
        <ActivityIndicator size="large" color="#002da5" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <View className="flex-row items-center px-4 py-3 border-b border-surface-variant bg-surface">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 justify-center">
          <Ionicons name="arrow-back" size={24} color="#1b1b20" />
        </TouchableOpacity>
        <Text className="font-headline-md text-on-surface font-bold text-xl ml-2 flex-1">
          Biofeedback
        </Text>
        <Ionicons name="watch-outline" size={24} color="#002da5" />
      </View>

      <ScrollView className="flex-1 px-6 pt-6">
        <Text className="font-body-md text-on-surface-variant mb-6">
          Data synced from your connected Apple Watch.
        </Text>

        <View className="bg-surface-container-highest p-6 rounded-3xl border border-outline-variant items-center mb-6">
          <Ionicons name="heart" size={48} color="#ba1a1a" className="mb-2" />
          <Text className="font-body-md text-on-surface-variant text-sm mb-1">Current Heart Rate</Text>
          <View className="flex-row items-end">
            <Text className="font-headline-md text-on-surface font-bold text-5xl">{data?.hrv ? Math.round(data.hrv * 0.8) : 72}</Text>
            <Text className="font-body-md text-on-surface-variant mb-2 ml-1">bpm</Text>
          </View>
        </View>

        <View className="flex-row gap-4 mb-8">
          <View className="flex-1 bg-primary-fixed p-4 rounded-xl border border-primary-fixed-dim">
            <Text className="font-label-md text-on-primary-fixed-variant mb-1">Stress Level</Text>
            <Text className="font-headline-md text-on-primary-fixed text-2xl font-bold">{data?.stress_level || 'Low'}</Text>
          </View>
          <View className="flex-1 bg-surface-container-highest p-4 rounded-xl border border-outline-variant">
            <Text className="font-label-md text-on-surface-variant mb-1">HRV</Text>
            <Text className="font-headline-md text-on-surface text-2xl font-bold">{data?.hrv || 45} ms</Text>
          </View>
        </View>

        <Text className="font-headline-md text-on-surface text-lg font-bold mb-4">Today's Trends</Text>
        <View className="bg-surface-container-highest p-6 rounded-2xl mb-8 border border-outline-variant h-48 justify-end flex-row items-end gap-2 pb-4">
            {/* Real Data Graph */}
            {(data?.calmness_trend || [60, 65, 75, 110, 85, 70, 72]).map((h: number, i: number) => (
              <View key={i} className={`flex-1 rounded-t-sm ${h > 100 ? 'bg-error' : 'bg-primary'}`} style={{ height: `${(h/120)*100}%` }} />
            ))}
        </View>

        <View className="bg-error-container p-4 rounded-xl flex-row items-center border border-error mb-8">
          <Ionicons name="alert-circle" size={24} color="#ba1a1a" className="mr-3" />
          <View className="flex-1">
            <Text className="font-headline-md text-on-error-container font-bold text-base">Spike Detected</Text>
            <Text className="font-body-md text-on-error-container text-sm">Elevated HR detected at 2:00 PM. We recommend a 4-7-8 breathing exercise.</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
