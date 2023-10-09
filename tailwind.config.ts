import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          lightest: '#E3F8FF', // Very light blue for background or subtle shades
          light: '#AEDFF7',    // Light blue for secondary buttons or highlights
          DEFAULT: '#1C9EEA',  // Default primary color for main buttons, links, etc.
          dark: '#007AB8'      // Dark blue for text or active states
        },
        secondary: {
          lightest: '#E8F5E1', // Very light green for background or subtle shades
          light: '#A5D6A7',    // Light green for secondary buttons or highlights
          DEFAULT: '#66BB6A',  // Default secondary color for secondary actions
          dark: '#388E3C'      // Dark green for text or active states
        }
      },
      fontFamily: {
        // Add your preferred font families here
        'sans': ['Roboto', 'Arial', 'sans-serif'],
        'serif': ['Merriweather', 'serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

export default config;
