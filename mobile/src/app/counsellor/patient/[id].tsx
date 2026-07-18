import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PatientDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [patientData, setPatientData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const token = await AsyncStorage.getItem('access_token');
        const res = await fetch('http://10.0.2.2:8000/counsellor/appointments', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const json = await res.json();
          // Find an appointment with this patient to get their name
          const appt = json.appointments?.find((a: any) => a.normal_user?.user_id === id);
          if (appt && appt.normal_user) {
            setPatientData({
              name: appt.normal_user.name || 'Unknown Patient',
              info: 'Anxiety & Social Dynamics • 12 Sessions',
              status: 'TRENDING UPWARD',
              progress: {
                anxiety: 75,
                social: 40,
                sleep: 90
              },
              plan: ['Weekly CBT', 'Journaling', 'Mindfulness']
            });
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchPatientData();
  }, [id]);

  // Mock fallback patient data based on ID if API fails or no appointment
  const patient = patientData || {
    name: 'Ananya S.',
    info: 'Anxiety & Social Dynamics • 12 Sessions',
    status: 'TRENDING UPWARD',
    progress: {
      anxiety: 75,
      social: 40,
      sleep: 90
    },
    plan: ['Weekly CBT', 'Journaling', 'Mindfulness']
  };

  if (loading) {
    return (
      <View className="flex-1 bg-cream-bg items-center justify-center">
        <ActivityIndicator size="large" color="#002da5" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-cream-bg">
      {/* Header */}
      <View className="w-full top-0 bg-cream-bg border-b-[1.5px] border-ink-black flex-row justify-between items-center px-6 py-4 z-50">
        <View className="flex-row items-center gap-4">
          <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full active:bg-surface-variant">
            <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
          </TouchableOpacity>
          <View className="flex-row items-center gap-3">
            <View className="w-10 h-10 rounded-full border-[1.5px] border-ink-black bg-accent-pink items-center justify-center">
              <Ionicons name="person" size={24} color="#331019" />
            </View>
            <View>
              <Text className="font-headline-sm font-bold text-ink-black text-lg">{patient.name}</Text>
              <Text className="text-xs font-label-md text-on-surface-variant">{patient.info}</Text>
            </View>
          </View>
        </View>
        <View className="flex-row items-center gap-2">
          <TouchableOpacity className="p-2">
            <Ionicons name="notifications" size={24} color="#002da5" />
          </TouchableOpacity>
          <TouchableOpacity className="p-2">
            <Ionicons name="ellipsis-vertical" size={24} color="#002da5" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1 px-4 py-8" contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* AI Mood Insights */}
        <View className="bg-white border-[1.5px] border-ink-black rounded-[32px] p-6 shadow-[4px_4px_0px_0px_#1A1A1A] mb-8">
          <View className="flex-row justify-between items-start mb-6">
            <View>
              <Text className="font-headline-sm text-ink-black font-bold text-xl mb-1">AI Mood Insights</Text>
              <Text className="text-on-surface-variant font-label-md text-sm">Sentiment analysis from last 30 days</Text>
            </View>
            <View className="bg-secondary-container border-[1.5px] border-ink-black rounded-full px-3 py-1">
              <Text className="text-[#715b00] text-[10px] font-bold uppercase">{patient.status}</Text>
            </View>
          </View>

          {/* Graph Placeholder */}
          <View className="h-48 flex-row items-end justify-between pt-4">
            <View className="flex-1 bg-accent-pink border-[1.5px] border-ink-black rounded-t-xl mr-1" style={{ height: '40%' }} />
            <View className="flex-1 bg-accent-pink border-[1.5px] border-ink-black rounded-t-xl mx-1" style={{ height: '55%' }} />
            <View className="flex-1 bg-accent-pink border-[1.5px] border-ink-black rounded-t-xl mx-1" style={{ height: '45%' }} />
            <View className="flex-1 bg-primary border-[1.5px] border-ink-black rounded-t-xl mx-1" style={{ height: '70%' }} />
            <View className="flex-1 bg-accent-pink border-[1.5px] border-ink-black rounded-t-xl mx-1" style={{ height: '60%' }} />
            <View className="flex-1 bg-accent-pink border-[1.5px] border-ink-black rounded-t-xl mx-1" style={{ height: '85%' }} />
            <View className="flex-1 bg-primary border-[1.5px] border-ink-black rounded-t-xl ml-1" style={{ height: '95%' }} />
          </View>
          <View className="flex-row justify-between mt-2">
            <Text className="text-[10px] font-bold text-on-surface-variant uppercase">Week 1</Text>
            <Text className="text-[10px] font-bold text-on-surface-variant uppercase">Week 2</Text>
            <Text className="text-[10px] font-bold text-on-surface-variant uppercase">Week 3</Text>
            <Text className="text-[10px] font-bold text-on-surface-variant uppercase">Week 4</Text>
          </View>
        </View>

        {/* Treatment Status */}
        <View className="bg-white border-[1.5px] border-ink-black rounded-[32px] p-6 shadow-[4px_4px_0px_0px_#1A1A1A] mb-8">
          <Text className="font-headline-sm text-ink-black font-bold text-xl mb-6">Treatment Status</Text>
          
          <View className="flex-col gap-6">
            <View>
              <View className="flex-row justify-between mb-2">
                <Text className="text-sm font-bold text-ink-black">Anxiety Management</Text>
                <Text className="text-sm font-bold text-ink-black">{patient.progress.anxiety}%</Text>
              </View>
              <View className="w-full h-3 bg-surface-container rounded-full border-[1.5px] border-ink-black overflow-hidden">
                <View className="h-full bg-primary border-r-[1.5px] border-ink-black" style={{ width: `${patient.progress.anxiety}%` }} />
              </View>
            </View>

            <View>
              <View className="flex-row justify-between mb-2">
                <Text className="text-sm font-bold text-ink-black">Social Engagement</Text>
                <Text className="text-sm font-bold text-ink-black">{patient.progress.social}%</Text>
              </View>
              <View className="w-full h-3 bg-surface-container rounded-full border-[1.5px] border-ink-black overflow-hidden">
                <View className="h-full bg-accent-orange border-r-[1.5px] border-ink-black" style={{ width: `${patient.progress.social}%` }} />
              </View>
            </View>

            <View>
              <View className="flex-row justify-between mb-2">
                <Text className="text-sm font-bold text-ink-black">Sleep Quality</Text>
                <Text className="text-sm font-bold text-ink-black">{patient.progress.sleep}%</Text>
              </View>
              <View className="w-full h-3 bg-surface-container rounded-full border-[1.5px] border-ink-black overflow-hidden">
                <View className="h-full bg-secondary border-r-[1.5px] border-ink-black" style={{ width: `${patient.progress.sleep}%` }} />
              </View>
            </View>
          </View>

          <View className="mt-8 pt-6 border-t-[1.5px] border-ink-black/10">
            <Text className="text-xs font-bold text-on-surface-variant uppercase mb-4 tracking-tighter">Current Plan</Text>
            <View className="flex-row flex-wrap gap-2">
              {patient.plan.map((item, idx) => (
                <View key={idx} className="bg-surface-container-high px-3 py-1 rounded-full border-[1px] border-ink-black">
                  <Text className="text-xs text-ink-black">{item}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="flex-col gap-4 mb-8">
          <TouchableOpacity className="w-full bg-primary py-4 rounded-[16px] border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex-row items-center justify-center gap-2">
            <Ionicons name="document-text" size={24} color="#ffffff" />
            <Text className="text-white font-bold text-lg">New Note</Text>
          </TouchableOpacity>
          <TouchableOpacity className="w-full bg-secondary-container py-4 rounded-[16px] border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex-row items-center justify-center gap-2">
            <Ionicons name="time" size={24} color="#715b00" />
            <Text className="text-[#715b00] font-bold text-lg">View History</Text>
          </TouchableOpacity>
        </View>

        {/* Upcoming Session */}
        <View className="bg-ink-black p-6 rounded-[24px] relative overflow-hidden shadow-[4px_4px_0px_0px_#1A1A1A]">
          <View className="z-10">
            <Text className="text-[10px] font-bold text-accent-pink uppercase mb-1">Next Session</Text>
            <Text className="font-headline-sm text-white font-bold text-xl mb-4">Tomorrow, 10:00 AM</Text>
            <View className="flex-row items-center gap-2">
              <View className="w-8 h-8 rounded-full border border-white bg-white/10 items-center justify-center">
                <Ionicons name="videocam" size={16} color="#ffffff" />
              </View>
              <Text className="text-xs font-medium text-white">Video Call (60 min)</Text>
            </View>
          </View>
          <View className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary rounded-full opacity-30" />
        </View>

      </ScrollView>
    </View>
  );
}
