/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // Warm Editorial Minimalist Canvas & Surfaces
        background: '#FAF9F6',
        'on-background': '#121214',
        surface: '#FFFFFF',
        'on-surface': '#121214',
        'on-surface-variant': '#6E6D7A',
        'surface-container': '#F5F4F0',
        'surface-container-low': '#FDFCFA',
        'surface-container-high': '#EFECE6',
        'surface-container-highest': '#E6E3DC',
        'surface-container-lowest': '#FFFFFF',
        'surface-variant': '#F3F1EC',
        'surface-dim': '#EAE8E2',
        'surface-bright': '#FFFFFF',
        'cream-bg': '#FAF9F6',

        // Refined Charcoal Dark Primary (No Neon Royal Blue)
        primary: '#18181B',
        'on-primary': '#FFFFFF',
        'primary-container': '#27272A',
        'on-primary-container': '#FAFAFA',
        'primary-fixed': '#E4E4E7',
        'primary-fixed-dim': '#D4D4D8',
        'on-primary-fixed': '#121214',
        'on-primary-fixed-variant': '#27272A',
        'inverse-primary': '#E4E4E7',
        'surface-tint': '#18181B',

        // Therapeutic Muted Spot Pastels (No Screaming Yellow)
        secondary: '#2E4B3E',
        'on-secondary': '#FFFFFF',
        'secondary-container': '#EDF3EC',
        'on-secondary-container': '#244B36',
        'secondary-fixed': '#E2ECE1',
        'secondary-fixed-dim': '#C8DBC6',
        'on-secondary-fixed': '#163123',
        'on-secondary-fixed-variant': '#244B36',

        tertiary: '#204165',
        'on-tertiary': '#FFFFFF',
        'tertiary-container': '#EEF3F8',
        'on-tertiary-container': '#214467',
        'tertiary-fixed': '#E2EBF5',
        'tertiary-fixed-dim': '#C4D6EA',
        'on-tertiary-fixed': '#142940',
        'on-tertiary-fixed-variant': '#214467',

        // Calming Semantic Pastels
        'accent-sage': '#EDF3EC',
        'accent-pink': '#FDEBEC',
        'accent-orange': '#F6F3EB',

        // Crisp Neutral Lines & Ink Text
        outline: '#EAEAEA',
        'outline-variant': '#F0EFEA',
        'ink-black': '#121214',

        // Safety, Crisis & Alerts
        error: '#932924',
        'on-error': '#FFFFFF',
        'error-container': '#FDEBEC',
        'on-error-container': '#8F2B26',

        'inverse-surface': '#1E1E22',
        'inverse-on-surface': '#F5F4F0',
      },
      borderRadius: {
        DEFAULT: '6px',
        sm: '6px',
        md: '10px',
        lg: '14px',
        xl: '18px',
        '2xl': '24px',
        '3xl': '32px',
        full: '9999px',
      },
      boxShadow: {
        subtle: '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        card: '0 1px 3px 0 rgba(0, 0, 0, 0.02), 0 6px 16px -2px rgba(0, 0, 0, 0.03)',
        elevated: '0 10px 30px -4px rgba(0, 0, 0, 0.05), 0 4px 8px -2px rgba(0, 0, 0, 0.02)',
      },
      spacing: {
        'stack-md': '20px',
        'margin-mobile': '16px',
        'stack-lg': '40px',
        'container-padding': '24px',
        'margin-desktop': '32px',
        gutter: '20px',
        base: '8px',
        'stack-sm': '12px',
      },
    },
  },
  plugins: [],
};
