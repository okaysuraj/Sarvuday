import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CustomButton } from '../../components/CustomButton';

export default function PrivacySettingsScreen() {
  const router = useRouter();
  const [shareData, setShareData] = useState(true);
  const [allowAi, setAllowAi] = useState(true);

  const handleExport = () => {
    Alert.alert('Data Export', 'Your data export request has been submitted. A secure link will be emailed to you within 24 hours.');
  };

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <View className="flex-row items-center px-4 py-3 border-b border-surface-variant bg-surface">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 justify-center">
          <Ionicons name="arrow-back" size={24} color="#1b1b20" />
        </TouchableOpacity>
        <Text className="font-headline-md text-on-surface font-bold text-xl ml-2 flex-1">
          Privacy & Data
        </Text>
      </View>

      <ScrollView className="flex-1 px-6 pt-6">
        <Text className="font-body-md text-on-surface-variant mb-8">
          Manage how your data is used across SarvUday. We strictly adhere to HIPAA and GDPR guidelines.
        </Text>

        <Text className="font-headline-md text-on-surface text-lg font-bold mb-4">Data Sharing</Text>
        <View className="bg-surface-container-highest p-4 rounded-xl border border-outline-variant mb-4 flex-row justify-between items-center">
          <View className="flex-1 pr-4">
            <Text className="font-headline-md text-on-surface font-bold text-base mb-1">Clinical Research</Text>
            <Text className="font-body-md text-on-surface-variant text-xs">Allow fully anonymized data to be used in university mental health studies.</Text>
          </View>
          <Switch value={shareData} onValueChange={setShareData} trackColor={{ true: '#002da5' }} />
        </View>
        <View className="bg-surface-container-highest p-4 rounded-xl border border-outline-variant mb-8 flex-row justify-between items-center">
          <View className="flex-1 pr-4">
            <Text className="font-headline-md text-on-surface font-bold text-base mb-1">AI Personalization</Text>
            <Text className="font-body-md text-on-surface-variant text-xs">Allow local AI models to scan your journal entries to detect crisis triggers.</Text>
          </View>
          <Switch value={allowAi} onValueChange={setAllowAi} trackColor={{ true: '#002da5' }} />
        </View>

        <Text className="font-headline-md text-on-surface text-lg font-bold mb-4">Data Management</Text>
        <TouchableOpacity 
          onPress={handleExport}
          className="bg-surface-container-highest p-4 rounded-xl flex-row items-center justify-between border border-outline-variant mb-4"
        >
          <View className="flex-row items-center">
            <Ionicons name="download-outline" size={24} color="#1b1b20" className="mr-4" />
            <Text className="font-headline-md text-on-surface font-bold text-base">Export My Data</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#747687" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          className="bg-error-container p-4 rounded-xl flex-row items-center justify-between border border-error mb-8"
        >
          <View className="flex-row items-center">
            <Ionicons name="trash-outline" size={24} color="#ba1a1a" className="mr-4" />
            <Text className="font-headline-md text-error font-bold text-base">Delete Account</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#ba1a1a" />
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}
