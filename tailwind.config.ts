import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/lib/**/*.{ts,tsx}',
  ],
  // next-themes alterna las clases `dark` y `light` en <html>.
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        card: 'var(--color-surface)',
        'card-alt': 'var(--color-surface-alt)',
        border: 'var(--color-border)',
        fg: 'var(--color-fg)',
        muted: 'var(--color-muted)',
        fire: 'var(--color-fire)',
        'fire-dim': 'var(--color-fire-dim)',
        silver: 'var(--color-silver)',
        'silver-dim': 'var(--color-silver-dim)',
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        error: 'var(--color-error)',
        'on-fire': 'var(--color-on-fire)',
        'inverse-bg': 'var(--color-inverse-bg)',
        'inverse-fg': 'var(--color-inverse-fg)',
      },
      backgroundImage: {
        'grain':
          'radial-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), radial-gradient(rgba(255,255,255,0.012) 1px, transparent 1px)',
        'tone-a': 'var(--grad-tone-a)',
        'tone-b': 'var(--grad-tone-b)',
        'tone-c': 'var(--grad-tone-c)',
        'tone-d': 'var(--grad-tone-d)',
        'tone-e': 'var(--grad-tone-e)',
        'tone-f': 'var(--grad-tone-f)',
        'tone-g': 'var(--grad-tone-g)',
        'tone-h': 'var(--grad-tone-h)',
        'hero-radial': 'var(--grad-hero)',
        'card-frame': 'var(--grad-card-frame)',
        'card-inner': 'var(--grad-card-inner)',
        'section-fade': 'var(--grad-section-fade)',
        'section-fade-fire': 'var(--grad-section-fade-fire)',
        'silver-fire': 'var(--grad-silver-fire)',
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
