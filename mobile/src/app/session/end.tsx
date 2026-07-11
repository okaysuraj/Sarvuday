import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../store/authStore';
import { CustomButton } from '../../components/CustomButton';

export default function SessionEndScreen() {
  const router = useRouter();
  const user = useAuthStore(state => state.user);
  const isTherapist = user?.role === 'therapist';

  const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.replace('/(tabs)');
    }, 1000);
  };

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} className="flex-1">
        <ScrollView className="flex-1 px-6 pt-12" contentContainerStyle={{ paddingBottom: 40 }}>
          <View className="items-center mb-8">
            <View className="w-20 h-20 rounded-full bg-primary-fixed items-center justify-center mb-6">
              <Ionicons name="checkmark" size={40} color="#002da5" />
            </View>
            <Text className="font-headline-md text-on-surface text-3xl font-bold mb-2">Session Ended</Text>
            <Text className="font-body-md text-on-surface-variant text-base">Duration: 50:00</Text>
          </View>

          {!isTherapist ? (
            <View className="bg-surface-container-highest p-6 rounded-2xl border border-outline-variant mb-6">
              <Text className="font-headline-md text-on-surface text-lg font-bold mb-4 text-center">How was your session?</Text>
              <View className="flex-row justify-center gap-4 mb-6">
                {[1, 2, 3, 4, 5].map(star => (
                  <TouchableOpacity key={star} onPress={() => setRating(star)}>
                    <Ionicons 
                      name={star <= rating ? "star" : "star-outline"} 
                      size={36} 
                      color={star <= rating ? "#ebc22e" : "#747687"} 
                    />
                  </TouchableOpacity>
                ))}
              </View>
              <Text className="font-headline-md text-on-surface font-bold mb-2">Private Notes</Text>
              <TextInput
                className="bg-surface rounded-xl p-4 font-body-md text-on-surface border border-outline-variant h-24"
                placeholder="Jot down any immediate thoughts..."
                placeholderTextColor="#747687"
                multiline
                textAlignVertical="top"
                value={notes}
                onChangeText={setNotes}
              />
            </View>
          ) : (
            <View className="bg-surface-container-highest p-6 rounded-2xl border border-outline-variant mb-6">
              <Text className="font-headline-md text-on-surface text-lg font-bold mb-4">Clinical Notes (Private)</Text>
              <TextInput
                className="bg-surface rounded-xl p-4 font-body-md text-on-surface border border-outline-variant min-h-[160px]"
                placeholder="Enter SOAP notes, observations, or action items for the next session..."
                placeholderTextColor="#747687"
                multiline
                textAlignVertical="top"
                value={notes}
                onChangeText={setNotes}
              />
            </View>
          )}

          <CustomButton 
            title={isTherapist ? "Save Notes & Finish" : "Submit & Finish"}
            onPress={handleSubmit}
            isLoading={isLoading}
          />
          <TouchableOpacity onPress={() => router.replace('/(tabs)')} className="mt-6 items-center">
            <Text className="font-label-bold text-primary font-bold text-base">Skip for now</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
