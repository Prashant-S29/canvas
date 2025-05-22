'use client';

import { useParams } from 'next/navigation';
import type React from 'react';

// components
import {
  InvitationHistoryTable,
  PendingInvitationTable,
  TeamMemberTable,
} from '~/components/dashboard/organization/feature';

// components
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';

const TeamSetting: React.FC = () => {
  const params = useParams<{ slug: string }>();

  return (
    <div className="relative min-h-screen w-full pb-5 pt-[100px]">
      <section>
        <h1 className="text-xl font-semibold text-primary">
          Team Settings {params.slug}
        </h1>
      </section>

      <div className="mt-5 space-y-6">
        <Tabs defaultValue="members">
          <TabsList width={'full'}>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="pending_invitation">
              Pending Invitations
            </TabsTrigger>
            <TabsTrigger value="invitation_history">
              Invitation History
            </TabsTrigger>
          </TabsList>
          <TabsContent value="members">
            <TeamMemberTable teamSlug={params.slug} />
          </TabsContent>
          <TabsContent value="pending_invitation">
            <PendingInvitationTable teamSlug={params.slug} />
          </TabsContent>
          <TabsContent value="invitation_history">
            <InvitationHistoryTable teamSlug={params.slug} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TeamSetting;
