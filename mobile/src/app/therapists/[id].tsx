import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CustomButton } from '../../components/CustomButton';
import { appointmentsApi } from '../../api/appointments';

export default function TherapistProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const [therapist, setTherapist] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await appointmentsApi.getTherapistProfile(id as string);
        setTherapist(profile);
      } catch (error) {
        console.error('Error fetching therapist profile:', error);
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchProfile();
  }, [id]);

  if (isLoading) {
    return (
      <View className="flex-1 bg-surface justify-center items-center">
        <ActivityIndicator size="large" color="#002da5" />
      </View>
    );
  }

  if (!therapist) {
    return (
      <View className="flex-1 bg-surface justify-center items-center">
        <Text className="text-on-surface">Therapist not found.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <View className="flex-row items-center px-4 py-3 border-b border-surface-variant bg-surface">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 justify-center">
          <Ionicons name="arrow-back" size={24} color="#1b1b20" />
        </TouchableOpacity>
        <Text className="font-headline-md text-on-surface font-bold text-xl ml-2 flex-1">
          Profile
        </Text>
      </View>

      <ScrollView className="flex-1 px-6 pt-6">
        <View className="items-center mb-6">
          <View className="w-24 h-24 rounded-full bg-surface-variant items-center justify-center mb-4">
            <Ionicons name="person" size={48} color="#747687" />
          </View>
          <Text className="font-headline-md text-on-surface font-bold text-2xl text-center">{therapist.name}</Text>
          <Text className="font-body-md text-on-surface-variant text-base mt-1 text-center">
            {therapist.specializations?.join(', ') || 'General Counselor'}
          </Text>
          
          <View className="flex-row items-center mt-3 bg-surface-container-highest px-3 py-1 rounded-full border border-outline-variant">
            <Ionicons name="star" size={16} color="#ebc22e" className="mr-1" />
            <Text className="font-label-bold text-on-surface text-sm">{therapist.average_rating || '5.0'}</Text>
            <Text className="font-body-md text-on-surface-variant text-sm ml-1">({therapist.total_reviews || '0'} reviews)</Text>
          </View>
        </View>

        <View className="mb-8 gap-6">
          <View>
            <Text className="font-headline-md text-on-surface text-lg font-bold mb-2">About</Text>
            <Text className="font-body-md text-on-surface-variant text-sm leading-6">
              {therapist.bio || 'This therapist has not provided a bio yet.'}
            </Text>
          </View>
          
          {therapist.education_qualifications && therapist.education_qualifications.length > 0 && (
            <View>
              <Text className="font-headline-md text-on-surface text-lg font-bold mb-2">Education & Credentials</Text>
              <View className="flex-row items-start">
                <Ionicons name="school-outline" size={20} color="#747687" className="mr-2 mt-1" />
                <Text className="font-body-md text-on-surface-variant text-sm leading-6 flex-1">
                  {therapist.education_qualifications.join('\n')}
                </Text>
              </View>
            </View>
          )}

          <View>
            <Text className="font-headline-md text-on-surface text-lg font-bold mb-2">Session Pricing</Text>
            <View className="flex-row items-center bg-primary-fixed p-4 rounded-xl border border-primary-fixed-dim">
              <Ionicons name="videocam" size={24} color="#002da5" className="mr-3" />
              <View className="flex-1">
                <Text className="font-headline-md text-on-primary-fixed font-bold">Video Consultation</Text>
                <Text className="font-body-md text-on-primary-fixed-variant text-sm">{therapist.session_duration || 50} minutes</Text>
              </View>
              <Text className="font-headline-md text-primary font-bold text-lg">${therapist.session_fee || 80}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View className="p-6 border-t border-surface-variant bg-surface">
        <CustomButton 
          title="Book Session"
          onPress={() => router.push(`/booking/${id}/slots`)}
        />
      </View>
    </SafeAreaView>
  );
}
