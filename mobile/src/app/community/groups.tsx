import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function SupportGroupsScreen() {
  const router = useRouter();

  const groups = [
    {
      id: '1',
      title: 'Anxiety Warriors',
      desc: 'A supportive community focused on cognitive behavioral tools and daily victories over anxiety.',
      members: '1.2k',
      bg: 'bg-primary-fixed',
      iconColor: '#002da5',
      icon: 'shield-half'
    },
    {
      id: '2',
      title: 'Grief Support',
      desc: 'Walk the path of healing together. A gentle space for sharing stories and finding solace in loss.',
      members: '840',
      bg: 'bg-accent-pink',
      iconColor: '#5a3039',
      icon: 'heart-half'
    },
    {
      id: '3',
      title: 'Mindful Living',
      desc: 'Discover peace in the present moment. Daily meditation prompts and mindful habit tracking.',
      members: '2.5k',
      bg: 'bg-accent-sage',
      iconColor: '#564500',
      icon: 'leaf'
    },
    {
      id: '4',
      title: 'Post-Partum Care',
      desc: 'Connecting new parents navigating the beautiful yet challenging transition of early parenthood.',
      members: '450',
      bg: 'bg-secondary-fixed',
      iconColor: '#725c00',
      icon: 'rose'
    }
  ];

  return (
    <View className="flex-1 bg-cream-bg">
      {/* Header */}
      <View className="w-full top-0 bg-cream-bg border-b-[1.5px] border-ink-black flex-row justify-between items-center px-6 py-4 z-50">
        <View className="flex-row items-center gap-4">
          <TouchableOpacity onPress={() => router.back()} className="p-2 border-[1.5px] border-ink-black rounded-lg active:bg-surface-variant">
            <Ionicons name="arrow-back" size={24} color="#002da5" />
          </TouchableOpacity>
          <Text className="font-headline-sm font-bold text-primary text-xl">SarvUday</Text>
        </View>
        <TouchableOpacity className="p-2 border-[1.5px] border-ink-black rounded-lg active:bg-surface-variant">
          <Ionicons name="person" size={24} color="#002da5" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 py-8" contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Hero */}
        <View className="mb-8">
          <Text className="font-display-lg text-ink-black font-bold text-3xl mb-4">Community Support</Text>
          <Text className="font-body-lg text-on-surface-variant">Connect with others who understand. Join our curated safe spaces for healing, growth, and shared experiences.</Text>
        </View>

        {/* Search & Filter */}
        <View className="mb-8 flex-col gap-4">
          <View className="relative w-full">
            <View className="absolute left-4 top-4 z-10">
              <Ionicons name="search" size={20} color="#747687" />
            </View>
            <TextInput
              className="w-full bg-[#f9f8f3] border-[1.5px] border-ink-black rounded-xl py-4 pl-12 pr-4 font-body-md text-on-surface shadow-[2px_2px_0px_0px_#1A1A1A]"
              placeholder="Search for a group..."
              placeholderTextColor="#747687"
            />
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row overflow-visible">
            <TouchableOpacity className="bg-secondary-container border-[1.5px] border-ink-black rounded-xl px-6 py-4 mr-3 shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none">
              <Text className="font-label-bold text-ink-black font-bold">All Groups</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-white border-[1.5px] border-ink-black rounded-xl px-6 py-4 mr-3 shadow-[2px_2px_0px_0px_#1A1A1A] active:bg-surface-variant">
              <Text className="font-label-bold text-ink-black font-bold">Anxiety</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-white border-[1.5px] border-ink-black rounded-xl px-6 py-4 mr-3 shadow-[2px_2px_0px_0px_#1A1A1A] active:bg-surface-variant">
              <Text className="font-label-bold text-ink-black font-bold">Grief</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-white border-[1.5px] border-ink-black rounded-xl px-6 py-4 mr-3 shadow-[2px_2px_0px_0px_#1A1A1A] active:bg-surface-variant">
              <Text className="font-label-bold text-ink-black font-bold">Mindfulness</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Groups Grid */}
        <View className="flex-col gap-6">
          {groups.map(group => (
            <TouchableOpacity 
              key={group.id}
              className={`${group.bg} border-[1.5px] border-ink-black rounded-[40px] p-6 shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none`}
            >
              <View className="w-16 h-16 bg-white border-[1.5px] border-ink-black rounded-2xl flex items-center justify-center mb-6 shadow-[2px_2px_0px_0px_#1A1A1A]">
                <Ionicons name={group.icon as any} size={32} color={group.iconColor} />
              </View>
              <Text className="font-headline-sm text-ink-black font-bold text-xl mb-2">{group.title}</Text>
              <Text className="font-body-md text-on-surface-variant mb-6">{group.desc}</Text>
              
              <View className="flex-row items-center justify-between mt-4">
                <View className="flex-row items-center gap-2">
                  <Ionicons name="people" size={20} color="#434655" />
                  <Text className="font-label-bold text-ink-black font-bold">{group.members} Members</Text>
                </View>
                <View className="bg-white border-[1.5px] border-ink-black rounded-full px-8 py-3 shadow-[4px_4px_0px_0px_#1A1A1A]">
                  <Text className="font-label-bold text-ink-black font-bold">Join</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Featured Section */}
        <View className="mt-8 bg-secondary-container border-[1.5px] border-ink-black rounded-[48px] p-6 shadow-[4px_4px_0px_0px_#1A1A1A] mb-8">
          <View className="flex-row items-center gap-4 mb-6">
            <View className="w-12 h-12 bg-white border-[1.5px] border-ink-black rounded-full flex items-center justify-center shadow-[2px_2px_0px_0px_#1A1A1A]">
              <Ionicons name="checkmark-circle" size={24} color="#725c00" />
            </View>
            <Text className="font-headline-sm text-ink-black font-bold text-xl">Safe & Verified</Text>
          </View>
          <Text className="font-body-lg text-ink-black mb-6">All groups are moderated by trained volunteers and clinical advisors to ensure a respectful, supportive environment for everyone.</Text>
          <View className="h-[12px] w-full bg-white border-[1.5px] border-ink-black rounded-full overflow-hidden mb-2">
            <View className="h-full bg-[#725c00] rounded-full w-3/4" />
          </View>
          <Text className="font-label-md text-[#715b00]">75% safe-space rating from 10k users</Text>
        </View>

      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity className="absolute bottom-6 right-6 w-16 h-16 bg-[#003fdd] border-[1.5px] border-ink-black rounded-2xl flex items-center justify-center shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none z-50">
        <Ionicons name="add" size={32} color="#ffffff" />
      </TouchableOpacity>
    </View>
  );
}
