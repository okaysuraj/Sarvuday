import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PlaceholderScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Coming Soon!</Text>
      <Text style={styles.subtitle}>This feature is currently under development.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f4f4f4', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  subtitle: { fontSize: 16, color: '#666', textAlign: 'center' }
});
