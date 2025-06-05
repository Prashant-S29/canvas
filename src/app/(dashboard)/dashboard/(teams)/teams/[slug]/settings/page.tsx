import type React from 'react';
import { TeamSetting } from '~/components/dashboard/team/feature';

// utils
import { checkAuth } from '~/utils';

interface Params {
  params: Promise<{ slug: string }>;
}

const TeamSettingPage: React.FC<Params> = async ({ params }) => {
  await checkAuth({
    redirectTo: '/signup',
    role: ['ORG_ADMIN', 'TEAM_ADMIN', 'TEAM_MEMBER'],
  });

  const slug = (await params).slug;

  // const params = useParams<{ slug: string }>();

  return (
    <div className="relative min-h-screen w-full pb-5 pt-[100px]">
      <section>
        <h1 className="text-xl font-semibold text-primary">Team Settings</h1>
      </section>

      <div className="mt-5 space-y-6">
        <TeamSetting slug={slug} />
      </div>
    </div>
  );
};

export default TeamSettingPage;
