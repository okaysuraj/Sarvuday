/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // High-End Minimalist Tokens
        "background": "#FAF9F6",
        "on-background": "#121214",
        "surface": "#FFFFFF",
        "on-surface": "#121214",
        "on-surface-variant": "#6E6D7A",
        "surface-container": "#F5F4F0",
        "surface-container-low": "#FDFCFA",
        "surface-container-high": "#EFECE6",
        "surface-container-lowest": "#FFFFFF",
        "surface-container-highest": "#E6E3DC",
        "surface-variant": "#F3F1EC",
        "surface-dim": "#EAE8E2",
        "surface-bright": "#FFFFFF",
        
        // Clean Dark Primary
        "primary": "#18181B",
        "on-primary": "#FFFFFF",
        "primary-container": "#27272A",
        "on-primary-container": "#FAFAFA",
        "primary-fixed": "#E4E4E7",
        "primary-fixed-dim": "#D4D4D8",
        
        // Therapeutic Muted Spot Pastels
        "secondary": "#2E4B3E",
        "on-secondary": "#FFFFFF",
        "secondary-container": "#EDF3EC",
        "on-secondary-container": "#244B36",
        "tertiary": "#204165",
        "on-tertiary": "#FFFFFF",
        "tertiary-container": "#EEF3F8",
        "on-tertiary-container": "#214467",
        
        // Calming Semantic Pastels
        "accent-sage": "#EDF3EC",
        "accent-pink": "#FDEBEC",
        "accent-orange": "#F6F3EB",
        
        // Crisp Neutral Lines
        "outline": "#EAEAEA",
        "outline-variant": "#F0EFEA",
        "ink-black": "#121214",
        
        // Safety & Alerts
        "error": "#932924",
        "on-error": "#FFFFFF",
        "error-container": "#FDEBEC",
        "on-error-container": "#8F2B26"
      },
      borderRadius: {
        DEFAULT: "6px",
        sm: "6px",
        md: "10px",
        lg: "14px",
        xl: "18px",
        "2xl": "24px",
        "3xl": "32px",
        full: "9999px"
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.02), 0 6px 16px -2px rgba(0, 0, 0, 0.03)',
        'elevated': '0 10px 30px -4px rgba(0, 0, 0, 0.05), 0 4px 8px -2px rgba(0, 0, 0, 0.02)',
      },
      spacing: {
        gutter: "24px",
        "container-padding": "32px",
        "stack-lg": "40px",
        base: "8px",
        "stack-sm": "12px",
        "margin-mobile": "16px",
        "margin-desktop": "32px",
        "stack-md": "20px"
      },
      fontFamily: {
        "display-lg": ["Plus Jakarta Sans", "sans-serif"],
        "display-lg-mobile": ["Plus Jakarta Sans", "sans-serif"],
        "headline-md": ["Plus Jakarta Sans", "sans-serif"],
        "headline-sm": ["Plus Jakarta Sans", "sans-serif"],
        "body-lg": ["Plus Jakarta Sans", "DM Sans", "sans-serif"],
        "body-md": ["Plus Jakarta Sans", "DM Sans", "sans-serif"],
        "label-bold": ["Plus Jakarta Sans", "sans-serif"],
        "label-md": ["Plus Jakarta Sans", "sans-serif"],
        "mono": ["Geist Mono", "monospace"]
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ],
}
