import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { trackingApi } from '../../api/tracking';
import { format } from 'date-fns';

export default function SleepScreen() {
  const [sleeps, setSleeps] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLogging, setIsLogging] = useState(false);

  useEffect(() => {
    fetchSleeps();
  }, []);

  const fetchSleeps = async () => {
    try {
      const data = await trackingApi.getSleepHistory();
      setSleeps(data || []);
    } catch (error) {
      console.error('Error fetching sleeps:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogSleep = async () => {
    setIsLogging(true);
    try {
      await trackingApi.logSleep({
        date: format(new Date(), 'yyyy-MM-dd'),
        duration_hours: 7.5,
        quality: 'Good'
      });
      await fetchSleeps();
    } catch (error) {
      console.error('Error logging sleep:', error);
    } finally {
      setIsLogging(false);
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 bg-background justify-center items-center">
        <ActivityIndicator size="large" color="#002da5" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-cream-bg">
      {/* Header */}
      <View className="flex-row justify-between items-center px-6 py-4 w-full border-b-[1.5px] border-ink-black bg-cream-bg z-50">
        <View className="w-10" />
        <Text className="font-headline-sm text-primary font-bold text-xl uppercase tracking-tighter">Sleep Analysis</Text>
        <TouchableOpacity className="w-10 h-10 rounded-full border-[1.5px] border-ink-black bg-accent-sage flex items-center justify-center">
           <Ionicons name="person" size={24} color="#1A1A1A" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 py-6" contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Score & Insights row */}
        <View className="flex-col gap-6 mb-8">
          <View className="bg-white border-[1.5px] border-ink-black rounded-[32px] p-6 items-center justify-center shadow-[4px_4px_0px_0px_#1A1A1A]">
            <Text className="font-label-bold text-on-surface-variant uppercase font-bold tracking-widest mb-4">Sleep Score</Text>
            <View className="relative w-32 h-32 items-center justify-center border-8 border-primary rounded-full mb-4">
              <Text className="font-headline-md text-ink-black font-bold text-4xl">85</Text>
            </View>
            <Text className="font-body-md text-on-surface-variant italic">"You're in the top 10% today!"</Text>
          </View>

          <View className="bg-accent-pink border-[1.5px] border-ink-black rounded-[32px] p-6 shadow-[4px_4px_0px_0px_#1A1A1A]">
            <View className="flex-row items-center gap-2 mb-2">
              <Ionicons name="body" size={24} color="#5a3039" />
              <Text className="font-headline-sm text-[#5a3039] font-bold text-xl">Mood Impact</Text>
            </View>
            <Text className="font-body-lg text-[#5a3039] leading-relaxed mb-6">
              Your high Deep Sleep duration (2h 15m) correlates with the Calm mood you reported this morning.
            </Text>
            <View className="flex-row gap-3">
              <View className="px-4 py-2 bg-white border-[1.5px] border-ink-black rounded-full shadow-[2px_2px_0px_0px_#1A1A1A]">
                <Text className="font-label-bold text-ink-black font-bold">Reduced Anxiety</Text>
              </View>
              <View className="px-4 py-2 bg-white border-[1.5px] border-ink-black rounded-full shadow-[2px_2px_0px_0px_#1A1A1A]">
                <Text className="font-label-bold text-ink-black font-bold">Peak Focus</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Action / History */}
        <View className="flex-row justify-between items-center mb-4">
          <Text className="font-headline-sm text-ink-black font-bold text-xl">Sleep History</Text>
          <TouchableOpacity 
            onPress={handleLogSleep}
            disabled={isLogging}
            className="bg-primary px-4 py-2 rounded-xl border-[1.5px] border-ink-black shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
          >
            {isLogging ? (
               <ActivityIndicator size="small" color="#ffffff" />
            ) : (
               <Text className="font-label-bold text-white font-bold">Log Sleep</Text>
            )}
          </TouchableOpacity>
        </View>

        {sleeps.length === 0 ? (
          <Text className="font-body-md text-on-surface-variant text-center my-4">No sleep logged yet.</Text>
        ) : (
          <View className="flex-col gap-4">
            {sleeps.map((s, idx) => (
              <View key={idx} className="bg-white border-[1.5px] border-ink-black rounded-[24px] p-6 shadow-[2px_2px_0px_0px_#1A1A1A]">
                <View className="flex-row justify-between items-center mb-4">
                  <View className="flex-row items-center gap-3">
                    <View className="w-10 h-10 bg-primary-fixed border-[1.5px] border-ink-black rounded-xl flex items-center justify-center">
                      <Ionicons name="moon" size={20} color="#001356" />
                    </View>
                    <Text className="font-label-bold text-ink-black font-bold text-lg">{s.duration_hours} hrs</Text>
                  </View>
                  <Text className="font-label-bold text-on-surface-variant uppercase font-bold text-xs">{s.date}</Text>
                </View>
                <View className="h-6 w-full bg-surface-container border-[1.5px] border-ink-black rounded-full overflow-hidden">
                  <View className="h-full bg-primary" style={{ width: `${Math.min((s.duration_hours / 8) * 100, 100)}%` }} />
                </View>
                <Text className="font-body-md text-ink-black mt-2">Quality: {s.quality}</Text>
              </View>
            ))}
          </View>
        )}

      </ScrollView>
    </View>
  );
}
