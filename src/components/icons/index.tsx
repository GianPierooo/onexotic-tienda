/**
 * Iconos en línea fina (1.4px) — puerto fiel de los SVG en mockups/home.jsx.
 * Cada icono hereda currentColor para componerse con utilidades de Tailwind.
 */
import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function svgProps(size: number, rest: SVGProps<SVGSVGElement>) {
  return {
    width: size,
    height: size,
    fill: 'none',
    'aria-hidden': true as const,
    ...rest,
  };
}

export function MenuIcon({ size = 22, ...rest }: IconProps) {
  return (
    <svg {...svgProps(size, rest)} viewBox="0 0 22 22">
      <path
        d="M2 6h18M2 11h12M2 16h18"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="square"
      />
    </svg>
  );
}

export function BagIcon({ size = 22, ...rest }: IconProps) {
  return (
    <svg {...svgProps(size, rest)} viewBox="0 0 22 22">
      <path d="M4 7h14l-1 12H5L4 7z" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 7V5a3 3 0 1 1 6 0v2" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function SearchIcon({ size = 22, ...rest }: IconProps) {
  return (
    <svg {...svgProps(size, rest)} viewBox="0 0 22 22">
      <circle cx="10" cy="10" r="6" stroke="currentColor" strokeWidth="1.4" />
      <path d="M15 15l4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
    </svg>
  );
}

export function UserIcon({ size = 22, ...rest }: IconProps) {
  return (
    <svg {...svgProps(size, rest)} viewBox="0 0 22 22">
      <circle cx="11" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M4 19c1.5-3.5 4.2-5 7-5s5.5 1.5 7 5"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}

export function HomeIcon({ size = 22, ...rest }: IconProps) {
  return (
    <svg {...svgProps(size, rest)} viewBox="0 0 22 22">
      <path d="M3 10l8-6 8 6v9H3v-9z" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function GridIcon({ size = 22, ...rest }: IconProps) {
  return (
    <svg {...svgProps(size, rest)} viewBox="0 0 22 22">
      <path
        d="M3 3h7v7H3zM12 3h7v7h-7zM3 12h7v7H3zM12 12h7v7h-7z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}

export function FlameIcon({ size = 22, ...rest }: IconProps) {
  return (
    <svg {...svgProps(size, rest)} viewBox="0 0 22 22">
      <path
        d="M11 20c4.4 0 7-3.1 7-7 0-3.1-2.3-4.7-3.9-7.8C13 8 10.6 8.8 8.4 11c-1.3 1.3-2.3 3.1-2.3 5.5C6.1 18.4 8.1 20 11 20z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.6"
      />
    </svg>
  );
}

export function ChevronLeft({ size = 22, ...rest }: IconProps) {
  return (
    <svg {...svgProps(size, rest)} viewBox="0 0 22 22">
      <path
        d="M14 4l-7 7 7 7"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="square"
        strokeLinejoin="miter"
        fill="none"
      />
    </svg>
  );
}

export function CloseIcon({ size = 22, ...rest }: IconProps) {
  return (
    <svg {...svgProps(size, rest)} viewBox="0 0 22 22">
      <path
        d="M4 4l14 14M18 4L4 18"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="square"
      />
    </svg>
  );
}

export function GlobeIcon({ size = 22, ...rest }: IconProps) {
  return (
    <svg {...svgProps(size, rest)} viewBox="0 0 22 22">
      <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M3 11h16M11 3c2.5 3 2.5 13 0 16M11 3c-2.5 3-2.5 13 0 16"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}
