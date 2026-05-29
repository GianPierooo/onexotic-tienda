# CLAUDE.md — Tienda Web OnExotic

Este archivo es el contexto global del proyecto. Léelo completo antes de
escribir cualquier código. Todas las decisiones de arquitectura, diseño y
convenciones que se describen aquí son obligatorias.

---

## 1. QUÉ ES ESTE PROYECTO

Es la **tienda web pública** de OnExotic — una marca peruana de ropa fundada
en 2025 que vende gymwear, ropa oversize y streetwear. La marca opera por
sistema de drops limitados (lanzamientos de colección por tiempo y stock
limitado): EXOTIC0 → Ñ → Drop 003 → etc.

OnExotic vende actualmente por Instagram, TikTok, Facebook y WhatsApp Business.
Esta tienda web es el nuevo canal de venta online oficial en onexotic.shop.

IMPORTANTE: este proyecto NO es la app interna de gestión. OnExotic ya tiene
una app interna construida en Flutter que usa el equipo. Esta tienda web es
un proyecto separado e independiente, con su PROPIO proyecto Supabase
(ver sección de arquitectura de datos).

---

## 2. STACK TÉCNICO

- Next.js 14 con App Router
- TypeScript en modo estricto
- Tailwind CSS para estilos
- Supabase como backend (PostgreSQL + Auth + Storage)
- Framer Motion para animaciones
- next-intl para internacionalización (español e inglés)
- Despliegue en Vercel
- Dominio: onexotic.shop

Pasarela de pago: Culqi (pasarela peruana que soporta Yape, Plin y tarjeta).
La integración se deja preparada en el código aunque la cuenta de Culqi se
configurará más adelante. Mientras tanto la tienda funciona con WhatsApp.

---

## 3. ARQUITECTURA DE DATOS — PROYECTO PROPIO

La tienda tiene su PROPIO proyecto Supabase, independiente de la app interna
de gestión (Flutter). NO comparten base de datos ni tablas.
Project ref de Supabase de la tienda: jmxiwzotiridrjkdqulh

La tienda es dueña de TODAS sus tablas y las administra en su propio proyecto:

- `productos`: id, nombre, tipo, drop_id, talla, color, stock, stock_minimo,
costo, precio_venta, estado, imagen_url, sku, disenio_id
- `drops`: id, nombre, concepto, fecha_lanzamiento, estado
- `clientes`: datos de los compradores
- `pedidos`: órdenes de compra
- `pedido_items`: productos dentro de cada pedido
- `direcciones`: direcciones de envío de los clientes
- `reclamaciones`: libro de reclamaciones (obligatorio en Perú)
- `avisos_drop`: captación de email para próximos drops

Regla de oro: una sola fuente de verdad dentro del proyecto de la tienda. El
inventario vive en la tabla `productos` de este proyecto; el equipo carga los
drops y actualiza el stock manualmente desde el dashboard de Supabase. Cuando
se confirma un pedido, se descuenta el stock de la tabla `productos` de forma
atómica (RPC `crear_pedido`, con `FOR UPDATE` para no sobrevender).

Solo se muestran en la tienda los productos con estado activo y stock mayor
a cero. Los productos del drop con estado distinto a lanzado no se muestran
en el catálogo principal.

---

## 4. SECCIONES DE LA WEB

1. Home — hero a pantalla completa con el drop actual, productos destacados,
  llamado a la acción claro, sección breve de marca.
2. Drop actual / Catálogo — grid de productos del drop activo, con filtros
  por tipo, talla y color.
3. Producto detalle — galería de fotos, selector de talla, stock disponible,
  botón agregar al carrito, descripción.
4. Drops pasados / Archivo — historial visual de drops anteriores.
5. Lookbook / Galería — fotos editoriales y de la marca.
6. Historia de la marca — sobre OnExotic, su fundación en 2025, filosofía,
  el concepto de drops limitados.
7. Carrito — productos seleccionados, edición de cantidades, subtotal.
8. Checkout — datos de envío, selección de método de pago.
9. Cuenta de cliente — registro, login, historial de pedidos, direcciones
  guardadas.
10. Seguimiento de pedido — estado de cada orden.

---

## 5. COMPRA Y PAGOS

Dos métodos de compra disponibles para el cliente:

Pago online (Culqi):

- Integración preparada en el código.
- Soporta Yape, Plin y tarjeta de crédito/débito.
- La cuenta y llaves de Culqi se agregan más adelante como variables de
entorno; mientras tanto el botón de pago online puede mostrarse como
"próximamente" sin romper el flujo.

WhatsApp:

- Botón que arma un mensaje pre-llenado con los productos del carrito
(nombre, talla, cantidad, precio y total) y abre WhatsApp Business.
- Es el método principal mientras Culqi no esté activo.

---

## 6. ENVÍOS

