import type React from 'react';

// auth
// import { auth } from "~/server/auth";

// utils
import { slugToString } from '~/utils/slugHandler';

import { headers } from 'next/headers';
// components
// import { OrgVerificationStatus } from "~/components/dashboard/organization/common";
import { auth } from '~/lib/auth';

const Dashboard: React.FC = async () => {
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
