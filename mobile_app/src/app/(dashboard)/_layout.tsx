import { Stack } from 'expo-router';

export default function DashboardLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="profile" options={{ title: 'Profile' }} />
      <Stack.Screen name="placeholder" options={{ title: 'Coming Soon' }} />
    </Stack>
  );
}
