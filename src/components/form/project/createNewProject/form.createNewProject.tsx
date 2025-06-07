'use client';

import type React from 'react';
// import { useSession } from "next-auth/react";

import { zodResolver } from '@hookform/resolvers/zod';
// zod and RHF
import { useForm } from 'react-hook-form';

// // utils
// import { slugToString } from "~/utils/slugHandler";

// types

// data
import { defaultValues } from './formConfig.createNewProject';

import { toast } from 'sonner';
import { Button } from '~/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
// components
import { Input } from '~/components/ui/input';
import { authClient } from '~/lib/auth-client';
import {
  ProjectInsertSchema,
  type ProjectInsertSchemaType,
} from '~/server/db/schema/project';
// import { useRouter } from "next/navigation";
import { api } from '~/trpc/react';
import { stringToSlug } from '~/utils';

interface CreateNewProjectFormProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CreateNewProjectForm: React.FC<CreateNewProjectFormProps> = ({
  setOpen,
}) => {
  const { data: session, isPending } = authClient.useSession();

  // api utils
  const utils = api.useUtils();

  // mutation
  const createNewProjectMutation = api.project.createNewProject.useMutation();

  // form
  const form = useForm<ProjectInsertSchemaType>({
    resolver: zodResolver(ProjectInsertSchema),
    defaultValues,
  });

  // handle form submit
  const onSubmit = async (data: ProjectInsertSchemaType) => {
    console.log(data);
    setOpen?.(true);

    if (!session?.session.orgSlug) return;

    // toast.info(JSON.stringify(data));
    const res = await createNewProjectMutation.mutateAsync(
      {
        ...data,
        orgSlug: session.session.orgSlug,
        slug: stringToSlug(data.title),
      },
      {
        onSuccess: async () => {
          await utils.project.getAllProjectInTeam.invalidate();
        },
      },
    );

    if (!res.data?.slug) {
      toast.error(res.message);
      form.setError('title', {
        message: res.message,
      });
      // form.reset();/
      return;
    }

    toast.success(res.message);
    form.reset();
    setOpen?.(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-full gap-1">
              <FormLabel className="text-xs font-medium">
                Project Title
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Project Title"
                  disabled={form.formState.isSubmitting}
                  className="md:text-xs"
                />
              </FormControl>
              <FormDescription>
                What&apos;s the title of your project?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-3 flex justify-end gap-2">
          <Button
            type="submit"
            size="sm"
            disabled={form.formState.isSubmitting || isPending}
          >
            Create New Project
          </Button>
        </div>
      </form>
    </Form>
  );
};
