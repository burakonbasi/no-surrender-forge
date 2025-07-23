import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-dark-start': '#111118',
        'bg-dark-end': '#353345',
        'surface': '#23222F',
        'pink': '#EE39A8',
        'peach': '#F4BC79',
        'glow-green': '#73FF61',
      },
      fontFamily: {
        'galano': ['Galano Grotesque', 'sans-serif'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite',
        'level-up': 'levelUp 0.5s ease-out',
        'progress-fill': 'progressFill 0.3s ease-out',
      },
      keyframes: {
        glow: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        levelUp: {
          '0%': { transform: 'scale(1) rotate(0deg)' },
          '50%': { transform: 'scale(1.2) rotate(5deg)' },
          '100%': { transform: 'scale(1) rotate(0deg)' },
        },
        progressFill: {
          '0%': { width: '0%' },
          '100%': { width: 'var(--progress)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;