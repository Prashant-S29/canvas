'use client';

import * as React from 'react';

import * as TabsPrimitive from '@radix-ui/react-tabs';
import { type VariantProps, cva } from 'class-variance-authority';
import { cn } from '~/lib/utils';

const Tabs = TabsPrimitive.Root;

const TabsListVariants = cva('inline-flex items-center ', {
  variants: {
    variant: {
      default: 'rounded-lg bg-muted p-1 text-muted-foreground',
      underline: 'border-b rounded-none bg-background gap-2 p-0 justify-start',
    },
    width: {
      full: 'w-full',
      fit: 'w-fit',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const TabsTriggerVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap text-sm font-normal transition-all disabled:pointer-events-none data-[state=active]:text-foreground px-3',
  {
    variants: {
      variant: {
        default:
          'inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-xs font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow',
        underline:
          'bg-background border-b-2 border-background focus:border-primary ring-0 outline-none shadow-none data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary disabled:opacity-100 data-[state=active]:shadow-none rounded-none m-0 pt-1.5 pb-2 hover:bg-background-muted',
      },
      width: {
        full: 'w-full',
        fit: 'w-fit',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
    VariantProps<typeof TabsListVariants> {
  asChild?: boolean;
}

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, variant, width, asChild = false, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(TabsListVariants({ variant, width, className }))}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

export interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
    VariantProps<typeof TabsTriggerVariants> {
  asChild?: boolean;
}

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, variant, width, asChild = false, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(TabsTriggerVariants({ variant, width, className }))}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
