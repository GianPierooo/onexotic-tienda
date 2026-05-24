'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

export type AddressInput = {
  id?: string;
  alias?: string;
  destinatario: string;
  telefono: string;
  pais: string;
  departamento: string;
  provincia?: string;
  distrito: string;
  direccion: string;
  referencia?: string;
  codigo_postal?: string;
  es_predeterminada?: boolean;
};

export async function saveAddress(
  data: AddressInput
): Promise<{ ok: boolean; error?: string; id?: string }> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: 'auth_required' };

  if (data.es_predeterminada) {
    await supabase
      .from('direcciones')
      .update({ es_predeterminada: false } as never)
      .eq('cliente_id', user.id);
  }

  const payload = {
    cliente_id: user.id,
    alias: data.alias ?? null,
    destinatario: data.destinatario,
    telefono: data.telefono,
    pais: data.pais || 'PE',
    departamento: data.departamento,
    provincia: data.provincia ?? null,
    distrito: data.distrito,
    direccion: data.direccion,
    referencia: data.referencia ?? null,
    codigo_postal: data.codigo_postal ?? null,
    es_predeterminada: data.es_predeterminada ?? false,
  };

  if (data.id) {
    const { error } = await supabase
      .from('direcciones')
      .update(payload as never)
      .eq('id', data.id)
      .eq('cliente_id', user.id);
    if (error) return { ok: false, error: error.message };
    revalidatePath('/cuenta');
    return { ok: true, id: data.id };
  }

  const { data: inserted, error } = await supabase
    .from('direcciones')
    .insert(payload as never)
    .select('id')
    .single();
  if (error) return { ok: false, error: error.message };
  revalidatePath('/cuenta');
  return { ok: true, id: (inserted as { id: string } | null)?.id };
}

export async function deleteAddress(
  id: string
): Promise<{ ok: boolean; error?: string }> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: 'auth_required' };

  const { error } = await supabase
    .from('direcciones')
    .delete()
    .eq('id', id)
    .eq('cliente_id', user.id);
  if (error) return { ok: false, error: error.message };
  revalidatePath('/cuenta');
  return { ok: true };
}
