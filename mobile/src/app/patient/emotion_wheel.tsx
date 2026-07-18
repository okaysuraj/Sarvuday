import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function EmotionWheelSelectionScreen() {
  const router = useRouter();
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);

  const toggleEmotion = (emotion: string) => {
    if (selectedEmotions.includes(emotion)) {
      setSelectedEmotions(selectedEmotions.filter(e => e !== emotion));
    } else {
      setSelectedEmotions([...selectedEmotions, emotion]);
    }
  };

  return (
    <View className="flex-1 bg-background">
      {/* Top App Bar */}
      <View className="w-full bg-background border-b-[1.5px] border-ink-black px-4 md:px-10 py-4 flex-row items-center justify-between sticky top-0 z-40">
        <TouchableOpacity onPress={() => router.back()} className="p-2 border-[1.5px] border-ink-black rounded-lg bg-white shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
          <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <Text className="font-display-lg-mobile text-primary font-bold text-2xl tracking-tighter">SarvUday</Text>
        <View className="w-10 h-10 hidden md:flex items-center justify-center p-2 border-[1.5px] border-ink-black rounded-lg bg-white shadow-[2px_2px_0px_0px_#1A1A1A]">
          <Ionicons name="settings" size={20} color="#1A1A1A" />
        </View>
        <View className="w-10 h-10 md:hidden" />
      </View>

      {/* Main Content */}
      <ScrollView className="flex-1 px-4 md:px-10 py-6 max-w-7xl mx-auto w-full" contentContainerStyle={{ paddingBottom: 100 }}>
        
        <View className="text-center mb-6 max-w-2xl mx-auto">
          <Text className="font-headline-md text-ink-black font-bold text-3xl mb-3 text-center">How are you feeling right now?</Text>
          <Text className="font-body-lg text-on-surface-variant text-lg text-center">Tap a core emotion to explore specific feelings.</Text>
        </View>

        {/* Emotion Bento Grid */}
        <View className="flex-col md:flex-row flex-wrap gap-4 w-full mb-10">
          
          {/* Joy Category */}
          <View className="flex-[2] min-w-[100%] md:min-w-[48%] bg-secondary-container rounded-[24px] border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] p-6 flex-col justify-between relative overflow-hidden">
            <View className="absolute -right-4 -top-4 opacity-20 transform rotate-12">
              <Ionicons name="happy" size={120} color="#715b00" />
            </View>
            <View>
              <Text className="font-headline-sm text-on-secondary-container font-bold text-2xl mb-1">Joy</Text>
              <Text className="font-body-md text-on-secondary-container opacity-80 mb-4 text-base">Happy, proud, optimistic...</Text>
            </View>
            <View className="flex-row flex-wrap gap-2 mt-4">
              {['Excited', 'Grateful', 'Proud', 'Peaceful'].map(emotion => (
                <TouchableOpacity 
                  key={emotion}
                  onPress={() => toggleEmotion(emotion)}
                  className={`border-[1px] border-ink-black rounded-full px-4 py-2 shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${
                    selectedEmotions.includes(emotion) ? 'bg-primary' : 'bg-white'
                  }`}
                >
                  <Text className={`font-label-md ${selectedEmotions.includes(emotion) ? 'text-white' : 'text-ink-black'}`}>{emotion}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Sadness Category */}
          <View className="flex-[1] min-w-[48%] md:min-w-[22%] bg-inverse-primary rounded-[24px] border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] p-4 flex-col relative overflow-hidden">
            <View className="absolute -right-4 -bottom-4 opacity-20 transform -rotate-12">
              <Ionicons name="sad" size={80} color="#001356" />
            </View>
            <Text className="font-headline-sm text-on-primary-fixed font-bold text-xl mb-2">Sadness</Text>
            <View className="flex-row flex-wrap gap-2 mt-auto relative z-10 pt-8">
              {['Lonely', 'Vulnerable'].map(emotion => (
                <TouchableOpacity 
                  key={emotion}
                  onPress={() => toggleEmotion(emotion)}
                  className={`bg-white/50 border-[1px] border-ink-black rounded-full px-3 py-1 ${selectedEmotions.includes(emotion) ? 'bg-primary border-primary' : ''}`}
                >
                  <Text className={`font-label-md text-xs ${selectedEmotions.includes(emotion) ? 'text-white' : 'text-ink-black'}`}>{emotion}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Anger Category */}
          <View className="flex-[1] min-w-[48%] md:min-w-[22%] bg-accent-orange rounded-[24px] border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] p-4 flex-col relative overflow-hidden">
            <View className="absolute -right-4 -bottom-4 opacity-20 transform rotate-12">
              <Ionicons name="flame" size={80} color="#93000a" />
            </View>
            <Text className="font-headline-sm text-on-error-container font-bold text-xl mb-2">Anger</Text>
            <View className="flex-row flex-wrap gap-2 mt-auto relative z-10 pt-8">
              {['Frustrated', 'Bitter'].map(emotion => (
                <TouchableOpacity 
                  key={emotion}
                  onPress={() => toggleEmotion(emotion)}
                  className={`bg-white/50 border-[1px] border-ink-black rounded-full px-3 py-1 ${selectedEmotions.includes(emotion) ? 'bg-primary border-primary' : ''}`}
                >
                  <Text className={`font-label-md text-xs ${selectedEmotions.includes(emotion) ? 'text-white' : 'text-ink-black'}`}>{emotion}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Fear Category */}
          <View className="flex-[1] min-w-[48%] md:min-w-[22%] bg-tertiary-fixed rounded-[24px] border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] p-4 flex-col relative overflow-hidden">
            <View className="absolute -right-4 -bottom-4 opacity-20 transform -rotate-12">
              <Ionicons name="skull" size={80} color="#331019" />
            </View>
            <Text className="font-headline-sm text-on-tertiary-fixed font-bold text-xl mb-2">Fear</Text>
            <View className="flex-row flex-wrap gap-2 mt-auto relative z-10 pt-8">
              {['Anxious', 'Overwhelmed'].map(emotion => (
                <TouchableOpacity 
                  key={emotion}
                  onPress={() => toggleEmotion(emotion)}
                  className={`bg-white/50 border-[1px] border-ink-black rounded-full px-3 py-1 ${selectedEmotions.includes(emotion) ? 'bg-primary border-primary' : ''}`}
                >
                  <Text className={`font-label-md text-xs ${selectedEmotions.includes(emotion) ? 'text-white' : 'text-ink-black'}`}>{emotion}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Surprise Category */}
          <View className="flex-[1] min-w-[48%] md:min-w-[22%] bg-accent-sage rounded-[24px] border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] p-4 flex-col relative overflow-hidden">
            <View className="absolute -right-4 -bottom-4 opacity-20 transform rotate-12">
              <Ionicons name="flash" size={80} color="#434655" />
            </View>
            <Text className="font-headline-sm text-on-surface-variant font-bold text-xl mb-2">Surprise</Text>
            <View className="flex-row flex-wrap gap-2 mt-auto relative z-10 pt-8">
              {['Confused', 'Amazed'].map(emotion => (
                <TouchableOpacity 
                  key={emotion}
                  onPress={() => toggleEmotion(emotion)}
                  className={`bg-white/50 border-[1px] border-ink-black rounded-full px-3 py-1 ${selectedEmotions.includes(emotion) ? 'bg-primary border-primary' : ''}`}
                >
                  <Text className={`font-label-md text-xs ${selectedEmotions.includes(emotion) ? 'text-white' : 'text-ink-black'}`}>{emotion}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

        </View>

        {/* Selected Tags Preview */}
        {selectedEmotions.length > 0 && (
          <View className="w-full max-w-2xl bg-white border-[1.5px] border-ink-black rounded-xl p-4 mb-10 flex-row items-center border-dashed mx-auto">
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row items-center w-full">
              <Text className="font-label-bold text-outline uppercase mr-2 font-bold">Selected:</Text>
              {selectedEmotions.map(emotion => (
                <TouchableOpacity 
                  key={emotion}
                  onPress={() => toggleEmotion(emotion)}
                  className="bg-primary-container border-[1.5px] border-ink-black rounded-full px-3 py-1 flex-row items-center gap-1 mr-2"
                >
                  <Text className="font-label-md text-on-primary-container">{emotion}</Text>
                  <Ionicons name="close" size={16} color="#bbc5ff" />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Next Action */}
        <View className="mt-auto w-full max-w-sm mx-auto">
          <TouchableOpacity 
            onPress={() => router.push('/patient/journal_entry')}
            className="w-full bg-primary border-[1.5px] border-ink-black rounded-xl py-4 shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none items-center"
          >
            <Text className="text-white font-label-bold font-bold text-lg">Continue</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}
