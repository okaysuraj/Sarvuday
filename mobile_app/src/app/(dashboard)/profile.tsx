import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import apiClient from '../../api/client';
import { useAuth } from '../../context/AuthContext';
import { Colors, Typography, Spacing } from '../../constants/theme';
import { StickerCard } from '../../components/StickerCard';
import { StickerInput } from '../../components/StickerInput';
import { StickerButton } from '../../components/StickerButton';

export default function ProfileScreen() {
  const [profile, setProfile] = useState<any>(null);
  const [editableProfile, setEditableProfile] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const { userToken } = useAuth();

  const fetchProfile = async () => {
    try {
      const config = userToken ? { headers: { Authorization: `Bearer ${userToken}` } } : {};
      const response = await apiClient.get('/user/dashboard/profile', config);
      setProfile(response.data);
      setEditableProfile(response.data);
    } catch (error) {
      console.error('Profile Fetch Error:', error);
      Alert.alert('Error', 'Failed to load profile data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [userToken]);

  const handleSave = async () => {
    try {
      setSaving(true);
      const formData = new FormData();
      
      const fields = ['name', 'phone_number', 'gender', 'country', 'state', 'city', 'address', 'pincode'];
      fields.forEach(field => {
        if (editableProfile[field]) {
          formData.append(field, editableProfile[field]);
        }
      });

      const config = userToken ? { 
        headers: { 
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'multipart/form-data'
        } 
      } : {};

      await apiClient.patch('/user/dashboard/profile', formData, config);
      Alert.alert('Success', 'Profile updated successfully');
      setIsEditing(false);
      fetchProfile();
    } catch (error: any) {
      console.error('Profile Update Error:', error.response?.data || error);
      Alert.alert('Error', error.response?.data?.detail || 'Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditableProfile(profile);
    setIsEditing(false);
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={Colors.light.primary} />
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.centerContainer}>
        <Text>No Profile Data Available.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.pageTitle}>My Profile</Text>
        {!isEditing ? (
          <StickerButton title="Edit" onPress={() => setIsEditing(true)} style={styles.editButton} textStyle={{fontSize: 14}} />
        ) : (
          <View style={styles.actionButtons}>
            <StickerButton title="Cancel" onPress={handleCancel} backgroundColor={Colors.light.surfaceVariant} textColor={Colors.light.text} style={styles.cancelButton} textStyle={{fontSize: 14}} />
            <StickerButton title={saving ? "..." : "Save"} onPress={handleSave} style={styles.saveButton} textStyle={{fontSize: 14}} />
          </View>
        )}
      </View>

      <StickerCard backgroundColor={Colors.light.secondary}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{profile.name ? profile.name.charAt(0).toUpperCase() : 'U'}</Text>
          </View>
          {isEditing ? (
            <StickerInput 
              value={editableProfile.name}
              onChangeText={(text) => setEditableProfile({...editableProfile, name: text})}
              placeholder="Name"
              style={{ flex: 1, marginLeft: 15 }}
            />
          ) : (
            <View style={{ marginLeft: 15 }}>
              <Text style={styles.name}>{profile.name || 'Anonymous User'}</Text>
              <Text style={styles.email}>{profile.email}</Text>
            </View>
          )}
        </View>
      </StickerCard>

      <StickerCard backgroundColor={Colors.light.surface}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        {isEditing ? (
          <>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Gender</Text>
              <StickerInput value={editableProfile.gender} onChangeText={(t) => setEditableProfile({...editableProfile, gender: t})} placeholder="male/female/other" />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Phone</Text>
              <StickerInput value={editableProfile.phone_number} onChangeText={(t) => setEditableProfile({...editableProfile, phone_number: t})} keyboardType="phone-pad" placeholder="Phone Number" />
            </View>
          </>
        ) : (
          <>
            <InfoRow label="Gender" value={profile.gender || 'Not specified'} />
            <InfoRow label="Phone" value={profile.phone_number || 'Not provided'} />
          </>
        )}
      </StickerCard>

      <StickerCard backgroundColor={Colors.light.surface}>
        <Text style={styles.sectionTitle}>Address</Text>
        {isEditing ? (
          <>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Address</Text>
              <StickerInput value={editableProfile.address} onChangeText={(t) => setEditableProfile({...editableProfile, address: t})} placeholder="Address" />
            </View>
            <View style={styles.row}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 5 }]}>
                <Text style={styles.inputLabel}>City</Text>
                <StickerInput value={editableProfile.city} onChangeText={(t) => setEditableProfile({...editableProfile, city: t})} placeholder="City" />
              </View>
              <View style={[styles.inputGroup, { flex: 1, marginLeft: 5 }]}>
                <Text style={styles.inputLabel}>State</Text>
                <StickerInput value={editableProfile.state} onChangeText={(t) => setEditableProfile({...editableProfile, state: t})} placeholder="State" />
              </View>
            </View>
            <View style={styles.row}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 5 }]}>
                <Text style={styles.inputLabel}>Country</Text>
                <StickerInput value={editableProfile.country} onChangeText={(t) => setEditableProfile({...editableProfile, country: t})} placeholder="Country" />
              </View>
              <View style={[styles.inputGroup, { flex: 1, marginLeft: 5 }]}>
                <Text style={styles.inputLabel}>Pincode</Text>
                <StickerInput value={editableProfile.pincode} onChangeText={(t) => setEditableProfile({...editableProfile, pincode: t})} placeholder="Pincode" />
              </View>
            </View>
          </>
        ) : (
          <>
            <Text style={styles.addressText}>{profile.address || 'Address not provided'}</Text>
            <Text style={styles.addressText}>
              {profile.city && profile.state && profile.country 
                ? `${profile.city}, ${profile.state}, ${profile.country} - ${profile.pincode}` 
                : ''}
            </Text>
          </>
        )}
      </StickerCard>

      <StickerCard backgroundColor={Colors.light.surface}>
        <Text style={styles.sectionTitle}>Account Info</Text>
        <InfoRow label="Email Verified" value={profile.is_email_verified ? 'Yes' : 'No'} />
        <InfoRow label="Joined On" value={new Date(profile.created_at).toLocaleDateString()} />
        <InfoRow label="Total Sessions" value={profile.total_sessions_attended?.toString() || '0'} />
      </StickerCard>
    </ScrollView>
  );
}

