'use client';

import { useState, useTransition, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { saveAddress, type AddressInput } from '@/lib/address-actions';

type Props = {
  initial?: Partial<AddressInput> & { id?: string };
  onSaved?: (id: string | undefined) => void;
  onCancel?: () => void;
};

const PE_DEPARTAMENTOS = [
  'Lima',
  'Arequipa',
  'Cusco',
  'La Libertad',
  'Piura',
  'Lambayeque',
  'Junín',
  'Áncash',
  'Ica',
  'Cajamarca',
  'Tacna',
  'Otro',
];

export function AddressForm({ initial, onSaved, onCancel }: Props) {
  const t = useTranslations('account.address');
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<AddressInput>({
    id: initial?.id,
    alias: initial?.alias ?? '',
    destinatario: initial?.destinatario ?? '',
    telefono: initial?.telefono ?? '',
    pais: initial?.pais ?? 'PE',
    departamento: initial?.departamento ?? '',
    provincia: initial?.provincia ?? '',
    distrito: initial?.distrito ?? '',
    direccion: initial?.direccion ?? '',
    referencia: initial?.referencia ?? '',
    codigo_postal: initial?.codigo_postal ?? '',
    es_predeterminada: initial?.es_predeterminada ?? false,
  });

  function onChange<K extends keyof AddressInput>(k: K, v: AddressInput[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const res = await saveAddress(form);
      if (!res.ok) {
        setError(res.error ?? 'Error');
        return;
      }
      onSaved?.(res.id);
    });
  }

  const isPeru = form.pais === 'PE';

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-3">
        <Field
          label={t('alias')}
          value={form.alias ?? ''}
          onChange={(v) => onChange('alias', v)}
          placeholder={t('aliasPlaceholder')}
        />
        <SelectField
          label={t('country')}
          value={form.pais}
          onChange={(v) => onChange('pais', v)}
          options={[
            ['PE', 'Perú'],
            ['INT', t('international')],
          ]}
        />
      </div>
      <Field
        label={t('recipient')}
        value={form.destinatario}
        onChange={(v) => onChange('destinatario', v)}
        required
      />
      <Field
        label={t('phone')}
        value={form.telefono}
        onChange={(v) => onChange('telefono', v)}
        required
        type="tel"
      />
      {isPeru ? (
        <SelectField
          label={t('department')}
          value={form.departamento}
          onChange={(v) => onChange('departamento', v)}
          options={PE_DEPARTAMENTOS.map((x) => [x, x] as [string, string])}
          required
        />
      ) : (
        <Field
          label={t('region')}
          value={form.departamento}
          onChange={(v) => onChange('departamento', v)}
          required
        />
      )}
      <div className="grid grid-cols-2 gap-3">
        <Field
          label={t('province')}
          value={form.provincia ?? ''}
          onChange={(v) => onChange('provincia', v)}
        />
        <Field
          label={t('district')}
          value={form.distrito}
          onChange={(v) => onChange('distrito', v)}
          required
        />
      </div>
      <Field
        label={t('street')}
        value={form.direccion}
        onChange={(v) => onChange('direccion', v)}
        required
        placeholder="Av. ..."
      />
      <div className="grid grid-cols-2 gap-3">
        <Field
          label={t('reference')}
          value={form.referencia ?? ''}
          onChange={(v) => onChange('referencia', v)}
        />
        <Field
          label={t('postalCode')}
          value={form.codigo_postal ?? ''}
          onChange={(v) => onChange('codigo_postal', v)}
        />
      </div>
      <label className="mt-1 flex items-center gap-2 font-mono text-[10px] uppercase tracking-ritual text-silver">
        <input
          type="checkbox"
          checked={!!form.es_predeterminada}
          onChange={(e) => onChange('es_predeterminada', e.target.checked)}
          className="h-4 w-4 accent-fire"
        />
        {t('default')}
      </label>

      {error && (
        <p className="font-mono text-[10px] uppercase tracking-ritual text-error">
          {error}
        </p>
      )}

      <div className="mt-2 flex gap-2.5">
        <button
          type="submit"
          disabled={pending}
          className="flex-1 bg-fire px-4 py-3 font-body text-xs font-extrabold uppercase tracking-[.22em] text-on-fire disabled:opacity-60"
        >
          {pending ? t('saving') : t('save')}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="border border-border bg-card px-4 py-3 font-body text-xs font-bold uppercase tracking-ritual text-fg"
          >
            {t('cancel')}
          </button>
        )}
      </div>
    </form>
  );
}

type FieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
};
function Field({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  required,
}: FieldProps) {
  return (
    <label className="flex flex-col gap-1">
      <span className="font-mono text-[9px] uppercase tracking-ritual text-silver">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="h-11 border border-border bg-bg px-3 font-body text-[13px] text-fg placeholder:text-muted focus:border-fire focus:outline-none"
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: [string, string][];
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="font-mono text-[9px] uppercase tracking-ritual text-silver">
        {label}
      </span>
      <select
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 border border-border bg-bg px-3 font-body text-[13px] text-fg focus:border-fire focus:outline-none"
      >
        <option value="">—</option>
        {options.map(([v, l]) => (
          <option key={v} value={v}>
            {l}
          </option>
        ))}
      </select>
    </label>
  );
}
