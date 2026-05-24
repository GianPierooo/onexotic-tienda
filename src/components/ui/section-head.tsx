import type { ReactNode } from 'react';
import { Link } from '@/lib/i18n/routing';

type Props = {
  eyebrow: string;
  title: ReactNode;
  link?: { href: string; label: string };
};

export function SectionHead({ eyebrow, title, link }: Props) {
  return (
    <div className="px-5 pb-3.5 pt-8">
      <div className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-ritual text-silver">
        <span className="block h-px w-3.5 bg-fire" />
        {eyebrow}
      </div>
      <div className="flex items-end justify-between gap-3">
        <h2 className="m-0 font-goth text-[42px] font-normal leading-[0.9]">
          {title}
        </h2>
        {link && (
          <Link
            href={link.href}
            className="border-b border-fire pb-0.5 font-mono text-[10px] uppercase tracking-ritual text-white"
          >
            {link.label} →
          </Link>
        )}
      </div>
    </div>
  );
}
