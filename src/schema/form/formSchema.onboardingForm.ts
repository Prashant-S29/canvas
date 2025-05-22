import { z } from 'zod';

export const OnboardingFormSchema = z.object({
  invitationCode: z
    .string()
    .min(6, 'Invalid Invitation Code')
    .max(6, 'Invalid Invitation Code'),
});

export type OnboardingFormSchemaType = z.infer<typeof OnboardingFormSchema>;
