import type React from 'react';

// components
import { ContinueWithGitHub } from '~/components/auth';
import { generateSeo } from '~/utils';

export const generateMetadata = () =>
  generateSeo({
    title: 'Sign Up',
    description: 'Sign Up to Canvas - A fully managed certificate generator',
    url: '/signup',
  });

const SignUp: React.FC = () => {
  return (
    <div className="relative flex h-screen w-full items-center    justify-center">
      <section className="flex flex-col gap-3 items-center">
        <svg
          width="30"
          height="30"
          viewBox="0 0 430 430"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>logo</title>
          <path
            d="M215 215C698.75 215 215 698.75 215 215C215 698.75 -268.75 215 215 215C-268.75 215 215 -268.75 215 215C215 -268.75 698.75 215 215 215Z"
            fill="var(--stroke-color)"
          />
        </svg>
        <section>
          <h2 className="mt-1 text-center text-base font-medium">
            Welcome to Canvas
          </h2>
          <p className="text-center text-sm text-primary/50">
            Sign up to get started
          </p>
        </section>
        <ContinueWithGitHub />
      </section>
    </div>
  );
};

export default SignUp;
