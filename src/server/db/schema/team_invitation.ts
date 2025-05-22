import { pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import type { z } from 'zod';
import { role } from './role';
import { team } from './team';

export const invitationStatus = pgEnum('invitation_status', [
  'PENDING',
  'ACCEPTED',
  'REJECTED',
]);

export const team_invitation = pgTable('team_invitation', {
  id: uuid('id').defaultRandom().primaryKey(),
  role: role('role').notNull(),
  userMail: text('user_mail').notNull(),
  invitedBy: text('invited_by').notNull(),
  invitationStatus: invitationStatus('invitation_status')
    .notNull()
    .default('PENDING'),

  teamSlug: text('team_slug')
    .notNull()
    .references(() => team.slug, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const TeamInvitationSelectSchema = createSelectSchema(team_invitation);
export const TeamInvitationInsertSchema = createInsertSchema(team_invitation);

export type TeamInvitationSelectSchemaType = z.infer<
  typeof TeamInvitationSelectSchema
>;
export type TeamInvitationInsertSchemaType = z.infer<
  typeof TeamInvitationInsertSchema
>;

// const l:TeamInvitationInsertSchemaType = {

// }
