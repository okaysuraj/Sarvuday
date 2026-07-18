import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function CrisisResourcesScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-cream-bg">
      {/* Header */}
      <View className="w-full top-0 bg-cream-bg border-b-[1.5px] border-ink-black flex-row justify-between items-center px-6 py-4 z-50">
        <View className="flex-row items-center gap-4">
          <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full active:bg-surface-container">
            <Ionicons name="menu" size={24} color="#002da5" />
          </TouchableOpacity>
          <Text className="font-headline-md font-bold text-primary text-xl tracking-tighter uppercase">MindEase AI</Text>
        </View>
        <TouchableOpacity className="w-10 h-10 rounded-full border-[1.5px] border-ink-black bg-accent-sage items-center justify-center">
          <Ionicons name="person" size={24} color="#1A1A1A" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 py-8" contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Hero Section */}
        <View className="bg-accent-sage border-[1.5px] border-ink-black rounded-[32px] p-8 md:p-12 mb-8 relative overflow-hidden">
          <View className="relative z-10 max-w-2xl">
            <Text className="font-display-lg text-ink-black font-bold text-3xl mb-4 md:text-5xl">You are not alone.</Text>
            <Text className="font-body-lg text-on-surface-variant mb-8">If you're going through a tough time, please reach out. Support is available 24/7, and it's completely confidential and free.</Text>
            
            <View className="flex-row flex-wrap gap-4">
              <TouchableOpacity className="bg-primary border-[1.5px] border-ink-black px-6 py-3 rounded-xl flex-row items-center gap-2 shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
                <Ionicons name="call" size={20} color="#ffffff" />
                <Text className="font-label-bold text-white font-bold">Call 988 Now</Text>
              </TouchableOpacity>
              
              <TouchableOpacity className="bg-white border-[1.5px] border-ink-black px-6 py-3 rounded-xl flex-row items-center gap-2 shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
                <Ionicons name="chatbox" size={20} color="#1A1A1A" />
                <Text className="font-label-bold text-ink-black font-bold">Text HOME to 741741</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Abstract Elements */}
          <View className="absolute -top-5 -right-5 w-48 h-48 bg-secondary-container rounded-full border-[1.5px] border-ink-black opacity-20" />
          <View className="absolute -bottom-10 right-[10%] w-64 h-64 bg-accent-pink rounded-full border-[1.5px] border-ink-black opacity-30" />
        </View>

        {/* Resources Grid */}
        <View className="flex-col md:flex-row gap-6 mb-8">
          
          {/* Hotlines */}
          <View className="flex-[7] bg-white border-[1.5px] border-ink-black rounded-[32px] p-8">
            <View className="flex-row items-center gap-3 mb-6">
              <Ionicons name="medical" size={28} color="#002da5" />
              <Text className="font-headline-sm text-ink-black font-bold text-2xl">Hotlines & Text Lines</Text>
            </View>
            
            <View className="flex-col gap-4">
              <TouchableOpacity className="p-4 border-[1.5px] border-ink-black rounded-2xl flex-row items-center justify-between active:bg-surface-container">
                <View>
                  <Text className="font-label-bold text-ink-black font-bold">988 Suicide & Crisis Lifeline</Text>
                  <Text className="text-sm text-on-surface-variant font-body-md">Call or Text 988 (English & Spanish)</Text>
                </View>
                <View className="w-10 h-10 items-center justify-center bg-accent-sage border-[1.5px] border-ink-black rounded-full shadow-[2px_2px_0px_0px_#1A1A1A]">
                  <Ionicons name="call" size={20} color="#1A1A1A" />
                </View>
              </TouchableOpacity>

              <TouchableOpacity className="p-4 border-[1.5px] border-ink-black rounded-2xl flex-row items-center justify-between active:bg-surface-container">
                <View>
                  <Text className="font-label-bold text-ink-black font-bold">Crisis Text Line</Text>
                  <Text className="text-sm text-on-surface-variant font-body-md">Text HOME to 741741</Text>
                </View>
                <View className="w-10 h-10 items-center justify-center bg-accent-orange border-[1.5px] border-ink-black rounded-full shadow-[2px_2px_0px_0px_#1A1A1A]">
                  <Ionicons name="chatbubbles" size={20} color="#1A1A1A" />
                </View>
              </TouchableOpacity>

              <TouchableOpacity className="p-4 border-[1.5px] border-ink-black rounded-2xl flex-row items-center justify-between active:bg-surface-container">
                <View>
                  <Text className="font-label-bold text-ink-black font-bold">The Trevor Project</Text>
                  <Text className="text-sm text-on-surface-variant font-body-md">LGBTQ+ Youth: Call 1-866-488-7386</Text>
                </View>
                <View className="w-10 h-10 items-center justify-center bg-accent-pink border-[1.5px] border-ink-black rounded-full shadow-[2px_2px_0px_0px_#1A1A1A]">
                  <Ionicons name="heart" size={20} color="#1A1A1A" />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Safety Plan Guide */}
          <View className="flex-[5] bg-secondary-container border-[1.5px] border-ink-black rounded-[32px] p-8 flex-col justify-between">
            <View>
              <Text className="font-headline-sm text-ink-black font-bold text-2xl mb-4">Create Your Safety Plan</Text>
              <Text className="font-body-md text-on-secondary-container mb-6">A personalized guide to help you stay safe when you're feeling overwhelmed or in crisis.</Text>
              
              <View className="flex-col gap-3 font-label-md">
                <View className="flex-row items-center gap-3">
                  <View className="w-6 h-6 rounded-full bg-ink-black items-center justify-center">
                    <Text className="text-white text-[10px] font-bold">1</Text>
                  </View>
                  <Text className="font-body-md text-ink-black">Identify Warning Signs</Text>
                </View>
                <View className="flex-row items-center gap-3">
                  <View className="w-6 h-6 rounded-full bg-ink-black items-center justify-center">
                    <Text className="text-white text-[10px] font-bold">2</Text>
                  </View>
                  <Text className="font-body-md text-ink-black">Coping Strategies</Text>
                </View>
                <View className="flex-row items-center gap-3">
                  <View className="w-6 h-6 rounded-full bg-ink-black items-center justify-center">
                    <Text className="text-white text-[10px] font-bold">3</Text>
                  </View>
                  <Text className="font-body-md text-ink-black">Safe Places & People</Text>
                </View>
              </View>
            </View>
            
            <TouchableOpacity className="mt-8 w-full bg-ink-black py-4 rounded-xl flex-row items-center justify-center gap-2 shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
              <Ionicons name="document-text" size={20} color="#ffffff" />
              <Text className="font-label-bold text-white font-bold">Start My Plan</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Supportive Content */}
        <View className="flex-col md:flex-row gap-6 mb-8">
          
          <View className="flex-1 bg-white border-[1.5px] border-ink-black rounded-[24px] p-6 flex-row gap-4">
            <View className="w-24 h-24 rounded-2xl border-[1.5px] border-ink-black overflow-hidden flex-shrink-0 bg-accent-sage">
              <Image 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAuTQa3jEADpWHbnqeHt-FwRo23lfzys3VZYrx-tEmFcJ2WaiprG5O5X6QqhuGdDnAAbCASCRu9Ny_6NLbYSk4SEXWGefxJa04FMqudHrEP1oBmN-jhFCTGKZT0QmHqh0JNQ-eH9AAifcIDAmlfBoh2a_0At0nAKOrEamQoflFnApzMOTfiMB3vjwkU2BD1YAg0udM_kpVrqHqxjAt_ox5ZSNCfhQJM-p-96gPNgECGitfHdxE1B84Gjg' }}
                className="w-full h-full opacity-80"
              />
            </View>
            <View className="flex-1">
              <Text className="font-label-bold text-ink-black font-bold mb-2">Grounding Techniques</Text>
              <Text className="text-sm font-body-md text-on-surface-variant mb-2">Quick exercises to bring your focus back to the present moment.</Text>
              <TouchableOpacity>
                <Text className="text-primary font-label-bold text-sm underline font-bold">Learn 5-4-3-2-1</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="flex-1 bg-white border-[1.5px] border-ink-black rounded-[24px] p-6 flex-row gap-4">
            <View className="w-24 h-24 rounded-2xl border-[1.5px] border-ink-black overflow-hidden flex-shrink-0 bg-accent-pink">
              <Image 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJabefOd0BlNIWWdVOCUQE9lPOmmLfUCoHGL4HLAvyEWmY25hUwcENEB0__STpyJRo6-PYJL0SwrTfGMsZ7n6Y5ff7gQGo0wLHT9GlBJWgXiW1_xxoiZ9UmNtMaJoIMx-9TiYl29Z7G1Tb7j-GReaq7TTJNfAcq0KFRvS_vk2TOZY4N3o59xdApGMcaH1t224C9rTz9LlOi9ugXpVNm3lSfxqSkDhvJ8yALj-30xHfiFNzUA48S_e6rQ' }}
                className="w-full h-full opacity-80"
              />
            </View>
            <View className="flex-1">
              <Text className="font-label-bold text-ink-black font-bold mb-2">How to Help a Friend</Text>
              <Text className="text-sm font-body-md text-on-surface-variant mb-2">Learn the signs and how to offer meaningful support effectively.</Text>
              <TouchableOpacity>
                <Text className="text-primary font-label-bold text-sm underline font-bold">Read Guide</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>

      </ScrollView>
    </View>
  );
}
