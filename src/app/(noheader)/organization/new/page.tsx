import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import type React from 'react';

import { auth } from '~/lib/auth';
// utils
import { generateSeo } from '~/utils';

// components
import { CreateNewOrgFrom } from '~/components/form/organization';

export const generateMetadata = () =>
  generateSeo({
    title: 'Create New Organization',
    description: 'Organization Onboarding page',
    url: 'https://canvas.com/organization/new',
  });

const CreateNewOrganization: React.FC = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.session.orgSlug) {
    redirect('/dashboard');
  }
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center">
      <CreateNewOrgFrom />
    </div>
  );
};

export default CreateNewOrganization;
