import { ProductGridSkeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <>
      <header className="border-b border-border bg-bg/92 backdrop-blur-md">
        <div className="px-4 pb-3.5 pt-3">
          <div className="mb-1.5 h-2 w-24 animate-pulse-fire bg-card-alt" />
          <div className="mt-2 h-12 w-48 animate-pulse-fire bg-card-alt" />
        </div>
      </header>
      <ProductGridSkeleton count={8} />
    </>
  );
}
