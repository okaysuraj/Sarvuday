import React from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// In a real app, you would use a charting library like react-native-chart-kit or VictoryNative
// Here we'll build a custom simplified CSS/View based bar chart for the UI aesthetic

const SCREEN_WIDTH = Dimensions.get('window').width;

const MOOD_DATA = [
  { day: 'Mon', score: 3 },
  { day: 'Tue', score: 2 },
  { day: 'Wed', score: 4 },
  { day: 'Thu', score: 5 },
  { day: 'Fri', score: 3 },
  { day: 'Sat', score: 4 },
  { day: 'Sun', score: 5 },
];

export default function InsightsDashboardScreen() {
  const router = useRouter();

  const getBarColor = (score: number) => {
    if (score <= 2) return '#EF4444'; // Red for low mood
    if (score === 3) return '#EAB308'; // Yellow for okay
    return '#22C55E'; // Green for good/great
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.title}>Your Insights</Text>
          <Ionicons name="calendar" size={24} color="#94A3B8" />
        </View>
        <Text style={styles.subtitle}>You are on a 5-day streak! Keep checking in.</Text>
      </View>

      {/* Mood Chart Widget */}
      <View style={styles.widgetCard}>
        <View style={styles.widgetHeader}>
          <Text style={styles.widgetTitle}>Weekly Mood Trends</Text>
          <Ionicons name="stats-chart" size={20} color="#3B82F6" />
        </View>
        
        <View style={styles.chartContainer}>
          {MOOD_DATA.map((data, index) => {
            const height = (data.score / 5) * 120; // 120 is max height
            return (
              <View key={index} style={styles.barCol}>
                <View style={styles.barBackground}>
                  <View 
                    style={[
                      styles.barFill, 
                      { height, backgroundColor: getBarColor(data.score) }
                    ]} 
                  />
                </View>
                <Text style={styles.barLabel}>{data.day}</Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* Sleep & Anxiety Summary */}
      <View style={styles.gridContainer}>
        <View style={styles.gridItem}>
          <View style={[styles.iconBox, { backgroundColor: 'rgba(59, 130, 246, 0.1)' }]}>
            <Ionicons name="moon" size={24} color="#3B82F6" />
          </View>
          <Text style={styles.gridValue}>Good</Text>
          <Text style={styles.gridLabel}>Average Sleep</Text>
        </View>

        <View style={styles.gridItem}>
          <View style={[styles.iconBox, { backgroundColor: 'rgba(239, 68, 68, 0.1)' }]}>
            <Ionicons name="pulse" size={24} color="#EF4444" />
          </View>
          <Text style={styles.gridValue}>Low</Text>
          <Text style={styles.gridLabel}>Stress Levels</Text>
        </View>
      </View>

      {/* AI Sentiment Analysis Widget */}
      <View style={styles.widgetCard}>
        <View style={styles.widgetHeader}>
          <Text style={styles.widgetTitle}>AI Journal Analysis</Text>
          <Ionicons name="sparkles" size={20} color="#8B5CF6" />
        </View>
        <Text style={styles.insightText}>
          Based on your recent journals and AI companion chats, your primary emotion this week has been <Text style={styles.highlight}>"Grateful"</Text>. 
          You've shown a 20% reduction in anxiety markers compared to last week.
        </Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  header: {
    padding: 24,
    paddingTop: 60,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F8FAFC',
  },
  subtitle: {
    fontSize: 14,
    color: '#94A3B8',
  },
  widgetCard: {
    backgroundColor: '#1E293B',
    marginHorizontal: 24,
    marginBottom: 20,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  widgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  widgetTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#E2E8F0',
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 150,
  },
  barCol: {
    alignItems: 'center',
  },
  barBackground: {
    width: 24,
    height: 120,
    backgroundColor: '#334155',
    borderRadius: 12,
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  barFill: {
    width: 24,
    borderRadius: 12,
  },
  barLabel: {
    color: '#94A3B8',
    fontSize: 12,
  },
  gridContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  gridItem: {
    backgroundColor: '#1E293B',
    borderRadius: 24,
    padding: 20,
    width: (SCREEN_WIDTH - 60) / 2,
    borderWidth: 1,
    borderColor: '#334155',
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  gridValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 4,
  },
  gridLabel: {
    fontSize: 14,
    color: '#94A3B8',
  },
  insightText: {
    color: '#CBD5E1',
    lineHeight: 24,
    fontSize: 15,
  },
  highlight: {
    color: '#8B5CF6',
    fontWeight: 'bold',
  }
});
