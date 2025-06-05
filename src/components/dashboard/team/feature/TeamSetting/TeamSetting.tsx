'use client';

import type React from 'react';

// components
import {
  InvitationHistoryTable,
  PendingInvitationTable,
  TeamMemberTable,
} from '~/components/dashboard/organization/feature';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';

interface Params {
  slug: string;
}

export const TeamSetting: React.FC<Params> = ({ slug }) => {
  return (
    <Tabs defaultValue="members">
      <TabsList width={'full'}>
        <TabsTrigger value="members">Members</TabsTrigger>
        <TabsTrigger value="pending_invitation">
          Pending Invitations
        </TabsTrigger>
        <TabsTrigger value="invitation_history">Invitation History</TabsTrigger>
      </TabsList>
      <TabsContent value="members">
        <TeamMemberTable teamSlug={slug} />
      </TabsContent>
      <TabsContent value="pending_invitation">
        <PendingInvitationTable teamSlug={slug} />
      </TabsContent>
      <TabsContent value="invitation_history">
        <InvitationHistoryTable teamSlug={slug} />
      </TabsContent>
    </Tabs>
  );
};
