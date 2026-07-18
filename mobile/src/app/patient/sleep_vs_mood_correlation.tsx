import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

export default function SleepVsMoodCorrelationScreen() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('access_token');
        const response = await fetch('http://10.0.2.2:8000/normal_user/tracking/correlation', {
          headers: { 'Authorization': `Bearer ${token}` }
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
    fetchData();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 bg-cream-bg items-center justify-center">
        <ActivityIndicator size="large" color="#002da5" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-cream-bg">
      {/* TopAppBar */}
      <View className="flex-row justify-between items-center px-4 py-4 w-full z-50 bg-cream-bg border-b-[1.5px] border-ink-black sticky top-0">
        <TouchableOpacity onPress={() => router.back()} className="p-2 text-primary active:bg-surface-container rounded-full items-center justify-center">
          <Ionicons name="menu" size={24} color="#002da5" />
        </TouchableOpacity>
        <Text className="font-headline-sm-mobile md:font-headline-sm text-primary font-bold text-xl">Mindful Insights</Text>
        <TouchableOpacity className="h-10 w-10 rounded-full border-[1.5px] border-ink-black overflow-hidden bg-surface-container-high items-center justify-center">
          <Ionicons name="person" size={20} color="#1b1b20" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 md:px-10 py-6 max-w-7xl mx-auto w-full mb-24" contentContainerStyle={{ paddingBottom: 120 }}>
        
        {/* Header */}
        <View className="mb-6">
          <Text className="font-display-lg-mobile md:font-display-lg text-ink-black font-bold text-3xl md:text-5xl mb-2">Sleep & Mood</Text>
          <Text className="font-body-md text-on-surface-variant max-w-2xl text-base">Discover how your rest impacts your daily well-being.</Text>
        </View>

        {/* Bento Grid Layout */}
        <View className="flex-col md:flex-row gap-6">
          
          {/* Main Chart Card */}
          <View className="flex-[2] bg-surface border-[1.5px] border-ink-black rounded-[24px] p-6 md:p-8">
            <View className="flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <Text className="font-headline-sm text-ink-black font-bold text-xl">Correlation</Text>
              <View className="flex-row gap-2">
                <View className="bg-accent-sage/30 px-3 py-1 rounded-full border-[1.5px] border-ink-black">
                  <Text className="font-label-md text-ink-black font-bold text-xs">Sleep (hrs)</Text>
                </View>
                <View className="bg-secondary-container px-3 py-1 rounded-full border-[1.5px] border-ink-black">
                  <Text className="font-label-md text-ink-black font-bold text-xs">Mood (1-10)</Text>
                </View>
              </View>
            </View>

            {/* Dynamic Chart Area */}
            <View className="w-full h-64 relative mt-6 flex-row items-end justify-between gap-2 border-l-[1.5px] border-b-[1.5px] border-ink-black pb-2 pl-2">
              
              {/* Y Axis Labels */}
              <View className="absolute -left-6 h-full flex-col justify-between py-2">
                <Text className="text-xs font-bold text-outline">10</Text>
                <Text className="text-xs font-bold text-outline">5</Text>
                <Text className="text-xs font-bold text-outline">0</Text>
              </View>

              {/* Bars / Points (Dynamic) */}
              {(data?.data_points || []).map((point: any, index: number) => {
                // Sleep height max is 10 hours for 100% height
                const sleepHeight = Math.min((point.sleep / 10) * 100, 100);
                // Mood max is 10
                const moodY = Math.min((point.mood / 10) * 100, 100);
                return (
                  <View key={index} className="flex-1 bg-primary relative border-[1.5px] border-ink-black shadow-[2px_2px_0px_0px_#1A1A1A] rounded-t-lg mx-1 items-center justify-start pt-2" style={{ height: `${sleepHeight}%` }}>
                    <Text className="text-white text-xs font-bold hidden md:flex">{point.sleep}h</Text>
                    <View className="absolute w-4 h-4 rounded-full bg-secondary-container border-[1.5px] border-ink-black z-10" style={{ bottom: `${moodY}%` }} />
                  </View>
                );
              })}

              {/* X Axis Line Decoration */}
              <View className="absolute -bottom-6 left-0 right-0 flex-row justify-around">
                {(data?.data_points || []).map((point: any, index: number) => (
                  <Text key={index} className="text-xs font-bold text-outline">{point.day}</Text>
                ))}
              </View>
            </View>
          </View>

          {/* AI Insight Card */}
          <View className="flex-[1] bg-secondary-container border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] rounded-[32px] p-6 md:p-8 flex-col justify-between relative overflow-hidden">
            {/* Decorative background shape */}
            <View className="absolute -right-10 -top-10 w-32 h-32 bg-accent-orange rounded-full border-[1.5px] border-ink-black opacity-50" />
            <View>
              <View className="flex-row items-center gap-2 mb-4">
                <Ionicons name="sparkles" size={20} color="#1A1A1A" />
                <Text className="font-label-bold text-ink-black font-bold uppercase text-xs">AI Finding</Text>
              </View>
              <Text className="font-headline-sm text-ink-black font-bold text-2xl leading-tight">{data?.insight || 'When you sleep 8+ hours, your mood improves by 24%'}</Text>
            </View>
            <View className="mt-6">
              <TouchableOpacity className="w-full bg-surface text-ink-black py-3 px-4 rounded-xl border-[1.5px] border-ink-black shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex-row items-center justify-center gap-2">
                <Text className="font-label-bold font-bold text-ink-black text-sm">View Details</Text>
                <Ionicons name="arrow-forward" size={16} color="#1A1A1A" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Quality Trends */}
        <View className="flex-col md:flex-row gap-6 mt-6">
          <View className="flex-1 bg-accent-sage border-[1.5px] border-ink-black rounded-[24px] p-6 flex-row items-center gap-4 relative overflow-hidden">
            <View className="w-16 h-16 rounded-full bg-surface border-[1.5px] border-ink-black flex-row items-center justify-center z-10">
              <Ionicons name="moon" size={32} color="#002da5" />
            </View>
            <View className="z-10 flex-1">
              <Text className="font-label-bold text-ink-black font-bold uppercase mb-1 text-xs">Sleep Quality Trends</Text>
              <Text className="font-body-md text-on-surface-variant text-sm">{data?.sleep_quality_trend || 'Deep sleep increased by 15m this week.'}</Text>
            </View>
            {/* Decorative background shape */}
            <View className="absolute -left-4 -bottom-8 w-24 h-24 bg-accent-pink rounded-lg border-[1.5px] border-ink-black opacity-40" style={{ transform: [{ rotate: '12deg' }] }} />
          </View>

          <View className="flex-1 bg-accent-pink border-[1.5px] border-ink-black rounded-[24px] p-6 flex-row items-center gap-4 relative overflow-hidden">
            <View className="w-16 h-16 rounded-full bg-surface border-[1.5px] border-ink-black flex-row items-center justify-center z-10">
              <Ionicons name="happy" size={32} color="#002da5" />
            </View>
            <View className="z-10 flex-1">
              <Text className="font-label-bold text-ink-black font-bold uppercase mb-1 text-xs">Mood Consistency</Text>
              <Text className="font-body-md text-on-surface-variant text-sm">{data?.mood_consistency || 'Steady mood scores over the last 5 days.'}</Text>
            </View>
          </View>
        </View>

      </ScrollView>

      {/* BottomNavBar */}
      <View className="md:hidden absolute bottom-0 w-full bg-surface border-t-[1.5px] border-ink-black h-20 px-4 pb-4 flex-row justify-around items-center z-50">
        <TouchableOpacity onPress={() => router.push('/patient/dashboard')} className="flex-col items-center justify-center px-2">
          <Ionicons name="home" size={24} color="#434655" className="mb-1" />
          <Text className="font-label-md text-on-surface-variant text-[10px]">Home</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center px-2">
          <Ionicons name="chatbubble" size={24} color="#434655" className="mb-1" />
          <Text className="font-label-md text-on-surface-variant text-[10px]">AI Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center bg-secondary-container border-[1.5px] border-ink-black rounded-xl px-4 py-1.5 -translate-y-2">
          <Ionicons name="stats-chart" size={24} color="#715b00" className="mb-1" />
          <Text className="font-label-md text-[#715b00] font-bold text-[10px]">Tracker</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center px-2">
          <Ionicons name="person" size={24} color="#434655" className="mb-1" />
          <Text className="font-label-md text-on-surface-variant text-[10px]">Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
