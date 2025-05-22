import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import type React from 'react';

import { auth } from '~/lib/auth';

// utils
import { generateSeo } from '~/utils';
import { slugToString } from '~/utils/slugHandler';

// icons
import { AddIcon } from 'public/icons';

import { AllTeamsGrid } from '~/components/dashboard/organization/common';
import { TeamFomDialog } from '~/components/form/team';
// components
import { Button } from '~/components/ui/button';

export const generateMetadata = () =>
  generateSeo({
    title: 'Teams',
    description: 'All Teams',
    url: 'https://canvas.com/teams',
  });

const Teams: React.FC = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.session.orgSlug) {
    redirect('/');
  }

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
            <Button size="sm" variant="default">
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
