import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CustomButton } from '../../components/CustomButton';
import { paymentsApi } from '../../api/payments';

export default function CheckoutScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handlePay = async () => {
    setIsLoading(true);
    try {
      await paymentsApi.initiatePayment({
        appointment_id: "mock-appointment", 
        amount: 99.00,
        payment_method: "credit_card",
        currency: "USD"
      });
      
      Alert.alert('Payment Successful', 'Your transaction was completed.', [
        { text: 'View Invoice', onPress: () => router.replace('/finance/invoices') },
        { text: 'Done', onPress: () => router.replace('/(tabs)') }
      ]);
    } catch (e) {
      console.error(e);
      Alert.alert('Error', 'Payment failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <View className="flex-row items-center px-4 py-3 border-b border-surface-variant bg-surface">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 justify-center">
          <Ionicons name="arrow-back" size={24} color="#1b1b20" />
        </TouchableOpacity>
        <Text className="font-headline-md text-on-surface font-bold text-xl ml-2 flex-1">
          Checkout
        </Text>
      </View>

      <ScrollView className="flex-1 px-6 pt-6">
        <Text className="font-headline-md text-on-surface text-lg font-bold mb-4">Order Summary</Text>
        <View className="bg-surface-container-highest p-4 rounded-xl border border-outline-variant mb-6">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="font-body-md text-on-surface font-bold text-base">Premium Plan (Monthly)</Text>
            <Text className="font-body-md text-on-surface font-bold text-base">$99.00</Text>
          </View>
          <View className="flex-row justify-between items-center mb-4 pb-4 border-b border-surface-variant">
            <Text className="font-body-md text-on-surface-variant text-sm">Tax</Text>
            <Text className="font-body-md text-on-surface-variant text-sm">$0.00</Text>
          </View>
          <View className="flex-row justify-between items-center">
            <Text className="font-headline-md text-on-surface font-bold text-lg">Total</Text>
            <Text className="font-headline-md text-primary font-bold text-xl">$99.00</Text>
          </View>
        </View>

        <Text className="font-headline-md text-on-surface text-lg font-bold mb-4">Payment Method</Text>
        <View className="bg-surface-container-highest p-4 rounded-xl border border-outline-variant mb-6 flex-row items-center">
          <Ionicons name="card" size={24} color="#1b1b20" className="mr-4" />
          <View className="flex-1">
            <Text className="font-headline-md text-on-surface font-bold">Visa ending in 4242</Text>
            <Text className="font-body-md text-on-surface-variant text-sm">Expires 12/28</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/finance/payment-method')}>
            <Text className="text-primary font-label-bold">Change</Text>
          </TouchableOpacity>
        </View>

        <View className="bg-primary-fixed p-4 rounded-xl flex-row items-center border border-primary-fixed-dim">
          <Ionicons name="lock-closed" size={20} color="#002da5" className="mr-3" />
          <Text className="font-body-md text-on-primary-fixed-variant text-sm flex-1 leading-5">
            Payments are secure and encrypted. Your card will be charged immediately.
          </Text>
        </View>
      </ScrollView>

      <View className="p-6 border-t border-surface-variant bg-surface">
        <CustomButton 
          title="Pay $99.00"
          onPress={handlePay}
          isLoading={isLoading}
        />
      </View>
    </SafeAreaView>
  );
}
