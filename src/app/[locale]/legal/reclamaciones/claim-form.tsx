'use client';

import { useState, useTransition, type FormEvent, type ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { crearReclamacion, type ReclamacionInput } from '@/lib/reclamaciones-actions';
import { GrainOverlay } from '@/components/ui/grain-overlay';

type FormState = ReclamacionInput;

const EMPTY: FormState = {
  tipo: 'reclamo',
  nombres: '',
  apellidos: '',
  documento_tipo: 'DNI',
  documento_numero: '',
  email: '',
  telefono: '',
  departamento: '',
  distrito: '',
  direccion: '',
  bien_contratado: 'producto',
  monto_pen: null,
  descripcion: '',
  pedido_referencia: '',
};

export function ClaimForm() {
  const t = useTranslations('legal.claims');
  const [pending, startTransition] = useTransition();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  function set<K extends keyof FormState>(k: K, v: FormState[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const res = await crearReclamacion(form);
      if (!res.ok) {
        setError(t(`errors.${res.error}` as 'errors.invalid_name', {}) || res.error);
        return;
      }
      setSuccess(res.numero);
      setForm(EMPTY);
    });
  }

  if (success) {
    return (
      <div className="relative border border-fire bg-card p-6 text-white">
        <GrainOverlay />
        <div className="relative">
          <div className="mb-2 font-mono text-[10px] uppercase tracking-[.32em] text-fire">
            ✦ {t('success.eye')}
          </div>
          <h2 className="m-0 mb-3 font-goth text-3xl leading-tight">
            {t('success.title')}
          </h2>
          <p className="font-body text-sm text-white/85">
            {t('success.copy')}
          </p>
          <div className="mt-4 inline-block border border-border bg-bg px-3 py-2 font-mono text-[12px] uppercase tracking-ritual text-white">
            {t('success.number')}: {success}
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <Section title={t('section.tipo')}>
        <div className="flex gap-2">
          <RadioPill
            active={form.tipo === 'reclamo'}
            onClick={() => set('tipo', 'reclamo')}
            label={t('type.claim')}
            hint={t('type.claimHint')}
          />
          <RadioPill
            active={form.tipo === 'queja'}
            onClick={() => set('tipo', 'queja')}
            label={t('type.complaint')}
            hint={t('type.complaintHint')}
          />
        </div>
      </Section>

      <Section title={t('section.consumidor')}>
        <Grid2>
          <Field label={t('fields.name')} required value={form.nombres} onChange={(v) => set('nombres', v)} />
          <Field label={t('fields.lastName')} required value={form.apellidos} onChange={(v) => set('apellidos', v)} />
        </Grid2>
        <Grid2>
          <Select
            label={t('fields.docType')}
            value={form.documento_tipo ?? ''}
            onChange={(v) => set('documento_tipo', v as FormState['documento_tipo'])}
            options={[
              ['DNI', 'DNI'],
              ['CE', 'CE'],
              ['Pasaporte', 'Pasaporte'],
              ['RUC', 'RUC'],
            ]}
          />
          <Field label={t('fields.docNumber')} value={form.documento_numero ?? ''} onChange={(v) => set('documento_numero', v)} />
        </Grid2>
        <Field label={t('fields.email')} type="email" required value={form.email} onChange={(v) => set('email', v)} />
        <Field label={t('fields.phone')} type="tel" value={form.telefono ?? ''} onChange={(v) => set('telefono', v)} />
      </Section>

      <Section title={t('section.direccion')}>
        <Grid2>
          <Field label={t('fields.department')} value={form.departamento ?? ''} onChange={(v) => set('departamento', v)} />
          <Field label={t('fields.district')} value={form.distrito ?? ''} onChange={(v) => set('distrito', v)} />
        </Grid2>
        <Field label={t('fields.address')} value={form.direccion ?? ''} onChange={(v) => set('direccion', v)} />
      </Section>

      <Section title={t('section.bien')}>
        <div className="flex gap-2">
          <RadioPill
            active={form.bien_contratado === 'producto'}
            onClick={() => set('bien_contratado', 'producto')}
            label={t('good.product')}
          />
          <RadioPill
            active={form.bien_contratado === 'servicio'}
            onClick={() => set('bien_contratado', 'servicio')}
            label={t('good.service')}
          />
        </div>
        <Grid2>
          <Field label={t('fields.amount')} type="number" value={form.monto_pen?.toString() ?? ''} onChange={(v) => set('monto_pen', v === '' ? null : Number(v))} />
          <Field label={t('fields.orderRef')} value={form.pedido_referencia ?? ''} onChange={(v) => set('pedido_referencia', v)} placeholder="OX-260523-…" />
        </Grid2>
      </Section>

      <Section title={t('section.detalle')}>
        <TextArea
          label={t('fields.description')}
          required
          value={form.descripcion}
          onChange={(v) => set('descripcion', v)}
          placeholder={t('fields.descriptionPlaceholder')}
          rows={6}
        />
        <p className="font-mono text-[9px] uppercase tracking-[.22em] text-silver">
          {t('legalNote')}
        </p>
      </Section>

      {error && (
        <p className="font-mono text-[10px] uppercase tracking-ritual text-error">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-2 flex items-center justify-center bg-fire px-5 py-4 font-body text-xs font-extrabold uppercase tracking-[.22em] text-white disabled:opacity-60"
      >
        {pending ? t('submitting') : t('submit')}
      </button>
    </form>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset className="flex flex-col gap-3 border border-border bg-card p-4">
      <legend className="px-2 font-mono text-[10px] uppercase tracking-[.32em] text-silver">
        ✦ {title}
      </legend>
      {children}
    </fieldset>
  );
}

function Grid2({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">{children}</div>;
}

function RadioPill({
  active,
  onClick,
  label,
  hint,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  hint?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex-1 border px-3 py-3 text-left transition-colors"
      style={{
        background: active ? '#1E1E1E' : 'transparent',
        borderColor: active ? '#B81414' : '#2A2A2A',
        color: '#FFFFFF',
      }}
    >
      <div className="font-body text-[13px] font-bold uppercase tracking-wide">
        {label}
      </div>
      {hint && (
        <div className="mt-0.5 font-mono text-[9px] uppercase tracking-ritual text-muted">
          {hint}
        </div>
      )}
    </button>
  );
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  required,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="font-mono text-[9px] uppercase tracking-ritual text-silver">
        {label}
        {required && <span className="ml-1 text-fire">*</span>}
      </span>
      <input
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 border border-border bg-bg px-3 font-body text-[13px] text-white placeholder:text-muted focus:border-fire focus:outline-none"
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  required,
  placeholder,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="font-mono text-[9px] uppercase tracking-ritual text-silver">
        {label}
        {required && <span className="ml-1 text-fire">*</span>}
      </span>
      <textarea
        value={value}
        required={required}
        placeholder={placeholder}
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
        className="border border-border bg-bg px-3 py-2.5 font-body text-[13px] text-white placeholder:text-muted focus:border-fire focus:outline-none"
      />
    </label>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: [string, string][];
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="font-mono text-[9px] uppercase tracking-ritual text-silver">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 border border-border bg-bg px-3 font-body text-[13px] text-white focus:border-fire focus:outline-none"
      >
        {options.map(([v, l]) => (
          <option key={v} value={v}>
            {l}
          </option>
        ))}
      </select>
    </label>
  );
}
