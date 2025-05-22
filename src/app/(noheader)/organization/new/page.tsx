import type React from 'react';

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

const CreateNewOrganization: React.FC = () => {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center">
      <CreateNewOrgFrom state="new" />
    </div>
  );
};

export default CreateNewOrganization;
