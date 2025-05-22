import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { CreateNewOrgFormSchema } from '~/schema/form/formSchema.organization';
import { createTRPCRouter } from '~/server/api/trpc';
import { organization } from '~/server/db/schema/org';
import { user } from '~/server/db/schema/user';
import { protectedProcedure, publicProcedure } from '../middleware';

export const orgRouter = createTRPCRouter({
  createNewOrg: protectedProcedure
    .input(CreateNewOrgFormSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        // 1. Check if the organization already exists before attempting to insert
        const existingOrg = await ctx.db.query.organization.findFirst({
          where: eq(organization.slug, input.slug),
        });

        if (existingOrg) {
          console.error('Organization already exists');
          return {
            data: null,
            error: 'Organization already exists',
            message: 'An organization with this name already exists.',
          };
        }

        // 2. Attempt to insert the new organization
        const result = await ctx.db
          .insert(organization)
          .values({
            name: input.name,
            slug: input.slug,
            description: input.description,
            org_admin_id: ctx.session.user.id,
          })
          .returning({ slug: organization.slug });

        if (result.length === 0 || !result[0]?.slug) {
          return {
            data: null,
            error: 'Failed to create organization',
            message: 'Failed to create organization',
          };
        }

        // update current user role to orgAdmin
        await ctx.db
          .update(user)
          .set({
            role: 'ORG_ADMIN',
          })
          .where(eq(user.id, ctx.session.user.id));

        return {
          data: {
            orgSlug: result[0].slug,
          },
          message: 'Organization created successfully',
          error: null,
        };
      } catch (error) {
        console.error(error);
        return {
          data: null,
          error: 'Unexpected error occurred',
          message: 'Unexpected error occurred',
        };
      }
    }),

  // NOTE - only used to update the session on client
  getOrgSlug: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input, ctx }) => {
      // if already present in session, just return it
      if (ctx.session?.session.orgSlug) {
        return ctx.session?.session.orgSlug;
      }

      // else get it from db
      const org = await ctx.db.query.organization.findFirst({
        where: eq(organization.org_admin_id, input.userId),
        columns: {
          slug: true,
        },
      });

      return org?.slug ?? '';
    }),
});
