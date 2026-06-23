import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TextInputProps, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { Colors, Radii, Typography } from '../constants/theme';

interface StickerInputProps extends Omit<TextInputProps, 'style'> {
  shadowOffset?: number;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
}

export const StickerInput = ({ shadowOffset = 2, style, inputStyle, ...props }: StickerInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, style]}>
      {isFocused && (
        <View style={[styles.shadowLayer, { top: shadowOffset, left: shadowOffset }]} />
      )}
      <TextInput
        {...props}
        style={[
          styles.input,
          inputStyle,
          isFocused && styles.inputFocused,
          isFocused && { transform: [{ translateX: -1 }, { translateY: -1 }] } // slight shift to reveal shadow
        ]}
        onFocus={(e) => {
          setIsFocused(true);
          props.onFocus && props.onFocus(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          props.onBlur && props.onBlur(e);
        }}
        placeholderTextColor={Colors.light.textSecondary}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginBottom: 15,
  },
  shadowLayer: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    width: '100%',
    height: '100%',
    backgroundColor: Colors.light.shadow,
    borderRadius: Radii.md,
  },
  input: {
    ...Typography.bodyMd,
    color: Colors.light.text,
    backgroundColor: Colors.light.surface,
    borderWidth: 1.5,
    borderColor: Colors.light.border,
    borderRadius: Radii.md,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  inputFocused: {
    borderColor: Colors.light.primary,
  }
});
