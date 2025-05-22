'use client';

import Link from 'next/link';
import type React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
// zod and RHF
import { useForm } from 'react-hook-form';

// types
import {
  OnboardingFormSchema,
  type OnboardingFormSchemaType,
} from '~/schema/form/formSchema.onboardingForm';

// icons
import { InfoIcon } from 'public/icons';

import { toast } from 'sonner';
import { Button } from '~/components/ui/button';
// components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '~/components/ui/form';
import { InputOTP, InputOTPSlot } from '~/components/ui/input-otp';

interface OnboardingFormProps {
  state?: 'join' | 'onboarding';
}

export const OnboardingForm: React.FC<OnboardingFormProps> = ({ state }) => {
  // form
  const form = useForm<OnboardingFormSchemaType>({
    resolver: zodResolver(OnboardingFormSchema),
    defaultValues: {
      invitationCode: '',
    },
  });

  // handle form submit
  const onSubmit = async (data: OnboardingFormSchemaType) => {
    console.log(data);

    // mock form submission
    const promise = new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 3000);
    });

    await promise;
    toast.success(data.invitationCode);
    form.reset({
      invitationCode: '',
    });
  };

  return (
    <div className="flex w-[400px] flex-col items-center gap-3 rounded-xl border bg-sidebar px-5 py-8">
      <svg
        width="30"
        height="30"
        viewBox="0 0 430 430"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>logo</title>
        <path
          d="M215 215C698.75 215 215 698.75 215 215C215 698.75 -268.75 215 215 215C-268.75 215 215 -268.75 215 215C215 -268.75 698.75 215 215 215Z"
          fill="var(--stroke-color)"
        />
      </svg>
      <section className="flex flex-col items-center">
        <h2>Join a Team on Canvas</h2>
        <p className="text-xs text-primary/50">
          Enter your team invitation below.
        </p>
      </section>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-3"
        >
          <FormField
            control={form.control}
            name="invitationCode"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center">
                <FormControl>
                  <InputOTP
                    maxLength={6}
                    {...field}
                    disabled={form.formState.isSubmitting}
                    autoFocus
                  >
                    <InputOTPSlot index={0} className="rounded-sm border" />
                    <InputOTPSlot index={1} className="rounded-sm border" />
                    <InputOTPSlot index={2} className="rounded-sm border" />
                    <InputOTPSlot index={3} className="rounded-sm border" />
                    <InputOTPSlot index={4} className="rounded-sm border" />
                    <InputOTPSlot index={5} className="rounded-sm border" />
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            size="sm"
            disabled={form.formState.isSubmitting}
            // loading={form.formState.isSubmitting}
          >
            Join Team
          </Button>
        </form>
      </Form>
      {state === 'onboarding' && (
        <>
          <div className="flex items-center gap-3">
            <div className="h-[1px] w-[100px] bg-primary/20" />
            <p className="text-xs text-primary/20">or</p>
            <div className="h-[1px] w-[100px] bg-primary/20" />
          </div>

          <Button
            size="sm"
            asChild
            type="button"
            variant="secondary"
            disabled={form.formState.isSubmitting}
          >
            <Link href="/organization/new">Create your Organization</Link>
          </Button>
        </>
      )}
      <p className="flex items-center gap-2 text-xs leading-none text-primary/50">
        <InfoIcon /> Creating a new team is only available for Organizations.
      </p>
    </div>
  );
};
