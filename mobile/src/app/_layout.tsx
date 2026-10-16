import '../global.css';
import { useEffect } from 'react';
import { Stack, DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { Text, View, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useAuthStore } from '../store/authStore';
import { API_CONFIGURATION_ERROR } from '../api/config';

SplashScreen.preventAutoHideAsync().catch(() => {});
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const authenticated = useAuthStore(state => state.isAuthenticated);
  const hydrated = useAuthStore(state => state.hasHydrated);
  const role = useAuthStore(state => state.user?.role);
  useEffect(() => { if (hydrated) void SplashScreen.hideAsync().catch(() => {}); }, [hydrated]);
  return <SafeAreaProvider><ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    {API_CONFIGURATION_ERROR ? <View style={{ flex: 1, justifyContent: 'center', padding: 32 }}><Text accessibilityRole="header" style={{ fontSize: 24, fontWeight: '600' }}>Sarvuday setup required</Text><Text accessibilityRole="alert" style={{ marginTop: 16 }}>{API_CONFIGURATION_ERROR}</Text></View> : !hydrated ? null : <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!authenticated}><Stack.Screen name="(auth)" /><Stack.Screen name="auth" /></Stack.Protected>
      <Stack.Screen name="emergency" />
      <Stack.Protected guard={authenticated}>
        <Stack.Screen name="(tabs)" /><Stack.Screen name="index" /><Stack.Screen name="intake" />
        <Stack.Screen name="ai" /><Stack.Screen name="call" /><Stack.Screen name="chat" /><Stack.Screen name="community" /><Stack.Screen name="exercises" /><Stack.Screen name="finance" /><Stack.Screen name="journal" /><Stack.Screen name="patient" /><Stack.Screen name="profile" /><Stack.Screen name="session" /><Stack.Screen name="settings" /><Stack.Screen name="therapy" /><Stack.Screen name="tracking" />
        <Stack.Protected guard={role === 'admin'}><Stack.Screen name="admin" /></Stack.Protected>
        <Stack.Protected guard={role === 'therapist'}><Stack.Screen name="counsellor" /></Stack.Protected>
      </Stack.Protected>
    </Stack>}
  </ThemeProvider></SafeAreaProvider>;
}
