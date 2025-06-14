"use client";

import Link from "next/link";
import type React from "react";

// components
import { ThemeToggler } from "~/components/common";
import { Button } from "~/components/ui/button";

// icons
import { SocialIcons } from "public/icons";
import { useMounted } from "~/hooks";

export const Header: React.FC = () => {

  const mounted = useMounted();

  if (!mounted) return null;

  return (
    <header className="fixed top-0 z-50 flex w-full items-center justify-between px-[200px] py-4">
      <Link href="/" className="flex items-center gap-2 text-sm font-medium">
        <svg
          width="30"
          height="30"
          viewBox="0 0 430 430"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Canvas</title>
          <path
            d="M215 215C698.75 215 215 698.75 215 215C215 698.75 -268.75 215 215 215C-268.75 215 215 -268.75 215 215C215 -268.75 698.75 215 215 215Z"
            fill="var(--stroke-color)"
          />
        </svg>
        Canvas
      </Link>

      <section className="flex items-center gap-2">
        <ThemeToggler />
        <Button size="icon" variant="ghost" className="gap-1" asChild>
          <Link href="https://github.com/Prashant-S29/canvas" target="_blank">
            <SocialIcons.GitHubIcon />
          </Link>
        </Button>
      </section>
    </header>
  );
};
