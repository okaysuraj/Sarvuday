import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function BiofeedbackDashboardScreen() {
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
    <View className="flex-1 bg-surface">
      {/* TopAppBar Shell */}
      <View className="w-full top-0 bg-surface border-b-[1.5px] border-ink-black flex-row justify-between items-center px-6 py-4 z-50">
        <View className="flex-row items-center gap-4">
          <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center rounded-full active:bg-surface-variant">
            <Ionicons name="arrow-back" size={24} color="#002da5" />
          </TouchableOpacity>
          <Text className="font-headline-sm-mobile md:font-headline-md font-bold text-primary text-xl">SarvUday</Text>
        </View>
        <View className="flex-row items-center gap-2">
          <Text className="hidden md:block font-label-bold text-on-surface-variant mr-4">SYSTEMS NOMINAL</Text>
          <TouchableOpacity className="w-10 h-10 items-center justify-center rounded-full active:bg-surface-variant">
            <Ionicons name="person-circle" size={28} color="#002da5" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1 px-4 py-8 max-w-7xl mx-auto w-full" contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Header & Status */}
        <View className="mb-10 flex-col md:flex-row md:items-end justify-between gap-6">
          <View>
            <Text className="font-label-bold text-primary font-bold tracking-widest uppercase mb-2">Live Telemetry</Text>
            <Text className="font-display-lg-mobile md:font-display-lg text-ink-black font-bold text-4xl">Biometric Overview</Text>
          </View>
          <View className="flex-row gap-4">
            <View className="border-[1.5px] border-ink-black bg-surface-container-low px-6 py-3 rounded-xl flex-row items-center gap-3 shadow-[4px_4px_0px_0px_#1A1A1A]">
              <View className="w-3 h-3 bg-secondary rounded-full" />
              <Text className="font-label-bold text-ink-black font-bold">REAL-TIME SYNC</Text>
            </View>
          </View>
        </View>

        {/* Bento Grid Dashboard */}
        <View className="flex-col md:flex-row flex-wrap gap-6">
          
          {/* Stress Signal Gauge (Large) */}
          <View className="w-full md:w-[65%] border-[1.5px] border-ink-black bg-accent-orange rounded-[40px] p-6 md:p-8 flex-col justify-between min-h-[400px] shadow-[4px_4px_0px_0px_#1A1A1A]">
            <View className="flex-row justify-between items-start">
              <View>
                <Text className="font-headline-sm text-ink-black font-bold text-2xl mb-2">Stress Signal</Text>
                <Text className="font-body-md text-on-surface-variant max-w-xs text-base">Sympathetic nervous system activity detected via peripheral skin response.</Text>
              </View>
              <Ionicons name="warning" size={40} color="#002da5" />
            </View>

            <View className="flex-col items-center py-8">
              {/* Fake Gauge */}
              <View className="w-full h-32 relative items-center justify-end overflow-hidden border-b-2 border-ink-black">
                <View className="w-48 h-48 rounded-full border-[10px] border-[#1A1A1A] opacity-10 absolute -bottom-24" />
                <View className="w-48 h-48 rounded-full border-[10px] border-primary absolute -bottom-24" style={{ borderBottomColor: 'transparent', borderRightColor: 'transparent', transform: [{ rotate: '-45deg' }] }} />
                
                <View className="absolute inset-0 flex-col items-center justify-end pb-2">
                  <Text className="font-display-lg text-ink-black font-bold text-5xl">{data?.stress_level || 'Moderate'}</Text>
                  <Text className="font-label-bold text-ink-black font-bold opacity-70 mt-1">THRESHOLD: {data?.stress_threshold || 62}%</Text>
                </View>
              </View>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row gap-4">
              <View className="bg-white/40 border border-ink-black/20 rounded-full px-4 py-2 flex-row items-center gap-2 mr-4">
                <View className={`w-2 h-2 rounded-full ${data?.recent_arousal ? 'bg-primary' : 'bg-on-surface-variant'}`} />
                <Text className="font-label-md text-ink-black">High Arousal</Text>
              </View>
              <View className="bg-white/40 border border-ink-black/20 rounded-full px-4 py-2 flex-row items-center gap-2">
                <View className={`w-2 h-2 rounded-full ${data?.cortisol_spike ? 'bg-primary' : 'bg-on-surface-variant'}`} />
                <Text className="font-label-md text-ink-black">Cortisol Spike</Text>
              </View>
            </ScrollView>
          </View>

          {/* Heart Rate Variability (HRV) */}
          <View className="w-full md:w-[32%] border-[1.5px] border-ink-black bg-primary-fixed rounded-[40px] p-6 md:p-8 flex-col gap-6 shadow-[4px_4px_0px_0px_#1A1A1A]">
            <View className="flex-row justify-between items-start">
              <Text className="font-headline-sm text-ink-black font-bold text-2xl">HRV Score</Text>
              <Ionicons name="analytics" size={24} color="#002da5" />
            </View>
            <View className="flex-row items-baseline gap-2">
              <Text className="font-display-lg-mobile text-ink-black font-bold text-6xl">{data?.hrv || 74}</Text>
              <Text className="font-label-bold text-on-surface-variant font-bold text-lg">ms</Text>
            </View>
            <View className="flex-1 flex-row items-end gap-1 h-24">
              {/* Bars based on trend */}
              {(data?.calmness_trend || [40, 60, 45, 80, 95]).map((h: number, i: number) => (
                <View key={i} className="flex-1 bg-primary rounded-t-lg" style={{ height: `${h}%` }} />
              ))}
            </View>
            <Text className="font-body-md text-ink-black text-base mt-2">Your autonomic balance is 12% higher than yesterday’s average.</Text>
          </View>

          {/* Calmness Level Trend Graph */}
          <View className="w-full border-[1.5px] border-ink-black bg-accent-sage rounded-[40px] p-6 md:p-8 shadow-[4px_4px_0px_0px_#1A1A1A] mt-6">
            <View className="flex-col md:flex-row justify-between items-start mb-8 gap-4">
              <View>
                <Text className="font-headline-sm text-ink-black font-bold text-2xl">24h Calmness Trend</Text>
                <Text className="font-label-md text-on-surface-variant">Stability index based on HRV and breathing pace.</Text>
              </View>
              <View className="flex-row gap-2">
                <View className="bg-surface border-[1.5px] border-ink-black px-4 py-1 rounded-lg shadow-[2px_2px_0px_0px_#1A1A1A]">
                  <Text className="font-label-bold text-ink-black font-bold">24H</Text>
                </View>
                <View className="bg-surface/40 border-[1.5px] border-ink-black/20 px-4 py-1 rounded-lg">
                  <Text className="font-label-bold text-ink-black font-bold">7D</Text>
                </View>
              </View>
            </View>
            
            {/* Fake graph area */}
            <View className="w-full h-48 bg-white/30 rounded-2xl border-[1.5px] border-ink-black items-center justify-center">
              <Text className="font-label-bold text-ink-black">[Trend Chart Placeholder]</Text>
            </View>
            
            <View className="flex-row justify-between mt-4">
              {['12:00 AM', '06:00 AM', '12:00 PM', '06:00 PM', 'NOW'].map((t, i) => (
                <Text key={i} className="text-[10px] font-label-bold text-on-surface-variant font-bold uppercase">{t}</Text>
              ))}
            </View>
          </View>

          {/* Activity Prompt */}
          <View className="w-full border-[1.5px] border-ink-black bg-secondary-container rounded-[32px] p-8 flex-col md:flex-row items-center gap-8 shadow-[4px_4px_0px_0px_#1A1A1A] mt-6">
            <View className="bg-white border-[1.5px] border-ink-black p-4 rounded-2xl">
              <Ionicons name="hardware-chip" size={40} color="#002da5" />
            </View>
            <View className="flex-1 text-center md:text-left items-center md:items-start">
              <Text className="font-headline-sm text-ink-black font-bold text-xl mb-2 text-center md:text-left">Elevated stress detected in the last hour.</Text>
              <Text className="font-body-lg text-ink-black text-lg text-center md:text-left">Would you like to start a 2-minute box breathing session to reset your HRV?</Text>
            </View>
            <View className="flex-col gap-4 w-full md:w-auto">
              <TouchableOpacity className="w-full md:w-auto bg-primary border-[1.5px] border-ink-black px-8 py-4 rounded-xl shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none items-center">
                <Text className="text-white font-label-bold font-bold text-base">Start Session</Text>
              </TouchableOpacity>
              <TouchableOpacity className="w-full md:w-auto bg-white border-[1.5px] border-ink-black px-8 py-4 rounded-xl shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none items-center">
                <Text className="text-ink-black font-label-bold font-bold text-base">Dismiss</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
      </ScrollView>
    </View>
  );
}
