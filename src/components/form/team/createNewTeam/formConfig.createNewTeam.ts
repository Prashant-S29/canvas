import type { CreateNewTeamFormSchemaType } from './formSchema.createNewTeam';

export const defaultValues: CreateNewTeamFormSchemaType = {
  name: '',
  slug: '',
  description: '',
  invitationCode: '',
  org_slug: '',
};
