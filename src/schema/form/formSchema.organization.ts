import * as z from 'zod';

export const CreateNewOrgFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Org name must be at least 2 characters')
    .max(25, 'Org name must be at most 25 characters'),
  slug: z.string().trim(),

  description: z
    .string()
    .trim()
    .min(10, 'Org description must be at least 10 characters')
    .max(400, 'Org description must be at most 400 characters'),
});

export type CreateNewOrgFormSchemaType = z.infer<typeof CreateNewOrgFormSchema>;
