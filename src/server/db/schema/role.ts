import { pgEnum } from 'drizzle-orm/pg-core';

export const role = pgEnum('role', [
  'ORG_ADMIN',
  'TEAM_ADMIN',
  'TEAM_MEMBER',
  'USER',
]);
