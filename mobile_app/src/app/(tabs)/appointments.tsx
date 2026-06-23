import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import apiClient from '../../api/client';
import { useAuth } from '../../context/AuthContext';
import { Colors, Typography, Spacing, Radii } from '../../constants/theme';
import { StickerCard } from '../../components/StickerCard';
import { StickerButton } from '../../components/StickerButton';

export default function AppointmentsScreen() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [slots, setSlots] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'appointments' | 'slots'>('appointments');
  const { userToken } = useAuth();

  useEffect(() => {
    if (activeTab === 'appointments') {
      fetchAppointments();
    } else {
      fetchSlots();
    }
  }, [activeTab]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const config = userToken ? { headers: { Authorization: `Bearer ${userToken}` } } : {};
      const response = await apiClient.get('/user/appointments', config);
      setAppointments(response.data.appointments || []);
    } catch (error) {
      console.error('Appointments Fetch Error:', error);
      Alert.alert('Error', 'Failed to load appointments.');
    } finally {
      setLoading(false);
    }
  };

  const fetchSlots = async () => {
    try {
      setLoading(true);
      const config = userToken ? { headers: { Authorization: `Bearer ${userToken}` } } : {};
      const response = await apiClient.get('/user/appointments/slots', config);
      setSlots(response.data.slots || []);
    } catch (error) {
      console.error('Slots Fetch Error:', error);
      Alert.alert('Error', 'Failed to load available slots.');
    } finally {
      setLoading(false);
    }
  };

  const bookAppointment = async (slot: any) => {
    try {
      setLoading(true);
      const config = userToken ? { headers: { Authorization: `Bearer ${userToken}` } } : {};
      
      // 1. Create Appointment
      const apptRes = await apiClient.post('/user/appointments', {
        counsellor_id: slot.counsellor_id,
        availability_slot_id: slot.availability_slot_id,
        reason: 'General Consultation'
      }, config);
      
      const appointmentId = apptRes.data.appointment_id || apptRes.data.id;

      // 2. Create Payment Intent (Mocked)
      if (appointmentId) {
        const intentRes = await apiClient.post('/payments/create-intent', {
          appointment_id: appointmentId,
          amount: 500.00, // Mock fee
          currency: "INR"
        }, config);

        const paymentId = intentRes.data.payment_id;

        // Simulate User Entering Card details and clicking "Pay"
        Alert.alert(
          'Payment Required',
          `Fee: ₹500.00\nDo you want to confirm payment?`,
          [
            { text: 'Cancel', style: 'cancel' },
            { 
              text: 'Pay Now', 
              onPress: async () => {
                try {
                  // 3. Verify Payment
                  await apiClient.post('/payments/verify', { payment_id: paymentId }, config);
                  Alert.alert('Success', 'Payment Successful! Appointment booked.');
                  setActiveTab('appointments');
                } catch (e) {
                  Alert.alert('Error', 'Payment failed.');
                }
              }
            }
          ]
        );
      } else {
        Alert.alert('Success', 'Appointment booked successfully!');
        setActiveTab('appointments');
      }

    } catch (error: any) {
      console.error('Booking Error:', error);
      Alert.alert('Error', error.response?.data?.detail || 'Failed to book appointment.');
    } finally {
      setLoading(false);
    }
  };

  const cancelAppointment = async (appointmentId: string) => {
    Alert.alert(
      "Cancel Appointment",
      "Are you sure you want to cancel this appointment?",
      [
        { text: "No", style: "cancel" },
        { 
          text: "Yes, Cancel", 
          style: "destructive",
          onPress: async () => {
            try {
              setLoading(true);
              const config = userToken ? { 
                headers: { Authorization: `Bearer ${userToken}` },
                params: { reason: "User cancelled" }
              } : {};
              await apiClient.patch(`/user/appointments/cancel/${appointmentId}`, null, config);
              Alert.alert('Success', 'Appointment cancelled successfully!');
              fetchAppointments();
            } catch (error) {
              console.error('Cancel Error:', error);
              Alert.alert('Error', 'Failed to cancel appointment.');
              setLoading(false);
            }
          }
        }
      ]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'scheduled': return Colors.light.primary;
      case 'completed': return Colors.light.success;
      case 'cancelled': return Colors.light.error;
      default: return Colors.light.text;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Appointments</Text>

      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'appointments' && styles.activeTabButton]}
          onPress={() => setActiveTab('appointments')}
        >
          <Text style={[styles.tabText, activeTab === 'appointments' && styles.activeTabText]}>My Appointments</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'slots' && styles.activeTabButton]}
          onPress={() => setActiveTab('slots')}
        >
          <Text style={[styles.tabText, activeTab === 'slots' && styles.activeTabText]}>Book New</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={Colors.light.primary} />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {activeTab === 'appointments' ? (
            appointments.length > 0 ? (
              appointments.map(appt => (
                <StickerCard key={appt.appointment_id} backgroundColor={Colors.light.surface}>
                  <Text style={styles.cardTitle}>With Counsellor</Text>
                  <Text style={styles.cardText}>Status: <Text style={{color: getStatusColor(appt.status), fontWeight: 'bold'}}>{appt.status}</Text></Text>
                  <Text style={styles.cardText}>Scheduled: {new Date(appt.session?.session_scheduled_at).toLocaleString()}</Text>
                  
                  {appt.status !== 'cancelled' && appt.status !== 'completed' && (
                    <StickerButton 
                      title="Cancel Appointment"
                      onPress={() => cancelAppointment(appt.appointment_id)}
                      backgroundColor={Colors.light.error}
                      style={{ marginTop: 15 }}
                      textStyle={{ fontSize: 14 }}
                    />
                  )}
                </StickerCard>
              ))
            ) : (
              <Text style={styles.noDataText}>You have no appointments yet.</Text>
            )
          ) : (
            slots.length > 0 ? (
              slots.map(slot => (
                <StickerCard key={slot.availability_slot_id} backgroundColor={Colors.light.backgroundElement}>
                  <Text style={styles.cardTitle}>Available Slot</Text>
                  <Text style={styles.cardText}>Date: {new Date(slot.start_time).toLocaleDateString()}</Text>
                  <Text style={styles.cardText}>Time: {new Date(slot.start_time).toLocaleTimeString()} - {new Date(slot.end_time).toLocaleTimeString()}</Text>
                  
                  <StickerButton 
                    title="Book Slot"
                    onPress={() => bookAppointment(slot)}
                    backgroundColor={Colors.light.success}
                    style={{ marginTop: 15 }}
                    textStyle={{ fontSize: 14 }}
                  />
                </StickerCard>
              ))
            ) : (
              <Text style={styles.noDataText}>No available slots at the moment.</Text>
            )
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light.background, padding: Spacing.containerPaddingMobile },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  pageTitle: { ...Typography.headlineSm, color: Colors.light.text, marginBottom: 20 },
  tabContainer: { 
    flexDirection: 'row', 
    marginBottom: 20, 
    backgroundColor: Colors.light.surface, 
    borderRadius: Radii.full, 
    padding: 4,
    borderWidth: 1.5,
    borderColor: Colors.light.border
  },
  tabButton: { flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: Radii.full },
  activeTabButton: { backgroundColor: Colors.light.secondary },
  tabText: { ...Typography.labelBold, color: Colors.light.textSecondary },
  activeTabText: { color: Colors.light.text },
  scrollContent: { paddingBottom: 20 },
  cardTitle: { ...Typography.headlineSm, fontSize: 18, color: Colors.light.primary, marginBottom: 10 },
  cardText: { ...Typography.bodyMd, color: Colors.light.text, marginBottom: 5 },
  noDataText: { ...Typography.bodyMd, textAlign: 'center', color: Colors.light.textSecondary, marginTop: 20 }
});
