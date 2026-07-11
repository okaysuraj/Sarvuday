import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CustomButton } from '../../components/CustomButton';

const MOODS = [
  { label: 'Awful', emoji: '😫', color: 'bg-error-container', activeBorder: 'border-error' },
  { label: 'Sad', emoji: '😔', color: 'bg-surface-variant', activeBorder: 'border-outline' },
  { label: 'Neutral', emoji: '😐', color: 'bg-secondary-container', activeBorder: 'border-secondary' },
  { label: 'Good', emoji: '😌', color: 'bg-primary-fixed', activeBorder: 'border-primary' },
  { label: 'Great', emoji: '😊', color: 'bg-tertiary-fixed', activeBorder: 'border-tertiary' },
];

export default function MoodCheckInScreen() {
  const router = useRouter();
  const [selectedMood, setSelectedMood] = useState<number | null>(null);

  const handleNext = () => {
    if (selectedMood !== null) {
      router.push({
        pathname: '/tracking/emotion-wheel',
        params: { moodIndex: selectedMood }
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <View className="flex-row items-center px-4 py-3 border-b border-surface-variant bg-surface">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 justify-center">
          <Ionicons name="close" size={24} color="#1b1b20" />
        </TouchableOpacity>
        <Text className="font-headline-md text-on-surface font-bold text-xl ml-2 flex-1">
          Check-In
        </Text>
      </View>

      <View className="flex-1 px-6 pt-12 items-center">
        <Text className="font-headline-md text-on-surface text-3xl font-bold mb-4 text-center">
          How are you feeling right now?
        </Text>
        <Text className="font-body-md text-on-surface-variant text-base mb-12 text-center">
          Select the option that best matches your current mood.
        </Text>

        <View className="flex-row flex-wrap justify-center gap-6 mb-12">
          {MOODS.map((mood, idx) => (
            <TouchableOpacity 
              key={idx}
              onPress={() => setSelectedMood(idx)}
              className="items-center"
            >
              <View 
                className={`w-20 h-20 rounded-full items-center justify-center mb-2 border-4 ${
                  selectedMood === idx ? mood.activeBorder : 'border-transparent'
                } ${mood.color}`}
              >
                <Text className="text-4xl">{mood.emoji}</Text>
              </View>
              <Text className={`font-label-bold text-sm ${selectedMood === idx ? 'text-on-surface font-bold' : 'text-on-surface-variant'}`}>
                {mood.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View className="p-6 border-t border-surface-variant bg-surface">
        <CustomButton 
          title="Continue"
          onPress={handleNext}
          disabled={selectedMood === null}
        />
      </View>
    </SafeAreaView>
  );
}
