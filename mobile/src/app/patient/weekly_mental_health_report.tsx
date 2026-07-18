import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Svg, { Path } from 'react-native-svg';

const { width } = Dimensions.get('window');

export default function WeeklyMentalHealthReportScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-cream-bg">
      {/* TopAppBar */}
      <View className="flex-row justify-between items-center px-4 py-4 w-full z-40 bg-cream-bg border-b-[1.5px] border-ink-black sticky top-0">
        <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full active:bg-surface-variant text-primary">
          <Ionicons name="arrow-back" size={24} color="#002da5" />
        </TouchableOpacity>
        <Text className="font-headline-sm text-primary font-bold text-xl tracking-tighter">SarvUday</Text>
        <TouchableOpacity className="p-2 rounded-full active:bg-surface-variant text-primary">
          <Ionicons name="settings-outline" size={24} color="#002da5" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 md:px-10 py-6 max-w-5xl mx-auto w-full mb-24" contentContainerStyle={{ paddingBottom: 120 }}>
        
        {/* Report Header */}
        <View className="text-center items-center gap-4 relative mb-8 mt-4">
          <View className="border-[1.5px] border-ink-black rounded-full px-4 py-1 bg-surface-container-lowest shadow-[2px_2px_0px_0px_#1A1A1A] mb-4">
            <Text className="text-on-surface-variant font-label-bold font-bold text-xs uppercase tracking-widest">Oct 16 - Oct 22</Text>
          </View>
          <Text className="font-display-lg-mobile md:font-display-lg text-ink-black font-bold text-3xl md:text-5xl text-center leading-tight">
            Weekly Mental Health{'\n'}<Text className="text-primary relative">Review</Text>
          </Text>
          <Text className="font-body-lg text-on-surface-variant text-base text-center max-w-lg mt-4">
            Your personal reflection on the past seven days. Celebrate the wins and acknowledge the areas for growth.
          </Text>
        </View>

        {/* Bento Grid Layout */}
        <View className="flex-col md:flex-row gap-6">
          
          {/* Hero Metric: Weekly Grade */}
          <View className="flex-[2] bg-secondary-container border-[1.5px] border-ink-black rounded-[24px] p-6 md:p-8 flex-col md:flex-row items-center gap-6 justify-between overflow-hidden relative shadow-[4px_4px_0px_0px_#1A1A1A]">
            <View className="absolute top-[-20px] right-[-20px] w-40 h-40 border-[1.5px] border-ink-black rounded-full bg-surface-container-lowest opacity-20" />
            <View className="flex-1 text-center md:text-left z-10">
              <Text className="font-headline-sm text-on-secondary-container font-bold text-xl mb-2">Overall Mood Average</Text>
              <Text className="font-display-lg-mobile md:font-display-lg text-ink-black font-bold text-3xl md:text-5xl mt-2 leading-none">Steady & Growing</Text>
              <Text className="font-body-md text-on-secondary-container text-sm mt-4 opacity-90">
                You maintained a positive baseline this week. The small daily check-ins are building a strong foundation. Keep it up!
              </Text>
            </View>
            <View className="w-32 h-32 md:w-48 md:h-48 shrink-0 z-10 items-center justify-center border-[1.5px] border-ink-black bg-surface-container-lowest rounded-full shadow-[inset_4px_4px_0px_0px_rgba(0,0,0,0.05)]">
              <Ionicons name="flower-outline" size={64} color="#715b00" />
            </View>
          </View>

          {/* Right Column Stack */}
          <View className="flex-[1] flex-col gap-6">
            
            {/* Dominant Emotion */}
            <View className="flex-1 bg-accent-pink border-[1.5px] border-ink-black rounded-[24px] p-6 flex-col justify-between shadow-[4px_4px_0px_0px_#1A1A1A]">
              <View>
                <Text className="font-label-bold text-ink-black font-bold text-xs uppercase tracking-wider mb-2">Dominant Emotion</Text>
                <Text className="font-headline-md text-ink-black font-bold text-2xl mt-4">Hopeful</Text>
              </View>
              <View className="mt-6 pt-4 border-t-[1.5px] border-ink-black/20">
                <Text className="font-body-md text-ink-black/80 text-sm">
                  Recorded <Text className="font-bold">4 times</Text> this week, mostly in the mornings.
                </Text>
              </View>
            </View>

            {/* Sleep Quality Correlation */}
            <View className="flex-1 bg-accent-sage border-[1.5px] border-ink-black rounded-[24px] p-6 flex-col gap-4 shadow-[4px_4px_0px_0px_#1A1A1A]">
              <View className="flex-row items-center gap-2 mb-2">
                <Ionicons name="moon" size={24} color="#1A1A1A" />
                <Text className="font-headline-sm text-ink-black font-bold text-lg">Sleep Correlation</Text>
              </View>
              <Text className="font-body-md text-ink-black/80 text-sm mb-4">
                On days you slept more than 7 hours, your mood score was 30% higher.
              </Text>
              
              <View className="flex-col gap-4 mt-auto">
                <View>
                  <View className="flex-row justify-between mb-1">
                    <Text className="font-label-md text-ink-black text-xs font-bold">Good Sleep (7h+)</Text>
                    <Text className="font-label-md text-ink-black text-xs font-bold">Mood: High</Text>
                  </View>
                  <View className="h-3 w-full bg-surface-container-lowest border-[1.5px] border-ink-black rounded-full overflow-hidden flex-row">
                    <View className="h-full bg-accent-orange border-r-[1.5px] border-ink-black" style={{ width: '85%' }} />
                  </View>
                </View>
                <View>
                  <View className="flex-row justify-between mb-1">
                    <Text className="font-label-md text-ink-black text-xs font-bold">Poor Sleep (&lt;7h)</Text>
                    <Text className="font-label-md text-ink-black text-xs font-bold">Mood: Low/Mixed</Text>
                  </View>
                  <View className="h-3 w-full bg-surface-container-lowest border-[1.5px] border-ink-black rounded-full overflow-hidden flex-row">
                    <View className="h-full bg-outline border-r-[1.5px] border-ink-black" style={{ width: '40%' }} />
                  </View>
                </View>
              </View>
            </View>

          </View>
        </View>

        {/* AI Recommendations */}
        <View className="mt-6 bg-surface-container-lowest border-[1.5px] border-ink-black rounded-[24px] p-6 flex-col shadow-[4px_4px_0px_0px_#1A1A1A]">
          <View className="flex-row items-center gap-2 mb-6 border-b-[1.5px] border-ink-black pb-4">
            <Ionicons name="bulb" size={28} color="#002da5" />
            <Text className="font-headline-sm text-ink-black font-bold text-xl">AI Recommendations</Text>
          </View>
          
          <View className="flex-col gap-4 flex-1">
            {/* List Item 1 */}
            <View className="flex-row items-start gap-4">
              <View className="w-8 h-8 rounded-full border-[1.5px] border-ink-black bg-secondary-container items-center justify-center shadow-[2px_2px_0px_0px_#1A1A1A]">
                <Text className="font-label-bold text-ink-black font-bold">1</Text>
              </View>
              <View className="flex-1">
                <Text className="font-headline-sm text-ink-black font-bold text-lg">Protect Your Evenings</Text>
                <Text className="font-body-md text-on-surface-variant text-sm mt-1">
                  Your data shows anxiety peaks around 9 PM. Try replacing screen time with reading to improve your sleep correlation.
                </Text>
              </View>
            </View>

            {/* List Item 2 */}
            <View className="flex-row items-start gap-4 mt-4">
              <View className="w-8 h-8 rounded-full border-[1.5px] border-ink-black bg-accent-pink items-center justify-center shadow-[2px_2px_0px_0px_#1A1A1A]">
                <Text className="font-label-bold text-ink-black font-bold">2</Text>
              </View>
              <View className="flex-1">
                <Text className="font-headline-sm text-ink-black font-bold text-lg">Capitalize on Morning Energy</Text>
                <Text className="font-body-md text-on-surface-variant text-sm mt-1">
                  You feel most "Hopeful" in the AM. Schedule your toughest tasks before noon.
                </Text>
              </View>
            </View>
          </View>

          <TouchableOpacity className="mt-8 w-full py-4 bg-primary rounded-xl border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex-row items-center justify-center gap-2">
            <Ionicons name="chatbubbles" size={20} color="#ffffff" />
            <Text className="text-white font-label-bold font-bold uppercase tracking-widest text-xs">Discuss Report with AI</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* BottomNavBar */}
      <View className="md:hidden absolute bottom-0 w-full bg-surface-container-lowest border-t-[1.5px] border-ink-black h-20 px-4 pb-4 flex-row justify-around items-center z-50 shadow-[4px_4px_0px_0px_#1A1A1A] rounded-t-xl">
        <TouchableOpacity onPress={() => router.push('/patient/dashboard')} className="flex-col items-center justify-center px-2">
          <Ionicons name="home" size={24} color="#747687" />
          <Text className="font-label-bold text-outline text-[10px] mt-1 font-bold">Home</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center px-2">
          <Ionicons name="chatbubble" size={24} color="#747687" />
          <Text className="font-label-bold text-outline text-[10px] mt-1 font-bold">AI Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center bg-secondary-container border-[1.5px] border-ink-black rounded-lg px-4 py-2">
          <Ionicons name="stats-chart" size={24} color="#1A1A1A" />
          <Text className="font-label-bold text-ink-black text-[10px] mt-1 font-bold">Tracker</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center px-2">
          <Ionicons name="person" size={24} color="#747687" />
          <Text className="font-label-bold text-outline text-[10px] mt-1 font-bold">Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
