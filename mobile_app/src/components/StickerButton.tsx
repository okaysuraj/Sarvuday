import React, { useState } from 'react';
import { TouchableWithoutFeedback, View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Colors, Radii, Typography } from '../constants/theme';

interface StickerButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  backgroundColor?: string;
  textColor?: string;
  shadowOffset?: number;
}

export const StickerButton = ({
  title,
  onPress,
  style,
  textStyle,
  backgroundColor = Colors.light.primary,
  textColor = Colors.light.onPrimary,
  shadowOffset = 4
}: StickerButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <TouchableWithoutFeedback
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      onPress={onPress}
    >
      <View style={[styles.container, style]}>
        {/* Shadow Background */}
        <View style={[styles.shadowLayer, { top: shadowOffset, left: shadowOffset }]} />
        
        {/* Main Button */}
        <View style={[
          styles.innerButton, 
          { backgroundColor },
          isPressed && { transform: [{ translateX: shadowOffset }, { translateY: shadowOffset }] }
        ]}>
          <Text style={[styles.text, { color: textColor }, textStyle]}>
            {title}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginBottom: 15,
  },
  shadowLayer: {
    position: 'absolute',
    right: -4, // Ensure it fills the space
    bottom: -4,
    width: '100%',
    height: '100%',
    backgroundColor: Colors.light.shadow,
    borderRadius: Radii.md,
  },
  innerButton: {
    borderWidth: 1.5,
    borderColor: Colors.light.border,
    borderRadius: Radii.md,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    ...Typography.labelBold,
    fontSize: 18,
  }
});
