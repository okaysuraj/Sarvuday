import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function PreferencesSetupScreen() {
  const router = useRouter();
  const [language, setLanguage] = useState('en');
  const [therapyType, setTherapyType] = useState('individual');
  const [sessionReminders, setSessionReminders] = useState(true);
  const [dailyCheckins, setDailyCheckins] = useState(true);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  const languages = [
    { id: 'en', label: 'English' },
    { id: 'hi', label: 'Hindi (हिंदी)' },
    { id: 'mr', label: 'Marathi (मराठी)' },
    { id: 'gu', label: 'Gujarati (ગુજરાતી)' },
    { id: 'bn', label: 'Bengali (বাংলা)' },
  ];

  return (
    <View className="flex-1 bg-cream-bg">
      {/* TopAppBar */}
      <View className="w-full flex-row items-center justify-between px-4 py-4 h-16 bg-cream-bg border-b-[1.5px] border-ink-black z-50">
        <View className="flex-row items-center gap-4">
          <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full hover:bg-surface-container items-center justify-center">
            <Ionicons name="arrow-back" size={24} color="#002da5" />
          </TouchableOpacity>
          <Text className="font-headline-md font-bold text-primary text-xl">SarvUday</Text>
        </View>
      </View>

      <ScrollView className="flex-1 px-4 md:px-10 py-8 max-w-4xl mx-auto w-full" contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Progress Indicator */}
        <View className="flex-row items-center gap-4 mb-8">
          <View className="flex-1 h-3 bg-surface-variant rounded-full border-[1.5px] border-ink-black overflow-hidden flex-row">
            <View className="h-full bg-accent-orange border-r-[1.5px] border-ink-black" style={{ width: '100%' }} />
          </View>
          <Text className="font-label-bold text-ink-black font-bold">Step 8 of 8</Text>
        </View>

        <View className="mb-8 text-center md:text-left">
          <Text className="font-display-lg-mobile md:font-display-lg text-ink-black font-bold text-3xl mb-2">Final Touches</Text>
          <Text className="font-body-lg text-on-surface-variant text-base">Let's set your preferences so we can tailor the experience to you.</Text>
        </View>

        <View className="flex-col gap-6 mb-8">
          
          {/* Language Selection */}
          <View className="bg-white rounded-[24px] border-[1.5px] border-ink-black p-8 relative z-20">
            <View className="flex-row items-center gap-2 mb-2">
              <Ionicons name="globe" size={24} color="#1A1A1A" />
              <Text className="font-headline-sm text-ink-black font-bold text-xl">Preferred Language</Text>
            </View>
            <Text className="font-body-md text-on-surface-variant mb-6 text-base">Choose the language you are most comfortable with.</Text>
            
            <View className="relative">
              <TouchableOpacity 
                onPress={() => setShowLanguageDropdown(!showLanguageDropdown)}
                className="w-full bg-surface-bright border-[1.5px] border-ink-black rounded-xl px-4 py-4 flex-row justify-between items-center"
              >
                <Text className="font-body-lg text-ink-black text-base">{languages.find(l => l.id === language)?.label}</Text>
                <Ionicons name={showLanguageDropdown ? "chevron-up" : "chevron-down"} size={24} color="#1A1A1A" />
              </TouchableOpacity>
              
              {showLanguageDropdown && (
                <View className="absolute top-[60px] w-full bg-white border-[1.5px] border-ink-black rounded-xl overflow-hidden shadow-[4px_4px_0px_0px_#1A1A1A]">
                  {languages.map(lang => (
                    <TouchableOpacity 
                      key={lang.id}
                      onPress={() => {
                        setLanguage(lang.id);
                        setShowLanguageDropdown(false);
                      }}
                      className={`px-4 py-4 border-b border-ink-black/10 ${language === lang.id ? 'bg-secondary-container' : 'bg-white'}`}
                    >
                      <Text className="font-body-lg text-ink-black">{lang.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </View>

          {/* Therapy Type Selection */}
          <View className="relative z-10">
            <View className="flex-row items-center gap-2 mb-2">
              <Ionicons name="medical" size={24} color="#1A1A1A" />
              <Text className="font-headline-sm text-ink-black font-bold text-xl">Preferred Therapy Type</Text>
            </View>
            <Text className="font-body-md text-on-surface-variant mb-6 text-base">You can always change this later in your settings.</Text>
            
            <View className="flex-col md:flex-row gap-4">
              
              <TouchableOpacity 
                onPress={() => setTherapyType('individual')}
                className={`flex-1 rounded-[24px] border-[1.5px] border-ink-black p-6 flex-col items-center text-center transition-all ${therapyType === 'individual' ? 'bg-secondary-fixed shadow-[0px_0px_0px_0px_#1A1A1A] translate-x-[2px] translate-y-[2px]' : 'bg-accent-pink shadow-[4px_4px_0px_0px_#1A1A1A]'}`}
              >
                <Ionicons name="person" size={40} color="#1A1A1A" className="mb-4" />
                <Text className="font-headline-sm text-ink-black font-bold text-xl mb-2 mt-4">Individual</Text>
                <Text className="font-body-md text-on-surface-variant text-center">One-on-one sessions tailored to you.</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={() => setTherapyType('group')}
                className={`flex-1 rounded-[24px] border-[1.5px] border-ink-black p-6 flex-col items-center text-center transition-all ${therapyType === 'group' ? 'bg-secondary-fixed shadow-[0px_0px_0px_0px_#1A1A1A] translate-x-[2px] translate-y-[2px]' : 'bg-accent-sage shadow-[4px_4px_0px_0px_#1A1A1A]'}`}
              >
                <Ionicons name="people" size={40} color="#1A1A1A" className="mb-4" />
                <Text className="font-headline-sm text-ink-black font-bold text-xl mb-2 mt-4">Group</Text>
                <Text className="font-body-md text-on-surface-variant text-center">Connect and heal with a supportive community.</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={() => setTherapyType('ai')}
                className={`flex-1 rounded-[24px] border-[1.5px] border-ink-black p-6 flex-col items-center text-center transition-all ${therapyType === 'ai' ? 'bg-secondary-fixed shadow-[0px_0px_0px_0px_#1A1A1A] translate-x-[2px] translate-y-[2px]' : 'bg-primary-fixed shadow-[4px_4px_0px_0px_#1A1A1A]'}`}
              >
                <Ionicons name="hardware-chip" size={40} color="#1A1A1A" className="mb-4" />
                <Text className="font-headline-sm text-ink-black font-bold text-xl mb-2 mt-4">AI Chat</Text>
                <Text className="font-body-md text-on-surface-variant text-center">24/7 support from our intelligent companion.</Text>
              </TouchableOpacity>

            </View>
          </View>

          {/* Notification Settings */}
          <View className="bg-white rounded-[24px] border-[1.5px] border-ink-black p-8 relative z-10">
            <View className="flex-row items-center gap-2 mb-2">
              <Ionicons name="notifications" size={24} color="#1A1A1A" />
              <Text className="font-headline-sm text-ink-black font-bold text-xl">Notification Settings</Text>
            </View>
            <Text className="font-body-md text-on-surface-variant mb-6 text-base">Control how we communicate with you.</Text>
            
            <View className="flex-col gap-6">
              
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="font-label-bold text-ink-black font-bold mb-1 text-base">Session Reminders</Text>
                  <Text className="font-body-md text-on-surface-variant">Get notified 24 hours before your session.</Text>
                </View>
                <Switch
                  trackColor={{ false: "#e4e1e8", true: "#002da5" }}
                  thumbColor={sessionReminders ? "#ffffff" : "#ffffff"}
                  ios_backgroundColor="#e4e1e8"
                  onValueChange={setSessionReminders}
                  value={sessionReminders}
                  style={{ transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }] }}
                />
              </View>

              <View className="border-t-[1.5px] border-ink-black opacity-20" />

              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="font-label-bold text-ink-black font-bold mb-1 text-base">Daily Check-ins</Text>
                  <Text className="font-body-md text-on-surface-variant">A quick prompt to log your mood.</Text>
                </View>
                <Switch
                  trackColor={{ false: "#e4e1e8", true: "#002da5" }}
                  thumbColor={dailyCheckins ? "#ffffff" : "#ffffff"}
                  ios_backgroundColor="#e4e1e8"
                  onValueChange={setDailyCheckins}
                  value={dailyCheckins}
                  style={{ transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }] }}
                />
              </View>

            </View>
          </View>

        </View>

        {/* Action Area */}
        <View className="flex-row justify-end mb-8">
          <TouchableOpacity 
            onPress={() => router.push('/patient/dashboard')}
            className="bg-primary px-8 py-4 rounded-xl border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex-row items-center gap-2"
          >
            <Text className="text-white font-label-bold font-bold text-lg">Complete Onboarding</Text>
            <Ionicons name="checkmark-circle" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}
