// schema
import { ProjectInsertSchema, project } from '~/server/db/schema/project';

// middleware
import { protectedProcedure } from '../middleware';

import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { team_user } from '~/server/db/schema/team_user';
import { createTRPCRouter } from '../trpc';

export const projectRouter = createTRPCRouter({
  createNewProject: protectedProcedure
    .input(ProjectInsertSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        // Check if the project already exists
        const existingProject = await ctx.db.query.project.findFirst({
          where: (project) => eq(project.slug, input.slug),
          columns: { slug: true },
        });

        if (existingProject?.slug) {
          return {
            data: null,
            error: 'Project with this title already exists',
            message: 'Project with this title already exists',
          };
        }

        // get team slug
        const teamSlug = await ctx.db
          .select({ teamSlug: team_user.teamSlug })
          .from(team_user)
          .where(eq(team_user.userMail, ctx.session.user.email ?? ''))
          .execute();

        if (!teamSlug.length || !teamSlug[0]?.teamSlug) {
          return {
            data: null,
            error: 'Team not found',
            message: 'Team not found, please try again',
          };
        }

        // create new project
        const createdNewProjectRes = await ctx.db
          .insert(project)
          .values({
            ...input,
            teamSlug: teamSlug[0].teamSlug,
          })
          .returning({
            slug: project.slug,
          })
          .execute();

        if (!createdNewProjectRes.length || !createdNewProjectRes[0]?.slug) {
          return {
            data: null,
            error: 'Failed to create project',
            message: 'Failed to create project',
          };
        }

        return {
          data: { slug: createdNewProjectRes[0].slug },
          error: null,
          message: 'Project created successfully',
        };
      } catch (error) {
        return {
          data: null,
          error: `Failed to create team: ${
            error instanceof Error ? error.message : 'Unknown error'
          }`,
          message: 'Something went wrong',
        };
      }
    }),

  getAllProjectInTeam: protectedProcedure.query(async ({ ctx }) => {
    try {
      // get team slug
      const teamSlug = await ctx.db
        .select({ teamSlug: team_user.teamSlug })
        .from(team_user)
        .where(eq(team_user.userMail, ctx.session.user.email ?? ''))
        .execute();

      if (!teamSlug.length || !teamSlug[0]?.teamSlug) {
        return {
          data: null,
          error: 'Team not found',
          message: 'Team not found, please try again',
        };
      }

      const projects = await ctx.db
        .select()
        .from(project)
        .where(eq(project.teamSlug, teamSlug[0].teamSlug))
        .execute();

      return {
        data: projects,
        message: 'Projects fetched successfully',
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error: `Failed to fetch Projects: ${JSON.stringify(error)}`,
        message: 'Something went wrong',
      };
    }
  }),

  getProjectBySlug: protectedProcedure
    .input(z.object({ projectSlug: z.string() }))
    .query(async ({ input, ctx }) => {
      try {
        const getProjectBySlugRes = await ctx.db
          .select()
          .from(project)
          .where(eq(project.slug, input.projectSlug))
          .execute();

        return {
          data: getProjectBySlugRes[0] ?? null,
          message: 'Project fetched successfully',
          error: null,
        };
      } catch (error) {
        return {
          data: null,
          error: `Failed to fetch project: ${JSON.stringify(error)}`,
          message: 'Something went wrong',
        };
      }
    }),

  // // update project
  // updateProjectBySlug: protectedProcedure
  //   .input(ProjectInsertSchema.extend({ slug: z.string() }))
  //   .mutation(async ({ input, ctx }) => {
  //     try {
  //       const updateProjectBySlugRes = await ctx.db
  //         .update(project)
  //         .set({
  //           title: input.title,
  //           description: input.description,
  //           slug: input.slug,
  //         })
  //         .where(eq(project.slug, input.slug))
  //         .execute();

  //       if (!updateProjectBySlugRes.count) {
  //         return {
  //           data: null,
  //           message: 'Failed to update project',
  //           error: 'Failed to update project',
  //         };
  //       }

  //       return {
  //         data: updateProjectBySlugRes,
  //         message: 'Project updated successfully',
  //         error: null,
  //       };
  //     } catch (error) {
  //       return {
  //         data: null,
  //         error: `Failed to update project: ${JSON.stringify(error)}`,
  //         message: 'Something went wrong',
  //       };
  //     }
  //   }),
});
