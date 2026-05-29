import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

/**
 * Cliente Supabase con SERVICE ROLE — SOLO servidor. Salta RLS, así que debe
 * usarse únicamente desde server actions / route handlers con la lógica de
 * validación bien acotada. Hoy lo usa el checkout de invitado para crear el
 * pedido vía el RPC `crear_pedido` (que valida stock de forma atómica).
 *
 * No importar nunca desde un componente cliente: la service key solo existe en
 * el entorno de servidor (no es NEXT_PUBLIC_).
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    throw new Error(
      'Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY para el cliente admin.'
    );
  }
  return createSupabaseClient<Database>(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
