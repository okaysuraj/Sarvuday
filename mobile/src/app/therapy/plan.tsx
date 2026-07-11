import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const EXERCISES = [
  { id: '1', title: 'CBT: Cognitive Restructuring', type: 'Worksheet', duration: '15 min', completed: false, route: '/therapy/cbt' },
  { id: '2', title: '4-7-8 Breathing', type: 'Exercise', duration: '5 min', completed: true, route: '/therapy/breathing' },
  { id: '3', title: 'Body Scan for Sleep', type: 'Meditation', duration: '10 min', completed: false, route: '/therapy/meditation' },
];

export default function TherapyPlanScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <View className="flex-row items-center px-4 py-3 border-b border-surface-variant bg-surface">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 justify-center">
          <Ionicons name="arrow-back" size={24} color="#1b1b20" />
        </TouchableOpacity>
        <Text className="font-headline-md text-on-surface font-bold text-xl ml-2 flex-1">
          My Therapy Plan
        </Text>
      </View>

      <ScrollView className="flex-1 px-6 pt-6">
        <View className="bg-primary-fixed p-6 rounded-2xl mb-8 border border-primary-fixed-dim">
          <Text className="font-label-md text-on-primary-fixed-variant mb-1">Goal</Text>
          <Text className="font-headline-md text-on-primary-fixed text-2xl font-bold mb-4">Reduce Workplace Anxiety</Text>
          <View className="w-full bg-surface-variant h-2 rounded-full mb-2">
            <View className="bg-primary h-2 rounded-full" style={{ width: '33%' }} />
          </View>
          <Text className="font-body-md text-on-primary-fixed-variant text-sm">1 of 3 weekly tasks completed</Text>
        </View>

        <Text className="font-headline-md text-on-surface text-lg font-bold mb-4">Assigned by Dr. Jenkins</Text>
        <View className="gap-4 mb-8">
          {EXERCISES.map((ex) => (
            <TouchableOpacity 
              key={ex.id}
              onPress={() => router.push(ex.route as any)}
              className="bg-surface-container-highest p-4 rounded-xl flex-row items-center border border-outline-variant"
            >
              <View className={`w-6 h-6 rounded-full border-2 mr-4 items-center justify-center ${ex.completed ? 'bg-primary border-primary' : 'border-outline'}`}>
                {ex.completed && <Ionicons name="checkmark" size={16} color="#ffffff" />}
              </View>
              <View className="flex-1">
                <Text className={`font-headline-md font-bold text-base ${ex.completed ? 'text-on-surface-variant line-through' : 'text-on-surface'}`}>
                  {ex.title}
                </Text>
                <View className="flex-row items-center mt-1">
                  <Text className="font-label-md text-primary mr-2">{ex.type}</Text>
                  <Text className="font-body-md text-on-surface-variant text-xs">• {ex.duration}</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#747687" />
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
