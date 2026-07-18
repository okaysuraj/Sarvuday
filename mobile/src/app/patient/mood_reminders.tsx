import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function MoodRemindersScreen() {
  const router = useRouter();
  const [remindersEnabled, setRemindersEnabled] = useState(true);
  const [time, setTime] = useState('20:00');
  const [frequency, setFrequency] = useState('daily');

  return (
    <View className="flex-1 bg-cream-bg">
      {/* TopAppBar */}
      <View className="flex-row justify-between items-center px-4 py-4 w-full z-50 bg-cream-bg border-b-[1.5px] border-ink-black sticky top-0">
        <View className="flex-row items-center gap-4">
          <TouchableOpacity onPress={() => router.back()} className="hover:bg-surface-container-low p-2 rounded-full active:translate-x-[2px] active:translate-y-[2px]">
            <Ionicons name="arrow-back" size={24} color="#002da5" />
          </TouchableOpacity>
          <Text className="font-headline-sm text-primary font-bold text-xl tracking-tight">Mood Reminders</Text>
        </View>
        <View className="w-10 h-10 rounded-full border-[1.5px] border-ink-black overflow-hidden bg-accent-sage items-center justify-center">
          <Ionicons name="person" size={24} color="#1b1b20" />
        </View>
      </View>

      <ScrollView className="flex-1 px-4 md:px-10 py-8 max-w-2xl mx-auto w-full" contentContainerStyle={{ paddingBottom: 120 }}>
        
        {/* Illustration/Decorative Hero Card */}
        <View className="bg-accent-pink rounded-[32px] border-[1.5px] border-ink-black p-8 shadow-[4px_4px_0px_0px_#1A1A1A] overflow-hidden relative mb-6">
          <View className="relative z-10">
            <Text className="font-headline-md text-ink-black font-bold text-3xl mb-2">Build a Habit</Text>
            <Text className="font-body-md text-on-surface-variant max-w-[240px] text-base">Consistent check-ins help you understand your emotional patterns over time.</Text>
          </View>
          <View className="absolute -right-4 -bottom-4 opacity-20">
            <Ionicons name="notifications" size={120} color="#1b1b20" />
          </View>
        </View>

        {/* Master Toggle Section */}
        <View className="bg-white rounded-[24px] border-[1.5px] border-ink-black p-6 flex-row justify-between items-center mb-6">
          <View>
            <Text className="font-headline-sm text-ink-black font-bold text-xl">Daily Reminders</Text>
            <Text className="font-label-md text-on-surface-variant">Enable push notifications for check-ins</Text>
          </View>
          <Switch
            trackColor={{ false: "#e4e1e8", true: "#002da5" }}
            thumbColor={remindersEnabled ? "#fdd33f" : "#ffffff"}
            ios_backgroundColor="#e4e1e8"
            onValueChange={setRemindersEnabled}
            value={remindersEnabled}
            style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
          />
        </View>

        {/* Configuration Bento */}
        <View className={`flex-col md:flex-row gap-6 mb-6 ${!remindersEnabled ? 'opacity-50 pointer-events-none' : ''}`}>
          
          {/* Time Picker Card */}
          <View className="flex-1 bg-white rounded-[24px] border-[1.5px] border-ink-black p-6 flex-col gap-4 active:translate-x-[2px] active:translate-y-[2px]">
            <View className="flex-row items-center gap-3">
              <Ionicons name="time" size={24} color="#002da5" />
              <Text className="font-label-bold text-primary font-bold tracking-wider">NOTIFICATION TIME</Text>
            </View>
            <View className="flex-col gap-2">
              <TextInput 
                value={time}
                onChangeText={setTime}
                className="w-full bg-[#f9f8f3] border-[1.5px] border-ink-black rounded-xl p-4 font-headline-sm text-2xl font-bold text-center"
                keyboardType="numbers-and-punctuation"
              />
              <Text className="font-label-md text-on-surface-variant">Recommended for evening reflection.</Text>
            </View>
          </View>

          {/* Frequency Selection */}
          <View className="flex-1 bg-white rounded-[24px] border-[1.5px] border-ink-black p-6 flex-col gap-4 active:translate-x-[2px] active:translate-y-[2px]">
            <View className="flex-row items-center gap-3">
              <Ionicons name="calendar" size={24} color="#725c00" />
              <Text className="font-label-bold text-secondary font-bold tracking-wider">RECURRENCE</Text>
            </View>
            <View className="flex-col gap-2">
              <TouchableOpacity 
                onPress={() => setFrequency('daily')}
                className={`w-full p-3 rounded-xl border-[1.5px] border-ink-black active:translate-x-[1px] active:translate-y-[1px] active:shadow-none ${frequency === 'daily' ? 'bg-secondary-container shadow-[2px_2px_0px_0px_#1A1A1A]' : 'bg-white'}`}
              >
                <Text className="font-label-bold text-ink-black font-bold">Daily</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => setFrequency('weekdays')}
                className={`w-full p-3 rounded-xl border-[1.5px] border-ink-black active:translate-x-[1px] active:translate-y-[1px] active:shadow-none ${frequency === 'weekdays' ? 'bg-secondary-container shadow-[2px_2px_0px_0px_#1A1A1A]' : 'bg-white'}`}
              >
                <Text className="font-label-bold text-ink-black font-bold">Weekdays Only</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Notification Preview */}
        <View className="bg-accent-sage rounded-[24px] border-[1.5px] border-ink-black p-6 mb-6">
          <Text className="font-label-bold text-ink-black font-bold mb-4 opacity-70 tracking-widest">PREVIEW</Text>
          <View className="bg-white border-[1.5px] border-ink-black p-4 rounded-xl flex-row items-center gap-4 shadow-[2px_2px_0px_0px_#1A1A1A]">
            <View className="bg-primary p-2 rounded-lg items-center justify-center">
              <Ionicons name="heart" size={20} color="#ffffff" />
            </View>
            <View className="flex-1">
              <View className="flex-row justify-between items-center mb-1">
                <Text className="font-label-bold text-[12px] font-bold">SARVUDAY</Text>
                <Text className="text-[10px] text-on-surface-variant">Just now</Text>
              </View>
              <Text className="text-body-md text-ink-black font-bold leading-tight">Time for your mood check-in!</Text>
              <Text className="text-label-md text-on-surface-variant mt-1">How are you feeling this evening?</Text>
            </View>
          </View>
        </View>

        {/* Action Button */}
        <View className="pt-4">
          <TouchableOpacity 
            onPress={() => router.push('/patient/dashboard')}
            className="w-full bg-primary rounded-[24px] border-[1.5px] border-ink-black p-4 items-center justify-center shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            <Text className="text-white font-headline-sm font-bold text-xl">Save Preferences</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* BottomNavBar */}
      <View className="absolute bottom-0 w-full z-50 flex-row justify-around items-center px-4 py-2 bg-cream-bg border-t-[1.5px] border-ink-black pb-8">
        <TouchableOpacity onPress={() => router.push('/patient/dashboard')} className="flex-col items-center justify-center p-2">
          <Ionicons name="home" size={24} color="#434655" />
          <Text className="font-label-md text-on-surface-variant mt-1">Home</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center p-2">
          <Ionicons name="stats-chart" size={24} color="#434655" />
          <Text className="font-label-md text-on-surface-variant mt-1">Insights</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center p-2">
          <Ionicons name="people" size={24} color="#434655" />
          <Text className="font-label-md text-on-surface-variant mt-1">Community</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center bg-secondary-container rounded-xl border-[1.5px] border-ink-black px-4 py-1">
          <Ionicons name="person" size={24} color="#715b00" />
          <Text className="font-label-md text-on-secondary-container font-bold mt-1">Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
