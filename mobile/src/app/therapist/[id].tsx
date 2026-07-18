import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function TherapistProfileScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  // In a real app, fetch therapist details based on ID
  const therapist = {
    name: 'Dr. Sarah Jenkins',
    title: 'Clinical Psychologist',
    specialties: ['Anxiety', 'Depression', 'Trauma'],
    experience: '8+',
    rating: 4.9,
    patients: '1.2k',
    about: "I believe in a collaborative approach to therapy, blending cognitive-behavioral techniques with mindfulness to help you navigate life's challenges. My goal is to create a safe, warm space where we can work together towards your mental well-being.",
    location: {
      clinic: 'Mindful Care Clinic',
      address: '123 Wellness Blvd, Suite 400\nSan Francisco, CA 94105'
    },
    reviews: [
      {
        id: '1',
        author: 'Alex T.',
        initial: 'A',
        rating: 5,
        text: "Dr. Jenkins is incredibly patient and insightful. I've seen massive improvements in my daily anxiety."
      }
    ]
  };

  return (
    <View className="flex-1 bg-surface">
      {/* Header */}
      <View className="w-full top-0 bg-background border-b-[1.5px] border-ink-black flex-row justify-between items-center px-6 py-4 z-40">
        <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full active:bg-surface-container">
          <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <Text className="font-display-lg-mobile text-primary font-bold text-xl tracking-tighter">MindEase</Text>
        <TouchableOpacity className="p-2 rounded-full active:bg-surface-container">
          <Ionicons name="share-social" size={24} color="#1A1A1A" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 py-8" contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Hero Section */}
        <View className="flex-col items-center text-center mb-8">
          <View className="relative mb-6">
            <View className="w-32 h-32 rounded-full border-[1.5px] border-ink-black bg-primary-fixed shadow-[4px_4px_0px_0px_#1A1A1A] items-center justify-center">
              <Ionicons name="person" size={64} color="#002da5" />
            </View>
            <View className="absolute bottom-0 right-0 bg-secondary-container border-[1.5px] border-ink-black rounded-full p-1 shadow-[2px_2px_0px_0px_#1A1A1A]">
              <Ionicons name="checkmark-circle" size={16} color="#715b00" />
            </View>
          </View>
          <Text className="font-headline-sm text-ink-black font-bold text-2xl mb-1">{therapist.name}</Text>
          <Text className="font-body-md text-on-surface-variant mb-4">{therapist.title}</Text>
          <View className="flex-row flex-wrap justify-center gap-2">
            {therapist.specialties.map((spec, idx) => (
              <View key={idx} className={`${idx % 2 === 0 ? 'bg-accent-sage' : 'bg-accent-pink'} border-[1.5px] border-ink-black rounded-full px-4 py-1`}>
                <Text className="font-label-md text-ink-black font-bold">{spec}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Stats Row */}
        <View className="flex-row gap-3 mb-8">
          <View className="flex-1 bg-primary-fixed border-[1.5px] border-ink-black rounded-xl p-3 items-center justify-center">
            <Text className="font-headline-sm text-ink-black font-bold text-xl">{therapist.experience}</Text>
            <Text className="font-label-bold text-on-surface-variant uppercase text-[10px] font-bold">Years Exp</Text>
          </View>
          <View className="flex-1 bg-secondary-fixed border-[1.5px] border-ink-black rounded-xl p-3 items-center justify-center">
            <Text className="font-headline-sm text-ink-black font-bold text-xl">{therapist.rating}</Text>
            <View className="flex-row mt-1">
              <Ionicons name="star" size={12} color="#725c00" />
            </View>
          </View>
          <View className="flex-1 bg-tertiary-fixed border-[1.5px] border-ink-black rounded-xl p-3 items-center justify-center">
            <Text className="font-headline-sm text-ink-black font-bold text-xl">{therapist.patients}</Text>
            <Text className="font-label-bold text-on-surface-variant uppercase text-[10px] font-bold">Patients</Text>
          </View>
        </View>

        {/* Bio Section */}
        <View className="bg-white border-[1.5px] border-ink-black rounded-[24px] p-6 shadow-[4px_4px_0px_0px_#1A1A1A] mb-8">
          <Text className="font-headline-sm text-ink-black font-bold text-xl mb-3">About Me</Text>
          <Text className="font-body-md text-on-surface-variant leading-relaxed">
            {therapist.about}
          </Text>
        </View>

        {/* Location Section */}
        <View className="bg-white border-[1.5px] border-ink-black rounded-[24px] p-6 shadow-[4px_4px_0px_0px_#1A1A1A] mb-8 relative overflow-hidden">
          <Text className="font-headline-sm text-ink-black font-bold text-xl mb-3 z-10">Location</Text>
          <View className="flex-row items-start gap-3 z-10">
            <Ionicons name="location" size={24} color="#002da5" className="mt-1" />
            <View>
              <Text className="font-label-md text-ink-black font-bold mb-1">{therapist.location.clinic}</Text>
              <Text className="font-body-md text-on-surface-variant">{therapist.location.address}</Text>
            </View>
          </View>
        </View>

        {/* Reviews Section */}
        <View className="mb-8">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="font-headline-sm text-ink-black font-bold text-xl">Reviews</Text>
            <TouchableOpacity>
              <Text className="font-label-bold text-primary font-bold">See All</Text>
            </TouchableOpacity>
          </View>
          <View className="flex-col gap-4">
            {therapist.reviews.map(review => (
              <View key={review.id} className="bg-surface-container border-[1.5px] border-ink-black rounded-xl p-4">
                <View className="flex-row justify-between items-start mb-2">
                  <View className="flex-row items-center gap-2">
                    <View className="w-8 h-8 rounded-full bg-accent-orange border-[1.5px] border-ink-black items-center justify-center">
                      <Text className="font-label-bold font-bold">{review.initial}</Text>
                    </View>
                    <Text className="font-label-md text-ink-black font-bold">{review.author}</Text>
                  </View>
                  <View className="flex-row">
                    {[...Array(5)].map((_, i) => (
                      <Ionicons key={i} name="star" size={14} color={i < review.rating ? "#715b00" : "#c4c5d8"} />
                    ))}
                  </View>
                </View>
                <Text className="font-body-md text-on-surface-variant text-sm italic">"{review.text}"</Text>
              </View>
            ))}
          </View>
        </View>

      </ScrollView>

      {/* Floating Action Button */}
      <View className="absolute bottom-0 left-0 w-full px-6 py-4 bg-white/80 border-t-[1.5px] border-ink-black">
        <TouchableOpacity 
          onPress={() => router.push(`/therapist/${id}/book`)}
          className="w-full bg-primary border-[1.5px] border-ink-black rounded-xl py-4 shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex-row items-center justify-center gap-2"
        >
          <Text className="text-white font-headline-sm font-bold text-lg">Book Appointment</Text>
          <Ionicons name="calendar" size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
