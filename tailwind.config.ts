import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/lib/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: '#0A0A0A',
        card: '#141414',
        'card-alt': '#1E1E1E',
        border: '#2A2A2A',
        muted: '#888888',
        fire: '#B81414',
        'fire-dim': '#5A0A0A',
        silver: '#C0C0C0',
        'silver-dim': '#7A7A7A',
        success: '#22C55E',
        warning: '#F59E0B',
        error: '#EF4444',
      },
      fontFamily: {
        goth: ['var(--font-pirata)', 'var(--font-unifraktur)', 'serif'],
        black: ['var(--font-unifraktur)', 'var(--font-pirata)', 'serif'],
        body: ['var(--font-archivo)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        ritual: '0.18em',
      },
      backgroundImage: {
        'grain':
          'radial-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), radial-gradient(rgba(255,255,255,0.012) 1px, transparent 1px)',
      },
      backgroundSize: {
        grain: '3px 3px, 4px 4px',
      },
      backgroundPosition: {
        grain: '0 0, 1px 2px',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-33.333%)' },
        },
        pulseFire: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.55' },
        },
      },
      animation: {
        marquee: 'marquee 22s linear infinite',
        'pulse-fire': 'pulseFire 1.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
