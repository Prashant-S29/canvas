import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import type { z } from 'zod';
import { organization } from './org';
import { team } from './team';

// models
export const project = pgTable('project', {
  id: uuid('id').defaultRandom().primaryKey(),
  slug: text('slug').notNull().unique(),
  orgSlug: text('org_slug')
    .notNull()
    .references(() => organization.slug),
  teamSlug: text('team_slug')
    .notNull()
    .references(() => team.slug),
  title: text('title').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const templates = pgTable('templates', {
  id: uuid('id').defaultRandom().primaryKey(),
  projectId: uuid('project_id')
    .notNull()
    .references(() => project.id),
  title: text('title').notNull(),
  slug: text('slug').notNull(),
  certificateURL: text('certificate_url').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const fields = pgTable('fields', {
  id: uuid('id').defaultRandom().primaryKey(),
  templateId: uuid('template_id')
    .notNull()
    .references(() => templates.id),
  title: text('title').notNull(),
  slug: text('slug').notNull(),
});

// relations

export const projectRelations = relations(project, ({ one, many }) => ({
  organization: one(organization, {
    fields: [project.orgSlug],
    references: [organization.slug],
  }),

  team: one(team, {
    fields: [project.teamSlug],
    references: [team.slug],
  }),
  templates: many(templates),
}));

export const templatesRelations = relations(templates, ({ one, many }) => ({
  project: one(project, {
    fields: [templates.projectId],
    references: [project.id],
  }),
  fields: many(fields),
}));

export const fieldsRelations = relations(fields, ({ one }) => ({
  template: one(templates, {
    fields: [fields.templateId],
    references: [templates.id],
  }),
}));

// schemas
export const ProjectSelectSchema = createSelectSchema(project);
export const TemplateSelectSchema = createSelectSchema(templates);
export const FieldSelectSchema = createSelectSchema(fields);

export const ProjectInsertSchema = createInsertSchema(project);
export const TemplateInsertSchema = createInsertSchema(templates);
export const FieldInsertSchema = createInsertSchema(fields);

// types
export type ProjectInsertSchemaType = z.infer<typeof ProjectInsertSchema>;
export type TemplateInsertSchemaType = z.infer<typeof TemplateInsertSchema>;
export type FieldInsertSchemaType = z.infer<typeof FieldInsertSchema>;
