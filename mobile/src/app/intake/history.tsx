import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CustomButton } from '../../components/CustomButton';

export default function MedicalHistoryScreen() {
  const router = useRouter();
  const [history, setHistory] = useState('');
  const [medications, setMedications] = useState('');
  const [therapyBefore, setTherapyBefore] = useState<'yes' | 'no' | null>(null);

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <View className="flex-row items-center px-4 py-3 border-b border-surface-variant bg-surface">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 justify-center">
          <Ionicons name="arrow-back" size={24} color="#1b1b20" />
        </TouchableOpacity>
        <Text className="font-headline-md text-on-surface font-bold text-xl ml-2 flex-1">
          Medical History
        </Text>
        <Text className="font-label-bold text-on-surface-variant">Step 2 of 4</Text>
      </View>

      <View className="h-1 bg-surface-variant w-full">
        <View className="h-1 bg-primary" style={{ width: '50%' }} />
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} className="flex-1">
        <ScrollView className="flex-1 px-6 pt-6">
          <Text className="font-headline-md text-on-surface text-2xl font-bold mb-6">Mental Health History</Text>

          <View className="gap-8 mb-8">
            <View>
              <Text className="font-label-bold text-on-surface mb-2">Have you been to therapy before?</Text>
              <View className="flex-row gap-4">
                <TouchableOpacity 
                  onPress={() => setTherapyBefore('yes')}
                  className={`flex-1 py-3 rounded-xl border-2 items-center ${therapyBefore === 'yes' ? 'bg-primary-fixed border-primary' : 'bg-surface border-outline-variant'}`}
                >
                  <Text className={`font-headline-md font-bold ${therapyBefore === 'yes' ? 'text-primary' : 'text-on-surface'}`}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={() => setTherapyBefore('no')}
                  className={`flex-1 py-3 rounded-xl border-2 items-center ${therapyBefore === 'no' ? 'bg-primary-fixed border-primary' : 'bg-surface border-outline-variant'}`}
                >
                  <Text className={`font-headline-md font-bold ${therapyBefore === 'no' ? 'text-primary' : 'text-on-surface'}`}>No</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View>
              <Text className="font-label-bold text-on-surface mb-2">Previous Diagnoses (if any)</Text>
              <TextInput
                className="bg-surface-container-highest rounded-xl p-4 font-body-md text-on-surface border border-outline-variant min-h-[100px]"
                placeholder="e.g., Generalized Anxiety Disorder, PTSD..."
                placeholderTextColor="#747687"
                multiline
                textAlignVertical="top"
                value={history}
                onChangeText={setHistory}
              />
            </View>

            <View>
              <Text className="font-label-bold text-on-surface mb-2">Current Medications</Text>
              <TextInput
                className="bg-surface-container-highest rounded-xl p-4 font-body-md text-on-surface border border-outline-variant min-h-[100px]"
                placeholder="List any psychiatric medications and dosages..."
                placeholderTextColor="#747687"
                multiline
                textAlignVertical="top"
                value={medications}
                onChangeText={setMedications}
              />
            </View>
          </View>
        </ScrollView>

        <View className="p-6 border-t border-surface-variant bg-surface">
          <CustomButton 
            title="Next"
            onPress={() => router.push('/intake/symptoms')}
            disabled={!therapyBefore}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
