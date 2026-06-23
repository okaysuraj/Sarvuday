import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Colors, Radii } from '../constants/theme';

interface StickerCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  backgroundColor?: string;
  shadowOffset?: number;
}

export const StickerCard = ({ 
  children, 
  style, 
  backgroundColor = Colors.light.surface,
  shadowOffset = 4 
}: StickerCardProps) => {
  return (
    <View style={[styles.shadowContainer, { paddingBottom: shadowOffset, paddingRight: shadowOffset }, style]}>
      <View style={[styles.innerContainer, { backgroundColor }]}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  shadowContainer: {
    backgroundColor: Colors.light.shadow,
    borderRadius: Radii.lg,
    marginBottom: 15,
  },
  innerContainer: {
    borderWidth: 1.5,
    borderColor: Colors.light.border,
    borderRadius: Radii.lg,
    padding: 24,
    overflow: 'hidden',
  }
});
