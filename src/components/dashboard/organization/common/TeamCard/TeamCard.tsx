import type React from 'react';

// types
import Link from 'next/link';
import type { TeamSelectSchemaType } from '~/server/db/schema/team';

interface TeamCardProps {
  teamsData: TeamSelectSchemaType;
}

export const TeamCard: React.FC<TeamCardProps> = ({ teamsData }) => {
  return (
    <div>
      <Link href={`/dashboard/teams/${teamsData.slug}`}>
        <div className="flex cursor-pointer flex-col gap-5 rounded-xl bg-secondary p-3 duration-300 hover:bg-secondary/80">
          <div className="flex items-center gap-2">
            <div className="flex aspect-square h-7 items-center justify-center rounded-sm bg-primary px-2 text-xs font-medium uppercase text-primary-foreground">
              <p>{teamsData.slug.split('-')[0]?.charAt(0)}</p>
            </div>
            <h1 className="line-clamp-1 text-sm font-medium">
              {teamsData.name}
            </h1>
          </div>

          {/* <div className="h-[200px] w-full rounded-lg bg-background" /> */}

          <ul>
            <li className="flex items-center justify-between gap-2">
              <p className="text-xs text-primary/50">Total Project</p>
              <p className="text-xs text-primary/50">0</p>
            </li>
            {/* <li className="flex items-center justify-between gap-2">
          <p className="text-xs text-primary/50">Admin</p>
          <p className="text-xs text-primary/50">
            {teamsData.adminInvitationStatus === "Pending"
              ? "invitation pending"
              : teamsData.adminEmail}
          </p>
        </li> */}
          </ul>
        </div>
      </Link>
    </div>
  );
};
