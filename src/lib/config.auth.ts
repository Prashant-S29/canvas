import type { BetterAuthOptions } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '~/server/db';

import { schema } from '~/server/db/schema';

export const options = {
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
  }),
  session: {
    additionalFields: {
      orgSlug: { type: 'string', defaultValue: '' },
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  advanced: {
    database: {
      generateId: false,
    },
  },
  plugins: [],
} satisfies BetterAuthOptions;
