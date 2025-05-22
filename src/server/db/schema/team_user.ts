import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { createSelectSchema } from 'drizzle-zod';
import { role } from './role';
import { team } from './team';
import { user } from './user';

export const team_user = pgTable('team_user', {
  id: uuid('id').defaultRandom().primaryKey(),
  role: role('role').notNull(),
  invitedBy: text('invited_by').notNull(),

  teamSlug: text('team_slug')
    .notNull()
    .references(() => team.slug, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),

  userMail: text('user_mail')
    .notNull()
    .references(() => user.email, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type Role = (typeof role.enumValues)[number];
export const TeamUserSelectSchema = createSelectSchema(team_user);
