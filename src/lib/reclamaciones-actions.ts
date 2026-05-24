'use server';

import { createClient } from '@/lib/supabase/server';

export type ReclamacionInput = {
  tipo: 'reclamo' | 'queja';
  nombres: string;
  apellidos: string;
  documento_tipo?: 'DNI' | 'CE' | 'Pasaporte' | 'RUC' | '';
  documento_numero?: string;
  email: string;
  telefono?: string;
  departamento?: string;
  distrito?: string;
  direccion?: string;
  bien_contratado?: 'producto' | 'servicio' | '';
  monto_pen?: number | null;
  descripcion: string;
  pedido_referencia?: string;
};

export type ReclamacionResult =
  | { ok: true; numero: string }
  | { ok: false; error: string };

export async function crearReclamacion(
  input: ReclamacionInput
): Promise<ReclamacionResult> {
  if (!input.nombres?.trim() || !input.apellidos?.trim()) {
    return { ok: false, error: 'invalid_name' };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
    return { ok: false, error: 'invalid_email' };
  }
  if (!input.descripcion?.trim() || input.descripcion.trim().length < 20) {
    return { ok: false, error: 'description_too_short' };
  }
  if (input.tipo !== 'reclamo' && input.tipo !== 'queja') {
    return { ok: false, error: 'invalid_type' };
  }

  const supabase = createClient();
  const payload = {
    tipo: input.tipo,
    nombres: input.nombres.trim(),
    apellidos: input.apellidos.trim(),
    documento_tipo: input.documento_tipo || null,
    documento_numero: input.documento_numero?.trim() || null,
    email: input.email.trim().toLowerCase(),
    telefono: input.telefono?.trim() || null,
    departamento: input.departamento?.trim() || null,
    distrito: input.distrito?.trim() || null,
    direccion: input.direccion?.trim() || null,
    bien_contratado: input.bien_contratado || null,
    monto_pen: input.monto_pen != null && !Number.isNaN(input.monto_pen) ? input.monto_pen : null,
    descripcion: input.descripcion.trim(),
    pedido_referencia: input.pedido_referencia?.trim() || null,
  };

  const { data, error } = await supabase
    .from('reclamaciones')
    .insert(payload as never)
    .select('numero')
    .single();

  if (error) {
    return { ok: false, error: error.message };
  }
  const row = data as { numero: string } | null;
  return { ok: true, numero: row?.numero ?? '—' };
}
