import { TRPCError } from '@trpc/server';
import { t } from '../trpc';

export const orgAdminMiddleware = t.middleware(async ({ ctx, next }) => {
  if (!ctx.session?.session.orgSlug) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Only be accessible by admins',
    });
  }

  return next();
});

// Admin Procedure
export const orgAdminProcedure = t.procedure.use(orgAdminMiddleware);
