'use client';

import type React from 'react';
import { useState } from 'react';

// utils
import { slugToString } from '~/utils/slugHandler';

// components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import { InviteMemberForm } from './InviteMemberForm';

interface TeamFomDialogProps {
  trigger?: React.ReactNode;
  teamSlug: string;
}

export const InviteMemberFormDialog: React.FC<TeamFomDialogProps> = ({
  trigger,
  teamSlug,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger ?? 'open'}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite a member to {slugToString(teamSlug)}</DialogTitle>
          <DialogDescription>Invite new members to your team</DialogDescription>
        </DialogHeader>
        <InviteMemberForm setOpen={setOpen} teamSlug={teamSlug} />
      </DialogContent>
    </Dialog>
  );
};
