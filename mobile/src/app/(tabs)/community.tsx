import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { communityApi } from '../../api/community';

export default function CommunityScreen() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<'feed' | 'groups'>('feed');
  const [posts, setPosts] = useState<any[]>([
    {
      id: '1',
      author: 'Blue Elephant',
      time: '2h ago',
      title: 'Taking one step at a time today.',
      content: 'Waking up felt heavy this morning, but I made tea and sat by the window. Sometimes the smallest wins are the most meaningful.',
      likes: 24,
      comments: 12,
      isLiked: false
    },
    {
      id: '2',
      author: 'Calm River',
      time: '5h ago',
      title: 'Finding stillness amid the noise.',
      content: 'Work has felt intense. Practicing 5-minute box breathing between meetings has helped ground my nervous system.',
      likes: 42,
      comments: 8,
      isLiked: false
    }
  ]);
  const [groups, setGroups] = useState<any[]>([
    { id: 'g1', name: 'Anxiety & Panic Support', members: 142, desc: 'Safe space to discuss symptoms and grounding techniques.' },
    { id: 'g2', name: 'Mindful Daily Reflections', members: 89, desc: 'Daily gratitude and small habit tracking.' },
    { id: 'g3', name: 'Workplace Stress & Burnout', members: 110, desc: 'Navigating career fatigue and setting gentle boundaries.' }
  ]);

  const toggleLike = (postId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          likes: p.isLiked ? p.likes - 1 : p.likes + 1,
          isLiked: !p.isLiked
        };
      }
      return p;
    }));
  };

  return (
    <View className="flex-1 bg-background">
      {/* Editorial Header */}
      <View className="flex-row justify-between items-center px-5 pt-12 pb-4 bg-background border-b border-outline">
        <View>
          <Text className="text-on-surface font-semibold text-base tracking-tight">Community Commons</Text>
          <Text className="text-on-surface-variant text-xs">Anonymous, compassionate peer circle</Text>
        </View>
        <TouchableOpacity 
          onPress={() => router.push('/(tabs)/profile')}
          className="w-8 h-8 rounded-full border border-outline bg-surface items-center justify-center"
        >
          <Ionicons name="person-outline" size={16} color="#18181B" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-5 py-6" contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Toggle Pills */}
        <View className="flex-row gap-2 mb-6">
          <TouchableOpacity
            onPress={() => setActiveTab('feed')}
            className={`flex-1 py-2 rounded-xl border items-center ${
              activeTab === 'feed' ? 'bg-primary border-primary' : 'bg-surface border-outline'
            }`}
          >
            <Text className={`text-xs font-medium ${activeTab === 'feed' ? 'text-white' : 'text-on-surface'}`}>
              Community Feed
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveTab('groups')}
            className={`flex-1 py-2 rounded-xl border items-center ${
              activeTab === 'groups' ? 'bg-primary border-primary' : 'bg-surface border-outline'
            }`}
          >
            <Text className={`text-xs font-medium ${activeTab === 'groups' ? 'text-white' : 'text-on-surface'}`}>
              Support Circles
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'feed' ? (
          <View className="flex-col gap-4">
            {posts.map((post) => (
              <View key={post.id} className="bg-surface border border-outline rounded-2xl p-5">
                <View className="flex-row items-center justify-between mb-3">
                  <View className="flex-row items-center gap-2.5">
                    <View className="w-7 h-7 rounded-full bg-secondary-container items-center justify-center">
                      <Ionicons name="person" size={14} color="#2E4B3E" />
                    </View>
                    <Text className="text-xs font-semibold text-on-surface">{post.author}</Text>
                  </View>
                  <Text className="text-[11px] text-on-surface-variant">{post.time}</Text>
                </View>

                <Text className="text-sm font-semibold text-on-surface mb-1.5">{post.title}</Text>
                <Text className="text-xs text-on-surface-variant leading-relaxed mb-4">{post.content}</Text>

                <View className="flex-row items-center justify-between pt-3 border-t border-outline">
                  <TouchableOpacity 
                    onPress={() => toggleLike(post.id)}
                    className="flex-row items-center gap-1.5"
                  >
                    <Ionicons 
                      name={post.isLiked ? "heart" : "heart-outline"} 
                      size={16} 
                      color={post.isLiked ? "#932924" : "#6E6D7A"} 
                    />
                    <Text className="text-xs text-on-surface-variant font-medium">{post.likes}</Text>
                  </TouchableOpacity>

                  <View className="flex-row items-center gap-1.5">
                    <Ionicons name="chatbubble-outline" size={15} color="#6E6D7A" />
                    <Text className="text-xs text-on-surface-variant font-medium">{post.comments} thoughts</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View className="flex-col gap-3">
            {groups.map((group) => (
              <View key={group.id} className="bg-surface border border-outline rounded-2xl p-5">
                <View className="flex-row justify-between items-start mb-2">
                  <Text className="text-sm font-semibold text-on-surface flex-1 mr-2">{group.name}</Text>
                  <View className="px-2 py-0.5 rounded-full bg-surface-container border border-outline">
                    <Text className="text-[10px] text-on-surface-variant font-medium">{group.members} members</Text>
                  </View>
                </View>
                <Text className="text-xs text-on-surface-variant leading-relaxed mb-4">{group.desc}</Text>
                
                <TouchableOpacity className="py-2.5 rounded-xl bg-surface-container border border-outline items-center active:bg-primary">
                  <Text className="text-xs font-semibold text-on-surface">Enter Circle Discussion →</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

      </ScrollView>
    </View>
  );
}
