import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CustomButton } from '../../components/CustomButton';

const LANGUAGES = [
  { id: 'en', name: 'English', native: 'English' },
  { id: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { id: 'es', name: 'Spanish', native: 'Español' },
  { id: 'fr', name: 'French', native: 'Français' },
  { id: 'mr', name: 'Marathi', native: 'मराठी' },
];

export default function LanguageSettingsScreen() {
  const router = useRouter();
  const [selectedLang, setSelectedLang] = useState('en');

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <View className="flex-row items-center px-4 py-3 border-b border-surface-variant bg-surface">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 justify-center">
          <Ionicons name="arrow-back" size={24} color="#1b1b20" />
        </TouchableOpacity>
        <Text className="font-headline-md text-on-surface font-bold text-xl ml-2 flex-1">
          Language
        </Text>
      </View>

      <ScrollView className="flex-1 px-6 pt-6">
        <Text className="font-headline-md text-on-surface text-lg font-bold mb-4">Select Application Language</Text>
        <View className="gap-2 mb-8">
          {LANGUAGES.map((lang) => (
            <TouchableOpacity 
              key={lang.id}
              onPress={() => setSelectedLang(lang.id)}
              className={`p-4 rounded-xl border flex-row justify-between items-center ${selectedLang === lang.id ? 'bg-primary-fixed border-primary' : 'bg-surface-container-highest border-outline-variant'}`}
            >
              <View>
                <Text className={`font-headline-md font-bold text-base ${selectedLang === lang.id ? 'text-primary' : 'text-on-surface'}`}>{lang.native}</Text>
                <Text className={`font-body-md text-sm ${selectedLang === lang.id ? 'text-on-primary-fixed-variant' : 'text-on-surface-variant'}`}>{lang.name}</Text>
              </View>
              {selectedLang === lang.id && (
                <Ionicons name="checkmark-circle" size={24} color="#002da5" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View className="p-6 border-t border-surface-variant bg-surface">
        <CustomButton 
          title="Save Changes"
          onPress={() => router.back()}
        />
      </View>
    </SafeAreaView>
  );
}
