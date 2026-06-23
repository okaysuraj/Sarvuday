import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import apiClient from '../../api/client';
import { Colors } from '../../constants/theme';

interface Disorder {
  disorder_id: string;
  disorder_title: string;
  disorder_description: string;
  symptoms: string[];
  preventions: string[];
  treatments: string[];
  best_advice: string;
}

export default function DisordersScreen() {
  const [disorders, setDisorders] = useState<Disorder[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDisorders = async () => {
      try {
        const response = await apiClient.get('/content/disorders');
        setDisorders(response.data.disorders || []);
      } catch (err) {
        setError('Failed to load disorders.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDisorders();
  }, []);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={Colors.light.primary} />
      </View>
    );
  }

  if (error || !disorders.length) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error || 'No disorders found.'}</Text>
      </View>
    );
  }

  const disorder = disorders[selectedIndex];

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabScroll} contentContainerStyle={{ padding: 10 }}>
        {disorders.map((d, index) => (
          <TouchableOpacity
            key={d.disorder_id || index}
            style={[styles.tabButton, index === selectedIndex && styles.activeTab]}
            onPress={() => setSelectedIndex(index)}
          >
            <Text style={[styles.tabText, index === selectedIndex && styles.activeTabText]}>
              {d.disorder_title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView contentContainerStyle={styles.cardContainer}>
        {disorder && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{disorder.disorder_title}</Text>
            <Text style={styles.cardDesc}>{disorder.disorder_description}</Text>

            <View style={styles.section}>
              <Text style={styles.sectionHeader}>Symptoms:</Text>
              {disorder.symptoms?.map((s, i) => (
                <Text key={i} style={styles.listItem}>• {s}</Text>
              ))}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionHeader}>Preventions:</Text>
              {disorder.preventions?.map((p, i) => (
                <Text key={i} style={styles.listItem}>• {p}</Text>
              ))}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionHeader}>Treatments:</Text>
              {disorder.treatments?.map((t, i) => (
                <Text key={i} style={styles.listItem}>• {t}</Text>
              ))}
            </View>

            <View style={styles.adviceBox}>
              <Text style={styles.sectionHeader}>Best Advice:</Text>
              <Text style={styles.listItem}>{disorder.best_advice}</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light.background },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { fontSize: 16, color: Colors.light.error },
  tabScroll: { maxHeight: 60, backgroundColor: Colors.light.surface, borderBottomWidth: 1, borderBottomColor: Colors.light.border },
  tabButton: { paddingHorizontal: 15, paddingVertical: 10, marginHorizontal: 5, borderRadius: 20, backgroundColor: Colors.light.backgroundElement },
  activeTab: { backgroundColor: Colors.light.primary },
  tabText: { fontSize: 14, color: Colors.light.text },
  activeTabText: { color: Colors.light.onPrimary, fontWeight: 'bold' },
  cardContainer: { padding: 15 },
  card: { backgroundColor: Colors.light.surface, padding: 20, borderRadius: 10, shadowColor: Colors.light.text, shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 },
  cardTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, color: Colors.light.text },
  cardDesc: { fontSize: 15, color: Colors.light.textSecondary, marginBottom: 20, lineHeight: 22 },
  section: { marginBottom: 15 },
  sectionHeader: { fontSize: 16, fontWeight: 'bold', marginBottom: 5, color: Colors.light.text },
  listItem: { fontSize: 14, color: Colors.light.textSecondary, marginBottom: 3, paddingLeft: 10 },
  adviceBox: { marginTop: 10, padding: 15, backgroundColor: Colors.light.backgroundElement, borderRadius: 8, borderLeftWidth: 4, borderLeftColor: Colors.light.primary }
});
