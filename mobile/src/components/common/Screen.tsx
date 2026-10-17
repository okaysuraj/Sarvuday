import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomButton as Action } from '../forms/CustomButton';

export { Action };

export function Screen({
  title,
  subtitle,
  children,
  scroll = true,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  scroll?: boolean;
}) {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top', 'left', 'right']}>
      <View className="px-5 pt-3 pb-5 flex-row items-center gap-3 border-b border-outline">
        {router.canGoBack() && (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Go back"
            onPress={() => router.back()}
            hitSlop={8}
            className="w-11 h-11 items-center justify-center rounded-full border border-outline"
          >
            <Ionicons name="arrow-back" size={20} color="#18181B" />
          </Pressable>
        )}
        <View className="flex-1">
          <Text accessibilityRole="header" className="text-2xl font-bold text-on-surface">
            {title}
          </Text>
          {subtitle && <Text className="text-sm text-on-surface-variant mt-1">{subtitle}</Text>}
        </View>
      </View>
      {scroll ? (
        <ScrollView
          contentContainerStyle={{ padding: 20, paddingBottom: 40, gap: 16 }}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
      ) : (
        children
      )}
    </SafeAreaView>
  );
}

export function Card({ children }: { children: React.ReactNode }) {
  return <View className="bg-surface border border-outline rounded-2xl p-5 gap-3">{children}</View>;
}

export function RequestState({
  loading,
  error,
  empty,
  retry,
}: {
  loading?: boolean;
  error?: string | null;
  empty?: string;
  retry?: () => void;
}) {
  if (loading)
    return (
      <View className="p-12 items-center">
        <ActivityIndicator accessibilityLabel="Loading" color="#18181B" />
      </View>
    );
  if (error)
    return (
      <Card>
        <Text accessibilityRole="alert" className="text-on-surface font-semibold">
          Unable to load this information
        </Text>
        <Text className="text-on-surface-variant text-sm">{error}</Text>
        {retry && <Action title="Try again" onPress={retry} />}
      </Card>
    );
  if (empty)
    return (
      <Card>
        <Text className="text-on-surface-variant leading-6">{empty}</Text>
      </Card>
    );
  return null;
}

export function UnavailableScreen({ title, message }: { title: string; message: string }) {
  return (
    <Screen title={title}>
      <Card>
        <Text className="font-semibold text-on-surface">This feature is unavailable</Text>
        <Text className="text-on-surface-variant leading-6">{message}</Text>
      </Card>
    </Screen>
  );
}

// Unknown measurements stay empty rather than displaying invented values.
export function Metric({ label, value }: { label: string; value: unknown }) {
  return (
    <Card>
      <Text className="text-on-surface-variant text-sm">{label}</Text>
      <Text className="text-on-surface text-2xl font-semibold">
        {value == null ? 'Not recorded' : String(value)}
      </Text>
    </Card>
  );
}
