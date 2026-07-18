import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function EarningsDashboardScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-cream-bg">
      {/* Top Navigation */}
      <View className="flex-row justify-between items-center px-4 py-4 w-full z-50 bg-cream-bg border-b-[1.5px] border-ink-black sticky top-0">
        <View className="flex-row items-center gap-4">
          <View className="w-10 h-10 rounded-full border-[1.5px] border-ink-black overflow-hidden bg-accent-sage items-center justify-center">
            <Ionicons name="person" size={24} color="#1b1b20" />
          </View>
          <Text className="font-headline-sm text-ink-black font-bold text-xl">Good Morning</Text>
        </View>
        <TouchableOpacity className="p-2">
          <Ionicons name="notifications-outline" size={24} color="#434655" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 md:px-10 py-8 max-w-7xl mx-auto w-full" contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Hero Section: Total Earnings & Balance */}
        <View className="flex-col md:flex-row gap-6 mb-8">
          <View className="flex-1 bg-primary rounded-[32px] border-[1.5px] border-ink-black p-8 shadow-[4px_4px_0px_0px_#1A1A1A] flex-col justify-between overflow-hidden relative">
            <View className="z-10">
              <Text className="font-label-bold text-white opacity-80 uppercase tracking-wider font-bold">Total Earnings</Text>
              <Text className="font-display-lg-mobile text-white font-bold text-4xl mt-2">$24,850.00</Text>
            </View>
            <View className="mt-8 z-10 flex-row items-center gap-2">
              <Ionicons name="trending-up" size={20} color="#d9d9e6" />
              <Text className="font-label-md text-accent-sage">+12.5% from last month</Text>
            </View>
            {/* Abstract Shapes */}
            <View className="absolute -right-8 -top-8 w-32 h-32 bg-primary-container rounded-full opacity-20" />
            <View className="absolute right-12 bottom-4 w-12 h-12 border-2 border-white rotate-12 opacity-20" />
          </View>

          <View className="flex-1 bg-surface rounded-[32px] border-[1.5px] border-ink-black p-8 flex-col justify-between">
            <View>
              <Text className="font-label-bold text-on-surface-variant uppercase tracking-wider font-bold">Available Balance</Text>
              <View className="flex-col sm:flex-row sm:items-center justify-between mt-2 gap-4">
                <Text className="font-headline-md text-ink-black font-bold text-3xl">$4,320.50</Text>
                <TouchableOpacity className="bg-secondary-container border-[1.5px] border-ink-black px-6 py-3 rounded-xl shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex-row items-center justify-center gap-2">
                  <Ionicons name="wallet" size={20} color="#715b00" />
                  <Text className="text-on-secondary-container font-label-bold font-bold">Withdraw Funds</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View className="mt-6 pt-6 border-t border-ink-black/10 flex-row gap-4">
              <View className="flex-1">
                <Text className="font-label-bold text-outline uppercase text-xs">Next Payout</Text>
                <Text className="font-body-md text-ink-black font-bold">Oct 15, 2023</Text>
              </View>
              <View className="flex-1">
                <Text className="font-label-bold text-outline uppercase text-xs">Linked Account</Text>
                <Text className="font-body-md text-ink-black font-bold">Chase •••• 4291</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Revenue Graph & Analytics */}
        <View className="flex-col lg:flex-row gap-6 mb-8">
          
          {/* Monthly Revenue Chart */}
          <View className="flex-[2] bg-white rounded-[32px] border-[1.5px] border-ink-black p-8">
            <View className="flex-row items-center justify-between mb-8">
              <Text className="font-headline-sm text-ink-black font-bold text-xl">Monthly Revenue</Text>
              <View className="bg-surface-container border-[1.5px] border-ink-black rounded-lg px-3 py-1">
                <Text className="font-label-md text-ink-black">Last 6 Months</Text>
              </View>
            </View>
            
            <View className="h-64 w-full flex-row items-end justify-between gap-2 pt-8 relative">
              {/* Bars */}
              <View className="flex-1 flex-col items-center justify-end h-full gap-2">
                <View className="w-full bg-accent-pink border-[1.5px] border-ink-black rounded-t-lg" style={{ height: '40%' }} />
                <Text className="font-label-md text-[10px] text-outline uppercase">May</Text>
              </View>
              <View className="flex-1 flex-col items-center justify-end h-full gap-2">
                <View className="w-full bg-accent-sage border-[1.5px] border-ink-black rounded-t-lg" style={{ height: '60%' }} />
                <Text className="font-label-md text-[10px] text-outline uppercase">Jun</Text>
              </View>
              <View className="flex-1 flex-col items-center justify-end h-full gap-2">
                <View className="w-full bg-accent-orange border-[1.5px] border-ink-black rounded-t-lg" style={{ height: '55%' }} />
                <Text className="font-label-md text-[10px] text-outline uppercase">Jul</Text>
              </View>
              <View className="flex-1 flex-col items-center justify-end h-full gap-2">
                <View className="w-full bg-secondary-container border-[1.5px] border-ink-black rounded-t-lg" style={{ height: '85%' }} />
                <Text className="font-label-md text-[10px] text-outline uppercase">Aug</Text>
              </View>
              <View className="flex-1 flex-col items-center justify-end h-full gap-2">
                <View className="w-full bg-primary-container border-[1.5px] border-ink-black rounded-t-lg" style={{ height: '70%' }} />
                <Text className="font-label-md text-[10px] text-outline uppercase">Sep</Text>
              </View>
              <View className="flex-1 flex-col items-center justify-end h-full gap-2">
                <View className="w-full bg-primary border-[1.5px] border-ink-black rounded-t-lg" style={{ height: '95%' }} />
                <Text className="font-label-md text-[10px] text-outline uppercase">Oct</Text>
              </View>
            </View>
          </View>

          {/* Recent Payouts List */}
          <View className="flex-1 bg-white rounded-[32px] border-[1.5px] border-ink-black p-8">
            <Text className="font-headline-sm text-ink-black font-bold text-xl mb-6">Recent Payouts</Text>
            <View className="flex-col gap-4">
              
              <View className="flex-row items-center justify-between p-4 bg-surface rounded-2xl border-[1.5px] border-ink-black/10">
                <View className="flex-row items-center gap-3">
                  <View className="w-10 h-10 rounded-full bg-accent-sage/30 items-center justify-center">
                    <Ionicons name="checkmark-circle" size={24} color="#1b1b20" />
                  </View>
                  <View>
                    <Text className="font-label-bold text-ink-black font-bold">Oct 01, 2023</Text>
                    <Text className="text-xs text-outline">Direct Deposit</Text>
                  </View>
                </View>
                <View className="items-end">
                  <Text className="font-label-bold text-ink-black font-bold mb-1">$1,240.00</Text>
                  <View className="px-2 py-0.5 rounded-full bg-accent-sage">
                    <Text className="text-[10px] font-label-bold text-on-surface-variant uppercase font-bold">Processed</Text>
                  </View>
                </View>
              </View>

              <View className="flex-row items-center justify-between p-4 bg-surface rounded-2xl border-[1.5px] border-ink-black/10">
                <View className="flex-row items-center gap-3">
                  <View className="w-10 h-10 rounded-full bg-secondary-container/30 items-center justify-center">
                    <Ionicons name="time" size={24} color="#1b1b20" />
                  </View>
                  <View>
                    <Text className="font-label-bold text-ink-black font-bold">Sep 15, 2023</Text>
                    <Text className="text-xs text-outline">Direct Deposit</Text>
                  </View>
                </View>
                <View className="items-end">
                  <Text className="font-label-bold text-ink-black font-bold mb-1">$980.50</Text>
                  <View className="px-2 py-0.5 rounded-full bg-accent-orange">
                    <Text className="text-[10px] font-label-bold text-on-surface-variant uppercase font-bold">Pending</Text>
                  </View>
                </View>
              </View>

              <View className="flex-row items-center justify-between p-4 bg-surface rounded-2xl border-[1.5px] border-ink-black/10">
                <View className="flex-row items-center gap-3">
                  <View className="w-10 h-10 rounded-full bg-accent-sage/30 items-center justify-center">
                    <Ionicons name="checkmark-circle" size={24} color="#1b1b20" />
                  </View>
                  <View>
                    <Text className="font-label-bold text-ink-black font-bold">Sep 01, 2023</Text>
                    <Text className="text-xs text-outline">Direct Deposit</Text>
                  </View>
                </View>
                <View className="items-end">
                  <Text className="font-label-bold text-ink-black font-bold mb-1">$2,100.00</Text>
                  <View className="px-2 py-0.5 rounded-full bg-accent-sage">
                    <Text className="text-[10px] font-label-bold text-on-surface-variant uppercase font-bold">Processed</Text>
                  </View>
                </View>
              </View>

            </View>
            <TouchableOpacity className="w-full mt-6 py-3 items-center justify-center">
              <Text className="text-primary font-label-bold font-bold underline">View All History</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Insights Bento Section */}
        <View className="flex-col md:flex-row gap-6 mb-8">
          <View className="flex-[0.5] rounded-[32px] border-[1.5px] border-ink-black bg-accent-pink p-6 flex-col items-center justify-center text-center">
            <Ionicons name="person-add" size={32} color="#1A1A1A" className="mb-2" />
            <Text className="font-headline-sm text-ink-black font-bold text-2xl">24</Text>
            <Text className="font-label-md text-ink-black opacity-70">New Patients</Text>
          </View>
          <View className="flex-[0.5] rounded-[32px] border-[1.5px] border-ink-black bg-accent-orange p-6 flex-col items-center justify-center text-center">
            <Ionicons name="calendar" size={32} color="#1A1A1A" className="mb-2" />
            <Text className="font-headline-sm text-ink-black font-bold text-2xl">112</Text>
            <Text className="font-label-md text-ink-black opacity-70">Sessions Done</Text>
          </View>
          <View className="flex-1 rounded-[32px] border-[1.5px] border-ink-black bg-ink-black p-8 flex-row items-center gap-6">
            <View className="flex-1">
              <Text className="font-headline-sm text-primary-fixed-dim font-bold text-xl mb-1">Earnings Tip</Text>
              <Text className="text-sm text-white opacity-80">You have 5 unbilled sessions from last week. Completing notes will unlock $450 in pending funds.</Text>
            </View>
            <TouchableOpacity className="bg-primary-container border-[1.5px] border-ink-black p-3 rounded-full shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
              <Ionicons name="arrow-forward" size={24} color="#bbc5ff" />
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>

      {/* Mobile Bottom Navigation Shell */}
      <View className="absolute bottom-0 left-0 w-full z-50 flex-row justify-around items-center px-4 py-3 pb-safe bg-surface border-t-[1.5px] border-ink-black md:hidden">
        <TouchableOpacity onPress={() => router.push('/therapist/dashboard')} className="flex-col items-center justify-center px-4 py-1">
          <Ionicons name="grid" size={24} color="#434655" />
          <Text className="font-label-md text-on-surface-variant mt-1">Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center px-4 py-1">
          <Ionicons name="people" size={24} color="#434655" />
          <Text className="font-label-md text-on-surface-variant mt-1">Patients</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center px-4 py-1">
          <Ionicons name="calendar" size={24} color="#434655" />
          <Text className="font-label-md text-on-surface-variant mt-1">Schedule</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center bg-secondary-container rounded-xl px-4 py-1 border-[1.5px] border-ink-black">
          <Ionicons name="cash" size={24} color="#715b00" />
          <Text className="font-label-md text-on-secondary-container font-bold mt-1">Earnings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
