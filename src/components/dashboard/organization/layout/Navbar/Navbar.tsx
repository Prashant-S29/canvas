'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import type React from 'react';

// utils
import { slugToString } from '~/utils/slugHandler';

// components
import { NavbarUserProfile, ThemeToggler } from '~/components/common';

export const Navbar: React.FC = () => {
  const params = useParams<{ slug: string }>();

  return (
    <header className="fixed top-0 z-50 flex h-[100px] w-full items-center justify-between px-[200px]">
      <section className="flex items-center gap-[30px]">
        <Link href="/" className="flex items-center gap-2 text-sm font-medium">
          <svg
            width="30"
            height="30"
            viewBox="0 0 430 430"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>logo</title>
            <path
              d="M215 215C698.75 215 215 698.75 215 215C215 698.75 -268.75 215 215 215C-268.75 215 215 -268.75 215 215C215 -268.75 698.75 215 215 215Z"
              fill="var(--stroke-color)"
            />
          </svg>
          Canvas
        </Link>

        {/* {isPending ? (
          <Skeleton className="w-[250px] rounded-lg h-12" />
        ) : (
          <>
            {session?.session.orgSlug && (
              <Button variant="ghost" className="px-2">
                <p className="flex h-6 items-center justify-center rounded-sm bg-primary px-2 text-xs font-medium uppercase text-primary-foreground">
                  {slugToString(session?.session.orgSlug)
                    ? slugToString(session?.session.orgSlug)
                        ?.split(" ")[0]
                        ?.charAt(0)
                    : slugToString(session?.session.orgSlug)
                        ?.split(" ")[0]
                        ?.charAt(0)}
                </p>
                <p className="text-sm font-medium line-clamp-1 text-ellipsis">
                  {slugToString(session?.session.orgSlug)?.split(" ")[0]}&apos;s
                  Workspace
                </p>
              </Button>
            )}
          </>
        )} */}

        {params.slug && (
          <div className="flex items-center gap-[30px]">
            <div className="h-3 w-[1px] bg-primary/70" />

            <div className="flex cursor-pointer items-center gap-2 rounded-lg p-2 hover:bg-secondary">
              <div className="flex h-6 items-center justify-center rounded-sm bg-primary px-2 text-xs font-medium uppercase text-primary-foreground">
                {params.slug?.split(' ')[0]?.charAt(0)}
              </div>
              <p className="text-xs font-medium">
                {slugToString(params.slug.split(' ')[0] ?? '')}
              </p>
            </div>
          </div>
        )}
      </section>
      <section className="flex items-center gap-2">
        <ThemeToggler />
        <div className="mx-3 h-4 w-[0.5px] bg-primary/50" />
        <NavbarUserProfile />
      </section>
    </header>
  );
};
