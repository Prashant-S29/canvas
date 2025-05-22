import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
import { team } from '~/server/db/schema/team';

export const CreateNewTeamFormSchema = createInsertSchema(team, {
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters long')
    .max(50, 'Name must be at most 50 characters long'),
  description: z
    .string()
    .min(3, 'Description must be at least 3 characters long')
    .max(400, 'Description must be at most 400 characters long'),
  // invitationCode: z
  //   .string()
  //   .min(6, 'Invitation code must be at least 6 characters long')
  //   .max(6, 'Invitation code must be at most 6 characters long'),
});

export type CreateNewTeamFormSchemaType = z.infer<
  typeof CreateNewTeamFormSchema
>;
