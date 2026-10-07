import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Modal, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { walletApi } from '../../api/wallet';
import useAuthStore from '../../store/authStore';
import { format } from 'date-fns';

export default function WalletScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  
  const [transactions, setTransactions] = useState<any[]>([]);
  const [balance, setBalance] = useState(14250.50);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState('1000');

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

  const handleTopUp = () => {
    const val = parseFloat(topUpAmount);
    if (!isNaN(val) && val > 0) {
      setBalance(prev => prev + val);
      setTransactions(prev => [
        {
          id: Date.now().toString(),
          amount: val * 100,
          status: 'COMPLETED',
          type: 'TOPUP',
          created_at: new Date().toISOString()
        },
        ...prev
      ]);
      setModalVisible(false);
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 bg-background justify-center items-center">
        <ActivityIndicator size="small" color="#18181B" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      {/* Editorial Header */}
      <View className="flex-row justify-between items-center px-5 pt-12 pb-4 bg-background border-b border-outline">
        <Text className="text-on-surface font-semibold text-base tracking-tight">Account Wallet</Text>
        <TouchableOpacity 
          onPress={() => router.push('/(tabs)/profile')}
          className="w-8 h-8 rounded-full border border-outline bg-surface items-center justify-center"
        >
          <Ionicons name="person-outline" size={16} color="#18181B" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-5 py-6" contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Balance Card - Refined Charcoal */}
        <View className="bg-primary rounded-2xl p-6 mb-5">
          <View className="flex-row justify-between items-start mb-2">
            <Text className="text-white/70 text-xs font-medium uppercase tracking-wider">Available Balance</Text>
            <View className="px-2 py-0.5 rounded-full bg-white/10">
              <Text className="text-white text-[10px] font-medium">Secured</Text>
            </View>
          </View>

          <Text className="text-white text-3xl font-bold tracking-tight mb-6">
            ₹ {balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </Text>

          <View className="flex-row gap-2 pt-4 border-t border-white/10">
            <View className="flex-row items-center gap-1.5">
              <Ionicons name="checkmark-circle-outline" size={14} color="#84A98C" />
              <Text className="text-white/80 text-xs">Direct Billing Active</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="flex-row gap-3 mb-6">
          <TouchableOpacity 
            onPress={() => setModalVisible(true)}
            className="flex-1 bg-surface border border-outline p-4 rounded-xl items-center flex-row justify-center gap-2"
          >
            <Ionicons name="add-circle-outline" size={18} color="#18181B" />
            <Text className="text-on-surface font-medium text-sm">Add Funds</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            className="flex-1 bg-surface border border-outline p-4 rounded-xl items-center flex-row justify-center gap-2"
          >
            <Ionicons name="receipt-outline" size={18} color="#18181B" />
            <Text className="text-on-surface font-medium text-sm">Statements</Text>
          </TouchableOpacity>
        </View>

        {/* Transactions Section */}
        <View className="bg-surface border border-outline rounded-2xl p-5">
          <View className="flex-row justify-between items-center mb-4 pb-3 border-b border-outline">
            <Text className="text-on-surface font-semibold text-sm">Recent Ledger</Text>
            <Text className="text-on-surface-variant text-xs font-medium">Filter</Text>
          </View>
          
          {transactions.length === 0 ? (
            <Text className="text-on-surface-variant text-xs text-center py-6">No transactions recorded yet.</Text>
          ) : (
            <View className="flex-col gap-3">
              {transactions.map((tx, idx) => (
                <View key={tx.id || idx} className="flex-row items-center justify-between py-2 border-b border-outline/50 last:border-b-0">
                  <View className="flex-row items-center gap-3">
                    <View className="w-9 h-9 bg-surface-container rounded-lg items-center justify-center">
                      <Ionicons 
                        name={tx.type === 'TOPUP' ? 'arrow-down-outline' : 'calendar-outline'} 
                        size={16} 
                        color={tx.type === 'TOPUP' ? '#2E4B3E' : '#18181B'} 
                      />
                    </View>
                    <View>
                      <Text className="text-on-surface font-medium text-xs">
                        {tx.type === 'TOPUP' ? 'Wallet Top-up' : 'Therapy Consultation'}
                      </Text>
                      <Text className="text-on-surface-variant text-[11px] mt-0.5">
                        {format(new Date(tx.created_at || new Date()), 'dd MMM yyyy, hh:mm a')}
                      </Text>
                    </View>
                  </View>
                  <View className="items-end">
                    <Text className={`font-semibold text-xs ${tx.type === 'TOPUP' ? 'text-secondary' : 'text-on-surface'}`}>
                      {tx.type === 'TOPUP' ? '+' : '-'} ₹ {(tx.amount / 100).toFixed(2)}
                    </Text>
                    <Text className="text-[10px] text-on-surface-variant mt-0.5">{tx.status || 'Settled'}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>

      </ScrollView>

      {/* Top-up Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 bg-black/40 justify-center items-center px-6">
          <View className="w-full bg-surface border border-outline rounded-2xl p-6">
            <Text className="text-on-surface font-semibold text-base mb-1">Add Wallet Balance</Text>
            <Text className="text-on-surface-variant text-xs mb-4">Enter amount to add for upcoming consultations.</Text>

            <TextInput
              value={topUpAmount}
              onChangeText={setTopUpAmount}
              keyboardType="numeric"
              className="bg-surface-container border border-outline rounded-xl p-3 text-on-surface font-semibold text-base mb-4"
              placeholder="Amount in ₹"
            />

            <View className="flex-row gap-2 mb-6">
              {['500', '1000', '2000', '5000'].map(amt => (
                <TouchableOpacity
                  key={amt}
                  onPress={() => setTopUpAmount(amt)}
                  className={`px-3 py-1.5 rounded-lg border ${topUpAmount === amt ? 'bg-primary border-primary' : 'bg-surface border-outline'}`}
                >
                  <Text className={`text-xs font-medium ${topUpAmount === amt ? 'text-white' : 'text-on-surface'}`}>₹{amt}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View className="flex-row gap-3">
              <TouchableOpacity 
                onPress={() => setModalVisible(false)}
                className="flex-1 py-3 bg-surface-container rounded-xl items-center border border-outline"
              >
                <Text className="text-on-surface text-xs font-medium">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={handleTopUp}
                className="flex-1 py-3 bg-primary rounded-xl items-center"
              >
                <Text className="text-white text-xs font-medium">Confirm Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
