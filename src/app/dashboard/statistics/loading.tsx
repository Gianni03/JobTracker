import { Skeleton } from '@/components/ui/skeleton';

export default function StatisticsLoading() {
  return (
    <div className="space-y-10 pb-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-9 w-80 max-w-full" />
          <Skeleton className="h-4 w-72 max-w-full" />
        </div>
        <Skeleton className="h-9 w-64" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-32 w-full rounded-[2rem]" />
        ))}
      </div>

      <Skeleton className="h-80 w-full rounded-[2.5rem]" />

      <div className="grid gap-8 lg:grid-cols-2">
        <Skeleton className="h-72 w-full rounded-[2.5rem]" />
        <Skeleton className="h-72 w-full rounded-[2.5rem]" />
      </div>
    </div>
  );
}
