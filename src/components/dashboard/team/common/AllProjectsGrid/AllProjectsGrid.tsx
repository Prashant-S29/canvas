'use client';

import type React from 'react';
import { authClient } from '~/lib/auth-client';
import { api } from '~/trpc/react';

// components
import { Skeleton } from '~/components/ui/skeleton';
import { ProjectCard } from '../ProjectCard';

export const AllProjectsGrid: React.FC = () => {
  const { data: allProjectsInOrgData, isLoading } =
    api.project.getAllProjectInTeam.useQuery();
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
          {/* {JSON.stringify(data)} */}

          {allProjectsInOrgData?.data &&
          allProjectsInOrgData.data.length > 0 ? (
            <div className="grid grid-cols-3 gap-3">
              {allProjectsInOrgData.data.map((projectData) => (
                <ProjectCard key={projectData.id} projectData={projectData} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col justify-center text-center p-8 h-[200px] rounded-lg bg-secondary items-center ">
              <p className="text-sm font-medium">No Projects Found</p>
              <p className="text-xs text-primary/70">
                You have no project under your team.
              </p>
            </div>
          )}
        </>
      )}
    </>
  );
};
