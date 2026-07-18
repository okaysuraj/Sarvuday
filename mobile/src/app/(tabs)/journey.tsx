import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function JourneyScreen() {
  const activities = [
    {
      id: '1',
      type: 'Mood',
      title: 'Logged Mood: Happy',
      time: 'Today, 9:00 AM',
      desc: 'You reported feeling energized and ready to tackle the day. Great start!',
      tags: ['#Morning', '#Energy'],
      icon: 'happy',
      bg: 'bg-secondary-container'
    },
    {
      id: '2',
      type: 'Exercise',
      title: 'Completed Breathing Exercise',
      time: 'Yesterday, 8:30 PM',
      desc: 'Completed the 5-minute "Box Breathing" session for evening wind-down.',
      tags: [],
      icon: 'leaf',
      bg: 'bg-accent-sage'
    },
    {
      id: '3',
      type: 'AI Chat',
      title: 'AI Chat Session',
      time: 'Oct 12, 2:15 PM',
      desc: 'Discussed strategies for managing midday stress and maintaining focus.',
      tags: [],
      icon: 'chatbubble-ellipses',
      bg: 'bg-[#b8c3ff]', // inverse-primary
      action: 'Review Summary'
    },
    {
      id: '4',
      type: 'Appointment',
      title: 'Appointment with Dr. Smith',
      time: 'Oct 10, 10:00 AM',
      desc: 'Completed via Telehealth.',
      tags: [],
      icon: 'calendar',
      bg: 'bg-accent-pink',
      telehealth: true
    }
  ];

  return (
    <View className="flex-1 bg-cream-bg">
      {/* Header */}
      <View className="w-full top-0 bg-cream-bg border-b-[1.5px] border-ink-black flex-row justify-between items-center px-6 py-4 z-50">
        <View className="flex-row items-center gap-3">
          <Ionicons name="analytics" size={32} color="#002da5" />
          <Text className="font-display-lg-mobile font-bold text-primary text-2xl tracking-tighter">MindEase</Text>
        </View>
        <TouchableOpacity className="w-12 h-12 items-center justify-center rounded-full active:bg-surface-container">
          <Ionicons name="notifications" size={24} color="#002da5" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 py-8" contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Intro */}
        <View className="mb-6">
          <Text className="font-headline-md text-ink-black font-bold text-3xl mb-2">Your Journey</Text>
          <Text className="font-body-md text-on-surface-variant">A timeline of your recent activities and progress.</Text>
        </View>

        {/* Filter Chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row mb-8 -mx-4 px-4 overflow-visible">
          <TouchableOpacity className="bg-primary border-[1.5px] border-ink-black rounded-full px-6 py-2 mr-3 shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
            <Text className="font-label-bold text-white font-bold">All</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-white border-[1.5px] border-ink-black rounded-full px-6 py-2 mr-3 active:bg-surface-container">
            <Text className="font-label-bold text-ink-black font-bold">Mood</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-white border-[1.5px] border-ink-black rounded-full px-6 py-2 mr-3 active:bg-surface-container">
            <Text className="font-label-bold text-ink-black font-bold">Sessions</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-white border-[1.5px] border-ink-black rounded-full px-6 py-2 mr-3 active:bg-surface-container">
            <Text className="font-label-bold text-ink-black font-bold">Exercises</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Timeline */}
        <View className="relative flex-col gap-12 mt-6">
          {/* Dashed Line */}
          <View className="absolute left-[23px] top-8 bottom-8 w-[2px] border-l-[2px] border-ink-black border-dashed opacity-40 z-0" style={{ borderStyle: 'dashed' }} />

          {activities.map((activity, index) => (
            <View key={activity.id} className="relative z-10 flex-row items-start gap-4">
              <View className={`w-12 h-12 rounded-full border-[1.5px] border-ink-black ${activity.bg} items-center justify-center shadow-[2px_2px_0px_0px_#1A1A1A] mt-2 z-10`}>
                <Ionicons name={activity.icon as any} size={24} color="#1A1A1A" />
              </View>
              
              <View className={`flex-1 bg-white border-[1.5px] border-ink-black rounded-[32px] p-6 shadow-[2px_2px_0px_0px_#1A1A1A] ${activity.bg === 'bg-accent-sage' ? activity.bg : 'bg-white'}`}>
                <View className="flex-row justify-between items-start flex-wrap gap-2 mb-2">
                  <Text className="font-headline-sm text-ink-black font-bold text-lg">{activity.title}</Text>
                  <Text className="font-label-md text-on-surface-variant text-xs">{activity.time}</Text>
                </View>
                <Text className="font-body-md text-on-surface-variant">{activity.desc}</Text>

                {activity.tags && activity.tags.length > 0 && (
                  <View className="flex-row gap-2 mt-4">
                    {activity.tags.map(tag => (
                      <View key={tag} className="px-3 py-1 rounded-full border-[1px] border-ink-black bg-white">
                        <Text className="text-xs font-label-bold font-bold text-ink-black">{tag}</Text>
                      </View>
                    ))}
                  </View>
                )}

                {activity.action && (
                  <TouchableOpacity className="mt-4 self-start px-6 py-3 rounded-xl bg-primary border-[1.5px] border-ink-black shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
                    <Text className="font-label-bold text-white font-bold">{activity.action}</Text>
                  </TouchableOpacity>
                )}

                {activity.telehealth && (
                  <View className="flex-row items-center gap-2 mt-2">
                    <Ionicons name="videocam" size={20} color="#002da5" />
                    <Text className="font-body-md text-on-surface-variant">Completed via Telehealth.</Text>
                  </View>
                )}
              </View>
            </View>
          ))}
          
          <View className="relative z-10 items-center justify-center h-12 ml-6">
            <View className="w-4 h-4 rounded-full bg-surface-variant border-[1.5px] border-ink-black" />
          </View>
        </View>

      </ScrollView>
    </View>
  );
}
