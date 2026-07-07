import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const MOODS = [
  { icon: 'sad-outline', label: 'Awful', value: 1, color: '#EF4444' },
  { icon: 'cloud-outline', label: 'Bad', value: 2, color: '#F97316' },
  { icon: 'remove-outline', label: 'Okay', value: 3, color: '#EAB308' },
  { icon: 'happy-outline', label: 'Good', value: 4, color: '#22C55E' },
  { icon: 'sunny-outline', label: 'Great', value: 5, color: '#3B82F6' },
];

export default function DailyCheckInScreen() {
  const router = useRouter();
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [energyLevel, setEnergyLevel] = useState<number>(3);
  const [anxietyLevel, setAnxietyLevel] = useState<number>(3);
  const [sleepQuality, setSleepQuality] = useState<string>('');
  const [notes, setNotes] = useState('');

  const handleSubmit = () => {
    if (!selectedMood) {
      Alert.alert("Please select a mood", "We'd love to know how you're feeling first.");
      return;
    }
    
    // In a real app, this would post to our backend /api/mood-tracking
    Alert.alert("Check-In Complete", "Your daily insights have been saved securely.");
    router.back();
  };

  const renderSlider = (label: string, value: number, setValue: (v: number) => void, max: number = 5) => (
    <View style={styles.sliderContainer}>
      <Text style={styles.sectionLabel}>{label}</Text>
      <View style={styles.sliderRow}>
        {[...Array(max)].map((_, idx) => (
          <TouchableOpacity 
            key={idx} 
            style={[styles.sliderTick, value >= idx + 1 && styles.sliderTickActive]}
            onPress={() => setValue(idx + 1)}
          />
        ))}
      </View>
      <View style={styles.sliderLabels}>
        <Text style={styles.sliderLabelText}>Low</Text>
        <Text style={styles.sliderLabelText}>High</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={28} color="#F8FAFC" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Daily Check-In</Text>
        <View style={{ width: 28 }} />
      </View>

      <Text style={styles.questionText}>How are you feeling right now?</Text>
      
      <View style={styles.moodRow}>
        {MOODS.map(mood => (
          <TouchableOpacity 
            key={mood.value} 
            style={[
              styles.moodItem, 
              selectedMood === mood.value && { backgroundColor: mood.color, borderColor: mood.color }
            ]}
            onPress={() => setSelectedMood(mood.value)}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={`Mood: ${mood.label}`}
            accessibilityState={{ selected: selectedMood === mood.value }}
          >
            <Ionicons 
              name={mood.icon as any} 
              size={32} 
              color={selectedMood === mood.value ? '#FFF' : mood.color} 
            />
            <Text style={[
              styles.moodLabel, 
              selectedMood === mood.value && { color: '#FFF' }
            ]}>{mood.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.divider} />

      {renderSlider("Energy Level", energyLevel, setEnergyLevel)}
      {renderSlider("Anxiety / Stress", anxietyLevel, setAnxietyLevel)}

      <Text style={styles.sectionLabel}>Sleep Quality</Text>
      <View style={styles.sleepRow}>
        {['Poor', 'Fair', 'Good', 'Excellent'].map(sq => (
          <TouchableOpacity 
            key={sq} 
            style={[styles.sleepPill, sleepQuality === sq && styles.sleepPillActive]}
            onPress={() => setSleepQuality(sq)}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={`Sleep quality: ${sq}`}
            accessibilityState={{ selected: sleepQuality === sq }}
          >
            <Text style={[styles.sleepText, sleepQuality === sq && styles.sleepTextActive]}>{sq}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionLabel}>Journal (Optional)</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Anything specific on your mind?"
        placeholderTextColor="#64748B"
        multiline
        value={notes}
        onChangeText={setNotes}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Save Check-In</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  content: {
    padding: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F8FAFC',
  },
  questionText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 24,
    textAlign: 'center',
  },
  moodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  moodItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 80,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#334155',
    backgroundColor: '#1E293B',
  },
  moodLabel: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 8,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#334155',
    marginVertical: 20,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#E2E8F0',
    marginBottom: 16,
    marginTop: 10,
  },
  sliderContainer: {
    marginBottom: 24,
  },
  sliderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sliderTick: {
    flex: 1,
    height: 12,
    backgroundColor: '#334155',
    marginHorizontal: 4,
    borderRadius: 6,
  },
  sliderTickActive: {
    backgroundColor: '#3B82F6',
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingHorizontal: 4,
  },
  sliderLabelText: {
    color: '#94A3B8',
    fontSize: 12,
  },
  sleepRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  sleepPill: {
    flex: 1,
    backgroundColor: '#1E293B',
    paddingVertical: 12,
    borderRadius: 12,
    marginHorizontal: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  sleepPillActive: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  sleepText: {
    color: '#94A3B8',
    fontWeight: '600',
  },
  sleepTextActive: {
    color: '#FFF',
  },
  textInput: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 16,
    color: '#F8FAFC',
    minHeight: 120,
    textAlignVertical: 'top',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 30,
  },
  submitButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
