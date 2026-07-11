import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { paymentsApi } from '../../api/payments';
import { format, parseISO } from 'date-fns';

export default function InvoicesScreen() {
  const router = useRouter();
  const [invoices, setInvoices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchInvoices = useCallback(async () => {
    try {
      const data = await paymentsApi.getPaymentHistory();
      setInvoices(data.payments || []);
    } catch (e) {
      console.error('Failed to fetch invoices', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <View className="flex-row items-center px-4 py-3 border-b border-surface-variant bg-surface">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 justify-center">
          <Ionicons name="arrow-back" size={24} color="#1b1b20" />
        </TouchableOpacity>
        <Text className="font-headline-md text-on-surface font-bold text-xl ml-2 flex-1">
          Invoice History
        </Text>
      </View>

      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#002da5" />
        </View>
      ) : (
        <ScrollView className="flex-1 px-6 pt-6">
          <View className="gap-4">
            {invoices.length === 0 && (
              <Text className="font-body-md text-on-surface-variant text-center mt-4">
                No invoices found.
              </Text>
            )}
            {invoices.map((inv) => (
              <View key={inv.payment_id} className="bg-surface-container-highest p-4 rounded-xl border border-outline-variant">
                <View className="flex-row justify-between items-start mb-4 border-b border-surface-variant pb-4">
                  <View>
                    <Text className="font-headline-md text-on-surface font-bold text-lg mb-1">
                      {inv.payment_method} Payment
                    </Text>
                    <Text className="font-body-md text-on-surface-variant text-sm">
                      {format(parseISO(inv.transaction_date), 'MMM d, yyyy')}
                    </Text>
                  </View>
                  <Text className="font-headline-md text-primary font-bold text-lg">
                    {inv.currency === 'INR' ? '₹' : '$'}{inv.amount}
                  </Text>
                </View>
                
                <View className="flex-row justify-between items-center">
                  <Text className="font-label-md text-on-surface-variant text-xs">ID: {inv.transaction_id || inv.payment_id}</Text>
                  {inv.payment_receipt_url ? (
                    <TouchableOpacity className="flex-row items-center bg-surface px-3 py-2 rounded-lg border border-outline-variant">
                      <Ionicons name="download-outline" size={16} color="#1b1b20" className="mr-2" />
                      <Text className="font-label-bold text-on-surface text-xs">PDF Receipt</Text>
                    </TouchableOpacity>
                  ) : (
                    <Text className="font-label-bold text-on-surface-variant text-xs capitalize">{inv.status}</Text>
                  )}
                </View>
              </View>
            ))}
          </View>
          
          <TouchableOpacity onPress={() => router.push('/finance/refund')} className="mt-8 items-center mb-8">
            <Text className="font-label-bold text-error font-bold text-sm">Report an Issue / Request Refund</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
