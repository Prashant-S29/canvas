import { account, session, verification } from './auth';
import { organization } from './org';
import { team } from './team';
import { team_user } from './team_user';
import { user } from './user';

export const schema = {
  user,
  account,
  session,
  verification,
  organization,
  team,
  team_user,
};
