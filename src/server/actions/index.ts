'use server';

import { eq } from 'drizzle-orm';
import { db } from '../db';

export const getSessionInfo = async ({
  userMail,
  userId,
}: {
  userMail: string;
  userId: string;
}) => {
  const teamUser = await db.query.team_user.findFirst({
    where: (table) => eq(table.userMail, userMail),
    columns: {
      teamSlug: true,
      role: true,
    },
  });

  const org = await db.query.organization.findFirst({
    where: (table) => eq(table.org_admin_id, userId),
    columns: {
      slug: true,
    },
  });

  const user = await db.query.user.findFirst({
    where: (table) => eq(table.id, userId),
    columns: {
      role: true,
    },
  });

  return {
    role: user?.role,
    orgSlug: org?.slug,
    teamSlug: teamUser?.teamSlug,
  };
};
