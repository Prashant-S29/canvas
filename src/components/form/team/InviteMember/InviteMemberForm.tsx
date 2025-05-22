'use client';

import type React from 'react';
import { api } from '~/trpc/react';

// zod and RHF
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

// types
import { role } from '~/server/db/schema/role';

// utils
import { formatRole } from '~/utils/formatRole';

// components
import { toast } from 'sonner';
import { Button } from '~/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import {
  InviteMemberSchema,
  type InviteMemberSchemaType,
} from '~/schema/form/formSchema.inviteMember';

interface CreateNewTeamFormProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  teamSlug: string;
}

export const InviteMemberForm: React.FC<CreateNewTeamFormProps> = ({
  setOpen,
  teamSlug,
}) => {
  // mutation
  const teamInviteMembersMutation = api.team.inviteMembers.useMutation();
  const utils = api.useUtils();

  // form
  const form = useForm<InviteMemberSchemaType>({
    resolver: zodResolver(InviteMemberSchema),
    defaultValues: {
      role: 'TEAM_MEMBER',
      teamSlug: teamSlug,
      userMail: '',
    },
  });

  // handle form submit
  const onSubmit = async (data: InviteMemberSchemaType) => {
    console.log(data);

    const res = await teamInviteMembersMutation.mutateAsync(data, {
      onSuccess: async () => {
        await utils.team.getAllTeamUsersByTeamSlug.invalidate();
        await utils.team.getAllInvitations.invalidate();
      },
    });

    if (!res.data?.id) {
      form.setError('userMail', {
        message: res.message,
      });
      toast.error(res.message);

      // form.reset();
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
        {/* {JSON.stringify(form.formState.errors)} */}
        <FormField
          control={form.control}
          name="userMail"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-xs font-medium">
                Member Email
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Email"
                  disabled={form.formState.isSubmitting}
                  className="md:text-xs"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="w-full text-xs">
              <FormLabel className="text-xs font-medium">Role</FormLabel>
              <FormControl>
                <Select
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                  disabled={form.formState.isSubmitting}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={role.enumValues[1]}>
                      {formatRole(role.enumValues[1])}
                    </SelectItem>
                    <SelectItem value={role.enumValues[2]}>
                      {formatRole(role.enumValues[2])}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-3 flex justify-end gap-2">
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            size="sm"
          >
            Send Invitation
          </Button>
        </div>
      </form>
    </Form>
  );
};
