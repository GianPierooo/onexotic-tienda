'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

export type EnviarReseniaInput = {
  productoId: string;
  estrellas: number;
  texto: string;
};

export type EnviarReseniaResult = { ok: true } | { ok: false; error: string };

/**
 * Envía una reseña del cliente autenticado. Queda con aprobada=false
 * (aprobación MANUAL: no se publica sola). RLS exige auth.uid()=cliente_id.
 */
export async function enviarResenia(
  input: EnviarReseniaInput
): Promise<EnviarReseniaResult> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: 'auth_required' };

  const estrellas = Math.round(Number(input.estrellas));
  if (!Number.isFinite(estrellas) || estrellas < 1 || estrellas > 5) {
    return { ok: false, error: 'estrellas' };
  }
  const texto = (input.texto ?? '').trim();
  if (texto.length < 5 || texto.length > 1500) {
    return { ok: false, error: 'texto' };
  }

  // Nombre a mostrar (denormalizado). Si no se puede leer clientes, cae al
  // local-part del email.
  const { data: cliente } = await supabase
    .from('clientes')
    .select('nombre')
    .eq('id', user.id)
    .maybeSingle<{ nombre: string | null }>();
  const autor =
    cliente?.nombre?.trim() || user.email?.split('@')[0] || 'Cliente OnExotic';

  // aprobada queda en su default (false) → aprobación manual.
  const payload = {
    cliente_id: user.id,
    producto_id: input.productoId,
    estrellas,
    texto,
    autor,
  };
  const { error } = await supabase.from('resenias').insert(payload as never);

  if (error) {
    // 23505 = unique_violation (ya reseñó este producto).
    if (error.code === '23505') return { ok: false, error: 'duplicada' };
    console.error('[resenia] insert', error.message);
    return { ok: false, error: 'insert_failed' };
  }

  revalidatePath('/[locale]/producto/[slug]', 'page');
  return { ok: true };
}
