import { headers } from 'next/headers';
import type React from 'react';

import { auth } from '~/lib/auth';

// utils
import { checkAuth, generateSeo } from '~/utils';
import { slugToString } from '~/utils/slugHandler';

// icons
import { AddIcon } from 'public/icons';

// components
import { AllTeamsGrid } from '~/components/dashboard/organization/common';
import { TeamFomDialog } from '~/components/form/team';
import { Button } from '~/components/ui/button';

export const generateMetadata = () =>
  generateSeo({
    title: 'Teams',
    description: 'All Teams',
    url: 'https://canvas.com/teams',
  });

const Teams: React.FC = async () => {
  await checkAuth({
    redirectTo: '/signup',
    role: 'ORG_ADMIN',
    isOrgDashboard: true,
  });

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="relative min-h-screen w-full pb-5 pt-[100px]">
      <section className="sticky top-0 -mt-4 flex items-center justify-between bg-background py-4">
        <section>
          <h1 className="text-xl font-semibold">Teams</h1>
          <p className="text-sm text-primary/50">
            These are all the team you have at{' '}
            <span className="font-medium">
              {slugToString(session?.session.orgSlug ?? '')}
            </span>
            .
          </p>
        </section>

        <TeamFomDialog
          state="create"
          trigger={
            <Button size="smaller" variant="default">
              <AddIcon /> Create New Team
            </Button>
          }
        />
      </section>

      <AllTeamsGrid />
    </div>
  );
};

export default Teams;