const InfoRow = ({ label, value }: { label: string, value: string }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}:</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: Spacing.containerPaddingMobile, backgroundColor: Colors.light.background },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  pageTitle: { ...Typography.headlineSm, color: Colors.light.text },
  editButton: { marginBottom: 0 },
  actionButtons: { flexDirection: 'row' },
  cancelButton: { marginBottom: 0, marginRight: 10 },
  saveButton: { marginBottom: 0 },
  avatarContainer: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 60, height: 60, borderRadius: 30, backgroundColor: Colors.light.primary, justifyContent: 'center', alignItems: 'center', borderWidth: 1.5, borderColor: Colors.light.border },
  avatarText: { ...Typography.headlineMd, color: Colors.light.onPrimary },
  name: { ...Typography.headlineSm, color: Colors.light.text, fontSize: 20 },
  email: { ...Typography.bodyMd, color: Colors.light.onSecondary },
  sectionTitle: { ...Typography.headlineSm, fontSize: 20, marginBottom: 15, color: Colors.light.text, borderBottomWidth: 1.5, borderBottomColor: Colors.light.border, paddingBottom: 5 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  infoLabel: { ...Typography.labelBold, color: Colors.light.textSecondary },
  infoValue: { ...Typography.bodyMd, color: Colors.light.text },
  addressText: { ...Typography.bodyMd, color: Colors.light.text, marginBottom: 5 },
  inputGroup: { marginBottom: 5 },
  inputLabel: { ...Typography.labelBold, color: Colors.light.textSecondary, marginBottom: 5 },
  row: { flexDirection: 'row', justifyContent: 'space-between' }
});
