import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RevenueDashboardScreen() {
  const router = useRouter();
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'year'>('month');
  const [revenue, setRevenue] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = await AsyncStorage.getItem('access_token');
        const res = await fetch('http://10.0.2.2:8000/counsellor/dashboard', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const json = await res.json();
          setRevenue(json.revenue || 0);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-surface items-center justify-center">
        <ActivityIndicator size="large" color="#002da5" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <View className="flex-row items-center px-4 py-3 border-b border-surface-variant bg-surface">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 justify-center">
          <Ionicons name="arrow-back" size={24} color="#1b1b20" />
        </TouchableOpacity>
        <Text className="font-headline-md text-on-surface font-bold text-xl ml-2 flex-1">
          Revenue Analytics
        </Text>
      </View>

      <ScrollView className="flex-1 px-6 pt-4">
        {/* Timeframe Selector */}
        <View className="flex-row bg-surface-container-highest p-1 rounded-xl mb-8">
          {['week', 'month', 'year'].map(t => (
            <TouchableOpacity 
              key={t}
              onPress={() => setTimeframe(t as any)}
              className={`flex-1 py-2 items-center rounded-lg ${timeframe === t ? 'bg-surface shadow-sm' : ''}`}
            >
              <Text className={`font-headline-md font-bold capitalize ${timeframe === t ? 'text-primary' : 'text-on-surface-variant'}`}>
                {t}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text className="font-headline-md text-on-surface text-lg font-bold mb-4">Total Revenue</Text>
        <View className="bg-surface-container-highest p-6 rounded-2xl mb-8 border border-outline-variant">
          <Text className="font-headline-md text-on-surface font-bold text-4xl mb-6 text-center">${revenue.toFixed(2)}</Text>
          
          {/* Mock Graph */}
          <View className="h-40 justify-end flex-row items-end gap-2 mb-4 border-b border-surface-variant pb-2">
            {[40, 60, 30, 80, 50, 90, 100].map((h, i) => (
              <View key={i} className="flex-1 bg-primary rounded-t-sm" style={{ height: `${h}%` }} />
            ))}
          </View>
          <View className="flex-row justify-between">
            <Text className="font-label-md text-on-surface-variant text-xs">Oct 1</Text>
            <Text className="font-label-md text-on-surface-variant text-xs">Oct 15</Text>
            <Text className="font-label-md text-on-surface-variant text-xs">Oct 31</Text>
          </View>
        </View>

        <Text className="font-headline-md text-on-surface text-lg font-bold mb-4">Revenue Breakdown</Text>
        <View className="gap-4 mb-8">
          <View className="bg-surface-container-highest p-4 rounded-xl flex-row items-center justify-between border border-outline-variant">
            <View className="flex-row items-center">
              <View className="w-4 h-4 rounded-full bg-primary mr-3" />
              <Text className="font-headline-md text-on-surface font-bold text-base">Video Sessions</Text>
            </View>
            <Text className="font-headline-md text-on-surface font-bold text-base">$2,400.00</Text>
          </View>
          <View className="bg-surface-container-highest p-4 rounded-xl flex-row items-center justify-between border border-outline-variant">
            <View className="flex-row items-center">
              <View className="w-4 h-4 rounded-full bg-secondary mr-3" />
              <Text className="font-headline-md text-on-surface font-bold text-base">Audio Sessions</Text>
            </View>
            <Text className="font-headline-md text-on-surface font-bold text-base">$800.00</Text>
          </View>
          <View className="bg-surface-container-highest p-4 rounded-xl flex-row items-center justify-between border border-outline-variant">
            <View className="flex-row items-center">
              <View className="w-4 h-4 rounded-full bg-tertiary mr-3" />
              <Text className="font-headline-md text-on-surface font-bold text-base">Chat Support</Text>
            </View>
            <Text className="font-headline-md text-on-surface font-bold text-base">$250.00</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
