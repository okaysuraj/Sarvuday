import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function TherapistVerificationScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  return (
    <View className="flex-1 bg-cream-bg">
      {/* Header */}
      <View className="w-full top-0 bg-cream-bg border-b-[1.5px] border-ink-black flex-row justify-between items-center px-6 py-4 z-50">
        <View className="flex-row items-center gap-4">
          <Ionicons name="shield-checkmark" size={32} color="#002da5" />
          <Text className="font-headline-md font-bold text-primary text-xl">MindGuard Admin</Text>
        </View>
        <View className="flex-row items-center gap-4">
          <TouchableOpacity className="p-2 rounded-full active:bg-surface-container">
            <Ionicons name="notifications" size={24} color="#002da5" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1 px-4 py-8" contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Back and Title */}
        <View className="flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <View>
            <TouchableOpacity onPress={() => router.back()} className="flex-row items-center gap-2 mb-2">
              <Ionicons name="arrow-back" size={20} color="#002da5" />
              <Text className="text-primary font-label-bold font-bold">Back to Applications</Text>
            </TouchableOpacity>
            <Text className="font-headline-md text-ink-black font-bold text-3xl">Verification: Dr. Sarah Jenkins</Text>
            <View className="flex-row gap-2 mt-2">
              <View className="px-3 py-1 bg-accent-pink border-[1.5px] border-ink-black rounded-full">
                <Text className="text-xs font-label-bold font-bold uppercase">Clinical Psychologist</Text>
              </View>
              <View className="px-3 py-1 bg-accent-sage border-[1.5px] border-ink-black rounded-full">
                <Text className="text-xs font-label-bold font-bold uppercase">Pending Review</Text>
              </View>
            </View>
          </View>
          
          <View className="flex-row gap-4 mt-4">
            <TouchableOpacity className="flex-row items-center justify-center gap-2 px-6 py-3 bg-[#ba1a1a] border-[1.5px] border-ink-black rounded-xl shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex-1">
              <Ionicons name="close-circle" size={20} color="#ffffff" />
              <Text className="text-white font-label-bold font-bold">Reject</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center justify-center gap-2 px-6 py-3 bg-[#003fdd] border-[1.5px] border-ink-black rounded-xl shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex-1">
              <Ionicons name="checkmark-circle" size={20} color="#ffffff" />
              <Text className="text-white font-label-bold font-bold">Approve</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Top Cards Grid */}
        <View className="flex-col md:flex-row gap-6 mb-6">
          {/* Profile Card */}
          <View className="flex-1 bg-white p-6 rounded-[32px] border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A]">
            <View className="w-24 h-24 mx-auto mb-6 rounded-[24px] border-[1.5px] border-ink-black bg-accent-orange items-center justify-center">
              <Ionicons name="person" size={48} color="#1A1A1A" />
            </View>
            <Text className="text-center font-headline-sm text-ink-black font-bold text-2xl mb-1">Dr. Sarah Jenkins</Text>
            <Text className="text-center text-on-surface-variant font-label-md mb-6">s.jenkins@example.com</Text>
            
            <View className="flex-col gap-4">
              <View className="p-4 bg-surface-container rounded-xl border-[1.5px] border-ink-black">
                <Text className="text-xs font-label-bold text-on-surface-variant uppercase mb-1 font-bold">Phone</Text>
                <Text className="font-body-md text-ink-black">+1 (555) 012-3456</Text>
              </View>
              <View className="p-4 bg-surface-container rounded-xl border-[1.5px] border-ink-black">
                <Text className="text-xs font-label-bold text-on-surface-variant uppercase mb-1 font-bold">Location</Text>
                <Text className="font-body-md text-ink-black">Portland, OR</Text>
              </View>
              <View className="p-4 bg-surface-container rounded-xl border-[1.5px] border-ink-black">
                <Text className="text-xs font-label-bold text-on-surface-variant uppercase mb-1 font-bold">NPI Number</Text>
                <Text className="font-body-md text-ink-black">1234567890</Text>
              </View>
            </View>
          </View>

          {/* Timeline */}
          <View className="flex-1 bg-accent-sage p-6 rounded-[32px] border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A]">
            <Text className="font-label-bold text-ink-black mb-4 uppercase font-bold">Verification Progress</Text>
            
            <View className="relative flex-col gap-6">
              <View className="absolute left-4 top-2 bottom-2 w-[1.5px] bg-ink-black/20 z-0" />
              
              <View className="flex-row gap-4 relative z-10">
                <View className="w-8 h-8 rounded-full bg-[#003fdd] border-[1.5px] border-ink-black items-center justify-center">
                  <Ionicons name="checkmark" size={16} color="#ffffff" />
                </View>
                <View>
                  <Text className="font-label-bold font-bold text-ink-black">Application Submitted</Text>
                  <Text className="text-xs text-ink-black/70 mt-1">Oct 24, 2023</Text>
                </View>
              </View>
              
              <View className="flex-row gap-4 relative z-10">
                <View className="w-8 h-8 rounded-full bg-[#003fdd] border-[1.5px] border-ink-black items-center justify-center">
                  <Ionicons name="checkmark" size={16} color="#ffffff" />
                </View>
                <View>
                  <Text className="font-label-bold font-bold text-ink-black">Background Check Pass</Text>
                  <Text className="text-xs text-ink-black/70 mt-1">Oct 26, 2023</Text>
                </View>
              </View>

              <View className="flex-row gap-4 relative z-10">
                <View className="w-8 h-8 rounded-full bg-white border-[1.5px] border-ink-black items-center justify-center">
                  <View className="w-2 h-2 bg-ink-black rounded-full" />
                </View>
                <View>
                  <Text className="font-label-bold font-bold text-ink-black">Admin Manual Review</Text>
                  <Text className="text-xs text-ink-black/70 mt-1">Current Step</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Documents */}
        <View className="bg-white p-6 rounded-[32px] border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] mb-6">
          <View className="flex-row items-center justify-between mb-6">
            <Text className="font-headline-sm text-ink-black font-bold text-2xl">Submitted Documents</Text>
            <Text className="text-on-surface-variant font-label-md">3 Files Attached</Text>
          </View>
          
          <View className="flex-col gap-4">
            <View className="flex-row items-center justify-between p-4 bg-surface-container border-[1.5px] border-ink-black rounded-2xl">
              <View className="flex-row items-center gap-4">
                <View className="w-12 h-12 rounded-xl bg-ink-black items-center justify-center">
                  <Ionicons name="document-text" size={24} color="#ffffff" />
                </View>
                <View>
                  <Text className="font-label-bold font-bold text-ink-black">Medical_License.pdf</Text>
                  <Text className="text-xs text-ink-black/60 mt-1">2.4 MB • Uploaded Oct 24</Text>
                </View>
              </View>
              <TouchableOpacity className="p-2 bg-white border-[1.5px] border-ink-black rounded-lg shadow-[2px_2px_0px_0px_#1A1A1A]">
                <Ionicons name="eye" size={20} color="#1A1A1A" />
              </TouchableOpacity>
            </View>

            <View className="flex-row items-center justify-between p-4 bg-surface-container border-[1.5px] border-ink-black rounded-2xl">
              <View className="flex-row items-center gap-4">
                <View className="w-12 h-12 rounded-xl bg-ink-black items-center justify-center">
                  <Ionicons name="shield-checkmark" size={24} color="#ffffff" />
                </View>
                <View>
                  <Text className="font-label-bold font-bold text-ink-black">Background_Check.pdf</Text>
                  <Text className="text-xs text-ink-black/60 mt-1">1.1 MB • Uploaded Oct 24</Text>
                </View>
              </View>
              <TouchableOpacity className="p-2 bg-white border-[1.5px] border-ink-black rounded-lg shadow-[2px_2px_0px_0px_#1A1A1A]">
                <Ionicons name="eye" size={20} color="#1A1A1A" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Reviewer Notes */}
        <View className="bg-surface-container-high p-6 rounded-[32px] border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A]">
          <Text className="font-label-bold text-ink-black mb-4 uppercase font-bold">Verification Notes</Text>
          <TextInput
            multiline
            textAlignVertical="top"
            className="w-full min-h-[120px] bg-white border-[1.5px] border-ink-black rounded-xl p-4 font-body-md text-ink-black focus:shadow-[4px_4px_0px_0px_#1A1A1A]"
            placeholder="Add internal notes about this application..."
            placeholderTextColor="#747687"
          />
        </View>

      </ScrollView>
    </View>
  );
}
