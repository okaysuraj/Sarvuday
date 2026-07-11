import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CustomButton } from '../../components/CustomButton';

export default function CBTExerciseScreen() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [event, setEvent] = useState('');
  const [thought, setThought] = useState('');
  const [emotion, setEmotion] = useState('');
  const [reframing, setReframing] = useState('');

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
    else router.replace('/(tabs)');
  };

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <View className="flex-row items-center px-4 py-3 border-b border-surface-variant bg-surface">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 justify-center">
          <Ionicons name="close" size={24} color="#1b1b20" />
        </TouchableOpacity>
        <Text className="font-headline-md text-on-surface font-bold text-xl ml-2 flex-1">
          CBT Exercise
        </Text>
        <Text className="font-label-bold text-on-surface-variant">Step {step} of 4</Text>
      </View>

      <View className="h-1 bg-surface-variant w-full">
        <View className="h-1 bg-primary" style={{ width: `${(step / 4) * 100}%` }} />
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} className="flex-1">
        <ScrollView className="flex-1 px-6 pt-6">
          {step === 1 && (
            <View>
              <Text className="font-headline-md text-on-surface text-2xl font-bold mb-4">1. The Situation</Text>
              <Text className="font-body-md text-on-surface-variant mb-6">
                What happened? Describe the event that triggered your negative thoughts.
              </Text>
              <TextInput
                className="bg-surface-container-highest rounded-xl p-4 font-body-md text-on-surface border border-outline-variant min-h-[150px]"
                placeholder="e.g., My boss sent me an email saying we need to talk..."
                placeholderTextColor="#747687"
                multiline
                textAlignVertical="top"
                value={event}
                onChangeText={setEvent}
              />
            </View>
          )}

          {step === 2 && (
            <View>
              <Text className="font-headline-md text-on-surface text-2xl font-bold mb-4">2. Automatic Thoughts</Text>
              <Text className="font-body-md text-on-surface-variant mb-6">
                What thoughts went through your mind? What did this event mean to you?
              </Text>
              <TextInput
                className="bg-surface-container-highest rounded-xl p-4 font-body-md text-on-surface border border-outline-variant min-h-[150px]"
                placeholder="e.g., I'm going to get fired. I always mess up."
                placeholderTextColor="#747687"
                multiline
                textAlignVertical="top"
                value={thought}
                onChangeText={setThought}
              />
            </View>
          )}

          {step === 3 && (
            <View>
              <Text className="font-headline-md text-on-surface text-2xl font-bold mb-4">3. Emotions</Text>
              <Text className="font-body-md text-on-surface-variant mb-6">
                How did you feel? Rate the intensity of your emotions.
              </Text>
              <TextInput
                className="bg-surface-container-highest rounded-xl p-4 font-body-md text-on-surface border border-outline-variant min-h-[150px]"
                placeholder="e.g., Anxious (90%), Sad (50%)"
                placeholderTextColor="#747687"
                multiline
                textAlignVertical="top"
                value={emotion}
                onChangeText={setEmotion}
              />
            </View>
          )}

          {step === 4 && (
            <View>
              <Text className="font-headline-md text-on-surface text-2xl font-bold mb-4">4. Reframing</Text>
              <Text className="font-body-md text-on-surface-variant mb-6">
                Is there an alternative way to look at this? What is the evidence against your negative thought?
              </Text>
              <TextInput
                className="bg-surface-container-highest rounded-xl p-4 font-body-md text-on-surface border border-outline-variant min-h-[150px]"
                placeholder="e.g., He might just want to discuss the new project. I've had good performance reviews."
                placeholderTextColor="#747687"
                multiline
                textAlignVertical="top"
                value={reframing}
                onChangeText={setReframing}
              />
            </View>
          )}
        </ScrollView>

        <View className="p-6 border-t border-surface-variant bg-surface flex-row gap-4">
          {step > 1 && (
            <TouchableOpacity 
              onPress={() => setStep(step - 1)}
              className="px-6 py-4 rounded-full border border-primary justify-center"
            >
              <Text className="font-label-bold text-primary">Back</Text>
            </TouchableOpacity>
          )}
          <View className="flex-1">
            <CustomButton 
              title={step === 4 ? "Complete Exercise" : "Next Step"}
              onPress={nextStep}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
