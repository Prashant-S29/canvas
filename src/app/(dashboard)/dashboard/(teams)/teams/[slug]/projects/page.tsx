import type React from 'react';
import { checkAuth, generateSeo } from '~/utils';

export const generateMetadata = () =>
  generateSeo({
    title: 'Projects',
    description: 'Projects',
    url: 'https://canvas.com/settings',
  });

const Projects: React.FC = async () => {
  await checkAuth({
    redirectTo: '/signup',
    role: ['TEAM_ADMIN', 'TEAM_MEMBER', 'ORG_ADMIN'],
  });

  return (
    <div className="relative flex h-screen w-full pt-[100px]">
      <h1 className="text-xl font-semibold">Projects</h1>
    </div>
  );
};

export default Projects;
