import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert, Dimensions } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';
import apiClient from '../../api/client';
import { useAuth } from '../../context/AuthContext';
import { Colors, Typography, Spacing, Radii } from '../../constants/theme';
import { StickerCard } from '../../components/StickerCard';

export default function TrendsScreen() {
  const [trends, setTrends] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { userToken } = useAuth();
  const screenWidth = Dimensions.get("window").width;

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const config = userToken ? { headers: { Authorization: `Bearer ${userToken}` } } : {};
        const response = await apiClient.get('/user/dashboard/trends', config);
        setTrends(response.data.trends || []);
      } catch (error) {
        console.error('Trends Fetch Error:', error);
        Alert.alert('Error', 'Failed to load trends data.');
      } finally {
        setLoading(false);
      }
    };
    fetchTrends();
  }, [userToken]);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={Colors.light.primary} />
      </View>
    );
  }

  if (trends.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.noDataText}>No Sentiment Trends Available.</Text>
      </View>
    );
  }

  const chartData = {
    labels: trends.slice(-6).map(t => new Date(t.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })),
    datasets: [
      {
        data: trends.slice(-6).map(t => t.emotion_intensity_score),
        color: (opacity = 1) => Colors.light.primary, // optional
        strokeWidth: 2 // optional
      }
    ],
    legend: ["Emotion Intensity"]
  };

  const chartConfig = {
    backgroundGradientFrom: Colors.light.surface,
    backgroundGradientTo: Colors.light.surface,
    color: (opacity = 1) => `rgba(0, 63, 221, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
    propsForLabels: {
        fill: Colors.light.text
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.pageTitle}>Your Sentiment Trends</Text>
      
      <StickerCard backgroundColor={Colors.light.surface}>
        <Text style={styles.chartTitle}>Emotion Intensity Over Time</Text>
        <LineChart
          data={chartData}
          width={screenWidth - Spacing.containerPaddingMobile * 2 - 48} // container width minus card paddings
          height={256}
          verticalLabelRotation={30}
          chartConfig={chartConfig}
          bezier
          style={styles.chartStyle}
        />
      </StickerCard>

      <StickerCard backgroundColor={Colors.light.secondary}>
        <Text style={styles.chartTitle}>Recent Intensities</Text>
        <BarChart
          data={chartData}
          width={screenWidth - Spacing.containerPaddingMobile * 2 - 48}
          height={256}
          yAxisLabel=""
          yAxisSuffix=""
          chartConfig={chartConfig}
          verticalLabelRotation={30}
          style={styles.chartStyle}
        />
      </StickerCard>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: Spacing.containerPaddingMobile, backgroundColor: Colors.light.background },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  pageTitle: { ...Typography.headlineSm, color: Colors.light.text, marginBottom: 20 },
  noDataText: { ...Typography.bodyMd, color: Colors.light.textSecondary },
  chartTitle: { ...Typography.headlineSm, fontSize: 18, color: Colors.light.text, marginBottom: 15, textAlign: 'center' },
  chartStyle: { borderRadius: Radii.md, alignSelf: 'center', marginVertical: 8 }
});
