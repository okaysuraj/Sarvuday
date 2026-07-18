import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Modal, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function DeleteAccountScreen() {
  const router = useRouter();
  const [confirmText, setConfirmText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [reason, setReason] = useState('');
  const [showReasons, setShowReasons] = useState(false);
  const [inputError, setInputError] = useState(false);

  const reasons = [
    { id: 'privacy', label: 'Privacy concerns' },
    { id: 'expensive', label: 'Too expensive' },
    { id: 'not-useful', label: 'Not useful enough' },
    { id: 'technical', label: 'Technical issues' },
    { id: 'other', label: 'Other' },
  ];

  const handleDelete = () => {
    if (confirmText.trim().toUpperCase() === 'DELETE') {
      setInputError(false);
      setShowModal(true);
    } else {
      setInputError(true);
    }
  };

  return (
    <KeyboardAvoidingView 
      className="flex-1 bg-cream-bg"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* TopAppBar */}
      <View className="flex-row justify-between items-center px-4 py-4 w-full z-50 bg-cream-bg border-b-[1.5px] border-ink-black sticky top-0">
        <View className="flex-row items-center gap-4">
          <TouchableOpacity onPress={() => router.back()} className="hover:bg-surface-container-low p-2 rounded-full active:translate-x-[2px] active:translate-y-[2px]">
            <Ionicons name="arrow-back" size={24} color="#002da5" />
          </TouchableOpacity>
          <Text className="font-headline-md text-primary font-bold text-xl tracking-tight">Delete Account</Text>
        </View>
        <View className="w-10 h-10 rounded-full border-[1.5px] border-ink-black overflow-hidden bg-accent-sage items-center justify-center">
          <Ionicons name="person" size={24} color="#1b1b20" />
        </View>
      </View>

      <ScrollView className="flex-1 px-4 md:px-10 py-8 max-w-2xl mx-auto w-full" contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Warning Header Sticker */}
        <View className="bg-accent-orange p-8 rounded-[32px] border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] relative overflow-hidden mb-8">
          <View className="absolute -top-4 -right-4 w-24 h-24 bg-error opacity-10 rounded-full" />
          <View className="flex-col gap-2 relative z-10">
            <View className="flex-row items-center gap-2">
              <Ionicons name="warning" size={24} color="#ba1a1a" />
              <Text className="font-headline-sm text-error font-bold uppercase tracking-wider text-lg">High Priority Warning</Text>
            </View>
            <Text className="font-body-lg text-ink-black font-semibold text-lg">
              Deleting your account is permanent. This action cannot be undone.
            </Text>
          </View>
        </View>

        {/* Consequences Bento Grid */}
        <View className="flex-col md:flex-row gap-6 mb-8">
          {/* Data Loss Sticker */}
          <View className="flex-1 bg-white p-6 rounded-[24px] border-[1.5px] border-ink-black flex-col gap-4">
            <View className="w-12 h-12 bg-accent-pink rounded-xl border-[1.5px] border-ink-black items-center justify-center">
              <Ionicons name="trash-bin" size={24} color="#5a3039" />
            </View>
            <View>
              <Text className="font-label-bold text-ink-black font-bold mb-1">Data Removal</Text>
              <Text className="text-on-surface-variant font-body-md text-base">All your history, profile data, and saved insights will be wiped from our servers forever.</Text>
            </View>
          </View>

          {/* Subscription Sticker */}
          <View className="flex-1 bg-white p-6 rounded-[24px] border-[1.5px] border-ink-black flex-col gap-4">
            <View className="w-12 h-12 bg-secondary-container rounded-xl border-[1.5px] border-ink-black items-center justify-center">
              <Ionicons name="close-circle" size={24} color="#725c00" />
            </View>
            <View>
              <Text className="font-label-bold text-ink-black font-bold mb-1">Subscription End</Text>
              <Text className="text-on-surface-variant font-body-md text-base">Active premium subscriptions will be cancelled immediately without refund eligibility.</Text>
            </View>
          </View>
        </View>

        {/* Reason Input Section */}
        <View className="bg-surface-container-low p-8 rounded-[40px] border-[1.5px] border-ink-black flex-col gap-6 mb-8">
          <View className="flex-col gap-2 relative">
            <Text className="font-label-bold text-ink-black font-bold px-2">Why are you leaving?</Text>
            <TouchableOpacity 
              onPress={() => setShowReasons(!showReasons)}
              className="w-full bg-[#f9f8f3] border-[1.5px] border-ink-black rounded-xl p-4 flex-row justify-between items-center"
            >
              <Text className={`font-body-md text-base ${reason ? 'text-ink-black' : 'text-outline-variant'}`}>
                {reason ? reasons.find(r => r.id === reason)?.label : 'Select a reason'}
              </Text>
              <Ionicons name={showReasons ? "chevron-up" : "chevron-down"} size={20} color="#1A1A1A" />
            </TouchableOpacity>
            
            {showReasons && (
              <View className="absolute top-[80px] w-full bg-white border-[1.5px] border-ink-black rounded-xl z-20 overflow-hidden shadow-[4px_4px_0px_0px_#1A1A1A]">
                {reasons.map(r => (
                  <TouchableOpacity 
                    key={r.id}
                    onPress={() => {
                      setReason(r.id);
                      setShowReasons(false);
                    }}
                    className="p-4 border-b border-ink-black/10 active:bg-surface-container"
                  >
                    <Text className="font-body-md text-ink-black text-base">{r.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          <View className="flex-col gap-2">
            <Text className="font-label-bold text-ink-black font-bold px-2">Type "DELETE" to confirm</Text>
            <TextInput 
              className={`w-full bg-[#f9f8f3] border-[1.5px] ${inputError ? 'border-error' : 'border-ink-black'} rounded-xl p-4 font-body-md text-base text-ink-black`}
              placeholder="DELETE"
              placeholderTextColor="#747687"
              value={confirmText}
              onChangeText={setConfirmText}
              autoCapitalize="characters"
            />
            {inputError && (
              <Text className="text-error font-label-md px-2 text-sm mt-1">Please type "DELETE" to confirm your intent.</Text>
            )}
          </View>
        </View>

        {/* Final Action */}
        <View className="flex-col gap-4 mt-6">
          <TouchableOpacity 
            onPress={handleDelete}
            className="w-full bg-error rounded-[20px] border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none p-5 items-center justify-center"
          >
            <Text className="text-white font-label-bold font-bold uppercase text-xl">Delete Account</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => router.back()}
            className="w-full p-4 items-center justify-center"
          >
            <Text className="text-on-surface-variant font-label-bold font-bold">Wait, I want to stay</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* Modal Implementation for Confirmation */}
      <Modal visible={showModal} transparent={true} animationType="fade">
        <View className="flex-1 bg-ink-black/40 justify-center items-center p-4">
          <View className="bg-cream-bg border-[1.5px] border-ink-black rounded-[48px] p-8 max-w-md w-full shadow-[8px_8px_0px_0px_#1A1A1A] flex-col items-center gap-6 text-center">
            
            <View className="w-20 h-20 bg-error-container rounded-full items-center justify-center border-[1.5px] border-ink-black">
              <Ionicons name="heart-dislike" size={40} color="#ba1a1a" />
            </View>
            
            <View className="flex-col gap-2 items-center">
              <Text className="font-headline-md text-ink-black font-bold text-3xl text-center">Are you absolutely sure?</Text>
              <Text className="font-body-md text-on-surface-variant text-base text-center">This is your final chance to turn back. All your progress will be lost forever.</Text>
            </View>

            <View className="flex-col w-full gap-4 mt-4">
              <TouchableOpacity className="w-full bg-ink-black rounded-xl p-4 active:translate-x-[1px] active:translate-y-[1px] items-center">
                <Text className="text-white font-label-bold font-bold text-base">Yes, delete everything</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                onPress={() => setShowModal(false)}
                className="w-full bg-white border-[1.5px] border-ink-black rounded-xl p-4 shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none items-center"
              >
                <Text className="text-ink-black font-label-bold font-bold text-base">No, take me back</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>

    </KeyboardAvoidingView>
  );
}
