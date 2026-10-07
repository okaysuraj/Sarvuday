import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { paymentsApi } from '../../api/payments';

export default function InvoiceHistoryScreen() {
  const router = useRouter();
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        setLoading(true);
        const data = await paymentsApi.getPaymentHistory();
        if (Array.isArray(data)) {
          setInvoices(data);
        }
      } catch (err) {
        console.error('Failed to fetch invoice history:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  return (
    <View className="flex-1 bg-cream-bg">
      {/* TopAppBar */}
      <View className="flex-row justify-between items-center px-4 py-4 w-full z-50 bg-cream-bg border-b-[1.5px] border-ink-black">
        <View className="flex-row items-center gap-4">
          <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-lg">
            <Ionicons name="arrow-back" size={24} color="#1b1b20" />
          </TouchableOpacity>
          <Text className="font-headline-md text-ink-black font-bold text-xl tracking-tight">SarvUday</Text>
        </View>
      </View>

      <ScrollView className="flex-1 px-4 py-6 max-w-5xl mx-auto w-full" contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header Section */}
        <View className="mb-6">
          <Text className="font-display-lg text-ink-black font-bold text-2xl mb-1">Invoice &amp; Receipts</Text>
          <Text className="text-on-surface-variant font-body-md text-sm">Review your therapy sessions and care plan payments.</Text>
        </View>

        {loading ? (
          <View className="py-20 items-center justify-center">
            <ActivityIndicator size="large" color="#18181B" />
          </View>
        ) : invoices.length === 0 ? (
          <View className="bg-surface-container-lowest border-[1.5px] border-ink-black rounded-[24px] p-8 items-center text-center shadow-[4px_4px_0px_0px_#1A1A1A]">
            <Ionicons name="receipt-outline" size={48} color="#71717A" />
            <Text className="font-bold text-base text-ink-black mt-3">No Invoices Yet</Text>
            <Text className="text-xs text-on-surface-variant mt-1 text-center">
              Your session receipts and subscription invoices will appear here once booked.
            </Text>
          </View>
        ) : (
          <View className="flex-col gap-4">
            {invoices.map((inv) => (
              <View key={inv.payment_id} className="bg-surface-container-lowest border-[1.5px] border-ink-black rounded-[24px] p-5 shadow-[4px_4px_0px_0px_#1A1A1A]">
                <View className="flex-row justify-between items-start mb-3">
                  <View className="flex-row items-center gap-3">
                    <View className="w-10 h-10 rounded-xl bg-accent-sage border-[1.5px] border-ink-black items-center justify-center">
                      <Ionicons name="card-outline" size={20} color="#1b1b20" />
                    </View>
                    <View>
                      <Text className="font-bold text-sm text-ink-black">{inv.transaction_id || 'Care Payment'}</Text>
                      <Text className="text-xs text-on-surface-variant">
                        {inv.transaction_date ? new Date(inv.transaction_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'Confirmed'}
                      </Text>
                    </View>
                  </View>
                  <View className="items-end">
                    <Text className="font-bold text-base text-ink-black">₹{parseFloat(inv.amount || 0).toFixed(2)}</Text>
                    <Text className="text-[10px] font-bold uppercase text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full mt-0.5">
                      {inv.status || 'PAID'}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
