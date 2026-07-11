import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ModerationScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <View className="flex-row items-center px-4 py-3 border-b border-surface-variant bg-surface">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 justify-center">
          <Ionicons name="arrow-back" size={24} color="#1b1b20" />
        </TouchableOpacity>
        <Text className="font-headline-md text-on-surface font-bold text-xl ml-2 flex-1">
          Moderation Queue
        </Text>
      </View>

      <ScrollView className="flex-1 px-6 pt-6">
        <Text className="font-body-md text-on-surface-variant mb-6">
          The following posts were flagged by the AI safety filter or reported by other users.
        </Text>

        {[1, 2].map((item) => (
          <View key={item} className="bg-surface-container-highest p-4 rounded-xl mb-6 border border-outline-variant">
            <View className="flex-row justify-between items-center mb-4">
              <View className="flex-row items-center">
                <Ionicons name="person-circle" size={24} color="#747687" className="mr-2" />
                <Text className="font-headline-md text-on-surface font-bold">User_99{item}</Text>
              </View>
              <View className="bg-error-container px-2 py-1 rounded">
                <Text className="text-on-error-container font-label-bold text-xs">Hate Speech Flag</Text>
              </View>
            </View>
            <Text className="font-body-md text-on-surface mb-6 italic">
              "This is the actual reported content that needs to be reviewed by a human moderator before it is permanently removed or restored."
            </Text>
            
            <View className="flex-row gap-4">
              <TouchableOpacity className="flex-1 bg-error py-2 rounded-lg items-center">
                <Text className="text-on-error font-label-bold">Delete Post</Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 bg-surface py-2 rounded-lg items-center border border-outline-variant">
                <Text className="text-on-surface font-label-bold">Ignore</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
