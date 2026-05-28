'use client';

import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Item = {
  id: string;
  question: string;
  answer: ReactNode;
};

export function Accordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null);
  return (
    <div className="border border-border bg-card">
      {items.map((it, i) => {
        const isOpen = open === it.id;
        return (
          <div
            key={it.id}
            style={{
              borderBottom:
                i === items.length - 1 ? 'none' : '1px solid var(--color-border)',
            }}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : it.id)}
              aria-expanded={isOpen}
              aria-controls={`acc-${it.id}`}
              className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left"
            >
              <span className="font-body text-[14px] font-bold uppercase tracking-wide text-fg">
                {it.question}
              </span>
              <span
                aria-hidden
                className="font-mono text-[18px] text-fire transition-transform"
                style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0)' }}
              >
                +
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`acc-${it.id}`}
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-border px-4 py-4 font-body text-[13px] leading-relaxed text-fg/85">
                    {it.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
