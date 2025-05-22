'use client';

import type React from 'react';
// import { useSession } from "next-auth/react";

import { zodResolver } from '@hookform/resolvers/zod';
// zod and RHF
import { useForm } from 'react-hook-form';

// // utils
// import { slugToString } from "~/utils/slugHandler";

// types
import {
  CreateNewTeamFormSchema,
  type CreateNewTeamFormSchemaType,
} from './formSchema.createNewTeam';

// data
import { defaultValues } from './formConfig.createNewTeam';

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
// import { useRouter } from "next/navigation";
import { Textarea } from '~/components/ui/textarea';
import { api } from '~/trpc/react';

interface CreateNewTeamFormProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CreateNewTeamForm: React.FC<CreateNewTeamFormProps> = ({
  setOpen,
}) => {
  // api utils
  const utils = api.useUtils();

  // mutation
  const createNewTeamMutation = api.team.createNewTeam.useMutation();

  // form
  const form = useForm<CreateNewTeamFormSchemaType>({
    resolver: zodResolver(CreateNewTeamFormSchema),
    defaultValues,
  });

  // handle form submit
  const onSubmit = async (data: CreateNewTeamFormSchemaType) => {
    console.log(data);
    setOpen?.(true);

    // toast.info(JSON.stringify(data));
    const res = await createNewTeamMutation.mutateAsync(data, {
      onSuccess: async () => {
        await utils.team.getAllTeams.invalidate();
      },
    });

    if (!res.data?.slug) {
      toast.error(res.message);
      // form.reset();/
      return;
    }

    toast.success(res.message);
    form.reset();
    setOpen?.(false);

    // router.push("/dashboard/organization/teams");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full gap-1">
              <FormLabel className="text-xs font-medium">Team Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Team Name"
                  disabled={form.formState.isSubmitting}
                  className="md:text-xs"
                />
              </FormControl>
              <FormDescription>
                What&apos;s the name of your team?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-xs font-medium">
                Team Description
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Team Description"
                  disabled={form.formState.isSubmitting}
                  className="md:text-xs"
                />
              </FormControl>
              <FormDescription>
                A short description of your team
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-3 flex justify-end gap-2">
          <Button
            type="submit"
            size="sm"
            disabled={form.formState.isSubmitting}
          >
            Create New Team
          </Button>
        </div>
      </form>
    </Form>
  );
};
