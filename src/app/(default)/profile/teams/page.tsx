import type React from 'react';
import { UserParticipatedTeams } from '~/components/common';

const Teams: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full pb-5 px-[200px] pt-[100px]">
      <h1 className="text-xl font-semibold text-primary">All Teams</h1>

      <div className="mt-5">
        <UserParticipatedTeams />
      </div>
    </div>
  );
};

export default Teams;
