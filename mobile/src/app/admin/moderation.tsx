import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ContentModerationScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-surface">
      {/* TopAppBar */}
      <View className="w-full sticky top-0 bg-surface border-b-[1.5px] border-ink-black flex-row justify-between items-center px-4 md:px-10 py-4 z-40">
        <View className="flex-row items-center gap-4">
          <TouchableOpacity onPress={() => router.back()} className="md:hidden p-2">
            <Ionicons name="menu" size={24} color="#1A1A1A" />
          </TouchableOpacity>
          <Text className="font-headline-sm text-primary font-bold text-xl md:text-2xl">Content Moderation Queue</Text>
        </View>
        <View className="flex-row items-center gap-4">
          <View className="hidden md:flex flex-row bg-surface-container rounded-xl border-[1.5px] border-ink-black px-3 py-2 items-center gap-2">
            <Ionicons name="search" size={20} color="#434655" />
            <TextInput 
              placeholder="Search flags..."
              className="bg-transparent border-none font-label-md text-ink-black w-48"
            />
          </View>
          <TouchableOpacity className="w-10 h-10 items-center justify-center hover:bg-surface-container-high rounded-full active:translate-x-[2px] active:translate-y-[2px]">
            <Ionicons name="notifications" size={24} color="#002da5" />
          </TouchableOpacity>
          <View className="w-10 h-10 rounded-full border-[1.5px] border-ink-black bg-accent-pink items-center justify-center overflow-hidden">
            <Ionicons name="person" size={24} color="#1b1b20" />
          </View>
        </View>
      </View>

      <ScrollView className="flex-1 p-4 md:p-10" contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Summary Stats (Mini Stickers) */}
        <View className="flex-row flex-wrap gap-6 mb-8">
          <View className="flex-[1] min-w-[150px] bg-surface-container-low border-[1.5px] border-ink-black p-6 rounded-[24px] shadow-[4px_4px_0px_0px_#1A1A1A]">
            <Text className="text-[10px] font-label-bold uppercase tracking-wider text-on-surface-variant font-bold">Pending Flags</Text>
            <Text className="font-headline-md text-ink-black font-bold text-3xl mt-1">124</Text>
          </View>
          <View className="flex-[1] min-w-[150px] bg-accent-sage border-[1.5px] border-ink-black p-6 rounded-[24px] shadow-[4px_4px_0px_0px_#1A1A1A]">
            <Text className="text-[10px] font-label-bold uppercase tracking-wider text-on-surface-variant font-bold">High Risk AI</Text>
            <Text className="font-headline-md text-primary font-bold text-3xl mt-1">12</Text>
          </View>
          <View className="flex-[1] min-w-[150px] bg-accent-pink border-[1.5px] border-ink-black p-6 rounded-[24px] shadow-[4px_4px_0px_0px_#1A1A1A]">
            <Text className="text-[10px] font-label-bold uppercase tracking-wider text-on-surface-variant font-bold">Reports (24h)</Text>
            <Text className="font-headline-md text-ink-black font-bold text-3xl mt-1">48</Text>
          </View>
          <View className="flex-[1] min-w-[150px] bg-secondary-container border-[1.5px] border-ink-black p-6 rounded-[24px] shadow-[4px_4px_0px_0px_#1A1A1A]">
            <Text className="text-[10px] font-label-bold uppercase tracking-wider text-on-surface-variant font-bold">Avg. Response</Text>
            <Text className="font-headline-md text-ink-black font-bold text-3xl mt-1">14m</Text>
          </View>
        </View>

        {/* Main Moderation Layout */}
        <View className="flex-col lg:flex-row gap-6">
          
          {/* Queue List */}
          <View className="flex-[2] flex-col gap-6">
            <View className="flex-row items-center justify-between">
              <Text className="font-headline-sm text-ink-black font-bold text-xl">Review Queue</Text>
              <View className="flex-row gap-2">
                <View className="bg-white border border-ink-black px-3 py-1 rounded-full">
                  <Text className="font-label-md text-ink-black">All Flags</Text>
                </View>
                <View className="bg-accent-orange/30 border border-ink-black px-3 py-1 rounded-full">
                  <Text className="font-label-md text-ink-black">High Priority</Text>
                </View>
              </View>
            </View>

            {/* Moderation Card 1 */}
            <View className="bg-surface-container-lowest border-[1.5px] border-ink-black rounded-[32px] overflow-hidden shadow-[4px_4px_0px_0px_#1A1A1A]">
              <View className="p-6 md:p-8 flex-col gap-6">
                <View className="flex-row items-center justify-between flex-wrap gap-2">
                  <View className="flex-row items-center gap-3">
                    <View className="w-8 h-8 rounded-full border border-ink-black bg-accent-orange items-center justify-center">
                      <Ionicons name="person" size={16} color="#1A1A1A" />
                    </View>
                    <View>
                      <Text className="font-label-bold text-ink-black font-bold">@alex_wellness</Text>
                      <Text className="text-[12px] text-on-surface-variant">Posted in Community Support • 22m ago</Text>
                    </View>
                  </View>
                  <View className="bg-error-container border border-error px-3 py-1 rounded-full flex-row items-center gap-1">
                    <Ionicons name="warning" size={14} color="#93000a" />
                    <Text className="font-label-bold text-on-error-container text-[12px] font-bold">HATE SPEECH AI FLAG</Text>
                  </View>
                </View>
                
                <View className="bg-surface-container p-4 rounded-xl border border-ink-black/10">
                  <Text className="font-body-md text-ink-black italic">"I don't think these types of people should be allowed in this safe space. They just don't belong here at all."</Text>
                </View>

                <View className="flex-row items-center gap-4 flex-wrap">
                  <TouchableOpacity className="bg-primary px-6 py-3 rounded-full border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
                    <Text className="text-white font-label-bold font-bold">APPROVE</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="bg-white px-6 py-3 rounded-full border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
                    <Text className="text-ink-black font-label-bold font-bold">REMOVE</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="flex-row items-center gap-1 ml-auto">
                    <Ionicons name="ellipsis-horizontal" size={20} color="#434655" />
                    <Text className="text-on-surface-variant font-label-md">DETAILS</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Moderation Card 2 */}
            <View className="bg-surface-container-lowest border-[1.5px] border-ink-black rounded-[32px] overflow-hidden shadow-[4px_4px_0px_0px_#1A1A1A]">
              <View className="p-6 md:p-8 flex-col gap-6">
                <View className="flex-row items-center justify-between flex-wrap gap-2">
                  <View className="flex-row items-center gap-3">
                    <View className="w-8 h-8 rounded-full border border-ink-black bg-secondary-container items-center justify-center">
                      <Text className="text-[12px] font-bold text-ink-black">JD</Text>
                    </View>
                    <View>
                      <Text className="font-label-bold text-ink-black font-bold">@john_doe_99</Text>
                      <Text className="text-[12px] text-on-surface-variant">Comment on Daily Motivation • 45m ago</Text>
                    </View>
                  </View>
                  <View className="bg-accent-sage border border-ink-black px-3 py-1 rounded-full flex-row items-center gap-1">
                    <Ionicons name="flag" size={14} color="#1A1A1A" />
                    <Text className="font-label-bold text-ink-black text-[12px] font-bold">USER REPORT: SPAM</Text>
                  </View>
                </View>
                
                <View className="bg-surface-container p-4 rounded-xl border border-ink-black/10">
                  <Text className="font-body-md text-ink-black">"Check out my profile for 50% off therapy sessions!!! Real results guaranteed. [LINK REDACTED]"</Text>
                </View>

                <View className="flex-row items-center gap-4 flex-wrap">
                  <TouchableOpacity className="bg-primary px-6 py-3 rounded-full border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
                    <Text className="text-white font-label-bold font-bold">APPROVE</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="bg-white px-6 py-3 rounded-full border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
                    <Text className="text-ink-black font-label-bold font-bold">REMOVE</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="flex-row items-center gap-1 ml-auto">
                    <Ionicons name="ellipsis-horizontal" size={20} color="#434655" />
                    <Text className="text-on-surface-variant font-label-md">DETAILS</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

          </View>

          {/* User History / Context Sidebar */}
          <View className="flex-[1] flex-col gap-6 mt-6 lg:mt-0">
            
            <View className="bg-accent-orange border-[1.5px] border-ink-black rounded-[32px] p-8 shadow-[4px_4px_0px_0px_#1A1A1A]">
              <View className="flex-col items-center text-center space-y-4 mb-4">
                <View className="w-24 h-24 rounded-full border-[2px] border-ink-black bg-white items-center justify-center overflow-hidden mb-2">
                  <Ionicons name="person" size={48} color="#1A1A1A" opacity={0.5} />
                </View>
                <Text className="font-headline-sm text-ink-black font-bold text-xl">@alex_wellness</Text>
                <Text className="font-label-md text-on-surface-variant text-sm">Member since Jan 2024</Text>
              </View>

              {/* Trust Score Meter */}
              <View className="w-full space-y-2 mb-4">
                <View className="flex-row justify-between mb-1">
                  <Text className="font-label-bold text-ink-black font-bold">Trust Score</Text>
                  <Text className="font-label-bold text-ink-black font-bold">34/100</Text>
                </View>
                <View className="w-full h-4 bg-white/50 border-[1.5px] border-ink-black rounded-full overflow-hidden flex-row">
                  <View className="bg-error h-full border-r-[1.5px] border-ink-black" style={{ width: '34%' }} />
                </View>
                <Text className="text-[11px] text-error font-label-bold font-bold mt-1">LOW TRUST: Multiple recent flags</Text>
              </View>

              <View className="w-full flex-row gap-4 mb-4">
                <View className="flex-[1] bg-white/40 border border-ink-black p-3 rounded-xl items-center">
                  <Text className="text-xs font-label-bold uppercase opacity-60 font-bold mb-1">Prev. Removes</Text>
                  <Text className="font-headline-sm text-ink-black font-bold text-xl">3</Text>
                </View>
                <View className="flex-[1] bg-white/40 border border-ink-black p-3 rounded-xl items-center">
                  <Text className="text-xs font-label-bold uppercase opacity-60 font-bold mb-1">Warnings</Text>
                  <Text className="font-headline-sm text-ink-black font-bold text-xl">1</Text>
                </View>
              </View>

              <View className="w-full mb-6">
                <Text className="font-label-bold text-ink-black font-bold mb-2">Recent Behavior Flags</Text>
                <View className="flex-row flex-wrap gap-2">
                  <View className="bg-white/60 border border-ink-black/20 px-2 py-1 rounded-md">
                    <Text className="text-[10px] font-label-bold uppercase font-bold text-ink-black">Harassment (2d ago)</Text>
                  </View>
                  <View className="bg-white/60 border border-ink-black/20 px-2 py-1 rounded-md">
                    <Text className="text-[10px] font-label-bold uppercase font-bold text-ink-black">Spam (1w ago)</Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity className="w-full bg-ink-black py-4 rounded-2xl shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex-row items-center justify-center gap-2">
                <Ionicons name="ban" size={20} color="#ffffff" />
                <Text className="text-white font-label-bold font-bold">SUSPEND ACCOUNT</Text>
              </TouchableOpacity>
            </View>

            {/* Risk AI Analysis Box */}
            <View className="bg-secondary-container border-[1.5px] border-ink-black rounded-[32px] p-8 shadow-[4px_4px_0px_0px_#1A1A1A]">
              <View className="flex-row items-center gap-2 mb-4">
                <Ionicons name="hardware-chip" size={24} color="#002da5" />
                <Text className="font-label-bold text-ink-black font-bold uppercase tracking-widest">Risk AI Analysis</Text>
              </View>
              <Text className="font-body-md text-ink-black leading-relaxed">
                Natural Language Processing indicates a <Text className="font-bold underline text-error">92% match</Text> for discriminatory language targeting community sub-groups.
              </Text>
              <View className="mt-4 pt-4 border-t border-ink-black/10">
                <Text className="text-xs italic opacity-80 text-on-secondary-container">"AI confidence is high. Automated removal recommended based on Community Rule 4.2."</Text>
              </View>
            </View>

          </View>

        </View>

      </ScrollView>
    </View>
  );
}
