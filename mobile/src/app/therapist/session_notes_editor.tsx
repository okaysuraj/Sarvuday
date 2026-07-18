import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function SessionNotesEditorScreen() {
  const router = useRouter();
  const [takeawayText, setTakeawayText] = useState('');
  const [takeaways, setTakeaways] = useState([
    { id: 1, text: "Successful implementation of 'Grounding' technique.", checked: true },
    { id: 2, text: "Identified 3 workplace anxiety triggers.", checked: true },
    { id: 3, text: "Willingness to try role-play exercises.", checked: false },
  ]);

  const addTakeaway = () => {
    if (takeawayText.trim() !== '') {
      setTakeaways([...takeaways, { id: Date.now(), text: takeawayText, checked: false }]);
      setTakeawayText('');
    }
  };

  const toggleTakeaway = (id: number) => {
    setTakeaways(takeaways.map(t => t.id === id ? { ...t, checked: !t.checked } : t));
  };

  return (
    <View className="flex-1 bg-background">
      {/* TopAppBar */}
      <View className="flex-row justify-between items-center px-4 py-4 w-full bg-background border-b-[1.5px] border-ink-black sticky top-0 z-40">
        <View className="flex-row items-center gap-4">
          <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 rounded-full border-[1.5px] border-ink-black bg-accent-sage items-center justify-center overflow-hidden">
            <Ionicons name="person" size={20} color="#1A1A1A" />
          </TouchableOpacity>
          <Text className="font-headline-sm text-ink-black font-bold text-xl">Good Morning</Text>
        </View>
        <TouchableOpacity className="w-10 h-10 items-center justify-center rounded-lg border-[1.5px] border-ink-black bg-surface active:bg-surface-container-high active:translate-x-[2px] active:translate-y-[2px]">
          <Ionicons name="notifications" size={20} color="#002da5" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 md:px-10 py-6 max-w-5xl mx-auto w-full mb-24" contentContainerStyle={{ paddingBottom: 150 }}>
        
        {/* Header Section */}
        <View className="flex-col md:flex-row justify-between md:items-end gap-4 mb-8">
          <View>
            <Text className="font-label-bold text-primary font-bold uppercase tracking-widest text-xs mb-1">Active Session</Text>
            <Text className="font-display-lg-mobile md:font-display-lg text-ink-black font-bold text-3xl md:text-5xl leading-tight tracking-tight">Patient Name: Arjun S.</Text>
            <View className="flex-row gap-2 mt-3 flex-wrap">
              <View className="px-3 py-1 bg-accent-pink border-[1.5px] border-ink-black rounded-full">
                <Text className="font-label-md text-ink-black text-xs font-bold">Cognitive Behavioral Therapy</Text>
              </View>
              <View className="px-3 py-1 bg-surface-container border-[1.5px] border-ink-black rounded-full">
                <Text className="font-label-md text-ink-black text-xs font-bold">Session #14</Text>
              </View>
            </View>
          </View>
          <View className="md:items-end mt-4 md:mt-0">
            <Text className="font-label-md text-ink-black/70 text-xs font-bold mb-1">October 24, 2023</Text>
            <Text className="font-label-bold text-ink-black font-bold text-sm">Duration: 50 mins</Text>
          </View>
        </View>

        {/* Bento Layout for Notepad */}
        <View className="flex-col md:flex-row gap-6">
          
          {/* Reflections Area */}
          <View className="flex-[2] bg-white border-[1.5px] border-ink-black rounded-[32px] p-6 shadow-[4px_4px_0px_0px_#1A1A1A] flex-col gap-4 min-h-[500px]">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-2">
                <Ionicons name="document-text" size={24} color="#002da5" />
                <Text className="font-headline-sm text-ink-black font-bold text-xl">Session Reflections</Text>
              </View>
              <Text className="text-label-md text-outline font-bold text-xs">Auto-saved 2m ago</Text>
            </View>
            <TextInput 
              className="flex-1 w-full bg-[#f9f8f3] rounded-xl border-[1.5px] border-ink-black p-4 font-body-lg text-ink-black text-lg leading-relaxed"
              multiline
              textAlignVertical="top"
              placeholder="Start typing your observations, emotional shifts, and clinical notes here..."
              placeholderTextColor="#747687"
              defaultValue={`Arjun arrived 5 minutes early. He appeared more relaxed than in the previous session, maintaining consistent eye contact. He reported a significant breakthrough regarding his social anxiety at the workplace mixer last Tuesday.\n\nWe explored the cognitive distortions he experienced during the event—specifically 'mind reading'. He was able to self-correct during the interaction, which is a major milestone in his progress.\n\nThere remains some hesitancy when discussing his relationship with his primary supervisor, suggesting we should focus on professional boundaries in next week's session.`}
            />
          </View>

          {/* Side Cards Column */}
          <View className="flex-[1] flex-col gap-6">
            
            {/* Key Takeaways Checklist */}
            <View className="bg-secondary-container border-[1.5px] border-ink-black rounded-[32px] p-6 flex-col gap-4">
              <View className="flex-row items-center gap-2">
                <Ionicons name="checkmark-circle" size={24} color="#715b00" />
                <Text className="font-headline-sm text-on-secondary-container font-bold text-xl">Key Takeaways</Text>
              </View>
              <View className="flex-col gap-3">
                {takeaways.map((item) => (
                  <TouchableOpacity 
                    key={item.id} 
                    onPress={() => toggleTakeaway(item.id)}
                    className="flex-row items-start gap-3 bg-white/50 p-3 rounded-lg border border-ink-black/10"
                  >
                    <Ionicons 
                      name={item.checked ? "checkbox" : "square-outline"} 
                      size={20} 
                      color={item.checked ? "#002da5" : "#1A1A1A"} 
                    />
                    <Text className="text-body-md text-ink-black flex-1 leading-tight">{item.text}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View className="relative mt-2 flex-row items-center">
                <TextInput 
                  className="flex-1 bg-white border-[1.5px] border-ink-black rounded-full px-4 py-2 pr-12 text-sm text-ink-black"
                  placeholder="Add a point..."
                  placeholderTextColor="#747687"
                  value={takeawayText}
                  onChangeText={setTakeawayText}
                  onSubmitEditing={addTakeaway}
                />
                <TouchableOpacity onPress={addTakeaway} className="absolute right-3">
                  <Ionicons name="add-circle" size={24} color="#002da5" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Suggested Homework */}
            <View className="bg-accent-pink border-[1.5px] border-ink-black rounded-[32px] p-6 flex-col gap-4">
              <View className="flex-row items-center gap-2">
                <Ionicons name="book" size={24} color="#5a3039" />
                <Text className="font-headline-sm text-tertiary font-bold text-xl">Homework</Text>
              </View>
              <View className="flex-row flex-wrap gap-2">
                <TouchableOpacity className="px-3 py-1 bg-white border border-ink-black rounded-full active:bg-tertiary">
                  <Text className="font-label-md text-ink-black text-xs font-bold">Daily Journaling</Text>
                </TouchableOpacity>
                <TouchableOpacity className="px-3 py-1 bg-white border border-ink-black rounded-full active:bg-tertiary">
                  <Text className="font-label-md text-ink-black text-xs font-bold">Mindful Walk</Text>
                </TouchableOpacity>
                <TouchableOpacity className="px-3 py-1 bg-tertiary border border-ink-black rounded-full">
                  <Text className="font-label-md text-white text-xs font-bold">Workplace Role-play</Text>
                </TouchableOpacity>
              </View>
              <TextInput 
                className="w-full h-24 bg-white/60 border-[1.5px] border-ink-black rounded-xl p-3 text-body-md text-ink-black text-sm"
                multiline
                textAlignVertical="top"
                placeholder="Specific instructions for the exercise..."
                placeholderTextColor="#747687"
              />
            </View>

          </View>
        </View>
      </ScrollView>

      {/* Action Bar (Floating Above Bottom Nav) */}
      <View className="absolute bottom-[90px] left-0 right-0 items-center z-40 px-4 pointer-events-box-none">
        <TouchableOpacity className="w-full max-w-md bg-primary-container border-[1.5px] border-ink-black rounded-full py-4 shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex-row items-center justify-center gap-2">
          <Ionicons name="send" size={20} color="#ffffff" />
          <Text className="text-white font-headline-sm font-bold text-lg">Save & Send to Patient</Text>
        </TouchableOpacity>
      </View>

      {/* BottomNavBar */}
      <View className="absolute bottom-0 w-full bg-surface border-t-[1.5px] border-ink-black h-20 px-4 pb-4 flex-row justify-around items-center z-50">
        <TouchableOpacity className="flex-col items-center justify-center px-2" onPress={() => router.push('/therapist/dashboard')}>
          <Ionicons name="grid" size={24} color="#434655" />
          <Text className="font-label-md text-on-surface-variant text-[10px] mt-1 font-bold">Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center px-4 py-1.5 bg-secondary-container rounded-xl border-[1.5px] border-ink-black">
          <Ionicons name="people" size={24} color="#715b00" />
          <Text className="font-label-md text-on-secondary-container text-[10px] mt-1 font-bold">Patients</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center px-2">
          <Ionicons name="calendar" size={24} color="#434655" />
          <Text className="font-label-md text-on-surface-variant text-[10px] mt-1 font-bold">Schedule</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center px-2">
          <Ionicons name="cash" size={24} color="#434655" />
          <Text className="font-label-md text-on-surface-variant text-[10px] mt-1 font-bold">Earnings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
