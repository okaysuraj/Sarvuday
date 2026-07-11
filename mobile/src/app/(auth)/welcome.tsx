import React from 'react';
import { View, Text, Image, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { CustomButton } from '../../components/CustomButton';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <View className="flex-1 px-container-padding py-10 justify-between items-center">
        
        <View className="items-center mt-10">
          <Text className="font-headline-md text-primary text-3xl font-bold mb-2">
            SarvUday
          </Text>
          <Text className="font-body-md text-on-surface-variant text-base text-center px-4">
            Mental Wellness for Everyone. Begin your journey to better mental health today.
          </Text>
        </View>

        <View className="w-full flex-1 justify-center items-center">
          {/* Placeholder for illustration */}
          <View className="w-64 h-64 bg-primary-fixed-dim rounded-full justify-center items-center opacity-30 mb-8" />
        </View>

        <View className="w-full gap-4">
          <CustomButton
            title="Get Started"
            onPress={() => router.push('/(auth)/role-selection')}
            className="w-full"
          />
          <CustomButton
            title="I already have an account"
            variant="outline"
            onPress={() => router.push('/(auth)/login')}
            className="w-full"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
