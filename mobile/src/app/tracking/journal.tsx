import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CustomButton } from '../../components/CustomButton';
import { trackingApi } from '../../api/tracking';

const TRIGGERS = ['Work', 'Family', 'Sleep', 'Health', 'Money', 'Relationship'];

export default function JournalEntryScreen() {
  const router = useRouter();
  const { moodIndex, emotions } = useLocalSearchParams();
  const [entry, setEntry] = useState('');
  const [selectedTriggers, setSelectedTriggers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const toggleTrigger = (trigger: string) => {
    if (selectedTriggers.includes(trigger)) {
      setSelectedTriggers(selectedTriggers.filter(t => t !== trigger));
    } else {
      setSelectedTriggers([...selectedTriggers, trigger]);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      if (moodIndex !== undefined) {
        await trackingApi.logMood({
          moodIndex: Number(moodIndex),
          emotions: emotions ? String(emotions).split(',') : []
        });
      }

      await trackingApi.submitJournalEntry({
        text: entry,
        triggers: selectedTriggers
      });

      Alert.alert('Saved', 'Your check-in has been saved successfully.', [
        { text: 'OK', onPress: () => router.push('/(tabs)') }
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to save your check-in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <View className="flex-row items-center px-4 py-3 border-b border-surface-variant bg-surface">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 justify-center">
          <Ionicons name="arrow-back" size={24} color="#1b1b20" />
        </TouchableOpacity>
        <Text className="font-headline-md text-on-surface font-bold text-xl ml-2 flex-1">
          Daily Journal
        </Text>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} className="flex-1">
        <View className="flex-1 px-6 pt-6">
          <Text className="font-headline-md text-on-surface text-lg font-bold mb-4">What's on your mind?</Text>
          <TextInput
            className="flex-1 bg-surface-container-highest rounded-xl p-4 font-body-md text-on-surface text-base"
            placeholder="Write your thoughts here..."
            placeholderTextColor="#747687"
            multiline
            textAlignVertical="top"
            value={entry}
            onChangeText={setEntry}
          />
          
          <View className="mt-6 mb-8">
            <Text className="font-headline-md text-on-surface text-lg font-bold mb-3">Tag any factors or triggers</Text>
            <View className="flex-row flex-wrap gap-3">
              {TRIGGERS.map(trigger => {
                const isSelected = selectedTriggers.includes(trigger);
                return (
                  <TouchableOpacity
                    key={trigger}
                    onPress={() => toggleTrigger(trigger)}
                    className={`px-4 py-2 rounded-full border ${
                      isSelected ? 'bg-error border-error' : 'bg-surface border-outline-variant'
                    }`}
                  >
                    <Text className={`font-label-bold text-sm ${isSelected ? 'text-on-error' : 'text-on-surface'}`}>
                      {trigger}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>

        <View className="p-6 border-t border-surface-variant bg-surface">
          <CustomButton 
            title="Save Entry"
            onPress={handleSave}
            disabled={!entry.trim()}
            isLoading={isLoading}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
