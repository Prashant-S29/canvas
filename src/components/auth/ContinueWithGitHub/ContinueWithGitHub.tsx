'use client';

import type React from 'react';
import { useState } from 'react';

// lib
import { authClient } from '~/lib/auth-client';

// icons
import { SocialIcons } from 'public/icons';

import { toast } from 'sonner';
// components
import { Button } from '~/components/ui/button';
import { useMounted } from '~/hooks/useMounted';

export const ContinueWithGitHub: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const mounted = useMounted();

  const handleGitHubLogin = async () => {
    setLoading(true);

    toast.promise(
      authClient.signIn.social({
        provider: 'github',
        callbackURL: '/onboarding',
      }),
      {
        loading: 'Logging in...',
        success: 'Successfully logged in!',
        error: 'An unexpected error occurred',
      },
    );
  };

  if (!mounted) return null;

  return (
    <Button
      variant="secondary"
      className="w-full "
      disabled={loading}
      onClick={async () => {
        await handleGitHubLogin();
      }}
    >
      <SocialIcons.GitHubIcon className="size-5" />
      Login with GitHub
    </Button>
  );
};
