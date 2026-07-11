import '../global.css';
import { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';
import { useAuthStore } from '../store/authStore';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { isAuthenticated } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // Basic auth routing logic
    const inAuthGroup = segments[0] === '(auth)';
    
    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !isAuthenticated &&
      !inAuthGroup
    ) {
      // Redirect to the welcome screen.
      router.replace('/(auth)/welcome');
    } else if (isAuthenticated && inAuthGroup) {
      // Redirect away from the sign-in page.
      router.replace('/');
    }
  }, [isAuthenticated, segments]);

  useEffect(() => {
    // Hide splash screen after a short delay to allow for mounting
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 1000);
  }, []);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
