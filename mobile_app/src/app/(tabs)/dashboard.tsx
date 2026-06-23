import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/theme';

export default function DashboardScreen() {
  const { userToken, userType, logout } = useAuth();
  const router = useRouter();

  if (!userToken) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.title}>Welcome!</Text>
        <Text style={{marginBottom: 20}}>Please log in to view your dashboard.</Text>
        <TouchableOpacity style={styles.primaryButton} onPress={() => router.push('/(auth)/login' as any)}>
          <Text style={styles.buttonText}>Go to Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderMenuButtons = () => {
    switch (userType) {
      case 'normal_user':
        return (
          <>
            <MenuButton title="My Profile" onPress={() => router.push('/(dashboard)/profile' as any)} />
            <MenuButton title="My Trends" onPress={() => router.push('/(tabs)/trends' as any)} />
            <MenuButton title="Appointments" onPress={() => router.push('/(tabs)/appointments' as any)} />
            <MenuButton title="Prescriptions" onPress={() => router.push('/(tabs)/prescriptions' as any)} />
          </>
        );
      case 'counsellor':
        return (
          <>
            <MenuButton title="Counsellor Profile" onPress={() => router.push('/(dashboard)/profile' as any)} />
            <MenuButton title="Manage Availability" onPress={() => router.push('/(dashboard)/placeholder' as any)} />
            <MenuButton title="My Appointments" onPress={() => router.push('/(dashboard)/placeholder' as any)} />
          </>
        );
      case 'admin':
        return (
          <>
            <MenuButton title="Admin Profile" onPress={() => router.push('/(dashboard)/profile' as any)} />
            <MenuButton title="Manage Users" onPress={() => router.push('/(dashboard)/placeholder' as any)} />
            <MenuButton title="Platform Analytics" onPress={() => router.push('/(dashboard)/placeholder' as any)} />
            <MenuButton title="System Settings" onPress={() => router.push('/(dashboard)/placeholder' as any)} />
          </>
        );
      default:
        return <Text>Invalid User Type</Text>;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Dashboard Hub</Text>
      <Text style={styles.subtitle}>Logged in as: {userType?.replace('_', ' ').toUpperCase()}</Text>

      <View style={styles.menuContainer}>
        {renderMenuButtons()}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const MenuButton = ({ title, onPress }: { title: string; onPress: () => void }) => (
  <TouchableOpacity style={styles.menuButton} onPress={onPress}>
    <Text style={styles.menuButtonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: Colors.light.background },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.light.background, padding: 20 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 5, color: Colors.light.text },
  subtitle: { fontSize: 16, color: Colors.light.textSecondary, marginBottom: 30 },
  menuContainer: { width: '100%', marginBottom: 30 },
  menuButton: { backgroundColor: Colors.light.surface, padding: 20, borderRadius: 10, marginBottom: 15, elevation: 2, shadowColor: Colors.light.text, shadowOpacity: 0.1, shadowRadius: 5 },
  menuButtonText: { fontSize: 18, fontWeight: '600', color: Colors.light.primary },
  primaryButton: { backgroundColor: Colors.light.primary, padding: 15, borderRadius: 8 },
  logoutButton: { backgroundColor: Colors.light.error, padding: 15, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: Colors.light.onPrimary, fontWeight: 'bold', fontSize: 16 }
});
