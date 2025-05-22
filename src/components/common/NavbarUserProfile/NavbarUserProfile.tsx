'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

// public
import { LogoutIcon } from 'public/icons';

import { authClient } from '~/lib/auth-client';

import { Button } from '~/components/ui/button';
// components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { Skeleton } from '~/components/ui/skeleton';

export const NavbarUserProfile: React.FC = () => {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  const [loading, setLoading] = React.useState(false);
  const handleSignOut = async () => {
    setLoading(true);
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          console.log('sign out success');
          router.refresh();
        },
      },
    });
    setLoading(false);
  };

  return (
    <>
      {isPending ? (
        <Skeleton className="w-[200px] h-9" />
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="px-2">
              <p className="flex h-6 items-center justify-center rounded-sm bg-primary px-2 text-xs font-medium uppercase text-primary-foreground">
                {session?.user.name
                  ? session?.user.name?.split(' ')[0]?.charAt(0)
                  : session?.user.name?.split(' ')[0]?.charAt(0)}
              </p>
              <p className="text-sm font-medium line-clamp-1 text-ellipsis">
                {session?.user.name?.split(' ')[0]}&apos;s Workspace
              </p>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-sidebar">
            <DropdownMenuLabel asChild>
              <section>
                <p className="text-sm font-semibold">{session?.user.name}</p>
                <p className="text-xs font-normal">{session?.user.email}</p>
              </section>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled={loading} onClick={handleSignOut}>
              <LogoutIcon />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
};
