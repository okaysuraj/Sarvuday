import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CustomButton } from '../../components/CustomButton';

const GOALS = [
  { id: '1', title: 'Meditate', target: 3, current: 2, unit: 'times/week' },
  { id: '2', title: 'Sleep 8 Hours', target: 5, current: 5, unit: 'days/week' },
  { id: '3', title: 'Journal Entry', target: 7, current: 4, unit: 'days/week' },
];

export default function GoalsTrackingScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <View className="flex-row items-center px-4 py-3 border-b border-surface-variant bg-surface">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 justify-center">
          <Ionicons name="arrow-back" size={24} color="#1b1b20" />
        </TouchableOpacity>
        <Text className="font-headline-md text-on-surface font-bold text-xl ml-2 flex-1">
          My Goals
        </Text>
      </View>

      <ScrollView className="flex-1 px-6 pt-6">
        <View className="flex-row justify-between items-center mb-6">
          <Text className="font-headline-md text-on-surface text-lg font-bold">This Week's Progress</Text>
          <TouchableOpacity className="bg-primary-fixed px-3 py-1 rounded-full">
            <Text className="text-on-primary-fixed font-label-bold text-xs">+ Add Goal</Text>
          </TouchableOpacity>
        </View>

        <View className="gap-6 mb-8">
          {GOALS.map((goal) => {
            const progress = (goal.current / goal.target) * 100;
            const isComplete = goal.current >= goal.target;
            
            return (
              <View key={goal.id} className="bg-surface-container-highest p-4 rounded-xl border border-outline-variant">
                <View className="flex-row justify-between items-center mb-3">
                  <Text className="font-headline-md text-on-surface font-bold text-base">{goal.title}</Text>
                  <Text className="font-body-md text-on-surface-variant text-sm">
                    {goal.current} / {goal.target} {goal.unit}
                  </Text>
                </View>
                
                <View className="w-full bg-surface-variant h-2 rounded-full mb-4">
                  <View 
                    className={`h-2 rounded-full ${isComplete ? 'bg-secondary' : 'bg-primary'}`} 
                    style={{ width: `${Math.min(100, progress)}%` }} 
                  />
                </View>

                {isComplete ? (
                  <View className="flex-row items-center">
                    <Ionicons name="trophy" size={16} color="#006d3a" className="mr-2" />
                    <Text className="font-label-bold text-secondary text-xs uppercase">Goal Reached!</Text>
                  </View>
                ) : (
                  <View className="flex-row items-center justify-between mt-2">
                    <TouchableOpacity className="flex-1 bg-surface py-2 rounded-lg items-center border border-outline-variant mr-2">
                      <Text className="text-on-surface font-label-bold text-xs">Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-1 bg-primary py-2 rounded-lg items-center">
                      <Text className="text-on-primary font-label-bold text-xs">Log Progress</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            );
          })}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
