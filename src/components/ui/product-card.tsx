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
  'radial-gradient(120% 80% at 70% 20%, #2a1208 0%, #0e0606 55%, #050202 100%)',
  'radial-gradient(110% 90% at 30% 30%, #1a1a1a 0%, #0b0b0b 60%, #050505 100%)',
  'radial-gradient(130% 90% at 50% 100%, #3a1505 0%, #160906 55%, #060303 100%)',
  'linear-gradient(160deg, #1c1c1c 0%, #0a0a0a 60%, #060606 100%)',
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
        className="flex flex-col border border-border bg-card text-white"
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
                borderColor: '#1a1a1a',
                background:
                  'linear-gradient(180deg, rgba(255,255,255,.04) 0%, transparent 60%), linear-gradient(180deg, #161616 0%, #0a0a0a 100%)',
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
                background: p.badge === 'ÚLTIMO' ? '#B81414' : '#FFFFFF',
                color: p.badge === 'ÚLTIMO' ? '#FFFFFF' : '#0A0A0A',
              }}
            >
              {p.badge}
            </div>
          )}

          {p.ultimoTexto && !agotado && (
            <div className="absolute bottom-2.5 left-2.5 z-[2] inline-flex items-center gap-1.5 border border-border bg-bg/70 px-2 py-1 font-mono text-[9px] uppercase tracking-ritual text-white">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-fire" />
              {p.ultimoTexto}
            </div>
          )}

          {agotado && (
            <>
              <div className="absolute inset-0 bg-bg/55" />
              <div
                className="absolute inset-x-0 top-1/2 -translate-y-1/2 -rotate-6 text-center font-black text-[34px] uppercase text-white"
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
            <div className="font-mono text-xs text-white">{precio}</div>
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
                      color: out ? '#555' : '#FFFFFF',
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
