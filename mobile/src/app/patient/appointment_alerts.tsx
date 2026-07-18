import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function AppointmentAlertsScreen() {
  const router = useRouter();
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [reminder24h, setReminder24h] = useState(true);
  const [reminder1h, setReminder1h] = useState(true);
  const [reminderStart, setReminderStart] = useState(true);

  return (
    <View className="flex-1 bg-cream-bg">
      {/* TopAppBar */}
      <View className="flex-row justify-between items-center px-4 py-4 w-full z-50 bg-cream-bg border-b-[1.5px] border-ink-black sticky top-0">
        <View className="flex-row items-center gap-4">
          <TouchableOpacity onPress={() => router.back()} className="hover:bg-surface-container-low p-2 rounded-full active:translate-x-[2px] active:translate-y-[2px]">
            <Ionicons name="arrow-back" size={24} color="#002da5" />
          </TouchableOpacity>
          <Text className="font-headline-md text-primary font-bold text-xl tracking-tight">SarvUday</Text>
        </View>
        <View className="flex-row items-center gap-4">
          <View className="w-10 h-10 rounded-full border-[1.5px] border-ink-black overflow-hidden bg-accent-sage items-center justify-center">
            <Ionicons name="person" size={24} color="#1b1b20" />
          </View>
        </View>
      </View>

      <ScrollView className="flex-1 px-4 md:px-10 py-8 max-w-4xl mx-auto w-full" contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Headline Section */}
        <View className="mb-8">
          <Text className="font-headline-md text-ink-black font-bold text-3xl mb-2">Appointment Alerts</Text>
          <Text className="font-body-md text-on-surface-variant max-w-lg text-base">Customize how and when you want to be reminded about your upcoming therapy sessions.</Text>
        </View>

        <View className="flex-col md:flex-row gap-6 mb-8">
          
          {/* Channels Section (Left Column) */}
          <View className="flex-1 flex-col gap-6">
            <View className="bg-white border-[1.5px] border-ink-black rounded-[32px] p-8 shadow-[4px_4px_0px_0px_#1A1A1A] flex-col gap-6">
              <View className="flex-row items-center gap-3">
                <Ionicons name="notifications-active" size={24} color="#002da5" />
                <Text className="font-headline-sm text-ink-black font-bold text-xl">Delivery</Text>
              </View>
              
              <View className="flex-col gap-4">
                {/* Push Notifications */}
                <View className="flex-row items-center justify-between">
                  <View className="flex-col">
                    <Text className="font-label-bold text-ink-black font-bold text-base mb-1">Push Notifications</Text>
                    <Text className="text-xs text-on-surface-variant">Instant alerts on your device</Text>
                  </View>
                  <Switch
                    trackColor={{ false: "#e4e1e8", true: "#002da5" }}
                    thumbColor={pushEnabled ? "#ffffff" : "#ffffff"}
                    ios_backgroundColor="#e4e1e8"
                    onValueChange={setPushEnabled}
                    value={pushEnabled}
                    style={{ transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }] }}
                  />
                </View>
                
                {/* Email Notifications */}
                <View className="flex-row items-center justify-between">
                  <View className="flex-col">
                    <Text className="font-label-bold text-ink-black font-bold text-base mb-1">Email</Text>
                    <Text className="text-xs text-on-surface-variant">Calendar invites and summaries</Text>
                  </View>
                  <Switch
                    trackColor={{ false: "#e4e1e8", true: "#002da5" }}
                    thumbColor={emailEnabled ? "#ffffff" : "#ffffff"}
                    ios_backgroundColor="#e4e1e8"
                    onValueChange={setEmailEnabled}
                    value={emailEnabled}
                    style={{ transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }] }}
                  />
                </View>
              </View>
            </View>

            {/* Visual Accent Sticker */}
            <View className="hidden md:flex bg-accent-pink border-[1.5px] border-ink-black rounded-[32px] p-8 overflow-hidden relative min-h-[160px]">
              <Text className="font-headline-sm text-on-tertiary-fixed-variant font-bold text-xl relative z-10">Stay Present.</Text>
              <Text className="text-sm text-tertiary relative z-10 mt-2">Consistent attendance is the first step toward better mental well-being.</Text>
              <Ionicons name="calendar" size={120} color="#ffffff" style={{ opacity: 0.4, position: 'absolute', bottom: -16, right: -16, transform: [{ rotate: '12deg' }] }} />
            </View>
          </View>

          {/* Timing Section (Right Column) */}
          <View className="flex-[1.4]">
            <View className="bg-accent-sage border-[1.5px] border-ink-black rounded-[48px] p-8 shadow-[4px_4px_0px_0px_#1A1A1A] h-full flex-col gap-8">
              <View className="flex-row items-center gap-3">
                <Ionicons name="time" size={24} color="#002da5" />
                <Text className="font-headline-sm text-ink-black font-bold text-xl">Reminder Schedule</Text>
              </View>
              
              <View className="flex-col gap-4">
                {/* 24 Hours Toggle */}
                <View className="bg-white border-[1.5px] border-ink-black rounded-2xl p-4 flex-row items-center justify-between">
                  <View className="flex-row items-center gap-4">
                    <View className="w-12 h-12 rounded-xl bg-primary-fixed items-center justify-center border-[1.5px] border-ink-black">
                      <Ionicons name="reload" size={24} color="#002da5" />
                    </View>
                    <View>
                      <Text className="font-label-bold text-ink-black font-bold text-base mb-1">24 hours before</Text>
                      <Text className="text-xs text-on-surface-variant">Good for final rescheduling</Text>
                    </View>
                  </View>
                  <Switch
                    trackColor={{ false: "#e4e1e8", true: "#002da5" }}
                    thumbColor={reminder24h ? "#ffffff" : "#ffffff"}
                    ios_backgroundColor="#e4e1e8"
                    onValueChange={setReminder24h}
                    value={reminder24h}
                  />
                </View>

                {/* 1 Hour Toggle */}
                <View className="bg-white border-[1.5px] border-ink-black rounded-2xl p-4 flex-row items-center justify-between">
                  <View className="flex-row items-center gap-4">
                    <View className="w-12 h-12 rounded-xl bg-secondary-container items-center justify-center border-[1.5px] border-ink-black">
                      <Ionicons name="timer-outline" size={24} color="#715b00" />
                    </View>
                    <View>
                      <Text className="font-label-bold text-ink-black font-bold text-base mb-1">1 hour before</Text>
                      <Text className="text-xs text-on-surface-variant">Time to find a quiet space</Text>
                    </View>
                  </View>
                  <Switch
                    trackColor={{ false: "#e4e1e8", true: "#002da5" }}
                    thumbColor={reminder1h ? "#ffffff" : "#ffffff"}
                    ios_backgroundColor="#e4e1e8"
                    onValueChange={setReminder1h}
                    value={reminder1h}
                  />
                </View>

                {/* Session Start Toggle */}
                <View className="bg-white border-[1.5px] border-ink-black rounded-2xl p-4 flex-row items-center justify-between">
                  <View className="flex-row items-center gap-4">
                    <View className="w-12 h-12 rounded-xl bg-accent-pink items-center justify-center border-[1.5px] border-ink-black">
                      <Ionicons name="flash" size={24} color="#5a3039" />
                    </View>
                    <View>
                      <Text className="font-label-bold text-ink-black font-bold text-base mb-1">Session start</Text>
                      <Text className="text-xs text-on-surface-variant">Join link sent immediately</Text>
                    </View>
                  </View>
                  <Switch
                    trackColor={{ false: "#e4e1e8", true: "#002da5" }}
                    thumbColor={reminderStart ? "#ffffff" : "#ffffff"}
                    ios_backgroundColor="#e4e1e8"
                    onValueChange={setReminderStart}
                    value={reminderStart}
                  />
                </View>
              </View>

              {/* CTA Button */}
              <View className="pt-4">
                <TouchableOpacity 
                  onPress={() => router.push('/patient/dashboard')}
                  className="w-full py-4 bg-primary rounded-xl border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none items-center justify-center"
                >
                  <Text className="text-white font-label-bold font-bold text-lg">Save Preferences</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Footer Help Area */}
        <View className="bg-white border-[1.5px] border-ink-black rounded-2xl p-6 flex-col md:flex-row items-center gap-6 mb-8">
          <View className="flex-1">
            <Text className="font-label-bold text-ink-black font-bold mb-1">Need to reschedule?</Text>
            <Text className="text-sm text-on-surface-variant">You can change your appointment time up to 24 hours before without penalty.</Text>
          </View>
          <TouchableOpacity className="px-6 py-2 border-[1.5px] border-ink-black rounded-xl active:bg-surface-container-low active:translate-x-[2px] active:translate-y-[2px]">
            <Text className="font-label-bold text-ink-black font-bold">View Policy</Text>
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
