import { z } from 'zod';

export const InviteMemberSchema = z.object({
  role: z.enum(['ORG_ADMIN', 'TEAM_ADMIN', 'TEAM_MEMBER', 'USER']),
  teamSlug: z.string().min(1, 'Team slug is required'),
  userMail: z.string().email('Invalid email'),
});

export type InviteMemberSchemaType = z.infer<typeof InviteMemberSchema>;
