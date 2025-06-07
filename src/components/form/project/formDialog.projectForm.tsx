'use client';

import type React from 'react';
import { useState } from 'react';

// schema

// components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';

import type { ProjectInsertSchemaType } from '~/server/db/schema/project';
// form
import { CreateNewProjectForm } from './createNewProject/form.createNewProject';

interface ProjectFomDialogProps {
  state: 'create' | 'update' | 'delete';
  data?: ProjectInsertSchemaType;
  trigger?: React.ReactNode;
}

export const ProjectFomDialog: React.FC<ProjectFomDialogProps> = ({
  trigger,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger ?? 'open'}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a New Project</DialogTitle>
          <DialogDescription>
            Enter the details of your new project
          </DialogDescription>
        </DialogHeader>
        <CreateNewProjectForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};
