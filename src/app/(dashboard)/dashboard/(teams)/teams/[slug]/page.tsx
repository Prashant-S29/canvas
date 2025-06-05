import type React from 'react';

// components
import { api } from '~/trpc/server';
import { checkAuth } from '~/utils';

interface Params {
  params: Promise<{ slug: string }>;
}

const TeamPage: React.FC<Params> = async ({ params }) => {
  await checkAuth({
    redirectTo: '/signup',
    role: ['TEAM_ADMIN', 'TEAM_MEMBER', 'ORG_ADMIN'],
    // isOrgDashboard: true,
  });

  const slug = (await params).slug;
  const { data: teamData } = await api.team.getTeamBySlug({ teamSlug: slug });

  if (!teamData?.name) {
    return <div>Team not found</div>;
  }

  return (
    <div className="relative min-h-screen w-full pb-5 pt-[100px]">
      <section>
        <h1 className="text-xl font-semibold text-primary">{teamData.name}</h1>
        <p className="text-sm text-primary/70">{teamData.description}</p>

        {}
      </section>
    </div>
  );
};

export default TeamPage;
