import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Switch, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TherapistAvailabilityScreen() {
  const router = useRouter();
  
  const [schedule, setSchedule] = useState<any>({
    monday: { active: false, start: '09:00 AM', end: '05:00 PM' },
    tuesday: { active: false, start: '10:00 AM', end: '04:00 PM' },
    wednesday: { active: false, start: '09:00 AM', end: '05:00 PM' },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const token = await AsyncStorage.getItem('access_token');
        const res = await fetch('http://10.0.2.2:8000/counsellor/availability', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const json = await res.json();
          // Very simplified parsing of slots to our week schema for demo
          if (json.slots && json.slots.length > 0) {
            const newSchedule = { ...schedule };
            json.slots.forEach((slot: any) => {
              const dayOfWeek = new Date(slot.start_time).getDay();
              const startStr = new Date(slot.start_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
              const endStr = new Date(slot.end_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
              if (dayOfWeek === 1) newSchedule.monday = { active: true, start: startStr, end: endStr };
              if (dayOfWeek === 2) newSchedule.tuesday = { active: true, start: startStr, end: endStr };
              if (dayOfWeek === 3) newSchedule.wednesday = { active: true, start: startStr, end: endStr };
            });
            setSchedule(newSchedule);
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchAvailability();
  }, []);

  const handleSave = async () => {
    try {
      const token = await AsyncStorage.getItem('access_token');
      // For demo, we just add a dummy slot to show it works, ideally we parse '09:00 AM' to a datetime for next monday
      const dummyDate = new Date();
      dummyDate.setHours(9, 0, 0, 0);
      const dummyEnd = new Date(dummyDate);
      dummyEnd.setHours(17, 0, 0, 0);

      const res = await fetch('http://10.0.2.2:8000/counsellor/availability', {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          start_time: dummyDate.toISOString(),
          end_time: dummyEnd.toISOString()
        })
      });
      if (res.ok) {
        Alert.alert("Success", "Availability saved successfully!");
      }
    } catch(e) {
      console.error(e);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <ActivityIndicator size="large" color="#002da5" />
      </View>
    );
  }

  const toggleDay = (day: keyof typeof schedule) => {
    setSchedule({ ...schedule, [day]: { ...schedule[day], active: !schedule[day].active } });
  };

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <View className="w-full top-0 bg-background border-b-[1.5px] border-ink-black flex-row justify-between items-center px-6 py-4 z-50">
        <View className="flex-row items-center gap-4">
          <View className="w-10 h-10 rounded-full border-[1.5px] border-ink-black overflow-hidden bg-accent-sage items-center justify-center">
            <Ionicons name="person" size={24} color="#1A1A1A" />
          </View>
          <Text className="font-headline-sm font-bold text-ink-black text-xl">Good Morning</Text>
        </View>
        <TouchableOpacity className="p-2 active:bg-surface-variant rounded-full">
          <Ionicons name="notifications" size={24} color="#002da5" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 py-8 max-w-7xl mx-auto w-full" contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Header Section */}
        <View className="mb-8">
          <Text className="font-display-lg-mobile text-ink-black font-bold text-4xl mb-2">Manage Availability</Text>
          <Text className="font-body-lg text-on-surface-variant text-lg">Set your working hours to let clients know when they can book sessions.</Text>
        </View>

        <View className="flex-col lg:flex-row gap-6">
          
          {/* Main Content: Weekly Hours */}
          <View className="flex-[8] flex-col gap-2">
            <View className="bg-white border-[1.5px] border-ink-black rounded-[40px] p-6 md:p-8">
              
              <View className="flex-row items-center justify-between mb-8">
                <Text className="font-headline-sm text-ink-black font-bold text-2xl">Weekly Working Hours</Text>
                <View className="flex-row items-center gap-2 px-4 py-2 bg-surface-container rounded-full border-[1.5px] border-ink-black">
                  <Ionicons name="globe-outline" size={20} color="#1A1A1A" />
                  <Text className="font-label-md text-ink-black font-bold">GMT-5 (EST)</Text>
                </View>
              </View>

              <View className="flex-col gap-6">
                
                {/* Monday */}
                <View className={`flex-col md:flex-row md:items-center justify-between p-6 rounded-[24px] border-[1.5px] border-ink-black ${schedule.monday.active ? 'bg-white' : 'bg-surface-container-low opacity-70'}`}>
                  <View className="flex-row items-center gap-6 mb-4 md:mb-0">
                    <Switch
                      trackColor={{ false: "#e4e1e8", true: "#002da5" }}
                      thumbColor="#ffffff"
                      ios_backgroundColor="#e4e1e8"
                      onValueChange={() => toggleDay('monday')}
                      value={schedule.monday.active}
                      style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }], borderWidth: 1.5, borderColor: '#1A1A1A' }}
                    />
                    <Text className="font-headline-sm text-ink-black font-bold text-xl w-24">Monday</Text>
                  </View>
                  
                  {schedule.monday.active ? (
                    <View className="flex-row flex-wrap items-center gap-4">
                      <View className="flex-row items-center gap-3">
                        <TextInput className="bg-[#f9f8f3] border-[1.5px] border-ink-black rounded-xl w-28 px-3 py-2 text-center font-label-md text-ink-black" value={schedule.monday.start} />
                        <Text className="font-bold text-ink-black">to</Text>
                        <TextInput className="bg-[#f9f8f3] border-[1.5px] border-ink-black rounded-xl w-28 px-3 py-2 text-center font-label-md text-ink-black" value={schedule.monday.end} />
                      </View>
                      <TouchableOpacity className="w-10 h-10 rounded-xl border-[1.5px] border-ink-black items-center justify-center bg-white active:bg-accent-pink">
                        <Ionicons name="add" size={24} color="#1A1A1A" />
                      </TouchableOpacity>
                      <TouchableOpacity className="w-10 h-10 rounded-xl border-[1.5px] border-ink-black items-center justify-center bg-white active:bg-error-container">
                        <Ionicons name="trash" size={24} color="#1A1A1A" />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <Text className="font-label-md text-on-surface-variant italic">Unavailable all day</Text>
                  )}
                </View>

                {/* Tuesday */}
                <View className={`flex-col md:flex-row md:items-center justify-between p-6 rounded-[24px] border-[1.5px] border-ink-black ${schedule.tuesday.active ? 'bg-white' : 'bg-surface-container-low opacity-70'}`}>
                  <View className="flex-row items-center gap-6 mb-4 md:mb-0">
                    <Switch
                      trackColor={{ false: "#e4e1e8", true: "#002da5" }}
                      thumbColor="#ffffff"
                      ios_backgroundColor="#e4e1e8"
                      onValueChange={() => toggleDay('tuesday')}
                      value={schedule.tuesday.active}
                      style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }], borderWidth: 1.5, borderColor: '#1A1A1A' }}
                    />
                    <Text className="font-headline-sm text-ink-black font-bold text-xl w-24">Tuesday</Text>
                  </View>
                  
                  {schedule.tuesday.active ? (
                    <View className="flex-row flex-wrap items-center gap-4">
                      <View className="flex-row items-center gap-3">
                        <TextInput className="bg-[#f9f8f3] border-[1.5px] border-ink-black rounded-xl w-28 px-3 py-2 text-center font-label-md text-ink-black" value={schedule.tuesday.start} />
                        <Text className="font-bold text-ink-black">to</Text>
                        <TextInput className="bg-[#f9f8f3] border-[1.5px] border-ink-black rounded-xl w-28 px-3 py-2 text-center font-label-md text-ink-black" value={schedule.tuesday.end} />
                      </View>
                      <TouchableOpacity className="w-10 h-10 rounded-xl border-[1.5px] border-ink-black items-center justify-center bg-white active:bg-accent-pink">
                        <Ionicons name="add" size={24} color="#1A1A1A" />
                      </TouchableOpacity>
                      <TouchableOpacity className="w-10 h-10 rounded-xl border-[1.5px] border-ink-black items-center justify-center bg-white active:bg-error-container">
                        <Ionicons name="trash" size={24} color="#1A1A1A" />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <Text className="font-label-md text-on-surface-variant italic">Unavailable all day</Text>
                  )}
                </View>

                {/* Wednesday */}
                <View className={`flex-col md:flex-row md:items-center justify-between p-6 rounded-[24px] border-[1.5px] border-ink-black ${schedule.wednesday.active ? 'bg-white' : 'bg-surface-container-low opacity-70'}`}>
                  <View className="flex-row items-center gap-6 mb-4 md:mb-0">
                    <Switch
                      trackColor={{ false: "#e4e1e8", true: "#002da5" }}
                      thumbColor="#ffffff"
                      ios_backgroundColor="#e4e1e8"
                      onValueChange={() => toggleDay('wednesday')}
                      value={schedule.wednesday.active}
                      style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }], borderWidth: 1.5, borderColor: '#1A1A1A' }}
                    />
                    <Text className="font-headline-sm text-ink-black font-bold text-xl w-24">Wednesday</Text>
                  </View>
                  
                  {schedule.wednesday.active ? (
                    <View className="flex-row flex-wrap items-center gap-4">
                      <View className="flex-row items-center gap-3">
                        <TextInput className="bg-[#f9f8f3] border-[1.5px] border-ink-black rounded-xl w-28 px-3 py-2 text-center font-label-md text-ink-black" value={schedule.wednesday.start} />
                        <Text className="font-bold text-ink-black">to</Text>
                        <TextInput className="bg-[#f9f8f3] border-[1.5px] border-ink-black rounded-xl w-28 px-3 py-2 text-center font-label-md text-ink-black" value={schedule.wednesday.end} />
                      </View>
                      <TouchableOpacity className="w-10 h-10 rounded-xl border-[1.5px] border-ink-black items-center justify-center bg-white active:bg-accent-pink">
                        <Ionicons name="add" size={24} color="#1A1A1A" />
                      </TouchableOpacity>
                      <TouchableOpacity className="w-10 h-10 rounded-xl border-[1.5px] border-ink-black items-center justify-center bg-white active:bg-error-container">
                        <Ionicons name="trash" size={24} color="#1A1A1A" />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <Text className="font-label-md text-on-surface-variant italic">Unavailable all day</Text>
                  )}
                </View>

              </View>

            </View>
          </View>

          {/* Side Sidebar: Settings */}
          <View className="flex-[4] flex-col gap-6">
            
            {/* Buffer Time Card */}
            <View className="bg-accent-sage border-[1.5px] border-ink-black p-8 rounded-[32px] shadow-[4px_4px_0px_0px_#1A1A1A]">
              <View className="flex-row items-center gap-4 mb-6">
                <View className="w-12 h-12 bg-white border-[1.5px] border-ink-black rounded-xl items-center justify-center">
                  <Ionicons name="timer" size={24} color="#002da5" />
                </View>
                <Text className="font-headline-sm text-ink-black font-bold text-xl">Buffer Time</Text>
              </View>
              <Text className="text-body-md text-ink-black mb-6">Amount of time between sessions to rest and prepare.</Text>
              
              <View className="relative">
                {/* Simplified for React Native - use a button to open a modal in real app */}
                <TouchableOpacity className="w-full bg-[#f9f8f3] border-[1.5px] border-ink-black rounded-xl px-6 py-4 flex-row justify-between items-center">
                  <Text className="font-label-bold text-ink-black font-bold">10 minutes</Text>
                  <Ionicons name="chevron-down" size={20} color="#1A1A1A" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Time Zone Settings */}
            <View className="bg-white border-[1.5px] border-ink-black p-8 rounded-[32px]">
              <View className="flex-row items-center gap-4 mb-6">
                <View className="w-12 h-12 bg-accent-pink border-[1.5px] border-ink-black rounded-xl items-center justify-center">
                  <Ionicons name="earth" size={24} color="#331019" />
                </View>
                <Text className="font-headline-sm text-ink-black font-bold text-xl">Time Zone</Text>
              </View>
              
              <View className="flex-col gap-4">
                <TouchableOpacity className="w-full bg-[#f9f8f3] border-[1.5px] border-ink-black rounded-xl px-6 py-4 flex-row justify-between items-center">
                  <Text className="font-label-md text-ink-black font-bold">Eastern Standard Time (EST)</Text>
                  <Ionicons name="chevron-down" size={20} color="#1A1A1A" />
                </TouchableOpacity>

                <View className="flex-row items-start gap-3 mt-2">
                  <Switch
                    trackColor={{ false: "#e4e1e8", true: "#002da5" }}
                    thumbColor="#ffffff"
                    ios_backgroundColor="#e4e1e8"
                    value={true}
                    style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }], borderWidth: 1.5, borderColor: '#1A1A1A' }}
                  />
                  <Text className="flex-1 text-label-md text-ink-black font-bold leading-5">Automatically adjust for Daylight Saving Time</Text>
                </View>
              </View>
            </View>

            {/* Action Card */}
            <View className="flex-col gap-4">
              <TouchableOpacity onPress={handleSave} className="w-full bg-primary border-[1.5px] border-ink-black py-4 rounded-full shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex-row items-center justify-center gap-3">
                <Text className="font-headline-sm text-white font-bold text-xl">Save Changes</Text>
                <Ionicons name="save" size={24} color="#ffffff" />
              </TouchableOpacity>
              <TouchableOpacity className="w-full bg-white border-[1.5px] border-ink-black py-4 rounded-full active:bg-surface-container items-center justify-center">
                <Text className="font-headline-sm text-ink-black font-bold text-xl">Discard Draft</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </ScrollView>
    </View>
  );
}
