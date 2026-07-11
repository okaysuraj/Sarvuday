import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CustomButton } from '../../components/CustomButton';

export default function PaymentMethodScreen() {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'paypal'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  const handleSave = () => {
    router.replace('/finance/checkout');
  };

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <View className="flex-row items-center px-4 py-3 border-b border-surface-variant bg-surface">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 justify-center">
          <Ionicons name="arrow-back" size={24} color="#1b1b20" />
        </TouchableOpacity>
        <Text className="font-headline-md text-on-surface font-bold text-xl ml-2 flex-1">
          Payment Method
        </Text>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} className="flex-1">
        <ScrollView className="flex-1 px-6 pt-6">
          <View className="flex-row gap-4 mb-8">
            <TouchableOpacity 
              onPress={() => setSelectedMethod('card')}
              className={`flex-1 p-4 rounded-xl border-2 items-center ${selectedMethod === 'card' ? 'bg-primary-fixed border-primary' : 'bg-surface border-outline-variant'}`}
            >
              <Ionicons name="card" size={32} color={selectedMethod === 'card' ? '#002da5' : '#747687'} className="mb-2" />
              <Text className={`font-headline-md font-bold ${selectedMethod === 'card' ? 'text-primary' : 'text-on-surface'}`}>Card</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={() => setSelectedMethod('paypal')}
              className={`flex-1 p-4 rounded-xl border-2 items-center ${selectedMethod === 'paypal' ? 'bg-primary-fixed border-primary' : 'bg-surface border-outline-variant'}`}
            >
              <Ionicons name="logo-paypal" size={32} color={selectedMethod === 'paypal' ? '#002da5' : '#747687'} className="mb-2" />
              <Text className={`font-headline-md font-bold ${selectedMethod === 'paypal' ? 'text-primary' : 'text-on-surface'}`}>PayPal</Text>
            </TouchableOpacity>
          </View>

          {selectedMethod === 'card' ? (
            <View className="gap-4 mb-8">
              <View>
                <Text className="font-label-bold text-on-surface mb-2">Card Number</Text>
                <TextInput
                  className="bg-surface-container-highest rounded-xl p-4 font-body-md text-on-surface border border-outline-variant"
                  placeholder="0000 0000 0000 0000"
                  placeholderTextColor="#747687"
                  keyboardType="numeric"
                  value={cardNumber}
                  onChangeText={setCardNumber}
                />
              </View>
              <View className="flex-row gap-4">
                <View className="flex-1">
                  <Text className="font-label-bold text-on-surface mb-2">Expiry Date</Text>
                  <TextInput
                    className="bg-surface-container-highest rounded-xl p-4 font-body-md text-on-surface border border-outline-variant"
                    placeholder="MM/YY"
                    placeholderTextColor="#747687"
                    value={expiry}
                    onChangeText={setExpiry}
                  />
                </View>
                <View className="flex-1">
                  <Text className="font-label-bold text-on-surface mb-2">CVC</Text>
                  <TextInput
                    className="bg-surface-container-highest rounded-xl p-4 font-body-md text-on-surface border border-outline-variant"
                    placeholder="123"
                    placeholderTextColor="#747687"
                    keyboardType="numeric"
                    secureTextEntry
                    value={cvc}
                    onChangeText={setCvc}
                  />
                </View>
              </View>
            </View>
          ) : (
            <View className="bg-surface-container-highest p-6 rounded-xl border border-outline-variant mb-8 items-center">
              <Text className="font-body-md text-on-surface text-center mb-4">
                You will be redirected to PayPal to complete your authorization securely.
              </Text>
              <Ionicons name="shield-checkmark" size={48} color="#002da5" />
            </View>
          )}
        </ScrollView>

        <View className="p-6 border-t border-surface-variant bg-surface">
          <CustomButton 
            title="Save Payment Method"
            onPress={handleSave}
            disabled={selectedMethod === 'card' && (!cardNumber || !expiry || !cvc)}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
