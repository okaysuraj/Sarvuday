import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CustomButton } from '../../components/CustomButton';

export default function WalletScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <View className="flex-row items-center px-4 py-3 border-b border-surface-variant bg-surface">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 justify-center">
          <Ionicons name="arrow-back" size={24} color="#1b1b20" />
        </TouchableOpacity>
        <Text className="font-headline-md text-on-surface font-bold text-xl ml-2 flex-1">
          My Wallet
        </Text>
      </View>

      <ScrollView className="flex-1 px-6 pt-6">
        <View className="bg-surface-container-highest p-6 rounded-3xl border border-outline-variant items-center mb-8">
          <Text className="font-body-md text-on-surface-variant text-sm mb-2">Available Balance</Text>
          <Text className="font-headline-md text-on-surface font-bold text-5xl mb-6">$145.00</Text>
          <CustomButton 
            title="Add Funds"
            onPress={() => {}}
            className="w-full max-w-[200px]"
          />
        </View>

        <Text className="font-headline-md text-on-surface text-lg font-bold mb-4">Recent Transactions</Text>
        <View className="gap-4 mb-8">
          {[
            { id: 1, title: 'Session with Dr. Jenkins', type: 'deduction', amount: '-$80.00', date: 'Oct 14, 2026' },
            { id: 2, title: 'Wallet Top-up', type: 'addition', amount: '+$100.00', date: 'Oct 12, 2026' },
            { id: 3, title: 'Premium Subscription', type: 'deduction', amount: '-$99.00', date: 'Oct 01, 2026' },
          ].map((tx) => (
            <View key={tx.id} className="flex-row justify-between items-center py-3 border-b border-surface-variant">
              <View className="flex-row items-center flex-1">
                <View className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${tx.type === 'addition' ? 'bg-primary-fixed' : 'bg-surface-variant'}`}>
                  <Ionicons name={tx.type === 'addition' ? 'arrow-down' : 'arrow-up'} size={16} color={tx.type === 'addition' ? '#002da5' : '#1b1b20'} />
                </View>
                <View className="flex-1">
                  <Text className="font-headline-md text-on-surface font-bold text-base" numberOfLines={1}>{tx.title}</Text>
                  <Text className="font-body-md text-on-surface-variant text-xs">{tx.date}</Text>
                </View>
              </View>
              <Text className={`font-headline-md font-bold text-base ml-2 ${tx.type === 'addition' ? 'text-primary' : 'text-on-surface'}`}>
                {tx.amount}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
