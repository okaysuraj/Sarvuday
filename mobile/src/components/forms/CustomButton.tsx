import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';

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
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-primary text-on-primary';
      case 'secondary':
        return 'bg-secondary text-on-secondary';
      case 'outline':
        return 'bg-transparent border border-outline text-primary';
      default:
        return 'bg-primary text-on-primary';
    }
  };

  const variantStyles = getVariantStyles();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || isLoading}
      className={`py-3 px-6 rounded-lg items-center justify-center ${
        disabled ? 'opacity-50' : ''
      } ${variantStyles.split(' ')[0]} ${
        variant === 'outline' ? 'border border-outline' : ''
      } ${className}`}
    >
      {isLoading ? (
        <ActivityIndicator color={variant === 'outline' ? '#002da5' : '#ffffff'} />
      ) : (
        <Text className={`font-headline-md text-base ${variantStyles.split(' ')[1]} ${textClassName}`}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};
