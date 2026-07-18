import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { userApi } from '../../api/user';
import { useRouter } from 'expo-router';

export default function TherapistsTabScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [therapists, setTherapists] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const trendingSpecializations = [
    { name: 'Anxiety', color: 'bg-accent-orange' },
    { name: 'Relationship', color: 'bg-primary-fixed' },
    { name: 'Career', color: 'bg-secondary-fixed' },
    { name: 'ADHD', color: 'bg-accent-sage' },
    { name: 'Depression', color: 'bg-tertiary-fixed' }
  ];

  useEffect(() => {
    const loadTherapists = async () => {
      try {
        const data = await userApi.getTherapists();
        // Assume data returns { total_count, counsellors }
        setTherapists(data?.counsellors || []);
      } catch (error) {
        console.error('Error fetching therapists:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadTherapists();
  }, []);

  const filteredTherapists = therapists.filter(t => 
    t.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.specializations?.some((s: string) => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <ScrollView className="flex-1 bg-background" contentContainerStyle={{ paddingBottom: 100 }}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4 border-b-[1.5px] border-ink-black bg-background z-40 sticky top-0">
        <TouchableOpacity className="p-2 rounded-full active:bg-surface-container-high">
          <Ionicons name="arrow-back" size={24} color="#434655" />
        </TouchableOpacity>
        <Text className="font-headline-sm text-primary font-bold text-xl">SarvUday</Text>
        <TouchableOpacity className="p-2 rounded-full active:bg-surface-container-high">
          <Ionicons name="notifications-outline" size={24} color="#434655" />
        </TouchableOpacity>
      </View>

      <View className="px-6 py-6 flex-col gap-8">
        {/* Search Section */}
        <View className="flex-col gap-3">
          <Text className="font-headline-sm text-on-surface font-bold text-2xl">Find a Therapist</Text>
          <View className="flex-row gap-2 items-center">
            <View className="flex-1 relative">
              <View className="absolute left-4 top-4 z-10">
                <Ionicons name="search" size={20} color="#747687" />
              </View>
              <TextInput 
                className="w-full bg-[#f9f8f3] border-[1.5px] border-ink-black rounded-xl py-3 pl-12 pr-4 font-body-md text-on-surface placeholder:text-outline-variant"
                placeholder="Search by name or specialty..."
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
            <TouchableOpacity className="bg-accent-sage border-[1.5px] border-ink-black rounded-xl p-3 shadow-[4px_4px_0px_0px_#1A1A1A] w-12 h-12 items-center justify-center">
              <Ionicons name="options" size={20} color="#1A1A1A" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Trending Specializations */}
        <View className="flex-col gap-3">
          <Text className="font-label-bold text-on-surface-variant uppercase tracking-wider text-xs font-bold">Trending Specializations</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pb-2 pt-1 -mx-6 px-6">
            {trendingSpecializations.map((spec, idx) => (
              <TouchableOpacity key={idx} className={`${spec.color} border-[1.5px] border-ink-black rounded-full px-4 py-2 mr-3 active:translate-y-0.5`}>
                <Text className="font-label-md text-ink-black">{spec.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Recent Searches */}
        <View className="flex-col gap-3">
          <Text className="font-headline-sm text-on-surface font-bold text-xl">Recent Searches</Text>
          <View className="flex-row gap-4">
            <View className="flex-1 bg-surface border-[1.5px] border-ink-black rounded-2xl p-4 flex-col gap-2">
              <View className="bg-primary-fixed w-10 h-10 rounded-full flex items-center justify-center border-[1.5px] border-ink-black">
                <Ionicons name="bulb" size={20} color="#002da5" />
              </View>
              <Text className="font-label-md text-on-surface font-bold">Cognitive Behavioral</Text>
              <Text className="text-xs text-on-surface-variant">2 days ago</Text>
            </View>
            <View className="flex-1 bg-surface border-[1.5px] border-ink-black rounded-2xl p-4 flex-col gap-2">
              <View className="bg-accent-orange w-10 h-10 rounded-full flex items-center justify-center border-[1.5px] border-ink-black">
                <Ionicons name="heart" size={20} color="#754650" />
              </View>
              <Text className="font-label-md text-on-surface font-bold">Couples Therapy</Text>
              <Text className="text-xs text-on-surface-variant">Last week</Text>
            </View>
          </View>
        </View>

        {/* Popular Near You (Results) */}
        <View className="flex-col gap-4">
          <View className="flex-row justify-between items-end">
            <Text className="font-headline-sm text-on-surface font-bold text-xl">Popular Near You</Text>
            <TouchableOpacity>
              <Text className="font-label-bold text-primary font-bold">See All</Text>
            </TouchableOpacity>
          </View>
          
          <View className="flex-col gap-6">
            {isLoading ? (
              <ActivityIndicator size="large" color="#002da5" />
            ) : filteredTherapists.length > 0 ? (
              filteredTherapists.map((therapist, idx) => (
                <View key={therapist.user_id || idx} className="bg-surface border-[1.5px] border-ink-black rounded-[24px] p-6 flex-col gap-4">
                  <View className="absolute top-4 right-4 bg-secondary-fixed border-[1.5px] border-ink-black rounded-full px-2 py-1 flex-row items-center gap-1">
                    <Ionicons name="star" size={12} color="#1b1b20" />
                    <Text className="font-label-md text-xs font-bold">{therapist.average_rating?.toFixed(1) || '4.9'}</Text>
                  </View>
                  <View className="flex-row gap-4 items-center">
                    <Image 
                      source={{ uri: therapist.profile_pic_url || `https://api.dicebear.com/7.x/notionists/png?seed=${therapist.user_id}` }} 
                      className="w-16 h-16 rounded-full border-[1.5px] border-ink-black object-cover"
                    />
                    <View>
                      <Text className="font-label-bold text-on-surface font-bold text-lg">Dr. {therapist.name}</Text>
                      <Text className="font-body-md text-sm text-on-surface-variant">
                        {therapist.specializations?.slice(0, 2).join(', ') || 'Therapist'}
                      </Text>
                    </View>
                  </View>
                  <View className="flex-row gap-2">
                    <View className="bg-surface-container border-[1.5px] border-ink-black rounded-full px-3 py-1">
                      <Text className="text-xs font-medium">Accepts Insurance</Text>
                    </View>
                    <View className="bg-surface-container border-[1.5px] border-ink-black rounded-full px-3 py-1">
                      <Text className="text-xs font-medium">Virtual</Text>
                    </View>
                  </View>
                  <TouchableOpacity 
                    onPress={() => router.push(`/therapist/${therapist.user_id}`)}
                    className="bg-primary border-[1.5px] border-ink-black rounded-xl py-3 items-center shadow-[4px_4px_0px_0px_#1A1A1A] mt-2"
                  >
                    <Text className="text-white font-label-bold font-bold">View Profile</Text>
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <View className="p-8 items-center border-[1.5px] border-ink-black rounded-[24px] border-dashed">
                <Text className="text-on-surface-variant">No therapists found.</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
