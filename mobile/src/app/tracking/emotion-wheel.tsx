import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CustomButton } from '../../components/CustomButton';
import { trackingApi } from '../../api/tracking';

const EMOTIONS = [
  'Joyful', 'Content', 'Proud', 'Accepted', 'Powerful', 'Peaceful',
  'Anxious', 'Overwhelmed', 'Scared', 'Insecure',
  'Angry', 'Frustrated', 'Annoyed', 'Bitter',
  'Sad', 'Lonely', 'Guilty', 'Disappointed',
  'Surprised', 'Confused', 'Amazed', 'Excited'
];

export default function EmotionWheelScreen() {
  const router = useRouter();
  const { moodIndex } = useLocalSearchParams();
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [isSkipping, setIsSkipping] = useState(false);

  const toggleEmotion = (emotion: string) => {
    if (selectedEmotions.includes(emotion)) {
      setSelectedEmotions(selectedEmotions.filter(e => e !== emotion));
    } else {
      if (selectedEmotions.length < 3) {
        setSelectedEmotions([...selectedEmotions, emotion]);
      }
    }
  };

  const handleNext = () => {
    router.push({
      pathname: '/tracking/journal',
      params: { 
        moodIndex: moodIndex,
        emotions: selectedEmotions.join(',')
      }
    });
  };

  const handleSkip = async () => {
    setIsSkipping(true);
    try {
      if (moodIndex !== undefined) {
        await trackingApi.logMood({
          moodIndex: Number(moodIndex),
          emotions: selectedEmotions
        });
      }
      router.push('/(tabs)');
    } catch (e) {
      Alert.alert("Error", "Failed to save mood");
    } finally {
      setIsSkipping(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <View className="flex-row items-center px-4 py-3 border-b border-surface-variant bg-surface">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 justify-center">
          <Ionicons name="arrow-back" size={24} color="#1b1b20" />
        </TouchableOpacity>
        <Text className="font-headline-md text-on-surface font-bold text-xl ml-2 flex-1">
          Detailed Check-In
        </Text>
      </View>

      <ScrollView className="flex-1 px-6 pt-6">
        <Text className="font-headline-md text-on-surface text-2xl font-bold mb-2">
          What emotions are you experiencing?
        </Text>
        <Text className="font-body-md text-on-surface-variant text-base mb-8">
          Select up to 3 specific emotions to better understand your feelings.
        </Text>

        <View className="flex-row flex-wrap gap-3 mb-8">
          {EMOTIONS.map(emotion => {
            const isSelected = selectedEmotions.includes(emotion);
            return (
              <TouchableOpacity
                key={emotion}
                onPress={() => toggleEmotion(emotion)}
                className={`px-4 py-3 rounded-full border-2 ${
                  isSelected ? 'bg-primary border-primary' : 'bg-surface-container-highest border-outline-variant'
                }`}
              >
                <Text className={`font-label-bold text-sm ${isSelected ? 'text-on-primary' : 'text-on-surface'}`}>
                  {emotion}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {selectedEmotions.length > 0 && (
          <Text className="font-body-md text-primary font-bold text-center mb-8">
            Selected: {selectedEmotions.join(', ')}
          </Text>
        )}
      </ScrollView>

      <View className="p-6 border-t border-surface-variant bg-surface">
        <CustomButton 
          title="Continue to Journal"
          onPress={handleNext}
        />
        <TouchableOpacity onPress={handleSkip} disabled={isSkipping} className="mt-4 items-center">
          <Text className="font-label-bold text-primary font-bold text-sm">
            {isSkipping ? "Saving..." : "Skip Journaling"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
