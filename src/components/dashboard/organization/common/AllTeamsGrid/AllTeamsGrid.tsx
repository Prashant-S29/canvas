'use client';

import type React from 'react';
import { api } from '~/trpc/react';

// components
import { TeamCard } from '~/components/dashboard/organization/common';
import { Skeleton } from '~/components/ui/skeleton';

export const AllTeamsGrid: React.FC = () => {
  const { data: allTeamsData, isLoading } = api.team.getAllTeams.useQuery();

  return (
    <>
      {isLoading ? (
        <div className="grid grid-cols-3 gap-3">
          <Skeleton className="w-full h-16 rounded-lg" />
          <Skeleton className="w-full h-16 rounded-lg" />
          <Skeleton className="w-full h-16 rounded-lg" />
          <Skeleton className="w-full h-16 rounded-lg" />
        </div>
      ) : (
        <>
          {allTeamsData?.data && allTeamsData.data.length > 0 ? (
            <div className="grid grid-cols-3 gap-3">
              {allTeamsData.data.map((teamsData) => (
                <TeamCard key={teamsData.id} teamsData={teamsData} />
              ))}
            </div>
          ) : (
            <p>no teams </p>
          )}
        </>
      )}
    </>
  );
};
