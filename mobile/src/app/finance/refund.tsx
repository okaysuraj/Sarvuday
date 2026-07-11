import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CustomButton } from '../../components/CustomButton';

export default function RefundRequestScreen() {
  const router = useRouter();
  const [reason, setReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        'Request Submitted', 
        'Your refund request has been received. Our support team will contact you within 24-48 hours.', 
        [{ text: 'OK', onPress: () => router.back() }]
      );
    }, 1000);
  };

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <View className="flex-row items-center px-4 py-3 border-b border-surface-variant bg-surface">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 justify-center">
          <Ionicons name="close" size={24} color="#1b1b20" />
        </TouchableOpacity>
        <Text className="font-headline-md text-on-surface font-bold text-xl ml-2 flex-1">
          Request Refund
        </Text>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} className="flex-1">
        <ScrollView className="flex-1 px-6 pt-6">
          <Text className="font-headline-md text-on-surface text-lg font-bold mb-4">Select Transaction</Text>
          <View className="bg-surface-container-highest p-4 rounded-xl border border-outline-variant flex-row items-center justify-between mb-8">
            <View>
              <Text className="font-headline-md text-on-surface font-bold text-base mb-1">Session with Dr. Jenkins</Text>
              <Text className="font-body-md text-on-surface-variant text-sm">Oct 14, 2026</Text>
            </View>
            <Text className="font-headline-md text-on-surface font-bold">$80.00</Text>
          </View>

          <Text className="font-headline-md text-on-surface text-lg font-bold mb-4">Reason for Request</Text>
          <TextInput
            className="bg-surface-container-highest rounded-xl p-4 font-body-md text-on-surface border border-outline-variant min-h-[120px]"
            placeholder="Please explain why you are requesting a refund..."
            placeholderTextColor="#747687"
            multiline
            textAlignVertical="top"
            value={reason}
            onChangeText={setReason}
          />

          <View className="bg-error-container p-4 rounded-xl flex-row items-center border border-error mt-8">
            <Ionicons name="information-circle" size={20} color="#ba1a1a" className="mr-3" />
            <Text className="font-body-md text-on-error-container text-sm flex-1">
              Refunds are subject to our cancellation policy and take 5-10 business days to process once approved.
            </Text>
          </View>
        </ScrollView>

        <View className="p-6 border-t border-surface-variant bg-surface">
          <CustomButton 
            title="Submit Request"
            onPress={handleSubmit}
            disabled={!reason.trim()}
            isLoading={isLoading}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
