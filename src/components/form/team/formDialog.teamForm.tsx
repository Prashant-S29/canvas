'use client';

import type React from 'react';
import { useState } from 'react';

// schema
import type { CreateNewTeamFormSchemaType } from './createNewTeam/formSchema.createNewTeam';

// components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';

// form
import { CreateNewTeamForm } from './createNewTeam/form.createNewTeam';

interface TeamFomDialogProps {
  state: 'create' | 'update' | 'delete';
  data?: CreateNewTeamFormSchemaType;
  trigger?: React.ReactNode;
}

export const TeamFomDialog: React.FC<TeamFomDialogProps> = ({ trigger }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger ?? 'open'}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a New Team</DialogTitle>
          <DialogDescription>
            Enter the details of your new team
          </DialogDescription>
        </DialogHeader>
        <CreateNewTeamForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};
