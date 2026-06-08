import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'blue-deep': '#0D1B2A',
        'blue-mid': '#1B3A5C',
        'blue-accent': '#2A6DB5',
        'brown-warm': '#8B5E3C',
        'brown-light': '#C4956A',
        cream: '#F5F0E8',
      },
      fontFamily: {
        heading: ['var(--font-poppins)'],
        body: ['var(--font-poppins)'],
      },
      letterSpacing: {
        tightest: '-0.03em',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '70%': { transform: 'scale(1.4)', opacity: '0' },
          '100%': { transform: 'scale(0.9)', opacity: '0' },
        },
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        'pulse-ring': 'pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
