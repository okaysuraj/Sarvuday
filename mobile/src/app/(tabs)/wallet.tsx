import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { walletApi } from '../../api/wallet';
import useAuthStore from '../../store/authStore';
import { format } from 'date-fns';

export default function WalletScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  
  const [transactions, setTransactions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const data = await walletApi.getPaymentHistory(10, 0);
      setTransactions(data.payments || []);
    } catch (error) {
      console.error('Error fetching payments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 bg-background justify-center items-center">
        <ActivityIndicator size="large" color="#002da5" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-cream-bg">
      {/* Header */}
      <View className="flex-row justify-between items-center px-6 py-4 w-full border-b-[1.5px] border-ink-black bg-cream-bg z-50">
        <View className="w-10" />
        <Text className="font-headline-sm text-primary font-bold text-xl uppercase tracking-tighter">SarvUday</Text>
        <TouchableOpacity className="w-10 h-10 rounded-full border-[1.5px] border-ink-black flex items-center justify-center">
           <Ionicons name="person" size={24} color="#002da5" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 py-6" contentContainerStyle={{ paddingBottom: 100 }}>
        
        <View className="mb-6">
          <Text className="font-headline-md text-ink-black font-bold text-3xl">Your Wallet</Text>
          <Text className="font-body-lg text-on-surface-variant text-lg">Manage your digital assets and transactions.</Text>
        </View>

        {/* Balance Card */}
        <View className="bg-primary border-[1.5px] border-ink-black rounded-[32px] p-8 shadow-[4px_4px_0px_0px_#1A1A1A] mb-8 relative overflow-hidden">
          <View className="absolute -top-5 -right-5 w-32 h-32 bg-secondary-container rounded-full opacity-20 border-[1.5px] border-ink-black" />
          <Text className="font-label-bold text-white font-bold opacity-80 uppercase tracking-widest text-xs">Current Balance</Text>
          <View className="mt-2 flex-row items-center gap-2">
            <Text className="font-display-lg text-white font-bold text-4xl">₹ 14,250.50</Text>
            <Ionicons name="wallet" size={32} color="#fdd33f" />
          </View>
          <View className="mt-8 flex-row flex-wrap gap-4">
            <View className="bg-white/10 px-4 py-2 rounded-xl border-[1.5px] border-ink-black flex-row items-center gap-2">
              <Ionicons name="checkmark-circle" size={16} color="#d9d9e6" />
              <Text className="font-label-md text-white text-xs">Verified Account</Text>
            </View>
            <View className="bg-white/10 px-4 py-2 rounded-xl border-[1.5px] border-ink-black flex-row items-center gap-2">
              <Ionicons name="trending-up" size={16} color="#ffdad6" />
              <Text className="font-label-md text-white text-xs">+12% this month</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="flex-row gap-4 mb-8">
          <TouchableOpacity className="flex-1 bg-secondary-container border-[1.5px] border-ink-black p-4 rounded-3xl items-center shadow-[2px_2px_0px_0px_#1A1A1A] active:shadow-none active:translate-x-[1px] active:translate-y-[1px]">
            <View className="w-12 h-12 bg-white border-[1.5px] border-ink-black rounded-full flex items-center justify-center mb-2">
              <Ionicons name="add" size={24} color="#1A1A1A" />
            </View>
            <Text className="font-headline-sm text-ink-black font-bold">Add Money</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 bg-accent-sage border-[1.5px] border-ink-black p-4 rounded-3xl items-center shadow-[2px_2px_0px_0px_#1A1A1A] active:shadow-none active:translate-x-[1px] active:translate-y-[1px]">
            <View className="w-12 h-12 bg-white border-[1.5px] border-ink-black rounded-full flex items-center justify-center mb-2">
              <Ionicons name="card-outline" size={24} color="#1A1A1A" />
            </View>
            <Text className="font-headline-sm text-ink-black font-bold">Withdraw</Text>
          </TouchableOpacity>
        </View>

        {/* Transactions List */}
        <View className="bg-white border-[1.5px] border-ink-black rounded-[32px] p-6 shadow-[4px_4px_0px_0px_#1A1A1A] mb-8">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="font-headline-sm text-ink-black font-bold text-xl">Recent Transactions</Text>
            <TouchableOpacity>
              <Text className="font-label-bold text-primary font-bold text-xs uppercase">View All</Text>
            </TouchableOpacity>
          </View>
          
          {transactions.length === 0 ? (
            <Text className="font-body-md text-on-surface-variant text-center my-4">No recent transactions.</Text>
          ) : (
            <View className="flex-col gap-4">
              {transactions.map((tx, idx) => (
                <View key={idx} className="flex-row items-center justify-between p-4 bg-surface-container-low border-[1.5px] border-ink-black rounded-2xl">
                  <View className="flex-row items-center gap-4">
                    <View className="w-12 h-12 bg-[#ffe082] border-[1.5px] border-ink-black rounded-xl flex items-center justify-center">
                      <Ionicons name="calendar" size={20} color="#1A1A1A" />
                    </View>
                    <View>
                      <Text className="font-label-bold text-ink-black font-bold">Session Booking</Text>
                      <Text className="text-xs text-on-surface-variant">
                        {format(new Date(tx.created_at || new Date()), 'dd MMM, hh:mm a')}
                      </Text>
                    </View>
                  </View>
                  <View className="items-end">
                    <Text className="font-label-bold text-error font-bold">- ₹ {tx.amount / 100}</Text>
                    <Text className="text-[10px] text-on-surface-variant uppercase tracking-tighter">{tx.status}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>

      </ScrollView>
    </View>
  );
}
