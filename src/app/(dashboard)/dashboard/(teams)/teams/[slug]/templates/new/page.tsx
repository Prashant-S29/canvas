import { headers } from 'next/headers';
import type React from 'react';
import { auth } from '~/lib/auth';
import { checkAuth, generateSeo, slugToString } from '~/utils';
import { Test } from './text';

export const generateMetadata = () =>
  generateSeo({
    title: 'New Template',
    description: 'Create a new template',
    url: 'https://canvas.com',
  });

const Projects: React.FC = async () => {
  await checkAuth({
    redirectTo: '/signup',
    role: ['TEAM_ADMIN', 'TEAM_MEMBER', 'ORG_ADMIN'],
  });

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="relative min-h-screen w-full pb-5 pt-[100px]">
      <section className="sticky top-0 -mt-4 flex items-center justify-between bg-background py-4">
        <section>
          <h1 className="text-xl font-semibold">Add New Templates</h1>
          <p className="text-sm text-primary/50">
            These are all the templates you have at{' '}
            <span className="font-medium">
              {slugToString(session?.session.teamSlug ?? '')}
            </span>
            .
          </p>
        </section>
      </section>

      <Test />
    </div>
  );
};

export default Projects;
