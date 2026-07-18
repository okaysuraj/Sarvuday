import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CustomButton } from '../../components/CustomButton';
import { userApi } from '../../api/user';

export default function EmergencySetupScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleComplete = async () => {
    setIsLoading(true);
    try {
      await userApi.updateProfile({
        emergency_contact_name: name,
        emergency_contact_relation: relationship,
        emergency_contact_phone: phone
      });
      Alert.alert(
        'Intake Complete', 
        'Thank you for completing your profile. You will now be taken to your dashboard.',
        [{ text: 'Go to Dashboard', onPress: () => router.replace('/(tabs)') }]
      );
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to save emergency contact details.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <View className="flex-row items-center px-4 py-3 border-b border-surface-variant bg-surface">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 justify-center">
          <Ionicons name="arrow-back" size={24} color="#1b1b20" />
        </TouchableOpacity>
        <Text className="font-headline-md text-on-surface font-bold text-xl ml-2 flex-1">
          Emergency Contact
        </Text>
        <Text className="font-label-bold text-on-surface-variant">Step 4 of 4</Text>
      </View>

      <View className="h-1 bg-surface-variant w-full">
        <View className="h-1 bg-primary" style={{ width: '100%' }} />
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} className="flex-1">
        <ScrollView className="flex-1 px-6 pt-6">
          <Ionicons name="alert-circle" size={48} color="#ba1a1a" className="mb-4" />
          <Text className="font-headline-md text-on-surface text-2xl font-bold mb-2">Safety First</Text>
          <Text className="font-body-md text-on-surface-variant mb-8">
            Please provide an emergency contact. We will only reach out to them if our AI or your therapist detects an imminent threat to your safety.
          </Text>

          <View className="gap-6 mb-8">
            <View>
              <Text className="font-label-bold text-on-surface mb-2">Full Name</Text>
              <TextInput
                className="bg-surface-container-highest rounded-xl p-4 font-body-md text-on-surface border border-outline-variant"
                placeholder="Jane Doe"
                placeholderTextColor="#747687"
                value={name}
                onChangeText={setName}
              />
            </View>

            <View>
              <Text className="font-label-bold text-on-surface mb-2">Relationship</Text>
              <TextInput
                className="bg-surface-container-highest rounded-xl p-4 font-body-md text-on-surface border border-outline-variant"
                placeholder="e.g., Parent, Spouse, Friend"
                placeholderTextColor="#747687"
                value={relationship}
                onChangeText={setRelationship}
              />
            </View>

            <View>
              <Text className="font-label-bold text-on-surface mb-2">Phone Number</Text>
              <TextInput
                className="bg-surface-container-highest rounded-xl p-4 font-body-md text-on-surface border border-outline-variant"
                placeholder="+1 (555) 000-0000"
                placeholderTextColor="#747687"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />
            </View>
          </View>
        </ScrollView>

        <View className="p-6 border-t border-surface-variant bg-surface">
          <CustomButton 
            title="Complete Setup"
            onPress={handleComplete}
            disabled={!name || !relationship || !phone}
            isLoading={isLoading}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
