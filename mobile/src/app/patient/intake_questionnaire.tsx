import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function IntakeQuestionnaireScreen() {
  const router = useRouter();
  const [mindText, setMindText] = useState('');
  const [symptoms, setSymptoms] = useState([
    { id: 'anxiety', label: 'Anxiety or Panic', checked: false },
    { id: 'depression', label: 'Low Mood / Depression', checked: false },
    { id: 'sleep', label: 'Sleep Issues', checked: false },
    { id: 'stress', label: 'Stress', checked: false },
  ]);

  const toggleSymptom = (id: string) => {
    setSymptoms(symptoms.map(s => s.id === id ? { ...s, checked: !s.checked } : s));
  };

  return (
    <View className="flex-1 bg-surface">
      {/* TopAppBar */}
      <View className="flex-row justify-between items-center px-4 py-4 w-full bg-surface border-b-[1.5px] border-ink-black sticky top-0 z-40">
        <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full active:bg-surface-variant text-on-surface-variant">
          <Ionicons name="arrow-back" size={24} color="#434655" />
        </TouchableOpacity>
        <Text className="font-headline-md-mobile text-primary font-bold text-xl">SarvUday</Text>
        <TouchableOpacity className="p-2 rounded-full active:bg-surface-variant text-on-surface-variant">
          <Ionicons name="person-circle-outline" size={24} color="#434655" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 md:px-10 py-8 max-w-3xl mx-auto w-full mb-10" contentContainerStyle={{ paddingBottom: 60 }}>
        
        {/* Progress Indicator */}
        <View className="flex-col gap-2 mb-8">
          <View className="flex-row justify-between items-center">
            <Text className="font-label-bold text-on-surface font-bold text-sm">Intake Questionnaire</Text>
            <Text className="font-label-bold text-on-surface font-bold text-sm">Step 4 of 5</Text>
          </View>
          <View className="w-full h-3 border-[1.5px] border-ink-black rounded-full bg-surface-variant overflow-hidden flex-row">
            <View className="h-full bg-accent-orange border-r-[1.5px] border-ink-black" style={{ width: '80%' }} />
          </View>
        </View>

        {/* Header */}
        <View className="flex-col gap-3 mb-8">
          <Text className="font-display-lg-mobile md:font-display-lg text-primary font-bold text-3xl md:text-5xl">Tell us more</Text>
          <Text className="font-body-lg text-on-surface-variant text-base">Providing context helps us match you with the right resources and therapists for a personalized session.</Text>
        </View>

        {/* Form Card */}
        <View className="bg-surface-container-lowest border-[1.5px] border-ink-black rounded-[32px] p-6 flex-col gap-6 relative overflow-hidden shadow-[4px_4px_0px_0px_#1A1A1A]">
          {/* Decorative Accent */}
          <View className="absolute top-0 right-0 w-32 h-32 bg-accent-pink rounded-bl-full opacity-50 border-b-[1.5px] border-l-[1.5px] border-ink-black z-0" />
          
          {/* What's on your mind? */}
          <View className="flex-col gap-2 z-10">
            <Text className="font-label-bold text-on-surface font-bold text-sm">What's on your mind?</Text>
            <View className="relative">
              <TextInput 
                className="w-full bg-[#f9f8f3] border-[1.5px] border-ink-black rounded-xl p-4 font-body-md text-on-surface text-base min-h-[120px]"
                multiline
                textAlignVertical="top"
                placeholder="Briefly describe what brings you here today..."
                placeholderTextColor="#747687"
                value={mindText}
                onChangeText={setMindText}
                maxLength={500}
              />
            </View>
            <Text className="font-label-md text-outline-variant text-right text-xs mt-1">{mindText.length} / 500</Text>
          </View>

          {/* Current Symptoms */}
          <View className="flex-col gap-4 mt-2 z-10">
            <View>
              <Text className="font-label-bold text-on-surface font-bold text-sm">Current Symptoms</Text>
              <Text className="font-body-md text-on-surface-variant text-xs mt-1">Select any that apply to how you've been feeling recently.</Text>
            </View>
            
            <View className="flex-row flex-wrap justify-between gap-y-4">
              {symptoms.map(symptom => (
                <TouchableOpacity 
                  key={symptom.id}
                  onPress={() => toggleSymptom(symptom.id)}
                  className="w-full sm:w-[48%] flex-row items-center gap-3 p-4 border-[1.5px] border-ink-black rounded-xl bg-[#f9f8f3] active:bg-surface-container-low"
                >
                  <View className="flex items-center justify-center w-6 h-6 border-[1.5px] border-ink-black rounded bg-surface">
                    {symptom.checked && <Ionicons name="checkmark" size={16} color="#002da5" className="font-bold" />}
                  </View>
                  <Text className={`font-body-md text-on-surface flex-1 ${symptom.checked ? 'text-primary font-bold' : ''}`}>{symptom.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Actions */}
          <View className="flex-col sm:flex-row justify-between items-center mt-6 gap-4 z-10">
            <TouchableOpacity className="w-full sm:w-auto px-6 py-3 bg-surface border-[1.5px] border-ink-black rounded-lg shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-y-[2px] active:shadow-none items-center justify-center">
              <Text className="font-label-bold text-on-surface font-bold text-sm">Save for later</Text>
            </TouchableOpacity>
            <TouchableOpacity className="w-full sm:w-auto px-8 py-3 bg-primary border-[1.5px] border-ink-black rounded-lg shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-y-[2px] active:shadow-none flex-row items-center justify-center gap-2">
              <Text className="font-label-bold text-white font-bold text-sm">Continue to Step 5</Text>
              <Ionicons name="arrow-forward" size={16} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}
