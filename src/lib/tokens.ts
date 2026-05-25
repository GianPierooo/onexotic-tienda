/**
 * Tokens de marca — apuntan a las variables CSS definidas en globals.css.
 * Esto permite que styles en línea (gradientes, SVG, badges) cambien
 * automáticamente entre tema oscuro y claro sin tocar componentes.
 *
 * Para los valores HEX crudos (cuando un SVG necesita un color literal
 * y no puede usar currentColor o var()), exportamos también `colorsRaw`.
 */
export const colors = {
  bg: 'var(--color-bg)',
  card: 'var(--color-surface)',
  cardAlt: 'var(--color-surface-alt)',
  border: 'var(--color-border)',
  text: 'var(--color-fg)',
  muted: 'var(--color-muted)',
  fire: 'var(--color-fire)',
  fireDim: 'var(--color-fire-dim)',
  silver: 'var(--color-silver)',
  silverDim: 'var(--color-silver-dim)',
  success: 'var(--color-success)',
  warning: 'var(--color-warning)',
  error: 'var(--color-error)',
  onFire: 'var(--color-on-fire)',
} as const;

/**
 * Hex literales — solo para casos donde se requiere un color fijo,
 * tipo el themeColor del manifest o el acento de marca que no cambia
 * entre temas. Para todo lo demás, usar `colors`.
 */
export const colorsRaw = {
  fire: '#B81414',
  fireDim: '#5A0A0A',
  bgDark: '#0A0A0A',
  bgLight: '#F4F2EF',
} as const;

export const fonts = {
  goth: '"Pirata One", "UnifrakturCook", serif',
  black: '"UnifrakturCook", "Pirata One", serif',
  body: '"Archivo", system-ui, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, monospace',
} as const;
