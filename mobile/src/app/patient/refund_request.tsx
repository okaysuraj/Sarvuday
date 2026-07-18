import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker'; // You might need to install this if not present, but for now we'll use a simple button toggle or react-native-picker if standard

// Simple select simulation for React Native if Picker isn't ideal
const reasonOptions = [
  { label: 'Technical difficulties during session', value: 'technical' },
  { label: 'Provider did not show up', value: 'provider_no_show' },
  { label: 'Not satisfied with the service', value: 'unhappy' },
  { label: 'Accidental purchase', value: 'accidental' },
  { label: 'Other', value: 'other' },
];

export default function RefundRequestScreen() {
  const router = useRouter();
  const [selectedSession, setSelectedSession] = useState('session_1');
  const [selectedReason, setSelectedReason] = useState('');
  const [details, setDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showReasonDropdown, setShowReasonDropdown] = useState(false);

  const handleSubmit = () => {
    if (!selectedReason) {
      alert('Please select a reason for your refund.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      alert('Refund request received. Our team will review it shortly.');
      setIsSubmitting(false);
      router.back();
    }, 1500);
  };

  return (
    <View className="flex-1 bg-cream-bg">
      {/* Top AppBar */}
      <View className="flex-row justify-between items-center px-4 py-4 w-full z-50 bg-surface border-b-[1.5px] border-ink-black sticky top-0">
        <View className="flex-row items-center gap-4">
          <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center rounded-full active:bg-surface-variant/20">
            <Ionicons name="arrow-back" size={24} color="#002da5" />
          </TouchableOpacity>
          <Text className="font-headline-md text-primary font-bold text-xl tracking-tight">SarvUday</Text>
        </View>
        <TouchableOpacity className="p-2 rounded-full active:bg-surface-variant/20">
          <Ionicons name="person-circle" size={28} color="#002da5" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 md:px-10 py-8 max-w-4xl mx-auto w-full" contentContainerStyle={{ paddingBottom: 120 }}>
        
        <View className="mb-8">
          <Text className="font-display-lg-mobile md:font-display-lg text-ink-black font-bold text-3xl md:text-5xl mb-2">Refund Request</Text>
          <Text className="text-on-surface-variant font-body-lg text-lg">We're sorry things didn't work out. Tell us what happened and we'll help you resolve this.</Text>
        </View>

        <View className="flex-col gap-6">
          
          {/* Session Selection Bento */}
          <View className="flex-col gap-4">
            <Text className="font-label-bold uppercase tracking-wider text-primary font-bold text-sm">1. Select a recent session or payment</Text>
            
            <View className="flex-col md:flex-row gap-4">
              {/* Session Card 1 */}
              <TouchableOpacity 
                onPress={() => setSelectedSession('session_1')}
                className={`flex-1 p-6 bg-surface-container-lowest border-[1.5px] border-ink-black rounded-[32px] ${selectedSession === 'session_1' ? 'bg-secondary-container shadow-[4px_4px_0px_0px_#1A1A1A]' : ''}`}
              >
                <View className="flex-row justify-between items-start mb-4">
                  <View className="w-12 h-12 bg-accent-sage border-[1.5px] border-ink-black rounded-xl items-center justify-center">
                    <Ionicons name="medical" size={24} color="#1b1b20" />
                  </View>
                  <View className="bg-white border-[1.5px] border-ink-black px-3 py-1 rounded-full">
                    <Text className="font-label-bold text-ink-black font-bold">₹1,200</Text>
                  </View>
                </View>
                <Text className="font-headline-sm text-ink-black font-bold text-xl mb-1">Therapy Session</Text>
                <Text className="text-on-surface-variant font-body-md">Oct 24, 2023 • Dr. Arpita S.</Text>
                {selectedSession === 'session_1' && (
                  <View className="mt-4 flex-row items-center">
                    <Ionicons name="checkmark-circle" size={20} color="#002da5" className="mr-2" />
                    <Text className="text-primary font-label-bold font-bold ml-2">Selected</Text>
                  </View>
                )}
              </TouchableOpacity>

              {/* Session Card 2 */}
              <TouchableOpacity 
                onPress={() => setSelectedSession('session_2')}
                className={`flex-1 p-6 bg-surface-container-lowest border-[1.5px] border-ink-black rounded-[32px] ${selectedSession === 'session_2' ? 'bg-secondary-container shadow-[4px_4px_0px_0px_#1A1A1A]' : ''}`}
              >
                <View className="flex-row justify-between items-start mb-4">
                  <View className="w-12 h-12 bg-accent-pink border-[1.5px] border-ink-black rounded-xl items-center justify-center">
                    <Ionicons name="happy" size={24} color="#1b1b20" />
                  </View>
                  <View className="bg-white border-[1.5px] border-ink-black px-3 py-1 rounded-full">
                    <Text className="font-label-bold text-ink-black font-bold">₹800</Text>
                  </View>
                </View>
                <Text className="font-headline-sm text-ink-black font-bold text-xl mb-1">Mood Workshop</Text>
                <Text className="text-on-surface-variant font-body-md">Oct 21, 2023 • Group Session</Text>
                {selectedSession === 'session_2' && (
                  <View className="mt-4 flex-row items-center">
                    <Ionicons name="checkmark-circle" size={20} color="#002da5" className="mr-2" />
                    <Text className="text-primary font-label-bold font-bold ml-2">Selected</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Reason Dropdown */}
          <View className="flex-col gap-4">
            <Text className="font-label-bold uppercase tracking-wider text-primary font-bold text-sm">2. Why are you requesting a refund?</Text>
            
            <View className="relative">
              <TouchableOpacity 
                onPress={() => setShowReasonDropdown(!showReasonDropdown)}
                className="w-full bg-[#f9f8f3] border-[1.5px] border-ink-black rounded-xl p-4 flex-row justify-between items-center"
              >
                <Text className="font-body-md text-ink-black">{selectedReason ? reasonOptions.find(o => o.value === selectedReason)?.label : 'Select a reason'}</Text>
                <Ionicons name={showReasonDropdown ? "chevron-up" : "chevron-down"} size={20} color="#1b1b20" />
              </TouchableOpacity>
              
              {showReasonDropdown && (
                <View className="w-full bg-white border-[1.5px] border-ink-black rounded-xl mt-2 z-10 p-2">
                  {reasonOptions.map((option) => (
                    <TouchableOpacity 
                      key={option.value}
                      onPress={() => {
                        setSelectedReason(option.value);
                        setShowReasonDropdown(false);
                      }}
                      className="p-3 border-b-[1px] border-surface-variant last:border-b-0"
                    >
                      <Text className="font-body-md text-ink-black">{option.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            <TextInput
              className="w-full h-32 bg-[#f9f8f3] border-[1.5px] border-ink-black rounded-xl p-4 font-body-md text-ink-black"
              placeholder="Additional details (optional)"
              placeholderTextColor="#747687"
              multiline
              textAlignVertical="top"
              value={details}
              onChangeText={setDetails}
            />
          </View>

          {/* Terms Summary Card */}
          <View className="bg-accent-orange/30 border-[1.5px] border-ink-black rounded-[32px] p-8 flex-col gap-4">
            <View className="flex-row items-center gap-3 mb-2">
              <Ionicons name="information-circle" size={24} color="#5a3039" />
              <Text className="font-label-bold uppercase font-bold text-ink-black text-sm">Terms & Conditions Summary</Text>
            </View>
            <View className="flex-col gap-3">
              <View className="flex-row items-start gap-3 pr-4">
                <Ionicons name="ellipse" size={8} color="#1b1b20" style={{ marginTop: 6 }} />
                <Text className="font-body-md text-on-surface">Refund requests must be submitted within 48 hours of the scheduled session.</Text>
              </View>
              <View className="flex-row items-start gap-3 pr-4">
                <Ionicons name="ellipse" size={8} color="#1b1b20" style={{ marginTop: 6 }} />
                <Text className="font-body-md text-on-surface">Processing time is typically 5-7 business days back to your original payment method.</Text>
              </View>
              <View className="flex-row items-start gap-3 pr-4">
                <Ionicons name="ellipse" size={8} color="#1b1b20" style={{ marginTop: 6 }} />
                <Text className="font-body-md text-on-surface">Approval is subject to review by our support team based on session logs.</Text>
              </View>
            </View>
          </View>

          {/* Submit Action */}
          <View className="pt-4 flex-col md:flex-row items-center gap-6">
            <TouchableOpacity 
              onPress={handleSubmit}
              disabled={isSubmitting}
              className={`w-full md:w-auto px-10 py-4 ${isSubmitting ? 'bg-accent-sage' : 'bg-primary'} border-[1.5px] border-ink-black rounded-xl shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none items-center justify-center`}
            >
              <Text className={`${isSubmitting ? 'text-ink-black' : 'text-white'} font-headline-sm font-bold text-lg`}>
                {isSubmitting ? 'Processing...' : 'Submit Request'}
              </Text>
            </TouchableOpacity>
            <Text className="text-label-md text-on-surface-variant italic mt-4 md:mt-0 text-center">By submitting, you agree to the full refund policy.</Text>
          </View>

        </View>

      </ScrollView>

      {/* Bottom Navigation */}
      <View className="md:hidden absolute bottom-0 w-full bg-surface border-t-[1.5px] border-ink-black h-[80px] px-4 pb-4 flex-row justify-around items-center z-50">
        <TouchableOpacity onPress={() => router.push('/patient/dashboard')} className="flex-col items-center justify-center p-2">
          <Ionicons name="home" size={24} color="#434655" />
          <Text className="font-label-md text-on-surface-variant mt-1">Home</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center p-2">
          <Ionicons name="hardware-chip" size={24} color="#434655" />
          <Text className="font-label-md text-on-surface-variant mt-1">AI Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center p-2">
          <Ionicons name="calendar" size={24} color="#434655" />
          <Text className="font-label-md text-on-surface-variant mt-1">Book</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center bg-secondary-container border-[1.5px] border-ink-black rounded-xl px-4 py-1">
          <Ionicons name="person" size={24} color="#715b00" />
          <Text className="font-label-md text-on-secondary-container font-bold mt-1">Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
