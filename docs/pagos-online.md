# Pagos online — OnExotic Tienda

Estructura lista para cobrar online con **Culqi** (tarjetas Perú/internacional
+ Yape/Plin, en PEN) y **PayPal** (internacional, en USD). Hoy está **apagado**
detrás de un feature flag: el checkout funciona solo con **WhatsApp** hasta que
cargues las llaves y enciendas el flag.

> Mientras `NEXT_PUBLIC_PAGOS_ONLINE` sea `false` (o no exista), **no se muestra
> nada** de pago online y el checkout se ve y funciona como hoy.

---

## 1. Cómo está armado

```
src/lib/payments/
  types.ts             Interfaz PaymentProvider + tipos (OrderDraft, etc.)
  config.ts            Flags + llaves PÚBLICAS (seguro para el cliente)
  config.server.ts     Llaves SECRETAS (solo servidor; importar solo en server)
  registry.server.ts   Mapa id → proveedor; resuelve método → proveedor
  finalize.ts          Crea el pedido tras el pago (reusa crear_pedido + correo)
  providers/
    culqi.ts           Stub Culqi con TODOs (charges, Yape, webhook)
    paypal.ts          Stub PayPal con TODOs (orders v2, capture, webhook)

src/lib/payment-actions.ts          Server actions: iniciarPagoOnline / confirmarPagoOnline
src/components/checkout/online-payment-section.tsx   UI (null si el flag está apagado)

src/app/api/pagos/
  crear-sesion/route.ts        POST  crea intento de pago (para flujos con redirección)
  callback/route.ts            GET   retorno del cliente (PayPal) éxito/cancelación
  webhook/[provider]/route.ts  POST  webhook de confirmación (culqi | paypal)
```

**Flujo (cuando esté activo):**

1. En el checkout, el cliente elige *Tarjeta/Yape/Plin* o *PayPal*.
2. `iniciarPagoOnline` arma el intento con el proveedor:
   - **Culqi** → `client_sdk`: el navegador tokeniza con Culqi.js y luego llama
     a `confirmarPagoOnline` con el token.
   - **PayPal** → `redirect`: se manda al cliente a PayPal; vuelve por
     `/api/pagos/callback`.
3. Verificado el pago, **`finalizePaidOrder` crea el pedido igual que hoy**:
   reutiliza `crearPedido` → RPC `crear_pedido` (descuenta stock de forma
   atómica) + correo de confirmación (`sendOrderConfirmationEmail`).
4. El webhook (`/api/pagos/webhook/[provider]`) confirma/reconcilia de forma
   independiente a que el cliente vuelva al sitio.

Una sola fuente de verdad: el pedido SIEMPRE se crea por el mismo camino que el
checkout actual.

---

## 2. El feature flag

| Variable | Efecto |
|---|---|
| `NEXT_PUBLIC_PAGOS_ONLINE` | Interruptor maestro. `false` = todo apagado. |
| `NEXT_PUBLIC_PAGOS_CULQI` | Muestra el botón Tarjeta/Yape/Plin (requiere flag maestro). |
| `NEXT_PUBLIC_PAGOS_PAYPAL` | Muestra el botón PayPal (requiere flag maestro). |

Para encender: poné el maestro y el del proveedor en `true` en Vercel (o
`.env.local`) y redeploy. Sin llaves, los botones muestran un aviso amable y el
cliente sigue pudiendo comprar por WhatsApp.

---

## 3. Variables de entorno

Las `NEXT_PUBLIC_*` quedan expuestas en el navegador (es correcto para llaves
públicas/Client ID). El resto **solo** vive en el servidor.

### Culqi (PEN)

| Variable | Qué es | Dónde se usa |
|---|---|---|
| `NEXT_PUBLIC_CULQI_PUBLIC_KEY` | Llave pública `pk_...` | Culqi.js en el navegador |
| `CULQI_SECRET_KEY` | Llave secreta `sk_...` | Cargos en el servidor |
| `CULQI_API_BASE` | Base de la API (default `https://api.culqi.com/v2`) | Servidor |
| `CULQI_WEBHOOK_SECRET` | Secreto para validar webhooks | Servidor |

### PayPal (USD)

