'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AddIcon } from 'public/icons';
import type React from 'react';
import { Button } from '~/components/ui/button';

export const NewTemplateCTA: React.FC = () => {
  const pathName = usePathname();

  return (
    <Button size="smaller" variant="default" asChild>
      <Link href={`${pathName}/new`}>
        <AddIcon /> Create New Template
      </Link>
    </Button>
  );
};
