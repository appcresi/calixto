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
        green: {
          deep:   '#1a2e1a',
          mid:    '#2d4a2d',
          olive:  '#4a6741',
          sage:   '#7a9b6e',
        },
        cream: {
          DEFAULT: '#f5f0e8',
          warm:    '#ede5d4',
        },
        gold: {
          DEFAULT: '#c9a84c',
          light:   '#e8d08a',
        },
        terra: '#8b5e3c',
        ivory: '#fdfaf5',
      },
      fontFamily: {
        serif:  ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans:   ['var(--font-jost)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float':     'float 4s ease-in-out infinite',
        'fade-up':   'fadeUp 0.6s ease both',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
