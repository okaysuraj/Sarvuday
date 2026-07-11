import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { communityApi } from '../../api/community';
import { format, parseISO } from 'date-fns';

export default function CommunityFeedScreen() {
  const { id, name } = useLocalSearchParams<{ id: string, name: string }>();
  const router = useRouter();

  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [revealedPosts, setRevealedPosts] = useState<string[]>([]);

  const fetchPosts = useCallback(async () => {
    try {
      const data = await communityApi.getFeed(id);
      setPosts(data);
    } catch (e) {
      console.error('Failed to fetch posts', e);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const toggleReveal = (postId: string) => {
    if (!revealedPosts.includes(postId)) {
      setRevealedPosts([...revealedPosts, postId]);
    }
  };

  const handleInteract = async (postId: string, action: 'hug' | 'relate') => {
    try {
      await communityApi.interactWithPost(postId, action);
      // Optimistic update
      setPosts(currentPosts => 
        currentPosts.map(p => 
          p.id === postId 
            ? { ...p, [action === 'hug' ? 'hugs' : 'relates']: p[action === 'hug' ? 'hugs' : 'relates'] + 1 }
            : p
        )
      );
    } catch (e) {
      console.error('Failed to interact', e);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <View className="flex-row items-center px-4 py-3 border-b border-surface-variant bg-surface">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 justify-center">
          <Ionicons name="arrow-back" size={24} color="#1b1b20" />
        </TouchableOpacity>
        <Text className="font-headline-md text-on-surface font-bold text-xl ml-2 flex-1" numberOfLines={1}>
          {name || 'Community Feed'}
        </Text>
      </View>

      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#002da5" />
        </View>
      ) : (
        <ScrollView className="flex-1 bg-surface-container-highest">
          {posts.map(post => {
            const isRevealed = revealedPosts.includes(post.id) || !post.has_trigger_warning;
            
            return (
              <View key={post.id} className="bg-surface p-4 mb-2 border-b border-surface-variant">
                <View className="flex-row justify-between items-center mb-3">
                  <View className="flex-row items-center">
                    <View className="w-10 h-10 rounded-full bg-surface-variant items-center justify-center mr-3">
                      <Ionicons name={post.is_anonymous ? "eye-off" : "person"} size={20} color="#747687" />
                    </View>
                    <View>
                      <Text className="font-headline-md text-on-surface font-bold">
                        {post.is_anonymous ? 'Anonymous' : 'User'}
                      </Text>
                      <Text className="font-label-md text-on-surface-variant text-xs">
                        {format(parseISO(post.created_at), 'MMM d, h:mm a')}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity>
                    <Ionicons name="ellipsis-horizontal" size={20} color="#747687" />
                  </TouchableOpacity>
                </View>

                {!isRevealed ? (
                  <View className="bg-error-container p-4 rounded-xl border border-error mb-4 items-center">
                    <Ionicons name="warning" size={24} color="#ba1a1a" className="mb-2" />
                    <Text className="font-headline-md text-on-error-container font-bold mb-1">Content Warning</Text>
                    <Text className="font-body-md text-on-error-container text-sm text-center mb-4">
                      This post has a trigger warning.
                    </Text>
                    <TouchableOpacity 
                      onPress={() => toggleReveal(post.id)}
                      className="bg-error px-4 py-2 rounded-lg"
                    >
                      <Text className="text-on-error font-label-bold">Show Post</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <Text className="font-body-md text-on-surface text-base mb-4 leading-6">
                    {post.content}
                  </Text>
                )}

                <View className="flex-row items-center gap-6">
                  <TouchableOpacity className="flex-row items-center" onPress={() => handleInteract(post.id, 'hug')}>
                    <Ionicons name="heart-outline" size={20} color="#747687" className="mr-1" />
                    <Text className="font-label-bold text-on-surface-variant">{post.hugs}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="flex-row items-center" onPress={() => handleInteract(post.id, 'relate')}>
                    <Ionicons name="sync" size={20} color="#747687" className="mr-1" />
                    <Text className="font-label-bold text-on-surface-variant">{post.relates}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="flex-row items-center ml-auto">
                    <Ionicons name="chatbubble-outline" size={20} color="#747687" className="mr-1" />
                    <Text className="font-label-bold text-on-surface-variant">0</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </ScrollView>
      )}

      {/* Floating Action Button */}
      <TouchableOpacity 
        onPress={() => router.push(`/community/create?groupId=${id}`)}
        className="absolute bottom-6 right-6 w-14 h-14 rounded-full bg-primary items-center justify-center shadow-lg"
      >
        <Ionicons name="add" size={32} color="#ffffff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
