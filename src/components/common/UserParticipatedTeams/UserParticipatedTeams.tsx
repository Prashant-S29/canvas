'use client';

import Link from 'next/link';
import type React from 'react';
import { Skeleton } from '~/components/ui/skeleton';
import { authClient } from '~/lib/auth-client';
import { api } from '~/trpc/react';
import { slugToString } from '~/utils';

export const UserParticipatedTeams: React.FC = () => {
  const { data: session, isPending } = authClient.useSession();

  const { data: userTeams, isLoading } =
    api.team.getUserParticipatedTeams.useQuery({
      userMail: session?.user.email ?? '',
    });

  return (
    <>
      {isPending || isLoading ? (
        <div className="flex gap-2">
          <Skeleton className="w-[200px] h-10" />
          <Skeleton className="w-[200px] h-10" />
          <Skeleton className="w-[200px] h-10" />
        </div>
      ) : (
        <>
          {userTeams?.data && userTeams.data.length > 0 ? (
            <div className="grid grid-cols-3 gap-3">
              {userTeams.data.map((team) => (
                <div key={team.id}>
                  <Link href={`/dashboard/teams/${team.teamSlug}`}>
                    <div className="flex cursor-pointer flex-col gap-5 relative z-10 rounded-xl bg-secondary p-3 duration-300 hover:bg-secondary/80">
                      <div className="flex items-center gap-2">
                        <div className="flex aspect-square h-7 items-center justify-center rounded-sm bg-primary px-2 text-xs font-medium uppercase text-primary-foreground">
                          <p>{team.teamSlug.split('-')[0]?.charAt(0)}</p>
                        </div>
                        <h1 className="line-clamp-1 text-sm font-medium">
                          {slugToString(team.teamSlug)}
                        </h1>
                      </div>
                      <div className="flex flex-col gap-3">
                        <section>
                          <p className="flex items-center justify-between gap-2">
                            <span className="text-xs text-primary/50">
                              Total Project
                            </span>
                            <span className="text-xs text-primary/50">0</span>
                          </p>
                          <p className="flex items-center mt-1 justify-between gap-2">
                            <span className="text-xs text-primary/50">
                              Total Members
                            </span>
                            <span className="text-xs text-primary/50">05</span>
                          </p>
                          {/* <p className="flex items-center mt-1 justify-between gap-2">
                            <span className="text-xs text-primary/50">
                              Your Role
                            </span>
                            <span className="text-xs text-primary/50">
                              {formatRole(team.role)}
                            </span>
                          </p> */}
                        </section>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p>no Teams....</p>
          )}
        </>
      )}
    </>
  );
};
