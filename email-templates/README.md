# OnExotic — Plantillas de correo

Estas plantillas HTML están pensadas para pegarse tal cual en el panel de
Supabase y en el flujo transaccional de pedidos. Todas son bilingües
(bloque ES arriba, bloque EN abajo) y están "branded": fondo negro
(#0A0A0A), acento rojo (#B81414), texto blanco/silver.

## Cómo usarlas

### Supabase Auth → Email Templates

1. Abre el dashboard de Supabase → Authentication → Email Templates.
2. Para cada tipo (Confirm signup, Reset password), pega el HTML del
   archivo correspondiente.
3. Las variables que esperan los templates son las que provee Supabase
   por defecto:
   - `{{ .ConfirmationURL }}` — URL de confirmación
   - `{{ .Token }}` — token (no lo usamos, pero está disponible)
   - `{{ .SiteURL }}` — base del sitio
   - `{{ .Email }}` — correo del usuario

### Confirmación de pedido (transaccional)

`order-confirmation.html` se usa desde el servidor cuando se cierra un
pedido. Las variables son placeholders simples (`{{nombre}}`, `{{numero}}`,
`{{total}}`, `{{whatsapp}}`, `{{itemsHtml}}`). El backend reemplaza esas
cadenas antes de enviar vía Resend.

## Archivos

- `confirm-signup.html` — confirmación de cuenta.
- `reset-password.html` — restablecer contraseña.
- `order-confirmation.html` — confirmación de pedido.

## Reglas de estilo

- Tabla 600 px de ancho máximo, centrada.
- Solo `inline styles` (los clientes de correo descartan `<style>`
  externos y muchas reglas de cascada).
- Fuentes seguras: Helvetica, Arial, system-ui.
- Imágenes opcionales; el correo debe leerse sin imágenes.
- Botón CTA mínimo 44 × 44 px para tacto en móvil.
- Modo oscuro nativo: usamos `color-scheme: dark` para que clientes que
  honren el meta no inviertan los colores.
