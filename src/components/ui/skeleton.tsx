import { cn } from '@/lib/utils';

export function Skeleton({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div
      aria-hidden
      className={cn(
        'animate-pulse-fire border border-border bg-card-alt',
        className
      )}
      style={style}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col border border-border bg-card">
      <Skeleton className="border-0" style={{ aspectRatio: '4 / 5' }} />
      <div className="flex flex-col gap-2 px-3 pb-3.5 pt-3">
        <div className="flex items-baseline justify-between gap-2">
          <Skeleton className="h-3 w-3/5 border-0" />
          <Skeleton className="h-3 w-12 border-0" />
        </div>
        <Skeleton className="h-2 w-1/3 border-0" />
        <div className="flex gap-1.5">
          {[0, 1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-2 w-4 border-0" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="mx-auto grid w-full max-w-screen-xl grid-cols-2 gap-3 px-4 py-3.5 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="mx-auto w-full max-w-[480px]">
      <Skeleton className="border-0" style={{ aspectRatio: '4 / 5' }} />
      <section className="px-5 pb-4 pt-6">
        <Skeleton className="mb-3 h-3 w-1/3 border-0" />
        <Skeleton className="mb-2 h-12 w-4/5 border-0" />
        <div className="mt-3 flex justify-between">
          <Skeleton className="h-3 w-1/4 border-0" />
          <Skeleton className="h-8 w-24 border-0" />
        </div>
      </section>
      <div className="mx-5 mb-5">
        <Skeleton className="h-12 w-full border-0" />
      </div>
      <section className="px-5 pb-5">
        <Skeleton className="mb-3 h-3 w-1/4 border-0" />
        <div className="grid grid-cols-4 gap-2">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-[74px] border-0" />
          ))}
        </div>
      </section>
    </div>
  );
}

export function CartSkeleton() {
  return (
    <>
      <header className="border-b border-border px-4 py-5">
        <Skeleton className="mb-3 h-3 w-1/3 border-0" />
        <Skeleton className="h-12 w-2/3 border-0" />
      </header>
      <section className="mx-4 mt-3.5">
        <Skeleton className="h-24 w-full border-0" />
      </section>
      <section className="mx-4 mt-4">
        {[0, 1].map((i) => (
          <Skeleton key={i} className="mb-2 h-[120px] w-full border-0" />
        ))}
      </section>
      <section className="mx-4 mt-3.5">
        <Skeleton className="h-32 w-full border-0" />
      </section>
    </>
  );
}
