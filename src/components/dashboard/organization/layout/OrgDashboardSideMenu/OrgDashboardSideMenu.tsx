'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type React from 'react';

// data
import { SideMenuItems } from './data';

// components
import { Button } from '~/components/ui/button';

export const OrgDashboardSideMenu: React.FC = () => {
  const pathName = usePathname();

  return (
    <div className="sticky top-0 flex h-screen   flex-col justify-between gap-2 pb-5 pt-[100px]">
      <div className="flex flex-col gap-2">
        {SideMenuItems.map((data) => (
          <Button
            key={data.label}
            variant={pathName === data.href ? 'secondary' : 'ghost'}
            asChild
            className="h-10 w-[200px] justify-start text-left text-[13px]"
          >
            <Link href={data.href}>
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
    </div>
  );
};
