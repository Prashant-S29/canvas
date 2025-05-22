import type { Role } from '~/server/db/schema/team_user';

export const formatRole = (role: Role): string => {
  switch (role) {
    case 'ORG_ADMIN':
      return 'Organization Admin';
    case 'TEAM_ADMIN':
      return 'Team Admin';
    case 'TEAM_MEMBER':
      return 'Team Member';
    case 'USER':
      return 'User';
    default:
      return 'User';
  }
};
