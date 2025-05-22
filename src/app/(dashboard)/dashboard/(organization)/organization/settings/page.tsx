import type React from 'react';
import { generateSeo } from '~/utils';

export const generateMetadata = () =>
  generateSeo({
    title: 'Settings',
    description: 'Settings',
    url: 'https://canvas.com/settings',
  });

const Settings: React.FC = async () => {
  return (
    <div className="relative flex h-screen w-full pt-[100px]">
      <h1 className="text-xl font-semibold">Settings</h1>
    </div>
  );
};

export default Settings;
