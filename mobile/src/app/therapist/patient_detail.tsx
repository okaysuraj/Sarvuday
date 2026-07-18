import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Image, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

const { width } = Dimensions.get('window');

export default function PatientDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams(); // Assuming we pass patient ID

  // Simple animation for bars
  const [animatedHeights] = useState([
    new Animated.Value(0), new Animated.Value(0), new Animated.Value(0),
    new Animated.Value(0), new Animated.Value(0), new Animated.Value(0),
    new Animated.Value(0)
  ]);

  const targetHeights = [40, 55, 45, 70, 60, 85, 95];

  useEffect(() => {
    const animations = targetHeights.map((target, index) => 
      Animated.timing(animatedHeights[index], {
        toValue: target,
        duration: 1000,
        delay: 100 * index,
        useNativeDriver: false
      })
    );
    Animated.stagger(100, animations).start();
  }, []);

  return (
    <View className="flex-1 bg-[#fbf8ff] flex-row">
      
      {/* Desktop Sidebar Overlay (Simulated) */}
      <View className="hidden md:flex flex-col items-center py-8 gap-10 w-20 border-r-[1.5px] border-ink-black bg-[#fbf8ff] z-50 pt-10">
        <View className="w-12 h-12 bg-primary items-center justify-center rounded-xl border-[1.5px] border-ink-black shadow-[2px_2px_0px_0px_#1A1A1A]">
          <Ionicons name="medical" size={24} color="#ffffff" />
        </View>
        <View className="flex-col gap-8">
          <TouchableOpacity onPress={() => router.push('/therapist/dashboard')}>
            <Ionicons name="grid" size={24} color="#434655" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/therapist/patient_list')}>
            <Ionicons name="people" size={24} color="#002da5" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/therapist/appointment_management')}>
            <Ionicons name="calendar" size={24} color="#434655" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/therapist/payments')}>
            <Ionicons name="card" size={24} color="#434655" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="settings" size={24} color="#434655" />
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex-1">
        {/* Top AppBar */}
        <View className="flex-row justify-between items-center px-4 md:px-10 py-4 border-b-[1.5px] border-ink-black bg-[#fbf8ff] z-40 sticky top-0">
          <View className="flex-row items-center gap-4">
            <TouchableOpacity onPress={() => router.back()} className="active:translate-x-[2px] active:translate-y-[2px]">
              <Ionicons name="arrow-back" size={24} color="#434655" />
            </TouchableOpacity>
            <View className="flex-row items-center gap-3">
              <View className="w-10 h-10 rounded-full border-[1.5px] border-ink-black overflow-hidden bg-[#ffd9df] items-center justify-center">
                <Ionicons name="person" size={24} color="#1A1A1A" />
              </View>
              <View>
                <Text className="font-headline-sm-mobile font-bold text-ink-black text-lg">Ananya S.</Text>
                <Text className="text-xs text-on-surface-variant font-label-md">Anxiety & Social Dynamics • 12 Sessions</Text>
              </View>
            </View>
          </View>
          <View className="flex-row items-center gap-4 hidden sm:flex">
            <TouchableOpacity>
              <Ionicons name="notifications" size={24} color="#002da5" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="ellipsis-vertical" size={24} color="#002da5" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView className="flex-1" contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
          <View className="flex-col lg:flex-row gap-6">
            
            {/* Left Column: Insights & Notes */}
            <View className="lg:w-[65%] flex-col gap-6">
              
              {/* AI Mood Insights (Bento Style) */}
              <View className="bg-white p-6 md:p-8 rounded-[32px] border-[1.5px] border-ink-black overflow-hidden">
                <View className="flex-row justify-between items-start mb-6">
                  <View>
                    <Text className="font-headline-sm text-ink-black font-bold text-xl mb-1">AI Mood Insights</Text>
                    <Text className="text-on-surface-variant text-label-md text-sm">Sentiment analysis from last 30 days</Text>
                  </View>
                  <View className="bg-[#fdd33f] px-3 py-1 rounded-full border-[1.5px] border-ink-black">
                    <Text className="text-[#715b00] text-[10px] font-bold">TRENDING UPWARD</Text>
                  </View>
                </View>

                {/* Graph */}
                <View className="h-48 w-full flex-row items-end justify-between gap-2 pt-4">
                  {animatedHeights.map((animValue, index) => (
                    <Animated.View 
                      key={index} 
                      className={`flex-1 rounded-t-xl border-[1.5px] border-b-0 border-ink-black ${index === 3 || index === 6 ? 'bg-primary' : 'bg-[#ffd9df]'}`} 
                      style={{ height: animValue.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] }) }} 
                    />
                  ))}
                </View>
                <View className="flex-row justify-between mt-2">
                  <Text className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Week 1</Text>
                  <Text className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Week 2</Text>
                  <Text className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Week 3</Text>
                  <Text className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Week 4</Text>
                </View>
              </View>

              {/* Recent Notes Summary */}
              <View className="flex-col gap-6">
                <View className="flex-row items-center justify-between">
                  <Text className="font-headline-sm text-ink-black font-bold text-xl">Recent Notes Summary</Text>
                  <TouchableOpacity className="flex-row items-center gap-1">
                    <Text className="text-primary font-bold text-label-md">View All</Text>
                    <Ionicons name="open-outline" size={14} color="#002da5" />
                  </TouchableOpacity>
                </View>

                <View className="flex-col md:flex-row gap-4">
                  {/* Note Card 1 */}
                  <View className="flex-1 bg-[#d9d9e6] p-6 rounded-[24px] border-[1.5px] border-ink-black h-48 justify-between">
                    <View>
                      <View className="flex-row justify-between items-start mb-2">
                        <Text className="text-[10px] font-bold text-on-surface-variant">OCT 24</Text>
                        <Ionicons name="lock-closed" size={14} color="#1A1A1A" />
                      </View>
                      <Text className="font-bold text-sm mb-2 text-ink-black">Workplace Anxiety</Text>
                      <Text className="text-xs text-on-surface-variant" numberOfLines={3}>Discussed interpersonal conflict with manager. Ananya utilized box breathing techniques successfully.</Text>
                    </View>
                    <View className="self-start bg-white/50 px-2 py-0.5 rounded border border-ink-black/20">
                      <Text className="text-[10px] text-ink-black">CBT</Text>
                    </View>
                  </View>

                  {/* Note Card 2 */}
                  <View className="flex-1 bg-[#ffd9df] p-6 rounded-[24px] border-[1.5px] border-ink-black h-48 justify-between">
                    <View>
                      <View className="flex-row justify-between items-start mb-2">
                        <Text className="text-[10px] font-bold text-on-surface-variant">OCT 17</Text>
                        <Ionicons name="lock-closed" size={14} color="#1A1A1A" />
                      </View>
                      <Text className="font-bold text-sm mb-2 text-ink-black">Social Rejection</Text>
                      <Text className="text-xs text-on-surface-variant" numberOfLines={3}>Deep dive into childhood attachment styles. Patient was emotionally expressive during session.</Text>
                    </View>
                    <View className="self-start bg-white/50 px-2 py-0.5 rounded border border-ink-black/20">
                      <Text className="text-[10px] text-ink-black">Attachment</Text>
                    </View>
                  </View>

                  {/* Note Card 3 */}
                  <TouchableOpacity className="flex-1 bg-white p-6 rounded-[24px] border-dashed border-[2px] border-ink-black flex-col items-center justify-center h-48 opacity-60 active:bg-surface-container">
                    <Ionicons name="add-circle-outline" size={32} color="#1A1A1A" className="mb-2" />
                    <Text className="text-xs font-bold text-ink-black">New Session Note</Text>
                  </TouchableOpacity>
                </View>
              </View>

            </View>

            {/* Right Column: Status & Quick Actions */}
            <View className="lg:w-[32%] flex-col gap-6">
              
              {/* Treatment Status */}
              <View className="bg-white p-6 md:p-8 rounded-[32px] border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A]">
                <Text className="font-headline-sm text-ink-black font-bold text-xl mb-6">Treatment Status</Text>
                
                <View className="flex-col gap-6">
                  <View>
                    <View className="flex-row justify-between mb-2">
                      <Text className="text-sm font-bold text-ink-black">Anxiety Management</Text>
                      <Text className="text-sm font-bold text-ink-black">75%</Text>
                    </View>
                    <View className="w-full h-3 bg-[#f5f2f9] rounded-full border-[1.5px] border-ink-black flex-row">
                      <View className="h-full bg-primary border-r-[1.5px] border-ink-black" style={{ width: '75%' }} />
                    </View>
                  </View>

                  <View>
                    <View className="flex-row justify-between mb-2">
                      <Text className="text-sm font-bold text-ink-black">Social Engagement</Text>
                      <Text className="text-sm font-bold text-ink-black">40%</Text>
                    </View>
                    <View className="w-full h-3 bg-[#f5f2f9] rounded-full border-[1.5px] border-ink-black flex-row">
                      <View className="h-full bg-[#ffdad6] border-r-[1.5px] border-ink-black" style={{ width: '40%' }} />
                    </View>
                  </View>

                  <View>
                    <View className="flex-row justify-between mb-2">
                      <Text className="text-sm font-bold text-ink-black">Sleep Quality</Text>
                      <Text className="text-sm font-bold text-ink-black">90%</Text>
                    </View>
                    <View className="w-full h-3 bg-[#f5f2f9] rounded-full border-[1.5px] border-ink-black flex-row">
                      <View className="h-full bg-[#725c00] border-r-[1.5px] border-ink-black" style={{ width: '90%' }} />
                    </View>
                  </View>
                </View>

                <View className="mt-8 pt-6 border-t-[1.5px] border-ink-black/10">
                  <Text className="text-xs font-bold text-on-surface-variant uppercase mb-4 tracking-tighter">Current Plan</Text>
                  <View className="flex-row flex-wrap gap-2">
                    <View className="bg-[#eae7ee] px-3 py-1 rounded-full border border-ink-black"><Text className="text-xs text-ink-black">Weekly CBT</Text></View>
                    <View className="bg-[#eae7ee] px-3 py-1 rounded-full border border-ink-black"><Text className="text-xs text-ink-black">Journaling</Text></View>
                    <View className="bg-[#eae7ee] px-3 py-1 rounded-full border border-ink-black"><Text className="text-xs text-ink-black">Mindfulness</Text></View>
                  </View>
                </View>
              </View>

              {/* Quick Actions */}
              <View className="flex-col gap-4">
                <TouchableOpacity className="w-full bg-primary py-4 rounded-[16px] border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-transform flex-row items-center justify-center gap-2">
                  <Ionicons name="document-text" size={20} color="#ffffff" />
                  <Text className="text-white font-bold">New Note</Text>
                </TouchableOpacity>
                <TouchableOpacity className="w-full bg-[#fdd33f] py-4 rounded-[16px] border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-transform flex-row items-center justify-center gap-2">
                  <Ionicons name="time" size={20} color="#715b00" />
                  <Text className="text-[#715b00] font-bold">View History</Text>
                </TouchableOpacity>
                <TouchableOpacity className="w-full bg-[#d9d9e6] py-4 rounded-[16px] border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-transform flex-row items-center justify-center gap-2">
                  <Ionicons name="settings" size={20} color="#1A1A1A" />
                  <Text className="text-ink-black font-bold">Adjust Plan</Text>
                </TouchableOpacity>
              </View>

              {/* Upcoming Session Card */}
              <View className="bg-ink-black p-6 rounded-[24px] relative overflow-hidden border-[1.5px] border-transparent mt-2">
                <View className="relative z-10">
                  <Text className="text-[10px] font-bold text-[#ffd9df] uppercase mb-1">Next Session</Text>
                  <Text className="font-headline-sm text-white font-bold text-xl mb-4">Tomorrow, 10:00 AM</Text>
                  <View className="flex-row items-center gap-2">
                    <View className="w-8 h-8 rounded-full border-white border-[1px] items-center justify-center bg-white/10">
                      <Ionicons name="videocam" size={14} color="#ffffff" />
                    </View>
                    <Text className="text-xs font-medium text-white">Video Call (60 min)</Text>
                  </View>
                </View>
                <View className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary rounded-full opacity-30 z-0" />
              </View>

            </View>
          </View>
        </ScrollView>
      </View>

      {/* Bottom Navigation (Mobile Only) */}
      <View className="md:hidden absolute bottom-0 left-0 w-full z-50 flex-row justify-around items-center px-4 py-3 bg-[#fbf8ff] border-t-[1.5px] border-ink-black">
        <TouchableOpacity className="flex-col items-center justify-center px-4 py-1" onPress={() => router.push('/therapist/dashboard')}>
          <Ionicons name="grid" size={24} color="#434655" />
          <Text className="text-[10px] font-medium text-on-surface-variant">Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center bg-secondary-container rounded-xl px-4 py-1 border-[1.5px] border-ink-black shadow-[2px_2px_0px_0px_#1A1A1A]" onPress={() => router.push('/therapist/patient_list')}>
          <Ionicons name="people" size={24} color="#715b00" />
          <Text className="text-[10px] font-bold text-[#715b00]">Patients</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center px-4 py-1" onPress={() => router.push('/therapist/appointment_management')}>
          <Ionicons name="calendar" size={24} color="#434655" />
          <Text className="text-[10px] font-medium text-on-surface-variant">Schedule</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center px-4 py-1" onPress={() => router.push('/therapist/payments')}>
          <Ionicons name="card" size={24} color="#434655" />
          <Text className="text-[10px] font-medium text-on-surface-variant">Earnings</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}
