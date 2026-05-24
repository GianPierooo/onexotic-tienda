'use client';

import { useState, useTransition } from 'react';
import { useTranslations } from 'next-intl';
import type { Tables } from '@/lib/supabase/database.types';
import { AddressForm } from './address-form';
import { deleteAddress } from '@/lib/address-actions';

type Direccion = Tables<'direcciones'>;

export function AddressList({ initial }: { initial: Direccion[] }) {
  const t = useTranslations('account.address');
  const [editing, setEditing] = useState<string | null>(null);
  const [creating, setCreating] = useState(initial.length === 0);
  const [pending, startTransition] = useTransition();

  function remove(id: string) {
    if (!confirm(t('confirmDelete'))) return;
    startTransition(async () => {
      await deleteAddress(id);
    });
  }

  return (
    <div className="flex flex-col gap-3">
      {initial.map((d) =>
        editing === d.id ? (
          <div key={d.id} className="border border-border bg-card p-4">
            <AddressForm
              initial={{
                id: d.id,
                alias: d.alias ?? '',
                destinatario: d.destinatario,
                telefono: d.telefono,
                pais: d.pais,
                departamento: d.departamento,
                provincia: d.provincia ?? '',
                distrito: d.distrito,
                direccion: d.direccion,
                referencia: d.referencia ?? '',
                codigo_postal: d.codigo_postal ?? '',
                es_predeterminada: d.es_predeterminada,
              }}
              onSaved={() => setEditing(null)}
              onCancel={() => setEditing(null)}
            />
          </div>
        ) : (
          <article
            key={d.id}
            className="border border-border bg-card p-4 text-white"
            style={{
              borderLeft: d.es_predeterminada ? '2px solid #B81414' : undefined,
            }}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="mb-1 flex items-center gap-2 font-mono text-[10px] uppercase tracking-ritual text-silver">
                  {d.alias || t('aliasFallback')}
                  {d.es_predeterminada && (
                    <span className="border border-fire px-1.5 py-0.5 text-[9px] text-fire">
                      {t('defaultBadge')}
                    </span>
                  )}
                </div>
                <div className="font-body text-sm font-bold">{d.destinatario}</div>
                <div className="mt-1 font-body text-[13px] text-white/85">
                  {d.direccion}
                  {d.referencia ? ` · ${d.referencia}` : ''}
                </div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-ritual text-muted">
                  {d.distrito}
                  {d.provincia ? `, ${d.provincia}` : ''}
                  {`, ${d.departamento} · ${d.pais}`}
                </div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-ritual text-silver">
                  {d.telefono}
                </div>
              </div>
            </div>
            <div className="mt-3 flex gap-3 border-t border-border pt-3 font-mono text-[10px] uppercase tracking-ritual">
              <button
                type="button"
                onClick={() => setEditing(d.id)}
                className="text-white hover:text-fire"
              >
                {t('edit')}
              </button>
              <button
                type="button"
                disabled={pending}
                onClick={() => remove(d.id)}
                className="text-muted hover:text-error disabled:opacity-50"
              >
                {t('delete')}
              </button>
            </div>
          </article>
        )
      )}

      {creating ? (
        <div className="border border-border bg-card p-4">
          <AddressForm
            onSaved={() => setCreating(false)}
            onCancel={
              initial.length > 0 ? () => setCreating(false) : undefined
            }
          />
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setCreating(true)}
          className="border border-dashed border-border bg-card-alt px-4 py-3 font-mono text-[10px] uppercase tracking-ritual text-white hover:border-fire"
        >
          + {t('add')}
        </button>
      )}
    </div>
  );
}
