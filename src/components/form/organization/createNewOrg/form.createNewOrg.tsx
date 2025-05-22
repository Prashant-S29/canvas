'use client';

import { useRouter } from 'next/navigation';
import type React from 'react';

// trpc
import { api } from '~/trpc/react';

// zod & RHF
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

// schema
import {
  CreateNewOrgFormSchema,
  type CreateNewOrgFormSchemaType,
} from '~/schema/form/formSchema.organization';

// utils
import { stringToSlug } from '~/utils/slugHandler';

// auth
import { authClient } from '~/lib/auth-client';

import { toast } from 'sonner';
// components
import { Button } from '~/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
// config
import { defaultValues } from './formConfig.createNewOrg';

export const CreateNewOrgFrom: React.FC = () => {
  const { refetch } = authClient.useSession();

  const router = useRouter();

  // mutations
  const createNewOrgMutation = api.org.createNewOrg.useMutation();

  const form = useForm<CreateNewOrgFormSchemaType>({
    resolver: zodResolver(CreateNewOrgFormSchema),
    defaultValues,
  });

  const onSubmit = async (data: CreateNewOrgFormSchemaType) => {
    console.log(data);

    const createNewOrgRes = await createNewOrgMutation.mutateAsync({
      ...data,
      slug: stringToSlug(data.name),
    });

    if (!createNewOrgRes?.data?.orgSlug) {
      toast.error(createNewOrgRes.message);
      return;
    }

    toast.success(createNewOrgRes.message);

    // update the session
    refetch();

    router.push('/dashboard/organization');
    return;
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-[700px] rounded-lg border bg-sidebar"
      >
        <section className="flex flex-col border-b px-5 py-3">
          <h2 className="mt-1 text-sm font-medium">Create an Organization</h2>
        </section>
        <section className="px-5 py-5">
          <h3 className="text-sm font-medium leading-tight text-primary">
            This is your organization within Canvas
          </h3>
          <p className="text-sm text-primary/50">
            For example, you can use the name of your company or institution.
          </p>

          <div className="mt-5 flex w-full flex-col space-y-8 overflow-hidden p-2">
            <div className="flex justify-between gap-[50px]">
              <section className="w-[200px] pt-1">
                <p className="text-sm font-medium text-primary">Name</p>
              </section>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <div className="flex flex-col gap-2">
                        <Input
                          {...field}
                          placeholder="Organization Name"
                          disabled={form.formState.isSubmitting}
                        />
                        <p className="text-sm text-primary/50">
                          What&apos;s the name of your organization?
                        </p>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-between gap-[50px]">
              <section className="w-[200px] pt-1">
                <p className="text-sm font-medium text-primary">Description</p>
              </section>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <div className="flex flex-col gap-2">
                        <Textarea
                          placeholder="Organization Info"
                          className="min-h-[80px] "
                          disabled={form.formState.isSubmitting}
                          {...field}
                        />
                        <p className="text-sm text-primary/50">
                          A short description of your organization
                        </p>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="mt-8 flex justify-end gap-2">
            <Button
              type="submit"
              size="sm"
              disabled={form.formState.isSubmitting}
            >
              Create Organization
            </Button>
          </div>
        </section>
      </form>
    </Form>
  );
};
