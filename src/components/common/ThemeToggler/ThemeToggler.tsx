'use client';

import type React from 'react';

// hooks
import { useTheme } from 'next-themes';
import { useMounted } from '~/hooks/useMounted';

import { ThemeIcons } from 'public/icons';
// components
import { Button } from '~/components/ui/button';

export const ThemeToggler: React.FC = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const mounted = useMounted();

  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="secondary"
      size="icon"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      // className=" hover:bg-transparent"
    >
      {resolvedTheme === 'dark' ? (
        <ThemeIcons.SunIcon />
      ) : (
        <ThemeIcons.MoonIcon />
      )}
    </Button>
  );
};
