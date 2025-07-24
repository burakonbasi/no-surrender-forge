// apps/web/tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        galano: ['Galano Grotesque', 'Inter', 'sans-serif'],
      },
      colors: {
        dark: {
          100: '#252430',
          200: '#1F1E27',
          300: '#1C1B23',
          400: '#1A1922',
          500: '#18171F',
        },
        pink: {
          primary: '#FF1E67',
          secondary: '#FF4D7D',
          tertiary: '#FF6B35',
        },
        orange: {
          primary: '#FFB84D',
          secondary: '#FFA500',
          tertiary: '#FF9500',
        },
      },
      backgroundImage: {
        'gradient-pink': 'linear-gradient(to right, #FF1E67, #FF6B35)',
        'gradient-orange': 'linear-gradient(to right, #FFB84D, #FF9500)',
        'gradient-dark': 'linear-gradient(to bottom, #252430, #1C1B23)',
      },
      boxShadow: {
        'pink': '0 4px 20px rgba(255, 30, 103, 0.3)',
        'orange': '0 4px 20px rgba(255, 184, 77, 0.3)',
        'inner-dark': 'inset 0 2px 4px rgba(0, 0, 0, 0.3)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shine': 'shine 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shine: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};

export default config;