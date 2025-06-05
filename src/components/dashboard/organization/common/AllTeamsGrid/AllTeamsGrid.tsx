'use client';

import type React from 'react';
import { api } from '~/trpc/react';

// components
import { TeamCard } from '~/components/dashboard/organization/common';
import { Skeleton } from '~/components/ui/skeleton';
import { authClient } from '~/lib/auth-client';

export const AllTeamsGrid: React.FC = () => {
  const { data: allTeamsInOrgData, isLoading } =
    api.team.getAllTeamsInOrg.useQuery();
  const { isPending } = authClient.useSession();

  return (
    <>
      {isLoading || isPending ? (
        <div className="grid grid-cols-3 gap-3">
          <Skeleton className="w-full h-16 rounded-lg" />
          <Skeleton className="w-full h-16 rounded-lg" />
          <Skeleton className="w-full h-16 rounded-lg" />
          <Skeleton className="w-full h-16 rounded-lg" />
        </div>
      ) : (
        <>
          {allTeamsInOrgData?.data && allTeamsInOrgData.data.length > 0 ? (
            <div className="grid grid-cols-3 gap-3">
              {allTeamsInOrgData.data.map((teamsData) => (
                <TeamCard key={teamsData.id} teamsData={teamsData} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col justify-center text-center p-8 h-[200px] rounded-lg bg-secondary items-center ">
              <p className="text-sm font-medium">No Teams Found</p>
              <p className="text-xs text-primary/70">
                You have no teams under your organization.
              </p>
            </div>
          )}
        </>
      )}
    </>
  );
};
