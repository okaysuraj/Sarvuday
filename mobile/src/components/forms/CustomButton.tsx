import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
  textClassName?: string;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  isLoading = false,
  disabled = false,
  className = '',
  textClassName = '',
}) => {
  const styles = {
    primary: { button: 'bg-primary', text: 'text-on-primary' },
    secondary: { button: 'bg-secondary', text: 'text-on-secondary' },
    outline: { button: 'bg-transparent border border-outline', text: 'text-primary' },
  }[variant];
  const inactive = disabled || isLoading;

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={{ disabled: inactive, busy: isLoading }}
      onPress={onPress}
      disabled={inactive}
      className={`py-3 px-6 rounded-lg items-center justify-center ${inactive ? 'opacity-50' : ''} ${styles.button} ${className}`}
    >
      {isLoading ? (
        <ActivityIndicator color={variant === 'outline' ? '#18181B' : '#ffffff'} />
      ) : (
        <Text className={`font-headline-md text-base ${styles.text} ${textClassName}`}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};
