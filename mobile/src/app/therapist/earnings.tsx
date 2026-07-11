import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function EarningsDashboardScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <View className="flex-row items-center px-4 py-3 border-b border-surface-variant bg-surface">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 justify-center">
          <Ionicons name="arrow-back" size={24} color="#1b1b20" />
        </TouchableOpacity>
        <Text className="font-headline-md text-on-surface font-bold text-xl ml-2 flex-1">
          Earnings
        </Text>
      </View>

      <ScrollView className="flex-1 px-6 pt-6">
        <View className="bg-primary p-6 rounded-2xl mb-6 shadow-md">
          <Text className="font-body-md text-on-primary-fixed-variant text-sm mb-1 opacity-80">Available Payout</Text>
          <Text className="font-headline-md text-on-primary font-bold text-4xl mb-4">$1,240.00</Text>
          
          <TouchableOpacity className="bg-surface py-3 rounded-xl items-center">
            <Text className="font-headline-md text-primary font-bold">Withdraw Funds</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row gap-4 mb-8">
          <View className="flex-1 bg-surface-container-highest p-4 rounded-xl border border-outline-variant">
            <Text className="font-body-md text-on-surface-variant text-xs mb-1">Sessions (Oct)</Text>
            <Text className="font-headline-md text-on-surface font-bold text-xl">32</Text>
          </View>
          <View className="flex-1 bg-surface-container-highest p-4 rounded-xl border border-outline-variant">
            <Text className="font-body-md text-on-surface-variant text-xs mb-1">Projected</Text>
            <Text className="font-headline-md text-on-surface font-bold text-xl">$2,800</Text>
          </View>
        </View>

        <Text className="font-headline-md text-on-surface text-lg font-bold mb-4">Recent Transactions</Text>
        <View className="gap-4 mb-8">
          {[1, 2, 3].map((item, idx) => (
            <View key={idx} className="flex-row justify-between items-center py-3 border-b border-surface-variant">
              <View className="flex-row items-center">
                <View className="w-10 h-10 rounded-full bg-surface-variant items-center justify-center mr-3">
                  <Ionicons name="videocam" size={16} color="#1b1b20" />
                </View>
                <View>
                  <Text className="font-headline-md text-on-surface font-bold text-base">Video Session</Text>
                  <Text className="font-body-md text-on-surface-variant text-xs">Oct {14 - idx}, 2026</Text>
                </View>
              </View>
              <Text className="font-headline-md text-primary font-bold text-base">+$80.00</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
