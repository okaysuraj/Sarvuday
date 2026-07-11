import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { trackingApi } from '../../api/tracking';
import { format, parseISO } from 'date-fns';

export default function HistoryScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'calendar' | 'trends'>('calendar');
  const [journals, setJournals] = useState<any[]>([]);
  const [moods, setMoods] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchHistory = useCallback(async () => {
    try {
      const [journalRes, moodRes] = await Promise.all([
        trackingApi.getJournalEntries(),
        trackingApi.getMoodHistory()
      ]);
      setJournals(journalRes);
      setMoods(moodRes);
    } catch (e) {
      console.error('Failed to fetch tracking history', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <View className="flex-row items-center px-4 py-3 border-b border-surface-variant bg-surface">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 justify-center">
          <Ionicons name="arrow-back" size={24} color="#1b1b20" />
        </TouchableOpacity>
        <Text className="font-headline-md text-on-surface font-bold text-xl ml-2 flex-1">
          Your Progress
        </Text>
      </View>

      <View className="px-6 pt-4 pb-2">
        {/* Tab switcher */}
        <View className="flex-row bg-surface-container-highest p-1 rounded-xl mb-6">
          <TouchableOpacity 
            onPress={() => setActiveTab('calendar')}
            className={`flex-1 py-2 items-center rounded-lg ${activeTab === 'calendar' ? 'bg-surface shadow-sm' : ''}`}
          >
            <Text className={`font-headline-md font-bold ${activeTab === 'calendar' ? 'text-primary' : 'text-on-surface-variant'}`}>
              Calendar Heatmap
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setActiveTab('trends')}
            className={`flex-1 py-2 items-center rounded-lg ${activeTab === 'trends' ? 'bg-surface shadow-sm' : ''}`}
          >
            <Text className={`font-headline-md font-bold ${activeTab === 'trends' ? 'text-primary' : 'text-on-surface-variant'}`}>
              Emotional Trends
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#002da5" />
        </View>
      ) : (
        <ScrollView className="flex-1 px-6">
          {activeTab === 'calendar' ? (
            <View>
              <Text className="font-headline-md text-on-surface text-lg font-bold mb-4">This Month</Text>
              {/* Mock Calendar Grid */}
              <View className="bg-surface-container-highest rounded-2xl p-4 border border-outline-variant">
                <View className="flex-row justify-between mb-2">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                    <Text key={i} className="w-8 text-center font-label-bold text-on-surface-variant">{d}</Text>
                  ))}
                </View>
                {/* Mock Days - Real heatmap would calculate per day */}
                <View className="flex-row flex-wrap gap-y-3 justify-between">
                  {Array.from({ length: 31 }).map((_, i) => {
                    const heat = i % 4 === 0 ? 'bg-primary-fixed-dim' : (i % 3 === 0 ? 'bg-tertiary-fixed' : (i % 7 === 0 ? 'bg-error-container' : 'bg-surface'));
                    return (
                      <View key={i} className={`w-8 h-8 rounded-full items-center justify-center ${heat}`}>
                        <Text className={`font-body-md text-sm ${heat === 'bg-surface' ? 'text-on-surface' : 'text-on-surface font-bold'}`}>{i + 1}</Text>
                      </View>
                    )
                  })}
                </View>
              </View>
              
              <Text className="font-headline-md text-on-surface text-lg font-bold mb-4 mt-8">Recent Entries</Text>
              {journals.length > 0 ? journals.map((j: any) => (
                <View key={j.id} className="bg-surface-container-highest p-4 rounded-xl border border-outline-variant mb-4">
                  <Text className="font-label-bold text-on-surface-variant text-xs mb-2">
                    {format(parseISO(j.created_at), 'MMM d • h:mm a')}
                  </Text>
                  <Text className="font-body-md text-on-surface-variant text-sm">{j.content}</Text>
                </View>
              )) : (
                <Text className="font-body-md text-on-surface-variant">No recent journal entries.</Text>
              )}
            </View>
          ) : (
            <View>
              <Text className="font-headline-md text-on-surface text-lg font-bold mb-4">Last 30 Days</Text>
              <View className="bg-surface-container-highest p-6 rounded-2xl mb-8 border border-outline-variant">
                {/* Mock Graph Placeholder */}
                <View className="h-40 justify-end flex-row items-end gap-3 mb-4 border-b border-surface-variant pb-2">
                  <View className="w-6 h-12 bg-primary-fixed rounded-t-sm" />
                  <View className="w-6 h-16 bg-primary-fixed rounded-t-sm" />
                  <View className="w-6 h-10 bg-primary-fixed rounded-t-sm" />
                  <View className="w-6 h-24 bg-primary rounded-t-sm" />
                  <View className="w-6 h-20 bg-primary-fixed rounded-t-sm" />
                  <View className="w-6 h-32 bg-primary rounded-t-sm" />
                  <View className="w-6 h-28 bg-primary-fixed rounded-t-sm" />
                </View>
                <Text className="font-body-md text-on-surface text-sm text-center">
                  You logged {moods.length} moods recently!
                </Text>
              </View>
            </View>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
