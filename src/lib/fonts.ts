import { Pirata_One, UnifrakturCook, Archivo, JetBrains_Mono } from 'next/font/google';

export const pirata = Pirata_One({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pirata',
  display: 'swap',
});

export const unifraktur = UnifrakturCook({
  weight: '700',
  subsets: ['latin'],
  variable: '--font-unifraktur',
  display: 'swap',
});

export const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
  display: 'swap',
});

export const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const fontVariables = [
  pirata.variable,
  unifraktur.variable,
  archivo.variable,
  jetbrains.variable,
].join(' ');
