import { headers } from 'next/headers';
import Image from 'next/image';
import type React from 'react';

import { auth } from '~/lib/auth';

// utils
import { checkAuth, generateSeo } from '~/utils';

// components
import { Button } from '~/components/ui/button';

export const generateMetadata = () =>
  generateSeo({
    title: 'Account',
    description: 'Account',
    url: 'https://canvas.com/account',
  });

const Account: React.FC = async () => {
  await checkAuth({
    redirectTo: '/login',
    role: 'ORG_ADMIN',
    isOrgDashboard: true,
  });

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="relative flex h-screen w-full flex-col gap-5 pt-[100px]">
      <section>
        <h1 className="text-xl font-semibold">Account</h1>
        <p className="text-sm text-primary/70">
          Manage your account information
        </p>

        <h3 className="mt-5 text-base font-medium">Profile</h3>
        <div className="mb-2 h-[0.5px] w-full bg-primary/10" />
        <section className="flex items-center gap-2">
          <div className="relative aspect-square w-[60px] overflow-hidden rounded-full">
            {session?.user.image ? (
              <Image src={session.user.image} alt="profile_image" fill />
            ) : (
              <p className="flex h-[60px] items-center justify-center bg-primary text-white">
                {session?.user.name?.[0]}
              </p>
            )}
          </div>
          <div className="">
            <h2 className="text-sm font-medium leading-tight">
              {session?.user.name}
            </h2>
            <section className="flex items-center gap-2">
              <p className="text-xs leading-tight text-primary/70">
                {session?.user.email}
              </p>
              <p className="rounded-sm bg-secondary px-2 py-1 text-[10px] font-medium leading-none">
                Primary
              </p>
              <p className="rounded-sm bg-secondary px-2 py-1 text-[10px] font-medium leading-none">
                GitHub
              </p>
            </section>
          </div>
        </section>
      </section>

      <section>
        <h3 className="mt-5 text-base font-medium">Organization</h3>
        <div className="mb-2 h-[0.5px] w-full bg-primary/10" />
        <section className="flex items-center justify-between gap-2">
          <div className="">
            <h2 className="text-sm font-medium">
              Submit a verification request
            </h2>
            <p className="text-xs text-primary/70">
              When submitted, our team will reach out to you to assists you
              further.
            </p>
          </div>
          {/* <OrganizationVerificationCTA /> */}
        </section>
      </section>

      <section>
        <h3 className="mt-5 text-base font-medium">Danger Zone</h3>
        <div className="mb-2 h-[0.5px] w-full bg-primary/10" />
        <section className="flex items-center justify-between gap-2">
          <div className="">
            <h2 className="text-sm font-medium">Delete my account</h2>
            <p className="text-xs text-primary/70">
              Delete my account and all its associated data
            </p>
          </div>
          {/* <DeleteYourAccountCTA /> */}
          <Button variant="destructive" size="sm">
            Delete Account
          </Button>
        </section>
      </section>
    </div>
  );
};

export default Account;
