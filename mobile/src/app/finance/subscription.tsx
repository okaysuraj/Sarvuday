import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CustomButton } from '../../components/CustomButton';

const PLANS = [
  { id: 'basic', name: 'Basic Plan', price: '$29/mo', features: ['AI Companion Access', 'Mood Tracking', 'Community Forums'] },
  { id: 'premium', name: 'Premium Plan', price: '$99/mo', features: ['Everything in Basic', '2 Therapy Sessions/mo', 'Priority Support'] },
];

export default function SubscriptionScreen() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState('basic');

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <View className="flex-row items-center px-4 py-3 border-b border-surface-variant bg-surface">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 justify-center">
          <Ionicons name="arrow-back" size={24} color="#1b1b20" />
        </TouchableOpacity>
        <Text className="font-headline-md text-on-surface font-bold text-xl ml-2 flex-1">
          Subscription Plans
        </Text>
      </View>

      <ScrollView className="flex-1 px-6 pt-6">
        <Text className="font-headline-md text-on-surface text-2xl font-bold mb-8 text-center">
          Choose the right plan for your mental wellness journey.
        </Text>

        <View className="gap-4 mb-8">
          {PLANS.map(plan => (
            <TouchableOpacity
              key={plan.id}
              onPress={() => setSelectedPlan(plan.id)}
              className={`p-6 rounded-2xl border-2 ${
                selectedPlan === plan.id ? 'bg-primary-fixed border-primary' : 'bg-surface-container-highest border-outline-variant'
              }`}
            >
              <View className="flex-row justify-between items-center mb-4">
                <Text className={`font-headline-md font-bold text-xl ${selectedPlan === plan.id ? 'text-primary' : 'text-on-surface'}`}>
                  {plan.name}
                </Text>
                {selectedPlan === plan.id && (
                  <Ionicons name="checkmark-circle" size={24} color="#002da5" />
                )}
              </View>
              <Text className={`font-headline-md font-bold text-3xl mb-4 ${selectedPlan === plan.id ? 'text-on-primary-fixed' : 'text-on-surface'}`}>
                {plan.price}
              </Text>
              
              <View className="gap-2">
                {plan.features.map((feature, idx) => (
                  <View key={idx} className="flex-row items-center">
                    <Ionicons name="checkmark" size={16} color={selectedPlan === plan.id ? "#002da5" : "#747687"} className="mr-2" />
                    <Text className={`font-body-md ${selectedPlan === plan.id ? 'text-on-primary-fixed-variant' : 'text-on-surface-variant'}`}>
                      {feature}
                    </Text>
                  </View>
                ))}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View className="p-6 border-t border-surface-variant bg-surface">
        <CustomButton 
          title="Continue"
          onPress={() => router.push('/finance/payment-method')}
        />
      </View>
    </SafeAreaView>
  );
}
