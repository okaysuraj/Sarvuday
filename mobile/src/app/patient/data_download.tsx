import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function DataDownloadScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-cream-bg">
      {/* TopAppBar */}
      <View className="flex-row justify-between items-center px-4 py-4 w-full z-50 bg-cream-bg border-b-[1.5px] border-ink-black sticky top-0">
        <View className="flex-row items-center gap-4">
          <TouchableOpacity onPress={() => router.back()} className="active:translate-x-[2px] active:translate-y-[2px]">
            <Ionicons name="arrow-back" size={24} color="#002da5" />
          </TouchableOpacity>
          <Text className="font-headline-md text-primary font-bold text-xl tracking-tight">SarvUday</Text>
        </View>
        <View className="w-10 h-10 rounded-full border-[1.5px] border-ink-black bg-secondary-container items-center justify-center overflow-hidden">
          <Ionicons name="person" size={24} color="#1b1b20" />
        </View>
      </View>

      <ScrollView className="flex-1 px-4 md:px-10 py-8 max-w-4xl mx-auto w-full" contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Header Section */}
        <View className="mb-10">
          <Text className="font-display-lg-mobile md:font-display-lg font-bold text-ink-black text-3xl mb-4">Your Data</Text>
          <Text className="font-body-lg text-on-surface-variant text-lg max-w-2xl">
            Maintain complete control over your health journey. Export your entire history, activity logs, and insights into a portable format.
          </Text>
        </View>

        {/* Request Export Action Card */}
        <View className="mb-12">
          <View className="bg-accent-sage border-[1.5px] border-ink-black rounded-[32px] p-8 md:p-10 flex-col md:flex-row items-center gap-8 shadow-[4px_4px_0px_0px_#1A1A1A]">
            <View className="flex-1">
              <Text className="font-headline-sm text-ink-black font-bold text-2xl mb-2">Request Data Export</Text>
              <Text className="font-body-md text-on-surface-variant text-base">
                We'll compile your personal data into a secure .ZIP archive. This process usually takes less than 5 minutes.
              </Text>
            </View>
            <TouchableOpacity className="w-full md:w-auto px-8 py-4 bg-primary rounded-xl border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex-row items-center justify-center gap-2">
              <Ionicons name="share-outline" size={24} color="#ffffff" />
              <Text className="text-white font-label-bold font-bold">GENERATE EXPORT</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Previous Exports List */}
        <View className="mb-12">
          <View className="flex-row items-center gap-2 mb-6">
            <Ionicons name="time-outline" size={24} color="#002da5" />
            <Text className="font-headline-sm text-ink-black font-bold text-2xl">Previous Exports</Text>
          </View>
          
          <View className="flex-col gap-4">
            
            {/* Export Item 1 */}
            <View className="bg-white border-[1.5px] border-ink-black rounded-[24px] p-6 flex-col md:flex-row md:items-center justify-between">
              <View className="flex-row items-center gap-4 mb-4 md:mb-0">
                <View className="w-12 h-12 bg-accent-pink rounded-xl border-[1.5px] border-ink-black items-center justify-center">
                  <Ionicons name="document-text" size={24} color="#5a3039" />
                </View>
                <View>
                  <Text className="font-label-bold text-ink-black font-bold">SARV_EXPORT_2023_10_24.zip</Text>
                  <Text className="text-on-surface-variant text-sm">Generated Oct 24, 2023 • 12.4 MB</Text>
                </View>
              </View>
              <View className="flex-row gap-3">
                <TouchableOpacity className="flex-1 md:flex-none px-4 py-2 border-[1.5px] border-ink-black rounded-lg items-center justify-center">
                  <Text className="font-label-bold text-ink-black font-bold">DELETE</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-1 md:flex-none px-6 py-2 bg-secondary-container border-[1.5px] border-ink-black rounded-lg shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex-row items-center justify-center gap-2">
                  <Ionicons name="download-outline" size={16} color="#715b00" />
                  <Text className="text-on-secondary-container font-label-bold font-bold">DOWNLOAD</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Export Item 2 */}
            <View className="bg-white border-[1.5px] border-ink-black rounded-[24px] p-6 flex-col md:flex-row md:items-center justify-between">
              <View className="flex-row items-center gap-4 mb-4 md:mb-0">
                <View className="w-12 h-12 bg-secondary-fixed rounded-xl border-[1.5px] border-ink-black items-center justify-center">
                  <Ionicons name="document-text" size={24} color="#725c00" />
                </View>
                <View>
                  <Text className="font-label-bold text-ink-black font-bold">SARV_EXPORT_2023_08_12.zip</Text>
                  <Text className="text-on-surface-variant text-sm">Generated Aug 12, 2023 • 10.1 MB</Text>
                </View>
              </View>
              <View className="flex-row gap-3">
                <TouchableOpacity className="flex-1 md:flex-none px-4 py-2 border-[1.5px] border-ink-black rounded-lg items-center justify-center">
                  <Text className="font-label-bold text-ink-black font-bold">DELETE</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-1 md:flex-none px-6 py-2 bg-secondary-container border-[1.5px] border-ink-black rounded-lg shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex-row items-center justify-center gap-2">
                  <Ionicons name="download-outline" size={16} color="#715b00" />
                  <Text className="text-on-secondary-container font-label-bold font-bold">DOWNLOAD</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Export Item 3 - Expired */}
            <View className="bg-surface-container border-[1.5px] border-ink-black border-dashed rounded-[24px] p-6 flex-col md:flex-row md:items-center justify-between opacity-60">
              <View className="flex-row items-center gap-4 mb-4 md:mb-0">
                <View className="w-12 h-12 bg-outline-variant rounded-xl border-[1.5px] border-ink-black items-center justify-center">
                  <Ionicons name="timer-outline" size={24} color="#434655" />
                </View>
                <View>
                  <Text className="font-label-bold text-ink-black font-bold">SARV_EXPORT_2023_05_01.zip</Text>
                  <Text className="text-on-surface-variant text-sm">Expired May 31, 2023</Text>
                </View>
              </View>
              <View className="px-4 py-2 border-[1.5px] border-ink-black rounded-lg items-center justify-center opacity-50">
                <Text className="font-label-bold text-ink-black font-bold">EXPIRED</Text>
              </View>
            </View>

          </View>
        </View>

        {/* Information Cards */}
        <View className="flex-col md:flex-row gap-6">
          <View className="flex-1 bg-accent-orange border-[1.5px] border-ink-black rounded-[32px] p-8 shadow-[4px_4px_0px_0px_#1A1A1A]">
            <Ionicons name="shield-checkmark" size={36} color="#1A1A1A" className="mb-4" />
            <Text className="font-headline-sm text-ink-black font-bold text-2xl mb-2 mt-4">Privacy & Security</Text>
            <Text className="font-body-md text-on-surface-variant">
              All exports are encrypted. We never share your data with third parties without your explicit consent. Your data remains yours.
            </Text>
          </View>
          
          <View className="flex-1 bg-primary-fixed border-[1.5px] border-ink-black rounded-[32px] p-8 shadow-[4px_4px_0px_0px_#1A1A1A]">
            <Ionicons name="color-wand" size={36} color="#1A1A1A" className="mb-4" />
            <Text className="font-headline-sm text-ink-black font-bold text-2xl mb-2 mt-4">Data Portability</Text>
            <Text className="font-body-md text-on-surface-variant">
              Our exports use standard JSON and CSV formats, making it easy to import your health history into other wellness platforms.
            </Text>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}