- OnExotic hace envíos a todo Perú y también internacionales.
- Hay envío gratis a partir de cierto monto de compra (el umbral exacto se
define como variable configurable, fácil de cambiar).
- Por debajo del umbral se cobra un costo de envío según la zona.
- En el checkout se calcula y muestra claramente el costo de envío antes
de confirmar el pedido.

---

## 7. CUENTAS DE CLIENTE

- Registro y login con Supabase Auth.
- El cliente puede ver su historial de pedidos.
- El cliente puede guardar varias direcciones de envío.
- El cliente puede ver el estado de cada pedido.
- También se permite comprar; pero la cuenta es el flujo principal porque
queremos historial y base de clientes por drop.

---

## 8. IDIOMAS

La web está en español e inglés usando next-intl. El español es el idioma
por defecto. Todos los textos visibles deben estar en archivos de traducción,
nunca hardcodeados. El selector de idioma es visible en el header.

---

## 9. TONO DE VOZ Y COPY

El tono de OnExotic es "exclusivo con actitud de calle":

- Confiado y directo, sin sonar arrogante.
- Mensajes de exclusividad por los drops limitados (la idea de "cuando se
acaba, se acaba").
- Un toque motivacional por el lado gymwear, pero con código de calle, no
de coach genérico.
- Frases cortas y potentes, en segunda persona ("tú").
- Ni demasiado juvenil ni lujo frío: hablarle de tú a tú a alguien que
entiende la cultura streetwear.

Los textos de la web (botones, secciones, mensajes) deben seguir este tono.

---

Sección 10 (Identidad visual)

- Fondo base: #0A0A0A
- Cards y superficies: #141414 y #1E1E1E
- Acento principal: rojo gótico intenso #B81414
- Acento secundario: plateado #C0C0C0
- Bordes: #2A2A2A
- Texto primario: #FFFFFF
- Texto secundario: #888888
- Success #22C55E, Warning #F59E0B, Error #EF4444

Estilo visual:

- Tema oscuro siempre, no hay modo claro en la tienda.
- Estética gótica/tribal alineada con el logo de la marca: un símbolo tribal
con puntas afiladas y curvas fluidas.
- Tipografía display agresiva tipo gótica/blackletter para títulos grandes
(por ejemplo Pirata One, UnifrakturCook o similar). Sans-serif legible y
moderna para el cuerpo de texto.
- NO usar fuentes genéricas de "AI slop" como Inter o Roboto para los
títulos display.
- Animaciones de scroll, transiciones suaves, efectos hover marcados con
Framer Motion. Las animaciones deben sentirse intencionales, no
decorativas de relleno.
- Sensación premium, oscura, de marca streetwear exclusiva.
- Mucho espacio negro, contraste fuerte, el rojo #B81414 usado con 
intención como acento, y el plateado #C0C0C0 
para detalles finos y toques premium

Mobile-first: la mayoría de clientes comprará desde el celular. Cada pantalla
se diseña primero para móvil y luego se adapta a desktop.

---

## 11. LOGO Y ASSETS

- El logo tribal de OnExotic está disponible en versión blanca y negra (PNG).
- Como la web es oscura, se usa la versión blanca del logo.
- Hay fotos profesionales de producto listas para usar en el catálogo y el
lookbook.

---

## 12. CONVENCIONES DE CÓDIGO

- Archivos y carpetas: kebab-case.
- Componentes React: PascalCase.
- Variables y funciones: camelCase.
- TypeScript estricto: tipar todo, evitar `any`.
- Componentes de servidor por defecto (App Router); usar "use client" solo
cuando sea necesario (interactividad, hooks de estado).
- Cada componente en su propio archivo.
- Manejar siempre los estados: cargando, error, vacío y con datos.
- Nunca hardcodear claves de API ni secretos; usar variables de entorno.
- Las claves públicas de Supabase (URL y anon key) sí pueden ir en el cliente
porque están protegidas por RLS; las claves de servicio nunca.
- Código limpio, sin console.log en producción.
- Componentes reutilizables en una carpeta compartida.

---

## 13. SEGURIDAD

- Todas las tablas nuevas de la tienda usan Row Level Security (RLS).
- Un cliente solo puede ver y editar sus propios pedidos y direcciones.
- Las tablas `productos` y `drops` son de solo lectura para los clientes de la
  tienda; su contenido se administra desde el dashboard de Supabase y el stock
  solo se descuenta vía el RPC seguro `crear_pedido`.
- Validar todas las entradas del usuario antes de enviarlas a Supabase.

---

## 14. ESTRUCTURA DE CARPETAS SUGERIDA

```
src/
  app/                  rutas con App Router
    [locale]/           segmento de idioma
      page.tsx          home
      tienda/           catálogo
      producto/[id]/    detalle de producto
      drops/            archivo de drops
      lookbook/
      marca/            historia
      carrito/
      checkout/
      cuenta/           login, registro, historial
  components/           componentes reutilizables
  lib/                  cliente supabase, utilidades
  messages/             archivos de traducción es / en
  styles/
```

---

## 15. PRIORIDAD DE CONSTRUCCIÓN

1. Setup del proyecto, Tailwind con tokens, i18n, cliente Supabase.
2. Tablas nuevas en Supabase con RLS.
3. Layout base: header con logo y selector de idioma, footer.
4. Home con hero del drop actual.
5. Catálogo leyendo productos de Supabase.
6. Detalle de producto.
7. Carrito.
8. Cuenta de cliente (registro / login).
9. Checkout con WhatsApp + Culqi preparado.
10. Secciones de marca: drops pasados, lookbook, historia.
11. Seguimiento de pedido.
12. Pulido visual, animaciones, responsive final.

## 16. PÁGINAS LEGALES (OBLIGATORIO EN PERÚ)

La tienda debe incluir estas páginas, enlazadas desde el footer:

- Libro de Reclamaciones virtual (obligatorio por ley en Perú para

  negocios que venden a consumidores). Formulario con datos del

  reclamante, tipo de reclamo/queja, detalle, y guardado en Supabase

  en una tabla reclamaciones.

- Términos y Condiciones

- Política de Privacidad

- Política de Cambios y Devoluciones

- Información de envíos y tiempos de entrega

## 17. SEO

- Meta tags por página (title, description) traducidos.

- Open Graph y Twitter Card para que los links se vean bien al

  compartir en Instagram, WhatsApp, etc.

- Structured data (JSON-LD) de tipo Product en las páginas de

  producto, con precio, disponibilidad e imágenes.

- Sitemap.xml y robots.txt generados automáticamente.

- URLs limpias y legibles.

- Usar next/image en todas las imágenes para optimización y carga

  rápida.

## 18. MECÁNICA DE DROPS

Los drops son el corazón de OnExotic. La tienda debe reflejarlo:

- Drop actual: se muestra como colección destacada y comprable.

- Producto agotado: cuando stock llega a cero se muestra el estado

  "AGOTADO" claramente, el producto sigue visible pero no comprable.

- Drop próximo: si un drop tiene estado planificacion o produccion

  y una fecha de lanzamiento futura, se muestra como "PRÓXIMO DROP"

  con un contador regresivo hasta la fecha.

- Botón "Avísame": en drops próximos, el cliente deja su correo para

  recibir aviso cuando se lance. Se guarda en una tabla avisos_drop.

- Drops pasados: se muestran en el archivo como colecciones cerradas.

## 19. EXPERIENCIA DE COMPRA

- Carrito persistente: el contenido del carrito se guarda (localStorage

  o en la cuenta del cliente si está logueado) y sobrevive al recargar.

- Guía de tallas: cada producto tiene acceso a una guía de tallas con

  medidas, importante para gymwear y oversize.

- Email de confirmación: al confirmar un pedido el cliente recibe un

  correo con el resumen de su compra.

- Stock en tiempo real: al confirmar pedido, descontar stock de forma

  segura para evitar vender más de lo disponible si dos personas

  compran lo último a la vez.

## 20. ANALÍTICA

- Integrar Vercel Analytics o Google Analytics para medir visitas,

  productos más vistos y conversiones.

## 21. GESTIÓN DE PEDIDOS

Los pedidos creados por la tienda se guardan en la tabla pedidos de

Supabase. Por ahora el equipo los revisa desde el dashboard de

Supabase. Más adelante se agregará un módulo de Ventas/Pedidos a la

app interna de gestión de OnExotic para administrarlos desde ahí.

Mantener la tabla pedidos bien estructurada pensando en eso.

## 22. DATOS DE LA MARCA

- WhatsApp Business: +51 906517394
- Correo de contacto: onexotic2005@gmail.com
- Instagram / TikTok / Facebook: por definir


## 23. PWA

La tienda debe ser instalable como PWA (igual que
una app nativa). Configurar manifest.json con los
datos de OnExotic, íconos con el logo tribal,
fondo #0A0A0A y color de tema #B81414, y un service
worker básico. Así el cliente puede agregar la
tienda a su pantalla de inicio en iPhone y Android.


## 24. ESTÁNDAR DE CALIDAD Y PROYECTOS RELACIONADOS

Este proyecto es ÚNICAMENTE la tienda web, 
construida en Next.js. Se desarrolla de forma 
profesional y sólida: código limpio y modular, 
arquitectura escalable, TypeScript estricto, 
buenas prácticas de Next.js, rendimiento 
optimizado y accesibilidad respetada.

Ecosistema OnExotic (proyectos separados):
- App interna de gestión: Flutter (ya existe)
- Tienda web: Next.js (este proyecto)
- App de tienda para App Store y Play Store: 
  se construirá a futuro como proyecto Flutter 
  separado, NO empaquetando esta web.

La tienda web tiene su propio proyecto Supabase 
exclusivo (project ref jmxiwzotiridrjkdqulh), 
independiente del de la app interna de gestión.


