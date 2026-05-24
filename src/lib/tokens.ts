/**
 * Tokens de marca — espejo TypeScript del tailwind.config.ts.
 * Útil cuando se necesita el color en estilos inline (gradientes, SVG dinámicos).
 */
export const colors = {
  bg: '#0A0A0A',
  card: '#141414',
  cardAlt: '#1E1E1E',
  border: '#2A2A2A',
  text: '#FFFFFF',
  muted: '#888888',
  fire: '#B81414',
  fireDim: '#5A0A0A',
  silver: '#C0C0C0',
  silverDim: '#7A7A7A',
  success: '#22C55E',
  warning: '#F59E0B',
  error: '#EF4444',
} as const;

export const fonts = {
  goth: '"Pirata One", "UnifrakturCook", serif',
  black: '"UnifrakturCook", "Pirata One", serif',
  body: '"Archivo", system-ui, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, monospace',
} as const;
