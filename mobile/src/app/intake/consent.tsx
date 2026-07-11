import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CustomButton } from '../../components/CustomButton';

export default function ConsentScreen() {
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <View className="flex-row items-center px-4 py-3 border-b border-surface-variant bg-surface">
        <Text className="font-headline-md text-on-surface font-bold text-xl ml-2 flex-1">
          Privacy & Consent
        </Text>
      </View>

      <ScrollView className="flex-1 px-6 pt-6">
        <Ionicons name="shield-checkmark" size={48} color="#002da5" className="mb-4" />
        <Text className="font-headline-md text-on-surface text-2xl font-bold mb-4">Your Data is Secure</Text>
        <Text className="font-body-md text-on-surface-variant mb-6 leading-6">
          SarvUday is strictly HIPAA compliant. We want to ensure you understand how your data is handled before we begin your intake process.
        </Text>

        <View className="bg-surface-container-highest p-4 rounded-xl border border-outline-variant mb-4">
          <Text className="font-headline-md text-on-surface font-bold mb-2">1. Medical Records</Text>
          <Text className="font-body-md text-on-surface-variant text-sm">
            Your clinical notes, chat history, and mood logs are encrypted end-to-end and can only be accessed by you and your matched therapist.
          </Text>
        </View>

        <View className="bg-surface-container-highest p-4 rounded-xl border border-outline-variant mb-4">
          <Text className="font-headline-md text-on-surface font-bold mb-2">2. AI Analysis</Text>
          <Text className="font-body-md text-on-surface-variant text-sm">
            Our AI uses anonymized data to flag potential crisis situations to your therapist. Your PII (Personally Identifiable Information) is never shared with third-party LLMs.
          </Text>
        </View>

        <View className="bg-surface-container-highest p-4 rounded-xl border border-outline-variant mb-8">
          <Text className="font-headline-md text-on-surface font-bold mb-2">3. Emergency Situations</Text>
          <Text className="font-body-md text-on-surface-variant text-sm">
            In the event of an imminent threat to life, we are legally required to contact local emergency services or your provided emergency contact.
          </Text>
        </View>

        <TouchableOpacity 
          onPress={() => setAgreed(!agreed)}
          className="flex-row items-center mb-8"
        >
          <View className={`w-6 h-6 rounded border-2 items-center justify-center mr-3 ${agreed ? 'bg-primary border-primary' : 'border-outline'}`}>
            {agreed && <Ionicons name="checkmark" size={16} color="#ffffff" />}
          </View>
          <Text className="font-body-md text-on-surface flex-1">
            I acknowledge and agree to the Privacy Policy and Terms of Service.
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <View className="p-6 border-t border-surface-variant bg-surface">
        <CustomButton 
          title="I Agree, Continue"
          onPress={() => router.push('/intake/profile')}
          disabled={!agreed}
        />
      </View>
    </SafeAreaView>
  );
}
