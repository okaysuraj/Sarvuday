import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function CommunityScreen() {
  const router = useRouter();

  const posts = [
    {
      id: '1',
      author: 'Blue Elephant',
      time: '2 hours ago',
      avatarBg: 'bg-accent-sage',
      icon: 'paw',
      title: 'Taking one step at a time today.',
      content: 'It felt heavy waking up this morning, but I managed to make a cup of tea and sit by the window. Sometimes the smallest wins feel the biggest. Grateful for this quiet moment.',
      likes: 24,
      comments: 12,
    },
    {
      id: '2',
      author: 'Calm River',
      time: '5 hours ago',
      avatarBg: 'bg-white',
      icon: 'water',
      title: 'Finding peace in the noise.',
      content: "Work has been incredibly overwhelming lately. I started using a 5-minute breathing technique every hour and it's making a world of difference. Does anyone else have quick grounding tips?",
      likes: 42,
      comments: 8,
    },
    {
      id: '3',
      author: 'Silent Forest',
      time: '8 hours ago',
      avatarBg: 'bg-white',
      icon: 'leaf',
      title: "Nature's healing power.",
      content: 'Spent the afternoon in the park without my phone. The sound of the wind in the trees is so much better than any notification sound. Highly recommend a digital detox weekend.',
      likes: 31,
      comments: 5,
    }
  ];

  return (
    <View className="flex-1 bg-cream-bg">
      {/* Header */}
      <View className="w-full top-0 bg-cream-bg border-b-[1.5px] border-ink-black flex-row justify-between items-center px-6 py-4 z-50">
        <View className="flex-row items-center gap-4">
          <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full active:bg-surface-variant">
            <Ionicons name="arrow-back" size={24} color="#002da5" />
          </TouchableOpacity>
          <Text className="font-headline-sm font-bold text-primary text-xl tracking-tighter">SarvUday</Text>
        </View>
        <View className="flex-row items-center gap-2">
          <TouchableOpacity className="p-2 rounded-full active:bg-surface-variant">
            <Ionicons name="search" size={24} color="#002da5" />
          </TouchableOpacity>
          <TouchableOpacity className="p-2 rounded-full active:bg-surface-variant">
            <Ionicons name="person-circle" size={24} color="#002da5" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1 px-4 py-8" contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Intro */}
        <View className="mb-8">
          <Text className="font-headline-sm text-ink-black font-bold text-2xl mb-2">Community Space</Text>
          <Text className="font-body-md text-on-surface-variant text-base">A safe haven to share, listen, and grow together anonymously.</Text>
        </View>

        {/* Filter Chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row mb-8 -mx-4 px-4 overflow-visible">
          <TouchableOpacity className="bg-secondary-container border-[1.5px] border-ink-black rounded-full px-4 py-2 shadow-[4px_4px_0px_0px_#1A1A1A] mr-3 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
            <Text className="font-label-bold text-ink-black font-bold">All Posts</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-white border-[1.5px] border-ink-black rounded-full px-4 py-2 mr-3 active:bg-accent-sage">
            <Text className="font-label-bold text-ink-black font-bold">Daily Reflections</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-white border-[1.5px] border-ink-black rounded-full px-4 py-2 mr-3 active:bg-accent-pink">
            <Text className="font-label-bold text-ink-black font-bold">Advice Wanted</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-white border-[1.5px] border-ink-black rounded-full px-4 py-2 mr-3 active:bg-accent-orange">
            <Text className="font-label-bold text-ink-black font-bold">Small Wins</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Feed Grid */}
        <View className="flex-col gap-6">
          {posts.map((post, index) => (
            <TouchableOpacity 
              key={post.id} 
              onPress={() => router.push(`/community/post/${post.id}`)}
              className={`border-[1.5px] border-ink-black rounded-[32px] p-6 shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${index % 2 === 0 ? 'bg-white' : 'bg-accent-pink'}`}
            >
              <View className="flex-row items-center gap-3 mb-4">
                <View className={`w-10 h-10 rounded-full border-[1.5px] border-ink-black ${post.avatarBg} items-center justify-center`}>
                  <Ionicons name={post.icon as any} size={20} color="#1A1A1A" />
                </View>
                <View>
                  <Text className="font-label-bold text-ink-black font-bold">{post.author}</Text>
                  <Text className="text-xs font-label-md text-on-surface-variant">{post.time}</Text>
                </View>
              </View>
              
              <Text className="font-headline-sm text-ink-black font-bold text-xl mb-3">{post.title}</Text>
              <Text className="font-body-md text-on-surface-variant mb-6">{post.content}</Text>
              
              <View className="flex-row items-center justify-between border-t border-ink-black/20 pt-4">
                <View className="flex-row gap-4">
                  <View className="flex-row items-center gap-1">
                    <Ionicons name="heart" size={20} color="#ba1a1a" />
                    <Text className="font-label-bold text-on-surface-variant font-bold">{post.likes}</Text>
                  </View>
                  <View className="flex-row items-center gap-1">
                    <Ionicons name="chatbubble" size={20} color="#434655" />
                    <Text className="font-label-bold text-on-surface-variant font-bold">{post.comments}</Text>
                  </View>
                </View>
                <View className="bg-primary border-[1.5px] border-ink-black rounded-xl px-4 py-2 shadow-[2px_2px_0px_0px_#1A1A1A]">
                  <Text className="font-label-bold text-white font-bold">Join Discussion</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity 
        onPress={() => router.push('/community/create_post')}
        className="absolute bottom-[24px] right-6 w-16 h-16 bg-primary border-[1.5px] border-ink-black rounded-2xl items-center justify-center shadow-[6px_6px_0px_0px_#1A1A1A] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none z-50"
      >
        <Ionicons name="add" size={32} color="#ffffff" />
      </TouchableOpacity>
    </View>
  );
}
