import type React from 'react';

// utils
import { generateSeo } from '~/utils';

// components
import { OnboardingForm } from '~/components/form/onboarding';

export const generateMetadata = () =>
  generateSeo({
    title: 'Onboarding',
    description: 'Onboarding page',
    url: 'https://canvas.com/onboarding',
  });

const Onboarding: React.FC = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center">
      <OnboardingForm state="onboarding" />
    </div>
  );
};

export default Onboarding;
