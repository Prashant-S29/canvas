// schema
import { CreateNewTeamFormSchema } from '~/components/form/team';

// middleware
import { protectedProcedure } from '../middleware';

import { and, desc, eq } from 'drizzle-orm';
import { z } from 'zod';
import { InviteMemberSchema } from '~/schema/form/formSchema.inviteMember';
import { team } from '~/server/db/schema/team';
import { team_invitation } from '~/server/db/schema/team_invitation';
import { team_user } from '~/server/db/schema/team_user';
import { slugToString, stringToSlug } from '~/utils';
import { createTRPCRouter, t } from '../trpc';
import { mailRouter } from './route.mail';
// import { createCaller } from '../root';

import ShortUniqueId from 'short-unique-id';
import { user } from '~/server/db/schema/user';

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

          // generate invitation code
          const { randomUUID } = new ShortUniqueId({
            length: 6,
            dictionary: 'number',
          });

          // Insert the new team
          const insertedTeam = await tx
            .insert(team)
            .values({
              slug: teamSlug,
              name: input.name,
              description: input.description,
              invitationCode: randomUUID(),
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
            orgSlug: ctx.session.session.orgSlug,
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

  getAllTeamsInOrg: protectedProcedure.query(async ({ ctx }) => {
    try {
      const teams = await ctx.db
        .select()
        .from(team)
        .where(eq(team.org_slug, ctx.session.session.orgSlug ?? ''))
        .execute();

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

  // getTeamBySlugWithMemberInfo: protectedProcedure
  //   .input(z.object({ teamSlug: z.string() }))
  //   .query(async ({ input, ctx }) => {
  //     try {
  //       const teamData = await ctx.db
  //         .select({
  //           team: team,
  //           member: team_user,
  //           user: user,
  //         })
  //         .from(team)
  //         .leftJoin(team_user, eq(team.slug, team_user.teamSlug))
  //         .leftJoin(user, eq(team_user.userMail, user.email))
  //         .where(eq(team.slug, input.teamSlug));

  //       if (!teamData.length) {
  //         return {
  //           data: null,
  //           message: 'Team not found',
  //           error: null,
  //         };
  //       }

  //       const team = teamData[0];
  //       team?.team[0].

  //       const members = teamData
  //         .filter((row) => row.member !== null)
  //         .map((row) => ({
  //           ...row.member,
  //           user: row.user,
  //         }));

  //       return {
  //         data: {
  //           ...teamInfo,
  //           members,
  //         },
  //         message: 'Team fetched successfully',
  //         error: null,
  //       };
  //     } catch (error) {
  //       return {
  //         data: null,
  //         error: `Failed to fetch team: ${JSON.stringify(error)}`,
  //         message: 'Something went wrong',
  //       };
  //     }
  //   }),

  getUserParticipatedTeams: protectedProcedure
    .input(z.object({ userMail: z.string() }))
    .query(async ({ input, ctx }) => {
      try {
        const res = await ctx.db
          .select()
          .from(team_user)
          .where(eq(team_user.userMail, input.userMail))
          .execute();

        return {
          data: res,
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

  getAllPendingInvitations: protectedProcedure
    .input(z.object({ teamSlug: z.string() }))
    .query(async ({ input, ctx }) => {
      try {
        const getAllInvitationsRes = await ctx.db
          .select()
          .from(team_invitation)
          .where(
            and(
              eq(team_invitation.teamSlug, input.teamSlug),
              eq(team_invitation.invitationStatus, 'PENDING'),
            ),
          )
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
      return await ctx.db
        .transaction(async (tx) => {
          const caller = createCaller(ctx);

          // 1. Check for team
          const getTeamRes = await tx
            .select()
            .from(team)
            .where(eq(team.slug, input.teamSlug))
            .limit(1)
            .execute();

          if (!getTeamRes.length || !getTeamRes[0]?.slug) {
            throw new Error('Team not found, please try again');
          }

          // 2. Check if invitation already exists
          const invitationExists = await tx
            .select()
            .from(team_invitation)
            .where(eq(team_invitation.userMail, input.userMail))
            .execute();

          if (invitationExists.length) {
            throw new Error('Invitation already exists');
          }

          // 3. Check if already a member
          const memberExists = await tx
            .select()
            .from(team_user)
            .where(eq(team_user.userMail, input.userMail))
            .execute();

          if (memberExists.length) {
            throw new Error('User already a member');
          }

          if (!ctx.session.session.orgSlug) {
            throw new Error('Organization not found');
          }

          // 4. Create new member invitation
          const memberInvitationRes = await tx
            .insert(team_invitation)
            .values({
              ...input,
              invitedBy: ctx.session.user.email,
              orgSlug: ctx.session.session.orgSlug,
            })
            .returning({
              id: team_invitation.id,
            });

          if (!memberInvitationRes[0]?.id) {
            throw new Error('Failed to create team member');
          }

          // 5. Send invitation code via email
          const mailRes = await caller.sendTeamInvitationMail({
            senderName: ctx.session.user.name ?? '<no-name>',
            senderMail: ctx.session.user.email ?? '<no-email>',
            orgSlug: ctx.session.session.orgSlug ?? '<no-org>',
            teamName: slugToString(input.teamSlug),
            receiverMail: input.userMail,
            invitationLink: `https://localhost:3000/teams/join?code=${getTeamRes[0].invitationCode}`,
          });

          if (!mailRes?.accepted) {
            throw new Error('Failed to send team invitation email');
          }

          // 6. Return response
          return {
            data: memberInvitationRes[0],
            message: 'Team invitation email sent successfully',
            error: null,
          };
        })
        .catch((error) => {
          return {
            data: null,
            message: error.message || 'Transaction failed',
            error: error.message || 'Transaction failed',
          };
        });
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

  acceptInvitation: protectedProcedure
    .input(z.object({ invitationCode: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.db
        .transaction(async (tx) => {
          // 1. Get team using invitation code
          const getTeamRes = await tx
            .select()
            .from(team)
            .where(eq(team.invitationCode, input.invitationCode))
            .limit(1)
            .execute();

          if (!getTeamRes.length || !getTeamRes?.[0]?.slug) {
            throw new Error('Invitation not found');
          }

          const teamData = getTeamRes[0];

          // 2. Check if the user is invited
          const getInvitationRes = await tx
            .select()
            .from(team_invitation)
            .where(
              and(
                eq(team_invitation.teamSlug, teamData.slug),
                eq(team_invitation.userMail, ctx.session.user.email),
              ),
            )
            .limit(1)
            .execute();

          if (!getInvitationRes.length || !getInvitationRes?.[0]?.id) {
            throw new Error('You are not invited to this team');
          }

          const invitationData = getInvitationRes[0];

          // 3. Accept the invitation by inserting into team_user
          const acceptInvitationRes = await tx
            .insert(team_user)
            .values({
              role: invitationData.role,
              invitedBy: invitationData.invitedBy,
              teamSlug: teamData.slug,
              userMail: ctx.session.user.email,
              orgSlug: teamData.org_slug,
            })
            .returning({
              id: team_user.id,
              slug: team_user.teamSlug,
            });

          if (!acceptInvitationRes[0]?.id) {
            throw new Error('Failed to accept invitation');
          }

          // 4. Update invitation status
          await tx
            .update(team_invitation)
            .set({
              invitationStatus: 'ACCEPTED',
            })
            .where(eq(team_invitation.id, invitationData.id));

          // 5. Update user role
          await tx
            .update(user)
            .set({
              role: invitationData.role,
            })
            .where(eq(user.email, ctx.session.user.email));

          // 6. Return response
          return {
            data: acceptInvitationRes[0],
            message: 'Invitation accepted successfully',
            error: null,
          };
        })
        .catch((error) => {
          return {
            data: null,
            message: error.message || 'Transaction failed',
            error: error.message || 'Transaction failed',
          };
        });
    }),
});
