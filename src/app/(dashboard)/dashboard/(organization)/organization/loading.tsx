import { Skeleton } from '~/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="relative flex h-screen w-full flex-col gap-5 pt-[100px]">
      <section className="flex flex-col gap-2">
        <Skeleton className="w-[150px] h-8" />
        <Skeleton className="w-full h-8" />

        <div className="w-full h-[0.5px] bg-primary/10" />

        <Skeleton className="w-[150px] h-8" />
        <Skeleton className="w-full h-8" />
      </section>
    </div>
  );
}
