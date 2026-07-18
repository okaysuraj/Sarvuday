import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function PaymentScreen() {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [promoCode, setPromoCode] = useState('');

  return (
    <View className="flex-1 bg-cream-bg">
      {/* Header */}
      <View className="flex-row items-center justify-between w-full px-4 py-4 border-b-[1.5px] border-ink-black bg-cream-bg sticky top-0 z-50">
        <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full active:bg-surface-variant/20">
          <Ionicons name="arrow-back" size={24} color="#1b1b20" />
        </TouchableOpacity>
        <Text className="font-headline-md text-primary font-bold text-xl tracking-tight">Checkout</Text>
        <View className="w-10" />
      </View>

      <ScrollView className="flex-1 px-4 py-8 max-w-[500px] mx-auto w-full" contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Total Amount Sticker */}
        <View className="bg-accent-sage rounded-[24px] border-[1.5px] border-ink-black p-8 flex-col items-center justify-center relative overflow-hidden mb-8">
          <View className="absolute -top-4 -right-4 w-16 h-16 bg-accent-orange rounded-full border-[1.5px] border-ink-black" />
          <Text className="font-label-bold text-on-surface-variant uppercase tracking-wider mb-2 z-10 font-bold">Total to Pay</Text>
          <View className="flex-row items-start gap-1 z-10">
            <Text className="font-headline-sm text-ink-black font-bold text-2xl mt-1">₹</Text>
            <Text className="font-display-lg text-ink-black font-bold text-4xl">2,499</Text>
          </View>
          <Text className="font-body-md text-on-surface-variant mt-2 text-center z-10">Therapy Session - 60 mins</Text>
        </View>

        {/* Payment Methods */}
        <View className="flex-col gap-6 mb-8">
          <Text className="font-headline-sm text-ink-black font-bold text-xl">Select Payment Method</Text>
          
          <View className="flex-col gap-4">
            {/* UPI Method */}
            <TouchableOpacity 
              onPress={() => setSelectedMethod('upi')}
              className={`bg-surface-container-lowest rounded-xl border-[1.5px] border-ink-black p-4 flex-row items-center justify-between ${selectedMethod === 'upi' ? 'bg-accent-pink shadow-[4px_4px_0px_0px_#1A1A1A]' : ''} active:translate-y-[2px] active:translate-x-[2px] active:shadow-none`}
            >
              <View className="flex-row items-center gap-4">
                <View className="w-12 h-12 bg-surface rounded-lg border-[1.5px] border-ink-black flex-row items-center justify-center">
                  <Ionicons name="qr-code" size={24} color="#1b1b20" />
                </View>
                <View>
                  <Text className="font-label-bold text-ink-black font-bold text-base">UPI</Text>
                  <Text className="font-body-md text-on-surface-variant text-sm">Google Pay, PhonePe, Paytm</Text>
                </View>
              </View>
              <View className={`w-6 h-6 rounded-full border-[1.5px] border-ink-black items-center justify-center ${selectedMethod === 'upi' ? 'bg-primary' : 'bg-surface'}`}>
                {selectedMethod === 'upi' && <Ionicons name="checkmark" size={16} color="#ffffff" />}
              </View>
            </TouchableOpacity>

            {/* Cards Method */}
            <TouchableOpacity 
              onPress={() => setSelectedMethod('card')}
              className={`bg-surface-container-lowest rounded-xl border-[1.5px] border-ink-black p-4 flex-row items-center justify-between ${selectedMethod === 'card' ? 'bg-accent-pink shadow-[4px_4px_0px_0px_#1A1A1A]' : ''} active:translate-y-[2px] active:translate-x-[2px] active:shadow-none`}
            >
              <View className="flex-row items-center gap-4">
                <View className="w-12 h-12 bg-surface rounded-lg border-[1.5px] border-ink-black flex-row items-center justify-center">
                  <Ionicons name="card-outline" size={24} color="#1b1b20" />
                </View>
                <View>
                  <Text className="font-label-bold text-ink-black font-bold text-base">Credit / Debit Card</Text>
                  <Text className="font-body-md text-on-surface-variant text-sm">Visa, Mastercard, RuPay</Text>
                </View>
              </View>
              <View className={`w-6 h-6 rounded-full border-[1.5px] border-ink-black items-center justify-center ${selectedMethod === 'card' ? 'bg-primary' : 'bg-surface'}`}>
                {selectedMethod === 'card' && <Ionicons name="checkmark" size={16} color="#ffffff" />}
              </View>
            </TouchableOpacity>

            {/* Wallets Method */}
            <TouchableOpacity 
              onPress={() => setSelectedMethod('wallet')}
              className={`bg-surface-container-lowest rounded-xl border-[1.5px] border-ink-black p-4 flex-row items-center justify-between ${selectedMethod === 'wallet' ? 'bg-accent-pink shadow-[4px_4px_0px_0px_#1A1A1A]' : ''} active:translate-y-[2px] active:translate-x-[2px] active:shadow-none`}
            >
              <View className="flex-row items-center gap-4">
                <View className="w-12 h-12 bg-surface rounded-lg border-[1.5px] border-ink-black flex-row items-center justify-center">
                  <Ionicons name="wallet-outline" size={24} color="#1b1b20" />
                </View>
                <View>
                  <Text className="font-label-bold text-ink-black font-bold text-base">Wallets</Text>
                  <Text className="font-body-md text-on-surface-variant text-sm">Amazon Pay, Mobikwik</Text>
                </View>
              </View>
              <View className={`w-6 h-6 rounded-full border-[1.5px] border-ink-black items-center justify-center ${selectedMethod === 'wallet' ? 'bg-primary' : 'bg-surface'}`}>
                {selectedMethod === 'wallet' && <Ionicons name="checkmark" size={16} color="#ffffff" />}
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Promo Code Section */}
        <View className="flex-col gap-2 mb-8">
          <Text className="font-label-bold text-ink-black font-bold text-base">Promo Code</Text>
          <View className="flex-row gap-2 w-full">
            <TextInput
              className="flex-1 bg-[#f9f8f3] rounded-xl border-[1.5px] border-ink-black px-4 py-3 font-body-md text-ink-black"
              placeholder="Enter code"
              placeholderTextColor="#747687"
              value={promoCode}
              onChangeText={setPromoCode}
            />
            <TouchableOpacity className="bg-secondary-container border-[1.5px] border-ink-black px-6 py-3 rounded-xl shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none items-center justify-center">
              <Text className="text-ink-black font-label-bold font-bold">Apply</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Pay Button */}
        <View className="mt-4 pb-12">
          <TouchableOpacity 
            onPress={() => router.push('/patient/dashboard')}
            className="w-full bg-primary border-[1.5px] border-ink-black py-4 rounded-xl shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex-row items-center justify-center gap-2"
          >
            <Ionicons name="lock-closed" size={24} color="#ffffff" />
            <Text className="text-white font-headline-sm font-bold text-xl">Pay ₹2,499 securely</Text>
          </TouchableOpacity>
          <View className="flex-row items-center justify-center gap-1 mt-4">
            <Ionicons name="shield-checkmark" size={16} color="#747687" />
            <Text className="text-center font-body-md text-sm text-outline">100% Safe & Secure Payments</Text>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}
