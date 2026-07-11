import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { communityApi } from '../../api/community';

export default function CommunityHubScreen() {
  const router = useRouter();
  const [groups, setGroups] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchGroups = useCallback(async () => {
    try {
      const data = await communityApi.getGroups();
      setGroups(data);
    } catch (e) {
      console.error('Failed to fetch groups', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <View className="px-6 pt-4 pb-2">
        <Text className="font-headline-md text-on-surface text-3xl font-bold mb-6">Community</Text>

        <TouchableOpacity className="bg-primary-fixed p-4 rounded-xl flex-row items-center mb-8 border border-primary-fixed-dim">
          <View className="w-14 h-14 rounded-full bg-primary items-center justify-center mr-4">
            <Ionicons name="megaphone" size={24} color="#ffffff" />
          </View>
          <View className="flex-1">
            <Text className="font-headline-md text-on-primary-fixed font-bold text-lg">Daily Prompt</Text>
            <Text className="font-body-md text-on-primary-fixed-variant text-sm mt-1">What's one thing you are grateful for today?</Text>
          </View>
        </TouchableOpacity>

        <View className="flex-row justify-between items-center mb-4">
          <Text className="font-headline-md text-on-surface text-lg font-bold">My Support Groups</Text>
          <TouchableOpacity>
            <Text className="text-primary font-label-bold">Discover</Text>
          </TouchableOpacity>
        </View>
      </View>

      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#002da5" />
        </View>
      ) : (
        <ScrollView className="flex-1 px-6">
          {groups.map(group => (
            <TouchableOpacity 
              key={group.id}
              onPress={() => router.push(`/community/feed?id=${group.id}&name=${encodeURIComponent(group.name)}`)}
              className="bg-surface-container-highest p-4 rounded-xl mb-4 border border-outline-variant flex-row items-center"
            >
              <View className="w-14 h-14 rounded-full bg-surface-variant items-center justify-center mr-4">
                <Ionicons name="people" size={24} color="#747687" />
              </View>
              <View className="flex-1">
                <View className="flex-row items-center mb-1">
                  <Text className="font-headline-md text-on-surface font-bold text-base mr-2">{group.name}</Text>
                  {group.type === 'Private' && <Ionicons name="lock-closed" size={12} color="#747687" />}
                </View>
                <Text className="font-body-md text-on-surface-variant text-sm">{group.member_count} members</Text>
              </View>
              {group.unread > 0 && (
                <View className="bg-primary px-2 py-1 rounded-full ml-2">
                  <Text className="text-on-primary font-label-bold text-xs">{group.unread} new</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
