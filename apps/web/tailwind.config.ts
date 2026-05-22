import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E5F0FF',
          100: '#CCE0FF',
          200: '#99C2FF',
          300: '#66A3FF',
          400: '#3385FF',
          500: '#0066FF',
          600: '#0052CC',
          700: '#003D99',
          800: '#002966',
          900: '#001433',
          950: '#000E24',
        },
        brand: {
          50: '#E5F0FF',
          100: '#CCE0FF',
          200: '#99C2FF',
          300: '#66A3FF',
          400: '#3385FF',
          500: '#0066FF',
          600: '#0052CC',
          700: '#003D99',
          800: '#002966',
          900: '#001433',
          950: '#000E24',
        },
        surface: {
          DEFAULT: '#ffffff',
          subtle:  '#f9fafb',
          raised:  '#ffffff',
        },
      },
      fontFamily: {
        sans:    ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono:    ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      borderRadius: {
        'sm':  '6px',
        DEFAULT: '8px',
        'md':  '8px',
        'lg':  '12px',
        'xl':  '16px',
        '2xl': '20px',
        '3xl': '24px',
      },
      boxShadow: {
        'xs':     '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'sm':     '0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.06)',
        DEFAULT:  '0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.06)',
        'md':     '0 4px 6px -1px rgb(0 0 0 / 0.06), 0 2px 4px -2px rgb(0 0 0 / 0.06)',
        'lg':     '0 10px 15px -3px rgb(0 0 0 / 0.06), 0 4px 6px -4px rgb(0 0 0 / 0.06)',
        'xl':     '0 20px 25px -5px rgb(0 0 0 / 0.07), 0 8px 10px -6px rgb(0 0 0 / 0.07)',
        '2xl':    '0 25px 50px -12px rgb(0 0 0 / 0.15)',
        'float':  '0 8px 30px rgb(0 0 0 / 0.10)',
        'modal':  '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        'card':   '0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.06)',
        'card-hover': '0 4px 12px -2px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.05)',
        'inner-sm': 'inset 0 1px 2px 0 rgb(0 0 0 / 0.05)',
      },
      spacing: {
        '4.5': '1.125rem',
        '13': '3.25rem',
        '15': '3.75rem',
        '18': '4.5rem',
      },
      transitionDuration: {
        '150': '150ms',
        '220': '220ms',
        '320': '320ms',
      },
      animation: {
        'fade-in':   'fadeIn 0.3s ease-out',
        'slide-up':  'slideUp 0.3s ease-out',
        'slide-in':  'slideIn 0.25s ease-out',
        'float':     'float 6s ease-in-out infinite',
        'shimmer':   'shimmer 1.5s infinite',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn:   { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp:  { '0%': { transform: 'translateY(12px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
        slideIn:  { '0%': { transform: 'translateX(-8px)', opacity: '0' }, '100%': { transform: 'translateX(0)', opacity: '1' } },
        float:    { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        shimmer:  { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        pulseSoft:{ '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.7' } },
      },
    },
  },
  plugins: [],
};

export default config;
