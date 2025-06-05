'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '~/lib/auth';
import type { Role } from '~/server/db/schema/team_user';

interface CheckAuth {
  role: Role[];
  redirectTo: string;
  isOrgDashboard?: boolean;
}

export const checkAuth = async ({
  redirectTo,
  role,
  isOrgDashboard = false,
}: CheckAuth) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // handle protected routes
  if (!session) {
    redirect(redirectTo);
  }

  // handle role based auth
  if (!session.session.role || !role.includes(session.session.role)) {
    redirect(redirectTo);
  }

  // handle org dashboard
  if (isOrgDashboard && !session.session.orgSlug) {
    redirect(redirectTo);
  }
};
