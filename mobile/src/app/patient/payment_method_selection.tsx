import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function PaymentMethodSelectionScreen() {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState<string>('card1');
  const [promoCode, setPromoCode] = useState('');

  return (
    <View className="flex-1 bg-cream-bg">
      {/* TopAppBar */}
      <View className="flex-row justify-between items-center px-4 py-4 w-full z-[60] bg-surface border-b-[1.5px] border-ink-black sticky top-0">
        <View className="flex-row items-center gap-4">
          <TouchableOpacity onPress={() => router.back()} className="hover:bg-surface-variant/20 p-2 rounded-full active:translate-x-[1px] active:translate-y-[1px]">
            <Ionicons name="arrow-back" size={24} color="#002da5" />
          </TouchableOpacity>
          <Text className="font-headline-md text-primary font-bold text-xl tracking-tight">SarvUday</Text>
        </View>
        <View className="flex-row items-center gap-2 hidden md:flex">
          <Text className="font-label-bold text-on-surface-variant font-bold text-sm">SECURE CHECKOUT</Text>
          <Ionicons name="lock-closed" size={20} color="#002da5" />
        </View>
      </View>

      <ScrollView className="flex-1 px-4 md:px-10 py-8 max-w-6xl mx-auto w-full" contentContainerStyle={{ paddingBottom: 120 }}>
        <View className="flex-col lg:flex-row gap-6 items-start">
          
          {/* Payment Methods Column */}
          <View className="flex-[1.4] w-full flex-col gap-6">
            <View className="mb-2">
              <Text className="font-headline-sm text-on-surface font-bold text-2xl mb-2">Select Payment Method</Text>
              <Text className="text-on-surface-variant font-body-md text-base">Choose how you'd like to pay for your session.</Text>
            </View>

            {/* Credit/Debit Section */}
            <View className="flex-col gap-4">
              <View className="flex-row justify-between items-center px-2">
                <Text className="font-label-bold uppercase tracking-wider text-on-surface-variant font-bold text-xs">Credit & Debit Cards</Text>
                <TouchableOpacity className="flex-row items-center gap-1">
                  <Ionicons name="add" size={20} color="#002da5" />
                  <Text className="text-primary font-label-bold font-bold text-sm">Add New Card</Text>
                </TouchableOpacity>
              </View>

              {/* Card Option 1 */}
              <TouchableOpacity 
                onPress={() => setSelectedMethod('card1')}
                className={`bg-white border-[1.5px] ${selectedMethod === 'card1' ? 'border-primary' : 'border-ink-black'} rounded-[32px] p-6 flex-row items-center gap-4 shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none`}
              >
                <View className="w-12 h-12 bg-accent-sage rounded-full border-[1.5px] border-ink-black items-center justify-center">
                  <Ionicons name="card" size={24} color="#002da5" />
                </View>
                <View className="flex-1">
                  <Text className="font-label-bold text-on-surface font-bold text-base">•••• •••• •••• 4242</Text>
                  <Text className="text-on-surface-variant text-xs mt-1">Expires 12/26 • HDFC Bank</Text>
                </View>
                <View className="w-6 h-6 rounded-full border-[1.5px] border-ink-black items-center justify-center bg-white">
                  {selectedMethod === 'card1' && <View className="w-3 h-3 rounded-full bg-primary" />}
                </View>
              </TouchableOpacity>

              {/* Card Option 2 */}
              <TouchableOpacity 
                onPress={() => setSelectedMethod('card2')}
                className={`bg-white border-[1.5px] ${selectedMethod === 'card2' ? 'border-primary' : 'border-ink-black'} rounded-[32px] p-6 flex-row items-center gap-4 shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none`}
              >
                <View className="w-12 h-12 bg-accent-pink rounded-full border-[1.5px] border-ink-black items-center justify-center">
                  <Ionicons name="business" size={24} color="#5a3039" />
                </View>
                <View className="flex-1">
                  <Text className="font-label-bold text-on-surface font-bold text-base">•••• •••• •••• 9012</Text>
                  <Text className="text-on-surface-variant text-xs mt-1">Expires 08/25 • ICICI Bank</Text>
                </View>
                <View className="w-6 h-6 rounded-full border-[1.5px] border-ink-black items-center justify-center bg-white">
                  {selectedMethod === 'card2' && <View className="w-3 h-3 rounded-full bg-primary" />}
                </View>
              </TouchableOpacity>
            </View>

            {/* UPI Section */}
            <View className="flex-col gap-4 mt-2">
              <Text className="font-label-bold uppercase tracking-wider text-on-surface-variant font-bold text-xs px-2">UPI Payments</Text>
              
              <TouchableOpacity 
                onPress={() => setSelectedMethod('upi1')}
                className={`bg-accent-orange border-[1.5px] ${selectedMethod === 'upi1' ? 'border-primary' : 'border-ink-black'} rounded-[32px] p-6 flex-row items-center gap-4 shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none`}
              >
                <View className="w-12 h-12 bg-white rounded-full border-[1.5px] border-ink-black items-center justify-center">
                  <Ionicons name="qr-code" size={24} color="#1b1b20" />
                </View>
                <View className="flex-1">
                  <Text className="font-label-bold text-on-surface font-bold text-base">saurabh@upi</Text>
                  <Text className="text-on-surface-variant text-xs mt-1">Google Pay</Text>
                </View>
                <View className="w-6 h-6 rounded-full border-[1.5px] border-ink-black items-center justify-center bg-white">
                  {selectedMethod === 'upi1' && <View className="w-3 h-3 rounded-full bg-primary" />}
                </View>
              </TouchableOpacity>
            </View>

            {/* Wallets Section */}
            <View className="flex-col gap-4 mt-2">
              <Text className="font-label-bold uppercase tracking-wider text-on-surface-variant font-bold text-xs px-2">Wallets</Text>
              
              <TouchableOpacity 
                onPress={() => setSelectedMethod('wallet1')}
                className={`bg-secondary-container border-[1.5px] ${selectedMethod === 'wallet1' ? 'border-primary' : 'border-ink-black'} rounded-[32px] p-6 flex-row items-center gap-4 shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none`}
              >
                <View className="w-12 h-12 bg-white rounded-full border-[1.5px] border-ink-black items-center justify-center">
                  <Ionicons name="wallet" size={24} color="#725c00" />
                </View>
                <View className="flex-1">
                  <Text className="font-label-bold text-on-surface font-bold text-base">Amazon Pay</Text>
                  <Text className="text-on-surface-variant text-xs mt-1">Balance: ₹1,240.00</Text>
                </View>
                <View className="w-6 h-6 rounded-full border-[1.5px] border-ink-black items-center justify-center bg-white">
                  {selectedMethod === 'wallet1' && <View className="w-3 h-3 rounded-full bg-primary" />}
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Order Summary Column */}
          <View className="flex-1 w-full lg:sticky lg:top-24 mt-8 lg:mt-0">
            <View className="bg-surface-container-low border-[1.5px] border-ink-black rounded-[40px] p-8 flex-col gap-6">
              <Text className="font-headline-sm text-on-surface font-bold text-xl">Order Summary</Text>
              
              <View className="flex-col gap-4">
                <View className="flex-row justify-between items-center font-body-md">
                  <Text className="text-on-surface-variant text-base">Therapy Session (60m)</Text>
                  <Text className="font-bold text-base text-ink-black">₹1,500.00</Text>
                </View>
                <View className="flex-row justify-between items-center font-body-md">
                  <Text className="text-on-surface-variant text-base">GST (18%)</Text>
                  <Text className="font-bold text-base text-ink-black">₹270.00</Text>
                </View>
                <View className="border-t-[1.5px] border-dashed border-ink-black pt-4 flex-row justify-between items-center">
                  <Text className="font-headline-sm text-on-surface font-bold text-xl">Total</Text>
                  <Text className="font-headline-sm text-primary font-bold text-xl">₹1,770.00</Text>
                </View>
              </View>

              {/* Promo Code */}
              <View className="relative w-full">
                <TextInput
                  className="w-full bg-[#f9f8f3] border-[1.5px] border-ink-black rounded-xl px-4 py-3 focus:border-primary font-label-md text-base text-ink-black"
                  placeholder="Promo Code"
                  placeholderTextColor="#747687"
                  value={promoCode}
                  onChangeText={setPromoCode}
                />
                <TouchableOpacity className="absolute right-2 top-2 px-4 py-1 bg-accent-sage border-[1.5px] border-ink-black rounded-lg active:scale-95 items-center justify-center bottom-2">
                  <Text className="font-label-bold font-bold text-ink-black text-xs">APPLY</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity 
                onPress={() => router.push('/patient/payment')}
                className="w-full py-5 bg-primary border-[1.5px] border-ink-black rounded-full shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none flex-row items-center justify-center gap-3"
              >
                <Text className="text-white font-headline-sm font-bold text-lg">Pay Securely</Text>
                <Ionicons name="lock-closed" size={24} color="#ffffff" />
              </TouchableOpacity>

              {/* Trust Badges */}
              <View className="flex-row flex-wrap justify-center gap-4 pt-4">
                <View className="flex-row items-center gap-1 opacity-60">
                  <Ionicons name="shield-checkmark" size={18} color="#1b1b20" />
                  <Text className="text-[12px] font-bold text-ink-black">PCI DSS</Text>
                </View>
                <View className="flex-row items-center gap-1 opacity-60">
                  <Ionicons name="lock-closed" size={18} color="#1b1b20" />
                  <Text className="text-[12px] font-bold text-ink-black">SSL SECURE</Text>
                </View>
                <View className="flex-row items-center gap-1 opacity-60">
                  <Ionicons name="shield" size={18} color="#1b1b20" />
                  <Text className="text-[12px] font-bold text-ink-black">256-BIT</Text>
                </View>
              </View>
            </View>

            {/* Info Card */}
            <View className="mt-6 bg-accent-sage border-[1.5px] border-ink-black rounded-[32px] p-6 flex-row gap-4 items-start">
              <Ionicons name="information-circle" size={32} color="#002da5" />
              <View className="flex-1">
                <Text className="font-label-bold text-on-surface font-bold text-base mb-1">Zero Cancellation Fee</Text>
                <Text className="text-on-surface-variant text-xs">Cancel up to 24 hours before your session for a full refund back to your payment method.</Text>
              </View>
            </View>

          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation Shell (Mobile Only) */}
      <View className="md:hidden absolute bottom-0 w-full bg-surface border-t-[1.5px] border-ink-black h-[80px] px-4 pb-4 flex-row justify-around items-center z-50">
        <TouchableOpacity onPress={() => router.push('/patient/dashboard')} className="flex-col items-center justify-center p-2">
          <Ionicons name="home" size={24} color="#434655" />
          <Text className="font-label-md text-on-surface-variant mt-1">Home</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center p-2">
          <Ionicons name="hardware-chip" size={24} color="#434655" />
          <Text className="font-label-md text-on-surface-variant mt-1">AI Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center bg-secondary-container border-[1.5px] border-ink-black rounded-xl px-4 py-1">
          <Ionicons name="calendar" size={24} color="#715b00" />
          <Text className="font-label-md text-on-secondary-container font-bold mt-1">Book</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center p-2">
          <Ionicons name="person" size={24} color="#434655" />
          <Text className="font-label-md text-on-surface-variant mt-1">Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
