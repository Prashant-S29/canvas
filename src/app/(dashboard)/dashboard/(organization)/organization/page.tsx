import { headers } from 'next/headers';
import type React from 'react';

// utils
import { slugToString } from '~/utils/slugHandler';

import { auth } from '~/lib/auth';
import { checkAuth } from '~/utils';

const Dashboard: React.FC = async () => {
  await checkAuth({
    redirectTo: '/onboarding',
    role: 'ORG_ADMIN',
    isOrgDashboard: true,
  });

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // // check is user is onboarded
  // if (!session?.user.orgSlug) {
  //   redirect("/onboarding");
  // }

  return (
    <div className="relative h-screen w-full pt-[100px]">
      <section className="flex justify-between">
        <section>
          <h1 className="text-xl font-semibold">
            Hi, {slugToString(session?.session.orgSlug ?? '')}!{' '}
            <span className="text-primary/50">Welcome to Canvas.</span>
          </h1>
          <p className="text-sm text-primary/50">
            Here&apos;s a quick overview of your journey with Canvas.
          </p>
        </section>
      </section>
    </div>
  );
};

export default Dashboard;
