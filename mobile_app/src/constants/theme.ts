/**
 * Neo-Memphis Design System
 * Colors and Typography are based on DESIGN.md
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    background: '#fbf8ff',
    surface: '#ffffff',
    surfaceVariant: '#e2e1ef',
    text: '#191b24',
    textSecondary: '#434656',
    primary: '#003fdd',
    onPrimary: '#ffffff',
    secondary: '#fdd33f', // Yellow accent
    onSecondary: '#715b00',
    tertiary: '#905e68', // Pink/Sage/Orange accents can map to tertiary/error
    border: '#1A1A1A', // 1.5px solid black outline
    error: '#ba1a1a',
    success: '#28a745', 
    shadow: '#1A1A1A', // Hard shadow color
    backgroundElement: '#ededfa',
  },
  dark: {
    background: '#191b24',
    surface: '#2e303a',
    surfaceVariant: '#434656',
    text: '#fbf8ff',
    textSecondary: '#c4c5d9',
    primary: '#b9c3ff',
    onPrimary: '#001356',
    secondary: '#fdd33f',
    onSecondary: '#715b00',
    tertiary: '#f4b6c1',
    border: '#ffffff',
    error: '#ffdad6',
    success: '#28a745',
    shadow: '#ffffff',
    backgroundElement: '#2e303a',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = {
  heading: {
    regular: 'Lexend_400Regular',
    semiBold: 'Lexend_600SemiBold',
    bold: 'Lexend_700Bold',
  },
  body: {
    regular: 'DMSans_400Regular',
    medium: 'DMSans_500Medium',
    bold: 'DMSans_700Bold',
  }
};

export const Typography = {
  displayLg: {
    fontFamily: Fonts.heading.bold,
    fontSize: 48,
    lineHeight: 52,
    letterSpacing: -0.96, // -0.02em
  },
  displayLgMobile: {
    fontFamily: Fonts.heading.bold,
    fontSize: 36,
    lineHeight: 43,
    letterSpacing: -0.72,
  },
  headlineMd: {
    fontFamily: Fonts.heading.semiBold,
    fontSize: 32,
    lineHeight: 41,
  },
  headlineSm: {
    fontFamily: Fonts.heading.semiBold,
    fontSize: 24,
    lineHeight: 33,
  },
  bodyLg: {
    fontFamily: Fonts.body.regular,
    fontSize: 18,
    lineHeight: 28,
  },
  bodyMd: {
    fontFamily: Fonts.body.regular,
    fontSize: 16,
    lineHeight: 25,
  },
  labelBold: {
    fontFamily: Fonts.body.bold,
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0.7, // 0.05em
  },
  labelMd: {
    fontFamily: Fonts.body.medium,
    fontSize: 14,
    lineHeight: 16,
  }
};

export const Spacing = {
  unit: 8,
  containerPaddingDesktop: 40,
  containerPaddingMobile: 20,
  gutter: 24,
  stackSm: 12,
  stackMd: 24,
  stackLg: 48,
};

export const Radii = {
  sm: 4,
  md: 12,    // buttons, inputs
  lg: 24,    // cards, containers
  pill: 100, // chips
  full: 9999,
};

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
