import type React from 'react';

// icons

import Link from 'next/link';
// components
import { Button } from '~/components/ui/button';

import { headers } from 'next/headers';
import { CheckIcon, RightArrowIcon } from 'public/icons';
import { auth } from '~/lib/auth';
import { slugToString } from '~/utils';

export const Hero: React.FC = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="relative flex-col  flex h-screen w-full items-center font-satoshi justify-center">
      <h1 className="text-center text-[40px] font-medium leading-tight">
        An easy way to{' '}
        <span className="underline underline-offset-4">manage</span>
      </h1>
      <h1 className="text-center text-[40px] font-medium leading-tight">
        online certificates
      </h1>

      <p className="mt-2 text-center text-primary/70  ">
        Introducing Canvas - A fully managed certificate generator.
      </p>
      <p className="text-center text-primary/70   ">
        With Canvas, you can easily generate, verify and manage certificates for
        your online courses, projects, and more.
      </p>

      {/* {JSON.stringify(session)} */}

      <section className="mt-5 flex items-center justify-center gap-3">
        {session?.user.id ? (
          <>
            {session.session.orgSlug ? (
              <>
                <Button asChild variant="default">
                  <Link href="/dashboard/organization">
                    Continue with {slugToString(session.session.orgSlug)}{' '}
                    <RightArrowIcon />
                  </Link>
                </Button>
                <Button asChild variant="secondary">
                  <Link href="/teams/join">Join a Team</Link>
                </Button>
              </>
            ) : (
              <Button asChild variant="default">
                <Link href="/onboarding">
                  Continue Onboarding <RightArrowIcon />
                </Link>
              </Button>
            )}
          </>
        ) : (
          <Button asChild>
            <Link href="/signup">Start your project</Link>
          </Button>
        )}
      </section>

      <section className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center justify-center gap-5">
        <p className="flex items-center gap-1 text-sm">
          <CheckIcon className="text-xl" /> Certificate Verification
        </p>
        <p className="flex items-center gap-1 text-sm">
          <CheckIcon className="text-xl" /> Mass Certificate Generation
        </p>

        <p className="flex items-center gap-1 text-sm">
          <CheckIcon className="text-xl" /> Managed Workspace
        </p>
      </section>
    </div>
  );
};
