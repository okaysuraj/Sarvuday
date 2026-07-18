import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function PrivacySettingsScreen() {
  const router = useRouter();
  const [incognito, setIncognito] = useState(false);
  const [shareTherapist, setShareTherapist] = useState(true);

  return (
    <View className="flex-1 bg-cream-bg">
      {/* TopAppBar */}
      <View className="flex-row justify-between items-center px-4 py-4 w-full z-50 bg-cream-bg border-b-[1.5px] border-ink-black sticky top-0">
        <View className="flex-row items-center gap-4">
          <TouchableOpacity onPress={() => router.back()} className="hover:bg-surface-container-low p-2 rounded-full active:translate-x-[2px] active:translate-y-[2px]">
            <Ionicons name="arrow-back" size={24} color="#002da5" />
          </TouchableOpacity>
          <Text className="font-headline-md text-primary font-bold text-xl tracking-tight">Privacy & Security</Text>
        </View>
        <View className="w-10 h-10 rounded-full border-[1.5px] border-ink-black overflow-hidden bg-accent-sage items-center justify-center">
          <Ionicons name="person" size={24} color="#1b1b20" />
        </View>
      </View>

      <ScrollView className="flex-1 px-4 md:px-10 py-8 max-w-4xl mx-auto w-full" contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Intro Hero Sticker */}
        <View className="bg-primary-fixed border-[1.5px] border-ink-black rounded-[32px] p-8 md:p-10 shadow-[4px_4px_0px_0px_#1A1A1A] relative overflow-hidden mb-8">
          <View className="relative z-10 flex-col md:flex-row md:items-center justify-between gap-6">
            <View className="max-w-md">
              <Text className="font-headline-sm text-on-primary-fixed font-bold text-2xl mb-2">Your Data, Your Control</Text>
              <Text className="font-body-md text-on-primary-fixed-variant text-base">
                Manage how your information is used within the SarvUday ecosystem. We prioritize your mental health journey's confidentiality above all.
              </Text>
            </View>
            <View className="w-24 h-24 bg-secondary-container border-[1.5px] border-ink-black rounded-2xl items-center justify-center rotate-3">
              <Ionicons name="lock-closed" size={40} color="#715b00" />
            </View>
          </View>
        </View>

        {/* Privacy Controls Grid */}
        <View className="flex-col md:flex-row gap-6 mb-8">
          {/* Incognito Mode Sticker */}
          <View className="flex-1 bg-accent-pink border-[1.5px] border-ink-black rounded-[40px] p-8 flex-col justify-between">
            <View>
              <View className="flex-row items-center gap-3 mb-4">
                <Ionicons name="eye-off" size={24} color="#5a3039" />
                <Text className="font-label-bold uppercase tracking-wider text-tertiary font-bold">Visibility</Text>
              </View>
              <Text className="font-headline-sm text-ink-black font-bold text-xl mb-2">Incognito Mode</Text>
              <Text className="font-body-md text-ink-black mb-6 opacity-80 text-base">
                Post in the community anonymously. Your profile picture and name will be hidden from other users.
              </Text>
            </View>
            <View className="flex-row items-center justify-between bg-white/40 p-4 rounded-2xl border-[1.5px] border-ink-black">
              <Text className="font-label-md text-ink-black font-bold">Enable Anonymity</Text>
              <Switch
                trackColor={{ false: "#e4e1e8", true: "#002da5" }}
                thumbColor={incognito ? "#ffffff" : "#ffffff"}
                ios_backgroundColor="#e4e1e8"
                onValueChange={setIncognito}
                value={incognito}
                style={{ transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }] }}
              />
            </View>
          </View>

          {/* Share Data Sticker */}
          <View className="flex-1 bg-accent-sage border-[1.5px] border-ink-black rounded-[40px] p-8 flex-col justify-between">
            <View>
              <View className="flex-row items-center gap-3 mb-4">
                <Ionicons name="medical" size={24} color="#002da5" />
                <Text className="font-label-bold uppercase tracking-wider text-primary font-bold">Therapeutic Care</Text>
              </View>
              <Text className="font-headline-sm text-ink-black font-bold text-xl mb-2">Share with Therapist</Text>
              <Text className="font-body-md text-ink-black mb-6 opacity-80 text-base">
                Allow your assigned therapist to view your daily mood logs and community interactions for better support.
              </Text>
            </View>
            <View className="flex-row items-center justify-between bg-white/40 p-4 rounded-2xl border-[1.5px] border-ink-black">
              <Text className="font-label-md text-ink-black font-bold">Share Data</Text>
              <Switch
                trackColor={{ false: "#e4e1e8", true: "#002da5" }}
                thumbColor={shareTherapist ? "#ffffff" : "#ffffff"}
                ios_backgroundColor="#e4e1e8"
                onValueChange={setShareTherapist}
                value={shareTherapist}
                style={{ transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }] }}
              />
            </View>
          </View>
        </View>

        {/* Security Settings Section */}
        <View className="bg-white border-[1.5px] border-ink-black rounded-[40px] p-8 flex-col gap-6 mb-8">
          <View className="flex-row items-center gap-3 mb-2">
            <View className="w-10 h-10 bg-secondary-fixed rounded-xl border-[1.5px] border-ink-black items-center justify-center">
              <Ionicons name="shield-checkmark" size={24} color="#231b00" />
            </View>
            <Text className="font-headline-sm text-ink-black font-bold text-xl">Security Preferences</Text>
          </View>

          {/* 2FA Item */}
          <TouchableOpacity className="flex-row items-center justify-between p-6 bg-surface-container-low rounded-3xl border-[1.5px] border-ink-black active:bg-surface-container">
            <View className="flex-row items-center gap-4">
              <Ionicons name="phone-portrait" size={24} color="#002da5" />
              <View>
                <Text className="font-label-bold text-ink-black font-bold text-base">Two-Factor Authentication</Text>
                <Text className="font-body-md text-on-surface-variant text-sm mt-1">Add an extra layer of security</Text>
              </View>
            </View>
            <View className="bg-white border-[1.5px] border-ink-black px-6 py-2 rounded-xl shadow-[2px_2px_0px_0px_#1A1A1A]">
              <Text className="font-label-bold text-ink-black font-bold">Configure</Text>
            </View>
          </TouchableOpacity>

          {/* Password Change Item */}
          <TouchableOpacity className="flex-row items-center justify-between p-6 bg-surface-container-low rounded-3xl border-[1.5px] border-ink-black active:bg-surface-container">
            <View className="flex-row items-center gap-4">
              <Ionicons name="key" size={24} color="#002da5" />
              <View>
                <Text className="font-label-bold text-ink-black font-bold text-base">Change Password</Text>
                <Text className="font-body-md text-on-surface-variant text-sm mt-1">Last changed 3 months ago</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#1b1b20" />
          </TouchableOpacity>

          {/* Log Out Other Devices */}
          <TouchableOpacity className="flex-row items-center justify-between p-6 bg-surface-container-low rounded-3xl border-[1.5px] border-ink-black active:bg-surface-container">
            <View className="flex-row items-center gap-4">
              <Ionicons name="desktop" size={24} color="#002da5" />
              <View>
                <Text className="font-label-bold text-ink-black font-bold text-base">Logged Devices</Text>
                <Text className="font-body-md text-on-surface-variant text-sm mt-1">You are logged into 3 active devices</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#1b1b20" />
          </TouchableOpacity>
        </View>

        {/* Danger Zone */}
        <View className="border-[1.5px] border-ink-black border-dashed rounded-[40px] p-8 bg-error-container/20">
          <View className="flex-row items-center gap-2 mb-6">
            <Ionicons name="warning" size={20} color="#ba1a1a" />
            <Text className="font-label-bold text-error uppercase font-bold tracking-wider">Danger Zone</Text>
          </View>
          <View className="flex-col md:flex-row items-center justify-between gap-6">
            <View className="flex-1">
              <Text className="font-headline-sm text-error font-bold text-xl mb-2">Delete Account</Text>
              <Text className="font-body-md text-on-surface-variant">Permanently remove all your health data, logs, and community history. This action cannot be undone.</Text>
            </View>
            <TouchableOpacity onPress={() => router.push('/patient/delete_account')} className="bg-error border-[1.5px] border-ink-black px-8 py-3 rounded-2xl shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none w-full md:w-auto items-center">
              <Text className="text-white font-label-bold font-bold">Request Deletion</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>

      {/* BottomNavBar */}
      <View className="absolute bottom-0 w-full z-50 flex-row justify-around items-center px-4 py-2 bg-cream-bg border-t-[1.5px] border-ink-black pb-8">
        <TouchableOpacity onPress={() => router.push('/patient/dashboard')} className="flex-col items-center justify-center p-2">
          <Ionicons name="home" size={24} color="#434655" />
          <Text className="font-label-md text-on-surface-variant mt-1">Home</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center p-2">
          <Ionicons name="stats-chart" size={24} color="#434655" />
          <Text className="font-label-md text-on-surface-variant mt-1">Insights</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center p-2">
          <Ionicons name="people" size={24} color="#434655" />
          <Text className="font-label-md text-on-surface-variant mt-1">Community</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center bg-secondary-container rounded-xl border-[1.5px] border-ink-black px-4 py-1">
          <Ionicons name="person" size={24} color="#715b00" />
          <Text className="font-label-md text-on-secondary-container font-bold mt-1">Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
