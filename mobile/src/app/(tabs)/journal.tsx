import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { trackingApi } from '../../api/tracking';
import { format } from 'date-fns';

export default function JournalListScreen() {
  const router = useRouter();
  const [entries, setEntries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const data = await trackingApi.getJournalEntries();
      setEntries(data || []);
    } catch (error) {
      console.error('Error fetching journal entries:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 bg-background justify-center items-center">
        <ActivityIndicator size="large" color="#002da5" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-cream-bg">
      {/* Header */}
      <View className="flex-row justify-between items-center px-6 py-4 w-full border-b-[1.5px] border-ink-black bg-background z-50">
        <View className="w-10" />
        <Text className="font-headline-sm text-primary font-bold text-xl uppercase tracking-tighter">My Journal</Text>
        <TouchableOpacity className="w-10 h-10 rounded-full border-[1.5px] border-ink-black bg-secondary-fixed flex items-center justify-center">
           <Ionicons name="person" size={24} color="#1A1A1A" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 py-6" contentContainerStyle={{ paddingBottom: 100 }}>
        {entries.length === 0 ? (
          <View className="items-center justify-center py-20 opacity-70">
            <Ionicons name="journal-outline" size={64} color="#1A1A1A" />
            <Text className="mt-4 font-body-md text-ink-black">No journal entries yet.</Text>
            <Text className="font-body-md text-on-surface-variant text-center mt-2 px-6">
              Write down your thoughts to track your emotional journey over time.
            </Text>
          </View>
        ) : (
          <View className="flex-col gap-4">
            {entries.map(entry => (
              <View 
                key={entry.id} 
                className="bg-surface-container-lowest border-[1.5px] border-ink-black rounded-2xl p-6 shadow-[4px_4px_0px_0px_#1A1A1A]"
              >
                <View className="flex-row justify-between items-start mb-4">
                  <View className="flex-row items-center gap-2">
                    <Ionicons name="calendar-outline" size={16} color="#747687" />
                    <Text className="font-label-bold text-on-surface-variant font-bold text-xs uppercase tracking-wider">
                      {format(new Date(entry.created_at), 'MMM dd, yyyy - hh:mm a')}
                    </Text>
                  </View>
                </View>
                <Text className="font-body-md text-ink-black" numberOfLines={4}>
                  {entry.content}
                </Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Floating Action Button */}
      <View className="absolute bottom-6 right-6">
        <TouchableOpacity 
          onPress={() => router.push('/journal/new')}
          className="w-16 h-16 bg-primary rounded-full border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] flex items-center justify-center active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
        >
          <Ionicons name="add" size={32} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
