import type React from 'react';

// utils
import { generateSeo } from '~/utils';

// components
import { OnboardingForm } from '~/components/form/onboarding';

export const generateMetadata = () =>
  generateSeo({
    title: 'Join a Team',
    description: 'Join a Team',
    url: 'https://canvas.com/teams/join',
  });

const JoinTeam: React.FC = () => {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center">
      <OnboardingForm state="join" />
    </div>
  );
};

export default JoinTeam;
