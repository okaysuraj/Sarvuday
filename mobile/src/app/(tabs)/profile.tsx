import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../store/authStore';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { 
        text: 'Logout', 
        style: 'destructive',
        onPress: () => {
          logout();
          router.replace('/(auth)/welcome');
        } 
      },
    ]);
  };

  const isTherapist = user?.role === 'therapist';

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 40 }}>
        <View className="items-center mb-8">
          <View className="w-24 h-24 rounded-full bg-primary-fixed-dim items-center justify-center mb-4">
            <Ionicons name="person" size={48} color="#002da5" />
          </View>
          <Text className="font-headline-md text-on-surface text-2xl font-bold">{user?.name || 'User Name'}</Text>
          <Text className="font-body-md text-on-surface-variant text-sm mt-1">{user?.email || 'user@example.com'}</Text>
          
          {isTherapist && (
            <View className="bg-tertiary-fixed px-3 py-1 rounded-full mt-3">
              <Text className="text-on-tertiary-fixed font-label-bold text-xs">Verified Therapist</Text>
            </View>
          )}
        </View>

        <View className="gap-4">
          <Text className="font-headline-md text-on-surface text-lg font-bold mb-2 mt-4">Settings</Text>
          
          <TouchableOpacity className="bg-surface-container-highest p-4 rounded-xl flex-row items-center border border-outline-variant">
            <Ionicons name="person-outline" size={24} color="#1b1b20" className="mr-4" />
            <View className="flex-1 ml-4">
              <Text className="font-headline-md text-on-surface font-bold">Edit Profile</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#747687" />
          </TouchableOpacity>

          <TouchableOpacity className="bg-surface-container-highest p-4 rounded-xl flex-row items-center border border-outline-variant">
            <Ionicons name="lock-closed-outline" size={24} color="#1b1b20" className="mr-4" />
            <View className="flex-1 ml-4">
              <Text className="font-headline-md text-on-surface font-bold">Privacy & Security</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#747687" />
          </TouchableOpacity>

          <TouchableOpacity className="bg-surface-container-highest p-4 rounded-xl flex-row items-center border border-outline-variant">
            <Ionicons name="notifications-outline" size={24} color="#1b1b20" className="mr-4" />
            <View className="flex-1 ml-4">
              <Text className="font-headline-md text-on-surface font-bold">Notifications</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#747687" />
          </TouchableOpacity>

          {isTherapist && (
            <TouchableOpacity onPress={() => router.push('/therapist/earnings')} className="bg-surface-container-highest p-4 rounded-xl flex-row items-center border border-outline-variant">
              <Ionicons name="wallet-outline" size={24} color="#1b1b20" className="mr-4" />
              <View className="flex-1 ml-4">
                <Text className="font-headline-md text-on-surface font-bold">Earnings & Payouts</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#747687" />
            </TouchableOpacity>
          )}

          <TouchableOpacity 
            onPress={handleLogout}
            className="bg-error-container p-4 rounded-xl flex-row items-center border border-error mt-4"
          >
            <Ionicons name="log-out-outline" size={24} color="#ba1a1a" className="mr-4" />
            <View className="flex-1 ml-4">
              <Text className="font-headline-md text-error font-bold">Logout</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
