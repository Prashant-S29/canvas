'use client';

import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import type React from 'react';

// data
import { SideMenuItems } from './data';

// components
import { Button } from '~/components/ui/button';

export const TeamsDashboardSideMenu: React.FC = () => {
  const pathName = usePathname();
  const params = useParams<{ slug: string }>();

  return (
    <div className="sticky top-0 flex h-screen flex-col justify-between gap-2 pb-5 pt-[100px]">
      <div className="flex flex-col gap-2">
        {SideMenuItems.map((data) => (
          <Button
            key={data.href}
            variant={
              (data.href
                ? `/dashboard/teams/${params.slug}/${data.href}`
                : `/dashboard/teams/${params.slug}`) === pathName
                ? 'secondary'
                : 'ghost'
            }
            asChild
            className="h-10 w-[200px] justify-start text-left text-[13px]"
          >
            <Link href={`/dashboard/teams/${params.slug}/${data.href}`}>
              {pathName === data.href ? (
                <data.icon_filled />
              ) : (
                <data.icon_outline />
              )}
              <span>{data.label}</span>
            </Link>
          </Button>
        ))}
      </div>

      <div>
        <Button
          variant="ghost"
          className="h-10 justify-start text-left text-[13px]"
        >
          kooo
        </Button>
      </div>
    </div>
  );
};
