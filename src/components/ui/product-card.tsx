'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Link } from '@/lib/i18n/routing';
import { GrainOverlay } from './grain-overlay';

export type CardProduct = {
  id: string;
  slug: string | null;
  nombre: string;
  sku: string | null;
  precio_venta: number | null;
  imagen_url: string | null;
  estado: string;
  stock: number;
  tallas: string[];
  tallasAgotadas?: string[];
  badge?: 'NUEVO' | 'ÚLTIMO' | null;
  ultimoTexto?: string | null;
};

const tonePalette = [
  'var(--grad-tone-a)',
  'var(--grad-tone-b)',
  'var(--grad-tone-c)',
  'var(--grad-tone-d)',
];

function tonePara(id: string) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) | 0;
  return tonePalette[Math.abs(h) % tonePalette.length];
}

export function ProductCard({ p }: { p: CardProduct }) {
  const agotado = p.estado === 'agotado' || p.stock <= 0;
  const precio = p.precio_venta
    ? `S/ ${Number(p.precio_venta).toFixed(0)}`
    : 'S/ —';

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="group"
    >
      <Link
        href={`/producto/${p.slug ?? p.id}`}
        className="flex flex-col border border-border bg-card text-fg"
        style={{ opacity: agotado ? 0.85 : 1 }}
      >
        <div
          className="relative overflow-hidden border-b border-border"
          style={{ aspectRatio: '3 / 4', background: tonePara(p.id) }}
        >
          <GrainOverlay />
          {p.imagen_url ? (
            <Image
              src={p.imagen_url}
              alt={p.nombre}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              style={{ filter: agotado ? 'grayscale(1) brightness(.5)' : undefined }}
            />
          ) : (
            <div
              className="absolute inset-[12%_22%_8%_22%] border"
              style={{
                borderColor: 'var(--card-frame-border)',
                background: 'var(--grad-card-inner)',
                filter: agotado ? 'grayscale(1) brightness(.45)' : undefined,
              }}
            />
          )}

          {p.sku && (
            <div className="absolute left-2 top-2 z-[2] font-mono text-[9px] uppercase tracking-ritual text-silver/75">
              ◦ {p.sku}
            </div>
          )}

          {p.badge && !agotado && (
            <div
              className="absolute right-2.5 top-2.5 z-[2] px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-ritual"
              style={{
                background:
                  p.badge === 'ÚLTIMO' ? 'var(--color-fire)' : 'var(--color-inverse-bg)',
                color:
                  p.badge === 'ÚLTIMO' ? 'var(--color-on-fire)' : 'var(--color-inverse-fg)',
              }}
            >
              {p.badge}
            </div>
          )}

          {p.ultimoTexto && !agotado && (
            <div className="absolute bottom-2.5 left-2.5 z-[2] inline-flex items-center gap-1.5 border border-border bg-bg/70 px-2 py-1 font-mono text-[9px] uppercase tracking-ritual text-fg">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-fire" />
              {p.ultimoTexto}
            </div>
          )}

          {agotado && (
            <>
              <div className="absolute inset-0 bg-bg/55" />
              <div
                className="absolute inset-x-0 top-1/2 -translate-y-1/2 -rotate-6 text-center font-black text-[34px] uppercase text-fg"
                style={{ textShadow: '0 2px 16px rgba(0,0,0,.8)' }}
              >
                Agotado
              </div>
            </>
          )}
        </div>

        <div className="flex flex-col gap-2 px-3 pb-3.5 pt-3">
          <div className="flex items-baseline justify-between gap-2">
            <div className="text-[12.5px] font-bold uppercase tracking-wide">
              {p.nombre}
            </div>
            <div className="font-mono text-xs text-fg">{precio}</div>
          </div>
          {p.sku && (
            <div className="font-mono text-[9px] uppercase tracking-ritual text-silver">
              {p.sku}
            </div>
          )}
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-[10px] tracking-wide">
            {p.tallas.map((s, i) => {
              const out = p.tallasAgotadas?.includes(s);
              return (
                <span key={s} className="flex items-center">
                  <span
                    style={{
                      color: out ? 'var(--color-silver-dim)' : 'var(--color-fg)',
                      textDecoration: out ? 'line-through' : 'none',
                    }}
                  >
                    {s}
                  </span>
                  {i < p.tallas.length - 1 && (
                    <span className="mx-1 text-silver-dim">·</span>
                  )}
                </span>
              );
            })}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
