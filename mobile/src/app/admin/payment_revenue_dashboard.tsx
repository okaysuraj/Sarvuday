import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PaymentRevenueDashboardScreen() {
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = await AsyncStorage.getItem('access_token');
        const res = await fetch('http://10.0.2.2:8000/admin/dashboard', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const json = await res.json();
          setDashboardData(json);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const totalRevenue = dashboardData?.total_revenue || 0;
  const activeUsers = dashboardData?.total_active_users || 1;
  const arpu = totalRevenue / activeUsers;

  if (loading) {
    return (
      <View className="flex-1 bg-cream-bg items-center justify-center">
        <ActivityIndicator size="large" color="#002da5" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-cream-bg flex-col md:flex-row">
      {/* Mobile TopAppBar */}
      <View className="md:hidden flex-row justify-between items-center px-4 py-4 w-full z-50 bg-surface border-b-[1.5px] border-ink-black sticky top-0">
        <View className="flex-row items-center gap-4">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <Ionicons name="arrow-back" size={24} color="#002da5" />
          </TouchableOpacity>
          <Text className="font-headline-md text-primary font-bold text-xl">MindGuard Admin</Text>
        </View>
        <TouchableOpacity className="bg-primary p-2 rounded-full border-[1.5px] border-ink-black">
          <Ionicons name="notifications" size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {/* NavigationDrawer (Desktop) */}
      <View className="hidden md:flex flex-col gap-4 p-4 h-full w-72 bg-surface-container-low border-r-[1.5px] border-ink-black">
        <View className="mb-6 px-2 mt-4">
          <Text className="font-headline-sm text-ink-black font-bold text-xl">Admin Console</Text>
          <Text className="font-label-md text-on-surface-variant text-sm mt-1">Mental Health Platform • v2.4.0</Text>
        </View>
        <ScrollView className="flex-col gap-2">
          <TouchableOpacity className="flex-row items-center gap-3 px-4 py-3 rounded-lg m-2">
            <Ionicons name="grid" size={24} color="#434655" />
            <Text className="font-label-md text-on-surface-variant">Dashboard</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center gap-3 px-4 py-3 rounded-lg m-2">
            <Ionicons name="people" size={24} color="#434655" />
            <Text className="font-label-md text-on-surface-variant">Therapists</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center gap-3 px-4 py-3 rounded-lg bg-primary-container border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] m-2">
            <Ionicons name="cash" size={24} color="#001356" />
            <Text className="font-label-bold text-on-primary-container font-bold">Payments</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center gap-3 px-4 py-3 rounded-lg m-2">
            <Ionicons name="settings" size={24} color="#434655" />
            <Text className="font-label-md text-on-surface-variant">Settings</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Main Content Area */}
      <ScrollView className="flex-1 p-4 md:p-10 bg-cream-bg" contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Header Section */}
        <View className="mb-12 flex-col md:flex-row md:items-end justify-between gap-6">
          <View>
            <View className="self-start px-3 py-1 bg-accent-sage border-[1.5px] border-ink-black rounded-full mb-2">
              <Text className="font-label-bold text-ink-black uppercase text-[10px] tracking-widest font-bold">Financial Overview</Text>
            </View>
            <Text className="font-display-lg-mobile md:font-display-lg text-ink-black font-bold text-3xl md:text-5xl">Revenue Dashboard</Text>
          </View>
          <View className="flex-row gap-4">
            <TouchableOpacity className="flex-1 md:flex-none bg-surface-container-lowest border-[1.5px] border-ink-black px-6 py-3 rounded-xl shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex-row items-center justify-center gap-2">
              <Ionicons name="download-outline" size={20} color="#1A1A1A" />
              <Text className="font-label-bold text-ink-black font-bold">Export CSV</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 md:flex-none bg-primary border-[1.5px] border-ink-black px-6 py-3 rounded-xl shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex-row items-center justify-center gap-2">
              <Ionicons name="calendar-outline" size={20} color="#ffffff" />
              <Text className="font-label-bold text-white font-bold">Last 30 Days</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bento Grid - Key Metrics */}
        <View className="flex-col md:flex-row flex-wrap gap-6 mb-12">
          
          {/* MRR Card */}
          <View className="flex-1 min-w-[200px] bg-surface-container-lowest border-[1.5px] border-ink-black p-6 rounded-[32px] flex-col justify-between h-48 shadow-[2px_2px_0px_0px_#1A1A1A]">
            <View className="flex-row justify-between items-start">
              <Text className="font-label-bold text-on-surface-variant font-bold">Monthly Recurring Revenue</Text>
              <View className="bg-primary-fixed p-2 rounded-lg border-[1.5px] border-ink-black">
                <Ionicons name="trending-up" size={20} color="#002da5" />
              </View>
            </View>
            <View>
              <Text className="font-headline-md text-ink-black font-bold text-3xl">${totalRevenue.toFixed(2)}</Text>
              <Text className="font-label-md text-primary font-bold mt-1">+12.5% vs last month</Text>
            </View>
          </View>

          {/* ARPU Card */}
          <View className="flex-1 min-w-[200px] bg-surface-container-lowest border-[1.5px] border-ink-black p-6 rounded-[32px] flex-col justify-between h-48 shadow-[2px_2px_0px_0px_#1A1A1A]">
            <View className="flex-row justify-between items-start">
              <Text className="font-label-bold text-on-surface-variant font-bold">Avg. Revenue Per User</Text>
              <View className="bg-secondary-container p-2 rounded-lg border-[1.5px] border-ink-black">
                <Ionicons name="person" size={20} color="#715b00" />
              </View>
            </View>
            <View>
              <Text className="font-headline-md text-ink-black font-bold text-3xl">${arpu.toFixed(2)}</Text>
              <Text className="font-label-md text-on-surface-variant mt-1">Stabilized since Q2</Text>
            </View>
          </View>

          {/* Churn Rate Card */}
          <View className="flex-1 min-w-[200px] bg-surface-container-lowest border-[1.5px] border-ink-black p-6 rounded-[32px] flex-col justify-between h-48 shadow-[2px_2px_0px_0px_#1A1A1A]">
            <View className="flex-row justify-between items-start">
              <Text className="font-label-bold text-on-surface-variant font-bold">Churn Rate</Text>
              <View className="bg-accent-orange p-2 rounded-lg border-[1.5px] border-ink-black">
                <Ionicons name="heart-dislike" size={20} color="#ba1a1a" />
              </View>
            </View>
            <View>
              <Text className="font-headline-md text-ink-black font-bold text-3xl">2.4%</Text>
              <Text className="font-label-md text-error font-bold mt-1">-0.8% improvement</Text>
            </View>
          </View>

          {/* Payout Status */}
          <View className="flex-1 min-w-[200px] bg-surface-container-lowest border-[1.5px] border-ink-black p-6 rounded-[32px] flex-col justify-between h-48 shadow-[2px_2px_0px_0px_#1A1A1A]">
            <View className="flex-row justify-between items-start">
              <Text className="font-label-bold text-on-surface-variant font-bold">Pending Payouts</Text>
              <View className="bg-accent-sage p-2 rounded-lg border-[1.5px] border-ink-black">
                <Ionicons name="wallet" size={20} color="#1A1A1A" />
              </View>
            </View>
            <View>
              <Text className="font-headline-md text-ink-black font-bold text-3xl">$12,400</Text>
              <Text className="font-label-md text-on-surface-variant mt-1">14 therapists pending</Text>
            </View>
          </View>

        </View>

        {/* Revenue Charts & Tiers */}
        <View className="flex-col lg:flex-row gap-6 mb-12">
          
          {/* Bar Chart Section */}
          <View className="flex-[2] bg-surface-container-lowest border-[1.5px] border-ink-black p-8 rounded-[48px] shadow-[4px_4px_0px_0px_#1A1A1A]">
            <View className="flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <Text className="font-headline-sm text-ink-black font-bold text-xl">Weekly Revenue Performance</Text>
              <View className="flex-row gap-4">
                <View className="flex-row items-center gap-2">
                  <View className="w-3 h-3 bg-primary border border-ink-black rounded-sm" />
                  <Text className="text-[12px] font-label-bold uppercase font-bold">Pro Tier</Text>
                </View>
                <View className="flex-row items-center gap-2">
                  <View className="w-3 h-3 bg-secondary-container border border-ink-black rounded-sm" />
                  <Text className="text-[12px] font-label-bold uppercase font-bold">Elite Tier</Text>
                </View>
              </View>
            </View>
            
            <View className="flex-row items-end justify-between h-64 gap-2 md:gap-4 px-2 md:px-4">
              {/* Fake bars for demo */}
              {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day, idx) => (
                <View key={day} className="flex-col items-center gap-2 flex-1 h-full justify-end">
                  <View className="w-full flex-col justify-end items-center" style={{ height: '80%' }}>
                    <View className="w-full max-w-[24px] bg-secondary-container border-[1.5px] border-ink-black" style={{ height: `${40 + idx * 5}%` }} />
                    <View className="w-full max-w-[24px] bg-primary border-[1.5px] border-ink-black border-t-0" style={{ height: `${30 + idx % 3 * 10}%` }} />
                  </View>
                  <Text className="text-[10px] md:text-[12px] font-label-bold text-on-surface-variant font-bold">{day}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Tier Breakdown */}
          <View className="flex-1 flex-col gap-6">
            <View className="bg-surface-container-lowest border-[1.5px] border-ink-black p-8 rounded-[48px] shadow-[4px_4px_0px_0px_#1A1A1A]">
              <Text className="font-headline-sm text-ink-black font-bold text-xl mb-6">Tier Breakdown</Text>
              
              <View className="flex-col gap-6">
                {/* Elite Tier */}
                <View className="flex-col gap-2">
                  <View className="flex-row justify-between items-center">
                    <Text className="font-label-bold text-ink-black font-bold">Elite Subscriptions</Text>
                    <Text className="font-label-bold text-ink-black font-bold">64%</Text>
                  </View>
                  <View className="w-full h-4 bg-surface-container border-[1.5px] border-ink-black rounded-full overflow-hidden">
                    <View className="h-full bg-secondary-container" style={{ width: '64%' }} />
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-[12px] text-on-surface-variant">342 active users</Text>
                    <Text className="text-[12px] text-on-surface-variant">$30,870 rev</Text>
                  </View>
                </View>

                {/* Pro Tier */}
                <View className="flex-col gap-2">
                  <View className="flex-row justify-between items-center">
                    <Text className="font-label-bold text-ink-black font-bold">Pro Subscriptions</Text>
                    <Text className="font-label-bold text-ink-black font-bold">36%</Text>
                  </View>
                  <View className="w-full h-4 bg-surface-container border-[1.5px] border-ink-black rounded-full overflow-hidden">
                    <View className="h-full bg-primary" style={{ width: '36%' }} />
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-[12px] text-on-surface-variant">198 active users</Text>
                    <Text className="text-[12px] text-on-surface-variant">$17,380 rev</Text>
                  </View>
                </View>
              </View>
            </View>

            <View className="p-4 bg-accent-sage border-[1.5px] border-ink-black rounded-2xl flex-row items-start gap-3">
              <Ionicons name="bulb" size={24} color="#1A1A1A" />
              <Text className="text-[12px] font-body-md text-ink-black flex-1">
                Elite conversions are up <Text className="font-bold">14%</Text> this month. Suggest promoting "Family Plans" to Pro users.
              </Text>
            </View>
          </View>

        </View>

        {/* Recent Payout Transactions Table */}
        <View className="bg-surface-container-lowest border-[1.5px] border-ink-black p-4 md:p-8 rounded-[48px] shadow-[4px_4px_0px_0px_#1A1A1A]">
          <View className="flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <Text className="font-headline-sm text-ink-black font-bold text-xl w-full md:w-auto">Therapist Payout Status</Text>
            <View className="w-full md:w-64 relative">
              <View className="absolute left-3 top-3 z-10">
                <Ionicons name="search" size={20} color="#434655" />
              </View>
              <TextInput 
                className="w-full pl-10 pr-4 py-2 bg-surface-bright border-[1.5px] border-ink-black rounded-xl text-ink-black"
                placeholder="Search therapist name..."
                placeholderTextColor="#747687"
              />
            </View>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="min-w-[600px] w-full">
              {/* Header */}
              <View className="flex-row border-b-[1.5px] border-ink-black pb-4 mb-4">
                <Text className="flex-[2] font-label-bold text-on-surface-variant uppercase text-[12px] font-bold">Therapist</Text>
                <Text className="flex-1 font-label-bold text-on-surface-variant uppercase text-[12px] font-bold">Payout Amount</Text>
                <Text className="flex-1 font-label-bold text-on-surface-variant uppercase text-[12px] font-bold">Date Range</Text>
                <Text className="flex-[1.5] font-label-bold text-on-surface-variant uppercase text-[12px] font-bold">Status</Text>
                <Text className="w-24 font-label-bold text-on-surface-variant uppercase text-[12px] font-bold text-center">Action</Text>
              </View>

              {/* Row 1 */}
              <View className="flex-row items-center py-4 border-b-[1px] border-surface-container">
                <View className="flex-[2] flex-row items-center gap-3">
                  <View className="w-10 h-10 rounded-full border-[1.5px] border-ink-black bg-accent-pink items-center justify-center">
                    <Ionicons name="person" size={20} color="#1b1b20" />
                  </View>
                  <View>
                    <Text className="font-label-bold text-ink-black font-bold">Dr. Sarah Jenkins</Text>
                    <Text className="text-[12px] text-on-surface-variant">ID: #T8291</Text>
                  </View>
                </View>
                <Text className="flex-1 font-label-bold text-ink-black font-bold">$3,420.00</Text>
                <Text className="flex-1 text-on-surface-variant text-sm">Oct 01 - Oct 15</Text>
                <View className="flex-[1.5] items-start">
                  <View className="px-3 py-1 bg-secondary-container border-[1.5px] border-ink-black rounded-full">
                    <Text className="text-[12px] font-label-bold font-bold text-ink-black">Pending Approval</Text>
                  </View>
                </View>
                <TouchableOpacity className="w-24 bg-primary border-[1.5px] border-ink-black py-2 rounded-lg items-center shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
                  <Text className="text-white text-[12px] font-label-bold font-bold">Approve</Text>
                </TouchableOpacity>
              </View>

              {/* Row 2 */}
              <View className="flex-row items-center py-4 border-b-[1px] border-surface-container">
                <View className="flex-[2] flex-row items-center gap-3">
                  <View className="w-10 h-10 rounded-full border-[1.5px] border-ink-black bg-accent-sage items-center justify-center">
                    <Ionicons name="person" size={20} color="#1b1b20" />
                  </View>
                  <View>
                    <Text className="font-label-bold text-ink-black font-bold">Marcus Thorne</Text>
                    <Text className="text-[12px] text-on-surface-variant">ID: #T5503</Text>
                  </View>
                </View>
                <Text className="flex-1 font-label-bold text-ink-black font-bold">$2,180.50</Text>
                <Text className="flex-1 text-on-surface-variant text-sm">Oct 01 - Oct 15</Text>
                <View className="flex-[1.5] items-start">
                  <View className="px-3 py-1 bg-surface-container border-[1.5px] border-ink-black rounded-full">
                    <Text className="text-[12px] font-label-bold font-bold text-on-surface-variant">Processing</Text>
                  </View>
                </View>
                <TouchableOpacity className="w-24 bg-surface-container-lowest border-[1.5px] border-ink-black py-2 rounded-lg items-center shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
                  <Text className="text-ink-black text-[12px] font-label-bold font-bold">Details</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
          
          <View className="mt-8 items-center">
            <TouchableOpacity className="flex-row items-center gap-2">
              <Text className="font-label-bold text-primary font-bold underline">View All Transactions</Text>
              <Ionicons name="arrow-forward" size={16} color="#002da5" />
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>

      {/* Mobile Nav Anchor */}
      <View className="md:hidden fixed bottom-0 w-full bg-surface border-t-[1.5px] border-ink-black flex-row justify-around p-4 z-50 pb-8">
        <TouchableOpacity className="flex-col items-center">
          <Ionicons name="grid" size={24} color="#434655" />
          <Text className="text-[10px] font-label-bold text-on-surface-variant mt-1">Home</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center">
          <Ionicons name="cash" size={24} color="#002da5" />
          <Text className="text-[10px] font-label-bold text-primary mt-1 font-bold">Revenue</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center">
          <Ionicons name="people" size={24} color="#434655" />
          <Text className="text-[10px] font-label-bold text-on-surface-variant mt-1">Users</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center">
          <Ionicons name="settings" size={24} color="#434655" />
          <Text className="text-[10px] font-label-bold text-on-surface-variant mt-1">Admin</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
