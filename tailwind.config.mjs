import defaultTheme from 'tailwindcss/defaultTheme';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: [
          'Merriweather',
          'IBM Plex Serif',
          ...defaultTheme.fontFamily.serif
        ],
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        mono: ['IBM Plex Mono', ...defaultTheme.fontFamily.mono]
      }
    }
  },
  plugins: [typography]
};
