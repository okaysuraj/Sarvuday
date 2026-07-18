import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function InvoiceHistoryScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-cream-bg">
      {/* TopAppBar */}
      <View className="flex-row justify-between items-center px-4 py-4 w-full z-50 bg-cream-bg border-b-[1.5px] border-ink-black sticky top-0">
        <View className="flex-row items-center gap-4">
          <TouchableOpacity onPress={() => router.back()} className="hover:bg-surface-variant/20 p-2 rounded-lg active:translate-x-[1px] active:translate-y-[1px]">
            <Ionicons name="arrow-back" size={24} color="#002da5" />
          </TouchableOpacity>
          <Text className="font-headline-md text-primary font-bold text-xl tracking-tight">SarvUday</Text>
        </View>
        <View className="flex-row items-center gap-4">
          <TouchableOpacity className="hover:bg-surface-variant/20 p-2 rounded-lg active:translate-x-[1px] active:translate-y-[1px]">
            <Ionicons name="person-circle" size={28} color="#434655" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1 px-4 md:px-10 py-6 max-w-5xl mx-auto w-full" contentContainerStyle={{ paddingBottom: 120 }}>
        
        {/* Header Section */}
        <View className="mb-12">
          <Text className="font-display-lg-mobile md:font-display-lg text-ink-black font-bold text-3xl mb-2">Invoice History</Text>
          <Text className="text-on-surface-variant font-body-lg text-lg">Keep track of your mental wellness journey transactions.</Text>
        </View>

        {/* Filter Chips */}
        <View className="flex-row flex-wrap gap-3 mb-6">
          <TouchableOpacity className="px-6 py-2 rounded-full border-[1.5px] border-ink-black bg-secondary-container shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
            <Text className="text-on-secondary-container font-label-bold font-bold">All Time</Text>
          </TouchableOpacity>
          <TouchableOpacity className="px-6 py-2 rounded-full border-[1.5px] border-ink-black bg-surface active:bg-surface-variant/20">
            <Text className="text-on-surface font-label-bold font-bold">Monthly</Text>
          </TouchableOpacity>
          <TouchableOpacity className="px-6 py-2 rounded-full border-[1.5px] border-ink-black bg-surface active:bg-surface-variant/20">
            <Text className="text-on-surface font-label-bold font-bold">Therapy</Text>
          </TouchableOpacity>
          <TouchableOpacity className="px-6 py-2 rounded-full border-[1.5px] border-ink-black bg-surface active:bg-surface-variant/20">
            <Text className="text-on-surface font-label-bold font-bold">Medication</Text>
          </TouchableOpacity>
        </View>

        {/* Invoice List */}
        <View className="flex-col gap-6">
          
          {/* Invoice Item 1 */}
          <View className="flex-col md:flex-row items-start md:items-center gap-6">
            <View className="flex-1 w-full">
              <View className="bg-surface-container-lowest border-[1.5px] border-ink-black rounded-[32px] p-6 shadow-[4px_4px_0px_0px_#1A1A1A]">
                <View className="flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <View className="flex-row items-center gap-4">
                    <View className="w-14 h-14 rounded-2xl bg-accent-sage border-[1.5px] border-ink-black items-center justify-center">
                      <Ionicons name="medical" size={28} color="#1b1b20" />
                    </View>
                    <View>
                      <Text className="font-label-bold text-primary uppercase tracking-widest font-bold">Oct 24, 2023</Text>
                      <Text className="font-headline-sm text-ink-black font-bold text-xl mt-1">Deep Session Therapy</Text>
                      <Text className="text-on-surface-variant mt-1">Inv #SRV-90122</Text>
                    </View>
                  </View>
                  
                  <View className="flex-row items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                    <View className="items-end">
                      <Text className="font-headline-sm text-ink-black font-bold text-xl">$120.00</Text>
                      <View className="px-3 py-1 rounded-full bg-secondary-container/30 border border-ink-black mt-1">
                        <Text className="text-[12px] font-bold">PAID</Text>
                      </View>
                    </View>
                    <TouchableOpacity className="w-12 h-12 rounded-xl bg-primary border-[1.5px] border-ink-black items-center justify-center shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
                      <Ionicons name="download" size={20} color="#ffffff" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Invoice Item 2 */}
          <View className="flex-col md:flex-row items-start md:items-center gap-6">
            <View className="flex-1 w-full">
              <View className="bg-surface-container-lowest border-[1.5px] border-ink-black rounded-[32px] p-6 shadow-[4px_4px_0px_0px_#1A1A1A]">
                <View className="flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <View className="flex-row items-center gap-4">
                    <View className="w-14 h-14 rounded-2xl bg-accent-pink border-[1.5px] border-ink-black items-center justify-center">
                      <Ionicons name="medkit" size={28} color="#1b1b20" />
                    </View>
                    <View>
                      <Text className="font-label-bold text-primary uppercase tracking-widest font-bold">Oct 12, 2023</Text>
                      <Text className="font-headline-sm text-ink-black font-bold text-xl mt-1">Monthly Prescription</Text>
                      <Text className="text-on-surface-variant mt-1">Inv #SRV-89210</Text>
                    </View>
                  </View>
                  
                  <View className="flex-row items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                    <View className="items-end">
                      <Text className="font-headline-sm text-ink-black font-bold text-xl">$45.50</Text>
                      <View className="px-3 py-1 rounded-full bg-secondary-container/30 border border-ink-black mt-1">
                        <Text className="text-[12px] font-bold">PAID</Text>
                      </View>
                    </View>
                    <TouchableOpacity className="w-12 h-12 rounded-xl bg-primary border-[1.5px] border-ink-black items-center justify-center shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
                      <Ionicons name="download" size={20} color="#ffffff" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Invoice Item 3 */}
          <View className="flex-col md:flex-row items-start md:items-center gap-6">
            <View className="flex-1 w-full">
              <View className="bg-accent-orange/10 border-[1.5px] border-ink-black rounded-[32px] p-6 shadow-[4px_4px_0px_0px_#1A1A1A]">
                <View className="flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <View className="flex-row items-center gap-4">
                    <View className="w-14 h-14 rounded-2xl bg-accent-orange border-[1.5px] border-ink-black items-center justify-center">
                      <Ionicons name="people" size={28} color="#1b1b20" />
                    </View>
                    <View>
                      <Text className="font-label-bold text-primary uppercase tracking-widest font-bold">Sep 28, 2023</Text>
                      <Text className="font-headline-sm text-ink-black font-bold text-xl mt-1">Group Workshop</Text>
                      <Text className="text-on-surface-variant mt-1">Inv #SRV-88112</Text>
                    </View>
                  </View>
                  
                  <View className="flex-row items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                    <View className="items-end">
                      <Text className="font-headline-sm text-ink-black font-bold text-xl">$30.00</Text>
                      <View className="px-3 py-1 rounded-full bg-secondary-container/30 border border-ink-black mt-1">
                        <Text className="text-[12px] font-bold">PAID</Text>
                      </View>
                    </View>
                    <TouchableOpacity className="w-12 h-12 rounded-xl bg-primary border-[1.5px] border-ink-black items-center justify-center shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
                      <Ionicons name="download" size={20} color="#ffffff" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Invoice Item 4 */}
          <View className="flex-col md:flex-row items-start md:items-center gap-6">
            <View className="flex-1 w-full">
              <View className="bg-surface-container-lowest border-[1.5px] border-ink-black rounded-[32px] p-6 shadow-[4px_4px_0px_0px_#1A1A1A]">
                <View className="flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <View className="flex-row items-center gap-4">
                    <View className="w-14 h-14 rounded-2xl bg-primary-fixed border-[1.5px] border-ink-black items-center justify-center">
                      <Ionicons name="hardware-chip" size={28} color="#1b1b20" />
                    </View>
                    <View>
                      <Text className="font-label-bold text-primary uppercase tracking-widest font-bold">Sep 15, 2023</Text>
                      <Text className="font-headline-sm text-ink-black font-bold text-xl mt-1">AI Mental Coach (Pro)</Text>
                      <Text className="text-on-surface-variant mt-1">Inv #SRV-87554</Text>
                    </View>
                  </View>
                  
                  <View className="flex-row items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                    <View className="items-end">
                      <Text className="font-headline-sm text-ink-black font-bold text-xl">$15.00</Text>
                      <View className="px-3 py-1 rounded-full bg-secondary-container/30 border border-ink-black mt-1">
                        <Text className="text-[12px] font-bold">PAID</Text>
                      </View>
                    </View>
                    <TouchableOpacity className="w-12 h-12 rounded-xl bg-primary border-[1.5px] border-ink-black items-center justify-center shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
                      <Ionicons name="download" size={20} color="#ffffff" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>

        </View>

        {/* Summary Bento Card */}
        <View className="mt-12 flex-col md:flex-row gap-6">
          <View className="flex-[2] bg-secondary-container border-[1.5px] border-ink-black rounded-[32px] p-8 shadow-[4px_4px_0px_0px_#1A1A1A] flex-col justify-between">
            <View>
              <Text className="font-headline-sm text-ink-black font-bold text-2xl mb-2">Billing Support</Text>
              <Text className="text-on-secondary-container opacity-80 text-base">
                Having issues with a transaction? Our support team is here to help 24/7 with any billing inquiries.
              </Text>
            </View>
            <TouchableOpacity className="mt-6 px-8 py-4 bg-ink-black rounded-xl items-center self-start">
              <Text className="text-white font-label-bold font-bold">Get Help</Text>
            </TouchableOpacity>
          </View>
          
          <View className="flex-1 bg-accent-sage border-[1.5px] border-ink-black rounded-[32px] p-8 shadow-[4px_4px_0px_0px_#1A1A1A] flex-col items-center justify-center text-center">
            <Text className="font-label-bold text-primary uppercase font-bold tracking-wider mb-2">Total Invested</Text>
            <Text className="text-[40px] font-bold leading-tight text-ink-black">$210.50</Text>
            <Text className="text-on-surface-variant text-sm mt-2">Past 30 days</Text>
          </View>
        </View>

      </ScrollView>

      {/* BottomNavBar */}
      <View className="absolute bottom-0 w-full z-50 bg-surface border-t-[1.5px] border-ink-black">
        <View className="flex-row justify-around items-center w-full h-[80px] px-4 pb-4">
          <TouchableOpacity onPress={() => router.push('/patient/dashboard')} className="flex-col items-center justify-center p-2">
            <Ionicons name="home" size={24} color="#434655" />
            <Text className="font-label-md text-on-surface-variant mt-1">Home</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-col items-center justify-center p-2">
            <Ionicons name="hardware-chip" size={24} color="#434655" />
            <Text className="font-label-md text-on-surface-variant mt-1">AI Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-col items-center justify-center p-2">
            <Ionicons name="calendar" size={24} color="#434655" />
            <Text className="font-label-md text-on-surface-variant mt-1">Book</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-col items-center justify-center bg-secondary-container border-[1.5px] border-ink-black rounded-xl px-4 py-1">
            <Ionicons name="person" size={24} color="#715b00" />
            <Text className="font-label-md text-on-secondary-container font-bold mt-1">Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
