import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CustomButton } from '../../components/CustomButton';

const SYMPTOMS = [
  'Depression', 'Anxiety', 'Panic Attacks', 'Insomnia', 'Chronic Stress',
  'Grief', 'Relationship Issues', 'Trauma/PTSD', 'Substance Abuse', 'Eating Disorders',
  'ADHD/Focus', 'Self-Harm', 'Anger Management', 'OCD'
];

export default function SymptomsScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);

  const toggleSymptom = (s: string) => {
    if (selected.includes(s)) {
      setSelected(selected.filter(i => i !== s));
    } else {
      setSelected([...selected, s]);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <View className="flex-row items-center px-4 py-3 border-b border-surface-variant bg-surface">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 justify-center">
          <Ionicons name="arrow-back" size={24} color="#1b1b20" />
        </TouchableOpacity>
        <Text className="font-headline-md text-on-surface font-bold text-xl ml-2 flex-1">
          Current Focus
        </Text>
        <Text className="font-label-bold text-on-surface-variant">Step 3 of 4</Text>
      </View>

      <View className="h-1 bg-surface-variant w-full">
        <View className="h-1 bg-primary" style={{ width: '75%' }} />
      </View>

      <ScrollView className="flex-1 px-6 pt-6">
        <Text className="font-headline-md text-on-surface text-2xl font-bold mb-2">What brings you here?</Text>
        <Text className="font-body-md text-on-surface-variant mb-6">
          Select all the challenges you're currently experiencing. This helps us tailor your therapy plan.
        </Text>

        <View className="flex-row flex-wrap gap-3 mb-8">
          {SYMPTOMS.map((sym) => {
            const isSelected = selected.includes(sym);
            return (
              <TouchableOpacity
                key={sym}
                onPress={() => toggleSymptom(sym)}
                className={`px-4 py-2 rounded-full border ${isSelected ? 'bg-primary border-primary' : 'bg-surface border-outline-variant'}`}
              >
                <Text className={`font-label-bold ${isSelected ? 'text-white' : 'text-on-surface'}`}>
                  {sym}
                </Text>
              </TouchableOpacity>
            )
          })}
        </View>
      </ScrollView>

      <View className="p-6 border-t border-surface-variant bg-surface">
        <CustomButton 
          title="Next"
          onPress={() => router.push('/intake/emergency-setup')}
          disabled={selected.length === 0}
        />
      </View>
    </SafeAreaView>
  );
}
