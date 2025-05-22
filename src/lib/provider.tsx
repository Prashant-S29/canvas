'use client';

import type React from 'react';
import { TRPCReactProvider } from '~/trpc/react';

// hooks
import { useMounted } from '~/hooks/useMounted';

// components
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { Toaster } from 'sonner';

interface Props {
  children: React.ReactNode;
}

export const Provider: React.FC<Props> = ({ children }) => {
  const mounted = useMounted();

  if (!mounted) {
    return null;
  }

  return (
    <TRPCReactProvider>
      <NextThemesProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={true}
        // forcedTheme="dark"
        disableTransitionOnChange
      >
        <Toaster visibleToasts={3} />
        {children}
      </NextThemesProvider>
    </TRPCReactProvider>
  );
};
