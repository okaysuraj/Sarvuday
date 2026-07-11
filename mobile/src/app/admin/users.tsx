import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function UserManagementScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <View className="flex-row items-center px-4 py-3 border-b border-surface-variant bg-surface">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 justify-center">
          <Ionicons name="arrow-back" size={24} color="#1b1b20" />
        </TouchableOpacity>
        <Text className="font-headline-md text-on-surface font-bold text-xl ml-2 flex-1">
          User Directory
        </Text>
      </View>

      <View className="px-6 py-4 border-b border-surface-variant">
        <View className="flex-row items-center bg-surface-container-highest rounded-full px-4 py-2">
          <Ionicons name="search" size={20} color="#747687" className="mr-2" />
          <TextInput
            className="flex-1 font-body-md text-on-surface py-2"
            placeholder="Search by name or ID..."
            placeholderTextColor="#747687"
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      <ScrollView className="flex-1 px-6 pt-4">
        {[
          { id: 'usr_892', name: 'Maria Garcia', role: 'Patient', status: 'Active' },
          { id: 'usr_145', name: 'Dr. Sarah Jenkins', role: 'Therapist', status: 'Active' },
          { id: 'usr_663', name: 'John Doe', role: 'Patient', status: 'Suspended' },
        ].map((user) => (
          <TouchableOpacity 
            key={user.id}
            className="bg-surface-container-highest p-4 rounded-xl mb-4 border border-outline-variant flex-row items-center"
          >
            <View className="w-12 h-12 rounded-full bg-surface-variant items-center justify-center mr-4">
              <Ionicons name="person" size={24} color="#747687" />
            </View>
            <View className="flex-1">
              <Text className="font-headline-md text-on-surface font-bold text-lg">{user.name}</Text>
              <Text className="font-body-md text-on-surface-variant text-sm">{user.role} • {user.id}</Text>
            </View>
            
            <View className={`px-2 py-1 rounded-full ${user.status === 'Active' ? 'bg-primary-fixed' : 'bg-error-container'}`}>
              <Text className={`font-label-bold text-xs ${user.status === 'Active' ? 'text-on-primary-fixed' : 'text-on-error-container'}`}>
                {user.status}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
