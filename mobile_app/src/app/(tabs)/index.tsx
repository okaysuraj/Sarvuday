import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Typography, Spacing } from '../../constants/theme';
import { StickerButton } from '../../components/StickerButton';
import { StickerCard } from '../../components/StickerCard';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.heroSection}>
        <View style={styles.heroHeader}>
          {/* Decorative Circle */}
          <View style={[styles.decorativeCircle, { backgroundColor: Colors.light.secondary, top: 0, left: 20 }]} />
          <Text style={styles.heroTitle}>Inner Peace</Text>
          <Text style={styles.heroSubtitle}>SARVUDAY</Text>
          {/* Decorative Pill */}
          <View style={[styles.decorativePill, { backgroundColor: Colors.light.tertiary, bottom: -10, right: 20 }]} />
        </View>

        <Text style={styles.heroDesc}>
          Experience the sophisticated evolution of mental clarity. Our playful, sticker-like interface reduces clinical friction, making professional mental health support approachable and vibrant.
        </Text>
        
        <View style={styles.buttonContainer}>
          <StickerButton 
            title="Self Assessment" 
            onPress={() => router.push('/(tabs)/assessments')} 
            style={{ flex: 1 }}
          />
          <StickerButton 
            title="Learn Disorders" 
            onPress={() => router.push('/(tabs)/disorders')} 
            backgroundColor={Colors.light.secondary}
            textColor={Colors.light.onSecondary}
            style={{ flex: 1, marginLeft: Spacing.unit * 2 }}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Why SarvUday?</Text>
        
        <StickerCard backgroundColor={Colors.light.surface}>
          <Text style={styles.featureTitle}>Integrated Mental Health Care</Text>
          <Text style={styles.featureDesc}>Comprehensive mental health support in one platform, accessible anywhere.</Text>
        </StickerCard>

        <StickerCard backgroundColor={Colors.light.secondary}>
          <Text style={styles.featureTitle}>Backed by Science</Text>
          <Text style={styles.featureDesc}>Our methods and resources are evidence-based and scientifically proven.</Text>
        </StickerCard>

        <StickerCard backgroundColor={Colors.light.backgroundElement}>
          <Text style={styles.featureTitle}>Personalized Support</Text>
          <Text style={styles.featureDesc}>Tailored to your unique needs to foster a healthier mind and lifestyle.</Text>
        </StickerCard>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.light.background,
  },
  heroSection: {
    paddingHorizontal: Spacing.containerPaddingMobile,
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: 'center',
  },
  heroHeader: {
    position: 'relative',
    padding: 20,
    borderWidth: 1.5,
    borderColor: Colors.light.border,
    borderRadius: 24,
    backgroundColor: Colors.light.surface,
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
    borderStyle: 'dashed',
  },
  decorativeCircle: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: Colors.light.border,
    zIndex: 10,
    transform: [{ translateY: -20 }, { translateX: -20 }]
  },
  decorativePill: {
    position: 'absolute',
    width: 60,
    height: 30,
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: Colors.light.border,
    zIndex: 10,
    transform: [{ translateY: 15 }, { translateX: 20 }]
  },
  heroTitle: {
    ...Typography.headlineMd,
    color: Colors.light.text,
    textAlign: 'center',
  },
  heroSubtitle: {
    ...Typography.displayLgMobile,
    color: '#725c00', // Deep gold for emphasis
    textAlign: 'center',
    marginTop: 10,
  },
  heroDesc: {
    ...Typography.bodyMd,
    color: Colors.light.textSecondary,
    textAlign: 'center',
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  section: {
    padding: Spacing.containerPaddingMobile,
    backgroundColor: Colors.light.surfaceVariant,
    borderTopWidth: 1.5,
    borderColor: Colors.light.border,
  },
  sectionTitle: {
    ...Typography.headlineSm,
    color: Colors.light.text,
    marginBottom: 20,
  },
  featureTitle: {
    ...Typography.headlineSm,
    fontSize: 20,
    color: Colors.light.text,
    marginBottom: 8,
  },
  featureDesc: {
    ...Typography.bodyMd,
    color: Colors.light.textSecondary,
  }
});