| Variable | Qué es | Dónde se usa |
|---|---|---|
| `NEXT_PUBLIC_PAYPAL_CLIENT_ID` | Client ID | SDK de PayPal en el navegador |
| `PAYPAL_CLIENT_ID` | Client ID | OAuth en el servidor |
| `PAYPAL_CLIENT_SECRET` | Secret | OAuth en el servidor |
| `PAYPAL_ENV` | `sandbox` o `live` | Elige el host de la API |
| `PAYPAL_WEBHOOK_ID` | ID del webhook configurado en PayPal | Verificación de webhooks |

---

## 4. Activar Culqi (pasos)

1. Abrir cuenta en https://culqi.com (RUC del negocio). Activar Yape/Plin en el
   panel de Culqi.
2. Copiar las llaves del panel (modo test primero):
   - `pk_test_...` → `NEXT_PUBLIC_CULQI_PUBLIC_KEY`
   - `sk_test_...` → `CULQI_SECRET_KEY`
3. Configurar un webhook en Culqi apuntando a
   `https://onexotic.shop/api/pagos/webhook/culqi` y copiar su secreto a
   `CULQI_WEBHOOK_SECRET`.
4. Completar los `TODO(activación)` en `src/lib/payments/providers/culqi.ts`:
   - `confirmPayment`: crear el cargo (`POST /charges` con el token de Culqi.js).
   - `verifyWebhook`: validar firma y mapear `charge.succeeded`.
   - (opcional) `createPayment`: si se usa Culqi Checkout con orden server-side.
5. Encender `NEXT_PUBLIC_PAGOS_ONLINE=true` y `NEXT_PUBLIC_PAGOS_CULQI=true`.
6. Probar en test, luego cambiar a llaves `pk_live_/sk_live_`.

## 5. Activar PayPal (pasos)

1. Crear app en https://developer.paypal.com (Dashboard → Apps & Credentials).
2. Copiar credenciales (sandbox primero):
   - Client ID → `NEXT_PUBLIC_PAYPAL_CLIENT_ID` **y** `PAYPAL_CLIENT_ID`
   - Secret → `PAYPAL_CLIENT_SECRET`
   - `PAYPAL_ENV=sandbox`
3. Crear un webhook en PayPal apuntando a
   `https://onexotic.shop/api/pagos/webhook/paypal`, suscribir el evento
   `PAYMENT.CAPTURE.COMPLETED`, y copiar el Webhook ID a `PAYPAL_WEBHOOK_ID`.
4. Completar los `TODO(activación)` en `src/lib/payments/providers/paypal.ts`:
   - `createPayment`: OAuth token + crear orden (`/v2/checkout/orders`).
   - `confirmPayment`: capturar la orden (`/capture`).
   - `verifyWebhook`: verificar firma vía API de PayPal.
5. Aplicar la migración que agrega `paypal` al RPC `crear_pedido`
   (`supabase/migrations/_propuestas/0003_crear_pedido_paypal.sql`).
6. Fijar el tipo de cambio PEN→USD real en `montoEnMoneda`
   (`src/lib/payment-actions.ts`); hoy usa `PEN_TO_USD` (informativo).
7. Encender `NEXT_PUBLIC_PAGOS_ONLINE=true` y `NEXT_PUBLIC_PAGOS_PAYPAL=true`.

---

## 6. Qué falta para producción (resumen)

- [ ] Completar los `TODO(activación)` de cada `provider` (llamadas reales).
- [ ] Persistir el *intento de pago* (`OrderDraft`) keyed por `reference`
      (tabla `payment_intents`) para que el **webhook** pueda crear el pedido
      sin sesión. Hoy el pedido se crea en el flujo síncrono (cliente con
      sesión); el webhook queda como reconciliación (con su TODO).
- [ ] **Recomputar el monto a cobrar desde la DB** (no confiar en el total del
      cliente) — anti-manipulación. `crear_pedido` ya recalcula el total del
      pedido desde `productos`, pero el *cargo* debe usar el monto del servidor.
- [ ] Idempotencia del webhook (no crear el pedido dos veces por `reference`).
- [ ] **Pago online de invitados**: requiere aplicar
      `_propuestas/0001_pedidos_invitado.sql` y completar el branch de invitado
      en `finalize.ts`. Hoy `finalizePaidOrder` solo crea pedido para usuarios
      con cuenta (igual que el checkout actual).
- [ ] Migración `_propuestas/0003` para aceptar `paypal` en `crear_pedido`.
- [ ] Guardar `pago_proveedor` / `pago_ref` en `pedidos` (migración aditiva).
