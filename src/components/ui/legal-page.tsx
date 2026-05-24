import type { ReactNode } from 'react';

type Props = {
  eyebrow: string;
  title: string;
  intro?: string;
  updated?: string;
  children: ReactNode;
};

export function LegalPage({ eyebrow, title, intro, updated, children }: Props) {
  return (
    <article className="mx-auto max-w-2xl px-5 py-10">
      <header className="mb-8">
        <div className="mb-1.5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.32em] text-silver">
          <span className="block h-px w-3.5 bg-fire" />
          {eyebrow}
        </div>
        <h1 className="m-0 font-black font-normal leading-[0.9] text-white text-[44px] md:text-[60px]">
          {title}
        </h1>
        {intro && (
          <p className="mt-3 font-body text-sm leading-relaxed text-white/80">
            {intro}
          </p>
        )}
        {updated && (
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[.22em] text-muted">
            {updated}
          </p>
        )}
      </header>
      <div className="flex flex-col gap-6">{children}</div>
    </article>
  );
}

export function LegalSection({
  no,
  title,
  children,
}: {
  no: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border-l-2 border-fire bg-card/60 px-4 py-4">
      <div className="mb-1 flex items-baseline gap-3">
        <span className="font-goth text-2xl leading-none text-silver">{no}</span>
        <h2 className="m-0 font-body text-base font-extrabold uppercase tracking-wide text-white">
          {title}
        </h2>
      </div>
      <div className="mt-2 flex flex-col gap-2.5 font-body text-[13px] leading-relaxed text-white/85">
        {children}
      </div>
    </section>
  );
}
