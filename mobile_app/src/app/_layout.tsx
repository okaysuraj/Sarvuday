import { DarkTheme, DefaultTheme, ThemeProvider, Slot } from 'expo-router';
import { useColorScheme } from 'react-native';
import { AuthProvider } from '../context/AuthContext';
import { useFonts } from 'expo-font';
import { Lexend_400Regular, Lexend_600SemiBold, Lexend_700Bold } from '@expo-google-fonts/lexend';
import { DMSans_400Regular, DMSans_500Medium, DMSans_700Bold } from '@expo-google-fonts/dm-sans';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded, error] = useFonts({
    Lexend_400Regular,
    Lexend_600SemiBold,
    Lexend_700Bold,
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <Slot />
      </AuthProvider>
    </ThemeProvider>
  );
}
