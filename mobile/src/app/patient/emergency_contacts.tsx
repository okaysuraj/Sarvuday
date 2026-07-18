import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EmergencyContactsScreen() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await AsyncStorage.getItem('access_token');
        const res = await fetch('http://10.0.2.2:8000/normal_user/dashboard/profile', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const json = await res.json();
          setProfile(json);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const emergencyName = profile?.emergency_contact_name || 'Ananya Sharma';
  const emergencyRelation = profile?.emergency_contact_relation || 'Sister';
  const emergencyPhone = profile?.emergency_contact_phone || '+91 98765-43210';
  
  if (loading) {
    return (
      <View className="flex-1 bg-cream-bg items-center justify-center">
        <ActivityIndicator size="large" color="#002da5" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-cream-bg">
      {/* TopAppBar */}
      <View className="flex-row justify-between items-center px-4 py-4 w-full z-50 bg-cream-bg border-b-[1.5px] border-ink-black sticky top-0">
        <View className="flex-row items-center gap-4">
          <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center rounded-full hover:bg-surface-container-low border-[1.5px] border-transparent">
            <Ionicons name="arrow-back" size={24} color="#002da5" />
          </TouchableOpacity>
          <Text className="font-headline-md text-primary font-bold text-xl tracking-tight">SarvUday</Text>
        </View>
        <View className="w-10 h-10 rounded-full border-[1.5px] border-ink-black overflow-hidden bg-accent-sage items-center justify-center">
          <Ionicons name="person" size={24} color="#1b1b20" />
        </View>
      </View>

      <ScrollView className="flex-1 px-4 md:px-10 py-8 max-w-4xl mx-auto w-full" contentContainerStyle={{ paddingBottom: 100 }}>
        
        <View className="mb-12">
          <Text className="font-display-lg-mobile md:font-display-lg text-ink-black font-bold text-3xl mb-2">Emergency Contacts</Text>
          <Text className="font-body-lg text-on-surface-variant text-lg max-w-lg">Manage your trusted circle. These contacts will be notified in case of a mental health emergency.</Text>
        </View>

        {/* Contacts Container */}
        <View className="flex-col md:flex-row flex-wrap gap-6">
          
          {/* Primary Contact Sticker */}
          <View className="flex-1 min-w-[300px] bg-white border-[1.5px] border-ink-black rounded-[32px] p-8 shadow-[4px_4px_0px_0px_#1A1A1A] flex-col justify-between mb-4 md:mb-0">
            <View>
              <View className="flex-row items-center justify-between mb-6">
                <View className="bg-secondary-container border-[1.5px] border-ink-black px-4 py-1 rounded-full">
                  <Text className="font-label-bold text-on-secondary-fixed font-bold text-xs tracking-wider">PRIMARY</Text>
                </View>
                <Ionicons name="checkmark-circle" size={24} color="#002da5" />
              </View>
              
              <View className="flex-row items-center gap-4 mb-6">
                <View className="w-16 h-16 rounded-2xl border-[1.5px] border-ink-black bg-accent-pink items-center justify-center overflow-hidden">
                  <Ionicons name="person" size={32} color="#5a3039" />
                </View>
                <View>
                  <Text className="font-headline-sm text-ink-black font-bold text-xl">{emergencyName}</Text>
                  <Text className="font-body-md text-on-surface-variant text-base">{emergencyRelation}</Text>
                </View>
              </View>
              
              <View className="flex-col gap-2 mb-8">
                <View className="flex-row items-center gap-2">
                  <Ionicons name="call" size={16} color="#1b1b20" />
                  <Text className="font-label-md text-ink-black">{emergencyPhone}</Text>
                </View>
                <View className="flex-row items-center gap-2">
                  <Ionicons name="mail" size={16} color="#1b1b20" />
                  <Text className="font-label-md text-ink-black">Contact email pending</Text>
                </View>
              </View>
            </View>
            
            <View className="flex-row gap-4">
              <TouchableOpacity className="flex-1 bg-primary border-[1.5px] border-ink-black shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none px-4 py-3 rounded-xl flex-row items-center justify-center gap-2">
                <Ionicons name="call" size={18} color="#ffffff" />
                <Text className="text-white font-label-bold font-bold">Call</Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 bg-white border-[1.5px] border-ink-black shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none px-4 py-3 rounded-xl flex-row items-center justify-center gap-2">
                <Ionicons name="pencil" size={18} color="#1A1A1A" />
                <Text className="text-ink-black font-label-bold font-bold">Edit</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Secondary Contact Sticker */}
          <View className="flex-1 min-w-[300px] bg-accent-sage border-[1.5px] border-ink-black rounded-[32px] p-8 shadow-[4px_4px_0px_0px_#1A1A1A] flex-col justify-between mb-4 md:mb-0">
            <View>
              <View className="flex-row items-center justify-between mb-6">
                <View className="bg-white border-[1.5px] border-ink-black px-4 py-1 rounded-full">
                  <Text className="font-label-bold text-ink-black font-bold text-xs tracking-wider">SECONDARY</Text>
                </View>
              </View>
              
              <View className="flex-row items-center gap-4 mb-6">
                <View className="w-16 h-16 rounded-2xl border-[1.5px] border-ink-black bg-secondary-container items-center justify-center overflow-hidden">
                  <Ionicons name="person" size={32} color="#725c00" />
                </View>
                <View>
                  <Text className="font-headline-sm text-ink-black font-bold text-xl">Dr. Rohan Varma</Text>
                  <Text className="font-body-md text-on-surface-variant text-base">Therapist</Text>
                </View>
              </View>
              
              <View className="flex-col gap-2 mb-8">
                <View className="flex-row items-center gap-2">
                  <Ionicons name="call" size={16} color="#1b1b20" />
                  <Text className="font-label-md text-ink-black">+91 91234-56789</Text>
                </View>
                <View className="flex-row items-center gap-2">
                  <Ionicons name="business" size={16} color="#1b1b20" />
                  <Text className="font-label-md text-ink-black">Mind Wellness Clinic</Text>
                </View>
              </View>
            </View>
            
            <View className="flex-row gap-4">
              <TouchableOpacity className="flex-1 bg-primary border-[1.5px] border-ink-black shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none px-4 py-3 rounded-xl flex-row items-center justify-center gap-2">
                <Ionicons name="call" size={18} color="#ffffff" />
                <Text className="text-white font-label-bold font-bold">Call</Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 bg-white border-[1.5px] border-ink-black shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none px-4 py-3 rounded-xl flex-row items-center justify-center gap-2">
                <Ionicons name="pencil" size={18} color="#1A1A1A" />
                <Text className="text-ink-black font-label-bold font-bold">Edit</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Empty Slot / Add New Sticker */}
          <TouchableOpacity className="flex-1 min-w-[300px] bg-cream-bg border-[1.5px] border-ink-black border-dashed rounded-[32px] p-8 flex-col items-center justify-center min-h-[320px] active:bg-surface-container-low mb-4 md:mb-0">
            <View className="w-20 h-20 rounded-full bg-white border-[1.5px] border-ink-black items-center justify-center mb-6 shadow-[2px_2px_0px_0px_#1A1A1A]">
              <Ionicons name="add" size={40} color="#002da5" />
            </View>
            <Text className="font-headline-sm text-ink-black font-bold text-xl mb-2">Add New Contact</Text>
            <Text className="font-body-md text-on-surface-variant text-center px-4">Increase your support network by adding a backup contact.</Text>
          </TouchableOpacity>

          {/* Safety Guidelines Bento Card */}
          <View className="flex-1 min-w-[300px] bg-accent-orange border-[1.5px] border-ink-black rounded-[32px] p-8 flex-col justify-center mb-4 md:mb-0">
            <View className="flex-row items-center gap-2 mb-4">
              <Ionicons name="warning" size={24} color="#ba1a1a" />
              <Text className="font-label-bold uppercase tracking-widest text-error font-bold">Emergency Tip</Text>
            </View>
            <Text className="font-headline-sm text-ink-black font-bold text-xl mb-2">Check-in Feature</Text>
            <Text className="font-body-md text-on-surface-variant">Your primary contact receives an automated text if you haven't checked in for more than 48 hours.</Text>
            <View className="mt-8">
              <View className="w-full bg-white border-[1.5px] border-ink-black h-3 rounded-full overflow-hidden flex-row">
                <View className="bg-secondary h-full border-r-[1.5px] border-ink-black" style={{ width: '65%' }} />
              </View>
              <Text className="font-label-md text-ink-black mt-2 font-bold">Profile Completeness: 65%</Text>
            </View>
          </View>

        </View>
      </ScrollView>

      {/* FAB (Add New Contact Bottom) */}
      <View className="absolute bottom-24 right-6 md:right-12 z-40">
        <TouchableOpacity className="bg-secondary-container border-[1.5px] border-ink-black rounded-2xl px-6 py-4 flex-row items-center gap-3 shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
          <Ionicons name="person-add" size={24} color="#715b00" />
          <Text className="text-on-secondary-fixed font-label-bold font-bold">NEW CONTACT</Text>
        </TouchableOpacity>
      </View>

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
