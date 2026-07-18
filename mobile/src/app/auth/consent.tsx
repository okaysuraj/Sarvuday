import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ConsentPrivacyAgreementScreen() {
  const router = useRouter();
  const [tosAccepted, setTosAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const canContinue = tosAccepted && privacyAccepted;

  return (
    <View className="flex-1 bg-cream-bg">
      {/* Header */}
      <View className="flex-row justify-between items-center px-4 py-4 w-full sticky top-0 z-50 bg-surface border-b-[1.5px] border-ink-black">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center rounded-full hover:bg-surface-variant/20">
          <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <Text className="font-headline-sm-mobile text-primary font-bold text-lg">SarvUday</Text>
        <View className="w-10 h-10" />
      </View>

      <View className="flex-1 px-4 py-6 flex-col gap-6 relative max-w-lg mx-auto w-full">
        
        {/* Title Section */}
        <View className="items-center text-center">
          <Text className="font-display-lg-mobile text-ink-black font-bold text-4xl mb-2 text-center">Almost there!</Text>
          <Text className="text-on-surface-variant text-base text-center">Please review our terms before continuing your journey.</Text>
        </View>

        {/* Privacy Policy Container */}
        <View className="bg-surface-container-lowest rounded-xl border-[1.5px] border-ink-black flex-1 flex-col overflow-hidden shadow-[4px_4px_0px_0px_#1A1A1A]">
          <View className="bg-primary-fixed border-b-[1.5px] border-ink-black py-3 px-4 flex-row items-center justify-between">
            <Text className="font-label-bold text-on-primary-fixed font-bold">Privacy & Terms</Text>
            <Ionicons name="document-text" size={20} color="#001356" />
          </View>
          
          <ScrollView className="flex-1 p-6" showsVerticalScrollIndicator={true}>
            <Text className="mb-4 font-bold text-ink-black">1. Data Collection</Text>
            <Text className="mb-6 text-on-surface-variant">We prioritize your mental privacy. We only collect essential data required to provide you with personalized support. This includes your daily check-ins, mood logs, and interaction history with our AI.</Text>
            
            <Text className="mb-4 font-bold text-ink-black">2. Data Usage</Text>
            <Text className="mb-6 text-on-surface-variant">Your data is strictly used to improve your personal experience. We do not sell, rent, or share your personal health information with third-party advertisers under any circumstances.</Text>
            
            <Text className="mb-4 font-bold text-ink-black">3. Anonymization</Text>
            <Text className="mb-6 text-on-surface-variant">Any data used for improving our AI models is thoroughly anonymized and aggregated, ensuring it cannot be traced back to your individual account.</Text>
            
            <Text className="mb-4 font-bold text-ink-black">4. Your Rights</Text>
            <Text className="mb-6 text-on-surface-variant">You maintain full control over your data. You can request a complete export or deletion of your account and all associated records at any time through the app settings.</Text>
            
            <Text className="mb-4 font-bold text-ink-black">5. Security</Text>
            <Text className="mb-6 text-on-surface-variant">We employ industry-standard encryption protocols (end-to-end where possible) to protect your sensitive information during transmission and storage.</Text>
            <View className="h-4" />
          </ScrollView>
        </View>

        {/* Checkbox Stickers */}
        <View className="flex-col gap-3 mt-2">
          
          <TouchableOpacity 
            onPress={() => setTosAccepted(!tosAccepted)}
            className="flex-row items-start gap-3 p-4 bg-surface-container-lowest rounded-xl border-[1.5px] border-ink-black active:bg-surface-container-low"
          >
            <View className="pt-1">
              <View className={`w-6 h-6 border-[1.5px] border-ink-black rounded items-center justify-center ${tosAccepted ? 'bg-secondary-container' : 'bg-white'}`}>
                {tosAccepted && <Ionicons name="checkmark" size={18} color="#1A1A1A" />}
              </View>
            </View>
            <View className="flex-1">
              <Text className="font-label-md text-ink-black">I agree to the Terms of Service</Text>
              <Text className="text-xs text-on-surface-variant mt-1">Required to use the application</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => setPrivacyAccepted(!privacyAccepted)}
            className="flex-row items-start gap-3 p-4 bg-surface-container-lowest rounded-xl border-[1.5px] border-ink-black active:bg-surface-container-low"
          >
            <View className="pt-1">
              <View className={`w-6 h-6 border-[1.5px] border-ink-black rounded items-center justify-center ${privacyAccepted ? 'bg-accent-pink' : 'bg-white'}`}>
                {privacyAccepted && <Ionicons name="checkmark" size={18} color="#1A1A1A" />}
              </View>
            </View>
            <View className="flex-1">
              <Text className="font-label-md text-ink-black">I agree to the Privacy Policy</Text>
              <Text className="text-xs text-on-surface-variant mt-1">Includes data processing consent</Text>
            </View>
          </TouchableOpacity>

        </View>

        {/* Action Button */}
        <View className="mt-auto pt-4 pb-8">
          <TouchableOpacity 
            disabled={!canContinue}
            onPress={() => router.push('/auth/profile_setup')}
            className={`w-full py-4 rounded-xl border-[1.5px] border-ink-black flex-row justify-center items-center gap-2 transition-all ${
              canContinue 
                ? 'bg-primary shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none' 
                : 'bg-primary opacity-50'
            }`}
          >
            <Text className="font-label-bold text-white font-bold text-base">Accept & Continue</Text>
            <Ionicons name="arrow-forward" size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
}
