// schema
import { CreateNewTeamFormSchema } from '~/components/form/team';

// middleware
import { protectedProcedure } from '../middleware';

import { desc, eq } from 'drizzle-orm';
import { z } from 'zod';
import { InviteMemberSchema } from '~/schema/form/formSchema.inviteMember';
import { team } from '~/server/db/schema/team';
import { team_invitation } from '~/server/db/schema/team_invitation';
import { team_user } from '~/server/db/schema/team_user';
import { slugToString, stringToSlug } from '~/utils';
import { createTRPCRouter, t } from '../trpc';
import { mailRouter } from './route.mail';
// import { createCaller } from '../root';

const createCaller = t.createCallerFactory(mailRouter);

export const teamRouter = createTRPCRouter({
  createNewTeam: protectedProcedure
    .input(CreateNewTeamFormSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const teamSlug = stringToSlug(input.name);

        // Check if the team already exists
        const existingTeam = await ctx.db.query.team.findFirst({
          where: (team) => eq(team.slug, teamSlug),
          columns: { slug: true },
        });

        if (existingTeam?.slug) {
          return {
            data: null,
            error: 'Team with this name already exists',
            message: 'Team with this name already exists',
          };
        }

        // Start a transaction
        const result = await ctx.db.transaction(async (tx) => {
          if (!ctx.session.session.orgSlug) {
            return {
              data: null,
              error: 'Organization not found',
              message: 'Organization not found, please try again',
            };
          }

          // Insert the new team
          const insertedTeam = await tx
            .insert(team)
            .values({
              slug: teamSlug,
              name: input.name,
              description: input.description,
              invitationCode: teamSlug,
              org_slug: ctx.session.session.orgSlug,
            })
            .returning({ slug: team.slug });

          if (!insertedTeam.length || !insertedTeam[0]?.slug) {
            return {
              data: null,
              error: 'Failed to create team',
              message: 'Failed to create team',
            };
          }

          const createdSlug = insertedTeam[0].slug;

          // Insert org admin as member
          await tx.insert(team_user).values({
            role: 'ORG_ADMIN',
            invitedBy: ctx.session.user.email,
            teamSlug: createdSlug,
            userMail: ctx.session.user.email,
          });

          return {
            data: { slug: createdSlug },
            error: null,
            message: 'Team and member created successfully',
          };
        });

        return result;
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

  getAllTeams: protectedProcedure.query(async ({ ctx }) => {
    try {
      const teams = await ctx.db.query.team.findMany();

      return {
        data: teams,
        message: 'Teams fetched successfully',
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error: `Failed to fetch teams: ${JSON.stringify(error)}`,
        message: 'Something went wrong',
      };
    }
  }),

  getAllTeamUsersByTeamSlug: protectedProcedure
    .input(z.object({ teamSlug: z.string() }))
    .query(async ({ input, ctx }) => {
      try {
        const getTeamUsersRes = await ctx.db
          .select()
          .from(team_user)
          .where(eq(team_user.teamSlug, input.teamSlug))
          .execute();
        return {
          data: getTeamUsersRes,
          error: null,
          message: 'Successfully fetched team users',
        };
      } catch (error) {
        return {
          data: null,
          error: `Failed to fetch team users: ${JSON.stringify(error)}`,
          message: 'Something went wrong',
        };
      }
    }),

  getTeamBySlug: protectedProcedure
    .input(z.object({ teamSlug: z.string() }))
    .query(async ({ input, ctx }) => {
      try {
        const getTeamBySlugRes = await ctx.db
          .select()
          .from(team)
          .where(eq(team.slug, input.teamSlug))
          .execute();

        return {
          data: getTeamBySlugRes[0] ?? null,
          message: 'Team fetched successfully',
          error: null,
        };
      } catch (error) {
        return {
          data: null,
          error: `Failed to fetch team: ${JSON.stringify(error)}`,
          message: 'Something went wrong',
        };
      }
    }),

  getAllInvitations: protectedProcedure
    .input(z.object({ teamSlug: z.string() }))
    .query(async ({ input, ctx }) => {
      try {
        const getAllInvitationsRes = await ctx.db
          .select()
          .from(team_invitation)
          .where(eq(team_invitation.teamSlug, input.teamSlug))
          .orderBy(desc(team_invitation.createdAt))
          .execute();

        return {
          data: getAllInvitationsRes,
          message: 'Team invitations fetched successfully',
          error: null,
        };
      } catch (error) {
        return {
          data: null,
          error: `Failed to fetch team invitations: ${JSON.stringify(error)}`,
          message: 'Something went wrong',
        };
      }
    }),

  inviteMembers: protectedProcedure
    .input(InviteMemberSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const caller = createCaller(ctx);

        // check for team
        const getTeamRes = await ctx.db.query.team.findFirst({
          where: (team) => eq(team.slug, input.teamSlug),
        });

        if (!getTeamRes?.slug) {
          return {
            data: null,
            message: 'Team not found, please try again',
            error: 'Team not found',
          };
        }

        // check if invitation already exists
        const invitationExists = await ctx.db
          .select()
          .from(team_invitation)
          .where(eq(team_invitation.userMail, input.userMail))
          .execute();

        if (invitationExists.length) {
          return {
            data: null,
            message: 'Invitation already exists',
            error: 'Invitation already exists',
          };
        }

        // check if already a member
        const memberExists = await ctx.db
          .select()
          .from(team_user)
          .where(eq(team_user.userMail, input.userMail))
          .execute();

        if (memberExists.length) {
          return {
            data: null,
            message: 'User already a member',
            error: 'User already a member',
          };
        }

        // creates in member invitation
        const memberInvitationRes = await ctx.db
          .insert(team_invitation)
          .values({
            ...input,
            invitedBy: ctx.session.user.email,
          })
          .returning({
            id: team_invitation.id,
          });

        if (!memberInvitationRes[0]?.id) {
          return {
            data: null,
            message: 'Failed to create team member',
            error: 'Failed to create team member',
          };
        }

        // // send invitation code via email
        const mailRes = await caller.sendTeamInvitationMail({
          senderName: ctx.session.user.name ?? '<no-name>',
          senderMail: ctx.session.user.email ?? '<no-email>',
          orgSlug: ctx.session.session.orgSlug ?? '<no-org>',
          teamName: slugToString(input.teamSlug),
          receiverMail: input.userMail,
          invitationLink: `https://localhost:3000/teams/join?tokenId=${team.invitationCode}`,
        });

        if (!mailRes?.accepted) {
          return {
            data: null,
            message: 'Failed to send team invitation email',
            error: 'Unable to send email',
          };
        }

        return {
          data: memberInvitationRes[0],
          message: 'Team invitation email sent successfully',
          error: null,
        };
      } catch (error) {
        return {
          data: null,
          error: `Failed to fetch team: ${JSON.stringify(error)}`,
          message: 'Something went wrong',
        };
      }
    }),

  updateRoleInInvitation: protectedProcedure
    .input(
      z.object({
        invitationId: z.string(),
        role: z.enum(['TEAM_MEMBER', 'TEAM_ADMIN', 'USER', 'ORG_ADMIN']),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const updateRoleInInvitationRes = await ctx.db
          .update(team_invitation)
          .set({
            role: input.role,
          })
          .where(eq(team_invitation.id, input.invitationId))
          .execute();

        if (!updateRoleInInvitationRes.count) {
          return {
            data: null,
            message: 'Failed to update role',
            error: 'Failed to update role',
          };
        }

        return {
          data: updateRoleInInvitationRes,
          message: 'Role updated successfully',
          error: null,
        };
      } catch (error) {
        return {
          data: null,
          error: `Failed to update role: ${JSON.stringify(error)}`,
          message: 'Something went wrong',
        };
      }
    }),

  revokeInvitation: protectedProcedure
    .input(z.object({ invitationId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      try {
        const revokeInvitationRes = await ctx.db
          .delete(team_invitation)
          .where(eq(team_invitation.id, input.invitationId))
          .execute();

        if (!revokeInvitationRes.count) {
          return {
            data: null,
            message: 'Failed to revoke invitation',
            error: 'Failed to revoke invitation',
          };
        }

        return {
          data: revokeInvitationRes,
          message: 'Invitation revoked successfully',
          error: null,
        };
      } catch (error) {
        return {
          data: null,
          error: `Failed to revoke invitation: ${JSON.stringify(error)}`,
          message: 'Something went wrong',
        };
      }
    }),
});
