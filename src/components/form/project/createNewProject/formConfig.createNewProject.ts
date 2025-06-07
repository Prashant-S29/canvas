import type { ProjectInsertSchemaType } from '~/server/db/schema/project';

export const defaultValues: ProjectInsertSchemaType = {
  title: '',
  slug: '',
  orgSlug: '',
  teamSlug: '',
};
