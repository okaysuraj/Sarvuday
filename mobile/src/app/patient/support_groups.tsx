import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Dimensions, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function SupportGroupsScreen() {
  const router = useRouter();

  const groups = [
    { id: '1', name: 'Anxiety Warriors', desc: 'A supportive community focused on cognitive behavioral tools and daily victories over anxiety.', members: '1.2k', bg: '#dde1ff', iconBg: '#ffffff', icon: 'shield-checkmark', iconColor: '#002da5' },
    { id: '2', name: 'Grief Support', desc: 'Walk the path of healing together. A gentle space for sharing stories and finding solace in loss.', members: '840', bg: '#ffd9df', iconBg: '#ffffff', icon: 'heart', iconColor: '#5a3039' },
    { id: '3', name: 'Mindful Living', desc: 'Discover peace in the present moment. Daily meditation prompts and mindful habit tracking.', members: '2.5k', bg: '#d9d9e6', iconBg: '#ffffff', icon: 'leaf', iconColor: '#564500' },
    { id: '4', name: 'Post-Partum Care', desc: 'Connecting new parents navigating the beautiful yet challenging transition of early parenthood.', members: '450', bg: '#ffe082', iconBg: '#ffffff', icon: 'body', iconColor: '#725c00' },
    { id: '5', name: 'Sleep Hygiene', desc: 'Overcoming insomnia through community accountability and evidence-based sleep routines.', members: '1.1k', bg: '#ffdad6', iconBg: '#ffffff', icon: 'moon', iconColor: '#663a43' },
    { id: '6', name: 'Student Stress', desc: 'Managing academic pressure, peer relations, and future planning in a supportive peer group.', members: '3.4k', bg: '#efedf4', iconBg: '#ffffff', icon: 'school', iconColor: '#002da5' },
  ];

  return (
    <View className="flex-1 bg-[#fbf8ff]">
      {/* TopAppBar */}
      <View className="flex-row justify-between items-center px-4 md:px-10 py-4 w-full z-50 bg-[#fbf8ff] border-b-[1.5px] border-ink-black sticky top-0">
        <View className="flex-row items-center gap-4">
          <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full active:bg-surface-variant transition-colors">
            <Ionicons name="arrow-back" size={24} color="#002da5" />
          </TouchableOpacity>
          <Text className="font-headline-md font-bold text-primary text-2xl">SarvUday</Text>
        </View>
        <TouchableOpacity className="p-2 rounded-full active:bg-surface-variant transition-colors">
          <Ionicons name="person-circle" size={32} color="#002da5" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 md:px-10 py-6 md:py-12 max-w-7xl mx-auto w-full" contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Hero Section */}
        <View className="mb-12">
          <Text className="font-display-lg text-ink-black font-bold text-3xl mb-4">Community Support</Text>
          <Text className="font-body-lg text-on-surface-variant text-lg max-w-2xl">Connect with others who understand. Join our curated safe spaces for healing, growth, and shared experiences.</Text>
        </View>

        {/* Search & Filter Bar */}
        <View className="flex-col md:flex-row gap-4 mb-10">
          <View className="relative flex-1">
            <TextInput 
              className="w-full bg-[#f9f8f3] border-[1.5px] border-ink-black rounded-xl py-4 pl-12 pr-4 shadow-[2px_2px_0px_0px_#1A1A1A]"
              placeholder="Search for a group..."
              placeholderTextColor="#747687"
            />
            <Ionicons name="search" size={24} color="#747687" className="absolute left-4 top-4" />
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
            <TouchableOpacity className="px-6 py-4 bg-[#fdd33f] border-[1.5px] border-ink-black rounded-xl shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-transform justify-center">
              <Text className="font-label-bold text-[#715b00] font-bold">All Groups</Text>
            </TouchableOpacity>
            <TouchableOpacity className="px-6 py-4 bg-white hover:bg-surface-variant border-[1.5px] border-ink-black rounded-xl shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-transform justify-center">
              <Text className="font-label-bold text-ink-black font-bold">Anxiety</Text>
            </TouchableOpacity>
            <TouchableOpacity className="px-6 py-4 bg-white hover:bg-surface-variant border-[1.5px] border-ink-black rounded-xl shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-transform justify-center">
              <Text className="font-label-bold text-ink-black font-bold">Grief</Text>
            </TouchableOpacity>
            <TouchableOpacity className="px-6 py-4 bg-white hover:bg-surface-variant border-[1.5px] border-ink-black rounded-xl shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-transform justify-center">
              <Text className="font-label-bold text-ink-black font-bold">Mindfulness</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Support Groups Bento Grid */}
        <View className="flex-row flex-wrap justify-between gap-y-8">
          {groups.map((group) => (
            <View key={group.id} className="w-full md:w-[48%] lg:w-[31%] border-[1.5px] border-ink-black rounded-[40px] p-8 flex-col justify-between shadow-[4px_4px_0px_0px_#1A1A1A]" style={{ backgroundColor: group.bg }}>
              <View>
                <View className="w-16 h-16 bg-white border-[1.5px] border-ink-black rounded-2xl items-center justify-center mb-6 shadow-[2px_2px_0px_0px_#1A1A1A]">
                  <Ionicons name={group.icon as any} size={32} color={group.iconColor} />
                </View>
                <Text className="font-headline-sm text-ink-black font-bold text-2xl mb-2">{group.name}</Text>
                <Text className="font-body-md text-on-surface-variant mb-6">{group.desc}</Text>
              </View>
              <View className="flex-row items-center justify-between mt-4">
                <View className="flex-row items-center gap-2">
                  <Ionicons name="people" size={24} color="#434655" />
                  <Text className="font-label-bold text-ink-black font-bold">{group.members} Members</Text>
                </View>
                <TouchableOpacity className="bg-ink-black px-8 py-3 rounded-full border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-transform">
                  <Text className="text-white font-label-bold font-bold">Join</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Featured Section */}
        <View className="mt-12 flex-col lg:flex-row gap-8">
          
          <View className="lg:w-[60%] bg-white border-[1.5px] border-ink-black rounded-[48px] p-8 shadow-[4px_4px_0px_0px_#1A1A1A] flex-col md:flex-row gap-8 items-center">
            <View className="w-full md:w-1/2 h-64 rounded-[32px] border-[1.5px] border-ink-black shadow-[2px_2px_0px_0px_#1A1A1A] bg-[#d9d9e6]" />
            <View className="w-full md:w-1/2 flex-col items-start">
              <View className="px-4 py-1 bg-[#fdd33f] border-[1.5px] border-ink-black rounded-full mb-4">
                <Text className="font-label-bold text-[#715b00] font-bold">Live Session</Text>
              </View>
              <Text className="font-headline-md text-ink-black font-bold text-3xl mb-4">Weekend Mindfulness Intensive</Text>
              <Text className="font-body-md text-on-surface-variant mb-6">Join 200+ members this Saturday for a live guided meditation and community Q&A session.</Text>
              <TouchableOpacity className="w-full py-4 bg-primary border-[1.5px] border-ink-black rounded-xl shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-transform items-center">
                <Text className="text-white font-label-bold font-bold">Reserve My Spot</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="lg:w-[38%] bg-[#fdd33f] border-[1.5px] border-ink-black rounded-[48px] p-8 shadow-[4px_4px_0px_0px_#1A1A1A] flex-col justify-center">
            <View className="flex-row items-center gap-4 mb-6">
              <View className="w-12 h-12 bg-white rounded-full border-[1.5px] border-ink-black items-center justify-center shadow-[2px_2px_0px_0px_#1A1A1A]">
                <Ionicons name="checkmark-circle" size={24} color="#725c00" />
              </View>
              <Text className="font-headline-sm text-ink-black font-bold text-2xl">Safe & Verified</Text>
            </View>
            <Text className="font-body-lg text-ink-black text-lg mb-6">All groups are moderated by trained volunteers and clinical advisors to ensure a respectful, supportive environment for everyone.</Text>
            
            <View className="h-3 w-full bg-white border-[1.5px] border-ink-black rounded-full overflow-hidden flex-row">
              <View className="h-full bg-[#725c00]" style={{ width: '75%' }} />
            </View>
            <Text className="font-label-md text-[#715b00] mt-2">75% safe-space rating from 10k users</Text>
          </View>

        </View>

      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity className="absolute bottom-24 right-6 md:bottom-10 md:right-10 w-16 h-16 bg-[#003fdd] border-[1.5px] border-ink-black rounded-2xl items-center justify-center shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-transform z-40">
        <Ionicons name="add" size={32} color="#bbc5ff" />
      </TouchableOpacity>

      {/* Bottom Navigation (Mobile Only) */}
      <View className="md:hidden absolute bottom-0 w-full bg-[#fbf8ff] border-t-[1.5px] border-ink-black h-20 flex-row justify-around items-center px-4 z-50">
        <TouchableOpacity className="flex-col items-center justify-center" onPress={() => router.push('/patient/dashboard')}>
          <Ionicons name="home-outline" size={24} color="#434655" />
          <Text className="font-label-md text-on-surface-variant text-xs mt-1">Home</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center" onPress={() => router.push('/patient/ai_personality')}>
          <Ionicons name="chatbubbles-outline" size={24} color="#434655" />
          <Text className="font-label-md text-on-surface-variant text-xs mt-1">AI Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center bg-[#fdd33f] border-[1.5px] border-ink-black rounded-xl px-4 py-1">
          <Ionicons name="people" size={24} color="#715b00" />
          <Text className="font-label-md text-[#715b00] text-xs font-bold mt-1">Groups</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center">
          <Ionicons name="person-outline" size={24} color="#434655" />
          <Text className="font-label-md text-on-surface-variant text-xs mt-1">Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
