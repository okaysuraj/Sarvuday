import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { trackingApi } from '../../api/tracking';
import { format } from 'date-fns';

export default function MoodScreen() {
  const router = useRouter();
  
  const [selectedMood, setSelectedMood] = useState('3');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [moodHistory, setMoodHistory] = useState<any[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);

  const moodOptions = [
    { value: '1', emoji: '😞', label: 'Very Low' },
    { value: '2', emoji: '😕', label: 'A Bit Down' },
    { value: '3', emoji: '😐', label: 'Okay' },
    { value: '4', emoji: '🙂', label: 'Feeling Good' },
    { value: '5', emoji: '😁', label: 'Excellent!' },
  ];

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const data = await trackingApi.getMoodHistory();
      setMoodHistory(data || []);
    } catch (error) {
      console.error('Error fetching mood history:', error);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const handleCheckIn = async () => {
    setIsSubmitting(true);
    try {
      await trackingApi.logMood({ moodIndex: parseInt(selectedMood, 10) });
      await fetchHistory(); // Refresh history
      // Could show a success toast here
    } catch (error) {
      console.error('Error logging mood:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedMoodLabel = moodOptions.find(m => m.value === selectedMood)?.label;

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <View className="flex-row justify-between items-center px-6 py-4 w-full border-b-[1.5px] border-ink-black bg-background z-50">
        <View className="w-10" />
        <Text className="font-headline-sm text-ink-black font-bold text-xl uppercase tracking-tighter">Check-in</Text>
        <TouchableOpacity className="w-10 h-10 rounded-full border-[1.5px] border-ink-black bg-accent-pink flex items-center justify-center">
           <Ionicons name="person" size={24} color="#1A1A1A" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 py-6" contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Mood Check-In Widget */}
        <View className="w-full bg-white border-[1.5px] border-ink-black rounded-3xl p-6 flex-col items-center text-center gap-6 shadow-[4px_4px_0px_0px_#1A1A1A] mb-8 relative overflow-hidden">
          <View className="absolute top-10 left-0 w-16 h-16 bg-accent-pink rounded-full border-[1.5px] border-ink-black opacity-20 -z-10" />
          <View className="absolute bottom-20 right-4 w-24 h-24 bg-accent-sage rounded-xl border-[1.5px] border-ink-black opacity-20 rotate-12 -z-10" />

          <View className="w-32 h-32 mb-2 relative">
            <View className="absolute inset-0 bg-secondary-container rounded-full border-[1.5px] border-ink-black flex items-center justify-center shadow-[2px_2px_0px_0px_#1A1A1A]">
              <Ionicons name="heart" size={64} color="#1A1A1A" />
            </View>
          </View>

          <View className="items-center w-full">
            <Text className="font-headline-md text-ink-black font-bold text-3xl mb-2">How are you feeling?</Text>
            <Text className="font-body-lg text-on-surface-variant text-center max-w-xs">Take a moment to check in with yourself. Your feelings are valid.</Text>
          </View>

          <View className="flex-row justify-between w-full max-w-sm px-2">
            {moodOptions.map(option => (
              <TouchableOpacity 
                key={option.value}
                onPress={() => setSelectedMood(option.value)}
                className={`flex-col items-center justify-center p-3 rounded-2xl border-[1.5px] w-14 h-16 ${selectedMood === option.value ? 'bg-secondary-container border-ink-black shadow-[2px_2px_0px_0px_#1A1A1A]' : 'border-transparent opacity-70'}`}
                style={selectedMood === option.value ? { transform: [{ scale: 1.1 }] } : { transform: [{ scale: 0.9 }] }}
              >
                <Text className="text-3xl mb-1">{option.emoji}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text className="h-8 font-label-bold text-ink-black font-bold tracking-widest uppercase">{selectedMoodLabel}</Text>

          <TouchableOpacity 
            onPress={handleCheckIn}
            disabled={isSubmitting}
            className="w-full bg-primary py-4 px-8 rounded-xl border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] flex-row items-center justify-center gap-2 active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
          >
            {isSubmitting ? (
               <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <>
                <Text className="font-label-bold text-white font-bold text-lg">Check In</Text>
                <Ionicons name="arrow-forward" size={24} color="#ffffff" />
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* History Section */}
        <View className="w-full">
          <Text className="font-headline-sm text-ink-black font-bold text-xl mb-4">Past Check-ins</Text>
          {isLoadingHistory ? (
            <ActivityIndicator size="large" color="#002da5" className="my-10" />
          ) : moodHistory.length === 0 ? (
            <View className="bg-surface-container-lowest border-[1.5px] border-ink-black rounded-2xl p-6 items-center">
              <Text className="font-body-md text-on-surface-variant text-center">No past check-ins yet. Start tracking your mood above.</Text>
            </View>
          ) : (
            <View className="flex-col gap-4">
              {moodHistory.map((item, idx) => {
                const opt = moodOptions.find(m => m.value === item.mood);
                return (
                  <View key={item.id || idx} className="bg-white border-[1.5px] border-ink-black rounded-2xl p-4 flex-row items-center justify-between shadow-[2px_2px_0px_0px_#1A1A1A]">
                    <View className="flex-row items-center gap-4">
                      <View className="w-12 h-12 bg-secondary-container rounded-full border-[1.5px] border-ink-black flex items-center justify-center">
                        <Text className="text-2xl">{opt?.emoji || '😐'}</Text>
                      </View>
                      <View>
                        <Text className="font-label-bold text-ink-black font-bold">{opt?.label || 'Unknown'}</Text>
                        <Text className="font-label-md text-on-surface-variant text-xs">
                           {format(new Date(item.created_at), 'MMM dd, hh:mm a')}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          )}
        </View>

      </ScrollView>
    </View>
  );
}
