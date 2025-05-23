import { LoadingIcon } from 'public/icons';

export default function Loading() {
  return (
    <div className="relative flex h-screen w-full flex-col justify-center items-center">
      <LoadingIcon className="w-8 h-8 animate-spin text-primary/70" />
    </div>
  );
}
