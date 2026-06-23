import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import apiClient from '../../api/client';
import { useAuth } from '../../context/AuthContext';
import { Colors, Typography, Spacing } from '../../constants/theme';
import { StickerCard } from '../../components/StickerCard';

export default function PrescriptionsScreen() {
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { userToken } = useAuth();

  useEffect(() => {
    fetchPrescriptions();
  }, [userToken]);

  const fetchPrescriptions = async () => {
    try {
      const config = userToken ? { headers: { Authorization: `Bearer ${userToken}` } } : {};
      const response = await apiClient.get('/user/prescriptions', config);
      setPrescriptions(response.data.prescriptions || []);
    } catch (error) {
      console.error('Prescriptions Fetch Error:', error);
      Alert.alert('Error', 'Failed to load prescriptions.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={Colors.light.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Your Prescriptions</Text>

      {prescriptions.length > 0 ? (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {prescriptions.map(script => (
            <StickerCard key={script.prescription_id} backgroundColor={Colors.light.surfaceVariant}>
              <Text style={styles.diagnosisTitle}>Diagnosis: {script.diagnosis}</Text>
              <Text style={styles.dateText}>Date: {new Date(script.created_at).toLocaleDateString()}</Text>

              <Text style={styles.sectionHeader}>Medications:</Text>
              {script.medications.map((med: any, idx: number) => (
                <View key={idx} style={styles.listItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.listText}>{med.name} - {med.dosage} ({med.frequency})</Text>
                </View>
              ))}

              <Text style={styles.sectionHeader}>Recommendations:</Text>
              {script.recommendations.map((rec: string, idx: number) => (
                <View key={idx} style={styles.listItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.listText}>{rec}</Text>
                </View>
              ))}
            </StickerCard>
          ))}
        </ScrollView>
      ) : (
        <View style={styles.centerContainer}>
          <Text style={styles.noDataText}>No prescriptions found.</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light.background, padding: Spacing.containerPaddingMobile },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  pageTitle: { ...Typography.headlineSm, color: Colors.light.text, marginBottom: 20 },
  scrollContent: { paddingBottom: 20 },
  diagnosisTitle: { ...Typography.headlineSm, fontSize: 18, color: Colors.light.primary, marginBottom: 5 },
  dateText: { ...Typography.bodyMd, color: Colors.light.textSecondary, marginBottom: 15 },
  sectionHeader: { ...Typography.labelBold, color: Colors.light.text, marginTop: 10, marginBottom: 5 },
  listItem: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 3 },
  bullet: { fontSize: 16, color: Colors.light.text, marginRight: 5, lineHeight: 20 },
  listText: { ...Typography.bodyMd, color: Colors.light.text, flex: 1, lineHeight: 20 },
  noDataText: { ...Typography.bodyMd, textAlign: 'center', color: Colors.light.textSecondary }
});
