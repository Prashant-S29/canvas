import Link from 'next/link';
import type React from 'react';

// icons
import { LeftArrowIcon } from 'public/icons';

// components
import { ThemeToggler } from '~/components/common';
import { Button } from '~/components/ui/button';

export const NoHeader: React.FC = () => {
  return (
    <header className="fixed top-0 z-50 flex w-full items-center justify-between px-[150px] py-4">
      <Button asChild variant="ghost" size="sm">
        <Link href="/" className="font-normal">
          <LeftArrowIcon />
          Back to Home
        </Link>
      </Button>

      <section className="flex items-center gap-2">
        <ThemeToggler />
        <div className="mx-3 h-4 w-[0.5px] bg-primary/50" />

        <Link href="/" className="text-sm text-primary/70  leading-none">
          support@canvas.com
        </Link>
      </section>
    </header>
  );
};
