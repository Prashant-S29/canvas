'use client';

import Link from 'next/link';
import type React from 'react';

// components
import { ThemeToggler } from '~/components/common';
import { Button } from '~/components/ui/button';

// icons
import { SocialIcons } from 'public/icons';
import { NavbarUserProfile } from '~/components/common';
import { Skeleton } from '~/components/ui/skeleton';
import { useMounted } from '~/hooks';
import { authClient } from '~/lib/auth-client';

export const Header: React.FC = () => {
  const { data: session, isPending } = authClient.useSession();

  const mounted = useMounted();

  if (!mounted) return null;

  return (
    <header className="fixed top-0 z-50 flex w-full items-center justify-between px-[200px] py-4">
      <Link href="/" className="flex items-center gap-2 text-sm font-medium">
        <svg
          width="30"
          height="30"
          viewBox="0 0 430 430"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Canvas</title>
          <path
            d="M215 215C698.75 215 215 698.75 215 215C215 698.75 -268.75 215 215 215C-268.75 215 215 -268.75 215 215C215 -268.75 698.75 215 215 215Z"
            fill="var(--stroke-color)"
          />
        </svg>
        Canvas
      </Link>

      <section className="flex items-center gap-2">
        <ThemeToggler />
        <Button size="icon" variant="ghost" className="gap-1">
          <SocialIcons.GitHubIcon />
        </Button>
        <div className="mx-3 h-3 w-[0.5px] bg-primary/50" />

        {isPending ? (
          <Skeleton className="h-9 w-[150px] rounded-sm" />
        ) : (
          <>
            {session?.user?.id ? (
              <NavbarUserProfile />
            ) : (
              <Button size="sm" variant="default" asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            )}
          </>
        )}
      </section>
    </header>
  );
};
