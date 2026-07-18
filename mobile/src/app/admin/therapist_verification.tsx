import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Dimensions, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TherapistVerificationScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [counsellor, setCounsellor] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounsellor = async () => {
      try {
        const token = await AsyncStorage.getItem('access_token');
        const res = await fetch(`http://10.0.2.2:8000/content/counsellors/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const json = await res.json();
          setCounsellor(json);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchCounsellor();
    } else {
      setLoading(false); // If no id, just show mock
    }
  }, [id]);

  const handleAction = async (action: 'approve' | 'disapprove') => {
    try {
      const token = await AsyncStorage.getItem('access_token');
      const res = await fetch(`http://10.0.2.2:8000/admin/counsellors/${action}/${id}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        Alert.alert('Success', `Counsellor ${action}d successfully`);
        router.back();
      } else {
        Alert.alert('Error', `Failed to ${action} counsellor`);
      }
    } catch (e) {
      console.error(e);
      Alert.alert('Error', 'An error occurred.');
    }
  };

  const name = counsellor?.name || 'Dr. Sarah Jenkins';
  const email = counsellor?.email || 's.jenkins@example.com';
  const phone = counsellor?.phone_number || '+1 (555) 012-3456';
  const bio = counsellor?.bio || 'Specialized in CBT and trauma-informed care...';
  const status = counsellor?.is_verified ? 'Verified' : 'Pending Review';

  if (loading) {
    return (
      <View className="flex-1 bg-[#fbf8ff] items-center justify-center">
        <ActivityIndicator size="large" color="#002da5" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#fbf8ff]">
      {/* Top Navigation Anchor */}
      <View className="bg-[#fbf8ff] w-full top-0 sticky z-50 border-b-[1.5px] border-ink-black flex-row justify-between items-center px-4 md:px-10 py-4">
        <View className="flex-row items-center gap-4">
          <Ionicons name="shield-checkmark" size={32} color="#002da5" />
          <Text className="font-headline-md text-primary font-bold text-2xl">MindGuard Admin</Text>
        </View>
        <View className="flex-row items-center gap-6">
          <TouchableOpacity className="p-2 rounded-full active:bg-[#eae7ee] transition-colors">
            <Ionicons name="notifications" size={24} color="#002da5" />
          </TouchableOpacity>
          <View className="flex-row items-center gap-3">
            <View className="w-10 h-10 rounded-full border-[1.5px] border-ink-black overflow-hidden bg-[#d9d9e6] items-center justify-center">
              <Ionicons name="person" size={24} color="#1A1A1A" />
            </View>
            <Text className="hidden md:flex font-label-bold text-ink-black font-bold">Admin Profile</Text>
          </View>
        </View>
      </View>

      <View className="flex-1 flex-row">
        {/* Navigation Drawer */}
        <View className="hidden md:flex flex-col gap-2 p-4 h-full w-72 bg-[#f5f2f9] border-r-[1.5px] border-ink-black">
          <View className="mb-8 px-2">
            <Text className="font-headline-sm text-ink-black font-bold text-xl">Admin Console</Text>
            <Text className="text-on-surface-variant font-label-md">Mental Health Platform</Text>
          </View>
          
          <TouchableOpacity className="flex-row items-center gap-3 p-3 rounded-lg hover:bg-[#eae7ee] m-2 transition-colors">
            <Ionicons name="grid" size={24} color="#434655" />
            <Text className="font-label-md text-on-surface-variant">Dashboard</Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="flex-row items-center gap-3 p-3 rounded-lg bg-[#003fdd] border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] m-2 transition-colors">
            <Ionicons name="shield-checkmark" size={24} color="#bbc5ff" />
            <Text className="font-label-md text-[#bbc5ff] font-bold">Therapists</Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="flex-row items-center gap-3 p-3 rounded-lg hover:bg-[#eae7ee] m-2 transition-colors">
            <Ionicons name="lock-closed" size={24} color="#434655" />
            <Text className="font-label-md text-on-surface-variant">Safety Logs</Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="flex-row items-center gap-3 p-3 rounded-lg hover:bg-[#eae7ee] m-2 transition-colors">
            <Ionicons name="bulb" size={24} color="#434655" />
            <Text className="font-label-md text-on-surface-variant">Risk AI</Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="flex-row items-center gap-3 p-3 rounded-lg hover:bg-[#eae7ee] m-2 transition-colors">
            <Ionicons name="warning" size={24} color="#434655" />
            <Text className="font-label-md text-on-surface-variant">Crisis Center</Text>
          </TouchableOpacity>
          
          <View className="mt-auto pt-4 border-t-[1.5px] border-ink-black/10">
            <Text className="px-4 py-2 font-label-md text-on-surface-variant">v2.4.0</Text>
          </View>
        </View>

        {/* Main Content Area */}
        <ScrollView className="flex-1 p-4 md:p-10" contentContainerStyle={{ paddingBottom: 100 }}>
          <View className="max-w-6xl mx-auto w-full">
            
            {/* Back Link and Header */}
            <View className="flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
              <View>
                <TouchableOpacity onPress={() => router.back()} className="flex-row items-center gap-2 mb-2">
                  <Ionicons name="arrow-back" size={18} color="#002da5" />
                  <Text className="text-primary font-label-bold font-bold underline">Back to Applications</Text>
                </TouchableOpacity>
                <Text className="font-headline-md text-ink-black font-bold text-3xl">Verification: {name}</Text>
                <View className="flex-row gap-2 mt-2">
                  <View className="px-3 py-1 rounded-full border-[1.5px] border-ink-black bg-[#ffd9df]">
                    <Text className="text-xs font-label-bold font-bold uppercase">Clinical Psychologist</Text>
                  </View>
                  <View className="px-3 py-1 rounded-full border-[1.5px] border-ink-black bg-[#d9d9e6]">
                    <Text className="text-xs font-label-bold font-bold uppercase">{status}</Text>
                  </View>
                </View>
              </View>
              <View className="flex-row gap-4">
                <TouchableOpacity onPress={() => handleAction('disapprove')} className="flex-row items-center gap-2 px-6 py-3 rounded-xl bg-[#ba1a1a] border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-transform">
                  <Ionicons name="close-circle" size={20} color="#ffffff" />
                  <Text className="text-white font-label-bold font-bold">Reject</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleAction('approve')} className="flex-row items-center gap-2 px-6 py-3 rounded-xl bg-[#003fdd] border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-transform">
                  <Ionicons name="checkmark-circle" size={20} color="#ffffff" />
                  <Text className="text-white font-label-bold font-bold">Approve</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Bento Grid Content */}
            <View className="flex-col md:flex-row gap-6">
              
              {/* Profile Card & Status Timeline */}
              <View className="md:w-[32%] flex-col gap-6">
                
                {/* Profile Card */}
                <View className="bg-white p-8 rounded-[32px] border-[1.5px] border-ink-black">
                  <View className="w-24 h-24 mx-auto mb-6 rounded-[24px] border-[1.5px] border-ink-black overflow-hidden bg-[#ffdad6] items-center justify-center">
                    <Ionicons name="person" size={60} color="#1A1A1A" style={{ marginTop: 10 }} />
                  </View>
                  <Text className="text-center font-headline-sm font-bold text-2xl mb-1">{name}</Text>
                  <Text className="text-center text-on-surface-variant font-label-md mb-6">{email}</Text>
                  
                  <View className="flex-col gap-4">
                    <View className="p-4 bg-[#efedf4] rounded-xl border-[1.5px] border-ink-black">
                      <Text className="text-xs font-label-bold text-on-surface-variant font-bold uppercase mb-1">Phone</Text>
                      <Text className="font-body-md">{phone}</Text>
                    </View>
                    <View className="p-4 bg-[#efedf4] rounded-xl border-[1.5px] border-ink-black">
                      <Text className="text-xs font-label-bold text-on-surface-variant font-bold uppercase mb-1">Location</Text>
                      <Text className="font-body-md">Portland, OR</Text>
                    </View>
                    <View className="p-4 bg-[#efedf4] rounded-xl border-[1.5px] border-ink-black">
                      <Text className="text-xs font-label-bold text-on-surface-variant font-bold uppercase mb-1">NPI Number</Text>
                      <Text className="font-body-md">1234567890</Text>
                    </View>
                  </View>
                </View>

                {/* Status Timeline */}
                <View className="bg-[#d9d9e6] p-8 rounded-[32px] border-[1.5px] border-ink-black flex-1">
                  <Text className="font-label-bold text-ink-black font-bold mb-4 uppercase text-sm">Verification Progress</Text>
                  <View className="flex-col gap-6 relative">
                    <View className="absolute left-4 top-2 bottom-2 w-[1.5px] bg-ink-black/20" />
                    
                    <View className="flex-row gap-4 z-10 relative">
                      <View className="w-8 h-8 rounded-full bg-[#003fdd] border-[1.5px] border-ink-black items-center justify-center">
                        <Ionicons name="checkmark" size={16} color="#ffffff" />
                      </View>
                      <View>
                        <Text className="font-label-bold font-bold">Application Submitted</Text>
                        <Text className="text-xs opacity-70">Oct 24, 2023</Text>
                      </View>
                    </View>
                    
                    <View className="flex-row gap-4 z-10 relative">
                      <View className="w-8 h-8 rounded-full bg-[#003fdd] border-[1.5px] border-ink-black items-center justify-center">
                        <Ionicons name="checkmark" size={16} color="#ffffff" />
                      </View>
                      <View>
                        <Text className="font-label-bold font-bold">Background Check Pass</Text>
                        <Text className="text-xs opacity-70">Oct 26, 2023</Text>
                      </View>
                    </View>
                    
                    <View className="flex-row gap-4 z-10 relative">
                      <View className="w-8 h-8 rounded-full bg-white border-[1.5px] border-ink-black items-center justify-center">
                        <View className="w-2 h-2 rounded-full bg-ink-black" />
                      </View>
                      <View>
                        <Text className="font-label-bold font-bold">Admin Manual Review</Text>
                        <Text className="text-xs opacity-70">Current Step</Text>
                      </View>
                    </View>

                  </View>
                </View>
                
              </View>

              {/* Details and Documents */}
              <View className="md:w-[65%] flex-col gap-6">
                
                {/* About Section */}
                <View className="bg-white p-8 rounded-[32px] border-[1.5px] border-ink-black">
                  <Text className="font-headline-sm font-bold text-2xl mb-4">Professional Statement</Text>
                  <Text className="text-on-surface leading-relaxed mb-6 font-body-md">
                    {bio}
                  </Text>
                  <View className="flex-row flex-wrap gap-2">
                    <View className="px-4 py-2 bg-[#fdd33f] border-[1.5px] border-ink-black rounded-full">
                      <Text className="text-sm font-label-bold font-bold">Cognitive Behavioral Therapy</Text>
                    </View>
                    <View className="px-4 py-2 bg-[#fdd33f] border-[1.5px] border-ink-black rounded-full">
                      <Text className="text-sm font-label-bold font-bold">Trauma-Informed Care</Text>
                    </View>
                    <View className="px-4 py-2 bg-[#fdd33f] border-[1.5px] border-ink-black rounded-full">
                      <Text className="text-sm font-label-bold font-bold">EMDR</Text>
                    </View>
                    <View className="px-4 py-2 bg-[#fdd33f] border-[1.5px] border-ink-black rounded-full">
                      <Text className="text-sm font-label-bold font-bold">+3 More</Text>
                    </View>
                  </View>
                </View>

                {/* Credentials Grid */}
                <View className="flex-col sm:flex-row gap-6">
                  <View className="flex-1 bg-[#ffdad6] p-6 rounded-[24px] border-[1.5px] border-ink-black">
                    <Ionicons name="school" size={32} color="#1A1A1A" className="mb-4" />
                    <Text className="font-label-bold font-bold text-lg mb-2">Education</Text>
                    <Text className="text-sm font-label-bold font-bold opacity-60 uppercase mb-1">Masters in Psychology</Text>
                    <Text className="font-body-md">University of Oregon, 2012</Text>
                  </View>
                  <View className="flex-1 bg-[#ffd9df] p-6 rounded-[24px] border-[1.5px] border-ink-black">
                    <Ionicons name="ribbon" size={32} color="#1A1A1A" className="mb-4" />
                    <Text className="font-label-bold font-bold text-lg mb-2">Licensure</Text>
                    <Text className="text-sm font-label-bold font-bold opacity-60 uppercase mb-1">State License #4459-P</Text>
                    <Text className="font-body-md">Active • Expires 2025</Text>
                  </View>
                </View>

                {/* Documents Section */}
                <View className="bg-white p-8 rounded-[32px] border-[1.5px] border-ink-black">
                  <View className="flex-row items-center justify-between mb-6">
                    <Text className="font-headline-sm font-bold text-2xl">Submitted Documents</Text>
                    <Text className="text-on-surface-variant font-label-md">3 Files Attached</Text>
                  </View>
                  <View className="flex-col gap-4">
                    
                    <TouchableOpacity className="flex-row items-center justify-between p-4 bg-[#efedf4] border-[1.5px] border-ink-black rounded-2xl active:bg-[#eae7ee] transition-colors">
                      <View className="flex-row items-center gap-4">
                        <View className="w-12 h-12 rounded-xl bg-ink-black items-center justify-center">
                          <Ionicons name="document-text" size={24} color="#ffffff" />
                        </View>
                        <View>
                          <Text className="font-label-bold font-bold">Medical_License_Verification.pdf</Text>
                          <Text className="text-xs opacity-60">2.4 MB • Uploaded Oct 24</Text>
                        </View>
                      </View>
                      <View className="p-2 rounded-lg border-[1.5px] border-ink-black bg-white shadow-[2px_2px_0px_0px_#1A1A1A]">
                        <Ionicons name="eye" size={20} color="#1A1A1A" />
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity className="flex-row items-center justify-between p-4 bg-[#efedf4] border-[1.5px] border-ink-black rounded-2xl active:bg-[#eae7ee] transition-colors">
                      <View className="flex-row items-center gap-4">
                        <View className="w-12 h-12 rounded-xl bg-ink-black items-center justify-center">
                          <Ionicons name="shield-checkmark" size={24} color="#ffffff" />
                        </View>
                        <View>
                          <Text className="font-label-bold font-bold">Background_Check_Clearance.pdf</Text>
                          <Text className="text-xs opacity-60">1.1 MB • Uploaded Oct 24</Text>
                        </View>
                      </View>
                      <View className="p-2 rounded-lg border-[1.5px] border-ink-black bg-white shadow-[2px_2px_0px_0px_#1A1A1A]">
                        <Ionicons name="eye" size={20} color="#1A1A1A" />
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity className="flex-row items-center justify-between p-4 bg-[#efedf4] border-[1.5px] border-ink-black rounded-2xl active:bg-[#eae7ee] transition-colors">
                      <View className="flex-row items-center gap-4">
                        <View className="w-12 h-12 rounded-xl bg-ink-black items-center justify-center">
                          <Ionicons name="id-card" size={24} color="#ffffff" />
                        </View>
                        <View>
                          <Text className="font-label-bold font-bold">State_ID_Front_Back.jpg</Text>
                          <Text className="text-xs opacity-60">4.8 MB • Uploaded Oct 24</Text>
                        </View>
                      </View>
                      <View className="p-2 rounded-lg border-[1.5px] border-ink-black bg-white shadow-[2px_2px_0px_0px_#1A1A1A]">
                        <Ionicons name="eye" size={20} color="#1A1A1A" />
                      </View>
                    </TouchableOpacity>

                  </View>
                </View>

                {/* Reviewer Notes */}
                <View className="bg-[#eae7ee] p-8 rounded-[32px] border-[1.5px] border-ink-black">
                  <Text className="font-label-bold text-ink-black font-bold mb-4 uppercase text-sm">Verification Notes</Text>
                  <TextInput
                    className="w-full min-h-[120px] bg-white border-[1.5px] border-ink-black rounded-xl p-4 font-body-md"
                    placeholder="Add internal notes about this application..."
                    multiline
                    textAlignVertical="top"
                  />
                </View>

              </View>

            </View>

          </View>
        </ScrollView>
      </View>

      {/* Mobile Navigation Shell */}
      <View className="md:hidden absolute bottom-0 left-0 right-0 bg-[#fbf8ff] border-t-[1.5px] border-ink-black px-6 py-4 flex-row justify-between items-center z-50">
        <TouchableOpacity className="flex-col items-center gap-1">
          <Ionicons name="grid-outline" size={24} color="#434655" />
          <Text className="text-[10px] font-label-bold font-bold text-on-surface-variant">Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center gap-1">
          <Ionicons name="shield-checkmark" size={24} color="#002da5" />
          <Text className="text-[10px] font-label-bold font-bold text-primary">Therapists</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center gap-1">
          <Ionicons name="lock-closed-outline" size={24} color="#434655" />
          <Text className="text-[10px] font-label-bold font-bold text-on-surface-variant">Safety</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center gap-1">
          <Ionicons name="settings-outline" size={24} color="#434655" />
          <Text className="text-[10px] font-label-bold font-bold text-on-surface-variant">Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
