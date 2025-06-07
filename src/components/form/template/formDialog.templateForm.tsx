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

import type { TemplateInsertSchemaType } from '~/server/db/schema/project';
// form
import { CreateNewTemplateForm } from './createNewTemplate/form.createNewTemplate';

interface TemplateFormDialogProps {
  state: 'create' | 'update' | 'delete';
  data?: TemplateInsertSchemaType;
  trigger?: React.ReactNode;
}

export const TemplateFomDialog: React.FC<TemplateFormDialogProps> = ({
  trigger,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger ?? 'open'}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a New Template</DialogTitle>
          <DialogDescription>
            Enter the details of your new template
          </DialogDescription>
        </DialogHeader>
        <CreateNewTemplateForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};
