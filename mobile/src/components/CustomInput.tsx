import React from 'react';
import { View, TextInput, Text, TextInputProps } from 'react-native';

interface CustomInputProps extends TextInputProps {
  label: string;
  error?: string;
  containerClassName?: string;
}

export const CustomInput: React.FC<CustomInputProps> = ({
  label,
  error,
  containerClassName = '',
  ...props
}) => {
  return (
    <View className={`w-full ${containerClassName}`}>
      <Text className="text-on-surface text-sm font-label-md mb-2">
        {label}
      </Text>
      <TextInput
        className={`w-full bg-surface-container-highest px-4 py-3 rounded-lg border ${
          error ? 'border-error' : 'border-outline-variant focus:border-primary'
        } text-on-surface font-body-md`}
        placeholderTextColor="#747687"
        {...props}
      />
      {error ? (
        <Text className="text-error text-xs font-label-md mt-1">{error}</Text>
      ) : null}
    </View>
  );
};
