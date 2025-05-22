// zod
import type { z } from 'zod';

import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

// tables
import { organization } from './org';

export const team = pgTable('team', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description').notNull(),
  invitationCode: text('invitation_code').notNull().unique(),

  created_at: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updated_at: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),

  org_slug: text('org_slug')
    .notNull()
    .references(() => organization.slug, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
});

export const TeamSelectSchema = createSelectSchema(team);
export const TeamInsertSchema = createInsertSchema(team);

export type TeamSelectSchemaType = z.infer<typeof TeamSelectSchema>;
export type TeamInsertSchemaType = z.infer<typeof TeamInsertSchema>;
