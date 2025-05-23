import { type BetterAuthOptions, betterAuth } from 'better-auth';
import { customSession } from 'better-auth/plugins';
import { getSessionInfo } from '~/server/actions';
import { options } from './config.auth';

export const auth = betterAuth({
  ...options,
  plugins: [
    ...(options.plugins ?? []),
    customSession(async ({ user, session }) => {
      // get org slug
      const sessionInfo = await getSessionInfo({
        userMail: user.email,
        userId: user.id,
      });
      return {
        user,
        session: {
          ...session,
          role: sessionInfo.role,
          orgSlug: sessionInfo.orgSlug,
          teamSlug: sessionInfo.teamSlug,
        },
      };
    }),
  ],
} satisfies BetterAuthOptions);
