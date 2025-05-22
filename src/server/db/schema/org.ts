import { boolean, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { user } from './user';

export const organization = pgTable('organization', {
  id: uuid('id').defaultRandom().primaryKey(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  is_verified: boolean('is_verified').notNull().default(false),

  created_at: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updated_at: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),

  org_admin_id: uuid('org_admin_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade', onUpdate: 'cascade' })
    .unique(),
});
