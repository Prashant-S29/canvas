'use client';

import Link from 'next/link';
import type React from 'react';

import { usePathname } from 'next/navigation';
import { Button } from '~/components/ui/button';
// data
import { SideMenuItems } from './data';
// import { NavbarUserProfile } from "~/components/dashboard/common";

export const TeamsDashboardSideMenu: React.FC = () => {
  const pathName = usePathname();

  return (
    <div className="sticky top-0 flex h-screen flex-col justify-between gap-2 pb-5 pt-[100px]">
      <div className="flex flex-col gap-2">
        {SideMenuItems.map((data) => (
          <Button
            key={data.href}
            variant={pathName === data.href ? 'secondary' : 'ghost'}
            asChild
            className="h-10 w-[200px] justify-start text-left text-[13px]"
          >
            <Link href={`${pathName}/${data.href}`}>
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

      {/* <UserProfile /> */}
      {/* <div>
      <NavbarUserProfile />

      </div> */}

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
