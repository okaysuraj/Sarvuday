import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function TherapistReviewsScreen() {
  const router = useRouter();

  const reviews = [
    { id: '1', name: 'Emma W.', date: '2 days ago', rating: 5, text: 'Dr. Jenkins is incredibly patient and understanding. She helped me reframe my anxiety in a way that actually feels manageable. Highly recommend her approach!', avatarBg: '#d9d9e6', icon: 'person' },
    { id: '2', name: 'Michael T.', date: '1 week ago', rating: 4, text: 'Great listener. The sessions are very structured which I appreciate, though sometimes I wish we had more time to just chat freely. Overall, very positive experience.', avatarBg: '#ffdad6', icon: 'person' },
    { id: '3', name: 'Anonymous', date: '3 weeks ago', rating: 5, text: "I've seen several therapists before, but Sarah is the first one who really helped me make tangible progress. Her techniques are practical and she creates a very safe space.", avatarBg: '#ffd9df', initial: 'A' },
  ];

  const ratingBreakdown = [
    { stars: 5, count: 98, percent: '80%' },
    { stars: 4, count: 18, percent: '15%' },
    { stars: 3, count: 5, percent: '3%' },
    { stars: 2, count: 2, percent: '1%' },
    { stars: 1, count: 1, percent: '1%' },
  ];

  return (
    <View className="flex-1 bg-[#fbf8ff]">
      {/* Top App Bar */}
      <View className="flex-row justify-between items-center px-4 py-4 border-b-[1.5px] border-ink-black bg-[#fbf8ff] z-40 sticky top-0">
        <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full active:bg-surface-container-high items-center justify-center">
          <Ionicons name="arrow-back" size={24} color="#002da5" />
        </TouchableOpacity>
        <Text className="font-display-lg-mobile text-primary font-bold text-2xl tracking-tight">MindEase</Text>
        <TouchableOpacity className="p-2 rounded-full active:bg-surface-container-high items-center justify-center">
          <Ionicons name="ellipsis-vertical" size={24} color="#002da5" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 py-6 max-w-2xl mx-auto w-full">
        
        {/* Therapist Header Summary */}
        <View className="flex-col items-center text-center mb-8">
          <Text className="font-headline-md text-ink-black font-bold text-3xl mb-2">Dr. Sarah Jenkins</Text>
          <Text className="text-on-surface-variant font-body-lg text-lg mb-4">Clinical Psychologist</Text>
          <View className="flex-row items-center gap-2">
            <View className="flex-row text-[#fdd33f]">
              <Ionicons name="star" size={24} color="#fdd33f" />
              <Ionicons name="star" size={24} color="#fdd33f" />
              <Ionicons name="star" size={24} color="#fdd33f" />
              <Ionicons name="star" size={24} color="#fdd33f" />
              <Ionicons name="star-half" size={24} color="#fdd33f" />
            </View>
            <Text className="font-headline-sm text-ink-black font-bold text-2xl">4.8</Text>
            <Text className="text-on-surface-variant ml-2">(124 reviews)</Text>
          </View>
        </View>

        {/* Rating Breakdown Card */}
        <View className="bg-white border-[1.5px] border-ink-black rounded-[24px] p-6 mb-8">
          <Text className="font-headline-sm text-ink-black font-bold text-xl mb-4">Rating Breakdown</Text>
          <View className="flex-col gap-3">
            {ratingBreakdown.map((row) => (
              <View key={row.stars} className="flex-row items-center gap-3">
                <Text className="font-label-bold text-ink-black font-bold w-4 text-right">{row.stars}</Text>
                <Ionicons name="star" size={16} color="#fdd33f" />
                <View className="flex-1 h-3 bg-[#f5f2f9] rounded-full border-[1.5px] border-ink-black overflow-hidden flex-row">
                  <View className="h-full bg-[#ffe082] border-r-[1.5px] border-ink-black" style={{ width: row.percent }} />
                </View>
                <Text className="font-body-md text-on-surface-variant w-8">{row.count}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Reviews List */}
        <View className="flex-col gap-4 pb-24">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="font-headline-sm text-ink-black font-bold text-xl">User Reviews</Text>
            <TouchableOpacity>
              <Text className="text-primary font-label-bold font-bold text-sm underline">Sort by: Newest</Text>
            </TouchableOpacity>
          </View>

          {reviews.map((review) => (
            <View key={review.id} className="bg-white border-[1.5px] border-ink-black rounded-[24px] p-6">
              <View className="flex-row justify-between items-start mb-4">
                <View className="flex-row items-center gap-3">
                  <View className="w-12 h-12 rounded-full border-[1.5px] border-ink-black overflow-hidden items-center justify-center" style={{ backgroundColor: review.avatarBg }}>
                    {review.initial ? (
                      <Text className="font-label-bold text-ink-black font-bold text-xl">{review.initial}</Text>
                    ) : (
                      <Ionicons name={review.icon as any} size={24} color="#1A1A1A" />
                    )}
                  </View>
                  <View>
                    <Text className="font-label-bold text-ink-black font-bold">{review.name}</Text>
                    <Text className="text-on-surface-variant text-sm">{review.date}</Text>
                  </View>
                </View>
                <View className="flex-row text-[#fdd33f]">
                  {[...Array(5)].map((_, i) => (
                    <Ionicons key={i} name={i < review.rating ? "star" : "star-outline"} size={14} color="#fdd33f" />
                  ))}
                </View>
              </View>
              <Text className="font-body-md text-ink-black">{review.text}</Text>
            </View>
          ))}
        </View>

      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity className="absolute bottom-8 right-8 bg-primary border-[1.5px] border-ink-black rounded-full px-6 py-3 shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-transform flex-row items-center gap-2 z-50">
        <Ionicons name="pencil" size={20} color="#ffffff" />
        <Text className="text-white font-label-bold font-bold">Write a Review</Text>
      </TouchableOpacity>
    </View>
  );
}
