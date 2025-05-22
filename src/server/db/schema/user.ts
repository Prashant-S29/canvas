import { boolean, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { role } from './role';

export const user = pgTable('user', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').notNull(),
  role: role('role').notNull().default('USER'),
  image: text('image'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
});
