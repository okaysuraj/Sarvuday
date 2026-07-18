import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

export default function MoodCalendarHeatmapScreen() {
  const router = useRouter();
  const [calendarDays, setCalendarDays] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMoodHistory = async () => {
      try {
        const token = await AsyncStorage.getItem('access_token');
        const response = await fetch('http://10.0.2.2:8000/normal_user/tracking/mood/history', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const json = await response.json();
          // Map backend moods to calendar days
          // Assuming current month is October, starting on Tuesday (2 empty days)
          const days = [];
          days.push({ day: '', type: 'empty' });
          days.push({ day: '', type: 'empty' });
          
          for (let i = 1; i <= 31; i++) {
            // Find if there's a mood for this day
            // We just use a naive check for the mock
            const moodEntry = json.find((m: any) => {
              const d = new Date(m.created_at);
              return d.getDate() === i;
            });

            let type = 'empty';
            if (moodEntry) {
              const moodVal = parseInt(moodEntry.mood);
              if (moodVal >= 8) type = 'great';
              else if (moodVal >= 6) type = 'good';
              else if (moodVal >= 4) type = 'neutral';
              else type = 'low';
            } else {
              type = i <= 27 ? 'empty' : 'future'; // Arbitrary today is 27th
            }
            days.push({ day: i.toString(), type });
          }
          setCalendarDays(days);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchMoodHistory();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 bg-cream-bg items-center justify-center">
        <ActivityIndicator size="large" color="#002da5" />
      </View>
    );
  }

  const getDayStyle = (type: string) => {
    switch (type) {
      case 'great': return 'bg-secondary-container border-[1.5px] border-ink-black shadow-[2px_2px_0px_0px_#1A1A1A]';
      case 'good': return 'bg-accent-sage border-[1.5px] border-ink-black shadow-[2px_2px_0px_0px_#1A1A1A]';
      case 'neutral': return 'bg-surface-container-low border-[1.5px] border-ink-black shadow-[2px_2px_0px_0px_#1A1A1A]';
      case 'low': return 'bg-tertiary-fixed border-[1.5px] border-ink-black shadow-[2px_2px_0px_0px_#1A1A1A]';
      case 'reflective': return 'bg-primary-fixed border-[1.5px] border-ink-black shadow-[2px_2px_0px_0px_#1A1A1A]';
      case 'future': return 'bg-transparent border-[1.5px] border-ink-black border-dashed';
      default: return 'bg-transparent';
    }
  };

  return (
    <View className="flex-1 bg-cream-bg">
      {/* TopAppBar */}
      <View className="flex-row justify-between items-center px-4 py-4 w-full z-50 bg-cream-bg border-b-[1.5px] border-ink-black sticky top-0">
        <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full active:bg-surface-container">
          <Ionicons name="menu" size={24} color="#002da5" />
        </TouchableOpacity>
        <Text className="font-headline-md text-primary font-bold text-xl">Mindful Insights</Text>
        <TouchableOpacity className="w-10 h-10 rounded-full border-[1.5px] border-ink-black bg-surface items-center justify-center overflow-hidden">
          <Ionicons name="person" size={20} color="#002da5" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 md:px-10 py-6 max-w-4xl mx-auto w-full flex-col gap-6" contentContainerStyle={{ paddingBottom: 120 }}>
        
        {/* Header Section */}
        <View className="flex-col md:flex-row justify-between items-start md:items-end gap-4 bg-surface-container-lowest p-6 rounded-[24px] border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] relative overflow-hidden mb-6">
          <View className="relative z-10">
            <Text className="font-display-lg-mobile md:font-display-lg text-primary font-bold text-3xl md:text-5xl mb-2">October Overview</Text>
            <Text className="font-body-lg text-on-surface-variant text-lg">A bird's-eye view of your emotional rhythm this month.</Text>
          </View>
          <View className="flex-row items-center gap-2 relative z-10">
            <TouchableOpacity className="bg-surface rounded-full w-10 h-10 items-center justify-center border-[1.5px] border-ink-black shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
              <Ionicons name="chevron-back" size={20} color="#002da5" />
            </TouchableOpacity>
            <Text className="font-label-bold text-ink-black font-bold px-4 text-base">Oct 2023</Text>
            <TouchableOpacity className="bg-surface rounded-full w-10 h-10 items-center justify-center border-[1.5px] border-ink-black shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
              <Ionicons name="chevron-forward" size={20} color="#002da5" />
            </TouchableOpacity>
          </View>
          {/* Decorative shapes */}
          <View className="absolute -top-10 -right-10 w-32 h-32 bg-secondary-fixed rounded-full border-[1.5px] border-ink-black opacity-20" />
          <View className="absolute -bottom-6 left-1/2 w-20 h-20 bg-tertiary-fixed rounded-[16px] transform rotate-45 border-[1.5px] border-ink-black opacity-20" style={{ transform: [{ rotate: '45deg' }] }} />
        </View>

        {/* Calendar Heatmap */}
        <View className="bg-surface p-6 rounded-[32px] border-[1.5px] border-ink-black mb-6">
          {/* Days of week */}
          <View className="flex-row justify-between mb-4 px-2">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
              <Text key={index} className="font-label-bold text-on-surface-variant text-center font-bold w-8">{day}</Text>
            ))}
          </View>
          
          {/* Calendar Grid */}
          <View className="flex-row flex-wrap justify-between px-1">
            {calendarDays.map((item, index) => (
              <View key={index} className={`w-[13%] aspect-square mb-2 items-center justify-center rounded-xl ${getDayStyle(item.type)}`}>
                <Text className={`font-label-md font-medium ${item.type === 'future' ? 'text-on-surface-variant' : 'text-on-surface'}`}>{item.day}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Legend */}
        <View className="bg-surface p-6 rounded-[24px] border-[1.5px] border-ink-black shadow-[2px_2px_0px_0px_#1A1A1A]">
          <Text className="font-headline-sm text-primary mb-4 font-bold text-xl">Color Key</Text>
          <View className="flex-row flex-wrap gap-4">
            
            <View className="flex-row items-center gap-2 bg-surface-container p-2 pr-4 rounded-full border-[1.5px] border-ink-black">
              <View className="w-6 h-6 rounded-md bg-secondary-container border-[1.5px] border-ink-black" />
              <Text className="font-label-md text-ink-black font-bold">Great</Text>
            </View>
            
            <View className="flex-row items-center gap-2 bg-surface-container p-2 pr-4 rounded-full border-[1.5px] border-ink-black">
              <View className="w-6 h-6 rounded-md bg-accent-sage border-[1.5px] border-ink-black" />
              <Text className="font-label-md text-ink-black font-bold">Good</Text>
            </View>

            <View className="flex-row items-center gap-2 bg-surface-container p-2 pr-4 rounded-full border-[1.5px] border-ink-black">
              <View className="w-6 h-6 rounded-md bg-surface-container-low border-[1.5px] border-ink-black" />
              <Text className="font-label-md text-ink-black font-bold">Neutral</Text>
            </View>

            <View className="flex-row items-center gap-2 bg-surface-container p-2 pr-4 rounded-full border-[1.5px] border-ink-black">
              <View className="w-6 h-6 rounded-md bg-tertiary-fixed border-[1.5px] border-ink-black" />
              <Text className="font-label-md text-ink-black font-bold">Low</Text>
            </View>

            <View className="flex-row items-center gap-2 bg-surface-container p-2 pr-4 rounded-full border-[1.5px] border-ink-black">
              <View className="w-6 h-6 rounded-md bg-primary-fixed border-[1.5px] border-ink-black" />
              <Text className="font-label-md text-ink-black font-bold">Reflective</Text>
            </View>

          </View>
        </View>

      </ScrollView>

      {/* BottomNavBar */}
      <View className="md:hidden absolute bottom-0 w-full bg-surface border-t-[1.5px] border-ink-black px-4 pb-4 h-20 flex-row justify-around items-center z-50">
        <TouchableOpacity onPress={() => router.push('/patient/dashboard')} className="flex-col items-center justify-center px-2">
          <Ionicons name="home" size={24} color="#434655" className="mb-1" />
          <Text className="font-label-md text-on-surface-variant text-[10px]">Home</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center px-2">
          <Ionicons name="chatbubble" size={24} color="#434655" className="mb-1" />
          <Text className="font-label-md text-on-surface-variant text-[10px]">AI Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center bg-secondary-container border-[1.5px] border-ink-black rounded-xl px-4 py-1.5">
          <Ionicons name="stats-chart" size={24} color="#715b00" className="mb-1" />
          <Text className="font-label-md text-on-secondary-container font-bold text-[10px]">Tracker</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center px-2">
          <Ionicons name="person" size={24} color="#434655" className="mb-1" />
          <Text className="font-label-md text-on-surface-variant text-[10px]">Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
