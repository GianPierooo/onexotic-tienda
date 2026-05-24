# OnExotic — Tienda web

Tienda oficial de OnExotic en [onexotic.shop](https://onexotic.shop). Drops limitados de gymwear, oversize y streetwear.

> Este es **solo** el proyecto de la tienda web (Next.js). La app interna de gestión y la futura app móvil son proyectos separados (Flutter) que comparten la misma base de datos Supabase.

## Stack

- Next.js 14 (App Router) · TypeScript estricto
- Tailwind CSS con tokens de marca (oscuro siempre)
- next-intl (español por defecto, inglés)
- Supabase (PostgreSQL + Auth + Storage)
- Framer Motion
- PWA con `@ducanh2912/next-pwa`

## Requisitos

- Node 20+
- Supabase CLI (`npm i -g supabase` o `npx supabase`)
- Cuenta y proyecto Supabase (project ref `gxzajbxumilshvrpwcnx`, org `oawuwvquyrnxlpamaohd`)

## Setup local

```bash
# 1) Dependencias
npm install

# 2) Variables de entorno
#    Copia .env.example a .env.local y rellena las claves
#    El anon key se obtiene en:
#    https://supabase.com/dashboard/project/gxzajbxumilshvrpwcnx/settings/api
cp .env.example .env.local

# 3) Conectar Supabase CLI al proyecto (solo la primera vez)
npx supabase login --token <tu-personal-access-token>
npx supabase link --project-ref gxzajbxumilshvrpwcnx

# 4) Aplicar migraciones (tablas tienda + RLS)
npx supabase db push

# 5) Regenerar tipos de la base
npm run db:types

# 6) Levantar dev server
npm run dev
```

Abre `http://localhost:3000` (redirige a `/es`).

## Scripts

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run start` | Servidor de producción |
| `npm run lint` | ESLint (next/core-web-vitals) |
| `npm run typecheck` | `tsc --noEmit` con strict |
| `npm run db:types` | Regenera `database.types.ts` desde Supabase |

## Estructura

```
src/
  app/[locale]/        Rutas por idioma (home, tienda, producto, etc.)
  components/
    layout/            Header, BottomNav, Footer, LanguageSwitcher
    ui/                Primitivos (Button, GrainOverlay, states)
    icons/             SVG inline puerto de los mockups
  lib/
    supabase/          client, server, middleware, types
    i18n/              next-intl (config, routing, request)
    fonts.ts           4 fuentes con next/font
    tokens.ts          paleta TS espejo del tailwind.config
    utils.ts           cn(), formatPEN()
messages/              es.json, en.json
supabase/migrations/   SQL versionado
mockups/               Referencia visual EXACTA (no se toca, no se importa)
public/                Manifest PWA, iconos, og
```

## Contrato de variables de entorno

Todas las variables viven en `.env.local` (no commiteado) o `.env.example` (commiteado, solo placeholders). Estos son los nombres canónicos — si renombras una, hay que actualizar `.env.local`, `.env.example` y todas las referencias en el código a la vez.

| Variable | Ámbito | Default si vacío | Uso |
|----------|--------|------------------|-----|
| `NEXT_PUBLIC_SUPABASE_URL` | cliente | — (obligatoria) | URL del proyecto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | cliente | — (obligatoria) | Anon key con RLS |
| `SUPABASE_SERVICE_ROLE_KEY` | servidor | — | Solo scripts/seed; nunca exponer al cliente |
| `NEXT_PUBLIC_SITE_URL` | cliente | `https://onexotic.shop` | Base canónica para metadata, robots, sitemap y JSON-LD |
| `NEXT_PUBLIC_WHATSAPP_PHONE` | cliente | `51906517394` | Solo dígitos, formato `wa.me` |
| `NEXT_PUBLIC_WHATSAPP_LABEL` | cliente | `+51 906 517 394` | Etiqueta visible |
| `NEXT_PUBLIC_FREE_SHIPPING_THRESHOLD` | cliente | `250` | Umbral en soles para envío gratis (Lima/provincia) |
| `NEXT_PUBLIC_SHIPPING_DEFAULT` | cliente | `15` | Costo de envío fallback en el carrito |
| `NEXT_PUBLIC_SHIPPING_LIMA` | cliente | `15` | Tarifa Lima |
| `NEXT_PUBLIC_SHIPPING_PROVINCIA` | cliente | `25` | Tarifa provincia |
| `NEXT_PUBLIC_SHIPPING_INTL` | cliente | `120` | Tarifa internacional (sin envío gratis) |
| `CULQI_PUBLIC_KEY` / `CULQI_SECRET_KEY` | mixto | — | Pago online; vacío deja el botón en "próximamente" |
| `RESEND_API_KEY` | servidor | — | Si vacío, la confirmación de pedido se loguea sin enviarse |
| `ORDER_EMAIL_FROM` | servidor | `OnExotic <pedidos@onexotic.shop>` | Remitente del email de confirmación |

## Convenciones

- Archivos y carpetas: **kebab-case**
- Componentes React: **PascalCase**
- Variables y funciones: **camelCase**
- Sin `any`. Sin `console.log` en producción.
- **Server Components** por defecto; `'use client'` solo cuando hace falta interactividad.
- Mobile-first, dark-only (no hay tema claro).
- Todos los textos visibles vienen de `messages/{es,en}.json`. Nada de strings hardcodeados.

## Notas importantes

- **No tocar `productos` ni `drops`** en Supabase: las gestiona la app interna Flutter.
- La tienda **solo lee** esas tablas. Cuando se confirma un pedido, descuenta stock (la lógica vivirá en una server action o RPC).
- `supabase/.temp` y `supabase/.branches` están gitignored.
- Los iconos PWA en `public/icons/` son placeholders SVG — reemplazar con PNG del logo real para pasar la auditoría PWA de Lighthouse.

## Pendientes próximas iteraciones

Implementar el contenido real de cada pantalla siguiendo los mockups en `mockups/`:

1. Home (hero del drop activo, productos destacados, marquee, etc.)
2. Catálogo + filtros (tipo/talla/color)
3. Detalle de producto
4. Carrito persistente
5. Auth (login/registro) con Supabase
6. Checkout + WhatsApp + Culqi (cuando estén las llaves)
7. Cuenta de cliente (historial, direcciones)
8. Archivo / Lookbook / Historia
9. Formulario de Libro de reclamaciones
10. Email transaccional de confirmación
