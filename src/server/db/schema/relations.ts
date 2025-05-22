// team - team_user (one-to-many)
import { relations } from 'drizzle-orm';
import { team } from './team';
import { team_user } from './team_user';

export const teamRelations = relations(team, ({ many }) => ({
  members: many(team_user),
}));

// inverse relation - team_user - team
export const teamUserRelations = relations(team_user, ({ one }) => ({
  team: one(team, {
    fields: [team_user.teamSlug],
    references: [team.slug],
  }),
}));
