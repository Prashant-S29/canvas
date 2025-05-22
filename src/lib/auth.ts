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
        userId: user.id,
        userMail: user.email,
      });
      return {
        user,
        session: {
          ...session,
          role: sessionInfo.role,
          orgSlug: sessionInfo.orgSlug,
        },
      };
    }),
  ],
} satisfies BetterAuthOptions);
