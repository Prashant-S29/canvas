'use server';

import { eq } from 'drizzle-orm';
import { db } from '../db';

export const getSessionInfo = async ({
  userId,
}: {
  userId: string;
  userMail: string;
}) => {
  const user = db.query.user.findFirst({
    where: (table) => eq(table.id, userId),
    columns: {
      role: true,
    },
  });

  const org = db.query.organization.findFirst({
    where: (table) => eq(table.org_admin_id, userId),
    columns: {
      slug: true,
      is_verified: true,
    },
  });

  const result = await Promise.all([user, org]);

  return {
    role: result[0]?.role,
    orgSlug: result[1]?.slug,
  };
};
